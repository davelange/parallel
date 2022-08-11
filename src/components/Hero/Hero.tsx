import styles from "./index.module.css";
import classnames from "classnames";
import useSceneStore from "@/lib/sceneStore";
import React from "react";

export default function Hero() {
  const pallete = useSceneStore((store) => store.pallete);

  return (
    <section
      className={styles.root}
      style={{ "--text-color": pallete.text } as React.CSSProperties}
    >
      <h1 className={styles.title}>
        Financial tech
        <br />
        for humans?
      </h1>
      <h1 className={classnames(styles.title, styles.title__secondary)}>
        We make
        <br />
        it happen
      </h1>
    </section>
  );
}
