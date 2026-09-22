# V19 — current to-do list

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

Updated 2026-09-21 after the owner's progress report. Numbers below match the latest six-item list in the conversation. V18 remains the working folder. Live domain: https://mihalybence.com/.

1. **Open — finish the terms and service details.** Still recorded as missing: separate business registration number, business phone, exact refund for missing the 24-hour reply promise, cancellation treatment with at least 24 hours' notice, and whether gym entry is extra. The 20-minute consultation, 60-minute individual training session and three-month ten-session validity from payment are confirmed; synchronize them into the relevant site/terms sources. See LEGAL_REVIEW.md for other offer-specific details. Do not re-ask confirmed durations or validity.
2. **Open — finish the separate online agreement.** Review the actual health-consent wording, parent/guardian verification, offer/acceptance/confirmation and applicable withdrawal process. Keep in-person gym paperwork separate. Final wording and the real contracting process need appropriate Hungarian legal review.
3. **Open — finish privacy implementation/review.** All 19 intake answers are complete. INCIDENT_RESPONSE.md is prepared; rehearse it with fictional data. Remaining checks cover actual provider arrangements, sharing/deletion/recovery controls, enquiry-expiry review, applicable billing and consent-evidence retention, and accountant details when supplied. See PRIVACY_REVIEW.md. Do not restart the completed questionnaire.
4. **Done — hosting suitability, owner-confirmed 2026-09-21.** The owner reports the current site is allowed without payment processing or collection of sensitive payment information such as card numbers; those features are not planned. Close this task for the present setup. No provider correspondence was independently reviewed. Revisit only if the setup materially changes or new evidence arises; this is not a universal GitHub-policy claim.
5. **Done — V18 published, owner-confirmed 2026-09-21.** Domain: https://mihalybence.com/. The assistant did not deploy or independently audit this publication. Legal documents still have review status; upload future revisions when ready rather than treating the current publication as legal approval.
6. **Partially done — photography and sharing presentation.** Both colleague-training photos are in the HU/EN Personal Training and About galleries, with responsive delivery and the existing enlarged viewer. More photos are optional later. Owner rejected the seated welcoming-portrait candidates and plans a replacement; do not add either rejected photo. Sharing-preview image/title completion is not separately confirmed. Client faces remain masked; the owner specifically approved the colleague photos as supplied.

## Current requested work — Cal.com replacement (2026-09-22)

Three supplied event links are connected locally. Direct event pages load; consultation prefill was visually verified. The inline iframe remains unverified: the in-app preview also fails to display the official unmodified snippet and plain iframe. The owner has been asked to check the local contact page in their normal browser. Direct calendar/email fallback remains available; a timed-out iframe no longer leaves a large empty loader. See CAL_SETUP.md for exact verification scope, account/provider follow-ups and the guardian booking route. No booking or deployment performed. Earlier Calendly completion does not verify Cal.com.

## Completed baseline

Hungarian/English site, navigation and language slider, circular MB favicon, HU/EN 404 pages, responsive-image/layout work, booking prefill, Calendly design/contrast and English account content, connected domain, privacy intake, prepared incident guide and two training-photo placements. V18 is now owner-confirmed published. Previous successful checks do not need repeating without relevant changes or a new issue.

## Working boundaries

- Edit V18 only; older versions remain snapshots.
- Keep both language versions and downloads consistent; legal drafts remain drafts until the substantive gaps are resolved.
- Keep internal notes, build helpers and client records out of public uploads.
- No Google Business/listing/search-promotion task: declined by the owner. Keep the existing gym map link and necessary provider disclosures.
- This list records status; it does not authorise unrelated features, account changes, external messages or a deployment.
