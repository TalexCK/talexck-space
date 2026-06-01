---
title: GameVoting 投票流程
createTime: 2026/05/26 18:45:00
permalink: /docs/minecraft/gamevoting/workflow/
---

# GameVoting 投票流程

GameVoting 的核心是把大厅玩家组织成一场投票，并在投票结束后启动对应小游戏。

## 自动准备阶段

- 当大厅人数达到条件后，插件会允许玩家执行命令启动投票。

```text
/vote start [duration]
```

## 手动投票

管理员可以执行：

```text
/vote start [duration]
```

这会直接开始投票。

## 投票阶段

玩家收到投票指南针，右键打开菜单。

菜单内容来自 `games.yml`，并会根据以下条件过滤：

- 当前大厅人数。
- 游戏配置是否有效。
- CloudNet task 是否可用。

## 投票结束

投票结束后，插件计算获胜游戏。

如果启用了数据库，会记录：

- session id
- 获胜游戏
- 总票数
- 玩家数
- 每个游戏的票数

## 启动子服

插件根据 `cloudnet-task` 请求 CloudNet 启动服务。

如果 `wait-for-bridge-ready=true`，会等待子服通过 CloudNet Bridge 报告服务器启动状态。

如果为 `false`，会按 `expected-startup-seconds` 延迟后传送。

## 投票后准备

投票结束后玩家会进入第二个准备阶段。玩家会获得准备物品，右键可以准备/取消准备。

准备完成后会启动子服务器。

## 传送

传送通过 Velocity / CloudNet 代理完成。只有实际参与投票的玩家会被送入目标服务。
