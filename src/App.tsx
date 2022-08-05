import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import Cube from "./components/Cube";
import { Physics, Debug } from "@react-three/cannon";
import Limit from "./components/Limit";
import { OrbitControls } from "@react-three/drei";
import { randomNegativeOrPositive } from "./utils/math";
import useSceneStore from "./lib/sceneStore";

const BLOCK_QTY = 12;
const MAX_POS = 10;
const SPEED = 1;

export default function App() {
  const toggleFloating = useSceneStore((state) => state.toggleFloating);

  const blockArray = useMemo(
    () =>
      new Array(BLOCK_QTY).fill(0).map((_, ind) => ({
        x: randomNegativeOrPositive(15),
        y: randomNegativeOrPositive(6),
        z: randomNegativeOrPositive(4),
        endX: ind * 20 / BLOCK_QTY - 10,
        motionX: ind % 2 === 0 ? SPEED : -SPEED,
        motionY: ind % 2 === 0 ? -SPEED : SPEED,
      })),
    []
  );

  return (
    <div id="canvas-container" onClick={toggleFloating}>
      <Canvas camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 0, 25] }}>
        <Physics gravity={[0, 0, 0]}>
          {/* <Debug color="black" scale={1.1}> */}
            <OrbitControls />

            <Limit
              name="end"
              position={[0, 0, -20]}
              rotation={[0, 0, -Math.PI / 2]}
            />
            <Limit
              name="right"
              position={[10, 0, 0]}
              rotation={[0, -Math.PI / 2, 0]}
            />
            <Limit
              name="top"
              position={[0, 10, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <Limit
              name="bottom"
              position={[0, -10, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <Limit
              name="left"
              position={[-10, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
            />

            {blockArray.map((item, ind) => (
              <Cube {...item} key={ind} />
            ))}

            <ambientLight intensity={0.1} />
            <directionalLight color="#fff" position={[0, 0, 5]} />
          {/* </Debug> */}
        </Physics>
      </Canvas>
    </div>
  );
}
