---
title: 方块躲猫猫子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/hideandseek/
---

# 方块躲猫猫子服务器

`hideandseek` 对应方块躲猫猫玩法，是 Paper 子服。

## CloudNet 任务

- 任务名：`hideandseek`
- 环境：`MINECRAFT_SERVER`
- 模板：`hideandseek/default`
- 起始端口：`60015`
- 最大内存：`4096M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/hideandseek/default`。该子服使用
[Paper](https://papermc.io/software/paper/) `1.20.4`。

## 服务端配置

- 核心版本：Paper `1.20.4`
- 游戏模式：`survival`
- 难度：`easy`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`

## 主要插件

- [LuckPerms](https://luckperms.net/)
- [SkinsRestorer](https://skinsrestorer.net/)
- [ViaVersion](https://viaversion.com/)
- `AntiPopup`
- `XaeroForceDisabler`
- `minimap-spigot`

## 权限与接入

躲猫猫玩法对皮肤、伪装和玩家显示状态比较敏感。普通玩家只应拥有参与权限，
伪装管理和强制结束等命令留给管理员。

## 运行流程

1. 大厅投票选中方块躲猫猫。
2. CloudNet 启动 `hideandseek`。
3. 子服加载地图、皮肤和伪装相关插件。
4. 玩家进入等待区并分配角色。
5. 游戏结束后自动关服。

## 维护重点

这是版本较旧的子服，核心仍在 `1.20.4`。如果大厅玩家使用较新客户端进入，
需要依赖 ViaVersion；如果出现皮肤或伪装异常，优先检查 `SkinsRestorer`。

## 排障部分

- 皮肤异常：检查 SkinsRestorer。
- 玩家版本不兼容：检查 ViaVersion 和 GameVoting 版本限制。
- 伪装失败：检查玩法插件与地图数据。
