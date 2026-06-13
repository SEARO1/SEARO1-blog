export const getNavLinks = (base: string) => {
	const normalized = base.endsWith('/') ? base : base + '/';
	return [
		{ href: normalized, label: 'Home' },
		{ href: `${normalized}blog/`, label: 'Blog' },
		{ href: `${normalized}tags/`, label: 'Tags' },
		{ href: `${normalized}about/`, label: 'About' },
	];
};
