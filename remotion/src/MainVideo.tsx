import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { Background } from "./components/Background";
import { Book } from "./components/Book";

const playfair = loadPlayfair("normal", { weights: ["400", "700", "900"], subsets: ["latin"] });
const inter = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Master fade in/out
  const introFade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const outroFade = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const masterOpacity = Math.min(introFade, outroFade);

  // Slow camera zoom/parallax feel
  const camScale = interpolate(frame, [0, durationInFrames], [1.02, 1.06]);
  const camY = interpolate(frame, [0, durationInFrames], [0, -14]);

  return (
    <AbsoluteFill style={{ background: "#0a0806", opacity: masterOpacity, fontFamily: inter.fontFamily }}>
      <Background />
      <AbsoluteFill
        style={{
          transform: `translateY(${camY}px) scale(${camScale})`,
          transformOrigin: "50% 55%",
          perspective: 2200,
        }}
      >
        <Book playfairFamily={playfair.fontFamily} interFamily={inter.fontFamily} />
      </AbsoluteFill>
      {/* Vignette */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
