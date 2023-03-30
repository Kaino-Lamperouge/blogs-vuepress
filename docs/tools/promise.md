# Promise 对象

## 概述

`Promise` 是一个对象，也是一个构造函数

```javascript
function f1(resolve, reject) {
  // 异步代码...
}
var p1 = new Promise(f1);
```

`Promise` 构造函数接受一个回调函数 f1 作为参数，f1 里面是异步操作的代码。

返回的 p1 就是一个 `Promise` 实例

### Promise 的设计思想

所有异步任务都返回一个 `Promise` 实例

`Promise` 实例有一个 `then` 方法，用来指定下一步的回调函数

```javascript
var p1 = new Promise(f1);
p1.then(f2);
// f1的异步操作执行完成，就会执行f2
```

`Promise` 对象通过自身的状态，来控制异步操作

## `Promise` 对象的状态

### `Promise` 实例三种状态

- 异步操作未完成（ pending ）
- 异步操作成功（ fulfilled ）
- 异步操作失败（ rejected ）

`fulfilled` 和 `rejected` 合在一起称为 `resolved` （已定型）

### `Promise` 实例变化途径

- 从"未完成"到"成功"
- 从"未完成"到"失败"

一旦状态发生变化，就凝固了，不会再有新的状态变化。

一旦承诺成效，就不得再改变了。

这意味着，`Promise` 实例的状态变化只可能发生一次。

### `Promise` 的最终结果

- 异步操作成功，`Promise` 实例传回一个值（ value ），状态变为 `fulfilled` 。
- 异步操作失败，`Promise` 实例抛出一个错误（ error ），状态变为 `rejected` 。

## 基本用法

### `Promise` 构造函数

JavaScript 提供原生的Promise构造函数，用来生成 Promise 实例

```javascript
var promise = new Promise(function (resolve, reject) {
  if (/* 异步操作成功 /){
    resolve(value);
  } else { / 异步操作失败 */
    reject(new Error());
  }
});
```

`resolve` 函数的作用:

将 `Promise` 实例的状态从"未完成"变为"成功"（即从 `pending` 变为 `fulfilled` ）

在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。

`reject` 函数的作用:

将 `Promise` 实例的状态从从"未完成"变为"失败"（即从 `pending` 变为 `rejected` ）

在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

```javascript
timeout(100) 
```

返回一个 `Promise` 实例。100 毫秒以后，该实例的状态会变为 `fulfilled`

### `Promise` 新建后就会立即执行

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

首先输出的是 Promise

然后，`then` 方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行

所以 resolved 最后输出

### 异步加载图片

使用 `Promise` 包装了一个图片加载的异步操作

```javascript
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
```

### 用 `Promise` 对象 实现的 `Ajax` 操作

```javascript
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

`getJSON` 是对 `XMLHttpRequest` 对象的封装

用于发出一个针对 `JSON` 数据的 `HTTP` 请求

并且返回一个 `Promise` 对象

注意: 在 `getJSON` 内部，`resolve` 函数和 `reject` 函数调用时，都带有参数

如果调用 `resolve` 函数和 `reject` 函数时带有参数，那么它们的参数会被传递给回调函数。

`reject` 函数的参数通常是 `Error` 对象的实例，表示抛出的错误；

### `resolve` 函数的参数除了正常的值以外，还可能是另一个 `Promise` 实例

```javascript
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```

`p1` 和 `p2` 都是 `Promise` 的实例

`p2` 的 `resolve` 方法将 `p1` 作为参数，即一个异步操作的结果是返回另一个异步操作

`p1` 的状态就会传递给 `p2` ； `p1` 的状态决定了 `p2` 的状态

如果 `p1` 的状态是 `pending` ，那么 `p2` 的回调函数就会等待 `p1` 的状态改变；

### 如果 `p1` 的状态已经是 `resolved` 或者 `rejected` ，那么 `p2` 的回调函数将会立刻执行

```javascript
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})  

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```

`p1` 是一个 `Promise` ，3 秒之后变为 `rejected`

`p2` 的状态在 1 秒之后改变，`resolve` 方法返回的是 `p1`

`p2` 返回的是另一个 `Promise` ，导致 `p2` 自己的状态无效了，由 `p1` 的状态决定 `p2` 的状态。

所以，后面的 `then` 语句都变成针对后者（`p1`）

又过了 2 秒，`p1` 变为 `rejected`，导致触发 `catch` 方法指定的回调函数

### 调用 `resolve` 或 `reject` 并不会终结 `Promise` 的参数函数的执行

```javascript
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

