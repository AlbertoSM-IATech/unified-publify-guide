import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/** Ambient prism only — books removed to keep scene calm */

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
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#ffffff" />
      <GlassPrism />
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
