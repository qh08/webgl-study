precision mediump float;

attribute vec2 aPosition;

// 顶点颜色
attribute vec4 aColor;

// 传往片元着色器的颜色
varying vec4 vColor;

void main(){
  gl_Position = vec4(aPosition, 0.0, 1.0);

  vColor = aColor;
}