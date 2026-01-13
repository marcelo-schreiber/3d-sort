import * as THREE from "three";
import { useMemo } from "react";
import { a, useSpring } from "@react-spring/three";
import { ThreeElements } from "@react-three/fiber";

interface BoxProps {
  height: number;
  isMoved: boolean;
  isSwapped: boolean;
  isPivot: boolean;
  startPos: THREE.Vector3;
  endPos: THREE.Vector3;
}

type Props = BoxProps & Omit<ThreeElements["mesh"], "position">;

export default function Box({
  height,
  isMoved,
  isSwapped,
  isPivot,
  startPos,
  endPos,
  ...meshProps
}: Props) {
  const arcHeight = 1;

  const { t } = useSpring({
    t: isMoved && isSwapped ? 1 : 0,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const animatedPosition = useMemo(
    () =>
      t.to((v) => {
        const x = THREE.MathUtils.lerp(startPos.x, endPos.x, v);
        const y = THREE.MathUtils.lerp(startPos.y, endPos.y, v);
        const z =
          THREE.MathUtils.lerp(startPos.z, endPos.z, v) +
          Math.sin(v * Math.PI) *
            arcHeight *
            Math.sign(endPos.x - startPos.x || 1);

        return [x, y, z] as [number, number, number];
      }),
    [t, startPos, endPos]
  );

  const color = isPivot ? "#3A9CB0" : isMoved ? "#a74e2e" : "#4c2e71";

  return (
    <a.mesh {...meshProps} position={animatedPosition} castShadow receiveShadow>
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.05} />
    </a.mesh>
  );
}
