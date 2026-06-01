---
title: GameVoting 构建和部署
createTime: 2026/05/26 18:45:00
permalink: /docs/minecraft/gamevoting/deploy/
---

# GameVoting 构建和部署

GameVoting 部署分两部分：大厅 Paper 插件和 Velocity 桥接插件。只装大厅插件可以打开投票菜单，但客户端版本识别、跨服信息和传送稳定性会受影响。

## 目标环境

- 服务端：[Paper](https://papermc.io/software/paper/) `1.16+`
- Java：`17+`
- 群组服：[CloudNet](https://cloudnetservice.eu/) v4
- 代理：[Velocity](https://papermc.io/software/velocity/)
- 必需依赖：CloudNet Bridge
- 可选依赖：[DecentHolograms](https://www.spigotmc.org/resources/decentholograms.96927/)

## 构建

GameVoting 使用 Maven：

```bash
mvn clean package
```

主插件输出：

```text
target/GameVoting-*.jar
```

Velocity 桥接插件输出：

```text
velocity-bridge/target/gamevoting-velocity-bridge-*.jar
```

## 大厅服部署

把主插件放入大厅服：

```text
plugins/GameVoting-*.jar
```

同时确保大厅服有：

- `CloudNet-Bridge`
- 可选：`DecentHolograms`

首次启动后会生成：

```text
plugins/GameVoting/config.yml
plugins/GameVoting/games.yml
plugins/GameVoting/lang/
```

## Velocity 部署

把桥接插件放入 Velocity：

```text
plugins/gamevoting-velocity-bridge-*.jar
```

它负责记录玩家客户端版本，并让大厅侧能判断玩家是否适合进入某个小游戏。

## CloudNet 要求

GameVoting 不直接保存完整服务端模板，它只通过 CloudNet task 名启动服务。因此 CloudNet 中必须已经存在对应 task。

例如 `games.yml` 中：

```yaml
cloudnet-task: "BedWars"
```

CloudNet 中就必须有名为 `BedWars` 的 task。
