import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
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
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          wireframe
          distort={distort}
          speed={2}
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
      position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
  });

  return (
    <Float speed={speed * 0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.08}
          distort={0.4}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
};

const Shapes = () => {
  const shapes = useMemo(
    () => [
      { pos: [-4, 2, -5] as [number, number, number], color: "#FB923C", size: 1.2, speed: 0.4, distort: 0.3 },
      { pos: [4, -1, -6] as [number, number, number], color: "#3B82F6", size: 1.5, speed: 0.3, distort: 0.4 },
      { pos: [-2, -2, -4] as [number, number, number], color: "#F97316", size: 0.8, speed: 0.5, distort: 0.25 },
      { pos: [3, 3, -7] as [number, number, number], color: "#3B82F6", size: 1.0, speed: 0.35, distort: 0.35 },
      { pos: [0, 0, -8] as [number, number, number], color: "#FB923C", size: 2.0, speed: 0.2, distort: 0.5 },
    ],
    []
  );

  const spheres = useMemo(
    () => [
      { pos: [-3, 1, -3] as [number, number, number], color: "#3B82F6", size: 0.6, speed: 0.6 },
      { pos: [2, -2, -4] as [number, number, number], color: "#FB923C", size: 0.4, speed: 0.8 },
      { pos: [5, 1, -5] as [number, number, number], color: "#F97316", size: 0.5, speed: 0.5 },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.3} />
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
