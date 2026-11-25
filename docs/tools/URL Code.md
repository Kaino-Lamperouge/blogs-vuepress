---
title: "URL 编码"
date: 2023-03-28
tags:
  - 工程实践
  - http
description: "URL 只允许 ASCII 字符，中文、空格、&、# 这类字符必须转成 %XX 形式，否则解析会出错。编码的本质是把不安全的字符换成安全字符。"
---
# URL 编码

`URL` 只允许 `ASCII` 字符，中文、空格、`&`、`#` 这类字符必须转成 `%XX` 形式，否则解析会出错。编码的本质是**把不安全的字符换成安全字符**。

## 为什么需要编码

- `URL` 语法里 `&` 是参数分隔符，`#` 是片段标识，`?` 是查询起点，参数值里出现它们会被提前截断；
- 中文、emoji 不在 `ASCII` 范围内，必须按 `UTF-8` 字节再转成 `%XX`；
- 空格在部分场景会被转成 `+`，在另一些场景必须是 `%20`，很容易踩坑。

## encodeURI vs encodeURIComponent

| 方法 | 保留字符 | 用途 |
| --- | --- | --- |
| `encodeURI` | `: / ? # [ ] @ ! $ & ' ( ) * + , ; =` | 编码**整条 URL** |
| `encodeURIComponent` | `! ' ( ) * - . _ ~` | 编码 URL 的**某个参数值** |

```js
encodeURI('https://a.com/搜索?q=前端 笔记');
// https://a.com/%E6%90%9C%E7%B4%A2?q=%E5%89%8D%E7%AB%AF%20%E7%AC%94%E8%AE%B0

encodeURIComponent('前端 笔记&page=1');
// %E5%89%8D%E7%AB%AF%20%E7%AC%94%E8%AE%B0%26page%3D1
```

注意第二行把 `&` 和 `=` 也编码了——这正是参数值该有的行为。**拼接 query 时用 `encodeURIComponent`，不要用 `encodeURI`，否则值里的 `&` 会把参数拆坏。**

## 常见坑

1. **整条 URL 用 `encodeURIComponent`**：协议和路径里的 `/` `:` 也被编码，地址直接失效；
2. **参数值用 `encodeURI`**：值里的 `&`、`=`、`#` 保留下来，服务端解析出错；
3. **重复编码**：已经编码过的值又编一次，`%` 变成 `%25`，后端拿到乱码；
4. **中文未编码**：部分浏览器会自动处理，但复制到 curl、日志、第三方系统时就会断。

## 更省心的写法

```js
const params = new URLSearchParams({ q: '前端 & 笔记', page: 1 });
fetch(`/api/search?${params}`); // 自动编码

const url = new URL('https://a.com/search');
url.searchParams.set('q', '前端');
```

`URLSearchParams` 会负责编码和解码，比自己拼字符串可靠。

## 解码

```js
decodeURIComponent('%E5%89%8D%E7%AB%AF'); // 前端
```

`decodeURIComponent` 遇到非法序列会抛 `URIError`，服务端接收参数时要先判空再做解码，避免脏数据把接口打挂。
