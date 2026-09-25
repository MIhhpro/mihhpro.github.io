// Exercise interrupted transitions and reduced motion without changing calculator math.
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require.resolve('../macro-calculator.js'), 'utf8');
function setup(reduced = false) {
  let now = 0, nextId = 0;
  const frames = new Map(), listeners = {}, nodes = new Map(), styles = {};
  const choices = { 'macro-unit': 'kg', 'macro-body': 'neutral', 'macro-goal': 'fitness' };
  const animations = [];
  const media = { matches: reduced, addEventListener: (_, fn) => { media.change = fn; } };
  const node = selector => {
    if (!nodes.has(selector)) nodes.set(selector, {
      value: '', textContent: '', setAttribute() {}, classList: { toggle() {} },
      style: { setProperty: (key, value) => { styles[key] = parseFloat(value); } },
      addEventListener: (event, fn) => { listeners[selector + ':' + event] = fn; },
    });
    return nodes.get(selector);
  };
  node('#macro-form').querySelector = selector => selector.includes(':checked')
    ? { value: choices[selector.match(/name="([^"]+)"/)[1]] } : node(selector);
  node('#macro-results').querySelectorAll = () => [0, 1, 2].map(() => ({
    animate: () => { const animation = { cancelled: false, cancel() { this.cancelled = true; } }; animations.push(animation); return animation; },
  }));
  vm.runInNewContext(source, {
    document: { documentElement: { lang: 'en' }, querySelector: node },
    window: { matchMedia: () => media, addEventListener() {} },
    performance: { now: () => now },
    requestAnimationFrame: fn => { frames.set(++nextId, fn); return nextId; },
    cancelAnimationFrame: id => frames.delete(id), setTimeout: () => 1, clearTimeout() {}, Intl,
  });
  return {
    styles, frames, animations, media,
    weight(value) { node('#macro-weight').value = value; listeners['#macro-weight:input'](); },
    goal(value) { choices['macro-goal'] = value; listeners['#macro-form:change']({ target: { name: 'macro-goal' } }); },
    tick(ms) { now += ms; const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(now)); },
  };
}
const normal = setup();
normal.weight('80');
normal.tick(150);
assert.ok(normal.styles['--chart-end'] > 0 && normal.styles['--chart-end'] < 100);
normal.goal('loss');
assert.equal(normal.frames.size, 1, 'Only the latest transition should run');
normal.tick(700);
assert.equal(normal.styles['--chart-end'], 100);
assert.ok(Math.abs(normal.styles['--protein-end'] - 704 / 2400 * 100) < 1e-10);
assert.equal(normal.frames.size, 0);
normal.goal('muscle');
normal.weight('');
assert.equal(normal.frames.size, 0, 'Invalid input cancels animation immediately');
assert.equal(normal.styles['--chart-end'], 0);
assert.ok(normal.animations.every(a => a.cancelled));
normal.weight('80');
normal.tick(100);
normal.media.matches = true;
normal.media.change();
assert.equal(normal.frames.size, 0);
assert.equal(normal.styles['--chart-end'], 100);
assert.ok(normal.animations.every(a => a.cancelled));
const reduced = setup(true);
reduced.weight('80');
reduced.goal('loss');
assert.equal(reduced.frames.size, 0);
assert.equal(reduced.animations.length, 0);
assert.equal(reduced.styles['--chart-end'], 100);
console.log('PASS: chart sweep, interrupted selection, invalid input reset, reduced motion and changing motion preference.');
