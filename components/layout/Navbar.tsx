'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const NAV = [
  { href: '/flow/', label: 'The flow' },
  { href: '/tour/', label: 'See it running' },
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/docs/', label: 'Docs' },
  { href: '/about/', label: 'About' },
  { href: '/security/', label: 'Security' },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Auto-close the mobile drawer on route change so users can navigate
  // from inside the drawer without it staying stuck open.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Body-scroll lock + Escape + focus management while the drawer is open.
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the drawer (first focusable element). Defer one
    // microtask so the dialog has actually mounted.
    const focusTimer = window.setTimeout(() => {
      const first = drawerRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      first?.focus();
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      // Simple focus trap: if Tab would move focus outside the drawer,
      // push it back to the first/last focusable element inside it.
      if (e.key !== 'Tab' || !drawerRef.current) return;
      const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      // Restore focus to the trigger so keyboard users land where they were.
      hamburgerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--color-border-default)] bg-[var(--color-bg-base-translucent)] backdrop-blur-md">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Trading Agents Lab, home"
          >
            <Logo />
            <span
              className="text-sm font-semibold tracking-wide text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Trading Agents Lab
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/download/" className="btn-primary">
              Download
            </Link>
          </nav>

          {/* Mobile: Download CTA + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/download/" className="btn-primary">
              Download
            </Link>
            <button
              type="button"
              ref={hamburgerRef}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav-panel"
              className="flex h-10 w-10 items-center justify-center rounded border border-[var(--color-border-strong)] text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              {open ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer, full-screen overlay below the header. Always
          rendered so transitions/animations can play if added later;
          gated to `md:hidden` so desktop never sees it. */}
      {open ? (
        <div
          id="mobile-nav-panel"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 top-16 z-40 overflow-y-auto bg-[var(--color-bg-base)] md:hidden"
        >
          <nav aria-label="Primary mobile" className="container-wide py-10">
            <ul className="space-y-1">
              {NAV.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-baseline justify-between border-b border-[var(--color-border-muted)] py-5 text-2xl transition-colors hover:text-[var(--color-accent)] ${
                      pathname === item.href
                        ? 'text-[var(--color-accent)]'
                        : 'text-[var(--color-text-primary)]'
                    }`}
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    <span>{item.label}</span>
                    <span
                      className="text-xs text-[var(--color-text-muted)]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      0{i + 1}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/download/"
              className="btn-primary mt-10 flex w-full items-center justify-center"
            >
              Download for macOS
            </Link>

            <div className="mt-12 space-y-2 text-xs text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
              <a
                href="https://github.com/RBJGlobal/TradingAgentsLab"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[var(--color-accent)]"
              >
                → GitHub
              </a>
              <Link
                href="/legal/disclaimer/"
                className="block hover:text-[var(--color-accent)]"
              >
                → Disclaimer
              </Link>
              <Link
                href="/legal/privacy/"
                className="block hover:text-[var(--color-accent)]"
              >
                → Privacy
              </Link>
              <Link
                href="/legal/terms/"
                className="block hover:text-[var(--color-accent)]"
              >
                → Terms
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}

function Logo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <path d="M16 4 L18 16 L16 28 L14 16 Z" fill="var(--color-accent)" />
      <path
        d="M4 16 L16 14 L28 16 L16 18 Z"
        fill="var(--color-accent)"
        opacity="0.55"
      />
      <circle cx="16" cy="16" r="1.4" fill="var(--color-bg-base)" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 5h14M2 9h14M2 13h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 4l10 10M14 4L4 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
