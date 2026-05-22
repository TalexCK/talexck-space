---
title: 运行服务器核心
createTime: 2026/05/22 16:44:11
permalink: /docs/minecraft/run-server/
---

# 运行服务器核心

当我们做完[准备工作](./platform.md)后，我们就可以开始运行 Minecraft 服务器，此处我们以 `paper-26.1.2` 为例。

## 启动 Minecraft

将服务器核心放入一个文件夹中，然后将如下内容写成脚本，置于核心同级目录下，双击运行或者`./start.sh`即可运行服务器核心。

::: code-tabs

@tab MacOS/Linux

```bash
#!/usr/bin/env bash

# Java Home
JAVA_HOME=""

# JVM Flags
FLAGS="-XX:+UseG1GC -XX:+ParallelRefProcEnabled"

# Memory
MIN_RAM="4G"
MAX_RAM="8G"

# Server Core
CORE_NAME="paper-26.1.2.jar"

# Enable nogui
IF_NOGUI=true

# =========================

if [ -n "$JAVA_HOME" ]; then
    JAVA="$JAVA_HOME/bin/java"
else
    JAVA="java"
fi

COMMAND="\"$JAVA\" $FLAGS -Xms$MIN_RAM -Xmx$MAX_RAM -jar \"$CORE_NAME\""

if [ "$IF_NOGUI" = true ]; then
    COMMAND="$COMMAND nogui"
fi

echo "Starting Minecraft Server..."
echo "$COMMAND"

eval "$COMMAND"
```

@tab Windows

```bat
# Java Home
$JAVA_HOME = ""

# JVM Flags
$Flags = "-XX:+UseG1GC -XX:+ParallelRefProcEnabled"

# Memory
$MinRam = "4G"
$MaxRam = "8G"

# Server Core
$CoreName = "paper-26.1.2.jar"

# Enable nogui
$IfNogui = $true

# =========================

if ($JAVA_HOME -ne "") {
    $Java = Join-Path $JAVA_HOME "bin\java.exe"
} else {
    $Java = "java"
}

$Command = "`"$Java`" $Flags -Xms$MinRam -Xmx$MaxRam -jar `"$CoreName`""

if ($IfNogui) {
    $Command += " nogui"
}

Write-Host "Starting Minecraft Server..."
Write-Host $Command

Invoke-Expression $Command
```

:::

我解释一下我们需要填写的项：

1. `JAVA_HOME`：你安装的对应 Java 版本的 Home 目录，比如`/Library/Java/JavaVirtualMachines/zulu25.32.21-ca-jdk25.0.2-macosx_aarch64/zulu-25.jdk/Contents/Home`
2. `Flags`：这个是 JVM 启动使用的 Flag，有一定的优化作用。
3. `MinRam / MaxRam`：你提供给 Minecraft 服务器最小 / 最大的内存。
4. `CoreName`：你下载的核心名称。
5. `IfNogui`：是否不现实服务端自带的 GUI，建议启用，因为命令行足够了。

## 第一次启动

第一次启动大概率不会成功启动服务器，我们会碰到这样的报错：

```bash
[18:36:52 WARN]: Failed to load eula.txt
[18:36:52 INFO]: You need to agree to the EULA in order to run the server. Go to eula.txt for more info.
```

此时我们需要打开 `eula.txt` 并把文件中的 `eula=false` 改成 `eula=true`，然后再次运行核心，我们会发现一个启动成功的 Minecraft 服务器，现在的文件目录应该是这样的：

::: file-tree

- banned-ips.json
- banned-players.json
- bukkit.yml
- cache
  - mojang_26.1.2.jar
- commands.yml
- config
  - paper-global.yml
  - paper-world-defaults.yml
- eula.txt
- help.yml
- libraries
  - …
- logs
  - 2026-05-22-1.log.gz
  - latest.log
- ops.json
- paper-26.1.2.jar
- permissions.yml
- plugins
  - bStats
    - config.yml
  - spark
    - config.json
    - tmp
      - about.txt
- server.properties
- spigot.yml
- start.sh
- usercache.json
- version_history.json
- versions
  - 26.1.2
    - paper-26.1.2.jar
- whitelist.json
- world
  - …

:::

此时使用 Minecraft 26.1.2 就能进入服务器 ( ip: 127.0.0.1:25565 ) 了。
