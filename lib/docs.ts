import fs from 'node:fs';
import path from 'node:path';

/**
 * Build-time docs loader.
 *
 * The docs are kept as plain Markdown under `content/docs/`. We optionally
 * support a YAML-ish front-matter header for `title`, `description`, and
 * `order`, but if absent, we derive title from the first H1 and order
 * alphabetically by slug.
 *
 * No `gray-matter` dependency by design, the front-matter shape is tiny
 * and a parser is a few lines.
 */

const DOCS_DIR = path.join(process.cwd(), 'content', 'docs');

export interface DocMeta {
  slug: string;
  title: string;
  description?: string;
  order?: number;
  category?: string;
}

export interface DocContent extends DocMeta {
  markdown: string;
}

function readDir(): string[] {
  if (!fs.existsSync(DOCS_DIR)) return [];
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'README.md');
}

function parseFrontMatter(raw: string): {
  meta: Record<string, string | number>;
  body: string;
} {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) return { meta: {}, body: raw };

  const meta: Record<string, string | number> = {};
  for (const line of fmMatch[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.+)\s*$/);
    if (!m) continue;
    const key = m[1];
    let value: string | number = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (/^-?\d+(\.\d+)?$/.test(value as string)) {
      value = Number(value);
    }
    meta[key] = value;
  }
  return { meta, body: fmMatch[2] };
}

function deriveTitle(body: string, fallback: string): string {
  const h1 = body.match(/^#\s+(.+?)\s*$/m);
  return h1 ? h1[1].trim() : fallback;
}

/**
 * Meta description, derived when no front-matter `description` is set. KB
 * pages open with an italic one-line summary right under the H1; use that.
 * Falls back to the first real paragraph's opening sentence (e.g. webhooks,
 * which has no italic summary). Keeps SEO descriptions in sync with the docs
 * source without needing front-matter on every file.
 */
function deriveDescription(body: string): string | undefined {
  const introEnd = body.search(/\r?\n(---|## )/);
  const intro = introEnd >= 0 ? body.slice(0, introEnd) : body;
  const italic = intro.match(/^\s*\*([^*\n][^*]*?)\*\s*$/m);
  if (italic) return italic[1].trim();
  for (const block of body.split(/\r?\n\r?\n/)) {
    const t = block.replace(/\s+/g, ' ').trim();
    if (!t || /^[#>*-]/.test(t) || t.startsWith('---')) continue;
    const sentence = t.match(/^(.+?[.!?])(\s|$)/);
    return (sentence ? sentence[1] : t).slice(0, 200).trim();
  }
  return undefined;
}

function prettifySlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function getAllDocSlugs(): string[] {
  return readDir().map((f) => f.replace(/\.md$/, ''));
}

export function getAllDocs(): DocMeta[] {
  const docs = readDir().map((file): DocMeta => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8');
    const { meta, body } = parseFrontMatter(raw);

    return {
      slug,
      title:
        (meta.title as string) || deriveTitle(body, prettifySlug(slug)),
      description: (meta.description as string) || deriveDescription(body),
      order: (meta.order as number) ?? 999,
      category: (meta.category as string) || 'Reference',
    };
  });

  docs.sort((a, b) => {
    if (a.order !== b.order) return (a.order ?? 999) - (b.order ?? 999);
    return a.title.localeCompare(b.title);
  });

  return docs;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * Flatten a slice of Markdown to plain text for FAQPage `acceptedAnswer.text`,
 * so the schema mirrors what the page renders: links collapse to their label,
 * bold/italic/inline-code markers drop, list bullets become sentences, and
 * whitespace collapses to single spaces.
 */
function flattenMarkdown(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links -> label text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/\*([^*]+)\*/g, '$1') // italic
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/^(?:\s*>)+\s?/gm, '') // blockquote markers, incl. nested (Pro callout)
    .replace(/^\s*[-*]\s+/gm, '') // list bullets
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract question/answer pairs from a FAQ doc's Markdown for FAQPage JSON-LD.
 * Questions are H3 headings (`### ...`); the answer is the prose that follows,
 * up to the next H2/H3 heading or a `---` rule. Returns [] when the doc has no
 * H3 questions, so callers can fall back to TechArticle. This keeps FAQPage
 * confined to pages that are LITERALLY Q&A content (advisor guardrail
 * 2026-07-03): accurate schema on accurate content, an emerging AI answer-engine
 * citation signal, not a SERP ranking claim.
 */
export function extractFaqEntries(markdown: string): FaqEntry[] {
  const entries: FaqEntry[] = [];
  let current: { question: string; body: string[] } | null = null;
  let inFence = false;

  const flush = () => {
    if (!current) return;
    const answer = flattenMarkdown(current.body.join('\n'));
    if (answer) entries.push({ question: current.question, answer });
    current = null;
  };

  for (const line of markdown.split(/\r?\n/)) {
    // Track fenced code blocks so a `###` or `---` inside a code example is
    // not mistaken for a question or a section rule. The docs are synced from
    // the product repo out-of-band, so a future sync could add a fenced snippet
    // to this page; guard against it rather than trust current content. Fence
    // marker lines are dropped from the answer text.
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) {
      const h3 = line.match(/^###\s+(.+?)\s*$/);
      if (h3) {
        flush();
        current = { question: flattenMarkdown(h3[1]), body: [] };
        continue;
      }
      // A new H2 section or a horizontal rule ends the current answer.
      if (/^##\s+/.test(line) || /^---\s*$/.test(line)) {
        flush();
        continue;
      }
    }
    if (current) current.body.push(line);
  }
  flush();

  return entries;
}

export function getDoc(slug: string): DocContent | null {
  const file = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, 'utf-8');
  const { meta, body } = parseFrontMatter(raw);

  return {
    slug,
    title:
      (meta.title as string) || deriveTitle(body, prettifySlug(slug)),
    description: (meta.description as string) || deriveDescription(body),
    order: (meta.order as number) ?? 999,
    category: (meta.category as string) || 'Reference',
    markdown: body,
  };
}
