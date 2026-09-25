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
function setup(service, calendar = true, language = 'hu', events = {}) {
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
  form.children['#inquiry-fields'] = new Element();
  form.children['#route-note'] = new Element(); form.children['#route-submit'] = new Element();
  const nodes = {'.js-contact-form':form};
  const burger = new Element(), menu = new Element(), main = new Element(), footer = new Element();
  const menuLinks = [new Element(), new Element(), new Element()];
  menu.querySelectorAll = () => menuLinks; menu.querySelector = () => menuLinks[0];
  nodes['.hamburger'] = burger; nodes['.mobile-menu'] = menu;
  for(const selector of ['.booking-section','.inquiry-section','#booking-embed','#booking-config-notice','#booking-loading','#booking-direct-link','#booking-retry','#booking-email-link','#selected-service-badge','#inquiry-service-name','#inquiry-email-link','#inquiry-copy-button','.form-success','.booking-shell']) nodes[selector] = new Element();
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
  Object.assign(win.SITE_CONFIG.calEvents, events);
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
const settle = async () => { for (let i=0; i<8; i++) await Promise.resolve(); };
async function run() {
for (const service of ['consult','pt','online']) {
 const t=setup(service); await settle();
 assert.equal(t.calls.length,1,'calendar loads without submission');
 assert.equal(t.calls[0].calLink,'example/'+service);
 assert.equal(t.form.children['#inquiry-fields'].disabled,true);
 assert.equal(t.form.children['#route-submit'].hidden,true);
 assert.equal(t.nodes['.booking-section'].scrollCount,undefined,'automatic load must not scroll');
 const data=t.calls[0].config;
 assert.equal(data.notes,'Szolgáltatás: '+service);
 for(const key of ['name','email','attendeePhoneNumber']) {
  assert.equal(data[key],undefined);
  assert.equal(new URL(t.nodes['#booking-direct-link'].href).searchParams.has(key),false);
 }
 assert.equal(t.win.calUI.cssVarsPerTheme.dark['cal-brand'],'#d4a843');
 t.calHandlers.linkReady();assert.equal(t.nodes['#booking-loading'].hidden,true);
 const stale=t.calHandlers.linkReady;
 t.select.value='other';await t.select.fire('change');
 stale();assert.equal(t.nodes['.booking-section'].hidden,true);
 assert.equal(t.form.children['#inquiry-fields'].disabled,false);
 assert.equal(t.form.children['#route-submit'].hidden,false);
 await t.form.fire('submit');
 assert.equal(t.nodes['.inquiry-section'].hidden,false);
 assert.ok(t.nodes['#inquiry-copy-button'].dataset.copyText.includes('test@example.test'));
 t.select.value=service;await t.select.fire('change');
 assert.equal(t.calls.length,2);assert.equal(t.calls[1].config.email,undefined);
 assert.equal(t.nodes['.inquiry-section'].hidden,true);
}
for (const value of ['', 'not a url', 'https://wrong.example/a/b', 'https://cal.com@wrong.example/a/b', 'https://cal.com/name']) {
 for(const service of ['consult','pt','online']) {
  const t=setup(service,true,'hu',{[service]:value});await settle();
  assert.equal(t.calls.length,0);assert.equal(t.scripts.length,0);
  assert.equal(t.form.children['#inquiry-fields'].disabled,false);
  await t.form.fire('submit');assert.equal(t.nodes['.inquiry-section'].hidden,false);
 }
}
for(const service of ['program','other']) {
 const t=setup(service);await settle();
 assert.equal(t.calls.length,0);assert.equal(t.scripts.length,0);
 t.form.reportValidity=()=>false;await t.form.fire('submit');
 assert.equal(t.nodes['.inquiry-section'].hidden,true);
 t.form.reportValidity=()=>true;await t.form.fire('submit');
 assert.ok(t.nodes['#inquiry-copy-button'].dataset.copyText.includes('Erősödnék.'));
}
for(const service of ['', 'unknown']) {
 const t=setup(service);await settle();assert.equal(t.select.value,'consult');assert.equal(t.calls.length,1);
}
const production={window:{},Object};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../site-config.js'),'utf8'),production);
for(const [key,slug] of [['consult','konz'],['pt','edzes'],['online','online']]) {
 const t=setup(key,true,'hu',production.window.SITE_CONFIG.calEvents);await settle();
 assert.equal(t.calls[0].calLink,'bence-mihaly-gjfcyz/'+slug);
}
const packages=setup('online&package=basic');await settle();
for(const [tier,price] of [['basic','29 900'],['plus','39 900'],['premium','49 900']]) {
 packages.form.children['#online-package'].value=tier;
 await packages.form.children['#online-package'].fire('change');
 assert.ok(packages.calls.at(-1).config.notes.includes(price));
 assert.equal(packages.nodes['.booking-section'].scrollCount,undefined);
}
const unavailable=setup('pt',false);await settle();
assert.equal(unavailable.nodes['#booking-config-notice'].hidden,false);
assert.equal(unavailable.nodes['#booking-direct-link'].hidden,false);
await unavailable.nodes['#booking-retry'].fire('click');assert.equal(unavailable.scripts.length,2);
const pending=setup('online','pending');
pending.select.value='other';await pending.select.fire('change');
pending.win.Cal=pending.sdk;pending.scripts[0].onload();await settle();
assert.equal(pending.calls.length,0);assert.equal(pending.nodes['.booking-section'].hidden,true);
const rapid=setup('consult','pending');
rapid.select.value='pt';const next=rapid.select.fire('change');
rapid.win.Cal=rapid.sdk;rapid.scripts[0].onload();await next;
assert.equal(rapid.calls.length,1);assert.equal(rapid.calls[0].calLink,'example/pt');
const slow=setup('pt');await settle();
[...slow.timers.values()].find(t=>t.ms===15000).fn();
assert.equal(slow.nodes['#booking-embed'].hidden,true);
slow.calHandlers.linkReady();assert.equal(slow.nodes['#booking-embed'].hidden,false);
slow.calHandlers.linkFailed();assert.equal(slow.nodes['#booking-config-notice'].hidden,false);
assert.equal(slow.form.style.display,undefined,'Cal owns confirmation');
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
console.log('PASS: automatic time-first calendar, default selection, no focus stealing, enquiry validation, package changes, stale request protection, Cal errors/retries, absent-link fallback and keyboard menu focus. No messages sent or bookings made.');

}
module.exports = { setup, Element };
if (require.main === module) run().catch(error => { console.error(error); process.exitCode = 1; });
