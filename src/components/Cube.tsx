import { Vector3, Matrix4, Vector, BackSide } from "three";
import { Mesh } from "three";
import { useEffect, useRef } from "react";
import { CollideBeginEvent, Triplet, useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import {
  easeInOutBack,
  easeInOutCirc,
  easeOutBounce,
  easeOutCubic,
  easeOutQuart,
} from "../utils/easings";
import useSceneStore, { BlockType } from "../lib/sceneStore";
import { Edges } from "@react-three/drei";
import { BLOCK_QTY } from "@/lib/constants";

const CYCLES = 100;

export enum _ {
  X = 0,
  Y = 1,
  Z = 2,
  NEG = -1,
  POS = 1,
}

const ANGULAR_VEL = [0.2, 0.2, 0.2];

export default function Cube({
  x,
  y,
  z,
  endX,
  motionX,
  motionY,
  pallete,
  ind,
}: BlockType) {
  const [cubeRef, api] = useBox<Mesh>(() => ({
    mass: 1,
    position: [x, y, z],
    rotation: [x, y, z],
    velocity: [motionX, motionY, motionY],
    angularVelocity: [0.2, 0.2, 0.2],
    onCollideBegin: invertGravity,
  }));

  const floatingState = useSceneStore().floating;

  const velo = useRef<Triplet>([motionX, motionY, 0]);
  const pos = useRef<Triplet>();
  const rotation = useRef<Triplet>();
  const snap = useRef({
    initialPos: [0, 0, 0] as Triplet,
    doneCycles: 0,
    lastMove: 0,
    alternator: [1, 1, 1] as Triplet,
  });

  useSceneStore.subscribe((store) => {
    if (pos.current) startSnap();
  });

  useEffect(() => {
    api.position.subscribe((v) => {
      pos.current = v;
    });
    api.rotation.subscribe((v) => (rotation.current = v));
  }, []);

  function invertGravity(event: CollideBeginEvent) {
    console.log(`invertGravity: ${floatingState} | -> ${event.body.name}`);

    if (!floatingState) {
      return;
    }

    const limit = event.body.name;

    if (["top", "bottom"].includes(limit)) {
      velo.current[_.Y] *= -1;

      api.velocity.set(...velo.current);
    } else if (["right", "left"].includes(limit)) {
      velo.current[_.X] *= -1;
    } else if (["startt", "end"].includes(limit)) {
      velo.current[_.Z] *= -1;
    }

    api.velocity.set(...velo.current);
  }

  function startSnap() {
    if (floatingState) {
      snap.current = {
        ...snap.current,
        initialPos: pos.current!,
        alternator: [
          pos.current![_.X] > endX ? _.NEG : _.POS,
          pos.current![_.Y] > 0 ? _.NEG : _.POS,
          pos.current![_.Z] > 0 ? _.NEG : _.POS,
        ],
      };
      /* floating = false; */
      /* api.velocity.set(0, 0, 0);
      api.isTrigger.set(false);
      api.collisionResponse.set(false);
      api.angularVelocity.set(0, 0, 0); */
      api.sleep();
    } else {
      /* floating.current = true; */
      /* api.velocity.set(...velo.current);
      api.isTrigger.set(true);
      api.collisionResponse.set(true);
      api.angularVelocity.set(...(ANGULAR_VEL as Triplet)); */
      api.wakeUp();
      api.velocity.set(...velo.current);
      snap.current = {
        ...snap.current,
        lastMove: 0,
        doneCycles: 0,
      };

      if (ind === 0) {
        api.applyForce([100, 0, 0], [0, 0, 0]);
      } else if (ind === BLOCK_QTY - 1) {
        api.applyForce([-100, 0, 0], [0, 0, 0]);
      }
    }
  }

  function rotate() {
    if (!rotation?.current) {
      return;
    }

    api.rotation.set(
      rotation.current[_.X] + 0.0,
      rotation.current[_.Y] + 0.01,
      rotation.current[_.Z] + 0.01
    );
  }

  useFrame(() => {
    rotate();

    if (!pos.current || floatingState || snap.current.doneCycles === CYCLES) {
      return;
    }

    const [x, y, z] = pos.current;
    let { doneCycles, alternator, initialPos, lastMove } = snap.current;

    const ease = easeOutCubic(doneCycles, CYCLES);

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
    <mesh ref={cubeRef} position={[x, y, z]} name={`cube-${ind}`}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial transparent opacity={0.8} color={pallete.emissive} />
      <Edges color={pallete.emissive} />
    </mesh>
  );
}
