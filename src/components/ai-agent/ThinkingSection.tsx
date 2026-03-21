import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Brain } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

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
        <div className="mt-2 pl-3 border-l-2 border-muted bg-muted/5 py-1 pr-1 opacity-80">
          <div className="text-sm text-muted-foreground mix-blend-luminosity">
            <MarkdownRenderer content={content} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThinkingSection;