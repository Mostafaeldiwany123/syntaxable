import React, { useState, useMemo, useCallback } from 'react';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import FileExplorer, { FileNode } from '../editor/FileExplorer';
import CodeEditor from '../editor/CodeEditor';
import CompilationOutput from '../editor/CompilationOutput';
import PreviewPanel from '../editor/PreviewPanel';
import StatusBar from '../editor/StatusBar';
import { AIAgentPanel, AIAgentButton } from '@/components/ai-agent';
import { FileData } from '@/compilers/types';
import { ProjectType } from '@/hooks/projects';

interface MainLayoutProps {
    files: FileNode[];
    openFiles: string[];
    activeFile: string | null;
    fileContents: Record<string, string>;
    savedFileContents: Record<string, string>;
    dirtyFiles: Set<string>;
    uncommittedFiles: Set<string>;
    onFileSelect: (path: string) => void;
    onTabClick: (path: string) => void;
    onTabClose: (path: string) => void;
    onNewFile: () => void;
    onNewFolder: () => void;
    onRenameFile: (oldPath: string, newPath: string) => void;
    onDeleteFile: (path: string) => void;
    onCodeChange: (value: string | undefined) => void;
    currentUser: { username: string; avatar_url: string; status: string; } | null;
    connectedUsers: any[];
    globalTypingUsers?: { id: string; username: string; avatar_url: string; }[];
    isReadOnly?: boolean;
    onSaveClick: () => void;
    onCommitClick: () => void;
    onRestoreClick?: () => void;
    onHistoryClick: () => void;
    projectType: ProjectType | null;
    isSaving?: boolean;
}

