---
title: Build Battle 子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/build-battle/
---

# Build Battle 子服务器

`build_battle` 是 Build Battle 子服，使用 Paper `1.21.11` 和专用
`buildbattle` 插件。

## CloudNet 任务

- 任务名：`build_battle`
- 环境：`MINECRAFT_SERVER`
- 模板：`build_battle/default`
- 起始端口：`50041`
- 最大内存：`4096M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/build_battle/default`。该子服使用
[Paper](https://papermc.io/software/paper/) `1.21.11`，玩法核心是 Build Battle
插件。

## 服务端配置

- 核心版本：Paper `1.21.11`
- 游戏模式：`adventure`
- 难度：`easy`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`

## 主要插件

- `buildbattle`
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/)
- [LuckPerms](https://luckperms.net/)
- [ViaVersion](https://viaversion.com/)
- `AntiPopup`
- `XaeroForceDisabler`
- `minimap-spigot`

## 权限与接入

玩家进入后需要拥有 Build Battle 参与权限。管理员权限只应给维护人员，用于重置地图、
调整主题和处理异常游戏。

## 运行流程

1. 玩家在大厅投票选择 Build Battle。
2. CloudNet 启动 `build_battle`。
3. 插件加载主题、建筑区和投票流程。
4. 玩家进入等待区并开始游戏。
5. 游戏完成后，服务空置并自动关闭。

## 维护重点

Build Battle 通常依赖主题、建筑区域和计时状态。更新模板后，应至少完整跑一局，
确认出生点、建造区、投票阶段和结束清理都正常。

## 排障部分

- 建筑区不重置：检查 Build Battle 地图配置。
- 变量不显示：检查 PlaceholderAPI。
- 玩家无法破坏 / 放置：检查游戏阶段和权限组。
