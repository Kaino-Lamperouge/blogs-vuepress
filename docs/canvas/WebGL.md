---
title: "WebGL 渲染管线"
date: 2023-08-29
tags:
  - canvas
  - glsl
description: "WebGL（Web Graphics Library）是基于 OpenGL ES 的浏览器图形接口，通过它可以直接和 GPU 交互，用硬件加速渲染 2D / 3D 图形。它不是 …"
---
# WebGL 渲染管线

`WebGL`（`Web Graphics Library`）是基于 `OpenGL ES` 的浏览器图形接口，通过它可以直接和 `GPU` 交互，用硬件加速渲染 `2D` / `3D` 图形。它不是 3D 引擎，只提供最底层的绘制能力。

## 和 Canvas 2D 的区别

`Canvas 2D` 提供 `fillRect`、`arc` 这类高层绘图命令，由浏览器决定怎么画；`WebGL` 只负责"把顶点数据送进显卡，执行着色器，输出像素"，光照、相机、模型加载都要自己实现。

## 渲染管线

```text
顶点数据 → 顶点着色器 → 图元装配 → 光栅化 → 片元着色器 → 帧缓冲
```

- 顶点着色器：决定每个顶点的位置；
- 片元着色器：决定每个像素的颜色；
- 中间由 GPU 自动完成裁剪、插值和光栅化。

## 最小示例

```js
const canvas = document.querySelector('#gl');
const gl = canvas.getContext('webgl');
if (!gl) throw new Error('当前环境不支持 WebGL');

// 清空为深色背景
gl.clearColor(0.1, 0.1, 0.12, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
```

绘制三角形需要三步：编译着色器、准备顶点缓冲、调用 `drawArrays`。

```js
const vsSource = `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fsSource = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(0.31, 0.55, 1.0, 1.0);
  }
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }
  return shader;
}
```

## 关键概念

- `attribute`：顶点级输入，每个顶点一份；
- `uniform`：全局常量，每帧可以改，所有顶点共享；
- `varying`：顶点着色器传给片元着色器的插值数据；
- `buffer` / `VAO`：显存里的顶点数据与布局；
- 纹理：图片进 GPU 的通道，需要处理坐标系翻转（`UNPACK_FLIP_Y_WEBGL`）。

## 学习路径

先跑通"画一个三角形"，再依次加：矩阵变换、纹理、深度测试、光照。需要引擎能力时再上 Three.js，它封装了相机、材质、加载器和后处理，但底层仍然是这套管线。
