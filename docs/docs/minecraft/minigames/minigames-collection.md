---
title: 小游戏合集子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/minigames-collection/
---

# 小游戏合集子服务器

`minigames` 是一个 Fabric 小游戏合集子服。它不像单一玩法子服那样只对应一个
插件，而更像一个整合式模板。

## CloudNet 任务

- 任务名：`minigames`
- 环境：`MODDED_MINECRAFT_SERVER`
- 模板：`minigames/default`
- 起始端口：`50021`
- 最大内存：`4096M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/minigames/default`。这是一个 [Fabric](https://fabricmc.net/)
整合型小游戏模板。

## 服务端配置

- 游戏模式：`survival`
- 难度：`easy`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`

## 主要 Mod

- [FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite)
- [LuckPerms-Fabric](https://luckperms.net/)
- `MuteByCMD`
- [No Chat Reports](https://modrinth.com/mod/no-chat-reports)
- [Fabric API](https://modrinth.com/mod/fabric-api)
- [fabric-permissions-api](https://modrinth.com/mod/fabric-permissions-api)
- [vanilla-permissions](https://modrinth.com/mod/vanilla-permissions)

## 权限与接入

这个模板的权限由 LuckPerms-Fabric 和 vanilla-permissions 共同处理。由于它是合集服，
新增玩法前应先确认该玩法需要哪些命令权限。

## 运行流程

1. 大厅投票选中小游戏合集。
2. CloudNet 启动 `minigames`。
3. Fabric 加载整合模板中的 Mod、地图和数据。
4. 玩家通过 Velocity 进入。
5. 空服后服务自动关闭。

## 维护重点

这是合集模板，改动前先确认具体小游戏逻辑是由数据包、地图还是 Mod 提供。
如果只是替换世界目录，可能不足以完整迁移玩法。

## 排障部分

- 某个子玩法缺失：检查它来自地图、数据包还是 Mod。
- 玩家命令不可用：检查 LuckPerms-Fabric 权限。
- 无法进服：检查 FabricProxy-Lite。
