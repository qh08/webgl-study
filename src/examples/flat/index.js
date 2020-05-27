import vertexShaderSource from './shader.vert';
import fragmentShaderSource from './shader.frag';
import { WebglMaker } from '../../utils';

import '../../styles/index.less';

const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

const webglMaker = new WebglMaker();

webglMaker.setWebglInstance(gl);
webglMaker.setVertexShader(vertexShaderSource);
webglMaker.setFragmentShader(fragmentShaderSource);
webglMaker.setProgram();
webglMaker.setClearColor(0.0, 0.0, 0.0, 1.0);
webglMaker.clear();

const { height: screenHeight, width: screenWidth } = canvas;
const aPosition = webglMaker.getAttrib('aPosition');
const aColor = webglMaker.getAttrib('aColor');
const coords = [
  30 / screenWidth,
  -30 / screenHeight,
  1,
  0,
  0,
  1, //V0
  30 / screenWidth,
  -300 / screenHeight,
  1,
  0,
  0,
  1, //V1
  300 / screenWidth,
  -300 / screenHeight,
  1,
  0,
  0,
  1, //V2
  30 / screenWidth,
  -30 / screenHeight,
  0,
  1,
  0,
  1, //V0
  300 / screenWidth,
  -300 / screenHeight,
  0,
  1,
  0,
  1, //V2
  300 / screenWidth,
  -30 / screenHeight,
  0,
  1,
  0,
  1, //V3
];

const buffer = webglMaker.createBuffer();
webglMaker.setBufferWithAttribute(buffer, aPosition, { size: 2, stride: 24, offset: 0 });
webglMaker.setBufferWithAttribute(buffer, aColor, { size: 4, stride: 24, offset: 8 });
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.DYNAMIC_DRAW);

webglMaker.clear();
webglMaker.draw(gl.TRIANGLES, 0, coords.length / 6);
