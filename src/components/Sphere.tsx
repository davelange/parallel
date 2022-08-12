import useSceneStore from "@/lib/sceneStore";
import { useSphere } from "@react-three/cannon";
import { Edges } from "@react-three/drei";
import { Mesh } from "three";

export default function Sphere() {
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,
    position: [0, 1, -16],
    velocity: [0, 0, 0],
    angularVelocity: [0, 0, 0],
  }));

  useSceneStore.subscribe((store) => {
    if (store.floating) {
      api.applyForce([0, 0, 20], [0, 0, 20]);
      api.velocity.set(0, 0, 10);
      api.mass.set(1);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[8, 6, 6]} />
      {/* <lineBasicMaterial color={0x000000} /> */}
      <Edges color={0x000000} />
    </mesh>
  );
}
