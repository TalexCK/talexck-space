---
title: 背刺子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/backstabbed/
---

# 背刺子服务器

`Backstabbed` 是 Minigames 中的 Paper 小游戏子服，对应“背刺”玩法。

## CloudNet 任务

- 任务名：`Backstabbed`
- 环境：`MINECRAFT_SERVER`
- 模板：`Backstabbed/default`
- 起始端口：`60009`
- 最大内存：`4096M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/Backstabbed/default`。CloudNet 每次启动服务时会从
这个模板复制文件，所以需要长期保留的地图、插件和配置，都应该写进模板目录。

`Backstabbed` 使用 [Paper](https://papermc.io/software/paper/) 服务端，并通过
[Velocity](https://papermc.io/software/velocity/) 代理接入大厅。

## 服务端配置

- 核心版本：Paper `1.21.4`
- 游戏模式：`survival`
- 难度：`hard`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`

## 主要插件

- `MiniGamePlugin`
- [LuckPerms](https://luckperms.net/)
- [ViaVersion](https://viaversion.com/)
- `AntiPopup`
- `XaeroForceDisabler`
- `minimap-spigot`

## 权限与接入

权限由 LuckPerms 管理。子服本身不应该承担大厅投票权限，玩家是否能进入游戏主要由
GameVoting 和 CloudNet 控制。

这个子服需要保证：

1. 能被 CloudNet 按 `Backstabbed` task 启动。
2. 能被 Velocity 正确注册。
3. 玩家进入后拥有玩法插件要求的基础权限。

## 运行流程

1. 玩家在大厅投票选中背刺。
2. GameVoting 请求 CloudNet 启动 `Backstabbed`。
3. CloudNet 从模板创建临时服务。
4. 服务启动并注册到 Velocity。
5. GameVoting 将玩家传送进该服务。
6. 游戏结束或空服后，服务停止并自动清理。

## 维护重点

这个子服是按需启动的临时服务。需要保留的地图、插件配置和资源包，应修改
`local/templates/Backstabbed/default`，不要只改 CloudNet 运行时目录。

## 排障部分

- 启动失败：先看 CloudNet 控制台，再看子服 `logs/latest.log`。
- 玩家传送失败：检查 Velocity 注册状态和 GameVoting 的 task 名。
- 玩法异常：优先检查 `MiniGamePlugin` 配置和地图出生点。
