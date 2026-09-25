const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require.resolve('../calculator-state.js'), 'utf8');
const key = 'mb-calculator-language-handoff-v1';
const storage = new Map();
function page(name, options = {}) {
  let now = 100000;
  const links = ['segedletek.html', 'resources-en.html'].map(name => ({ href: `https://example.test/site/${name}#bmi`, handlers: [], addEventListener: (_, fn) => {}, target: '' }));
  links.forEach(link => { link.addEventListener = (_, fn) => link.handlers.push(fn); });
  const timers = [];
  const window = { location: { href: `https://example.test/site/${name}#bmi` }, setTimeout: fn => timers.push(fn) };
  vm.runInNewContext(source, { window, document: { querySelectorAll: () => links }, URL, Map,
    Date: { now: () => now }, sessionStorage: {
      getItem: k => { if (options.blocked) throw Error('blocked'); return storage.get(k); },
      removeItem: k => storage.delete(k), setItem: (k,v) => { if(options.blocked) throw Error('blocked'); storage.set(k,v); },
    },
  });
  return { window, timers, click: (index, event = {}) => links[index].handlers.forEach(fn => fn({button:0, ...event})), links };
}
const hu = page('segedletek.html');
const original = { macro: {weight:'80,5',unit:'kg',body:'ectomorph',goal:'loss',kg:80.5}, bmi: {weight:'176.36981',height:'70.866142',unit:'imperial',kg:80,cm:180} };
for (const name of ['macro','bmi']) hu.window.CalculatorState.register(name,{capture:()=>original[name],restore:()=>assert.fail('Fresh page must not restore')});
hu.click(0); assert.equal(storage.size,0,'Current-language click should not persist values');
hu.click(1,{ctrlKey:true}); assert.equal(storage.size,0,'New-tab actions must not leave a handoff');
hu.click(1);
assert.equal(storage.size,1);
assert.equal(hu.links[1].href,'https://example.test/site/resources-en.html#bmi','Measurements never enter the URL');
const en = page('resources-en.html');
assert.equal(storage.size,0,'Read-once handoff is removed before restoration');
for (const name of ['macro','bmi']) en.window.CalculatorState.register(name,{capture:()=>null,restore:value=>assert.equal(JSON.stringify(value),JSON.stringify(original[name]))});
hu.click(1); hu.timers.at(-1)(); assert.equal(storage.size,0,'An abandoned switch expires on the source page');
for (const payload of ['{invalid', JSON.stringify({version:1,created:1,target:'/site/resources-en.html',values:original}), JSON.stringify({version:1,created:100000,target:'/site/other.html',values:original})]) {
  storage.set(key,payload);
  const target=page('resources-en.html');
  target.window.CalculatorState.register('macro',{capture:()=>null,restore:()=>assert.fail('Stale/malformed/wrong-target state should be discarded')});
  assert.equal(storage.size,0);
}
const blocked = page('segedletek.html',{blocked:true});
blocked.window.CalculatorState.register('macro',{capture:()=>original.macro,restore:()=>{}});
assert.doesNotThrow(()=>blocked.click(1));
console.log('PASS: same-tab handoff, both calculators and precise units, read-once removal, expiry, malformed/wrong-target data and blocked storage fallback.');
