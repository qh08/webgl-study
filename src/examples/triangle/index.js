import vertexShaderSource from './shader.vert';
import fragmentShaderSource from './shader.frag';
import { WebglMaker, getRandomColor } from '../../utils';

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

const positions = [];
const aPosition = webglMaker.getAttrib('aPosition');
const aScreenSize = webglMaker.getAttrib('aScreenSize');

webglMaker.setAttrib(aScreenSize, canvas.width, canvas.height);
webglMaker.setupBuffer(aPosition, 2);

canvas.addEventListener('click', (e) => {
  const { pageX: x, pageY: y } = e;
  positions.push(x, y);
  if (positions.length % 6 == 0) {
    webglMaker.setBufferData(positions);
    webglMaker.clear();
    webglMaker.draw(gl.TRIANGLES, 0, positions.length / 2);
  }
});
