---
title: WorldGit 工作流
createTime: 2026/05/26 18:50:00
permalink: /docs/minecraft/worldgit/workflow/
---

# WorldGit 工作流

WorldGit 的核心流程是“分支+施工+审核+合并”。

## 选择区域

玩家在主世界设置选区：

```text
/wg pos1
/wg pos2
```

也可以用菜单设置选区。

## 创建分支

```text
/wg create
```

WorldGit 会：

1. 读取选区。
2. 保存 base 快照。
3. 创建分支记录。
4. 创建 `wg_<id>` 分支世界。
5. 把选区复制到分支世界。
6. 将玩家送入分支世界。

## 分支施工

玩家只在分支世界中编辑。主世界保持只读。

如果想邀请其他玩家：

```text
/wg invite <player> [id]
```

## 提交审核

```text
/wg submit [id]
```

如果分支已经过期，需要先 Rebase。

## 审核

审核员：

```text
/wg review list
/wg review approve <id> [备注]
/wg review reject <id> <备注>
```

通过后分支进入待确认状态。

## 确认合并

玩家：

```text
/wg confirm [id]
```

填写 merge message 后，WorldGit 将分支内容写回主世界。

## Rebase

如果主世界在分支创建后发生重叠改动，分支会过期。

Rebase 本质是三方比较：

- `base`：分支创建或上次 rebase 的基线。
- `mine`：分支世界当前内容。
- `theirs`：主世界最新内容。

能自动合并就直接同步，不能自动合并就生成冲突组。

## 冲突处理

冲突处理方式：

- 接受 mine。
- 接受 theirs。
- 传送到现场手动修复。
- 标记冲突组已解决。

所有冲突解决后，分支才能重新提交。
