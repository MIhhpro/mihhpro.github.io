# Privacy notice — implementation and confirmation notes

Prepared 2026-09-12 in V16. No deployment or external message was sent. Public files: `adatkezeles.html`, `privacy-en.html`, `privacy-hu.txt`, `privacy-en.txt`. Every footer has a notice link in the page language; contact also links before continuing. Native language switching, section navigation and printing are preserved.

The source is `tools/privacy-content.json`; regenerate with `tools/build-languages.py` (also rebuilds privacy and 404 pages), or `tools/build-privacy.py` for only the notice. **It is a review copy**, with explicit operational gaps and noindex, until the actual practices below are confirmed. Do not remove its review wording without resolving those gaps. Both languages must stay consistent.

## Facts verified from this source version

- Controller: Mihály Bence Egyéni Vállalkozó; 2370 Dabas, Toldi Miklós utca 46.; tax number supplied as 91565958-1-33; contact mihaly.bence.fitness@gmail.com.
- Static GitHub Pages hosting, Google Fonts requests on page load, and external Calendly CSS on opening Contact. The Calendly script/calendar loads after choosing an appointment service and submitting the form.
- Typing alone does not transmit the form contents. Opening the calendar passes name/email/service/package/optional phone/message before final booking. Prefill values appear in third-party URL parameters; never claim they remain private to the local browser at that stage.
- Gmail drafts transfer content to Google when opened, even before the visitor sends the email. Copying uses the clipboard. The page has no server form handler, analytics code, advertising pixel, visitor account, newsletter, photo upload or website payment.
- Website-owned code does not persist form data or language preferences in cookies/localStorage. Browser autofill/history and third-party storage remain separate. Do not claim the whole experience is cookie-free.
- The map is an external link to the gym's existing listing, not an embedded map. Google Business/listing/search tasks were declined; relevant Google Fonts/Gmail privacy disclosures remain necessary.

## Details still needed from the owner

Owner confirmed on 2026-09-12: Google Meet for video calls; Messenger, WhatsApp, Telegram, Viber and Signal for chats. He does not intentionally download client photos/videos or maintain a separate personal archive, and views them while available in the conversation. These facts are included in both notices. His belief that media exists only on provider servers and necessarily disappears everywhere when a client deletes it must not be repeated: apps can store device/cache/backup copies, and deletion scope differs. Signal explicitly stores message history on users' devices.

- Confirm actual retention for enquiries, bookings, client conversations and health/photos/videos. The notice currently sets out review criteria rather than inventing precise deletion periods or claiming automated deletion exists.
- Confirm app media auto-save, linked-device and backup settings, any recording/transcription/AI features, and additional recipients such as an accountant. The named client applications are now confirmed; own-side deletion deadlines after review/end of coaching are still needed.
- Verify the actual GitHub/Calendly/Google account arrangements, processor agreements where applicable, recipients and international-transfer mechanisms. Free Gmail must not be described as an already-contracted Workspace processor.
- Review remote Google Fonts legal basis and any cookie/third-party consent needs against actual loading behavior. The contact form's action is not blanket marketing-cookie or health-data consent. No generic consent checkbox or cookie banner was invented.
- Identify the applicable sole-trader tax-record retention rule; do not automatically apply the Accounting Act's eight-year period to all records or chats. Add exact periods once verified for the documents actually used.
- Make the real deletion, access-request, security and health-data intake practices match the final notice. Keep legal review proportionate to the actual workflow; merely uploading the notice is not proof of compliance.

## GitHub policy finding (2026-09-12)

Local validation: 22-page structure/link/anchor/label checks passed; all ten language pairs, privacy footer/contact links and the six named communication services in both pages/downloads passed. Simulated language and contact-flow checks passed, including booking prefill and prepared email routes. No browser/device appearance test or live deployment was performed.

The official Pages rule addresses running an online business and websites primarily facilitating commercial transactions, not only checkout or where money changes hands. This site's paid packages and booking/enquiry handoffs could fit that restriction. There is no explicit exemption for manually issued invoices, off-site payments or sole traders. This is an interpretation of the published wording, not a GitHub enforcement decision. Obtain written confirmation from GitHub Support or use a host that explicitly permits the business use. No host migration or support message is authorised by this review.

## Sources checked

- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [GDPR, especially Articles 5, 6, 9, 12–22 and 44–49](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [GitHub privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [Calendly privacy notice](https://calendly.com/legal/privacy-notice)
- [Google Fonts privacy information](https://developers.google.com/fonts/faq/privacy)
- [Google transfer frameworks](https://policies.google.com/privacy/frameworks?hl=en)
- [NAIH contact](https://naih.hu/ugyfelszolgalat-kapcsolat)
- [Signal privacy and device storage](https://signal.org/legal/)
- [Telegram privacy and deletion](https://telegram.org/privacy)
- [WhatsApp EEA privacy](https://www.whatsapp.com/legal/privacy-policy-eea)
- [Viber privacy](https://www.viber.com/en/terms/viber-privacy-policy/)
