---
title: "透明度：opacity 与 rgba"
date: 2026-03-24
tags:
  - css
description: "两者都能做半透明，但作用范围完全不同：opacity 作用于整个元素及其子元素，rgba / 八位十六进制只作用于当前这个颜色。"
---
# 透明度：opacity 与 rgba

两者都能做半透明，但作用范围完全不同：`opacity` 作用于**整个元素及其子元素**，`rgba` / 八位十六进制只作用于**当前这个颜色**。

## 区别

```css
/* 整个卡片（含文字、子元素）一起变淡 */
.card {
  opacity: 0.5;
}

/* 只有背景半透明，文字保持清晰 */
.card {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
```

父容器 `opacity: 0.15` 时，里面 `#FFFFFF` 的文字也会跟着变淡——这正是 `opacity` 会"传染"给子元素的表现。

## 用哪个

- 整块淡入淡出、遮罩、禁用态：用 `opacity`；
- 半透明背景、玻璃拟态、只有背景要透：用 `rgba()` 或 `#00000080`；
- 需要独立控制每个颜色通道：用 `rgba` / `hsla`。

## 两个副作用

1. `opacity` 小于 1 会创建新的层叠上下文，`z-index` 的层级关系会跟着变；`position: fixed` 的子元素也会以它为参照，而不是视口。
2. 动画 `opacity` 通常只触发合成层，比动画 `background-color` 便宜；但如果元素很大，合成层内存也会上升。

## 示例：半透明遮罩

```css
.mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45); /* 不用 opacity，避免整层子元素一起变淡 */
  backdrop-filter: blur(4px);
}
```

`backdrop-filter` 需要浏览器支持，低端机上会明显掉帧，按需开启即可。
