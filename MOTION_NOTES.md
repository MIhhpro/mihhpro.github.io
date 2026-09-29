# Motion and progressive enhancement

Consolidated 2026-09-28. Preserve native static-site behavior, existing design and reduced-motion support. No component framework or external animation package is needed.

## Shared interactions

- Reveal travel reduced from 24px to 14px and duration from 800ms to 520ms. Sibling staggering is capped at 135ms and restarts per parent. Phone widths use 8px / 380ms with no delay. Keyboard focus reveals its containing blocks immediately; existing no-JS/failure visibility remains.
- Native `details.question` answers expand in 280ms and close in 220ms. Measure actual heights rather than imposing a text-height cap; release sizing on finish. Rapid reversal cancels the previous animation. Resizing and reduced-motion changes settle the requested state. Closing answer content is inert during the brief exit.
- Native details activation remains when the Web Animations API is unavailable or reduced motion is requested. Existing legacy `.faq-q` controls are unchanged.
- Gold CTA buttons have a single subtle sheen on mouse hover or keyboard focus, plus a small press response. No looping sheen or automatic attention effects. Touch does not inherit sticky hover movement.
- Service cards lift 3px instead of 6px, with a restrained existing-icon movement on a fine pointer. The mobile menu has a brief 8px entry. Gallery overlay/panel transitions are shortened to 260/320ms; image dimensions and gallery logic remain unchanged.
- All new decorative effects respect reduced motion. Existing fonts, photo assets, palette, prices, content, languages and booking paths are preserved.


## Resource motion

Macro ring: initial sweep 650ms, later transitions 420ms, interruptible from the current drawn position. Result-card lift 4px/360ms with 45ms stagger; selection colors 180ms. Numbers update immediately, invalid values clear, no looping effects. Reduced-motion changes cancel/settle effects. See MACRO_CALCULATOR.

BMI marker: 500ms transition, reduced-motion support, scale clamps without changing the numeric/category result. See BMI_CALCULATOR. Formulas/data handling must not change as a side effect of decorative edits.

## Maintenance and verification

Main shared files: `script.js`, `styles.css`; calculator effects are page-specific. Shared cache references are owned by `tools/build-languages.py` (currently styles 19.9, script 19.6), not the historical 16.1 values. Check final generated references because later replacements can overwrite earlier cache edits.

`node tests/motion.cjs` covers FAQ reversal, long-answer cleanup, focus protection, resize/reduced motion and native fallback. `node tests/macro-motion.cjs` covers chart timing/cancellation; existing formula checks must still pass. Browser-test changed states and verify loaded asset versions to avoid mistaken cache results.

Earlier local browser checks covered desktop/phone FAQs, menu and HU gallery; isolated tests covered interruption/fallback. They were not physical-device reduced-motion certification or live deployment. Current release state lives in PUBLISHING_CHECKLIST.

## Design references used in earlier work

The owner supplied [Beautiful UI](https://www.beautifului.dev/), [beUI](https://beui.dev/), [Rare UI](https://www.rareui.com/), [Transitions.dev](https://transitions.dev/) and [shadcn/ui](https://ui.shadcn.com/). The native effects were an original adaptation of restrained feedback, not copied React components. These are historical inspiration references, not requirements to install their libraries or revisit their sites for routine maintenance.
