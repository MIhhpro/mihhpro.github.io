# Free resources — V19

## Google Sheets training-log cards — 2026-09-25 (latest)

Owner clarified that the website should use the finished Google Sheets templates, presented like the existing PDF guide. Replaced the older Excel download card with a full-width featured card, localized illustrated SVG covers, a language-matched Open template link, and File -> Make a copy instructions (Google account required for an editable copy). The PDF guide is unchanged. Cover art is illustrative, not a screenshot of a client record. Reuses existing responsive CSS, so no shared CSS/JS changes.

Drive metadata confirmed both templates are anyone-with-link reader files, not publicly editable; sharing and spreadsheet contents were not changed. HU button opened its correct Google Sheet in the signed-in preview. EN link and cover verified; desktop, 768px tablet and 390px phone had no page overflow. Structure and language checks pass. Old XLSX assets are preserved in V19 but no longer linked or included in the current referenced-file export. Privacy source/pages/downloads now describe the optional external Google Sheets link. Latest clean export: ../output/V19-public-training-templates/ (104 files), not deployed.

## Training log — 2026-09-25 (latest)

Created matching HU/EN Excel logs with four weekly progress rings, exercise entries and a separate fictional example. Root deliverables and localized download assets are ready. Replaced the resource-card placeholder with downloads; added XLSX to the referenced-file public allowlist. Formula, export, layout and local download checks passed. Excel desktop was not tested. Latest clean export: ../output/V19-public-training-log-final/ (104 files); not deployed. See TRAINING_LOG.md.

## Calculator language continuity — 2026-09-25 (latest)

Language switching in the same tab now preserves both calculators' inputs, units and selections, using a one-use sessionStorage handoff. Read on the matching destination and removed immediately; stale handoffs (>60 seconds) are discarded. No data in URLs, requests, cookies, localStorage or booking. Current canonical metric values also transfer to avoid rounding changes at BMI boundaries. Cleared/invalid fields remain cleared/invalid. New-tab/modified clicks are excluded; blocked sessionStorage falls back to normal navigation. Visible notes and HU/EN privacy source/pages/downloads updated. Assets: calculator-state.js v19.1, macro JS v19.3, BMI JS v19.2; CSS unchanged. See CALCULATOR_STATE.md. Current export: ../output/V19-public-calculator-language/ (101 files), not deployed. This supersedes earlier no-storage/no-cross-language-transfer notes.

## BMI calculator — 2026-09-25 (latest)

