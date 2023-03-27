const { getMdByDir } = require("./utils");

module.exports = {
  title: "zhoumuchen",
  // description: "This is a blog.",
  base: '/blogs/',
  serviceWorker: true, // 阅读缓存进程
  theme: '@vuepress/theme-default',
  themeConfig: {
    navbar: [
      { text: 'Home', link: '/' },
      {
        text: 'Tools',
        // children: getMdByDir("tools/", "tools")
        children: [
          "/tools/JavaScript/export.md",
          "/tools/JavaScript/object.md",
          "/tools/报错.md",
          "/tools/闭包.md",
          "/tools/节流防抖.md",
          "/tools/内存泄漏.md",
          "/tools/优化.md",
          "/tools/B端C端.md",
          "/tools/git.md",
          "/tools/markdown.md",
          "/tools/npm.md",
          "/tools/promise.md",
          "/tools/shell.md",
          "/tools/timestamp.md",
          "/tools/URL编码.md",
          "/tools/uuid.md",
        ]
        // children: [
        //   // {
        //   //     text: "Markdown",
        //   //   //   chilren: getMdByDir("tools/markdown", "tools/markdown")
        //   //     children: ["/tools/markdown/markdown_grammar.md"]
        //   // }
        //   {
        //     text: "Markdown",
        //     // link: "/tools/markdown_grammar.html"
        //     children: ["/tools/markdown_grammar.md"]
        //   },
        //   {
        //     text: "Shell",
        //     // link: "/tools/shell_introduce.html"
        //     children: ["/tools/shell_introduce.md"]
        //   }
        // ]
      },
      { text: 'About', link: '/about/' },
    ],
    sidebar: {
      '/tools/': [
        {
          text: "Tools",
          collapsible: true,
          // children: getMdByDir("tools/", "tools")
          children: [
            "/tools/JavaScript/export.md",
            "/tools/JavaScript/object.md",
            "/tools/报错.md",
            "/tools/闭包.md",
            "/tools/节流防抖.md",
            "/tools/内存泄漏.md",
            "/tools/优化.md",
            "/tools/B端C端.md",
            "/tools/git.md",
            "/tools/markdown.md",
            "/tools/npm.md",
            "/tools/promise.md",
            "/tools/shell.md",
            "/tools/timestamp.md",
            "/tools/URL编码.md",
            "/tools/uuid.md",
          ]
        }
      ],
    },
    search: true,
    searchMaxSuggestions: 10
  }
}