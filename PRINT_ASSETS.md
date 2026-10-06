# Client documents and source builders

Updated 2026-09-28. New/revised client deliverables go directly in `C:/Users/Ben/Desktop/Page/`. Keep active source/builders/assets in V20 and document temporary files in root `tmp/`. This documentation task did not regenerate any PDF or image.

## Files actually present in the root

Read-only file/PDF checks on 2026-09-28 confirmed:

| File | Current artifact |
| --- | --- |
| [Hungarian training guide](../mihaly-bence-szemelyi-edzes-tajekoztato-hu.pdf) | Two pages, 417,838 bytes |
| [English training guide](../mihaly-bence-training-guide-en.pdf) | Two pages, 415,458 bytes |
| [Price sheet](../mihaly-bence-prices-a4-hu-en.pdf) | Two A4 pages, 213,154 bytes: bilingual first page, English-only second page |
| [Training rules review PDF](../Mihaly-Bence-Szabalyzat-kiegeszitett.pdf) | Four pages, 93,835 bytes; an egyeztetési változat, not final terms |

Both guide PDFs match their V20 `assets/downloads/training-guide-hu.pdf` / `training-guide-en.pdf` copies byte-for-byte. Read-only page/byte checks do not renew the earlier visual review or imply current legal approval.

## Approved brochure design

Two digital pages, 720 × 1000 points, dark black/gold/copper with circular MB logo and approved portrait. Page one maps consultation → observation/assessment → first four sessions learning SMR/warm-up/movement/cardio basics → ongoing goal-focused work. Page two describes the individual session's four phases. HU/EN journey versions were synchronized in September 18 work.

Use only `mihaly.bence.fitness@gmail.com`, as plain text on page two. No prices, payment/package terms, yellow consultation button, website label/link in either footer or mailto link. This is the owner's screenshot clarification; do not repeat the mistaken removal of the email. English names are first-name-first and the movement/technique language must not promise medical prevention.

Builder: `tools/build-training-brochure.py` (`en` argument for English); `tools/training-brochure-en.json` holds translations. `build-training-guide.py` forwards to it. Requires reportlab/Pillow/pypdf, local source font/portrait and Windows Arial. **Current HU builder outputs root `mihaly-bence-edzes-utmutato.pdf`, while the existing approved root file is named `mihaly-bence-szemelyi-edzes-tajekoztato-hu.pdf`.** Deliberately reconcile output/copy names on the next requested revision; do not silently leave stale approved/public copies. No builder was run during this documentation task.

## Current price-sheet design

Latest approved refinement on September 25: first bilingual A4 page retained, second English-only page added. Personal-training amounts and billing labels are **left-aligned with headings**; remaining amounts share a centered column/row alignment. All six monetary amounts use 24pt Arial Bold with equal-width digits; consultation is free. Footer has one bottom-left business email/mailto, no website label. Old centering-all-prices and website-footer instructions are superseded.

`tools/build-price-sheet.py` produces the current root filename. Preserve both pages and all approved prices in BUSINESS_RULES. The separate `tools/build-duplex-price-sheet.py` is the older single-language HU-front/EN-back variant, not the same artifact. That older root output is not currently present. Historical print direction for that variant: A4 portrait, 100%, long-edge duplex, roughly 7mm white margin; no physical print proof was performed.

## Training rules

`tools/build-training-rules.py` outputs the existing four-page root PDF. [Hungarian owner notes](../Mihaly-Bence-Szabalyzat-valtozasok.md) describe the edits and pending contract issues. Preserve the original supplied Desktop PDF. These are gym operating rules, not a complete online agreement/health consent or legal certification. The later September 28 business decisions have not automatically regenerated this September 20 PDF.

Historical additions include pain-masking safeguards without a medication ban, illness/stop signals, safe equipment/hygiene, respectful conduct, separate recording/publication consent, touch-correction consent and trainer/client responsibilities. Circle labels/MB initials were centered and the four pages visually checked during creation.

## Historical business cards and portraits

Earlier root outputs `Mihaly-Bence-Nevjegy-portreval`, `-portre-nelkul`, `-uj-portreval` (PDF/SVG/PNG), `Mihaly-Bence-Portre-napszemuveg-nelkul-HD.png` and the card readme are **not in the current root inventory**. Do not link them as available deliverables or recreate them without a request. Source assets remain in version folders; original details are recoverable from the documentation archive.

Approved card reference was red/white, a deliberate exception to the website palette. Assumed 90 × 50mm trim with 3mm bleed (96 × 56mm PDF MediaBox); SVG/PNG show trim. Editable vector layout, both flags and approved email retained. No physical print/printer-profile certification.

Latest new-portrait variant used the selected AI-enhanced no-sunglasses portrait (1024 × 1536 RGBA, about 508ppi at card size); do not claim recovered camera detail or 3K/4K. Earlier unaltered-reference portrait and no-portrait variants were separate. Preserve exact layout/text in a requested portrait-only change.

**Builder warning:** V20 `tools/build-business-card.py` still defines `V18 = ROOT / 'V18'`, reads V18 assets and writes a V18 temporary trim PDF; it also contains an old clipboard source path. Before using it, repair paths in V20 to use V20 assets/root tmp and verify available inputs. Do not run it unchanged into the protected V18 snapshot.

## Verification on the next document edit

Read the applicable document/PDF/spreadsheet skill and resolve its runtime. Preserve originals; edit only the requested artifact; render and inspect every changed page; verify dimensions, text, contact links and exclusions. Keep final client files in the root, not tmp. Website copies change only as part of the authorized update, with localized resource links/covers kept aligned. Prepared files are not sent or published automatically.
