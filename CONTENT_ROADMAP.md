# V19 content roadmap

## Active working copy — V19

Selected by the owner on 2026-09-22 after the V18 loading/privacy review. All new website changes belong in V19; V18 and older versions are snapshots. The copied V18 history below is context, not an instruction to return to that folder. Local V19 changes are not deployed. See [HANDOFF.md](HANDOFF.md), [NEXT_STEPS.md](NEXT_STEPS.md) and [AUDIT_2026-09-22.md](AUDIT_2026-09-22.md). Preview: http://127.0.0.1:8190/.

## Review checkpoint — 2026-09-22

This V18 review is complete and is the source for the requested V19 working copy. The owner confirms the Cal.com booking and dark canvas work. Local fonts and stable navigation startup are implemented; HU/EN privacy and terms draft 9/downloads are synchronized. All 19 privacy intake questions remain complete. [AUDIT_2026-09-22.md](AUDIT_2026-09-22.md) is the current measurement, source and outstanding-work record; it supersedes earlier remote-font and pending-calendar-render statements. Other dated entries below remain historical.

Priority publication cleanup: live HANDOFF.md and PRIVACY_QUESTIONS.md were verified publicly readable. Remove internal notes from the publishing output/source, keep local working notes, and verify public URLs return 404. No deployment or external deletion was performed. Legal documents remain review drafts; successful page/booking checks do not establish legal approval.

## Latest owner update — 2026-09-21

- **Hosting resolved (owner-confirmed).** The owner reports that the current site is permitted provided it does not process payments or collect sensitive payment information such as bank-card numbers. The owner confirms those functions are not planned. Close the GitHub hosting task for the current setup; do not re-raise it without a material change or new evidence. No provider correspondence was supplied or independently reviewed, and this is not a general interpretation of GitHub policy or a statement that all client data is non-sensitive.
- **V18 published (owner-confirmed)** at https://mihalybence.com/. The assistant did not deploy or independently audit this publication. Future local changes require their own upload; publication does not finalise legal drafts.
- **Photography partially complete.** The two colleague-training images are included; more photographs may be added later. The owner rejected the two seated welcoming-portrait candidates and plans a new photograph. Sharing-preview completion was not separately confirmed.
- **Remaining active work:** checklist items 1–3: terms/service details, the separate online agreement and privacy implementation/review. All 19 privacy intake answers remain complete. Do not reopen completed booking/design/language work.

This update supersedes earlier pending-hosting and unpublished-V18 statements below; dated implementation records remain historical.

2026-09-20 training photographs: added owner-supplied trainingbobi.png and trainingbobi2.png unchanged under assets/, with 320/640/960/1440px WebP delivery copies. The owner explicitly confirms the person pictured is a colleague, not a client, and authorises these images as supplied; client-face masking remains the rule for other client photos. Both images appear in Personal Training below the three principles and in the About/Rólam gym gallery, in HU/EN. Replaced the empty training-photo area with two landscape photos plus the existing personal portrait; no gym-photo placeholders remain. Captions stay below the new photos, preserving the full landscape composition. Each opens in the existing accessible viewer. training-photos.css?v=18.1 controls these two pages only; mobile uses a single column. Images are lazy-loaded, sized explicitly and use srcset/sizes. The two largest WebPs total 459,442 bytes versus 5,093,723 source bytes (about 91% smaller). Full source originals remain unchanged.

Verification: 22-page structural and ten-pair language checks pass. Local browser checks at 320, 390, 768, 1024 and 1440 CSS pixels found no About-gallery overflow; training-page checks at 320, 390, 768 and 1440 confirmed single/two-column behavior. Both new images load, and the HU/EN viewer opens/closes; mobile enlargement uses contain, without stretching. These are desktop-browser viewport simulations, not physical iPhone/Android tests. V18 preview started at http://127.0.0.1:8180/; no live deployment, client-document edits or older-version edits.

Version context: maintained in V18 from 2026-09-18, copied from V16. Dated V16/V15 references below describe inherited history, not the active editing folder. No V18 deployment is implied.

V18 is the active version as of 2026-09-18, copied from the current V16. This is a backlog for future owner-approved work, not an instruction to implement every suggestion. Read [README.md](README.md) and [PROJECT_NOTES.md](PROJECT_NOTES.md) before editing.

## Completed baseline — do not redo

