import vertexShaderSource from './shader.vert';
import fragmentShaderSource from './shader.frag';
import { WebglMaker } from '../../utils';

import '../../styles/index.less';
import img from '../../assets/wall.jpeg';

const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

const webglMaker = new WebglMaker();

webglMaker.setWebglInstance(gl);
webglMaker.setVertexShader(vertexShaderSource);
webglMaker.setFragmentShader(fragmentShaderSource);
webglMaker.setProgram();
webglMaker.setClearColor(0.0, 0.0, 0.0, 1.0);
webglMaker.clear();

// canvas 信息
const { width: screenWidth, height: screenHeight } = canvas;
const aPosition = webglMaker.getAttrib('aPosition');
const aUv = webglMaker.getAttrib('aUv');
const uTexture = webglMaker.getUniform('uTexture');
const buffer = webglMaker.createBuffer();
let positions = [
  30 / screenWidth,
  -30 / screenHeight,
  0,
  0,
  30 / screenWidth,
  -300 / screenHeight,
  0,
  1,
  300 / screenWidth,
  -300 / screenHeight,
  1,
  1,
  30 / screenWidth,
  -30 / screenHeight,
  0,
  0,
  300 / screenWidth,
  -300 / screenHeight,
  1,
  1,
  300 / screenWidth,
  -30 / screenHeight,
  1,
  0,
];
webglMaker.setBufferWithAttribute(buffer, aPosition, { size: 2, stride: 16, offset: 0 });
webglMaker.setBufferWithAttribute(buffer, aUv, { size: 2, stride: 16, offset: 8 });
webglMaker.setBufferAndData(buffer, positions);

loadTexture(gl, img, uTexture, () => {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, positions.length / 4);
});

function loadTexture(gl, src, attribute, callback) {
  let img = new Image();
  img.onload = function () {
    gl.activeTexture(gl.TEXTURE0);
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.uniform1i(attribute, 0);
    callback && callback();
  };
  img.src = src;
}
