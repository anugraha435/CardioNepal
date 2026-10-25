import React from 'react';
import { Database, BarChart3, ShieldAlert, Layers, ExternalLink, GitBranch } from 'lucide-react';
import { FEATURES } from '../lib/model.js';
import { METRICS, REPORT } from '../data/metrics.js';
import { SectionTitle, Pill } from './ui.jsx';

const fmt = (v) => (v === null || v === undefined ? null : Number(v).toFixed(3));
const Cell = ({ v }) => (fmt(v) ? <span className="tabular-nums text-slate-900">{fmt(v)}</span> : <span className="text-xs text-slate-400">Not yet reported</span>);

function MetricsTable({ caption, cols }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
          <tr><th scope="col" className="px-3 py-2.5">Model</th>{cols.map((c) => <th key={c.k} scope="col" className="px-3 py-2.5">{c.l}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {METRICS.map((m) => (
            <tr key={m.id} className={REPORT.selectedModel === m.id ? 'bg-teal-50/60' : ''}>
              <th scope="row" className="whitespace-nowrap px-3 py-2.5 text-left font-medium text-slate-900">{m.name}{REPORT.selectedModel === m.id && <span className="ml-2"><Pill tone="teal">Selected</Pill></span>}</th>
              {cols.map((c) => <td key={c.k} className="whitespace-nowrap px-3 py-2.5"><Cell v={m[c.k]} /></td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const MODELS = [
  { n: 'Logistic Regression', d: 'Linear model with a sigmoid output; interpretable baseline.' },
  { n: 'Decision Tree', d: 'Rule-based splits; easy to read but high variance on small data.' },
  { n: 'Random Forest', d: 'Ensemble of bootstrap-trained trees that averages out variance.' },
  { n: 'Support Vector Machine', d: 'Maximum-margin classifier, here with a tunable kernel.' }
];

export function ModelInfo() {
  const anyReported = METRICS.some((m) => Object.entries(m).some(([k, v]) => !['id', 'name'].includes(k) && v !== null));
  return (
    <div className="space-y-6">
      <section aria-labelledby="prov-title" className="card card-pad">
        <SectionTitle icon={Database} title="Data provenance"><span id="prov-title">Where the benchmark data come from, and what they are not.</span></SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          <ul className="space-y-2.5 text-sm leading-relaxed text-slate-700">
            <li><strong className="text-slate-900">Source:</strong> UCI Machine Learning Repository, “Heart Disease” dataset (ID 45), Cleveland subset; creators Janosi, Steinbrunn, Pfisterer and Detrano. Licence CC BY 4.0.</li>
            <li><strong className="text-slate-900">Population:</strong> 303 patients who underwent coronary angiography at the Cleveland Clinic Foundation in the United States (1980s).</li>
            <li><strong className="text-slate-900">Outcome:</strong> angiographic heart-disease status. The original 0–4 label is merged into absent (0; 164 patients) and present (1–4; 139 patients).</li>
            <li><strong className="text-slate-900">Missing values:</strong> 4 in “major vessels” and 2 in “thallium”.</li>
          </ul>
          <div className="space-y-3">
            <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-medium leading-relaxed text-amber-950">
              No data from the Nepal WHO STEPS survey, and none from Nepalese participants, were used to train, tune or test any model. The benchmark does not represent the Nepalese population.
            </p>
            <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
              The label describes angiographic status at examination. It is a classification target, not a future event, and it has no prediction horizon.
            </p>
            <a className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 underline-offset-2 hover:underline" href="https://doi.org/10.24432/C52P4X" target="_blank" rel="noreferrer noopener">
              Dataset DOI 10.24432/C52P4X <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <h3 className="mt-6 text-sm font-semibold text-slate-900">The 13 input variables</h3>
        <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <caption className="sr-only">Input variables with units and ranges observed in the benchmark</caption>
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr><th scope="col" className="px-3 py-2.5">Variable</th><th scope="col" className="px-3 py-2.5">Type</th><th scope="col" className="px-3 py-2.5">Values / range in benchmark</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {FEATURES.map((f) => (
                <tr key={f.key}>
                  <th scope="row" className="px-3 py-2 text-left font-medium text-slate-900">{f.label}</th>
                  <td className="px-3 py-2 text-slate-600">{f.type === 'select' ? 'Categorical' : 'Numeric'}</td>
                  <td className="px-3 py-2 text-slate-600">{f.type === 'select' ? f.options.map((o) => o.l).join(' · ') : `${f.bench[0]}–${f.bench[1]} ${f.unit}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="perf-title" className="card card-pad">
        <SectionTitle icon={BarChart3} title="Model performance (thesis Chapter 4)">
          <span id="perf-title">Held-out test set of {REPORT.testSetSize} patients; positive class = heart disease present.</span>
        </SectionTitle>
        {!anyReported && (
          <p role="status" className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm leading-relaxed text-blue-950">
            No evaluation results are bundled with this prototype yet. The tables fill automatically once the measured values are entered in <code className="rounded bg-white px-1 py-0.5 text-xs">src/data/metrics.js</code>; until then each cell reads “Not yet reported”, so no figure is invented.
          </p>
        )}
        <div className="space-y-5">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Discrimination and classification</h3>
            <MetricsTable caption="Discrimination and classification metrics on the held-out test set" cols={[
              { k: 'rocAuc', l: 'ROC-AUC' }, { k: 'prAuc', l: 'PR-AUC' }, { k: 'sensitivity', l: 'Sensitivity' }, { k: 'specificity', l: 'Specificity' }, { k: 'precision', l: 'Precision' }, { k: 'f1', l: 'F1' }, { k: 'accuracy', l: 'Accuracy' }]} />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Calibration</h3>
            <MetricsTable caption="Brier score before and after calibration" cols={[{ k: 'brier', l: 'Brier (uncalibrated)' }, { k: 'brierCalibrated', l: 'Brier (after calibration)' }]} />
            <p className="mt-2 text-xs text-slate-500">Lower Brier scores indicate better probability estimates. ROC-AUC measures ranking, not calibration.</p>
          </div>
        </div>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-3"><dt className="text-xs text-slate-500">Decision threshold</dt><dd className="font-semibold text-slate-900">{REPORT.threshold ?? 'Not yet reported'}</dd></div>
          <div className="rounded-lg bg-slate-50 p-3"><dt className="text-xs text-slate-500">Selected model</dt><dd className="font-semibold text-slate-900">{METRICS.find((m) => m.id === REPORT.selectedModel)?.name ?? 'Not yet reported'}</dd></div>
          <div className="rounded-lg bg-slate-50 p-3"><dt className="text-xs text-slate-500">Test-set size</dt><dd className="font-semibold text-slate-900">{REPORT.testSetSize}</dd></div>
        </dl>
        {REPORT.note && <p className="mt-3 text-xs text-slate-500">{REPORT.note}</p>}
        <p className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
          With only 61 test patients these estimates are imprecise and differences between models may lie within sampling error. These numbers describe the trained models in the thesis. They do not describe the illustrative score shown on the Assessment tab.
        </p>
      </section>

      <section aria-labelledby="meth-title" className="card card-pad">
        <SectionTitle icon={Layers} title="Methodology at a glance"><span id="meth-title">The leakage-aware protocol used in the thesis.</span></SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          <ol className="space-y-2 text-sm leading-relaxed text-slate-700">
            {['Stratified 80/20 split (242 training, 61 test patients); the test set is used once.',
              'Five-fold stratified cross-validation on the training set for tuning.',
              'Imputation, one-hot encoding, scaling and SMOTE are fitted inside each training fold only.',
              'Calibration method and decision threshold are chosen from training data, never from the test set.',
              'SHAP explanations are computed for the selected model.'].map((t, i) => (
              <li key={i} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-800">{i + 1}</span><span>{t}</span></li>
            ))}
          </ol>
          <div className="grid gap-2 sm:grid-cols-2">
            {MODELS.map((m) => (
              <div key={m.n} className="rounded-lg border border-slate-200 p-3"><p className="flex items-center gap-1.5 text-sm font-semibold text-slate-900"><GitBranch className="h-4 w-4 text-teal-700" aria-hidden="true" />{m.n}</p><p className="mt-1 text-xs leading-relaxed text-slate-600">{m.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="lim-title" className="card card-pad">
        <SectionTitle icon={ShieldAlert} title="Limitations"><span id="lim-title">Read these before interpreting anything in this app.</span></SectionTitle>
        <ul className="grid gap-x-8 gap-y-2 text-sm leading-relaxed text-slate-700 md:grid-cols-2">
          {['Single-centre US data from the 1980s; patients were referred for angiography, so they are not a general population.',
            'Only 303 records; the test set has 61. Estimates are imprecise.',
            'The label is a cross-sectional angiographic result, not a future-risk or 10-year-risk outcome.',
            'Internal evaluation only: no external validation, and no validation on Nepalese data.',
            'SHAP-style explanations describe a model, not causes, and can be unstable with correlated inputs.',
            'This prototype’s score is a hand-specified simulation, not an export of the fitted model, and has no clinical meaning.'].map((t) => (
            <li key={t} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />{t}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
