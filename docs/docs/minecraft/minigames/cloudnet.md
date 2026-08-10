---
title: CloudNet 配置
createTime: 2026/05/26 15:47:08
permalink: /docs/minecraft/minigames/cloudnet/
---

# CloudNet 配置

本文档解释 CloudNet 的配置以及相关组件的配置，以及子服务器如何在 CloudNet 中进行配置。

Minigames 群组服使用 [CloudNet](https://cloudnetservice.eu/) `v4.0.0-RC16`
管理代理、大厅和所有小游戏
子服务器。它的职责不是替代 Minecraft 服务端，而是负责按需创建服务、复制模板、
分配端口、接入 Velocity，并在游戏结束后清理临时服务。

## 目录结构

当前 CloudNet 根目录大致由这些部分组成：

- `config.json`：CloudNet 节点配置。
- `launcher.cnl`：CloudNet launcher 配置。
- `local/groups`：服务组配置。
- `local/tasks`：具体服务任务配置。
- `local/templates`：各任务的服务端模板。
- `modules`：CloudNet 模块。
- `plugins`：CloudNet 侧插件。
- `mysql_data`：本地 MySQL 数据目录。
- `network/frpc` 与 `frpc.ini`：公网转发配置。
- `start.sh`：本地启动脚本。

CloudNet 的核心维护对象是 `task` 和 `template`。

```text
task 负责说明“怎么启动一个服务”
template 负责提供“启动出来的服务包含哪些文件”
```

## 节点配置

`config.json` 中当前节点名为 `Node-1`，监听地址是：

```json
{
  "host": "127.0.0.1",
  "port": 14277
}
```

服务启动时使用：

```json
{
  "hostAddress": "0.0.0.0",
  "jvmCommand": "java",
  "maxMemory": 32768,
  "database_provider": "mysql"
}
```

也就是说，CloudNet 自身最多按 `32768M` 规划服务内存，并使用 MySQL 作为数据库
Provider。

## 启动脚本

`start.sh` 做了三件关键事情：

1. 如果当前不在 Nix 环境中，先进入 `env_config` 提供的 Nix shell。
2. 自动启动本地 MySQL，并创建 CloudNet、LuckPerms、GameVoting 等数据库。
3. 使用 `screen` 或 `tmux` 启动 CloudNet，同时在后台启动 `frpc`。

脚本会创建这些数据库：

- `cloudnet`
- `luckperms`
- `gamevoting`
- `gamelobby`
- `bedwars`
- `minigame`
- `hungergames`
- `experiencecore`

> [!CAUTION]
> 不要把数据库目录当作普通缓存删除。
>
> `mysql_data` 里保存了 LuckPerms、GameVoting 和部分小游戏插件的数据。
> 如果需要重建，先确认已有数据是否可以丢弃。

## Velocity 代理

`Proxy` 是常驻服务，使用 [Velocity](https://papermc.io/software/velocity/)。
任务配置中：

- 环境：`VELOCITY`
- 起始端口：`25565`
- 最小实例数：`1`
- 最大内存：`1024M`

代理额外使用两个 JVM 参数：

```text
-Djdk.net.hosts.file=my_hosts.txt
-javaagent:authlib-injector.jar=https://skin.mualliance.ltd/api/union/yggdrasil
```

这说明玩家统一从 Velocity 进入服务器，并通过 MUA Yggdrasil 完成登录验证。

## 大厅服务

`Lobby` 也是常驻服务：

- 环境：`MINECRAFT_SERVER`
- 起始端口：`44955`
- 最小实例数：`1`
- 最大内存：`3192M`
- 额外 JVM 参数：`-Xms2048M`、`-Xmx2048M`

大厅里运行 [GameVoting](../gamevoting/README.md)，玩家在这里投票选择下一场游戏。

## 子服务器任务

大多数小游戏任务都是：

- `minServiceCount=0`
- `autoDeleteOnStop=true`
- `staticServices=false`

这表示它们不是常驻服，而是由投票系统或管理员命令按需启动。游戏结束后服务会停止，
运行时目录也会被 CloudNet 清理。

## 任务与模板

每个子服都至少有一个任务文件和一个模板目录：

```text
local/tasks/<任务名>.json
local/templates/<任务名>/default
```

例如 `skywars`：

```text
local/tasks/skywars.json
local/templates/skywars/default
```

新增小游戏时，通常需要做这些事：

1. 准备服务端模板。
2. 新增 CloudNet task。
3. 确认 task 的环境类型是 Paper 还是 Fabric。
4. 配置内存、起始端口和模板路径。
5. 在 GameVoting 的 `games.yml` 中加入对应 `cloudnet-task`。
6. 在大厅中测试投票、启动、传送和自动关服。

## 公网转发

`frpc.ini` 中把本机 `25565` 转发到多个公网入口。当前存在三条 Minecraft 转发：

- `remote_port=25567`
- `remote_port=25568`
- `remote_port=28105`

这些入口都指向本地 Velocity 代理，而不是直接指向某个子服务器。

> [!NOTE]
> 如果玩家能进代理但不能进小游戏，优先查 CloudNet / GameVoting / 子服日志。
>
> 如果玩家完全无法连接服务器，再查 `frpc` 和公网入口。

## 维护建议

- 修改 `local/tasks` 后，需要确认 CloudNet 是否重新读取配置。
- 修改 `local/templates` 后，只影响之后新启动的服务，不会自动改已经运行的实例。
- Paper 子服通常看 `plugins`，Fabric 子服通常看 `mods`。
- 不要把临时运行目录中的改动当成模板改动，真正要保留的内容应写回
  `local/templates`。
- 需要排查启动失败时，先看 CloudNet 控制台，再看对应子服的 `logs/latest.log`。
