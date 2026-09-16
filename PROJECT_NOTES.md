# V16 project notes

## Version and scope

2026-09-12 owner confirmation: Calendly design/field contrast is fixed; booking already works. Updated the active notes to close this issue. No widget/account changes or independent Calendly verification were made in this documentation-only turn. English custom event copy/notifications remain a separate check. V15 is the last confirmed published version; V16 remains the active working folder, with privacy drafts and motion refinements prepared locally.

2026-09-12 motion refinement: reviewed the owner's five UI references and adapted brief reveals, FAQ expansion, gold-button sheen and gentler card/menu/gallery feedback to native site code. No new media, framework or external script. Read MOTION_NOTES.md for details and verification; `styles.css` and `script.js` are revision `16.1` on every page. Site content, photos, prices, languages and palette remain as approved.

2026-09-12: created Hungarian/English privacy review pages and footer/contact links in V16. Owner uses Google Meet and Messenger/WhatsApp/Telegram/Viber/Signal. He does not intentionally download client media or keep a separate archive; app storage/deletion and own retention deadlines still need confirmation. Read PRIVACY_REVIEW before changing the notice. Google Business/listing/search-promotion tasks were declined; preserve the gym map link. GitHub Pages restrictions cover facilitating commercial transactions, so off-site payment is not an automatic exemption. No deployment or external account changes were made.

The logo is now circular: transparent outside the gold ring, black inside, with the MB letters preserved. `tools/build-brand.py` generates this shape in the 1024px PNG, 32px PNG, Apple icon and ICO sizes; do not restore the opaque square background.

2026-09-08: centered the expanded page menu and desktop link group; the language selector now uses a UK flag and an animated shared gold highlight, with native modified-click links, reduced-motion support and Back restoration. Added black/gold MB logo and favicon assets plus HU/EN 404 recovery pages. Full-section gold focus outlines were a plausible source of the owner's intermittent boundary line: removed them only from programmatically focused main sections, preserving focus on interactive controls. The reported intermittent desktop artefact was not reproduced in a browser; request a screenshot of the line if it persists. Source checks and simulated navigation tests do not replace real-device appearance checks.

Active working folder: `V16/`. Created on 2026-09-08 from the latest V15 site, including the circular logo, language slider and 404 pages. V15 is preserved as the previous snapshot. Earlier dated updates below describe inherited work. Start with [HANDOFF.md](HANDOFF.md) and [README.md](README.md). No publication or external account changes were made when creating V16.

Owner preferences: natural Hungarian copy grounded in real experience; bronze/copper/gold/black styling; no blog. Use approved existing photos and retain the three intentional gallery placeholders for later photography. Keep Sikerek accessible in the header.

## Current service routes

Language update (2026-09-07): eight English counterparts plus the existing English terms draft. All eighteen headers have HU/EN flags; English navigation stays in English. Switching preserves the section and service/package choices. Contact hints, email drafts, booking prefill labels, gallery labels and copy feedback follow the document language. English names use first name then surname; Hungarian keeps surname then first name. Prices remain in HUF. See README for translation sources and regeneration. No live publication or Calendly account changes were made.

- Introductory consultation: Calendly event configured as `consult`.
- Personal training: Calendly event configured as `pt`.
- Online coaching: Calendly event configured as `online`.
- Training Program: prepared email inquiry, service key `program`; no separate calendar event required.
- Other questions: prepared email route; no calendar is shown.

The owner has reinstated a standalone Training Program as a personalized 4-week product. It is distinct from the three monthly online-coaching packages.

## Verified professional facts

- Training history began in September 2017; current public wording states nine years of training as of 2026.
- Completed IWI Fitness Instruktor, IWI Személyi Edző, and IWI MES Trainer qualifications.
- Do not describe the nine years as nine years of professional coaching experience.
- In-person training location: Victory Fitness Békásmegyer, 1039 Budapest, Hatvany Lajos utca 10. (District III).

## Current public prices

- Introductory consultation: free.
- Personal training: 11,000 Ft per session.
- Ten-session package: 100,000 Ft.
- Training Program: 19,900 Ft once for a personalized 4-week program, exercise selection, sets/reps/RIR, progression and substitutions.
- Online Coaching – Basic: 29,900 Ft/month. Program + 1 coaching call/week + program adjustments.
- Online Coaching – Plus: 39,900 Ft/month. Program + 2 coaching calls/week + program adjustments.
- Online Coaching – Premium: 49,900 Ft/month. Program + 2 coaching calls/week + unlimited messaging + video/form checks + ongoing adjustments.
- All coaching packages include the program contents described above. Call duration and response-time guarantees have not been specified; do not invent them.

