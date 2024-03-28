# 内存泄漏

## 什么是内存泄漏

引擎中有垃圾回收机制，它主要针对一些程序中不再使用的对象，对其清理回收释放掉内存。

引擎虽然针对垃圾回收做了各种优化从而尽可能的确保垃圾得以回收，但是我们代码中依然要主动避免一些不利于引擎做垃圾回收操作

因为不是所有无用对象内存都可以被回收的，那当不再用到的对象内存，没有及时被回收时，我们叫它 `内存泄漏（Memory leak）`。

## 常见的内存泄漏

### 不正当的闭包

```js
function fn1(){
  let test = new Array(1000).fill('isboyjc')
  return function(){
    console.log('hahaha')
  }
}
let fn1Child = fn1()
fn1Child()
```

>典型闭包，但是并没有造成内存泄漏，因为返回的函数中并没有对 `fn1` 函数内部的引用.也就是说，函数 `fn1` 内部的 `test` 变量完全是可以被回收的

```js
function fn2(){
  let test = new Array(1000).fill('isboyjc')
  return function(){
    console.log(test)
    return test
  }
}
let fn2Child = fn2()
fn2Child()
```

>`return` 的函数中存在函数 `fn2` 中的 `test` 变量引用，所以 `test` 并不会被回收，也就造成了内存泄漏。

```js
function fn2(){
  let test = new Array(1000).fill('isboyjc')
  return function(){
    console.log(test)
    return test
  }
}
let fn2Child = fn2()
fn2Child()
fn2Child = null
```

>解决方法：在函数调用后，把外部的引用关系置空，避免内存泄漏

### 隐式全局变量

`JavaScript` 的垃圾回收是自动执行的，垃圾回收器每隔一段时间就会找出那些不再使用的数据，并释放其所占用的内存空间。

局部变量：函数中的局部变量在函数执行结束后这些变量已经不再被需要，所以垃圾回收器会识别并释放它们。

全局变量：垃圾回收器很难判断这些变量什么时候才不被需要，所以全局变量通常不会被回收，因此我们要避免一些额外的全局变量产生。

```js
function fn(){
  // 没有声明从而制造了隐式全局变量test1
  test1 = new Array(1000).fill('isboyjc1')
  
  // 函数内部this指向window，制造了隐式全局变量test2
  this.test2 = new Array(1000).fill('isboyjc2')
}
fn()
```

当我们在使用全局变量存储数据时，要确保使用后将其置空或者重新分配，在使用完将其置为 `null` 即可.

特别是在使用全局变量做持续存储大量数据的缓存时，一定要记得设置存储上限并及时清理，不然数据量越来越大，内存压力也会随之增高。

```js
var test = new Array(10000)

// do something

test = null
```

### 游离DOM引用

进行 `DOM` 时会使用变量缓存 `DOM` 节点的引用，但移除节点的时候，应该同步释放缓存的引用，否则游离的子树无法释放。

```js
<div id="root">
  <ul id="ul">
    <li></li>
    <li></li>
    <li id="li3"></li>
    <li></li>
  </ul>
</div>
<script>
  let root = document.querySelector('#root')
  let ul = document.querySelector('#ul')
  let li3 = document.querySelector('#li3')
  
  // 由于ul变量存在，整个ul及其子元素都不能GC
  root.removeChild(ul)
  
  // 虽置空了ul变量，但由于li3变量引用ul的子节点，所以ul元素依然不能被GC
  ul = null
  
  // 已无变量引用，此时可以GC
  li3 = null
</script>
```

当我们使用变量缓存 `DOM` 节点引用后删除了节点，如果不将缓存引用的变量置空，依然进行不了 `GC`，也就会出现内存泄漏。

父节点置空，但是被删除的父节点其子节点引用也缓存在变量里，就会导致整个父 `DOM` 节点树下整个游离节点树均无法清理，还是会出现内存泄漏，解决办法就是将引用子节点的变量也置空

### 遗忘的定时器

`setTimeout` 和 `setInterval`

```js
// 获取数据
let someResource = getData()
setInterval(() => {
  const node = document.getElementById('Node')
  if(node) {
    node.innerHTML = JSON.stringify(someResource))
  }
}, 1000)
//someResource 无法被回收
```

每隔一秒就将得到的数据放入到 `Node` 节点中去，但是在 `setInterval` 没有结束前，回调函数里的变量以及回调函数本身都无法被回收。

调用了 `clearInterval` 才叫结束，如果没有被 `clear` 掉的话，就会造成内存泄漏。

如果回调函数没有被回收，那么回调函数内依赖的变量也没法被回收。

当不需要 `interval` 或者 `timeout` 时，最好调用 `clearInterval` 或者 `clearTimeout` 来清除

浏览器中的 `requestAnimationFrame` 在不需要的时候用 `cancelAnimationFrame` `API` 来取消使用。

