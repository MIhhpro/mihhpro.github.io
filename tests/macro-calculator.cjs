const assert = require('node:assert/strict');
const { calculate, parseWeight, KG_PER_LB } = require('../macro-calculator.js');
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);
// Independent expected values from the supplied workbook's rules at 80 kg.
for (const [goal, protein, carbs] of [['loss',176,280],['muscle',128,328],['fitness',96,360],['inactive',80,376]]) {
  for (const [body, calories, extraCarbs] of [['neutral',2400,0],['ectomorph',2600,50],['endomorph',2200,-50]]) {
    const r = calculate(80, body, goal);
    assert.equal(r.calories, calories);
    [protein,64,carbs + extraCarbs].forEach((grams, i) => close(r.macros[i].grams, grams));
    close(r.macros.reduce((sum,m) => sum+m.kcal,0), calories);
    close(r.macros.reduce((sum,m) => sum+m.percent,0), 100);
  }
}
// Both stored workbook examples describe 80 kg / 176.3698097479 lb.
const imperial = calculate(176.3698097479 * KG_PER_LB, 'neutral', 'fitness');
assert.equal(imperial.calories, 2400);
close(imperial.macros[0].grams, 96);
close(imperial.macros[0].perLb, .544310844);
const decimal = calculate(parseWeight('95,5'),'neutral','fitness');
assert.equal(decimal.calories,2865);
close(decimal.macros[2].grams,429.75);
assert.equal(calculate(80.05,'neutral','fitness').calories,2402);
for (const input of ['', ' ', '0', '-80', 'NaN', 'Infinity', '80kg', '1,000.5', '1e3']) assert.equal(parseWeight(input),null);
for (const input of ['80', '80.5','80,5',' .5 ']) assert.ok(parseWeight(input)>0);
for (const weight of [0,-5,NaN,Infinity]) assert.equal(calculate(weight,'neutral','fitness'),null);
assert.equal(calculate(5,'endomorph','loss'),null);
assert.equal(calculate(80,'unknown','fitness'),null);
assert.equal(calculate(80,'neutral','unknown'),null);
console.log('PASS: all 12 body/goal combinations, kg/lb workbook examples, calorie/percentage totals, rounding, decimals and invalid/insufficient inputs.');
