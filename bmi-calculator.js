/* Adult BMI. Optional same-tab language handoff; no requests or URL data. */
(() => {
  'use strict';
  const KG_PER_LB = 0.45359237;
  const CM_PER_INCH = 2.54;
  function parseNumber(raw) {
    const text = String(raw).trim();
    if (!/^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(text)) return null;
    const number = Number(text.replace(',', '.'));
    return Number.isFinite(number) && number > 0 ? number : null;
  }
  function calculate(kg, cm) {
    if (!Number.isFinite(kg) || !Number.isFinite(cm) || kg <= 0 || cm <= 0) return null;
    const bmi = kg / (cm / 100) ** 2;
    if (!Number.isFinite(bmi) || bmi <= 0) return null;
    const category = bmi < 18.5 ? 0 : bmi < 25 ? 1 : bmi < 30 ? 2 : 3;
    return { bmi, category, position: Math.max(0, Math.min(100, (bmi - 10) / 30 * 100)) };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { parseNumber, calculate, KG_PER_LB, CM_PER_INCH };
  if (typeof document === 'undefined') return;
  const form = document.querySelector('#bmi-form');
  if (!form) return;
  const en = document.documentElement.lang === 'en';
  const copy = en ? {
    weight: 'Body weight', height: 'Height', empty: 'Enter your weight and height to see your BMI.',
    invalid: 'Check both measurements. Use positive numbers, with a decimal point or comma if needed.',
    ready: 'General adult BMI category; not a diagnosis.', outside: 'The marker is at the end of the scale; your numeric result is shown above.',
    categories: ['Underweight', 'Healthy weight range', 'Overweight', 'Obesity range'],
  } : {
    weight: 'Testsúly', height: 'Magasság', empty: 'Add meg a testsúlyodat és magasságodat a BMI kiszámításához.',
    invalid: 'Ellenőrizd mindkét adatot. Pozitív számokat használj; tizedespontot vagy vesszőt is megadhatsz.',
    ready: 'Általános felnőtt BMI-besorolás; nem diagnózis.', outside: 'A jelölő a skála szélén áll; a számszerű eredmény felül látható.',
    categories: ['Soványság', 'Normál testsúlytartomány', 'Túlsúly', 'Elhízási tartomány'],
  };
  const weight = form.querySelector('#bmi-weight');
  const height = form.querySelector('#bmi-height');
  const result = document.querySelector('#bmi-result');
  const score = document.querySelector('#bmi-score');
  const category = document.querySelector('#bmi-category');
  const status = document.querySelector('#bmi-status');
  const marker = document.querySelector('.bmi-marker');
  const announcement = document.querySelector('#bmi-announcement');
  const rows = document.querySelectorAll('[data-bmi-category]');
  const format = new Intl.NumberFormat(en ? 'en-GB' : 'hu-HU', { maximumFractionDigits: 1 });
  document.querySelector('.bmi-ticks span:nth-child(2)').textContent = format.format(18.5);
  let unit = 'metric', kg = null, cm = null, timer;
  let inputKey;
  function units() {
    document.querySelector('#bmi-weight-label').textContent = `${copy.weight} (${unit === 'metric' ? 'kg' : 'lb'})`;
    document.querySelector('#bmi-height-label').textContent = `${copy.height} (${unit === 'metric' ? 'cm' : 'in'})`;
    weight.placeholder = unit === 'metric' ? '80' : '176';
    height.placeholder = unit === 'metric' ? '180' : '71';
  }
  function render() {
    inputKey = JSON.stringify([unit, weight.value, height.value]);
    const invalid = [weight, height].some(input => input.value.trim() && parseNumber(input.value) === null);
    [weight, height].forEach(input => input.setAttribute('aria-invalid', String(Boolean(input.value.trim()) && parseNumber(input.value) === null)));
    const value = invalid ? null : calculate(kg, cm);
    result.classList.toggle('has-bmi', Boolean(value));
    score.textContent = value ? format.format(value.bmi) : '—';
    category.textContent = value ? copy.categories[value.category] : '—';
    marker.style.left = `${value ? value.position : 0}%`;
    rows.forEach((row, index) => {
      row.classList.toggle('is-current', Boolean(value) && index === value.category);
      if (value && index === value.category) row.setAttribute('aria-current', 'true');
      else row.removeAttribute('aria-current');
    });
    status.textContent = invalid || (kg && cm && !value) ? copy.invalid : !value ? copy.empty : copy.ready + (value.bmi < 10 || value.bmi > 40 ? ` ${copy.outside}` : '');
    clearTimeout(timer);
    timer = setTimeout(() => { announcement.textContent = value ? `BMI: ${format.format(value.bmi)}. ${copy.categories[value.category]}. ${status.textContent}` : status.textContent; }, 350);
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', event => {
    if (event.target === weight) {
      const number = parseNumber(weight.value);
      kg = number === null ? null : number * (unit === 'metric' ? 1 : KG_PER_LB);
    } else if (event.target === height) {
      const number = parseNumber(height.value);
      cm = number === null ? null : number * (unit === 'metric' ? 1 : CM_PER_INCH);
    } else return;
    render();
  });
  form.addEventListener('change', event => {
    if (event.target.name !== 'bmi-unit') return;
    unit = event.target.value;
    if (kg !== null) weight.value = String(Number((kg / (unit === 'metric' ? 1 : KG_PER_LB)).toFixed(6)));
    if (cm !== null) height.value = String(Number((cm / (unit === 'metric' ? 1 : CM_PER_INCH)).toFixed(6)));
    units();
    render();
  });
  function restore() {
    unit = form.querySelector('input[name="bmi-unit"]:checked').value;
    const w = parseNumber(weight.value), h = parseNumber(height.value);
    if (inputKey !== JSON.stringify([unit, weight.value, height.value])) {
      kg = w === null ? null : w * (unit === 'metric' ? 1 : KG_PER_LB);
      cm = h === null ? null : h * (unit === 'metric' ? 1 : CM_PER_INCH);
    }
    units();
    render();
  }
  form.querySelector('fieldset[disabled]').disabled = false;
  window.addEventListener('pageshow', restore);
  window.CalculatorState?.register('bmi', {
    capture: () => ({ weight: weight.value, height: height.value, unit, kg, cm }),
    restore(saved) {
      if (!saved || !['metric', 'imperial'].includes(saved.unit) ||
          [saved.weight, saved.height].some(value => typeof value !== 'string' || value.length > 32)) return;
      weight.value = saved.weight;
      height.value = saved.height;
      unit = saved.unit;
      form.querySelector(`input[name="bmi-unit"][value="${unit}"]`).checked = true;
      const w = parseNumber(weight.value), h = parseNumber(height.value);
      kg = w === null ? null : w * (unit === 'metric' ? 1 : KG_PER_LB);
      cm = h === null ? null : h * (unit === 'metric' ? 1 : CM_PER_INCH);
      if (kg !== null && Number.isFinite(saved.kg) && saved.kg > 0 && Math.abs(saved.kg - kg) < 0.00001) kg = saved.kg;
      if (cm !== null && Number.isFinite(saved.cm) && saved.cm > 0 && Math.abs(saved.cm - cm) < 0.00001) cm = saved.cm;
      render();
    },
  });
  restore();
})();
