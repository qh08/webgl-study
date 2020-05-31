import glslify from 'glslify';

export class WebglMaker {
  constructor() {
    this.webglInstance = null;
    this.vertexShader = null;
    this.fragmentShader = null;
    this.program = null;
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
    this.program = this.webglInstance.createProgram();

    // 将顶点着色器挂载在着色器程序上
    this.webglInstance.attachShader(this.program, this.vertexShader);

    // 将片元着色器挂在在着色器程序上
    this.webglInstance.attachShader(this.program, this.fragmentShader);

    // 链接着色器程序
    this.webglInstance.linkProgram(this.program);

    // 使用刚创建好到着色器程序
    this.webglInstance.useProgram(this.program);
  }

  setClearColor(...args) {
    this.webglInstance.clearColor(...args);
  }

  getAttrib(key) {
    return this.webglInstance.getAttribLocation(this.program, key);
  }

  setAttrib(key, ...value) {
    this.webglInstance.vertexAttrib2f(key, ...value);
  }

  getUniform(key) {
    return this.webglInstance.getUniformLocation(this.program, key);
  }

  setUniform(key, ...value) {
    this.webglInstance.uniform4f(key, ...value);
  }

  clear() {
    this.webglInstance.clear(this.webglInstance.COLOR_BUFFER_BIT);
  }

  draw(type, first = 0, count = 1) {
    this.webglInstance.drawArrays(type, first, count);
  }

  createBuffer() {
    const buffer = this.webglInstance.createBuffer();
    return buffer;
  }

  setBufferWithAttribute(
    buffer,
    attribute,
    { size, type = this.webglInstance.FLOAT, normalize = false, stride = 0, offset = 0 }
  ) {
    this.webglInstance.bindBuffer(this.webglInstance.ARRAY_BUFFER, buffer);
    this.webglInstance.enableVertexAttribArray(attribute);
    this.webglInstance.vertexAttribPointer(attribute, size, type, normalize, stride, offset);
  }

  setupBuffer(pointer, size) {
    this.webglInstance.bindBuffer(this.webglInstance.ARRAY_BUFFER, this.webglInstance.createBuffer());
    this.setBufferData(pointer);
    this.webglInstance.enableVertexAttribArray(pointer);
    this.webglInstance.vertexAttribPointer(pointer, size, this.webglInstance.FLOAT, false, 0, 0);
  }

  setBufferData(pointer) {
    this.webglInstance.bufferData(
      this.webglInstance.ARRAY_BUFFER,
      new Float32Array(pointer),
      this.webglInstance.DYNAMIC_DRAW
    );
  }

  setBufferAndData(buffer, pointer) {
    this.webglInstance.bindBuffer(this.webglInstance.ARRAY_BUFFER, buffer);
    this.webglInstance.bufferData(
      this.webglInstance.ARRAY_BUFFER,
      new Float32Array(pointer),
      this.webglInstance.DYNAMIC_DRAW
    );
  }
}
