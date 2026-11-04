/* Meta Pixel 2784872268573455. No Meta request before advertising consent. */
(() => {
  'use strict';
  const KEY = 'mb-marketing-consent-v1';
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const panel = document.getElementById('marketing-consent');
  const settings = document.getElementById('marketing-settings');
  if (!panel || !settings) return;
  let started = false;
  let granted = false;
  // Set only when the visitor reopens the banner from the footer settings button.
  let focusOrigin = null;
  // Last element the visitor focused outside the banner (link, field, etc.).
  let lastOutsideFocus = null;
  if (document.addEventListener) {
    document.addEventListener('focusin', event => {
      if (!panel.contains || !panel.contains(event.target)) lastOutsideFocus = event.target;
    });
  }

  // Move focus without letting the browser scroll the page (V21 fix: the
  // automatic banner used to send focus to the footer button, which made the
  // whole page jump to the bottom right after Accept/Reject).
  function quietFocus(el) {
    if (!el || typeof el.focus !== 'function') return false;
    if (el.isConnected === false) return false;
    try { el.focus({preventScroll: true}); } catch (_) { return false; }
    return true;
  }

  function closePanel() {
    const active = document.activeElement;
    const focusInside = !!(active && panel.contains && panel.contains(active));
    panel.hidden = true;
    if (!focusInside) return;
    // Reopened from the footer: go back to that button (the visitor is already there).
    if (focusOrigin && quietFocus(focusOrigin)) { focusOrigin = null; return; }
    focusOrigin = null;
    // Automatic first-visit banner: return to whatever the visitor was using, never the footer.
    if (lastOutsideFocus && lastOutsideFocus !== document.body && quietFocus(lastOutsideFocus)) return;
    if (active && typeof active.blur === 'function') active.blur();
  }

  function readChoice() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY));
      if (value && ['granted', 'denied'].includes(value.choice) &&
          Number.isFinite(value.time) && Date.now() >= value.time && Date.now() - value.time < MAX_AGE) return value.choice;
    } catch (_) { /* Storage unavailable: ask again on next page, fail closed. */ }
    return null;
  }

  function startPixel() {
    if (started) return;
    started = true;
    // The supplied Meta bootstrap, executed only after affirmative consent.
    !function(f,b,e,v,n,t,s) {
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
      s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    // Only PageView: disable automatic event detection and do not pass form data.
    window.fbq('set', 'autoConfig', false, '2784872268573455');
    window.fbq('consent', 'grant');
    window.fbq('init', '2784872268573455');
    window.fbq('track', 'PageView');
  }

  function clearMetaCookies() {
    // Remove accessible first-party Meta identifiers; third-party storage is outside this site's control.
    const host = window.location.hostname;
    const parts = host.split('.');
    const domains = [''];
    for (let i = 0; i < parts.length - 1; i++) domains.push(parts.slice(i).join('.'));
    for (const name of ['_fbp', '_fbc']) {
      for (const domain of domains) {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' + (domain ? '; Domain=' + domain : '');
      }
    }
  }

  function apply(choice) {
    if (choice === 'granted') {
      granted = true;
      startPixel();
    } else {
      granted = false;
      if (window.fbq) window.fbq('consent', 'revoke');
      clearMetaCookies();
    }
  }

  function choose(choice) {
    try { localStorage.setItem(KEY, JSON.stringify({choice, time: Date.now()})); } catch (_) {}
    apply(choice);
    closePanel();
    // Unload an already loaded SDK immediately when permission is withdrawn.
    if (choice === 'denied' && started) window.location.reload();
  }

  settings.hidden = false;
  settings.addEventListener('click', () => {
    focusOrigin = settings;
    panel.hidden = false;
    quietFocus(panel.querySelector('button'));
  });
  panel.querySelectorAll('[data-marketing]').forEach(button => {
    button.addEventListener('click', () => choose(button.dataset.marketing));
  });
  // A rejection in another tab revokes this page as well.
  window.addEventListener('storage', event => {
    if (event.key !== KEY && event.key !== null) return;
    const choice = readChoice();
    if (granted && choice !== 'granted') {
      apply('denied');
      window.location.reload();
    }
  });
  const choice = readChoice();
  if (choice) apply(choice);
  else panel.hidden = false;
})();
