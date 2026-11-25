---
title: "浅拷贝与深拷贝"
date: 2026-03-22
tags:
  - javascript
  - 原理
description: "拷贝的核心区别只有一句话：新对象和原对象是否共享同一份引用。共享就是浅拷贝，完全断开就是深拷贝。"
---
# 浅拷贝与深拷贝

拷贝的核心区别只有一句话：**新对象和原对象是否共享同一份引用**。共享就是浅拷贝，完全断开就是深拷贝。

## 浅拷贝

只复制第一层属性，嵌套的对象/数组仍然指向原地址。

```js
const source = { a: 1, nested: { b: 2 } };

const copy1 = Object.assign({}, source);
const copy2 = { ...source };
const copy3 = source.slice?.(); // 数组

copy1.nested === source.nested; // true，改 copy1.nested.b 会影响原对象
copy1.a = 10;                   // 不影响 source.a
```

`Object.assign` 和扩展运算符都是浅拷贝，`Array.prototype.slice`、`concat` 对数组同理。

## 深拷贝

### JSON 方案

```js
const deep = JSON.parse(JSON.stringify(source));
```

能应付纯数据，但有明显边界：

- `undefined`、函数、`Symbol` 会被丢掉；
- `Date` 变成字符串，`RegExp` 变成 `{}`；
- `NaN`、`Infinity` 变成 `null`；
- 循环引用直接抛 `TypeError: Converting circular structure to JSON`。

### structuredClone

现代浏览器的内置深拷贝，支持循环引用、`Date`、`Map`、`Set`、`ArrayBuffer`，但不能克隆函数和 DOM 节点：

```js
const deep = structuredClone(source); // 循环引用也能处理
```

### 手写递归

需要处理特殊类型或老环境时：

```js
function deepClone(value, cache = new WeakMap()) {
  if (typeof value !== 'object' || value === null) return value;
  if (cache.has(value)) return cache.get(value); // 处理循环引用

  const result = Array.isArray(value)
    ? []
    : value instanceof Date
      ? new Date(value)
      : Object.create(Object.getPrototypeOf(value));

  cache.set(value, result);
  for (const key of Reflect.ownKeys(value)) {
    result[key] = deepClone(value[key], cache);
  }
  return result;
}
```

## 怎么选

| 场景 | 方案 |
| --- | --- |
| 纯 JSON 数据、结构简单 | `JSON.parse(JSON.stringify())` |
| 浏览器环境、含循环引用或 Date/Map | `structuredClone` |
| 需要保留原型、处理特殊类型 | 手写递归 + `WeakMap` |
| 只改第一层 | 扩展运算符 / `Object.assign` |

注意 `JSON.parse(JSON.stringify())` 里两个 `JSON` 都是大写，写成 `Json` 会直接报 `ReferenceError`。
