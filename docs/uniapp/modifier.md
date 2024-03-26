# 事件修饰符

修饰符 (`modifier`) 是以半角句号 . 指明的特殊后缀

用于指出一个指令应该以特殊方式绑定

例如，`.prevent` 修饰符告诉 `@` 事件 对于触发的事件调用 `event.preventDefault()` ：

`@`事件（`v-on`）提供了事件修饰符:

- `.stop`: 各平台均支持， 使用时会阻止事件冒泡，在非 H5 端同时也会阻止事件的默认行为
- `.native`: 监听原生事件
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```html
<!-- 阻止单击事件继续传播 -->
<view @click.stop="doThis"></view>
```

> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。用 `@click.prevent.self` 会阻止所有的点击，而 `@click.self.prevent` 只会阻止对元素自身的点击。

`moveHandle` 可以用来处理 `touchmove` 的事件

```html
<!-- 禁止蒙版下的页面滚动 -->
<view class="mask" @touchmove.stop.prevent="moveHandle"></view>
```

## 事件映射表

```js
// 事件映射表，左侧为 WEB 事件，右侧为 ``uni-app`` 对应事件
 {
  click: 'tap',
  touchstart: 'touchstart',
  touchmove: 'touchmove',
  touchcancel: 'touchcancel',
  touchend: 'touchend',
  tap: 'tap',
  longtap: 'longtap', //推荐使用longpress代替
  input: 'input',
  change: 'change',
  submit: 'submit',
  blur: 'blur',
  focus: 'focus',
  reset: 'reset',
  confirm: 'confirm',
  columnchange: 'columnchange',
  linechange: 'linechange',
  error: 'error',
  scrolltoupper: 'scrolltoupper',
  scrolltolower: 'scrolltolower',
  scroll: 'scroll'
}
```
