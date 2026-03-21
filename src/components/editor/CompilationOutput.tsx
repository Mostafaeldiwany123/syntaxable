import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, RefreshCw, Play, Trash2, Loader2 } from 'lucide-react';
import { compileFiles, useTerminal, detectCompiler, CompilerResult, InputAnalysis, DetectedInput } from '@/compilers';

interface TerminalLine {
  type: 'output' | 'input' | 'system' | 'error' | 'success';
  content: string;
}

interface CompilationOutputProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: string;
  fileName: string;
}

const CompilationOutput: React.FC<CompilationOutputProps> = ({
  isOpen,
  onClose,
  code,
  language,
  fileName
}) => {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { type: 'system', content: 'Ready to compile code.' }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [height, setHeight] = useState(300);
  const [isResizing, setIsResizing] = useState(false);

  // Interactive input state
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [inputAnalysis, setInputAnalysis] = useState<InputAnalysis | null>(null);
  const [collectedInputs, setCollectedInputs] = useState<string[]>([]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [currentInputValue, setCurrentInputValue] = useState('');

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Resize logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newHeight = window.innerHeight - e.clientY - 32;
      if (newHeight > 100 && newHeight < window.innerHeight - 100) {
        setHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ns-resize';
    } else {
      document.body.style.cursor = 'default';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [isResizing]);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLines, isWaitingForInput]);

  // Focus input when waiting
  useEffect(() => {
    if (isWaitingForInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isWaitingForInput, currentInputIndex]);

  const addLine = (content: string, type: TerminalLine['type'] = 'output') => {
    setTerminalLines(prev => [...prev, { type, content }]);
  };

  const clearTerminal = () => {
    setTerminalLines([{ type: 'system', content: 'Terminal cleared.' }]);
    setIsWaitingForInput(false);
    setInputAnalysis(null);
    setCollectedInputs([]);
    setCurrentInputIndex(0);
    setCurrentInputValue('');
  };

  // Handle interactive input submission
  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWaitingForInput || !inputAnalysis) return;

    const newCollectedInputs = [...collectedInputs, currentInputValue];
    setCollectedInputs(newCollectedInputs);
    setTerminalLines(prev => [...prev, { type: 'input', content: currentInputValue }]);
    setCurrentInputValue('');

    const nextIndex = currentInputIndex + 1;

    if (nextIndex < inputAnalysis.inputs.length) {
      // More inputs needed
      setCurrentInputIndex(nextIndex);
      setTerminalLines(prev => [...prev, { 
        type: 'system', 
        content: inputAnalysis.inputs[nextIndex].promptText 
      }]);
    } else {
      // All inputs collected, execute
      setIsWaitingForInput(false);
      executeWithInputs(newCollectedInputs);
    }
  };

  // Execute with collected inputs
  const executeWithInputs = async (inputs: string[]) => {
    const compiler = detectCompiler(fileName);
    if (!compiler?.compileWithStdin) {
      addLine('Compiler does not support interactive execution', 'error');
      setIsRunning(false);
      return;
    }

    const stdin = inputs.join('\n');

    try {
      const result: CompilerResult = await compiler.compileWithStdin(
        [{ name: fileName, content: code }], 
        fileName, 
        stdin
      );

      if (result.success) {
        if (result.output) {
          result.output.split('\n').forEach(line => {
            addLine(line, 'output');
          });
        }
        addLine('Execution completed successfully.', 'success');
      } else {
        if (result.error) {
          result.error.split('\n').forEach(line => {
            addLine(line, 'error');
          });
        }
        if (result.output) {
          result.output.split('\n').forEach(line => {
            addLine(line, 'output');
          });
        }
      }
    } catch (error) {
      addLine(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleRun = async () => {
    const compiler = detectCompiler(fileName);
    if (!compiler) {
      addLine(`No compiler found for ${fileName}`, 'error');
      return;
    }

    setIsRunning(true);
    setTerminalLines([
      { type: 'system', content: `Compiling ${fileName}...` }
    ]);
    setCollectedInputs([]);
    setCurrentInputIndex(0);

    // Check if code has interactive inputs (C/C++/C#)
    if (compiler.analyzeCode && (language === 'cpp' || language === 'c' || language === 'csharp')) {
      const analysis = compiler.analyzeCode(code);

      if (analysis.totalInputs > 0) {
        // Interactive mode - collect inputs first
        setInputAnalysis(analysis);
        setIsWaitingForInput(true);
        setTerminalLines(prev => [
          ...prev,
          { type: 'system', content: `Interactive mode: ${analysis.totalInputs} input(s) required.` },
          { type: 'system', content: analysis.inputs[0].promptText }
        ]);
        return; // Wait for inputs
      }
    }

    // Direct execution (no inputs needed)
    try {
      const result: CompilerResult = await compileFiles([{ name: fileName, content: code }], fileName);

      if (result.success) {
        if (result.output) {
          result.output.split('\n').forEach(line => {
            addLine(line, 'output');
          });
        }
        addLine('Execution completed successfully.', 'success');
      } else {
        if (result.error) {
          result.error.split('\n').forEach(line => {
            addLine(line, 'error');
          });
        }
        if (result.output) {
          result.output.split('\n').forEach(line => {
            addLine(line, 'output');
          });
        }
      }
    } catch (error) {
      addLine(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setIsRunning(false);
    }
  };

  // Auto-run when component opens with code
  useEffect(() => {
    if (isOpen && code.trim() && useTerminal(fileName)) {
      handleRun();
    }
  }, [isOpen]);

  const shouldUseTerminal = useTerminal(fileName);

  if (!isOpen || !shouldUseTerminal) return null;

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex flex-col"
      style={{ height: `${height}px` }}
    >
      {/* Resize Handle */}
      <div
        className="h-1 w-full cursor-ns-resize hover:bg-primary/50 absolute top-0 left-0 z-50 transition-colors"
        onMouseDown={() => setIsResizing(true)}
      />

      {/* Header */}
      <div className="h-9 bg-card border-b border-border flex items-center justify-between px-4 select-none">
        <div className="flex items-center gap-6 h-full">
          <div className="flex items-center gap-2 h-full border-b border-primary cursor-pointer px-1">
            <TerminalIcon size={12} />
            <span className="text-[11px] font-medium text-foreground uppercase tracking-wide">Terminal</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 mr-4 text-xs text-muted-foreground">
            <span>{language.toUpperCase()}</span>
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            title="Run"
          >
            {isRunning ? <Loader2 className="animate-spin" size={14} /> : <Play size={14} />}
          </button>

          <button
            onClick={clearTerminal}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            title="Clear Terminal"
          >
            <Trash2 size={14} />
          </button>

          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            title="Close Panel"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        className="flex-1 overflow-y-auto p-3 font-mono text-sm bg-card"
        style={{ fontFamily: "'Inconsolata', 'Consolas', 'Monaco', 'Courier New', monospace" }}
      >
        {terminalLines.map((line, idx) => (
          <div key={idx} className={`leading-6 ${
            line.type === 'error' ? 'text-destructive' :
            line.type === 'system' ? 'text-primary' :
            line.type === 'success' ? 'text-green-500' :
            line.type === 'input' ? 'text-green-400 font-bold' :
            'text-foreground'
          } whitespace-pre-wrap break-words`}>
            {line.content}
          </div>
        ))}

        {/* Interactive Input Field */}
        {isWaitingForInput && (
          <form onSubmit={handleInputSubmit} className="flex items-center gap-2 mt-1">
            <span className="text-green-400">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInputValue}
              onChange={(e) => setCurrentInputValue(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-muted-foreground font-mono"
              placeholder={`Enter input ${currentInputIndex + 1}/${inputAnalysis?.totalInputs || 1}`}
              autoComplete="off"
              autoFocus
            />
          </form>
        )}
        
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default CompilationOutput;