调用 resolve(1) 以后，后面的 console.log(2) 还是会执行，并且会首先打印出来

因为立即 `resolved` 的 `Promise` 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务

调用 `resolve` 或 `reject` 以后，`Promise` 的使命就完成了，

后继操作应该放到 `then` 方法里面，而不应该直接写在 `resolve` 或 `reject` 的后面。

所以，最好在它们前面加上 `return` 语句，这样就不会有意外

```javascript
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```

## Promise.prototype.then()

`Promise` 实例具有 `then` 方法，也就是说，`then` 方法是定义在原型对象 Promise.prototype 上的。

作用：为 `Promise` 实例添加状态改变时的回调函数

`then` 方法的第一个参数是 `resolved` 状态的回调函数，第二个参数是 `rejected` 状态的回调函数，它们都是可选的

`then` 方法返回的是一个新的 `Promise` 实例（注意，不是原来那个 `Promise` 实例）。

因此可以采用链式写法，即 `then` 方法后面再调用另一个 `then` 方法

```javascript
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```

第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

采用链式的 `then` ，可以指定一组按照次序调用的回调函数。

前一个回调函数，有可能返回的还是一个 `Promise` 对象（即有异步操作），这时后一个回调函数，就会等待该 `Promise` 对象的状态发生变化，才会被调用。

---

`Promise`实例生成以后，可以用 `then` 方法分别指定 `resolved` 状态和 `rejected` 状态的回调函数

```javascript
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

`Promise` 实例的 `then` 方法，用来添加回调函数。

`then` 方法可以接受两个回调函数：

- 异步操作成功（变为 `fulfilled` 状态）时的回调函数
- 异步操作失败（变为 `rejected` 状态）时的回调函数（该参数可以省略）

一旦状态改变，就调用相应的回调函数。

```javascript
var p1 = new Promise(function (resolve, reject) {
  resolve('成功');
});
p1.then(console.log, console.error);
// "成功"
var p2 = new Promise(function (resolve, reject) {
  reject(new Error(‘失败’));
});
p2.then(console.log, console.error);
// Error: 失败
```

p1 和 p2 都是 `Promise` 实例，它们的 `then` 方法绑定两个回调函数：

成功时的回调函数 console.log ，失败时的回调函数 console.error 。

p1 的状态变为成功，p2 的状态变为失败，对应的回调函数会收到异步操作传回的值，然后在控制台输出

`then` 方法可以链式使用

```javascript
p1
  .then(step1)
  .then(step2)
  .then(step3)
  .then(
    console.log,
    console.error
  );
```

p1 后面有几个 `then` ，意味依次有几个回调函数。

只要前一步的状态变为 `fulfilled` ，就会依次执行紧跟在后面的回调函数

最后一个 `then` 方法，回调函数是 console.log 和 console.error ，用法上有一点重要的区别:

console.log 只显示 step3 的返回值，而 console.error 可以显示 p1 、step1 、step2 、step3 之中任意一个发生的错误。

如果 step1 的状态变为 `rejected` ，那么 step2 和 step3 都不会执行了（因为它们是 resolved 的回调函数）。

`Promise` 开始寻找，接下来第一个为 `rejected` 的回调函数，在上面代码中是 console.error

∴ `Promise` 对象的报错具有传递性

## Promise.prototype.catch()

`Promise.prototype.catch()` 方法是 `.then(null, rejection)` 或 `.then(undefined, rejection)` 的别名，用于指定发生错误时的回调函数

```javascript
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

`getJSON()` 方法返回一个 `Promise` 对象，如果该对象状态变为 `resolved` ，则会调用 `then()` 方法指定的回调函数；

如果异步操作抛出错误，状态就会变为 `rejected` ，就会调用 `catch()` 方法指定的回调函数，处理这个错误

`then()` 方法指定的回调函数，如果运行中抛出错误，也会被 `catch()` 方法捕获

```javascript
p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err));
```

## Promise.prototype.finally()

`finally()` 方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

不管 `promise` 最后的状态，在执行完 `then` 或 `catch` 指定的回调函数以后，都会执行 `finally` 方法指定的回调函数

### 服务器使用 `Promise` 处理请求，然后使用 `finally` 方法关掉服务器

```javascript
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
```

`finally` 方法里面的操作，与状态无关的，不依赖于 `Promise` 的执行结果

`finally` 本质上是 `then` 方法的特例

