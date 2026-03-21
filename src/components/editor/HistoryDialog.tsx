import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, GitCommit, ArrowLeft, Clock, User, FileText } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { useFileHistory } from '@/hooks/files';
import { diffLines } from 'diff';
import { DiffEditor, useMonaco } from '@monaco-editor/react';
import { getDynamicTheme } from '@/lib/editor-theme';
import { Button } from '@/components/ui/button';

interface HistoryDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    fileId: string | null;
    fileName: string | null;
}

const getDiffStats = (oldStr: string, newStr: string) => {
    const changes = diffLines(oldStr, newStr);
    let added = 0;
    let removed = 0;
    changes.forEach(part => {
        if (part.added) added += part.count || 0;
        if (part.removed) removed += part.count || 0;
    });
    return { added, removed };
};

const getLanguageFromFile = (fileName: string | null): string => {
    if (!fileName) return 'plaintext';
    const ext = fileName.split('.').pop()?.toLowerCase();
    const langMap: Record<string, string> = {
        'js': 'javascript', 'jsx': 'javascript', 'ts': 'typescript',
        'tsx': 'typescript', 'css': 'css', 'html': 'html',
        'json': 'json', 'md': 'markdown', 'py': 'python',
        'cpp': 'cpp', 'c': 'c', 'h': 'cpp', 'java': 'java',
    };
    return langMap[ext || ''] || 'plaintext';
};

