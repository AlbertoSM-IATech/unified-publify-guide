import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** If true, animates on load instead of on scroll */
  immediate?: boolean;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Stagger between each character (seconds) */
  stagger?: number;
  /** Duration per character (seconds) */
  duration?: number;
}

export const TextReveal = ({
  children,
  as: Tag = "h2",
  className = "",
  immediate = false,
  delay = 0,
  stagger = 0.02,
  duration = 0.6,
}: TextRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Split text into words, then chars
  const words = children.split(" ");

  useEffect(() => {
    const chars = charsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (!chars.length) return;

    const animProps = {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      stagger,
      ease: "back.out(1.7)",
      delay,
    };

    if (immediate) {
      gsap.to(chars, animProps);
    } else {
      gsap.to(chars, {
        ...animProps,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [children, immediate, delay, stagger, duration]);

  let charIndex = 0;

  return (
    <Tag
      ref={containerRef as any}
      className={className}
      style={{ perspective: "600px" }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "pre" }}>
          {Array.from(word).map((char) => {
            const idx = charIndex++;
            return (
              <span
                key={idx}
                ref={(el) => { charsRef.current[idx] = el; }}
                style={{
                  display: "inline-block",
                  opacity: 0,
                  transform: "translateY(40px) rotateX(-90deg)",
                  transformOrigin: "bottom",
                }}
              >
                {char}
              </span>
            );
          })}
          {wi < words.length - 1 && (
            <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
};
