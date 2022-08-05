import { useRef } from "react";
import { PlaneProps, usePlane } from "@react-three/cannon";
import { Plane } from "@react-three/drei";
import { Mesh } from "three";

type LimitProps = PlaneProps & {
  name: string;
}

export default function Limit({name, ...props}: LimitProps) {
  const [ref] = usePlane(() => ({ ...props, name }), useRef<Mesh>(null))

  return (
    <Plane ref={ref} args={[5000, 5000]} name={name}>       
    </Plane>
  );
}
