import { FileIcon } from "./FileIcon";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorHeaderProps {
  openFiles: string[];
  activeFile: string | null;
  onTabClick: (path: string) => void;
  onTabClose: (path: string) => void;
}

export const EditorHeader = ({
  openFiles,
  activeFile,
  onTabClick,
  onTabClose,
}: EditorHeaderProps) => {
  return (
    <div className="h-10 bg-background flex items-end border-b border-border">
      <div className="flex items-center h-full overflow-x-auto">
        {openFiles.map((path) => {
          const fileName = path.split("/").pop() || path;
          const isActive = path === activeFile;
          return (
            <div
              key={path}
              onClick={() => onTabClick(path)}
              className={cn(
                "flex items-center space-x-2 px-4 h-full border-r border-border cursor-pointer",
                isActive
                  ? "bg-secondary"
                  : "hover:bg-secondary/50",
              )}
            >
              <FileIcon filename={fileName} />
              <span className="text-sm text-foreground whitespace-nowrap">
                {fileName}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(path);
                }}
                className="p-0.5 rounded hover:bg-primary/20"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};