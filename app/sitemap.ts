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
  '/tour/',
];

// Family page is listed at lower priority per family-wide rollout rule
// (priority 0.5). Useful surface but not a primary marketing entry.
const FAMILY_ROUTE = '/family/';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const docRoutes = getAllDocSlugs().map((slug) => `/docs/${slug}/`);
  const all = [...STATIC_ROUTES, ...docRoutes, FAMILY_ROUTE];

  return all.map((path) => {
    let priority = 0.7;
    if (path === '/') priority = 1;
    else if (path === FAMILY_ROUTE) priority = 0.5;
    return {
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority,
    };
  });
}
