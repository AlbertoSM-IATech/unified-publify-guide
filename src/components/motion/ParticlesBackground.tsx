import { useMemo } from "react";
import { motion } from "framer-motion";

const editorialIcons = [
  // Open book
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  // Page/document
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  // Pen nib / feather
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <line x1="16" y1="8" x2="2" y2="22" />
      <line x1="17.5" y1="15" x2="9" y2="15" />
    </svg>
  ),
  // Bookmark
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  // Paragraph symbol ¶
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
      <text x="4" y="20" fontSize="20" fill="currentColor" fontFamily="Georgia, serif" fontWeight="300">¶</text>
    </svg>
  ),
  // Quotation marks «»
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
      <text x="2" y="18" fontSize="16" fill="currentColor" fontFamily="Georgia, serif" fontWeight="300">«»</text>
    </svg>
  ),
  // Typographic A
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
      <text x="4" y="20" fontSize="22" fill="currentColor" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="400">A</text>
    </svg>
  ),
];

interface FloatingElement {
  id: number;
  iconIndex: number;
  x: number;
  y: number;
  size: number;
  useAccent: boolean;
  duration: number;
  delay: number;
  floatY: number;
  rotation: number;
}

export const ParticlesBackground = () => {
  const elements = useMemo<FloatingElement[]>(() => {
    const seed = 42;
    const pseudoRandom = (i: number) => {
      const x = Math.sin(seed + i * 127.1) * 43758.5453;
      return x - Math.floor(x);
    };

    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      iconIndex: Math.floor(pseudoRandom(i) * editorialIcons.length),
      x: pseudoRandom(i + 100) * 100,
      y: pseudoRandom(i + 200) * 100,
      size: 16 + pseudoRandom(i + 300) * 24,
      useAccent: i % 3 === 0,
      duration: 14 + pseudoRandom(i + 400) * 12,
      delay: pseudoRandom(i + 500) * 10,
      floatY: 40 + pseudoRandom(i + 600) * 60,
      rotation: -15 + pseudoRandom(i + 700) * 30,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {elements.map((el) => {
        const Icon = editorialIcons[el.iconIndex];
        return (
          <motion.div
            key={el.id}
            className="absolute"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              width: el.size,
              height: el.size,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, el.useAccent ? 0.18 : 0.12, 0],
              y: [0, -el.floatY, 0],
              rotate: [0, el.rotation, 0],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: el.delay,
            }}
          >
            <Icon
              className={el.useAccent ? "text-accent" : "text-primary"}
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
