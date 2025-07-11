import {
  ContactShadows,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Box from "./box";

type TBox = {
  idx: number;
  idx2: number;
  pivot?: number;
  swapped?: boolean;
  arr: number[];
};

export function SortCanvas({ array, boxes }: { array: number[]; boxes: TBox }) {
  const maxHeight = Math.max(...array);
  return (
    <Canvas
      camera={{
        fov: 45,
        position: [0, 4, 20],
        near: 0.1,
        far: 2000,
      }}
      className="cursor-grab min-h-96"
      shadows
    >
      <ambientLight intensity={3} />
      <pointLight position={[10, 10, 10]} />

      <OrbitControls enablePan={false} enableZoom={true} />
      {array.map((h, idx) => {
        const isActive = boxes?.idx === idx || boxes?.idx2 === idx;
        const startPos = new THREE.Vector3(-array.length + 2 * idx, 0, 0);
        const endPos = isActive
          ? idx === boxes.idx
            ? new THREE.Vector3(-array.length + 2 * boxes.idx2, 0, 0)
            : new THREE.Vector3(-array.length + 2 * boxes.idx, 0, 0)
          : startPos;
        return (
          <Box
            height={h}
            key={`${idx}-${h}`}
            position={[-array.length + 2 * idx, 4, 0]}
            startPos={startPos}
            endPos={endPos}
            isMoved={isActive}
            isPivot={boxes.pivot === idx}
            isSwapped={isActive && boxes.swapped === true}
          />
        );
      })}
      {array.map((_, idx) => (
        <ContactShadows
          key={idx}
          position={[0, -(maxHeight / 2) - 2, 0]}
          scale={array.length * 4}
          opacity={0.09}
          blur={0.4}
          far={maxHeight}
        />
      ))}
    </Canvas>
  );
}
