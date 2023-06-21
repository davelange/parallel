import { Canvas as FiberCanvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/cannon";
import Cube from "@/components/Cube";
import Limit from "@/components/Limit";
import useSceneStore from "@/lib/sceneStore";
import { COLOR, EDGE_X, EDGE_Y, EDGE_Z } from "@/lib/constants";
import style from "./index.module.css";
import CanvasText from "../CanvasText";
import { OrbitControls } from "@react-three/drei";

const Scene = () => {
  const { genCubes, pallete, debug } = useSceneStore((state) => ({
    genCubes: state.genCubes,
    pallete: state.pallete,
    debug: state.debug,
  }));

  return (
    <>
      <CanvasText />

      {debug && <OrbitControls />}

      <Limit
        name="start"
        position={[0, 0, EDGE_Z]}
        rotation={[0, Math.PI, 0]}
      />
      <Limit
        name="end"
        position={[0, 0, -(EDGE_Z + 10)]}
        rotation={[0, 0, 0]}
      />
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
        <Cube {...item} ind={ind} key={ind} />
      ))}

      <directionalLight color={pallete.light} position={[0, 0, 15]} />
      <pointLight color={pallete.light} intensity={10} position={[-5, 10, 0]} />
    </>
  );
};

export default function Canvas() {
  const { toggleFloating, pallete, debug } = useSceneStore((state) => ({
    toggleFloating: state.toggleFloating,
    pallete: state.pallete,
    debug: state.debug,
  }));

  return (
    <div
      className={style.canvas_container}
      onClick={toggleFloating}
      style={{ background: pallete.background }}
    >
      <FiberCanvas
        camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 0, 25] }}
        style={{ zIndex: 1 }}
      >
        <Physics gravity={[0, 0, 0]}>
          {debug ? (
            <Debug color="#000000" scale={1.1}>
              <Scene />
            </Debug>
          ) : (
            <Scene />
          )}
        </Physics>
      </FiberCanvas>
    </div>
  );
}
