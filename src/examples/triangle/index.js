import vertexShaderSource from './shader.vert';
import fragmentShaderSource from './shader.frag';
import { WebglMaker, getRandomColor } from '../../utils';

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

// buffer
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
gl.enableVertexAttribArray(aPosition);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
webglMaker.setAttrib(aScreenSize, canvas.width, canvas.height);

canvas.addEventListener('click', (e) => {
  const { pageX: x, pageY: y } = e;
  positions.push(x, y);
  if (positions.length % 6 == 0) {
    //向缓冲区中复制新的顶点数据。
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
    gl.clearColor(0, 0, 0, 1.0);
    //用上一步设置的清空画布颜色清空画布。
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制图元设置为三角形
    var primitiveType = gl.TRIANGLES;
    //从顶点数组的开始位置取顶点数据
    var drawOffset = 0;
    //因为我们要绘制 N 个点，所以执行 N 次顶点绘制操作。
    gl.drawArrays(primitiveType, 0, positions.length / 2);
  }
});
