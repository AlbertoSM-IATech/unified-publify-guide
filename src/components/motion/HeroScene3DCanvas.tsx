import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/** A stylized editorial "book" — extruded thin box with a spine accent */
const Book = ({
  position,
  rotation,
  color,
  size,
  speed,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  size: [number, number, number];
  speed: number;
}) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = rotation[1] + Math.sin(t * speed * 0.4) * 0.25;
    ref.current.rotation.x = rotation[0] + Math.cos(t * speed * 0.3) * 0.1;
  });

  return (
    <Float speed={speed} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={ref} position={position} rotation={rotation}>
        {/* Cover */}
        <mesh>
          <boxGeometry args={size} />
          <meshStandardMaterial
            color={color}
            metalness={0.35}
            roughness={0.4}
            emissive={color}
            emissiveIntensity={0.08}
          />
        </mesh>
        {/* Spine highlight */}
        <mesh position={[-size[0] / 2 - 0.005, 0, 0]}>
          <boxGeometry args={[0.02, size[1] * 0.9, size[2] * 0.9]} />
          <meshStandardMaterial color="#FF6A1A" emissive="#FF6A1A" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

const GlassPrism = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
  });
  return (
    <Float speed={0.6} floatIntensity={1.2} rotationIntensity={0.3}>
      <mesh ref={ref} position={[0, 0, -1]}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color="#FF6A1A"
          metalness={0.6}
          roughness={0.2}
          emissive="#FF6A1A"
          emissiveIntensity={0.25}
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  const books = useMemo(
    () => [
      { pos: [-2.2, 0.9, 0.2] as [number, number, number], rot: [0.1, 0.4, -0.15] as [number, number, number], color: "#1E3A8A", size: [1.1, 1.5, 0.12] as [number, number, number], speed: 0.6 },
      { pos: [2.3, -0.5, -0.4] as [number, number, number], rot: [-0.15, -0.5, 0.2] as [number, number, number], color: "#0F172A", size: [1.2, 1.6, 0.14] as [number, number, number], speed: 0.5 },
      { pos: [-1.8, -1.4, 0.8] as [number, number, number], rot: [0.2, -0.3, 0.1] as [number, number, number], color: "#FF6A1A", size: [0.9, 1.3, 0.1] as [number, number, number], speed: 0.7 },
      { pos: [1.9, 1.6, 0.5] as [number, number, number], rot: [-0.1, 0.6, -0.2] as [number, number, number], color: "#1E293B", size: [1.0, 1.4, 0.12] as [number, number, number], speed: 0.55 },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#ffffff" />

      <GlassPrism />
      {books.map((b, i) => (
        <Book key={i} position={b.pos} rotation={b.rot} color={b.color} size={b.size} speed={b.speed} />
      ))}
    </>
  );
};

const HeroScene3DCanvas = () => (
  <Canvas
    dpr={[1, 1.25]}
    camera={{ position: [0, 0, 6], fov: 50 }}
    style={{ background: "transparent" }}
    gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    shadows={false}
  >
    <Scene />
  </Canvas>
);

export default HeroScene3DCanvas;
