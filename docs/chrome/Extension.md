# chrome 扩展程序（插件）

## 插件构成

**manifest.json**：相当于插件的 `meta` 信息，包含插件的名称、版本号、图标、脚本文件名称等，这个文件是每个插件都必须提供的，其他几部分都是可选的。
**background script**：可以调用全部的 `chrome` 插件 `API` ，实现跨域请求、网页截屏、弹出 `chrome` 通知消息等功能。相当于在一个隐藏的浏览器页面内默默运行。
**功能页面**：包括点击插件图标弹出的页面（简称 `popup` ）、插件的配置页面（简称 `options` ）。
**content script**：早期也被称为 `injected script` ，是插件注入到页面的脚本，但是不会体现在页面 `DOM` 结构里。`content script` 可以操作 `DOM` ，但是它和页面其他的脚本是隔离的，访问不到其他脚本定义的变量、函数等，相当于运行在单独的沙盒里。`content script` 可以调用有限的 `chrome` 插件 `API` ，网络请求收到同源策略限制。

### manifest.json

```json
{
  // 必须
  "manifest_version": 2,
  "name": "插件名称a",
  "version": "1.1.2",

  // 推荐
  "default_locale": "en",
  "description": "插件的描述",
  "icons": {
    "16": "img/icon.png", // 扩展程序页面上的图标
    "32": "img/icon.png", // Windows计算机通常需要此大小。提供此选项可防止尺寸失真缩小48x48选项。
    "48": "img/icon.png", // 显示在扩展程序管理页面上
    "128": "img/icon.png" // 在安装和Chrome Webstore中显示
  },

  // 可选
  "background": {
    "page": "background/background.html",
    "scripts": ["background.js"],
    // 推荐
    "persistent": false
  },
  "browser_action": {
    "default_icon": "img/icon.png",
    // 特定于工具栏的图标，至少建议使用16x16和32x32尺寸，应为方形，
    // 不然会变形
    "default_title": "悬浮在工具栏插件图标上时的tooltip内容",
    "default_popup": "hello.html" // 不允许内联JavaScript。
  },
  "content_scripts": [
    {
      "js": ["inject.js"],
      "matches": ["http://*/*", "https://*/*"],
      "run_at": "document_start"
    }
  ],
  "permissions": ["contextMenus", "tabs", "http://*/*", "https://*/*"],
  "web_accessible_resources": ["dist/*", "dist/**/*"]
}
```

#### icons

`extension` 程序的图标，可以有一个或多个。

`48x48` 的图标用在 `extensions` 的管理界面(`chrome://extensions`)

`128x128` 的图标用在安装 `extension` 程序的时候

`16x16` 的图标当作 `extension` 的页面图标，也可以显示在信息栏上

图标一般为 `PNG` 格式, 因为最好的透明度的支持，不过 `WebKit` 支持任何格式，包括 `BMP` ，`GIF` ，`ICO` 等

注意: 以上写的图标不是固定的。随浏览器的环境的改变而变。如：安装时弹出的对话框变小。

#### browser_action 与 page_action

`browser_action` 可以适用于任何页面

`page_action` 只能作用于某一页面，当打开该页面时触发该 `Google Chrome` 扩展，关闭页面则 `Google Chrome` 扩展也随之消失

一些扩展任何页面可用，就都会显示在工具栏上为可用状态，一些扩展只适用于某些页面，如大家很熟悉的 `vue tools` 调试器，在检测到页面用的是 `vue` 时，就会在工具栏显示出来并可用（非灰色）

#### default_popup

在用户点击扩展程序图标时，都可以设置弹出一个 `popup` 页面。而这个页面中有可以运行的 `js` 脚本的。它会在每次点击插件图标—— `popup` 页面弹出时，重新载入。

#### permissions

在 `background` 里使用一些 `chrome api` ，需要授权才能使用，例如要使用 `chrome.tabs.xxx` 的 `api` ，就要在 `permissions` 引入“`tabs`”

#### web_accessible_resources

允许扩展外的页面访问的扩展内指定的资源。扩展是一个文件夹 `A` 的，别人的网站是一个文件夹 `B` ，`B` 要看 `A` 的东西，需要获得权限，而写在这个属性下的文件，就是授予了别人访问的权限。

### background script

`background` 可以理解为插件运行在浏览器中的一个后台网站/脚本，它是与当前浏览页面无关的。

实际上这部分内容的配置情况也会写在 `manifest` 里，对应的是 `background` 配置项。

#### page

