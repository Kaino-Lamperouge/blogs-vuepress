const { getMdByDir } = require("./utils");

module.exports = {
  title: "muchen6",
  // description: "This is a blog.",
  base: '/blogs/',
  serviceWorker: true, // 阅读缓存进程
  theme: '@vuepress/theme-default',
  themeConfig: {
    navbar: [{
      text: 'Home',
      link: '/'
    },
    {
      text: 'Tools',
      // children: getMdByDir("tools/", "tools")
      children: ["/tools/markdown_grammar.md", "/tools/shell_introduce.md", "/tools/timestamp_introduce.md", "/tools/JavaScript/export.md", "/tools/JavaScript/object.md", "/tools/git.md",]
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
      text: 'About',
      link: '/about/'
    },
    ],
    sidebar: {
      '/tools/': [{
        text: "Tools",
        collapsible: true,
        // children: getMdByDir("tools/", "tools")
        children: ["/tools/markdown_grammar.md", "/tools/shell_introduce.md", "/tools/timestamp_introduce.md", "/tools/JavaScript/export.md", "/tools/JavaScript/object.md", "/tools/git.md"]
      }]
    },
    search: true,
    searchMaxSuggestions: 10
  }
}