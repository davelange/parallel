import useSceneStore from "@/lib/sceneStore";
import { SphereArgs, Triplet, useBox, useSphere } from "@react-three/cannon";
import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BoxBufferGeometry, Mesh } from "three";
import { _ } from "./Cube";

const CYCLES = 100;

export default function Sphere() {
  const startup = useRef(true);
  const position = useRef<Triplet>();
  const doneCycles = useRef(0);

  const [ref, api] = useSphere<Mesh>(
    () => ({
      mass: 1,
      position: [0, 1, -13],
      velocity: [0, 0, 0],
      args: [10],    
      collisionResponse: false,
      allowSleep: true,
    }),
    useRef(null)
  );

  useEffect(() => {
    api.position.subscribe((v) => {
      position.current = v;
    });
  }, []);

  useFrame(() => {
    if (!startup.current) {
      if (doneCycles.current === CYCLES) {
        return;
      }

      api.position.set(0, 0, position.current![_.Z] + 0.09);

      doneCycles.current++;
    }
  });

  useSceneStore.subscribe((store) => {
    if (store.floating) {
      console.log("wake up the sphere of death");
      startup.current = false;
      api.collisionResponse.set(true);
    }
  });

  return (
    <mesh ref={ref} position={[0, 1, -16]} name="sphereOfDeath">
      <sphereGeometry args={[10, 8, 8]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  );
}
