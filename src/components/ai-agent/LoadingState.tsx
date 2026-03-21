import React, { useState, useEffect } from 'react';

const loadingMessages = [
  'Thinking...',
  'Analyzing your code...',
  'Cooking up an answer...',
  'Processing...',
  'Generating response...',
  'Working on it...',
  'Almost there...',
];

export const LoadingState: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  // Cycle through messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="text-sm text-muted-foreground">
      <span className="inline-block animate-pulse bg-gradient-to-r from-muted-foreground via-muted-foreground/50 to-muted-foreground bg-[length:200%_100%] bg-clip-text">
        {loadingMessages[messageIndex]}
      </span>
    </div>
  );
};

export default LoadingState;