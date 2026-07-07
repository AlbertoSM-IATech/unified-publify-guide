import { useEffect, useRef, useState } from "react";

interface TiltOptions {
  max?: number;
  scale?: number;
  perspective?: number;
}

/** Subtle 3D tilt driven by cursor position. Respects prefers-reduced-motion. */
export const useTilt = <T extends HTMLElement = HTMLDivElement>({
  max = 6,
  scale = 1.01,
  perspective = 900,
}: TiltOptions = {}) => {
  const ref = useRef<T | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`,
    transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
    transformStyle: "preserve-3d",
    willChange: "transform",
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * max;
      const ry = (px - 0.5) * max;
      setStyle((s) => ({
        ...s,
        transform: `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`,
        transition: "transform 120ms linear",
      }));
    };
    const onLeave = () => {
      setStyle((s) => ({
        ...s,
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
        transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
      }));
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max, scale, perspective]);

  return { ref, style };
};
