import React, { useRef, useEffect, useState, useCallback } from 'react';
import { X, Plus, History, ArrowLeft, Trash2, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { EmptyState } from './EmptyState';
import { useAIChat, ChatContext } from '@/hooks/useAIChat';
import { useChatHistory, ChatSession } from '@/hooks/useChatHistory';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
interface AIAgentPanelProps {
  isOpen: boolean;
  onClose: () => void;
  getChatContext?: () => {
    type: 'practice' | 'project';
    problemTitle?: string;
    problemDescription?: string;
    code?: string;
    language?: string;
    fileName?: string;
    files?: { name: string; content: string }[];
    inputFormat?: string;
    outputFormat?: string;
    constraints?: string;
    sampleInput?: string;
    sampleOutput?: string;
  };
}

type View = 'chat' | 'history';

let cachedSessionId: string | null = null;
let cachedView: View = 'chat';

const AIAgentPanel: React.FC<AIAgentPanelProps> = ({
  isOpen,
  onClose,
  getChatContext,
}) => {
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [currentSessionId, setCurrentSessionId] = React.useState<string | null>(cachedSessionId);
  const [view, setView] = useState<View>(cachedView);

  // Use a ref for getChatContext to ensure handleSend always has the latest version
  const getChatContextRef = useRef(getChatContext);
  getChatContextRef.current = getChatContext;

  useEffect(() => {
    cachedSessionId = currentSessionId;
  }, [currentSessionId]);

  useEffect(() => {
    cachedView = view;
  }, [view]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  const {
    history,
    createSession,
    saveSession,
    deleteSession,
    clearHistory,
    getSession,
  } = useChatHistory();

  const {
    messages,
    isStreaming,
    sendMessage,
    stopStreaming,
    clearMessages,
    loadMessages,
    retryLastMessage
  } = useAIChat({
    onError: (error) => {
      toast.error('AI Error', { description: error });
    },
    onTokenLimitReached: () => {
      toast.error('Token Limit Reached', {
        description: 'You have reached your free tier token limit. Please upgrade to Pro for unlimited access.'
      });
    }
  });

  const prevMessagesRef = useRef<typeof messages>([]);
  const prevSessionIdRef = useRef<string | null>(null);

  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const isAutoScrolling = useRef(false);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isAutoScrolling.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    // Lower threshold for more sensitive detection (10px)
    const distanceFromBottom = scrollHeight - clientHeight - scrollTop;
    const isAtBottom = distanceFromBottom < 10;
    
    if (shouldAutoScroll !== isAtBottom) {
      setShouldAutoScroll(isAtBottom);
    }
  }, [shouldAutoScroll]);

  // Handle manual scroll intent (wheel/touch) to immediately stop auto-scroll
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // If user scrolls up, stop auto-scrolling immediately
      if (e.deltaY < 0) {
        setShouldAutoScroll(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      // If moving finger down (scrolling up to older messages), stop auto-scrolling
      if (touchY > touchStartY + 10) {
        setShouldAutoScroll(false);
      }
    };

    node.addEventListener('wheel', handleWheel, { passive: true });
    node.addEventListener('touchstart', handleTouchStart, { passive: true });
    node.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      node.removeEventListener('wheel', handleWheel);
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current && view === 'chat' && shouldAutoScroll) {
      isAutoScrolling.current = true;
      
      // scrollTo bottom directly or using the anchor
      if (bottomAnchorRef.current) {
        bottomAnchorRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
      } else {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
      
      const reset = () => { isAutoScrolling.current = false; };
      requestAnimationFrame(() => {
        requestAnimationFrame(reset);
      });
    }
  }, [messages, view, shouldAutoScroll]);

  // Save session when messages change (but only if they actually changed)
  useEffect(() => {
    // Skip if no messages or no session
    if (messages.length === 0 || !currentSessionId) return;
    
    // Skip if this is the same as before
    if (
      prevSessionIdRef.current === currentSessionId &&
      prevMessagesRef.current.length === messages.length &&
      prevMessagesRef.current.every((m, i) => m.id === messages[i].id && m.content === messages[i].content)
    ) {
      return;
    }

    // Update refs
    prevMessagesRef.current = messages;
    prevSessionIdRef.current = currentSessionId;

    // Save session
    const session = getSession(currentSessionId);
    if (session) {
      saveSession({
        ...session,
        messages: messages.map(m => ({
          id: m.id,
          role: m.role,
          content: m.content,
          reasoning: m.reasoning,
          timestamp: m.timestamp.toISOString(),
        })),
      });
    }
  }, [messages, currentSessionId, getSession, saveSession]);

  const handleNewChat = () => {
    clearMessages();
    setCurrentSessionId(null);
    setView('chat');
  };

  const handleSend = async (input: string) => {
    if (!input.trim() || !user) return;

    setShouldAutoScroll(true);
    const context = getChatContextRef.current ? getChatContextRef.current() : undefined;

    // Create a new session if this is the first message
    let sessionId = currentSessionId;
    if (!sessionId) {
      const newSession = createSession(input.trim(), context ? {
        type: context.type,
        problemTitle: context.problemTitle,
        problemDescription: context.problemDescription,
        code: context.code,
        language: context.language,
        fileName: context.fileName,
        files: context.files,
      } : undefined);
      sessionId = newSession.id;
      setCurrentSessionId(sessionId);
      saveSession(newSession);
    }

    const chatContext: ChatContext | undefined = context ? {
      code: context.code,
      language: context.language,
      fileName: context.fileName,
      files: context.files,
      problemTitle: context.problemTitle,
      problemDescription: context.problemDescription,
      inputFormat: context.inputFormat,
      outputFormat: context.outputFormat,
      constraints: context.constraints,
      sampleInput: context.sampleInput,
      sampleOutput: context.sampleOutput,
    } : undefined;

    await sendMessage(input.trim(), chatContext);
  };

  const handleCopy = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSelectSession = useCallback((session: ChatSession) => {
    // Load the session's messages
    loadMessages(session.messages.map(m => ({
      ...m,
      timestamp: new Date(m.timestamp)
    })));
    setCurrentSessionId(session.id);
    setView('chat');
  }, [loadMessages]);

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessionToDelete(sessionId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteSession = () => {
    if (sessionToDelete) {
      deleteSession(sessionToDelete);
      // If we deleted the current session, clear messages
      if (sessionToDelete === currentSessionId) {
        clearMessages();
        setCurrentSessionId(null);
      }
      setDeleteDialogOpen(false);
      setSessionToDelete(null);
    }
  };

  if (!isOpen) return null;

  const hasMessages = messages.length > 0;

  return (
    <>
      <div className="h-full flex flex-col bg-background overflow-hidden">
        {/* Header */}
        <div className="h-11 px-3 flex items-center justify-between border-b border-border shrink-0">
          <div className="flex items-center gap-1">
            {view === 'history' ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView('chat')}
                className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-secondary"
                title="Back to Chat"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNewChat}
                  className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  title="New Chat"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setView('history')}
                  className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  title="History"
                >
                  <History className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        {view === 'history' ? (
          <div className="flex-1 overflow-y-auto">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">No chat history yet</p>
                <p className="text-sm text-muted-foreground/60 mt-1">
                  Your conversations will appear here
                </p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {history.map((session) => (
                  <div
                    key={session.id}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                    onClick={() => handleSelectSession(session)}
                  >
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {session.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(session.updatedAt), { addSuffix: true })}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {session.messages.length} messages
                        </span>
                      </div>
                      {session.context?.problemTitle && (
                        <p className="text-xs text-primary/70 mt-1 truncate">
                          {session.context.problemTitle}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hover:bg-secondary/50"
                      onClick={(e) => handleDeleteSession(session.id, e)}
                      title="Delete chat"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Messages or Initial State */}
            <div className="flex-1 overflow-y-auto relative scroll-smooth-none" ref={scrollRef} onScroll={handleScroll}>
              <div className="p-4">
                {!hasMessages ? (
                  <EmptyState />
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        isLastAssistant={index === messages.length - 1 && message.role === 'assistant'}
                        isTyping={isStreaming}
                        onCopy={handleCopy}
                        copiedId={copiedId}
                      />
                    ))}
                    {/* Bottom anchor for scrolling */}
                    <div ref={bottomAnchorRef} className="h-0 w-0" />
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <ChatInput
              onSend={handleSend}
              isStreaming={isStreaming}
              onStop={stopStreaming}
              isOpen={isOpen}
            />
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this chat session and all its messages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteSession} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default React.memo(AIAgentPanel);