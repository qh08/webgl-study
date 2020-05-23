export function getWebglSizeFromScreenSize(x, y, screenWidth, screenHeight) {
  return [2 * (x / screenWidth) - 1, -(2 * (y / screenHeight) - 1)];
}