### 遗忘的事件监听器

当事件监听器在组件内挂载相关的事件处理函数，而在组件销毁时不主动将其清除时，其中引用的变量或者函数都被认为是需要的而不会进行回收。

如果内部引用的变量存储了大量数据，可能会引起页面占用内存过高，这样就造成意外的内存泄漏。

```js
<template>
  <div></div>
</template>

<script>
export default {
  created() {
    window.addEventListener("resize", this.doSomething)
  },
  beforeDestroy(){
    window.removeEventListener("resize", this.doSomething)
  },
  methods: {
    doSomething() {
      // do something
    }
  }
}
</script>
```

### 遗忘的监听者模式

当我们实现了监听者模式并在组件内挂载相关的事件处理函数，而在组件销毁时不主动将其清除时，其中引用的变量或者函数都被认为是需要的而不会进行回收

如果内部引用的变量存储了大量数据，可能会引起页面占用内存过高，这样也会造成意外的内存泄漏。

```js
<template>
  <div></div>
</template>

<script>
export default {
  created() {
    eventBus.on("test", this.doSomething)
  },
  beforeDestroy(){
    eventBus.off("test", this.doSomething)
  },
  methods: {
    doSomething() {
      // do something
    }
  }
}
</script>
```

在 `beforeDestroy` 组件销毁生命周期里将其清除

### 遗忘的 `Map` 、`Set` 对象

当使用 `Map` 或 `Set` 存储对象时，同 `Object` 一致都是强引用，如果不将其主动清除引用，其同样会造成内存不自动进行回收。

如果使用 `Map` ，对于键为对象的情况，可以采用 `WeakMap` ，`WeakMap` 对象同样用来保存键值对。

对于键是弱引用（注：`WeakMap` 只对于键是弱引用），且必须为一个对象，而值可以是任意的对象或者原始值，由于是对于对象的弱引用，不会干扰 `Js` 的垃圾回收。

如果需要使用 `Set` 引用对象，可以采用 `WeakSet` ， `WeakSet` 对象允许存储对象弱引用的唯一值。

`WeakSet` 对象中的值同样不会重复，且只能保存对象的弱引用，同样由于是对于对象的弱引用，不会干扰 `Js` 的垃圾回收。

#### 强引用

将一个引用通过变量或常量保存时，那么这个变量或常量就是强引用。

在内部，有一条线将这个变量和引用地址连接在一起了，那么这个引用就不会被当作 `垃圾` 回收掉。

而如果我们为该引用又分配给了一个新的变量，那么在内存当中，又会为这个新变量和该引用创建一根新的“线”将他们连接在一起。

#### 弱引用

ES6新引入的 `WeakSet` 和 `WeakMap` 两种类型，均只能接收引用值存储，并且这些引用值都是弱引用。

`WeakMaps` 和 `WeakSets` 是我们在 `JavaScript` 使用弱引用唯一途径，

将一个对象作为键添加到 `WeakMap` 或 `WeakSet` 中并不能防止这些对象被回收。

#### 强引用和弱引用的区别

强引用的对象不会被垃圾回收机制回收，但是弱引用对象是会被回收的。

强引用可能导致内存无法释放，造成内存泄漏；而弱引用不存在这个问题。

<!-- ![示例](/images/引用举例.png) -->
<img :src="$withBase('/images/引用举例.png')" alt=''>

##### 强引用举例

```js
// obj是一个强引用，对象存于内存，可用
let obj = {id: 1}

// 重写obj引用
obj = null 
// 对象从内存移除，回收 {id: 1} 对象
```

通过重写引用来清除对象引用，使其可回收

```js
let obj = {id: 1}
let user = {info: obj}
let set = new Set([obj])
let map = new Map([[obj, 'hahaha']])

// 重写obj
obj = null 

console.log(user.info) // {id: 1}
console.log(set)
console.log(map)
```

重写 `obj` 以后，`{id: 1}` 依然会存在于内存中

因为 `user` 对象以及后面的 `set`/`map` 都强引用了它`Set`/`Map`、对象、数组对象等都是强引用

所以仍然可以获取到 `{id: 1}` ，想要清除那就只能重写所有引用将其置空了。

##### 弱引用举例

`WeakMap` 以及 `WeakSet` ：

```js
let obj = {id: 1}
let weakSet = new WeakSet([obj])
let weakMap = new WeakMap([[obj, 'hahaha']])

// 重写obj引用
obj = null

// {id: 1} 将在下一次 GC 中从内存中删除
```

### 未清理的Console输出

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>test</title>
</head>

<body>
  <button id="click">click</button>

  <script>
    !function () {
      function Test() {
        this.init()
      }
      Test.prototype.init = function () {
        this.a = new Array(10000).fill('isboyjc')
        console.log(this)
      }

      document.querySelector('#click').onclick = function () {
        new Test();
      }
    }()
  </script>
