import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';
import { getAllDocSlugs } from '@/lib/docs';

// Required for `output: 'export'`, without this, Next.js treats the route
// as dynamic and refuses to emit a static sitemap.xml.
export const dynamic = 'force-static';

// Marketing + docs only. Legal pages carry `robots: noindex` and are
// intentionally excluded so they don't compete with product pages for
// ranking; they remain reachable via the footer for human readers.
const STATIC_ROUTES = [
  '/',
  '/how-it-works/',
  '/about/',
  '/security/',
  '/download/',
  '/docs/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const docRoutes = getAllDocSlugs().map((slug) => `/docs/${slug}/`);
  const all = [...STATIC_ROUTES, ...docRoutes];

  return all.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
}
