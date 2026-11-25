---
title: "MVVM 模式"
date: 2024-03-26
tags:
  - 工程实践
  - 架构
description: "MVVM 把界面拆成三层：Model 管数据，View 管展示，ViewModel 管数据和视图之间的同步。它和 MVC 最大的差别是 View 不再直接读 Model，而是通过…"
---
# MVVM 模式

MVVM 把界面拆成三层：**Model 管数据，View 管展示，ViewModel 管数据和视图之间的同步**。它和 MVC 最大的差别是 View 不再直接读 Model，而是通过 ViewModel 间接拿数据。

## 三层职责

- `Model`：数据模型，负责数据结构、校验和持久化，不关心界面；
- `View`：只负责渲染和把用户操作抛出去，尽量不含业务逻辑；
- `ViewModel`：连接层，把 Model 的数据转换成 View 需要的形态，并把用户操作转成对 Model 的修改。

## 数据流

```text
View ──用户操作──▶ ViewModel ──调用──▶ Model
View ◀──响应式更新── ViewModel ◀──数据变化── Model
```

关键在于 View 和 ViewModel 之间是**双向绑定**：ViewModel 变了，View 自动更新；用户输入了，ViewModel 自动收到。这一层在 Vue 里就是响应式系统。

## 在 Vue 里的对应

```js
// Model：纯数据
const todoModel = {
  list: [],
  add(title) {
    this.list.push({ title, done: false });
  },
};

// ViewModel：把 Model 包成响应式，并暴露给 View
const vm = reactive(todoModel);

// View：模板只读 vm，事件只调 vm 的方法
// <input v-model="vm.input" />
// <button @click="vm.add(vm.input)">添加</button>
```

组件模板不直接操作 DOM，也不直接改原始数据，只和 `vm` 交互，这就是 MVVM 在 Vue 里的落地方式。

## 和 MVC 的区别

| | MVC | MVVM |
| --- | --- | --- |
| View 的依赖 | 直接依赖 Model | 依赖 ViewModel |
| 更新方式 | 通常手动刷新视图 | 数据驱动，自动更新 |
| 适合场景 | 后端、复杂交互的单页 | 数据变化频繁的前端界面 |
| 典型代表 | Spring MVC、Backbone | Vue、Angular |

## 容易踩的坑

- 把业务逻辑写进 View（模板里做复杂计算、发请求），等于退化回没有 ViewModel；
- ViewModel 变成"什么都管"的上帝对象，应该按业务域拆分；
- 以为 MVVM 等于框架，实际上它是一种分层约定，用不用框架都能实践。
