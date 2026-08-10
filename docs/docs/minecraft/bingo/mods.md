---
title: Bingo Mod
createTime: 2026/05/26 18:35:00
permalink: /docs/minecraft/bingo/mods/
---

# Bingo Mod

Bingo 使用 Fabric Mod 生态。这里按职责说明当前 Mod。

## 玩法核心

- [Yet Another Bingo](https://modrinth.com/mod/yet-another-minecraft-bingo)：Bingo 主玩法。
- `bingo-stats`：本地统计扩展。
- `spectators-generate-loot`：旁观者相关掉落 / 战利品处理。

玩法核心更新时必须确认 Minecraft 版本为 `1.21.11`。

## 权限与管理

- [LuckPerms](https://luckperms.net/)
- [fabric-permissions-api](https://modrinth.com/mod/fabric-permissions-api)
- [vanilla-permissions](https://modrinth.com/mod/vanilla-permissions)
- [Vanish](https://modrinth.com/mod/vanish)

这组 Mod 用于普通玩家、裁判和维护人员权限划分。

## 玩家体验

- [Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat)
- `coordshud`
- [JEI](https://modrinth.com/mod/jei)

Bingo 中语音非常重要，尤其是组队或活动解说场景。

## 性能与依赖

- [Fabric API](https://modrinth.com/mod/fabric-api)
- [C2ME](https://modrinth.com/mod/c2me-fabric)
- [Lithium](https://modrinth.com/mod/lithium)
- [FerriteCore](https://modrinth.com/mod/ferrite-core)
- [Cloth Config](https://modrinth.com/mod/cloth-config)
- [YetAnotherConfigLib](https://modrinth.com/mod/yacl)
- [YOSBR](https://modrinth.com/mod/yosbr)

这些 Mod 保证服务端能承受跑图和多人探索。

## 更新策略

1. 先确认 Yet Another Bingo 是否支持目标 Minecraft 版本。
2. 再更新 Fabric API 和前置依赖。
3. 然后更新性能 Mod。
4. 最后做一次完整开局测试。

只启动成功不代表可用。Bingo 至少要测试开局、物品判定、统计和结束流程。
