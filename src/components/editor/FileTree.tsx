import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Folder, ChevronRight, ChevronDown } from "lucide-react";
import { FileIcon } from "./FileIcon";
import { cn } from "@/lib/utils";

type FileNode = {
  path: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
};

interface TreeNodeProps {
  node: FileNode;
  activeFile: string | null;
  onFileSelect: (path: string) => void;
}

const TreeNode = ({ node, activeFile, onFileSelect }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const NodeContent = () => {
    if (node.type === "folder") {
      return (
        <CollapsibleTrigger className="flex items-center space-x-1 py-1 px-2 rounded-md hover:bg-secondary w-full text-left">
          {isOpen ? (
            <ChevronDown size={14} className="shrink-0" />
          ) : (
            <ChevronRight size={14} className="shrink-0" />
          )}
          <Folder size={16} className="text-yellow-500 shrink-0" />
          <span>{node.name}</span>
        </CollapsibleTrigger>
      );
    }
    return (
      <div
        onClick={() => onFileSelect(node.path)}
        className={cn(
          "flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-secondary cursor-pointer",
          node.path === activeFile && "bg-secondary",
        )}
      >
        <FileIcon filename={node.name} />
        <span>{node.name}</span>
      </div>
    );
  };

  if (node.type === "folder") {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <ContextMenu>
          <ContextMenuTrigger>
            <NodeContent />
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Rename</ContextMenuItem>
            <ContextMenuItem>Delete Folder</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <CollapsibleContent>
          <div className="pl-4 border-l border-border ml-2">
            {node.children?.map((child) => (
              <TreeNode
                key={child.path}
                node={child}
                activeFile={activeFile}
                onFileSelect={onFileSelect}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="ml-3">
          <NodeContent />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuItem>Delete File</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const FileTree = ({
  tree,
  activeFile,
  onFileSelect,
}: {
  tree: FileNode[];
  activeFile: string | null;
  onFileSelect: (path: string) => void;
}) => {
  return (
    <div className="space-y-1">
      {tree?.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          activeFile={activeFile}
          onFileSelect={onFileSelect}
        />
      ))}
    </div>
  );
};