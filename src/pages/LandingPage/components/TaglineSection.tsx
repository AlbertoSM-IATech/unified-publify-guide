import { motion } from "framer-motion";
import publifyLogo from "@/assets/publify-logo.png";

export const TaglineSection = () => {
  return (
    <section
      id="que-es-publify"
      className="py-24 md:py-32 bg-muted dark:bg-secondary/40 relative overflow-hidden border-y border-border/50"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/8" />
      <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center gap-4 mb-8"
        >
          <span className="h-px w-12 bg-primary" />
          <span className="text-primary uppercase tracking-[0.22em] text-[11px] font-semibold">
            Manifesto · Volumen 01
          </span>
          <span className="h-px w-12 bg-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <img
            src={publifyLogo}
            alt="Publify — Sistema Operativo Editorial"
            className="h-14 md:h-16 w-auto"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight"
        >
          El <span className="text-primary italic">Sistema Operativo Editorial</span>
          <br />
          para publishers de Amazon KDP
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg mt-7 max-w-xl mx-auto text-muted-foreground uppercase tracking-[0.2em] font-medium"
        >
          Hecho por y para publishers de Amazon KDP
        </motion.p>
      </div>
    </section>
  );
};
