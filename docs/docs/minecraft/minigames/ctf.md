---
title: Capture the Flag 子服务器
createTime: 2026/05/26 18:00:00
permalink: /docs/minecraft/minigames/ctf/
---

# Capture the Flag 子服务器

`ctf` 是 Capture the Flag 子服。

## CloudNet 任务

- 任务名：`ctf`
- 环境：`MINECRAFT_SERVER`
- 模板：`ctf/default`
- 起始端口：`61000`
- 最大内存：`8192M`
- 最小实例数：`0`
- 停止后自动删除运行目录：是

## 部署部分

部署文件位于 `local/templates/ctf/default`。该子服使用
[Paper](https://papermc.io/software/paper/) 环境。

## 服务端配置

- 游戏模式：`survival`
- 难度：`hard`
- 最大人数：`20`
- 视距：`10`
- 模拟距离：`10`

## 主要插件

- [LuckPerms](https://luckperms.net/)
- [ViaVersion](https://viaversion.com/)
- `AntiPopup`
- `XaeroForceDisabler`
- `minimap-spigot`

## 权限与接入

CTF 应只开放普通玩家参与权限。队伍分配、旗帜点、地图重置和强制结束等权限应由
玩法插件或管理员控制。

## 运行流程

1. 大厅投票选中 Capture the Flag。
2. CloudNet 启动 `ctf` task。
3. 子服加载地图、队伍和旗帜相关配置。
4. 玩家进入等待区并分队。
5. 游戏结束后服务自动关闭。

## 维护重点

`ctf` 分配了 `8192M` 内存，通常说明地图或玩法压力高于普通小服。排查启动失败时，
先看模板内插件是否缺少专用 CTF 玩法插件或配置。

## 排障部分

- 队伍无法分配：检查玩法插件配置。
- 地图状态不重置：检查模板地图是否被运行目录改动污染。
- 内存异常：确认是否同时开了多局 CTF。
