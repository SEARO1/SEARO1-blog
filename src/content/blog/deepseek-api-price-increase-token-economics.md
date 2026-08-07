---
title: "The Price War Is Over. DeepSeek Just Ended the 'Cabbage Price' Era."
description: "DeepSeek — the company that pinned AI API prices to the floor for two years — just warned that a 'significant' price increase is coming. Here's what's confirmed, what's reported, what's inference — and where cost optimization moves next."
pubDate: 2026-08-07
updatedDate: 2026-08-07
tags:
  - DeepSeek
  - API Pricing
  - Token Economics
  - LLM
  - Cost Optimization
  - Harness Engineering
  - AI Agents
author: "Kenny && Tesla"
lang: en
---

## A Fifty-Word Footnote That Broke the Internet

In early August 2026 (reported August 6), DeepSeek added a footnote to its [official API pricing page](https://api-docs.deepseek.com/quick_start/pricing). The entire announcement:

> *"We plan to raise the overall pricing for DeepSeek API services in the near future, with a significant increase expected. Please plan your usage accordingly. The specific pricing plan will be subject to official notice."*

No magnitude. No effective date. No per-model breakdown. Just "significant increase expected."

And it detonated the developer community harder than most model launches do. Because DeepSeek isn't just any API provider — it's the company that pinned the global floor price under every other model vendor for two years. It's the **price butcher** (价格屠夫). When the floor itself announces it's lifting, everyone standing on it notices.

Before going further, let's separate what we actually know from what we're inferring — because this story has been told with more confidence than the evidence supports.

---

## Where the Facts Stand

**Confirmed** — DeepSeek has, on its own site, said a "significant" API price increase is coming, and declined to say how much or when. Current published rates are live and unchanged: V4-Flash at $0.14/$0.28 per M tokens (in/out), cache hits at $0.0028; V4-Pro at $0.435/$0.87. That's it. ([pricing page](https://api-docs.deepseek.com/quick_start/pricing))

**Reported** — An earlier, more specific plan to double prices during Beijing business hours appeared on the pricing page around August 1 and was **removed by August 6 without ever taking effect**, per [Internet Archive snapshots documented by Ground Truth](https://groundtruth.day/news/deepseek-says-a-significant-price-rise-is-coming-and-names-no-number.html). Media/platform reports also describe extreme usage (see below). These are third-party reports, not DeepSeek statements.

**Inference** — That the increase serves cost pass-through, user filtering, or a funding window. Plausible, but DeepSeek has given no reason at all.

**Scenario** — Everything after "if prices double." Useful for planning, not for predicting.

---

## The Floor Just Lifted: Two Years of Price History

DeepSeek's pricing history isn't a series of business decisions — it's a strategy you can read at a glance:

| Date | Move |
|---|---|
| Apr 2024 | Cuts to ¥1/¥2 per M tokens (in/out) — industry floor set; price war begins |
| Sep 2025 | Another 50%+ cut — losing money on purpose, winning share |
| Apr 2026 | V4 preview, Pro/Flash dual line, 75% off promo — "temporary" discounts |
| May 2026 | V4-Pro promo becomes permanent (¥3/¥6; $0.435/$0.87 on the [official page](https://api-docs.deepseek.com/quick_start/pricing)) — price war at its peak |
| Jul 31, 2026 | V4-Flash-0731 goes to GA — demand takes off |
| ~Aug 1, 2026 | Peak/off-peak doubling plan floated on the pricing page — two windows totaling ~7h of Beijing business hours, all billing items doubled; first *real* increase, proposed |
| Aug 3–6, 2026 | Peak plan **withdrawn, never took effect**; replaced by the vague "significant increase" footnote — the anchor lifts, on paper |

The peak-pricing episode is the part that got misreported in a lot of coverage, including my first draft of this post. It was a *proposal*, live on the page for about a week, then gone. Today you are still billed the flat rate. Treat any "peak-hour doubling" price table you see elsewhere as a withdrawn draft, not a baseline.

The current, actually-in-force price list:

| Model | Cache-hit in | Cache-miss in | Output |
|---|---|---|---|
| V4-Flash | $0.0028 (¥0.02) | $0.14 (¥1) | $0.28 (¥2) |
| V4-Pro | $0.003625 (¥0.025) | $0.435 (¥3) | $0.87 (¥6) |

*(Source: [DeepSeek pricing page](https://api-docs.deepseek.com/quick_start/pricing), unchanged as of writing. If "significant" means a doubling of these, V4-Pro output lands at $1.74/M — a scenario, not a forecast.)*

---

## What Broke First: 8 Trillion Tokens in a Single Day *(reported)*

Here's the part that got everyone's attention — and note the label: this is *reported*, not confirmed by DeepSeek.

On August 1, the open-source agent platform [OpenCode reported](https://www.explainx.ai/blog/deepseek-api-price-increase-jun-song-august-2026) that DeepSeek V4-Flash processed **8 trillion tokens in a single day** through their platform. Structure: 5 trillion from free-tier usage, 3 trillion from paid traffic — meaning roughly **60% of the compute was serving free tokens**. A few days later, OpenCode reported capacity problems from "unprecedented traffic."

The supply-side ceiling is real but also reported: DeepSeek is said to run around **20,000 H-series-equivalent GPUs, shared between training and inference** (industry sources; unconfirmed). If true, every GPU handed to inference is a GPU taken from training the next model — and raising price is the most direct compute-allocation mechanism there is.

None of this is DeepSeek's stated reason. It's a coherent story, and it's the story every outlet is telling. Keep it in the "reported" bucket.

The timing is also suspicious in a way that's *not* a coincidence: the warning landed five days after [Artificial Analysis published its cost-vs-intelligence study](https://groundtruth.day/news/deepseek-says-a-significant-price-rise-is-coming-and-names-no-number.html) pricing DeepSeek's newest model at roughly **$0.03 per test** against $3.15 for Claude Fable 5 — a comparison Forbes ran as "105 times cheaper," built entirely on the rates DeepSeek has now said it intends to raise.

---

## Cheap Was Probably Partly Subsidy — But the 100x Gap Alone Doesn't Prove It

Here's the uncomfortable question the price war hid: was DeepSeek's "cheap" engineering efficiency or subsidy?

The 100x task-cost gap is *consistent with* subsidy, but it doesn't independently prove it. It could also reflect: sparse-activation MoE architecture, a very efficient inference stack, cheaper hardware and operating costs, cache-hit assumptions baked into the benchmark, and — yes — strategic pricing. The benchmark measures the *business decision* as much as the model.

Still, the founder reportedly addressed the concern directly on X (via [explainx.ai](https://www.explainx.ai/blog/deepseek-api-price-increase-jun-song-august-2026)): even after a 2–10x increase, DeepSeek would still undercut most Western rivals. If true, that's a directional claim about competitiveness — not a commitment, and not a floor on your bill. And it frames the move as a price-level decision, not a cost-necessity one. Subsidy — or at least strategic under-pricing — remains the most plausible reading. Treat it as a hypothesis with good evidence, not a measured fact.

---

## Why Now, Why Like This *(all inference)*

DeepSeek has given no reason. The reasons below are layered and all *plausible simultaneously* — that's why the announcement is so short and so loud:

1. **Cost pass-through.** Plausible. GPUs are tight and demand is up. But cost alone doesn't explain the *form* — a vague footnote with no numbers.
2. **User filtering.** When most compute serves free or near-free traffic, price is the cleanest filter. *Price is a filter* — raise it, and low-value requests leave on their own.
3. **Expectation management.** Announce the increase first, publish numbers later. By the time real prices land, the conversation has shifted from "why" to "more or less than I guessed?" Two news cycles, one price change.
4. **The funding window.** Reported: a ~¥50B raise at ~¥500B pre-money valuation, targeting a late-August signing (unconfirmed, via [华尔街见闻 coverage as summarized by 能工智人](https://blog.chuanxilu.net/posts/2026/08/deepseek-price-increase-beyond-gpu/)). A margin-improving announcement inside a fundraising window is convenient. Convenient isn't proof.
5. **Value-based pricing.** The industry is moving from "who's cheapest" to "what's it worth." When a model reliably completes agent tasks, you're selling *completed work*, not tokens. This is the software industry's late-stage playbook, running at AI speed.

---

## The Contradiction That Isn't: DeepSeek Up, OpenAI Down *(reported)*

Around the same window, OpenAI reportedly cut GPT-5.6 Luna prices by 80% and removed limits on free text chat; Anthropic reportedly moved Claude Fable 5 to pure usage-based billing at $10/$50 per M tokens ([per AI tool box's roundup](https://www.aitoollab.cn/articles/deepseek-api-price-increase-august-2026/); check the vendors' own pricing pages before quoting in a budget meeting).

Both moves are the same strategy viewed from different positions:

- **OpenAI** has subscription revenue to cross-subsidize API *acquisition*, and it's cutting the light tier while holding the flagship — price *layering*. ("Own compute" is real but not free: capital expenditure, cloud contracts, and opportunity cost still sit behind those subsidies.)
- **DeepSeek** is close to pure API revenue. The API *is* the P&L. It can't subsidize with subscriptions it doesn't have.
- **Anthropic** is pricing on capability and stability — the premium lane.

So no, this isn't "everyone's raising prices." It's the market splitting into layers: free tier gets freer, flagship keeps its premium, and the middle — where DeepSeek lives — is where the accounting catches up.

---

## Intermission: A Completely Unserious Theory About Uncle Liang 🛸

*Tin foil hat on. This section contains zero journalism and a suspicious amount of internal logic.*

If you're reading this in Chinese, you've seen the joke making the rounds: **「梁叔叔是不是想做多美股，之後取消加價做空？」** — *"Is Uncle Liang trying to go long on US stocks, then cancel the price hike to short them?"*

It's absurd. It also has an eerily complete logic:

**Step 1 — January 2025.** DeepSeek releases R1, a frontier model at a fraction of the price. The market reads it instantly: *cheap AI means less GPU demand.* Nvidia loses ~17% in a single day (~$600B). The price butcher's launch calendar just shorted the entire US AI complex.

**Step 2 — August 2026.** DeepSeek warns of a "significant" price increase. The market inverts the reading: *demand so strong that even the cheapest provider can't keep up = GPU shortage confirmed = AI infrastructure is on fire.* The footnote just opened a long position on Nvidia & friends — courtesy of Uncle Liang.

**Step 3 — The inevitable follow-through.** When the "significant" increase turns out to be 2x instead of the feared 10x — or gets quietly softened, or canceled — the shortage thesis deflates, AI stocks dump, and Uncle Liang... closes the short he opened on Day 1. Repeat as needed.

See? The man doesn't need a hedge fund. **His API pricing page IS his hedge fund.** Fifty words of "prices going up, details later" and the whole US market dances. R1 = short signal. Price hike = long signal. Hike canceled = short signal again. It's the most reliable macro indicator in the world — and it costs ¥0.02 per million tokens, cache-hit.

Even the founder's reported X post fits the profile: *"Even after a 2-10x increase, we'd still undercut Western rivals."* Classic hedge fund speak. That's not a pricing statement — that's a **valuation reset**.

*Tin foil hat off.*

Back to seriousness. But the reason this joke lands is that DeepSeek's pricing decisions genuinely do move markets and genuinely do reshape the industry's cost assumptions. The meme is just the truth wearing a clown nose.

---

## Where the Battle Moves: The Call Layer

This is the part I actually care about, and it connects directly to [my previous post on cache hit rates](/blog/ai-cache-hit-rate-importance/). For two years, developers optimized cost one way: **pick a cheaper model**. That worked because someone was always subsidizing. That lever is now bending backward.

Cost optimization is moving one layer up — from *which model you choose* to *how you call it*. Five levers, in order of bang for buck:

**1. Cache hit rate (the 50x lever).**
DeepSeek's cache-hit input price is $0.0028 vs $0.14 uncached — a **50x gap**. Stabilize your prompt prefix (system prompt, tool definitions, long docs — and keep dynamic headers *out* of it), and a 2x price hike nearly cancels out. This is the single highest-ROI move and the one most teams haven't done. I wrote the whole story of hitting ~98% cache hits in Claude Code [last month](/blog/ai-cache-hit-rate-importance/) — if you haven't checked your numbers, do it this week. (OpenCode reported its Flash traffic running near 96% cached input — the lever is real at scale.)

**2. Measure before you schedule.**
If the withdrawn peak-pricing plan ever returns, off-peak scheduling matters again. Until then, the bigger win is knowing your own shape: per-workflow input cache-hit ratio, input/output token ratio, average calls per task, retry rate, peak QPS, and task success rate. Without these, every cost discussion is vibes.

**3. Model routing.**
Not every step needs the flagship. Plan and final review on the strong model; extraction, formatting, and classification on the cheap one. Orchestration layers (Coze, Dify, OpenClaw, and yes, good old harness engineering) all support mixing models in one pipeline. The intelligence-per-dollar curve is not linear, and routing is how you ride it.

**4. Fusion at the call layer — with heavy caveats.**
A genuinely new idea worth watching: on Aug 6, PPIO launched Fusion — a gateway that dispatches one call to several models in parallel and cross-validates the results. Their claim: three open models fused score above Claude Fable 5 on the DRACO deep-research benchmark at a tenth of the cost. **Vendor self-reported** — no third-party replication, no public detail on benchmark design, model versions, latency, real fused cost, or how disagreements are aggregated. Interesting enough to trial; too early to build a business on.

**5. Self-hosting the open weights — only after the TCO math.**
V4-Flash is MIT-licensed; Kimi K3, GLM, and Qwen families are open too. But "open weights" ≠ "self-host is cheaper." The real TCO includes GPU amortization and idle rate, electricity, ops/HA, quantization quality, throughput and p95 latency, and data-security requirements. For bursty, variable agent traffic, the API often wins — fixed infrastructure amortizes badly against spikes. Self-hosting pays off for steady, sustained, high-volume workloads. Compute it, don't assume it.

---

## What You Should Actually Do

Don't panic-migrate. The hike isn't priced yet, and DeepSeek will likely still be the cheapest tier by an order of magnitude after it lands. Do this instead:

**1. Instrument first.** For each workflow, record: input cache-hit ratio, input/output token ratio, average calls per task, retry rate, peak QPS, task success rate. You need these to decide anything.

**2. Run the sensitivity math.** Model your cost as:

$$C = T_{hit} \cdot p_{hit} + T_{miss} \cdot p_{miss} + T_{out} \cdot p_{out}$$

...where $T$ are token volumes and $p$ are prices. Plug in 2x, 5x, and 10x on today's published rates. The result tells you *which* workflow breaks first, and therefore which lever to pull first: prompt canonicalization for cache (if $T_{miss}$ dominates), routing (if $T_{out}$ on the flagship dominates), or self-hosting (if your volume is steady and $T$ is huge).

**3. Then act in order:** fix cache hit rate → route cheap models to cheap work → schedule non-urgent work off-peak if peak pricing ever returns → only at serious sustained volume, compute the self-host TCO.

And one honest caveat: at the time of writing, *nothing is confirmed*. Not the magnitude, not the date, not even the direction per model — it's entirely possible V4-Pro takes a bigger hit than V4-Flash, or the increase is modest. Every "2x" number floating around, including the scenario in this post, is a planning input, not a prediction. Don't make irreversible architecture decisions off a fifty-word footnote.

---

## Takeaways

1. **The floor price just lifted.** Two years of "cheapest in the world" now carry a written warning — with no numbers attached.
2. **What's confirmed is narrow:** a "significant" increase is coming, undated and unpriced. The peak-pricing plan was floated and withdrawn, never in force.
3. **The demand story is real but reported:** 8 trillion tokens in a day, ~60% free, on a shared train/infer cluster — a coherent story, not a DeepSeek statement.
4. **Cheap contained subsidy — probably.** The 100x gap is consistent with it, though not proof on its own.
5. **The cost war moves to the call layer.** Cache hit rate (50x), measurement, routing, fusion, self-hosting — the levers are all engineering now, not vendor selection.
6. **The era's keyword changes from "cheaper" to "worth it."** That's a harder game, but it's the one that rewards people who understand the harness, not just the price list.

---

*Full disclosure: this very post is being written and edited through V4-Flash, which makes this a slightly awkward thing to type. The re-post-trained build and I go way back — and yes, I'll be watching my own cache hit rate a little more carefully from now on.*

*If you're running agent workloads on DeepSeek, I'd love to hear your numbers — especially how you're planning for a hike that hasn't been priced yet.*