export const HistoryDialog = ({ isOpen, onOpenChange, fileId, fileName }: HistoryDialogProps) => {
    const { data: history, isLoading } = useFileHistory(fileId);
    const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);

    useEffect(() => {
        if (history && history.length > 0 && !selectedVersionId) {
            setSelectedVersionId(history[0].id);
        }
        if (!isOpen) {
            setSelectedVersionId(null);
        }
    }, [history, selectedVersionId, isOpen]);

    const selectedVersion = history?.find(v => v.id === selectedVersionId);
    const previousVersionIndex = history?.findIndex(v => v.id === selectedVersionId) ?? -1;
    const previousVersion = history && previousVersionIndex > -1 ? history[previousVersionIndex + 1] : null;

    // Handle theme changes for Monaco
    const monaco = useMonaco();
    useEffect(() => {
        const handleThemeChange = () => {
            if (monaco) {
                monaco.editor.defineTheme('custom-dynamic', getDynamicTheme());
                monaco.editor.setTheme('custom-dynamic');
            }
        };
        handleThemeChange(); // Initial set
        window.addEventListener('themeChanged', handleThemeChange);
        return () => window.removeEventListener('themeChanged', handleThemeChange);
    }, [monaco]);

    // Reset state when dialog closes to trigger proper cleanup
    useEffect(() => {
        if (!isOpen) {
            // Force unmount of DiffEditor by clearing selection
            setSelectedVersionId(null);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[100vw] w-[100vw] h-[100vh] p-0 m-0 flex flex-col bg-background border-0 [&>button]:hidden overflow-hidden gap-0">
                <DialogTitle className="sr-only">Commit History</DialogTitle>
                {/* Header with Back Button */}
                <div className="bg-card px-6 py-4 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onOpenChange(false)}
                                className="gap-2 text-muted-foreground hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Editor
                            </Button>
                            <div className="h-6 w-px bg-border" />
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <span className="text-lg font-semibold text-foreground">{fileName || 'File'}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{history?.length || 0} commits</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden bg-card">
                    {/* Commits List - Left Side */}
                    <div className="w-96 border-r border-border bg-card flex flex-col overflow-hidden">
                        <div className="bg-card px-6 py-4">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Commit History</h3>
                        </div>
                        <ScrollArea className="flex-1">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-full">
                                    <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
                                </div>
                            ) : (
                                <div className="divide-y divide-border">
                                    {history?.map((version, index) => {
                                        const prevContent = history[index + 1]?.content || '';
                                        const stats = getDiffStats(prevContent, version.content);
                                        const isSelected = selectedVersionId === version.id;
                                        
                                        return (
                                            <div
                                                key={version.id}
                                                onClick={() => setSelectedVersionId(version.id)}
                                                className={`px-4 py-3 cursor-pointer transition-colors ${
                                                    isSelected 
                                                        ? 'bg-primary/10 border-l-2 border-l-primary' 
                                                        : 'hover:bg-secondary/50 border-l-2 border-l-transparent'
                                                }`}
                                            >
                                                {/* Top Row: Commit Message + Stats */}
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className={`h-2 w-2 rounded-full flex-shrink-0 ${
                                                        isSelected ? 'bg-primary' : 'bg-muted-foreground/30'
                                                    }`} />
                                                    <p className={`font-medium text-sm leading-tight flex-1 truncate ${
                                                        isSelected ? 'text-primary' : 'text-foreground'
                                                    }`}>
                                                        {version.commit_message}
                                                    </p>
                                                    <div className="flex items-center gap-1 flex-shrink-0">
                                                        {stats.added > 0 && (
                                                            <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                                                +{stats.added}
                                                            </span>
                                                        )}
                                                        {stats.removed > 0 && (
                                                            <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                                                                -{stats.removed}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Bottom Row: Avatar + Username + Time */}
                                                <div className="flex items-center justify-between ml-4">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <Avatar className="h-4 w-4">
                                                            <AvatarImage src={version.avatar_url} />
                                                            <AvatarFallback className="text-[8px] bg-secondary">
                                                                {version.username?.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-xs text-muted-foreground truncate">{version.username}</span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground flex-shrink-0">
                                                        {formatDistanceToNow(new Date(version.created_at), { addSuffix: true })}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </ScrollArea>
                    </div>

                    {/* Diff View - Right Side */}
                    <div className="flex-1 flex flex-col bg-card overflow-hidden">
                        {selectedVersion ? (
                            <>
                                {/* Commit Details Header */}
                                <div className="border-b border-border bg-card px-6 py-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h2 className="text-lg font-semibold text-foreground mb-2">
                                                {selectedVersion.commit_message}
                                            </h2>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    <span>{selectedVersion.username}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{format(new Date(selectedVersion.created_at), 'MMM d, yyyy h:mm a')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {(() => {
                                                const prevContent = previousVersion?.content || '';
                                                const stats = getDiffStats(prevContent, selectedVersion.content);
                                                return (
                                                    <>
                                                        <div className="flex items-center gap-1 px-3 py-1 bg-green-500/15 text-green-600 dark:text-green-400 rounded text-sm font-semibold">
                                                            +{stats.added}
                                                        </div>
                                                        <div className="flex items-center gap-1 px-3 py-1 bg-red-500/15 text-red-600 dark:text-red-400 rounded text-sm font-semibold">
                                                            -{stats.removed}
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </div>

                                {/* Diff Editor */}
                                <div className="flex-1 overflow-hidden">
                                    <DiffEditor
                                        height="100%"
                                        language={getLanguageFromFile(fileName)}
                                        original={previousVersion?.content || ''}
                                        modified={selectedVersion.content}
                                        theme="custom-dynamic"
                                        beforeMount={(monaco) => {
                                            monaco.editor.defineTheme('custom-dynamic', getDynamicTheme());
                                        }}
                                        options={{
                                            readOnly: true,
                                            renderSideBySide: false,
                                            wordWrap: 'on',
                                            minimap: { enabled: false },
                                            scrollBeyondLastLine: false,
                                            fontFamily: "'Inconsolata', 'Consolas', 'Monaco', 'Courier New', monospace",
                                            fontSize: 14,
                                            lineHeight: 22,
                                            letterSpacing: 0.5,
                                            renderLineHighlight: 'all',
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-secondary/30">
                                <GitCommit className="h-16 w-16 mb-4 opacity-50" />
                                <p className="text-lg font-medium">Select a commit to see changes</p>
                                <p className="text-sm mt-2 opacity-70">Choose a commit from the list on the left</p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};