---
title: 起床战争旧版子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/bedwar/
---

# 起床战争旧版子服务器

`bedwar` 是旧版起床战争子服。它使用 Fabric / Modded Minecraft 环境，不要和新版
`BedWars` Paper 子服混淆。

## CloudNet 任务

- 任务名：`bedwar`
- 环境：`MODDED_MINECRAFT_SERVER`
- 模板：`bedwar/default`
- 起始端口：`50031`
- 最大内存：`6144M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/bedwar/default`。这是旧版起床战争模板，使用
[Fabric](https://fabricmc.net/) / Modded Minecraft 环境。

不要把它和新版 [BedWars](./bedwars.md) 混用：两者 task 名、核心类型、插件体系都不同。

## 服务端配置

- 游戏模式：`survival`
- 难度：`easy`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`

## 主要 Mod

- [FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite)
- [LuckPerms-Fabric](https://luckperms.net/)
- [No Chat Reports](https://modrinth.com/mod/no-chat-reports)
- [Fabric API](https://modrinth.com/mod/fabric-api)
- [vanilla-permissions](https://modrinth.com/mod/vanilla-permissions)

## 权限与接入

旧版起床战争依赖 Fabric 权限链路。玩家是否能进入由 GameVoting 控制，进入后基础
命令权限由 LuckPerms-Fabric 与 vanilla-permissions 处理。

## 运行流程

1. 玩家投票选中旧版起床战争。
2. CloudNet 启动 `bedwar` task。
3. Fabric 服务端加载代理桥接与权限 Mod。
4. Velocity 将玩家转入子服。
5. 空服后服务自动停止。

## 维护重点

旧版起床战争是 Fabric 子服，代理接入依赖 `FabricProxy-Lite`。如果玩家能进
Velocity 但无法转入该子服，优先检查 Fabric 代理桥接和 Velocity forwarding 配置。

## 排障部分

- 连接失败：检查 FabricProxy-Lite 与 Velocity forwarding secret。
- 权限异常：检查 LuckPerms-Fabric 是否成功连接权限数据。
- 玩法缺失：确认玩法是来自地图、数据包还是未列出的 Mod。