- Eight complete pages in Hungarian and English, the established bronze/copper/gold/black palette and consistent approved pricing. Every header has HU/EN flags, including both legal drafts.
- Galéria consolidated into Rólam, including `shirtless.png`, the three life photos and three intentional photo placeholders. No separate Life page.
- Sikerek restored to primary navigation on every page and linked from the homepage.
- Responsive section navigation across all pages, with native anchors, active markers and conditional contact sections.
- Four online packages and package-specific contact handoffs; three live Calendly event URLs and the new client email.
- Calendly embed with prefilled details, loading recovery and direct-link fallback. Owner confirmed the design/field-contrast issue fixed on 2026-09-12; booking was already confirmed working. Preserve the approved appearance. Do not reopen the historical whole-widget colour investigation; the latest fix mechanism was not provided.
- Latest fixes: enlarged gallery images preserve proportions, pricing heading/introduction spacing is corrected, contact portrait is compact, and contact email links open Gmail drafts with a separate copy-address option.
- Inherited V15 detail pass: removed the requested email helper sentence, kept forint amounts together across line breaks, added heading-anchor clearance and image dimensions, increased form-input text to 1rem, and removed the calendar's duplicate scroll after loading.
- Inherited V15 Calendly prefill fix: initial inline/fallback booking URLs carry submitted name, split names, email and preparation notes, with encoding compatible with the widget. Tested against the actual public SDK; final invitee-field browser verification remains distinct from the automated check.
- Automated structural, navigation, contact-flow and clipboard checks pass. Browser layout verification and complete live booking verification remain separate tasks.
- Device/performance pass complete in code: responsive WebP images (93.5% smaller largest-copy total), refined mobile/landscape spacing and touch targets, safe-area support and controlled Calendly height updates. See [PUBLISHING_CHECKLIST.md](PUBLISHING_CHECKLIST.md) for remaining browser/device and launch verification. The owner reports that the domain is connected and the site is live; public URL and upload details are not yet documented.

## Remaining content and service decisions

1. Confirmed location: Victory Fitness Békásmegyer, 1039 Budapest, Hatvany Lajos utca 10. The public site has been updated.
2. Later: add genuine, consented client results and finished photography. Fabricated testimonials, case studies and avatars are absent. Three intentional photo placeholders remain in Rólam at the owner's request.
3. Current owner-approved prices: 11,000 Ft per personal-training session, 100,000 Ft for ten sessions, Training Program 19,900 Ft once / 4 weeks, online Basic 29,900 Ft/month, Plus 39,900 Ft/month, Premium 49,900 Ft/month. Keep every public price reference consistent with these packages.
4. Hungarian/English privacy review pages are now created. Finalise retention deadlines, app settings and provider arrangements in PRIVACY_REVIEW before treating the notice as complete.
5. Later: add real certificate images or verifiable credential details for the IWI qualifications.

## Recommended page structure

Keep the main navigation compact. The detailed personal-training page is intentionally present in the header; add further service-detail pages only when they are complete enough to justify another navigation item.

### Existing pages and optional additions

- `szemelyi-edzes.html`: created as the combined personal-training and rehabilitation-approach page. Refine its wording with final owner-approved content.
- `online-coaching.html`: completed with four owner-approved packages. Basic includes one coaching call/week, Plus two, and Premium two plus unlimited messaging, video/form checks and ongoing adjustments. Training Program is a standalone 4-week product. Package buttons preserve the chosen tier in the contact form; standalone-program inquiries use email.
- `elso-alkalom.html`: completed. Includes the first-conversation journey, preparation, confirmed address and map link. Add confirmed practical arrival details here when available.
- `location.html`: optional future page only if enough verified location detail warrants it. Address and map already exist on the first-visit page; do not create a duplicate just to satisfy an old plan.
- `adatkezeles.html` / `privacy-en.html`: created privacy review pages for website and confirmed client communication flows; source is `tools/privacy-content.json`.

### Improve existing pages

- Homepage: updated with a clear audience and location, personal voice, training background and IWI qualifications near the first CTA; visitor situations replace placeholder testimonials.
- Services: updated with consistent current prices and links to both complete service pages. Confirm session length, package validity, cancellation terms and gym-entry costs before adding them as fixed promises.
- Results: currently explains how individual progress is followed, alongside Bence's personal story. Add real case studies with starting point, goal, process, duration, outcome, and client approval when available.
- About: show certificate images and explain what the MES qualification changes in practice without implying medical treatment.
- About gallery: the former Life gallery now lives at `about.html#galeria`, with the three original personal photos and their captions. The portrait frame now uses the owner-approved `shirtless.png`; training, movement and coaching-session frames remain ready for the photo session. The separate Life page has been removed.

### Not currently intended

No blog or general knowledge section is planned. Keep the site focused on services, credibility, results, and booking.

## Conversion and trust improvements

- A “What happens after booking?” section already exists on Contact; review clarity before adding repeated blocks elsewhere.
- Add specific availability only when the owner provides current, maintainable information.
- Use real photos of the coach, training environment, and sessions.
- Give every service page one primary CTA instead of several competing actions.

## Technical follow-up

- Responsive WebP conversion is complete. Measure the actual published pages with PageSpeed Insights after hosting is configured.
- Write content for real client questions and first-hand expertise, not to fill a keyword quota.

## Suggested implementation order

1. Follow the owner's next V16 request; the homepage rewrite and service-detail pages are already complete.
2. When browser testing is requested, check gallery proportions and long captions, pricing spacing, contact portrait, email/copy actions and section navigation on desktop and mobile.
3. Obtain remaining facts: package validity, cancellation terms, gym-entry costs, current availability and privacy/data-handling details. Preserve existing verified address, prices and credentials.
4. Replace the three intentional photo placeholders when suitable photographs are supplied, and add genuine results/certificates when available.
5. Finish privacy content, live booking/email verification before an authorized publication.
6. Publish only when requested and launch decisions are resolved. No blog or general knowledge section is planned.
