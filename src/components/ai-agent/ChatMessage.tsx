import React from 'react';
import { Copy, Check } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ThinkingSection } from './ThinkingSection';
import { LoadingState } from './LoadingState';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isLastAssistant: boolean;
  isTyping: boolean;
  onCopy: (content: string, id: string) => void;
  copiedId: string | null;
}

export const ChatMessage = React.memo<ChatMessageProps>(({
  message,
  isLastAssistant,
  isTyping,
  onCopy,
  copiedId,
}) => {
  const isUser = message.role === 'user';
  const isLoading = isLastAssistant && isTyping && !message.content && !message.reasoning;

  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      {isUser ? (
        /* User message - compact, right-aligned */
        <div className="max-w-[80%] bg-secondary rounded-lg px-3 py-2">
          <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed break-words">
            {message.content}
          </p>
        </div>
      ) : (
        /* Assistant message - full width, left-aligned */
        <div className="w-full min-w-0">
          {/* Loading state */}
          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              {/* Thinking/Reasoning section */}
              {message.reasoning && message.reasoning.trim() !== '' && (
                <ThinkingSection content={message.reasoning} />
              )}
              
              {/* Content */}
              {message.content && (
                <div className="text-sm text-foreground leading-relaxed">
                  <MarkdownRenderer content={message.content} />
                </div>
              )}

              {/* Action buttons - only show when not typing and it's the last assistant message */}
              {isLastAssistant && !isTyping && message.content && (
                <div className="flex items-center gap-1 mt-2">
                  <button
                    onClick={() => onCopy(message.content, message.id)}
                    className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    title="Copy"
                  >
                    {copiedId === message.id ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}, (prev, next) => {
  return prev.message.id === next.message.id &&
         prev.message.content === next.message.content &&
         prev.message.reasoning === next.message.reasoning &&
         prev.isLastAssistant === next.isLastAssistant &&
         prev.isTyping === next.isTyping &&
         prev.copiedId === next.copiedId;
});

export default ChatMessage;