# Historical Calendly notes — superseded

## Active working copy — V19

Selected by the owner on 2026-09-22 after the V18 loading/privacy review. All new website changes belong in V19; V18 and older versions are snapshots. The copied V18 history below is context, not an instruction to return to that folder. Local V19 changes are not deployed. See [HANDOFF.md](HANDOFF.md), [NEXT_STEPS.md](NEXT_STEPS.md) and [AUDIT_2026-09-22.md](AUDIT_2026-09-22.md). Preview: http://127.0.0.1:8190/.

## Review checkpoint — 2026-09-22

This V18 review is complete and is the source for the requested V19 working copy. The owner confirms the Cal.com booking and dark canvas work. Local fonts and stable navigation startup are implemented; HU/EN privacy and terms draft 9/downloads are synchronized. All 19 privacy intake questions remain complete. [AUDIT_2026-09-22.md](AUDIT_2026-09-22.md) is the current measurement, source and outstanding-work record; it supersedes earlier remote-font and pending-calendar-render statements. Other dated entries below remain historical.

Priority publication cleanup: live HANDOFF.md and PRIVACY_QUESTIONS.md were verified publicly readable. Remove internal notes from the publishing output/source, keep local working notes, and verify public URLs return 404. No deployment or external deletion was performed. Legal documents remain review drafts; successful page/booking checks do not establish legal approval.

As of 2026-09-22, V18 uses the prepared Cal.com integration. Read [CAL_SETUP.md](CAL_SETUP.md) for current work. Do not restore the old SDK or event links from this historical file. The old account/appointments were not modified.

# Calendly setup for V18

Version context: maintained in V18 from 2026-09-18, copied from V16. Dated V16/V15 references below describe inherited history, not the active editing folder. No V18 deployment is implied.

2026-09-17 question 6 follow-up: owner confirms Calendly Free and automatic booking sync to Google Calendar associated with the business email. Question 6 account/plan/integration facts are now answered; do not re-ask. Google account remains standard (no Workspace); no other connected apps/automations. Updated HU/EN privacy booking/provider sections and downloads with Google Calendar data flow. Exact transferred event fields, OAuth permissions, calendar sharing and provider terms remain unverified; no unsupported account-specific claim or compliance conclusion. Next intake question is 7 (devices, auto-save and backups). This supersedes earlier plan/calendar-pending notes. No account changes, independent sync test or deployment.

2026-09-17 update: owner confirmed NEXT_STEPS item 4 (English Calendly content, including the wording/notification check) complete with no problems observed. This supersedes the pending-English-content statements below. Design and booking were already confirmed complete. No new account changes or independent inspection were performed by the assistant.

## Current owner confirmation — 2026-09-12

Calendly design is fixed, including the previously tracked field-contrast problem. Booking was already confirmed working. Treat appearance and prefill as completed; preserve the approved current design. The owner did not provide the implementation details, and this documentation update did not independently inspect the widget or alter account settings. English custom event copy/notifications are a separate unconfirmed content item. Earlier colour-investigation notes are historical and must not reappear as an open task.

## English website (2026-09-07)

