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
          "/tools/Business Consumer.md",
          "/tools/closure.md",
          "/tools/debounce throttle.md",
          "/tools/git.md",
          "/tools/Low Code.md",
          "/tools/markdown.md",
          "/tools/Memory leak.md",
          "/tools/npm.md",
          "/tools/optimize.md",
          "/tools/promise.md",
          "/tools/report errors.md",
          "/tools/shell.md",
          "/tools/timestamp.md",
          "/tools/URL Code.md",
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
            "/tools/Business Consumer.md",
            "/tools/closure.md",
            "/tools/debounce throttle.md",
            "/tools/git.md",
            "/tools/Low Code.md",
            "/tools/markdown.md",
            "/tools/Memory leak.md",
            "/tools/npm.md",
            "/tools/optimize.md",
            "/tools/promise.md",
            "/tools/report errors.md",
            "/tools/shell.md",
            "/tools/timestamp.md",
            "/tools/URL Code.md",
            "/tools/uuid.md",
          ]
        }
      ],
    },
    search: true,
    searchMaxSuggestions: 10
  }
}