# uuid

```html
<img :src="captchaPath" alt="" @click="getCaptcha" />
```
```javascript
import { getUUID } from "@/utils";
// 生成随机数 传给src
getCaptcha() {
  const uuid = getUUID()
  const path = `/xxx/base/verify/captcha?key=${uuid}`
  const baseUrl = process.env.VUE_APP_BASE_URL // .env.production 文件 VUE_APP_BASE_URL

  this.formData.uuid = uuid;
  this.captchaPath = baseUrl + path;
}
```
```javascript
// @/utils/index.js 省略
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}
// 等价方法
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0; // 把r变成了整数
    var v = (c == 'x') ? r : (r&0x3|0x8); // x直接替换；y特殊处理 r&0x3|0x8 ,因为位运算有顺序，这样的值就限定在一个范围了，其范围就是二进制 1000-1011这样4个数字了，然后输出为8,9,A,B这样4个字符了。
    return v.toString(16);
  });
}
```