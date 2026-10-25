/**
 * CardioNepal illustrative scoring model.
 *
 * IMPORTANT: This is a transparent, hand-specified logistic-type function used only to
 * demonstrate an interface. Its weights were NOT estimated from data and are NOT exported
 * from any trained model. The outputs are illustrative and have no clinical meaning.
 *
 * logit(x) = BASE_LOGIT + sum_j [ f_j(x_j) - f_j(ref_j) ]
 * For this additive model the contribution of feature j relative to the reference profile
 * is exactly f_j(x_j) - f_j(ref_j), which is what the explanation panel displays (log-odds).
 */

export const BENCHMARK_PREVALENCE = 139 / 303; // UCI Cleveland: 139 of 303 labelled "present"
export const BASE_LOGIT = Math.log(BENCHMARK_PREVALENCE / (1 - BENCHMARK_PREVALENCE));

export const FEATURES = [
  { key: 'age', label: 'Age', short: 'Age', group: 'demographics', type: 'number', unit: 'years', min: 18, max: 100, step: 1, bench: [29, 77], ref: 55,
    help: 'Age in years. The benchmark contains patients aged 29–77.',
    f: (v) => 0.04 * v },
  { key: 'sex', label: 'Sex (as recorded)', short: 'Sex', group: 'demographics', type: 'select', ref: '1',
    options: [{ v: '1', l: 'Male' }, { v: '0', l: 'Female' }],
    help: 'Coded 1 = male, 0 = female in the dataset.',
    f: (v) => (v === '1' ? 0.7 : 0) },
  { key: 'cp', label: 'Chest pain type', short: 'Chest pain', group: 'symptoms', type: 'select', ref: '3',
    options: [{ v: '1', l: 'Typical angina' }, { v: '2', l: 'Atypical angina' }, { v: '3', l: 'Non-anginal pain' }, { v: '4', l: 'Asymptomatic' }],
    help: 'UCI coding 1–4. “Asymptomatic” means no chest pain was reported.',
    f: (v) => ({ '1': 0.2, '2': -0.3, '3': -0.4, '4': 0.9 })[v] },
  { key: 'exang', label: 'Exercise-induced angina', short: 'Exercise angina', group: 'symptoms', type: 'select', ref: '0',
    options: [{ v: '0', l: 'No' }, { v: '1', l: 'Yes' }],
    help: 'Whether chest pain was brought on by exercise during the test.',
    f: (v) => (v === '1' ? 0.9 : 0) },
  { key: 'thalach', label: 'Maximum heart rate achieved', short: 'Max heart rate', group: 'symptoms', type: 'number', unit: 'bpm', min: 60, max: 220, step: 1, bench: [71, 202], ref: 150,
    help: 'Highest heart rate reached during the exercise test.',
    f: (v) => -0.025 * v },
  { key: 'oldpeak', label: 'ST depression (exercise vs rest)', short: 'ST depression', group: 'symptoms', type: 'number', unit: 'mm', min: 0, max: 7, step: 0.1, bench: [0, 6.2], ref: 1.0,
    help: 'ST-segment depression induced by exercise relative to rest, in mm.',
    f: (v) => 0.5 * v },
  { key: 'slope', label: 'Slope of peak-exercise ST segment', short: 'ST slope', group: 'symptoms', type: 'select', ref: '2',
    options: [{ v: '1', l: 'Upsloping' }, { v: '2', l: 'Flat' }, { v: '3', l: 'Downsloping' }],
    help: 'UCI coding 1–3.',
    f: (v) => ({ '1': -0.4, '2': 0.4, '3': 0.3 })[v] },
  { key: 'trestbps', label: 'Resting systolic blood pressure', short: 'Resting BP', group: 'resting', type: 'number', unit: 'mm Hg', min: 70, max: 250, step: 1, bench: [94, 200], ref: 130,
    help: 'Systolic blood pressure on admission, in mm Hg.',
    f: (v) => 0.012 * v },
  { key: 'chol', label: 'Serum cholesterol', short: 'Cholesterol', group: 'resting', type: 'number', unit: 'mg/dL', min: 100, max: 600, step: 1, bench: [126, 564], ref: 240,
    help: 'Total serum cholesterol in mg/dL.',
    f: (v) => 0.004 * v },
  { key: 'fbs', label: 'Fasting blood sugar > 120 mg/dL', short: 'Fasting sugar', group: 'resting', type: 'select', ref: '0',
    options: [{ v: '0', l: 'No (≤ 120 mg/dL)' }, { v: '1', l: 'Yes (> 120 mg/dL)' }],
    help: 'Coded 1 = true, 0 = false in the dataset.',
    f: (v) => (v === '1' ? 0.2 : 0) },
  { key: 'restecg', label: 'Resting electrocardiogram', short: 'Resting ECG', group: 'resting', type: 'select', ref: '0',
    options: [{ v: '0', l: 'Normal' }, { v: '1', l: 'ST-T wave abnormality' }, { v: '2', l: 'Probable/definite LV hypertrophy' }],
    help: 'UCI coding 0–2 (LV = left ventricular).',
    f: (v) => ({ '0': 0, '1': 0.3, '2': 0.2 })[v] },
  { key: 'ca', label: 'Major vessels coloured by fluoroscopy', short: 'Major vessels', group: 'tests', type: 'number', unit: 'vessels', min: 0, max: 3, step: 1, bench: [0, 3], ref: 0, integer: true,
    help: 'Number of major vessels (0–3) with visible calcium on fluoroscopy.',
    f: (v) => 0.8 * v },
  { key: 'thal', label: 'Thallium stress-test result', short: 'Thallium test', group: 'tests', type: 'select', ref: '3',
    options: [{ v: '3', l: 'Normal' }, { v: '6', l: 'Fixed defect' }, { v: '7', l: 'Reversible defect' }],
    help: 'UCI coding 3 = normal, 6 = fixed defect, 7 = reversible defect.',
    f: (v) => ({ '3': 0, '6': 0.4, '7': 1.0 })[v] }
];

