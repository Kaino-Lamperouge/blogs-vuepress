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
import { existsSync, writeFileSync } from 'node:fs';
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
