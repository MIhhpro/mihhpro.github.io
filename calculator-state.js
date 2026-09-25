// One-use, same-tab language handoff. No input data goes into URLs or requests.
(() => {
  'use strict';
  const key = 'mb-calculator-language-handoff-v1';
  const ttl = 60000;
  const adapters = new Map();
  const current = new URL(window.location.href);
  const counterpart = current.pathname.endsWith('/segedletek.html') ? 'resources-en.html' :
    current.pathname.endsWith('/resources-en.html') ? 'segedletek.html' : null;
  if (!counterpart) return;
  let pending = null;
  try {
    const raw = sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
    if (raw && raw.length < 4096) {
      const saved = JSON.parse(raw);
      const age = Date.now() - saved.created;
      if (saved.version === 1 && saved.target === current.pathname && age >= 0 && age <= ttl) pending = saved.values;
    }
  } catch (_) { /* Storage may be blocked; ordinary navigation still works. */ }
  window.CalculatorState = {
    register(name, adapter) {
      if (!['macro', 'bmi'].includes(name)) return;
      adapters.set(name, adapter);
      if (pending && pending[name]) {
        adapter.restore(pending[name]);
        delete pending[name];
      }
    },
  };
  document.querySelectorAll('.language-switch a[data-language]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.defaultPrevented || link.target === '_blank') return;
      const target = new URL(link.href, current);
      if (target.origin !== current.origin || target.pathname !== new URL(counterpart, current).pathname) return;
      const values = {};
      adapters.forEach((adapter, name) => { values[name] = adapter.capture(); });
      try {
        const raw = JSON.stringify({ version: 1, target: target.pathname, created: Date.now(), values });
        sessionStorage.setItem(key, raw);
        window.setTimeout(() => {
          try { if (sessionStorage.getItem(key) === raw) sessionStorage.removeItem(key); } catch (_) {}
        }, ttl);
      } catch (_) { /* Do not prevent switching languages if storage is unavailable. */ }
    }, true);
  });
})();
