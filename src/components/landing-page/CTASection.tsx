import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  onSignUp: () => void;
}

export const CTASection = ({ onSignUp }: CTASectionProps) => {
  return (
    <section className="py-24 px-6 border-t border-border/50 relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Ready to start coding?
        </h2>
        <p className="text-muted-foreground mb-8">
          Join thousands of students and educators collaborating on code.
        </p>
        <Button size="lg" onClick={onSignUp} className="px-8 h-12 text-base">
          Create Free Account
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
};

export default CTASection;
