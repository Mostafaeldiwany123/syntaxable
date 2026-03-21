import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="text-sm text-muted-foreground">
        <span className="inline-flex items-center">
          Thinking
          <span className="ml-1 inline-flex overflow-hidden">
            <span className="animate-[shimmer_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-foreground/20 to-transparent bg-[length:200%_100%] bg-clip-text">
              ...
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default TypingIndicator;