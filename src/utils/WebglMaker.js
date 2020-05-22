import glslify from 'glslify';

export class WebglMaker {
  constructor() {
    this.webglInstance = null;
    this.vertexShader = null;
    this.fragmentShader = null;
  }

  setWebglInstance(webglInstance) {
    this.webglInstance = webglInstance;
  }

  setVertexShader(vertexShaderSource) {
    // 创建顶点着色器对象
    this.vertexShader = this.webglInstance.createShader(this.webglInstance.VERTEX_SHADER);
    // 将源码分给顶点着色器对象
    this.webglInstance.shaderSource(this.vertexShader, glslify(vertexShaderSource));
    // 编译顶点着色器程序
    this.webglInstance.compileShader(this.vertexShader);
  }

  setFragmentShader(fragmentShaderSource) {
    // 创建片元着色器程序
    this.fragmentShader = this.webglInstance.createShader(this.webglInstance.FRAGMENT_SHADER);
    // 将源码分配给片元着色器对象
    this.webglInstance.shaderSource(this.fragmentShader, glslify(fragmentShaderSource));
    // 编译片元着色器
    this.webglInstance.compileShader(this.fragmentShader);
  }

  setProgram() {
    // 创建着色器程序
    const program = this.webglInstance.createProgram();

    // 将顶点着色器挂载在着色器程序上
    this.webglInstance.attachShader(program, this.vertexShader);

    // 将片元着色器挂在在着色器程序上
    this.webglInstance.attachShader(program, this.fragmentShader);

    // 链接着色器程序
    this.webglInstance.linkProgram(program);

    // 使用刚创建好到着色器程序
    this.webglInstance.useProgram(program);
  }

  setClearColor(...args) {
    this.webglInstance.clearColor(...args);
  }

  clear() {
    this.webglInstance.clear(this.webglInstance.COLOR_BUFFER_BIT);
  }

  draw(type, first = 0, count = 1) {
    this.webglInstance.drawArrays(type, first, count);
  }
}