import type { Metadata } from 'next';

// Family-wide /family page. Pattern coordinated 2026-05-18 by Global
// Sites Developer across rbjglobal.com, clawless.ai, iluvmd.com, and
// this site. Rules: unique wording per host, no shared sibling copy,
// inline SVG only (no external images), rel="noopener" only on
// external links (not noreferrer; family attribution stays intact),
// visit-first link order, no self-card for the host, JSON-LD with
// parentOrganization containing subOrganization of all 5 products.

export const metadata: Metadata = {
  title: 'Family',
  description:
    'Trading Agents Lab is part of a small portfolio of independent, single-purpose, privacy-first software built by RBJ Global. Meet the rest of the family.',
  alternates: { canonical: '/family/' },
};

const FAMILY_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Trading Agents Lab',
  url: 'https://tradingagentslab.ai/',
  parentOrganization: {
    '@type': 'Organization',
    name: 'RBJ Global LLC',
    url: 'https://rbjglobal.com/',
    subOrganization: [
      { '@type': 'Organization', name: 'Clawless', url: 'https://clawless.ai/' },
      { '@type': 'Organization', name: 'iLoveMD', url: 'https://iluvmd.com/' },
      { '@type': 'Organization', name: 'WhisprDesk', url: 'https://whisprdesk.com/' },
      { '@type': 'Organization', name: 'Trading Agents Lab', url: 'https://tradingagentslab.ai/' },
      { '@type': 'Organization', name: 'Clawdemy', url: 'https://clawdemy.org/' },
      { '@type': 'Organization', name: 'ClaudeLink', url: 'https://claudelink.ai/' },
    ],
  },
};

interface SiblingLink {
  href: string;
  label: string;
}

interface SiblingCardProps {
  name: string;
  tagline: string;
  body: React.ReactNode;
  links: SiblingLink[];
  /** Parent company gets the accent-tint chrome to mark hierarchy. */
  isParent?: boolean;
}

