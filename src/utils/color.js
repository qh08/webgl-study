export function getRandomColor() {
  return [getRandomNumber(256), getRandomNumber(256), getRandomNumber(256), 1];
}

export function getWebglRandomColor() {
  return [getRandomNumber(256) / 255, getRandomNumber(256) / 255, getRandomNumber(256) / 255, 1];
}

export function getRandomNumber(threshold) {
  return Math.round(Math.random() * threshold);
}
