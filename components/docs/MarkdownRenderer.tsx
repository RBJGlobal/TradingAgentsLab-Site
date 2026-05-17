import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { AnchorHTMLAttributes } from 'react';

/**
 * Server-rendered markdown for docs pages.
 *
 * No `dangerouslySetInnerHTML`, react-markdown parses into the React tree,
 * which prevents script injection from sneaking through an upstream KB sync.
 * We deliberately do NOT include rehype-raw.
 */

/**
 * Rewrite intra-KB markdown links so they resolve to our /docs/<slug>/ route.
 *
 * The KB markdown sources live in the desktop product repo, where authors
 * cross-link like `[Reading the debate](reading-the-debate.md)` so the
 * pages also work as a flat directory in the source. When rendered on the
 * web, those become 404s, fix them in-flight.
 *
 * Handles:
 *   - `slug.md`
 *   - `./slug.md`
 *   - `slug.md#anchor`
 *   - leaves http(s):, mailto:, tel:, and existing /-rooted links alone
 */
const DOC_LINK_RE = /^\.?\/?([a-z0-9-]+)\.md(#.*)?$/i;

function rewriteHref(href: string | undefined): string | undefined {
  if (!href) return href;
  const m = href.match(DOC_LINK_RE);
  if (!m) return href;
  const [, slug, anchor = ''] = m;
  return `/docs/${slug}/${anchor}`;
}

function MdAnchor(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = rewriteHref(props.href);
  const isExternal =
    typeof href === 'string' && /^https?:\/\//i.test(href);

  if (isExternal) {
    return (
      <a {...props} href={href} target="_blank" rel="noopener noreferrer" />
    );
  }
  return <a {...props} href={href} />;
}

export default function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <div className="docs-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'append',
              properties: { className: ['anchor'], ariaLabel: 'Link to section' },
              content: { type: 'text', value: '#' },
            },
          ],
        ]}
        components={{ a: MdAnchor }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
