# 断点调试

## `Chrome` `debugger` 基本用法

在代码中加一句 `debugger` ，到浏览器中刷新页面，浏览器就会在 `debugger` 语句那停止执行。

```js
// 国际惯例，hello world。
const greet = () => {
  const greeting = "hello debugger";
  // 浏览器执行到这里将会暂停
  debugger
  console.log(greeting);
};

greet();

console.log("js evaluation done");
```

<img :src="$withBase('/images/debugger.png')">

- 蓝色区域用于文件选择:`Page` 一栏是指当前页面中的 `JS` 文件， `Filesystem` 会显示我们系统中的文件。
- 红色区域代码的行号和内容。代码的行号处可以通过点击来添加新的断点，再次点击后取消。
- 黄色区域用于控制代码的执行。
  - 第1个按钮是让代码继续执行(resume)，如果遇到下一个断点就会再次中断执行。
  - 第2个按钮可以让浏览器执行当前行(debugger之前)，然后在下一行中断代码，
  - 第3个按钮是进入当前函数，查看函数具体内容。假设我们当前停在第7行 `greet()` ，点击第3个按钮就会进入 `greet` 方法中(也就是第2行)。
  如果不想再看 `greet` 方法了，就点击第4个按钮，跳出这个方法，回到第8行。
- 绿色区域可以查看变量的内容和当前的调用栈。

注意：上线前必须删除这些语句，可以通过配置 `webpack` 来自动去除
