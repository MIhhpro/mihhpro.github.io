# V13 project notes

## Current service routes

- Introductory consultation: Calendly event configured as `consult`.
- Personal training: Calendly event configured as `pt`.
- Online coaching: Calendly event configured as `online`.
- Other questions: prepared email route; no calendar is shown.

The former standalone custom training-plan service has been removed. A training program may still be described as part of personal training or online coaching, but it is not offered as an independent product.

## Verified professional facts

- Training history began in September 2017; current public wording states nine years of training as of 2026.
- Completed IWI Fitness Instruktor, IWI Személyi Edző, and IWI MES Trainer qualifications.
- Do not describe the nine years as nine years of professional coaching experience.
- In-person training location: Victory Fitness Békásmegyer, 1039 Budapest, Hatvany Lajos utca 10. (District III).

## Current public prices

- Introductory consultation: free.
- Personal training: 11,000 Ft per session.
- Ten-session package: 100,000 Ft.
- Online coaching: starting from 8,000 Ft per month.

## Important configuration

- Calendly links and the inquiry email live in `site-config.js`.
- The three appointment routes temporarily use the same demo Calendly link.
- Replace each link when the final Calendly event types are ready.
- The public site stays static and GitHub Pages compatible; Calendly manages bookings.

## Contact flow

1. The visitor enters their name, email, optional phone number, and chooses a service.
2. Appointment services open the correct Calendly event with the known details prefilled.
3. Other questions offer a prefilled Gmail compose window and a provider-neutral copy-to-clipboard fallback containing the visitor's contact details.

## Visual direction

Continue the existing dark charcoal, warm gold, cream, and muted green palette. Use condensed display headings, restrained rounded cards, thin warm borders, and real photography. Avoid bright white surfaces and generic dashboard styling.

The V13 services and personal-training heroes now use distinct editorial layouts within the same visual system. The homepage profile card uses restrained pointer depth rather than an exaggerated tilt. Keep future motion subtle and respect reduced-motion preferences.

The contact profile currently uses `assets/professional.png` as a temporary portrait. Preserve its crop, overlay, and hover animation when replacing the image later.
