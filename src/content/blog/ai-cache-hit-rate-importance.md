---
title: "Your AI Cache Hit Rate is Costing You — Here's How I Fixed Mine"
description: "How I improved my DeepSeek prompt cache hit rate to ~98% by tuning Claude Code environment variables through cc-switch."
pubDate: 2026-07-11
updatedDate: 2026-07-11
tags:
  - AI
  - Caching
  - Claude Code
  - DeepSeek
  - cc-switch
  - LLM
  - Cost Optimization
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

This combo is powerful and cost-effective — *if* you hit the cache. If you don't, you pay full price for every request, and it adds up fast.

## The Problem: Silent Cache Degradation

When the project was small, cache hits were high. Fresh context, clean prompts, everything worked fine.

As the codebase grew and I accumulated more sessions, the cache hit rate started dropping. The change was gradual — I didn't notice at first. But my bill told a different story.

Why does cache hit rate degrade as projects grow?

Every Claude Code request sends a lot of context: system prompts, file snippets, attribution headers, feedback survey payloads. Many of these contain **dynamic elements** — timestamps, random IDs, variable header values. When your cache key changes on every request because of a random attribution header, your cache becomes worthless.

For **prompt caching** (also called prefix caching), the LLM provider caches the beginning of your prompt. If anything in that prefix changes between requests — even something invisible to you — it's a cache miss. You pay full price.

## The Root Cause: Dynamic Headers

The biggest offender was CLAUDE_CODE_ATTRIBUTION_HEADER. Claude Code injects a dynamic header for attribution on every outbound request. That header changes every single time. Every. Single. Request. That alone was responsible for the vast majority of my cache misses.

Other culprits included feedback survey data (unique payload per request), auto-compaction (shifts the prompt prefix), and the verbose default system prompt (contains variable components).

## The Fix: 6 Environment Variables

I dug into cc-switch config, Claude Code settings, and DeepSeek caching docs. These six variables made the difference:

### 1. CLAUDE_CODE_ATTRIBUTION_HEADER: "0"
**This is the biggest one.** Disables dynamic attribution header injection, which was the primary cause of cache key changes. Without this, your cache barely works.

### 2. CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1"
Claude Code sends auxiliary requests — file listings, capability probes, etc. These pollute the cache with one-off prefixes. Disabling non-essential traffic keeps the cache focused on actual coding work.

### 3. CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY: "1"
The feedback survey injects dynamic form data into the request. Every survey payload is unique → every request is a cache miss. Kill it.

### 4. DISABLE_AUTO_COMPACT: "1"
Auto-compaction manages context length by rewriting the prompt. Each compaction changes the prefix. A stable prefix is the #1 requirement for high cache hit rates. Disable it and manage context manually.

### 5. ENABLE_PROMPT_CACHING_1H: "1"
Explicitly enables a 1-hour TTL cache window. DeepSeek supports longer cache windows than some providers, so make sure you're actually using that capability.

### 6. CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT: "1"
The default system prompt is complex and contains variable components. Simplifying it removes more dynamic prefixes from your cache key.

## The Result

After applying these changes, my cache hit rate improved to roughly **98%**.

The difference in cost was immediate and significant. When most of your prompt prefix is cached, DeepSeek's discount pricing kicks in, and your per-request cost drops dramatically.

## One More Thing: Write Before You Code

Here's a practical tip that goes hand-in-hand with caching:

Before you ask your AI assistant to write code, **write a .md file first**. Describe:
- What you're trying to build
- The approach you want to take
- Edge cases to consider
- File structure and dependencies

This does two things:
1. **You get better output** — AI coding tools produce dramatically better results with a clear plan
2. **You get better caching** — stable, repeatable prompts across similar tasks keep your cache prefix consistent

I've found that spending 5-10 minutes writing a markdown spec before each coding session reduces the number of iterations (and therefore API calls) needed. Fewer calls plus better cache hits equals a lower bill.

## Takeaways

1. **Cache hit rate directly impacts your LLM costs** — this isn't a "nice to have", especially at scale
2. **Dynamic headers are silent cache killers** — disable attribution, surveys, and anything that produces unique values per request
3. **Simplify your prompt prefix** — the more stable the beginning of your prompt, the higher your cache hit rate
4. **Write a plan first** — better prompts mean fewer iterations and more cache-friendly usage patterns

If you're running Claude Code through cc-switch (or any similar setup), check your cache hit rate. Chances are, you're leaving money on the table.

*Have your own caching war stories? Or found other config tweaks that boost cache hit rates? I'd love to hear them.*
