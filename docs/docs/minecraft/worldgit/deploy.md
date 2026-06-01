---
title: WorldGit 构建与部署
createTime: 2026/05/26 18:50:00
permalink: /docs/minecraft/worldgit/deploy/
---

# WorldGit 构建与部署

WorldGit 是方块校园的核心插件。部署时不能只把 jar 放进 `plugins`，还要确认
WorldEdit、Multiverse、主世界名、权限和备份策略都正确。

## 目标环境

- 服务端：[Paper](https://papermc.io/software/paper/) `1.21.11`
- Java：`21`
- WorldGit：`1.1.0`
- 必需插件：[WorldEdit](https://enginehub.org/worldedit/)、[Multiverse-Core](https://github.com/Multiverse/Multiverse-Core)
- 可选插件：[LuckPerms](https://luckperms.net/)、[ProtocolLib](https://www.spigotmc.org/resources/protocollib.1997/)、[BlueMap](https://bluemap.bluecolored.de/)

## 构建

WorldGit 使用 Gradle：

```bash
./gradlew build
```

输出：

```text
build/libs/worldgit-*.jar
```

构建流程还会构建 `web-ui`，并把 Web 页面放入插件资源。

## 安装

1. 安装 Paper `1.21.11`。
2. 安装 WorldEdit。
3. 安装 Multiverse-Core。
4. 可选安装 LuckPerms、ProtocolLib、BlueMap。
5. 放入 `worldgit-*.jar`。
6. 首次启动生成配置。
7. 修改 `plugins/WorldGit/config.yml`。
8. 重启服务器。

## Axiom 支持

如果服务器安装 [Axiom](https://axiom.moulberry.com/)，建议同时安装 ProtocolLib。

原因是 Axiom 可能通过自定义包修改方块，ProtocolLib 可以帮助 WorldGit 更完整地拦截这类主世界改动。
