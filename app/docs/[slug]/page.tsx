import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllDocSlugs, getAllDocs, getDoc } from '@/lib/docs';
import { SITE_URL } from '@/lib/metadata';
import MarkdownRenderer from '@/components/docs/MarkdownRenderer';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return { title: 'Not found' };
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/docs/${slug}/` },
  };
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  // Build prev/next nav from the global ordering.
  const all = getAllDocs();
  const idx = all.findIndex((d) => d.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  // TechArticle + BreadcrumbList in one @graph. TechArticle marks each doc as
  // technical documentation (these pages are the site's ranking asset), and
  // BreadcrumbList is the one structured-data type Google still renders in the
  // SERP: Home › Docs › <this doc>. We inline the Organization for
  // author/publisher rather than referencing an @id, because this site has no
  // global Organization node to point at. Author is the org (RBJ Global LLC)
  // per the family SEO spec. No dateModified: the docs are synced from the
  // product repo, so there is no reliable per-page content-modified date, and
  // a churning sync date is an SEO anti-pattern.
  const docUrl = `${SITE_URL}/docs/${slug}/`;
  const organization = {
    '@type': 'Organization',
    name: 'RBJ Global LLC',
    url: SITE_URL,
  };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: doc.title,
        ...(doc.description ? { description: doc.description } : {}),
        url: docUrl,
        mainEntityOfPage: docUrl,
        inLanguage: 'en-US',
        author: organization,
        publisher: organization,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Documentation',
            item: `${SITE_URL}/docs/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: doc.title,
            item: docUrl,
          },
        ],
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-6">
        <Link
          href="/docs/"
          className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ← all docs
        </Link>
      </div>

      <MarkdownRenderer markdown={doc.markdown} />

      <hr className="my-12 border-[var(--color-border-muted)]" />

      <nav
        aria-label="Adjacent docs"
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/docs/${prev.slug}/`}
            className="card flex flex-col text-left"
          >
            <span
              className="text-xs text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ← previous
            </span>
            <span className="mt-1 text-sm text-[var(--color-text-primary)]">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/docs/${next.slug}/`}
            className="card flex flex-col text-right"
          >
            <span
              className="text-xs text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              next →
            </span>
            <span className="mt-1 text-sm text-[var(--color-text-primary)]">
              {next.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
