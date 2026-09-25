// Restore the reading position across a same-tab language change, not just a stale URL hash.
(() => {
  'use strict';
  const key = 'mb-language-position-v1';
  const ttl = 60000;
  const links = document.querySelectorAll('.language-switch a[data-language]');
  const location = new URL(window.location.href);
  let pending;
  try {
    const raw = sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
    if (raw && raw.length < 4096) {
      const saved = JSON.parse(raw);
      const age = Date.now() - saved.created;
      if (saved.target === location.pathname && age >= 0 && age <= ttl &&
          Number.isFinite(saved.y) && saved.y >= 0 && Number.isFinite(saved.offset) &&
          Number.isFinite(saved.fraction) && saved.fraction >= 0 && saved.fraction <= 1 &&
          typeof saved.anchor === 'string') pending = saved;
    }
  } catch (_) { /* Native section links remain the fallback if storage is blocked. */ }
  const readingLine = () => Math.max(120, (document.querySelector('.site-header')?.getBoundingClientRect().bottom || 0) + 32);
  const visible = element => element && element.getClientRects().length &&
    !element.closest('[hidden], [aria-hidden="true"], .visually-hidden, .section-nav');
  function capture() {
    const line = readingLine();
    let anchor = null, nearest = -Infinity;
    document.querySelectorAll('main [id]').forEach(element => {
      if (!visible(element)) return;
      const rect = element.getBoundingClientRect();
      if (rect.height > 0 && rect.top <= line && rect.top > nearest) {
        anchor = element;
        nearest = rect.top;
      }
    });
    const rect = anchor?.getBoundingClientRect();
    const proportional = Boolean(rect && rect.height > innerHeight && line < rect.bottom);
    return {
      y: scrollY, anchor: anchor?.id || '',
      offset: rect ? line - rect.top : 0,
      fraction: proportional ? (line - rect.top) / rect.height : 0,
      proportional,
      bottom: scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 4,
      section: anchor?.closest('section[id]')?.id || '',
    };
  }
  links.forEach(link => {
    link.addEventListener('click', event => {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.defaultPrevented ||
          link.target === '_blank' || link.dataset.language === document.documentElement.lang) return;
      const target = new URL(link.href, document.baseURI);
      if (target.origin !== location.origin) return;
      const position = capture();
      // Even without storage, go to the section actually being read, not the last clicked anchor.
      target.hash = position.y <= 8 ? '' : position.section;
      link.setAttribute('href', target.pathname + target.search + target.hash);
      try {
        const raw = JSON.stringify({ ...position, target: target.pathname, created: Date.now() });
        sessionStorage.setItem(key, raw);
        window.setTimeout(() => {
          try { if (sessionStorage.getItem(key) === raw) sessionStorage.removeItem(key); } catch (_) {}
        }, ttl);
      } catch (_) {}
    }, true);
  });
  function restore() {
    if (!pending) return;
    const saved = pending;
    pending = null;
    let cancelled = false;
    const started = Date.now();
    const events = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
    const cancel = () => { cancelled = true; };
    events.forEach(type => window.addEventListener(type, cancel, { passive: true }));
    const cleanup = () => events.forEach(type => window.removeEventListener(type, cancel));
    function apply() {
      if (cancelled || Date.now() - started > 2000) return;
      const anchor = document.getElementById(saved.anchor);
      let y = saved.y;
      if (saved.y <= 8) y = 0;
      else if (saved.bottom) y = document.documentElement.scrollHeight - innerHeight;
      else if (visible(anchor)) {
        const rect = anchor.getBoundingClientRect();
        y = scrollY + rect.top + (saved.proportional ? saved.fraction * rect.height : saved.offset) - readingLine();
      }
      // 'instant' also overrides the site's normal smooth anchor scrolling.
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
    }
    // Run after native fragment scrolling, calculator restoration and the first layout.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      apply();
      if (document.fonts?.ready) document.fonts.ready.then(() => { apply(); cleanup(); });
      else cleanup();
    }));
    window.setTimeout(cleanup, 2000);
  }
  window.addEventListener('pageshow', restore);
  if (document.readyState === 'complete') restore();
})();
