import { motion } from "framer-motion";
import { Users, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description: "See teammates' cursors and changes instantly. Code together as if you're in the same room.",
  },
  {
    icon: Globe,
    title: "Work Anywhere",
    description: "Start in the lab, continue at home. Your code syncs automatically across all devices.",
  },
  {
    icon: Shield,
    title: "No Git Required",
    description: "Skip the version control learning curve. Just share a link and start coding together.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Video on the right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-xl overflow-hidden border border-border bg-card"
          >
            <iframe
              src="https://www.youtube.com/embed/9T8zGYQdmHE?si=qa9ekR4DuFN3VVe1&vq=hd1080"
              title="Syntaxable Features"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>

          {/* Description on the left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything you need to collaborate
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Built for teams who want to code together without the overhead of traditional tools.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
