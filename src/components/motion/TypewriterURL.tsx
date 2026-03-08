import { motion } from "framer-motion";

interface TypewriterURLProps {
  text: string;
  delay?: number;
  speed?: number;
}

export const TypewriterURL = ({ text, delay = 1.5, speed = 0.08 }: TypewriterURLProps) => {
  const chars = Array.from(text);

  return (
    <span className="relative inline-flex items-center">
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + i * speed, duration: 0.05 }}
        >
          {char}
        </motion.span>
      ))}
      {/* Blinking cursor */}
      <motion.span
        className="inline-block w-[1px] h-3.5 ml-0.5"
        style={{ background: "#28c840" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          delay: delay,
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: 0,
          times: [0, 0.5, 1],
        }}
      />
    </span>
  );
};
