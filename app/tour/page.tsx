import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'See it running',
  description:
    'Screenshots of Trading Agents Lab on a real ticker, from the analyze form through the multi-agent debate to the Portfolio Manager decision card. Illustrative output only, not investment advice.',
  alternates: { canonical: '/tour/' },
};

// Note: the original Tauric Research framework runs as a terminal Python
// application that requires Python plus a stack of dependencies and a
// command-line workflow. Trading Agents Lab keeps that engine intact and
// wraps it in a desktop app with watchlist, history, cost guard, settings
// UI, optional Clawless connector, webhooks, and a multi-LLM Settings
// surface. This page exists to show that wrapper visually because a
// screenshot communicates the gap better than a paragraph can.

// Every screenshot below was captured on the running app against the
// NVDA ticker. The decision text shown in those frames is a single
// illustrative run; not a recommendation, not advice, not a forecast.
// When the desktop app gains a noticeable UI feature, these images get
// refreshed; the source set lives at assets/screenshots/ in the engine
// repo and the canonical filenames are kept stable so swaps are mechanical.

interface ShotProps {
  src: string;
  alt: string;
  caption?: string;
  width?: string;
}

function Shot({ src, alt, caption, width = 'max-w-4xl' }: ShotProps) {
  return (
    <figure className={`mt-8 ${width} mx-auto`}>
      <div className="overflow-hidden rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-sunken)] shadow-2xl shadow-black/40">
        {/* Plain img, not next/image, because output is 'export' + images
            unoptimized: true everywhere else in the codebase. Keep the
            page consistent and the build simple. */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block w-full"
        />
      </div>
      {caption ? (
        <figcaption
          className="mt-3 text-center text-xs uppercase tracking-widest text-[var(--color-text-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function TourPage() {
  return (
    <article>
      <section className="section">
        <div className="container-prose">
          <span className="badge">see it running</span>
          <h1 className="mt-6 text-4xl md:text-5xl">A look inside the lab.</h1>
          <p className="mt-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Trading Agents Lab is a desktop application built on top of a
            multi-agent LLM research framework. The framework itself is
            open source and runs as a Python terminal program. The desktop
            app keeps that engine intact and adds a watchlist, persistent
            history, cost guard, settings UI for multiple LLM providers,
            optional Clawless connector, outbound webhooks, and the kind
            of moment-by-moment streaming output you can actually watch
            without a debugger open.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            The screenshots on this page show a single Diligence run on
            NVDA. The numbers, dates, and decision text are illustrative
            output from one run on one day. They are not investment
            advice, not a recommendation, not a forecast.
          </p>
          <div
            className="mt-8 rounded border-l-4 border-[var(--color-accent)] bg-[var(--color-accent-tint)] px-6 py-5 text-sm leading-relaxed"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Educational and research purposes only. Output below is
            illustrative, captured from one debate on one day. Past
            performance does not indicate future results. Users are
            solely responsible for their own trading decisions.
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-wide">
          <div className="container-prose">
            <span
              className="text-xs uppercase tracking-widest text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              01 · start a debate
            </span>
            <h2 className="mt-2 text-3xl">Pick a ticker, pick a date.</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              The Analyze page is the entry point. Type a ticker, pick the
              as-of date, choose your LLM provider, and the engine wires
              up a fresh debate. The header status strip shows which engine
              is configured, which data adapter is live, which LLM is on,
              and whether the optional Clawless connector is reachable.
              The session card below the form prints the latest close,
              the period change, range, and average volume, sourced from
              the data adapter you configured.
            </p>
          </div>
          <Shot
            src="/screenshots/analyze-form.png"
            alt="Trading Agents Lab Analyze page with the NVDA ticker filled in, OpenAI gpt-5.4 selected, and a session summary card showing the latest close and period change."
            caption="Analyze · NVDA · OpenAI gpt-5.4 · Alpaca data"
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-wide">
          <div className="container-prose">
            <span
              className="text-xs uppercase tracking-widest text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              02 · analysts surface signals
            </span>
            <h2 className="mt-2 text-3xl">Analyst phase, three perspectives.</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              The first wave is the analyst team. A technical analyst, a
              fundamental analyst, and a news analyst each look at the
              ticker independently and stream their findings into the
              page. You read along as they form their views. Output is
              tagged by role so you can follow which analyst said what.
            </p>
          </div>
          <Shot
            src="/screenshots/analyze-analysts.png"
            alt="Analyst phase mid-stream, with technical, fundamental, and news analyst messages each tagged with their role and printing reasoning live."
            caption="Analysts · technical · fundamental · news"
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-wide">
          <div className="container-prose">
            <span
              className="text-xs uppercase tracking-widest text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              03 · researchers debate
            </span>
            <h2 className="mt-2 text-3xl">Bull and bear go to debate.</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Once the analysts finish, a bull researcher and a bear
              researcher pick up their findings and argue opposing
              positions. A research manager moderates the back and
              forth and pushes them to address each other&apos;s
              strongest points. The debate is the part of the system
              that surfaces what would normally be hidden assumptions.
            </p>
          </div>
          <Shot
            src="/screenshots/analyze-researchers.png"
            alt="Researcher phase showing the bull and bear researchers exchanging arguments, with the research manager pushing the debate forward."
            caption="Researchers · bull · bear · research manager"
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-wide">
          <div className="container-prose">
            <span
              className="text-xs uppercase tracking-widest text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              04 · risk committee + portfolio manager
            </span>
            <h2 className="mt-2 text-3xl">A decision lands, with the math in view.</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              A three-seat risk committee (conservative, neutral,
              aggressive) reviews the debate and weighs the trade-offs.
              The Portfolio Manager reads everything and produces the
              final decision card: action, confidence, and the
              one-paragraph reasoning that ties the inputs together.
              The inline disclaimer ships on the same card as the
              recommendation because the recommendation cannot live
              without it.
            </p>
          </div>
          <Shot
            src="/screenshots/analyze-decision.png"
            alt="Decision card from the NVDA Diligence run, showing HOLD action with 76% confidence and the Portfolio Manager reasoning, with a not-financial-advice disclaimer printed inline."
            caption="Decision · HOLD · 76% confidence · inline disclaimer"
          />
          <p
            className="mt-6 text-center text-xs leading-relaxed text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Illustrative output from one run. Not advice. Not a
            recommendation. Not a forecast.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-wide">
          <div className="container-prose">
            <span
              className="text-xs uppercase tracking-widest text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              05 · watchlist
            </span>
            <h2 className="mt-2 text-3xl">Queue the tickers you care about.</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              The Watchlist holds your tracked tickers, equities and
              crypto in the same list. Hit Analyze on any row to drop
              into the Analyze page with the ticker pre-filled. The
              batch runner can sweep an entire watchlist sequentially
              and fire your configured webhooks as each Diligence run
              completes.
            </p>
          </div>
          <Shot
            src="/screenshots/watchlist.png"
            alt="Watchlist with a mix of equities and crypto: NVDA, JPM, BAC, ETH, BTC. Each row has Analyze and Remove buttons."
            caption="Watchlist · equities + crypto in one list"
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-wide">
          <div className="container-prose">
            <span
              className="text-xs uppercase tracking-widest text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              06 · history
            </span>
            <h2 className="mt-2 text-3xl">Every run stays on your machine.</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              History persists every Diligence run to a local SQLite
              database in the app&apos;s user-data directory. Sort by
              date, ticker, or cost. Click into a row to re-read the
              full debate transcript and decision card. Nothing is
              uploaded, nothing is synced to a server, nothing leaves
              the laptop.
            </p>
          </div>
          <Shot
            src="/screenshots/history.png"
            alt="History page listing past Diligence runs with timestamps, tickers, and a sessions count card."
            caption="History · local SQLite · nothing leaves the laptop"
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-wide">
          <div className="container-prose">
            <span
              className="text-xs uppercase tracking-widest text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              07 · settings
            </span>
            <h2 className="mt-2 text-3xl">Bring your own providers.</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              The Settings surface is where the desktop app earns its
              keep. Configure LLM providers (OpenAI, Anthropic,
              OpenRouter, Gemini, or a local runtime like Ollama or
              LM Studio), pick your data adapter, set hard spend caps
              on the Cost Guard, and optionally wire up the Clawless
              gateway. Credentials are encrypted at rest via your OS
              keychain (Keychain on macOS, DPAPI on Windows, Secret
              Service on Linux). Nothing ships to RBJ Global. Nothing
              ships to anywhere except the providers you chose.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Shot
              src="/screenshots/settings-llm.png"
              alt="Settings LLM Providers tab showing OpenAI connected, plus other configured providers."
              caption="Settings · LLM Providers"
              width="max-w-none"
            />
            <Shot
              src="/screenshots/settings-data.png"
              alt="Settings Data Providers tab with Yahoo Finance active and Alpaca paper-data configured."
              caption="Settings · Data Providers"
              width="max-w-none"
            />
            <Shot
              src="/screenshots/settings-costguard.png"
              alt="Settings Cost Guard tab with daily and per-session spend caps and the current-period spend visualization."
              caption="Settings · Cost Guard"
              width="max-w-none"
            />
            <Shot
              src="/screenshots/settings-clawless.png"
              alt="Settings Clawless tab showing the optional gateway URL and token connected status."
              caption="Settings · Clawless (optional)"
              width="max-w-none"
            />
          </div>
        </div>
      </section>

      <section id="channels" className="section pt-0 scroll-mt-20">
        <div className="container-wide">
          <div className="container-prose">
            <span
              className="text-xs uppercase tracking-widest text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              08 · channels
            </span>
            <h2 className="mt-2 text-3xl">Take it on your phone.</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              The Channels tab is where the desktop app reaches out to
              meet you wherever you are. The first channel is a
              bidirectional Telegram bot. Message a ticker like NVDA
              from your phone and the Diligence runs on your laptop;
              the decision card lands back in the chat. Useful when
              you&apos;re at work, on a walk, or anywhere away from
              the desktop where you originally configured everything.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              The bot connects outbound to Telegram via long polling.
              Nothing on your machine is exposed to the internet, no
              public URL, no relay server. An allowlist of chat IDs
              gates who can trigger a Diligence; messages from anyone
              else are silently dropped. A per-chat daily spend cap
              keeps a leaked bot token from draining your LLM budget.
            </p>
          </div>
          <Shot
            src="/screenshots/telegram-channels-tab.png"
            alt="Settings Channels tab showing the Telegram Bot panel with bot token, LLM provider dropdown, allowlist, daily cap, Stop bot button, and POLLING status pill."
            caption="Channels · Telegram bot · configure once on the desktop"
          />

          <div className="container-prose mt-12">
            <h3 className="text-2xl">Configure once. Use anywhere.</h3>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Paste the bot token from BotFather, pick the LLM
              provider, list the Telegram user IDs you want to allow,
              set a per-chat daily cap, hit Save and Start. The bot
              comes online and remembers your settings across engine
              restarts.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              The first time you message the bot, you tap a button or
              type a ticker. The bot replies with a status, runs the
              Diligence on your laptop, and streams the result back.
            </p>
          </div>
          <Shot
            src="/screenshots/telegram-ready.png"
            alt="Telegram chat showing the bot replying 'Trading Agents Lab is ready' with the current mode, plus a persistent two-by-two reply keyboard with Full debate mode, Summary mode, Current mode, and Help buttons."
            caption="Telegram · ready state with the persistent button grid"
          />

          <div className="container-prose mt-12">
            <h3 className="text-2xl">Two ways to read a debate.</h3>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              In summary mode (the default), the bot sends short
              phase headers as the debate progresses and the final
              decision card when it lands. Three or four messages
              total. Useful when you just want the answer.
            </p>
          </div>
          <Shot
            src="/screenshots/telegram-summary.png"
            alt="Telegram chat in summary mode showing the bot acknowledging the NVDA request, then phase headers as analysts, researchers, trader, and risk committee complete, then the final decision card with HOLD action and 72 percent confidence."
            caption="Summary mode · phase headers and the decision card"
          />

          <div className="container-prose mt-12">
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              In full mode (toggle with the Full debate mode button or
              the slash-full command), the bot forwards every agent&apos;s
              reasoning as its own message. You read the technical
              analyst, fundamental analyst, news analyst, sentiment
              analyst, bull and bear researchers, research manager,
              trader, three risk seats, and the portfolio manager in
              real time. The same transcript a desktop user sees, just
              on your phone.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Shot
              src="/screenshots/telegram-full-analysts.png"
              alt="Telegram chat in full mode showing the technical analyst, fundamental analyst, and news analyst streaming their reasoning live."
              caption="Full mode · analyst phase streaming"
              width="max-w-none"
            />
            <Shot
              src="/screenshots/telegram-full-decision.png"
              alt="Telegram chat in full mode showing the risk committee (conservative, neutral) and portfolio manager messages, followed by the final decision card."
              caption="Full mode · risk committee + decision card"
              width="max-w-none"
            />
          </div>

          <div className="container-prose mt-12">
            <h3 className="text-2xl">Built-in commands.</h3>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Typing slash in the Telegram chat pops the autocomplete
              menu (analyze, full, summary, mode, help, start). The
              four most common actions live on the persistent button
              grid below the message input so you don&apos;t have to
              remember the syntax. Tap Help to see the full command
              list at any time.
            </p>
          </div>
          <Shot
            src="/screenshots/telegram-help.png"
            alt="Telegram chat showing the bot's slash-help reply with the full command list, current mode indication, and the persistent two-by-two reply keyboard below the input."
            caption="Help · full command list with current mode"
          />
          <p
            className="container-prose mt-8 text-center text-xs leading-relaxed text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Illustrative output from one run. Not advice. Not a
            recommendation. Not a forecast.
          </p>
        </div>
      </section>

      <section className="section border-t border-[var(--color-border-muted)] bg-[var(--color-bg-sunken)]">
        <div className="container-prose">
          <h2 className="text-2xl">Try it for yourself.</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            The full app is free, open source, and runs locally on macOS
            and Linux. Bring your own LLM provider keys, configure your
            own data adapter, and run as many Diligence runs as your
            cost cap allows.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/download/" className="btn-primary">
              Get the app
            </Link>
            <Link href="/how-it-works/" className="btn-secondary">
              How the debate works
            </Link>
            <Link href="/docs/getting-started/" className="btn-secondary">
              Getting started
            </Link>
          </div>
          <p
            className="mt-10 text-xs leading-relaxed text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Reminder: everything shown on this page is educational
            output from a single run. Trading Agents Lab does not
            recommend any security, does not execute trades, and is
            not a substitute for licensed financial advice. Read the{' '}
            <Link href="/legal/disclaimer/" className="prose-link">
              full disclaimer
            </Link>
            .
          </p>
        </div>
      </section>
    </article>
  );
}
