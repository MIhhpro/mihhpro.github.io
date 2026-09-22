// Exercise interruption and accessibility fallbacks without opening a browser.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8')
  .split('// ── Native questions:')[1].split('// ── Count-up stats')[0];
const code = source.slice(source.indexOf('document.querySelectorAll'));
function setup({reduced = false, supported = true} = {}) {
  let click, resize, change;
  const animations = [], classes = new Set();
  const content = {inert:false};
  const details = {
    open:false, style:{overflow:''},
    classList:{remove:c=>classes.delete(c), toggle:(c,on)=>on?classes.add(c):classes.delete(c)},
    querySelector:s=>s === 'summary' ? {addEventListener:(type, fn)=>click=fn} : content,
    getBoundingClientRect:()=>({height:details.open?640:90})
  };
  if (supported) details.animate = () => {
    const animation = {cancelled:false,cancel(){this.cancelled=true;}};
    animations.push(animation); return animation;
  };
  const media = {matches:reduced,addEventListener:(type,fn)=>change=fn};
  vm.runInNewContext(code, {
    document:{querySelectorAll:()=>[details]}, reducedMotion:media,
    window:{addEventListener:(type,fn)=>resize=fn}
  });
  return {details, content, animations, media, resize:()=>resize(), change:()=>change(),
    click(){let prevented=false; click?.({preventDefault:()=>prevented=true}); return prevented;},
    finish(){animations.at(-1)?.onfinish?.();}};
}
const normal = setup();
assert.equal(normal.click(), true);
normal.finish();
assert.equal(normal.details.open, true);
assert.equal(normal.details.style.overflow, '', 'Long answers return to natural sizing');
normal.click();
assert.equal(normal.content.inert, true, 'Closing content cannot receive focus');
normal.click(); // Reverse a close before it finishes.
assert.equal(normal.animations[1].cancelled, true);
normal.finish();
assert.equal(normal.details.open, true, 'Latest click wins during reversal');
assert.equal(normal.content.inert, false);
normal.click(); normal.resize();
assert.equal(normal.details.open, false, 'Resize settles the requested state');
normal.click(); normal.media.matches = true; normal.change();
assert.equal(normal.details.open, true);
assert.equal(normal.details.style.overflow, '');
assert.equal(normal.click(), false, 'Reduced motion keeps native activation');
const reduced = setup({reduced:true});
assert.equal(reduced.click(), false);
assert.equal(reduced.animations.length, 0);
assert.equal(setup({supported:false}).click(), false, 'Unsupported animation API keeps native details');
console.log('PASS: FAQ reversal, long-answer sizing, closing focus protection, resize, reduced motion and native fallback.');
