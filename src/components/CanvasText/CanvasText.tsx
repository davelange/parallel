import useSceneStore from "@/lib/sceneStore";
import { Text } from "@react-three/drei";
import { DoubleSide } from "three";

export default function CanvasText() {
  const pallete = useSceneStore((store) => store.pallete);

  return (
    <>
      <Text
        font="/fonts/Inter-ExtraBold.ttf"
        receiveShadow
        fontSize={3}
        lineHeight={1}
        letterSpacing={-0.01}
        maxWidth={25}
        textAlign="center"
        anchorX="center"
        position={[0, 2, -2]}
        outlineOffsetX={"5%"}
        outlineOffsetY={"5%"}
        outlineBlur={"30%"}
        outlineOpacity={0.15}
        outlineColor={pallete.text}
      >
        <meshPhongMaterial
          side={DoubleSide}
          color={pallete.text}
          transparent
          opacity={1}
        />
        A bunch of floating cubes
      </Text>
      <Text
        font="/fonts/Inter-Light.ttf"
        color={pallete.textSecondary}
        letterSpacing={-0.03}
        receiveShadow
        fontSize={0.75}
        lineHeight={1}
        maxWidth={20}
        textAlign="center"
        anchorX="center"
        position={[0, -5, -2]}
      >
        Click somewhere to see things happen
      </Text>
    </>
  );
}
