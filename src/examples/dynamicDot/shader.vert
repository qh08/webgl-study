// 设置浮点精度为中等精度
precision mediump float;
// 接收点在 canvas 坐标系上的坐标 xy
attribute vec2 aPosition;
// 接收 canvas 的款高尺寸
attribute vec2 aScreenSize;

void main(){
  // 屏幕坐标系 -> 裁剪坐标系
  vec2 position = (aPosition / aScreenSize) * 2.0 - 1.0;
  position = position * vec2(1.0, -1.0);
  gl_Position = vec4(position,0,1);

  // 声明点的大小
  gl_PointSize = 10.0;
}