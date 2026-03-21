import React, { useState, useCallback, useEffect, useRef } from 'react';
import Editor, { useMonaco, type Monaco } from "@monaco-editor/react";
import { FileCode, X } from 'lucide-react';
import { getFileIconUrl } from '@/lib/project-utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getDynamicTheme } from '@/lib/editor-theme';

type Theme = 'vs-dark' | 'light' | 'custom-dynamic';

declare global {
  interface Window {
    MonacoEnvironment?: {
      getWorker: (moduleId: string, label: string) => Worker;
    };
  }
}

// Dynamic theme helper is now imported from @/lib/editor-theme

interface CodeEditorProps {
  openFiles: string[];
  activeFile: string | null;
  fileContents: Record<string, string>;
  dirtyFiles: Set<string>;
  onChange: (value: string | undefined) => void;
  onTabClick: (path: string) => void;
  onTabClose: (path: string) => void;
  onAIAgentClick: () => void;
  language?: string;
  isReadOnly?: boolean;
}

const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const colorMap: Record<string, string> = {
    'js': 'text-yellow-400',
    'jsx': 'text-yellow-400',
    'ts': 'text-blue-400',
    'tsx': 'text-blue-400',
    'css': 'text-pink-400',
    'html': 'text-orange-400',
    'json': 'text-green-400',
    'md': 'text-gray-400',
    'cpp': 'text-blue-500',
    'c': 'text-cyan-500',
    'cs': 'text-purple-500',
    'h': 'text-purple-400',
  };
  return colorMap[ext || ''] || 'text-blue-400';
};

const getLanguage = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const langMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'css': 'css',
    'html': 'html',
    'json': 'json',
    'md': 'markdown',
    'py': 'python',
    'cpp': 'cpp',
    'c': 'c',
    'cs': 'csharp',
    'h': 'cpp',
    'java': 'java',
  };
  return langMap[ext || ''] || 'plaintext';
};

