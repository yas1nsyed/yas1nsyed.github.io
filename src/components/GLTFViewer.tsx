import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
  scale?: number;
}

const Model = ({ url, scale = 50.5 }: ModelProps) => {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={groupRef} object={scene} scale={scale} />;
};

export const GLTFViewer = ({ modelUrl }: { modelUrl: string }) => {
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border border-primary/20">
      <Canvas camera={{ position: [2, 1, 5], fov: 50 }}>
        
        {/* Improved Lighting */}
        <ambientLight intensity={10} />
        <hemisphereLight intensity={10} groundColor="#222" />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <directionalLight position={[-5, -5, 5]} intensity={2.5} />

        {/* Bigger Model */}
        <Model url={modelUrl} scale={18} />

        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
};
