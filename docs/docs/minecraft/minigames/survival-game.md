---
title: 饥饿游戏子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/survival-game/
---

# 饥饿游戏子服务器

`survival_game` 是饥饿游戏子服，使用 Paper `1.21.11` 和 `Hungergames` 插件。

## CloudNet 任务

- 任务名：`survival_game`
- 环境：`MINECRAFT_SERVER`
- 模板：`survival_game/default`
- 起始端口：`60016`
- 最大内存：`6144M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/survival_game/default`。该子服使用
[Paper](https://papermc.io/software/paper/) `1.21.11`。

## 服务端配置

- 核心版本：Paper `1.21.11`
- 游戏模式：`adventure`
- 难度：`easy`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`

## 主要插件

- `Hungergames`
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/)
- [LuckPerms](https://luckperms.net/)
- [ViaVersion](https://viaversion.com/)
- `AntiPopup`
- `XaeroForceDisabler`
- `minimap-spigot`

## 权限与接入

饥饿游戏应限制普通玩家的地图破坏和管理命令权限。维护人员才应拥有强制开始、
重置地图和查看调试信息的权限。

## 运行流程

1. 大厅投票选中饥饿游戏。
2. CloudNet 启动 `survival_game`。
3. Hungergames 插件加载地图和补给配置。
4. 玩家进入等待区并开始比赛。
5. 游戏结束后服务自动关闭。

## 世界目录

模板中包含：

- `world`
- `world_nether`
- `world_the_end`
- `darkstone`

## 维护重点

饥饿游戏的地图和箱子补给通常强绑定。替换地图时，需要同步检查插件配置中的地图名、
出生点、边界和补给点。

## 排障部分

- 补给不生成：检查 Hungergames 配置。
- 地图不正确：确认 `darkstone` 和 `world` 目录都已复制。
- 变量不显示：检查 PlaceholderAPI。
