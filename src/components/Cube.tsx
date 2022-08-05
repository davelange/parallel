import { Mesh } from "three";
import { useRef } from "react";
import { CollideBeginEvent, Triplet, useBox } from "@react-three/cannon";

export default function Cube({
  x,
  y,
  z,
  motionX,
  motionY,
}: {
  x: number;
  y: number;
  z: number;
  motionX: number;
  motionY: number;
}) {
  const velo = useRef([motionX, motionY, 0]);

  const [cubeRef, api] = useBox<Mesh>(() => ({
    mass: 1,
    position: [x, y, z],
    velocity: [motionX, motionY, 0],
    onCollideBegin: invertGravity,
  }));

  function invertGravity(event: CollideBeginEvent) {
    const limit = event.body.name;

    if (limit === "top" || limit === "bottom") {
      velo.current[1] *= -1;
    } else if (limit === "right" || limit === "left") {
      velo.current[0] *= -1;
    }

    api.velocity.set(...(velo.current as Triplet));
  }

  return (
    <mesh ref={cubeRef} position={[x, y, z]}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
