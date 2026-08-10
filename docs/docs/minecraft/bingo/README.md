---
title: Bingo 服务器文档
createTime: 2026/05/26 15:26:53
permalink: /docs/minecraft/bingo/
---

# Bingo 服务器文档

Bingo 服务器是一个独立运行的 Yet Another Bingo 服务器，用于组织玩家进行
物品收集竞速。它和 Minigames 群组里的 `bingo` 子服配置相近，但这里记录的是
`mc_doc/bingo` 目录下的独立服务器。

## 文档章节

- [部署](./deploy.md)
- [配置](./config.md)
- [Mod](./mods.md)
- [权限](./permissions.md)
- [运行流程](./workflow.md)
- [排障](./troubleshooting.md)

## 基本信息

- 服务端类型：Fabric
- Minecraft 版本：`1.21.11`
- Fabric Loader：`0.18.4`
- 核心启动文件：`fabric-server-launch.jar`
- 启动内存：`4G ~ 24G`
- 端口：`25565`
- 最大人数：`16`
- 游戏模式：`survival`
- 难度：`normal`
- 允许飞行：`true`
- 视距：`16`
- 模拟距离：`5`
- 基于整合包：[Yet Another Bingo: Ultimate](https://modrinth.com/modpack/yet-another-bingo-ultimate/versions)

`server.properties` 中的关键配置如下：

```properties
server-port=25565
motd=§a[PRE-GAME]§f Yet Another Bingo: Ultimate 2.9.6
online-mode=true
gamemode=survival
difficulty=normal
max-players=16
allow-flight=true
view-distance=16
simulation-distance=5
spawn-protection=0
white-list=false
```

请将 `allow-flight=true` 设置正确。

## 启动方式

目录下的 `start.sh` 使用指定 Java 路径启动 Fabric：

```bash
./start.sh
```

脚本等价于执行：

```bash
java -Xms4G -Xmx24G -XX:+UseG1GC -jar fabric-server-launch.jar nogui
```

如果换机器部署，需要改脚本里的 Java 路径。建议使用与当前服务端版本匹配的
Java，而不是直接使用系统默认 Java。

## 主要 Mod

### Bingo 核心

- [Yet Another Bingo](https://modrinth.com/mod/yet-another-minecraft-bingo)
- `bingo-stats-1.0.0`

这几项负责 Bingo 玩法、统计和旁观者相关体验。

### 权限与玩家体验

- [LuckPerms-Fabric](https://luckperms.net/)
- [vanilla-permissions](https://modrinth.com/mod/vanilla-permissions)
- [fabric-permissions-api](https://modrinth.com/mod/fabric-permissions-api)
- [Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat)
- [Vanish](https://modrinth.com/mod/vanish)
- `coordshud`

这些负责权限、语音、隐藏玩家和坐标显示。

### 性能与依赖

- [Fabric API](https://modrinth.com/mod/fabric-api)
- [C2ME](https://modrinth.com/mod/c2me-fabric)
- [Lithium](https://modrinth.com/mod/lithium)
- [FerriteCore](https://modrinth.com/mod/ferrite-core)
- [Simple Update Checker](https://modrinth.com/mod/simple-update-checker)
- [Cloth Config](https://modrinth.com/mod/cloth-config)
- [YetAnotherConfigLib](https://modrinth.com/mod/yacl)
- [YOSBR](https://modrinth.com/mod/yosbr)

Bingo 一局内会频繁探索、生成和加载区块，因此性能类 Mod 对体验影响很明显。

## 权限部分

Bingo 活动服的权限不需要像长期生存服那样复杂。建议保留：

- 普通玩家：参与游戏、语音、基础命令。
- 观察 / 管理员：旁观、隐藏、调试和开赛控制。
- 维护人员：LuckPerms 管理、服务端控制台和文件维护。

如果活动中有裁判或直播观察位，可以使用 `vanish` 隐藏玩家，避免影响比赛过程。

## 配置目录

比较值得关注的配置文件：

- `config/c2me.toml`
- `config/lithium.properties`
- `config/ferritecore.mixin.properties`
- `config/vanish.hocon`
- `config/simpleupdatechecker_modpack.json`
- `config/simpleupdatechecker_user.json`

如果只是开一场普通 Bingo，一般不需要改这些配置。需要调整性能或权限时，再按
Mod 维度单独修改。

## 运维建议

### 开赛前检查

1. 确认服务端能正常启动，日志中没有 Mod 依赖错误。
2. 确认 `motd` 仍显示预期的 Bingo 状态。
3. 确认玩家数量上限与活动规模匹配。
4. 确认语音与权限 Mod 正常加载。

### 赛后处理

1. 保存日志，便于之后排查争议或统计问题。
2. 如果需要下一轮全新地图，先停服，再处理 `world` 目录。
3. 不要在服务端运行时直接替换世界文件。

## 注意事项

- Bingo 是活动型服务器，世界生命周期通常比生存服短。
- 更新 Bingo Mod 前，应确认对应 Minecraft 版本。
- `simulation-distance=5` 是为了控制服务端压力，不建议随意调高。
- 不建议使用 `reload`。
