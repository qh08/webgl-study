import vertexShaderSource from './shader.vert';
import fragmentShaderSource from './shader.frag';
import { WebglMaker, getWebglSizeFromScreenSize, getWebglRandomColor } from '../../utils';

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

// 生成顶点坐标、颜色坐标: coords
// 生成顶点坐标轨迹: indices
function getRingVertex(x, y, outerR, innerR, n) {
  const { sin, cos, PI } = Math;
  const coords = [];
  const indices = [];
  let color;

  for (let i = 0; i <= n; i++) {
    if (i % 2 == 0) {
      color = getWebglRandomColor();
    }

    // const randomColor = getWebglRandomColor();
    const angle = (i * 2 * PI) / n;
    const outerXi = x + outerR * cos(angle);
    const outerYi = y + outerR * sin(angle);
    const innerXi = x + innerR * cos(angle);
    const innerYi = y + innerR * sin(angle);
    const outerPosition = getWebglSizeFromScreenSize(outerXi, outerYi, screenWidth, screenHeight);
    const innerPosition = getWebglSizeFromScreenSize(innerXi, innerYi, screenWidth, screenHeight);
    coords.push(...innerPosition, ...color);
    coords.push(...outerPosition, ...color);
  }

  for (let i = 0; i < n; i++) {
    let p0 = i * 2;
    let p1 = i * 2 + 1;
    let p2 = (i + 1) * 2;
    let p3 = (i + 1) * 2 + 1;
    if (i == n - 1) {
      p3 = 1;
      p2 = 0;
    }
    indices.push(p0, p1, p3, p3, p2, p0);
  }

  return {
    coords,
    indices,
  };
}
const { coords, indices } = getRingVertex(250, 250, 200, 100, 50);
console.dir(coords);
console.dir(indices);
const aPosition = webglMaker.getAttrib('aPosition');
const aColor = webglMaker.getAttrib('aColor');
const buffer = webglMaker.createBuffer();
const indicesBuffer = webglMaker.createBuffer();
webglMaker.setBufferWithAttribute(buffer, aPosition, { size: 2, stride: 24, offset: 0 });
webglMaker.setBufferWithAttribute(buffer, aColor, { size: 4, stride: 24, offset: 8 });
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.DYNAMIC_DRAW);
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
