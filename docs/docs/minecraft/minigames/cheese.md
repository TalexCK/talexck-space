---
title: 猫抓老鼠子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/cheese/
---

# 猫抓老鼠子服务器

`cheese` 对应“猫抓老鼠”玩法，是 Paper 小游戏子服。

## CloudNet 任务

- 任务名：`cheese`
- 环境：`MINECRAFT_SERVER`
- 模板：`cheese/default`
- 起始端口：`60013`
- 最大内存：`4096M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/cheese/default`。该子服使用
[Paper](https://papermc.io/software/paper/) `1.21.4`。

## 服务端配置

- 核心版本：Paper `1.21.4`
- 游戏模式：`survival`
- 难度：`hard`
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

猫抓老鼠的玩家进入由大厅投票控制。子服内应只开放普通参与权限，地图管理、
强制开始和调试命令应留给维护人员。

## 运行流程

1. 大厅投票选中猫抓老鼠。
2. CloudNet 启动 `cheese` task。
3. Paper 加载模板地图和插件。
4. 玩家通过 Velocity 进入。
5. 空服后服务关闭。

## 维护重点

这个子服运行在 `1.21.4`。如果大厅允许更高版本客户端进入，需要依赖 ViaVersion
兼容；如果玩法插件对协议敏感，应在 GameVoting 中限制客户端版本。

## 排障部分

- 协议问题：检查 ViaVersion 和 GameVoting 版本限制。
- 玩法无法开始：确认地图出生点和玩法触发逻辑。
- 玩家权限异常：检查 LuckPerms 继承组。
