# Grammar

## 可选链(`Optional Chaining`): `?.`

可选链允许你读取位于连接对象链深处的属性的值，而不必显式地验证链中的每个引用是否有效。如果尝试访问的属性不存在，那么表达式会短路并返回 `undefined` 而不是抛出一个错误。

```js
Ref?.value?.acceptParams()
如果 Ref 是 null 或 undefined，那么整个表达式会返回 undefined。
否则，它会尝试访问 Ref 的 value 属性。
如果 Ref?.value 的结果不是 null 或 undefined，那么会尝试调用其 acceptParams 方法。
```
