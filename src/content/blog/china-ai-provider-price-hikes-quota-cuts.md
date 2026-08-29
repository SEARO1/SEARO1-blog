---
title: "Why Chinese AI Providers Are Raising Prices and Cutting Quotas: The Compute Gap, From the User's Side"
description: "DeepSeek up 1,100%, Zhipu rationing Coding Plan sales to 20%, Alibaba Cloud pulling baseline packages, quota limits everywhere — this is what the US-China compute gap looks like when it hits your API bill. The verified timeline, the three structural causes, and who wins and loses."
pubDate: 2026-08-30
updatedDate: 2026-08-30
tags:
  - AI Infrastructure
  - Compute
  - US-China
  - API Pricing
  - Token Economics
  - DeepSeek
  - AI Agents
  - Developer Tools
author: "Kenny && Tesla"
lang: en
---

## The Symptom Sheet

If you use Chinese AI APIs for real work in 2026, you've watched a small absurdity unfold: the providers that spent 2024-2025 competing to be the cheapest thing on Earth now spend 2026 competing to *charge you more* — while simultaneously telling you there isn't enough compute to serve you.

DeepSeek raised flagship output prices up to **1,100%** on August 17 ([Sina/21st Century Business Herald](https://finance.sina.com.cn/roll/2026-08-20/doc-ininxzpp6700432.shtml)). Zhipu hiked three times this year for a cumulative **+83%**, then *rationed* its Coding Plan sales to **20% of prior levels** and eventually refunded customers ([Caixin](https://www.caixinglobal.com/2026-04-21/computing-shortage-forces-chinese-ai-firms-to-ration-services-102436452.html)). Alibaba Cloud **suspended sales of its baseline coding package**, leaving only a premium tier that kept selling out. Kimi K3's output price landed at **100 yuan per million tokens**. Meanwhile Kimi, Doubao, Tencent Cloud, and Baidu all run **periodic quotas** on high-frequency usage.

None of this is coordination. It's what a compute shortage looks like from the user's side: price up, quota down, plans suspended, refunds issued. This post walks the verified timeline, then explains the three structural forces underneath — one of which is exactly the US-China compute gap I wrote about in [the infrastructure and silicon analysis](/blog/us-china-compute-gap-infrastructure-silicon/).

---

## Where the Facts Stand

**Confirmed (official pricing announcements, primary reporting):**
- DeepSeek's peak/off-peak pricing went live 00:00 Beijing time Aug 17, 2026: V4-Pro peak output **27 yuan/M tokens (was 6)**, cache-miss input 9 yuan (was 3), **cache-hit input 0.30 yuan — a 12x / 1,100% rise**; off-peak is half of peak ([DeepSeek announcement via Sina](https://finance.sina.com.cn/tech/roll/2026-08-17/doc-ininrkkm6905210.shtml), [Quartz](https://qz.com/deepseek-api-price-increase-v4-peak-off-peak-081326))
- Zhipu's 2026 timeline: Feb GLM Coding Plan structural repricing (+83% cumulative across three hikes in Feb/Mar/Apr) ([Sina](https://finance.sina.com.cn/roll/2026-08-20/doc-ininxzpp6700432.shtml))
- MiniMax doubled API prices with M3 (June 1); Moonshot (Kimi K3) raised input to 20 yuan and output to 100 yuan per M tokens (July) — 3x+ over prior generation ([Sina](https://finance.sina.com.cn/roll/2026-08-20/doc-ininxzpp6700432.shtml))
- Morgan Stanley (cited by National Business Daily): average Chinese model API prices rose to **4.9 yuan in / 21.9 yuan out per M tokens in Q2 2026, up ~48% / ~80% vs Q1 2025** ([readaitime](https://www.readaitime.com/news/2026-08-19/18qa1xth))
- China's average **daily token calls passed 140 trillion in March 2026** (National Data Administration figures, via AI in Asia)

**Reported (Caixin subscriber reporting, April 2026 — the key document):**
- A severe compute shortage forced major Chinese AI firms to **throttle services, ration access, and hike prices** ([Caixin](https://www.caixinglobal.com/2026-04-21/computing-shortage-forces-chinese-ai-firms-to-ration-services-102436452.html)):
  - **Zhipu**: limited Coding Plan sales to 20% of prior levels in January; refunded Coding Plan users April 13 after capacity ran out; hiked API/package prices Feb-Mar
  - **Alibaba Cloud**: suspended baseline coding package sales in April; only a frequently sold-out premium package remained
  - **DeepSeek**: ~12-hour service outage late March
  - **Moonshot (Kimi)**, **ByteDance (Doubao)**, **Tencent Cloud**, **Baidu**: repeated access restrictions / periodic quotas for high-frequency users; ByteDance disabled a Doubao phone feature over Spring Festival to conserve chips
  - **Alibaba Qwen**: suspended non-essential internal operations over Spring Festival to free compute for model training
  - **CITIC Securities**: weekly token consumption on OpenRouter up **7-8x year-over-year in April**, heavily fueled by Chinese models
- DeepSeek's own numbers: user volume **+66.7% vs compute capacity +8.3%** in the months before four consecutive service crashes (May 8/21/24/28, 2026) ([Sina](https://finance.sina.com.cn/roll/2026-08-20/doc-ininxzpp6700432.shtml))

**Inference (my read, labeled as such):** the price hikes and quota cuts are not primarily a profit grab — they are a *capacity rationing mechanism* that the shortage forced onto an industry that had been selling below cost. The independent-model vendors moved first because they have no cloud business to cross-subsidize; the big platforms are adjusting more quietly for the same underlying reason.

---

## Part 1: The 2026 Timeline — From Price War to Rationing

The 2024-2025 strategy was simple: sell below cost to own the market. DeepSeek-V2 set the tone in May 2024 (1 yuan in / 2 yuan out per M tokens), and free tiers appeared across Hunyuan, ERNIE, and iFlytek ([Sina](https://finance.sina.com.cn/roll/2026-08-20/doc-ininxzpp6700432.shtml)). As recently as May 2026, DeepSeek *permanently cut* V4-Pro to a quarter of its price.

Then the demand side exploded in a way nobody modeled. The trigger wasn't chatbots — it was **AI agents**. OpenAI's Claude Code lead pointed at the same phenomenon from the other side of the Pacific on April 4, dropping support for third-party agent tools like OpenClaw because agent frameworks burned "massive, costly token usage" that made the model unprofitable ([Caixin](https://www.caixinglobal.com/2026-04-21/computing-shortage-forces-chinese-ai-firms-to-ration-services-102436452.html)). Zhipu's CEO said it directly: agent tasks like OpenClaw consume **tens to hundreds of times more tokens per task** than chat.

The result, per Caixin's April reporting:

- **Q1-Q2 2026**: Zhipu rations Coding Plan sales to 20%; Alibaba Cloud suspends its baseline coding product; Kimi/Doubao/Tencent/Baidu impose periodic quotas; ByteDance parks a phone feature to save chips; Alibaba Qwen freezes internal projects over the holiday to feed the training cluster; DeepSeek suffers a 12-hour outage.
- **June**: MiniMax doubles prices at M3 launch.
- **July**: Kimi K3 ships with 3x+ API prices (100 yuan out).
- **Aug 13-17**: DeepSeek announces, then activates, peak/off-peak pricing — up to 1,100% on the most extreme tier, and China's first time-of-day compute tariff ([Caixin Global](https://www.caixinglobal.com/2026-08-14/deepseek-launches-v4-pro-and-raises-api-prices-by-as-much-as-1100-102473919.html)).

By Q2 2026, the industry average API price had risen ~48% (input) and ~80% (output) year-over-year ([Morgan Stanley via readaitime](https://www.readaitime.com/news/2026-08-19/18qa1xth)). The "cabbage price" era — the term Chinese developers used for token prices — is over.

---

## Part 2: Why This Is Happening — Three Structural Forces

### 1. Demand grew 8x while compute grew 1.08x

The cleanest single statistic comes from DeepSeek's own reported incident analysis: in the run-up to four crashes in May 2026, **user volume grew 66.7% while compute capacity grew only 8.3%** ([Sina](https://finance.sina.com.cn/roll/2026-08-20/doc-ininxzpp6700432.shtml)). At the industry level, daily token calls passed **140 trillion in March** ([AI in Asia](https://aiinasia.com/greater-china/china-domestic-chips-coding-tokens-tier-greater-china-news-2026-08-21)), and agent-driven consumption was compounding on top of that.

### 2. Supply is structurally capped — this is the compute gap, up close

This is where the macro analysis bites. China's aggregate intelligent-computing capacity is officially **2,185+ EFLOPS and growing 177% YoY**, but the *quality* of that compute is constrained by the HBM memory ceiling and by export controls on top-end Nvidia parts ([my infrastructure post](/blog/us-china-compute-gap-infrastructure-silicon/), [Xinhua](https://www.xinhuanet.com/20260720/2029268fbb4044c1b8753d4c22b89671/c.html)). Industry sources say the hardest workloads — like coding — *still require Nvidia hardware*, leaving domestic chips to serve the low-value inference tier ([SCMP](https://www.scmp.com/tech/tech-trends/article/3364700/chinese-ai-chips-fall-short-coding-forcing-firms-stretch-scarce-nvidia-supply), [AI in Asia](https://aiinasia.com/greater-china/china-domestic-chips-coding-tokens-tier-greater-china-news-2026-08-21)). Chinese firms are now doing software gymnastics — P/D disaggregation, heterogeneous inference — to stretch that scarce Nvidia pool ([Noah Intelligence](https://noah-news.com/chinese-ai-firms-innovate-with-software-tricks-to-bypass-nvidia-chip-shortages/)).

So the shortage is selective: **plenty of cheap domestic FLOPs for easy tokens, not enough Nvidia-class FLOPs for the expensive ones.** Quotas land exactly where agents and coders live — because that's where the scarce compute is.

### 3. Prices were below cost, and the agents exposed it

"涨价是对推理算力成本长期倒挂的修正" — the price rises are a **correction of long-standing inverted inference costs**, in the words of a Grant Thornton partner quoted by 21st Century Business Herald ([Sina](https://finance.sina.com.cn/roll/2026-08-20/doc-ininxzpp6700432.shtml)). Each inference call has a real compute cost; long context, deep reasoning, and agent tasks multiplied that cost while the price war kept prices at subsidy levels. Once agents made token consumption explode, the subsidy stopped being affordable — for everyone at once.

---

## Part 3: Who Wins, Who Loses

**The split is not US vs China — it's independent vendors vs platforms with their own clouds.**

- **Independent model vendors (DeepSeek, Zhipu, Moonshot, MiniMax):** no cloud business to cross-subsidize. API revenue *is* the business, so they raise prices — and they can, because the market has moved past the education phase. Zhipu raised prices 83% in a quarter and *call volume grew 400%* ([Sina](https://finance.sina.com.cn/roll/2026-08-20/doc-ininxzpp6700432.shtml)). Demand elasticity is lower than the price war assumed.
- **Big platforms (Alibaba, ByteDance, Tencent, Baidu):** "按兵不动或变相调价" — holding flagship prices while adjusting structure: tiered pricing, killing unlimited free calls, metering high-compute features. The model API is a loss-leader entrance to their cloud ecosystem, so they eat the cost differently ([Sina](https://finance.sina.com.cn/roll/2026-08-20/doc-ininxzpp6700432.shtml)).

**For developers, the new game has three rules:**

1. **Time-shift the tokens.** DeepSeek's peak/off-peak pricing (off-peak = half price) makes scheduled batch jobs dramatically cheaper — a price signal doing what quota limits did clumsily ([Sina](https://finance.sina.com.cn/tech/roll/2026-08-17/doc-ininrkkm6905210.shtml)).
2. **Cache aggressively.** The 12x cache-hit increase is the most brutal number in the new price sheet — make sure your workload structure actually exploits cache hits, or the same token stream gets repriced.
3. **Model switching is now cheap.** Replacement costs are falling, so loyalty is a function of *stability and task success rate*, not price. Vendors know this: the new pricing discourse is about "task success rate premium" — paying for fewer retries and less human takeover, not for parameter count ([Sina](https://finance.sina.com.cn/roll/2026-08-20/doc-ininxzpp6700432.shtml)).

---

## The Structural Read

Stepping back: the quota cuts and price hikes are the **user-visible face of the compute gap**. The US-China gap in *efficient* compute (HBM, Nvidia-class silicon) means Chinese providers cannot scale their most valuable workloads fast enough to meet agent-driven demand — so they ration with prices instead of capacity.

Two things would change the picture:

- **If CXMT's HBM yields mature**, the scarce-compute ceiling lifts, and the "more chips per FLOP" strategy starts to pay off — quotas loosen, and price pressure eases (my [scenario A in the infrastructure post](/blog/us-china-compute-gap-infrastructure-silicon/)).
- **If the domestic stack keeps failing at coding-tier workloads**, expect more of the same: selective rationing of the workloads that matter most, and a widening price gap between "cheap tokens" (domestic chips, easy inference) and "expensive tokens" (scarce Nvidia-class capacity, agents, deep reasoning).

Either way, one thing is settled: **Chinese AI compute has permanently exited the subsidy era.** The four crashes in May, the refunded Coding Plans, the 100-yuan output tokens — these are the price of admission to the next phase, where compute — not model weights — is the scarce resource.

---

*Method note: this post separates Confirmed (official pricing announcements, primary reporting), Reported (Caixin subscriber reporting, analyst research cited by press), and Inference (my analysis). The Caixin April 2026 reporting is a digest with AI-generated summaries; where it mentions specific vendor actions (Zhipu refunds, Alibaba Cloud suspension), those are treated as Reported pending vendor confirmation. USD/yuan conversions omitted; all prices in yuan per 1M tokens as published by vendors.*