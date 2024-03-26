# CSS

## 内置 CSS 变量

| CSS 变量            |          描述          |         App          | 小程序 |          H5          |
| ------------------- | :--------------------: | :------------------: | :----: | :------------------: |
| --status-bar-height |     系统状态栏高度     | 系统状态栏高度、nvue |  25px  |          0           |
| --window-top        | 内容区域距离顶部的距离 |          0           |   0    | NavigationBar 的高度 |
| --window-bottom     | 内容区域距离底部的距离 |          0           |   0    |    TabBar 的高度     |

- `var(--status-bar-height)` 此变量在微信小程序环境为固定 `25px`，在 `App` 里为手机实际状态栏高度。
- 当设置 `"navigationStyle":"custom"` 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。此时可以使用一个高度为 `var(--status-bar-height)` 的 `view` 放在页面顶部，避免页面内容出现在状态栏。
- 由于在 H5 端，不存在原生导航栏和 `tabbar`，也是前端 `div` 模拟。如果设置了一个固定位置的居底 `view`，在小程序和 `App` 端是在 `tabbar` 上方，但在 `H5` 端会与 `tabbar` 重叠。此时可使用 `--window-bottom` ，不管在哪个端，都是固定在 `tabbar` 上方。
- 目前 `nvue` 在 `App` 端，还不支持 `--status-bar-height` 变量，替代方案是在页面 `onLoad` 时通过 `uni.getSystemInfoSync().statusBarHeight` 获取状态栏高度，然后通过 `style` 绑定方式给占位 `view` 设定高度。

## 固定值

以下组件的高度是固定的，不可修改

| 组件          |    描述    |                                           App                                            |  H5  |
| ------------- | :--------: | :--------------------------------------------------------------------------------------: | :--: |
| NavigationBar |   导航栏   |                                           44px                                           | 44px |
| TabBar        | 底部选项卡 | HBuilderX 2.3.4 之前为 56px，2.3.4 起和 H5 调为一致，统一为 50px。（但可以自主更改高度） | 50px |
