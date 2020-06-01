precision mediump float;

attribute vec2 aPosition;
attribute vec2 aUv;

varying vec2 vUv;

void main(){
  gl_Position = vec4(aPosition, 0.0, 1.0);

  vUv = aUv;
}