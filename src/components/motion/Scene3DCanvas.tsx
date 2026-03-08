import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

const FloatingShape = ({
  position,
  color,
  size,
  speed,
  distort,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
  distort: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.1;
  });

  const isDark = useIsDarkMode();
  const opacity = isDark ? 0.12 : 0.06;

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={opacity}
          wireframe
          distort={distort}
          speed={1}
        />
      </mesh>
    </Float>
  );
};

const FloatingSphere = ({
  position,
  color,
  size,
  speed,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
  });

  const isDark = useIsDarkMode();
  const opacity = isDark ? 0.1 : 0.04;

  return (
    <Float speed={speed * 0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={opacity}
          distort={0.3}
          speed={0.8}
        />
      </mesh>
    </Float>
  );
};

/** Hook to detect dark mode inside Canvas */
function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  
  return isDark;
}

const Shapes = () => {
  const isDark = useIsDarkMode();
  
  const shapes = useMemo(
    () => [
      { pos: [-5, 2, -8] as [number, number, number], color: "hsl(24, 94%, 59%)", size: 1.0, speed: 0.25, distort: 0.2 },
      { pos: [5, -1, -10] as [number, number, number], color: "hsl(217, 91%, 60%)", size: 1.3, speed: 0.2, distort: 0.3 },
      { pos: [-2, -3, -7] as [number, number, number], color: "hsl(24, 94%, 50%)", size: 0.7, speed: 0.3, distort: 0.15 },
      { pos: [3, 3, -12] as [number, number, number], color: "hsl(217, 91%, 60%)", size: 1.8, speed: 0.15, distort: 0.4 },
    ],
    []
  );

  const spheres = useMemo(
    () => [
      { pos: [-4, 1, -6] as [number, number, number], color: "hsl(217, 91%, 60%)", size: 0.5, speed: 0.4 },
      { pos: [3, -2, -8] as [number, number, number], color: "hsl(24, 94%, 59%)", size: 0.3, speed: 0.5 },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={isDark ? 0.5 : 0.3} />
      <pointLight position={[10, 10, 10]} intensity={isDark ? 0.3 : 0.15} />
      {shapes.map((s, i) => (
        <FloatingShape
          key={`shape-${i}`}
          position={s.pos}
          color={s.color}
          size={s.size}
          speed={s.speed}
          distort={s.distort}
        />
      ))}
      {spheres.map((s, i) => (
        <FloatingSphere
          key={`sphere-${i}`}
          position={s.pos}
          color={s.color}
          size={s.size}
          speed={s.speed}
        />
      ))}
    </>
  );
};

const Scene3DCanvas = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <Shapes />
    </Canvas>
  );
};

export default Scene3DCanvas;