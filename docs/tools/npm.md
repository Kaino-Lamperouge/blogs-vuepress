# NPM

`npm (Node Package Manager)` 意思是 `nodejs` 的包管理和分发工具，用于 `node` 插件管理(包括安装、卸载、管理依赖等)。

## npm 换源

`npm` 下载源在国外，严重影响下载速度。因此淘宝团队将 `npm` 下载源部署到了国内。

### 单命令换源

使用阿里定制的 `cnpm` 命令行工具代替默认的 `npm`

`cnpm` ：是一个完整 `npmjs.org` 镜像，可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

```bash
cnpm install
```

### 全局换源

```bash
npm config set registry https://registry.npm.taobao.org
npm config list
```

## npm

`npm` 安装各种包 分为 `全局安装` 和 `本地安装` ：

```bash
npm install <package>      # 本地安装
npm install <package> -g   # 全局安装
```

### 本地安装(安装到项目)

安装包放在 `./node_modules` 下

安装包详细信息放在 `package.json` 下

npm install：下载所有项目依赖包

- 若在项目过程中需要引入外包，`npm install <package>` 不会将包录入 `package.json` 中。而，`npm install <package> --save` 才会。

### 全局安装(安装到环境)

安装包放在 `$NODE_HOME/lib/node_modules` ，可以直接在命令行里使用。

安装 `vue-cli` ：`npm install vue-cli -g` ，安装完便可直接使用 `vue` 命令。

- 需要root权限，命令前面加 `sudo`

## 运行

## 编译

生成 `dist/` 目录，是项目编译后的静态文件
