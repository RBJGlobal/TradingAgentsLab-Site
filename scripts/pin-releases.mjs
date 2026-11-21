// Pins the download page to exact release files, so a build of the same
// commit always links the same DMGs. Run by hand when a new release is
// promoted to latest, then commit lib/releases.json:
//   node scripts/pin-releases.mjs          write the latest releases
//   node scripts/pin-releases.mjs --check  download each pinned file and
//                                          confirm its SHA-256 (no write)
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../lib/releases.json', import.meta.url);
const APPS = {
  lite: 'RBJGlobal/TradingAgentsLab',
  pro: 'RBJGlobal/TradingAgentsLab-Pro',
};

async function latest(repo) {
  const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'tradingagentslab-site' },
  });
  if (!res.ok) throw new Error(`${repo}: GitHub answered ${res.status}`);
  const rel = await res.json();
  const dmg = rel.assets?.find((a) => a.name?.endsWith('.dmg') && a.name?.includes('arm64'));
  if (!dmg) throw new Error(`${repo} ${rel.tag_name}: no arm64 .dmg asset`);
  const sha256 = String(dmg.digest ?? '').replace(/^sha256:/, '');
  if (!/^[0-9a-f]{64}$/.test(sha256)) throw new Error(`${repo} ${rel.tag_name}: asset has no SHA-256 digest`);
  return { version: rel.tag_name, url: dmg.browser_download_url, sha256 };
}

async function sha256Of(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'tradingagentslab-site' },
    signal: AbortSignal.timeout(240_000),
  });
  if (!res.ok) throw new Error(`${url}: answered ${res.status}`);
  const hash = createHash('sha256');
  for await (const chunk of res.body) hash.update(chunk);
  return hash.digest('hex');
}

if (process.argv.includes('--check')) {
  const pinned = JSON.parse(await readFile(FILE, 'utf8'));
  let ok = true;
  for (const [app, p] of Object.entries(pinned)) {
    const got = await sha256Of(p.url);
    const match = got === p.sha256;
    ok &&= match;
    console.log(`${app} ${p.version}: ${match ? 'SHA-256 matches' : `SHA-256 MISMATCH (got ${got})`}`);
  }
  if (!ok) process.exit(1);
} else {
  const out = {};
  for (const [app, repo] of Object.entries(APPS)) out[app] = await latest(repo);
  await writeFile(FILE, JSON.stringify(out, null, 2) + '\n');
  for (const [app, p] of Object.entries(out)) console.log(`${app} ${p.version} ${p.url}`);
}
