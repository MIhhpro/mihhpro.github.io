# Cal.com setup — V19

## Desktop booking panel — 2026-09-23 (latest)

Desktop (>1050px) now uses a wider 330–380px service panel with five large native radio cards, a gold selected state and visible keyboard focus. The booking workspace can grow to 1360px, keeping the calendar spacious. Cards use the existing translated select options and route handler; mobile retains its compact select. Selection and keyboard focus stay synchronized across breakpoints. Automatic calendar loading, enquiries, package choices, prices and privacy behavior are unchanged. CSS/script revision: 19.4.

Verified: desktop card selection opens the online calendar; selection/focus survives switching to 390px; 1440px layout has no horizontal overflow. Booking and language JavaScript checks, 22-page structural validation and ten language-pair checks pass. Latest public export: `../output/V19-public-desktop-booking/` (90 files, 3,711,362 bytes). Earlier exports are superseded. Not deployed.


## Immediate calendar — 2026-09-23

Supersedes the earlier time-first implementation below. The owner requested fewer steps: Contact now automatically loads the free-consultation calendar (or the valid linked appointment service). A compact service/package selector sits beside the calendar above 1050px and directly above it on smaller screens. Changes refresh the calendar without a submit button, scroll jump or focus transfer. Only enquiry routes show the name/email form and submit action. Failed calendars have Reload calendar and direct-link options; stale asynchronous responses cannot restore an abandoned service. Name/email/phone are still entered in Cal after slot selection. No PII is copied from an enquiry into Cal.

HU/EN privacy pages/downloads now disclose the automatic connection on Contact; other pages and initial direct enquiry routes do not load Cal. Earlier no-third-party-before-interaction measurements apply to the earlier build only. The header is shorter and booking/guardian/privacy information remains in an expandable panel. Native event details and dark/gold theme remain. CSS/script cache version: 19.3.

Verified locally: automatic consultation rendering, personal-training service switching and English online Plus route; aligned desktop panels at 1440px; no page overflow at 390px; email routing, retry/timeout/stale-load tests, 22-page structure and ten language pairs pass. No real booking, message, provider-account change or publication. Latest clean upload folder: `../output/V19-public-instant-booking/` (90 files, 3,707,547 bytes); previous exports are superseded.


## Earlier time-first booking — 2026-09-23 (superseded)

The owner requested availability before contact details. HU/EN Contact now starts with a compact service/package selector and an explicit Choose a time action. Name, email, phone and message are hidden and disabled for configured calendar routes; Cal asks for its contact details after a slot is selected. Only service/package notes are sent by the website to Cal, including the direct-link fallback. Details from an abandoned email enquiry are never prefilled into Cal. Training Program, other questions and missing-calendar routes retain required contact fields and local email drafts. Calendar loading is still explicit, not automatic on page load. Prices, theme, guardian-email route and native confirmation remain unchanged.

The contact profile is below booking, the mobile step guide is compact, and the HU/EN privacy pages/downloads describe the new transfer timing. CSS/script cache revision is 19.1. Local browser: consultation calendar rendered without personal details; selecting a slot showed native name/email/phone fields, with no confirmation submitted. HU 390px and EN 1440px checks showed no horizontal overflow; English Plus package and switching to email enquiry verified. Five JavaScript suites, 22-page validation and ten language-pair checks passed. No booking, message, account change or deployment occurred. This is a usability change, not evidence of a doubled conversion rate.

Fresh public export: `../output/V19-public-time-first/` (90 files, 3,703,429 bytes). Earlier `V19-public/` export is superseded. Internal Markdown remains excluded. Historical prefill/load-failure descriptions below are superseded by this entry.


## Active working copy — V19

Selected by the owner on 2026-09-22 after the V18 loading/privacy review. All new website changes belong in V19; V18 and older versions are snapshots. The copied V18 history below is context, not an instruction to return to that folder. Local V19 changes are not deployed. See [HANDOFF.md](HANDOFF.md), [NEXT_STEPS.md](NEXT_STEPS.md) and [AUDIT_2026-09-22.md](AUDIT_2026-09-22.md). Preview: http://127.0.0.1:8190/.

## Review checkpoint — 2026-09-22

This V18 review is complete and is the source for the requested V19 working copy. The owner confirms the Cal.com booking and dark canvas work. Local fonts and stable navigation startup are implemented; HU/EN privacy and terms draft 9/downloads are synchronized. All 19 privacy intake questions remain complete. [AUDIT_2026-09-22.md](AUDIT_2026-09-22.md) is the current measurement, source and outstanding-work record; it supersedes earlier remote-font and pending-calendar-render statements. Other dated entries below remain historical.

Priority publication cleanup: live HANDOFF.md and PRIVACY_QUESTIONS.md were verified publicly readable. Remove internal notes from the publishing output/source, keep local working notes, and verify public URLs return 404. No deployment or external deletion was performed. Legal documents remain review drafts; successful page/booking checks do not establish legal approval.

