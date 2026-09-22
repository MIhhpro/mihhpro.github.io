# V19 — reviewed website source

## Active working copy — V19

Selected by the owner on 2026-09-22 after the V18 loading/privacy review. All new website changes belong in V19; V18 and older versions are snapshots. The copied V18 history below is context, not an instruction to return to that folder. Local V19 changes are not deployed. See [HANDOFF.md](HANDOFF.md), [NEXT_STEPS.md](NEXT_STEPS.md) and [AUDIT_2026-09-22.md](AUDIT_2026-09-22.md). Preview: http://127.0.0.1:8190/.

Reviewed 2026-09-22 before the owner-requested V19 copy. Start with [HANDOFF.md](HANDOFF.md) and the [loading/privacy audit](AUDIT_2026-09-22.md). V18 becomes a snapshot once V19 exists.

Static HTML/CSS/JavaScript; 22 public pages in Hungarian and English. No build server, visitor account, on-site payment or website email backend. Booking uses Cal.com after the visitor requests times. Email enquiries use Gmail drafts or copyable text. The owner confirms booking/design work. Fonts are self-hosted and photos use responsive WebP files.

## Documentation

- [NEXT_STEPS.md](NEXT_STEPS.md): remaining owner/legal/operational work.
- [CAL_SETUP.md](CAL_SETUP.md): current booking configuration and verification limits. CALENDLY_SETUP is archived context.
- [PRIVACY_REVIEW.md](PRIVACY_REVIEW.md), [PRIVACY_QUESTIONS.md](PRIVACY_QUESTIONS.md), [LEGAL_REVIEW.md](LEGAL_REVIEW.md): drafts and completed intake. Do not treat them as final legal approval.
- [INCIDENT_RESPONSE.md](INCIDENT_RESPONSE.md): prepared private operating procedure.
- [PUBLISHING_CHECKLIST.md](PUBLISHING_CHECKLIST.md): deployment safeguards; exclude internal files and remove already exposed Markdown from the live site.
- [PROJECT_NOTES.md](PROJECT_NOTES.md), [CONTENT_ROADMAP.md](CONTENT_ROADMAP.md), [MOTION_NOTES.md](MOTION_NOTES.md): established design/content and history, not authority for unrelated changes.
- [PRINT_ASSETS.md](PRINT_ASSETS.md), [CONTRACT_REFERENCE_REVIEW.md](CONTRACT_REFERENCE_REVIEW.md): client-document/print references. Deliver revised client documents in the Page root.
- [Font sources](assets/fonts/SOURCES.md): font provenance and required public licences.

## Build and check

Run Python tools/build-terms.py after terms changes, or tools/build-languages.py after ordinary page changes. Add new normal-page translations through tools/extract-translations.py and tools/english-translations.json first. Privacy source is tools/privacy-content.json. Build scripts work relative to their version directory.

Run Python tests/validate.py and tests/languages.py; Node tests/contact-flow.cjs, tests/email-copy.cjs, tests/languages.cjs, tests/motion.cjs and tests/section-nav.cjs. tests/loading-audit.html is an internal, unthrottled same-origin browser measurement harness, not production analytics or a field performance score.

Client email: mihaly.bence.fitness@gmail.com. Live domain: https://mihalybence.com/. Never upload the entire workspace or active source directory indiscriminately. Preserve licences for all public fonts.
