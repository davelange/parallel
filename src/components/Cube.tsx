import { Vector3, Matrix4, Vector } from "three";
import { Mesh } from "three";
import { useEffect, useRef } from "react";
import { CollideBeginEvent, Triplet, useBox } from "@react-three/cannon";
import { ThreeEvent, useFrame } from "@react-three/fiber";

const INC = 0.1;

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
  const floating = useRef(true);
  const pos = useRef<Triplet>();
  const posAtSnap = useRef<Triplet>();
  const easeCount = useRef(0);
  const easeProgress = useRef(0);
  const inc = useRef(0);

  /* const posAtClick = useRef<Vector3>(); */

  const [cubeRef, api] = useBox<Mesh>(() => ({
    mass: 1,
    position: [x, y, 0],
    /* velocity: [motionX, motionY, 0], */
    velocity: [0, -1, 0],
    onCollideBegin: invertGravity,
  }));

  function easeInOutBack(done: number, target: number): number {
    let progress = (done * 100) / target / 100;

    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    const val =
      progress < 0.5
        ? (Math.pow(2 * progress, 2) * ((c2 + 1) * 2 * progress - c2)) / 2
        : (Math.pow(2 * progress - 2, 2) *
            ((c2 + 1) * (progress * 2 - 2) + c2) +
            2) /
          2;

    return val * inc.current * 10;
  }

  function invertGravity(event: CollideBeginEvent) {
    if (!floating.current) return;

    const limit = event.body.name;

    if (limit === "top" || limit === "bottom") {
      velo.current[1] *= -1;
    } else if (limit === "right" || limit === "left") {
      velo.current[0] *= -1;
    }

    api.velocity.set(...(velo.current as Triplet));
  }

  function snap(event: ThreeEvent<MouseEvent>) {
    if (!floating.current) {
      api.velocity.set(...(velo.current as Triplet));
      floating.current = true;
    } else {
      floating.current = false;
      api.velocity.set(0, 0, 0);

      posAtSnap.current = pos.current;
      easeCount.current = Math.abs(
        Math.round((pos.current as Triplet)[1] / INC)
      );
      inc.current = pos.current![1] > 0 ? INC * -1 : INC;

      console.log(`set for ${easeCount.current} cycles`);
      console.log(`pos at snap: ${posAtSnap.current![1]}`);
    }
  }

  useFrame(({}) => {
    if (!pos.current || floating.current) {
      return;
    }

    const [x, y, z] = pos.current;

    const diff = Math.abs(0 - y);

    if (easeCount.current === easeProgress.current) {
      console.log("END of animation");

      api.velocity.set(0, 0, 0);

      return;
    }

    /* if (diff > 0.1) { */

    
    const ease = easeInOutBack(easeProgress.current, easeCount.current);
    const move = ease * diff;

    easeProgress.current += 1;

    //let inc = diff < 0 ? -ease : ease;
    console.log(`y: ${ease.toFixed(3)} | move ${move} | to: ${y + ease * diff}`);
    /* let inc = ease; */
    api.position.set(x, move, z);
    /* } */
  });

  useEffect(() => api.position.subscribe((v) => (pos.current = v)), []);

  return (
    <mesh ref={cubeRef} position={[x, y, z]} onClick={snap}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
