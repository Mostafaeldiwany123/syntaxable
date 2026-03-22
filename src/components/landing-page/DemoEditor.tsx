import { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { getDynamicTheme } from '@/lib/editor-theme';
import { 
  ChevronRight, 
  ChevronDown, 
  FilePlus, 
  FolderPlus, 
  Folder, 
  FolderOpen,
  FileCode,
  Layout,
  Terminal,
  Play,
  Save,
  Clock,
  Settings,
  MoreVertical,
  X,
  Loader2
} from 'lucide-react';
import { getFileIconUrl } from '@/lib/project-utils';
import CompilationOutput from '@/components/editor/CompilationOutput';

interface DemoEditorProps {

  initialCode?: string;
  language?: string;
  height?: string;
  showTabs?: boolean;
  fileName?: string;
}

const mockFiles = [
  { name: 'src', type: 'folder', isOpen: true, children: [
    { name: 'main.cpp', type: 'file', isActive: true },
    { name: 'utils.h', type: 'file', isActive: false },
  ]},

  { name: 'README.md', type: 'file', isActive: false },
];


export const DemoEditor = ({ 
  initialCode = '', 
  language = 'cpp',
  height = '400px',
  showTabs = true,
  fileName = 'main.cpp'
}: DemoEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const handleRunCode = () => {
    setIsTerminalOpen(true);
  };

  return (
    <div className="flex rounded-2xl border border-border bg-background overflow-hidden shadow-2xl h-[550px] relative">

      {/* Sidebar / File Explorer */}
      <div className="w-56 border-r border-border bg-card flex flex-col shrink-0 overflow-hidden select-none">
        <div className="h-11 px-4 flex items-center justify-between border-b border-border bg-card shadow-sm text-muted-foreground/50">
          <span className="text-[11px] font-semibold uppercase tracking-widest">Explorer</span>
        </div>
        
        <div className="p-1 mt-1">
          <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-foreground">
            <ChevronDown size={14} />
            <span className="uppercase tracking-tighter">syntaxable</span>
          </div>
          
          <div className="mt-0.5">
            {mockFiles.map((item, idx) => (
              <div key={idx}>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 text-xs cursor-pointer transition-colors ${item.isActive ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/40'}`}>
                  {item.type === 'folder' ? (
                    <>
                      <ChevronDown size={14} />
                      <FolderOpen size={14} className="text-blue-400 fill-blue-400/10" />
                    </>
                  ) : (
                    <>
                      <div className="w-[14px]" />
                      <img src={getFileIconUrl(item.name)} alt="" className="w-3.5 h-3.5" />
                    </>
                  )}
                  <span>{item.name}</span>
                </div>
                {item.children?.map((child, cIdx) => (
                  <div key={cIdx} className={`flex items-center gap-1.5 px-7 py-1.5 text-xs cursor-pointer transition-colors ${child.isActive ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/40'}`}>
                    <img src={getFileIconUrl(child.name)} alt="" className="w-3.5 h-3.5" />
                    <span>{child.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background relative">
        {/* Tab Bar / Header */}
        <div className="h-11 px-2 flex items-center justify-between border-b border-border bg-card overflow-hidden select-none">
          <div className="flex items-center h-full">
            <div className="flex items-center gap-2 px-3 h-full border-r border-border bg-background text-[13px] text-foreground border-t-2 border-t-primary cursor-default min-w-[120px]">
              <img src={getFileIconUrl(fileName)} alt="" className="w-4 h-4" />
              <span>{fileName}</span>
              <X size={14} className="ml-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded p-0.5 transition-all" />
            </div>
            <div className="flex items-center gap-2 px-3 h-full border-r border-border opacity-60 text-[13px] text-muted-foreground hover:bg-secondary/30 transition-colors cursor-pointer min-w-[120px]">
              <img src={getFileIconUrl('utils.h')} alt="" className="w-4 h-4" />
              <span>utils.h</span>
              <X size={14} className="ml-2 text-muted-foreground opacity-0 group-hover:opacity-100" />
            </div>
          </div>

          {/* Header Action: Run Code */}
          <div className="flex items-center pr-2">
            <button 
              onClick={handleRunCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 group text-xs whitespace-nowrap"
            >
              <Play size={12} fill="currentColor" className="transition-transform group-hover:translate-x-0.5" />
              Run Code
            </button>
          </div>
        </div>


        {/* Editor Body */}
        <div className="flex-1 overflow-hidden relative group">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            beforeMount={(monaco) => {
              monaco.editor.defineTheme('custom-dynamic', getDynamicTheme());
            }}
            onMount={(editor, monaco) => {
              monaco.editor.defineTheme('custom-dynamic', getDynamicTheme());
              monaco.editor.setTheme('custom-dynamic');
            }}
            theme="custom-dynamic"
            loading=""
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: "'Inconsolata', 'Consolas', 'Monaco', 'Courier New', monospace",
              fontLigatures: true,
              lineHeight: 20,
              padding: { top: 16, bottom: 16 },
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
              scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
                alwaysConsumeMouseWheel: false,
              },

            }}
          />

          {/* Real Compiler Output - Absolute positioned at the bottom of the editor body */}
          {isTerminalOpen && (
            <div className="absolute inset-x-0 bottom-0 z-50 transition-all border-t border-border bg-card shadow-2xl">
              <CompilationOutput
                isOpen={isTerminalOpen}
                onClose={() => setIsTerminalOpen(false)}
                code={code}
                language={language}
                fileName={fileName}
              />
            </div>
          )}
        </div>

        {/* Mock Status Bar */}
        <div className="h-7 border-t border-border bg-card px-3 flex items-center justify-between text-[11px] text-muted-foreground shrink-0 select-none">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-primary">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Connected
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              Last saved 2m ago
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span>{language.toUpperCase()}</span>
            <span>UTF-8</span>
            <div className="flex items-center gap-1">
              <Settings size={12} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DemoEditor;


