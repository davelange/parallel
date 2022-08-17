import { Mesh } from "three";
import { useEffect, useRef } from "react";
import { CollideBeginEvent, Triplet, useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { easeOutCubic } from "../utils/easings";
import useSceneStore, { BlockType } from "../lib/sceneStore";
import { Edges } from "@react-three/drei";
import { SNAP_DURATION } from "@/lib/constants";

export enum _ {
  X = 0,
  Y = 1,
  Z = 2,
  NEG = -1,
  POS = 1,
}

const ANGULAR_VEL = [0.2, 0.2, 0.2];

let frame = 0;

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

  const floating = useSceneStore((s) => s.floating);

  const velo = useRef<Triplet>([motionX, motionY, 0]);
  const pos = useRef<Triplet>();
  const rotation = useRef<Triplet>();
  const snapLastPos = useRef<Triplet>([0, 0, 0]);
  const snap = useRef({
    active: false,
    initialPos: [0, 0, 0] as Triplet,
    initialRot: [0, 0, 0] as Triplet,
    doneCycles: 0,
    lastMove: 0,
    destination: [endX, 0, 0] as Triplet,
    alternator: [1, 1, 1] as Triplet,
    alternatorRot: [1, 1, 1] as Triplet,
    endFrame: 0,
  });

  useEffect(() => {
    api.position.subscribe((v) => (pos.current = v));
    api.rotation.subscribe((v) => (rotation.current = v));
  }, []);

  useEffect(() => {
    if (!pos?.current) return;

    floating ? snapBack() : snapToCenter();
  }, [floating]);

  function invertGravity(event: CollideBeginEvent) {
    if (!floating) {
      return;
    }

    const limit = event.body.name;

    if (["top", "bottom"].includes(limit)) {
      velo.current[_.Y] *= _.NEG;
      api.velocity.set(...velo.current);
    } else if (["right", "left"].includes(limit)) {
      velo.current[_.X] *= _.NEG;
    } else if (["startt", "end"].includes(limit)) {
      velo.current[_.Z] *= _.NEG;
    }

    api.velocity.set(...velo.current);
  }

  function calcAlternator(prop: string, to: Triplet): Triplet {
    const data = prop === "position" ? pos.current : rotation.current;

    return [
      data![_.X] > to[_.X] ? _.NEG : _.POS,
      data![_.Y] > to[_.Y] ? _.NEG : _.POS,
      data![_.Z] > to[_.Z] ? _.NEG : _.POS,
    ];
  }

  function snapToCenter() {
    api.sleep();
    
    snap.current = {
      active: true,
      initialPos: pos.current!,
      initialRot: rotation.current!,
      destination: [endX, 0, 0],
      lastMove: 0,
      doneCycles: 0,
      alternator: calcAlternator("position", [endX, 0, 0]),
      alternatorRot: calcAlternator("rotation", [0, 0, 0]),
      endFrame: 0,
    };
    snapLastPos.current = pos.current!;
  }

  function snapBack() {
    snap.current = {
      active: true,
      destination: snapLastPos.current,
      initialPos: pos.current!,
      initialRot: rotation.current!,
      lastMove: 0,
      doneCycles: 0,
      alternator: calcAlternator("position", snapLastPos.current),
      alternatorRot: calcAlternator("rotation", [0, 0, 0]),
      endFrame: 0,
    };
  }

  function rotate() {
    if (!rotation?.current) {
      return;
    }

    if (floating) {
      api.rotation.set(
        rotation.current[_.X] + 0.01,
        rotation.current[_.Y] + 0.01,
        rotation.current[_.Z] + 0.01
      );

      return;
    }

    const staggerOffset = ind * 150;

    if (frame < snap.current.endFrame + staggerOffset || snap.current.active) {
      return;
    }

    api.rotation.set(
      rotation.current[_.X] + 0.02,
      rotation.current[_.Y],
      rotation.current[_.Z]
    );
  }

  useFrame(() => {
    frame++;

    rotate();

    if (!pos.current || !rotation.current || !snap.current.active) {
      return;
    }

    const [px, py, pz] = pos.current;
    const [rx, ry, rz] = rotation.current;
    let {
      doneCycles,
      alternator,
      alternatorRot,
      initialPos,
      initialRot,
      lastMove,
      destination,
    } = snap.current;

    if (doneCycles === SNAP_DURATION) {
      if (floating) {
        api.velocity.set(...velo.current);
        api.wakeUp();
      } else {
        api.sleep();
      }

      snap.current.active = false;
      snap.current.endFrame = frame;

      return;
    }

    const ease = easeOutCubic(doneCycles, SNAP_DURATION);

    const moveY =
      Math.abs(initialPos[_.Y] - destination[_.Y]) *
      (ease - lastMove) *
      alternator[_.Y];
    const moveX =
      Math.abs(initialPos[_.X] - destination[_.X]) *
      (ease - lastMove) *
      alternator[_.X];
    const moveZ =
      Math.abs(initialPos[_.Z] - destination[_.Z]) *
      (ease - lastMove) *
      alternator[_.Z];

    const rotZ =
      Math.abs(initialRot[_.Z]) * (ease - lastMove) * alternatorRot[_.Z];
    const rotX =
      Math.abs(initialRot[_.X]) * (ease - lastMove) * alternatorRot[_.X];
    const rotY =
      Math.abs(initialRot[_.Y]) * (ease - lastMove) * alternatorRot[_.Y];

    api.position.set(px + moveX, py + moveY, pz + moveZ);
    api.rotation.set(rx + rotX, ry + rotY, rz + rotZ);

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
