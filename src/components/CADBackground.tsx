import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TechnicalGrid = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
      gridRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[20, 20, '#00d9ff', '#1e293b']} />
      <gridHelper args={[20, 20, '#2dd4bf', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <gridHelper args={[20, 20, '#10b981', '#1e293b']} rotation={[0, 0, Math.PI / 2]} />
    </group>
  );
};

const FloatingWireframe = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.5;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial color="#00d9ff" wireframe />
    </mesh>
  );
};

const CADBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <TechnicalGrid />
        <FloatingWireframe position={[-5, 2, -5]} />
        <FloatingWireframe position={[5, 3, -3]} />
        <FloatingWireframe position={[0, 4, -8]} />
        <FloatingWireframe position={[-3, 1, -6]} />
      </Canvas>
    </div>
  );
};

export default CADBackground;
