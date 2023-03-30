# 闭包

## 上级作用域

- 函数的上级作用域在哪里创建创建的，上级作用域就是谁

```js
var a = 10
function foo(){
  console.log(a)
}
function sum() {
  var a = 20
  foo()
}

sum()
```

>函数 `foo()` 是在全局下创建的，所以 `a` 的上级作用域就是 `window`，输出就是 `10`

## 闭包是什么

闭包允许函数访问并操作函数外部的变量。

闭包是指有权访问另外一个函数作用域中的变量的函数。

闭包是指那些能够访问外部函数作用域中的变量的函数。

## 形成闭包的原因

内部的函数存在外部作用域的引用就会导致闭包。

```js
var a = 0
function foo(){
  var b =14
  function fo(){
    console.log(a, b)
  }
  fo()
}
foo()
```

>子函数 fo 内存就存在外部作用域的引用 a， b，所以这就会产生闭包

## 闭包变量存储的位置

>闭包中的变量存储的位置是堆内存。

- 假如闭包中的变量存储在栈内存中，那么栈的回收 会把处于栈顶的变量自动回收。所以闭包中的变量如果处于栈中那么变量被销毁后，闭包中的变量就没有了。所以闭包引用的变量是出于堆内存中的。

## 闭包的作用

- 保护函数的私有变量不受外部的干扰。形成不销毁的栈内存。
- 保存，把一些函数内的值保存下来。闭包可以实现方法和属性的私有化

## 闭包经典使用场景

- 1.`return` 回一个函数

```js
var n = 10
function fn(){
  var n =20
  function f() {
    n++;
    console.log(n)
  }
  return f
}

var x = fn()
x() // 21
```

>这里的 `return f`， `f()` 就是一个闭包，存在上级作用域的引用。

- 2.函数作为参数

```js
var a = 'yyq'
function foo(){
  var a = 'foo'
  function fo(){
    console.log(a)
  }
  return fo
}

function f(p){
  var a = 'f'
  p()
}
f(foo())
/* 输出
*   foo
/ 
```

>使用 `return fo` 返回回来，`fo()` 就是闭包，`f(foo())` 执行的参数就是函数 `fo`，
因为 `fo()` 中的 `a` 的上级作用域就是函数 `foo()`，所以输出就是 `foo`

- 3.IIFE（自执行函数）

```js
var n = 'yyq';
(function p(){
  console.log(n)
})()
/* 输出
*   yyq
/ 
```

>闭包 `p()`，存在 `window` 下的引用 `n`。

- 4.循环赋值

```js
for(var i = 0;i < 10; i++){
  (function(j){
    setTimeout(function(){
      console.log(j)
    }, 1000) 
  })(i)
}
```

>因为存在闭包的原因上面能依次输出 `1~10` ，闭包形成了 `10` 个互不干扰的私有作用域。
将外层的自执行函数去掉后就不存在外部作用域的引用了，输出的结果就是连续的 `10` 。
为什么会连续输出10，因为 `JS` 是单线程的遇到异步的代码不会先执行(会入栈)，
等到同步的代码执行完 `i++` 到 `10` 时，异步代码才开始执行此时的 `i=10` 输出的都是 `10` 。

***闭包：函数执行形成一个私有的作用域，保护里面的私有变量不受外界的干扰，这种保护机制称之为“闭包”***

***形成一个不销毁的私有作用域（私有栈内存）才是闭包***

闭包具有保护作用：保护私有变量不受外界的干扰

- 5.使用回调函数就是在使用闭包

```js
window.name = 'yyq'
setTimeout(function timeHandler(){
  console.log(window.name);
}, 100)
```

- 6.节流防抖

```js
// 节流
function throttle(fn, timeout) {
    let timer = null
    return function (...arg) {
        if(timer) return
        timer = setTimeout(() => {
            fn.apply(this, arg)
            timer = null
        }, timeout)
    }
}

// 防抖
function debounce(fn, timeout){
    let timer = null
    return function(...arg){
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, timeout)
    }
}
```

- 7.柯里化实现

```js
function curry(fn, len = fn.length) {
    return _curry(fn, len)
}

function _curry(fn, len, ...arg) {
    return function (...params) {
        let _arg = [...arg, ...params]
        if (_arg.length >= len) {
            return fn.apply(this, _arg)
        } else {
            return _curry.call(this, fn, len, ..._arg)
        }
    }
}

let fn = curry(function (a, b, c, d, e) {
    console.log(a + b + c + d + e)
})

fn(1, 2, 3, 4, 5)  // 15
fn(1, 2)(3, 4, 5)
fn(1, 2)(3)(4)(5)
fn(1)(2)(3)(4)(5)
```

## 使用闭包需要注意什么

>容易导致内存泄漏。闭包会携带包含其它的函数作用域，因此会比其他函数占用更多的内存。过度使用闭包会导致内存占用过多，所以要谨慎使用闭包。

## 怎么检查内存泄露

`performance` 面板 和 `memory` 面板可以找到泄露的现象和位置

### 面试题

```js
function createCounter() {
  let counter = 0
  const myFunction = function() {
    counter = counter + 1
    return counter
  }
  return myFunction
}
const increment = createCounter()
const c1 = increment()
const c2 = increment()
const c3 = increment()
console.log('example increment', c1, c2, c3)
```

返回的函数可以访问不属于全局作用域的变量，但它们仅存在于其闭包中

```js
const addX = x => n => n + x
等价于
function addX(x) {
  return function(n) {
     return n + x
  }
}
```

函数返回函数

```js
let c = 4
function addX(x) {
  return function(n) {
     return n + x
  }
}
const addThree = addX(3)
let d = addThree(c)
console.log('example partial application', d)
```

加法函数 `addX`，它接受一个参数x并返回另一个函数。

返回的函数还接受一个参数并将其添加到变量 `x` 中。

变量 `x` 是闭包的一部分，当变量 `addThree` 在本地上下文中声明时，它被分配一个函数定义和一个闭包，闭包包含变量 `x`。

当 `addThree` 被调用并执行时，它可以从闭包中访问变量 `x` 以及为参数传递变量 `n`并返回两者的和 `7`。

### `for` 循环和闭包

```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]()
/* 输出
    3
    3
    3
/
```

>这里的 `i` 是全局下的 `i`，共用一个作用域，当函数被执行的时候这时的 `i=3`，导致输出的结构都是 `3`。

自执行函数和闭包

```js
var data = [];

for (var i = 0; i < 3; i++) {
    (function(j){
      setTimeout( data[j] = function () {
        console.log(j);
      }, 0)
    })(i)
}

data[0]();
data[1]();
data[2]()
```

使用 let

```js
var data = [];

for (let i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]()
```

>let 具有块级作用域，形成的3个私有作用域都是互不干扰的。

```js
var result = [];
var a = 3;
var total = 0;

function foo(a) {
    for (var i = 0; i < 3; i++) {
        result[i] = function () {
            total += i * a;
            console.log(total);
        }
    }
}

foo(1);
result[0]();  // 3
console.log(i);  // 3
result[1]();  // 6
console.log(i);  // 3
result[2]();  // 9
console.log(i);  // 3
```

>闭包: `total` 被外层引用没有被销毁
