const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const events = new Map();
const raf = [];
let mutation;
function element() {
  const attrs = new Map();
  const classes = new Set();
  return {
    hidden: false, handlers: {},
    classList: { add: name => classes.add(name), toggle: (name, on) => on ? classes.add(name) : classes.delete(name), contains: name => classes.has(name) },
    setAttribute: (key, value) => attrs.set(key, value), getAttribute: key => attrs.get(key), removeAttribute: key => attrs.delete(key),
    addEventListener(type, fn) { this.handlers[type] = fn; },
    focus() { doc.activeElement = this; },
  };
}
const sections = [0, 600, 1200, 1800].map(top => Object.assign(element(), {
  top,
  getBoundingClientRect() { return { top: this.top - context.scrollY }; },
  getClientRects() { return this.hidden ? [] : [{}]; }
}));
sections[2].hidden = true;
const links = sections.map((section, i) => Object.assign(element(), { hash: `#part-${i}`, item: element(), closest() { return this.item; } }));
const toggle = element();
toggle.setAttribute('aria-expanded', 'false');
const nav = Object.assign(element(), {
  querySelector: () => toggle,
  querySelectorAll: () => links,
  contains: target => target === toggle || target === nav || links.includes(target),
});
const doc = {
  activeElement: null,
  documentElement: { scrollHeight: 2600 },
  querySelector: selector => selector === '.section-nav' ? nav : { getBoundingClientRect: () => ({ bottom: 84 }) },
  getElementById: id => sections[Number(id.split('-')[1])],
  addEventListener: (event, callback) => events.set(`document:${event}`, callback)
};
const wide = { matches: false, addEventListener: (_, callback) => events.set('media', callback) };
const context = {
  document: doc, window: {}, matchMedia: () => wide, scrollY: 0, innerHeight: 700,
  addEventListener: (event, callback) => events.set(event, callback),
  requestAnimationFrame: callback => raf.push(callback),
  MutationObserver: class { constructor(callback) { mutation = callback; } observe() {} },
};
vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname, '../section-nav.js'), 'utf8'), context);
function flush() { while (raf.length) raf.shift()(); }
function current(index) {
  assert.deepEqual(links.map(link => link.getAttribute('aria-current') || null), links.map((_, i) => i === index ? 'location' : null));
}
current(0);
assert.equal(links[2].item.hidden, true, 'unavailable booking section is absent');
context.scrollY = 1400; events.get('scroll')(); flush(); current(1);
sections[2].hidden = false; mutation(); flush(); current(2);
assert.equal(links[2].item.hidden, false);
context.scrollY = 1900; events.get('scroll')(); flush(); current(3);
context.scrollY = 0; events.get('pageshow')(); flush(); current(0);
toggle.handlers.click(); assert.equal(toggle.getAttribute('aria-expanded'), 'true');
nav.handlers.keydown({ key: 'Escape' }); assert.equal(toggle.getAttribute('aria-expanded'), 'false');
assert.equal(doc.activeElement, toggle);
toggle.handlers.click(); links[1].handlers.click({ button: 0 });
assert.equal(doc.activeElement, sections[1], 'anchor navigation moves keyboard focus to its section');
assert.equal(toggle.getAttribute('aria-expanded'), 'false');
toggle.handlers.click(); events.get('document:click')({ target: {} });
assert.equal(toggle.getAttribute('aria-expanded'), 'false');
toggle.handlers.click(); nav.handlers.focusout({ relatedTarget: sections[0] });
assert.equal(toggle.getAttribute('aria-expanded'), 'false');
doc.activeElement = toggle; wide.matches = true; events.get('media')(); flush();
assert.equal(doc.activeElement, links[0], 'switching to the rail keeps focus visible');
wide.matches = false; events.get('media')(); flush(); assert.equal(doc.activeElement, toggle);
console.log('PASS: section tracking, hidden booking sections, restored scroll, keyboard focus, compact disclosure and responsive focus.');
