precision mediump float;

uniform vec4 uColor;

void main(){
  vec4 color = uColor / vec4(255, 255, 255, 1);
  gl_FragColor = color;
}
