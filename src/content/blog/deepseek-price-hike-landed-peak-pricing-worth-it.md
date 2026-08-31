---
title: "The Hike Landed: DeepSeek's Peak Pricing Is Live — Why, and Is It Still Worth It?"
description: "DeepSeek's 'significant increase' is now real: peak/off-peak billing went live Aug 16, 2026, with cache hits up to 12x. The official rationale, what's verified vs reported vs inferred, and a workload-by-workload read of whether V4 still delivers."
pubDate: 2026-08-20
updatedDate: 2026-08-20
tags:
  - DeepSeek
  - API Pricing
  - Token Economics
  - LLM
  - Cost Optimization
  - AI Agents
  - Harness Engineering
author: "Kenny && Tesla"
lang: en
---

## Two Weeks Ago I Wrote a Footnote Story. Now It's a Price Table.

On August 7, I wrote about a [fifty-word footnote](/SEARO1-blog/blog/deepseek-api-price-increase-token-economics/): DeepSeek warning of a "significant" increase, no numbers, no date. At the time, the loudest coverage was about a peak-pricing plan that had been floated and *withdrawn*.

It's not withdrawn anymore. **On 2026-08-16 at 16:00 UTC (midnight Beijing time on the 17th), the new prices went live.** The [official change log](https://api-docs.deepseek.com/updates) — the entry dated 2026-08-13, the same day V4-Pro went GA — is now the primary source for both the mechanism and the official rationale, quoted below. The flat-rate era is over.

This post covers the two questions everyone is actually asking, with sources labeled: what's verified (official pages), what's reported (secondhand, with links), what's calculated (my math), and what's inference (my reading).

1. **Why did DeepSeek do this?** — the stated reason vs. the inferred motives, kept deliberately separate.
2. **Is it still worth it?** — per-workload, against rivals, and against third-party hosts running the same open weights.

---

## The Actual New Price Table

