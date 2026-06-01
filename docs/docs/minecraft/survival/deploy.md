---
title: 生存服部署
createTime: 2026/05/26 18:30:00
permalink: /docs/minecraft/survival/deploy/
---

# 生存服部署

本文档记录 SHTechCraft 生存服从目录准备到启动运行的部署方式。

## 目录结构

当前服务端目录为 `survival`，关键文件和目录如下：

::: file-tree

- authlib-injector.jar
- config
  - antixray.toml
  - c2me.toml
  - mcbackup.properties
  - servux.json
- core.jar
- eula.txt
- logs
  - latest.log
- mods
  - LuckPerms-Fabric-5.5.42.jar
  - MoogsEndStructures-1.21-2.0.2.jar
  - MoogsMissingVillages-1.21-2.1.0.jar
  - MoogsNetherStructures-1.21-2.0.31.jar
  - MoogsSoaringStructures-1.21-2.0.2.jar
  - MoogsTemplesReimagined-1.21-1.1.0.jar
  - MoogsVoyagerStructures-1.21-5.0.9.jar
  - ScalableLux-0.2.0+fabric.2b63825-all.jar
  - antixray-fabric-1.4.16+26.1.jar
  - blossom-lib-2.5.19+26.1.jar
  - blossom-tpa-2.2.13+26.1.jar
  - carpet-tis-addition-v1.80.0-mc26.1.2.jar
  - fabric-api-0.148.0+26.1.2.jar
  - fabric-carpet-26.1+v260402.jar
  - ferritecore-9.0.0-fabric.jar
  - gugle-carpet-addition-v2.12.2+build.84.jar
  - jei-26.1.2-fabric-29.5.0.28.jar
  - krypton-0.3.0.jar
  - mcbackup-1.0.0.jar
  - moogs_structure_lib-2.0.1-26.1.0-26.1.2.jar
  - packetfixer-fabric-3.3.5-26.1.2.jar
  - sandstone_fast_rails-1.0.0.jar
  - seedguard+26.1-pre-3-1.0.1.jar
  - servux-fabric-26.1.2-0.10.2.jar
  - spark-1.10.172-fabric.jar
  - vanilla-permissions-0.3.5+26.1.jar
  - voicechat-fabric-2.6.16+26.1.2.jar
- ops.json
- server.properties
- start.sh
- whitelist.json
- world

:::

## Java 环境

当前启动脚本使用 Zulu JRE `25.0.3`：

```bash
survival/zulu25.34.17-ca-jre25.0.3-macosx_aarch64/Contents/Home/bin/java
```

检查 Java：

```bash
java -version
```

如果输出不是 Java 25，需要先安装合适的 JDK / JRE。

## 启动脚本

启动脚本核心参数：

```bash
JAR="core.jar"
MIN_RAM="4G"
MAX_RAM="8G"
```

```bash
-XX:+UseG1GC
-XX:+ParallelRefProcEnabled
-XX:MaxGCPauseMillis=200
-XX:+DisableExplicitGC
-XX:+AlwaysPreTouch
-XX:+PerfDisableSharedMem
```

认证使用 `authlib-injector` + MUA：

```bash
-javaagent:/Users/alextang/Downloads/survival/authlib-injector.jar=https://skin.mualliance.ltd/api/union/yggdrasil
```

## 关闭与重启

关闭必须在控制台输入：

```text
stop
```

千万不要直接杀 Java 进程。
