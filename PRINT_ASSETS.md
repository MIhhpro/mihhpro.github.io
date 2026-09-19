# Print and digital assets

## Current synchronized Hungarian and English brochures

2026-09-18: the owner approved the new Hungarian journey map and requested its English translation. [English training guide](../mihaly-bence-training-guide-en.pdf) now matches the approved four-stage journey: consultation, observation/assessment, first four sessions learning fundamentals, and ongoing goal-focused training. Both languages use the same layout function and matching text sources. English page 2 was retained unchanged; the Hungarian PDF was not regenerated. Both English pages visually checked, journey content and business contact verified. This supersedes the earlier English-not-yet-updated status below. Approximately 415 kB, saved in the Page workspace root. No publication or sending performed.

## Current Hungarian journey update

2026-09-18: the owner requested a Hungarian-only first-page revision. [Current Hungarian guide](../mihaly-bence-edzes-utmutato.pdf) now maps the overall coaching journey: (1) consultation, (2) observing and assessing movement/starting condition, (3) the first four sessions learning foam rolling (SMR), warm-up, basic movement patterns and cardio-machine use, (4) later sessions increasingly focused on goals. The duplicated introductory boxes and per-session phase map were replaced by four larger connected journey cards. The second page retains the individual session's four phases unchanged, verified against the previous PDF text. Portrait, approved colours, corrected business contact and footer/button exclusions are preserved.

Both final pages rendered with Poppler and visually checked; all requested first-page topics verified. Existing Hungarian filename copies synchronized. English PDF and its first-page layout remain at the earlier revision, intentionally unchanged per “Hungarian for now”; the builder retains that separate English path. Do not describe the English version as synchronized with this latest journey update. No files sent or published.

## English digital training guide

Created 2026-09-18 after the owner approved the corrected Hungarian design. [English training guide](../mihaly-bence-training-guide-en.pdf) is saved directly in the Page workspace root. It preserves the two-page layout, colours, logo, portrait, curved routes and stage cards; includes only the approved business email on page two; and has no prices, website footer or consultation button. English uses first-name-first name order and natural client-facing wording, including “Movement & technique” for the correction phase.

Build with `tools/build-training-brochure.py en`; translations are in `tools/training-brochure-en.json`. Default invocation still builds Hungarian. Existing Hungarian PDFs were not regenerated or changed. Both English pages were rendered with Poppler and visually checked; dimensions, translated key content, contact email and absence of excluded elements were checked. Approximately 416 kB. No document sent or published.

Latest screenshot clarification 2026-09-18: the highlighted footer item is the website label. Removed that label and its link from both pages, and restored `mihaly.bence.fitness@gmail.com` as the plain-text contact on page two. Current deliverable: [Hungarian training guide](../mihaly-bence-edzes-utmutato.pdf). Both copies under the previous filename were synchronized. This corrects the mistaken removal of the approved email and supersedes earlier footer notes. Verified the business email occurs once, there is no website label/link or yellow consultation button, and both rendered pages are clean.

Owner update 2026-09-18: use only `mihaly.bence.fitness@gmail.com` for client-facing email. Save new and revised deliverables directly in the workspace root `C:/Users/Ben/Desktop/Page/`. Builders remain under V18. The existing `output/pdf/` brochure copy was synchronized to avoid distributing a stale version. The price-sheet builders now also target the workspace root on their next run.

## Hungarian digital guide to personal training

Redesigned 2026-09-18 from the owner's supplied copy as a client-facing digital brochure, in the established black/gold/copper style with the circular MB logo. This replaces the original one-page print guide at the same output path.

