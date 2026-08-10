---
title: 蜂蜜导弹战争子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/honey-missile-war/
---

# 蜂蜜导弹战争子服务器

`honey_missile_war` 是蜂蜜导弹战争子服，使用 Paper `1.20.6`。

## CloudNet 任务

- 任务名：`honey_missile_war`
- 环境：`MINECRAFT_SERVER`
- 模板：`honey_missile_war/default`
- 起始端口：`60007`
- 最大内存：`6144M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/honey_missile_war/default`。该子服使用
[Paper](https://papermc.io/software/paper/) `1.20.6`。

## 服务端配置

- 核心版本：Paper `1.20.6`
- 游戏模式：`survival`
- 难度：`hard`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`
- `server-port=60007`

## 主要插件

- `MiniGamePlugin`
- `cloudnet-bridge`
- [LuckPerms](https://luckperms.net/)
- [ViaVersion](https://viaversion.com/)
- `AntiPopup`
- `XaeroForceDisabler`
- `minimap-spigot`

## 权限与接入

游戏启动、队伍和武器权限应由玩法插件控制。普通玩家不应获得能破坏地图或跳过流程的
管理权限。

## 运行流程

1. 大厅投票选中蜂蜜导弹战争。
2. GameVoting 启动 `honey_missile_war`。
3. CloudNet Bridge 报告服务就绪。
4. 玩家被传送进子服。
5. 游戏结束后空服关停。

## 维护重点

模板中带有 `cloudnet-bridge`，GameVoting 可以等待 Bridge Ready 后再传送玩家。
如果玩家被过早传送或传送失败，优先检查 Bridge 是否正常加载。

## 排障部分

- 玩家过早进入：检查 GameVoting `wait-for-bridge-ready`。
- 玩法武器异常：检查 MiniGamePlugin 和地图配置。
- 连接异常：检查 CloudNet Bridge 与 Velocity 注册。
