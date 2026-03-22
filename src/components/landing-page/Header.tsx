import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeaderProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export const Header = ({ onSignIn, onSignUp }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-3 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto flex items-center justify-between px-5 transition-all duration-500 ease-in-out border border-border/50 bg-background/60 backdrop-blur-xl rounded-full ${
          scrolled ? 'w-full md:w-[70%] py-1.5' : 'w-full md:w-[90%] py-2.5'
        }`}
      >
        {/* Brand */}
        <div 
          className="flex items-center gap-2.5 shrink-0 cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src="/syntaxable.png" alt="Syntaxable" className="h-6 w-6 object-contain" />
          <span className="text-base font-bold tracking-tight hidden sm:inline-block">Syntaxable</span>
        </div>
        
        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Features", id: "features" },
            { name: "AI", id: "ai" },
            { name: "Practice", id: "practice" },
            { name: "Education", id: "education" },
            { name: "Pricing", id: "pricing" }
          ].map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              onClick={(e) => handleScrollTo(e, link.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>


        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <Button 
            variant="ghost" 
            onClick={onSignIn} 
            className="text-sm font-medium text-muted-foreground hover:bg-transparent hover:text-foreground h-8 px-3"
          >
            Sign In
          </Button>
          <Button 
            onClick={onSignUp} 
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold h-8 px-5 shadow-lg shadow-primary/10 hover:scale-105 active:scale-95 text-xs"
          >
            <span className="hidden sm:inline">Get Started</span>
            <span className="sm:hidden">Join</span>
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      </motion.nav>
    </div>
  );

};

export default Header;
