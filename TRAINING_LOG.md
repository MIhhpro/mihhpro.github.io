# Training log — 2026-09-25

## Google Sheets training-log cards — 2026-09-25 (latest)

Owner clarified that the website should use the finished Google Sheets templates, presented like the existing PDF guide. Replaced the older Excel download card with a full-width featured card, localized illustrated SVG covers, a language-matched Open template link, and File -> Make a copy instructions (Google account required for an editable copy). The PDF guide is unchanged. Cover art is illustrative, not a screenshot of a client record. Reuses existing responsive CSS, so no shared CSS/JS changes.

Drive metadata confirmed both templates are anyone-with-link reader files, not publicly editable; sharing and spreadsheet contents were not changed. HU button opened its correct Google Sheet in the signed-in preview. EN link and cover verified; desktop, 768px tablet and 390px phone had no page overflow. Structure and language checks pass. Old XLSX assets are preserved in V19 but no longer linked or included in the current referenced-file export. Privacy source/pages/downloads now describe the optional external Google Sheets link. Latest clean export: ../output/V19-public-training-templates/ (104 files), not deployed.

## Google Sheets templates — 2026-09-25

Migrated the latest checkbox workbooks into native Google Sheets in the owner's My Drive / ChatGPT folder. These are separate client assets; website files and downloads were not edited.

- Hungarian: https://docs.google.com/spreadsheets/d/1XR7rYVhGnF5nFFdM5xmBaUG0yHBMBiSWWe5gH-W1J5U/edit
- English: https://docs.google.com/spreadsheets/d/1CF4-7t-95jRZJAScxxNvXQ7Gdw_feC_AVhcDQAdPzY0/edit

Both links have anyone-with-the-link reader access (not discoverable in search), verified through Drive metadata. Clients use File → Make a copy for their own tracker. Replaced Excel-specific instructions; added native BOOLEAN checkbox validation to 28 input cells and the checked example. Weekly goal is a strict whole number from 1 to 7. Locales HU/UK and Europe/Budapest timezone are set. Removed obsolete numeric validation from the six fixed third-week session labels only, preserving exercise-entry constraints.

Google conversion preserved ring slice colors but added opaque backgrounds. Restored transparent backgrounds and no borders through the native chart editor for all eight charts. Reviewed all six tabs in Google Sheets. Live Hungarian checkbox counts and percentages recalculated; final connector readback confirms both templates have 28 unchecked boxes, goal 2, completed 0, remaining 8 and all four percentages 0. The example checkbox remains checked. No actual client records were included. Intermediate exports are in project-root tmp/training-log.

## Checkbox workflow — latest revision

Owner asked to remove repeated date entry and make the files self-explanatory. Both language assets now use seven native cell checkboxes per weekly card. Each tick counts one session, and percentages update independently of the optional start date. Weekly goal has a 1–7 input rule and defaults to 2. Date and goal format hints sit immediately above their inputs. The long date-based completion table is removed. Optional exercise detail uses week/session labels and an example above each column. A real checked box on the example sheet demonstrates 1 of 2 sessions = 50%.

Current deliverables: root `mihaly-bence-training-log-hu.xlsx` and `mihaly-bence-training-log-en-checkboxes.xlsx`. The earlier English filename was locked by an open application, so the revised English asset was saved separately without closing the user's application. Website assets remain untouched.

Artifact Tool exports boolean cells as native checkboxes, including featurePropertyBag and style metadata, and renders them correctly. `finish-training-log.py` preserves this metadata and finishes only chart styling/recalculation. The builder imports root tmp snapshots named `pre-checkbox-hu.xlsx` / `pre-checkbox-en.xlsx` for this edit. Checks covered tick/untick behavior, 50% and 100%, goal 1 and 7, all 28 ticks, invalid zero, no-date operation, exported/reopened calculations and all six rendered sheets. Saved templates contain 28 unchecked input boxes plus one checked fictional example. Package metadata was verified. Excel desktop clicking was not tested; use current Excel for Microsoft 365 (https://support.microsoft.com/en-us/excel/using-check-boxes-in-excel).

## Asset redesign — latest owner direction

The owner assigned website maintenance to another chat. This task now creates and edits assets only; do not copy revised workbooks into website downloads or build public exports here.

Both root workbooks were redesigned using the supplied progress-tracker screenshots: warm beige background, burnt-orange accents, peach input rows and a two-by-two weekly card layout with formula-driven percentages centered inside transparent native doughnut charts. Three sheets and exercise/example content retained. Overview controls are now C6 (start date) and J6 (weekly goal); completed-session rows are 47–106. Completed/remaining headline counts sum weekly results. Website files and public download copies were not revised in this follow-up.

Verified all six sheet layouts, blank and populated ring states, zero completion, excess sessions, weekly boundaries, the final reserved entry row, export/import recalculation and native chart colors/references. Excel desktop itself was not run. Edit builder reads the prior snapshots from project-root `tmp/training-log/before-hu.xlsx` and `before-en.xlsx`; these snapshots and QA renders are not public assets.

Earlier website integration notes below are historical and refer to the prior design.

Owner requested a professional, simple downloadable training log with circle diagrams. Root deliverables are `mihaly-bence-training-log-hu.xlsx` and `mihaly-bence-training-log-en.xlsx`. Public copies are `assets/downloads/training-log-hu.xlsx` and `training-log-en.xlsx`.

Each localized workbook has three sheets: four-week overview with 60 completed-session rows, exercise detail with 300 rows, and a fictional worked example excluded from totals. Start date and weekly session goal are blank editable inputs. Four native doughnut charts show completion per consecutive seven-day period. Counts include extra sessions; rings cap at the goal. One session row means one completed session, including separate sessions on the same date. Clients should save an empty-template copy for each new four-week period. No macros, external connections, client records or automatic data submission.

Builder: `tools/build-training-log.mjs`, using bundled Artifact Tool. Requires project-root `tmp/training-log/node_modules` junction to bundled node_modules. Temporary renders and diagnostics stay in root `tmp/training-log/`. A standard OOXML finishing step adds per-slice gold/neutral colors, initial chart caches and automatic recalculation settings because these are absent from the documented authoring surface. Final native charts retain source-cell references. Do not export the populated QA rendering as a client workbook.

Checks: blank inputs, completed counts, two sessions on the same date, weekly cutoff and out-of-period exclusion, over-goal percentage, zero completion, export/import recalculation, formula-error scan and rendered review of all sheets. Exported chart count/colors/source references checked. Excel desktop itself was not run. HU/EN resource cards checked in local browser at its current viewport; no new responsive breakpoint checks claimed. Both downloads return HTTP 200 with XLSX MIME type and match root bytes.

Website: replaced Coming soon with real localized downloads and three-sheet metadata. Existing CSS and resource card appearance retained. Translation inventory IDs appended; localized asset mapping expanded. Public export now permits referenced XLSX assets, keeping private/unreferenced files excluded.

Latest clean export: `../output/V19-public-training-log-final/` (104 files including CNAME/.nojekyll). Local only, not deployed. Earlier training-log export is superseded.
