# V15 — start here

## Working version

V15 is the active version, copied from V14 on 2026-09-05 after the gallery, pricing layout, contact portrait and email-action fixes. Site code and assets were copied unchanged; documentation was refreshed for future work. Keep V14 as the prior snapshot.

Read these files before changing content or integrations:

- [PROJECT_NOTES.md](PROJECT_NOTES.md): approved facts, prices, design preferences and current behavior.
- [CONTENT_ROADMAP.md](CONTENT_ROADMAP.md): completed work and remaining decisions. Ideas are a backlog, not instructions to implement everything.
- [CALENDLY_SETUP.md](CALENDLY_SETUP.md): event links, field mapping and verification limits.
- [PUBLISHING_CHECKLIST.md](PUBLISHING_CHECKLIST.md): remaining launch checks, the already-owned domain and the measured image improvements.

## Site map

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

The former `life.html` page is intentionally absent. Its gallery is at `about.html#galeria`. Sikerek is intentionally visible in the primary navigation.

## Implementation map

- Plain HTML, CSS and JavaScript; no package installation or build step. Relative links support static hosting and GitHub Pages.
- `styles.css`: visual system, page layouts, photo viewer, contact card and booking shell.
- `responsive.css`: final device refinements; load after `styles.css` and `section-nav.css` so the narrow/short viewport and touch rules win.
- `script.js`: mobile menu, reveal effects, gallery dialog, clipboard actions and contact/Calendly behavior.
- `section-nav.css` / `section-nav.js`: section index, responsive side rail and active position tracking. Each HTML page owns its anchor list and section IDs; update both when changing sections.
- `site-config.js`: Calendly event URLs and inquiry email. Public email links, copy-button data and package copy also exist in HTML; keep them consistent when changing configuration.
- `assets/`: six original PNG photos, retained unchanged. Pages now serve `assets/responsive/*.webp` in four sizes per photo with `srcset`/`sizes`. The gallery uses `data-full-src` for its large view. Three training/session placeholders remain.
- `tools/optimize-images.py`: regenerate responsive copies with Pillow. `tools/connect-responsive-images.py` wires newly added PNG image tags and the device stylesheet without reformatting the pages; already-optimized tags are left alone. Both helpers run locally, not in the visitor's browser.
- `tests/`: local structural and interaction checks; they do not book appointments or send messages.

Headers and footers repeat across eight HTML files. Apply shared navigation changes consistently. Do not restore a separate gallery page, hide Sikerek, add a blog, invent testimonials, or change the bronze/copper/gold/black palette.

## Local preview

Serve this directory itself, not the workspace root or V14. In a terminal opened in V15:

```powershell
python -m http.server 8150 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8150/`. Port 8150 is a suggested example, not a claim that a server is running. Reuse an existing V15 server when available and verify its directory; a previous V14 preview does not automatically switch to V15.

## Verification

From V15, use Python with `lxml` and Node.js:

```powershell
python tests/validate.py
node tests/contact-flow.cjs
node tests/section-nav.cjs
node tests/email-copy.cjs
node --check script.js
node --check section-nav.js
node --check site-config.js
```

For a Calendly integration change, download its public `https://assets.calendly.com/assets/external/widget.js` to a temporary file and run `node tests/calendly-prefill.cjs <path-to-widget.js>`. This optional test exercises the actual SDK's iframe URL construction without a browser or booking. The normal tests also check updated names/emails, accents, spaces and plus-addressing. Do not bundle the downloaded SDK into the site.

On this machine, Python with `lxml` is available at `C:/Users/Ben/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe`. Use it if the default Python lacks that library; this is a local convenience, not a site dependency.

These checks cover markup, links/anchors, navigation, form routing and clipboard behavior. They do not prove browser appearance or complete a live booking. The recent layout fixes have not had a full responsive browser pass. See the roadmap and Calendly notes for remaining verification.
