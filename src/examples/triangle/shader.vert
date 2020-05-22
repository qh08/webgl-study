precision mediump float;

attribute vec2 aPosition;

attribute vec2 aScreenSize;

void main(){
    vec2 position = (aPosition / aScreenSize) * 2.0 - 1.0;
    position = position * vec2(1.0,-1.0);
    gl_Position = vec4(position, 0, 1);
}