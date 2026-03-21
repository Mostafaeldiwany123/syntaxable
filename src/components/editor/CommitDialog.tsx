import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Upload, FileText } from 'lucide-react';
import { getFileIconUrl } from '@/lib/project-utils';

interface CommitDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onCommit: (message: string) => void;
    isCommitting: boolean;
    uncommittedFiles: string[];
}

export const CommitDialog = ({ isOpen, onOpenChange, onCommit, isCommitting, uncommittedFiles }: CommitDialogProps) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        onCommit(message);
        setMessage('');
    };

    // Reset message when dialog closes
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setMessage('');
        }
        onOpenChange(open);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Commit Changes
                    </DialogTitle>
                    <DialogDescription>
                        Enter a message to describe the changes you've made.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="py-4 space-y-4">
                        {/* File List */}
                        {uncommittedFiles.length > 0 && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    {uncommittedFiles.length} file{uncommittedFiles.length !== 1 ? 's' : ''} to commit
                                </label>
                                <ScrollArea className="h-[120px] rounded-md border border-border bg-secondary/30">
                                    <div className="p-2 space-y-1">
                                        {uncommittedFiles.map((filePath) => {
                                            const fileName = filePath.split('/').pop() || filePath;
                                            return (
                                                <div 
                                                    key={filePath}
                                                    className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-secondary/50"
                                                >
                                                    <img 
                                                        src={getFileIconUrl(fileName)} 
                                                        alt="" 
                                                        className="w-4 h-4 shrink-0" 
                                                    />
                                                    <span className="text-sm truncate">{filePath}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                        
                        {/* Commit Message */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                                Commit message
                            </label>
                            <Input
                                placeholder="e.g., Implement user authentication"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={isCommitting || !message.trim()}>
                            {isCommitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Upload className="mr-2 h-4 w-4" />
                            Commit {uncommittedFiles.length} file{uncommittedFiles.length !== 1 ? 's' : ''}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};