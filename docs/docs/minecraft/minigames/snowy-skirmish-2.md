---
title: 雪地乱斗 2 子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/snowy-skirmish-2/
---

# 雪地乱斗 2 子服务器

`snowy_skirmish_2` 是雪地乱斗 2 子服，使用 Fabric / Modded Minecraft 环境。

## CloudNet 任务

- 任务名：`snowy_skirmish_2`
- 环境：`MODDED_MINECRAFT_SERVER`
- 模板：`snowy_skirmish_2/default`
- 起始端口：`50041`
- 最大内存：`4096M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/snowy_skirmish_2/default`。该子服使用
[Fabric](https://fabricmc.net/) / Modded Minecraft 环境。

## 服务端配置

- Minecraft 版本：`1.21.11`
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
- [fabric-permissions-api](https://modrinth.com/mod/fabric-permissions-api)
- [vanilla-permissions](https://modrinth.com/mod/vanilla-permissions)

## 权限与接入

该子服通过 FabricProxy-Lite 接入 Velocity。普通玩家只需要参与权限，管理命令应只给
维护人员。

## 运行流程

1. 大厅投票选中雪地乱斗 2。
2. CloudNet 启动 `snowy_skirmish_2`。
3. Fabric 加载权限、代理和玩法内容。
4. 玩家进入子服。
5. 空服后服务自动关闭。

## 维护重点

该任务的起始端口与 `build_battle` 同为 `50041`。如果两个服务可能同时启动，需要
确认 CloudNet 的端口分配行为不会造成冲突。

## 排障部分

- 无法连接：检查 FabricProxy-Lite。
- 端口冲突：检查 CloudNet 实际分配端口。
- 玩法缺失：确认地图、数据包或 Mod 是否完整。
