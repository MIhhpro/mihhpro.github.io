# Macro calculator — V19

Source: owner supplied C:/Users/Ben/Desktop/Macro-Calculator.xlsx on 2026-09-24. Inspected read-only with openpyxl. No workbook editing/export. tools/macro-source-reference.json records the SHA-256 and relevant formulas/values from both sheets. This private source reference is excluded from public export.

## Exact rules

- Kilograms: input weight directly. Pounds: multiply by 0.45359237.
- Maintenance kcal: round(kg × 30 + body offset). Neutral 0, ectomorph +200, endomorph -200.
- Protein g/kg: fat loss 2.2, muscle building 1.6, general fitness 1.2, no movement 1.0.
- Fat: 0.8 g/kg. Carbs: remaining kcal / 4 after protein (4 kcal/g) and fat (9 kcal/g).
- Ratios and percentages use unrounded grams. Calories display as integers, grams and percentages at up to one decimal, per-weight ratios at up to two decimals.
- Invalid or empty weight/unknown selections yield no estimate. Nonpositive calories or calories below protein + fat also yield no result. No negative carbs are displayed.
- Goal changes protein only: NO calorie deficit/surplus is implied. Body types are the owner's custom settings, not measured metabolism. Age, sex and activity are not inputs. An adult-use note and source-limit explanation are present. NIDDK's adult/pregnancy scope guidance was consulted: https://www.niddk.nih.gov/health-information/weight-management/body-weight-planner (not a source for the workbook's custom formula).

## Files and data handling

HTML source is segedletek.html, generated English resources-en.html. New copy uses existing stable translation inventory; dynamic input/status messages live in macro-calculator.js. No web requests, cookies, URL values or booking prefill for calculator data. A one-use same-tab sessionStorage language handoff is now supported; see CALCULATOR_STATE.md. Form submit is prevented and controls start disabled until calculator setup, with a noscript message. Native radios support keyboard selection. A debounced live announcement describes updated results. Browser-restored form values are recalculated on pageshow.

The 80 in the empty weight box is a placeholder, not a saved/example value. Switching kg/lb converts entered weight; internal kilograms remain stable across switches. Same-tab translation navigation preserves inputs, choices and canonical kilograms through the one-use language handoff. Privacy text describes this temporary sessionStorage use. Ordinary navigation is not a save feature.

CSS scoped in macro-calculator.css, scripts in macro-calculator.js. CSS v19.2, JS v19.3, resource pages only; calculator-state.js v19.1 loads before both calculators. Side-by-side controls/results above 1050px; stacked below; body cards become rows below 680px. The bronze/copper/gold palette and Contact controls are preserved. The ring is decorative and all data is also available as text.

Motion added 2026-09-24: initial ring sweep 650ms, later ratio transitions 420ms, interruptible from the current drawn position. Result cards receive a small 4px / 360ms lift with 45ms stagger and warm highlight; selection cards have 180ms colour transitions and fine-pointer hover lift. No repeating animation. Numbers update immediately; existing debounced screen-reader announcements remain. Invalid inputs clear immediately. Reduced motion skips all added movement and a preference change cancels running effects and settles the chart. No dependencies or data-flow changes.

## Verification

Run node tests/macro-calculator.cjs plus Python tests/validate.py and tests/languages.py after changes. The independent expected matrix covers all 12 type/goal combinations at 80 kg and stored kg/lb workbook examples. Browser checked in HU and EN at desktop/tablet/phone sizes, including keyboard, decimal comma and invalid input. These checks verify spreadsheet parity, not clinical accuracy or a personal diet recommendation.

Motion verification: node tests/macro-motion.cjs covers initial sweep, interrupted selections, invalid-input cancellation, reduced motion and a preference change during animation. HU/EN browser checks confirmed intermediate and settled chart stops, immediate correct numbers, and quick selection changes. Existing calculation and structural/language checks pass.

Current export: ../output/V19-public-calculator-language (101 files). No deployment performed. The original spreadsheet is not in this public package.
