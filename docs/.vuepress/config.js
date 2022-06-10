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
      {
        text: '金晨',
        children: [
          "/chen/film.md",
          "/chen/flight.md",
          "/chen/stage.md",
          "/chen/TV play.md",
          "/chen/variety.md",
        ]
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
          ]
        }
      ],
      '/chen/': [
        {
          text: "金晨",
          collapsible: true,
          // children: getMdByDir("tools/", "tools")
          children: [
            "/chen/film.md",
            "/chen/flight.md",
            "/chen/saying.md",
            "/chen/stage.md",
            "/chen/TV play.md",
            "/chen/variety.md",
          ]
        }
      ]
    },
    search: true,
    searchMaxSuggestions: 10
  }
}