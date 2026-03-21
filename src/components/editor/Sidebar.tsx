import { FileTree } from "./FileTree";
import { UserFooter } from "./UserFooter";
import { Button } from "@/components/ui/button";
import { Plus, FolderPlus } from "lucide-react";
import type { User } from "@supabase/supabase-js";

type FileNode = {
  path: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
};

interface SidebarProps {
  tree: FileNode[];
  currentUser: User | null;
  activeFile: string | null;
  onFileSelect: (path: string) => void;
  onNewFile: () => void;
  onNewFolder: () => void;
}

export const Sidebar = ({
  tree,
  currentUser,
  activeFile,
  onFileSelect,
  onNewFile,
  onNewFolder,
}: SidebarProps) => {
  return (
    <div className="h-full bg-sidebar-DEFAULT flex flex-col text-sm">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-foreground tracking-wide mb-4">
          File Explorer
        </h2>
        <div className="flex items-center space-x-2">
          <Button onClick={onNewFile} className="w-full bg-primary/90 hover:bg-primary text-primary-foreground">
            <Plus size={16} className="mr-2" /> New File
          </Button>
          <Button onClick={onNewFolder} variant="secondary" size="icon">
            <FolderPlus size={16} />
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto px-2">
        <FileTree tree={tree} activeFile={activeFile} onFileSelect={onFileSelect} />
      </div>
      <UserFooter user={currentUser} />
    </div>
  );
};