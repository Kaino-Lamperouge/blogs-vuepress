---
title: "Canvas 绘图基础"
date: 2023-09-28
tags:
  - canvas
description: "Canvas 是 HTML5 提供的位图画布，通过 2D 上下文用 JavaScript 逐帧绘制图形、图像和动画。它没有 DOM 结构，画上去的每个像素都不再是独立对象。"
---
# Canvas 绘图基础

`Canvas` 是 `HTML5` 提供的位图画布，通过 `2D` 上下文用 `JavaScript` 逐帧绘制图形、图像和动画。它没有 DOM 结构，画上去的每个像素都不再是独立对象。

## 最小示例

```html
<canvas id="board" width="400" height="200"></canvas>
```

```js
const canvas = document.querySelector('#board');
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#4f8cff';
ctx.fillRect(20, 20, 120, 60);

ctx.strokeStyle = '#333';
ctx.beginPath();
ctx.moveTo(20, 120);
ctx.lineTo(200, 120);
ctx.arc(260, 100, 40, 0, Math.PI * 2);
ctx.stroke();
```

两个尺寸要分清：`canvas.width/height` 是画布像素，`style.width/height` 是显示尺寸。只改 CSS 会拉伸位图，导致模糊。

## 常用能力

- 图形：`fillRect`、`arc`、`beginPath` / `moveTo` / `lineTo`、`clip`；
- 样式：`fillStyle`、`strokeStyle`、`lineWidth`、渐变、阴影；
- 图像：`drawImage` 绘制图片或另一块画布，配合 `getImageData` 做像素处理；
- 文本：`fillText`、`measureText`；
- 变换：`translate`、`rotate`、`scale`，变换会累积，画完记得 `save` / `restore`。

## 动画

`Canvas` 不会自己重绘，必须每帧清空再画：

```js
let x = 0;
function frame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(x, 80, 40, 40);
  x = (x + 2) % canvas.width;
  requestAnimationFrame(frame);
}
frame();
```

用 `requestAnimationFrame` 而不是 `setInterval`，它跟随屏幕刷新率，页面不可见时会自动暂停。

## 与 SVG 的取舍

| | Canvas | SVG |
| --- | --- | --- |
| 本质 | 位图，逐像素绘制 | 矢量，DOM 节点 |
| 大量图元 | 性能好 | 节点多时明显变慢 |
| 交互 | 需要自己命中检测 | 每个元素可直接绑定事件 |
| 缩放 | 会失真，需处理 DPR | 无损 |
| 适合 | 游戏、图表、图像处理 | 图标、流程图、少量可交互图形 |

高 DPI 屏幕下记得按 `devicePixelRatio` 放大画布再缩放上下文，否则文字和线条会发虚。
