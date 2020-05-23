precision mediump float;

attribute vec2 aPosition;

void main(){
  gl_Position = vec4(aPosition, 0, 1);

  gl_PointSize = 7.0;
}