import { defineUserConfig } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite';
import { themeDefault } from '@vuepress/theme-default';
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch';

const theme = themeDefault({
  // 导航栏
  nav: [
    { text: '首页', link: '/' },
    {
      text: 'CSS',
      items: [
        { text: 'animation', link: '/CSS/animation.html' },
        { text: 'Image', link: '/CSS/image.html' },
        { text: '@keyframes', link: '/CSS/keyframes.html' },
        { text: 'Opacity', link: '/CSS/opacity.html' },
        { text: 'Style', link: '/CSS/style.html' },
        { text: '文本控制属性', link: '/CSS/text.html' },
        { text: 'Triangle', link: '/CSS/triangle.html' },
      ],
    },
    {
      text: 'JavaScript',
      items: [
        { text: '浅拷贝深拷贝', link: '/JavaScript/copy.html' },
        { text: '更改鼠标指针', link: '/JavaScript/cursor.html' },
        { text: '事件流', link: '/JavaScript/event.html' },
        { text: 'Export', link: '/JavaScript/export.html' },
        { text: 'Grammar', link: '/JavaScript/grammar.html' },
        { text: 'Object', link: '/JavaScript/object.html' },
        { text: 'Void', link: '/JavaScript/void.html' },
      ],
    },
    {
      text: 'Canvas',
      items: [
        { text: 'Canvas', link: '/canvas/Canvas.html' },
        { text: 'GLSL', link: '/canvas/OpenGL.html' },
        { text: 'Three.js', link: '/canvas/threejs.html' },
        { text: 'WebGL', link: '/canvas/WebGL.html' },
        { text: 'WebGLProgram', link: '/canvas/WebGLProgram.html' },
      ],
    },
    { text: 'Chrome', link: '/chrome/Extension.html' },
    {
      text: 'uni-app',
      items: [
        { text: '引用', link: '/uniapp/import.html' },
        { text: 'CSS 变量', link: '/uniapp/CSS.html' },
        { text: '事件修饰符', link: '/uniapp/modifier.html' },
        { text: '组件', link: '/uniapp/component.html' },
      ],
    },
    { text: 'Python', link: '/python/Underline.html' },
    {
      text: 'MiniProject',
      items: [
        { text: '计时器', link: '/miniproject/Timer.html' },
        { text: 'demo', link: '/miniproject/Demo.html' },
        { text: '批量删除', link: '/miniproject/Batch.html' },
      ],
    },
    { text: 'About', link: '/about/' },
  ],

  // 侧边栏：/tools/ 用手工清单，其余页面用当前页大纲
  sidebar: {
    '/tools/': [
      {
        text: 'Tools',
        collapsed: false,
        items: [
          { text: 'B端C端', link: '/tools/business-consumer.html' },
          { text: '闭包', link: '/tools/closure.html' },
          { text: 'Css预处理器', link: '/tools/css-preprocessor.html' },
          { text: '防抖和节流', link: '/tools/debounce-throttle.html' },
          { text: '断点调试', link: '/tools/debugger.html' },
          { text: '钩子函数', link: '/tools/hook.html' },
          { text: '低代码', link: '/tools/low-code.html' },
          { text: 'md语法', link: '/tools/markdown.html' },
          { text: '内存泄漏', link: '/tools/memory-leak.html' },
          { text: 'MVC', link: '/tools/MVC.html' },
          { text: 'MVVM', link: '/tools/MVVM.html' },
          { text: 'NPM', link: '/tools/npm.html' },
          { text: 'NVM', link: '/tools/nvm.html' },
          { text: '优化', link: '/tools/optimize.html' },
          { text: 'Promise', link: '/tools/promise.html' },
          { text: '报错', link: '/tools/report-errors.html' },
          { text: 'Shell', link: '/tools/shell.html' },
          { text: 'SSH', link: '/tools/ssh.html' },
          { text: '时间戳', link: '/tools/timestamp.html' },
          { text: 'URL编码', link: '/tools/url-code.html' },
          { text: 'URL携带参数缺失', link: '/tools/url-transfer-parameters.html' },
          { text: 'UUID', link: '/tools/uuid.html' },
        ],
      },
    ],
    '/': 'heading',
  },

  // 页面大纲与元信息
  outline: { level: [2, 3], label: '本页目录' },
  appearance: true,
  hostname: 'https://kaino-lamperouge.github.io',
  lastUpdated: { text: '最后更新' },
  contributors: false,
  editLink: {
    pattern: 'https://github.com/Kaino-Lamperouge/blogs-vuepress/edit/master/docs/:path',
    text: '在 GitHub 编辑此页',
  },
  notFound: {
    title: '页面走丢了',
    quote: '链接可能已经失效，或者这篇笔记被挪了位置。',
    linkText: '回到首页',
  },
  footer: {
    message: '基于 VuePress 构建',
    copyright: 'Copyright © 2026 Kaino·Lamperouge',
  },
});

// 主题返回的绝对路径在 Windows 下是反斜杠，会被写成非法的 ESM 模块名，统一成正斜杠
theme.clientConfigFile = theme.clientConfigFile?.replaceAll('\\', '/');

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Kaino·Lamperouge',
  description: '前端笔记：CSS、JavaScript、Canvas / WebGL、uni-app 与工程实践',
  base: '/blogs/',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#1b1b1f', media: '(prefers-color-scheme: dark)' }],
  ],
  bundler: viteBundler({
    viteOptions: {
      ssr: {
        noExternal: ['@vuepress/search-helper'],
      },
    },
  }),
  theme,
  plugins: [
    // 全文搜索：索引正文，不只搜标题
    slimsearchPlugin({
      indexContent: true,
      suggestion: true,
      searchDelay: 150,
      locales: {
        '/': {
          placeholder: '搜索笔记全文',
        },
      },
      filter: (page) => page.path !== '/' && !page.path.startsWith('/misc/'),
    }),
  ],
  shouldPrefetch: false,
});
