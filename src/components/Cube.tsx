import { Vector3, Matrix4, Vector } from "three";
import { Mesh } from "three";
import { useEffect, useRef } from "react";
import { CollideBeginEvent, Triplet, useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { easeInOutBack, easeOutBounce } from "../utils/easings";
import useSceneStore from "../lib/sceneStore";

const CYCLES = 100;

enum _ {
  X = 0,
  Y = 1,
  Z = 2,
  NEG = -1,
  POS = 1,
}

export default function Cube({
  x,
  y,
  z,
  endX,
  motionX,
  motionY,
}: {
  x: number;
  y: number;
  z: number;
  endX: number;
  motionX: number;
  motionY: number;
}) {
  const [cubeRef, api] = useBox<Mesh>(() => ({
    mass: 1,
    position: [x, y, z],
    velocity: [motionX, motionY, 0],
    onCollideBegin: invertGravity,
  }));

  const velo = useRef<Triplet>([motionX, motionY, 0]);
  const floating = useRef(true);
  const pos = useRef<Triplet>();
  const rotation = useRef<Triplet>();
  const snap = useRef({
    initialPos: [0, 0, 0] as Triplet,
    doneCycles: 0,
    lastMove: 0,
    alternator: [1, 1, 1] as Triplet,
  });

  useEffect(() => {
    api.position.subscribe((v) => (pos.current = v));
    api.rotation.subscribe((v) => (rotation.current = v));
  }, []);

  function invertGravity(event: CollideBeginEvent) {
    if (!floating.current) {
      return;
    }

    const limit = event.body.name;

    if (["top", "bottom"].includes(limit)) {
      velo.current[_.Y] *= -1;
    } else if (["right", "left"].includes(limit)) {
      velo.current[_.X] *= -1;
    }

    api.velocity.set(...velo.current);
  }

  function startSnap() {
    if (floating.current) {
      snap.current = {
        ...snap.current,
        initialPos: pos.current!,
        alternator: [
          pos.current![_.X] > endX ? _.NEG : _.POS,
          pos.current![_.Y] > 0 ? _.NEG : _.POS,
          pos.current![_.Z] > 0 ? _.NEG : _.POS,
        ],
      };
      floating.current = false;
      api.velocity.set(0, 0, 0);
      api.isTrigger.set(false);
      api.collisionResponse.set(false);
      api.angularVelocity.set(0, 0, 0);
    } else {
      floating.current = true;
      api.velocity.set(...velo.current);
      snap.current = {
        ...snap.current,
        lastMove: 0,
        doneCycles: 0,
      };
    }
  }

  useSceneStore.subscribe(() => startSnap());

  function rotate() {
    if (!rotation?.current) {
      return;
    }

    api.rotation.set(
      rotation.current[_.X] + 0.01,
      rotation.current[_.Y] + 0.01,
      rotation.current[_.Z]
    );
  }

  useFrame(() => {
    rotate();

    if (
      !pos.current ||
      floating.current ||
      snap.current.doneCycles === CYCLES
    ) {
      return;
    }

    const [x, y, z] = pos.current;
    let { doneCycles, alternator, initialPos, lastMove } = snap.current;

    const ease = easeOutBounce(doneCycles, CYCLES);

    const moveY =
      Math.abs(initialPos[_.Y]) * (ease - lastMove) * alternator[_.Y];
    const moveX =
      Math.abs(initialPos[_.X] - endX) * (ease - lastMove) * alternator[_.X];
    const moveZ =
      Math.abs(initialPos[_.Z]) * (ease - lastMove) * alternator[_.Z];

    api.position.set(x + moveX, y + moveY, z + moveZ);

    snap.current = {
      ...snap.current,
      doneCycles: doneCycles + 1,
      lastMove: ease,
    };
  });

  return (
    <mesh ref={cubeRef} position={[x, y, z]} onClick={startSnap}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
