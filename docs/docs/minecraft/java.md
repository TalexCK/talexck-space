---
title: Java 选择
createTime: 2026/05/22 15:17:06
permalink: /docs/minecraft/java/
---

# Java 选择

在[选择好 Minecraft 服务端](./core-choice.md)后，接下来该使用服务端对应的 Java 了。

## Java 版本

不同 Minecraft 版本对 Java 版本有不同要求。开服前建议先确认服务端版本对应的 Java 版本，否则可能会出现无法启动、类版本不兼容等问题。

| Minecraft 版本 | 推荐 Java 版本 |
| --- | --- |
| 26.1 及更新版本 | Java 25 |
| 1.20.5 ~ 1.21.x | Java 21 |
| 1.18 ~ 1.20.4 | Java 17 |
| 1.17 ~ 1.17.1 | Java 16 |
| 1.12 ~ 1.16.5 | Java 8 |
| 1.11 及更早版本 | Java 8 或更旧版本 |

> [!WARNING]
> 不要简单地认为 Java 版本越新越好。 
> 一些旧版本 Minecraft、旧版 Forge、旧版插件或旧版 Mod，可能无法在过新的 Java 上正常运行。

## Java 发行版

JDK 发行版可以理解为“不同厂商打包发布的 Java”。对于 Minecraft 服务器来说，只要版本选对，大多数常见 JDK 发行版都可以正常使用。除了 OpenJDK 外，我们还能找到一些其他的 Java 发行版：

| 发行版 | 说明 |
| :---: | :--- |
| Temurin | 由 Eclipse Adoptium 提供的 OpenJDK 发行版，开源、免费，版本覆盖完整，社区使用非常广泛。 |
| Zulu JDK | 由 Azul 提供的 OpenJDK 发行版，长期维护做得比较好，也经常用于服务器环境。 |
| Microsoft Build of OpenJDK | 由 Microsoft 提供的 OpenJDK 发行版，在 Windows、Azure 和开发环境中使用比较方便。 |
| Oracle JDK | 由 Oracle 提供的 JDK 发行版，兼容性没有问题，但授权和长期更新策略相对更需要注意。 |

个人喜欢使用 Zulu JDK (JRE) 运行 Minecraft 服务器 (和 Minecraft )，但这并非重点。大家可以选择自己喜欢的 Java 发行版。