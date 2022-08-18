import { Canvas as FiberCanvas, Vector3 } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import Cube from "@/components/Cube";
import Limit from "@/components/Limit";
import useSceneStore from "@/lib/sceneStore";
import { COLOR, EDGE_X, EDGE_Y, EDGE_Z } from "@/lib/constants";
import { Edges, OrbitControls, Sky, Text } from "@react-three/drei";
import style from "./index.module.css";
import CanvasText from "../CanvasText";
import Logo from "../Logo";
import { GridHelper } from "three";

export default function Canvas() {
  const { toggleFloating, genCubes, pallete } = useSceneStore((state) => ({
    toggleFloating: state.toggleFloating,
    genCubes: state.genCubes,
    pallete: state.pallete,
  }));

  return (
    <div
      className={style.canvas_container}
      onClick={toggleFloating}
      style={{ background: pallete.background }}
    >
      <Logo
        fill={pallete.text}
        style={{ position: "absolute", left: "2em", top: "2em" }}
      />

      <FiberCanvas
        camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 0, 25] }}
        style={{ zIndex: 1 }}
      >
        <Physics gravity={[0, 0, 0]}>
          <CanvasText />
          {/* <Debug color="#000000" scale={1.1}> */}
            {/* <OrbitControls /> */}

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
            <pointLight
              color={pallete.light}
              intensity={10}
              position={[-5, 10, 0]}
            />
          {/* </Debug> */}
        </Physics>
      </FiberCanvas>
    </div>
  );
}
