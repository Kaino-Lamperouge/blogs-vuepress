---
title: "URL 传参丢失特殊字符"
date: 2024-03-26
tags:
  - 工程实践
  - http
description: "拼接查询参数时，如果值里含有 #、&、+、=、空格或中文，另一端读取时经常只剩一半。原因不是\"URL 丢了字符\"，而是这些字符在 URL 语法里有特殊含义，被提前当成了分隔符。"
---
# URL 传参丢失特殊字符

拼接查询参数时，如果值里含有 `#`、`&`、`+`、`=`、空格或中文，另一端读取时经常只剩一半。原因不是"URL 丢了字符"，而是这些字符在 URL 语法里有特殊含义，被提前当成了分隔符。

## 哪些字符会出问题

| 字符 | 在 URL 里的含义 |
| --- | --- |
| `#` | 片段标识，后面的内容不会发给服务端 |
| `&` | 参数分隔符，值被截断 |
| `=` | 键值分隔符，值被拆成新参数 |
| `+` | 在 query 里常被解码成空格 |
| `%` | 编码前缀，非法序列会解析失败 |
| 空格 / 中文 | 非 ASCII，必须编码 |

## 正确做法

**只对参数值编码，不要编码整条 URL，也不要编码分隔符。**

```js
const url = `/page?keyword=${encodeURIComponent(keyword)}&from=${encodeURIComponent(from)}`;
```

常见错误写法：

```js
// 错误一：值没编码，keyword 里有 & 就会多出一个参数
`/page?keyword=${keyword}`

// 错误二：整条 URL 编码，? 和 = 也被编码，地址失效
encodeURIComponent(`/page?keyword=${keyword}`)

// 错误三：重复编码，% 变成 %25
encodeURIComponent(encodeURIComponent(keyword))
```

## 小程序 / uni-app 示例

```js
wx.redirectTo({
  url: '/page/detail?id=' + encodeURIComponent(Encrypt(id)),
});

// 接收页
onLoad(query) {
  const id = decodeURIComponent(query.id);
  this.setData({ id });
}
```

加密串里经常带 `+`、`/`、`=`，这些都必须编码，否则 `+` 会被服务端当成空格。

## 更稳的写法

```js
const params = new URLSearchParams();
params.set('keyword', keyword);
params.set('from', from);
const url = `/page?${params}`;
```

`URLSearchParams` 会自动处理编码，也避免了手动拼接多个参数时的漏编。

## 排查顺序

1. 看实际请求地址：`#` 之后的内容浏览器根本不会发出去；
2. 看有没有双重编码：搜 `%25`；
3. 服务端解码前先打印原始 query string，确认是传输阶段丢的还是解码阶段丢的；
4. 小程序、App 的 `query` 已经解码过一次，再 `decodeURIComponent` 可能报 `URIError`，按端区分处理。
