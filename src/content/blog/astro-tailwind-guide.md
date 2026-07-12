---
title: "Getting Started with Astro and Tailwind CSS"
description: "A practical guide to setting up a blog with Astro 5 and Tailwind CSS 3, including content collections and dark mode."
pubDate: 2026-06-13
updatedDate: 2026-06-13
tags:
  - astro
  - tailwind
  - tutorial
  - web
author: Tesla
lang: en
---

Building a personal blog doesn't have to be complicated. In this guide, we'll walk through setting up a blog using **Astro 5** and **Tailwind CSS 3**.

## Why Astro?

Astro is a modern web framework that ships zero JavaScript by default. It uses a "content layer" approach where your content lives in a dedicated directory and gets processed at build time.

## Project Structure

A typical Astro project looks like this:

```
src/
  content/
    blog/         # Your Markdown/MDX posts
  layouts/        # Page layout components
  pages/          # Route pages
  components/     # Reusable components
  styles/         # Global CSS
```

## Content Collections

Astro 5 introduced a powerful content layer:

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    heroImage: image().optional(),
  }),
});

export const collections = { blog };
```

## Dark Mode

With Tailwind CSS, dark mode is straightforward:

```javascript
// tailwind.config.mjs
export default {
  darkMode: 'class',
  // ...
}
```

Toggle the `.dark` class on `<html>` and use `dark:` variants in your templates.

## Conclusion

Astro + Tailwind is a powerful combination for fast, content-focused websites. Happy building!