const CodeEditor = ({
  openFiles,
  activeFile,
  fileContents,
  dirtyFiles,
  onChange,
  onTabClick,
  onTabClose,
  onAIAgentClick,
  isReadOnly = false,
}: CodeEditorProps) => {
  const [isEditorLoading, setIsEditorLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _isLoading = isEditorLoading;
  const monaco = useMonaco();
  const isMobile = useIsMobile();
  const editorRef = useRef<any>(null);

  // Re-evaluate CSS variables for Monaco Theme when global theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      if (monaco) {
        monaco.editor.defineTheme('custom-dynamic', getDynamicTheme());
        monaco.editor.setTheme('custom-dynamic');
      }
    };
    window.addEventListener('themeChanged', handleThemeChange);
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, [monaco]);

  // Add keyboard shortcut for AI agent - works globally including in Monaco editor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K (Windows/Linux) or Cmd+K (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        e.stopPropagation();
        onAIAgentClick();
      }
    };

    // Add to window for global capture
    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [onAIAgentClick]);

  const handleEditorDidMount = useCallback((editor: any, monacoInstance: Monaco) => {
    // Store editor reference
    editorRef.current = editor;
    
    monacoInstance.editor.defineTheme('custom-dynamic', getDynamicTheme());
    monacoInstance.editor.setTheme('custom-dynamic');
    setIsEditorLoading(false);

    // Add keybinding for Ctrl/Cmd+K in Monaco editor
    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyK, () => {
      onAIAgentClick();
    });

    if (isMobile) {
      editor.updateOptions({ domReadOnly: true });

      let touchStartTime = 0;
      let touchStartPos = { x: 0, y: 0 };
      let hasMoved = false;
      const editorDomNode = editor.getDomNode();

      if (!editorDomNode) return;

      const handleTouchStart = (e: TouchEvent) => {
        touchStartTime = Date.now();
        touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        hasMoved = false;
      };

      const handleTouchMove = (e: TouchEvent) => {
        // Track if user is scrolling
        const moveDistance = Math.sqrt(
          Math.pow(e.touches[0].clientX - touchStartPos.x, 2) +
          Math.pow(e.touches[0].clientY - touchStartPos.y, 2)
        );
        if (moveDistance > 10) {
          hasMoved = true;
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        const touchEndTime = Date.now();
        const duration = touchEndTime - touchStartTime;

        // Only show keyboard if:
        // 1. It was a quick tap (less than 300ms)
        // 2. User didn't scroll (hasMoved is false)
        // 3. Touch didn't move much (less than 10px)
        if (duration < 300 && !hasMoved) {
          editor.updateOptions({ domReadOnly: false });
          editor.focus();
        }
      };

      const blurListener = editor.onDidBlurEditorWidget(() => {
        editor.updateOptions({ domReadOnly: true });
      });

      editorDomNode.addEventListener('touchstart', handleTouchStart, { passive: true });
      editorDomNode.addEventListener('touchmove', handleTouchMove, { passive: true });
      editorDomNode.addEventListener('touchend', handleTouchEnd, { passive: true });

      editor.onDidDispose(() => {
        editorDomNode.removeEventListener('touchstart', handleTouchStart);
        editorDomNode.removeEventListener('touchmove', handleTouchMove);
        editorDomNode.removeEventListener('touchend', handleTouchEnd);
        blurListener.dispose();
      });
    }
  }, [isMobile, onAIAgentClick]);

  if (!activeFile) {
    return (
      <div className="h-full w-full bg-background text-muted-foreground flex items-center justify-center">
        <div className="text-center">
          <FileCode size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">Select a file to start editing</p>
          <p className="text-sm mt-2">or create a new file from the sidebar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Tabs */}
      <div className="flex justify-between items-center bg-card border-b border-border">
        <div className="flex overflow-x-auto flex-1">
          {openFiles.map(filePath => {
            const fileName = filePath.split('/').pop() || filePath;
            const isActive = activeFile === filePath;
            const isDirty = dirtyFiles.has(filePath);

            return (
              <div
                key={filePath}
                className={`
                  flex items-center gap-2 px-3 py-2 text-sm cursor-pointer border-r border-border min-w-[120px] max-w-[200px] group
                  ${isActive
                    ? 'bg-background text-foreground border-t-2 border-t-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }
                `}
                onClick={() => onTabClick(filePath)}
              >
                <img src={getFileIconUrl(fileName)} alt="" className="w-4 h-4 shrink-0" />
                <span className="flex-1 truncate text-xs">{fileName}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(filePath);
                  }}
                  className={`hover:bg-secondary rounded p-0.5 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
                  {isDirty ? <div className="h-2 w-2 rounded-full bg-blue-400" /> : <X size={12} />}
                </button>
              </div>
            );
          })}
        </div>
        
        {/* AI Agent Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onAIAgentClick}
                className="h-7 text-xs font-medium transition-colors mr-1 shrink-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                AI Assistant
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Open AI Assistant (Ctrl+K)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative">
        {isReadOnly && (
          <div className="absolute top-2 right-4 z-10 bg-yellow-500/20 text-yellow-300 text-xs font-bold px-2 py-1 rounded-full">
            Read-Only Mode
          </div>
        )}
        <Editor
          height="100%"
          language={getLanguage(activeFile)}
          value={fileContents[activeFile] || ""}
          onChange={onChange}
          beforeMount={(monaco) => {
            setIsEditorLoading(true);
            monaco.editor.defineTheme('custom-dynamic', getDynamicTheme());
          }}
          onMount={handleEditorDidMount}
          theme="custom-dynamic"
          loading=""
          options={{
            readOnly: isReadOnly,
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Inconsolata', 'Consolas', 'Monaco', 'Courier New', monospace",
            fontLigatures: true,
            lineHeight: 22,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            tabSize: 2,
            insertSpaces: true,
            wordWrap: "on",
            renderLineHighlight: "all",
            renderWhitespace: "none",
            bracketPairColorization: {
              enabled: true,
            },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;