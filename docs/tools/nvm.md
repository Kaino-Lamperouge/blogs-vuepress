# nvm

`nvm` （`node.js version management`），是一个 `nodejs` 的版本管理工具。用于管理和切换 `Node.js` 版本的工具，允许开发者在同一台机器上安装和使用多个版本的 `Node.js`

下载 `nvm` 包 [github](https://github.com/coreybutler/nvm-windows/releases)

安装 `nvm-setup.exe`

安装路径的文件夹名称不要出现中文，空格等

`nvm` 安装路径: `C:\Users\Administrator\AppData\Local\nvm`  -> `setting.txt` 文件 -> 文本覆盖

```bash
root: C:\Users\Administrator\AppData\Local\nvm      # nvm 安装路径
path: C:\nvm4w\nodejs                               # nodejs 路径
node_mirror: https://npmmirror.com/mirrors/node/    # node 下载镜像
npm_mirror: https://npmmirror.com/mirrors/npm/      # npm 下载镜像
```

`win+R` 调用 `cmd` 输入 `nvm`

管理员身份运行终端, 查询可使用版本号, `LST` 代表稳定版本

```bash
nvm list available
nvm install 20.13.1 
nvm use 20.13.1
node -v
npm -v
nvm list
nvm uninstall node版本号
```

换源
```bash
npm config set registry https://registry.npmmirror.com/
npm config get registry     # 检查是否设置成功
```
