"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function FloatingSpheres() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.5, 32, 32]}
          position={[i * 2 - 4, Math.sin(i) * 2, -5]}
        >
          <meshStandardMaterial
            color={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-20">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingSpheres />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
