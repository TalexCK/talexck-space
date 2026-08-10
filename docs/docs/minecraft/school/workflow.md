---
title: 方块校园建造流程
createTime: 2026/05/26 18:40:00
permalink: /docs/minecraft/school/workflow/
---

# 方块校园建造流程

方块校园的核心流程是 WorldGit 分支建造。玩家不应该直接在主世界施工。

## 创建选区

玩家可以通过 WorldEdit 或 WorldGit 命令设置区域：

```text
/wg pos1
/wg pos2
/wg selection
```

也可以带坐标：

```text
/wg pos1 <x> <y> <z>
/wg pos2 <x> <y> <z>
```

## 创建分支

```text
/wg create
```

插件会复制选区到独立分支世界。玩家进入分支世界后，在那里自由施工。

## 提交审核

施工完成：

```text
/wg submit [id]
```

如果主世界在施工期间发生重叠更新，分支会要求先 Rebase。

## 审核

审核员查看：

```text
/wg review list
```

批准：

```text
/wg review approve <id> [备注]
```

拒绝：

```text
/wg review reject <id> <备注>
```

## 合并

审核通过后，玩家确认合并：

```text
/wg confirm [id]
```

填写 merge message 后，WorldGit 会把改动写回主世界。

## 继续修改

如果审核通过后还要改：

```text
/wg forceedit [id]
```

然后重新提交审核。

## 协作邀请

邀请其他玩家加入分支：

```text
/wg invite <player> [id]
```

取消邀请：

```text
/wg uninvite <player> [id]
```
