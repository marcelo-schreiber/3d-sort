import * as THREE from "three";
import { useEffect, useRef } from "react";
import { a, useSpring } from "@react-spring/three";
import { ThreeElements } from "@react-three/fiber";

interface BoxProps {
  height: number;
  isMoved: boolean; // whether to animate
  isSwapped: boolean; // trigger animation
  isPivot: boolean;
  startPos: THREE.Vector3; // starting position of box
  endPos: THREE.Vector3; // target position to swap with
}

export default function Box(props: BoxProps & ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Arc height for z offset
  const arcHeight = 1;

  // Spring progress t [0,1]
  const [springs, api] = useSpring(() => ({
    t: 0,
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  // Trigger animation when isMoved and isSwapped become true
  useEffect(() => {
    if (props.isMoved && props.isSwapped) {
      api.start({ t: 1 });
    } else {
      api.start({ t: 0 });
    }
  }, [props.isMoved, props.isSwapped]);

  // Calculate arc position between startPos and endPos
  const animatedPosition = springs.t.to((t) => {
    // Lerp linearly on x and y
    const x = THREE.MathUtils.lerp(props.startPos.x, props.endPos.x, t);
    const y = THREE.MathUtils.lerp(props.startPos.y, props.endPos.y, t);

    // Calculate horizontal distance for direction of arc in z
    const dx = props.endPos.x - props.startPos.x;
    const direction = dx >= 0 ? 1 : -1;

    // Arc offset in Z with sine for smooth up/down arc
    const z =
      THREE.MathUtils.lerp(props.startPos.z, props.endPos.z, t) +
      Math.sin(t * Math.PI) * arcHeight * direction;

    return [x, y, z];
  });

  const isPivot = props.isPivot && "#3A9CB0";
  const isColored = props.isMoved ? "#a74e2e" : "#4c2e71";

  return (
    <a.mesh
      {...props}
      ref={meshRef}
      // @ts-ignore
      position={animatedPosition}
      scale={1}
    >
      <boxGeometry args={[1, props.height, 1]} />
      <meshStandardMaterial color={isPivot || isColored} />
    </a.mesh>
  );
}
