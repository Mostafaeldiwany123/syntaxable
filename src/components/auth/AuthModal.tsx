import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { useAuthModal } from "@/context/AuthModalContext";

export const AuthModal = () => {
  const { isOpen, closeModal, defaultTab } = useAuthModal();
  
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card">
        <div className="p-6 pb-4 border-b border-border">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold tracking-tight">Welcome to Syntaxable</DialogTitle>
            <DialogDescription>
              Sign in or create an account to continue.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <Tabs defaultValue={defaultTab} className="w-full px-6 py-4">
          <div className="flex justify-center mb-6">
            <TabsList className="flex w-full max-w-xs bg-secondary/50 p-1 rounded-xl">
              <TabsTrigger 
                value="signin"
                className="flex-1 py-1.5 px-4 text-sm font-semibold rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-secondary transition-colors"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="flex-1 py-1.5 px-4 text-sm font-semibold rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-secondary transition-colors"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="signin" className="m-0">
            <SignInForm />
          </TabsContent>
          <TabsContent value="signup" className="m-0">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};