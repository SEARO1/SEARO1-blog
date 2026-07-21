---
title: "Your AI Cache Hit Rate is Costing You ¡X Here's How I Fixed Mine"
description: "How I reached ~98% DeepSeek cache hits in Claude Code by stabilizing request prefixes."
pubDate: 2026-07-11
updatedDate: 2026-07-21
tags:
  - AI
  - Caching
  - Claude Code
  - DeepSeek
  - cc-switch
  - LLM
  - Cost Optimization
author: "Kenny && Tesla"
lang: en
---

I didn't care about cache hit rates when I started my project. I should have.

Two weeks in, my DeepSeek bill started climbing. Not because I was using the API more, but because my cache hit rate was quietly tanking. I had no idea until the numbers made me look.

Here's what happened, what I found, and how I fixed it.

## The Setup

I'm using **Claude Code** as my AI coding assistant, routed through **cc-switch** to **DeepSeek** as the backend provider.

- **Claude Code** is Anthropic's terminal-based coding agent.
- **cc-switch** is a community tool that lets you route Claude Code to different LLM providers.
- **DeepSeek** supports prompt caching: repeated prompt prefixes get a massive discount on token pricing.

This combo is powerful and cost-effective ¡X *if* you hit the cache. If a request misses the cache, the uncached portion is billed at the normal input rate, and it adds up fast.

## The Problem: Silent Cache Degradation

When the project was small, cache hits were high. Fresh context, clean prompts, everything worked fine.

As the project grew, I introduced more fresh file context, new sessions, and longer conversations. Those changes increased cache misses whenever the prompt prefix stopped being reusable. The change was gradual ¡X I didn't notice at first. But my bill told a different story.

Why does cache hit rate degrade? Every Claude Code request sends a lot of context: system prompts, file snippets, attribution headers, and other metadata. Many of these contain **dynamic elements** ¡X timestamps, random IDs, variable header values. When your cache key changes on every request because of a random attribution header, your cache becomes worthless.

For **prompt caching** (also called prefix caching), the LLM provider caches the beginning of your prompt. If anything in that prefix changes between requests ¡X even something invisible to you ¡X it's a cache miss. You pay full price for the uncached portion.

## The Root Cause: Dynamic Headers

The biggest offender was CLAUDE_CODE_ATTRIBUTION_HEADER. Claude Code injects a dynamic header for attribution on every outbound request. That header changes every single time. Every. Single. Request. In my setup, this was the most likely and most impactful source of cache instability.

Other contributors included feedback survey data, auto-compaction (which shifts the prompt prefix), and the verbose default system prompt.

## The Fix: Environment Variables That Actually Help

I dug into cc-switch config, Claude Code settings, and DeepSeek caching docs. Here's what made the difference and what didn't.

### 1. CLAUDE_CODE_ATTRIBUTION_HEADER: "0"
**This is the biggest one.** Disables dynamic attribution header injection, which was the primary cause of cache key changes. This is an official Claude Code environment variable, specifically designed for third-party LLM gateway routing compatibility. Without this, your cache barely works.

### 2. CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1"
Reduces auxiliary traffic ¡X file listings, capability probes, etc. This may reduce noise and unnecessary calls, but the main cache improvement in my setup came from stabilizing the prompt prefix. I keep it enabled for a cleaner workflow.

### 3. CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY: "1"
Mainly removes feedback prompts and reduces non-essential interaction noise. I keep it enabled for a cleaner workflow, rather than treating it as a proven primary cache fix.

### 4. DISABLE_AUTO_COMPACT: "1"
Auto-compaction manages context length by rewriting the prompt. Each compaction changes the prefix, which can break prefix cache. A stable prefix is the #1 requirement for high cache hit rates. If you disable it, remember to manually /compact when needed.

### 5. ENABLE_PROMPT_CACHING_1H: "1"
Included for Anthropic-compatible routing experiments. Whether it affects DeepSeek's cache retention depends on the provider or gateway implementation, so verify it with actual usage data rather than assuming it changes DeepSeek TTL.

### What I Removed From the List
I previously included CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT as a recommendation. After further investigation, this isn't a verifiable official Claude Code env var. The safer approach is to avoid injecting dynamic content (dates, random IDs, session IDs) into your system prompt yourself ¡X that's what actually keeps the prefix stable.

## The Result

After applying these changes, my cache hit rate improved to roughly **98%**.

The difference in cost was immediate and significant. When most of your prompt prefix is cached, DeepSeek's discount pricing kicks in, and your per-request cost drops dramatically. Note that a single request can be *partially* cached ¡X for example, an initial docs scan might have 24,960 cached tokens alongside 43,835 uncached tokens, rather than being entirely "full price."

## One More Thing: Write Before You Code

Here's a practical tip that complements caching:

Before you ask your AI assistant to write code, **write a .md file first**. Describe:
- What you're trying to build
- The approach you want to take
- Edge cases to consider
- File structure and dependencies

A stable Markdown spec can improve task quality and reduce unnecessary iterations. If the same spec remains in the session context for follow-up work, it can also become reusable cached context.

I've found that spending 5-10 minutes writing a markdown spec before each coding session reduces the number of iterations (and therefore API calls) needed. Fewer calls plus better cache efficiency equals a lower bill.

## Takeaways

1. **Cache hit rate directly impacts your LLM costs** ¡X cached and uncached input can have very different prices, especially at scale.
2. **Dynamic headers are silent cache killers** ¡X for Claude Code routed to a third-party Anthropic-compatible endpoint, disabling the dynamic attribution block was the highest-impact fix in my setup.
3. **Measure cache hits and misses per task or session** ¡X daily aggregates can hide cold starts and newly loaded project context.
4. **A new repository scan may have a low hit rate initially** ¡X follow-up tasks in the same session should recover as context becomes reusable.
5. **Treat provider-specific TTL claims and non-official environment variables as hypotheses to validate** ¡X not universal fixes.

If you're running Claude Code through cc-switch (or any similar setup), check your cache hit rate. Chances are, you're leaving money on the table.

*Have your own caching war stories? Or found other config tweaks that boost cache hit rates? I'd love to hear them.*