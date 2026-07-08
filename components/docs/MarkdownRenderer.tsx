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

/**
 * Minimal hast node shape for the Pro-callout transform. We type only what we
 * touch rather than pulling in `@types/hast`.
 */
interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

function hastText(node: HastNode): string {
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(hastText).join('');
}

/**
 * Style the KB-wide "Pro" convention as a visual callout.
 *
 * The product knowledge base marks Pro-only content with a blockquote whose
 * first line is a bold "Pro" lead: `> **Pro** ...`. This plugin finds those
 * blockquotes (first paragraph begins with a <strong> reading exactly "Pro"),
 * tags the blockquote `.pro-callout`, and turns the "Pro" lead into a
 * `.pro-badge` pill. The match is exact, so ordinary blockquotes, including
 * pro.md's italic disclaimer, still render as plain quotes. AST surgery keeps
 * this out of rendered-children juggling and out of `dangerouslySetInnerHTML`.
 */
function rehypeProCallout() {
  const walk = (node: HastNode) => {
    if (node.tagName === 'blockquote' && node.children) {
      const para = node.children.find((c) => c.type === 'element');
      // The "Pro" lead must be the first *meaningful* child of the paragraph,
      // not merely the first <strong> anywhere in it. Skip leading whitespace
      // text nodes only, so `> **Pro** ...` matches but `> Upgrade to **Pro**`
      // (a plausible future mid-sentence bold) does not.
      const lead = para?.children?.find(
        (c) => !(c.type === 'text' && (c.value ?? '').trim() === ''),
      );
      if (
        para?.tagName === 'p' &&
        lead?.tagName === 'strong' &&
        hastText(lead).trim() === 'Pro'
      ) {
        const prev = node.properties?.className;
        const classes = Array.isArray(prev)
          ? prev
          : typeof prev === 'string'
            ? prev.split(/\s+/)
            : [];
        node.properties = {
          ...node.properties,
          className: [...classes, 'pro-callout'],
        };
        lead.tagName = 'span';
        lead.properties = { ...lead.properties, className: ['pro-badge'] };
      }
    }
    node.children?.forEach(walk);
  };
  return (tree: unknown) => walk(tree as HastNode);
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
          rehypeProCallout,
        ]}
        components={{ a: MdAnchor }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
