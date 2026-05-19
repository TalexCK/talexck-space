---
title: HPCGame 2026 Writeup
tags:
  - HPC
  - HPCGame
  - Writeup
createTime: 2026/02/09 22:00:00
permalink: /blog/hpcgame-2026-writeup/
excerpt: HPCGame 2026 writeup，主要记录各题怎么做、AI 都干了啥、以及一些很神奇的评测问题。
---

# HPCGame 3rd Writeup

最后拿了 Second Prize。

这里稍微整理一下，主要把能看的东西放出来，太长的 AI 对话就不贴全文了。

## A

```
program quine
    implicit none
    integer :: i
    character(len=1), parameter :: q = char(34), k = char(44)
    character(len=80), dimension(21) :: s
    s = [ character(len=80) :: &
        "program quine", &
        "    implicit none", &
        "    integer :: i", &
        "    character(len=1), parameter :: q = char(34), k = char(44)", &
        "    character(len=80), dimension(21) :: s", &
        "    s = [ character(len=80) :: &", &
        "    ]", &
        "    do i = 1, 6", &
        "        print '(a)', trim(s(i))", &
        "    end do", &
        "    do i = 1, 21", &
        "        if (i < 21) then", &
        "            print '(5a)', '        ', q, trim(s(i)), q, k // ' &'", &
        "        else", &
        "            print '(5a)', '        ', q, trim(s(i)), q // ' &'", &
        "        end if", &
        "    end do", &
        "    do i = 7, 21", &
        "        print '(a)', trim(s(i))", &
        "    end do", &
        "end program quine" &
    ]
    do i = 1, 6
        print '(a)', trim(s(i))
    end do
    do i = 1, 21
        if (i < 21) then
            print '(5a)', '        ', q, trim(s(i)), q, k // ' &'
        else
            print '(5a)', '        ', q, trim(s(i)), q // ' &'
        end if
    end do
    do i = 7, 21
        print '(a)', trim(s(i))
    end do
end program quine
```

随便一查就能发现这是 Fortran，写入 `quine.f90`，然后

```bash
gfortran quine.f90 -o quine
./quine > result.txt
```

即可得到结果。

## B

这题就是一堆并行计算问答，包括 Amdahl、Gustafson、OpenMP、MPI、NCCL、TMA、LLM 并行、UB 互联、Cache 分析之类。

其中比较容易坑的是 OpenMP 那题：

```cpp
int sum = 0;
#pragma omp parallel for
for (int i = 0; i < 100; i++) {
    sum += i;
}
```

这当然是 data race，不是什么 OpenMP 自动帮你 reduction。

AI 记录里还整理了 NCCL 通过硬编码调优常数估算集合通信耗时、Hopper TMA 可以从 global memory 直接到 shared memory、TMA multicast 可以广播到 cluster 里的多个 block 这些点。

## C

原因很好找，原来：

```cpp
struct Candle {
    double high;
    double low;
    double close;
    long long vol;
};
```

合计 32B，但 CPU cache line 通常是 64B，多个线程写相邻 `candles[tid]`，就会伪共享。

AI 记录里也说了，Kunpeng / TaiShan 这类 ARM 服务器 L1D cache line 是 64B，所以这个结构很容易让不同线程互相打架。

最后直接让每个 `Candle` 独占 cache line，甚至隔到 128B：

```cpp
struct alignas(128) Candle {
    double high;
    double low;
    double close;
    long long vol;

    long long _pad0, _pad1, _pad2, _pad3;
    long long _pad4, _pad5, _pad6, _pad7;
    long long _pad8, _pad9, _pad10, _pad11;
};
```

## D

很神奇的一个题，codex 跑了四五轮才能做到满分。

原始思路如果是单线程 Dijkstra + 链式前向星，那大数据基本不行：

- 额外复制边，内存炸。
- 堆 Dijkstra 的 `log n` 太贵。
- 链式前向星随机访问不舒服。

### 大数据

大数据最后主要是：

- CSR 建图。
- bucket / Delta-stepping 类最短路。
- 根据图密度调 `DELTA_SHIFT`。
- 稠密图和稀疏图走不同参数。
- 有些点用线程本地计数，避免原子计数太慢。

AI 记录里有一版把 `DELTA_SHIFT` 改成模板分流：

```cpp
run_parallel_buckets<19>(...); // dense
run_parallel_buckets<21>(...); // sparse
```

### 1e5 / 2e5

我主要被 `1e5/2e5` 的数据点卡住，大部分时间都花在这个点上。

AI 记录里这部分很曲折：

- 先试 packed adjacency。
- 再试小图专用桶。
- 再试 SPFA / RadixHeap。
- 中间还 WA 过。

有一轮 WA 的原因是 `locals_flat` 清零错了。每个线程自己的 `loc[0..n)` 没完整清零，后面 CSR 的写位置直接脏掉。

还有一处是每个线程对每个 `u` 的 `pos[u]` 起始写指针必须完整初始化，不然填边也会写坏。

最后一轮 Codex 给的小图路径是：

- 串行建 CSR。
- 求解用并行 frontier 松弛。
- 用 `tag` 做轮次标记，避免每轮清理 `inq`。
- 队列小的时候回退串行，省 OpenMP 调度开销。

## E

Codex 一共跑了两轮，第一轮显然是被忽悠了，没改对。第二轮成功改对了。

第一轮没改对我感觉最可能的原因是跑第一轮的时候 `gpt-5.3-codex` 还没出。

AI 记录里最后其实是在确认 patch 范围，只交最上面那个提交：

```bash
git show --name-only --pretty="" HEAD
```

预期只看到 `param.h`，不要把 debug OpenBLAS 的提交一起带上。

