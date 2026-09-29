# Privacy implementation and review

Updated 2026-09-28. Public source: `tools/privacy-content.json`; date `2026-09-28`, status `review`. Generated HU/EN pages and text downloads remain review/noindex. This document owns technical/privacy gaps; [PRIVACY_QUESTIONS](PRIVACY_QUESTIONS.md) owns the completed owner answers. Do not keep competing intake histories here.

## Current website data flow

Source-verified configuration/implementation, not an audit of private accounts or today's live domain:

| Surface | Current behavior |
| --- | --- |
| Hosting/fonts | Static GitHub Pages-compatible site; fonts self-hosted from V20 assets with licences. No Google Fonts request in current source |
| Contact appointment routes | Cal.com connects automatically for default consultation or valid linked appointment service. Service/package selection updates it. Visitors enter personal details inside Cal after choosing a slot |
| Website-to-Cal handoff | Service/package notes only. Abandoned enquiry name/email/phone/message are not copied into Cal. Cal itself processes its native booking information |
| Standalone programme / general enquiry | Local form prepares a Gmail draft or copyable message. Opening Gmail transfers draft content to Google; the website does not send an email or run a backend form handler |
| Calculators | Browser calculations; no data submission or booking prefill. Same-tab language click uses one-use sessionStorage, target-checked, 60-second validity, consumed on arrival; not a permanent save feature |
| Reading-position handoff | Separate one-use sessionStorage of layout landmarks/offsets, not form values |
| Resources/map | Optional external Google Sheets masters, PDFs fetched when opened, external gym-map link rather than embedded map |
| Not implemented | Checkout/card collection, client login, newsletter, photo upload, analytics or advertising pixel |

Do not describe the entire experience as cookie-free or all data as local: provider/browser behavior remains distinct. September 22's no-external-origin-before-interaction measurement predates automatic Cal loading and is not current Contact behavior. No generic cookie banner/consent checkbox has been added without an actual assessment.

## Confirmed operational boundaries

Use the detailed register rather than asking these again: Cal Free/business email/Calendar/Meet/private calendar; standard Google account; no owner call recording/transcription/client-data AI; limited client view access; manual retention endpoints and reminder routine; tested Cal/Calendar deletion; named chat apps; Számlázz.hu/NAV accountant route; publication permission and its latest withdrawal deletion scope.

Owner's current publication practice deletes posts, related media and permission emails on withdrawal without a separate log; coaching records and invoices remain separate. Public drafts state the practice and flag evidence-deletion review. Do not turn the earlier permission-email/post mapping into a permanent log or claim a current legal record exists.

## Unresolved work

| Item | What is actually unresolved | Already answered / limit |
| --- | --- | --- |
| Cal provider agreement | Applicable DPA and account coverage, transfers, exact permissions/fields, booking-cookie behavior | Owner is unsure about DPA; do not say none exists or ask the same question again |
| Google account suitability | Consumer-account terms and suitability for actual planned client/health-document handling | Not Workspace; no inferred paid subscription or automatic upgrade recommendation |
| Provider/deletion scope | Relevant app/trash/cache/email/linked-file/attendee copies; Drive sharing/revocation | Owner manual endpoints, reminder tracking and Cal/Calendar deletion trial are confirmed; no full erasure guarantee |
| Permission/contract evidence | Review deleting publication emails at withdrawal; retention of necessary contract/claim evidence separately | Scope/no-log practice is confirmed; no new retention duration/logging commitment adopted |
| Billing | Applicable record-specific tax retention, actual accountant permissions/role | Provider/access route known; accountant particulars deferred |
| Health/indirect sources | Necessary categories, actual Article 6/9 basis, source verification, indirect-source notices, unsolicited-data workflow | Before-review signing and notes-only method are confirmed; separate online agreement deferred |
| Minors/representatives | Verification, authority, access scope and valid consent in actual workflows | 14+ and joint signature formats already answered; no routine ID-copy collection invented |
| Paper gym workflow | Original-paper storage and scope of any digital gym copies | Different from online; reference DOCX not rewritten |
| Incident/request readiness | Rehearsal and reconciliation of proposed procedure with actual practice | Prepared guidance is not evidence of adopted logging or successful testing |

Maintain deferred work as deferred, not a reason to declare all other work blocked. Legal/technical questions should be checked against evidence; only ask for a missing owner fact when it matters.

