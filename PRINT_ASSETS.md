# Print and digital assets

## Active working copy — V19

Selected by the owner on 2026-09-22 after the V18 loading/privacy review. All new website changes belong in V19; V18 and older versions are snapshots. The copied V18 history below is context, not an instruction to return to that folder. Local V19 changes are not deployed. See [HANDOFF.md](HANDOFF.md), [NEXT_STEPS.md](NEXT_STEPS.md) and [AUDIT_2026-09-22.md](AUDIT_2026-09-22.md). Preview: http://127.0.0.1:8190/.

## Review checkpoint — 2026-09-22

This V18 review is complete and is the source for the requested V19 working copy. The owner confirms the Cal.com booking and dark canvas work. Local fonts and stable navigation startup are implemented; HU/EN privacy and terms draft 9/downloads are synchronized. All 19 privacy intake questions remain complete. [AUDIT_2026-09-22.md](AUDIT_2026-09-22.md) is the current measurement, source and outstanding-work record; it supersedes earlier remote-font and pending-calendar-render statements. Other dated entries below remain historical.

Priority publication cleanup: live HANDOFF.md and PRIVACY_QUESTIONS.md were verified publicly readable. Remove internal notes from the publishing output/source, keep local working notes, and verify public URLs return 404. No deployment or external deletion was performed. Legal documents remain review drafts; successful page/booking checks do not establish legal approval.

## Portrait enhancement and sunglasses removal — 2026-09-21

Updated the existing root `Mihaly-Bence-Nevjegy-uj-portreval` PDF/SVG/PNG at the owner's request. Sunglasses removed with built-in image editing; white linen shirt reconstructed, photographic detail enhanced, and portrait reframed to preserve continuous shoulders. Selected image: `assets/business-card-portrait-hd-no-sunglasses.png`, also provided as root `Mihaly-Bence-Portre-napszemuveg-nelkul-HD.png`. Actual selected resolution: 1024 × 1536 RGBA, versus the previous landscape cutout's 1672 × 941 with substantial empty canvas. At its card placement, effective source resolution is 508 ppi. This is AI-enhanced detail, not recovered original-camera detail. Do not claim a 3K/4K portrait.

The card preview is now 2400 × 1334 px. Text and SVG base layout are verified identical to earlier cards; print trim/bleed unchanged. Final card visually checked for sunglasses removal, portrait edge continuity, clear text and positioning. Earlier portrait assets retained. No website edits or publication.

## Business card with new supplied portrait — 2026-09-21

Root `Mihaly-Bence-Nevjegy-uj-portreval.pdf`, `.svg` and `.png` now use the owner's `Timeline 1_00086400.png` portrait. Existing red/white vector layout, flags, copy, approved contact and print dimensions are unchanged. The prior portrait and no-portrait deliverables remain available. Build with `tools/build-business-card.py --new-photo`.

The original large PNG initially failed the image tool's file reader. A PNG copy with identical decoded RGB pixels and compact encoding is stored as `assets/business-card-new-portrait-source.png`. Built-in image generation removed the black background; its transparent output is `assets/business-card-new-portrait-cutout.png`. The cutout is sized/positioned in the card without further photo retouching. This is an image-tool edit, not a claim of pixel-identical preservation of the subject. The prompt is recorded in `tools/business-card-portrait-prompt.txt`.

Final PDF rendered and visually checked. Confirmed unchanged PDF text, identical SVG base-layout group, one embedded portrait, one PDF page, 90 × 50 mm trim and 3 mm bleed. No website edits or publishing.

## Business card templates — 2026-09-21

Created root `Mihaly-Bence-Nevjegy-portreval` and `Mihaly-Bence-Nevjegy-portre-nelkul` in SVG, PDF and PNG formats from the supplied red/white photographed card. This specific reference overrides the website palette for these cards only. Both variants share identical editable vector layout/text; only the portrait layer is removed in the second. Uses the approved business email, both reference flags, original service labels, italic heading and angular red/contact banners. No website changes.

Builder: `tools/build-business-card.py`. Source photo archived unchanged at `assets/business-card-reference.png`; the real portrait is retained using a native vector clip and affine placement. A built-in image-generation extraction was tried but rejected because it altered facial/shirt details; no generated portrait is used in the deliverables. Owner notes in root `Mihaly-Bence-Nevjegy-olvasd-el.md` explain editing, print dimensions and the reference-photo grain limitation.

Assumed 90 × 50 mm trim size, with 3 mm bleed in both PDF exports (96 × 56 mm MediaBox, explicit TrimBox/BleedBox). SVGs and preview PNGs show trim size. PDFs embed fonts; editable SVGs use Arial. RGB output, no asserted printer-profile certification or physical print proof. Both final trim previews visually inspected; PDF page sizes, equal text, business contact, SVG XML and identical base-layout groups verified.

## Expanded Hungarian training rules — 2026-09-20

Follow-up alignment correction: centered all 14 numbered circle labels and the MB initials horizontally and vertically using measured text width and font cap height. Regenerated the same root PDF; all four rendered pages visually checked and extracted text verified unchanged.

Created [four-page rules review PDF](../Mihaly-Bence-Szabalyzat-kiegeszitett.pdf) from the owner's Desktop `Mihaly-Bence-Szabalyzat.pdf`, preserving its black/bronze/gold panels, circular MB mark and typography style. Original file unchanged. New builder: `tools/build-training-rules.py`; root [owner-only change and decision notes](../Mihaly-Bence-Szabalyzat-valtozasok.md) document researched sources and unresolved contract details. Keep the owner notes out of public uploads.

Adds pain-masking/medication safeguards without a blanket medication ban, acute illness and stop/emergency signals, safe equipment use, hygiene, respect, filming consent, physical-touch consent, client rights and trainer responsibilities. Replaces the blanket liability waiver, unrestricted equipment right, fixed two-hour sedative rule and universal pre-exercise food ban. Carries the previously confirmed under-24-hour cancellation principle only for the affected prepaid appointment; other unconfirmed penalties/exceptions are not invented. The PDF is visibly an **egyeztetési változat**, not legally approved or automatically in force; detailed terms and health-data consent remain separate.

All four pages rendered and visually inspected; revised page 1 rendered and inspected again after the cancellation clarification. Verified four pages, the sole approved business contact, emergency number, cancellation clause and no website footer. No website edits, sending or publication performed.

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
