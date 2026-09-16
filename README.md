# V16 — start here

## Working version

Latest owner confirmation (2026-09-12): Calendly design/field contrast is fixed, and booking already works. This is recorded as owner-confirmed, not a new independent widget test. See NEXT_STEPS for remaining work; do not reopen the old colour issue. V16 publication has not been confirmed.

V16 is the active version, copied from V15 on 2026-09-08 after the bilingual site, navigation, 404 and circular-logo updates. Site code and assets were copied unchanged; documentation was refreshed. Keep V15 and earlier versions as snapshots. Start with [HANDOFF.md](HANDOFF.md) for current status, editing entry points and unresolved items.

Read these files before changing content or integrations:

- [PROJECT_NOTES.md](PROJECT_NOTES.md): approved facts, prices, design preferences and current behavior.
- [CONTENT_ROADMAP.md](CONTENT_ROADMAP.md): completed work and remaining decisions. Ideas are a backlog, not instructions to implement everything.
- [CALENDLY_SETUP.md](CALENDLY_SETUP.md): event links, field mapping and verification limits.
- [PUBLISHING_CHECKLIST.md](PUBLISHING_CHECKLIST.md): remaining launch checks, the already-owned domain and the measured image improvements.
- [LEGAL_REVIEW.md](LEGAL_REVIEW.md): bilingual terms drafts, confirmed business policies, unanswered questions and required legal/process follow-up. Do not treat the draft as an effective agreement.
- [PRIVACY_REVIEW.md](PRIVACY_REVIEW.md): bilingual privacy notice, actual website/client data flows, confirmed chat apps, remaining retention/settings checks and GitHub policy findings.
- [MOTION_NOTES.md](MOTION_NOTES.md): animation references, restrained refinements, accessibility fallbacks and cache-version maintenance.

## Site map

2026-09-12: **22 public HTML files**. Added `adatkezeles.html` / `privacy-en.html`, footer links throughout and a contact-form disclosure. Privacy text downloads and printing are available. The notices remain review copies until the operational details in PRIVACY_REVIEW are resolved. Google Business/listing/search-promotion tasks were declined; the existing gym map and necessary provider privacy disclosures remain.

2026-09-08 logo refinement: the MB logo and all favicon sizes now have transparent corners, a black circular centre and the original gold ring. The outer square background has been removed, and the circle fills the image more closely. The same asset filenames are retained.

2026-09-08 refinements: there are now **20 public HTML files**, including `404.html` and `404-en.html`. Page menu labels are centered. The HU/UK language control slides before navigation (instant with reduced motion) and restores itself on browser Back. The 404 pages use a `/` URL base for the owner's custom domain, so deep missing paths can still load assets and return home. If switching to GitHub project hosting at `/repository/`, update the base in `tools/build-404.py` first. `tools/build-languages.py` rebuilds these error pages too.

Brand assets: `assets/mb-logo-1024.png` is the larger black-background MB circle. `favicon.ico`, `assets/favicon-32.png` and `assets/apple-touch-icon.png` are linked in every page. Regenerate them with `python tools/build-brand.py` (Pillow; the existing Barlow Condensed ExtraBold font and its OFL licence are retained in `tools/fonts/`). The logo is rendered from the existing design, not enlarged from the screenshot.

The complete site is available in Hungarian and English. Every header has a Hungarian / UK flag selector with HU / EN labels. The English pages are `index-en.html`, `services-en.html`, `personal-training-en.html`, `online-coaching-en.html`, `about-en.html`, `progress-en.html`, `first-visit-en.html` and `contact-en.html`. `terms.html` is the existing English terms draft. Normal content pages use relative links; see the 404 base setting above when deploying to a project subdirectory.

| File | Visitor experience |
| --- | --- |
| `index.html` | Homepage, introduction, services and starting points |
| `services.html` | Service comparison, prices and collaboration process |
| `szemelyi-edzes.html` | Personal training, approach, audience and FAQ |
| `online-coaching.html` | Four packages, prices, support levels and FAQ |
| `about.html` | Rólam: story, gallery, values, experience and qualifications |
| `sikerek.html` | Personal milestones and how progress is followed |
| `elso-alkalom.html` | First consultation/session, preparation and location |
| `contact.html` | Contact details, inquiry preparation and Calendly booking |
| `aszf.html` / `terms.html` | Hungarian / English terms drafts, matching sections, text downloads and printing |
| `adatkezeles.html` / `privacy-en.html` | Hungarian / English privacy review pages, with matching sections, text downloads and printing |

The former `life.html` page is intentionally absent. Its gallery is at `about.html#galeria`. Sikerek is intentionally visible in the primary navigation.

