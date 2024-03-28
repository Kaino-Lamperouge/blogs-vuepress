# 报错

## npm报错

### 降 `node` 版本

Error: error:0308010C:digital envelope routines::unsupported

报错原因：
`node V17` 中的 `OpenSSL3.0` 对允许算法和密钥大小增加了严格的限制，可能会对生态系统造成一些影响。

在 `node V17` 以前一些可以正常运行的的应用程序，但是在 `V17` 版本可能会抛出以下异常:

<!-- ![示例](/images/npm报错.png) -->
<img :src="$withBase('/images/npm报错.png')" alt=''>

#### `nvm` 切换 `node` 版本无效问题

<!-- ![示例](/images/node切换失效.png) -->
<img :src="$withBase('/images/node切换失效.png')" alt=''>

原因：当前使用的 `node` 不受 `nvm` 管控，应该是在安装 `nvm` 之前就安装了的。

解决办法：删除当前的 `node`

<!-- ![示例](/images/node切换解决.png) -->
<img :src="$withBase('/images/node切换解决.png')" alt=''>

```bash
nvm -v //查看版本号
nvm ls available //查看可用的 node.js 版本号
nvm install node版本号 //安装
nvm use node版本号 //使用
node -v //显示 node.js 版本号
npm -v //显示 npm 版本号
nvm ls //查看你安装的所有 node.js 版本号，以及你当前所选择的 node.js 运行版本
nvm uninstall node版本号 //删除某 node.js 版本
```

`npm` ：无法加载文件 `C:\Program Files\nodejs\npm.ps1`

报错原因：在此系统上禁止运行脚本

解决办法：管理员身份打开 `PowerShell`
输入命令

```bash
set-executionpolicy remotesigned
选择 A
```

## `git` 报错

fatal: unable to access ‘<https://github.com/…>’:

OpenSSL SSL_read: Connection was reset, errno 10054

报错原因：服务器的SSL证书没有经过第三方机构的签署

解决办法：

```bash
git config --global --unset http.proxy 
git config --global --unset https.proxy

解决方案：cmd 下命令执行 ipconfig/flushdns
清理 dns 缓存
```
