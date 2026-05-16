import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/**
 * Server-rendered markdown for docs pages.
 *
 * No `dangerouslySetInnerHTML` — react-markdown sanitises by parsing into
 * the React tree, which prevents script injection from sneaking through
 * an upstream KB sync. We don't include rehype-raw on purpose.
 */
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
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
