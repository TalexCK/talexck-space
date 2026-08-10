---
title: Bleps 子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/bleps/
---

# Bleps 子服务器

`bleps` 是 Minigames 中的 Paper 小游戏子服。

## CloudNet 任务

- 任务名：`bleps`
- 环境：`MINECRAFT_SERVER`
- 模板：`bleps/default`
- 起始端口：`60011`
- 最大内存：`4096M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/bleps/default`。该子服使用
[Paper](https://papermc.io/software/paper/) `1.21.10`。

## 服务端配置

- 核心版本：Paper `1.21.10`
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

权限由 LuckPerms 管理。GameVoting 中应把该游戏的版本限制写清楚，避免客户端版本
和 Paper `1.21.10` 不一致导致异常。

## 运行流程

1. 大厅投票选中 Bleps。
2. CloudNet 启动 `bleps` task。
3. Paper 服务加载插件和地图。
4. 玩家通过 Velocity 进入。
5. 空服后自动关闭。

## 维护重点

`bleps` 使用 Paper `1.21.10`，不是当前最新的 `1.21.11`。接入 GameVoting 时，
客户端版本限制需要和实际核心版本保持一致。

## 排障部分

- 玩家看不到游戏：检查 GameVoting `version` 字段。
- 进入后无玩法：检查模板中是否缺玩法插件或数据包。
- 协议异常：检查 ViaVersion 版本。