Added the owner-requested BMI calculator immediately after the macro calculator on HU/EN Free Resources pages (#bmi), with matching cards, metric/imperial selection, animated scale, textual categories and adult-use/muscle-mass limitations. Inputs remain local; privacy disclosures now include BMI and height. Existing macro behavior unchanged. New BMI assets v19.1. Formula/boundary and existing macro/page/language tests pass; HU/EN desktop, tablet and phone layouts checked locally. See BMI_CALCULATOR.md. Current clean export: ../output/V19-public-bmi/ (100 files), superseding previous exports. Not deployed. Earlier references to BMI being undecided are historical.

## Interactive macro dashboard — 2026-09-24 (latest)

Implemented the owner-supplied Macro-Calculator.xlsx as an in-page HU/EN dashboard at segedletek.html#macro / resources-en.html#macro. Native radio cards follow Contact styling; weight supports comma/dot decimals and kg/lb with conversion. Results show estimated maintenance, daily grams, calorie shares, kcal, g/kg and g/lb. No BMI, weight-loss deficit, surplus, account, external library, storage or data submission added. Diet purpose changes protein only; this limitation and the custom nature of body-type offsets are explicit. Source workbook unchanged and not publicly uploaded.

Formula mapping, source hash and extracted reference cells are recorded in tools/macro-source-reference.json. Dedicated macro-calculator.js and macro-calculator.css (both v19.1) load only on resource pages. Base CSS remains 19.9; shared script 19.6. Calculator is a separate indexed section above downloads; finished PDFs remain available and training log remains a placeholder. Homepage and Online Coaching copy now promote the working calculator. HU/EN privacy pages/downloads explain browser-only processing.

Verified: all 12 type/goal combinations, cached workbook kg/lb examples, totals, decimals, rounding and invalid inputs via tests/macro-calculator.cjs. Browser checks at desktop 1440px, tablet 768px, phone 390px showed no page overflow; goal changes, kg/lb, keyboard radio selection, invalid input and actual keyboard clearing checked. Use keyboard clearing in preview QA: its fill-empty helper did not actually clear the field. All 24-page, 11-language-pair, booking, language and section-nav checks pass. Local server restarted on 8190.

Latest clean export: ../output/V19-public-macro-dashboard/ — 98 files, 4,695,427 bytes. Supersedes earlier exports. Not deployed. See MACRO_CALCULATOR.md for maintenance details.

The owner approved the library plus contextual-link approach on 2026-09-23, requesting empty file placeholders only. This is not a blog. Keep the main navigation unchanged.

## Finished guide added — 2026-09-23

The owner supplied mihaly-bence-szemelyi-edzes-tajekoztato-hu.pdf and mihaly-bence-training-guide-en.pdf in the Page root. Exact public copies are assets/downloads/training-guide-hu.pdf and training-guide-en.pdf. Do not edit the approved PDFs as part of ordinary website work. The two-page brochure covers the consultation, first sessions and workout structure, so its card is now titled Személyi edzés útmutató / Personal training guide. Shared anchor first-session is retained.

Actual first-page WebP covers (576x800) are assets/resources/training-guide-hu.webp and training-guide-en.webp. The PDFs are fetched only when opened/downloaded, not embedded automatically. LOCALIZED_ASSETS in tools/build-languages.py maps cover and PDF paths to English; the language tests account for those explicit equivalents. Update files, metadata and mapping together if replacing the documents.

The featured guide spans the resource grid with a side-by-side cover and description on larger screens and stacked content on phones. Macro and training log remain placeholders. CSS 19.9. Current clean upload folder: output/V19-public-training-guides (96 files, not deployed).

## Original slots (historical)

| Shared anchor | Hungarian title | English title | Planned format |
| --- | --- | --- | --- |
| macro | Makrókalkulátor | Macro calculator | Excel |
| first-session | Az első edzés útmutatója | Your first-session guide | PDF |
| training-log | Edzésnapló | Training log | Excel |

Originally no resource files were created or linked; this is superseded by the finished-guide entry above. Coming soon is plain status text, not a disabled or fake download button. Do not enable downloads until the owner supplies or approves actual content. BMI was only floated, not selected.

## Editing

Hungarian source: segedletek.html. English counterpart: resources-en.html, generated by tools/build-languages.py. Page pair and extraction list have been extended. Append stable translation inventory IDs and English translations for future copy; never renumber. The builder injects language-matched footer links idempotently, including privacy and 404 pages.

Homepage has section-free-resources and a matching section-index entry. Contextual asides are within the existing last sections of online-coaching.html, elso-alkalom.html and szemelyi-edzes.html. Their fragment URLs point to the relevant card. Existing booking choices and prices are unchanged.

Resource styles are scoped at the end of styles.css, cache revision 19.8. No new JavaScript or third-party assets. Grid breakpoints: >900px three cards; 681–900px horizontal rows; <=680px stacked cards. Existing reveal/reduced-motion behavior is reused.

When actual documents are requested, deliver client documents in the workspace root, retain source assets/builders in V19, and deliberately include approved public copies in the website. The public export currently allows PDF but not XLSX; review and add XLSX only when a real approved spreadsheet is linked. Avoid empty binary files. Rebuild a fresh public export after edits; current latest is output/V19-public-resources (not deployed).