`contact-en.html` uses the same confirmed event URLs and preserved dark/gold widget configuration. Website instructions, booking notes and fallback messages are English; name prefill uses first name then surname. No Calendly account settings were changed. Calendly controls its own booking-view language and notifications, and custom event names/descriptions/questions need manual translations in that account: [Calendly's event-language instructions](https://calendly.com/help/how-to-change-your-event-type-language). If separate English events are created later, record their confirmed URLs here and add language-specific routing without disturbing existing Hungarian bookings.

V16 inherited the current V15 integration unchanged on 2026-09-08, including the prefill fix and bilingual website messages. Configure `V18/site-config.js`. Event observations below were verified on 2026-09-05; copying the version does not re-verify the live account. See [README.md](README.md) for tests and [PROJECT_NOTES.md](PROJECT_NOTES.md) for approved packages.

## Live client-management account

- Email: `mihaly.bence.fitness@gmail.com` (provided by the owner).
- Free consultation: https://calendly.com/mihaly-bence-fitness/konzultacio
- Personal training: https://calendly.com/mihaly-bence-fitness/30min
- Online coaching: https://calendly.com/mihaly-bence-fitness/online-coaching

The links and inquiry email are configured in `site-config.js`.

## Verified public event settings — 2026-09-05

- Consultation: 20 minutes; Budapest, Hatvany Lajos u. 10, 1039.
- Personal training: 1 hour at the same address. The `30min` URL is only the event slug; the live duration is one hour.
- Online coaching: 1 hour; conferencing details supplied upon confirmation.
- Each event currently asks for full name, email and one optional preparation-notes field.
- The public Calendly interface currently uses English labels. The surrounding website uses Hungarian.

## Prefilled information

`buildCalendlyBookingUrl` puts the submitted full name, first name, last name, email and preparation notes directly into the booking URL. The inline widget and separate-window fallback use this same URL. The documented `prefill` object is also supplied, supporting either a full-name field or separate first/last-name fields in Calendly. Full names retain Hungarian family-name-first order.

The Calendly widget downloaded on 2026-09-05 sends its `prefill` object through deferred messages after iframe load, rather than including it in the initial iframe URL. The previous site depended only on those messages for the inline widget, so it was vulnerable to that handoff failing. The initial booking URL now carries the values independently of message timing.

Encode parameter values with `encodeURIComponent`: this widget's URL parser does not convert form-encoded `+` characters into spaces. Spaces must be `%20`, and real plus signs in email addresses must be `%2B`. Do not replace this with a plain `URLSearchParams.toString()` handoff to the widget.

The single preparation field, `a1` in the URL and `customAnswers.a1` in the object, receives:

1. Selected service and, for online coaching, selected package and price.
2. Optional phone number.
3. The visitor's optional message.

This matches the current live forms. Do not create three questions to match the old integration. If the event questions are changed later, update and verify the mapping in `script.js`.

Training Program and general questions continue through email; they do not need a new scheduling event.

Direct contact email links open an addressed Gmail draft in a new tab, with a separate copy-address button for other mail apps. Prepared form inquiries also offer Gmail and copy-message options. No email is sent by the website itself.

## Embedded experience

- The Calendly script is loaded when the visitor requests appointments, with a 12-second loading limit and retry support.
- The original theme is restored at the owner's explicit request: `background_color=100f0c`, `text_color=f5f0e8`, `primary_color=d4a843`. The owner rejected the bronze/beige whole-widget workaround; do not reapply it. The iframe background is black and retains `color-scheme: light` for browser-rendered surfaces. Event duration, location, timezone, cookie controls and Calendly attribution remain visible.
- Resolved by owner confirmation on 2026-09-12: the previously reported pale text on light input boxes / Calendly design issue. The mechanism is not documented; do not invent an account setting or claim independent verification. Preserve functional prefill and the current appearance; do not introduce iframe filters, overlay controls or another whole-widget recolour.
- One auto-resizing embed is used per page. SDK `resize` is disabled; the site's existing message handler accepts `calendly.page_height` only from the current frame and exact Calendly origin, validates numeric heights (up to 12,000px), and updates the embed without scrolling the page. This avoids accumulated SDK resize listeners after repeated form handoffs. No overlay masks or brightness filters obscure the content.
- A 15-second readiness fallback provides an alternative if the calendar frame is slow or blocked; late successful loads recover.
- The separate-window link includes the same prefilled details as the embed and uses no-referrer handling.
- Editing form data invalidates the previous handoff. Confirmation messages must come from the current Calendly iframe and exact Calendly origin.

## Remaining account-level verification

The fix was tested against the downloaded public Calendly widget using a local DOM test harness. All three services produced an initial iframe URL containing correct full/split names, email, notes and theme parameters without firing deferred load messages. Tests include accents, spaces, plus-addressed emails and changed form values. The downloaded widget was temporary and is not bundled into the site. This verifies transport to the iframe, not a completed live booking or a browser inspection of the final invitee fields.

Booking and appearance are owner-confirmed working. Do not repeat complete bookings solely to satisfy older notes. Check English event copy and notifications if not already reviewed; verify availability, buffers, cancellation/rescheduling or meeting-link settings when those settings change or a specific gap is reported. No live appointments or email messages were created during development verification.

## Official references

- https://calendly.com/help/advanced-calendly-embed-for-developers
- https://calendly.com/help/how-to-pre-fill-invitee-information-in-an-embed
- https://calendly.com/help/how-to-pre-fill-invitee-information-in-your-calendly-link
- https://calendly.com/help/how-to-customize-your-embed
- https://community.calendly.com/api-webhook-help-61/challenge-with-embedding-calendly-in-a-custom-web-application-793 (Calendly employee explains the iframe styling limitation)
