---
title: 服务器指令
createTime: 2026/05/22 19:05:32
permalink: /docs/minecraft/server-command/
---

# 服务器指令

## 使用指令

和客户端不同，服务端输入指令不需要输入`/`，直接在终端输入指令即可。

具体各个命令的文档参考 [Minecraft 指令](https://zh.minecraft.wiki/w/%E5%91%BD%E4%BB%A4)。

## 重载服务器

输入 `reload` 并执行会重载服务器。

在原版服务端中，这通常是安全的，服务端会重载所有 `datapacks`，但并不会重载地图等内容。

但是在插件服务端，比如 Paper 中，这通常极不安全，它会

- 重新加载插件

- 重新读取配置

- 重新注册命令

- 重新初始化部分服务端状态

但是通常情况下，Java 插件并非是可热卸载的，直接使用 `reload` 会对服务器造成破坏。

我的观点和 PaperMC 的观点一样：

> [!CAUTION]
>
> 请不要使用 `reload` 重载服务器，若需要重载，请关闭并重启服务器。

## 关闭服务器

输入 `stop` 并执行即可保存地图 + 关闭 Minecraft 服务器。
