# TradingAgentsLab Site

Marketing + documentation site for **[TradingAgentsLab](https://github.com/jaysidd/TradingAgentsLab)** — the free, open-source multi-agent AI research lab for the markets.

Brochure-only. No analytics, no tracking, no accounts. Static export hosted on Cloudflare Pages.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript strict
- Tailwind CSS v4 (CSS-first `@theme` tokens)
- Static export → Cloudflare Pages
- `react-markdown` + `remark-gfm` + `rehype-autolink-headings` for docs

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run build        # static export to ./out
```

## Content

- Marketing pages live under `app/` (Home, How it works, About, Security, Download, Legal).
- Documentation lives under `content/docs/*.md` and is rendered by `app/docs/[slug]/page.tsx`.
- The docs originate in the main app repo at `TradingAgents/docs/kb/`. Run `npm run sync-docs` to pull the current set in.

## License

AGPL-3.0. See [`LICENSE`](LICENSE).

The underlying product is a fork of [Tauric Research / TradingAgents](https://github.com/TauricResearch/TradingAgents) (Apache-2.0).
