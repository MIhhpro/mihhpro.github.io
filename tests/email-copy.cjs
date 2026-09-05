const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../script.js'), 'utf8');
const start = source.indexOf('const fallbackCopy =');
const snippet = source.slice(start, source.indexOf('// ──', start));

async function check({ secure = true, modern = 'success', legacy = 'success' }) {
  let handler, timer, copied, cleaned = false, restored = false;
  const classes = new Set();
  const label = { textContent: 'Email cím másolása' };
  const button = {
    dataset: { email: 'mihaly.bence.fitness@gmail.com' },
    querySelector: () => label,
    addEventListener: (_, fn) => { handler = fn; },
    classList: { toggle: (name, on) => on ? classes.add(name) : classes.delete(name), remove: name => classes.delete(name) },
    focus: () => { restored = true; }
  };
  const helper = { style: {}, setAttribute() {}, select() {}, remove() { cleaned = true; } };
  const document = {
    activeElement: button, body: { appendChild() {} },
    querySelector: selector => selector === '.js-copy-email' ? button : null, createElement: () => helper,
    execCommand() {
      if (legacy === 'throw') throw new Error('Clipboard unavailable');
      if (legacy === 'failure') return false;
      copied = helper.value; return true;
    }
  };
  vm.runInNewContext(snippet, {
    document,
    navigator: { clipboard: { async writeText(value) {
      if (modern === 'denied') throw new Error('Permission denied');
      copied = value;
    } } },
    window: { isSecureContext: secure, setTimeout(fn) { timer = fn; } }
  });
  await handler();
  const successful = (secure && modern === 'success') || legacy === 'success';
  assert.equal(classes.has('is-copied'), successful);
  assert.equal(label.textContent, successful ? 'Email cím másolva ✓' : 'Jelöld ki és másold a fenti címet.');
  if (successful) assert.equal(copied, button.dataset.email);
  if (!secure || modern === 'denied') {
    assert.ok(cleaned, 'temporary clipboard field is removed even on failure');
    assert.ok(restored, 'keyboard focus returns to the copy button');
  }
  timer(); assert.equal(label.textContent, 'Email cím másolása');
}
(async () => {
  await check({});
  await check({ modern: 'denied' });
  await check({ modern: 'denied', legacy: 'throw' });
  await check({ modern: 'denied', legacy: 'failure' });
  await check({ secure: false });
  console.log('PASS: email copying, denied clipboard fallback, unavailable clipboard feedback, cleanup and keyboard focus.');
})().catch(error => { console.error(error); process.exitCode = 1; });
