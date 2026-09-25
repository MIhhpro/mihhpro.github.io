# BMI calculator — V19

Added at the owner's request on 2026-09-25, directly after the macro calculator and before downloads. Hungarian source: segedletek.html#bmi; generated English: resources-en.html#bmi. Included in section navigation; main navigation unchanged. BMI is now implemented, superseding earlier notes saying it was undecided.

## Implementation

- Dedicated bmi-calculator.js v19.2 / CSS v19.1; resource pages only. Reuses macro card styles without changing macro calculations or inputs.
- BMI = kg / (cm / 100)². Imperial option uses pounds and total inches, with 0.45359237 kg/lb and 2.54 cm/in. Switching units converts entered values while preserving internal metric values until edited. Decimal comma and point accepted.
- Positive finite measurements required. Empty, invalid or nonfinite results clear the estimate, marker and selected category. Values start empty; 80/180 are placeholders.
- General adult categories: below 18.5; 18.5 to below 25; 25 to below 30; 30 or above. Classification uses the unrounded result; display rounds to one decimal with an explicit explanation for values near a boundary.
- The decorative scale covers BMI 10–40. Values outside it retain their numeric result and category; the marker clamps to the nearest edge with explanatory status text. No target weight, diet prescription or fitness rating is generated.
- A 500ms marker transition respects reduced motion. Native radio keyboard behavior, field labels, invalid states and a 350ms debounced live result announcement are included. Result categories are also available as text; selected range has aria-current.
- Shared 1050px panel breakpoint; measurement fields stack at 680px and unit cards at 380px. Long Hungarian category labels wrap within narrow cards.
- No network requests, cookies, URL data or booking prefill for measurements/results. Same-tab language switching now uses a one-use sessionStorage handoff, including canonical measurements to prevent conversion rounding at category boundaries. See CALCULATOR_STATE.md. No input sharing with the macro tool. Browser form restoration is recalculated on pageshow. Privacy source and generated HU/EN pages/downloads now include BMI and height in the existing browser-only disclosure.

## Scope and sources checked 2026-09-25

General guidance for adults 18+, not during pregnancy. Visible muscle/fat limitation; expandable guidance covers under-18 assessment, eating disorders, conditions affecting height and ethnicity-related risk thresholds. No diagnosis or individual risk assessment.

- NHS adult calculator: https://www.nhs.uk/health-assessment-tools/calculate-your-body-mass-index/calculate-bmi-for-adults (formula, worked example, adult scope and limitations).
- NHS adult overweight/obesity guidance: https://www.nhs.uk/conditions/overweight-and-obesity/ (general 25/30 boundaries, ethnicity and muscular-build caveats).
- CDC general adult categories: https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html (category thresholds; CDC's own tool uses 20+, while this page follows NHS's 18+ scope).

## Verification and release

node tests/bmi-calculator.cjs checks the NHS 70kg/170cm example, metric/imperial equivalence, category boundaries before rounding, scale limits and invalid inputs. Existing macro calculation/motion tests and page/language checks also pass.

Local browser verified HU desktop, EN phone 390px, HU narrow phone 320px and tablet 768px: correct results, unit conversion, comma decimals, invalid-input clearing, no page overflow and independent macro controls. Reduced-motion behavior is implemented in CSS. Not a real-device certification.

Latest clean public export: ../output/V19-public-calculator-language/. Not deployed. Source spreadsheet, internal Markdown, tests and tools remain excluded. The one-off .review/add-bmi.py migration has already run; do not rerun it. Future text changes go in HU source and stable translation dictionaries, followed by tools/build-languages.py.
