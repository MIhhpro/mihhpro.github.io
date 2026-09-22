// Exercise routing and keyboard behavior without a browser or network request.
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
class Element {
  constructor(value = '') {
    this.value = value; this.textContent = ''; this.hidden = false;
    this.style = { setProperty() {} }; this.dataset = {}; this.handlers = {}; this.attrs = {};
    this.children = {}; this.classes = new Set();
    this.classList = { add: c => this.classes.add(c), remove: c => this.classes.delete(c), contains: c => this.classes.has(c), toggle: (c, on = !this.classes.has(c)) => {on ? this.classes.add(c) : this.classes.delete(c); return on;} };
  }
  querySelector(s) { return this.children[s] || null; }
  querySelectorAll(s) { return this.children[s] || []; }
  setAttribute(k,v) { this.attrs[k] = v; }
  removeAttribute(k) { delete this.attrs[k]; }
  remove() { this.removed = true; }
  set innerHTML(value) { this.html = value; this.children = {}; }
  get innerHTML() { return this.html || ''; }
  addEventListener(k,f) { this.handlers[k] = f; }
  scrollIntoView() { this.scrollCount = (this.scrollCount || 0) + 1; }
  focus() { this.focused = true; }
  fire(type) { return this.handlers[type]?.({ preventDefault() {} }); }
}
function setup(service, calendar = true, language = 'hu') {
  const form = new Element(), select = new Element();
  Object.defineProperty(select, 'selectedOptions', {get: () => [{textContent: select.value}]});
  form.reportValidity = () => true;
  for(const [id, val] of Object.entries({fname:'Árvíz',lname:'Tűrő',email:'test@example.test',phone:'',message:'Erősödnék. & Kérdés?\nMásodik sor.'})) form.children['#'+id] = new Element(val);
  form.children['#service'] = select;
  const packageSelect = new Element();
  const packageLabels = {basic:'Basic – 29 900 Ft / hó',plus:'Plus – 39 900 Ft / hó',premium:'Premium – 49 900 Ft / hó'};
  Object.defineProperty(packageSelect, 'selectedOptions', {get: () => [{textContent: packageLabels[packageSelect.value] || ''}]});
  form.children['#online-package'] = packageSelect;
  form.children['#online-package-group'] = new Element();
  form.children['#route-note'] = new Element(); form.children['#route-submit'] = new Element();
  const nodes = {'.js-contact-form':form};
  const burger = new Element(), menu = new Element(), main = new Element(), footer = new Element();
  const menuLinks = [new Element(), new Element(), new Element()];
  menu.querySelectorAll = () => menuLinks; menu.querySelector = () => menuLinks[0];
  nodes['.hamburger'] = burger; nodes['.mobile-menu'] = menu;
  for(const selector of ['.booking-section','.inquiry-section','#booking-embed','#booking-config-notice','#booking-loading','#booking-direct-link','#booking-email-link','#selected-service-badge','#inquiry-service-name','#inquiry-email-link','#inquiry-copy-button','.form-success','.booking-shell']) nodes[selector] = new Element();
  nodes['.booking-section'].children.h2 = new Element(); nodes['.inquiry-section'].children.h2 = new Element();
  const root = new Element(), body = new Element(); body.appendChild = () => {};
  root.lang = language;
  const documentListeners = {};
  const scripts = [];
  const timers = new Map(); let timerId = 0;
  const doc = {documentElement:root,body,querySelector:s=>nodes[s]||null,querySelectorAll:s=>s==='main, .site-footer'?[main,footer]:[],createElement:()=>new Element(),addEventListener:(k,f)=>{documentListeners[k]=f;}};
  doc.head = {appendChild(script) { scripts.push(script); if (calendar === false) queueMicrotask(() => script.onerror()); }};
  for(const el of [burger,...menuLinks]) el.focus = () => {doc.activeElement=el;};
  const calls = [], listeners = {};
  const win = {SITE_CONFIG:{calEvents:{consult:'https://cal.com/example/consult',pt:'https://cal.com/example/pt',online:'https://cal.com/example/online'},inquiryEmail:'coach@example.test'},location:{search:'?service='+service},addEventListener:(k,f)=>{listeners[k]=f;},setTimeout(){},isSecureContext:true};
  const calHandlers = {};
  const sdk = (action, args) => {
    if (action === 'inline') { calls.push(args); const iframe = new Element(); args.elementOrSelector.children.iframe = iframe; }
    if (action === 'ui') win.calUI = args;
    if (action === 'on') calHandlers[args.action] = args.callback;
    if (action === 'off' && calHandlers[args.action] === args.callback) delete calHandlers[args.action];
  };
  sdk.instance = {};
  if(calendar === true) win.Cal = sdk;
  const context = {window:win,document:doc,matchMedia:()=>({matches:false,addEventListener(){}}),location:{pathname:'/contact.html'},URL,URLSearchParams,requestAnimationFrame:f=>f(),addEventListener(){},scrollY:0,scrollTo(){},navigator:{},setTimeout:(fn,ms)=>{timers.set(++timerId,{fn,ms});return timerId;},clearTimeout:id=>timers.delete(id),console};
  win.matchMedia=context.matchMedia;
  vm.runInNewContext(source,context);
  return {form,select,nodes,calls,win,listeners,doc,documentListeners,burger,menuLinks,main,footer,scripts,sdk,timers,context,calHandlers};
}
async function run() {
for (const service of ['consult','pt','online']) {
  const t = setup(service); await t.form.fire('submit');
  assert.equal(t.calls.length,1);
  assert.equal(t.calls[0].calLink,'example/'+service);
  const data = t.calls[0].config;
  assert.equal(data.name,'Tűrő Árvíz');
  assert.equal(data.email,'test@example.test');
  assert.ok(data.notes.includes('Erősödnék. & Kérdés?\nMásodik sor.'));
  assert.ok(data.notes.includes('Telefon: nincs megadva'));
  assert.equal(data.theme,'dark');
  assert.equal(t.win.calUI.cssVarsPerTheme.dark['cal-brand'],'#d4a843');
  const external = new URL(t.nodes['#booking-direct-link'].href);
  for (const key of ['name','email','notes']) assert.equal(external.searchParams.get(key),data[key]);
  assert.equal(t.nodes['.inquiry-section'].hidden,true);
  assert.equal(t.nodes['.booking-section'].scrollCount,1);
  t.calHandlers.linkReady();
  assert.equal(t.nodes['#booking-loading'].hidden,true);
  assert.equal(t.nodes['#booking-config-notice'].hidden,true);
  t.form.children['#fname'].value='Anna Mária';
  t.form.children['#email'].value='anna+coaching@example.test';
  t.form.children['#phone'].value='+36 30 123 4567';
  const staleCallback=t.calHandlers.linkReady;
  t.form.fire('input');
  assert.equal(t.calHandlers.linkReady,undefined);
  staleCallback();
  assert.equal(t.nodes['.booking-section'].hidden,true);
  await t.form.fire('submit');
  assert.equal(t.calls[1].config.name,'Tűrő Anna Mária');
  assert.equal(t.calls[1].config.attendeePhoneNumber,'+36 30 123 4567');
  assert.equal(new URL(t.nodes['#booking-direct-link'].href).searchParams.get('email'),'anna+coaching@example.test');
}
// Missing or malformed links never contact a calendar provider; these routes
// stay local until a visitor chooses Gmail.
for (const eventUrl of ['', 'not a url', 'https://wrong.example/a/b', 'https://cal.com@wrong.example/a/b', 'https://cal.com/name']) {
 for (const service of ['consult','pt','online']) {
  const t=setup(service); t.win.SITE_CONFIG.calEvents[service]=eventUrl;
  t.select.fire('change');
  assert.ok(t.form.children['#route-note'].textContent.includes('emailben'));
  await t.form.fire('submit');
  assert.equal(t.calls.length,0); assert.equal(t.scripts.length,0);
  assert.equal(t.nodes['.booking-section'].hidden,true);
  assert.equal(t.nodes['.inquiry-section'].hidden,false);
  const draft=new URL(t.nodes['#inquiry-email-link'].href);
  assert.equal(draft.searchParams.get('to'),'coach@example.test');
  assert.ok(draft.searchParams.get('body').includes('test@example.test'));
 }
}
const production={window:{},Object};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../site-config.js'),'utf8'),production);
assert.deepEqual(Object.keys(production.window.SITE_CONFIG.calEvents),['consult','pt','online']);
for (const [key,slug] of [['consult','konz'],['pt','edzes'],['online','online']]) {
 assert.equal(production.window.SITE_CONFIG.calEvents[key],'https://cal.com/bence-mihaly-gjfcyz/'+slug);
 const configured=setup(key);
 Object.assign(configured.win.SITE_CONFIG.calEvents,production.window.SITE_CONFIG.calEvents);
 await configured.form.fire('submit');
 assert.equal(configured.calls[0].calLink,'bence-mihaly-gjfcyz/'+slug);
}
for (const value of Object.values(production.window.SITE_CONFIG.calEvents)) assert.ok(value === '' || new URL(value).origin === 'https://cal.com');
for (const service of ['program','other']) {
 const t=setup(service); await t.form.fire('submit');
 assert.equal(t.calls.length,0);
 assert.equal(t.nodes['.inquiry-section'].hidden,false);
 assert.ok(t.nodes['#inquiry-copy-button'].dataset.copyText.includes('Erősödnék. & Kérdés?'));
}
for (const [tier,price] of [['basic','29 900'],['plus','39 900'],['premium','49 900']]) {
 const t=setup('online&package='+tier); await t.form.fire('submit');
 assert.ok(t.calls[0].config.notes.includes(price));
 t.win.SITE_CONFIG.calEvents.online=''; await t.form.fire('submit');
 assert.ok(t.nodes['#inquiry-copy-button'].dataset.copyText.includes(price));
 t.select.value='program';t.select.fire('change');await t.form.fire('submit');
 assert.ok(!t.nodes['#inquiry-copy-button'].dataset.copyText.includes(price));
 assert.equal(t.form.children['#online-package'].disabled,true);
}
const unavailable=setup('pt',false); await unavailable.form.fire('submit');
assert.equal(unavailable.nodes['#booking-config-notice'].hidden,false);
assert.equal(unavailable.nodes['#booking-direct-link'].hidden,false);
assert.equal(unavailable.nodes['#booking-loading'].hidden,true);
assert.ok(new URL(unavailable.nodes['#booking-email-link'].href).searchParams.get('body').includes('test@example.test'));
assert.equal(setup('online&package=unknown').form.children['#online-package'].value,'');
await unavailable.form.fire('submit');assert.equal(unavailable.scripts.length,2);
const pending=setup('online','pending');const submission=pending.form.fire('submit');
pending.select.value='other';pending.select.fire('change');
pending.win.Cal=pending.sdk;pending.scripts[0].onload();await submission;
assert.equal(pending.calls.length,0);assert.equal(pending.nodes['.booking-section'].hidden,true);
const slow=setup('pt');await slow.form.fire('submit');
[...slow.timers.values()].find(t=>t.ms===15000).fn();
assert.equal(slow.nodes['#booking-config-notice'].hidden,false);
assert.equal(slow.nodes['#booking-embed'].hidden,true,'hide the empty SDK loader on timeout');
slow.calHandlers.linkReady();assert.equal(slow.nodes['#booking-config-notice'].hidden,true);
assert.equal(slow.nodes['#booking-embed'].hidden,false,'a delayed ready event restores the calendar');
slow.calHandlers.linkFailed();assert.equal(slow.nodes['#booking-config-notice'].hidden,false);
assert.equal(slow.form.style.display,undefined,'native Cal handles booking status; never fabricate a confirmation');
const invalid=setup('consult');invalid.form.reportValidity=()=>false;await invalid.form.fire('submit');assert.equal(invalid.calls.length,0);
const keyboard=setup('consult'); keyboard.burger.fire('click');
assert.equal(keyboard.burger.attrs['aria-expanded'],'true');
assert.equal(keyboard.doc.activeElement,keyboard.menuLinks[0]);
assert.equal(keyboard.main.inert,true);
keyboard.doc.activeElement=keyboard.menuLinks[2];
keyboard.documentListeners.keydown({key:'Tab',preventDefault(){}});
assert.equal(keyboard.doc.activeElement,keyboard.burger);
keyboard.documentListeners.keydown({key:'Tab',shiftKey:true,preventDefault(){}});
assert.equal(keyboard.doc.activeElement,keyboard.menuLinks[2]);
keyboard.documentListeners.keydown({key:'Escape'});
assert.equal(keyboard.doc.activeElement,keyboard.burger);
assert.equal(keyboard.burger.attrs['aria-expanded'],'false');
assert.equal(keyboard.main.inert,false);
console.log('PASS: three calendar routes, three coaching-package handoffs, standalone-program email route, invalid package, email/copy preparation, message preservation, service switching, validation, Cal errors/retries, absent-link fallback and keyboard menu focus. No messages sent or bookings made.');

}
module.exports = { setup, Element };
if (require.main === module) run().catch(error => { console.error(error); process.exitCode = 1; });
