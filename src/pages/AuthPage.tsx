import { useState, useEffect } from "react";
import { Code2, Users, GitBranch, Zap, Shield, Globe, BookOpen, Cpu, Laptop } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const features = [
  {
    icon: Code2,
    title: "Real-time Collaboration",
    description: "Code together with your team in real-time. See changes instantly as they happen.",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Track every change with built-in version history. Never lose your work again.",
  },
  {
    icon: Zap,
    title: "Instant Preview",
    description: "See your code come to life with instant preview for React, HTML, and Python projects.",
  },
  {
    icon: Users,
    title: "Team Workspaces",
    description: "Create projects, invite collaborators, and manage permissions with ease.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your code is protected with enterprise-grade security and privacy controls.",
  },
  {
    icon: Globe,
    title: "Share Anywhere",
    description: "Generate shareable links to collaborate with anyone, anywhere in the world.",
  },
  {
    icon: BookOpen,
    title: "Practice Projects",
    description: "Learn and improve with hands-on coding projects and exercises.",
  },
  {
    icon: Cpu,
    title: "Web Compilers",
    description: "Run code directly in your browser with support for React, HTML, C++, C#, C, and more.",
  },
];

export const AuthPage = () => {
  const [defaultTab, setDefaultTab] = useState<"signin" | "signup">("signup");
  const [showShowcase, setShowShowcase] = useState(false);

  useEffect(() => {
    const hasSeenShowcase = localStorage.getItem("hasSeenShowcase");
    if (!hasSeenShowcase) {
      const timer = setTimeout(() => {
        setShowShowcase(true);
        localStorage.setItem("hasSeenShowcase", "true");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-primary/5 to-background flex-col justify-between p-12">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <img src="/syntaxable.png" alt="Syntaxable" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold text-foreground">Syntaxable</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold text-foreground leading-tight mb-4">
            Code Together,<br />
            <span className="text-primary">Build Faster</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-md">
            The collaborative code editor for teams. Write, share, and ship code in real-time.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-muted-foreground">
          Trusted by developers worldwide
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <img src="/syntaxable.png" alt="Syntaxable" className="h-8 w-8 object-contain" />
            <span className="text-xl font-bold text-foreground">Syntaxable</span>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {defaultTab === "signup" ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-muted-foreground">
              {defaultTab === "signup"
                ? "Start collaborating on code today"
                : "Welcome back! Sign in to your workspace"}
            </p>
          </div>

          {/* Auth Tabs */}
          <Tabs value={defaultTab} onValueChange={(v) => setDefaultTab(v as "signin" | "signup")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/50 p-1 rounded-lg">
              <TabsTrigger
                value="signin"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-0">
              <SignInForm />
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <SignUpForm />
            </TabsContent>
          </Tabs>

          {/* Terms */}
          <p className="text-xs text-center text-muted-foreground mt-6">
            By continuing, you agree to our{" "}
            <a 
              href="/terms" 
              className="text-primary hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a 
              href="/privacy" 
              className="text-primary hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      <Dialog open={showShowcase} onOpenChange={setShowShowcase}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden duration-500 data-[state=open]:animate-in data-[state=open]:fade-in-0 sm:rounded-lg border-none shadow-2xl">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="text-xl font-bold">
              Watch Showcase
            </DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full bg-muted">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/9T8zGYQdmHE?si=qa9ekR4DuFN3VVe1&vq=hd1080"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthPage;