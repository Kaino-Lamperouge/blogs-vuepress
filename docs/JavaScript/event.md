# `DOM` 事件流

`DOM` 事件流（`event flow` ）存在三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。

`DOM` 标准事件流的触发的先后顺序为：先捕获再冒泡。即当触发 `DOM` 事件时，会先进行事件捕获，捕获到事件源之后通过事件传播进行事件冒泡。

`addEventListener` 方法中，一个参数是需要绑定的事件，一个参数是触发事件后要执行的函数，然而 addEventListener 还可以传入第三个参数：

```js
element.addEventListener(event, function, useCapture);
```

## 事件冒泡

事件冒泡（ `dubbed bubbling` ）：当一个元素接收到事件的时候，会把他接收到的事件传给自己的父级，一直到 `window`

（传递的仅仅是事件，例如 `click` 、`focus` 等等这些事件，  并不传递所绑定的事件函数。）

事件源 => 根节点（由内到外）进行事件传播。

### 示例

<img :src="$withBase('/images/event.png')">

- 给三个盒子依次绑定点击事件，当点击盒子的时候，会依次触发父级元素的点击事件

```js
let big = document.querySelector(".big");
let center = document.querySelector(".center");
let small = document.querySelector(".small");

big.addEventListener("click", () => {
  console.log("big");
});

center.addEventListener("click", () => {
  console.log("center");
});

small.addEventListener("click", () => {
  console.log("small");
});
```

控制台打印：

`click small box`
small
center
big

`click center box`
center
big

`click big box`
big

- 如果父元素没有绑定点击事件则只会触发点击盒子的事件

```js
let big = document.querySelector(".big");
let center = document.querySelector(".center");
let small = document.querySelector(".small");

small.addEventListener("click", () => {
  console.log("small");
});
```

控制台打印：

`click small box`
small

- 如果子元素（ `small` ）的点击事件去掉，当我们点击 `small` 的时候会把当前操作的点击事件传递给父元素（因为父元素绑定了点击函数）

```js
let big = document.querySelector(".big");
let center = document.querySelector(".center");
let small = document.querySelector(".small");

big.addEventListener("click", () => {
  console.log("big");
});

center.addEventListener("click", () => {
  console.log("center");
});
```

控制台打印：

`click small box`
center
big

- 在子事件中加入 `e.stopPropagation()` 取消冒泡

```js
small.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("small");
});
```

`click small box`
small

## 事件捕获

事件捕获（ `event capturing` ）： 当鼠标点击或者触发 `dom` 事件时（被触发 `dom` 事件的这个元素被叫作事件源）

浏览器会从根节点 => 事件源（由外到内）进行事件传播

事件捕获与事件冒泡是比较类似的，最大的不同在于事件传播的方向

```js
big.addEventListener(
  "click",
  () => {
    console.log("big---事件捕获");
  },
  true
);

center.addEventListener(
  "click",
  () => {
    console.log("center---事件捕获");
  },
  true
);

small.addEventListener(
  "click",
  () => {
    console.log("small---事件捕获");
  },
  true
);

big.addEventListener(
  "click",
  () => {
    console.log("big---事件冒泡");
  },
  false
);

center.addEventListener(
  "click",
  () => {
    console.log("center---事件冒泡");
  },
  false
);

small.addEventListener(
  "click",
  () => {
    console.log("small---事件冒泡");
  },
  false
);
```

控制台打印：

`click small box`
big---事件捕获
center---事件捕获
small---事件捕获
small---事件冒泡
center---事件冒泡
big---事件冒泡

## 事件委托

`事件委托` 也称为 `事件代理` 。就是利用 `事件冒泡` ，把子元素的事件都绑定到父元素上。如果子元素阻止了事件冒泡，那么委托就无法实现

不是每个子节点单独设置事件监听器，而是事件监听器设置在其父节点上，然后利用冒泡原理影响设置每个子节点。

### 应用场景

`1000` 个 `button` 需要注册点击事件

如果循环给每个按钮添加点击事件，那么会增加内存损耗，影响性能

```js
let btns = document.querySelector(".button");
console.log(btns);
for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    console.log(i);
  };
}
```

此时给 `button` 的父元素添加点击事件

```js
let father = document.querySelector(".father");
father.onclick = function (e) {
  console.log(e.target.innerHTML);
};
```

相当于每个按钮都绑定了点击事件

**优点：**

1.替代循环绑定事件的操作，减少内存消耗，提高性能。比如：

- 在 `table` 上代理所有 `td` 的 `click` 事件。
- 在 `ul` 上代理所有 `li` 的 `click` 事件。

  2.简化了 `dom` 节点更新时，相应事件的更新。比如：

- 不用在新添加的 `li` 上绑定 `click` 事件。
- 当删除某个 `li` 时，不用移解绑上面的 `click` 事件。

**缺点：**

1. 事件委托基于冒泡，对于不冒泡的事件不支持。
2. 层级过多，冒泡过程中，可能会被某层阻止掉。
3. 理论上委托会导致浏览器频繁调用处理函数，建议就近委托，比如在 `table` 上代理 `td` ，而不是在 `document` 上代理 `td` 。
