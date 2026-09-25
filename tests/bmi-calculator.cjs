const assert = require('node:assert/strict');
const { calculate, parseNumber, KG_PER_LB, CM_PER_INCH } = require('../bmi-calculator.js');
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);
close(calculate(70, 170).bmi, 24.221453287197235); // NHS worked example.
const imperial = calculate(176.36980974790205 * KG_PER_LB, 70.86614173228347 * CM_PER_INCH);
close(imperial.bmi, calculate(80, 180).bmi);
// Use 2m to exercise exact thresholds independently of display rounding.
for (const [bmi, category] of [[10,0],[18.499,0],[18.5,1],[24.999,1],[25,2],[29.999,2],[30,3],[50,3]]) {
  const actual = calculate(bmi * 4, 200);
  close(actual.bmi, bmi);
  assert.equal(actual.category, category);
}
assert.equal(calculate(20,200).position, 0);
assert.equal(calculate(200,200).position, 100);
close(calculate(100,200).position, 50);
for (const input of ['', ' ', '0', '-80', 'Infinity', 'NaN', '80kg', '1e3', '1,000.5']) assert.equal(parseNumber(input), null);
assert.equal(parseNumber(' 80,5 '), 80.5);
assert.equal(parseNumber('180.5'), 180.5);
for (const input of [0,-1,NaN,Infinity,null]) {
  assert.equal(calculate(input,180),null);
  assert.equal(calculate(80,input),null);
}
assert.equal(calculate(Number.MAX_VALUE, Number.MIN_VALUE),null);
console.log('PASS: NHS example, metric/imperial equivalence, all BMI boundaries before rounding, chart limits and invalid input.');
