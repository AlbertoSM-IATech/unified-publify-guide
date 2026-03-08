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
          value: 45,
          density: { enable: true, width: 1920, height: 1080 },
        },
        color: {
          value: ["#FB923C", "#3B82F6", "#F97316"],
        },
        shape: { type: ["circle", "triangle"] },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: {
            enable: true,
            speed: 0.8,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
        links: {
          enable: true,
          distance: 150,
          color: "#3B82F6",
          opacity: 0.15,
          width: 1,
          triangles: {
            enable: true,
            opacity: 0.03,
          },
        },
        move: {
          enable: true,
          speed: 0.8,
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
            distance: 200,
            links: { opacity: 0.4, color: "#FB923C" },
          },
          push: { quantity: 2 },
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
