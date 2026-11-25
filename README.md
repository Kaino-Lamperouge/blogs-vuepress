# blogs-vuepress

前端笔记站点。VuePress 2（rspack bundler）+ 默认主题，构建产物发布到 GitHub Pages。

- 线上地址：<https://kaino-lamperouge.github.io/blogs/>
- 发布分支：`gh-pages`

## 环境要求

- Node.js >= 22.22.0
- npm（仓库内提交了 `package-lock.json`，用 npm 安装依赖）

## 常用命令

```bash
npm install                      # 安装依赖
npm run docs:dev                 # 本地开发 http://localhost:8080/blogs/
npm run docs:build               # 只构建，产物在 docs/.vuepress/dist
npm run deploy-gh                # 构建并发布
npm run deploy-gh -- --dry-run   # 只构建 + 本地提交，不推送
```

`docs:dev` 和 `docs:build` 都带 `base: /blogs/`，本地预览也要访问 `/blogs/` 路径。

## 部署

`npm run deploy-gh` 会依次完成：构建 → 写入 `.nojekyll` / `.gitattributes` → 在 `docs/.vuepress/dist` 内初始化 `gh-pages` 分支 → 提交 → 强推。

默认目标是 `git@github.com:Kaino-Lamperouge/blogs.git` 的 `gh-pages`，可以在运行时覆盖：

```bash
DEPLOY_REMOTE=git@github.com:<user>/<repo>.git npm run deploy-gh
DEPLOY_BRANCH=pages npm run deploy-gh
```

注意两点：

- VuePress 每次构建都会清空 `dist`，所以脚本每次重新建仓并强推，不会残留旧文件；
- `base: /blogs/` 必须和目标仓库名对应。如果换仓库或换域名，先改 `docs/.vuepress/config.js` 里的 `base`，否则静态资源全部 404。

### 自动部署（GitHub Actions）

`.github/workflows/deploy.yml` 在推送 `master` / `main` 后自动构建，并用 `peaceiris/actions-gh-pages` 把产物推到 `Kaino-Lamperouge/blogs` 的 `gh-pages` 分支。

启用前需要在 `blogs-vuepress` 仓库的 **Settings → Secrets and variables → Actions** 添加一个 secret：

- 名称：`GH_PAGES_TOKEN`
- 值：有 `blogs` 仓库 `contents: write` 权限的 fine-grained PAT（或 classic token 的 `repo` 权限）

没有这个 secret 时工作流会因为无权限推送而失败，本地 `npm run deploy-gh` 仍然可用。若把 Pages 的来源改成 “GitHub Actions” 而不是 `gh-pages` 分支，则要换成 `actions/deploy-pages` 方案，两者不要混用。

## 目录结构

```text
docs/                       # 所有内容
├── .vuepress/
│   ├── config.js           # 站点、导航、侧边栏、搜索与 SEO 配置
│   ├── public/             # 静态资源（图片、旧链接跳转页）
│   ├── styles/             # 自定义样式（图片圆角、卡片悬停等）
│   └── utils/              # 未接入的工具函数
├── CSS/  JavaScript/       # 注意目录名大小写
├── canvas/  chrome/  tools/
└── README.md               # 首页
scripts/deploy-gh.mjs       # 部署脚本（scripts/deploy-gh.sh 为兼容包装）
.github/workflows/          # GitHub Actions 自动部署
```

## 写作约定

- 配置里的页面链接写 `.html`（如 `/CSS/animation.html`），不要写 `.md`，也不要省扩展名；
- 文件名用 kebab-case（`memory-leak.md`、`url-code.md`），不要带空格或点号；改文件名后要在 `public/` 下留一个跳转页，旧链接才不会 404；
- 目录名和文件名区分大小写，GitHub Pages 运行在 Linux 上，Windows 本地能访问不代表线上能访问；
- 每篇保持一个 H1，标题层级最深到 H3（`outline` 只显示 H2–H3）；
- 图片放在 `docs/.vuepress/public/images/`，优先用 WebP，Markdown 语法 `![说明](/images/xxx.webp)` 引用，VuePress 会自动补上 `base`。
