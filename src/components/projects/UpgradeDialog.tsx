import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentCount: number;
  limit: number;
}

export function UpgradeDialog({ open, onOpenChange, currentCount, limit }: UpgradeDialogProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project Limit Reached</DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            You've reached your limit of <span className="font-semibold text-foreground">{limit} projects</span>.
            You currently have <span className="font-semibold text-foreground">{currentCount} projects</span>.
            Upgrade to Pro for up to 20 projects and unlock more features!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              onOpenChange(false);
              navigate("/pricing");
            }}
          >
            Upgrade to Pro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}