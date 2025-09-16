import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const SocialProofSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <blockquote className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <p className="text-xl md:text-2xl font-medium text-foreground mb-6 leading-relaxed">
              "Por fin tenemos todo en un mismo sitio. Menos horas de caos, más horas de escribir."
            </p>
            <footer className="text-muted-foreground">
              — <cite className="not-italic font-medium">María González, Autora & Editorial</cite>
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};