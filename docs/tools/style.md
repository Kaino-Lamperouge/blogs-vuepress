# Style

## `Scoped` `CSS` 的原理

加了 `scoped` ， `PostCSS` 给一个组件中的所有 `dom` 添加唯一的一个自定义属性（唯一性的标记）`data-v-实例标识`，即 `CSS带属性选择器`

以此完成类似作用域的选择方式，从而达到样式私有化，使得组件之间的样式不互相污染。

`PostCSS` 是一个用 `JavaScript` 工具和插件转换 `CSS` 代码的工具

## 深度选择器

深度作用选择器: `scoped` 样式中的一个选择器能够选择到子组 或 后代组件中的元素

三种写法：

- `>>>`

```css
.class1 div >>> #class2 p
```

- `/deep/`

```css
.class1 div /deep/ #class2 p
或
.class1 div /deep/ #class2 p
```

- `::v-deep`

```css
.class1 div::v-deep #class2 p
或
.class1 div::v-deep #class2 p
```
