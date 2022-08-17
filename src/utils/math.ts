export function randPosOrNeg(max: number) {
  return Math.ceil(Math.random() * max) * (Math.round(Math.random()) ? 1 : -1);
}

export function randAlternate(val: number) {
  return val * (Math.round(Math.random()) ? 1 : -1);
}

export function randInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randIntInRange(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
