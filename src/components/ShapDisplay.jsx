import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { SectionTitle } from './ui.jsx';

export function ShapDisplay({ result }) {
  const [all, setAll] = useState(false);
  if (!result) return null;
  const sorted = [...result.contributions].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
  const shown = all ? sorted : sorted.slice(0, 7);
  const rest = sorted.slice(shown.length);
  const restSum = rest.reduce((a, c) => a + c.contribution, 0);

  // Waterfall: cumulative steps from base to f(x)
  const steps = [];
  let cum = result.baseLogit;
  for (const c of shown) { steps.push({ ...c, from: cum, to: cum + c.contribution }); cum += c.contribution; }
  if (rest.length) { steps.push({ key: 'rest', label: `${rest.length} other features`, value: '', contribution: restSum, from: cum, to: cum + restSum }); cum += restSum; }
  const vals = [result.baseLogit, ...steps.flatMap((s) => [s.from, s.to])];
  const lo = Math.min(...vals), hi = Math.max(...vals); const pad = (hi - lo) * 0.06 || 0.5;
  const min = lo - pad, max = hi + pad; const pos = (v) => ((v - min) / (max - min)) * 100;

  return (
    <section aria-labelledby="shap-title" className="card card-pad">
      <SectionTitle icon={BarChart3} title="Feature attribution (SHAP-style waterfall)">
        <span id="shap-title">How each input moves the score away from the base value, in log-odds units.</span>
      </SectionTitle>

      <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600" aria-hidden="true">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-rose-500" />Raises the score</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-teal-600" />Lowers the score</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-px bg-slate-500" />Base value {result.baseLogit.toFixed(2)}</span>
      </div>

      <div role="table" aria-label="Feature contributions in log-odds, largest first" className="space-y-1.5">
        <div role="row" className="hidden grid-cols-[minmax(0,10rem)_1fr_4.5rem] gap-3 px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:grid">
          <span role="columnheader">Feature (value)</span><span role="columnheader">Cumulative effect on log-odds</span><span role="columnheader" className="text-right">Impact</span>
        </div>
        {steps.map((s) => {
          const zero = Math.abs(s.contribution) < 0.005; const up = s.contribution >= 0; const l = pos(Math.min(s.from, s.to)); const w = Math.max(pos(Math.max(s.from, s.to)) - l, 0.8);
          return (
            <div role="row" key={s.key} className="grid grid-cols-[minmax(0,1fr)_4.5rem] items-center gap-x-3 gap-y-1 rounded-md px-1 py-1 hover:bg-slate-50 sm:grid-cols-[minmax(0,10rem)_1fr_4.5rem]">
              <div role="cell" className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">{s.label}</p>
                {s.value && <p className="truncate text-xs text-slate-500">{s.value}</p>}
              </div>
              <div role="cell" className="relative order-last col-span-2 h-5 sm:order-none sm:col-span-1" aria-hidden="true">
                <div className="absolute inset-y-2 left-0 right-0 rounded bg-slate-100" />
                <div className="absolute inset-y-0 w-px bg-slate-500/70" style={{ left: `${pos(result.baseLogit)}%` }} />
                <div className={`absolute inset-y-0.5 rounded-sm transition-all duration-500 ${zero ? 'bg-slate-400' : up ? 'bg-rose-500' : 'bg-teal-600'}`} style={{ left: `${l}%`, width: `${w}%` }} />
              </div>
              <div role="cell" className={`text-right text-sm font-semibold tabular-nums ${zero ? 'text-slate-500' : up ? 'text-rose-700' : 'text-teal-700'}`}>
                {zero ? '0.00' : (up ? '+' : '−') + Math.abs(s.contribution).toFixed(2)}
              </div>
            </div>
          );
        })}
        <div role="row" className="mt-2 flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2.5 text-sm text-white">
          <span role="cell">Final log-odds f(x) = base {result.baseLogit.toFixed(2)} + sum of impacts</span>
          <span role="cell" className="font-semibold tabular-nums">{result.logit.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <button type="button" onClick={() => setAll((a) => !a)} className="btn-ghost !py-1.5 text-xs" aria-pressed={all}>{all ? 'Show top 7 only' : `Show all ${sorted.length} features`}</button>
        <p className="text-xs text-slate-500">Largest absolute impact: {sorted[0].label} ({Math.abs(sorted[0].contribution).toFixed(2)}).</p>
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
        <p className="mb-1 font-semibold text-slate-700">How to read this</p>
        <p>
          The scoring function is additive, so each feature’s contribution is its exact effect relative to a fixed reference profile (age 55, male, non-anginal chest pain, resting BP 130, cholesterol 240, and so on), the same quantity SHAP reports for a linear model.
          These are explanations of this simulation. They are not causal effects, and they do not describe a fitted model or any real patient.
        </p>
      </div>
    </section>
  );
}
