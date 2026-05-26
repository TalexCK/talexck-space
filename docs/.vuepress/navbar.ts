/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  {
    text: '文档',
    items: [
      {
        text: 'Minecraft 文档',
        items: [
          { text: '首页', link: '/docs/minecraft/',},
          { text: 'MiniGames', link: '/docs/minecraft/minigames/',},
          { text: '方块校园', link: '/docs/minecraft/school/',},
          { text: '生存服', link: '/docs/minecraft/survival/',},
          { text: 'Bingo 服务器', link: '/docs/minecraft/bingo/',},
          { text: 'GameVoting', link: '/docs/minecraft/gamevoting/',},
          { text: 'WorldGit', link: '/docs/minecraft/worldgit/',},
        ],
      },
    ]
  },
  { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/' },
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  { text: 'Blog', link: '/en/blog/' },
  { text: 'Tags', link: '/en/blog/tags/' },
  { text: 'Archives', link: '/en/blog/archives/' },
])
