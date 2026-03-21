import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Search, UserPlus } from 'lucide-react';
import { useRoomParticipants, useSearchUsers, useSetUserPermission, RoomParticipant } from '@/hooks/permissions';
import { useDebounce } from '@/hooks/use-debounce';

interface ManagePermissionsDialogProps {
    roomId: string;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export const ManagePermissionsDialog = ({ roomId, isOpen, onOpenChange }: ManagePermissionsDialogProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const { data: participants, isLoading: isLoadingParticipants } = useRoomParticipants(roomId);
    const { data: searchResults, isLoading: isLoadingSearch } = useSearchUsers(debouncedSearchTerm, roomId);
    const { mutate: setPermission, isPending: isSettingPermission } = useSetUserPermission();

    const handlePermissionChange = (userId: string, level: 'editor' | 'viewer') => {
        setPermission({ roomId, userId, level });
    };

    const handleAddUser = (userId: string) => {
        setPermission({ roomId, userId, level: 'viewer' }, {
            onSuccess: () => setSearchTerm('')
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Manage Access</DialogTitle>
                    <DialogDescription>Invite users and manage their permissions for this project.</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search for users to invite..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <ScrollArea className="h-[400px] mt-4 pr-4">
                    {debouncedSearchTerm && (
                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Search Results</h3>
                            {isLoadingSearch && <Loader2 className="animate-spin" />}
                            {searchResults && searchResults.length === 0 && !isLoadingSearch && <p className="text-sm text-muted-foreground">No users found.</p>}
                            <div className="space-y-2">
                                {searchResults?.map(user => (
                                    <div key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user.avatar_url} />
                                                <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{user.username}</span>
                                        </div>
                                        <Button size="sm" variant="outline" onClick={() => handleAddUser(user.id)} disabled={isSettingPermission}>
                                            <UserPlus className="h-4 w-4 mr-2" /> Invite
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Project Members</h3>
                        {isLoadingParticipants && <Loader2 className="animate-spin" />}
                        <div className="space-y-2">
                            {participants?.map(p => (
                                <ParticipantRow key={p.user_id} participant={p} onPermissionChange={handlePermissionChange} disabled={isSettingPermission} />
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

const ParticipantRow = ({ participant, onPermissionChange, disabled }: { participant: RoomParticipant, onPermissionChange: (userId: string, level: 'editor' | 'viewer') => void, disabled: boolean }) => {
    return (
        <div className="flex items-center justify-between p-2 rounded-md hover:bg-secondary">
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={participant.avatar_url} />
                    <AvatarFallback>{participant.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{participant.username}</span>
            </div>
            <Select
                value={participant.permission_level}
                onValueChange={(value: 'editor' | 'viewer') => onPermissionChange(participant.user_id, value)}
                disabled={disabled}
            >
                <SelectTrigger className="w-[120px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};