## Implementation map

- Plain HTML, CSS and JavaScript; no package installation or hosting build step. A local translation generator produces the English HTML before uploading.
- `styles.css`: visual system, page layouts, photo viewer, contact card and booking shell.
- `responsive.css`: final device refinements; load after `styles.css` and `section-nav.css` so the narrow/short viewport and touch rules win.
- `script.js`: mobile menu, reveal effects, gallery dialog, clipboard actions and contact/Calendly behavior.
- `language.css` / `language.js`: header flag selector and counterpart links. Switching carries the section hash and service/package choices, without copying personal information or storing preferences. Native language links work without JavaScript.
- `section-nav.css` / `section-nav.js`: section index, responsive side rail and active position tracking. Each HTML page owns its anchor list and section IDs; update both when changing sections.
- `site-config.js`: Calendly event URLs and inquiry email. Public email links, copy-button data and package copy also exist in HTML; keep them consistent when changing configuration.
- `assets/`: six original PNG photos, retained unchanged. Pages now serve `assets/responsive/*.webp` in four sizes per photo with `srcset`/`sizes`. The gallery uses `data-full-src` for its large view. Three training/session placeholders remain.
- `tools/optimize-images.py`: regenerate responsive copies with Pillow. `tools/connect-responsive-images.py` wires newly added PNG image tags and the device stylesheet without reformatting the pages; already-optimized tags are left alone. Both helpers run locally, not in the visitor's browser.
- `tests/`: local structural and interaction checks; they do not book appointments or send messages.

Headers and footers repeat across 22 HTML files. Apply navigation edits to the Hungarian originals and regenerate English, privacy and error pages. `legal.css` adds shared footer links and legal layouts. `tools/terms-content.json` holds matching HU/EN terms content; run `python tools/build-terms.py` after updating it to rebuild legal pages and text downloads, then refresh the English site, privacy and 404 pages. Keep the terms' draft status until LEGAL_REVIEW.md is resolved. Do not restore a separate gallery page, hide Sikerek, add a blog, invent testimonials, or change the bronze/copper/gold/black palette.

## Maintaining both languages

1. Edit the Hungarian source pages for structure, content or prices. Preserve matching section IDs.
2. Run `python tools/extract-translations.py` to append new text to `tools/translation-inventory.json`. Existing IDs are retained; never renumber them.
3. Add or revise the matching ID in `tools/english-translations.json`, including visible text, accessibility labels and gallery `data-note` captions.
4. Run `python tools/build-languages.py`. It checks translation coverage before writing the eighteen content/terms pages, then regenerates both privacy and both error pages. Privacy copy lives in `tools/privacy-content.json`; `tools/build-privacy.py` builds its pages and text downloads. Avoid directly editing generated English, privacy or error pages: regeneration replaces them.
5. Run the checks below. Dynamic contact, gallery and clipboard messages have both translations in `script.js`.

Upload all public HTML, CSS and JS together with assets and text downloads. `tools/` and `tests/` are local maintenance helpers. Local edits do not publish themselves. Calendly event names, questions and notifications are managed in the Calendly account, separately from website copy.

## Local preview

Serve this directory itself, not the workspace root or an earlier version. In a terminal opened in V16:

```powershell
python -m http.server 8150 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8150/`. Port 8150 is a suggested example, not a claim that a server is running. Reuse an existing V16 server when available and verify its directory; a previous V15 preview does not automatically switch to V16.

## Verification

From V16, use Python with `lxml` and Node.js:

```powershell
python tests/validate.py
python tests/languages.py
node tests/languages.cjs
node tests/contact-flow.cjs
node tests/section-nav.cjs
node tests/email-copy.cjs
node tests/motion.cjs
node --check script.js
node --check section-nav.js
node --check site-config.js
node --check language.js
```

For a Calendly integration change, download its public `https://assets.calendly.com/assets/external/widget.js` to a temporary file and run `node tests/calendly-prefill.cjs <path-to-widget.js>`. This optional test exercises the actual SDK's iframe URL construction without a browser or booking. The normal tests also check updated names/emails, accents, spaces and plus-addressing. Do not bundle the downloaded SDK into the site.

On this machine, Python with `lxml` is available at `C:/Users/Ben/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe`. Use it if the default Python lacks that library; this is a local convenience, not a site dependency.

These checks cover markup, links/anchors, navigation, form routing and clipboard behavior. They do not prove browser appearance or complete a live booking. The recent layout fixes have not had a full responsive browser pass. See the roadmap and Calendly notes for remaining verification.
