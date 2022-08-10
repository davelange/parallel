import { Canvas as FiberCanvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import Cube from "@/components/Cube";
import Limit from "@/components/Limit";
import useSceneStore from "@/lib/sceneStore";
import { COLOR, EDGE_X, EDGE_Y, EDGE_Z } from "@/lib/constants";
import { OrbitControls, Sky } from "@react-three/drei";
import style from "./index.module.css";

export default function Canvas() {
  const { toggleFloating, genCubes, pallete } = useSceneStore((state) => ({
    toggleFloating: state.toggleFloating,
    genCubes: state.genCubes,
    pallete: state.pallete,
  }));

  return (
    <div className={style.canvas_container} onClick={toggleFloating}>
      <FiberCanvas
        camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 0, 25] }}
      >
        <Physics gravity={[0, 0, 0]}>
          {/* <Debug color="#000000" scale={1.1}> */}
          {/* <OrbitControls /> */}

          <Limit
            name="start"
            position={[0, 0, EDGE_Z]}
            rotation={[0, Math.PI, 0]}
          />
          <Limit name="end" position={[0, 0, -EDGE_Z]} rotation={[0, 0, 0]} />
          <Limit
            name="right"
            position={[EDGE_X, 0, 0]}
            rotation={[0, -Math.PI / 2, 0]}
          />
          <Limit
            name="top"
            position={[0, EDGE_Y, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <Limit
            name="bottom"
            position={[0, -EDGE_Y, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <Limit
            name="left"
            position={[-EDGE_X, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
          />

          {genCubes().map((item, ind) => (
            <Cube {...item} key={ind} />
          ))}

          {/* <Background /> */}

          {/* <ambientLight intensity={0.1} /> */}
          <directionalLight color={pallete.light} position={[0, 0, 15]} />
          {/* <pointLight color="#00524e" intensity={5} position={[-5, 10, 5]} /> */}
          {/* </Debug> */}
        </Physics>
      </FiberCanvas>
    </div>
  );
}
