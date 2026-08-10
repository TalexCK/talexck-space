---
title: 方块校园配置
createTime: 2026/05/26 18:40:00
permalink: /docs/minecraft/school/config/
---

# 方块校园配置

方块校园配置由 Paper、WorldGit、BlueMap、WorldEdit 和 Multiverse 共同组成。
其中最关键的是 WorldGit 主世界保护配置。

## `server.properties`

关键配置：

```properties
server-port=25565
motd=Building SHTech...
online-mode=true
gamemode=creative
difficulty=peaceful
max-players=20
view-distance=16
simulation-distance=10
spawn-protection=0
white-list=false
```

这是一个创造建造服，所以默认游戏模式为 `creative`，难度为 `peaceful`。

## WorldGit 配置

WorldGit 的核心配置应重点确认：

```yaml
main-world: "world"
max-region-size-x: 50
max-region-size-z: 50
use-full-height: false
max-active-branches: 2
```

`main-world` 必须指向正式校园主世界。写错会导致保护和分支都作用在错误世界上。

## 区域限制

当前单个分支默认限制为 `50 x 50`。这是为了避免一次复制和合并过大区域。

如果确实需要大范围施工，建议：

1. 拆分成多个区域。
2. 分批审核。
3. 每次 merge 前备份。

不要轻易把区域限制调得很大。

## 多世界配置

当前存在：

- `world`
- `world2`
- `world_nether`
- `world_the_end`

WorldGit 分支世界会由 Multiverse-Core 创建和管理。不要手动删除正在使用的 `wg_*`
世界目录。

## BlueMap 配置

BlueMap 用于查看建筑进度。它不参与 WorldGit 合并，但可以帮助审核员判断空间关系。

如果 BlueMap 页面打不开，先查 BlueMap 插件日志，再查端口或反向代理配置。

## 配置变更流程

1. 停服或确保没有玩家正在 merge。
2. 备份 `plugins/WorldGit/config.yml`。
3. 修改配置。
4. 重启服务器。
5. 创建测试分支验证。
