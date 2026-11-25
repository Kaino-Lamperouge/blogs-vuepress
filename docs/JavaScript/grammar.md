---
title: "可选链与空值合并"
date: 2026-03-22
tags:
  - javascript
  - 语法
description: "两个运算符解决的都是\"层层判断空值\"的样板代码，但触发条件不同：?. 处理引用为空，?? 处理值为空。"
---
# 可选链与空值合并

两个运算符解决的都是"层层判断空值"的样板代码，但触发条件不同：`?.` 处理**引用为空**，`??` 处理**值为空**。

## 可选链 `?.`

读取深层属性时，链上任意一环是 `null` / `undefined` 就短路返回 `undefined`，而不是抛 `TypeError`。

```js
const city = user?.address?.city;
const first = list?.[0];
const result = handler?.(); // 方法不存在就不调用
```

等价于过去要写一长串 `user && user.address && user.address.city`。

注意可选链**不能用于赋值**，下面这行是语法错误：

```js
user?.name = 'x'; // SyntaxError
```

## 空值合并 `??`

只在左侧是 `null` 或 `undefined` 时取右侧。它和 `||` 的关键区别是：`0`、`''`、`false`、`NaN` 都算有效值。

```js
const page = query.page ?? 1;      // '0' 也会被保留
const page2 = query.page || 1;     // '0' 会被误判成空，返回 1
```

## 组合使用

```js
const name = user?.profile?.name ?? '匿名用户';
```

`??` 不能直接和 `&&` / `||` 混用，必须加括号，否则语法报错：

```js
(a || b) ?? c; // 合法
a || b ?? c;   // SyntaxError
```

## 实践建议

- 只在"确实可能为空"的地方用 `?.`，滥用会把数据错误静默成 `undefined`，排查更困难；
- 需要默认值时优先 `??`，除非你明确希望 `0` / `''` 也走兜底；
- 可选链和 TypeScript 的严格空检查配合使用效果最好，类型能提前暴露大部分空值路径。