这个后台网站的主页，在这个主页中，有引用的脚本，其中一般都会有一个专门来管理插件各种交互以及监听浏览器行为的脚本，一般都起名为 `background.js`。这个主页，不一定要求有。

#### scripts

`page` 的 `html` 在没有的情况下，那么脚本就需要通过这个属性引入了；
如果在存在 `page` 的情况下，一般在这里引入的脚本是专门为插件服务的脚本，而那些第三方脚本如 `jquery` 还是在 `page` 里引用比较好

#### persistent

后台脚本，在 `chrome` 扩展中又分为两类，分别运行于后台页面（ `background page` ）和事件页面（ `event page` ）中。

前者（后台页面）持续运行，生存周期和浏览器相同，即从打开浏览器到关闭浏览器期间，后台脚本一直在运行，一直占据着内存等系统资源， `persistent` 设为 `true` ；

后者（事件页面）只在需要活动时活动，在完全不活动的状态持续几秒后，`chrome` 将会终止其运行，从而释放其占据的系统资源，而在再次有事件需要后台脚本来处理时，重新载入它，`persistent` 设为 `false` 。

保持后台脚本持久活动的唯一场合是扩展使用 `chrome.webRequest API` 来阻止或修改网络请求。
`webRequest API` 与非持久性后台页面不兼容。

### content script

插入到网页中的脚本。它具有独立而富有包容性。

独立，指它的工作空间，命名空间，域等是独立的，不会说跟插入到的页面的某些函数和变量发生冲突；

包容性，指插件把自己的一些脚本（ `content script` ）插入到符合条件的页面里，作为页面的脚本，因此与插入的页面共享 `dom` 的，即用 `dom` 操作是针对插入的网页的，在这些脚本里使用的 `window` 对象跟插入页面的 `window` 是一样的。主要用在消息传递上（使用 `postMessage` 和 `onmessage` ）

#### js

要插入到页面里的脚本。

#### matches

必需。匹配规则组成的数组，用来匹配页面 `url` 的，符合条件的页面将会插入 `js` 的脚本。当然，有可以匹配的自然会有不匹配的—— `exclude_matches` 。

匹配规则：

