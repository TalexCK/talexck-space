---
title: 方块校园维护
createTime: 2026/05/26 18:40:00
permalink: /docs/minecraft/school/maintenance/
---

# 方块校园维护

方块校园维护重点是主世界安全、WorldGit 数据完整、备份和分支世界清理。

## 日常检查

- WorldGit 是否定时备份成功。
- 是否有长期未处理分支。
- 是否有卡住的 merge lock。
- BlueMap 是否正常更新。
- 玩家是否能创建和提交分支。

## 备份

日志中可以看到：

```text
[WorldGit] 世界备份完成: world-20260526-002525
```

这说明 WorldGit 定时备份正在运行。

大规模合并前建议手动备份：

```text
/wg admin backup
```

## 分支清理

长期不用的分支会占用世界目录和数据库记录。管理员可以查看：

```text
/wg admin list
```

必要时关闭：

```text
/wg admin close <id>
```

## 锁检查

如果合并流程卡住：

```text
/wg admin locks
```

不要直接删数据库锁，先查日志确认是否有未完成的 merge / rebase journal。

## 插件更新

更新 WorldGit 或相关插件前：

1. 手动备份。
2. 停服。
3. 替换插件。
4. 启动后检查数据库迁移和日志。
5. 用小选区跑一遍完整流程。

## 主世界误修改

如果主世界被直接改了：

1. 立即查玩家权限。
2. 检查是否有人有 bypass 或 OP。
3. 检查 Axiom 是否绕过保护。
4. 根据影响范围决定用修复分支还是恢复备份。
