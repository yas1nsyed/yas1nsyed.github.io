import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AnimatedText = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  const textParts = [
    { text: 'Yasin Syed Mohammed', color: '#2dd4bf' },
  ];

  let xOffset = -4;

  return (
    <Center>
      <group ref={groupRef}>
        {textParts.map((part, index) => {
          const startX = xOffset;
          xOffset += part.text.length * 0.45;

          return (
            <Text3D
              key={index}
              font="/fonts/helvetiker_regular.typeface.json"
              size={1.5}
              height={0.2}
              curveSegments={16}
              bevelEnabled
              bevelThickness={0.03}
              bevelSize={0.05}
              bevelOffset={0}
              bevelSegments={8}
              position={[startX, 0, 0]}
            >
              {part.text}
              <meshStandardMaterial
                color={part.color}
                metalness={0.8}
                roughness={0.2}
                emissive={part.color}
                emissiveIntensity={0.4}
              />
            </Text3D>
          );
        })}
      </group>
    </Center>
  );
};

const ThreeDName = () => {
  return (
    <div className="w-full h-40 md:h-48 my-4">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2dd4bf" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.5}
          penumbra={1}
          intensity={1}
          castShadow
          color="#00d9ff"
        />

        {/* 3D Text */}
        <AnimatedText />

        {/* Grid helper */}
        <gridHelper args={[20, 20, '#00d9ff', '#334155']} position={[0, -2, 0]} />

        {/* Axis helper */}
        <axesHelper args={[3]} position={[0, -2, 0]} />

        <OrbitControls
          enableZoom
          enablePan
          enableRotate
          minDistance={12}
          maxDistance={15}
          autoRotate={true}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDName;
