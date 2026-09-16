# V16 publishing checklist

**Latest status: the owner has published V15 with the recent changes.** V16 is the active development copy. The historical upload notes below are superseded by that confirmation. Use [NEXT_STEPS.md](NEXT_STEPS.md) for the current priorities; do not list completed language, favicon or 404 implementation as unfinished work.

2026-09-12 owner update: Calendly design/field contrast is fixed; booking was already confirmed working. Closed as owner-confirmed, without a new independent widget inspection or account change. V16 now also contains local privacy review pages and motion refinements; its publication has not been confirmed. Selected local browser checks are recorded in MOTION_NOTES, distinct from physical-device/live checks.

2026-09-08: favicon files and the custom Hungarian/English error pages are ready locally. Upload `404.html` at the publishing root alongside `index.html`, plus `404-en.html`, `error.css`, the new brand assets, `favicon.ico` and updated shared files. GitHub Pages uses that root error page for missing paths: [GitHub instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site). Verify a deliberately missing nested address after upload. The 404 URL base is `/`, matching the owner's custom-domain setup. Favicon caches may require a refresh. No live deployment was performed here.

English site update (2026-09-07): local V16 now has eighteen public pages (nine language pairs), plus `language.css` and `language.js`. Upload the updated shared script and all HTML/CSS/JS together. Translation/routing checks run locally; confirm the selector and longer English headings on real phones after upload. Review Calendly's own event names and questions in the Calendly account if English visitors need those translated too.

Historical owner update, 2026-09-05: domain connected, site online and booking checks working. Calendly colour work was parked then and subsequently confirmed fixed on 2026-09-12. Legal/content material and sharing previews remain separate follow-ups; favicon and error-page work were completed. Hosting and DNS were handled by the owner; the public URL and upload workflow are not yet recorded here.

Terms update: Hungarian and English pages are now prepared and linked from the footer, but remain **review drafts**. [LEGAL_REVIEW.md](LEGAL_REVIEW.md) records the supplied business details, missing registration/phone/refund decisions, privacy notice and electronic withdrawal-process requirements. The owner identified GitHub as the host. Adding terms does not complete all compliance work; do not present the draft as legally approved or already effective.

The checklist below is retained as a reference, subject to that status update. The iPhone Brave heading/menu correction is prepared locally; upload the complete current public file set, including both languages and both error pages, then recheck on the affected phone. No live deployment or physical-device verification was performed by the assistant for this fix.

## Remaining live-site checks

1. **Check English Calendly copy if still needed.** Design/field contrast and booking are owner-confirmed complete. Custom event descriptions/questions and confirmation emails remain an account-content check; preserve the current appearance.
2. **Spot-check affected integrations after an update.** Do not repeat full successful bookings just to satisfy an old checklist. Recheck event routing, email drafts and copy fallback when relevant code or account settings change; verify notifications, cancellation/rescheduling or meeting links when there is a specific unverified change. Automated tests do not book appointments or prove email delivery.
3. **Run the final browser/device pass.** Check both languages, including contact, legal and error pages, on iPhone Safari, Android Chrome, tablet and desktop browsers, in portrait and landscape. Include 320, 375/390, 768/820, 1024, 1440 and 1920 CSS-pixel widths; 200% text enlargement; keyboard navigation; on-screen keyboard; slower mobile connection; reduced motion; and long names/email addresses. Confirm no clipped headings, sideways scrolling, covered controls or broken gallery close actions. Device-specific code improvements are complete, but a visual/physical-device QA pass was not performed during this turn.
4. **Finish public-facing content.** Replace the three Rólam photo placeholders when final photos are supplied, verify qualifications/contact details and approve service terms such as package validity, gym admission and cancellation rules. Keep results and testimonials limited to real, approved material.
5. **Finalise privacy and business information.** Hungarian/English privacy review pages now exist in V16, covering website and confirmed Meet/chat channels. Resolve retention deadlines, storage/recording settings, provider arrangements and remaining terms decisions in PRIVACY_REVIEW and LEGAL_REVIEW. Do not add tracking or a generic cookie banner without first checking what the deployed site actually uses.

## Deployment follow-up

- Publish the active V16 public files, not the workspace with old version folders. Keep project notes, tests, build helpers and original working photographs out of the deployment if no public file references them.
- Circular favicons are complete. Social-sharing image/title/description and real-domain metadata remain separate follow-up work.
- Check asset caching/compression with the actual host, measure mobile performance on the deployed URL, and confirm all relative page/image links work at the chosen hosting path. Keep a rollback copy.
- Spot-check changed booking/email handoffs from the real domain; development checks do not cover host policies or third-party browser restrictions. Previously confirmed successful full bookings do not need routine repetition.

## Completed in the device optimization pass

- Generated four WebP widths per original photograph, linked with `srcset`/`sizes`, and preserved the original PNGs for future work. The six largest delivery copies total **842,138 bytes**, down from **12,882,180 bytes** for the originals: **93.5% smaller**. This measures image bytes, not a measured whole-page speed improvement.
- Prioritized the visible homepage/services photo; lazy-loaded below-fold photographs. The gallery opens the large delivery copy, rather than enlarging a small thumbnail.
- Refined small-screen spacing, headings, service prices and buttons; improved tap targets; added safe-area spacing; accommodated landscape phones, form focus, and narrow Calendly widths.
- Reduced pointer-animation work on touch devices, preserved reduced-motion behavior, and prevented the scroll-to-top button from remaining interactive behind open menus/dialogs.
- Replaced repeated SDK resize listeners with one handler that accepts height messages only from the current Calendly frame. Resizing no longer asks the parent page to scroll.
- Structural/link/image-reference checks, JavaScript syntax and existing navigation/contact/clipboard tests pass. Browser appearance and a completed live booking remain the separate checks listed above.
