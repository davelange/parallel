import create from "zustand";
import { randAlternate, randPosOrNeg } from "../utils/math";
import { BLOCK_QTY, EDGE_X, PALLETES, SPEED } from "./constants";

type SceneStore = {
  floating: boolean;
  pallete: typeof PALLETES[number];
  toggleFloating: () => void;
  genCubes: () => BlockType[];
};

export type BlockType = {
  x: number;
  y: number;
  z: number;
  endX: number;
  motionX: number;
  motionY: number;
  pallete: typeof PALLETES[number];
};

const useSceneStore = create<SceneStore>((set, get) => ({
  floating: true,
  pallete: PALLETES[0],
  toggleFloating: () => set((store) => ({ floating: !store.floating })),
  genCubes: () => {
    const pallete = get().pallete;

    return new Array(BLOCK_QTY).fill(0).map(
      (_, ind) =>
        ({
          x: randPosOrNeg(15),
          y: randPosOrNeg(6),
          z: randPosOrNeg(4),
          endX: (ind * (EDGE_X * 2)) / BLOCK_QTY - EDGE_X,
          motionX: randAlternate(SPEED),
          motionY: randAlternate(SPEED),
          pallete,
        } as BlockType)
    );
  },
}));

export default useSceneStore;