export const GROUPS = [
  { id: 'demographics', title: 'Demographics', blurb: 'Basic patient characteristics' },
  { id: 'symptoms', title: 'Symptoms & exercise test', blurb: 'Chest pain and stress-test findings' },
  { id: 'resting', title: 'Resting measurements', blurb: 'Blood pressure, lipids, glucose and ECG' },
  { id: 'tests', title: 'Imaging & nuclear tests', blurb: 'Fluoroscopy and thallium scintigraphy' }
];

export const REFERENCE_PROFILE = Object.fromEntries(FEATURES.map((f) => [f.key, String(f.ref)]));

export const EXAMPLES = [
  { id: 'lower', name: 'Example A', note: 'Fewer abnormal findings',
    values: { age: '46', sex: '0', cp: '3', exang: '0', thalach: '172', oldpeak: '0', slope: '1', trestbps: '118', chol: '205', fbs: '0', restecg: '0', ca: '0', thal: '3' } },
  { id: 'mid', name: 'Example B', note: 'Mixed findings',
    values: { age: '58', sex: '1', cp: '2', exang: '0', thalach: '150', oldpeak: '1.2', slope: '2', trestbps: '135', chol: '250', fbs: '0', restecg: '0', ca: '0', thal: '3' } },
  { id: 'higher', name: 'Example C', note: 'More abnormal findings',
    values: { age: '60', sex: '1', cp: '4', exang: '0', thalach: '145', oldpeak: '1.4', slope: '2', trestbps: '138', chol: '245', fbs: '0', restecg: '0', ca: '0', thal: '7' } }
];

export function validate(values) {
  const errors = {};
  const warnings = {};
  for (const f of FEATURES) {
    const raw = values[f.key];
    if (raw === undefined || raw === '') { errors[f.key] = 'This field is required.'; continue; }
    if (f.type === 'select') {
      if (!f.options.some((o) => o.v === raw)) errors[f.key] = 'Choose one of the listed options.';
      continue;
    }
    const n = Number(String(raw).replace(',', '.'));
    if (!/^-?\d*\.?\d+$/.test(String(raw).trim().replace(',', '.')) || Number.isNaN(n)) { errors[f.key] = 'Enter a number.'; continue; }
    if (f.integer && !Number.isInteger(n)) { errors[f.key] = 'Enter a whole number.'; continue; }
    if (n < f.min || n > f.max) { errors[f.key] = `Enter a value between ${f.min} and ${f.max} ${f.unit}.`; continue; }
    if (n < f.bench[0] || n > f.bench[1]) warnings[f.key] = `Outside the benchmark range (${f.bench[0]}–${f.bench[1]} ${f.unit}); the illustrative score extrapolates.`;
  }
  return { errors, warnings, valid: Object.keys(errors).length === 0 };
}

const sigmoid = (z) => 1 / (1 + Math.exp(-z));
const parse = (f, raw) => (f.type === 'number' ? Number(String(raw).replace(',', '.')) : raw);

export function score(values) {
  const contributions = FEATURES.map((f) => {
    const x = parse(f, values[f.key]);
    const r = f.type === 'number' ? f.ref : String(f.ref);
    return { key: f.key, label: f.short, value: f.type === 'select' ? f.options.find((o) => o.v === values[f.key])?.l : `${x} ${f.unit}`, contribution: f.f(x) - f.f(r) };
  });
  const logit = BASE_LOGIT + contributions.reduce((a, c) => a + c.contribution, 0);
  return { logit, probability: sigmoid(logit), baseLogit: BASE_LOGIT, baseProbability: sigmoid(BASE_LOGIT), contributions };
}

export function category(p) {
  if (p < 0.3) return { id: 'lower', label: 'Lower illustrative score', tone: 'teal' };
  if (p < 0.6) return { id: 'mid', label: 'Intermediate illustrative score', tone: 'amber' };
  return { id: 'higher', label: 'Higher illustrative score', tone: 'rose' };
}
