---
title: GameVoting 命令与权限
createTime: 2026/05/26 18:45:00
permalink: /docs/minecraft/gamevoting/commands-permissions/
---

# GameVoting 命令与权限

本文档记录 GameVoting 的命令和权限划分。

## 玩家命令

```text
/vote             // 进入投票
/vote ready       // 游戏准备完成
/vote join <game> // 加入某个已经开始的游戏
```

## 管理员命令

```text
/vote start [duration]      // 启动 duration 时长的游戏
/vote stop                  // 中止本次投票并显示结果
/vote stopgame              // 停止某个游戏
/vote gamelist              // 列出游戏列表
/vote forcestart            // 不经过投票强制启动某游戏
/vote gamestart             // 跳过未准备玩家启动某个游戏
/vote session               // list: 查看投票进程，stop: 关闭并忽略本次投票
/vote reload                // 重载插件
/vote lock <player>         // 锁定玩家，阻止其投票
/vote unlock <player>       // 解锁玩家，允许其投票
/vote holograms create      // 创建投票全息图
/vote holograms list        // 列出投票全息图
/vote holograms remove <id> // 移除投票全息图
```

## 权限节点

`plugin.yml` 中声明：

```yaml
gamevoting.vote:
  default: true

gamevoting.vote.admin:
  default: op

gamevoting.vote.lock:
  default: false

gamevoting.party:
  default: true

gamevoting.party.leader:
  default: true
```

## 推荐权限组

### 普通玩家

- `gamevoting.vote`
- `gamevoting.party`

### 管理员

- `gamevoting.vote.admin`
- `gamevoting.vote.lock`