[developer.chrome.com/extensions/…](https://developer.chrome.com/extensions/match_patterns)

#### run_at

这三个配置项来控制 `js` 配置项里的脚本插入页面的时机。

- document_start
- document_end
- document_idle（默认）

**document_start：**

`style` 样式加载好，`dom` 渲染完成和脚本执行前

**document_end：**

`dom` 渲染完成后，即 `DOMContentLoaded` 后马上执行

**document_idle：**

在 `DOMContentLoaded` 和 `window load` 之间，具体是什么时刻，要视页面的复杂程度和加载时间，并针对页面加载速度进行了优化。

### popup

在 `manifest` 里的 `browser_action` 与 `page_action` 配置项里设置的

## 通信机制

### `content script` 与 `background` 的通信通信机制

#### `content-script` 向 `background` 发送消息

**在 content-script 端：**

```js
chrome.runtime.sendMessege(
    message,
    function(response) {…}
)
```

就能向 `background` 发送消息了，第一个参数 `message` 为发送的消息（基础数据类型），回调函数里的第一个参数为 `background` 接收消息后返回的消息（如有）

**在 background 端：**

```js
chrome.runtime.onMessege.addListener(
    function(request, sender, sendResponse) {…}
)
```

进行监听发来的消息，`request` 表示发来的消息，`sendResponse` 是一个函数，用于对发来的消息进行回应，
如: sendResponse('我已收到你的消息：'+ JSON.stringify(request));

默认情况下 `sendResponse` 函数的执行是同步的，如果在这个监听消息的处理函数的同步执行流程里没有发现 `sendResponse` ，则默认返回 `undefined`

异步执行 `sendResponse` 时，我们在这个监听函数里的添加 `return true` 就能实现了。
由于 `background` 监听所有页面上的 `content script` 上发来的消息，如果多个页面同时发送同种消息，`background` 的 `onMessage` 只会处理最先收到的那个。

#### `background` 向 `content-script` 发送消息

一个插件里只有一个 `background` 环境，而 `content-script` 有多个（一个页面一个），那么 `background` 怎么向特定的 `content-script` 发送消息？

**在 background 端：**

一般一个页面一份 `content scripts`，而一个页面对应一个浏览器 `tab` ，每个 `tab` 都有自己的 `tabId` ，因此首先要获取要发送消息的 `tab` 对应的 `tabId`

```js
/**
 * 获取当前选项卡id
 * @param callback - 获取到id后要执行的回调函数
 */
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (callback) {
      callback(tabs.length ? tabs[0].id : null);
    }
  });
}
```

当知道了 `tabId` 后，就使用该 `api` 进行发送消息

```js
chrome.tabs.sendMessage(tabId, message, function(response) {...});
```

`message` 为发送的消息，回调函数的 `response` 为 `content scripts` 接收到消息后的回传消息

**在 content-script 端：**

```js
chrome.runtime.onMessege.addListener(function(request, sender, sendResponse) {…})
```

进行来自 `background` 发来消息的监听并回传

### `popup` 与 `background` 的通信

`popup` 与 `background` 的交流，常见于 `popup` 要获取 `background` 里的某些“东西”

使用上述的 `chrome.runtime.sendMessage` 和 `chrome.runtime.onMessage` 的方式进行 `popup` 向 `background` 的交流，但是其实有更方便快捷的方式：

```js
var bg = chrome.extension.getBackgroundPage();
bg.someMethod(); //someMethod()是background中的一个方法
```

### `popup` 与 `content script` 的通信

跟 background 与 content script 的方式是一样的

### 插件 `iframe` 网站与插入网页的通信

`ifame` 与父窗体的通信

同域的情况下，可以通过 `DOM` 操作达到通信的目的，如获取 `dom` 元素，获取值赋值之类的。

在父窗体里，用 `window.contentWindow` 获取到 `iframe` 的 `window` 对象

在 `iframe` 里，用 `window.parent` 获取到父窗体的 `window` 对象

在跨域下，插件，最方便的就是使用 `js` 的 `message` 机制了：使用 `window` 对象的 `postMessage()` 和 `onmessage` 。

#### `iframe` 向父窗体发送消息

**在 iframe 端：**

`iframe` 是 `HTML` 中的一个标签，全称为"`inline frame`"，意为内联框架。它可以在网页中嵌入其他网页或文档，并以框架的形式显示。通过使用 `iframe` 标签，可以在一个网页中显示多个不同的网页或文档，将不同的内容组合在一起展示。可以使用 `iframe` 来嵌入其他网站的内容、展示地图、播放视频等。

假设 `iframe` 类名为 `extension-iframe`，这里设置类名而不是 `id` 名的初衷是，我们不能保证设置的名称原本的网站会不会已经存在，设置类名能共存。
发送消息使用 `window.parent.postMessage(message, '*');` 其中 `message` 为发送的消息

**在父窗体端：**

由于一个页面，可能有来自页面本身的 `postMessage` 来的消息，也有可能来自该页面其他 `chrome extension` 发送来的消息，因此用 `onmessage` 来监听，要做好区分来源

```js
window.addEventListener(
  "message",
  function (event, a, b) {
    // 如果没消息就退出
    if (!event.data) {
      return;
    }
    var iframes = document.getElementsByClassName("extension-iframe");
    var extensionIframe = null; // 存插件iframe节点对象
    var correctSource = false; // 是否来源正确
    // 找出真正的插件生成的iframe
    for (var i = 0; i < iframes.length; i++) {
      if (
        iframes[i].contentWindow &&
        event.source === iframes[i].contentWindow
      ) {
        correctSource = true;
        extensionIframe = iframes[i];
        break;
      }
    }
    // 如果来源不是来自插件的，就退出
    if (!correctSource) {
      return;
    }
  },
  false
);
```

#### 父窗体向 `iframe` 发送消息

**在父窗体端：**

使用 `extensionIframe.contentWindow.postMessage(message, '*');`

其中 `extensionIframe` 为插件的 `iframe` 节点对象，`message` 为发送的消息

```js
{from: 'content-script', other: xxx}
```

**在 iframe 端：**

```js
window.addEventListener('message', function (event, a, b) {
    let result = event.data;
    if (result && (result.from === 'content-script') && (event.source === window.parent)) {...}
});
```

在发送消息里增加了个 `from` 属性，进而进一步判断是不是来自父窗体自己插件的 `content script`

## 插件内容发送 ajax 请求

`chrome extension` 为了保证自己的优越性，允许在自己的程序里面，实现跨域请求

插件要实现一些 `ajax` 请求，需要在 `background` 里实现

`ifame` 网站嵌入到别人页面的 `chrome extension`

### 在插件生成的 `iframe` 网站里

在这个插件网站中，有一些按钮操作本身是要触发某些 ajax 请求的，由于不能直接在插件网站里发请求，而是先向父窗口发送消息，利用 `postMessage`

```js
window.parent.postMessage(
  {
    from: "extension-iframe",
    type: "loadTable",
    data: {
      pageIndex: 1,
      pageSize: 10,
      sortProp: "",
      sortOrder: 0,
    },
  },
  "*"
);
```

`window.parent.postMessage` 是为了解决 `iframe` 跨域通信问题

| 属性名 |                          描述                           |
| :----: | :-----------------------------------------------------: |
|  from  |                  标记这条消息来自哪里                   |
|  type  | 操作的名称，如发送该 message 的操作的目的是为了加载表格 |
|  data  |                     发送请求的 data                     |

### 在插件的 `content script` 里

监听发来的消息

```js
window.addEventListener(
  "message",
  function (event, a, b) {
    var responseData = event.data;
    if (!event.data) {
      return;
    }
    // 来自插件内嵌网站的消息
    if (responseData.from === "extension-iframe") {
      // ① 判断是否自己插件的iframe 区分来源
      var iframes = document.getElementsByClassName("extension-iframe");
      var extensionIframe = null;
      var correctSource = false;
      for (var i = 0; i < iframes.length; i++) {
        if (
          iframes[i].contentWindow &&
          event.source === iframes[i].contentWindow
        ) {
          correctSource = true;
          extensionIframe = iframes[i];
          break;
        }
      }
      if (!correctSource) {
        return;
      }
      // ② 加载表格、提交信息等请求操作
      // 该数组为iframe传来各个操作的名称，对应发来的消息的type属性
      var operators = ["loadTable", "submit", "getNonMarkedCount", "getUrl"];
      // 如果跟操作匹配上了，就转发给background
      if (operators.indexOf(responseData.type) !== -1) {
        chrome.runtime.sendMessage(
          {
            type: responseData.type,
            data: responseData.data,
          },
          function (response) {
            // 返回请求后的数据给iframe网站
            extensionIframe.contentWindow.postMessage(
              {
                from: "extension-content-script",
                type: responseData.type,
                response: response,
              },
              "*"
            );
          }
        );
      }
    }
  },
  false
);
```

### 在插件的 `background script` 里

监听刚转发过来的消息

```js
// 这是所有请求组成对象
var httpService = {
    loadTable: function (config) {
        return eodHttp.get('/brandimageservice/perspective/mark', config);
    },
    submit: function (config) {
        return eodHttp.post('/brandimageservice/perspective/mark', config);
    },
    ...
};

// 监听刚转发过来的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // 该数组为iframe传来各个操作的名称，对应发来的消息的type属性
    var operators = ['loadTable', 'submit', 'getNonMarkedCount', 'getUrl'];
    if (operators.indexOf(request.type) !== -1) {
        // 这里的type刚好与请求的属性名一致
        httpService[request.type](request.data).then(res => {
            // 把请求的结果回传给content script
            sendResponse(res);
        }).catch(e => {
            // 这里做了请求拦截，如果不是canceled的请求报错，则把报错信息也回传给content script
            (e.status !== -1) && (sendResponse(e.data));
        });
    }
    // 此处return true是为了把sendResponse作为异步处理。
    return true;
});
```

### 再返回到插件生成的 `iframe` 网站里

绕回到这个 `ifame` 里，最终的请求的数据还是会流回这里。

```js
 window.addEventListener('message', function (event, a, b) {
    let result = event.data;
    if (result && (result.from === 'extension-content-script') && (event.source === window.parent)) {
        // 以下为请求返回内容
        let res = result.response;
        // 加载表格数据
        if (result.type === 'loadTable') {...}
    }
});
```

整个流程是 **iframe** -> **content script** -> **background** -> **content script** -> **iframe**

以 `background` 为中分线，前半截为发送请求，后半截为获取请求数据。

## 检测 `chrome extension` 是否已经安装

有一些 `chrome extension`，可能不是通过点击浏览器工具栏上的插件图标来激活插件，可能是通过点击网站上某个按钮来激活插件，需要检测浏览器是否安装了要求的 `chrome extension` ，如果没有进行提示。

## 扩展之间很容易相互影响

传递消息机制，容易受到牵连

## 代码调试

`content script` 的调试：F12 -> source -> page

<!-- ![示例](/images/chrome.png) -->
<img :src="$withBase('/images/chrome.png')" alt=''>

`backgroud script` 的调试：`chrome://extensions` 找到对应的扩展，点击背景视图，可以看到 `backgroud script` 进行调试，还能在控制台调用 `chrome api` ，请求也可以看到。

## 信息传递的异步性

考虑 `content script` 的插入时机是否对通信产生一定影响
