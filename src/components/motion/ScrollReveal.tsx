import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fade" | "slide-up" | "slide-left" | "slide-right" | "zoom" | "flip" | "rotate";
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Componente para animaciones espectaculares al hacer scroll
 * Soporta múltiples variantes de animación
 */
export const ScrollReveal = ({ 
  children, 
  variant = "fade", 
  delay = 0,
  duration = 0.6,
  className = "" 
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: false, 
    amount: 0.3,
    margin: "-50px"
  });

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    "slide-up": {
      hidden: { opacity: 0, y: 80 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    "slide-left": {
      hidden: { opacity: 0, x: 100 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    "slide-right": {
      hidden: { opacity: 0, x: -100 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    flip: {
      hidden: { opacity: 0, rotateY: 90 },
      visible: { 
        opacity: 1, 
        rotateY: 0,
        transition: { duration: duration * 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -20, scale: 0.9 },
      visible: { 
        opacity: 1, 
        rotate: 0,
        scale: 1,
        transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
};
