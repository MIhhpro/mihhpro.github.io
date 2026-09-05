// Native anchors stay usable without JavaScript; enhance with a responsive rail and scroll tracking.
(() => {
  const nav = document.querySelector('.section-nav');
  if (!nav) return;
  const toggle = nav.querySelector('.section-nav-toggle');
  const wide = matchMedia('(min-width: 1480px) and (min-height: 600px)');
  const entries = [...nav.querySelectorAll('a[href^="#"]')].map(link => ({
    link,
    item: link.closest('li'),
    section: document.getElementById(link.hash.slice(1))
  })).filter(entry => entry.section);
  const setOpen = (open, restoreFocus = false) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (restoreFocus) toggle.focus();
  };
  nav.classList.add('is-enhanced');
  toggle.hidden = false;
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !wide.matches) setOpen(false, true);
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) setOpen(false);
  });
  nav.addEventListener('focusout', event => {
    if (!nav.contains(event.relatedTarget)) setOpen(false);
  });
  wide.addEventListener('change', () => {
    // Keep focus on a visible control if the viewport changes while the rail is in use.
    const focusedLink = entries.find(entry => entry.link === document.activeElement);
    if (wide.matches && document.activeElement === toggle) {
      (entries.find(entry => entry.link.getAttribute('aria-current')) || entries[0])?.link.focus();
    }
    setOpen(false, !wide.matches && Boolean(focusedLink));
    scheduleUpdate();
  });
  entries.forEach(({ link, section }) => {
    link.addEventListener('click', event => {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      setOpen(false);
      // Let the native anchor manage scrolling, the URL and browser history.
      section.focus({ preventScroll: true });
    });
  });

  const update = () => {
    const visible = entries.filter(({ section, item }) => {
      const hidden = section.hidden || section.getClientRects().length === 0;
      item.hidden = hidden;
      return !hidden;
    });
    const header = document.querySelector('.site-header');
    const readingLine = Math.max(120, (header?.getBoundingClientRect().bottom || 0) + 32);
    let active = visible[0];
    visible.forEach(entry => {
      if (entry.section.getBoundingClientRect().top <= readingLine) active = entry;
    });
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4) active = visible.at(-1);
    entries.forEach(entry => {
      if (entry === active) entry.link.setAttribute('aria-current', 'location');
      else entry.link.removeAttribute('aria-current');
    });
  };
  let queued = false;
  function scheduleUpdate() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
  }
  addEventListener('scroll', scheduleUpdate, { passive: true });
  addEventListener('resize', scheduleUpdate, { passive: true });
  addEventListener('pageshow', scheduleUpdate);
  // Contact-flow sections appear only once the visitor has chosen a booking or inquiry route.
  const visibilityObserver = new MutationObserver(scheduleUpdate);
  entries.forEach(({ section }) => visibilityObserver.observe(section, { attributes: true, attributeFilter: ['hidden'] }));
  if ('ResizeObserver' in window) {
    const layoutObserver = new ResizeObserver(scheduleUpdate);
    entries.forEach(({ section }) => layoutObserver.observe(section));
  }
  update();
})();
