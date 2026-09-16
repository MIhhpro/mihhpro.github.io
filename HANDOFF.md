# V16 — current handoff

Updated 2026-09-12. **All new site work belongs in V16.** Initially copied from V15 on 2026-09-08. V16 now includes bilingual privacy review pages and contact disclosures. V15 remains untouched. No live upload was made.

Latest owner update: **V15 has now been published, including the recent changes.** V16 remains the development version. Publication is owner-confirmed, not independently inspected. See [NEXT_STEPS.md](NEXT_STEPS.md) for the refreshed remaining-work list; earlier “local only / upload next” statements describe the state before this update.

## Current baseline

- Owner confirmation (2026-09-12): Calendly design and the previously reported field-contrast issue are fixed. Booking was already confirmed working. Preserve the current widget appearance; do not reopen the old colour investigation without a new report. The fix mechanism was not supplied or independently inspected.

- Motion refinement (2026-09-12): shorter reveals, native FAQ expansion, brief gold-button sheen, gentler card/menu/gallery feedback. Read MOTION_NOTES for accessibility fallbacks, tests and the shared `16.1` cache revision. Both languages retain the existing design and assets.

- Static HTML/CSS/JavaScript: 22 public HTML files, comprising eight main pages in HU/EN, two terms drafts, two privacy review pages and two error pages.
- Centered page menu; Hungarian/UK flag selector with a sliding gold highlight. Language switching preserves section and service/package URL choices; reduced-motion and browser Back are handled.
- Bronze/copper/gold/black palette. Real trainer copy and approved photos; three gallery placeholders remain intentional. No blog or fabricated testimonials. Sikerek remains in the primary navigation; the gallery belongs to Rólam.
- The circular MB logo has transparent corners, a gold ring, black centre and gold lettering. The large asset is `assets/mb-logo-1024.png`; favicon and Apple icon variants are already connected.
- Prices: consultation free; personal training 11,000 Ft/session or 100,000 Ft/ten sessions; Training Program 19,900 Ft/four weeks; monthly Basic 29,900, Plus 39,900 and Premium 49,900 Ft. See PROJECT_NOTES for included support.
- Client email: mihaly.bence.fitness@gmail.com. Booking details prefill Calendly; standalone programme and other enquiries prepare Gmail drafts or copyable text. No on-site payment processing.

## Editing map

| Change | Source and follow-through |
| --- | --- |
| Main page content/layout | Edit Hungarian originals, append new strings with `tools/extract-translations.py`, translate their stable IDs in `tools/english-translations.json`, then run `tools/build-languages.py`. |
| Header flags, favicon links or language pairs | `tools/build-languages.py`; regenerate. Shared layout/animation is in `language.css` and `language.js`. |
| Terms | `tools/terms-content.json`, then `tools/build-terms.py`; this also regenerates language and 404 pages. Keep draft status. |
| Privacy | Read PRIVACY_REVIEW; edit `tools/privacy-content.json`, then `tools/build-languages.py`. Keep review status until the documented operational gaps are resolved. |
| Error-page copy/layout | `tools/build-404.py` and `error.css`. Both error pages are generated. |
| Circular logo/icons | `tools/build-brand.py`; font and licence are in `tools/fonts/`. |
| Contact/Calendly | `script.js`, `site-config.js`, source contact HTML and translations; read CALENDLY_SETUP first. |

Run local generators from V16. They resolve paths from their own location, so copied tools operate on V16 automatically. Do not edit generated English or error HTML as the sole source of a change. Existing `?v=15.x` cache keys are inherited asset revisions, not paths back to V15; bump them when the relevant served asset changes, rather than blindly renaming them for a folder copy.

## Still open

- The owner says the site is live on GitHub with the domain connected. The actual public URL, repository and upload workflow have not been recorded. Uploading this folder is separate work; do not create replacement hosting or change DNS as part of a local edit.
- The intermittent desktop copper/gold line was not reproduced. Full-section focus outlines were removed as a plausible cause. If it returns, identify the affected page/state from a screenshot before making broader visual changes.
- English Calendly event names/questions and notifications remain an account-content check unless the owner confirms them separately. Calendly design/field contrast is resolved by owner confirmation.
- The terms remain review drafts. Missing business/refund decisions and contract/withdrawal processes are documented in LEGAL_REVIEW. Privacy pages now exist in both languages, including confirmed Meet/chat apps, but retention deadlines, app settings and provider arrangements remain open in PRIVACY_REVIEW. Do not describe the site as legally approved.
- Google Business/listing and Google search-promotion tasks were declined by the owner. Preserve the existing gym map link and necessary Google service privacy disclosures. GitHub Pages policy was checked: off-site payments do not automatically exempt this commercial booking site; obtain a provider-specific answer before treating hosting suitability as settled.
- Favicon and HU/EN 404 work is complete locally; sharing previews and live verification remain separate tasks. Error pages use `<base href="/">` for the owner's custom domain; change this if publishing under a repository subpath.

## Verification and preview

Use README's check commands, selecting checks appropriate to the change. Structural/interaction tests are local and do not send messages or book appointments. A successful copy or test does not establish browser/device appearance or live publication. Serve **V16 itself** for preview; an existing V15 server stays on V15 until its working directory is changed. No preview server was started for the version copy.
