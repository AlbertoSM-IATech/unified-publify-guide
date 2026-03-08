import { motion } from "framer-motion";

export const TaglineSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-center leading-tight"
        >
          El{" "}
          <span className="text-primary">Sistema Operativo Editorial</span>
          <br />
          para publishers de Amazon KDP
        </motion.h2>
      </div>
    </section>
  );
};
