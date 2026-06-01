---
title: 生存服配置
createTime: 2026/05/26 18:30:00
permalink: /docs/minecraft/survival/config/
---

# 生存服配置

本文档记录生存服的 `server.properties` 与关键 Mod 配置。

## `server.properties`

当前关键配置如下：

```properties
server-port=25566
motd=SHTechCraft 26.1.2...
online-mode=true
gamemode=survival
difficulty=hard
max-players=20
view-distance=16
simulation-distance=10
spawn-protection=0
white-list=false
enforce-whitelist=false
enable-rcon=false
enable-query=false
allow-flight=false
```

## 认证配置

`online-mode=true` 表示服务端仍走在线认证流程。启动脚本通过`authlib-injector` 把认证源指向 MUA。

## 视距与模拟距离

当前配置：

```properties
view-distance=16
simulation-distance=10
```

## 出生点保护

当前：

```properties
spawn-protection=0
```

## 备份配置

备份由 `mcbackup` 负责，配置位于：

```text
config/mcbackup.properties
```

## Carpet 配置

生存服使用 Carpet、Carpet TIS Addition 和 Gugle Carpet Addition。

### 已安装 Carpet 系列 Mod

- [Carpet Mod](https://github.com/gnembon/fabric-carpet)：`fabric-carpet-26.1+v260402.jar`
- [Carpet TIS Addition](https://carpet.tis.world/)：`carpet-tis-addition-v1.80.0-mc26.1.2.jar`
- [Gugle Carpet Addition](https://gca.dubhe.dev/)：`gugle-carpet-addition-v2.12.2+build.84.jar`

### 当前持久化规则

```text
commandPlayer 0
xpNoCooldown true
openFakePlayerInventory true
openFakePlayerEnderChest true
fakePlayerResident true
fakePlayerReloadAction true
fakePlayerSuffixName _fake
fakePlayerAutoReplenishment true
```

这些规则分为两类：基础 Carpet 规则和 Gugle Carpet Addition 假人增强规则。

### Carpet 基础规则

| 规则            | 当前值 | 说明                                                              |
| --------------- | ------ | ----------------------------------------------------------------- |
| `commandPlayer` | `0`    | 开放 `/player` 命令到权限等级 `0`，普通玩家也可以召唤和控制假人。 |
| `xpNoCooldown`  | `true` | 玩家吸收经验球无冷却，经验农场、修补装备和经验收集会更顺滑。      |

### Gugle Carpet Addition 规则

| 规则                          | 当前值  | 说明                                                                    |
| ----------------------------- | ------- | ----------------------------------------------------------------------- |
| `openFakePlayerInventory`     | `true`  | 允许打开假人背包，便于给假人补工具、补材料或检查挂机状态。              |
| `openFakePlayerEnderChest`    | `true`  | 允许打开假人末影箱，适合长期工程中管理假人物资。                        |
| `fakePlayerResident`          | `true`  | 服务器关闭或存档退出时保留假人，下次启动后可以继续恢复。                |
| `fakePlayerReloadAction`      | `true`  | 保存假人的动作状态，重启后假人可以继续执行原有动作。                    |
| `fakePlayerSuffixName`        | `_fake` | 给假人名称追加 `_fake` 后缀，方便从玩家列表和聊天记录里区分真人与假人。 |
| `fakePlayerAutoReplenishment` | `true`  | 启用假人自动补货，适合消耗型挂机任务。                                  |
