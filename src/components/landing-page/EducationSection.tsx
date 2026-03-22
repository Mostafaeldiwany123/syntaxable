import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const teacherFeatures = [
  {
    title: "Create Custom Problems",
    description: "Build your own coding challenges with automated test cases and unique constraints for your students.",
  },
  {
    title: "Track Submissions",
    description: "Share a private link to see who joined the session and monitor exactly how many problems each user has completed.",
  },
  {
    title: "Persistent Learning",
    description: "Student solutions are saved to the database, allowing them to review their progress at home or in the lab.",
  },
];


export const EducationSection = () => {
  return (
    <section id="education" className="py-24 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Video on the left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-xl overflow-hidden border border-border bg-card order-2 md:order-1"
          >
            <iframe
              src="https://www.youtube.com/embed/9T8zGYQdmHE?si=qa9ekR4DuFN3VVe1&vq=hd1080"
              title="Syntaxable for Education"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>

          {/* Description on the right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 md:order-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">For Educators</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built for the classroom
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Create custom problem sets, share them with a link, and monitor student progress. Everything is saved so users can pick up right where they left off.
            </p>



            <div className="space-y-6">
              {teacherFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-xl border border-border bg-card/50"
                >
                  <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
