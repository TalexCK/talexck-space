---
title: 逃离疯子 2 子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/maniac2/
---

# 逃离疯子 2 子服务器

`maniac2` 对应“逃离疯子 2”玩法，是 Paper 小游戏子服。

## CloudNet 任务

- 任务名：`maniac2`
- 环境：`MINECRAFT_SERVER`
- 模板：`maniac2/default`
- 起始端口：`60008`
- 最大内存：`4096M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/maniac2/default`。该子服使用
[Paper](https://papermc.io/software/paper/) `1.21.3`。

## 服务端配置

- 核心版本：Paper `1.21.3`
- 游戏模式：`survival`
- 难度：`easy`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`
- `server-port=60008`

## 主要插件

- `MiniGamePlugin`
- `cloudnet-bridge`
- [LuckPerms](https://luckperms.net/)
- [ViaVersion](https://viaversion.com/)
- `AntiPopup`
- `XaeroForceDisabler`
- `minimap-spigot`

## 权限与接入

普通玩家只需要参与玩法的基础权限。管理员命令、地图重置和强制开始应只给维护组。

## 运行流程

1. 大厅投票选中逃离疯子 2。
2. CloudNet 启动 `maniac2`。
3. 子服完成 Paper 和插件加载。
4. GameVoting 传送玩家进入。
5. 游戏结束后服务自动关闭。

## 维护重点

这个子服使用 `1.21.3`，版本处在新旧小游戏之间。接入大厅投票时，建议在
GameVoting 中设置明确的版本要求，避免客户端版本不匹配导致玩法异常。

## 排障部分

- 玩家进不去：检查 CloudNet Bridge Ready 状态。
- 玩法流程卡住：检查 MiniGamePlugin 日志。
- 客户端异常：检查 ViaVersion 与版本限制。
