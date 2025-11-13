import { useRef, useMemo } from "react";
import * as THREE from "three";
import { CSG } from "three-csg-ts";
import { useFrame } from "@react-three/fiber";

interface FlangeProps {
  position?: [number, number, number];
  rotationSpeed?: number;
}

export const Flange = ({ position = [0, 0, 0], rotationSpeed = 0.005 }: FlangeProps) => {
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

const MechanicalModel = () => {
  return (
    <>
      <Flange position={[0, 0, 0]} rotationSpeed={0.01} />
      {/* Other components can be added here */}
    </>
  );
};

export default MechanicalModel;