## Booking canvas correction — 2026-09-22 (local)

Owner now confirms the Cal.com embed works and supplied a screenshot of the rendered personal-training calendar. This supersedes the earlier unresolved-loading report for the owner's tested browser; the specific browser was not named. A white canvas remained around the dark card and Cal.com footer.

Added `styles.body.background: "#100f0c"` to the existing Cal UI call, targeting the provider document rather than changing card/input colours or cropping the iframe. Cal's source still applies this explicit body override separately from theme variables, although the general styles API is deprecated; retain the narrow compatibility override until there is an equivalent supported outer-canvas variable. Source: https://raw.githubusercontent.com/calcom/cal.diy/main/packages/embeds/embed-core/src/embed-iframe.ts (ui handler). Both languages use the same script. Script cache revision is 18.5; styles remain 18.4 and configuration 18.3.

Contact-flow, 22-page structural and 10 language-pair checks pass. Visual confirmation of this background correction is still needed in the owner's working browser; prior in-app preview loading limitations remain. No deployment or real booking performed.

## Preview failure follow-up — 2026-09-22 (local)

The owner explicitly confirmed that the timeout screenshot was taken **inside Codex’s preview**, not a separate browser. All reported failures so far are therefore in the same in-app environment; there is still no regular-browser result. The official unmodified SDK snippet, plain Cal embed and plain public Cal page also stayed blank in isolated iframes there. A same-origin control iframe loaded and sent its message. Direct Cal pages load; an HTTP GET of the embed returned actual booking HTML (200, no CSP/X-Frame-Options restriction). This does not establish the exact cause or prove the embed works for visitors. Do not call the iframe fixed.

The HU/EN timeout copy now distinguishes the embedded calendar from direct booking, with a prominent gold Cal.com button inside the booking panel. It retains the existing selected-event/name/email/notes prefill and is available during loading, success and failure. Email remains an alternative. No production JavaScript/integration behavior was changed in this follow-up. Styles revision is 18.4; script/config remain 18.3. Earlier 18.2 stylesheet references in dated notes are historical.

Checked locally: the updated Hungarian fallback and correct prefilled consultation URL in the browser; contact-flow tests, 22-page validation and 10 language-pair checks pass. Next necessary check: open http://127.0.0.1:8180/contact.html?service=consult in a separate regular browser, submit fictional details, and check whether the calendar renders. No real booking, account change or publication performed. Temporary diagnostic HTML was moved out of V18 into the private workspace .review folder.

Updated 2026-09-22. Owner supplied the three Cal.com event links; all are connected locally. This migration is local and has not been published. Previous Calendly confirmations do not verify Cal.com.

## Cal.com links connected — 2026-09-22 (local)

The owner supplied all three links, now configured in `site-config.js`: consultation `/bence-mihaly-gjfcyz/konz`, personal training `/bence-mihaly-gjfcyz/edzes`, online coaching `/bence-mihaly-gjfcyz/online`, all on `https://cal.com`. All appointment routes now attempt the inline calendar; standalone programme/other questions still prepare email. The temporary email-only privacy text was removed in HU/EN and downloads. Missing-link and unavailable-calendar fallbacks remain. A failed/slow calendar hides the empty SDK loader, shows fallback options, and restores the iframe if a late ready event arrives. Script/config cache revision is `18.3`; CSS remains `18.2`.

Public-event checks: consultation 20 minutes, personal training one hour, both at Budapest, Hatvany Lajos utca 10; online coaching one hour on Google Meet. Europe/Budapest timezone was displayed. Consultation direct-link prefill visually preserved the fictional accented name, plus-addressed email and notes, with readable dark inputs. Online form also exposes the standard name/email/Additional notes fields. No Confirm button was pressed; no booking, notification, payment, cancellation or account change was performed.

**Outstanding verification:** the inline calendar remained hidden/loading in the in-app browser. The same happened with Cal.com's unmodified official snippet and a plain iframe on an isolated local page, while the provider pages loaded directly. This narrows the issue but does not prove a browser-only cause. Native inline styling, resizing and HU/EN language behavior still require verification in the owner's normal browser; an asynchronous check was requested. Direct fallback works. A read-only HTTP header check of the public embed endpoint returned 200 with no Content-Security-Policy or X-Frame-Options header; no account restriction was identified by that limited check. Do not describe the inline calendar as verified or publish without checking this. Account email, provider arrangements, calendar sync and guardian booking handling remain separate setup follow-ups. See CAL_SETUP.md. No deployment.

## Current behavior

