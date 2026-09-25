/* Native details works without JS; enhancement adds dismissal and keyboard entry. */
(() => {
  const groups = [...document.querySelectorAll('.nav-dropdown')];
  const closeOthers = (keep) => groups.forEach(group => { if (group !== keep) group.open = false; });
  groups.forEach(group => {
    const trigger = group.querySelector('summary');
    group.addEventListener('toggle', () => { if (group.open) closeOthers(group); });
    trigger.addEventListener('click', () => closeOthers(group));
    trigger.addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown') return;
      event.preventDefault();
      closeOthers(group);
      group.open = true;
      group.querySelector('a')?.focus();
    });
    group.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !group.open) return;
      event.preventDefault();
      group.open = false;
      trigger.focus();
    });
    group.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { group.open = false; }));
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-dropdown')) closeOthers();
  });
  document.addEventListener('focusin', event => {
    closeOthers(event.target.closest('.nav-dropdown'));
  });
  matchMedia('(max-width: 1180px)').addEventListener('change', () => closeOthers());
})();
