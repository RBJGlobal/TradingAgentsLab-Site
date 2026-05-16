import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'For educational and research purposes only. Not investment advice. Read the full disclaimer for Trading Agents Lab.',
};

export default function Disclaimer() {
  return (
    <article className="container-prose section">
      <span className="badge">legal · disclaimer</span>
      <h1 className="mt-6 text-4xl">Disclaimer</h1>
      <p
        className="mt-3 text-xs text-[var(--color-text-muted)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Last updated: 2026-05-16
      </p>

      <div className="docs-prose mt-10">
        <h2>For educational and research purposes only — not investment advice.</h2>
        <p>
          Trading Agents Lab (&quot;the Software&quot;) is a free,
          open-source desktop application that uses large language models
          to produce structured deliberations about publicly traded
          securities. The Software is provided strictly as an educational
          and research tool. <strong>Nothing produced by the Software
          constitutes investment advice, a recommendation to buy or sell
          any security, or a solicitation of any transaction.</strong>
        </p>

        <h2>The Software is not a registered investment adviser.</h2>
        <p>
          Trading Agents Lab is not registered with the U.S. Securities
          and Exchange Commission (SEC), the Financial Industry Regulatory
          Authority (FINRA), any state securities regulator, or any
          comparable authority in any other jurisdiction, in any capacity.
          The Software&apos;s authors and maintainers do not act as
          fiduciaries with respect to any user.
        </p>

        <h2>The Software does not execute trades.</h2>
        <p>
          By design, the Software contains no broker-execution code. It
          cannot place an order on a user&apos;s behalf, whether for live
          trading or paper trading. The Software connects to market data
          endpoints only (e.g. yfinance, Alpaca&apos;s data endpoints,
          Alpaca&apos;s paper-trading endpoints for data context). Any
          decision to act on the Software&apos;s output is the user&apos;s
          alone, undertaken through the user&apos;s own authorised
          brokerage account, with full responsibility for outcomes.
        </p>

        <h2>AI output may be inaccurate, biased, or hallucinated.</h2>
        <p>
          The Software relies on third-party large language models
          (OpenAI, Anthropic, Google, OpenRouter, local Ollama, or
          others) configured by the user. These models can produce output
          that is factually wrong, internally inconsistent, biased toward
          their training data, or entirely fabricated. The Software
          structures multiple perspectives to make disagreement visible,
          but cannot guarantee that any individual statement, transcript,
          or final decision is accurate or appropriate for any particular
          person, security, or market condition.
        </p>

        <h2>Past performance is not indicative of future results.</h2>
        <p>
          The Software does not predict the market. It does not forecast
          price movement. It does not guarantee any outcome. Any
          historical references made by the language models within a
          Diligence transcript are not predictive of future performance
          and should not be relied upon for any investment decision.
        </p>

        <h2>You assume all risk.</h2>
        <p>
          Trading and investing in securities, cryptocurrencies, and
          other instruments carries substantial risk of loss and is not
          suitable for every investor. The user is solely responsible for
          their investment decisions and for any resulting losses. The
          Software, its authors, maintainers, contributors, and any
          affiliated parties expressly disclaim any liability for any
          decision made or action taken on the basis of the
          Software&apos;s output.
        </p>

        <h2>Consult a licensed professional.</h2>
        <p>
          Before making any investment decision, you should consult with
          a licensed financial adviser, tax adviser, and/or legal
          counsel in your jurisdiction. The Software is not a substitute
          for personalised professional advice.
        </p>

        <h2>No warranty.</h2>
        <p>
          The Software is licensed under the GNU Affero General Public
          License v3.0 and is provided &quot;AS IS&quot;, without warranty
          of any kind, express or implied, including but not limited to
          the warranties of merchantability, fitness for a particular
          purpose, and non-infringement. See the{' '}
          <a
            href="https://www.gnu.org/licenses/agpl-3.0.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            full AGPL-3.0 license text
          </a>{' '}
          for the complete warranty disclaimer.
        </p>

        <hr />

        <p className="text-sm text-[var(--color-text-muted)]">
          See also:{' '}
          <Link href="/legal/privacy/" className="prose-link">
            Privacy Policy
          </Link>{' '}
          ·{' '}
          <Link href="/legal/terms/" className="prose-link">
            Terms of Use
          </Link>{' '}
          ·{' '}
          <Link href="/security/" className="prose-link">
            Security &amp; Privacy
          </Link>
        </p>
      </div>
    </article>
  );
}
