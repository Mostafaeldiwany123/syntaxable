import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AIAgentButtonProps {
  onClick: () => void;
  isOpen: boolean;
  variant?: 'default' | 'compact';
}

const AIAgentButton: React.FC<AIAgentButtonProps> = ({
  onClick,
  isOpen,
  variant = 'default',
}) => {
  if (variant === 'compact') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClick}
              className={`h-7 gap-1.5 text-xs font-medium transition-colors ${
                isOpen
                  ? 'bg-primary/10 text-primary hover:bg-primary/15'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Assistant</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={`h-7 gap-1.5 text-xs font-medium transition-colors ${
        isOpen
          ? 'bg-primary/10 text-primary hover:bg-primary/15'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
      }`}
    >
      <Sparkles className="h-3.5 w-3.5" />
      <span>AI Assistant</span>
    </Button>
  );
};

export default AIAgentButton;