export function randPosOrNeg(max: number) {
  return Math.ceil(Math.random() * max) * (Math.round(Math.random()) ? 1 : -1);
}

export function randAlternate(val: number) {
  return val * (Math.round(Math.random()) ? 1 : -1);
}

