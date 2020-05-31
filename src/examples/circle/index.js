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

// canvas 信息
const { width: screenWidth, height: screenHeight } = canvas;

function createCircleVertex(x, y, r, n) {
  const color = [1, 0, 0, 1];
  const coords = [...getWebglSizeFromScreenSize(x, y, screenWidth, screenHeight), ...color];

  for (let i = 0; i <= n; i++) {
    const angle = (i * Math.PI * 2) / n;
    coords.push(
      ...getWebglSizeFromScreenSize(x + r * Math.cos(angle), y + r * Math.sin(angle), screenWidth, screenHeight),
      ...color
    );
  }

  return coords;
}

const coords = createCircleVertex(250, 250, 100, 50);
const aPosition = webglMaker.getAttrib('aPosition');
const aColor = webglMaker.getAttrib('aColor');
const buffer = webglMaker.createBuffer();
webglMaker.setBufferWithAttribute(buffer, aPosition, { size: 2, stride: 24, offset: 0 });
webglMaker.setBufferWithAttribute(buffer, aColor, { size: 4, stride: 24, offset: 8 });
webglMaker.setBufferAndData(buffer, coords);
webglMaker.draw(gl.TRIANGLE_FAN, 0, coords.length / 6);