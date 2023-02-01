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
          "/tools/markdown.md",
          "/tools/shell.md",
          "/tools/timestamp.md",
          "/tools/JavaScript/export.md",
          "/tools/JavaScript/object.md",
          "/tools/git.md",
          "/tools/npm.md",
          "/tools/优化.md",
          "/tools/URL编码.md",
          "/tools/Promise.md",
          "/tools/npm报错.md",
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
            "/tools/markdown.md",
            "/tools/shell.md",
            "/tools/timestamp.md",
            "/tools/JavaScript/export.md",
            "/tools/JavaScript/object.md",
            "/tools/git.md",
            "/tools/npm.md",
            "/tools/优化.md",
            "/tools/URL编码.md",
            "/tools/Promise.md",
            "/tools/npm报错.md",
          ]
        }
      ],
    },
    search: true,
    searchMaxSuggestions: 10
  }
}