---
title: "前端性能优化"
date: 2023-03-28
tags:
  - 工程实践
  - 性能
description: "性能优化先定指标，再谈手段。用户能感知的主要是 LCP（最大内容绘制）、INP（交互响应）、CLS（布局偏移），其余手段都是围绕这三个数在做事。"
---
# 前端性能优化

性能优化先定指标，再谈手段。用户能感知的主要是 **LCP**（最大内容绘制）、**INP**（交互响应）、**CLS**（布局偏移），其余手段都是围绕这三个数在做事。

## 资源加载

### 懒加载

长页面里，图片和组件不必一开始就全部加载：

```html
<img src="cover.jpg" loading="lazy" decoding="async" alt="" />
```

需要更细的控制（比如进入视口再请求接口）时用 `IntersectionObserver`：

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    loadImage(entry.target.dataset.src);
    io.unobserve(entry.target);
  });
}, { rootMargin: '200px' });

document.querySelectorAll('img[data-src]').forEach((el) => io.observe(el));
```

收益：减少首屏请求数和流量，避免图片解码阻塞主线程。

### 预加载

把后续一定会用到的资源提前拿到：

```html
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preconnect" href="https://api.example.com" />
<link rel="prefetch" href="/next-page.js" />
```

三者别混：

- `preload`：当前页面马上要用的资源，优先级高；
- `prefetch`：下一个页面可能用到的资源，空闲时下载；
- `preconnect`：提前建连（DNS + TCP + TLS），适合第三方域名。

### 懒加载 vs 预加载

懒加载是"晚点加载甚至不加载"，减少服务器与带宽压力；预加载是"提前加载"，用带宽换体验。两者可以同时用：首屏关键资源预加载，首屏之外的图片懒加载。

## 代码层

- 路由级代码分割：`const Page = () => import('./Page.vue')`；
- 大依赖按需引入，别整包引入工具库；
- 长任务拆片，避免一次同步处理几万条数据，必要时用 `requestIdleCallback` 或 `Web Worker`；
- 列表虚拟滚动，只渲染可视区域。

## 渲染层

- 动画只改 `transform` 和 `opacity`，避免触发布局（layout）和重绘（paint）；
- 批量读写 DOM，避免"读-写-读-写"造成布局抖动；
- `will-change` 只在动画开始前加，长期挂着会白白占显存；
- 图片、视频写明宽高，减少 CLS。

## 传输与缓存

- 静态资源文件名带 hash，配合 `Cache-Control: max-age=31536000, immutable`；
- 接口区分可缓存与不可缓存，合理使用 `ETag`；
- 开启压缩（gzip / br），并确认 CDN 没有把压缩后的响应再压一次。

## 怎么测

Lighthouse 看整体评分，Performance 面板看具体长任务和主线程阻塞；线上用 Web Vitals 采集真实用户数据，实验室数据和真实环境经常差很多。
