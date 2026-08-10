---
title: 方块校园插件
createTime: 2026/05/26 18:40:00
permalink: /docs/minecraft/school/plugins/
---

# 方块校园插件

方块校园插件很少，但职责很明确。这里按功能分类记录。

## 协作建造核心

- [WorldGit](../worldgit/README.md)：分支、审核、合并、主世界保护。
- [WorldEdit](https://enginehub.org/worldedit/)：选区和编辑工具。
- [Multiverse-Core](https://github.com/Multiverse/Multiverse-Core)：多世界创建、加载、卸载。

这三者是核心依赖。WorldGit 没有 WorldEdit 就无法确定区域，没有 Multiverse 就无法
管理分支世界。

## 建筑工具

- [Axiom](https://axiom.moulberry.com/)：现代建筑编辑工具。
- [WorldEditDisplay](https://modrinth.com/plugin/worldeditdisplay)：显示 WorldEdit 选区。

如果使用 Axiom，建议同时安装 ProtocolLib，让 WorldGit 能拦截更多自定义改块包。

## 地图与展示

- [BlueMap](https://bluemap.bluecolored.de/)：Web 地图。

BlueMap 适合查看校园整体布局、审核建筑位置和展示进度。

## 权限

- [LuckPerms](https://luckperms.net/)：权限管理。

权限配置是方块校园的关键。普通玩家不能绕过 WorldGit 主世界保护。

## 其他插件

- `RandomItem`
- [PacketEvents](https://packetevents.com/)

`PacketEvents` 通常作为其他插件的运行依赖。不要在不了解依赖关系时删除。

## 更新策略

优先级：

1. Paper 与插件 API 兼容。
2. WorldEdit / Multiverse / WorldGit 兼容。
3. Axiom 与 WorldGit 拦截兼容。
4. BlueMap 渲染正常。

更新后必须完整测试 WorldGit 分支流程。