```javascript
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

如果不使用 `finally` 方法，同样的语句需要为成功和失败两种情况各写一次。有了 `finally` 方法，则只需要写一次。

## Promise.all()

`Promise.all()` 方法用于将多个 `Promise` 实例，包装成一个新的 `Promise` 实例

```javascript
const p = Promise.all([p1, p2, p3]);
```

`Promise.all()` 方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 `Promise` 实例，

如果不是，就会先调用下面讲到的`Promise.resolve` 方法，将参数转为 `Promise` 实例，再进一步处理

`Promise.all()` 方法的参数可以不是数组，但必须具有 `Iterator` (迭代器)接口，且返回的每个成员都是 `Promise` 实例

`p` 的状态由 `p1` 、 `p2` 、 `p3` 决定，分成两种情况

- 只有 `p1` 、 `p2` 、 `p3` 的状态都变成 `fulfilled` ， `p` 的状态才会变成 `fulfilled` ，此时 `p1` 、 `p2` 、 `p3` 的返回值组成一个数组，传递给p的回调函数。

- 只要 `p1` 、 `p2` 、 `p3` 之中有一个被 `rejected` ， `p` 的状态就变成 `rejected` ，此时第一个被 `reject` 的实例的返回值，会传递给 `p` 的回调函数。

## Promise.race()

`Promise.race()` 方法将多个 `Promise` 实例，包装成一个新的 `Promise` 实例

```javascript
const p = Promise.race([p1, p2, p3]);
```

只要 `p1` 、 `p2` 、 `p3` 之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 `Promise` 实例的返回值，就传递给 `p` 的回调函数

### 如果指定时间内没有获得结果，就将 `Promise` 的状态变为 `reject` ，否则变为 `resolve`

```javascript
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```

如果 5 秒之内 `fetch` 方法无法返回结果，变量 `p` 的状态就会变为 `rejected` ，从而触发 `catch` 方法指定的回调函数

## Promise.allSettled()

`Promise.all()` 方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。

```javascript
const urls = [url_1, url_2, url_3];
const requests = urls.map(x => fetch(x));

try {
  await Promise.all(requests);
  console.log('所有请求都成功。');
} catch {
  console.log('至少一个请求失败，其他请求可能还没结束。');
}
```

`Promise.all()` 可以确定所有请求都成功了，但是只要有一个请求失败，它就会报错，而不管另外的请求是否结束。

`Promise.allSettled()` 方法，用来确定一组异步操作是否都结束了（不管成功或失败）。

`Settled` 包含了 `fulfilled` 和 `rejected` 两种情况。

`Promise.allSettled()` 方法接受一个数组作为参数，数组的每个成员都是一个 `Promise` 对象，并返回一个新的 `Promise` 对象。

只有等到参数数组的所有 `Promise` 对象都发生状态变更（不管是 `fulfilled` 还是 `rejected` ），返回的 `Promise` 对象才会发生状态变更。

```javascript
const promises = [
  fetch('/api-1'),
  fetch('/api-2'),
  fetch('/api-3'),
];

await Promise.allSettled(promises);
removeLoadingIndicator();
```

数组 `promises` 包含了三个请求，只有等到这三个请求都结束了（不管请求成功还是失败）， `removeLoadingIndicator()` 才会执行

该方法返回的新的 `Promise` 实例，一旦发生状态变更，状态总是 `fulfilled` ，不会变成 `rejected` 。

状态变成 `fulfilled` 后，它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 `Promise` 对象。

```javascript
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
```

`Promise.allSettled()` 的返回值 `allSettledPromise` ，状态只可能变成 `fulfilled` 。

它的回调函数接收到的参数是数组 `results` 。

该数组的每个成员都是一个对象，对应传入 `Promise.allSettled()` 的数组里面的两个 `Promise` 对象

results的每个成员是一个对象，对象的格式是固定的，对应异步操作的结果。

```javascript
// 异步操作成功时
{status: 'fulfilled', value: value}

