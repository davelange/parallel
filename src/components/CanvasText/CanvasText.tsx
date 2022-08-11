import useSceneStore from "@/lib/sceneStore";
import { Text, Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import classNames from "classnames";
import React from "react";
import style from "./index.module.css";

const LogoIcon = () => (
  <svg
    width="101"
    height="28"
    viewBox="0 0 101 28"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={style.logo}
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M43.0317 2.82703C43.0317 1.26472 44.2592 0 45.8215 0C47.3838 0 48.6113 1.26472 48.6113 2.82703C48.6113 4.38934 47.3838 5.65406 45.8215 5.65406C44.2592 5.65406 43.0317 4.38934 43.0317 2.82703ZM43.85 8.3323H47.7186V27.5264H43.85V8.3323ZM26.9097 11.1221C28.3976 9.22505 30.5923 8.10912 32.9357 8.10912C36.5439 8.10912 39.4825 11.1593 39.4825 16.2182V27.5264H35.614V16.367C35.614 13.9492 33.6797 11.9405 31.2618 11.9405C28.844 11.9405 26.9097 13.9492 26.9097 16.367V27.5264H23.0039L23.0039 8.3323H26.9097V11.1221ZM53.039 8.58275V12.1537H63.9752V15.6875H59.8834C54.4153 15.6875 51.4395 18.3286 51.4395 22.1971C51.4395 25.6565 54.2665 28 57.8003 28C60.0322 28 62.3757 27.1444 63.9752 25.0614V27.7768H67.8065V8.58275L53.039 8.58275ZM58.9163 24.7638C56.9076 24.7638 55.3825 23.6107 55.3825 21.974C55.3825 20.3001 56.4984 18.7377 60.4042 18.7377H63.9752C63.9752 22.9411 61.4829 24.7638 58.9163 24.7638ZM88.3014 21.5588C89.0454 20.2941 95.5178 9.50669 96.1502 8.50235H100.428V27.6964H96.5593V14.0076C96.5326 14.0076 92.7308 20.3314 90.2705 24.4239C89.303 26.0332 88.5429 27.2974 88.3014 27.6964H84.4329V13.9704C84.3957 13.9704 77.1793 25.9853 76.1749 27.6964L72.2692 27.6964V8.50235H76.1749L76.1378 20.4056L76.1749 21.596C76.8445 20.4428 83.9865 8.50235 84.0237 8.50235H88.2642C88.3014 8.50235 88.3014 21.5216 88.3014 21.5588ZM11.6057 4.62306C11.0849 4.39987 10.341 4.17669 9.41104 4.17669C8.03472 4.17669 6.8072 4.92064 6.8072 6.55735V8.34284L14.581 8.34284H18.4495L18.4495 27.5369H14.581L14.581 11.7278L6.8072 11.7278L6.8072 27.5369H2.93863L2.93863 11.7278H0L0 8.34284H2.93863V6.48295C2.93863 2.98636 5.35648 0.531304 8.62989 0.531304C9.85741 0.531304 10.9733 0.828885 11.6057 1.12647V4.62306Z"
    />
  </svg>
);

export default function CanvasText() {
  const pallete = useSceneStore((store) => store.pallete);

  const wrapper = style.wrapper;

  return (
    <Html
      wrapperClass={wrapper}
      calculatePosition={() => []}
      style={
        {
          "--text-color": pallete.text,
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
    </Html>
  );
}
