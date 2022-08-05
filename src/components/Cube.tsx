import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Cube({
  x,
  y,
  z,
  motionX,
  motionZ,
}: {
  x: number;
  y: number;
  z: number;
  motionX: number;
  motionZ: number;
}) {
  const cubeRef = useRef<Mesh>(null!);
  
  const motion = useRef({ x: motionX, y: motionZ });
  const prevMotion = useRef({ x: motionX, y: motionZ });

  useFrame(() => {
    const { x, y } = cubeRef.current.position;    

    if (x > 15 || x < -15) {    
      if (motion.current.x === prevMotion.current.x) {
        motion.current.x = motion.current.x * -1;        
      }
    } else {
      if (motion.current.x !== prevMotion.current.x) {
        prevMotion.current.x = motion.current.x;
      }
    }

    if (y > 6 || y < -6) {
      if (motion.current.y === prevMotion.current.y) {
        motion.current.y = motion.current.y * -1;        
      }
    } else {
      if (motion.current.y !== prevMotion.current.y) {
        prevMotion.current.y = motion.current.y;
      }
    }

    cubeRef.current.position.x += motion.current.x;
    cubeRef.current.position.y += motion.current.y;

    // cubeRef.current.rotation.x += inc.x;
    // cubeRef.current.rotation.y += inc.y;
  });

  return (
    <mesh ref={cubeRef} position={[x, y, z]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
