export function easeInOutBack(done: number, target: number): number {
  let progress = (done * 100) / target / 100;

  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return progress < 0.5
    ? (Math.pow(2 * progress, 2) * ((c2 + 1) * 2 * progress - c2)) / 2
    : (Math.pow(2 * progress - 2, 2) * ((c2 + 1) * (progress * 2 - 2) + c2) +
        2) /
        2;
}

export function easeOutBounce(done: number, target: number): number {
  let progress = (done * 100) / target / 100;

  const n1 = 7.5625;
  const d1 = 2.75;

  if (progress < 1 / d1) {
    return n1 * progress * progress;
  } else if (progress < 2 / d1) {
    return n1 * (progress -= 1.5 / d1) * progress + 0.75;
  } else if (progress < 2.5 / d1) {
    return n1 * (progress -= 2.25 / d1) * progress + 0.9375;
  } else {
    return n1 * (progress -= 2.625 / d1) * progress + 0.984375;
  }
}
