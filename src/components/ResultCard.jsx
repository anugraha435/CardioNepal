import React from 'react';
import { Gauge, TriangleAlert } from 'lucide-react';
import { category } from '../lib/model.js';
import { SectionTitle, Pill } from './ui.jsx';

const TONES = {
  teal: { stroke: '#0d9488', text: 'text-teal-700', bar: 'bg-teal-600' },
  amber: { stroke: '#d97706', text: 'text-amber-700', bar: 'bg-amber-500' },
  rose: { stroke: '#e11d48', text: 'text-rose-700', bar: 'bg-rose-600' }
};

function GaugeDial({ p, tone }) {
  const cx = 110, cy = 105, r = 84;
  const pt = (t) => { const a = Math.PI * (1 - t); return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; };
  const arc = (t0, t1) => { const [x0, y0] = pt(t0), [x1, y1] = pt(t1); return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`; };
  const [nx, ny] = pt(Math.min(Math.max(p, 0.001), 0.999));
  return (
    <svg viewBox="0 0 220 128" className="mx-auto w-full max-w-[280px]" role="img" aria-label={`Illustrative score ${(p * 100).toFixed(0)} percent`}>
      <path d={arc(0, 1)} fill="none" stroke="#e2e8f0" strokeWidth="16" strokeLinecap="round" />
      <path d={arc(0, 0.3)} fill="none" stroke="#99f6e4" strokeWidth="16" strokeLinecap="butt" opacity=".9" />
      <path d={arc(0.3, 0.6)} fill="none" stroke="#fde68a" strokeWidth="16" strokeLinecap="butt" opacity=".9" />
      <path d={arc(0.6, 1)} fill="none" stroke="#fecdd3" strokeWidth="16" strokeLinecap="butt" opacity=".9" />
      <path d={arc(0, Math.max(p, 0.004))} fill="none" stroke={TONES[tone].stroke} strokeWidth="16" strokeLinecap="round" style={{ transition: 'all .4s' }} />
      <circle cx={nx} cy={ny} r="7" fill="#fff" stroke={TONES[tone].stroke} strokeWidth="3" />
      <text x="110" y="98" textAnchor="middle" className="fill-slate-900" style={{ fontSize: 34, fontWeight: 700 }}>{(p * 100).toFixed(0)}%</text>
      <text x="110" y="118" textAnchor="middle" className="fill-slate-500" style={{ fontSize: 10 }}>illustrative score</text>
      <text x="22" y="124" textAnchor="middle" className="fill-slate-400" style={{ fontSize: 9 }}>0</text>
      <text x="198" y="124" textAnchor="middle" className="fill-slate-400" style={{ fontSize: 9 }}>100</text>
    </svg>
  );
}

export function ResultCard({ valid, result, hasWarnings }) {
  if (!valid || !result) {
    return (
      <section aria-labelledby="res-title" className="card card-pad">
        <SectionTitle icon={Gauge} title="Illustrative score"><span id="res-title">Waiting for valid inputs</span></SectionTitle>
        <div role="status" className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
          Correct the highlighted fields on the left to see the score and its explanation.
        </div>
      </section>
    );
  }
  const cat = category(result.probability);
  const t = TONES[cat.tone];
  const pct = result.probability * 100;
  return (
    <section aria-labelledby="res-title" className="card card-pad" aria-live="polite">
      <SectionTitle icon={Gauge} title="Illustrative score"><span id="res-title">Output of a transparent simulation, not a trained model</span></SectionTitle>
      <GaugeDial p={result.probability} tone={cat.tone} />
      <div className="mt-2 flex flex-col items-center gap-2 text-center">
        <Pill tone={cat.tone}>{cat.label}</Pill>
        <p className="text-sm text-slate-600">
          Compared with <strong className="text-slate-800">{(result.baseProbability * 100).toFixed(0)}%</strong> for the reference profile, which is set to the share of benchmark patients labelled “present” (139 of 303).
        </p>
      </div>

      <div className="mt-5" aria-hidden="true">
        <div className="relative h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="absolute inset-y-0 left-0 w-[30%] bg-teal-200/70" /><div className="absolute inset-y-0 left-[30%] w-[30%] bg-amber-200/70" /><div className="absolute inset-y-0 left-[60%] right-0 bg-rose-200/70" />
          <div className={`absolute inset-y-0 left-0 ${t.bar} opacity-90 transition-all duration-500`} style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-1 flex justify-between text-[11px] text-slate-500"><span>Lower &lt; 30%</span><span>Intermediate 30–60%</span><span>Higher &gt; 60%</span></div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-slate-50 p-3"><dt className="text-xs text-slate-500">Log-odds f(x)</dt><dd className="font-semibold text-slate-900">{result.logit.toFixed(2)}</dd></div>
        <div className="rounded-lg bg-slate-50 p-3"><dt className="text-xs text-slate-500">Base value (log-odds)</dt><dd className="font-semibold text-slate-900">{result.baseLogit.toFixed(2)}</dd></div>
      </dl>

      {hasWarnings && (
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          One or more inputs lie outside the range seen in the benchmark data, so this score is extrapolated.
        </p>
      )}
      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        The bands (30% and 60%) are arbitrary display cut-offs, not clinical thresholds. The score is not a probability of disease or a 10-year risk.
      </p>
    </section>
  );
}
