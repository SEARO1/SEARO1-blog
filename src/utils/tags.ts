export function normalizeTagLabel(tag: string): string {
	return tag.trim();
}

export function getTagSlug(tag: string): string {
	return normalizeTagLabel(tag)
		.normalize("NFKC")
		.toLowerCase()
		.replace(/\s+/gu, "-")
		.replace(/[^\p{Letter}\p{Number}-]+/gu, "")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}
