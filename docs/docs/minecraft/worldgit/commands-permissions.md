---
title: WorldGit 命令与权限
createTime: 2026/05/26 18:50:00
permalink: /docs/minecraft/worldgit/commands-permissions/
---

# WorldGit 命令与权限

WorldGit 命令分为玩家分支命令、审核命令、管理员命令、Web Secret 和 AI 命令。

## 玩家命令

玩家大部分命令可以使用菜单使用，此处简要介绍一下。

```text
/wg                         // 插件主要命令
/wg pos1 [x y z]            // 插件选择第一个坐标
/wg pos2 [x y z]            // 插件选择第二个坐标
/wg selection               // 查看当前 WorldGit 选区
/wg clearselection          // 清除当前 WorldGit 选区
/wg create                  // 基于当前选区创建分支
/wg abandon <id>            // 放弃指定分支
/wg list                    // 查看自己的分支列表
/wg info <id>               // 查看指定分支详情
/wg tp <id>                 // 传送到指定分支世界
/wg return                  // 返回主世界
/wg submit [id]             // 提交分支进入审核
/wg confirm [id]            // 确认合并已通过审核的分支
/wg forceedit [id]          // 将已批准分支切回编辑状态
/wg invite <player> [id]    // 邀请玩家协作指定分支
/wg invite accept [id]      // 接受分支协作邀请
/wg uninvite <player> [id]  // 取消玩家的分支协作权限
```

## 审核命令

```text
/wg review list                 // 查看待审核分支
/wg review approve <id> [备注]  // 通过分支审核，可附备注
/wg review reject <id> <备注>   // 拒绝分支审核，必须写备注
```

## 管理员命令

```text
/wg admin close <id>                 // 强制关闭指定分支
/wg admin forcemerge <id> confirm    // 强制合并指定分支，需要二次确认
/wg admin assign <player>            // 给玩家分配建造区域
/wg admin backup                     // 手动触发备份
/wg admin sync                       // 手动触发 GitHub 同步
/wg admin locks                      // 查看当前合并锁和区域锁
/wg admin list [player]              // 查看全部分支或指定玩家分支
/wg admin reload                     // 重载 WorldGit 配置
```

`forcemerge` 需要 `confirm` 二次确认，避免误合并。

## Web Secret 命令

```text
/secret                     // 重新生成 Web 登录 Secret
/secret accept <requestId>  // 在游戏内允许一次 Web 登录请求
/secret deny <requestId>    // 在游戏内拒绝一次 Web 登录请求
```

`/secret` 会生成 Web 登录 Secret。新版 Web 登录也支持玩家 ID + 游戏内确认。

## AI 命令

```text
/ai preview <预览ID>  // 进入指定 AI 预览
/ai keep <预览ID>     // 保留指定 AI 预览结果
/ai drop <预览ID>     // 丢弃指定 AI 预览结果
```

AI 命令需要 `worldgit.ai.use`。

## 玩家权限

- `worldgit.branch.create`
- `worldgit.branch.abandon`
- `worldgit.branch.list`
- `worldgit.branch.info`
- `worldgit.branch.submit`
- `worldgit.branch.confirm`
- `worldgit.branch.forceedit`
- `worldgit.branch.invite`
- `worldgit.branch.tp`
- `worldgit.branch.return`
- `worldgit.branch.queue`

## 管理员权限

- `worldgit.admin.review`
- `worldgit.admin.close`
- `worldgit.admin.forcemerge`
- `worldgit.admin.assign`
- `worldgit.admin.list`
- `worldgit.admin.backup`
- `worldgit.admin.sync`
- `worldgit.admin.locks`
- `worldgit.admin.reload`
- `worldgit.admin.bypass`

## AI 权限

- `worldgit.ai.use`
