---
title: 服务端核心
createTime: 2026/05/19 13:27:30
aside: true
outline:
  - 2
  - 3
  - 4
  - 5
permalink: /docs/minecraft/core-choice/
---

# 服务端核心

在本章节中，我们将讨论服务端核心的选取。

## 服务端种类

Minecraft 除了原版服务端外，有各种各样的服务端可供选择，这些服务端或多或少提供了一些优化 / 功能性增强，我们先按照不同分类介绍一下这些服务端。

### 原版服务端

原版服务端是 Minecraft 官方发布的服务端程序。通常情况下，你可以在对应版本的官方发布文章中找到服务端下载链接。

以 [Minecraft 26.2-snapshot-8](https://www.minecraft.net/zh-hans/article/minecraft-26-2-snapshot-8) 为例，你可以在下图所示的位置找到服务端下载入口：

![原版服务端](https://image.talexck.com/resources/core-choice-1.png)

原版服务端适合用于搭建简单的生存服或创造服，也可以配合数据包，和朋友一起游玩一些基于原版机制制作的小游戏。

### 插件服务端

插件服务端是指支持安装 Minecraft 插件的服务端。插件运行在服务端一侧，可以在不要求玩家安装额外客户端内容的情况下，修改原版游戏机制或添加新的功能。

#### Spigot

[Spigot 服务端](https://www.spigotmc.org/)是由 SpigotMC 社区维护、基于 Bukkit / CraftBukkit 生态的 Minecraft 服务端。它在原版服务端的基础上加入了插件支持，并提供了一套较为成熟的插件 API，使服务器可以在兼容原版客户端的情况下扩展更多功能。

Spigot 是许多现代插件服务端的重要基础，很多常见插件最初也是围绕 Bukkit / Spigot API 开发的。

#### Paper

[Paper 服务端](https://papermc.io/software/paper/)是由 [PaperMC 团队](https://github.com/PaperMC)开发、基于 Spigot 服务端的 Minecraft 服务端。它给插件创作者提供了更强大的 API，也为服务器增加了更多功能和性能优化。

Paper 通常适合大多数插件服务器使用，也是目前插件服中较常见、较推荐的选择之一。

#### Based On Paper

这一类服务端通常以 Paper 为基础，在保留 Paper 插件生态兼容性的同时，继续加入额外的性能优化、配置选项或玩法功能。它们一般适合对服务器性能、原版特性修复或自定义玩法有更高需求的服务器。

##### Purpur

[Purpur 服务端](https://purpurmc.org/)是由 PurpurMC 团队开发、基于 Paper 服务端的 Minecraft 服务端。它在 Paper 的基础上加入了大量可配置选项和额外玩法功能，让服主可以更细致地调整服务器行为。

Purpur 通常适合希望保留 Paper 插件兼容性，同时又想对游戏机制进行更多自定义的服务器。

##### Pufferfish

[Pufferfish 服务端](https://github.com/pufferfish-gg/Pufferfish)是由 Pufferfish 团队开发、基于 Paper 服务端的高性能 Minecraft 服务端。它主要面向对性能、稳定性和大型服务器场景有更高要求的服务器，在 Paper 的基础上加入了更多优化和面向大型服务器的功能。

Pufferfish 通常适合玩家数量较多、插件数量较多，或者对服务器性能表现较敏感的服务器。

##### LeavesMC

[Leaves 服务端](https://leavesmc.org/)是由 LeavesMC 团队开发、基于 Paper 服务端的 Minecraft 服务端。它的主要目标是在 Paper 的基础上修复或恢复一些被破坏的原版特性，同时继续提供插件服务端所需的功能。

Leaves 通常适合希望使用插件生态，但又比较在意原版机制一致性的服务器，比如生电服务器。

##### LeafMC

[Leaf 服务端](https://www.leafmc.one/)是一个基于 Paper 的高性能 Minecraft 服务端。它在 Paper 的基础上关注性能、原版行为和稳定性之间的平衡，适合希望获得更好性能表现，同时又不希望过度改变原版体验的服务器。

Leaf 通常适合追求轻量优化、稳定运行和较好原版兼容性的服务器。

#### Folia

[Folia 服务端](https://papermc.io/software/folia/)是由 PaperMC 团队开发、基于 Paper 服务端的新型 Minecraft 服务端。它通过区域化多线程机制，让服务器可以将不同区域的运算分配到多个线程中执行，从而提升特定场景下的性能表现。

不过，Folia 的运行机制和传统 Paper 服务端有较大区别，因此大部分 Paper 插件都不能直接兼容 Folia。它通常更适合大型服务器、技术服，或愿意专门适配 Folia 插件生态的服务器。

### Mod 服务端

Mod 服务端是指支持安装 Minecraft Mod 的服务端。它通常需要使用对应的 Mod Loader，例如 Fabric、Forge、NeoForge 或 Quilt。只有服务端安装了对应的 Mod Loader 后，才能加载相应生态下的服务端 Mod。

在 Modrinth 上查找服务端 Mod 时，可以通过筛选 `Environment = Server` 来查看适用于服务端的 Mod：

![Modrinth](https://image.talexck.com/resources/server-core-2.png)

Mod 服务端适合用于搭建整合包服务器、生电服务器，也可以用于制作一些特殊玩法或小游戏服务器。尤其是在基于原版数据包制作玩法，但又需要额外权限管理、服务器管理或性能优化功能时，Mod 服务端会是一个比较灵活的选择。
