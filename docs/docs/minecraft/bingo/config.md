---
title: Bingo 配置
createTime: 2026/05/26 18:35:00
permalink: /docs/minecraft/bingo/config/
---

# Bingo 配置

Bingo 的配置重点是玩家数量、飞行检测、视距、模拟距离和性能 Mod。活动服配置要服务于
“顺利完成一局”，不是追求长期地图一致性。

## `server.properties`

关键配置：

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

## 最大人数

当前：

```properties
max-players=16
```

Bingo 活动人数不建议无脑提高。人数越多，跑图、区块生成和物品检查压力越高。

如果要提高人数，优先测试：

- 开局传送是否稳定。
- 区块生成是否卡顿。
- Bingo 统计是否正常。
- 语音是否正常。

## `allow-flight`

当前：

```properties
allow-flight=true
```

这个配置不建议关闭。Bingo 中可能存在旁观、传送、特殊移动或短时间非普通状态，
关闭后容易误踢玩家。

## 视距与模拟距离

当前：

```properties
view-distance=16
simulation-distance=5
```

视距较高是为了玩家探索体验，模拟距离较低是为了控制服务端 tick 压力。

如果 TPS 压力较大，优先降低 `view-distance`，不要先提高内存。

## Vanish 配置

`config/vanish.hocon` 用于隐藏裁判、观察者或维护人员。活动时如果需要裁判隐身，
应通过权限和 Vanish 配置实现，而不是让裁判进入旁观后暴露在玩家列表里。

## 性能配置

关键文件：

- `config/c2me.toml`
- `config/lithium.properties`
- `config/ferritecore.mixin.properties`

这三个配置主要影响区块、实体和内存。Bingo 跑图压力大，更新这些 Mod 前应进行
一次模拟开赛测试。

## 状态显示

`motd` 当前包含：

```text
[PRE-GAME] Yet Another Bingo: Ultimate 2.9.6
```

如果活动中要显示不同阶段，可以修改 MOTD，但建议保留 Bingo 版本信息，方便排障。
