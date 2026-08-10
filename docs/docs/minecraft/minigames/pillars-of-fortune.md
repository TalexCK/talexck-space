---
title: 幸运之柱子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/pillars-of-fortune/
---

# 幸运之柱子服务器

`pillars_of_fortune` 是幸运之柱子服，使用 Paper `1.21.11`。

## CloudNet 任务

- 任务名：`pillars_of_fortune`
- 环境：`MINECRAFT_SERVER`
- 模板：`pillars_of_fortune/default`
- 起始端口：`60006`
- 最大内存：`6144M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/pillars_of_fortune/default`。该子服使用
[Paper](https://papermc.io/software/paper/) `1.21.11`。

## 服务端配置

- 核心版本：Paper `1.21.11`
- 游戏模式：`survival`
- 难度：`easy`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`
- `server-port=60006`

## 主要插件

- `MiniGamePlugin`
- `cloudnet-bridge`
- [LuckPerms](https://luckperms.net/)
- [ViaVersion](https://viaversion.com/)
- `AntiPopup`
- `XaeroForceDisabler`
- `minimap-spigot`

## 权限与接入

玩家只应拥有参与权限。维度切换、地图重置和管理命令应由玩法插件或维护组控制。

## 运行流程

1. 大厅投票选中幸运之柱。
2. CloudNet 启动 `pillars_of_fortune`。
3. Paper 加载多个玩法维度。
4. 玩家进入等待区并开始游戏。
5. 空服后服务自动清理。

## 世界目录

模板中除了普通三维世界，还包含多个玩法世界：

- `world_yw-pillar_red_moon`
- `world_yw-pillar_the_end_2`
- `world_yw-pillar_the_nether_2`

## 维护重点

幸运之柱的地图和维度目录较多。迁移或清理模板时，不要只复制 `world`，否则可能
导致部分玩法地图缺失。

## 排障部分

- 缺少维度：检查 `world_yw-*` 目录。
- 玩家传送失败：检查 cloudnet-bridge。
- 地图状态异常：确认运行目录改动是否已同步回模板。
