import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DemoEditor } from "./DemoEditor";

interface HeroSectionProps {
  onSignUp: () => void;
  onSignIn: () => void;
}

const heroCode = `#include <iostream>
#include <string>

/**
 * Welcome to Syntaxable
 * The collaborative platform for modern developers.
 */
int main() {
    std::string platform = "Syntaxable";
    
    std::cout << "Welcome to " << platform << "!" << std::endl;
    std::cout << "Start coding together in real-time." << std::endl;
    
    return 0;
}`;




export const HeroSection = ({ onSignUp, onSignIn }: HeroSectionProps) => {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Code together,
            <br />
            <span className="text-primary">without complexity</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A collaborative code editor designed for students and educators. 
            No Git knowledge needed. Just share a link and start coding together in real-time.
          </p>

          
          <div className="flex flex-row items-center justify-center gap-3">
            <Button size="lg" onClick={onSignUp} className="px-5 md:px-8 h-12 text-sm md:text-base">
              Start Coding
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={onSignIn} className="px-5 md:px-8 h-12 text-sm md:text-base">
              Sign In
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Free for students • No credit card required
          </p>
        </motion.div>

        {/* Live Code Editor Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 relative"
        >

          <DemoEditor 
            initialCode={heroCode}
            language="cpp"
            height="350px"
            showTabs={true}
            fileName="main.cpp"
          />

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
