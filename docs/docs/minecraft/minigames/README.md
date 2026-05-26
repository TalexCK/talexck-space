---
title: SHTechCraft Minigames 文档
createTime: 2026/05/19 13:27:30
permalink: /docs/minecraft/minigames/
---

# SHTechCraft Minigames 文档

Minigames 服务器是基于 [CloudNet](https://cloudnetservice.eu) [v4.0.0-RC16](https://github.com/CloudNetService/CloudNet/releases/tag/4.0.0-RC16) 构建的群组服务器。目前服务器支持以下游戏：

- 方块竞速 (Minecraft 26.1.2)
- 起床战争 (旧版)
- 起床战争 (新版)
- 空岛战争
- 蜂蜜导弹战争
- 幸运之柱
- 逃离疯子2
- 背刺
- Bleps
- 哈比列车
- 猫抓老鼠
- GSkard
- 方块躲猫猫
- 小游戏合集
- 超级像素派对
- Build Battle
- 饥饿游戏
- 雪地乱斗2
- Capture the Flag

服务器大厅拥有投票系统，使用 [GameVoting](../gamevoting/README.md) 插件实现，实现在群组服务器下动态启动/关闭游戏子服务器。

服务器常驻 [Velocity](https://papermc.io/software/velocity/) 代理服务器和大厅服务器，所有子服务器通过 Velocity 代理服务器统一连接，使用 [MUA](https://skin.mualliance.ltd) 验证登录。
