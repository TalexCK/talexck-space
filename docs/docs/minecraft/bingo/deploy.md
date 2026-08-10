---
title: Bingo 部署
createTime: 2026/05/26 18:35:00
permalink: /docs/minecraft/bingo/deploy/
---

# Bingo 部署

Bingo 是活动型服务器，部署目标和生存服不同。它更关注快速开赛、稳定完成一局、
赛后保留日志，而不是长期维护同一张地图。

## 目录结构

::: file-tree

- config
  - c2me.toml
  - lithium.properties
  - vanish.hocon
- fabric-installer-1.1.1.jar
- fabric-server-launch.jar
- fabric-server-launcher.properties
- logs
  - latest.log
- mods
  - bingo-2.9.6+mc1.21.11.jar
  - bingo-stats-1.0.0.jar
  - fabric-api-0.141.4+1.21.11.jar
  - voicechat-fabric-1.21.11-2.6.11.jar
  - ...
- server.jar
- server.properties
- start.sh
- world

:::

## Java 环境

当前 `start.sh` 使用指定 Java 路径：

```bash
"/home/alex/Downloads/zulu26.30.11-ca-jdk26.0.1-linux_x64/bin/java"
```

迁移服务器时要改成新机器上的 Java 路径。不要假设 `/home/alex/...` 一定存在。

## 启动命令

当前启动命令：

```bash
java -Xms4G -Xmx24G -XX:+UseG1GC -jar fabric-server-launch.jar nogui
```

这个内存上限比普通小游戏高，因为 Bingo 会频繁跑图、生成区块、查询物品和处理统计。

## 首次部署流程

1. 准备对应 Java。
2. 放入 `fabric-server-launch.jar`、`server.jar`、`mods` 和 `config`。
3. 确认 `eula.txt` 为 `eula=true`。
4. 检查 `server.properties`。
5. 执行：

```bash
./start.sh
```

6. 观察日志中 Fabric Loader 和 Bingo Mod 是否正常加载。

## 活动前部署检查

开赛前建议检查：

- 服务端能完整启动。
- `bingo` 和 `bingo-stats` 正常加载。
- 语音 Mod 正常加载。
- 权限 Mod 正常加载。
- 最大人数符合活动规模。
- `motd` 显示当前状态。
- 日志没有缺失依赖或严重报错。

## 赛后处理

1. 停服。
2. 备份 `logs`。
3. 如果要重开新局，处理 `world` 目录。
4. 保留本次活动使用的 `mods` 和 `config` 版本。

不要在服务端运行时直接删除 `world`。
