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
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="text-lg md:text-xl text-center mt-5 max-w-2xl mx-auto text-accent">
          
          La Navaja Suiza de los Publishers independientes: Un solo lugar para investigar, crear, analizar y escalar tu negocio editorial.
        </motion.p>
      </div>
    </section>);

};