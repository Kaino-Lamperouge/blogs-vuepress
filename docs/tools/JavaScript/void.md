# void 运算符

**`void` 是一元运算符**

`void` 运算符对给定的表达式进行求值，然后返回 `undefined` 。

**语法：**

```js
void expression
```

void 0 === undefined

```js
if(context === void 0) return fn;
//等价于
if(context === undefined) return fn;
```

**`void` 后跟着表达式，表达式中的语句会全部执行**

**`void` 返回值永远是 `undefined`**

```js
    var a = void 0
    console.log(a) // undefined

    var a = void alert('I am a girl')
    console.log(a) // undefined

    var a = void(66 + 99)
    console.log(a) // undefined
```

某些情况下用 `undefined` 判断存在风险，因 `undefined` 有被修改的可能性，但是 `void 0` 返回值一定是 `undefined`

`void 0` 基本所有的浏览器都支持

`void 0` 比 `undefined` 字符所占空间少
