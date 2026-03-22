import { useState, useEffect } from "react";
import { 
  Header, 
  HeroSection, 
  FeaturesSection, 
  AISection, 
  EducationSection, 
  CTASection, 
  PricingSection,
  Footer 
} from "@/components/landing-page";

import { useAuthModal } from "@/context/AuthModalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const AuthPage = () => {
  const { openModal } = useAuthModal();
  const [showShowcase, setShowShowcase] = useState(false);

  useEffect(() => {
    const hasSeenShowcase = localStorage.getItem("hasSeenShowcase");
    if (!hasSeenShowcase) {
      const timer = setTimeout(() => {
        setShowShowcase(true);
        localStorage.setItem("hasSeenShowcase", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSignIn = () => openModal("signin");
  const handleSignUp = () => openModal("signup");

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Global Background Grid */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />

      
      <div className="relative z-10">
        <Header onSignIn={handleSignIn} onSignUp={handleSignUp} />
        
        <main>
          <HeroSection onSignIn={handleSignIn} onSignUp={handleSignUp} />
          <FeaturesSection />
          <AISection />
          <EducationSection />
          <PricingSection />
          <CTASection onSignUp={handleSignUp} />

        </main>

        <Footer />
      </div>

      <Dialog open={showShowcase} onOpenChange={setShowShowcase}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden duration-500 data-[state=open]:animate-in data-[state=open]:fade-in-0 sm:rounded-lg border-none shadow-2xl z-[100]">
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