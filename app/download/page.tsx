import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download',
  description:
    'Download Trading Agents Lab for macOS (Apple Silicon). Free, open-source, AGPL-3.0, signed and notarised. Or build from source for Intel, Linux, and Windows.',
  alternates: { canonical: '/download/' },
};

// Static export: resolved once at build time and baked into the page.
export const dynamic = 'force-static';

const RELEASES_PAGE =
  'https://github.com/RBJGlobal/TradingAgentsLab/releases/latest';

// Resolve the direct .dmg asset URL at build time so the Download button is a
// pure download (the file, not the GitHub release chooser). The asset name is
// version-pinned, so we fetch the latest release's arm64 .dmg rather than
// hardcoding a URL that goes stale next release. Falls back to the releases
// page if the API is unreachable at build time, so the button is never broken.
async function getDmgUrl(): Promise<string> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/RBJGlobal/TradingAgentsLab/releases/latest',
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'tradingagentslab-site',
        },
        cache: 'force-cache',
      },
    );
    if (!res.ok) return RELEASES_PAGE;
    const data = (await res.json()) as {
      assets?: { name?: string; browser_download_url?: string }[];
    };
    const dmg = data.assets?.find(
      (a) => a.name?.endsWith('.dmg') && a.name?.includes('arm64'),
    );
    return dmg?.browser_download_url ?? RELEASES_PAGE;
  } catch {
    return RELEASES_PAGE;
  }
}

export default async function Download() {
  const dmgUrl = await getDmgUrl();

  return (
    <article>
      <section className="section">
        <div className="container-prose">
          <span className="badge">download</span>
          <h1 className="mt-6 text-4xl md:text-5xl">
            Run a Diligence in two minutes.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Trading Agents Lab is a desktop application. It runs the AI
            agents on your machine (with your keys, or against your local
            Ollama), it stores everything locally, and it never phones
            home.
          </p>

          <div className="mt-12 rounded border border-[var(--color-border-default)] bg-[var(--color-bg-card)] p-6">
            <a href={dmgUrl} className="btn-primary">
              Download for macOS (Apple Silicon)
            </a>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              macOS on Apple Silicon (M1 or newer). Signed and notarised by
              RBJ Global, so it opens without a Gatekeeper warning. Free,
              AGPL-3.0, and it updates itself after the first install.
            </p>
            <p
              className="mt-3 text-xs text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Apple Silicon · .dmg · for educational and research purposes
              only, not investment advice
            </p>
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              <a
                href={RELEASES_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="prose-link"
              >
                Other builds, checksums, and source on GitHub
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-prose">
          <h2 className="text-3xl">Build from source</h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            On an Intel Mac, Linux, or Windows? Build from source. It runs
            the same on all three.
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
            Every build, with release notes and checksums, lives on{' '}
            <a
              href="https://github.com/RBJGlobal/TradingAgentsLab/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              GitHub releases
            </a>
            . The full source is open under AGPL-3.0, so you can read exactly
            what runs on your machine before you install it.
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
