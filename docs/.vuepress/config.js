/*
 * @Author: muchen0905 1832612650@qq.com
 * @Date: 2026-03-22 19:41:40
 * @LastEditors: muchen0905 1832612650@qq.com
 * @LastEditTime: 2026-03-22 20:25:29
 * @FilePath: \blogs-vuepress\docs\.vuepress\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { getMdByDir } = require("./utils");
module.exports = {
  title: "Kaino·Lamperouge",
  // description: "This is a blog.",
  base: '/blogs/',
  serviceWorker: true, // 阅读缓存进程
  theme: '@vuepress/theme-default',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
            {
        text: 'CSS', items: [
          { text: 'animation', link: '/css/animation.md' },
          { text: 'Image', link: '/css/image.md' },
          { text: '@keyframes', link: '/css/keyframes.md' },
          { text: 'Opacity', link: '/css/opacity.md' },
          { title: "Style", path: "/css/style.md" },
          { text: '文本控制属性', link: '/css/text.md' },
          { title: "Triangle", path: "/css/triangle.md" },
        ]
      },
      {
        text: 'JavaScript', items: [
          { title: "浅拷贝深拷贝", path: "/JavaScript/copy.md" },
          { title: "更改鼠标指针", path: "/JavaScript/cursor.md" },
          { title: "事件流", path: "/JavaScript/event.md" },
          { title: "Export", path: "/JavaScript/export.md" },
          { title: "Grammar", path: "/JavaScript/grammar.md" },
          { title: "Object", path: "/JavaScript/object.md" },
          { title: "Void", path: "/JavaScript/void.md" },
        ]
      },
      {
        text: 'Canvas', items: [
          { text: 'Canvas', link: '/canvas/Canvas.md' },
          { text: 'GLSL', link: '/canvas/OpenGL.md' },
          { text: 'Three.js', link: '/canvas/Three.js.md' },
          { text: 'WebGL', link: '/canvas/WebGL.md' },
          { text: 'WebGLProgram', link: '/canvas/WebGLProgram.md' },
        ]
      },
      {
        text: 'Chrome', items: [
          { text: '扩展', link: '/chrome/Extension.md' },
        ]
      },
      {
        text: 'uni-app', items: [
          { text: '引用', link: '/uniapp/import.md' },
          { text: 'CSS 变量', link: '/uniapp/CSS.md' },
          { text: '事件修饰符', link: '/uniapp/modifier.md' },
          { text: '组件', link: '/uniapp/component.md' },
        ]
      },
      {
        text: 'Python', items: [
          { text: '下划线', link: '/python/Underline.md' },
        ]
      },
      {
        text: 'MiniProject', items: [
          { text: '计时器', link: '/miniproject/Timer.md' },
          { text: 'demo', link: '/miniproject/Demo.md' },
          { text: '批量删除', link: '/miniproject/Batch.md' },
        ]
      },
      { text: 'About', link: '' },
    ],
    sidebar: [
      {
        title: "Tools",
        path: '/', // 默认激活的选项
        collapsable: false, // 不折叠
        children: [
          { title: "B端C端", path: "/tools/Business Consumer.md" },
          { title: "闭包", path: "/tools/closure.md" },
          { title: "Css预处理器", path: "/tools/css preprocessor.md" },
          { title: "防抖和节流", path: "/tools/debounce throttle.md" },
          { title: "断点调试", path: "/tools/debugger.md" },
          { title: "钩子函数", path: "/tools/hook.md" },
          { title: "低代码", path: "/tools/Low Code.md" },
          { title: "md语法", path: "/tools/markdown.md" },
          { title: "内存泄漏", path: "/tools/Memory Leak.md" },
          { title: "MVC", path: "/tools/MVC.md" },
          { title: "MVVM", path: "/tools/MVVM.md" },
          { title: "NPM", path: "/tools/npm.md" },
          { title: "NVM", path: "/tools/nvm.md" },
          { title: "优化", path: "/tools/optimize.md" },
          { title: "Promise", path: "/tools/promise.md" },
          { title: "报错", path: "/tools/report errors.md" },
          { title: "Shell", path: "/tools/shell.md" },
          { title: "SSH", path: "/tools/ssh.md" },
          { title: "时间戳", path: "/tools/timestamp.md" },
          { title: "URL编码", path: "/tools/URL Code.md" },
          { title: "URL携带参数缺失", path: "/tools/URL Transfer Parameters.md" },
          { title: "UUID", path: "/tools/uuid.md" },
        ],
      }
    ],
    search: true,
    searchMaxSuggestions: 10
  }
}