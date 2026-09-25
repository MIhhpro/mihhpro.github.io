const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const code = fs.readFileSync(require.resolve('../language-position.js'), 'utf8');
const store = new Map();
const key = 'mb-language-position-v1';
function page(path, {y=500, anchorTop=600, height=80, blocked=false, now=100000} = {}) {
  const events = {}, frames = [], timers = [], calls = [];
  const context = {scrollY:y,innerHeight:700};
  const section = {id:'bmi'};
  const anchor = { id:'bmi-result-title', getClientRects:()=>[1],
    getBoundingClientRect:()=>({top:anchorTop-context.scrollY,bottom:anchorTop-context.scrollY+height,height}),
    closest:selector=>selector==='section[id]'?section:null };
  const links=['segedletek.html','resources-en.html'].map((p,i)=>({href:`https://example.test/site/${p}#macro`,dataset:{language:i?'en':'hu'},handlers:[],
    addEventListener:(_,fn)=>{},setAttribute(name,value){this[name]=value;}}));
  links.forEach(link=>link.addEventListener=(_,fn)=>link.handlers.push(fn));
  const document={baseURI:`https://example.test/site/${path}`,readyState:'loading',documentElement:{lang:path==='segedletek.html'?'hu':'en',scrollHeight:4000},
    querySelectorAll:selector=>selector==='main [id]'?[anchor]:links,
    querySelector:()=>({getBoundingClientRect:()=>({bottom:70})}),getElementById:id=>id===anchor.id?anchor:null};
  const window={location:{href:document.baseURI},addEventListener:(name,fn)=>(events[name]??=[]).push(fn),
    removeEventListener:(name,fn)=>events[name]=events[name].filter(x=>x!==fn),setTimeout:fn=>timers.push(fn),
    scrollTo:options=>{calls.push(options);context.scrollY=options.top;}};
  Object.assign(context,{window,document,URL,Date:{now:()=>now},requestAnimationFrame:fn=>frames.push(fn),sessionStorage:{
    getItem:k=>{if(blocked)throw Error('blocked');return store.get(k);},removeItem:k=>store.delete(k),setItem:(k,v)=>{if(blocked)throw Error('blocked');store.set(k,v);}}});
  vm.runInNewContext(code,context);
  return {links,calls,timers,context,click:(index,event={})=>links[index].handlers.forEach(fn=>fn({button:0,...event})),
    fire:name=>(events[name]||[]).forEach(fn=>fn()),flush:()=>{while(frames.length)frames.shift()();}};
}
const hu=page('segedletek.html');
hu.click(0);assert.equal(store.size,0);
hu.click(1,{ctrlKey:true});assert.equal(store.size,0);
hu.click(1);
assert.equal(hu.links[1].href,'/site/resources-en.html#bmi','Fallback follows visible content, not stale macro hash');
const en=page('resources-en.html',{y:0,anchorTop:900});
assert.equal(store.size,0,'Position record is consumed once');
en.fire('pageshow');en.flush();assert.equal(en.calls[0].top,800,'Translated landmark remains 100px below viewport top');
assert.equal(en.calls[0].behavior,'instant');
en.fire('pageshow');en.flush();assert.equal(en.calls.length,1,'Back/forward must not replay old handoff');
const top=page('segedletek.html',{y:0});top.click(1);
const topDest=page('resources-en.html');topDest.fire('pageshow');topDest.flush();assert.equal(topDest.calls[0].top,0);
const bottom=page('segedletek.html',{y:3300});bottom.click(1);
const bottomDest=page('resources-en.html');bottomDest.fire('pageshow');bottomDest.flush();assert.equal(bottomDest.calls[0].top,3300);
const long=page('segedletek.html',{y:500,anchorTop:100,height:2000});long.click(1);
const longDest=page('resources-en.html',{y:0,anchorTop:200,height:3000});longDest.fire('pageshow');longDest.flush();assert.equal(longDest.calls[0].top,860);
hu.click(1);const interrupted=page('resources-en.html');interrupted.fire('pageshow');interrupted.fire('wheel');interrupted.flush();assert.equal(interrupted.calls.length,0);
hu.click(1);const stale=page('resources-en.html',{now:170001});stale.fire('pageshow');stale.flush();assert.equal(stale.calls.length,0);
store.set(key,'{broken');assert.doesNotThrow(()=>page('resources-en.html'));assert.equal(store.size,0);
const blocked=page('segedletek.html',{blocked:true});blocked.click(1);assert.equal(blocked.links[1].href,'/site/resources-en.html#bmi');
hu.click(1);hu.timers.at(-1)();assert.equal(store.size,0);
console.log('PASS: live reading landmark, translated offsets, top/bottom, long sections, one-use restoration, user cancellation, stale/malformed state and blocked-storage section fallback.');
