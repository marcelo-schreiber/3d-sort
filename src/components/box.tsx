import * as THREE from "three";

import { useRef } from "react";
import { MeshProps, useFrame } from "@react-three/fiber";

interface BoxProps extends MeshProps {
  height: number;
  isMoved: boolean;
  isPivot: boolean;
}

export default function Box(props: BoxProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, __) => {
    meshRef.current.rotation.y += 0.01;
    if (meshRef.current.position.y >= -4 && props.isMoved) {
      meshRef.current.position.y -= 0.1;
      meshRef.current.position.z -= 0.1;
    } else if (!props.isMoved && meshRef.current.position.y <= 0) {
      meshRef.current.position.y += 0.1;
      meshRef.current.position.z += 0.1;
    }
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
