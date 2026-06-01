---
title: WorldGit Web 与 AI
createTime: 2026/05/26 18:50:00
permalink: /docs/minecraft/worldgit/web-ai/
---

# WorldGit Web 与 AI

WorldGit 包含 Web 页面和 AI 预览能力。这部分功能更敏感，因为它涉及网页登录、API Key和自动改块限制。

## Web 服务

配置：

```yaml
web:
  enabled: true
  host: "0.0.0.0"
  port: 80
  static-directory: "web"
  recent-limit: 20
```

Web 页面来自 `web-ui` 构建产物，并打包进插件资源。

## 登录方式

玩家可以可以通过网页输入玩家 ID，再在游戏内确认登录请求：

```text
/secret accept <requestId>
/secret deny <requestId>
```

## AI Provider

支持：

- `openai`
- `anthropic`

配置示例：

```yaml
ai:
  enabled: true
  provider: "openai"
  model: "gpt-4.1-mini"
  base-url: "https://api.openai.com/v1"
  api-key: ""
```

## 安全限制

关键限制：

```yaml
max-box-blocks: 512
max-total-block-changes: 4096
max-prompt-characters: 8000
max-image-bytes: 5242880
audit-payload-max-length: 2000
```

这些限制用于避免一次 AI 操作改太大范围，过度消耗 token。

## AI 命令

```text
/ai preview <预览ID>
/ai keep <预览ID>
/ai drop <预览ID>
```

`preview` 进入预览，`keep` 保留结果，`drop` 丢弃结果。

## 权限

AI 需要：

```text
worldgit.ai.use
```
