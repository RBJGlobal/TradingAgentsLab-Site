import type { Metadata } from 'next';

/**
 * Canonical site metadata.
 *
 * Used by `app/layout.tsx` as the default <head> for every page; individual
 * pages can override `title` / `description` by exporting their own
 * `metadata`. Mission statement is locked verbatim per CLAUDE.md.
 */

export const SITE_URL = 'https://tradingagentslab.com';
export const SITE_NAME = 'Trading Agents Lab';
export const SITE_TAGLINE = 'AI-driven Diligence on any ticker.';

export const SITE_DESCRIPTION =
  'Trading Agents Lab is a free, open-source desktop research lab where multi-agent LLMs run institutional-grade diligence on any ticker. Educational and research purposes only — not investment advice.';

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Junaid Siddiqi' }],
  keywords: [
    'multi-agent LLM',
    'AI research',
    'trading research',
    'educational',
    'open source',
    'AGPL',
    'paper trading',
    'agentic AI',
    'LangGraph',
  ],
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/icon.svg',
  },
};
