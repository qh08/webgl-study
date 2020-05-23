import vertexShaderSource from './shader.vert';
import fragmentShaderSource from './shader.frag';
import { WebglMaker, getWebglSizeFromScreenSize } from '../../utils';

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

// draw line
const positions = [];
const aPosition = webglMaker.getAttrib('aPosition');
const { width: screenWidth, height: screenHeight } = canvas;
webglMaker.setupBuffer(aPosition, 2);

canvas.addEventListener('mouseup', (e) => {
  const { pageX: x, pageY: y } = e;
  positions.push(...getWebglSizeFromScreenSize(x, y, screenWidth, screenHeight));
  webglMaker.setBufferData(positions);

  if (positions.length % 2 === 0) {
    webglMaker.clear();
    webglMaker.draw(gl.LINES, 0, positions.length / 2);
  }
});
