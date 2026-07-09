import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download',
  description:
    'Download Trading Agents Lab for quick analysis or Trading Agents Lab Pro for full-depth diligence. Both free, open source, AGPL-3.0, for macOS (Apple Silicon).',
  alternates: { canonical: '/download/' },
};

// Static export: resolved once at build time and baked into the page.
export const dynamic = 'force-static';

const LIGHT_RELEASES_PAGE =
  'https://github.com/RBJGlobal/TradingAgentsLab/releases/latest';
const PRO_RELEASES_PAGE =
  'https://github.com/RBJGlobal/TradingAgentsLab-Pro/releases/latest';

// Resolve the direct .dmg asset URL at build time so each Download button is a
// pure download (the file, not the GitHub release chooser). Asset names are
// version-pinned, so we fetch the latest release's arm64 .dmg rather than
// hardcoding a URL that goes stale next release. Falls back to the releases
// page if the API is unreachable or the repo has no release yet, so the
// button is never broken. no-store: Next persists force-cache fetches in
// .next/cache across builds, which would pin the button to whichever release
// was latest the first time the page ever built.
async function getDmgUrl(repo: string, fallback: string): Promise<string> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/releases/latest`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'tradingagentslab-site',
        },
        cache: 'no-store',
      },
    );
    if (!res.ok) return fallback;
    const data = (await res.json()) as {
      assets?: { name?: string; browser_download_url?: string }[];
    };
    const dmg = data.assets?.find(
      (a) => a.name?.endsWith('.dmg') && a.name?.includes('arm64'),
    );
    return dmg?.browser_download_url ?? fallback;
  } catch {
    return fallback;
  }
}

export default async function Download() {
  const [lightDmgUrl, proDmgUrl] = await Promise.all([
    getDmgUrl('RBJGlobal/TradingAgentsLab', LIGHT_RELEASES_PAGE),
    getDmgUrl('RBJGlobal/TradingAgentsLab-Pro', PRO_RELEASES_PAGE),
  ]);

  return (
    <article>
      <section className="section">
        <div className="container-prose">
          <span className="badge">download</span>
          <h1 className="mt-6 text-4xl md:text-5xl">Two apps. Both free.</h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Trading Agents Lab is for quick analysis: a full agent debate
            in about a minute. Trading Agents Lab Pro is for full-depth
            diligence: the upstream project&apos;s complete research
            pipeline, with live tool calls and multi-round debates, in 8
            to 15 minutes. Both are free and open source under AGPL-3.0.
            The difference is depth, time, and what a run consumes, never
            price.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Both are desktop applications. They run the AI agents on your
            machine (with your keys, or against your local Ollama), they
            store everything locally, and they never phone home.
          </p>
        </div>

        <div className="container-wide mt-12">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {/* Light app */}
            <div className="flex flex-col rounded border border-[var(--color-border-default)] bg-[var(--color-bg-card)] p-6">
              <div className="flex items-center gap-4">
                <img
                  src="/icons/tal-icon.png"
                  alt=""
                  width={56}
                  height={56}
                  className="rounded-xl"
                />
                <div>
                  <span
                    className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    quick analysis
                  </span>
                  <h2 className="mt-1 text-2xl">Trading Agents Lab</h2>
                </div>
              </div>
              <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                <li>A full agent debate on any ticker in about a minute.</li>
                <li>Small download, light on your machine.</li>
                <li>
                  Gentle on API cost: a typical run stays well under a
                  dollar, market data comes from free yfinance, and a
                  local model via Ollama or LM Studio brings a run to
                  zero cost.
                </li>
              </ul>
              <div className="mt-6">
                <a href={lightDmgUrl} className="btn-primary">
                  Download for macOS
                </a>
              </div>
              <p
                className="mt-4 text-xs text-[var(--color-text-muted)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                free · open source · AGPL-3.0 · macOS 12+ · Apple Silicon ·
                165 MB .dmg
              </p>
            </div>

            {/* Pro app */}
            <div className="flex flex-col rounded border border-[var(--color-border-default)] bg-[var(--color-bg-card)] p-6">
              <div className="flex items-center gap-4">
                <img
                  src="/icons/tal-pro-icon.png"
                  alt=""
                  width={56}
                  height={56}
                  className="rounded-xl"
                />
                <div>
                  <span
                    className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    full-depth diligence
                  </span>
                  <h2 className="mt-1 text-2xl">Trading Agents Lab Pro</h2>
                </div>
              </div>
              <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                <li>
                  The upstream project&apos;s full research pipeline: live
                  tool calls, multi-round debates, deeper reports. A run
                  takes 8 to 15 minutes.
                </li>
                <li>
                  Larger download; it bundles the complete research
                  engine.
                </li>
                <li>
                  A run makes dozens of model calls with your own key, so
                  a full run on a frontier model can cost a few dollars
                  in API usage. ChatGPT-subscription sign-in that brings
                  runs to zero cost is in development.
                </li>
              </ul>
              <div className="mt-6">
                <a href={proDmgUrl} className="btn-primary">
                  Download Pro for macOS
                </a>
              </div>
              <p
                className="mt-4 text-xs text-[var(--color-text-muted)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                free · open source · AGPL-3.0 · macOS 12+ · Apple Silicon ·
                183 MB .dmg
              </p>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-5xl">
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Both builds are signed and notarised by RBJ Global, so macOS
              does not flag them as from an unidentified developer. On
              first launch macOS asks you to confirm an app downloaded
              from the internet; click Open and it remembers. Both update
              themselves after the first install. Not sure which to
              start with? Take the light app first; Pro is a separate
              install and the two live side by side.{' '}
              <Link href="/docs/pro/" className="prose-link">
                What Pro adds →
              </Link>
            </p>
            <p
              className="mt-3 text-xs text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              for educational and research purposes only, not investment
              advice
            </p>
          </div>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-prose">
          <h2 className="text-3xl">Build from source</h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            On an Intel Mac, Linux, or Windows? Build the light app from
            source; it runs the same on all three. Pro builds from source
            too; its repository README has the steps.
          </p>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Requires <strong>Node 20+</strong> and <strong>Python 3.13</strong>.
          </p>

          <Step n="1" title="Clone the repository">
            <Code>
              git clone https://github.com/RBJGlobal/TradingAgentsLab.git
              {'\n'}cd TradingAgentsLab
            </Code>
          </Step>

          <Step n="2" title="Install the desktop dependencies">
            <Code>npm --prefix desktop install</Code>
          </Step>

          <Step n="3" title="Set up the Python engine">
            <Code>
              python3.13 -m venv engine/.venv{'\n'}engine/.venv/bin/pip install -r engine/requirements.txt
            </Code>
          </Step>

          <Step n="4" title="Run the dev stack">
            <Code>npm --prefix desktop run dev</Code>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
              The Electron window opens, the engine sidecar starts in
              the background, and the status strip flips to{' '}
              <span style={{ color: 'var(--color-buy)' }}>● Running</span>{' '}
              within a couple of seconds.
            </p>
          </Step>

          <Step n="5" title="Configure a provider">
            <p className="text-[var(--color-text-secondary)]">
              Open Settings → LLM Providers. Paste a key (OpenAI,
              Anthropic, OpenRouter, Google Gemini, xAI Grok, or
              MiniMax), or set the
              app to use a local Ollama model. Then go to Analyze, type
              a ticker like <code className="rounded bg-[var(--color-bg-sunken)] px-2 py-0.5 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>NVDA</code>, and run.
            </p>
            <Link href="/docs/getting-started/" className="mt-4 inline-block prose-link">
              Step-by-step walkthrough →
            </Link>
          </Step>
        </div>
      </section>

      <section className="section">
        <div className="container-prose">
          <h2 className="text-3xl">Releases and source</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Every build, with release notes and checksums, lives on GitHub
            releases:{' '}
            <a
              href="https://github.com/RBJGlobal/TradingAgentsLab/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Trading Agents Lab
            </a>{' '}
            and{' '}
            <a
              href="https://github.com/RBJGlobal/TradingAgentsLab-Pro/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Trading Agents Lab Pro
            </a>
            . The full source of both is open under AGPL-3.0, so you can
            read exactly what runs on your machine before you install it.
          </p>
        </div>
      </section>
    </article>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 border-l-2 border-[var(--color-accent)] pl-6">
      <div className="flex items-baseline gap-3">
        <span
          className="text-xs text-[var(--color-text-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          step_{n}
        </span>
        <h3 className="text-lg">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre
      className="overflow-x-auto rounded border border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)] p-4 text-sm"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <code>{children}</code>
    </pre>
  );
}
