# Cal.com — current booking implementation

Updated 2026-09-28. Cal.com is the active provider. [CALENDLY_SETUP](CALENDLY_SETUP.md) is history only. Do not reintroduce old provider prefill/loading assumptions.

## Public routes — source verified

`site-config.js` owns these owner-supplied URLs and `inquiryEmail`:

| Service key | Cal event / route |
| --- | --- |
| `consult` | https://cal.com/bence-mihaly-gjfcyz/konz |
| `pt` | https://cal.com/bence-mihaly-gjfcyz/edzes |
| `online` | https://cal.com/bence-mihaly-gjfcyz/online |
| `program` | Email enquiry; no event |
| Other questions | Email enquiry |

Email: `mihaly.bence.fitness@gmail.com`. Online package handoff uses `service=online&package=basic|plus|premium`. No API credentials belong in the site. Empty/invalid/missing event configuration falls back to an enquiry route rather than loading a calendar.

## Current visitor flow

- Contact automatically loads the free-consultation calendar, or the valid linked appointment service. Changing service/package refreshes it without a submit step, scroll jump or focus transfer. This supersedes the earlier explicit "Choose a time" stage.
- Available time comes before native Cal contact fields. The site's handoff carries **service/package notes only**; abandoned enquiry personal information is not copied into Cal.
- Standalone programme/general questions show the local name/email/optional phone/message form. Gmail opens a prepared draft; copy provides a provider-neutral fallback. Nothing is sent by the website.
- Failed calendars offer reload/direct-link recovery; obsolete asynchronous responses cannot restore an abandoned service. Preserve the working dark/gold native embed and visible provider details.
- Parents/guardians arrange 14–17-year-old appointments by email, without entering a child's details into Cal. This preserves training eligibility without claiming technical age verification.

## Layout and maintenance

Appointment selector uses native radio cards from 768px, synchronized with the compact phone select. At 768–1279px, cards form a three-column grid above the full calendar; from 1280px the panels share a stretched row. No fixed clipping height. Booking/privacy disclosures sit below. Contact's wide section index is in flow above panels; other pages retain the normal rail. See current CSS/script rather than the superseded 1050px selector breakpoint.

Source: `script.js`, `site-config.js`, Contact HU source and translations; shared asset revision ownership is in README. Tests: contact-flow, email-copy, languages, section navigation plus page/language checks. Browser checks only for the affected changes; no repeated full live booking just because an old note lists one.

## Owner account confirmations — September 28

Cal.com **Free**, registered with the business email; booking sync to the same Google Calendar; **Google Meet only** as an additional connected app, no further Cal apps/automations. The standard Google account is not Workspace. Calendar is private; visitors see bookable slots, not other clients' classes/details or reasons for unavailability.

Owner reports successful deletion of an old booking from both Cal and Calendar. Do not infer one deletion automatically propagates or removes trash/backups/emails/attendee copies. Owner is **not sure** about receiving/accepting a DPA; account coverage remains unverified. These questions are answered; do not repeat them.

## Evidence and remaining review

- Earlier public-event inspection (2026-09-22): consultation 20 minutes and personal training one hour at Hatvany Lajos utca 10; online one hour on Google Meet, Europe/Budapest shown. No Confirm submitted. This is dated evidence; business call-duration decisions were separately confirmed.
- Owner confirmed working booking/dark canvas after earlier in-app preview failures. September 23 local checks verified automatic rendering, switching and fallback behavior. Do not reopen that resolved bug from old diagnostics.
- Still unverified: exact current OAuth permissions/transferred fields, applicable DPA/account coverage, transfers and actual booking-cookie behavior. Notification/cancellation/rescheduling/meeting-link settings need targeted checks if changed or relevant; code tests do not prove delivery.
- Provider-document review and links: [PRIVACY_REVIEW](PRIVACY_REVIEW.md). Do not infer Workspace processing terms, accept provider terms or send support requests merely from the internal queue.
- Further deletion/integration experiments should use fictional data within authorized scope. Do not cancel real bookings to test retention. Historical Calendly bookings/account were not migrated or deleted by website changes.

## Technical references from prior work

- [Cal prefill](https://cal.com/help/embedding/prefill-booking-form-embed)
- [Booking fields](https://cal.com/help/bookings/prefill-fields)
- [Cal privacy](https://cal.com/privacy), [terms](https://cal.com/terms), [Trust Center](https://trust.cal.com/)

Refresh provider documentation when changing an integration. Current publication/export status belongs in PUBLISHING_CHECKLIST.
