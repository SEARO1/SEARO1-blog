import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { getTagSlug } from "../src/utils/tags.ts";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(projectRoot, "dist");
const siteBase = "/SEARO1-blog";

async function collectHtmlFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const nested = await Promise.all(entries.map(async (entry) => {
		const entryPath = path.join(directory, entry.name);
		if (entry.isDirectory()) return collectHtmlFiles(entryPath);
		return entry.name.endsWith(".html") ? [entryPath] : [];
	}));
	return nested.flat();
}

async function outputExistsForHref(href) {
	const pathname = href.split(/[?#]/, 1)[0];
	if (pathname !== siteBase && !pathname.startsWith(`${siteBase}/`)) return false;

	const relativePath = pathname === siteBase
		? ""
		: decodeURIComponent(pathname.slice(siteBase.length + 1));
	const outputPath = relativePath === "" || relativePath.endsWith("/")
		? path.join(distRoot, relativePath, "index.html")
		: path.join(distRoot, relativePath);

	try {
		await stat(outputPath);
		return true;
	} catch {
		return false;
	}
}

test("tag slugs use one kebab-case route format", () => {
	assert.equal(getTagSlug("DeepSeek"), "deepseek");
	assert.equal(getTagSlug(" API Pricing "), "api-pricing");
	assert.equal(getTagSlug("Reinforcement Learning"), "reinforcement-learning");
});

test("pagination metadata and copy use the middle-dot separator", async () => {
	const outputPath = path.join(distRoot, "blog", "page", "2", "index.html");
	const output = await readFile(outputPath, "utf8");

	assert.match(output, /<title>Blog · Page 2 \| SEARO1 Blog<\/title>/);
	assert.match(output, /· Page 2 of 2/);
	assert.doesNotMatch(output, /\?\?Page|繚/);
});

test("all built root-relative links stay under the site base and resolve", async () => {
	const htmlFiles = await collectHtmlFiles(distRoot);
	const broken = [];

	for (const htmlFile of htmlFiles) {
		const html = await readFile(htmlFile, "utf8");
		const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);

		for (const href of hrefs) {
			if (!href.startsWith("/") || href.startsWith("//")) continue;
			if (!(await outputExistsForHref(href))) {
				broken.push(`${path.relative(projectRoot, htmlFile)} -> ${href}`);
			}
		}
	}

	assert.deepEqual(broken, []);
});
