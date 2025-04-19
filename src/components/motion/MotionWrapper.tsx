
import { motion, HTMLMotionProps } from "framer-motion";
import React, { forwardRef } from "react";

// Props for the MotionWrapper component
interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  type?: "fade" | "slide" | "scale" | "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight";
}

// Animation variants
const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  fadeDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  fadeLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  fadeRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  slide: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 }
  }
};

/**
 * A wrapper component that applies consistent motion animations
 * to its children using Framer Motion.
 */
const MotionWrapper = forwardRef<HTMLDivElement, MotionWrapperProps>(
  ({ children, delay = 0, duration = 0.5, className = "", type = "fade", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants[type]}
        transition={{ 
          duration: duration, 
          delay: delay,
          ease: "easeOut" 
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionWrapper.displayName = "MotionWrapper";

export default MotionWrapper;
