# 小游戏实战

## main.js

```js
on(window,'load',function(){
  ...
})
```

事件监听器，监听窗口加载事件，并在窗口加载完成后执行回调函数

类似于等待整个页面加载完毕后再执行后续的代码

---

```js
var game = new Game();
```

创建游戏对象的代码

通过使用 `new Game()` ，创建了一个名为 `game` 的游戏实例，可以使用该实例调用游戏的方法和属性

---

```js
game.setup();
```

调用游戏对象的 `setup()` 方法，用于进行游戏的初始化设置

包括创建游戏场景、加载资源、设置游戏规则等

---

```js
event(game);
```

调用了名为 `event` 的函数，并将游戏实例 `game` 作为参数传递给该函数

为游戏添加事件监听器，以响应用户的操作并更新游戏状态
**示例**

```js
on(window, "load", function () {
  var game = new Game();

  game.setup();

  event(game);
});
```

---

## config.js

```js
var config = (function(){
  ...
})();
```

自执行函数，也被称为立即调用函数表达式（ `Immediately Invoked Function Expression` ， `IIFE` ）

它的作用是创建一个封闭的作用域，以便在其中定义和存储变量、函数和其他代码

在这个例子中，自执行函数没有任何参数，因此它的括号内留空

在括号中的最后一对括号表示要立即调用这个函数，并将其返回值赋值给变量 `config`

在这个例子中，自执行函数没有任何代码或返回值，因此它实际上不会产生任何效果

要使这个自执行函数有意义，我们需要在函数体中添加代码，返回一个对象或函数，或者在调用这个函数时传递参数
**示例**

```js
var config = (function () {
  var a = 0;
  var b = "";

  function getA() {
    return a;
  }

  function getB() {
    return b;
  }

  return {
    a: a,
    b: b,
  };
})();
```

私有变量 `a` 、 `b`

公有函数 `getA` 、 `getB`

返回一个对象，其中包含对这些公有函数的引用

---

## util.js

```js
var log = console.log.bind(console);
```

创建了一个名为 `log` 的变量，并将 `console.log` 函数绑定到 `console` 对象上

当我们调用 `log` 函数时，实际上是调用 `console.log` 函数

这种绑定是通过 `Function.prototype.bind()` 方法实现的

`bind()` 方法会创建一个新函数，将其绑定到指定的上下文对象，并将其用作新函数的 `this` 值

这也意味着该函数将具有与 `console.log` 相同的功能和行为

使用 `log('Hello, World!')` 来替代，以便在代码中更容易使用和调用

这样做可以简化代码并提高可读性

---

```js
var $ = function (elem) {
  return document.querySelectorAll(elem);
};
```

定义了一个名为 `$` 的函数，接受一个参数 `elem` ，表示一个 `CSS` 选择器

在函数内部，使用 `document.querySelectorAll` 方法来查询文档中匹配该选择器的所有元素，并将结果返回

通过调用 `$` 函数并传入一个 `CSS` 选择器作为参数，我们可以方便地获取匹配该选择器的所有元素
**示例**

```js
// 获取所有的段落元素
var paragraphs = $("p");

// 获取所有带有类名为"example"的元素
var examples = $(".example");

// 获取id为"myDiv"的元素
var myDiv = $("#myDiv");
```

可以简化 `DOM` 元素的选择和操作

---

**示例**

```js
var on = function (elem, type, callback, status) {
  elem.addEventListener(type, function (e) {
    callback(e);
    if (status) {
      return false;
    }
  });
};
```

定义了一个函数 `on` ，用于给元素添加一个事件监听器

- elem：要添加事件监听器的元素
- type：要监听的事件类型，例如 `click` 、 `keydown` 等
- callback：事件触发时要执行的回调函数
- status：一个布尔值，表示是否阻止事件的默认行为

函数内部使用 `addEventListener` 方法来给元素添加事件监听器

接受两个参数：要监听的事件类型和事件触发时要执行的回调函数

`callback` 函数，将事件对象 `e` 作为参数传递给 `callback` 函数

为了在事件触发时能够访问事件对象的属性和方法

根据 `status` 参数的值来决定是否阻止事件的默认行为

---

```js
JSON.parse();
```

通过 `JSON.parse` 方法将字符串转换成相应的 `JavaScript` 对象或数组

---

创建 `localstorage`

- `localStorage.key=value`
- `localStorage["key"]=value`
- `localStorage.setItem("key","value")`

提取 `localstorage`

- `localStorage.key`
- `localStorage["key"]`
- `localStorage.getItem("key")`

删除 `localstorage`

- `localStorage.remove(key)` ----删除某个 `key` 值
- `localStorage.clear()` ----删除所有 `key` 值

---

**示例**

```js
var toNdimension = function (arr, num) {
  var new_arr = [];
  for (var i = 0; i < arr.length; i += num) {
    new_arr.push(arr.slice(i, i + num));
  }
  return new_arr;
};
```

将一个一维数组转换为指定维度的多维数组

空数组 `new_arr` 来存储转换后的多维数组

循环的步长是 `num` ，也就是指定的维度大小

使用 `arr.slice(i, i+num)` 来截取原始数组的一个子数组，并将其添加到 `new_arr` 中

---

**示例**

```js
function reduceDimension(arr) {
  return Array.prototype.concat.apply([], arr);
}
```

将多维数组转换为一维数组

`Array.prototype.concat` 是 `JavaScript` 数组对象的原型方法，它接受一个或多个参数，并将它们连接成一个新的数组

`apply` 是 `JavaScript` 函数对象的方法，将一个函数作为另一个对象的方法来调用，并传递一个数组作为参数

将 `[]` 作为 `apply` 方法的第一个参数，是一个空数组

`concat` 方法需要一个数组作为参数，并将其连接到结果数组中

`apply` 方法用于传递一个数组作为参数给 `concat` 方法

---

## event.js

```js
var before;
```

定义了一个变量 `before` ，但没有为它赋值。

```js
var helpBtn = $("#help")[0];
```

获取网页中 `id` 为" `help` "的元素，并将其赋值给变量 `helpBtn`

通过使用索引[0]，将获取到的元素转换为 `DOM` 元素对象

```js
on(helpBtn, "click", function (e) {
  game.help();
});
```

给 `helpBtn` 元素添加了一个点击事件的监听器

当 `helpBtn` 被点击时，会触发一个回调函数，该回调函数调用了 `game` 对象的 `help()` 方法

当用户点击 `helpBtn` 时，将执行 `game.help()` 方法中定义的操作

## game.js

```js
restart: function () {
  location.reload();
},
```

`location.reload()` 方法用来刷新当前页面，就像刷新按钮一样