const MainLayout = (props: MainLayoutProps) => {
    const {
        files,
        openFiles,
        activeFile,
        fileContents,
        savedFileContents,
        dirtyFiles,
        uncommittedFiles,
        onFileSelect,
        onTabClick,
        onTabClose,
        onNewFile,
        onNewFolder,
        onRenameFile,
        onDeleteFile,
        onCodeChange,
        currentUser,
        connectedUsers,
        globalTypingUsers,
        isReadOnly = false,
        onSaveClick,
        onCommitClick,
        onRestoreClick,
        onHistoryClick,
        projectType,
        isSaving = false,
    } = props;

    const [isCompilationOutputOpen, setIsCompilationOutputOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAIAgentOpen, setIsAIAgentOpen] = useState(false);
    const isMobile = useIsMobile();

    const projectName = activeFile
        ? activeFile.split('/')[0] || activeFile
        : 'Collaborative Project';

    // Convert savedFileContents to FileData array for preview - memoized
    const fileDataArray: FileData[] = useMemo(() => {
        return Object.entries(savedFileContents).map(([name, content]) => ({
            name,
            content
        }));
    }, [savedFileContents]);

    const handleRunCode = () => {
        // Use project type to determine if terminal or preview should be used
        const shouldUseTerminal = useTerminalForProject(fileDataArray);
        if (shouldUseTerminal) {
            setIsCompilationOutputOpen(true);
            setIsPreviewOpen(false);
        } else {
            setIsPreviewOpen(true);
            setIsCompilationOutputOpen(false);
        }
    };

    const handleAIAgentClick = () => {
        setIsAIAgentOpen(!isAIAgentOpen);
    };

    const getLanguageFromFile = (fileName: string): string => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        const langMap: Record<string, string> = {
            'js': 'javascript', 'jsx': 'javascript', 'ts': 'typescript',
            'tsx': 'typescript', 'css': 'css', 'html': 'html',
            'json': 'json', 'md': 'markdown', 'py': 'python',
            'cpp': 'cpp', 'c': 'c', 'cs': 'csharp', 'h': 'cpp', 'java': 'java',
        };
        return langMap[ext || ''] || 'plaintext';
    };

    const handleMobileFileSelect = (path: string) => {
        onFileSelect(path);
        setIsSidebarOpen(false);
    };

    // Determine if this project should show terminal or preview
    const shouldShowTerminal = useTerminalForProject(fileDataArray);

    if (isMobile) {
        return (
            <div className="h-dvh w-full bg-background flex flex-col overflow-hidden text-foreground font-sans">
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                    <SheetContent side="left" className="p-0 w-[80vw] bg-card border-r border-border">
                        <FileExplorer
                            files={files}
                            onFileSelect={handleMobileFileSelect}
                            onNewFile={onNewFile}
                            onNewFolder={onNewFolder}
                            onRenameFile={onRenameFile}
                            onDeleteFile={onDeleteFile}
                            activeFile={activeFile}
                            isReadOnly={isReadOnly}
                            dirtyFiles={dirtyFiles}
                            uncommittedFiles={uncommittedFiles}
                        />
                    </SheetContent>
                </Sheet>

                <div className="flex items-center p-2 border-b border-border h-12">
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <span className="font-semibold ml-2 text-sm truncate">{projectName}</span>
                </div>

                <div className="flex-1 relative overflow-hidden">
                    <CodeEditor
                        openFiles={openFiles}
                        activeFile={activeFile}
                        fileContents={fileContents}
                        dirtyFiles={dirtyFiles}
                        onChange={onCodeChange}
                        onTabClick={onTabClick}
                        onTabClose={onTabClose}
                        isReadOnly={isReadOnly}
                        onAIAgentClick={handleAIAgentClick}
                    />
                    {shouldShowTerminal && (
                        <CompilationOutput
                            isOpen={isCompilationOutputOpen}
                            onClose={() => setIsCompilationOutputOpen(false)}
                            code={activeFile ? fileContents[activeFile] || "" : ""}
                            language={activeFile ? getLanguageFromFile(activeFile) : "plaintext"}
                            fileName={activeFile ? activeFile.split('/').pop() || "unknown" : "unknown"}
                        />
                    )}
                </div>

                <StatusBar
                    currentUser={currentUser}
                    connectedUsers={connectedUsers}
                    projectName={projectName}
                    typingUsers={globalTypingUsers}
                    onRunCode={handleRunCode}
                    isReadOnly={isReadOnly}
                    hasDirtyFiles={dirtyFiles.size > 0}
                    hasUncommittedFiles={uncommittedFiles.size > 0}
                    onSaveClick={onSaveClick}
                    onCommitClick={onCommitClick}
                    onHistoryClick={onHistoryClick}
                    onRestoreClick={onRestoreClick}
                    projectType={projectType}
                    isSaving={isSaving}
                />
            </div>
        );
    }

    return (
        <div className="h-dvh w-full bg-background flex flex-col overflow-hidden text-foreground font-sans">
            <div className="flex-1 overflow-hidden">
                <ResizablePanelGroup direction="horizontal">
                    {/* File Explorer - Fixed width, won't change when AI agent opens */}
                    <ResizablePanel 
                        defaultSize={15} 
                        minSize={15} 
                        maxSize={15} 
                        className="bg-card border-r border-border"
                    >
                        <FileExplorer
                            files={files}
                            onFileSelect={onFileSelect}
                            onNewFile={onNewFile}
                            onNewFolder={onNewFolder}
                            onRenameFile={onRenameFile}
                            onDeleteFile={onDeleteFile}
                            activeFile={activeFile}
                            isReadOnly={isReadOnly}
                            dirtyFiles={dirtyFiles}
                            uncommittedFiles={uncommittedFiles}
                        />
                    </ResizablePanel>
                    <ResizableHandle className="bg-border w-[1px] hover:bg-primary transition-all" />
                    
                    {/* Main Editor Area */}
                    <ResizablePanel 
                        defaultSize={isPreviewOpen ? 55 : (isAIAgentOpen ? 60 : 85)} 
                        minSize={30} 
                        maxSize={85} 
                        className="relative flex flex-col"
                    >
                        <CodeEditor
                            openFiles={openFiles}
                            activeFile={activeFile}
                            fileContents={fileContents}
                            dirtyFiles={dirtyFiles}
                            onChange={onCodeChange}
                            onTabClick={onTabClick}
                            onTabClose={onTabClose}
                            isReadOnly={isReadOnly}
                            onAIAgentClick={handleAIAgentClick}
                        />
                        
                        {shouldShowTerminal && (
                            <CompilationOutput
                                isOpen={isCompilationOutputOpen}
                                onClose={() => setIsCompilationOutputOpen(false)}
                                code={activeFile ? fileContents[activeFile] || "" : ""}
                                language={activeFile ? getLanguageFromFile(activeFile) : "plaintext"}
                                fileName={activeFile ? activeFile.split('/').pop() || "unknown" : "unknown"}
                            />
                        )}
                    </ResizablePanel>
                    
                    {/* Preview Panel */}
                    {!shouldShowTerminal && isPreviewOpen && (
                        <>
                            <ResizableHandle className="bg-border w-[1px] hover:bg-primary transition-all" />
                            <ResizablePanel defaultSize={40} minSize={20} maxSize={60}>
                                <PreviewPanel
                                    isOpen={isPreviewOpen}
                                    onClose={() => setIsPreviewOpen(false)}
                                    files={fileDataArray}
                                    activeFile={activeFile || ''}
                                />
                            </ResizablePanel>
                        </>
                    )}

                    {/* AI Agent Panel */}
                    {isAIAgentOpen && (
                        <>
                            <ResizableHandle className="bg-border w-[1px] hover:bg-primary transition-all" />
                            <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
                                <AIAgentPanel
                                    isOpen={true}
                                    onClose={() => setIsAIAgentOpen(false)}
                                    getChatContext={() => ({
                                        type: 'project',
                                        code: activeFile ? fileContents[activeFile] : undefined,
                                        language: activeFile ? getLanguageFromFile(activeFile) : undefined,
                                        fileName: activeFile || undefined,
                                        files: Object.entries(fileContents).map(([name, content]) => ({ name, content })),
                                    })}
                                />
                            </ResizablePanel>
                        </>
                    )}
                </ResizablePanelGroup>
            </div>
            <StatusBar
                currentUser={currentUser}
                connectedUsers={connectedUsers}
                projectName={projectName}
                typingUsers={globalTypingUsers}
                onRunCode={handleRunCode}
                isReadOnly={isReadOnly}
                hasDirtyFiles={dirtyFiles.size > 0}
                hasUncommittedFiles={uncommittedFiles.size > 0}
                onSaveClick={onSaveClick}
                onCommitClick={onCommitClick}
                onRestoreClick={onRestoreClick}
                onHistoryClick={onHistoryClick}
                projectType={projectType}
                isSaving={isSaving}
            />
        </div>
    );
};

// Helper function to detect if terminal should be used
function useTerminalForProject(files: FileData[]): boolean {
    const hasReact = files.some(f => f.name.endsWith('.tsx') || f.name.endsWith('.jsx'));
    if (hasReact) return false;
    
    const hasHtml = files.some(f => f.name.endsWith('.html') || f.name.endsWith('.htm'));
    if (hasHtml) return false;
    
    return true;
}

export default MainLayout;