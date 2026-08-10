---
title: SHTechCraft Minigames 文档
createTime: 2026/05/19 13:27:30
permalink: /docs/minecraft/minigames/
---

# SHTechCraft Minigames 文档

Minigames 服务器是基于 [CloudNet](https://cloudnetservice.eu) [v4.0.0-RC16](https://github.com/CloudNetService/CloudNet/releases/tag/4.0.0-RC16) 构建的群组服务器。目前服务器支持以下游戏：

- [方块竞速](./blockracing.md)
- [起床战争（旧版）](./bedwar.md)
- [起床战争（新版）](./bedwars.md)
- [空岛战争](./skywars.md)
- [蜂蜜导弹战争](./honey-missile-war.md)
- [幸运之柱](./pillars-of-fortune.md)
- [Bingo](./bingo.md)
- [逃离疯子 2](./maniac2.md)
- [背刺](./backstabbed.md)
- [Bleps](./bleps.md)
- [哈比列车](./harpy-express.md)
- [猫抓老鼠](./cheese.md)
- [GScard](./gscard.md)
- [方块躲猫猫](./hideandseek.md)
- [小游戏合集](./minigames-collection.md)
- [超级像素派对](./super-voxel-party.md)
- [Build Battle](./build-battle.md)
- [饥饿游戏](./survival-game.md)
- [雪地乱斗 2](./snowy-skirmish-2.md)
- [Capture the Flag](./ctf.md)

服务器大厅拥有投票系统，使用 [GameVoting](../gamevoting/README.md) 插件实现，实现在群组服务器下动态启动/关闭游戏子服务器。

服务器常驻 [Velocity](https://papermc.io/software/velocity/) 代理服务器和大厅服务器，所有子服务器通过 Velocity 代理服务器统一连接，使用 [MUA](https://skin.mualliance.ltd) 验证登录。

## 服务结构

Minigames 群组服常驻两个服务：

- `Proxy`：Velocity 代理，监听 `25565`。
- `Lobby`：大厅服，运行 GameVoting。

小游戏子服默认不是常驻服务。玩家在大厅完成投票后，GameVoting 会按
`games.yml` 中的 `cloudnet-task` 启动对应 CloudNet task。游戏结束或空服一段
时间后，服务会自动停止并清理运行目录。

## 维护入口

- CloudNet 配置见 [CloudNet 配置](./cloudnet.md)。
- 投票插件见 [GameVoting 插件文档](../gamevoting/README.md)。
- 子服模板位于 `local/templates/<任务名>/default`。
- 子服任务位于 `local/tasks/<任务名>.json`。

如果需要新增或调整小游戏，优先确认这三层是否一致：

1. CloudNet task 名。
2. 模板目录。
3. GameVoting `games.yml` 里的 `cloudnet-task`。

## 部署部分

Minigames 的部署不是单个 Minecraft 服务端，而是一组由 CloudNet 管理的服务：

- [Velocity](https://papermc.io/software/velocity/) 负责玩家入口。
- [CloudNet](https://cloudnetservice.eu/) 负责服务编排。
- [Paper](https://papermc.io/software/paper/) 子服承载大部分插件小游戏。
- [Fabric](https://fabricmc.net/) 子服承载需要 Mod 环境的小游戏。
- 本地 MySQL 保存 CloudNet、LuckPerms、GameVoting 和部分小游戏数据。

部署时不要只复制某一个 `world` 目录。完整迁移至少要包含 CloudNet 配置、模板、
模块、插件、MySQL 数据和公网转发配置。

## 配置部分

群组服的配置分散在几个位置：

- `config.json`：CloudNet 节点、内存、数据库 Provider。
- `local/tasks/*.json`：每个服务的启动方式、内存、端口和模板。
- `local/templates/*/default`：每个子服的服务端文件。
- `frpc.ini`：公网转发入口。
- 大厅 `plugins/GameVoting/games.yml`：投票菜单和 CloudNet task 映射。

修改某个小游戏时，一般先改模板，再改 GameVoting 映射，最后测试 CloudNet 启动。

## 插件与 Mod 部分

Paper 子服常见依赖：

- [LuckPerms](https://luckperms.net/)
- [ViaVersion](https://viaversion.com/)
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/)
- [DecentHolograms](https://www.spigotmc.org/resources/decentholograms.96927/)
- `cloudnet-bridge`

Fabric 子服常见依赖：

- [Fabric API](https://modrinth.com/mod/fabric-api)
- [FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite)
- [LuckPerms-Fabric](https://luckperms.net/)
- [fabric-permissions-api](https://modrinth.com/mod/fabric-permissions-api)
- [vanilla-permissions](https://modrinth.com/mod/vanilla-permissions)

不同小游戏的专用插件 / Mod 已经写在对应子服务器文档中。

## 权限部分

权限分两层：

1. 大厅权限：决定玩家能否投票、组队、准备和触发游戏。
2. 子服权限：决定玩家进入游戏后能否执行玩法内命令。

大厅权限主要看 [GameVoting](../gamevoting/README.md)。子服权限主要看 LuckPerms。
不要用 OP 作为普通玩家权限方案，否则小游戏之间会互相污染权限边界。

## 流程部分

一次标准小游戏流程如下：

1. 玩家连接 Velocity。
2. Velocity 将玩家送入 Lobby。
3. 玩家在大厅通过 GameVoting 投票。
4. GameVoting 根据投票结果启动 CloudNet task。
5. CloudNet 从模板创建临时服务。
6. 服务就绪后注册到 Velocity。
7. GameVoting 把玩家传送到子服。
8. 游戏结束或空服后，子服停止并清理。

## 排障部分

- 玩家无法连接入口：先查 `frpc` 和 Velocity。
- 玩家能进大厅但进不了子服：查 GameVoting、CloudNet task 和 Bridge。
- 子服启动失败：查模板内核心、插件 / Mod 依赖和 `logs/latest.log`。
- 游戏不在投票菜单显示：查 `games.yml` 的人数、版本和 task 名。
- 空服不关闭：查 GameVoting `idle-shutdown` 和 CloudNet 服务状态。
