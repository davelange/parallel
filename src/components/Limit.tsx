import { useRef } from "react";
import { PlaneProps, usePlane } from "@react-three/cannon";
import { Mesh } from "three";

type LimitProps = PlaneProps & {
  name: string;
};

export default function Limit({ name, ...props }: LimitProps) {
  const [ref] = usePlane(() => ({ ...props, name }), useRef<Mesh>(null));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} name={name} />
      <meshBasicMaterial opacity={0} transparent />
    </mesh>
  );
}
