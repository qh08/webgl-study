// 设置浮点精度为中等精度
precision mediump float;
// 接收点在 canvas 坐标系上的坐标 xy
attribute vec2 aPosition;

void main(){
  gl_Position = vec4(aPosition,0,1);

  // 声明点的大小
  gl_PointSize = 10.0;
}