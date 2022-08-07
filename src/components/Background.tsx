import { GradientTexture } from "@react-three/drei";

export default function Background() {
  return (
    <mesh>
      <planeGeometry />
      <meshBasicMaterial>
        <GradientTexture
          stops={[0, 1]} // As many stops as you want
          colors={["aquamarine", "hotpink"]} // Colors need to match the number of stops
          size={5000} // Size is optional, default = 1024
        />
      </meshBasicMaterial>
    </mesh>
  );
}
