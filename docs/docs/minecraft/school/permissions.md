---
title: 方块校园权限
createTime: 2026/05/26 18:40:00
permalink: /docs/minecraft/school/permissions/
---

# 方块校园权限

方块校园权限必须围绕 WorldGit 工作流设计。目标是让玩家能施工，但不能直接破坏主世界。

## 建造者

建造者需要：

- `worldgit.branch.create`
- `worldgit.branch.list`
- `worldgit.branch.info`
- `worldgit.branch.submit`
- `worldgit.branch.confirm`
- `worldgit.branch.tp`
- `worldgit.branch.return`
- WorldEdit 基础选区权限

建造者不应拥有：

- `worldgit.admin.bypass`
- `worldgit.admin.forcemerge`
- WorldEdit 无限制大范围操作权限

## 审核员

审核员需要：

- `worldgit.admin.review`
- 查看分支列表和信息的权限
- 进入分支世界检查建筑的权限

审核员负责批准和拒绝，不一定需要强制合并权限。

## 管理员

管理员需要：

- `worldgit.admin.close`
- `worldgit.admin.forcemerge`
- `worldgit.admin.backup`
- `worldgit.admin.locks`
- `worldgit.admin.reload`
- `worldgit.admin.bypass`

`worldgit.admin.bypass` 风险很高，只应给真正维护人员。

## 权限配置建议

使用 LuckPerms 建组：

```text
builder
reviewer
admin
```

不要直接给所有玩家 OP。OP 会绕开很多权限边界，不适合协作建造服务器。

## 常见权限问题

- 玩家无法创建分支：检查 WorldEdit 选区权限和 `worldgit.branch.create`。
- 玩家无法确认合并：检查 `worldgit.branch.confirm`。
- 审核员看不到审核列表：检查 `worldgit.admin.review`。
- 玩家能直接改主世界：检查是否误给 `worldgit.admin.bypass` 或 OP。
