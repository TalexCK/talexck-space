---
title: 空岛战争子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/skywars/
---

# 空岛战争子服务器

`skywars` 是空岛战争子服，使用 Paper `1.21.10`。

## CloudNet 任务

- 任务名：`skywars`
- 环境：`MINECRAFT_SERVER`
- 模板：`skywars/default`
- 起始端口：`60005`
- 最大内存：`6144M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/skywars/default`。该子服使用
[Paper](https://papermc.io/software/paper/) `1.21.10`。

## 服务端配置

- 核心版本：Paper `1.21.10`
- 游戏模式：`survival`
- 难度：`easy`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`
- `server-port=60005`

## 主要插件

- `MiniGamePlugin`
- `cloudnet-bridge`
- [LuckPerms](https://luckperms.net/)
- [ViaVersion](https://viaversion.com/)
- `AntiPopup`
- `XaeroForceDisabler`
- `minimap-spigot`

## 权限与接入

空岛战争需要玩家拥有基础交互权限，但不应拥有地图管理和强制结束权限。大厅投票进入
由 GameVoting 负责。

## 运行流程

1. 大厅投票选中空岛战争。
2. CloudNet 启动 `skywars`。
3. 子服加载地图、箱子和胜负逻辑。
4. 玩家进入等待区。
5. 游戏结束后自动关服。

## 维护重点

空岛战争依赖地图出生点、箱子和边界配置。更新模板后，至少测试一局完整流程：
开局、倒计时、补给、胜负判定和结束关服。

## 排障部分

- 出生点错误：检查地图配置。
- 箱子不刷新：检查玩法插件数据。
- 玩家无法加入：检查 GameVoting 版本和人数限制。
