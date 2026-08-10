---
title: 哈比列车子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/harpy-express/
---

# 哈比列车子服务器

`harpy_express` 对应“哈比列车”玩法，是 Fabric / Modded Minecraft 子服。
它和大部分 Paper 小游戏不同，模板中包含较多客户端风格的 Mod 与专用玩法 Mod。

## CloudNet 任务

- 任务名：`harpy_express`
- 环境：`MODDED_MINECRAFT_SERVER`
- 模板：`harpy_express/default`
- 起始端口：`50011`
- 最大内存：`6144M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/harpy_express/default`。该子服使用
[Fabric](https://fabricmc.net/) / Modded Minecraft 环境，和多数 Paper 子服不同。

## 服务端配置

- 游戏模式：`adventure`
- 难度：`peaceful`
- 最大人数：`20`
- MOTD：`哈比快车谋杀案`
- 视距：`32`
- 模拟距离：`32`

## 主要 Mod

- `trainmurdermystery`
- `harpymodloader`
- `harpysimpleroles`
- `noellesroles`
- [FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite)
- [LuckPerms-Fabric](https://luckperms.net/)
- [Fabric API](https://modrinth.com/mod/fabric-api)
- [Fabric Language Kotlin](https://modrinth.com/mod/fabric-language-kotlin)
- [fabric-permissions-api](https://modrinth.com/mod/fabric-permissions-api)
- `handcrafted`
- `immersive_furniture`
- `supplementaries`

## 权限与接入

该子服通过 FabricProxy-Lite 接入 Velocity，通过 LuckPerms-Fabric 管理权限。
角色、身份和剧本相关权限应交给哈比列车玩法 Mod，不要直接用 OP 解决。

## 运行流程

1. 大厅投票选中哈比列车。
2. CloudNet 启动 `harpy_express`。
3. Fabric 加载剧情、角色和家具类 Mod。
4. 玩家进入列车地图并开始游戏。
5. 空服后服务自动关闭。

## 模板变体

目录中还存在：

- `harpy_express/default_alpha`
- `harpy_express/default_beta`

这两个目录更像历史或测试模板。正式 task 当前指向 `harpy_express/default`。

## 维护重点

哈比列车的视距和模拟距离都设置为 `32`，明显高于普通小游戏。遇到卡顿时，
先考虑降低玩家数量或检查地图实体，而不是直接继续提高内存。

## 排障部分

- Mod 依赖失败：检查 Fabric API、Fabric Language Kotlin 和前置库。
- 角色异常：检查 `harpysimpleroles`、`noellesroles` 配置。
- 卡顿明显：优先检查实体数量、视距和模拟距离。
