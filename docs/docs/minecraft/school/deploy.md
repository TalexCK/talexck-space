---
title: 方块校园部署
createTime: 2026/05/26 18:40:00
permalink: /docs/minecraft/school/deploy/
---

# 方块校园部署

方块校园是协作建造服务器，部署目标是让主世界稳定保留，同时允许玩家通过 WorldGit
分支进行施工。它不是普通创造服，不能只按“装 Paper + WorldEdit”理解。

## 目录结构

::: file-tree

- bluemap
- cache
- config
  - paper-global.yml
  - paper-world-defaults.yml
- logs
- paper.jar
- plugins
  - AxiomPaper-5.0.3-for-MC1.21.11.jar
  - LuckPerms-Bukkit-5.5.17.jar
  - WorldEditDisplay-2.1.0.jar
  - bluemap-5.16-paper.jar
  - multiverse-core-5.5.3.jar
  - worldedit-bukkit-7.4.2.jar
  - worldgit-1.1.0.jar
- server.properties
- world
- world2
- world_nether
- world_the_end

:::

## 服务端核心

当前使用 [Paper](https://papermc.io/software/paper/) `1.21.11`。

部署时需要保证 WorldGit、WorldEdit、Multiverse-Core 和 AxiomPaper 都与这个版本兼容。

## 插件部署顺序

推荐顺序：

1. 安装 Paper。
2. 安装 [WorldEdit](https://enginehub.org/worldedit/)。
3. 安装 [Multiverse-Core](https://github.com/Multiverse/Multiverse-Core)。
4. 安装 [WorldGit](../worldgit/README.md)。
5. 安装 [LuckPerms](https://luckperms.net/)。
6. 安装 [BlueMap](https://bluemap.bluecolored.de/)。
7. 安装 AxiomPaper、WorldEditDisplay 等辅助插件。

WorldGit 依赖 WorldEdit 选区和 Multiverse 多世界能力。缺少其中任何一个，分支流程都
无法正常工作。

## 首次启动

1. 确认 `eula.txt`。
2. 启动 Paper。
3. 确认所有插件绿色加载。
4. 检查 `plugins/WorldGit/config.yml`。
5. 确认 `main-world` 是 `world`。
6. 进入服务器创建一个小选区。
7. 完整测试 `/wg create`、提交、审核、合并。

## 部署检查清单

- `world` 主世界存在。
- `world2` 等额外世界存在。
- WorldEdit 可用。
- Multiverse-Core 可加载世界。
- WorldGit 可创建分支世界。
- BlueMap 能生成地图。
- Axiom 修改主世界会被 WorldGit 拦截。
- LuckPerms 权限组正确。
