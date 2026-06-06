import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  kicker: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  number?: string;
}

export const EditorialSectionHeader = ({
  kicker,
  title,
  subtitle,
  align = "center",
  number,
}: Props) => {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${alignClass} mb-14 max-w-3xl ${align === "center" ? "mx-auto" : ""}`}
    >
      <div className={`flex items-center gap-4 mb-5 ${align === "center" ? "justify-center" : ""}`}>
        {number && (
          <span className="font-heading italic text-primary text-lg leading-none">{number}</span>
        )}
        <span className="h-px w-12 bg-primary" />
        <span className="text-primary uppercase tracking-[0.22em] text-[11px] font-semibold">
          {kicker}
        </span>
      </div>
      <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
