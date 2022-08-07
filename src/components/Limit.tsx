import { useRef } from "react";
import { PlaneProps, usePlane } from "@react-three/cannon";
import { Mesh } from "three";
import { Plane } from "@react-three/drei";

type LimitProps = PlaneProps & {
  name: string;
};

export default function Limit({ name, ...props }: LimitProps) {
  const [ref] = usePlane(() => ({ ...props, name }), useRef<Mesh>(null));

  /* return <Plane ref={ref} args={[5000, 5000]} name={name}  /> */

  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} name={name} />
      <meshBasicMaterial opacity={0} transparent />
    </mesh>
  );
}