## Provider documents previously checked

The following is the **2026-09-28 public-document review**, retained for continuity. It was not renewed during Markdown reconstruction. Revisit official sources before new provider/legal advice; none of these observations proves account-specific acceptance or compliance.

Read-only review of official public documentation, not the owner's account or a legal approval:

- [Cal.com privacy policy](https://cal.com/privacy) identifies the host as controller of booking data and Cal.com as processor. It describes calendar event/attendee/free-busy data and meeting-link data for integrations; actual field mapping and granted permissions remain unverified. It describes active-account booking retention and settings/support deletion routes. Disconnection alone must not be treated as erasing destination copies. Provider transfer safeguards still need account-specific review.
- [Cal.com Trust Center](https://trust.cal.com/) lists a restricted DPA document and a route to obtain a signed agreement. The document was not accessed or accepted; public information does not establish this Free account's agreement coverage. [Public terms](https://cal.com/terms) were also checked; no account-specific conclusion follows. Owner subsequently answered that he is not sure. Locate the applicable agreement and account-specific evidence before assessing coverage; do not repeat the awareness question. No form, NDA, support request or other external message was submitted.
- [Google Privacy Help](https://support.google.com/policies/answer/9581826?hl=en-GB) says consumer Gmail/Drive use Google's general terms/privacy policy, with no processor DPA offered for those consumer services. Do not describe the owner's standard account as a Workspace processor arrangement. Assess suitability for the actual planned client-document/health-data workflow separately; this finding alone does not establish that every use is prohibited or require an automatic paid upgrade.
- [Workspace Personal terms](https://workspace.google.com/terms/workspace-personal-terms/) have their own subscription scope and privacy/DPA provisions. A gmail.com address alone does not establish that subscription. The owner previously confirmed a standard account without Workspace; no upgrade or new terms acceptance is inferred.
- [Google Calendar deletion guidance](https://support.google.com/calendar/answer/37113?hl=en-uk) describes a 30-day bin and permanent deletion controls. Event ownership affects deletion; removing an invitation does not erase other people's copies. The owner subsequently reported successful deletion in Cal.com and Calendar. That does not establish permanent removal, automatic propagation or email/attendee cleanup; any further targeted check should use fictional data. Do not cancel or erase real bookings merely to test retention.

These findings are internal review follow-through. Public notices retain the actual confirmed setup and unresolved provider-review wording; no new retention deadline, automatic cleanup, accepted contract, legal certification or account change is claimed.


## Other prior source references

These supported earlier reviews on 2026-09-17/18/22; preserve their dates and recheck when used for a new decision.

- [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj), [EDPB lawful processing](https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en), [individuals' rights](https://www.edpb.europa.eu/sme/be-compliant/respect-individuals-rights_en), [consent guidance](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_202005_consent_en.pdf).
- [European Commission storage-limitation principles](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en); the chosen three-month enquiry limit is not a statutory duration.
- [Google Meet chat](https://support.google.com/meet/answer/9308979?hl=en), [Drive folders](https://support.google.com/drive/answer/7166529?hl=en), [Drive files](https://support.google.com/drive/answer/2494822?hl=en): disappearing chat is distinct from linked documents; inherited folder permissions require attention.
- [Signal](https://signal.org/legal/), [Telegram](https://telegram.org/privacy), [WhatsApp EEA](https://www.whatsapp.com/legal/privacy-policy-eea), [Viber](https://www.viber.com/en/terms/viber-privacy-policy/): do not assume equivalent storage/deletion or universal end-to-end encryption.
- [Számlázz.hu](https://www.szamlazz.hu/adatvedelem/), [NAV Online Számla](https://nav.gov.hu/Elethelyzetek-adozasa/vallalkozas/Regisztracio-az-Online-Szamla-rendszerben), [NAIH contact](https://naih.hu/ugyfelszolgalat-kapcsolat), [GitHub privacy](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

## Editing and evidence

Update both JSON language sections, rebuild with `tools/build-languages.py`, check both pages/downloads with the tests in README and focused readback, then build a fresh export only for a public-source change. Keep security details internal. No actual client records have been inspected or deleted as part of this intake. Local builds, owner reports and prior source research must never be presented as a legal approval or live deployment.
