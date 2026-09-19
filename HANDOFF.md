# V18 — current handoff

Updated 2026-09-18. **All new site work belongs in V18.** Copied from the current V16 after refreshing its notes. V16, the existing V17 and all older folders are snapshots. Website code/assets are unchanged by this copy. V18 has not been published or browser-tested.

## Current status — 2026-09-18

English translation of the approved Hungarian journey map is now complete: `mihaly-bence-training-guide-en.pdf` in the root matches the four-stage process. Both English pages verified; Hungarian PDF unchanged. Both language builders now use the same journey layout. This supersedes earlier English-pending notes below.

Latest Hungarian brochure update: page 1 now maps consultation, observation/assessment, the first four sessions learning fundamentals, and subsequent goal-focused sessions. Page 2 still describes an individual workout. The owner specifically requested Hungarian only; English remains at the prior revision. Current Hungarian root PDF and prior-name copies are synchronized and visually checked. See PRINT_ASSETS.md.

Matching English digital training brochure created after approval of the corrected Hungarian design: root file `mihaly-bence-training-guide-en.pdf`. Both English pages visually checked. Hungarian PDFs unchanged. Shared builder accepts `en`; see PRINT_ASSETS.md for translation source and verification.

Latest brochure screenshot clarification: removed the highlighted website footer label and link from both pages, and restored the approved business email as plain text on page two. Current root deliverable is `mihaly-bence-edzes-utmutato.pdf`; earlier filename copies were synchronized. This supersedes the mistaken email-removal interpretation. No consultation button or prices are included.

Hungarian personal-training explainer is a two-page digital marketing PDF with portrait, curved training journey and stage boxes, saved directly in the Page workspace root. Latest owner edit removes the yellow consultation button and adds only `mihaly.bence.fitness@gmail.com` as plain-text contact. Prices are excluded. All new/revised client documents belong directly in the workspace root. At the owner's explicit request, 37 outdated email occurrences in 24 older-version files were replaced with the approved business address; active V18 already used it. See PRINT_ASSETS.md. Previously confirmed 20-minute consultation, 60-minute individual session and ten-session validity of three months from payment remain recorded in PROJECT_NOTES/LEGAL_REVIEW; website and terms source synchronization remains pending. No client identity retained, document sent or deployment performed.

Printable A4 price sheets created locally on 2026-09-18. The owner's preferred version now has Hungarian on page 1 and English on page 2 for long-edge double-sided printing and lamination; the original combined bilingual sheet is retained. See [PRINT_ASSETS.md](PRINT_ASSETS.md) for final PDFs, print settings and verification. Website behavior and pricing are unchanged; no publication or physical print check performed.

All 19 privacy intake questions are answered. The incident/data-request procedure is prepared in INCIDENT_RESPONSE.md; it has not been rehearsed. Terms and privacy notices remain review drafts. Next work: missing terms/business/refund decisions; separate online agreement and health consent with guardian verification and applicable withdrawal process; provider/privacy implementation and accountant details; unresolved GitHub hosting suitability; final bilingual legal publication. Photography and sharing previews remain optional owner work. Calendly design, booking, English account content and V16 live checks are owner-confirmed complete. Do not repeat completed intake or reopen fixed issues without new evidence. No new deployment or independent live audit is implied.

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

Run local generators from V18. They resolve paths from their own location, so copied tools operate on V18 automatically. Do not edit generated English or error HTML as the sole source of a change. Existing `?v=15.x` cache keys are inherited asset revisions, not paths back to V15; bump them when the relevant served asset changes, rather than blindly renaming them for a folder copy.

## Privacy intake completed — current action

All 19 numbered owner questions are recorded. Use [INCIDENT_RESPONSE.md](INCIDENT_RESPONSE.md) for the prepared internal response/request procedure. Next work is implementation and legal/provider review, not repeating the intake. The procedure has not been rehearsed. Keep public notices in review status and private logs out of this website. Historical question-by-question notes below are superseded by later answers.

## Still open

- Live domain: https://mihalybence.com/, with V16 publication/live checks owner-confirmed on 2026-09-17. Subsequent local legal edits are not automatically live. Repository/upload workflow remains unrecorded. See PRIVACY_QUESTIONS.md for all confirmed answers and NEXT_STEPS.md for current priorities.

- The intermittent desktop copper/gold line was not reproduced. Full-section focus outlines were removed as a plausible cause. If it returns, identify the affected page/state from a screenshot before making broader visual changes.
- Calendly design, booking and English content are owner-confirmed complete. Do not reopen these tasks without a new issue.
- The terms remain review drafts. Missing business/refund decisions and contract/withdrawal processes are documented in LEGAL_REVIEW. Privacy pages now exist in both languages, including confirmed Meet/chat apps, and confirmed retention policies are recorded. Actual implementation, provider arrangements and remaining review points are documented in PRIVACY_REVIEW. Do not describe the site as legally approved.
- Google Business/listing and Google search-promotion tasks were declined by the owner. Preserve the existing gym map link and necessary Google service privacy disclosures. GitHub Pages policy was checked: off-site payments do not automatically exempt this commercial booking site; obtain a provider-specific answer before treating hosting suitability as settled.
- Favicon and HU/EN 404 work is complete; V16 live checks are now owner-confirmed. Sharing previews/photography are in progress with the owner. Error pages use `<base href="/">` for the owner's custom domain; change this if publishing under a repository subpath.

## Verification and preview

2026-09-18 copy checks: all 108 source files matched immediately after copying; all non-Markdown files still match V16 after the documentation updates. V18 structural checks passed for 22 pages; language checks passed for ten pairs, prices, navigation, 404 recovery, favicon and privacy links. Markdown encoding and local document links also passed. No browser/device check, preview-server switch or deployment was performed.

Use README's check commands, selecting checks appropriate to the change. Structural/interaction tests are local and do not send messages or book appointments. A successful copy or test does not establish browser/device appearance or live publication. Serve **V18 itself** for preview; an existing server keeps serving its original folder until explicitly changed. No preview server was started for the version copy.
