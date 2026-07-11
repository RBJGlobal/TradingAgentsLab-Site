/**
 * Pre-render mermaid fences in the docs KB to static SVGs.
 *
 * The docs markdown is synced from the app repo, where GitHub renders
 * ```mermaid fences natively. On the site, react-markdown would show the
 * raw source instead, so this script renders each fence to a themed SVG
 * (scripts/mermaid-config.json, site palette) committed under
 * public/diagrams/, plus a manifest at lib/mermaid-manifest.json keyed by
 * a sha256 of the fence source. MarkdownRenderer swaps a fence for its
 * SVG when the hash matches and falls back to the plain code block when
 * it does not, so an upstream diagram edit degrades gracefully until this
 * script is re-run.
 *
 * Run it after every docs re-sync:  node scripts/render-mermaid.mjs
 * (Uses npx @mermaid-js/mermaid-cli; local-only, never part of the CI
 * build. Output SVGs are committed.)
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = path.join(root, 'content', 'docs');
const outDir = path.join(root, 'public', 'diagrams');
const manifestPath = path.join(root, 'lib', 'mermaid-manifest.json');
const configPath = path.join(root, 'scripts', 'mermaid-config.json');

const FENCE_RE = /^```mermaid\r?\n([\s\S]*?)^```\s*$/gm;
const HEADING_RE = /^#{1,6}\s+(.+)$/;

/** Same normalization the renderer uses before hashing. */
const hashOf = (source) =>
  createHash('sha256').update(source.trim()).digest('hex');

/** Nearest heading above the fence, for alt text. */
function headingAbove(markdown, fenceIndex) {
  const lines = markdown.slice(0, fenceIndex).split('\n');
  for (let i = lines.length - 1; i >= 0; i--) {
    const m = lines[i].match(HEADING_RE);
    if (m) return m[1].trim();
  }
  return null;
}

fs.mkdirSync(outDir, { recursive: true });
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mermaid-'));

const manifest = {};
const rendered = [];

for (const file of fs.readdirSync(docsDir).filter((f) => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '');
  const markdown = fs.readFileSync(path.join(docsDir, file), 'utf8');
  let match;
  let idx = 0;
  while ((match = FENCE_RE.exec(markdown)) !== null) {
    idx += 1;
    const source = match[1];
    const hash = hashOf(source);
    const heading = headingAbove(markdown, match.index);
    const svgName = `${slug}-${idx}-${hash.slice(0, 10)}.svg`;
    const svgPath = path.join(outDir, svgName);

    const mmdPath = path.join(tmpDir, `${slug}-${idx}.mmd`);
    fs.writeFileSync(mmdPath, source);
    execFileSync(
      'npx',
      [
        '-y',
        '@mermaid-js/mermaid-cli',
        '-i', mmdPath,
        '-o', svgPath,
        '-c', configPath,
        '-b', 'transparent',
      ],
      { stdio: 'inherit' },
    );

    // Pull the intrinsic size out of the SVG so the <img> can carry
    // width/height and the docs page keeps a stable layout while loading.
    const svg = fs.readFileSync(svgPath, 'utf8');
    const viewBox = svg.match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/);
    const width = viewBox ? Math.round(Number(viewBox[1])) : undefined;
    const height = viewBox ? Math.round(Number(viewBox[2])) : undefined;

    manifest[hash] = {
      src: `/diagrams/${svgName}`,
      alt: heading
        ? `Diagram: ${heading} (rendered from the mermaid source in ${file})`
        : `Diagram rendered from the mermaid source in ${file}`,
      ...(width && height ? { width, height } : {}),
    };
    rendered.push(`${file} #${idx} "${heading ?? 'untitled'}" -> ${svgName}`);
  }
}

// Drop stale SVGs from earlier runs so public/ carries only live diagrams.
const live = new Set(Object.values(manifest).map((e) => path.basename(e.src)));
for (const f of fs.readdirSync(outDir)) {
  if (f.endsWith('.svg') && !live.has(f)) {
    fs.unlinkSync(path.join(outDir, f));
    rendered.push(`removed stale ${f}`);
  }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
fs.rmSync(tmpDir, { recursive: true, force: true });

console.log(`\n${Object.keys(manifest).length} diagram(s):`);
for (const line of rendered) console.log('  ' + line);
console.log(`manifest -> ${path.relative(root, manifestPath)}`);
