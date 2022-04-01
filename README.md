# Hello VuePress

- https://vuepress.github.io/

## 手动安装

### Step 1: Create and change into a new directory

```bash
mkdir vuepress-starter
cd vuepress-starter
```
### Step 2: Initialize your project

```bash
git init
npm init
```
### Step 3: Install VuePress locally

```bash
npm install -D vuepress@next
```
### Step 4: Add some scripts to package.json

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "deploy-gh": "GH=1 npm run docs:build && bash scripts/deploy-gh.sh"
  }
}
```
### Step 5: Add the default temp and cache directory to .gitignore file

```bash
echo 'node_modules' >> .gitignore
echo '.temp' >> .gitignore
echo '.cache' >> .gitignore
```

### Step 6: Create your first document

```bash
mkdir docs

echo '# Hello VuePress' > docs/README.md
```
### Step 7: Serve the documentation site in the local server

```bash
npm run docs:dev
```

## 配置 GitHub Pages

###  在 docs/.vuepress/config.js 中配置正确的 base

```js
module.exports = {
  title: "My Blog",
  description: "This is a blog.",
  base: '/blog/' 
}
```

### 新建脚本 my-vuepress/scripts/deploy-gh.sh

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 把上面的 <USERNAME> 换成你自己的 Github 用户名，<REPO> 换成仓库名，比如我这里就是：
git push -f git@github.com:muchen6/blogs.git master:gh-pages

cd -
```

### 执行脚本进行部署

```
yarn deploy-gh # 或者：npm run deploy-gh
```

### 返回 Git 仓库，点击 settings：

github-pages click

