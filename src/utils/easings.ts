function easeInOutBack(done: number, target: number): number {
  let progress = (done * 100) / target / 100;

  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return progress < 0.5
    ? (Math.pow(2 * progress, 2) * ((c2 + 1) * 2 * progress - c2)) / 2
    : (Math.pow(2 * progress - 2, 2) * ((c2 + 1) * (progress * 2 - 2) + c2) +
        2) /
        2;
}

export { easeInOutBack };
