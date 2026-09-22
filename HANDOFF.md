# V19 — reviewed handoff

## Active working copy — V19

Selected by the owner on 2026-09-22 after the V18 loading/privacy review. All new website changes belong in V19; V18 and older versions are snapshots. The copied V18 history below is context, not an instruction to return to that folder. Local V19 changes are not deployed. See [HANDOFF.md](HANDOFF.md), [NEXT_STEPS.md](NEXT_STEPS.md) and [AUDIT_2026-09-22.md](AUDIT_2026-09-22.md). Preview: http://127.0.0.1:8190/.

Updated 2026-09-22. This is the final reviewed source for the owner's requested V19 copy. Continue in V19 once copied; preserve V18 and all older versions thereafter.

## What is done

- Bronze/copper/gold/black design, HU/EN pages, prices, gallery, MB logo and existing interactions are preserved.
- Cal.com replaces Calendly with the owner's three configured events. Name/email/notes prefill, direct-calendar fallback and email/copy routes remain. The owner now confirms everything works, including the dark outer canvas. Earlier in-app-preview failure notes are historical.
- Fonts are now local WOFF2 with Hungarian/English coverage and SIL licences. Google Fonts is no longer contacted. Navigation startup no longer shifts the main content.
- Privacy pages/downloads reflect local fonts and current Cal.com disclosures. Parents/guardians are directed to email for 14–17-year-old participants; no child details should be entered into Cal.com. Training eligibility is unchanged.
- Terms draft 9 includes approved 20-minute consultation, 60-minute personal training and ten-session validity of three months from payment. Other unresolved offer details remain explicit.
- Local loading samples, phone-width samples, all five JavaScript test suites, 22-page validation and ten language-pair checks passed. See [audit](AUDIT_2026-09-22.md) for exact timings and limitations.

## Immediate next work

1. Remove internal Markdown from the public deployment: HANDOFF.md and PRIVACY_QUESTIONS.md are currently accessible on mihalybence.com. Uploading a clean package over the top may not remove old files. No live deletion or deployment has been performed here.
2. Finalise outstanding business/refund/cancellation details, separate online agreement/health consent and applicable withdrawal workflow with appropriate legal review. Policies remain drafts.
3. Verify the actual Cal.com account/integrations/processing terms, accountant particulars, retention criteria and practical deletion/sharing controls. Do not repeat the completed 19-question privacy intake.

## Working guide

Read [README.md](README.md), [NEXT_STEPS.md](NEXT_STEPS.md) and [AUDIT_2026-09-22.md](AUDIT_2026-09-22.md). Specialist notes: CAL_SETUP, PRIVACY_REVIEW, PRIVACY_QUESTIONS, LEGAL_REVIEW, INCIDENT_RESPONSE, PRINT_ASSETS and MOTION_NOTES. PROJECT_NOTES retains dated implementation history. CALENDLY_SETUP is historical only.

Use only mihaly.bence.fitness@gmail.com for client contact. New client documents belong in the Page workspace root. Keep site assets and builders within the active version. Do not upload Markdown, tests, tools, tmp, client documents or unreferenced original/print photographs.

Build: tools/build-terms.py regenerates terms and invokes the language/privacy/error builders; tools/build-languages.py regenerates bilingual pages. For new normal-page copy, append inventory IDs with tools/extract-translations.py and supply English translations. Do not renumber IDs. Cache versions: fonts/section-nav CSS 18.6, script 18.5, styles 18.4, config 18.3, responsive 18.2.

Live V18 publication was owner-confirmed previously; this review's later edits have not been published. Preview 8180 serves V18. V19 will use its own preview.
