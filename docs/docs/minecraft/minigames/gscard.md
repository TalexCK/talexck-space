---
title: GScard 子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/gscard/
---

# GScard 子服务器

`GScard` 是 Minigames 中的 Paper 小游戏子服。

## CloudNet 任务

- 任务名：`GScard`
- 环境：`MINECRAFT_SERVER`
- 模板：`GScard/default`
- 起始端口：`60014`
- 最大内存：`4096M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/GScard/default`，由 CloudNet 在启动临时服务时复制。
该子服使用 [Paper](https://papermc.io/software/paper/) `1.21.8`。

## 服务端配置

- 核心版本：Paper `1.21.8`
- 游戏模式：`survival`
- 难度：`easy`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`

## 主要插件

- [LuckPerms](https://luckperms.net/)
- [ViaVersion](https://viaversion.com/)
- `AntiPopup`
- `XaeroForceDisabler`
- `minimap-spigot`

## 权限与接入

基础权限由 LuckPerms 管理。由于该子服没有明显的通用玩法插件名，维护时更要确认
地图、命令方块或数据包是否承担了主要玩法逻辑。

## 运行流程

1. 大厅触发投票结果。
2. GameVoting 启动 `GScard` task。
3. CloudNet 创建临时 Paper 服务。
4. Velocity 注册服务后，玩家进入。
5. 空服后服务关闭并清理。

## 维护重点

这个模板保留了 `world`、`world_nether` 和 `world_the_end`。如果玩法只使用主世界，
也不要在不了解插件依赖的情况下直接删除维度目录。

## 排障部分

- 玩法不启动：检查地图内命令方块、数据包或缺失插件。
- 版本兼容问题：检查 ViaVersion 与 GameVoting 版本限制。
- 维度缺失：确认三个世界目录都存在。
