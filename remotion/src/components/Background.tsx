import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

/**
 * Editorial background: deep warm black, subtle orange glow that pulses gently,
 * fine geometric grid drifting slowly upward.
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const glow = interpolate(
    Math.sin(frame / 40),
    [-1, 1],
    [0.35, 0.55]
  );
  const gridY = (frame * 0.35) % 60;

  return (
    <AbsoluteFill>
      {/* Warm base */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 60%, #1a0f06 0%, #0a0806 55%, #050403 100%)",
        }}
      />
      {/* Orange glow pulse */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 62%, rgba(255,106,26," + glow + ") 0%, rgba(255,106,26,0) 45%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Geometric grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          backgroundPosition: `0px ${gridY}px`,
          maskImage:
            "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      {/* Floating orange particles */}
      {[...Array(14)].map((_, i) => {
        const seed = i * 137.5;
        const x = (seed % 100);
        const yBase = ((seed * 1.3) % 100);
        const drift = interpolate(
          Math.sin(frame / (25 + (i % 5) * 4) + i),
          [-1, 1],
          [-20, 20]
        );
        const size = 2 + (i % 4);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${yBase}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: i % 3 === 0 ? "#FF6A1A" : "rgba(255,220,180,0.6)",
              transform: `translateY(${drift}px)`,
              boxShadow: "0 0 12px rgba(255,106,26,0.6)",
              opacity: 0.65,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
