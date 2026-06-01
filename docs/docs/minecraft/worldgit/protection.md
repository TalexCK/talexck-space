---
title: WorldGit 主世界保护
createTime: 2026/05/26 18:50:00
permalink: /docs/minecraft/worldgit/protection/
---

# WorldGit 主世界保护

WorldGit 的主世界保护是方块校园安全的核心。目标是阻止玩家绕过分支流程直接修改主世界。

## 保护范围

WorldGit 会拦截：

- 方块放置。
- 方块破坏。
- 多方块放置。
- Axiom 改块包。
- 水桶 / 岩浆桶。
- 骨粉和施肥。
- 液体流动、蔓延、褪变、生成。
- 活塞推动和拉回。
- 爆炸。
- 展示框、挂画等 Hanging 实体。
- 盔甲架操作。
- 刷怪蛋。
- 部分自然生成和敌对生物生成。
- 从主世界进入地狱和末地。

## bypass 权限

`worldgit.admin.bypass` 可以绕过部分保护。

这个权限只应该给维护人员，不应该给普通建造者或审核员。

~~甚至最好维护人员也别给~~
