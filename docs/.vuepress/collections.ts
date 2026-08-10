/**
 * @see https://theme-plume.vuejs.press/guide/collection/ 查看文档了解配置详情。
 *
 * Collections 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 *
 * 请注意，你应该先在这里配置好 Collections，然后再启动 vuepress，主题会在启动 vuepress 时，
 * 读取这里配置的 Collections，然后在与 Collection 相关的 Markdown 文件中，自动生成 permalink。
 *
 * collection 的  type 为 `post` 时，表示为 文档列表类型（即没有侧边导航栏，有文档列表页）
 * 可用于实现如 博客、专栏 等以文章列表聚合形式的文档集合 （内容相对碎片化的）
 *
 * collection 的 type 为 `doc` 时，表示为文档类型（即有侧边导航栏）
 * 可用于实现知识库、文档等以侧边导航栏形式的文档集合 （内容强关联、成体系的）
 * 如果发现 侧边栏没有显示，那么请检查你的配置是否正确，以及 Markdown 文件中的 permalink
 * 是否是以对应的 Collection 配置的 link 的前缀开头。 是否展示侧边栏是根据 页面链接 的前缀 与 `collection.link`
 * 的前缀是否匹配来决定。
 */

/**
 * 在受支持的 IDE 中会智能提示配置项。
 *
 * - `defineCollections` 是用于定义 collection 集合的帮助函数
 * - `defineCollection` 是用于定义单个 collection 配置的帮助函数
 *
 * 通过 `defineCollection` 定义的 collection 配置，应该填入 `defineCollections` 中
 */
import { defineCollection, defineCollections } from 'vuepress-theme-plume'

/* =================== locale: zh-CN ======================= */

const zhBlog = defineCollection({
  // post 类型，这里用于实现 博客功能
  type: 'post',
  // 文档集合所在目录，相对于 `docs/`
  dir: 'blog',
  // 文档标题，它将用于在页面的面包屑导航中显示
  title: 'Blog',
  // 文章列表页的链接，如果 `linkPrefix` 未定义，它也将作为 相关的文章的 permalink 的前缀
  link: '/blog/',
  // linkPrefix: '/article/', // 相关文章的链接前缀
  postList: true, // 是否启用文章列表页
  tags: true, // 是否启用标签页
  archives: true, // 是否启用归档页
  categories: true, // 是否启用分类页
  postCover: 'right', // 文章封面位置
  pagination: 15, // 每页显示文章数量
})

