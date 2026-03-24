import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Instagram, MessageSquare } from "lucide-react";

interface BetaTrialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BetaTrialDialog({ open, onOpenChange }: BetaTrialDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Beta Trial Access</DialogTitle>
          <DialogDescription className="text-center pt-2">
            The Professional tier is currently in Beta.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 py-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground underline underline-offset-4 decoration-primary/30 font-medium">Limited Time Beta Price</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              100 EGP <span className="text-muted-foreground/50 mx-1 font-light">/</span> $2
              <span className="text-sm text-muted-foreground font-normal ml-2">per month</span>
            </p>
          </div>

          <div className="bg-secondary/50 rounded-xl p-6 w-full text-center space-y-4">
            <p className="text-sm font-medium">To join the beta and get Pro access, please DM me on Instagram!</p>
            
            <a 
              href="https://www.instagram.com/mostafa_eldiwany123/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
            >
              <Instagram className="h-5 w-5" />
              DM on Instagram
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MessageSquare className="h-3 w-3" />
            <span>We can discuss the details and set you up manually!</span>
          </div>
        </div>

        <div className="flex justify-center border-t border-border pt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
