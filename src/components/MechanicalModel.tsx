import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

interface FlangeProps {
  position?: [number, number, number];
  rotationSpeed?: number;
}

const Flange = ({ position = [0, 0, 0], rotationSpeed = 0.005 }: FlangeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  const flangeMesh = useMemo(() => {
    // === Parameters ===
    const FLANGE_OUTER_DIAMETER = 100.0;
    const FLANGE_THICKNESS = 7.5;
    const BORE_INNER_DIAMETER = 50.0;
    const NECK_HEIGHT = 15.0;
    const NECK_OUTER_DIAMETER = 60.0;

    const NUM_BOLT_HOLES = 6;
    const BOLT_HOLE_DIAMETER = 12.0;
    const PCD = 75.0;

    const totalHeight = FLANGE_THICKNESS + NECK_HEIGHT;

    // Base flange disk
    const flange = new THREE.Mesh(
      new THREE.CylinderGeometry(
        FLANGE_OUTER_DIAMETER / 2,
        FLANGE_OUTER_DIAMETER / 2,
        FLANGE_THICKNESS,
        96
      )
    );
    flange.position.y = 0;

    // Bore hole
    const bore = new THREE.Mesh(
      new THREE.CylinderGeometry(
        BORE_INNER_DIAMETER / 2,
        BORE_INNER_DIAMETER / 2,
        FLANGE_THICKNESS * 1.2,
        64
      )
    );

    const flangeWithBore = CSG.subtract(flange, bore);

    // Neck outer
    const neckOuter = new THREE.Mesh(
      new THREE.CylinderGeometry(
        NECK_OUTER_DIAMETER / 2,
        NECK_OUTER_DIAMETER / 2,
        NECK_HEIGHT,
        96
      )
    );
    neckOuter.position.y = FLANGE_THICKNESS / 2 + NECK_HEIGHT / 2;

    // Neck inner (hollow)
    const neckInner = new THREE.Mesh(
      new THREE.CylinderGeometry(
        BORE_INNER_DIAMETER / 2,
        BORE_INNER_DIAMETER / 2,
        NECK_HEIGHT * 1.2,
        64
      )
    );
    neckInner.position.copy(neckOuter.position);

    const hollowNeck = CSG.subtract(neckOuter, neckInner);

    // Fuse flange + neck
    let finalFlange = CSG.union(flangeWithBore, hollowNeck);

    // Bolt holes
    const boltRadius = BOLT_HOLE_DIAMETER / 2;
    const boltCircleRadius = PCD / 2;

    for (let i = 0; i < NUM_BOLT_HOLES; i++) {
      let angle = (i * 2 * Math.PI) / NUM_BOLT_HOLES;

      const x = boltCircleRadius * Math.cos(angle);
      const z = boltCircleRadius * Math.sin(angle);

      const hole = new THREE.Mesh(
        new THREE.CylinderGeometry(boltRadius, boltRadius, totalHeight * 1.2, 48)
      );
      hole.rotation.x = Math.PI / 2;
      hole.position.set(x, 0, z);

      finalFlange = CSG.subtract(finalFlange, hole);
    }

    finalFlange.updateMatrix();
    finalFlange.geometry.computeVertexNormals();

    return finalFlange;
  }, []);

  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={flangeMesh.geometry}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color="#00d9ff"
        metalness={0.8}
        roughness={0.25}
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
        <Flange position={[0, 0, 0]} rotationSpeed={0.005} />
        
        {/* Grid helper for CAD feel */}
        <gridHelper args={[10, 10, '#00d9ff', '#334155']} position={[0, -2, 0]} />
        
        {/* Axis helper */}
        <axesHelper args={[3]} />
      </Canvas>
    </div>
  );
};

export default MechanicalModel;
