---
title: Bingo 子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/bingo/
---

# Bingo 子服务器

`bingo` 是 Minigames 群组中的 Bingo 子服，和独立 [Bingo 服务器](../bingo/README.md)
不是同一个目录。这里记录的是 CloudNet 模板里的临时子服。

## CloudNet 任务

- 任务名：`bingo`
- 环境：`MODDED_MINECRAFT_SERVER`
- 模板：`bingo/default`
- 起始端口：`50001`
- 最大内存：`16384M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/bingo/default`。这是 Minigames 群组中的临时 Bingo
子服模板，使用 [Fabric](https://fabricmc.net/)。

独立活动服见 [Bingo 服务器文档](../bingo/README.md)，两者不要混淆。

## 服务端配置

- Minecraft 版本：`1.21.11`
- 游戏模式：`survival`
- 难度：`normal`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`
- MOTD：`Yet Another Bingo: Ultimate 2.9.6`

## 主要 Mod

- [Yet Another Bingo](https://modrinth.com/mod/yet-another-minecraft-bingo)
- `bingo-stats`
- [FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite)
- [LuckPerms-Fabric](https://luckperms.net/)
- [Fabric API](https://modrinth.com/mod/fabric-api)
- [fabric-permissions-api](https://modrinth.com/mod/fabric-permissions-api)
- [C2ME](https://modrinth.com/mod/c2me-fabric)
- [Lithium](https://modrinth.com/mod/lithium)
- [FerriteCore](https://modrinth.com/mod/ferrite-core)
- [Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat)
- [vanilla-permissions](https://modrinth.com/mod/vanilla-permissions)

## 权限与接入

Bingo 子服通过 FabricProxy-Lite 接入 Velocity，通过 LuckPerms-Fabric 管理权限。
活动内管理权限应只给裁判或维护人员，普通玩家只保留参赛需要的基础权限。

## 运行流程

1. 大厅投票选中 Bingo。
2. CloudNet 启动 `bingo` task。
3. Fabric 加载 Bingo、性能和权限 Mod。
4. 玩家进入预游戏状态。
5. 游戏完成后，空服自动关闭。

## 维护重点

这个子服内存较高，且依赖较多性能 Mod。更新 Bingo 玩法 Mod 时，应同时确认
Fabric Loader、Fabric API 和 Minecraft 版本是否匹配。

## 排障部分

- Mod 依赖失败：检查 Fabric API、Cloth Config、YACL 等依赖版本。
- 玩家被踢出：检查代理桥接和 `allow-flight` 类配置。
- TPS 低：优先检查区块生成和 C2ME / Lithium 日志。