function SiblingCard({ name, tagline, body, links, isParent }: SiblingCardProps) {
  return (
    <article
      className={
        isParent
          ? 'rounded border border-[var(--color-accent-tint)] bg-[var(--color-accent-tint)] p-7 md:p-8'
          : 'card'
      }
    >
      {isParent ? (
        <span
          className="text-xs uppercase tracking-widest text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          parent company
        </span>
      ) : null}
      <h3 className={`${isParent ? 'mt-2 text-2xl' : 'text-2xl'} text-[var(--color-text-primary)]`}>
        {name}
      </h3>
      <p
        className="mt-1 text-xs text-[var(--color-accent)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {tagline}
      </p>
      <div className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">{body}</div>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener"
              className="prose-link text-sm"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function FamilyPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAMILY_JSON_LD) }}
      />

      <section className="section">
        <div className="container-prose">
          <span className="badge">family</span>
          <h1 className="mt-6 text-4xl md:text-5xl">The family.</h1>
          <p
            className="mt-4 text-base uppercase tracking-widest text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Trading Agents Lab is one of several.
          </p>
          <p className="mt-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Trading Agents Lab is published by RBJ Global, an independent
            software studio. The same operator ships a small portfolio of
            single-purpose tools, each on its own domain, each with its own
            roadmap. What ties them together is a single posture: the
            user&apos;s data stays on the user&apos;s device. No analytics
            beacons, no cloud transcripts of your prompts, no telemetry
            phoning home. If that posture matters to you on a research
            framework, it probably matters to you on a dictation app, a
            document converter, or an AI literacy library too.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-prose space-y-6">
          <SiblingCard
            isParent
            name="RBJ Global"
            tagline="The independent studio behind Trading Agents Lab."
            body={
              <>
                <p>
                  The Texas-registered company that owns this codebase and
                  ships the rest of the family. Independently funded, no
                  outside investors, no acquisition pressure to dilute the
                  on-device posture that makes Trading Agents Lab viable as
                  an open-source research tool in a regulated domain.
                </p>
                <p className="mt-3">
                  If you&apos;re evaluating who actually stands behind this
                  AGPL-3.0 framework, where to direct a responsible-disclosure
                  report, or how to verify the privacy claims independently,
                  the corporate page is where those answers live, with names,
                  an entity number, and a published security policy.
                </p>
              </>
            }
            links={[
              { href: 'https://rbjglobal.com/', label: 'Visit rbjglobal.com' },
              { href: 'https://rbjglobal.com/legal/security/', label: 'Responsible disclosure policy' },
            ]}
          />

          <SiblingCard
            name="Clawless"
            tagline="Desktop AI workspace, optional connector for this app."
            body={
              <>
                <p>
                  An on-device workspace for working with LLMs, models, and
                  agents on macOS or Ubuntu. Trading Agents Lab can route
                  its analyst, researcher, trader, and risk-manager calls
                  through Clawless when present, which means the same
                  LLM-provider credentials and the same OS-keychain
                  discipline carry over between the two surfaces.
                </p>
                <p className="mt-3">
                  Trading Agents Lab is positioned as the standalone trading
                  companion for Clawless. The connection is optional. You
                  can run this app with your own OpenAI, Anthropic,
                  OpenRouter, Gemini, xAI Grok, MiniMax, or local Ollama
                  keys and never touch
                  Clawless. The connector is there if you want one place to
                  manage on-device AI work.
                </p>
              </>
            }
            links={[
              { href: 'https://clawless.ai/', label: 'Visit clawless.ai' },
              { href: 'https://clawless.ai/download', label: 'Download Clawless' },
              { href: 'https://clawless.ai/pricing', label: 'Pricing' },
            ]}
          />

          <SiblingCard
            name="iLoveMD"
            tagline="Browser document converter, nothing uploaded."
            body={
              <p>
                A static, browser-only converter for Markdown, PDF, DOCX,
                and the formats around them. Conversion runs in the tab,
                nothing is sent to a server. For a Trading Agents Lab
                user, iLoveMD is useful upstream of the debate: cleaning
                a research note, an analyst PDF, or a 10-K excerpt into
                plain text you can paste into a prompt or save into a
                local knowledge folder, without involving any service
                you don&apos;t control.
              </p>
            }
            links={[
              { href: 'https://iluvmd.com/', label: 'Visit iluvmd.com' },
              { href: 'https://iluvmd.com/#modes', label: 'See the conversion modes' },
            ]}
          />

          <SiblingCard
            name="WhisprDesk"
            tagline="Local-only dictation for macOS."
            body={
              <p>
                Speech-to-text for Mac using Whisper and Parakeet models
                that run on the laptop, never in a vendor cloud. Sold
                once instead of rented, same family posture as the rest.
                Useful around Trading Agents Lab when you want to capture
                a voice note on a Diligence run, dictate a watchlist
                update, or talk through a research thesis without typing
                or trusting a transcription vendor with the audio.
              </p>
            }
            links={[
              { href: 'https://whisprdesk.com/', label: 'Visit whisprdesk.com' },
              { href: 'https://whisprdesk.com/#features', label: 'Features' },
              { href: 'https://whisprdesk.com/#compare', label: 'Compare to alternatives' },
              { href: 'https://whisprdesk.com/pricing/', label: 'Pricing' },
            ]}
          />

          <SiblingCard
            name="Clawdemy"
            tagline="Free AI education library."
            body={
              <p>
                A free, public learning library that explains how AI
                actually works, written for people who don&apos;t code.
                Trading Agents Lab doubles as a practical case study for
                Clawdemy: students who want to see a real multi-agent
                LLM system can read this codebase alongside the lessons.
                The tracks on agents and on local-first AI map cleanly
                onto why this framework is structured the way it is.
              </p>
            }
            links={[
              { href: 'https://clawdemy.org/', label: 'Visit clawdemy.org' },
              { href: 'https://clawdemy.org/tracks/', label: 'Browse all tracks' },
            ]}
          />

          <SiblingCard
            name="ClaudeLink"
            tagline="Coordinate a team of AI coding agents."
            body={
              <p>
                An open-source MCP server that turns the AI coding
                agents you already run (Claude Code, Codex, Gemini,
                Goose) into one coordinated team across terminals.
                Each agent picks its own model. Local-first, MIT
                licensed, no cloud, no telemetry. Useful for a Trading
                Agents Lab developer who wants multiple coding agents
                collaborating on a debate-engine refactor or a new
                channel integration.
              </p>
            }
            links={[
              { href: 'https://claudelink.ai/', label: 'Visit claudelink.ai' },
              { href: 'https://claudelink.ai/docs/', label: 'Documentation' },
            ]}
          />
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-prose">
          <h2 className="text-2xl">Why the family looks like this.</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Every product above is single-purpose, independently brandable,
            and able to be picked up or put down on its own. Nothing in
            the portfolio depends on another piece being installed. Nothing
            shares a user account, because there are no user accounts.
            If you only ever use Trading Agents Lab and never touch the
            rest, that is the intended experience.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            The family page exists so you can verify who else is in the
            portfolio, what posture they share, and where to look if you
            want to keep going with the same operator after this app.
          </p>
        </div>
      </section>
    </article>
  );
}