## Important configuration

- Calendly links and the inquiry email live in `site-config.js`.
- Live calendar account: `https://calendly.com/mihaly-bence-fitness/`. Consultation uses `konzultacio`, personal training uses `30min`, online coaching uses `online-coaching`.
- Client-management email: `mihaly.bence.fitness@gmail.com`, supplied by the owner. Updated in the configuration, copy button, email links, Gmail compose route, no-JavaScript fallback and calendar fallback.
- The public site stays static and GitHub Pages compatible; Calendly manages bookings.

## Contact flow

1. The visitor enters their name, email, optional phone number, service, and optional message (maximum 1,500 characters).
2. All three live Calendly events were inspected on 2026-09-05. They collect full name, email and one free-text preparation question. Name/email are prefilled through the initial booking URL as well as the widget object; full and split names are included for compatibility with either name-field setting. The selected service/package, price, optional phone and message are combined into `a1`. Do not use the former three-question mapping. Online package links use `service=online&package=basic|plus|premium` and preserve the choice in the selector and booking notes. See `CALENDLY_SETUP.md` for the URL-encoding requirement and the deferred-message bug this avoids.
3. Training Program (`service=program`) and other questions offer a prefilled Gmail compose window and a provider-neutral copy-to-clipboard fallback containing the service, contact details and message. Nothing is sent by the site.
4. The widget loads on demand with a bounded wait and retry. A separate-window Calendly link preserves the same prefilled details. Email remains available if configuration or loading fails. Editing the form cancels pending handoffs and clears the previous widget. Booking confirmation accepts only a scheduling event from the currently displayed Calendly iframe.

## Visual direction

Continue the bronze, copper, gold and black visual direction requested by the owner. Use condensed display headings, restrained rounded cards, and thin warm borders. Preserve existing photographs; replacement photography is a later task. Avoid bright white surfaces and generic dashboard styling.

The V16 services and personal-training heroes use distinct editorial layouts within the same visual system. The homepage profile card uses restrained pointer depth rather than an exaggerated tilt. Keep future motion subtle and respect reduced-motion preferences.

The contact profile uses `assets/professional.png` in a compact portrait beside the name and credentials. At the owner's request, the large landscape crop, overlaid text and hover zoom were replaced with this quieter identity block. The source photograph is unchanged.

The contact page's direct email links open an addressed Gmail draft in a new tab, avoiding reliance on a configured desktop mail handler. A separate copy-address button and visible selectable address support other mail apps. Clipboard failure shows an explicit manual-copy fallback and restores keyboard focus.

## September 2026 experience update

- Added `online-coaching.html`: suitability, collaboration process, starting price, service-specific contact route and FAQ.
- Added `elso-alkalom.html`: consultation versus first training session, preparation, confirmed location, map link and practical questions.
- Rewrote all seven existing pages with a more personal Hungarian voice, grounded in Bence's supplied pull-up story and professional facts.
- Removed the public placeholder testimonials and client case studies. The success page now explains personal milestones and retains Bence's existing personal training material. Keep genuine client stories for a later update with consent.
- Removed empty gallery entries while preserving the three supplied life photographs and their personal captions. No image assets were changed.
- Unified prices and published the owner-approved online packages and weekly call frequencies above. Unconfirmed session length, gym-entry inclusion, response times, and other contract terms remain to be agreed before starting.
- Header: home, services, personal training, online coaching, about, successes (Sikerek), contact. Sikerek is a primary navigation item on every page and appears beside About in the mobile menu. A homepage feature below the visitor starting-point cards links directly to the progress and personal milestones page. First visit and the About gallery remain accessible in the mobile menu and footer.
- Added skip navigation, visible keyboard focus, mobile-menu focus handling, accessible FAQs, reduced-motion handling and gallery-dialog focus restoration.
- Static HTML/CSS/JavaScript architecture and GitHub Pages compatibility remain unchanged. This is the local V16 working version; no hosting configuration or external booking settings were changed.

