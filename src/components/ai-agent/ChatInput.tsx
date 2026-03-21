import React, { useRef, useEffect, useState } from 'react';
import { ArrowUp, Square, ChevronDown, Lock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type AIAgentType = 'ask' | 'edit';

interface ChatInputProps {
  onSend: (value: string) => void;
  isStreaming: boolean;
  onStop: () => void;
  isOpen: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  isStreaming,
  onStop,
  isOpen,
}) => {
  const [value, setValue] = useState('');
  const [agentType, setAgentType] = useState<AIAgentType>('ask');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isStreaming && value.trim()) {
        onSend(value);
        setValue('');
      }
    }
  };

  const handleSendClick = () => {
    if (isStreaming) {
      onStop();
    } else if (value.trim()) {
      onSend(value);
      setValue('');
    }
  };

  return (
    <div className="p-4 bg-transparent">
      <div className="flex flex-col gap-2 border border-border rounded-lg bg-secondary/30 p-3">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 min-h-[60px] max-h-[120px] resize-none bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none"
          rows={3}
        />
        <div className="flex justify-between items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-secondary/50 outline-none">
              {agentType === 'ask' ? 'Ask' : 'Edit'}
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top">
              <DropdownMenuItem onClick={() => setAgentType('ask')}>
                Ask
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="opacity-50 cursor-not-allowed flex items-center gap-2">
                <Lock className="h-3 w-3" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={handleSendClick}
            disabled={!isStreaming && !value.trim()}
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              isStreaming
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
            title={isStreaming ? 'Stop' : 'Send'}
          >
            {isStreaming ? (
              <Square className="h-3.5 w-3.5" />
            ) : (
              <ArrowUp className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;