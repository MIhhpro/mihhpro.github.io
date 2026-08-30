# Calendly setup for V12

1. Create three separate one-on-one Calendly event types:
   - Introductory consultation
   - Personal training
   - Online coaching
2. Connect the calendar that should block unavailable times.
3. Set the appointment duration, availability, buffers, minimum notice, location, and confirmation settings.
4. Add these invitee questions in this exact order:
   - Which service are you interested in?
   - Phone number (optional)
   - Tell me briefly about your goals
5. Give the event types distinct names and Calendly colors so they are easy to identify in Calendly. Connected external calendars may still use the calendar's default color, so keep the service name in every event title.
6. Copy each event's public scheduling link.
7. Paste the three links into `site-config.js` under `calendlyEvents`.
8. Make a test booking for each service and verify the calendar event, confirmation email, cancellation, and rescheduling links.

The site itself remains static and can be published with GitHub Pages. Calendly stores and manages the booking data.
