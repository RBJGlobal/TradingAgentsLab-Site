import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

export const dynamic = 'force-static';

// Explicit Allow for major AI crawlers. Today these are allowed by default,
// but listing them signals intent and protects against future WAF or bot-
// management defaults that could silently start blocking unknown UAs.
// Family-wide pattern, coordinated 2026-05-18 with iLoveMD developer.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
