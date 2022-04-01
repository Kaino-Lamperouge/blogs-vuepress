# Export

在创建 `JavaScript` 模块时，`export` 语句用于从模块中导出实时绑定的函数、对象或原始值，以便其他程序可以通过 `import` 语句使用它们。

被导出的绑定值依然可以在本地进行修改。

在使用 `import` 进行导入时，这些绑定值只能被导入模块所读取，但在 `export` 导出模块中对这些绑定值进行修改，所修改的值也会实时地更新。

#### 语法
```
// 导出单个特性
export let name1, name2, …, nameN; // also var, const
export let name1 = …, name2 = …, …, nameN; // also var, const
export function FunctionName(){...}
export class ClassName {...}

// 导出列表
export { name1, name2, …, nameN };

// 重命名导出
export { variable1 as name1, variable2 as name2, …, nameN };

// 解构导出并重命名
export const { name1, name2: bar } = o;

// 默认导出
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

// 导出模块合集
export * from …; // does not set the default export
export * as name1 from …; // Draft ECMAScript® 2O21
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
export { default } from …;
```

能够在每一个模块中定义多个命名导出，但是只允许有一个默认导出。

---

## 前端模块化

在模块化开发过程中经常遇到模块的导出导入，总体上区分两大规范 `CommonJS` 模块规范和 `ES6` 模块规范

### 什么是模块
- 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
- 块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信

### 模块化的好处
- 避免命名冲突(减少命名空间污染)
- 更好的分离, 按需加载
- 更高复用性
- 高可维护性

### commonJs
#### 概述
`Node` 应用由模块组成，采用 `CommonJS` 模块规范。`Node` 里面的模块系统遵循的是 `CommonJS` 规范。

每个文件就是一个模块，有自己的作用域。

在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。

#### 特点
- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序。

#### 基本语法
- 暴露模块：module.exports = value 或 exports.xxx = value
- 引入模块：require(xxx)，如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径

`CommonJS` 定义的模块分为: 模块标识(module)、模块定义(exports) 、模块引用(require)

---

`exports` 是一个对象，所以可以 `exports` 多个值

`module.exports` 初始值为一个空对象 `{}`
```
module.exports = {}
```
`exports` 等于 `module.exports`
相当于在 js 文件头部，有一个 `module` 对象，`module.exports = exports`

`exports` 是指向的 `module.exports` 的引用
```
exports = module.exports
``` 
对于要导出的属性，可以简单直接挂到 `exports` 对象上
```
// 方案一
module.exports.name = '张三'
module.exports.age = 10
// or
exports.name = '张三',
exports.age = 10
```
```
// 方案二
const name = '张三'
const age = 10
module.exports = {
  name: name,
  age: age
}
```
#### 模块的加载机制
`CommonJS` 模块的加载机制是，输入的是被输出的值的拷贝。

也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

`require()` 返回的是 `module.exports` 而不是 `exports`

也就是: exports = module.exports = {} , `exports` 和 `module.exports` 都指向一个引用地址 `{}`

如果 exports.name = 'xxx'，那 module.exports = { name:'xxx' } , 引用对象改变，两者又是同时指向一个对象，所以都改变了。

- 如果导出基础类型 exports = {} 里的内容改变， module.exports 里的内容不会变
- 如果导出引用类型 exports = {} 里的内容改变， module.exports 里的内容会变
(知识点：值传递 引用传递)
```
exports = {
  name: name,
  age: age
}
```

### ES6 规范
1. 每一个模块只加载一次， 每一个 `JS` 只执行一次， 如果下次再去加载同目录下同文件，直接从内存中读取。 一个模块就是一个单例，或者说就是一个对象；
2. 每一个模块内声明的变量都是局部变量， 不会污染全局作用域；
3. 模块内部的变量或者函数可以通过 `export` 导出；
4. 一个模块可以导入别的模块

- export { xx, xx } 与 import { xx, xx } from '../../xxx.js'
```
// 暴露.js
let name = 'xiaoming';
let age = 18;
export { name, age } 
// 引用.js
import { name, age } from '../../暴露.js'
```
- 导出接口取别名
```
// 暴露.js
let fn1 = function() {console.log('sayHi')};
export { fn1 as sayHi };
// 引用.js
import { sayHi } from '暴露.js'
```
- 直接在 `export` 的地方定义导出的函数，或者变量：
export const foo = xxx; 
引用 import { foo } from '../../xx'
```
// 举个 `vue` 组件懒加载的例子
export const Index = () => import('@modules/index/index');
```
懒加载: 延迟加载
预加载: 提前加载图片，当用户需要查看时可直接从本地缓存中渲染

- `export default` 导出,这种导出的方式不需要知道变量的名字， 相当于匿名；
```
// 如果一个js模块文件就只有一个功能， 那么就可以使用export default导出
// 暴露.js
export default {
  name: 'xiaoming'，
  age: 18
}; 
// 引用.js
import person from '暴露.js'
```
- 通配符导入
```
// 暴露.js
export fn1;
export fn2;
export fn3;
// 引用.js
import * as fns from '暴露.js';
```
在 `import` 的时候可以使用通配符 `*` 导入外部的模块：
import * as xxx from ‘xxx’: 会将若干 `export` 导出的内容组合成一个对象返回；
import xxx from ‘xxx’：（export default Din）只会导出这个默认的对象作为一个对象;

### AMD
`CommonJS` 规范加载模块是同步的，只有加载完成，才能执行后面的操作。

`AMD` 规范则是非同步加载模块，允许指定回调函数。

由于 `Node.js` 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以 `CommonJS` 规范比较适用。

但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用 `AMD` 规范。

此外 `AMD` 规范比 `CommonJS` 规范在浏览器端实现要来着早。

### CMD
`CMD` 规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。

`CMD` 规范整合了 `CommonJS` 和 `AMD` 规范的特点。(既可同步也可异步)

在 `Sea.js` 中，所有 `JavaScript` 模块都遵循 `CMD` 模块定义规范。
