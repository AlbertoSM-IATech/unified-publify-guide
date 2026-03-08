import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

export const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: {
          value: 35,
          density: { enable: true, width: 1920, height: 1080 },
        },
        color: {
          value: ["hsl(24, 94%, 59%)", "hsl(217, 91%, 60%)", "hsl(24, 94%, 50%)"],
        },
        shape: { type: ["circle"] },
        opacity: {
          value: { min: 0.08, max: 0.4 },
          animation: {
            enable: true,
            speed: 0.5,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 1.5,
            sync: false,
          },
        },
        links: {
          enable: true,
          distance: 160,
          color: "hsl(217, 91%, 60%)",
          opacity: 0.08,
          width: 0.8,
          triangles: {
            enable: true,
            opacity: 0.015,
          },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: { default: "bounce" as const },
          attract: {
            enable: true,
            rotate: { x: 600, y: 1200 },
          },
        },
      },
      interactivity: {
        detectsOn: "window" as const,
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          grab: {
            distance: 180,
            links: { opacity: 0.2, color: "hsl(24, 94%, 59%)" },
          },
          push: { quantity: 1 },
        },
      },
      detectRetina: true,
      background: { color: "transparent" },
    }),
    []
  );

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 pointer-events-auto"
      init={particlesInit}
      options={options}
    />
  );
};
