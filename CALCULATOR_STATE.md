# Calculator language handoff — 2026-09-25

Owner requested that changing language retain the chart values. HU/EN remain separate static pages; normal same-tab language navigation now transfers the calculator inputs through sessionStorage, then recalculates localized results.

## Scope

calculator-state.js v19.1 loads only on the two resource pages, before macro JS v19.3 and BMI JS v19.2. No change to shared language.js, other pages, contact forms or booking data. Each calculator registers capture/restore adapters; only macro and BMI state is captured. Input values, units, macro body/goal choices and canonical kg/cm are included. Charts/results themselves are recalculated. Exact canonical values prevent unit conversion display rounding from changing a boundary classification; restored canonical values are accepted only when consistent with visible inputs.

## Lifetime and limits

- Writes only on an ordinary same-tab click of the counterpart language link, with exact same origin and sibling page path. Current-language, modified/middle and new-tab clicks are excluded.
- sessionStorage key: mb-calculator-language-handoff-v1. No cookies, localStorage, URL values or network submission. Contact inputs are never read.
- Destination reads and removes the stored record before validating it. Valid only for its exact pathname and within 60 seconds. Wrong-target, oversized, malformed or stale records are discarded.
- The source attempts cleanup after 60 seconds if it remains open. Browser scheduling/tab-restoration behavior can vary; do not promise secure erasure or guaranteed destruction on tab close.
- Cleared and invalid inputs transfer as such, without bringing back old results. Inputs normally start empty when there is no handoff (subject to browser form restoration).
- If sessionStorage is blocked/unavailable, switching languages still works, but values cannot be carried over by this mechanism. Modified/new-tab navigation intentionally does not carry values.
- Existing pageshow recalculation preserves canonical values when the visible input signature has not changed, while still honoring browser-restored changes.

## Verification

tests/calculator-state.cjs covers both calculator payloads, no URL modification, read-once removal, stale/wrong-target/malformed records, source cleanup, current-language and modified clicks, and blocked storage. Existing macro formula/motion, BMI, bilingual behavior, structure and language checks pass.

Browser checked HU -> EN -> HU with macro 80.5kg, ectomorph, loss and lb display (2615 kcal retained), and BMI 81kg/180cm converted to imperial (exact BMI 25/category retained). Cleared BMI height remained empty after language change while macro results survived. Input units/selections restored and links contained only the existing section anchor.

Visible calculator notices and generated HU/EN privacy pages/downloads describe the temporary handoff. Current clean export: ../output/V19-public-calculator-language/ (101 files). Not deployed.
