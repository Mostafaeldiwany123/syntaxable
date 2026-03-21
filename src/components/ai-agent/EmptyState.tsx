import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center pt-20">
      <img 
        src="/syntaxable.png" 
        alt="Syntaxi" 
        className="w-16 h-16 mb-4 object-contain opacity-80"
      />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        I'm Syntaxi
      </h3>
      <p className="text-sm text-muted-foreground max-w-[240px] leading-relaxed">
        I'm here to assist you with coding. I can help you debug, explain concepts, 
        give you hints, and help you become a better programmer.
      </p>
      <p className="text-xs text-muted-foreground/60 mt-3 max-w-[240px]">
        Press Ctrl+K (or Cmd+K) to toggle the AI Assistant.
      </p>
    </div>
  );
};

export default EmptyState;