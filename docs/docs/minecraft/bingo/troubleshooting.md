---
title: Bingo 排障
createTime: 2026/05/26 18:35:00
permalink: /docs/minecraft/bingo/troubleshooting/
---

# Bingo 排障

## 启动失败

优先检查：

1. Java 路径是否正确。
2. Fabric Loader 是否匹配 `1.21.11`。
3. `bingo` Mod 是否匹配 Minecraft 版本。
4. 前置依赖是否缺失。

## 玩家掉线

如果玩家被踢出，检查：

- `allow-flight=true` 是否保留。
- 玩家网络是否稳定。
- 服务端是否 TPS 过低。
- 是否有代理或认证问题。

## TPS 低

Bingo TPS 低常见原因：

- 多人同时跑图生成新区块。
- 视距过高。
- 世界生成压力。
- 性能 Mod 配置不合适。

处理顺序：

1. 看日志是否有 `Can't keep up!`。
2. 降低视距。
3. 确认 C2ME / Lithium / FerriteCore 正常加载。
4. 降低活动人数或分批开局。

## 统计异常

如果 `bingo-stats` 结果异常：

1. 保存当前日志。
2. 检查统计 Mod 是否报错。
3. 不要直接删除统计文件。
4. 如需重赛，先备份现场。

## 语音异常

检查：

- `voicechat` 是否加载。
- 客户端是否安装 Simple Voice Chat。
- 服务器 UDP 端口是否放行。
- 权限是否允许玩家使用语音。
