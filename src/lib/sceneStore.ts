import create from "zustand";
import { randAlternate, randIntInRange, randPosOrNeg } from "../utils/math";
import { BLOCK_QTY, EDGE_X, PALLETES, SPEED } from "./constants";

type SceneStore = {
  floating: boolean;
  pallete: typeof PALLETES[number];
  easing: string;
  toggleFloating: () => void;
  genCubes: () => BlockType[];
  setEasing: (easing: string) => void;
  setPallete: (option: number) => void;
};

export type BlockType = {
  x: number;
  y: number;
  z: number;
  endX: number;
  motionX: number;
  motionY: number;
  pallete: typeof PALLETES[number];
  ind: number;
};

const useSceneStore = create<SceneStore>((set, get) => ({
  floating: true,
  pallete: PALLETES[0],
  easing: "easeOutCubic",

  toggleFloating: () => {
    const newVal = !get().floating;

    set(() => ({ floating: newVal }));
  },

  setEasing: (easing: string) => set(() => ({ easing })),

  setPallete: (pallete: number) => set(() => ({ pallete: PALLETES[pallete] })),

  genCubes: () => {
    const pallete = get().pallete;

    return new Array(BLOCK_QTY).fill(0).map(
      (_, ind) =>
        ({
          x: randPosOrNeg(15),
          y: randPosOrNeg(10),
          z: randPosOrNeg(4),
          endX: ((ind + 1) * ((EDGE_X - 1) * 2)) / BLOCK_QTY - EDGE_X,
          motionX: randAlternate(SPEED),
          motionY: randAlternate(SPEED),
          pallete,
        } as BlockType)
    );
  },
}));

export default useSceneStore;
