---
title: WorldGit 配置
createTime: 2026/05/26 18:50:00
permalink: /docs/minecraft/worldgit/config/
---

# WorldGit 配置

WorldGit 配置决定主世界保护、分支大小、备份、Web 和 AI 能力。配置错误可能直接影响
主世界安全。

## 基础配置

```yaml
display-prefix: "WorldGit"
main-world: "world"
max-region-size-x: 50
max-region-size-z: 50
use-full-height: false
max-active-branches: 2
max-queue-entries: 1
```

## 主世界

```yaml
main-world: "world"
```

WorldGit 会保护这个世界，并从这个世界创建分支。

## 分支大小限制

```yaml
max-region-size-x: 50
max-region-size-z: 50
use-full-height: false
```

限制单个分支区域，避免一次复制和合并太大。

`use-full-height=false` 表示不默认复制整个高度范围，有助于控制分支体积。

## 分支数量限制

```yaml
max-active-branches: 2
max-queue-entries: 1
```

这防止单个玩家创建太多未完成分支。

## 备份配置

```yaml
backup:
  enabled: true
  interval-minutes: 30
  max-backups: 10
  directory: "backups"
```

WorldGit 默认每 30 分钟备份，并保留 10 份。

大规模 merge 前建议手动备份：

```text
/wg admin backup
```

## 分支世界配置

```yaml
branch-world:
  directory: "branch"
  prefix: "wg_"
```

分支世界会放在 `branch` 目录，世界名前缀为 `wg_`。

不要手动删除仍在数据库中活跃的分支世界。

## Web 配置

```yaml
web:
  enabled: true
  host: "0.0.0.0"
  port: 80
  static-directory: "web"
  recent-limit: 20
  bluemap-url: ""
  pointcloud-url: ""
```

Web 用于查看 WorldGit 状态、登录和 AI 相关功能。

## AI 配置

```yaml
ai:
  enabled: true
  provider: "openai"
  model: "gpt-4.1-mini"
  base-url: "https://api.openai.com/v1"
  api-key: ""
  max-box-blocks: 512
  max-total-block-changes: 4096
```

`api-key` 只应保存在服务端，不应写入公开仓库。

`max-box-blocks` 和 `max-total-block-changes` 是安全阈值，不建议随意调大。

AI 功能现在还非常不好用，不建议开启。
