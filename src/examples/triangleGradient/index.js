import vertexShaderSource from './shader.vert';
import fragmentShaderSource from './shader.frag';
import { WebglMaker, getWebglRandomColor, getWebglSizeFromScreenSize } from '../../utils';

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

// 创建 坐标信息 buffer
const positions = [];
const aPosition = webglMaker.getAttrib('aPosition');
const positionBuffer = webglMaker.createBuffer(aPosition, { size: 2 });

// 创建 颜色信息 buffer
const colors = [];
const aColor = webglMaker.getAttrib('aColor');
const colorBuffer = webglMaker.createBuffer(aColor, { size: 4 });

// canvas 信息
const { width: screenWidth, height: screenHeight } = canvas;

canvas.addEventListener('mouseup', (e) => {
  const { pageX: x, pageY: y } = e;

  // 记录点击点
  positions.push(...getWebglSizeFromScreenSize(x, y, screenWidth, screenHeight));

  // 记录随机颜色
  colors.push(...getWebglRandomColor());

  if (positions.length % 6 === 0) {
    webglMaker.clear();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.DYNAMIC_DRAW);
    webglMaker.draw(gl.TRIANGLES, 0, positions.length / 2);
  }
});
