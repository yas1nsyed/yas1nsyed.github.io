import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Mechanical Gear Component
const Gear = ({ position, rotationSpeed = 0.01 }: { position: [number, number, number], rotationSpeed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += rotationSpeed;
    }
  });

  // Create gear shape
  const gearShape = new THREE.Shape();
  const outerRadius = 1;
  const innerRadius = 0.6;
  const teeth = 12;
  
  for (let i = 0; i < teeth; i++) {
    const angle1 = (i / teeth) * Math.PI * 2;
    const angle2 = ((i + 0.4) / teeth) * Math.PI * 2;
    const angle3 = ((i + 0.6) / teeth) * Math.PI * 2;
    const angle4 = ((i + 1) / teeth) * Math.PI * 2;
    
    if (i === 0) {
      gearShape.moveTo(Math.cos(angle1) * outerRadius, Math.sin(angle1) * outerRadius);
    } else {
      gearShape.lineTo(Math.cos(angle1) * outerRadius, Math.sin(angle1) * outerRadius);
    }
    
    gearShape.lineTo(Math.cos(angle2) * outerRadius, Math.sin(angle2) * outerRadius);
    gearShape.lineTo(Math.cos(angle3) * innerRadius, Math.sin(angle3) * innerRadius);
    gearShape.lineTo(Math.cos(angle4) * innerRadius, Math.sin(angle4) * innerRadius);
  }
  
  gearShape.lineTo(Math.cos(0) * outerRadius, Math.sin(0) * outerRadius);
  
  // Add center hole
  const holePath = new THREE.Path();
  holePath.absarc(0, 0, 0.3, 0, Math.PI * 2, false);
  gearShape.holes.push(holePath);

  const extrudeSettings = {
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2
  };

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <extrudeGeometry args={[gearShape, extrudeSettings]} />
      <meshStandardMaterial 
        color="#00d9ff" 
        metalness={0.8} 
        roughness={0.2}
        emissive="#00d9ff"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Wireframe CAD Cube
const WireframeCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#2dd4bf" wireframe />
    </mesh>
  );
};

// Main 3D Scene Component
const MechanicalModel = () => {
  return (
    <div className="w-full h-[500px] bg-background/50 rounded-xl overflow-hidden border border-primary/20">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 3, 5]} />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          minDistance={3}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d9ff" />
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          castShadow 
          color="#2dd4bf"
        />
        
        {/* 3D Models */}
        <Gear position={[0, 0, 0]} rotationSpeed={0.01} />
        <Gear position={[1.8, 0, 0]} rotationSpeed={-0.01} />
        
        {/* Grid helper for CAD feel */}
        <gridHelper args={[10, 10, '#00d9ff', '#334155']} position={[0, -2, 0]} />
        
        {/* Axis helper */}
        <axesHelper args={[3]} />
      </Canvas>
    </div>
  );
};

export default MechanicalModel;
