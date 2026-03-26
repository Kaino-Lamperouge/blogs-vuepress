import { defineUserConfig } from 'vuepress';
import { defaultTheme } from '@vuepress/theme-default';
import { webpackBundler } from '@vuepress/bundler-webpack';

export default defineUserConfig({
  // 站点配置
  title: "Kaino·Lamperouge",
  // description: "This is a blog.",
  base: "/blogs/",
  
  // 构建配置
  bundler: webpackBundler(),
  
  // 主题配置
  theme: defaultTheme({
    // 导航栏
    navbar: [
      { text: "Home", link: "/" },
      {
        text: "CSS",
        children: [
          { text: "animation", link: "/css/animation.md" },
          { text: "Image", link: "/css/image.md" },
          { text: "@keyframes", link: "/css/keyframes.md" },
          { text: "Opacity", link: "/css/opacity.md" },
          { text: "Style", link: "/css/style.md" },
          { text: "文本控制属性", link: "/css/text.md" },
          { text: "Triangle", link: "/css/triangle.md" },
        ],
      },
      {
        text: "JavaScript",
        children: [
          { text: "浅拷贝深拷贝", link: "/javascript/copy.md" },
          { text: "更改鼠标指针", link: "/javascript/cursor.md" },
          { text: "事件流", link: "/javascript/event.md" },
          { text: "Export", link: "/javascript/export.md" },
          { text: "Grammar", link: "/javascript/grammar.md" },
          { text: "Object", link: "/javascript/object.md" },
          { text: "Void", link: "/javascript/void.md" },
        ],
      },
      {
        text: "Canvas",
        children: [
          { text: "Canvas", link: "/canvas/Canvas.md" },
          { text: "GLSL", link: "/canvas/OpenGL.md" },
          { text: "Three.js", link: "/canvas/Three.js.md" },
          { text: "WebGL", link: "/canvas/WebGL.md" },
          { text: "WebGLProgram", link: "/canvas/WebGLProgram.md" },
        ],
      },
      {
        text: "Chrome",
        children: [{ text: "扩展", link: "/chrome/Extension.md" }],
      },
      {
        text: "uni-app",
        children: [
          { text: "引用", link: "/uniapp/import.md" },
          { text: "CSS 变量", link: "/uniapp/CSS.md" },
          { text: "事件修饰符", link: "/uniapp/modifier.md" },
          { text: "组件", link: "/uniapp/component.md" },
        ],
      },
      {
        text: "Python",
        children: [{ text: "下划线", link: "/python/Underline.md" }],
      },
      {
        text: "MiniProject",
        children: [
          { text: "计时器", link: "/miniproject/Timer.md" },
          { text: "demo", link: "/miniproject/Demo.md" },
          { text: "批量删除", link: "/miniproject/Batch.md" },
        ],
      },
      { text: "About", link: "/about/" },
    ],
    
    // 侧边栏配置 - VuePress 2.x 使用对象格式
    sidebar: {
      '/tools/': [
        {
          text: 'Tools',
          collapsible: true,
          children: [
            { text: 'B端C端', link: '/tools/Business Consumer.md' },
            { text: '闭包', link: '/tools/closure.md' },
            { text: 'Css预处理器', link: '/tools/css preprocessor.md' },
            { text: '防抖和节流', link: '/tools/debounce throttle.md' },
            { text: '断点调试', link: '/tools/debugger.md' },
            { text: '钩子函数', link: '/tools/hook.md' },
            { text: '低代码', link: '/tools/Low Code.md' },
            { text: 'md语法', link: '/tools/markdown.md' },
            { text: '内存泄漏', link: '/tools/Memory Leak.md' },
            { text: 'MVC', link: '/tools/MVC.md' },
            { text: 'MVVM', link: '/tools/MVVM.md' },
            { text: 'NPM', link: '/tools/npm.md' },
            { text: 'NVM', link: '/tools/nvm.md' },
            { text: '优化', link: '/tools/optimize.md' },
            { text: 'Promise', link: '/tools/promise.md' },
            { text: '报错', link: '/tools/report errors.md' },
            { text: 'Shell', link: '/tools/shell.md' },
            { text: 'SSH', link: '/tools/ssh.md' },
            { text: '时间戳', link: '/tools/timestamp.md' },
            { text: 'URL编码', link: '/tools/URL Code.md' },
            { text: 'URL携带参数缺失', link: '/tools/URL Transfer Parameters.md' },
            { text: 'UUID', link: '/tools/uuid.md' },
          ].map(item => ({
            text: item.text,
            link: item.link.replace('.md', '')
          }))
        }
      ],
      
      // 为其他路径自动生成侧边栏
      '/css/': 'auto',
      '/javascript/': 'auto',
      '/canvas/': 'auto',
      '/chrome/': 'auto',
      '/uniapp/': 'auto',
      '/python/': 'auto',
      '/miniproject/': 'auto',
      
      // 回退侧边栏
      '/': 'auto'
    },
    
    // 搜索配置
    search: true,
    searchMaxSuggestions: 10,
  }),
  
  // 插件配置
  plugins: [
    // 你可以添加其他插件
  ],
  
  // 其他配置
  shouldPrefetch: false,
});