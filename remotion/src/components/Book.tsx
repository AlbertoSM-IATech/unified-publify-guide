import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface Props {
  playfairFamily: string;
  interFamily: string;
}

/**
 * A closed book rises from the shadow, tilts slightly, then the front cover
 * opens revealing pages that fan out. The right page displays the Publify
 * editorial mark. Everything is CSS 3D, driven by frame-based interpolate/spring.
 */
export const Book: React.FC<Props> = ({ playfairFamily, interFamily }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Rise from below with a soft spring (frames 0-45)
  const rise = spring({ frame, fps, config: { damping: 22, stiffness: 90, mass: 1.1 } });
  const translateY = interpolate(rise, [0, 1], [280, 0]);
  const bookOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // 2. Idle tilt (breathing) — always active
  const tiltY = interpolate(Math.sin(frame / 55), [-1, 1], [-6, 6]);
  const hover = interpolate(Math.sin(frame / 45), [-1, 1], [-6, 6]);

  // 3. Cover opens (frames 70-150)
  const openProgress = spring({
    frame: frame - 70,
    fps,
    config: { damping: 26, stiffness: 55, mass: 1.3 },
  });
  const coverRotate = interpolate(openProgress, [0, 1], [0, -168]);

  // 4. Right-page content fades in (frames 140+)
  const contentProgress = spring({
    frame: frame - 140,
    fps,
    config: { damping: 20, stiffness: 90 },
  });
  const contentOpacity = interpolate(contentProgress, [0, 1], [0, 1]);
  const contentY = interpolate(contentProgress, [0, 1], [24, 0]);

  // 5. Page fan (small stagger of 3 pages behind the cover, frames 90+)
  const pageStagger = (i: number) =>
    spring({
      frame: frame - 90 - i * 6,
      fps,
      config: { damping: 30, stiffness: 60 },
    });

  const bookWidth = 520; // half width — spine at center
  const bookHeight = 720;
  const bookDepth = 46;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Ground shadow */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          width: 1200,
          height: 90,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(6px)",
          opacity: interpolate(rise, [0, 1], [0, 0.9]),
          transform: `translateY(${translateY * 0.15}px) scaleX(${1 - openProgress * 0.15})`,
        }}
      />

      <div
        style={{
          position: "relative",
          width: bookWidth * 2,
          height: bookHeight,
          transformStyle: "preserve-3d",
          transform: `translateY(${translateY + hover}px) rotateX(12deg) rotateY(${tiltY - openProgress * 8}deg)`,
          opacity: bookOpacity,
        }}
      >
        {/* Back cover */}
        <div
          style={{
            position: "absolute",
            left: bookWidth,
            top: 0,
            width: bookWidth,
            height: bookHeight,
            transformOrigin: "left center",
            transform: `rotateY(0deg) translateZ(-${bookDepth / 2}px)`,
            background: "linear-gradient(135deg, #14100c 0%, #0a0806 100%)",
            border: "1px solid #2a2018",
            borderRadius: "4px 14px 14px 4px",
            boxShadow: "inset 0 0 60px rgba(0,0,0,0.7)",
          }}
        />

        {/* Spine (glowing orange edge) */}
        <div
          style={{
            position: "absolute",
            left: bookWidth - bookDepth / 2,
            top: 0,
            width: bookDepth,
            height: bookHeight,
            transform: `rotateY(90deg) translateZ(${bookDepth / 2}px)`,
            transformOrigin: "left center",
            background:
              "linear-gradient(180deg, #FF6A1A 0%, #FF8A3D 50%, #FF6A1A 100%)",
            boxShadow: "0 0 40px rgba(255,106,26,0.7)",
          }}
        />

        {/* Static pages block (visible once cover opens) */}
        <div
          style={{
            position: "absolute",
            left: bookWidth,
            top: 6,
            width: bookWidth - 12,
            height: bookHeight - 12,
            background: "linear-gradient(90deg, #f4ecdd 0%, #fbf6ea 40%, #fffaf0 100%)",
            borderRadius: "0 10px 10px 0",
            boxShadow: "inset 4px 0 12px rgba(0,0,0,0.15)",
            transform: `translateZ(-${bookDepth / 2 - 4}px)`,
            overflow: "hidden",
          }}
        >
          {/* Page lines */}
          <div
            style={{
              position: "absolute",
              inset: "18% 12% 18% 8%",
              opacity: contentOpacity * 0.35,
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(30,20,10,0.55) 0, rgba(30,20,10,0.55) 2px, transparent 2px, transparent 26px)",
            }}
          />

          {/* Right-page editorial content */}
          <div
            style={{
              position: "absolute",
              inset: "12% 10% 12% 10%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              opacity: contentOpacity,
              transform: `translateY(${contentY}px)`,
              color: "#1a1208",
            }}
          >
            <div
              style={{
                fontFamily: interFamily,
                fontSize: 20,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#B04A0F",
                fontWeight: 600,
                marginBottom: 24,
              }}
            >
              — Capítulo 01
            </div>
            <div
              style={{
                fontFamily: playfairFamily,
                fontSize: 92,
                lineHeight: 1.02,
                fontWeight: 900,
                color: "#0f0a05",
                marginBottom: 28,
              }}
            >
              Editorial<br />
              <span style={{ color: "#FF6A1A", fontStyle: "italic" }}>OS</span>
            </div>
            <div
              style={{
                width: 90,
                height: 3,
                background: "#FF6A1A",
                marginBottom: 24,
              }}
            />
            <div
              style={{
                fontFamily: interFamily,
                fontSize: 22,
                lineHeight: 1.4,
                color: "#3a2a1c",
                maxWidth: 380,
              }}
            >
              Un solo lugar para pensar, publicar y escalar tu catálogo en Amazon KDP.
            </div>
          </div>
        </div>

        {/* Fanning pages behind cover */}
        {[0, 1, 2].map((i) => {
          const p = pageStagger(i);
          const rot = interpolate(p, [0, 1], [0, -140 - i * 8]);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: bookWidth,
                top: 8 + i * 2,
                width: bookWidth - 14 - i * 2,
                height: bookHeight - 16 - i * 4,
                transformOrigin: "left center",
                transform: `rotateY(${rot}deg) translateZ(${-bookDepth / 2 + 6 + i * 2}px)`,
                background:
                  "linear-gradient(90deg, #eadfcb 0%, #f7efdd 60%, #fffaf0 100%)",
                borderRadius: "0 8px 8px 0",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                opacity: 0.9 - i * 0.15,
              }}
            />
          );
        })}

        {/* Front cover (opens) */}
        <div
          style={{
            position: "absolute",
            left: bookWidth,
            top: 0,
            width: bookWidth,
            height: bookHeight,
            transformOrigin: "left center",
            transform: `rotateY(${coverRotate}deg) translateZ(${bookDepth / 2}px)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Cover outside */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, #1a120a 0%, #0d0806 60%, #1a0f06 100%)",
              border: "1px solid #2a1e12",
              borderRadius: "4px 14px 14px 4px",
              boxShadow:
                "inset 0 0 80px rgba(0,0,0,0.6), 0 24px 60px rgba(0,0,0,0.6)",
              backfaceVisibility: "hidden",
              padding: "70px 60px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: "#f8ede0",
            }}
          >
            {/* Debossed corner mark */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div
                style={{
                  fontFamily: interFamily,
                  fontSize: 16,
                  letterSpacing: 8,
                  textTransform: "uppercase",
                  color: "rgba(248,237,224,0.55)",
                }}
              >
                Publify — 2026
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  border: "1.5px solid #FF6A1A",
                  transform: "rotate(45deg)",
                  boxShadow: "0 0 24px rgba(255,106,26,0.35)",
                }}
              />
            </div>

            <div>
              <div
                style={{
                  fontFamily: playfairFamily,
                  fontSize: 108,
                  fontWeight: 900,
                  lineHeight: 0.95,
                  color: "#fbf3e6",
                  letterSpacing: -2,
                }}
              >
                Publify
              </div>
              <div
                style={{
                  width: 120,
                  height: 3,
                  background: "#FF6A1A",
                  marginTop: 22,
                  marginBottom: 22,
                }}
              />
              <div
                style={{
                  fontFamily: interFamily,
                  fontSize: 22,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: "rgba(248,237,224,0.7)",
                }}
              >
                Editorial Operating System
              </div>
            </div>

            <div
              style={{
                fontFamily: interFamily,
                fontSize: 14,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "rgba(248,237,224,0.35)",
                alignSelf: "flex-end",
              }}
            >
              KDP · Amazon
            </div>
          </div>

          {/* Cover inside (visible when opened) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, #fffaf0 0%, #f7efdd 55%, #ead9bd 100%)",
              border: "1px solid #d9c9a8",
              borderRadius: "14px 4px 4px 14px",
              boxShadow: "inset -6px 0 16px rgba(0,0,0,0.18)",
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              padding: 60,
              display: "flex",
              alignItems: "flex-end",
              color: "#5a3a1c",
              fontFamily: playfairFamily,
              fontStyle: "italic",
              fontSize: 26,
            }}
          >
            "Sistema, no mosaico."
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
