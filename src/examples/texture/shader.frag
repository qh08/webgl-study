precision mediump float;

varying vec2 vUv;

uniform sampler2D uTexture;

void main() {
  // 提取纹理对应uv坐标上的颜色，赋值给当前片元（像素）。
  gl_FragColor = texture2D(uTexture, vec2(vUv.x, vUv.y));
}