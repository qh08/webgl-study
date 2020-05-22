export function getRandomColor() {
  return [getRandomNumber(256, 0), getRandomNumber(256, 0), getRandomNumber(256, 0), 1];
}

export function getRandomNumber(threshold) {
  return Math.round(Math.random() * threshold);
}