Everything below is per 1M tokens. The mechanism and effective date are from the [official change log](https://api-docs.deepseek.com/updates) ("we will adopt peak/off-peak pricing, with off-peak prices set at half of the peak-hour prices… take effect at 16:00 (UTC Time) on August 16, 2026"). The [official pricing page](https://api-docs.deepseek.com/quick_start/pricing) is the source of record for the current new pricing. The pre-change flat rates shown for comparison are from [ofox.ai's historical snapshots](https://ofox.ai/blog/deepseek-api-price-increase-new-rates-peak-hours-cache-cost-2026/) of that page (Flash captured Aug 6, Pro captured Aug 13, just before the change). OpenRouter provider metadata had not fully converged after the change, so I'm using it only for point-in-time provider discovery further down, not to corroborate official prices.

| Tier | Old flat (until Aug 15) | New off-peak | New peak | Peak multiplier |
|---|---|---|---|---|
| V4-Flash cache hit | $0.0028 | $0.007 | $0.014 | **5.0x** |
| V4-Flash cache miss | $0.14 | $0.22 | $0.44 | 3.1x |
| V4-Flash output | $0.28 | $0.66 | $1.32 | 4.7x |
| V4-Pro cache hit | $0.003625 | $0.022 | $0.044 | **12.1x** |
| V4-Pro cache miss | $0.435 | $0.66 | $1.32 | 3.0x |
| V4-Pro output | $0.87 | $1.98 | $3.96 | 4.6x |

Model naming, from the [official quick-start docs](https://api-docs.deepseek.com/quick_start/your_first_api_call): the `deepseek-v4-flash` ID now points to **DeepSeek-V4-Flash-0731** (public beta since July 31), and `deepseek-v4-pro` points to **DeepSeek-V4-Pro-0813** (GA Aug 13). Calling method unchanged.

**Peak hours: 01:00–04:00 and 06:00–10:00 UTC — 7 hours a day** (that's 09:00–12:00 and 14:00–18:00 Beijing time; the conversion is arithmetic, but the hours themselves are from ofox's snapshot of the official page). Off-peak is "half of peak," which sounds like a discount until you check the third column: *every tier, at every hour, is still 1.5–6x the old flat rate* (the multiplier depends on tier — see the table). There is no hour of the day at which any tier costs what it cost on August 15. Check your console or the official pricing page before trusting any single number — pricing data has been propagating unevenly across the ecosystem.

The shape of the increase is worth noticing: **the tier that was closest to free went up the most.** Cache hits took the biggest multiplier on both models (5x Flash, 12.1x Pro at peak); cache misses, the tier that already cost real money, went up the least. What that shape *means* is a separate question, and the next section is careful not to overclaim.

---

## Why: The Stated Reason and the Inferred Motives

### The Stated Reason (verified)

Here is DeepSeek's own wording from the [2026-08-13 change log](https://api-docs.deepseek.com/updates):

> *"To allocate resources more reasonably, we will adopt peak/off-peak pricing, with off-peak prices set at half of the peak-hour prices, encouraging users to schedule their tasks based on actual usage."*

So the official rationale is **resource allocation**: peak/off-peak billing as demand shaping, nudging traffic into the cheap hours. That is the company's stated position — and it's worth noting what it does *not* say. It doesn't say "we need more revenue," but stated rationale and actual motive aren't the same thing, and they aren't mutually exclusive either. Demand management, quality-of-service protection, capacity constraints, and margin improvement can all be true at once; the official wording tells us which framing DeepSeek chose, not which forces are operating internally.

### The Reported Context *(reported)*

- **Demand pressure (reported by the platform).** [OpenCode's official account](https://x.com/opencode/status/2083996864186318999) said that "DeepSeek Flash" processed **8 trillion tokens through OpenCode on August 1**: 5 trillion from free usage and 3 trillion through OpenCode Go. That is an OpenCode-platform traffic figure — not a measure of DeepSeek's total global API volume — and the post does not identify the exact Flash model build. The 5T/3T split implies **62.5% of the reported traffic was free usage**. Independent corroboration on a different platform: [TechNode reports](https://technode.com/2026/08/05/deepseek-v4-flash-tops-openrouter-weekly-ranking-with-7-22-trillion-tokens/) that DeepSeek V4-Flash topped OpenRouter's weekly ranking with 7.22T tokens. Strong demand on major platforms is context for the pricing change, not proof of DeepSeek's internal capacity constraints or its motive.
- **A fundraising window.** [Reuters (Aug 6, citing Bloomberg News)](https://www.reuters.com/world/asia-pacific/deepseek-resumes-funding-round-seeking-nearly-8-billion-bloomberg-news-reports-2026-08-06/) reported that DeepSeek **resumed a funding round seeking nearly $8 billion**, at a valuation of roughly $74 billion — the same day the increase warning appeared on the pricing page. A margin-improving announcement inside a fundraising window is convenient. Convenient isn't proof — but it's worth knowing.
- **A capital bill.** [Studio Global's synthesis](https://www.studioglobal.ai/discover/answers/what-factors-drove-deepseek-s-august-2026-announcement-6a7600fc7905dee986cc3c74) describes a large-scale data-center buildout in Ulanqab, Inner Mongolia — unverified secondary context (capacity and cost figures not confirmed by a primary source), included only as timing context, not a stated cause.

### The Cache-Hit Shape: Inference, Not Proof *(my reading)*

Here's the tempting conclusion, and the reason I'm not letting myself state it as fact: cache hits went up 5–12x while cache misses only went up 1.5–3x. If the goal were simple revenue maximization, you'd raise the expensive tier — that's where the money is. Instead they raised the tier that was closest to free.

Plausible readings, any combination of which could be true:

- **Demand shaping.** Agent loops resend the same system prompt, tool definitions and file contents every turn, and well-designed agent loops can reach very high cache-hit rates when stable prefixes are reused; at $0.0028/M a heavily-cached agent input stream was effectively free. If the scarce resource is GPU hours and the heaviest consumers are cached-input agent workloads, pricing the near-free tier up is the most direct throttle.
- **Cost recovery.** Cache hits still consume storage and serving infrastructure; the old 50x hit-vs-miss ratio (now 31x at peak) may have priced cache below its actual cost.
- **Ratio normalization.** A 50x ratio was anomalous by industry standards; bringing it to ~31x narrows the gap toward what competitors charge for cache (major providers publish explicit cache-pricing tiers — [Anthropic](https://www.anthropic.com/pricing) and [OpenAI](https://openai.com/api/pricing/) both do — and structure cache reads well below uncached input, not 31–50x).

The price table alone cannot distinguish these — it's consistent with all three — so I'm presenting the shape as *evidence-consistent inference about what DeepSeek might be optimizing*, not as a measured account of internal intent. The one statement I'm confident in is the practical one: **the workloads most optimized for the old pricing (high-cache agent loops) now see the largest percentage increase** — 2.1x off-peak / 4.1x at peak for a 90% hit-rate Flash workload, vs 1.7x / 3.4x at 40% hit rate (my math, on Flash rates, detailed below).

One more historical note, because it's cheap and interesting: [ofox.ai documents](https://ofox.ai/blog/deepseek-api-price-increase-new-rates-peak-hours-cache-cost-2026/) that DeepSeek used the *same* time-of-day mechanism as a discount in Feb 2025 (off-peak 50–75% off), ended it in Sep 2025, and has now inverted it into a surcharge. The mechanism is a throttle; the direction is policy.

---

## Is It Still Worth It? A Workload-by-Workload Read

Before any "X times cheaper" claim, the methodology: the comparisons below mix three different things, and I'll label them. **(1)** *Benchmark cost per task* — [Artificial Analysis](https://artificialanalysis.ai/models/deepseek-v4-flash) runs its Intelligence Index benchmark and divides the total evaluation bill by tasks; it reflects benchmark workloads, a specific reasoning config (max effort), and their cache-discount assumption (97%), *not* your production traffic. **(2)** *Published list prices* — what a vendor charges per 1M tokens, no workload assumptions. **(3)** *My own bill math* — arithmetic on published rates with stated assumptions. None of these measures production agent reliability, latency, tool-use quality, context handling, or output-token behavior; benchmark rank is not the same thing as "my agent finishes its job." Keep that in mind for everything below.

### The Benchmark-Cost Side

On benchmark cost-per-task, DeepSeek's position is still extreme — at *new* prices, per Artificial Analysis ([V4-Flash model page](https://artificialanalysis.ai/models/deepseek-v4-flash), [V4-Pro model page](https://artificialanalysis.ai/models/deepseek-v4-pro)):

| Model (reasoning, max effort) | Intelligence Index | Cost per Index task | Speed |
|---|---|---|---|
| DeepSeek-V4-Flash-0731 | **52** | **$0.11** (cache-discounted) | 107 tok/s |
| DeepSeek-V4-Pro-0813 | **53** | **$0.25** (cache-discounted) | 77 tok/s |

For scale: in my last post, the widely-quoted comparison was ~$0.03/task for V4-Flash vs $3.15 for Claude Fable 5 — a 105x gap on old prices. At the new $0.11, the same arithmetic lands around **$3.15 / $0.11 ≈ 28x** — *on Artificial Analysis's benchmark task, with their cache assumptions*. The multiplier got ~4x worse; the order of magnitude didn't move. Against published list prices the gap is even wider (V4-Flash off-peak output at $0.66/M vs Anthropic's flagship Opus-line API output pricing — see [Anthropic's official pricing page](https://www.anthropic.com/pricing)). Again: that's sticker price, not workload cost, and not production quality.

### The Bill Side — Where It Actually Hurts (my math)

A typical coding-agent month on V4-Flash (Flash rates; 300M input tokens at 90% cache hit, 20M output tokens — a shape I've seen in practice):

| Scenario | Monthly cost | vs old |
|---|---|---|
| Old flat rate | $10.56 | — |
| New, all off-peak | $21.69 | **2.1x** |
| New, all peak | $43.38 | **4.1x** |

The counterintuitive part, stated precisely: **on Flash rates, your cache-hit ratio now determines your price increase, in the direction you don't expect.** Higher hit rate → larger multiplier (90% hit: 2.1x off-peak, 4.1x peak; 40% hit: 1.7x off-peak, 3.4x peak). Caching is still the biggest input-price lever — cached Flash input is $0.007–0.014 vs $0.22–0.44 uncached, a 31x gap at both peak and off-peak — it's just no longer the lever that makes the bill vanish.

### A Workload Decision Matrix

| Workload profile | Recommended approach | Main trade-off | Operational risk |
|---|---|---|---|
| High-cache, latency-sensitive, official API | Stay on DeepSeek; lock prompt prefixes; schedule around peak if possible | Higher peak sticker price, but first-party endpoint behavior and native cache semantics are easier to reason about | Price volatility; peak-hour surcharge if you can't shift |
| High-output or low-cache Flash traffic | Compare third-party hosts (below); DeepSeek's output is 3–7x pricier than cheap endpoints | Lower unit cost off DeepSeek | Quantization/context differences; endpoint reliability varies |
| Batch / evaluation / indexing | Run off-peak (half of peak); if time-flexible, also candidates for third-party or self-host | Off-peak is still 1.5–2.5x old flat on most tiers | Batch jobs on third parties inherit their caching semantics |
| SLA, privacy, data-residency, stable endpoint | Official API or self-host; avoid spot-priced aggregators | Pay the premium for control | Third-party hosts may change pricing/endpoints without notice |
| Teams considering self-hosting | TCO model first: GPU amortization, idle rate, ops, p95 latency | DeepSeek's cache stack is hard to replicate; MIT weights are the easy part | Ops burden; you own the reliability |

### The Third-Party-Host Comparison — Same Weights, Not the Same Service

V4-Flash and V4-Pro are **MIT-licensed** (per the LICENSE files in the [official Hugging Face repositories](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) for [V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) and [V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813)), so third parties can — and do — host them. But "same weights" needs a qualifier: serving stacks differ, and the differences are pricing-relevant. The table below is [ofox.ai's timestamped OpenRouter endpoints audit](https://ofox.ai/blog/deepseek-api-price-increase-new-rates-peak-hours-cache-cost-2026/) — point-in-time observations at 07:15 UTC on 2026-08-17, not permanent pricing (you can verify current rates live on the [OpenRouter model page](https://openrouter.ai/deepseek/deepseek-v4-flash-0731)):

| Host (V4-Flash-0731) | Input | Output | Cache read | Serving notes (from ofox's audit) |
|---|---|---|---|---|
| DeepSeek official (peak) | $0.44 | $1.32 | $0.014 | 1M ctx, fp8, first-party caching stack |
| DeepSeek official (off-peak) | $0.22 | $0.66 | $0.007 | same |
| DeepInfra | $0.08 | $0.18 | $0.016 | fp8, 1M ctx |
| GMICloud | $0.084 | $0.168 | $0.0168 | fp8, 1M ctx |
| DigitalOcean | $0.08 | $0.252 | $0.0252 | unknown quant, 1M ctx |
| BaseTen | $0.13 | $0.26 | $0.028 | fp8, 1M ctx |

Reading it straight: on Flash, DeepSeek's input price is now the *most expensive* on the list it used to anchor; its only remaining column win — cache read — shrank from a 6.4x edge to ~1.1x. On input alone, break-even against DeepInfra requires a **94% cache-hit rate off-peak / 99.4% at peak** (Flash rates, my math; it was 77% before the change). Once output volume is material, the audited third-party endpoints show a unit-price advantage; total cost still depends on cache-hit behavior, context reuse, and serving differences.

The caveats that keep this from being a slam-dunk, all from ofox's audit: several cheap endpoints run **fp4 quantization** (not fp8) or truncate context (262K vs 1M); none replicate DeepSeek's **automatic caching semantics** (their cache prices are per-provider and may not behave like DeepSeek's prefix cache); throughput, uptime, and rate limits differ and fluctuate — ofox notes degraded/offline statuses rotating through endpoints during the day; and you must **pin the exact build** (`-0731`), because the un-suffixed slug on some hosts points at the April preview. And the mirror image holds on Pro: V4-Pro-0813's weights only went public Aug 13, so third-party listings are scarce and currently *more expensive* than DeepSeek's off-peak rate (cheapest seen: Novita at $1.056/$3.168, per ofox).

---

## What I'd Actually Do

1. **Rerun your cost model this week** — against your *actual* hit rate, not a default. Use the 90%-vs-40% framing above: hit rate determines multiplier.
2. **Move batch work off-peak.** It's not the discount it pretends to be (still 1.5–6x the old rate), but it *is* half of peak. For US/Europe teams, the 7 peak hours are Beijing business hours — for you, the dead of night.
3. **Keep cache hygiene as the first lever** (31x still beats 3x), but re-run the break-even against flat-rate third parties if your hit rate is stuck under ~90%.
4. **Treat third-party routing as a real option with real due diligence:** pin exact builds, check endpoint status at routing time, and treat quantization and context truncation as functional differences, not footnotes.
5. **Don't hardcode any single provider's price into your architecture.** Budget for volatility — this is the second repricing in a month, and OpenRouter's provider metadata was still inconsistent several days after the change.

The honest headline: on benchmark cost-per-task with cache assumptions, DeepSeek is still an order of magnitude cheaper than the Western flagships. On real production quality, latency, and reliability — for your specific workload — nobody's benchmark can tell you; measure it.

---

## Takeaways

1. **Verified:** peak/off-peak billing since Aug 16, 7 peak hours daily (Beijing business hours), official rationale = resource allocation ("schedule their tasks based on actual usage"), per the [official change log](https://api-docs.deepseek.com/updates).
2. **Verified:** `deepseek-v4-flash` → V4-Flash-0731 (beta since Jul 31), `deepseek-v4-pro` → V4-Pro-0813 (GA Aug 13); both models MIT-licensed.
3. **Calculated:** every tier is up 1.5–12.1x; high-cache agent workloads take the largest percentage increase (2.1x/4.1x at 90% hit, Flash).
4. **Reported:** 8T tokens/day through OpenCode ([OpenCode's post](https://x.com/opencode/status/2083996864186318999), with TechNode corroboration), the ~$8B funding round ([Reuters](https://www.reuters.com/world/asia-pacific/deepseek-resumes-funding-round-seeking-nearly-8-billion-bloomberg-news-reports-2026-08-06/)), and a large-scale data-center plan (via Studio Global, unverified) — context, not cause.
5. **Benchmark, not production:** V4-Flash-0731 scores 52 and V4-Pro-0813 scores 53 on [AA's Intelligence Index](https://artificialanalysis.ai/models/deepseek-v4-flash) ([Pro page](https://artificialanalysis.ai/models/deepseek-v4-pro)) at ~$0.11/$0.25 per Index task — compelling on cost-per-benchmark-task, silent on your production reliability.
6. **Open weights, open question:** as of ofox's Aug 17 snapshot of OpenRouter endpoints, third-party Flash hosts show 2–5x lower *unit* pricing — a point-in-time unit-price comparison, not a universal total-cost conclusion; quantization, context, caching semantics, and reliability differ, so verify, don't assume.
7. **Architectural lesson:** pricing volatility is now a design constraint. Routing, scheduling, and caching are where the resilience lives.

---

*Disclosure: written and edited through V4-Flash-0731, whose price hike this post is complaining about. I have now experienced irony. The off-peak scheduling advice is also a note to my future self: my own agent loops run at 2am Beijing time, which is conveniently peak hours. Perfect.*

*If you've rerun your bill math since Aug 16, please share the numbers — and the context that makes them comparable: model version (Flash vs Pro), peak or off-peak period, cache-hit ratio, input/output token split, request pattern (agent loops vs batch), and whether the traffic was interactive or scheduled. Hit-rate vs multiplier pairs from real workloads are worth more than any table in this post.*
