import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MousePointer2 } from "lucide-react";

const teacherFeatures = [
  {
    title: "Create Custom Sets",
    description: "Build your own coding challenges with automated test cases and unique constraints for your students.",
    image: "/imgs/createCustomSet.png"
  },
  {
    title: "Track Progress",
    description: "Monitor exactly how many problems each participant has completed and see their solutions in real-time.",
    image: "/imgs/participaints.png"
  },
  {
    title: "Seamless Sharing",
    description: "Share your custom sets instantly using a QR code, a direct link, or a unique session code.",
    image: "/imgs/shareSet.png"
  },
];


export const EducationSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="education" className="py-24 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-4 md:gap-12 lg:gap-20 items-center">
          
          {/* Detailed Image Display (Side-by-side on mobile too) */}
          <div className="col-span-7 lg:col-span-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Image Container with shadow and border */}
              <div className="rounded-xl lg:rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
                <div className="relative bg-card p-1 md:p-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative z-10"
                    >
                      <img
                        src={teacherFeatures[activeIndex].image}
                        alt={teacherFeatures[activeIndex].title}
                        className="w-full h-auto rounded-md lg:rounded-lg shadow-sm"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Background Glow Effect */}
              <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full opacity-50 -z-10" />
            </motion.div>
          </div>

          {/* Description and Selectors (Side-by-side on mobile too) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-5 lg:col-span-4 order-1 lg:order-2 space-y-4 md:space-y-8"
          >
            <div>
              <div className="flex items-center gap-1.5 mb-2 md:mb-4">
                <div className="p-1 rounded-md bg-primary/10">
                  <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <span className="text-[10px] md:text-sm font-semibold text-primary uppercase tracking-wider">For Educators</span>
              </div>
              <h2 className="text-xl md:text-4xl font-bold tracking-tight mb-2 md:mb-4">
                Built for labs
              </h2>
              <p className="text-[10px] md:text-base text-muted-foreground leading-relaxed hidden sm:block">
                Empower your students with structured coding sets. Every session is synchronized.
              </p>
            </div>

            <div className="space-y-2 md:space-y-4">
              {teacherFeatures.map((feature, index) => (
                <button
                  key={feature.title}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-2 md:p-4 rounded-lg md:rounded-xl border transition-all duration-300 relative group ${
                    activeIndex === index 
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/5" 
                      : "border-transparent bg-transparent hover:bg-muted/50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`text-[10px] md:text-base font-semibold transition-colors ${
                        activeIndex === index ? "text-primary" : "text-foreground group-hover:text-primary"
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-[8px] md:text-sm leading-relaxed hidden md:block">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
