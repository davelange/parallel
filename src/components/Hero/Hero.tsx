import styles from "./index.module.css";
import classnames from "classnames";

export default function Hero() {
  return (
    <section className={styles.root}>
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
