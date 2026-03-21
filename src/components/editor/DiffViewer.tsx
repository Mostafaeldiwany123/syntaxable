import React from 'react';
import { diffLines } from 'diff';

interface DiffViewerProps {
  oldContent: string;
  newContent: string;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ oldContent, newContent }) => {
  const differences = diffLines(oldContent, newContent);

  return (
    <pre className="text-xs font-mono bg-secondary/30 p-4 rounded-md overflow-auto max-h-96 border border-border">
      <code>
        {differences.map((part, index) => {
          const isAdded = part.added;
          const isRemoved = part.removed;
          const lineClass = isAdded ? 'bg-green-500/20' : isRemoved ? 'bg-red-500/20' : '';
          const prefix = isAdded ? '+' : isRemoved ? '-' : ' ';

          return (
            <div key={index} className={lineClass}>
              {part.value.split('\n').filter((line, i, arr) => i < arr.length - 1 || line !== '').map((line, i) => (
                <div key={i}>
                  <span className={`w-5 inline-block text-center select-none ${isAdded ? 'text-green-400' : isRemoved ? 'text-red-400' : 'text-muted-foreground'}`}>
                    {prefix}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          );
        })}
      </code>
    </pre>
  );
};

export default DiffViewer;