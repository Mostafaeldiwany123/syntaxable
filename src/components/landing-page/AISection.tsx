import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { DemoAIAgentPanel } from "./DemoAIAgentPanel";

export const AISection = () => {
  return (
    <section className="py-24 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">

              Your AI coding companion
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Stuck on a problem? Our built-in AI assistant helps you understand concepts, 
              debug code, and learn best practices, all without leaving the editor.
            </p>
            <ul className="space-y-4">
              {[
                "Instant explanations for code errors",
                "Learn programming concepts with guided help",
                "Practice with curated problem sets",
                "Get hints without giving away solutions",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <DemoAIAgentPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
