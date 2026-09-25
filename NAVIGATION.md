# Shared navigation — V19

## Simplified navigation — 2026-09-25 (current)

Owner refinement supersedes the six-group navigation below. Seven top-level items, in order: Home, Personal training, Online coaching, Services (dropdown), About (dropdown), Free resources (single link), Contact (last). Services now holds overview/prices, comparison and first visit; About retains story, gallery and results. Removed resource sublinks and legal/Information menus from desktop AND mobile. Terms/privacy remain in the footer. Direct training/coaching links appear immediately after Home; mobile shrinks from 17 to 11 links.

Updated canonical map and navigation tests. Structure, language and navigation checks pass on all 24 pages. English 1200px desktop and 390px mobile visually checked, no header/menu overflow; all language counterparts verified statically. No new CSS/JS change. Latest local export: ../output/V19-public-direct-navigation/; not deployed.

Updated 2026-09-25 at the owner's request. Preserve the logo, name, language switch and dark metal palette. The center has six top-level choices (maximum requested: seven): Home, Services, About, Free resources, Contact, Information.

All 11 public content pages in each language are reachable. Services contains prices, personal training, online coaching, comparison and first visit. About contains story/qualifications, gallery and results. Resources contains its overview, macro/BMI calculators, PDF guide and Google Sheets training log. Information contains terms and privacy. Resource shortcuts land on the local resource card so visitors can read context before opening an external/download asset. Error pages retain full navigation but are not promoted as content; internal tests and notes are never linked.

## Maintenance

- Edit `tools/site_navigation.py` for routes, group membership and HU/EN labels. `tools/build-languages.py` applies this map through its shared decorator, including legal and 404 builders. Do not edit each page's navigation independently.
- Add new Hungarian labels to `tools/translation-inventory.json` and their English equivalents to `tools/english-translations.json`; the next language rebuild also reads previously generated navigation text.
- Run `tools/build-languages.py`, `tests/validate.py`, `tests/languages.py`, and `tests/navigation.py`. The latter checks all destinations, six top-level items, current-page markers, and shared assets on 24 pages.
- Styling/behavior: `navigation.css?v=19.1`, `navigation.js?v=19.1`. No framework or remote dependency. Shared script remains 19.6 and styles remains 19.9.

## Interaction and verification

Desktop uses native details/summary disclosures, activated by click, touch, Enter/Space; links use normal Tab navigation. ArrowDown enters the first link. Escape closes the dropdown and returns focus to its summary. Other open groups close when switching, leaving focus, clicking outside, selecting a link or crossing the mobile breakpoint. Native disclosure navigation still works without this enhancement script.

At 1180px and below, the existing hamburger shows grouped, fully expanded links in a scrollable menu. This keeps the established link-only focus cycle and Escape behavior. No nested mobile accordions. Current pages and desktop parent groups are highlighted. Header CTA and language behavior are preserved.

Verified locally at 1440px/1200px desktop, 768px tablet and 390px phone in HU/EN. No header/page overflow; checked dropdown exclusivity, outside dismissal, ArrowDown/Escape focus, mobile Shift+Tab to close control, and training-log navigation/automatic menu closing. Existing contact-flow and language JS tests also pass. No messages, bookings or deployment performed.

Latest upload-ready export: `../output/V19-public-navigation/` — 108 files including CNAME/.nojekyll, 4,810,120 bytes. Source/internal notes are excluded.
