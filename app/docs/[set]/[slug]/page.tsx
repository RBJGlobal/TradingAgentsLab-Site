import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  DOC_SETS,
  DOC_SET_LABELS,
  getAllDocSlugs,
  getAllDocs,
  getDoc,
  extractFaqEntries,
  isDocSet,
} from '@/lib/docs';
import { SITE_URL } from '@/lib/metadata';
import MarkdownRenderer from '@/components/docs/MarkdownRenderer';

interface Props {
  params: Promise<{ set: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return DOC_SETS.flatMap((set) =>
    getAllDocSlugs(set).map((slug) => ({ set, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { set, slug } = await params;
  const doc = isDocSet(set) ? getDoc(set, slug) : null;
  if (!doc || !isDocSet(set)) return { title: 'Not found' };
  // The two sets share slugs and often H1s ("Getting Started"), so Pro pages
  // carry a suffix to keep every page title unique.
  return {
    title: set === 'pro' ? `${doc.title} (Pro)` : doc.title,
    description: doc.description,
    alternates: { canonical: `/docs/${set}/${slug}/` },
  };
}

export default async function DocPage({ params }: Props) {
  const { set, slug } = await params;
  if (!isDocSet(set)) notFound();
  const doc = getDoc(set, slug);
  if (!doc) notFound();

  // Build prev/next nav from this set's ordering.
  const all = getAllDocs(set);
  const idx = all.findIndex((d) => d.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  // Primary node + BreadcrumbList in one @graph. Most docs are technical
  // documentation, so the primary node is TechArticle (these pages are the
  // site's ranking asset). The FAQ page is different: it is literally Q&A
  // content, so its primary node is FAQPage, machine-readable question/answer
  // pairs for AI answer engines (an emerging citation signal, not a SERP
  // ranking claim; advisor-reconciled 2026-07-03). FAQPage is confined to docs
  // that actually parse into Q&A entries; every other doc stays TechArticle.
  // BreadcrumbList is the one structured-data type Google still renders in the
  // SERP: Home › Docs › <this doc>. We inline the Organization for
  // author/publisher rather than referencing an @id, because this site has no
  // global Organization node to point at. Author/publisher is the org (RBJ
  // Global LLC) per the family SEO spec. No dateModified: the docs are synced
  // from the product repo, so there is no reliable per-page content-modified
  // date, and a churning sync date is an SEO anti-pattern.
  const docUrl = `${SITE_URL}/docs/${set}/${slug}/`;
  const organization = {
    '@type': 'Organization',
    name: 'RBJ Global LLC',
    url: SITE_URL,
  };
  const faqEntries = slug === 'faq' ? extractFaqEntries(doc.markdown) : [];
  const primaryNode =
    faqEntries.length > 0
      ? {
          '@type': 'FAQPage',
          url: docUrl,
          mainEntityOfPage: docUrl,
          inLanguage: 'en-US',
          publisher: organization,
          mainEntity: faqEntries.map((e) => ({
            '@type': 'Question',
            name: e.question,
            acceptedAnswer: { '@type': 'Answer', text: e.answer },
          })),
        }
      : {
          '@type': 'TechArticle',
          headline: doc.title,
          ...(doc.description ? { description: doc.description } : {}),
          url: docUrl,
          mainEntityOfPage: docUrl,
          inLanguage: 'en-US',
          author: organization,
          publisher: organization,
        };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      primaryNode,
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
            name: `${DOC_SET_LABELS[set]} docs`,
            item: `${SITE_URL}/docs/${set}/`,
          },
          {
            '@type': 'ListItem',
            position: 4,
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
          href={`/docs/${set}/`}
          className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ← all {DOC_SET_LABELS[set]} docs
        </Link>
      </div>

      <MarkdownRenderer markdown={doc.markdown} set={set} />

      <hr className="my-12 border-[var(--color-border-muted)]" />

      <nav
        aria-label="Adjacent docs"
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/docs/${set}/${prev.slug}/`}
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
            href={`/docs/${set}/${next.slug}/`}
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
