---
title: 方块竞速子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/blockracing/
---

# 方块竞速子服务器

`BlockRacing` 是方块竞速子服。这个子服分配了较大的内存，适合放在投票系统中
作为偏大型的小游戏处理。

## CloudNet 任务

- 任务名：`BlockRacing`
- 环境：`MINECRAFT_SERVER`
- 模板：`BlockRacing/default`
- 起始端口：`60003`
- 最大内存：`16384M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/BlockRacing/default`。这是 CloudNet 创建临时服务时
使用的模板目录。

该子服使用 [Paper](https://papermc.io/software/paper/) 环境，内存配置高于多数
小游戏，因此更适合作为单实例启动，而不是同时开很多局。

## 服务端配置

- 游戏模式：`survival`
- 难度：`easy`
- 最大人数：`50`
- 视距：`10`
- 模拟距离：`10`

## 主要插件

- `BlockRacing`
- `MiniGamePlugin`
- [LuckPerms](https://luckperms.net/)
- [ViaVersion](https://viaversion.com/)
- `AntiPopup`
- `XaeroForceDisabler`
- `minimap-spigot`

## 权限与接入

方块竞速需要保证玩家进入后能被玩法插件接管，不应该开放破坏模板地图的管理权限。

接入 GameVoting 时，应把 `cloudnet-task` 指向 `BlockRacing`，并根据实际服务端版本
设置 `version`。

## 运行流程

1. 大厅投票选中方块竞速。
2. GameVoting 请求 CloudNet 启动 `BlockRacing`。
3. CloudNet 按模板创建服务，分配端口。
4. 子服完成加载后，玩家被传送进入。
5. 游戏结束后自动关服。

## 维护重点

`BlockRacing` 的内存配置明显高于其他 Paper 小游戏。排查资源占用时，需要把它和
普通 `4096M` 子服分开看，避免误以为是 CloudNet 全局配置异常。

## 排障部分

- 内存占用高：先确认是否同时启动了多局方块竞速。
- 玩家进服后无玩法：检查 `BlockRacing` 插件是否正常加载。
- 投票菜单不显示：检查 GameVoting 的人数和版本限制。
