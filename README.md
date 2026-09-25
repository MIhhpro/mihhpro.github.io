# V19 — reviewed website source

## Homepage card spacing — 2026-09-25

Removed doubled section padding between the Success/Progress and Free resources cards on HU/EN homepages. home-layout.css v19.1 scopes the adjustment to #section-your-start and #section-free-resources; other pages and card design remain unchanged. Browser measurements: 32px desktop gap, 56px phone gap including existing shell padding; no page overflow. Structure/language checks pass. Latest local export: ../output/V19-public-home-spacing/; not deployed.

## Simplified navigation — 2026-09-25 (current)

Owner refinement supersedes the six-group navigation below. Seven top-level items, in order: Home, Personal training, Online coaching, Services (dropdown), About (dropdown), Free resources (single link), Contact (last). Services now holds overview/prices, comparison and first visit; About retains story, gallery and results. Removed resource sublinks and legal/Information menus from desktop AND mobile. Terms/privacy remain in the footer. Direct training/coaching links appear immediately after Home; mobile shrinks from 17 to 11 links.

Updated canonical map and navigation tests. Structure, language and navigation checks pass on all 24 pages. English 1200px desktop and 390px mobile visually checked, no header/menu overflow; all language counterparts verified statically. No new CSS/JS change. Latest local export: ../output/V19-public-direct-navigation/; not deployed.

## Complete grouped navigation — 2026-09-25

All 24 public HU/EN pages now share six centered header choices: Home, Services, About, Free resources, Contact, Information. Dropdowns expose all 11 localized content pages plus gallery, plan comparison, calculators, PDF-guide and training-log anchors. Mobile shows the same links grouped in the scrollable hamburger menu. Logo/name/language/CTA styling retained. No 404/internal-record links in content menus.

Canonical map: tools/site_navigation.py, applied by the shared language decorator (including privacy/404 builders). Assets: navigation.css/js v19.1. Native desktop details, keyboard entry/Escape, outside dismissal, single-open behavior and current-page highlighting. Shared script/styles unchanged. See NAVIGATION.md. Structure/language/navigation and existing booking/language JS checks pass; HU/EN desktop/tablet/phone preview and keyboard interactions verified. Latest clean export: ../output/V19-public-navigation/ (108 files, 4,810,120 bytes). Not deployed.

## Wider professional contact section — 2026-09-25

