import { OrbitControls } from "@react-three/drei";
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
  return (
    <Canvas
      camera={{ fov: 55, position: [0, 6, 14], near: 0.1, far: 2000 }}
      className="cursor-grab min-h-96"
      shadows
    >
      <fog attach="fog" args={["#0b0b15", 5, 70]} />

      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <pointLight position={[-10, 5, -5]} intensity={0.6} castShadow />
      <OrbitControls enablePan={false} enableZoom />

      {array.map((h, idx) => {
        const isA = boxes.idx === idx;
        const isB = boxes.idx2 === idx;
        const isActive = isA || isB;

        const baseX = -array.length + 2 * idx;
        const swapX = isA
          ? -array.length + 2 * boxes.idx2
          : isB
          ? -array.length + 2 * boxes.idx
          : baseX;

        return (
          <Box
            key={`${idx}-${h}`}
            height={h}
            startPos={new THREE.Vector3(baseX, 0, 0)}
            endPos={new THREE.Vector3(swapX, 0, 0)}
            isMoved={isActive}
            isSwapped={boxes.swapped === true}
            isPivot={boxes.pivot === idx}
          />
        );
      })}
    </Canvas>
  );
}
