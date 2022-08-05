const randomNegativeOrPositive = (max: number) =>
  Math.ceil(Math.random() * max) * (Math.round(Math.random()) ? 1 : -1);

export { randomNegativeOrPositive };
