---
title: "背景图片与响应式适配"
date: 2026-03-24
tags:
  - css
description: "背景图最容易出问题的地方不是加载，而是在不同屏幕比例下怎么裁切。核心是 background-size 和 background-position 的配合。"
---
# 背景图片与响应式适配

背景图最容易出问题的地方不是加载，而是**在不同屏幕比例下怎么裁切**。核心是 `background-size` 和 `background-position` 的配合。

## 最小可用写法

```css
.bg {
  background-image: url('image.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; /* 关键区域始终居中 */
}
```

## background-size 四种取值

| 值 | 效果 | 适用场景 |
| --- | --- | --- |
| `cover` | 等比放大到铺满容器，超出部分裁掉 | 全屏 banner、卡片封面 |
| `contain` | 等比缩放到完整显示，可能留白 | 需要看全图、图标 |
| `100% 100%` | 强制拉伸到容器尺寸，会变形 | 尺寸比例固定的容器 |
| `auto` | 保持原始尺寸 | 纹理、平铺图案 |

`cover` 和 `contain` 都不会改图片比例，`100% 100%` 会；需要"既能铺满又不变形"，只能用 `cover` 并接受裁切。

## 定位与多背景

```css
.hero {
  background-image: url('texture.png'), url('cover.jpg');
  background-position: top left, center;
  background-size: 200px auto, cover;
  background-repeat: repeat, no-repeat;
}
```

多背景按层叠顺序书写，**先写的在上层**。CSS 渐变也是一种背景图，常用来叠加暗色蒙层：

```css
background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url('cover.jpg');
```

## 和 object-fit 的区别

背景图属于容器的装饰，`<img>` 是内容。图片内容建议用 `<img>` + `object-fit: cover`，这样有 `alt`、可被爬虫索引、能享受懒加载；纯装饰才用背景图。

## 移动端注意

- 大图用 `image-set()` 或 `srcset` 提供多倍图，避免小屏加载 2x 图；
- 高 DPR 屏幕下 1x 背景图会发虚，关键视觉建议提供 2x；
- `background-attachment: fixed` 在移动端滚动性能很差，尽量不用。
