# V15 publishing checklist

The domain is already owned; connect it later. No hosting or DNS changes were made during this work.

## Finish before opening the site to clients

1. **Resolve Calendly's input contrast.** The owner-approved black/gold theme and automatic prefill remain. Calendly's pale text on light required fields is still an unresolved external-widget issue. Do not silently change the entire theme again. Recheck the current Calendly options or raise the field-specific issue with Calendly before launch.
2. **Complete a real booking journey for each service.** Verify consultation, personal training and online coaching: available times, timezone, prefilled name/email, preparation notes, confirmation email, calendar entry, cancellation/rescheduling and the online meeting link. Check the Training Program/general-question email drafts and copy fallback too. Automated tests do not book appointments or prove email delivery.
3. **Run the final browser/device pass.** Check all eight pages on iPhone Safari, Android Chrome, tablet and desktop browsers, in portrait and landscape. Include 320, 375/390, 768/820, 1024, 1440 and 1920 CSS-pixel widths; 200% text enlargement; keyboard navigation; on-screen keyboard; slower mobile connection; reduced motion; and long names/email addresses. Confirm no clipped headings, sideways scrolling, covered controls or broken gallery close actions. Device-specific code improvements are complete, but a visual/physical-device QA pass was not performed during this turn.
4. **Finish public-facing content.** Replace the three Rólam photo placeholders when final photos are supplied, verify qualifications/contact details and approve service terms such as package validity, gym admission and cancellation rules. Keep results and testimonials limited to real, approved material.
5. **Complete privacy and business information.** Prepare a Hungarian privacy notice matching the actual contact form, Calendly, Gmail and any hosting/analytics providers. Confirm retention, contact details and the business's applicable terms with appropriate professional review. [European Commission guidance on informing people about data processing](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/obligations_en). Do not add tracking or a generic cookie banner without first checking what the deployed site actually uses.

## When the hosting and domain are ready

- Publish the active V15 public files, not the workspace with old version folders. Keep project notes, tests, build helpers and original working photographs out of the deployment if no public file references them.
- Enable HTTPS, choose one canonical hostname (with or without `www`) and redirect the other. Then add canonical URLs, a sitemap using the real domain, robots rules and a useful 404 page. Submit the sitemap in Search Console. [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- Add a favicon and social-sharing image/title/description, using the final brand assets and real site URLs.
- Check asset caching/compression with the actual host, measure mobile performance on the deployed URL, and confirm all relative page/image links work at the chosen hosting path. Keep a rollback copy.
- Re-run the booking and email checks from the real domain; development checks do not cover host policies or third-party browser restrictions.

## Completed in the device optimization pass

- Generated four WebP widths per original photograph, linked with `srcset`/`sizes`, and preserved the original PNGs for future work. The six largest delivery copies total **842,138 bytes**, down from **12,882,180 bytes** for the originals: **93.5% smaller**. This measures image bytes, not a measured whole-page speed improvement.
- Prioritized the visible homepage/services photo; lazy-loaded below-fold photographs. The gallery opens the large delivery copy, rather than enlarging a small thumbnail.
- Refined small-screen spacing, headings, service prices and buttons; improved tap targets; added safe-area spacing; accommodated landscape phones, form focus, and narrow Calendly widths.
- Reduced pointer-animation work on touch devices, preserved reduced-motion behavior, and prevented the scroll-to-top button from remaining interactive behind open menus/dialogs.
- Replaced repeated SDK resize listeners with one handler that accepts height messages only from the current Calendly frame. Resizing no longer asks the parent page to scroll.
- Structural/link/image-reference checks, JavaScript syntax and existing navigation/contact/clipboard tests pass. Browser appearance and a completed live booking remain the separate checks listed above.
