---
title: SHTechCraft 方块校园文档
createTime: 2026/05/19 13:27:30
permalink: /docs/minecraft/school/
---

# SHTechCraft 方块校园文档

方块校园是一个面向协作建造的 Paper 服务器。它的核心目标不是普通创造服，
而是让多人在同一张校园地图上协作，同时通过 [WorldGit](../worldgit/README.md)
保护主世界，避免未经审核的改动直接写回正式地图。

这个服务器更像一个“带版本控制的建筑工作台”。

## 文档章节

- [部署](./deploy.md)
- [配置](./config.md)
- [插件](./plugins.md)
- [权限](./permissions.md)
- [建造流程](./workflow.md)
- [维护](./maintenance.md)
- [排障](./troubleshooting.md)

## 基本信息

- 服务端目录：`school-build`
- 服务端核心：`paper.jar`
- 服务端类型：Paper
- Minecraft 版本：`1.21.11`
- 端口：`25565`
- 游戏模式：`creative`
- 难度：`peaceful`
- 最大人数：`20`
- 视距：`16`
- 模拟距离：`10`
- 主世界：`world`
- 额外世界：`world2`

`server.properties` 中的关键配置如下：

```properties
server-port=25565
motd=Building SHTech...
online-mode=true
gamemode=creative
difficulty=peaceful
max-players=20
view-distance=16
simulation-distance=10
spawn-protection=0
white-list=false
```

## 插件组成

方块校园当前插件较少，但每个插件都比较关键：

- [WorldGit](../worldgit/README.md)：协作建造分支、审核、合并与主世界保护。
- [WorldEdit](https://enginehub.org/worldedit/)：基础选区与大规模编辑工具。
- [Multiverse-Core](https://github.com/Multiverse/Multiverse-Core)：多世界管理，WorldGit 依赖它创建和加载分支世界。
- [BlueMap](https://bluemap.bluecolored.de/)：网页地图，用于查看校园地图整体状态。
- [Axiom](https://axiom.moulberry.com/)：建筑编辑工具。
- [WorldEditDisplay](https://modrinth.com/plugin/worldeditdisplay)：辅助显示 WorldEdit 选区。
- [LuckPerms](https://luckperms.net/)：权限管理。
- `RandomItem`：当前服内额外工具插件。
- [packetevents](https://packetevents.com/)：部分插件运行时依赖。

> [!NOTE]
> 如果同时使用 Axiom 和 WorldGit，建议安装 ProtocolLib。
>
> WorldGit 文档中提到，ProtocolLib 可以帮助拦截 Axiom 的自定义改块包，
> 避免主世界保护被绕过。

## 权限部分

方块校园的权限应该围绕 WorldGit 工作流设计。建议至少分成三类：

- 普通建造者：可以设置选区、创建分支、进入分支、提交审核。
- 审核员：可以查看审核列表、批准和拒绝分支。
- 管理员：可以强制关闭分支、手动备份、重载配置和绕过保护。

普通玩家不应该拥有 `worldgit.admin.bypass`。这个权限会绕过主世界保护，适合短期
排障，不适合长期授予。

## WorldGit 工作方式

方块校园默认把 `world` 当作主世界。主世界应该保持只读：

1. 玩家在主世界选择一块区域。
2. 通过 WorldGit 创建分支。
3. 插件把选区复制到独立分支世界。
4. 玩家在分支世界里编辑。
5. 编辑完成后提交审核。
6. 管理员审核通过。
7. 玩家最终确认合并，改动写回主世界。

这样做的好处是，玩家可以自由试错，但正式地图不会被随意破坏。

## 备份

日志中可以看到 WorldGit 定时备份：

```text
[WorldGit] 世界备份完成: world-20260526-002525
```

当前备份频率由 WorldGit 配置控制。默认配置是每 `30` 分钟备份一次，并保留
最近 `10` 份。

维护时需要注意：

- 更新 WorldGit 前先确认备份目录有最近备份。
- 大规模 merge 前建议手动执行一次备份。
- 如果主世界损坏，优先从 WorldGit 备份恢复，而不是直接回滚整个服务端目录。

## 常见维护流程

### 给玩家开放建造

1. 给玩家 WorldEdit 基础选区权限。
2. 给玩家 WorldGit 分支权限。
3. 引导玩家只在分支世界内施工。
4. 管理员通过 `/wg review list` 查看待审核分支。
5. 审核通过后让玩家自行确认合并。

### 处理误操作

如果误操作发生在分支世界，通常直接放弃分支即可。

如果误操作已经合并到主世界，需要根据情况处理：

1. 如果影响范围小，可以创建修复分支再合并修复。
2. 如果影响范围大，先停服，再从 WorldGit 备份或整服备份恢复。

### 更新插件

方块校园依赖链比较明确：Paper、WorldEdit、Multiverse-Core、WorldGit、
AxiomPaper。更新时建议按这个顺序检查兼容性：

1. Paper 版本是否仍为插件支持版本。
2. WorldEdit 是否能正常选择和复制区域。
3. Multiverse-Core 是否能创建、加载、卸载世界。
4. WorldGit 是否能创建分支、提交、审核和合并。
5. Axiom 是否仍会被主世界保护拦截。

## 注意事项

- 不建议让玩家直接在主世界建造。
- 不建议关闭 WorldGit 备份后长期运行。
- 不建议在 WorldGit merge 或 backup 过程中直接杀进程。
- 如果需要重载配置，优先重启服务端，而不是使用 Paper 的 `reload`。
