---
title: 方块校园排障
createTime: 2026/05/26 18:40:00
permalink: /docs/minecraft/school/troubleshooting/
---

# 方块校园排障

## WorldGit 未加载

检查：

1. Paper 版本。
2. WorldEdit 是否加载。
3. Multiverse-Core 是否加载。
4. WorldGit 是否缺依赖。

## 无法创建分支

可能原因：

- 没有选区。
- 选区超过大小限制。
- 玩家不在主世界。
- 权限不足。
- Multiverse 无法创建世界。

## 主世界保护失效

检查：

- 玩家是否 OP。
- 玩家是否有 `worldgit.admin.bypass`。
- WorldGit 是否正常启用。
- Axiom 是否需要 ProtocolLib 才能拦截。

## 合并失败

检查：

1. 分支是否审核通过。
2. 分支是否过期。
3. 是否存在冲突。
4. 是否有 merge lock。
5. 日志是否有 journal 恢复信息。

## BlueMap 不更新

检查：

- BlueMap 插件是否加载。
- Web 端口是否被占用。
- 地图目录是否有权限写入。
- 是否需要手动触发渲染。

## Axiom 行为异常

如果 Axiom 改动没有被拦截，优先安装或检查 ProtocolLib。Axiom 可能通过自定义包
修改方块，普通 Bukkit 事件不一定能覆盖所有路径。