## F

F 题也是很神奇的一个题，神奇在评测。

我同样一份代码，交了两次，一次 AC，一次有两个数据点 RTE，直接超时了，不太理解。

AI 记录里还定位到一个很实际的问题：如果本地脚本跑的是 `standard/solver.cpp`，但优化版在根目录 `solver.cpp`，那测的根本就不是同一份代码。

所以后来把优化版同步到了：

```text
standard/solver.cpp
```

还要注意 `standard/run_judge.sh` 里的 timeout 可能比题面还严格，本地显示 RTE 不一定说明算法错。

## G

G 题也是很神奇的一个题，获得 96 分不难，获得满分很难。

实在没招，第一次写拿 96.06，优化优化拿到了 99.53，然后就优化不上去了，放弃了。要是 80s 满分那就很容易了。

AI 最后一轮基本是调默认参数，而且不再碰正确性相关的地方：

- `PREFILL_SAFE_LOAD_SYNC=1` 保持不动，先别 WA。
- `token_budget=20992`
- `max_batch=34`
- `reserve_gb=17.4`
- `promote_margin_mb=1920`
- `promote_limit=5`
- `ce_chunk=352`
- `ce_chunk_max=1024`
- 动态 chunk 比例 `0.43`
- `length_slack=0.19`

大概就是显存、搬运、batch 形状之间来回找平衡。

## H

H 题就是 `Codex` 写一写，然后给点反馈优化就行。

这个题最卡我的还是 Task 1，思路还是和 D 一样分治，这个题也基本上每个数据点一个算法了。

AI 记录里 Task 1 最后一版大概是：

- `CHUNK=512`
- `NUM_BUF=32`
- `UNROLL=8`
- `DELAY=16`

然后把指令拆成几段：

- 先发一批 `add`
- 再发一批 `store`
- 顺便预取 A
- 延迟预取 B

目的就是减少 `add -> store` 和 `store -> load b` 这种 stall。

## I

I 题是比较遗憾的一个题，我没申请到 8358 进行测试，只能把评测当成测试了，接近满分，但想继续优化的时候就没有提交次数了。

这个题也进一步导致了我 G 题的摆烂，因为这个题差 1.4 分满分，既然没法到 1450，那就不差 G 的那 0.76 分了。

题目大概是优化 Python 里的 `gc`，不能直接上 JAX。AI 做法就是 trace Python 表达式，生成 C 扩展/ctypes fallback，把热循环搬到 C 里。

后面 Codex 继续压了几轮：

- FP32 的 `MPAD` 从 32 改成 21。
- AVX-512 用 mask load/store 处理尾部。
- FP32 常量表改成 `float`。
- `OPS` 表改成 `uint8_t`。
- `NQ/OUT` 改成宏常量。
- 热路径指针加 `restrict`。
- `my_sincos` / `fmadd_*` 强制 inline。
- Cholesky 快路径只拷下三角。

最后 AI 还建议跑 5 次看中位数再决定交不交，但我没 8358，只能线上赌运气。

## J

一开始很容易就满分了，然后遇到了神秘数据重测，又重新做。最后还是满分了。

算法用的是 Hash，感觉时间限制上还是很宽松的。依然是 Codex 干了大部分活。

比较离谱的是有一次不是算法错，而是功耗惩罚把分清零了。日志里答案是 `[PASSED]`，但是 `MAX_CONSECUTIVE_VIOLATIONS` 太大，平台直接 penalty=0，看起来像 WA。

后来 Codex 改了：

- 超限时更强的 sleep 节流。
- 采样周期调到 1ms。
- 启动前采样 `other` 功耗，估算还能开多少线程。
- `#pragma omp parallel num_threads(thread_cap)` 自适应线程数。
- 更频繁检查节流信号。
- 保留 baseline 风格绑核。

## L

题目最大的难点在于配置 CANN Ascend 环境。

在 AutoDL 中，我们开一台 Ascend 后，选择社区镜像，里面找啊找能找到一个镜像 CANN 是 8.3，pytorch 是 2.7.1 的，这够用了。

直接：

```bash
pip install triton-ascend
```

就能安装好 triton，进而测试代码。

还有个难点，但也没多难，就是 `benchmark.py` 只支持 `cuda`，需要弄个 `benchmark_npu.py` 来在 Ascend 上测试。

AI 记录里有一版还针对 CUDA small case 写了 exact small kernel：

- 只打 `B=1,HQ=16,HK=1,N=128,M=128,D=64,TOP_K=4`
- 固定 `BLOCK_M=32`
- 加 `_OUT_CACHE` 减少 `q.new_empty`

不过我这题主要还是环境问题。Mac 上当然测不出 910B-2 的有效结果。

## M

本地我只能用小数据测试，测试出来正确性。

~~神秘的测试和数据量让我的 MacOS 连炸两次，神秘的 Codex 一句话不说直接开测，我差点都不知道 Mac 咋崩的，触控板按一下好久才有震感反馈。~~

最后 Codex 做的优化主要是：

- Top-K 选择改成小根堆，从 `O(n*K)` 到 `O(n log K)`。
- 稀疏 B 索引改成压缩数组 + span，少很多小 `vector`。
- two-shuffle 的 hash 分支去掉 `a_buckets` 复制。
- 线程按 `A_by_k` 下标分片处理。
- dense 路径加内存门控：
  - `MR_SPGEMM_ROW_DENSE_B_BYTES_CAP`
  - `MR_SPGEMM_ROW_DENSE_ROWACC_BYTES_CAP`
- 建完索引后释放 `B_full`。

这个题主要就是别让中间结构把内存干爆。
