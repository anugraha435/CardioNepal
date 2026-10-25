import React, { useState } from 'react';
import { Leaf, Info, Salad, Footprints, Droplets } from 'lucide-react';
import { SectionTitle } from './ui.jsx';

const SALT = [
  { v: 'low', l: 'About 5 g/day or less' }, { v: 'mid', l: 'About 5–8 g/day' }, { v: 'high', l: 'More than 8 g/day' }, { v: 'unknown', l: 'I do not know' }
];

function Note({ icon: Icon, title, text, tone }) {
  const tones = { ok: 'border-teal-200 bg-teal-50 text-teal-900', info: 'border-slate-200 bg-slate-50 text-slate-800', warn: 'border-amber-200 bg-amber-50 text-amber-900' };
  return (
    <div className={`flex gap-3 rounded-lg border p-3 ${tones[tone]}`}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div><p className="text-sm font-semibold">{title}</p><p className="text-sm leading-relaxed opacity-90">{text}</p></div>
    </div>
  );
}

export function LifestyleContext() {
  const [salt, setSalt] = useState('unknown');
  const [fv, setFv] = useState('');
  const [pa, setPa] = useState('');

  const fvN = fv === '' ? null : Number(fv);
  const paN = pa === '' ? null : Number(pa);
  const fvBad = fv !== '' && (!Number.isFinite(fvN) || fvN < 0 || fvN > 20);
  const paBad = pa !== '' && (!Number.isFinite(paN) || paN < 0 || paN > 2000);

  return (
    <section aria-labelledby="ctx-title" className="card card-pad">
      <SectionTitle icon={Leaf} title="Lifestyle context">
        <span id="ctx-title">Optional questions to put the benchmark variables in context.</span>
      </SectionTitle>
      <p className="mb-4 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm font-medium text-blue-900">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        Educational context only — does not enter the score.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="ctx-salt" className="mb-1.5 block text-sm font-medium text-slate-800">Daily salt intake</label>
          <select id="ctx-salt" className="input" value={salt} onChange={(e) => setSalt(e.target.value)}>
            {SALT.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ctx-fv" className="mb-1.5 block text-sm font-medium text-slate-800">Fruit &amp; vegetable portions per day</label>
          <input id="ctx-fv" className={`input ${fvBad ? 'input-error' : ''}`} inputMode="decimal" value={fv} onChange={(e) => setFv(e.target.value)} placeholder="0–20" aria-invalid={fvBad} aria-describedby={fvBad ? 'ctx-fv-err' : undefined} />
          {fvBad && <p id="ctx-fv-err" className="mt-1.5 text-xs font-medium text-rose-700">Enter a number between 0 and 20.</p>}
        </div>
        <div>
          <label htmlFor="ctx-pa" className="mb-1.5 block text-sm font-medium text-slate-800">Physical activity (minutes per week)</label>
          <input id="ctx-pa" className={`input ${paBad ? 'input-error' : ''}`} inputMode="decimal" value={pa} onChange={(e) => setPa(e.target.value)} placeholder="0–2000" aria-invalid={paBad} aria-describedby={paBad ? 'ctx-pa-err' : undefined} />
          {paBad && <p id="ctx-pa-err" className="mt-1.5 text-xs font-medium text-rose-700">Enter a number between 0 and 2000.</p>}
        </div>
      </div>

      <div className="mt-5 grid gap-3" aria-live="polite">
        {salt === 'unknown' && <Note icon={Droplets} tone="info" title="Salt" text="WHO recommends less than 5 g of salt per day. The 2019 Nepal STEPS survey reported average intake nearly double that." />}
        {salt === 'low' && <Note icon={Droplets} tone="ok" title="Salt" text="This is within the WHO recommendation of less than 5 g per day." />}
        {salt === 'mid' && <Note icon={Droplets} tone="warn" title="Salt" text="This is above the WHO recommendation of less than 5 g per day. Reducing added salt and processed foods lowers sodium intake." />}
        {salt === 'high' && <Note icon={Droplets} tone="warn" title="Salt" text="This is well above the WHO recommendation of less than 5 g per day. Reducing added salt and processed foods lowers sodium intake." />}

        {fvN === null || fvBad ? <Note icon={Salad} tone="info" title="Fruit & vegetables" text="WHO recommends at least five portions (about 400 g) per day. The 2019 Nepal STEPS survey found about 97% of adults ate fewer than five." />
          : fvN >= 5 ? <Note icon={Salad} tone="ok" title="Fruit & vegetables" text={`${fvN} portions per day meets the WHO recommendation of at least five.`} />
          : <Note icon={Salad} tone="warn" title="Fruit & vegetables" text={`${fvN} portions per day is below the WHO recommendation of at least five.`} />}

        {paN === null || paBad ? <Note icon={Footprints} tone="info" title="Physical activity" text="WHO recommends at least 150 minutes of moderate-intensity activity per week for adults." />
          : paN >= 150 ? <Note icon={Footprints} tone="ok" title="Physical activity" text={`${paN} minutes per week meets the WHO minimum of 150.`} />
          : <Note icon={Footprints} tone="warn" title="Physical activity" text={`${paN} minutes per week is below the WHO minimum of 150 minutes of moderate activity.`} />}
      </div>
      <p className="mt-3 text-xs text-slate-500">Nothing you enter here is used by the scoring function, stored or sent anywhere.</p>
    </section>
  );
}
