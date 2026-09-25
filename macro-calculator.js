/* Macro-Calculator.xlsx: Kilograms C8/C13:C15, C25:C28, J25:J30, J37:J39.
 * Optional one-use language handoff stays in this tab. No requests or URL data. */
(() => {
  'use strict';
  const KG_PER_LB = 0.45359237;
  const proteinRates = { loss: 2.2, muscle: 1.6, fitness: 1.2, inactive: 1 };
  const offsets = { neutral: 0, ectomorph: 200, endomorph: -200 };
  function parseWeight(raw) {
    const text = String(raw).trim();
    if (!/^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(text)) return null;
    const value = Number(text.replace(',', '.'));
    return Number.isFinite(value) && value > 0 ? value : null;
  }
  function calculate(kg, body, goal) {
    if (!Number.isFinite(kg) || kg <= 0 || !Object.hasOwn(offsets, body) || !Object.hasOwn(proteinRates, goal)) return null;
    const calories = Math.round(kg * 30 + offsets[body]);
    const protein = kg * proteinRates[goal];
    const fat = kg * 0.8;
    const remaining = calories - protein * 4 - fat * 9;
    if (!Number.isFinite(calories) || calories <= 0 || remaining < 0) return null;
    const macros = [protein, fat, remaining / 4].map((grams, i) => {
      const kcal = grams * (i === 1 ? 9 : 4);
      return { grams, kcal, percent: kcal / calories * 100, perKg: grams / kg, perLb: grams / kg * KG_PER_LB };
    });
    return { calories, macros };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { calculate, parseWeight, KG_PER_LB };
  if (typeof document === 'undefined') return;
  const form = document.querySelector('#macro-form');
  if (!form) return;
  const en = document.documentElement.lang === 'en';
  const copy = en ? {
    empty: 'Enter your weight to see the estimate.',
    invalid: 'Enter a positive weight using numbers and a decimal point or comma.',
    low: 'This estimate cannot cover the protein and fat amounts. Check your inputs; no macro target is shown.',
    ready: 'Estimate updated.',
    unit: 'Body weight',
    summary: 'Estimated maintenance',
  } : {
    empty: 'Add meg a testsúlyodat a becsléshez.',
    invalid: 'Pozitív testsúlyt adj meg, számokkal; tizedespontot vagy vesszőt is használhatsz.',
    low: 'A becslés nem fedezi a fehérje és a zsír energiatartalmát. Ellenőrizd az adatokat; makrócélt nem jelenítünk meg.',
    ready: 'A becslés frissült.',
    unit: 'Testsúly',
    summary: 'Becsült szintentartó energia',
  };
  const weight = form.querySelector('#macro-weight');
  const unitLabel = document.querySelector('#macro-weight-label');
  const results = document.querySelector('#macro-results');
  const status = document.querySelector('#macro-status');
  const announce = document.querySelector('#macro-announcement');
  const ring = document.querySelector('.macro-ring');
  const digits = n => new Intl.NumberFormat(en ? 'en-GB' : 'hu-HU', { maximumFractionDigits: n });
  let unit = 'kg';
  let kg = null;
  let timer;
  let inputKey;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let chartFrame = 0;
  let chartPosition = [0, 0, 0];
  let chartTarget = [0, 0, 0];
  let resultSignature = '';
  let feedbackAnimations = [];
  function paintChart(position) {
    chartPosition = position;
    ['--protein-end', '--fat-end', '--chart-end'].forEach((property, i) => {
      ring.style.setProperty(property, `${position[i]}%`);
    });
  }
  function animateChart(value) {
    const target = value ? [value.macros[0].percent, value.macros[0].percent + value.macros[1].percent, 100] : [0, 0, 0];
    if (target.every((number, i) => number === chartTarget[i])) return;
    cancelAnimationFrame(chartFrame);
    chartTarget = target;
    if (!value || motionPreference.matches) {
      paintChart(target);
      return;
    }
    const from = [...chartPosition];
    const started = performance.now();
    const duration = from[2] === 0 ? 650 : 420;
    function frame(now) {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - (1 - progress) ** 3;
      paintChart(target.map((number, i) => from[i] + (number - from[i]) * eased));
      if (progress < 1) chartFrame = requestAnimationFrame(frame);
    }
    chartFrame = requestAnimationFrame(frame);
  }
  function animateFeedback(value) {
    const signature = value ? JSON.stringify(value) : '';
    if (signature === resultSignature) return;
    resultSignature = signature;
    feedbackAnimations.forEach(animation => animation.cancel());
    feedbackAnimations = [];
    if (!value || motionPreference.matches) return;
    results.querySelectorAll('.macro-metric').forEach((metric, index) => {
      if (typeof metric.animate !== 'function') return;
      feedbackAnimations.push(metric.animate([
        { transform: 'translateY(4px)', backgroundColor: 'rgba(212,168,67,.12)' },
        { transform: 'translateY(0)', backgroundColor: 'rgba(255,242,200,.035)' },
      ], { duration: 360, delay: index * 45, easing: 'ease-out' }));
    });
  }
  motionPreference.addEventListener('change', () => {
    cancelAnimationFrame(chartFrame);
    paintChart(chartTarget);
    feedbackAnimations.forEach(animation => animation.cancel());
    feedbackAnimations = [];
  });
  const selected = name => form.querySelector(`input[name="${name}"]:checked`).value;
  const show = (selector, value) => { document.querySelector(selector).textContent = value; };
  function render() {
    inputKey = JSON.stringify([unit, weight.value]);
    const parsed = parseWeight(weight.value);
    const valid = parsed !== null;
    const value = valid ? calculate(kg, selected('macro-body'), selected('macro-goal')) : null;
    weight.setAttribute('aria-invalid', String(weight.value.trim() !== '' && !valid));
    results.classList.toggle('has-estimate', Boolean(value));
    status.textContent = value ? copy.ready : (!weight.value.trim() ? copy.empty : !valid ? copy.invalid : copy.low);
    show('#macro-calories', value ? digits(0).format(value.calories) : '—');
    ['protein', 'fat', 'carbs'].forEach((name, index) => {
      const m = value?.macros[index];
      for (const key of ['grams', 'kcal', 'percent', 'perKg', 'perLb']) {
        show(`#macro-${name}-${key}`, m ? digits(key === 'kcal' ? 0 : (key === 'perKg' || key === 'perLb') ? 2 : 1).format(m[key]) : '—');
      }
    });
    animateChart(value);
    animateFeedback(value);
    clearTimeout(timer);
    timer = setTimeout(() => {
      announce.textContent = value ? `${copy.summary}: ${digits(0).format(value.calories)} kcal. ${copy.ready}` : status.textContent;
    }, 350);
  }
  form.addEventListener('submit', event => event.preventDefault());
  weight.addEventListener('input', () => {
    const parsed = parseWeight(weight.value);
    kg = parsed === null ? null : parsed * (unit === 'lb' ? KG_PER_LB : 1);
    render();
  });
  form.addEventListener('change', event => {
    if (event.target.name === 'macro-unit') {
      unit = selected('macro-unit');
      if (kg !== null) weight.value = String(Number((kg / (unit === 'lb' ? KG_PER_LB : 1)).toFixed(6)));
      unitLabel.textContent = `${copy.unit} (${unit})`;
    }
    render();
  });
  form.querySelector('fieldset[disabled]').disabled = false;
  function syncRestoredInputs() {
    unit = selected('macro-unit');
    const parsed = parseWeight(weight.value);
    if (inputKey !== JSON.stringify([unit, weight.value])) kg = parsed === null ? null : parsed * (unit === 'lb' ? KG_PER_LB : 1);
    unitLabel.textContent = `${copy.unit} (${unit})`;
    render();
  }
  window.addEventListener('pageshow', syncRestoredInputs);
  window.CalculatorState?.register('macro', {
    capture: () => ({ weight: weight.value, unit, body: selected('macro-body'), goal: selected('macro-goal'), kg }),
    restore(saved) {
      if (!saved || typeof saved.weight !== 'string' || saved.weight.length > 32 || !['kg', 'lb'].includes(saved.unit) ||
          !Object.hasOwn(offsets, saved.body) || !Object.hasOwn(proteinRates, saved.goal)) return;
      weight.value = saved.weight;
      unit = saved.unit;
      for (const [name, value] of [['macro-unit', unit], ['macro-body', saved.body], ['macro-goal', saved.goal]]) {
        form.querySelector(`input[name="${name}"][value="${value}"]`).checked = true;
      }
      const parsed = parseWeight(weight.value);
      const measured = parsed === null ? null : parsed * (unit === 'lb' ? KG_PER_LB : 1);
      kg = measured !== null && Number.isFinite(saved.kg) && saved.kg > 0 && Math.abs(saved.kg - measured) < 0.00001 ? saved.kg : measured;
      render();
    },
  });
  syncRestoredInputs();
})();
