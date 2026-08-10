---
title: 超级像素派对子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/super-voxel-party/
---

# 超级像素派对子服务器

`super_voxel_party` 是超级像素派对子服，使用 Fabric / Modded Minecraft 环境。

## CloudNet 任务

- 任务名：`super_voxel_party`
- 环境：`MODDED_MINECRAFT_SERVER`
- 模板：`super_voxel_party/default`
- 起始端口：`45001`
- 最大内存：`6144M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/super_voxel_party/default`。该子服使用
[Fabric](https://fabricmc.net/) / Modded Minecraft 环境。

## 服务端配置

- Minecraft 版本：`1.20.4`
- 游戏模式：`survival`
- 难度：`easy`
- 最大人数：`4`
- 视距：`12`
- 模拟距离：`10`

## 主要 Mod

- [FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite)
- [LuckPerms-Fabric](https://luckperms.net/)
- [No Chat Reports](https://modrinth.com/mod/no-chat-reports)
- [Fabric API](https://modrinth.com/mod/fabric-api)
- [fabric-permissions-api](https://modrinth.com/mod/fabric-permissions-api)
- [vanilla-permissions](https://modrinth.com/mod/vanilla-permissions)

## 权限与接入

超级像素派对最大人数较低，权限配置应围绕小队伍玩法处理。大厅投票阶段要限制
可传入人数，避免超过子服容量。

## 运行流程

1. 大厅投票选中超级像素派对。
2. CloudNet 启动 `super_voxel_party`。
3. Fabric 加载玩法模板。
4. 最多 4 名玩家进入游戏。
5. 空服后服务关闭。

## 维护重点

这个子服最大人数只有 `4`，GameVoting 中应设置合理的 `max_player`。如果大厅人数
远高于 4，不应该把所有玩家都传送进同一个实例。

## 排障部分

- 玩家过多：检查 GameVoting `max_player`。
- 连接失败：检查 FabricProxy-Lite。
- 版本异常：确认客户端和服务端 `1.20.4` 兼容。