// 异步操作失败时
{status: 'rejected', reason: reason}
```

成员对象的 `status` 属性的值只可能是字符串 `fulfilled` 或字符串 `rejected` ，用来区分异步操作是成功还是失败。

如果是成功（`fulfilled`），对象会有 `value` 属性，如果是失败（`rejected`），会有 `reason` 属性，对应两种状态时前面异步操作的返回值

## Promise.any()

接受一组 `Promise` 实例作为参数，包装成一个新的 `Promise` 实例返回

```javascript
Promise.any([
  fetch('https://v8.dev/').then(() => 'home'),
  fetch('https://v8.dev/blog').then(() => 'blog'),
  fetch('https://v8.dev/docs').then(() => 'docs')
]).then((first) => {  // 只要有一个 fetch() 请求成功
  console.log(first);
}).catch((error) => { // 所有三个 fetch() 全部请求失败
  console.log(error);
});
```

只要参数实例有一个变成 `fulfilled` 状态，包装实例就会变成 `fulfilled` 状态；

如果所有参数实例都变成 `rejected` 状态，包装实例就会变成 `rejected` 状态。

`Promise.any()` 不会因为某个 `Promise` 变成 `rejected` 状态而结束，

必须等到所有参数 `Promise` 变成 `rejected` 状态才会结束。

### `Promise()` 与 `await` 命令结合

```javascript
const promises = [
  fetch('/endpoint-a').then(() => 'a'),
  fetch('/endpoint-b').then(() => 'b'),
  fetch('/endpoint-c').then(() => 'c'),
];

try {
  const first = await Promise.any(promises);
  console.log(first);
} catch (error) {
  console.log(error);
}
```

`Promise.any()` 方法的参数数组包含三个 `Promise` 操作。

其中只要有一个变成 `fulfilled` ，`Promise.any()` 返回的 `Promise` 对象就变成 `fulfilled` 。

如果所有三个操作都变成 `rejected` ，那么 `await` 命令就会抛出错误

## Promise.resolve()

将现有对象转为 `Promise` 对象

```javascript
// 将 jQuery 生成的 deferred 对象，转为一个新的 Promise 对象
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
```

```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

### 参数是一个 Promise 实例

`Promise.resolve` 将不做任何修改、原封不动地返回这个实例

### 参数是一个 `thenable` 对象

`thenable` 对象指的是具有 `then` 方法的对象

```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

`Promise.resolve()` 方法会将这个对象转为 `Promise` 对象，然后就立即执行 `thenable` 对象的 `then()` 方法。

```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value);  // 42
});
```

`thenable` 对象的 `then()` 方法执行后，对象 `p1` 的状态就变为 `resolved` ，

从而立即执行最后那个 `then()` 方法指定的回调函数，输出 42

### 参数不是具有 `then()` 方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有 `then()` 方法的对象，

则 `Promise.resolve()` 方法返回一个新的 `Promise` 对象，状态为 `resolved`

```javascript
const p = Promise.resolve('Hello');

p.then(function (s) {
  console.log(s)
});
// Hello
```

新的 `Promise` 对象的实例 `p`。

字符串 `Hello` 不属于异步操作（字符串对象不具有 `then` 方法）

返回 `Promise` 实例的状态从一生成就是 `resolved` ，所以回调函数会立即执行。

`Promise.resolve()` 方法的参数，会同时传给回调函数。

### 不带有任何参数

`Promise.resolve()` 方法允许调用时不带参数，直接返回一个 `resolved` 状态的 `Promise` 对象。

直接调用 `Promise.resolve()`方法，得到一个 `Promise` 对象。

```javascript
const p = Promise.resolve();

p.then(function () {
  // ...
});
```

变量 `p` 是一个 `Promise` 对象

立即 `resolve()` 的 `Promise` 对象，是在本轮'事件循环'（`event loop`）的结束时执行，而不是在下一轮'事件循环'的开始时

```javascript
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```

`setTimeout(fn, 0)` 在下一轮'事件循环'开始时执行

`Promise.resolve()` 在本轮'事件循环'结束时执行

`console.log('one')` 是立即执行，因此最先输出

## Promise.reject()

返回一个新的 `Promise` 实例，该实例的状态为 `rejected` (操作失败)

```javascript
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

生成一个 `Promise` 对象的实例 `p` ，状态为 `rejected` ，回调函数会立即执行。

`Promise.reject()` 方法的参数，会原封不动地作为 `reject` 的理由，变成后续方法的参数。

```javascript
Promise.reject('出错了')
.catch(e => {
  console.log(e === '出错了')
})
// true
```

`Promise.reject()` 方法的参数是一个字符串，后面 `catch()` 方法的参数 `e` 就是这个字符串

## Promise.try()

不管 `f` 是否包含异步操作，都用 `then` 方法指定下一步流程，用 `catch` 方法处理 `f` 抛出的错误

```javascript
Promise.resolve().then(f)
```

如果 `f` 是同步函数，那么它会在本轮事件循环的末尾执行

```javascript
const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now
```

函数 `f` 是同步的，但是用 `Promise` 包装了以后，就变成异步执行了
