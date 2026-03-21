import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  timestamp: Date;
}

export interface ChatContext {
  code?: string;
  language?: string;
  fileName?: string;
  files?: { name: string; content: string }[];
  problemTitle?: string;
  problemDescription?: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string;
  sampleInput?: string;
  sampleOutput?: string;
}

export interface UseAIChatOptions {
  onError?: (error: string) => void;
  onTokenLimitReached?: () => void;
}

// Module-level cache to persist messages when component unmounts
let cachedMessages: Message[] = [];

export function useAIChat(options?: UseAIChatOptions) {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<Message[]>(cachedMessages);

  // Sync state to module cache
  useEffect(() => {
    cachedMessages = messages;
  }, [messages]);

  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<Message[]>([]);

  // Keep ref in sync so sendMessage always sees latest messages
  messagesRef.current = messages;

  const sendMessage = useCallback(async (
    userMessage: string,
    context?: ChatContext
  ) => {
    console.log('[useAIChat] ========== SENDING MESSAGE ==========')
    console.log('[useAIChat] User message:', userMessage.substring(0, 100))
    console.log('[useAIChat] Context:', {
      language: context?.language,
      fileName: context?.fileName,
      codeLength: context?.code?.length,
      filesCount: context?.files?.length,
      problemTitle: context?.problemTitle,
      hasInputFormat: !!context?.inputFormat,
      hasOutputFormat: !!context?.outputFormat,
      hasConstraints: !!context?.constraints,
    })

    // Add user message immediately
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsStreaming(true);

    // Create placeholder for assistant message
    const assistantMsgId = (Date.now() + 1).toString();
    const assistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      reasoning: '',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMsg]);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get user profile for username
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      console.log('[useAIChat] Calling Edge Function...')

      // Call Edge Function
      const response = await fetch(
        'https://gztwubnglussalnktvck.supabase.co/functions/v1/ai-chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({
            userMessage,
            code: context?.code,
            language: context?.language,
            fileName: context?.fileName,
            files: context?.files,
            problemTitle: context?.problemTitle,
            problemDescription: context?.problemDescription,
            inputFormat: context?.inputFormat,
            outputFormat: context?.outputFormat,
            constraints: context?.constraints,
            sampleInput: context?.sampleInput,
            sampleOutput: context?.sampleOutput,
            userName: profile?.username,
            chatHistory: messagesRef.current.slice(-8).map(m => ({
              id: m.id,
              role: m.role,
              content: m.content.length > 2000 ? m.content.slice(0, 2000) + '...(truncated)' : m.content,
              reasoning: m.reasoning ? (m.reasoning.length > 500 ? m.reasoning.slice(0, 500) + '...(truncated)' : m.reasoning) : undefined,
              timestamp: m.timestamp.toISOString()
            }))
          }),
          signal: abortControllerRef.current.signal
        }
      );

      console.log('[useAIChat] Response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('[useAIChat] Error response:', errorData)

        if (response.status === 402) {
          options?.onTokenLimitReached?.();
          throw new Error(errorData.message || 'Token limit reached');
        }

        throw new Error(errorData.error || errorData.details || 'Failed to get AI response');
      }

      // Process streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let currentContent = '';
      let currentReasoning = '';
      let buffer = '';

      console.log('[useAIChat] Starting stream processing...')

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('[useAIChat] Stream complete')
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);

              // Handle OpenRouter streaming format
              if (parsed.choices && parsed.choices[0]) {
                const delta = parsed.choices[0].delta;

                // Handle reasoning_details (for thinking models)
                if (delta?.reasoning_details && Array.isArray(delta.reasoning_details)) {
                  for (const detail of delta.reasoning_details) {
                    if (detail.type === 'reasoning.text' && detail.text) {
                      currentReasoning += detail.text;
                      setMessages(prev => prev.map(m =>
                        m.id === assistantMsgId
                          ? { ...m, reasoning: currentReasoning }
                          : m
                      ));
                    }
                    else if (detail.type === 'reasoning.summary' && detail.summary) {
                      currentReasoning += detail.summary;
                      setMessages(prev => prev.map(m =>
                        m.id === assistantMsgId
                          ? { ...m, reasoning: currentReasoning }
                          : m
                      ));
                    }
                  }
                }

                // Handle regular content
                if (delta?.content) {
                  currentContent += delta.content;
                  setMessages(prev => prev.map(m =>
                    m.id === assistantMsgId
                      ? { ...m, content: currentContent }
                      : m
                  ));
                }
              }
            } catch (e) {
              // Skip invalid JSON
              console.warn('[useAIChat] Parse error:', e)
            }
          }
        }
      }

      console.log('[useAIChat] Final content length:', currentContent.length)
      console.log('[useAIChat] Final reasoning length:', currentReasoning.length)

      // Credits are now handled by the edge function
      // Invalidate profile cache to update credits display
      queryClient.invalidateQueries({ queryKey: ['profile'], refetchType: 'all' });

      setIsStreaming(false);
    } catch (error) {
      console.error('[useAIChat] Error:', error);
      setIsStreaming(false);

      if (error instanceof Error && error.name === 'AbortError') {
        // Request was cancelled
        setMessages(prev => prev.filter(m => m.id !== assistantMsgId));
        return;
      }

      // Update assistant message with error
      setMessages(prev => prev.map(m =>
        m.id === assistantMsgId
          ? { ...m, content: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}` }
          : m
      ));

      options?.onError?.(error instanceof Error ? error.message : 'Failed to get response');
    }
  }, [options]);

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    cachedMessages = [];
  }, []);

  const loadMessages = useCallback((loadedMessages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    reasoning?: string;
    timestamp: Date;
  }>) => {
    setMessages(loadedMessages);
    cachedMessages = loadedMessages;
  }, []);

  const retryLastMessage = useCallback(async (context?: ChatContext) => {
    // Find the last user message
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) return;

    // Remove the last assistant message
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'assistant') {
        newMessages.pop();
      }
      return newMessages;
    });

    // Resend the last user message
    await sendMessage(lastUserMessage.content, context);
  }, [messages, sendMessage]);

  return {
    messages,
    isStreaming,
    sendMessage,
    stopStreaming,
    clearMessages,
    loadMessages,
    retryLastMessage
  };
}