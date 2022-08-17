import useSceneStore from "@/lib/sceneStore";
import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function CanvasText() {
  const { viewport } = useThree();

  const pallete = useSceneStore((store) => store.pallete);

  const text1PosX = (viewport.width / 2) * -1 - 1;
  const text2PosX = viewport.width / 2 + 1;
  const text3PosY = (viewport.height / 2) * -1 + 3.5;

  const commonProps = {
    color: pallete.text,
    font: "/fonts/StudioFeixenSans-Regular.otf",
    letterSpacing: -0.02,
  };

  return (
    <>
      <Text
        {...commonProps}
        fontSize={3.5}      
        lineHeight={1}
        maxWidth={25}        
        textAlign="left"
        anchorX="left"
        position={[text1PosX, 5, -2]}
      >
        Financial tech for humans?
      </Text>
      <Text
        {...commonProps}
        fontSize={3.5}
        lineHeight={1}
        maxWidth={25}
        textAlign="right"
        anchorX="right"
        position={[text2PosX, -5, -2]}
      >
        We make it happen.
      </Text>
      <Text
        {...commonProps}
        fontSize={0.8}
        lineHeight={1.3}
        maxWidth={22}
        textAlign="left"
        anchorX="left"
        position={[text1PosX, text3PosY, -2]}
      >
        We learn from every experience by pushing the boundaries past the
        ordinary. Let's simplify fintech and web3, together.
      </Text>
      {/* <Html
        wrapperClass={style.wrapper}
        calculatePosition={() => []}
        style={
          {
            "--text-color": pallete.text,
            display: "none",
            right: "2em",
            left: "2em",
          } as React.CSSProperties
        }
      >
        <LogoIcon />
        <h1 className={style.title}>
          Financial tech <br /> for humans?
        </h1>
        <h1 className={classNames(style.title, style.title__secondary)}>
          We make
          <br />
          it happen.
        </h1>
        <p className={style.tagline}>
          We learn from every experience by pushing the boundaries past the
          ordinary. Let's simplify fintech and web3, together.
        </p>
      </Html> */}
    </>
  );
}