Reworked the direct-contact card on contact.html/contact-en.html (#section-contact-info), matching the booking workspace outer edges (1360px desktop, 1160px tablet, matching small-screen gutters). Desktop has credentials/portrait beside the contact introduction and actions; tablet/phone stack without page overflow. The message now explains planning, clear exercise guidance and progress-based adjustments. The existing About-page facts support IWI personal trainer/fitness instructor (2025), MES Trainer (2026), and nine years of the owner's own training, explicitly distinguished from coaching since 2025. Added a localized link to About qualifications. No new medical claims or testimonials.

Page-only contact-profile.css v19.1; updated responsive image sizes, reused existing portrait. Shared styles/scripts, booking, privacy and email/phone targets unchanged. HU/EN regenerated. HTML/language and contact-flow checks pass; local browser review at 1440px, 768px and 390px shows no page overflow and desktop alignment matches exactly. These are preview viewport checks, not physical-device tests. Latest clean export: ../output/V19-public-contact-profile-final/ (106 files including CNAME/.nojekyll). Not deployed.

## Gold online-coaching heading — 2026-09-25

Services comparison heading now emphasizes Online coaching in larger solid gold text, with a smaller localized comparison subtitle below. Responsive type sizes; coaching-comparison.css v19.2, HU/EN rebuilt. Latest local export: ../output/V19-public-comparison-gold/; not deployed.

## Clear comparison heading — 2026-09-25

Replaced the conversational comparison heading with explicit HU/EN titles: Online coaching csomagok összehasonlítása / Compare online coaching plans. Layout and package details unchanged. Latest local export: ../output/V19-public-comparison-title/; not deployed.

## Services plan comparison — 2026-09-25 (latest)

Replaced the four repetitive online-plan rows on services.html / services-en.html with a native comparison table at #osszehasonlitas. Consultation and personal-training rows remain. Columns: Training Program, Basic, Plus, Premium; existing prices and one-off/monthly periods retained. Rows compare program contents, weekly calls, adjustments, unlimited messaging and video technique checks. Links lead to the corresponding localized package details; section navigation includes Online plans. No new package benefits, booking changes or data collection.

Page-scoped coaching-comparison.css v19.1 preserves the dark bronze/gold theme. Small screens scroll inside a labelled, keyboard-focusable region; row headings stay pinned. Shared assets unchanged. HU/EN source inventory and English translations updated. Structure and language checks pass (24 pages, 11 pairs). Local browser review at 1440px desktop, 768px tablet and 390px phone showed no page overflow; keyboard horizontal scrolling and pinned labels verified. Newest public export: ../output/V19-public-coaching-comparison/ (105 files including CNAME/.nojekyll, 4,752,365 bytes). Prepared locally, not deployed.

## Google Sheets training-log cards — 2026-09-25 (latest)

Owner clarified that the website should use the finished Google Sheets templates, presented like the existing PDF guide. Replaced the older Excel download card with a full-width featured card, localized illustrated SVG covers, a language-matched Open template link, and File -> Make a copy instructions (Google account required for an editable copy). The PDF guide is unchanged. Cover art is illustrative, not a screenshot of a client record. Reuses existing responsive CSS, so no shared CSS/JS changes.

Drive metadata confirmed both templates are anyone-with-link reader files, not publicly editable; sharing and spreadsheet contents were not changed. HU button opened its correct Google Sheet in the signed-in preview. EN link and cover verified; desktop, 768px tablet and 390px phone had no page overflow. Structure and language checks pass. Old XLSX assets are preserved in V19 but no longer linked or included in the current referenced-file export. Privacy source/pages/downloads now describe the optional external Google Sheets link. Latest clean export: ../output/V19-public-training-templates/ (104 files), not deployed.

## Training log — 2026-09-25 (latest)

Created matching HU/EN Excel logs with four weekly progress rings, exercise entries and a separate fictional example. Root deliverables and localized download assets are ready. Replaced the resource-card placeholder with downloads; added XLSX to the referenced-file public allowlist. Formula, export, layout and local download checks passed. Excel desktop was not tested. Latest clean export: ../output/V19-public-training-log-final/ (104 files); not deployed. See TRAINING_LOG.md.

## Reading position across languages — 2026-09-25 (latest)

Added language-position.js v19.1 to all generated language pairs via the shared decorator. Same-tab switching captures the currently visible content landmark and offset, rather than reusing only the last URL hash. Restores after page layout/calculator initialization, accounts for translated section length and fonts, uses instant scrolling, and cancels on visitor interaction. One-use sessionStorage record (layout only; no form values), removed on read, 60-second validity. Blocked-storage fallback uses the currently viewed section. Calculator handoff remains separate and working. HU/EN desktop and 390px phone chart alignment verified locally; unit tests cover stale anchors, translated offsets, top/bottom, long sections, cancellation and fallback. Privacy source/pages/downloads describe the temporary position record. See LANGUAGE_POSITION.md. Current export: ../output/V19-public-language-position/ (102 files); not deployed.

## Calculator language continuity — 2026-09-25 (latest)

Language switching in the same tab now preserves both calculators' inputs, units and selections, using a one-use sessionStorage handoff. Read on the matching destination and removed immediately; stale handoffs (>60 seconds) are discarded. No data in URLs, requests, cookies, localStorage or booking. Current canonical metric values also transfer to avoid rounding changes at BMI boundaries. Cleared/invalid fields remain cleared/invalid. New-tab/modified clicks are excluded; blocked sessionStorage falls back to normal navigation. Visible notes and HU/EN privacy source/pages/downloads updated. Assets: calculator-state.js v19.1, macro JS v19.3, BMI JS v19.2; CSS unchanged. See CALCULATOR_STATE.md. Current export: ../output/V19-public-calculator-language/ (101 files), not deployed. This supersedes earlier no-storage/no-cross-language-transfer notes.

## BMI calculator — 2026-09-25 (latest)

Added the owner-requested BMI calculator immediately after the macro calculator on HU/EN Free Resources pages (#bmi), with matching cards, metric/imperial selection, animated scale, textual categories and adult-use/muscle-mass limitations. Inputs remain local; privacy disclosures now include BMI and height. Existing macro behavior unchanged. New BMI assets v19.1. Formula/boundary and existing macro/page/language tests pass; HU/EN desktop, tablet and phone layouts checked locally. See BMI_CALCULATOR.md. Current clean export: ../output/V19-public-bmi/ (100 files), superseding previous exports. Not deployed. Earlier references to BMI being undecided are historical.

## Macro calculator motion — 2026-09-24 (latest)

HU/EN calculator now has a smooth ring sweep and ratio transitions, subtle result feedback and selection hover/colour transitions. Reduced-motion preference is respected, including changes during playback. Macro assets v19.2; formulas and privacy behavior unchanged. See MACRO_CALCULATOR.md for checks. Current clean export: ../output/V19-public-macro-motion/ (98 files); not deployed.

## Interactive macro dashboard — 2026-09-24 (latest)

Implemented the owner-supplied Macro-Calculator.xlsx as an in-page HU/EN dashboard at segedletek.html#macro / resources-en.html#macro. Native radio cards follow Contact styling; weight supports comma/dot decimals and kg/lb with conversion. Results show estimated maintenance, daily grams, calorie shares, kcal, g/kg and g/lb. No BMI, weight-loss deficit, surplus, account, external library, storage or data submission added. Diet purpose changes protein only; this limitation and the custom nature of body-type offsets are explicit. Source workbook unchanged and not publicly uploaded.

Formula mapping, source hash and extracted reference cells are recorded in tools/macro-source-reference.json. Dedicated macro-calculator.js and macro-calculator.css (both v19.1) load only on resource pages. Base CSS remains 19.9; shared script 19.6. Calculator is a separate indexed section above downloads; finished PDFs remain available and training log remains a placeholder. Homepage and Online Coaching copy now promote the working calculator. HU/EN privacy pages/downloads explain browser-only processing.

Verified: all 12 type/goal combinations, cached workbook kg/lb examples, totals, decimals, rounding and invalid inputs via tests/macro-calculator.cjs. Browser checks at desktop 1440px, tablet 768px, phone 390px showed no page overflow; goal changes, kg/lb, keyboard radio selection, invalid input and actual keyboard clearing checked. Use keyboard clearing in preview QA: its fill-empty helper did not actually clear the field. All 24-page, 11-language-pair, booking, language and section-nav checks pass. Local server restarted on 8190.

Latest clean export: ../output/V19-public-macro-dashboard/ — 98 files, 4,695,427 bytes. Supersedes earlier exports. Not deployed. See MACRO_CALCULATOR.md for maintenance details.

## Finished training guides — 2026-09-23 (latest)

The owner supplied two finished PDFs in the Page root and requested website placement. They are copied byte-for-byte to assets/downloads/training-guide-hu.pdf and training-guide-en.pdf; originals are unchanged. First-page WebP covers are in assets/resources. The resource library now features the available two-page personal training guide, with language-specific cover, metadata, open-in-new-tab and download links. The macro calculator and training log remain empty Coming soon slots below it. Homepage and First Visit no longer describe the guide as unfinished. CSS 19.9; script remains 19.6.

HU desktop 1440px/tablet 768px and EN phone 390px checked in browser: matching language assets, no page overflow, responsive cover and buttons. Both PDFs return HTTP 200/application-pdf locally, and served bytes match the supplied originals. 24-page structural and 11-pair language checks pass. Language builder now maps explicitly approved localized assets as well as page routes.

Latest clean export: ../output/V19-public-training-guides/ — 96 files, 4,671,390 bytes. Supersedes earlier exports. Not deployed. No PDF content edited.

## Free resource placeholders — 2026-09-23 (latest)

Added `segedletek.html` / `resources-en.html`: three empty file cards for a macro calculator (Excel), first-session guide (PDF) and training log (Excel), all marked Coming soon / Hamarosan. There are no files, fake downloads, email gates or calculator functionality. BMI remains undecided and is not added. The theme and primary/mobile navigation remain unchanged. A homepage promotion, footer link on every page and contextual links from Online Coaching, First Visit and Personal Training lead to the library. The language switch preserves matching card anchors.

Responsive layout: three columns above 900px, horizontal stacked rows at 681–900px, stacked cards below. Browser-checked HU desktop 1440px/tablet 768px and EN phone 390px; no page overflow. A tablet title overflow was found and fixed. Homepage entry and English contextual URL checked. 24-page structure, 11 language pairs, booking, language and section-navigation checks pass. CSS 19.8; booking script remains 19.6.

Latest clean public export: `../output/V19-public-resources/` — 92 files, 3,741,814 bytes. Supersedes previous exports; not deployed. Existing live internal-file cleanup remains separate. Resource source/build guidance: [RESOURCES.md](RESOURCES.md).

## Equal panels and tablet layout — 2026-09-23 (latest)

Contact: booking/privacy information is now in two independent native disclosures below the booking workspace. Calendar helper text is also below the panels. At 1280px and wider, both panels stretch within the same grid row, matching top and bottom without fixed pixel heights or iframe clipping. Tablets (768–1279px) use a three-column service-card grid above a full-width calendar; phones retain the select. Keyboard focus synchronization follows the 768px card breakpoint. All changes retain existing routes, prices and Cal behavior. CSS 19.7; script 19.6.

Browser verified: at 1440px both panel heights were 663px, unchanged when the booking disclosure opened. At 1024px both stacked panels had matching widths and no overflow; 390px retained the dropdown with no overflow. HU/EN builder, 22-page validation, ten language pairs, booking/language/navigation checks pass. Latest upload folder: `../output/V19-public-booking-responsive/` (90 files, 3,714,912 bytes). Supersedes earlier exports. No booking, message or deployment performed.


## Booking alignment — 2026-09-23

Contact only: the calendar heading is visually hidden but retained as its accessible section name, so both card borders start at the same height. At the existing wide-rail breakpoint (1480px and 600px height), the section navigation is now an in-flow horizontal row below the hero and above the cards. It cannot overlay calendar controls. Its space is reserved before enhancement to avoid a startup jump. Other pages retain the side rail; smaller Contact viewports retain the compact navigation. CSS 19.5; JavaScript unchanged at 19.4.

Verified at 1920px: identical card top positions, navigation ends 24px above them, no horizontal overflow, live calendar renders. Structure, ten language pairs and section-navigation tests pass. Latest clean export: `../output/V19-public-booking-aligned/` (90 files, 3,712,774 bytes). Earlier exports are superseded. No booking or deployment performed.


## Desktop booking panel — 2026-09-23

Desktop (>1050px) now uses a wider 330–380px service panel with five large native radio cards, a gold selected state and visible keyboard focus. The booking workspace can grow to 1360px, keeping the calendar spacious. Cards use the existing translated select options and route handler; mobile retains its compact select. Selection and keyboard focus stay synchronized across breakpoints. Automatic calendar loading, enquiries, package choices, prices and privacy behavior are unchanged. CSS/script revision: 19.4.

Verified: desktop card selection opens the online calendar; selection/focus survives switching to 390px; 1440px layout has no horizontal overflow. Booking and language JavaScript checks, 22-page structural validation and ten language-pair checks pass. Latest public export: `../output/V19-public-desktop-booking/` (90 files, 3,711,362 bytes). Earlier exports are superseded. Not deployed.


## Immediate calendar — 2026-09-23

Supersedes the earlier time-first implementation below. The owner requested fewer steps: Contact now automatically loads the free-consultation calendar (or the valid linked appointment service). A compact service/package selector sits beside the calendar above 1050px and directly above it on smaller screens. Changes refresh the calendar without a submit button, scroll jump or focus transfer. Only enquiry routes show the name/email form and submit action. Failed calendars have Reload calendar and direct-link options; stale asynchronous responses cannot restore an abandoned service. Name/email/phone are still entered in Cal after slot selection. No PII is copied from an enquiry into Cal.

HU/EN privacy pages/downloads now disclose the automatic connection on Contact; other pages and initial direct enquiry routes do not load Cal. Earlier no-third-party-before-interaction measurements apply to the earlier build only. The header is shorter and booking/guardian/privacy information remains in an expandable panel. Native event details and dark/gold theme remain. CSS/script cache version: 19.3.

Verified locally: automatic consultation rendering, personal-training service switching and English online Plus route; aligned desktop panels at 1440px; no page overflow at 390px; email routing, retry/timeout/stale-load tests, 22-page structure and ten language pairs pass. No real booking, message, provider-account change or publication. Latest clean upload folder: `../output/V19-public-instant-booking/` (90 files, 3,707,547 bytes); previous exports are superseded.


## Active working copy — V19

Selected by the owner on 2026-09-22 after the V18 loading/privacy review. All new website changes belong in V19; V18 and older versions are snapshots. The copied V18 history below is context, not an instruction to return to that folder. Local V19 changes are not deployed. See [HANDOFF.md](HANDOFF.md), [NEXT_STEPS.md](NEXT_STEPS.md) and [AUDIT_2026-09-22.md](AUDIT_2026-09-22.md). Preview: http://127.0.0.1:8190/.

Completed 2026-09-23. V19 is created and active; V18 is now a snapshot. Start with [HANDOFF.md](HANDOFF.md) and the [loading/privacy audit](AUDIT_2026-09-22.md).

Static HTML/CSS/JavaScript; 22 public pages in Hungarian and English. No build server, visitor account, on-site payment or website email backend. Contact loads Cal.com automatically for appointment routes. Email enquiries use Gmail drafts or copyable text. The owner confirms booking/design work. Fonts are self-hosted and photos use responsive WebP files.

## Documentation

- [NEXT_STEPS.md](NEXT_STEPS.md): remaining owner/legal/operational work.
- [CAL_SETUP.md](CAL_SETUP.md): current booking configuration and verification limits. CALENDLY_SETUP is archived context.
- [PRIVACY_REVIEW.md](PRIVACY_REVIEW.md), [PRIVACY_QUESTIONS.md](PRIVACY_QUESTIONS.md), [LEGAL_REVIEW.md](LEGAL_REVIEW.md): drafts and completed intake. Do not treat them as final legal approval.
- [INCIDENT_RESPONSE.md](INCIDENT_RESPONSE.md): prepared private operating procedure.
- [PUBLISHING_CHECKLIST.md](PUBLISHING_CHECKLIST.md): deployment safeguards; exclude internal files and remove already exposed Markdown from the live site.
- [PROJECT_NOTES.md](PROJECT_NOTES.md), [CONTENT_ROADMAP.md](CONTENT_ROADMAP.md), [MOTION_NOTES.md](MOTION_NOTES.md): established design/content and history, not authority for unrelated changes.
- [PRINT_ASSETS.md](PRINT_ASSETS.md), [CONTRACT_REFERENCE_REVIEW.md](CONTRACT_REFERENCE_REVIEW.md): client-document/print references. Deliver revised client documents in the Page root.
- [Font sources](assets/fonts/SOURCES.md): font provenance and required public licences.

## Build and check

Run Python tools/build-terms.py after terms changes, or tools/build-languages.py after ordinary page changes. Add new normal-page translations through tools/extract-translations.py and tools/english-translations.json first. Privacy source is tools/privacy-content.json. Build scripts work relative to their version directory.

Run Python tests/validate.py and tests/languages.py; Node tests/contact-flow.cjs, tests/email-copy.cjs, tests/languages.cjs, tests/motion.cjs and tests/section-nav.cjs. tests/loading-audit.html is an internal, unthrottled same-origin browser measurement harness, not production analytics or a field performance score.

Client email: mihaly.bence.fitness@gmail.com. Live domain: https://mihalybence.com/. Never upload the entire workspace or active source directory indiscriminately. Preserve licences for all public fonts.

## Public upload folder

Use `../output/V19-public-instant-booking/` for the prepared public files, not the entire V19 source folder. It is 3.70 MB across 90 files and includes the custom-domain CNAME. No publication has been performed. Rebuild with `python tools/build-public.py ../output/V19-public-NEW` after changes, choosing a fresh directory name. Existing live internal notes need explicit removal; merely copying new files may leave them accessible.

## Earlier time-first booking — 2026-09-23 (superseded)

The owner requested availability before contact details. HU/EN Contact now starts with a compact service/package selector and an explicit Choose a time action. Name, email, phone and message are hidden and disabled for configured calendar routes; Cal asks for its contact details after a slot is selected. Only service/package notes are sent by the website to Cal, including the direct-link fallback. Details from an abandoned email enquiry are never prefilled into Cal. Training Program, other questions and missing-calendar routes retain required contact fields and local email drafts. Calendar loading is still explicit, not automatic on page load. Prices, theme, guardian-email route and native confirmation remain unchanged.

The contact profile is below booking, the mobile step guide is compact, and the HU/EN privacy pages/downloads describe the new transfer timing. CSS/script cache revision is 19.1. Local browser: consultation calendar rendered without personal details; selecting a slot showed native name/email/phone fields, with no confirmation submitted. HU 390px and EN 1440px checks showed no horizontal overflow; English Plus package and switching to email enquiry verified. Five JavaScript suites, 22-page validation and ten language-pair checks passed. No booking, message, account change or deployment occurred. This is a usability change, not evidence of a doubled conversion rate.

Fresh public export: `../output/V19-public-instant-booking/` (90 files, 3,707,547 bytes). Earlier `V19-public/` export is superseded. Internal Markdown remains excluded. Historical prefill/load-failure descriptions below are superseded by this entry.


