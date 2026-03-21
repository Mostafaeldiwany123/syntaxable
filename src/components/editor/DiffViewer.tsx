import React from 'react';
import { diffLines } from 'diff';
import { cn } from '@/lib/utils';

interface DiffViewerProps {
  oldContent: string;
  newContent: string;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ oldContent, newContent }) => {
  const differences = diffLines(oldContent, newContent);

  return (
    <pre className="text-[13px] font-mono bg-card p-0 rounded-lg overflow-auto max-h-[500px] border border-border">
      <code className="grid gap-0">
        {differences.map((part, index) => {
          const isAdded = part.added;
          const isRemoved = part.removed;

          const lineBg = isAdded
            ? 'bg-green-500/20 dark:bg-green-900/30'
            : isRemoved
              ? 'bg-red-500/20 dark:bg-red-900/30'
              : 'hover:bg-muted/30';

          const textClass = isAdded
            ? 'text-green-700 dark:text-green-300'
            : isRemoved
              ? 'text-red-700 dark:text-red-300'
              : 'text-foreground/80';

          const signClass = isAdded
            ? 'text-green-600 dark:text-green-400'
            : isRemoved
              ? 'text-red-600 dark:text-red-400'
              : 'text-muted-foreground/40';

          const prefix = isAdded ? '+' : isRemoved ? '-' : ' ';

          return (
            <div key={index} className={cn("transition-colors", lineBg)}>
              {part.value.split('\n').filter((line, i, arr) => i < arr.length - 1 || line !== '').map((line, i) => (
                <div key={i} className="flex min-h-[1.6rem] items-center border-b border-border/5 last:border-0">
                  <span className={cn(
                    "w-8 h-full flex items-center justify-center shrink-0 select-none font-bold text-[12px] border-r border-border/10",
                    signClass
                  )}>
                    {prefix}
                  </span>
                  <span className={cn("px-4 py-1 flex-1 whitespace-pre-wrap break-all", textClass)}>
                    {line}
                  </span>
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