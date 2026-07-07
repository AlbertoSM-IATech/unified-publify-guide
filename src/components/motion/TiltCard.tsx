import { useTilt } from "@/hooks/useTilt";
import { ReactNode, CSSProperties } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glow?: boolean;
  style?: CSSProperties;
}

/** Wrapper that applies subtle cursor-driven 3D tilt + optional glow border. */
export const TiltCard = ({ children, className = "", max, scale, glow = false, style }: TiltCardProps) => {
  const { ref, style: tiltStyle } = useTilt<HTMLDivElement>({ max, scale });

  return (
    <div ref={ref} style={{ ...tiltStyle, ...style }} className={`relative ${className}`}>
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--primary) / 0.18), transparent 45%)",
          }}
        />
      )}
      {children}
    </div>
  );
};
