// Taken from https://easings.net/

import useSceneStore from "@/lib/sceneStore";

function getProgress(done: number, target: number) {
  return (done * 100) / target / 100;
}

export function easeInOutBack(done: number, target: number): number {
  let x = getProgress(done, target);

  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

export function easeOutBounce(done: number, target: number): number {
  let x = getProgress(done, target);

  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

export function easeOutCubic(done: number, target: number): number {
  let x = getProgress(done, target);

  return 1 - Math.pow(1 - x, 3);
}

export function easeInOutCirc(done: number, target: number): number {
  let x = getProgress(done, target);

  return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}

export function easeOutQuart(done: number, target: number): number {
  let x = getProgress(done, target);

  return 1 - Math.pow(1 - x, 4);
}

export function getEasing(done: number, target: number) {
  switch (useSceneStore.getState().easing) {
    case "easeOutCubic":
      return easeOutCubic(done, target);

    case "easeOutQuart":
      return easeOutQuart(done, target);

    case "easeInOutCirc":
      return easeInOutCirc(done, target);

    case "easeInOutBack":
      return easeInOutBack(done, target);

    default:
    case "easeOutBounce":
      return easeOutBounce(done, target);
  }
}
