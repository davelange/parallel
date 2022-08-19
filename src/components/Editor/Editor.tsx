import useSceneStore from "@/lib/sceneStore";
import React, { useState } from "react";
import style from "./index.module.css";

const EASINGS = [
  "easeOutCubic",
  "easeOutQuart",
  "easeInOutCirc",
  "easeInOutBack",
  "easeOutBounce",
];

export default function Editor({rerender}: {rerender: any}) {
  const [visible, setVisible] = useState(false);

  const store = useSceneStore();

  function handleEaseChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.currentTarget;

    store.setEasing(value);
  }

  function handleColorChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.currentTarget;

    store.setPallete(Number(value) - 1);

    rerender(1);
  }

  return (
    <div className={style.editor}>
      {visible ? (
        <>
          <div className={style.block}>
            <label>
              Easing
              <select onChange={handleEaseChange}>
                {EASINGS.map((val) => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={style.block}>
            <label>Colors</label>
            <select onChange={handleColorChange}>
              {[1, 2, 3].map((val) => (
                <option value={val} key={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <button type="button" onClick={() => setVisible(!visible)}>
            Hide
          </button>
        </>
      ) : (
        <button type="button" onClick={() => setVisible(!visible)}>
          Editor
        </button>
      )}
    </div>
  );
}
