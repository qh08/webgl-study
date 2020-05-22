// 设置浮点精度为中等精度
precision mediump float;

// 接收 js 传来的颜色值 （rgba）
uniform vec4 uColor;

void main(){
  // 将 rgba 颜色转化为 webgl 颜色
  vec4 color = uColor / vec4(255,255,255,1);
  gl_FragColor = color;
}