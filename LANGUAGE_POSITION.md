# Reading position across languages — 2026-09-25

Owner request: switching language should preserve the place being read, not send the visitor back up the page. Shared language.js previously copied only the URL fragment; manual scrolling never updated that fragment.

## Implementation

- language-position.js v19.1 is injected before language.js by tools/build-languages.py's shared decorator, including privacy and 404 builders. strip_language_ui removes both scripts before regeneration to avoid duplicates. Existing slider and service/package query handling are unchanged.
- On an ordinary same-tab counterpart click, records the visible content landmark nearest the reading line below the sticky header, its offset, a proportional offset for long blocks, and top/bottom fallback. The link fragment also changes to the current section for storage-blocked fallback.
- Exact target pathname and 60-second validity; one-use sessionStorage key mb-language-position-v1, removed before restoration. Only layout identifiers/measurements are captured, not form values. The existing calculator-state.js handoff remains independent.
- Restores after pageshow and two animation frames, with a bounded font-ready correction. Uses instant scrolling to override normal smooth anchors. Wheel, touch, pointer or keyboard input cancels pending correction; old handoffs do not replay on back/forward navigation. No persistent scroll tracking or storage on ordinary scrolling.
- Same-language and modified/new-tab clicks retain normal behavior. If storage is blocked, the visible section anchor still works. Missing/hidden target landmarks fall back to the saved page offset. Very different layouts can only approximately preserve positions inside long text blocks.
- Privacy source and generated HU/EN pages/downloads describe the temporary layout record.

## Verification

node tests/language-position.cjs covers a stale macro hash while reading BMI, changed translated layout offsets, top/bottom, proportional long sections, one-use removal, user interruption, expiry, malformed state and blocked storage. Existing calculator handoff, language/booking behavior, section navigation and structural/language checks pass.

Browser: desktop EN -> HU BMI result heading retained exactly 95.08px viewport offset; 390px HU -> EN retained 116.09px -> 115.78px while absolute scroll changed to accommodate translated content. BMI 24.7 remained populated. Browser locator clicks on sticky links auto-scrolled the source in this preview, so final verification used screenshot-grounded pointer clicks like an actual visitor. Do not mistake that test-driver scroll for a restoration error.

Latest clean export: ../output/V19-public-language-position/ (102 files). Not deployed.
