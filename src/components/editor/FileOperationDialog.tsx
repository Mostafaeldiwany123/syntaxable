import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type FileOpType = "create_file" | "create_folder" | "rename" | "delete";

interface FileOperationDialogProps {
  open: boolean;
  type: FileOpType;
  path?: string;
  initialValue?: string;
  folders?: string[];
  onClose: () => void;
  onSubmit: (value: string, folder?: string) => void;
}

export const FileOperationDialog = ({
  open,
  type,
  path,
  initialValue = "",
  folders = [],
  onClose,
  onSubmit,
}: FileOperationDialogProps) => {
  const [value, setValue] = useState(initialValue);
  const [selectedFolder, setSelectedFolder] = useState<string>("root");

  useEffect(() => {
    if (open) {
      setValue(initialValue);
      setSelectedFolder("root");
    }
  }, [open, initialValue]);

  const getTitle = () => {
    switch (type) {
      case "create_file":
        return "Create New File";
      case "create_folder":
        return "Create New Folder";
      case "rename":
        return "Rename";
      case "delete":
        return "Delete Item";
    }
  };

  const getDescription = () => {
    switch (type) {
      case "create_file":
        return "Enter a name for the new file.";
      case "create_folder":
        return "Enter a name for the new folder.";
      case "rename":
        return `Enter a new name for ${path?.split("/").pop() || "the item"}.`;
      case "delete":
        return `Are you sure you want to delete "${path?.split("/").pop()}"? This action cannot be undone.`;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim(), selectedFolder === "root" ? "" : selectedFolder);
      onClose();
    }
  };

  if (type === "delete") {
    return (
      <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{getTitle()}</AlertDialogTitle>
            <AlertDialogDescription>{getDescription()}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onSubmit("");
                onClose();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="grid gap-4 py-4">
            {(type === "create_file" || type === "create_folder") && folders.length > 0 && (
              <div className="grid items-center gap-2">
                <Label htmlFor="folder" className="text-left text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Location
                </Label>
                <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select folder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="root">Project Root ( / )</SelectItem>
                    {folders.map(f => (
                      <SelectItem key={f} value={f}>
                        {f.endsWith('/') ? f : `${f}/`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid items-center gap-4">
              <Label htmlFor="name" className="text-left text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                {type === "rename" ? "New Name" : "Name"}
              </Label>
              <Input
                id="name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={type === "create_file" ? "e.g. index.tsx" : "e.g. components"}
                className="col-span-3"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!value.trim()}>
              {type === "rename" ? "Rename" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