## About gallery consolidation

- Moved the three existing personal photographs and their full captions to `about.html#galeria`, after the personal story. The existing keyboard-accessible photo viewer is reused.
- Added four photo spaces at the owner's request. The tall portrait now uses the owner-approved `assets/shirtless.png` with a personal-training caption and the existing accessible photo viewer. Three spaces remain intentionally empty: landscape training, movement and coaching-session shots.
- Suggested image names, proportions and replacement instructions are documented next to each frame in `about.html`. Place a real image directly inside the frame with meaningful alt text; the frame supports an image overlay and caption. Add `gallery-item` and `data-note` if the new photograph should also open in the viewer.
- Removed the separate `life.html` page. All previous mobile-menu and footer links now lead to `about.html#galeria` with the label Galéria.
- Main navigation remains compact. The About hero has local links to the story, gallery and qualifications.

## Latest fixes and section navigation

- Bilingual terms added as `aszf.html` / `terms.html`, with footer links on all ten pages, language switching, section navigation, print/PDF support and text downloads. They are explicitly review drafts and request no indexing. See [LEGAL_REVIEW.md](LEGAL_REVIEW.md) before changing them: the registration number/phone, refund amount and timely-cancellation choice are awaiting owner answers, and the electronic withdrawal workflow and privacy notice remain separate completion items. Source is `tools/terms-content.json`; rebuild using `tools/build-terms.py` rather than editing one translation in isolation.
- Provider facts supplied by owner: Mihály Bence Egyéni Vállalkozó, 2370 Dabas, Toldi Miklós utca 46.; supplied tax-number-shaped identifier `91565958-1-33`; GitHub hosting. Payments/invoices/receipts handled personally outside the site. Paid gym contracts signed by hand before training; online coaching agreed remotely. Strong confidentiality, 24-hour replies with refund eligibility, and less-than-24-hour cancellation rule, subject to mandatory consumer rights. Do not invent the late-reply refund amount. Do not promise disclosure is possible only under a search warrant. Details, assumptions and primary sources are in LEGAL_REVIEW.md.
- Historical owner status (2026-09-05): domain connected, site online and booking checks working. The field-colour issue was parked then and subsequently confirmed fixed on 2026-09-12. Remaining content/legal material and sharing previews are separate follow-ups; the public URL and hosting update workflow have not been supplied.
- iPhone Brave screenshot fix: all five gradient-text selectors now use solid pale gold on screens up to 1180px and on touch-first devices. Includes hero emphasis, story years and milestone numbers. Unsupported text-clipping and forced-colour modes also have readable fallbacks. Desktop gradients are retained. The hamburger uses foreground-coloured borders instead of background-filled bars. `only dark` declares the existing theme in CSS and all eight page heads; this is a standards-based hint, not a guarantee against browser extensions/night-mode rewriting. Stylesheet URLs use `?v=15.1` so returning visitors fetch the updated styles after uploading the HTML and CSS together.
- The screenshot is consistent with automatic night-mode recolouring; the owner confirmed Brave but did not confirm Night Mode. Do not claim the exact cause or an on-device fix has been verified. Sources: [Brave's theme/Night Mode guidance](https://support.brave.app/hc/en-us/articles/41689527541389-How-do-I-change-the-browser-theme-in-Brave-iOS), [CSS colour-scheme specification](https://www.w3.org/TR/css-color-adjust-1/#color-scheme-prop). Recheck on that iPhone after the updated public files are uploaded.
- Shirtless gallery caption now begins: “Egy pillanat a saját edzéseimből.” The rest of the caption is retained.

- Device/performance pass: added `responsive.css` after the existing styles on all eight pages. Covers touch targets, small-screen typography and spacing, buttons that wrap, portrait/landscape layouts, safe-area insets, keyboard-focused forms and 320px-wide Calendly space. Original palette is preserved. The floating scroll-to-top button is inert behind open menus/dialogs and is below their layers.
- Six original PNGs now have 24 WebP delivery copies in `assets/responsive/`. Largest copies total 842,138 bytes versus 12,882,180 original bytes (93.5% reduction). Original PNG files are unchanged. Pages use `srcset`/`sizes`; below-fold images are lazy and hero photos prioritized. Gallery cloning removes thumbnail size hints and loads `data-full-src` for the large view.
- Calendly auto-height now uses the site's single origin/source-checked message handler and validates the reported height. SDK `resize` is false to avoid accumulating listeners or unsolicited scroll calls when rebuilding the widget. Prefill and the black/gold theme are unchanged.
- See [PUBLISHING_CHECKLIST.md](PUBLISHING_CHECKLIST.md) for remaining work. The owner has connected the domain and confirmed bookings work. Do not describe code checks as verification on every physical device; the reported iPhone Brave issue needs an on-device recheck after upload.

- Historical Calendly theme correction: the owner rejected the bronze/beige whole-widget workaround and requested the original colours. Restored black `100f0c`, cream text `f5f0e8` and gold `d4a843` for inline/fallback booking, preserving prefill. The field-contrast problem was unresolved at that stage; the owner confirmed it fixed on 2026-09-12. Preserve the current design. See `CALENDLY_SETUP.md` for verification limits and the distinction between current status and historical investigation.

- V16 typography/detail pass: removed the requested email-route helper sentence and hide its empty paragraph for Training Program and general questions; restore the relevant hint when switching back to booking or no selection.
- All visible forint amounts use nonbreaking spaces. Inline `span.price-amount` keeps the amount, currency and suffix together, inheriting the surrounding font/colour so price-card captions cannot shrink the number. Native select options use nonbreaking spaces without nested markup. Preserve this formatting when changing prices.
- Heading anchors have the same fixed-header clearance as sections. Form inputs/selects use 1rem text to avoid the small-input zoom trigger on phones. The online hero price row can wrap the billing period separately on narrow screens.
- Images now declare their source dimensions to reserve space during loading. The contact calendar scrolls into view once on submission rather than pulling the visitor back after the external script finishes loading. Failure paths still reveal the error/fallback.

- Gallery lightbox image sizing uses `object-fit: contain` on the cloned image itself. Narrow layouts scroll the panel to keep both the complete photograph and caption reachable. Pricing introductions nested in section headings have positive spacing after the heading.
- Contact portrait: compact image alongside the name and credentials, with no overlaid caption or hover zoom. Contact email links open addressed Gmail drafts; copying is a separate action with clear feedback.

- Every page has a native section index inside `main`, enhanced by `section-nav.js` and `section-nav.css`. Wide screens (at least 1480px wide and 600px tall) show a copper/gold side rail; smaller screens use an expandable “Oldal tartalma” control. The active marker follows reading position, and hidden contact-flow sections enter the index only when available. Native anchors preserve URL/history, keyboard focus and reduced-motion scrolling. Without JavaScript the index remains in normal page flow. Placement inside `main` shares the existing mobile-menu and gallery-dialog inert handling.
## Validation

- `tests/calendly-prefill.cjs <path-to-downloaded-widget.js>`: optional integration check using Calendly's actual public widget. Verifies the generated iframe URL contains full/split names, email and notes for all three services without relying on iframe-load messages. Passed against the widget downloaded on 2026-09-05; no live booking was made.

- `tests/email-copy.cjs`: successful copying, denied clipboard permission, unavailable legacy clipboard, user feedback, temporary-field cleanup and keyboard focus.
- `tests/section-nav.cjs`: scroll tracking, conditional sections, keyboard focus, compact disclosure and focus across responsive changes.

- `tests/validate.py`: eight pages; element nesting, local files, anchors, ARIA references, labels, metadata and content checks. Requires Python with lxml.
- `tests/contact-flow.cjs`: isolated script tests for all three calendar routes, email preparation, clipboard content, optional message handling, service switching, form validation, unavailable calendar, scheduling confirmation and mobile-menu keyboard focus. Runs with Node.js; sends no requests.
- The contact checks also cover route-hint visibility when switching services and prevent a second scroll after successful calendar loading. All automated checks passed after the V16 typography/detail pass; browser appearance has not been reverified.
- JavaScript syntax checked with Node.js.
- The public booking flows for all three new events were inspected up to the invitee-details form, without submitting. Verified current duration/location: consultation 20 minutes at Hatvany Lajos u. 10; personal training 1 hour at the same address (despite the `30min` URL); online coaching 1 hour, conferencing details after confirmation. The configured dark/gold colours were visually confirmed on the public Calendly page.
- No real appointments booked or emails sent. Complete live booking confirmation, email-delivery and site-level responsive checks before publication.
