// Optional integration check against Calendly's actual public widget script.
// Usage: node tests/calendly-prefill.cjs /path/to/downloaded/widget.js
// No browser, network calls, deferred iframe messages or bookings are needed.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { setup, Element } = require('./contact-flow.cjs');
if (!process.argv[2]) throw new Error('Pass the path to a downloaded Calendly widget.js');
const widget = fs.readFileSync(process.argv[2], 'utf8');

async function run() {
  for (const service of ['consult', 'pt', 'online']) {
    const t = setup(service);
    t.doc.readyState = 'complete';
    t.win.location = new URL('http://127.0.0.1:8150/contact.html');
    t.win.navigator = t.context.navigator = { userAgent: 'Desktop', platform: 'Win32' };
    t.win.removeEventListener = () => {};
    t.doc.createElement = tag => {
      const element = new Element();
      element.tagName = tag;
      element.appendChild = child => { element.children[child.tagName] = child; return child; };
      element.getAttribute = key => element.attrs[key];
      return element;
    };
    const embed = t.nodes['#calendly-embed'];
    embed.getAttribute = key => embed.attrs[key];
    embed.appendChild = child => { embed.children[child.tagName] = child; return child; };
    t.form.children['#fname'].value = ' Anna Mária ';
    t.form.children['#lname'].value = ' Tűrő-Nagy ';
    t.form.children['#email'].value = ' anna+coaching@example.test ';
    vm.runInNewContext(widget, t.context);
    t.win.Calendly = t.context.Calendly;
    await t.form.fire('submit');
    const iframe = embed.querySelector('iframe');
    assert.ok(iframe, `${service}: real widget created iframe`);
    const url = new URL(iframe.src);
    assert.equal(url.searchParams.get('name'), 'Tűrő-Nagy Anna Mária');
    assert.equal(url.searchParams.get('first_name'), 'Anna Mária');
    assert.equal(url.searchParams.get('last_name'), 'Tűrő-Nagy');
    assert.equal(url.searchParams.get('email'), 'anna+coaching@example.test');
    assert.ok(url.searchParams.get('a1').includes('Erősödnék. & Kérdés?\nMásodik sor.'));
    assert.equal(url.searchParams.get('embed_type'), 'Inline');
    assert.equal(url.searchParams.get('primary_color'), 'd4a843');
    assert.equal(url.searchParams.get('background_color'), '100f0c');
    assert.equal(url.searchParams.get('text_color'), 'f5f0e8');
    // Deliberately do not fire iframe.load: the first request already has all values.
  }
  console.log('PASS: actual Calendly widget embeds name, split names, email and notes before deferred messages, across all three services.');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
