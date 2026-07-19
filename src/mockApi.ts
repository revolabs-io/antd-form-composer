/** Simulated CMS API for demo validators. */

const TAKEN_SLUGS = new Set([
  'home',
  'about',
  'blog',
  'contact',
  'admin',
  'api',
  'login',
]);

const RESERVED_SLUG_PATTERN = /^(admin|api|login|wp-admin|null)$/i;

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUG_PATTERN.test(slug);
}

export async function checkSlugAvailable(
  slug: string,
  delayMs = 600,
): Promise<{ available: boolean; reason?: string }> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  const normalized = slug.trim().toLowerCase();

  if (!normalized) {
    return { available: false, reason: 'Slug is required' };
  }

  if (isReservedSlug(normalized)) {
    return {
      available: false,
      reason: `"${normalized}" is a reserved CMS path`,
    };
  }

  if (TAKEN_SLUGS.has(normalized)) {
    return {
      available: false,
      reason: `Slug "${normalized}" is already used by another page`,
    };
  }

  return { available: true };
}

export const MEDIA_LIBRARY = [
  {
    id: 'cover-1',
    label: 'Hero mountain',
    url: 'https://picsum.photos/seed/cms-hero/640/360',
  },
  {
    id: 'cover-2',
    label: 'Office workspace',
    url: 'https://picsum.photos/seed/cms-office/640/360',
  },
  {
    id: 'cover-3',
    label: 'Product shot',
    url: 'https://picsum.photos/seed/cms-product/640/360',
  },
];

export const CATEGORY_TREE = [
  {
    value: 'blog',
    label: 'Blog',
    children: [
      { value: 'news', label: 'News' },
      { value: 'guides', label: 'Guides' },
      { value: 'releases', label: 'Product releases' },
    ],
  },
  {
    value: 'pages',
    label: 'Pages',
    children: [
      { value: 'landing', label: 'Landing' },
      { value: 'legal', label: 'Legal' },
    ],
  },
  {
    value: 'resources',
    label: 'Resources',
    children: [
      { value: 'docs', label: 'Documentation' },
      { value: 'case-studies', label: 'Case studies' },
    ],
  },
];
