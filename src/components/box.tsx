import * as THREE from "three";

import { useRef } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";

interface BoxProps {
  height: number;
  isMoved: boolean;
  isPivot: boolean;
};

export default function Box(props: ThreeElements['mesh'] & BoxProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, __) => {
    meshRef.current.rotation.y += 0.01;
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      props.isMoved ? -4 : 0,
      0.1
    );
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      props.isMoved ? -4 : 0,
      0.1
    );
  });

  const isPivot = props.isPivot && "#3A9CB0";
  const isColored = props.isMoved ? "#a74e2e" : "#4c2e71";

  return (
    <mesh {...props} ref={meshRef} scale={1}>
      <boxGeometry args={[1, props.height, 1]} />
      <meshStandardMaterial color={isPivot || isColored} />
    </mesh>
  );
}
