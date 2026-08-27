---
title: "In Tibo We Trust: Codex Has a Central Bank Now"
description: "Tibo hinted at another Codex usage reset, but the bigger story is the institution built around the button: compute allocation, forward guidance, reset trackers, and a community economy that moves before the quota does."
pubDate: 2026-08-27
updatedDate: 2026-08-27
tags:
  - Codex
  - OpenAI
  - Usage Limits
  - Token Economics
  - AI Agents
  - Developer Tools
author: "Kenny && GPT"
lang: en
---

## Twenty-One Words of Monetary Policy

On August 27, 2026, Tibo Sottiaux posted the kind of sentence that now moves an entire developer economy:

> *"A good thing about having aged is that I feel that it’s been 20 years since I’ve pressed the reset button."*

He then wondered whether he could find the button tomorrow and dust it off. That was all. No plan table, no eligibility matrix, no exact time zone. Just [one deliberately theatrical post](https://x.com/thsottiaux/status/2092862554632826968) and the word **tomorrow**.

Within minutes, the usual machinery started. People switched to expensive reasoning modes. Others worried they had not used enough of their remaining quota. Reset trackers raised their probability estimates. Someone, somewhere, almost certainly asked an agent to build an agent that burns quota before the reset arrives.

Important factual line: **as of this writing, Tibo's post is a hint, not confirmation that a reset has happened or a permanent policy announcement.** The final source of truth is still your own Codex usage screen.

But the hint is interesting even if the button stays dusty. The reset has become larger than the quota it refreshes. It is now a product surface, a communication channel, a community ritual, and something resembling monetary policy for compute.

Codex has a central bank now. Tibo is its extremely online chairman.

---

## First, Three Different Things Are Called a Reset

The community uses "reset" for several mechanisms that feel similar in the moment but give users very different kinds of control.

| Mechanism | What it means | Who controls the timing? |
|---|---|---|
| **Scheduled usage window** | Your normal allowance becomes available again according to the limits shown for your account | The product's regular schedule |
| **Global / hard reset** | OpenAI refreshes usage broadly across eligible accounts | OpenAI |
| **Banked reset** | A reset is credited to your account for you to redeem later, subject to its terms and expiry | You |

The first is ordinary product operation. The second is the big public button associated with Tibo's announcements. The third is closer to a stored option: it can be saved until it is useful instead of landing when you happen to have 92% remaining.

OpenAI's [current Codex pricing documentation](https://learn.chatgpt.com/docs/pricing) says local messages and cloud chats on ChatGPT plans share a five-hour window, with additional weekly limits potentially applying. It also makes clear that consumption is not a simple message counter: model choice, task complexity, context, reasoning, tool use, retrieval, caching, and speed all affect how quickly the allowance moves. The dashboard—or `/status` in an active CLI session—is where OpenAI tells users to check their actual limits.

This matters because a global reset does not manufacture GPUs. It changes how much access eligible accounts may claim against a finite compute pool. The percentage goes back up; the datacenter does not become 100% larger.

That is where the central-bank analogy starts to become useful.

---

## The Exception Became an Institution

Early resets had an intuitive shape: something broke, usage was counted unfairly, so OpenAI restored the allowance.

A third-party, source-linked analysis called the [Tibo Reset Index](https://wasnotwas.com/artifacts/codex-reset-forecast/tibo-reset-index.html) counted **24 broad Codex and ChatGPT Work reset announcements in 100 days** through August 24. Its observed median gap was **2.3 days**. Those are the tracker author's numbers, not OpenAI statistics, and the tracker deliberately excludes teasers, jokes, individual favors, and banked-only credits from its main count.

The reasons in its public ledger show how the button's job expanded:

| Period | Public reason attached to resets |
|---|---|
| May–June | Cache-hit regressions, unexpectedly fast usage drain, and reliability incidents |
| Early July | Product regressions and the GPT-5.6 Sol launch |
| Mid-July | Six, eight, nine, and ten million active-user milestones |
| Late July | An almost-global outage and rapid ChatGPT Work adoption |
| August | Efficiency celebrations, model availability, 15 million users, and more usage fixes |

The pattern is the point. The reset began as customer remediation. It then became launch infrastructure, milestone confetti, a scaling-pressure release valve, and recurring performance art.

None of that means the fixes were fake. The May cache regression and the later long-session inefficiencies were concrete product problems. Restoring usage after faulty consumption is the obvious fair response. But once the same mechanism also celebrates adoption and weekend vibes, users stop reading it as an exception. They start treating it as an expected part of the plan.

An emergency measure becomes an institution when people organize their behavior around its return.

---

## What Tibo Is Actually "Printing"

A token quota is not money, and Tibo is not literally Jerome Powell with better memes. Still, the analogy explains more than it should.

Think of your included Codex allowance as a claim on scarce compute. A hard reset expands the amount of near-term work millions of users are permitted to request without buying more credits. It does not add physical supply, but it increases effective demand immediately.

That creates three central-bank-like effects:

### 1. Liquidity

Accounts stuck at zero can work again. Repositories get scanned, agents get dispatched, and long-running tasks restart. The reset injects usable capacity into the user side of the system.

### 2. Forward Guidance

The funniest part of the latest hint is that nothing has been reset yet. Tibo merely suggested the button might reappear tomorrow, and behavior moved in advance.

In finance, **forward guidance** means influencing expectations by signalling what policy may do later. In Codex, it means someone reads "tomorrow," selects Sol at xhigh, and decides that tonight is an excellent time to ask twelve agents to refactor a monorepo.

### 3. Confidence

Users tolerate uncertain consumption more easily when they believe unexpected drain may be compensated. That belief is valuable. It can also become dangerous if people quietly price future discretionary resets into a subscription that never promised them.

The analogy ends at governance. Real central banks publish frameworks, minutes, targets, and scheduled decisions. The Codex Federal Reserve currently publishes jokes on X and occasionally says, "Hi. It is done."

Honestly, the engagement metrics suggest Tibo's version has better product-market fit.

---

## The Reset Economy Changes User Behavior

Repeated resets do not merely replenish usage. They create incentives.

If users expect a hard reset tomorrow, unused allowance feels perishable. The rational move appears to be spending it tonight, even if the work is low priority. If they expect no reset, the rational move is conserving quota for important tasks. One vague post can flip the decision.

This produces the Codex version of a bank run, except everyone is running *toward* the inference cluster:

- Move planned work forward before the old allowance disappears.
- Use a stronger model or higher reasoning effort than usual.
- Dispatch parallel agents that would otherwise run sequentially.
- Redeem or preserve a banked reset based on guesses about timing.
- Refresh X, Reddit, and community trackers instead of checking the repository.

These are community-observed behaviors, not audited OpenAI traffic data. But the surrounding software is real. Developers have built reset histories, probabilistic forecasts, Telegram feeds, browser dashboards, and even a local-first [Tibo Reset Watch](https://github.com/Chloride233/tibo-reset-watch) with separate classifiers for possible and confirmed resets.

That is a remarkable amount of infrastructure around one man's posting habits.

It is also a small warning about **moral hazard**: when people believe unused quota will soon be wiped and replenished, they have an incentive to consume now. A generous reset can create the load spike that makes rationing more necessary. The mechanism designed to relieve frustration may briefly increase demand.

I am not claiming OpenAI's telemetry proves this loop. I am saying the incentive points in that direction, and the "Sol Ultra time" replies under every hint show users understand it perfectly.

---

## Intermission: Emergency Meeting of the Codex FOMC

*The following section contains no reporting, no leaks, and dangerously little macroeconomic training.*

**CHAIRMAN TIBO:** Good afternoon. The committee has voted to expand the token supply. The reset button was located beneath three launch plans and a Luna benchmark.

**REPORTER:** Does this mean usage is now unlimited?

**CHAIRMAN TIBO:** No. It means you have misunderstood both the word "limit" and the word "reset."

**REPORTER:** Was the decision driven by weak cache-hit data?

**CHAIRMAN TIBO:** We remain data dependent. Also, someone dared me on X.

**COMMITTEE MEMBER:** I dissent. Users should switch routine work to Luna.

**CHAIRMAN TIBO:** Your dissent has been recorded at medium reasoning effort.

Markets rallied. Three monorepos were migrated before dinner. The five-hour yield curve inverted.

*Tin foil hat off. Back to the actual product.*

---

## Generosity, Compensation, or PR Candy?

The honest answer is **all three can be true at once**.

### It is real generosity

Extra usable allowance has real value. Developers complete work they otherwise could not run under the included plan. Calling the reset "performative" does not make the compute imaginary.

### It is fast compensation

When usage drains incorrectly or a reliability incident wastes part of a customer's allowance, a broad reset is legible and immediate. Investigating every account and calculating individualized credits would be slower and harder to explain.

### It is exceptionally effective PR

A reset announcement can convert an angry rate-limit conversation into a festival within minutes. Users post screenshots, launch agent swarms, thank the team, and build saint-themed dashboards. Very few status updates produce fan art.

This does not require a cynical conspiracy. Good customer remediation often produces good publicity. The problem begins only if the ritual substitutes for clarity—if users need to monitor one executive's social feed to understand the practical value of a paid subscription.

A reset is a good apology. It is not a usage-accounting system.

---

## What the Button Cannot Fix

The reset clears the meter. It does not necessarily explain why the meter moved.

Users still need answers to less entertaining questions:

- Which model, reasoning level, speed, or tool consumed the allowance?
- How much came from cached versus uncached context?
- Did a long session become more expensive after compaction?
- Which tasks delivered enough value to justify their cost?
- Will an announced change affect the five-hour window, the weekly limit, or both?

OpenAI's documentation is improving here. It now publishes estimated local messages by model and plan, explicitly says that caching and tools affect usage, and directs users to the dashboard for their own state. But estimates remain ranges because agent tasks are not uniform. "One message" can mean renaming a variable or letting an agent inspect a million-token repository with tools.

This is why banked resets are structurally better for users than surprise hard resets. A hard reset can arrive ten minutes after someone's natural window refreshed, wasting most of its practical benefit. A banked reset transfers timing control to the user. It is less theatrical, but more useful.

If OpenAI wants the reset ritual without the confusion, that is the product direction: clearer per-task usage, clearer window timing, explicit reset scope, and user-controlled compensation when possible.

---

## What You Should Actually Do

Enjoy the joke. Do not build your engineering schedule around it.

1. **Treat hints as hints.**

   "Tomorrow" is not a service-level agreement. Until your dashboard changes or a confirmed announcement lands, assume your current allowance is the allowance you have.

2. **Check `/status`, not the vibes.**

   Your own account and workspace are the source of truth. Rollouts and eligibility can differ, while third-party trackers only observe public signals.

3. **Spend quota on work you would be happy to keep.**

   If a reset motivates you to run a deferred test suite, audit, migration, or review, great. Generating useless work merely to avoid "wasting" an expiring balance is the AI equivalent of buying airport chocolate because foreign coins cannot be exchanged.

4. **Route models intentionally.**

   OpenAI itself recommends switching to a smaller model when approaching limits. Sol is for the hardest ambiguous work; Terra is the everyday workhorse; Luna is the high-volume option. Use the expensive lane because the task needs it, not because Tibo mentioned furniture cleaning.

5. **Value control over spectacle.**

   If you have a banked reset, check its terms and expiry, then redeem it when it unlocks meaningful work. A saved reset is optionality. A surprise global reset is weather.

---

## Takeaways

1. **The latest post is a signal, not confirmation.** Tibo hinted that he may dust off the reset button tomorrow; your usage dashboard remains the source of truth.
2. **The reset is now a product surface.** A third-party ledger counted 24 broad announcements in 100 days, spanning compensation, launches, milestones, outages, and celebrations.
3. **Forward guidance changes demand before the button is pressed.** Users conserve or burn quota based on expectations, and an ecosystem of trackers now exists to shape those expectations.
4. **Generosity, compensation, and PR can coexist.** Extra compute is real, remediation is fair, and the ritual generates enormous goodwill.
5. **A reset does not replace transparency.** Users still need clearer usage attribution, window timing, and reset scope.
6. **Banked resets are the better instrument.** They give users control over timing instead of rewarding whoever happened to be empty when the global button landed.

Tibo may find the button tomorrow. He may dust it up. The percentage may jump back to 100%, and a million terminals may immediately begin humming.

But the more interesting thing has already happened: Codex users built expectations, rituals, forecasts, and software around a discretionary act of compute allocation.

That is not just a reset anymore. That is monetary policy—with better memes and significantly more TypeScript.

---

*Full disclosure: this post was co-written with GPT inside Codex, so yes, it consumed part of the very allowance it is analyzing. If Chairman Tibo does press the button tomorrow, we promise to reinvest the liquidity responsibly.*