- `site-config.js` exposes `calEvents.consult`, `.pt`, `.online`, now mapped to the owner-supplied links below. Empty, malformed or non-Cal.com links route to a local email draft/copy flow. No calendar SDK, stylesheet, iframe or form data is sent to a calendar provider in that state. The Gmail action sends draft data to Google only when clicked; the website never sends an email itself.
- Once a valid public `https://cal.com/<username>/<event>` or `/team/<team>/<event>` URL is present, a valid form submission lazily loads the official `https://app.cal.com/embed/embed.js` SDK. No API key is needed or belongs in public files. Query/hash parts of configured links are discarded; deliberate event options need a separate implementation review.
- `script.js` passes `config.name`, `email`, `notes` (service/package, optional phone, message), plus `attendeePhoneNumber` when supplied. HU names use surname first; EN names use given name first. Standard full-name and notes questions were inspected on the consultation and online event pages; consultation direct prefill was visually verified. Split names or custom question identifiers may need adapting.
- The inline embed and external link receive the same prefill. No visitor details are added to this site's address bar or browser storage. External prefill URLs can appear in provider requests/history; avoid logging/sharing them.
- `Cal("ui")` uses the native dark theme and supported gold/black CSS variables. Parent CSS does not filter the iframe or force a cream theme. Native Cal sizing grows with the booking flow; event details, timezone and duration remain visible.
- Loading timeout, retry, direct calendar link and a prefilled Gmail fallback handle unavailable/blocked calendars. Form edits remove the previous iframe and detach handlers; delayed SDK loads cannot reopen an abandoned route.
- Native Cal handles confirmation, approval-pending and any account-defined flow. The site does not infer a confirmed appointment from a booking-created event. No payment or contract acceptance was added.

## Activation checks and remaining verification

1. Done: `consult` → `https://cal.com/bence-mihaly-gjfcyz/konz`; `pt` → `https://cal.com/bence-mihaly-gjfcyz/edzes`; `online` → `https://cal.com/bence-mihaly-gjfcyz/online`. Keep the standalone Training Program as an email enquiry.
2. Inspect actual event availability, timezone, duration, location/video provider, notice periods, cancellation/rescheduling and approval behavior. Confirm the intended business email. Do not assume the previous Calendly Free plan or Google Calendar connection applies to Cal.com.
3. Inspect Booking Questions: standard full name, email and `notes` must be usable; check optional phone identifier `attendeePhoneNumber`. Test accents, spaces, plus-addressed email, all three coaching tiers and edited details. Do not put medical questions in the public booking form.
4. Check HU/EN calendar language, input contrast, mobile date/time/question screens and height. Real links exist; native iframe content remained hidden in the in-app browser even with the official unmodified snippet. Verify in the owner’s normal browser before publication. Any locale option must be checked against Cal's then-current support.
5. Review actual provider terms/DPA, processing/transfer arrangements, integrations and cookie behavior. Cal's privacy policy viewed on 2026-09-22 says it does not knowingly collect information from under-18s: resolve the appropriate adult/guardian booking route before enabling booking for the site's 14–17-year-old clients. Do not silently change coaching eligibility. No Cal account was inspected or its terms accepted here.
6. Done: `tools/privacy-content.json` and HU/EN pages/downloads no longer describe email-only routing. Public online event lists Google Meet; account/sync details remain unverified. Update any newly confirmed provider details later. Both legal documents remain review drafts; a changed provider name does not finalise them.
7. Run local tests, then inspect actual events and notifications with owner-authorised test bookings if needed. Do not book or cancel real appointments without explicit scope. Existing Calendly bookings/account are not deleted or migrated by website changes.
8. Bump affected cache revisions and upload the complete V18 public site only when ready. Keep Markdown, tests, builders and `.review` out of public uploads.

## Verification completed 2026-09-22

- Node contact/language tests: all three configured routes; missing/invalid links; package and name/email/notes preservation; edits and stale requests; SDK errors/retry; ready/fail/timeout; validation; keyboard navigation; no fabricated confirmation. Clipboard, section navigation and motion regressions also passed.
- 22-page HTML/link checks and language checks run after regeneration. Shared styles/script/config/responsive cache revision is `18.2`.
- Local browser: English and Hungarian email handoff at 390px viewport (375px content), and English handoff at 1440px (1425px content), no horizontal overflow. Calendar iframe/script absent with empty links. No messages sent.
- Official SDK 1.6.0 was downloaded to workspace `.review/cal-embed.js` and tested with `.review/cal-sdk-test.html` under CSP blocking all frames/network connections. It accepted the queue bootstrap, exact accented/plus-address prefill, UI configuration and repeated inline initialization after clearing the host. This checks SDK compatibility, NOT Cal's actual booking-page rendering or a real event. Do not bundle the downloaded SDK.

## Official references

- https://cal.com/help/embedding/embed-instructions
- https://cal.com/help/embedding/prefill-booking-form-embed
- https://cal.com/help/bookings/prefill-fields
- https://cal.com/help/embedding/embed-events
- https://cal.com/docs/developing/guides/embeds/customize-embed-css-variables
- https://cal.com/privacy
