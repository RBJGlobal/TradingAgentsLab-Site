import fs from 'node:fs';
import path from 'node:path';

/**
 * Build-time docs loader.
 *
 * The docs are kept as plain Markdown under `content/docs/`. We optionally
 * support a YAML-ish front-matter header for `title`, `description`, and
 * `order` — but if absent, we derive title from the first H1 and order
 * alphabetically by slug.
 *
 * No `gray-matter` dependency by design — the front-matter shape is tiny
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
      description: (meta.description as string) || undefined,
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

export function getDoc(slug: string): DocContent | null {
  const file = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, 'utf-8');
  const { meta, body } = parseFrontMatter(raw);

  return {
    slug,
    title:
      (meta.title as string) || deriveTitle(body, prettifySlug(slug)),
    description: (meta.description as string) || undefined,
    order: (meta.order as number) ?? 999,
    category: (meta.category as string) || 'Reference',
    markdown: body,
  };
}
