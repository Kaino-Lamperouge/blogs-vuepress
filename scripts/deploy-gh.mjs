#!/usr/bin/env node
/**
 * 构建并发布到 GitHub Pages（gh-pages 分支）。
 *
 * 用法：
 *   npm run deploy-gh            构建 + 推送
 *   npm run deploy-gh -- --dry-run  只构建和本地提交，不推送
 *
 * 环境变量：
 *   DEPLOY_REMOTE  目标仓库（默认 git@github.com:Kaino-Lamperouge/blogs.git）
 *   DEPLOY_BRANCH  目标分支（默认 gh-pages）
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'docs/.vuepress/dist');
const remote = process.env.DEPLOY_REMOTE || 'git@github.com:Kaino-Lamperouge/blogs.git';
const branch = process.env.DEPLOY_BRANCH || 'gh-pages';
const dryRun = process.argv.includes('--dry-run');

const git = (args) => execFileSync('git', args, { cwd: root, stdio: 'inherit' });
const vuepressBin = resolve(root, 'node_modules/vuepress/bin/vuepress.js');

console.log(`\n▸ 构建站点 → ${dist}`);
execFileSync(process.execPath, [vuepressBin, 'build', 'docs'], { cwd: root, stdio: 'inherit' });

if (!existsSync(dist)) {
  console.error(`\n✗ 构建产物不存在：${dist}`);
  process.exit(1);
}

// 阻止 GitHub Pages 走 Jekyll 处理，并避免 Windows 换行归一化噪音
writeFileSync(resolve(dist, '.nojekyll'), '');
writeFileSync(resolve(dist, '.gitattributes'), '* -text\n');

// gh-pages 分支自带一个 Actions 部署工作流：
// 仓库 Pages 的 Source 设为 GitHub Actions 后，每次推送由它直接 deploy-pages，
// 不再走“分支构建”的每小时次数限制。
mkdirSync(resolve(dist, '.github/workflows'), { recursive: true });
writeFileSync(
  resolve(dist, '.github/workflows/deploy-pages.yml'),
  [
    'name: Deploy Pages',
    '',
    'on:',
    '  push:',
    '    branches: [gh-pages]',
    '  workflow_dispatch:',
    '',
    'permissions:',
    '  contents: read',
    '  pages: write',
    '  id-token: write',
    '',
    'concurrency:',
    '  group: pages',
    '  cancel-in-progress: true',
    '',
    'jobs:',
    '  deploy:',
    '    runs-on: ubuntu-latest',
    '    environment:',
    '      name: github-pages',
    '      url: ${{ steps.deployment.outputs.page_url }}',
    '    steps:',
    '      - uses: actions/checkout@v4',
    '      - uses: actions/upload-pages-artifact@v3',
    '        with:',
    "          path: '.'",
    '      - id: deployment',
    '        uses: actions/deploy-pages@v4',
    '',
  ].join('\n'),
);

console.log(`\n▸ 整理 ${branch} 分支内容（VuePress 每次构建会清空 dist，这里重新建仓）`);
git(['-C', dist, 'init', '-q']);
git(['-C', dist, 'checkout', '-B', branch]);
git(['-C', dist, 'add', '-A']);

const message = `deploy: ${new Date().toLocaleString('zh-CN', { hour12: false })}`;
try {
  git(['-C', dist, 'commit', '-q', '-m', message]);
} catch {
  console.log('  内容没有变化，跳过本次提交');
}

if (dryRun) {
  console.log(`\n▸ dry-run：跳过推送（目标 ${remote} ${branch}）`);
  process.exit(0);
}

console.log(`\n▸ 推送到 ${remote} (${branch})`);
git(['-C', dist, 'push', '-f', remote, `${branch}:${branch}`]);

console.log('\n✓ 部署完成，GitHub Pages 大约 1-2 分钟后生效');
console.log('  https://kaino-lamperouge.github.io/blogs/');
