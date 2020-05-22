import vertexShaderSource from './shader.vert';
import fragmentShaderSource from './shader.frag';
import { WebglMaker } from '../../utils';

var canvas = document.querySelector('#canvas');
var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

const webglMaker = new WebglMaker();

webglMaker.setWebglInstance(gl);
webglMaker.setVertexShader(vertexShaderSource);
webglMaker.setFragmentShader(fragmentShaderSource);
webglMaker.setProgram();
webglMaker.setClearColor(0.0, 0.0, 0.0, 1.0);
webglMaker.clear();
webglMaker.draw(gl.POINT, 0, 1);
