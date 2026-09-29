# Local font provenance

V20 documentation consolidated 2026-09-28; fonts vendored on **2026-09-22** from Google's official Fonts stylesheet endpoint and fonts.gstatic.com. This note is internal; binaries/licences are public assets.

- Families: Inter variable 100–900 and Barlow Condensed 500/600/700/800/900.
- Latin and Latin Extended subsets preserve Hungarian accents (including ő/ű) and English; other scripts use the visitor's system fallback.
- [manifest.json](manifest.json) records exact source URLs and sizes. Keep the unmodified SIL licences: [Inter](inter-OFL.txt), [Barlow Condensed](barlowcondensed-OFL.txt).
- [fonts.css](../../fonts.css) owns local declarations and `font-display: swap`; two common Latin files are preloaded. Only needed subsets/weights download.
- Current website source does not request Google Fonts. This does not remove other Google services from the actual workflow.

Future font updates must preserve accent coverage, public licence distribution and bilingual typography. Current cache references/build workflow are in [README](../../README.md). No font binaries were changed during documentation reconstruction.
