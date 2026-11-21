// Minimal static server for the exported site in out/, used by the
// cross-browser checks. Serves index.html for directories, redirects
// /path to /path/ when out/path/ exists (matches trailingSlash: true),
// and 404s anything else. No dependencies.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'out');
const port = Number(process.env.PORT ?? 4391);
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml', '.webmanifest': 'application/manifest+json',
};

async function isFile(p) { try { return (await stat(p)).isFile(); } catch { return false; } }
async function isDir(p) { try { return (await stat(p)).isDirectory(); } catch { return false; } }

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const path = normalize(decodeURIComponent(url.pathname));
  const file = join(root, path);
  if (!file.startsWith(root)) { res.writeHead(400).end(); return; }
  let target = null;
  if (path.endsWith('/') && (await isFile(join(file, 'index.html')))) target = join(file, 'index.html');
  else if (await isFile(file)) target = file;
  else if (await isDir(file)) { res.writeHead(308, { Location: path + '/' + url.search }).end(); return; }
  if (!target) {
    const nf = join(root, '404.html');
    res.writeHead(404, { 'Content-Type': types['.html'] }).end((await isFile(nf)) ? await readFile(nf) : 'Not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': types[extname(target)] ?? 'application/octet-stream' });
  res.end(await readFile(target));
}).listen(port, '127.0.0.1', () => console.log(`serving ${root} on http://127.0.0.1:${port}`));
