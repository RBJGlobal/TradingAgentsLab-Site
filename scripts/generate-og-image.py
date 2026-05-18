#!/usr/bin/env python3
"""
Open Graph image generator for tradingagentslab.ai.

Renders the family-DNA card pattern locked across the RBJ Global LLC
family (Clawless Site Developer + iLoveMD developer coordinated, 2026-05-18):
  - 1200x630 PNG, 2x supersampled then LANCZOS downsampled for crisp edges
  - Pure white background
  - Centered three-line hierarchy: title / tagline / sub-tagline
  - Title: Georgia Bold 168pt in TAL's darkened amber brand color
  - Tagline: SF Pro Regular 68pt slate-800 #1F2937 (family-locked)
  - Sub-tagline: SF Pro Regular 46pt slate-600 #475569 (family-locked)

Per-product variation lives only in title color + copy. Everything else
is family DNA and must not vary.

Run:  python3 scripts/generate-og-image.py
Out:  public/og-image.png (served at https://tradingagentslab.ai/og-image.png)

macOS-only, depends on system fonts at /System/Library/Fonts/.

To re-render after a copy or color change: edit the constants below, run
again, commit the new PNG plus any meta-tag updates. After deploy, force
LinkedIn / Twitter / Facebook to re-scrape via their respective post
inspectors (LinkedIn caches OG previews for ~7 days).
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(__file__).resolve().parent.parent
# Next.js serves files in public/ at the site root, so /og-image.png is
# the canonical URL referenced by the openGraph metadata in lib/metadata.ts.
OUT_PATH = REPO_ROOT / "public" / "og-image.png"

# Canvas dimensions per OG spec. 2x supersample for JPEG-recompression resilience.
WIDTH, HEIGHT = 1200, 630
SCALE = 2
RENDER_W, RENDER_H = WIDTH * SCALE, HEIGHT * SCALE

# Colors. Family DNA (taglines) is fixed; only TITLE_COLOR varies per product.
# TAL brand amber is #f0a830 on the dark UI. For white-background OG cards
# the family rule is to darken the brand color until it clears 4.5:1 WCAG
# AA contrast on white. #9C6A14 lands at ~4.7:1, reads clearly as amber
# (not orange, not olive), and pairs with the dark UI without feeling like
# a separate brand.
BG = (255, 255, 255)
TITLE_COLOR = (0x9C, 0x6A, 0x14)   # darkened TAL amber, AA on white
TAGLINE_COLOR = (0x1F, 0x29, 0x37)  # slate-800, family-locked
DETAIL_COLOR = (0x47, 0x55, 0x69)   # slate-600, family-locked

# Fonts. macOS system paths. Match the iLoveMD generator exactly so the
# family cards render with consistent type rhythm.
GEORGIA_BOLD = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
SF_REGULAR = "/System/Library/Fonts/SFNS.ttf"

# Copy. Title is the product name in the three-word brand form (per the
# brand-name rule: readable text uses three words). Tagline is the
# canonical SITE_TAGLINE from lib/metadata.ts. Sub-tagline pairs the
# product differentiator with the locked honest-framing line so the
# card hits both "what makes this different" and "what it isn't" in
# the same glance.
TITLE = "Trading Agents Lab"
TAGLINE = "AI-driven Diligence on any ticker."
DETAIL_LINES = [
    "AGPL-3.0 open source. Multi-agent architecture.",
    "Research tool, not financial advice.",
]


def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def text_size(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont):
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def center_x(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont) -> int:
    w, _ = text_size(draw, text, font)
    return (RENDER_W - w) // 2


# Title is auto-fitted down from the family-DNA 168pt when the product
# name is longer than the iLoveMD reference ("iLoveMD" is 7 chars; "Trading
# Agents Lab" is 18). The fit target is 88% of canvas width so the title
# never crashes into the edges and still feels like the dominant element.
# Tagline and sub-tagline stay at family-locked sizes regardless.
TITLE_PT_MAX = 168
TITLE_FIT_RATIO = 0.88


def fit_title_font(draw: ImageDraw.ImageDraw, text: str, max_pt: int) -> ImageFont.FreeTypeFont:
    target_width = int(RENDER_W * TITLE_FIT_RATIO)
    pt = max_pt
    while pt > 24:
        font = load_font(GEORGIA_BOLD, pt * SCALE)
        w, _ = text_size(draw, text, font)
        if w <= target_width:
            return font
        pt -= 2
    return load_font(GEORGIA_BOLD, pt * SCALE)


def main():
    img = Image.new("RGB", (RENDER_W, RENDER_H), BG)
    draw = ImageDraw.Draw(img)

    title_font = fit_title_font(draw, TITLE, TITLE_PT_MAX)
    tagline_font = load_font(SF_REGULAR, 68 * SCALE)
    detail_font = load_font(SF_REGULAR, 46 * SCALE)

    # Vertical layout. Three logical rows: title near top-third, tagline
    # below it, sub-tagline (two lines) below that. Y positions match
    # the iLoveMD reference so the family cards share spacing rhythm.
    title_y = 130 * SCALE
    tagline_y = 360 * SCALE
    detail_y = 460 * SCALE
    detail_line_height = 70 * SCALE  # 46pt SF Pro * ~1.2, gives air

    draw.text((center_x(draw, TITLE, title_font), title_y),
              TITLE, fill=TITLE_COLOR, font=title_font)

    draw.text((center_x(draw, TAGLINE, tagline_font), tagline_y),
              TAGLINE, fill=TAGLINE_COLOR, font=tagline_font)

    for i, line in enumerate(DETAIL_LINES):
        y = detail_y + i * detail_line_height
        draw.text((center_x(draw, line, detail_font), y),
                  line, fill=DETAIL_COLOR, font=detail_font)

    final = img.resize((WIDTH, HEIGHT), Image.LANCZOS)
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    final.save(OUT_PATH, "PNG", optimize=True)
    print(f"Wrote {OUT_PATH} ({OUT_PATH.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
