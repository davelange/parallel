import create from "zustand";

type SceneStore = {
  floating: boolean;
  toggleFloating: () => void;
};

const useSceneStore = create<SceneStore>((set) => ({
  floating: true,
  toggleFloating: () => set((store) =>({ floating: !store.floating })),
}));

export default useSceneStore;
