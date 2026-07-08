'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Embeds the self-contained Diligence transcript document (exported by
 * the app's "Open in HTML" feature, copied verbatim into
 * public/transcripts/) and grows the iframe to the document's full
 * height so the page scrolls naturally with no inner scrollbar. The
 * document ships its own styles and carries no scripts; the iframe
 * keeps its styling isolated from the site's.
 */
export default function TranscriptEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const fit = useCallback(() => {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!frame || !doc?.documentElement) return;
    frame.style.height = `${doc.documentElement.scrollHeight}px`;
  }, []);

  useEffect(() => {
    // Text reflows when the viewport narrows, changing document height.
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [fit]);

  return (
    <iframe
      ref={frameRef}
      src={src}
      title={title}
      onLoad={fit}
      loading="lazy"
      className="block w-full border-0"
      // Fallback height until onLoad measures the document; if JS is
      // unavailable the iframe degrades to an internally scrollable box.
      style={{ height: '900px' }}
    />
  );
}
