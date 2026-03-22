
import { 
  Header, 
  HeroSection, 
  FeaturesSection, 
  AISection, 
  EducationSection, 
  CTASection, 
  PricingSection,
  PracticeSection,
  Footer 
} from "@/components/landing-page";


import { useAuthModal } from "@/context/AuthModalContext";


export const AuthPage = () => {
  const { openModal } = useAuthModal();


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
          <PracticeSection />
          <EducationSection />
          <PricingSection />

          <CTASection onSignUp={handleSignUp} />

        </main>

        <Footer />
      </div>


    </div>
  );
};

export default AuthPage;