const zhMinecraftDocs = defineCollection({
  // doc 类型用于成体系的文档集合，页面左侧会显示专属侧边栏
  type: 'doc',
  // 文档集合所在目录，相对于 `docs/`
  dir: 'docs/minecraft',
  title: 'Minecraft 文档',
  linkPrefix: '/docs/minecraft/',
  sidebar: [
    { text: '首页', link: '/docs/minecraft/' },
    {
      text: '准备工作',
      icon: 'lucide:pickaxe',
      collapsed: false,
      items: [
        { text: '平台选择', link: 'platform' },
        { text: '服务器核心', link: 'core-choice' },
        { text: 'Java 选择', link: 'java' },
      ],
    },
    {
      text: '服务器生命周期',
      icon: 'lucide:life-buoy',
      collapsed: false,
      items: [
        { text: '运行服务器核心', link: 'run-server' },
        { text: '服务器指令', link: 'server-command' },
      ],
    },
    {
      text: '服务器配置',
      icon: 'lucide:table-properties',
      collapsed: false,
      items: [
        { text: 'server.properties', link: 'server-properties' },
      ],
    },
    {
      text: 'Minigames',
      icon: 'lucide:cable',
      collapsed: false,
      items: [
        { text: '首页', link: 'minigames/' },
        { text: 'CloudNet 配置', link: 'minigames/cloudnet' },
        { text: '方块竞速', link: 'minigames/blockracing' },
        { text: '起床战争（旧版）', link: 'minigames/bedwar' },
        { text: '起床战争（新版）', link: 'minigames/bedwars' },
        { text: '空岛战争', link: 'minigames/skywars' },
        { text: '蜂蜜导弹战争', link: 'minigames/honey-missile-war' },
        { text: '幸运之柱', link: 'minigames/pillars-of-fortune' },
        { text: 'Bingo', link: 'minigames/bingo' },
        { text: '逃离疯子 2', link: 'minigames/maniac2' },
        { text: '背刺', link: 'minigames/backstabbed' },
        { text: 'Bleps', link: 'minigames/bleps' },
        { text: '哈比列车', link: 'minigames/harpy-express' },
        { text: '猫抓老鼠', link: 'minigames/cheese' },
        { text: 'GScard', link: 'minigames/gscard' },
        { text: '方块躲猫猫', link: 'minigames/hideandseek' },
        { text: '小游戏合集', link: 'minigames/minigames-collection' },
        { text: '超级像素派对', link: 'minigames/super-voxel-party' },
        { text: 'Build Battle', link: 'minigames/build-battle' },
        { text: '饥饿游戏', link: 'minigames/survival-game' },
        { text: '雪地乱斗 2', link: 'minigames/snowy-skirmish-2' },
        { text: 'Capture the Flag', link: 'minigames/ctf' },
      ],
    },
    {
      text: '方块校园',
      icon: 'lucide:blocks',
      collapsed: false,
      items: [
        { text: '首页', link: 'school/' },
        { text: '部署', link: 'school/deploy' },
        { text: '配置', link: 'school/config' },
        { text: '插件', link: 'school/plugins' },
        { text: '权限', link: 'school/permissions' },
        { text: '建造流程', link: 'school/workflow' },
        { text: '维护', link: 'school/maintenance' },
        { text: '排障', link: 'school/troubleshooting' },
      ],
    },
    {
      text: '生存服',
      icon: 'lucide:sofa',
      collapsed: false,
      items: [
        { text: '首页', link: 'survival/' },
        { text: '部署', link: 'survival/deploy' },
        { text: '配置', link: 'survival/config' },
        { text: 'Mod', link: 'survival/mods' },
      ],
    },
    {
      text: 'Bingo 服务器',
      icon: 'lucide:grid-2x2',
      collapsed: false,
      items: [
        { text: '首页', link: 'bingo/' },
        { text: '部署', link: 'bingo/deploy' },
        { text: '配置', link: 'bingo/config' },
        { text: 'Mod', link: 'bingo/mods' },
        { text: '权限', link: 'bingo/permissions' },
        { text: '运行流程', link: 'bingo/workflow' },
        { text: '排障', link: 'bingo/troubleshooting' },
      ],
    },
    {
      text: 'GameVoting 文档',
      icon: 'lucide:vote',
      collapsed: false,
      items: [
        { text: '首页', link: 'gamevoting/' },
        { text: '构建与部署', link: 'gamevoting/deploy' },
        { text: '配置', link: 'gamevoting/config' },
        { text: '命令与权限', link: 'gamevoting/commands-permissions' },
        { text: '投票流程', link: 'gamevoting/workflow' },
      ],
    },
    {
      text: 'WorldGit 文档',
      icon: 'lucide:earth',
      collapsed: false,
      items: [
        { text: '首页', link: 'worldgit/' },
        { text: '构建与部署', link: 'worldgit/deploy' },
        { text: '配置', link: 'worldgit/config' },
        { text: '可视化菜单', link: 'worldgit/menu' },
        { text: '命令与权限', link: 'worldgit/commands-permissions' },
        { text: '工作流', link: 'worldgit/workflow' },
        { text: '主世界保护', link: 'worldgit/protection' },
        { text: 'Web 与 AI', link: 'worldgit/web-ai' },
      ],
    },
  ],
  sidebarCollapsed: false,
  sidebarScrollbar: true,
})

/**
 * 导出所有的 collections
 *  (zhBlog 用于中文博客文章列表，zhMinecraftDocs 用于 Minecraft 文档侧边栏)
 */
export const zhCollections = defineCollections([
  zhBlog,
  zhMinecraftDocs,
])

/* =================== locale: en-US ======================= */

const enBlog = defineCollection({
  // post 类型，这里用于实现 博客功能
  type: 'post',
  // 文档集合所在目录，相对于 `docs/en/`
  dir: 'blog',
  // 文档标题，它将用于在页面的面包屑导航中显示
  title: 'Blog',
  // 文章列表页的链接，如果 `linkPrefix` 未定义，它也将作为 相关的文章的 permalink 的前缀
  link: '/blog/',
  // linkPrefix: '/article/', // 相关文章的链接前缀
  postList: true, // 是否启用文章列表页
  tags: true, // 是否启用标签页
  archives: true, // 是否启用归档页
  categories: true, // 是否启用分类页
  postCover: 'right', // 文章封面位置
  pagination: 15, // 每页显示文章数量
})

/**
 * 导出所有的 collections
 *  (enBlog 用于英文博客文章列表)
 */
export const enCollections = defineCollections([
  enBlog,
])
