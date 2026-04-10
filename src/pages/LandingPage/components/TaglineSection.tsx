import { motion } from "framer-motion";
import publifyLogo from "@/assets/publify-logo.png";

export const TaglineSection = () => {
  return (
    <section id="que-es-publify" className="py-20 md:py-28 bg-muted dark:bg-secondary/40 relative overflow-hidden border-y border-border/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/8 dark:from-primary/10 dark:to-accent/8" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex justify-center">
          
          <img
            src={publifyLogo}
            alt="Publify - Navaja Suiza Editorial"
            className="h-16 md:h-20 w-auto" />
          
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-center leading-tight">
          
          El{" "}
          <span className="text-primary">Sistema Operativo Editorial</span>
          <br />
          para publishers de Amazon KDP
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="text-lg md:text-xl text-center mt-5 max-w-2xl mx-auto text-accent">
          
          Hecho por y para publishers de Amazon KDP
        </motion.p>
      </div>
    </section>);

};