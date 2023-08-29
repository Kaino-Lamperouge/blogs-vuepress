# 更改鼠标指针

```js
var body = document.querySelector("body")
body.style.cursor = "move"
```

鼠标的指针就被替换成一个十字架样式
<img :src="$withBase('/images/cursor.png')">

通过 `cursor` 属性将指针替换为自定义图片

```js
obox1.onmousemove = function(){
  this.style.cursor = 'url(../xxx.ico),auto';
}
```

`url` 中的图片仅仅支持 `.cur` 和 `.ico` 格式的图片

`url` 后的 `auto` 是可以设置的，当替换的图片路径有误或格式不对没有找到时，鼠标指针将会使用的样式

## 示例

```css
html, body{ cursor:url(../images/link.cur), auto; }
```
