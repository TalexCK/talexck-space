---
title: 起床战争新版子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/bedwars/
---

# 起床战争新版子服务器

`BedWars` 是新版起床战争子服，使用 Paper `1.21.11`，并带有独立的起床战争插件
和 Slime 地图池。

## CloudNet 任务

- 任务名：`BedWars`
- 环境：`MINECRAFT_SERVER`
- 模板：`BedWars/default`
- 起始端口：`60002`
- 最大内存：`8192M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/BedWars/default`。这是新版起床战争正式模板。

该子服使用 [Paper](https://papermc.io/software/paper/) `1.21.11`，并通过
[CloudNet Bridge](https://cloudnetservice.eu/) 接入群组服状态。地图池放在
`slime_worlds`，不要只复制 `world` 目录来迁移服务。

## 服务端配置

- 核心版本：Paper `1.21.11`
- 游戏模式：`survival`
- 难度：`easy`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`
- `server-port=60002`

## 主要插件

- `BedWars`
- [DecentHolograms](https://www.spigotmc.org/resources/decentholograms.96927/)
- `NpcPlugin`
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/)
- `TAB`
- `Vault`
- `asp-plugin`
- `cloudnet-bridge`
- [LuckPerms](https://luckperms.net/)
- [ViaVersion](https://viaversion.com/)

## 地图池

模板中包含 `slime_worlds` 目录，里面存放起床战争地图，例如：

- `acropolis`
- `aquarium`
- `blossom`
- `coastal`
- `dragonlight`
- `lunarhouse`
- `orientwood`
- `sky_festival`
- `tigris`
- `toro`
- `tuzi`
- `usagi`
- `yandi`
- `yue`

## 权限与接入

大厅投票权限由 GameVoting 控制。子服内权限主要围绕 BedWars 插件、队伍、NPC、
全息图和基础玩家命令。

维护时需要确认：

1. `cloudnet-bridge` 正常加载。
2. BedWars 插件能读取地图池。
3. NPC、PlaceholderAPI、TAB 没有启动报错。
4. 玩家进入后不会缺少基础游戏权限。

## 运行流程

1. 玩家在大厅投票选择新版起床战争。
2. GameVoting 启动 `BedWars` task。
3. 子服加载 Paper、BedWars 插件和 Slime 地图池。
4. Bridge Ready 后，玩家被传送进服务。
5. 游戏结束后，空服自动关闭。

## 维护重点

新版起床战争依赖更多插件。更新时优先检查 `BedWars`、`asp-plugin`、
`cloudnet-bridge` 和地图池是否兼容当前 Paper 版本。

## 排障部分

- 地图没加载：检查 `slime_worlds` 和 BedWars 地图配置。
- NPC 不显示：检查 `NpcPlugin` 和 PlaceholderAPI。
- 玩家无法传送：检查 CloudNet Bridge Ready 状态。
- 计分板异常：检查 TAB、PlaceholderAPI 和 BedWars 变量。
