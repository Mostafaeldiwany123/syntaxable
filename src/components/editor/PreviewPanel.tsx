import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, RefreshCw, Loader2, ExternalLink, Smartphone, Monitor, Play } from 'lucide-react';
import { detectCompiler, FileData } from '@/compilers';

interface PreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileData[];
  activeFile: string;
  onRefresh?: () => void;
}

// Detect project type based on ALL files in the project
const detectProjectType = (allFiles: FileData[]): { type: 'react' | 'html' | 'python' | null; entryFile: string | null } => {
  const hasReact = allFiles.some(f => f.name.endsWith('.tsx') || f.name.endsWith('.jsx'));
  const hasHtml = allFiles.some(f => f.name.endsWith('.html') || f.name.endsWith('.htm'));
  const hasPython = allFiles.some(f => f.name.endsWith('.py'));
  
  // Priority: React > HTML > Python
  if (hasReact) {
    const appFile = allFiles.find(f => 
      f.name === 'App.tsx' || f.name === 'App.jsx' ||
      f.name.endsWith('/App.tsx') || f.name.endsWith('/App.jsx')
    );
    if (appFile) return { type: 'react', entryFile: appFile.name };
    
    const indexFile = allFiles.find(f => 
      f.name === 'index.tsx' || f.name === 'index.jsx' ||
      f.name.endsWith('/index.tsx') || f.name.endsWith('/index.jsx')
    );
    if (indexFile) return { type: 'react', entryFile: indexFile.name };
    
    const firstReact = allFiles.find(f => 
      f.name.endsWith('.tsx') || f.name.endsWith('.jsx') ||
      f.name.endsWith('.ts') || f.name.endsWith('.js')
    );
    if (firstReact) return { type: 'react', entryFile: firstReact.name };
  }
  
  if (hasHtml) {
    const indexHtml = allFiles.find(f => 
      f.name === 'index.html' || f.name.endsWith('/index.html')
    );
    if (indexHtml) return { type: 'html', entryFile: indexHtml.name };
    
    const firstHtml = allFiles.find(f => 
      f.name.endsWith('.html') || f.name.endsWith('.htm')
    );
    if (firstHtml) return { type: 'html', entryFile: firstHtml.name };
  }
  
  if (hasPython) {
    const mainPy = allFiles.find(f => 
      f.name === 'main.py' || f.name.endsWith('/main.py')
    );
    if (mainPy) return { type: 'python', entryFile: mainPy.name };
    
    const firstPy = allFiles.find(f => f.name.endsWith('.py'));
    if (firstPy) return { type: 'python', entryFile: firstPy.name };
  }
  
  return { type: null, entryFile: null };
};

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  isOpen,
  onClose,
  files,
  activeFile,
  onRefresh
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<{ type: 'react' | 'html' | 'python' | null; entryFile: string | null }>({ type: null, entryFile: null });
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Detect project type when files change
  useEffect(() => {
    if (isOpen && files.length > 0) {
      const detected = detectProjectType(files);
      setProjectType(detected);
    }
  }, [isOpen, files]);

  // Render preview - silent updates (no loader)
  useEffect(() => {
    if (!isOpen || !projectType.entryFile || !containerRef.current) return;

    const compiler = detectCompiler(projectType.entryFile);
    if (!compiler || compiler.useTerminal || !compiler.renderPreview) return;

    // Silent render - no loading spinner
    setError(null);

    try {
      if (containerRef.current && compiler.renderPreview) {
        containerRef.current.innerHTML = '';
        compiler.renderPreview(containerRef.current, files, projectType.entryFile);
      }
      setIsFirstLoad(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to render preview');
    }
  }, [isOpen, files, projectType]);

  // Manual refresh - shows loading spinner
  const handleManualRefresh = useCallback(() => {
    if (!projectType.entryFile || !containerRef.current) return;

    const compiler = detectCompiler(projectType.entryFile);
    if (!compiler || !compiler.renderPreview) return;

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        containerRef.current!.innerHTML = '';
        compiler.renderPreview(containerRef.current!, files, projectType.entryFile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to render preview');
      } finally {
        setIsLoading(false);
      }
    }, 200);
  }, [files, projectType]);

  const handleRerun = useCallback(() => {
    // Silent refresh - just trigger onRefresh callback
    onRefresh?.();
  }, [onRefresh]);

  const handleOpenExternal = () => {
    if (!projectType.entryFile) return;
    
    const compiler = detectCompiler(projectType.entryFile);
    if (!compiler || !compiler.renderPreview) return;

    const newWindow = window.open('', '_blank');
    if (newWindow && containerRef.current) {
      const iframe = containerRef.current.querySelector('iframe');
      if (iframe && iframe.contentDocument) {
        newWindow.document.write(iframe.contentDocument.documentElement.outerHTML);
        newWindow.document.close();
      }
    }
  };

  if (!isOpen) return null;

  const compiler = projectType.entryFile ? detectCompiler(projectType.entryFile) : null;
  if (!compiler || compiler.useTerminal) return null;

  return (
    <div className="h-full flex flex-col bg-white border-l border-border">
      {/* Header */}
      <div className="h-10 bg-card border-b border-border flex items-center justify-between px-3 select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground uppercase tracking-wide">Preview</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
            {projectType.entryFile || 'No entry file'}
          </span>
          {projectType.type && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">
              {projectType.type.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Mobile/Desktop Toggle */}
          <button
            onClick={() => setIsMobile(!isMobile)}
            className={`p-1.5 rounded transition-colors ${isMobile ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            title={isMobile ? 'Desktop View' : 'Mobile View'}
          >
            {isMobile ? <Smartphone size={14} /> : <Monitor size={14} />}
          </button>

          <div className="w-px h-4 bg-border mx-1" />

          <button
            onClick={handleRerun}
            className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
            title={projectType.type === 'react' || projectType.type === 'html' ? 'Preview' : 'Rerun (Silent)'}
          >
            <Play size={14} />
          </button>

          <button
            onClick={handleManualRefresh}
            disabled={isLoading}
            className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
            title="Refresh Preview"
          >
            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          </button>

          <button
            onClick={handleOpenExternal}
            className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
            title="Open in New Tab"
          >
            <ExternalLink size={14} />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
            title="Close Preview"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Preview Container */}
      <div 
        className="flex-1 overflow-hidden relative"
        style={{ 
          padding: isMobile ? '1rem' : '0',
          background: '#ffffff'
        }}
      >
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-20 p-4">
            <div className="text-center max-w-lg">
              <h2 className="text-lg font-semibold text-red-500 mb-2">Preview Error</h2>
              <pre className="text-sm text-left bg-gray-100 p-4 rounded overflow-auto max-h-64 whitespace-pre-wrap">{error}</pre>
              <button 
                onClick={handleManualRefresh}
                className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        
        {isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Refreshing...</p>
            </div>
          </div>
        )}
        
        <div 
          ref={containerRef}
          className={`h-full ${isMobile ? 'max-w-[375px] mx-auto border-x border-border shadow-lg' : ''}`}
          style={{ background: '#ffffff' }}
        />
      </div>
    </div>
  );
};

export default PreviewPanel;