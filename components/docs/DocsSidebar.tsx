'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { DocMeta } from '@/lib/docs';

/**
 * Grouped sidebar for the docs section.
 *
 * Marked `'use client'` so we can read `usePathname()` and highlight the
 * currently-active doc. The parent layout passes the doc list (filesystem
 * read at build time), and we derive the active slug from the pathname , 
 * keeps the layout itself a Server Component while letting the sidebar
 * react to navigation.
 */

interface Props {
  docs: DocMeta[];
}

const GROUPS: Array<{ name: string; slugs: string[] }> = [
  {
    name: 'Get started',
    slugs: ['getting-started', 'how-it-works', 'reading-the-debate'],
  },
  {
    name: 'Configure',
    slugs: [
      'configuring-llm-providers',
      'oauth',
      'local-llm',
      'data-providers',
      'cost-guard',
      'webhooks',
      'clawless-connector',
    ],
  },
  {
    name: 'Reference',
    slugs: [
      'crypto-tickers',
      'sentiment',
      'keyboard-shortcuts',
      'security-and-storage',
      'troubleshooting',
      'faq',
    ],
  },
];

function slugFromPathname(pathname: string | null): string | undefined {
  if (!pathname) return undefined;
  // /docs/getting-started/ → "getting-started"
  const m = pathname.match(/^\/docs\/([a-z0-9-]+)\/?$/i);
  return m ? m[1] : undefined;
}

export default function DocsSidebar({ docs }: Props) {
  const pathname = usePathname();
  const activeSlug = slugFromPathname(pathname);

  // Build a slug → meta map so we can render in our curated order and
  // fall through to "Other" for anything new in the KB we haven't placed.
  const bySlug = new Map(docs.map((d) => [d.slug, d]));
  const placedSlugs = new Set(GROUPS.flatMap((g) => g.slugs));
  const orphans = docs
    .filter((d) => !placedSlugs.has(d.slug))
    .map((d) => d.slug);

  const groups =
    orphans.length > 0
      ? [...GROUPS, { name: 'Other', slugs: orphans }]
      : GROUPS;

  return (
    <nav aria-label="Docs" className="space-y-8 text-sm">
      {groups.map((group) => (
        <div key={group.name}>
          <h3
            className="mb-3 text-xs uppercase tracking-widest text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {group.name}
          </h3>
          <ul className="space-y-1.5">
            {group.slugs.map((slug) => {
              const doc = bySlug.get(slug);
              if (!doc) return null;
              const isActive = slug === activeSlug;
              return (
                <li key={slug}>
                  <Link
                    href={`/docs/${slug}/`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block rounded px-2 py-1.5 transition-colors ${
                      isActive
                        ? 'bg-[var(--color-accent-tint)] text-[var(--color-accent)]'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {doc.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
