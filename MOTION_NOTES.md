# V18 motion refinements

Version context: maintained in V18 from 2026-09-18, copied from V16. Dated V16/V15 references below describe inherited history, not the active editing folder. No V18 deployment is implied.

Updated 2026-09-12. Restrained refinement requested by the owner; keep the existing colours, layout, text, images and static-site architecture. No downloaded components, new image assets, dependencies or external scripts were added.

## References

Reviewed the five owner-provided sites: [Beautiful UI](https://www.beautifului.dev/), [beUI](https://beui.dev/), [Rare UI](https://www.rareui.com/), [Transitions.dev](https://transitions.dev/) and [shadcn/ui](https://ui.shadcn.com/). The relevant inspiration was brief button feedback, panel expansion, restrained card movement and menu entry. The code here is an original adaptation for the site's native HTML/CSS/JavaScript, not a copied React component. Do not introduce an entire component framework just for these effects.

## Changes and constraints

- Reveal travel reduced from 24px to 14px and duration from 800ms to 520ms. Sibling staggering is capped at 135ms and restarts per parent. Phone widths use 8px / 380ms with no delay. Keyboard focus reveals its containing blocks immediately; existing no-JS/failure visibility remains.
- Native `details.question` answers expand in 280ms and close in 220ms. Measure actual heights rather than imposing a text-height cap; release sizing on finish. Rapid reversal cancels the previous animation. Resizing and reduced-motion changes settle the requested state. Closing answer content is inert during the brief exit.
- Native details activation remains when the Web Animations API is unavailable or reduced motion is requested. Existing legacy `.faq-q` controls are unchanged.
- Gold CTA buttons have a single subtle sheen on mouse hover or keyboard focus, plus a small press response. No looping sheen or automatic attention effects. Touch does not inherit sticky hover movement.
- Service cards lift 3px instead of 6px, with a restrained existing-icon movement on a fine pointer. The mobile menu has a brief 8px entry. Gallery overlay/panel transitions are shortened to 260/320ms; image dimensions and gallery logic remain unchanged.
- All new decorative effects respect reduced motion. Existing fonts, photo assets, palette, prices, content, languages and booking paths are preserved.

## Maintenance and verification

Main source files: `script.js` and `styles.css`. Shared asset cache versions are set in `tools/build-languages.py`; update the existing replacements there, because an earlier replacement in the same function can be overwritten. Current revision is `16.1` for both assets, across all 22 generated/source HTML pages.

Run the README checks plus `node tests/motion.cjs`. The motion test covers reversal, long-answer sizing cleanup, closing focus protection, resize, reduced motion and the native fallback. Language checks assert the current shared asset versions to catch stale-generator regressions.

Browser checks are local in the Codex browser, not physical iPhone Safari/Brave or Android certification. Before claiming final visual checks, verify the loaded script URL and DOM `--reveal-delay` values: browser cache initially retained the previous version until the generator's version replacements were corrected. No live deployment occurred.

Verified locally: all 22 HTML pages and ten language pairs, current cache references, contact/language/section navigation and the motion test pass. After the cache correction, inspected the English desktop homepage at 1440px, the English coaching FAQs and menu at 390px, and Hungarian gallery opening. A long answer returns to natural height; a completed keyboard close leaves no open question or fixed sizing. Local browser error log was empty. Reduced-motion/resize interruption and unsupported-API fallback were tested in the isolated motion test, not through physical-device settings.
