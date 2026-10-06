window.SITE_CONFIG = Object.freeze({
  // Owner-supplied public event links; no account credentials belong here.
  // Empty links deliberately use the email enquiry flow; no calendar is loaded.
  calEvents: Object.freeze({
    consult: "https://cal.com/bence-mihaly-gjfcyz/konz",
    pt: "https://cal.com/bence-mihaly-gjfcyz/edzes",
    online: "https://cal.com/bence-mihaly-gjfcyz/online"
  }),
  // English copy of the same 20-minute consultation; Hungarian route stays intact.
  calEventsEn: Object.freeze({
    consult: "https://cal.com/bence-mihaly-gjfcyz/free-consultation"
  }),
  inquiryEmail: "mihaly.bence.fitness@gmail.com"
});
