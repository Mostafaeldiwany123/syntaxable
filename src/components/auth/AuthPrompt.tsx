import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthModal } from "@/context/AuthModalContext";
import { Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const AuthPrompt = () => {
  const { openModal } = useAuthModal();

  return (
    <div className="h-full flex items-center justify-center p-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl">Access Restricted</CardTitle>
          <CardDescription>
            Sign in or create an account to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <Link to="/auth">
              Sign In or Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Join thousands of developers collaborating on code
          </p>
        </CardContent>
      </Card>
    </div>
  );
};