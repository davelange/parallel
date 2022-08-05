import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import Cube from "./components/Cube";

const BLOCK_QTY = 20;
const MAX_POS = 10;

// 18 _ 8

export default function App() {
  const randomNegativeOrPositive = (max: number) =>
    Math.ceil(Math.random() * max) * (Math.round(Math.random()) ? 1 : -1);

  const blockArray = useMemo(
    () =>
      new Array(1).fill(0).map((item, ind) => ({
        x: randomNegativeOrPositive(15),
        y: randomNegativeOrPositive(6),
        z: randomNegativeOrPositive(4),
        motionX: ind % 2 === 0 ? 0.1 : -0.1,
        motionZ: ind % 2 === 0 ? -0.1 : 0.1,
      })),
    []
  );

  return (
    <div id="canvas-container">
      <Canvas camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 0, 20] }}>
        {blockArray.map((item) => (
          <Cube {...item} />
        ))}

        <ambientLight intensity={0.1} />
        <directionalLight color="#fff" position={[0, 0, 5]} />
      </Canvas>
    </div>
  );
}
