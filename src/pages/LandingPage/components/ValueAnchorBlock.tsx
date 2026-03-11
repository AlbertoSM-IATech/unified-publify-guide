import { motion } from "framer-motion";

export const ValueAnchorBlock = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-4 md:p-8 bg-accent/5 border border-accent/20 rounded-xl mb-8 overflow-hidden"
    >
      <div className="max-w-2xl mx-auto space-y-3 text-center break-words">
        <p className="text-base md:text-lg font-semibold text-foreground">
          Pierdes 5 horas a la semana saltando entre herramientas.
        </p>
        <p className="text-sm md:text-base text-muted-foreground italic">
          Son 260 horas al año. Más de 6 semanas completas de trabajo que no vuelven.
        </p>
        <p className="text-base text-foreground font-medium">
          ¿Cuánto vale una hora de tu tiempo como publisher?
        </p>
        <p className="text-lg text-primary font-bold">
          Publify cuesta menos que un café al día.
        </p>
        <p className="text-sm text-muted-foreground">
          Y no solo te devuelve tiempo — te da claridad para tomar mejores decisiones.
        </p>
      </div>
    </motion.div>
  );
};
