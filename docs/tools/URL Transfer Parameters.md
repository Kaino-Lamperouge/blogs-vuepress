# URL携带参数缺失

用 `URL` 传参数的时候，用 `&` 符号连接，如果某一个参数中含'`#` `$` `^` `&` `*` `+` `=`'这些符号的时候，另一端读取 `URL` 地址时丢失符号

```js
encodeURIComponent("="); // 转成特殊符号
decodeURIComponent("="); // 把特殊符号，转回来
```

```js
wx.redirectTo({
  url: '/page?xxx=' + encodeURIComponent(Encrypt(xxx))
})

onLoad(query) {
  this.setData({ 
    xxx: decodeURIComponent(query.xxx),
  })
},
```
