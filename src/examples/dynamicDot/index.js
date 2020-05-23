import vertexShaderSource from './shader.vert';
import fragmentShaderSource from './shader.frag';
import { WebglMaker, getRandomColor, getWebglSizeFromScreenSize } from '../../utils';

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

const aPosition = webglMaker.getAttrib('aPosition');
const uColor = webglMaker.getUniform('uColor');
const points = [];
const { width: screenWidth, height: screenHeight } = canvas;

canvas.addEventListener('click', (e) => {
  console.dir(e)
  const { pageX: x, pageY: y } = e;
  const color = getRandomColor();

  points.push({ x, y, color });
  webglMaker.clear();

  points.forEach(({ x, y, color }) => {
    webglMaker.setAttrib(aPosition, ...getWebglSizeFromScreenSize(x, y, screenWidth, screenHeight));
    webglMaker.setUniform(uColor, ...color);
    webglMaker.draw(gl.POINTS, 0, 1);
  });
});
