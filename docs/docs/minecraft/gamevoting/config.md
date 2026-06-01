---
title: GameVoting 配置
createTime: 2026/05/26 18:45:00
permalink: /docs/minecraft/gamevoting/config/
---

# GameVoting 配置

GameVoting 配置分为 `config.yml` 和 `games.yml`。前者控制插件行为，后者控制投票菜单和 CloudNet task 映射。

## `config.yml`

关键配置：

```yaml
debug: false
language: "en-US"
proxy-service-name: "Proxy-1"

// 是否启用大厅出生点
spawnpoint:
  enable: false
  x: 0
  y: 64
  z: 0

// 游戏自动无人停止
idle-shutdown:
  enabled: true
  idle-minutes: 10
  check-interval-seconds: 60
  excluded-task-keywords:
    - "lobby"
    - "proxy"

// 使用的数据库
database:
  enabled: false
  type: "postgresql"
  host: "localhost"
  port: 5432
  database: "gamevoting"
  username: "postgres"
  password: "password"

// 全息图列表
holograms:
  locations: []
```

## 语言

支持：

- `en-US`
- `en-UK`
- `zh-CN`

语言文件位于 `lang` 目录。修改后执行：

```text
/vote reload
```

## 代理服务名

`proxy-service-name` 必须是 CloudNet 中实际 Velocity 服务名，例如：

```yaml
proxy-service-name: "Proxy-1"
```

如果写错，常见现象是“投票成功、子服也启动了，但玩家没有被传送”。

## 自动关服

`idle-shutdown` 用于空服自动关闭。默认排除包含 `lobby` 和 `proxy` 的服务，避免关闭常驻服务。

新增常驻服务时，必须把关键字加入：

```yaml
excluded-task-keywords:
  - "lobby"
  - "proxy"
  - "your-service"
```

## 数据库

支持：

- PostgreSQL
- MySQL
- MongoDB
- 不启用数据库

如果要保存投票历史和全息图排行，应启用数据库。

## `games.yml`

示例：

```yaml
games:
  - id: "bedwars"
    name: "&e&lBedWars"
    description:
      - "&7Classic bed defense game"
      - "&7Protect your bed and destroy enemy beds"
    material: "RED_BED"
    custom-model-data: 0
    cloudnet-task: "BedWars"
    version: "1.21.1"
    wait-for-bridge-ready: true
    expected-startup-seconds: 120
    min_player: 1
    max_player: 50
```

字段说明：

- `id`：唯一 ID。
- `name`：菜单显示名。
- `description`：菜单描述。
- `material`：菜单图标材质。
- `custom-model-data`：资源包模型数据。
- `cloudnet-task`：CloudNet task 名。
- `version`：支持的客户端版本。
- `wait-for-bridge-ready`：是否使用启动后自动传送。
- `expected-startup-seconds`：保守等待时间。
- `min_player` / `max_player`：人数限制。

## 配置变更流程

- 修改 `games.yml` 或 `config.yml`。
- 执行 `/vote reload`。
- 手动 `/vote start` 测试。
- 检查菜单、启动、传送和关服。