- Final PDF: [Így zajlik a személyi edzés](../mihaly-bence-szemelyi-edzes-tajekoztato-hu.pdf). Two Hungarian portrait digital pages, 720 × 1000 PDF points, full dark background with no white print margin. Approximately 420 kB for sharing.
- Page 1: approved professional portrait, consultation/assessment boxes, and a schematic training journey with curved directional connections. This is a process map, not a geographic map. Page 2: the four training phases, matching vector icons, curved numbered route, adaptable frequency and the approved business email as plain text. The yellow consultation button and its link were removed at the owner's request.
- Contains no prices, payment/package conditions or mailto links. The only email is `mihaly.bence.fitness@gmail.com`. Workspace-wide email cleanup replaced 37 outdated occurrences across 24 older-version source files at the owner's explicit request; active V18 already used the approved address. This targeted contact cleanup is the exception to snapshot preservation authorized by this request.
- The consultation remains 20 minutes; the broader confirmed pricing, session duration and validity facts remain in PROJECT_NOTES/LEGAL_REVIEW but are omitted from this brochure as requested.
- Uses consistent formal Hungarian address. Describes correction through movement quality and technique rather than promising prevention of all musculoskeletal complaints. Clarifies that no prior training experience or preset fitness level is needed, rather than asserting there are no conditions whatsoever.
- Builder: `tools/build-training-brochure.py`; `tools/build-training-guide.py` now forwards to it. Uses reportlab, Pillow and pypdf with the existing project font and Windows Arial. Source logo and photo remain unchanged; the portrait is compressed only within the PDF.
- Verified two pages, dimensions, key content, the approved email, absence of prices/mailto links/consultation button, PDF metadata and link targets. Both final pages rendered with Poppler and visually checked. Workspace scan found no remaining outdated address references in readable files or PDF text/metadata/annotations. No live booking test, sending, publication or deployment performed. No client identity or full email retained.

## Current preferred format: Hungarian front and English back

Updated 2026-09-18 at the owner's request for clearer single-language sides on one laminated sheet.

- Existing PDF: [Double-sided A4 price sheet](../output/pdf/mihaly-bence-prices-a4-double-sided.pdf). Page 1 Hungarian; page 2 English. Its email is already correct; it was not regenerated during the latest brochure edit. Future builds save directly in the workspace root.
- Print both pages on one A4 sheet, portrait, colour, actual size / 100%, double-sided with **flip on long edge**. Both sides use matching approximately 7 mm white margins and the existing brand colours/logo. Laminate the printed sheet afterward.
- All seven prices appear on each page; descriptions and price periods are unchanged. Larger text and single-language descriptions replace the combined bilingual layout. English follows the site's first-name-first naming convention.
- Rebuild with `tools/build-duplex-price-sheet.py`. Requires the same dependencies as the original builder. PDF viewer preferences request no scaling and long-edge duplex, but actual printer settings still need to be selected.
- Both pages rendered with Poppler and visually checked after spacing refinement. A4 size, two-page count, language titles and all seven prices per page checked. No physical print, lamination or deployment performed.

## Bilingual A4 price sheet

Created 2026-09-18 at the owner's request, with Hungarian and English together.

- Historical combined-language design: rebuild with `tools/build-price-sheet.py` if needed. No existing output for this earlier variant was found during the latest folder check; future builds save directly in the workspace root.
- One portrait A4 page, 210 × 297 mm. Print in colour at actual size / 100%, single-sided. The approximately 7 mm white outer margin avoids requiring borderless printing; essential content sits at least 15 mm from the paper edges. Laminate after printing, using a pouch suitable for A4 paper.
- Preserves the V18 black, bronze/copper and gold palette and existing circular MB logo. Embedded fonts and vector text preserve print sharpness.
- Includes the free consultation, 11,000 Ft session, 100,000 Ft ten-session package, 19,900 Ft one-time four-week Training Program, and monthly Basic 29,900 / Plus 39,900 / Premium 49,900 Ft. Package support descriptions match PROJECT_NOTES.md and the service pages.
- Includes the existing website and email, plus a bilingual note that gym entry and package terms are agreed before starting. No new policy, tax treatment, duration guarantee or price validity period is asserted.
- Rebuild using `tools/build-price-sheet.py` with Python/reportlab and pypdf. The builder currently uses Windows Arial and the existing V18 Barlow Condensed font. Update this print sheet separately whenever approved prices change.
- Checked the PDF page count, A4 dimensions and all seven prices; rendered through Poppler and visually inspected. No physical test print, lamination, browser check or deployment performed.

Keep this internal note and the builder out of public uploads. The PDF is a client-facing print asset; it has not been added to site navigation or published.