</body>

</html>
```

## 内存泄漏排查、定位与修复

### 排查问题

`Chrome`

`Performance` ：用来监控性能指标，可以记录并分析在网站的生命周期内所发生的各类事件，通过它监控程序中的各种性能情况并分析，其中就包括内存

<!-- ![示例](/images/performance.png) -->
<img :src="$withBase('/images/performance.png')" alt=''>

勾选了 `Memory` 选项，才可以看到内存相关的分析

点击开始录制，进入录制状态，先清理一下 `GC` ，点击小垃圾桶

点击页面中 `click` 按钮 `100` 次，这时页面上的数值应该是 `200` ，我们点击一下小垃圾桶，手动触发一次 `GC`。

再次点击页面中 `click` 按钮 `100` 次，这时页面上的数值应该是 `400` ，停止录制

`Heap` 对应的部分表示内存在周期性的回落，内存数据呈现出一个不断上涨的趋势

即使我们中间手动做了一次垃圾回收操作，但清理后的内存并没有减少很多，由此推断，可能存在内存泄漏

### 分析定位

与 `Performance` 面板同级的 `Memory` 面板 ：记录 `JS` `CPU` 执行时间细节、显示 `JS` 对象和相关的 `DOM` 节点的内存消耗、记录内存的分配细节

`Heap Profiling` 可以记录当前的堆内存 `heap` 的快照，并生成对象的描述文件，该描述文件给出了当下 `JS` 运行所用的所有对象，以及这些对象所占用的内存大小、引用的层级关系等等，用它就可以定位出引起问题的具体原因以及位置。

<!-- ![示例](/images/memory.png) -->
<img :src="$withBase('/images/memory.png')" alt=''>

点击一下小垃圾桶（标记 3），触发一下 GC，把没用的东西从内存中干掉

点击开始生成快照（标记 1），生成第一次快照并选中

左侧列表中的 `Snapshot 1` 代表了我们生成的快照1，也就是刚刚那一刻的内存状态

选中 `Snapshot 1` 后就是右侧视图表格了，表格左上方有一个下拉框，它有四个值

- `Summary` ：按照构造函数进行分组，捕获对象和其使用内存的情况，可理解为一个内存摘要，用于跟踪定位DOM节点的内存泄漏
- `Comparison` ：对比某个操作前后的内存快照区别，分析操作前后内存释放情况等，便于确认内存是否存在泄漏及造成原因
- `Containment` ：探测堆的具体内容，提供一个视图来查看对象结构，有助分析对象引用情况，可分析闭包及更深层次的对象分析
- `Statistics` ：统计视图

#### `Summary` 选项数据表格的列

- `Constructor` ：显示所有的构造函数，点击每一个构造函数可以查看由该构造函数创建的所有对象
- `Distance` ：显示通过最短的节点路径到根节点的距离，引用层级
- `Shallow Size` ：显示对象所占内存，不包含内部引用的其他对象所占的内存
- `Retained Size` ：显示对象所占的总内存，包含内部引用的其他对象所占的内存

先点击小垃圾桶手动执行一次 `GC` ，然后点击 `click` 按钮，最后再次点击生成快照按钮，生成新的快照

选中快照，并将其上面的下拉框由默认的 `Summary` 选项切换为 `comparison` 选项，对比当前快照与之前一次快照的内存区别

#### `Comparison`

- `New` ：新建了多少个对象
- `Deleted` ：回收了多少个对象
- `Delta` ：新建的对象数 减去 回收的对象数

重点关注 `Delta` ，只要它是正数就可能存在问题，控制台已经排好序了

#### `Constructor`

构造函数，每一个构造函数点击都可以查看由该构造函数创建的所有对象

- `system` 、`system/Context` 表示引擎自己创建的以及上下文创建的一些引用
- `closure` 表示一些函数闭包中的对象引用
- `array`、`string`、`number`、`regexp` 引用了数组、字符串、数字或正则表达式的对象类型
- `HTMLDivElement`、`HTMLAnchorElement`、`DocumentFragment`，代码中对元素的引用或者指定的 `DOM` 对象引用

<!-- ![示例](/images/快照对比.png) -->
<img :src="$withBase('/images/快照对比.png')" alt=''>

### 修复验证

## 内存三大问题

`内存泄漏` ：对象已经不再使用但没有被回收，内存没有被释放。避免让无用数据还存在引用关系

`内存膨胀` ：在短时间内内存占用极速上升到达一个峰值。使用技术手段减少对内存的占用。

`频繁 GC` ：`GC` 执行的特别频繁。一般出现在频繁使用大的临时变量导致新生代空间被装满的速度极快，而每次新生代装满时就会触发 `GC`，频繁 `GC` 同样会导致页面卡顿。避免太多的临时变量，因为临时变量不用了就会被回收
