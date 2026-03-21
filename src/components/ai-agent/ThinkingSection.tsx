import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Brain } from 'lucide-react';

interface ThinkingSectionProps {
  content: string;
}

export const ThinkingSection: React.FC<ThinkingSectionProps> = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!content || content.trim() === '') return null;

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group w-full text-left"
      >
        <Brain className="h-3 w-3" />
        <span className="font-medium">Thinking</span>
        {isExpanded ? (
          <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-2 pl-3 border-l border-muted">
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};

export default ThinkingSection;