import React from 'react';
import { RotateCcw, UserRound, FlaskConical, TriangleAlert, CircleAlert } from 'lucide-react';
import { FEATURES, GROUPS, EXAMPLES } from '../lib/model.js';
import { InfoTip, SectionTitle } from './ui.jsx';

function Field({ f, value, error, warning, onChange }) {
  const id = `f-${f.key}`;
  const msgId = `${id}-msg`;
  const common = { id, name: f.key, 'aria-invalid': !!error, 'aria-describedby': error || warning ? msgId : undefined, className: `input ${error ? 'input-error' : ''}` };
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1 text-sm font-medium text-slate-800">
        <span>{f.label}{f.unit && <span className="font-normal text-slate-500"> ({f.unit})</span>}</span>
        <InfoTip text={f.help} />
      </label>
      {f.type === 'select' ? (
        <select {...common} value={value} onChange={(e) => onChange(f.key, e.target.value)}>
          {f.options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
      ) : (
        <input {...common} type="text" inputMode="decimal" autoComplete="off" value={value} onChange={(e) => onChange(f.key, e.target.value)} placeholder={`${f.min}–${f.max}`} />
      )}
      {error && <p id={msgId} className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-rose-700"><CircleAlert className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />{error}</p>}
      {!error && warning && <p id={msgId} className="mt-1.5 flex items-start gap-1.5 text-xs text-amber-800"><TriangleAlert className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />{warning}</p>}
    </div>
  );
}

export function PatientForm({ values, errors, warnings, onChange, onLoad, onReset }) {
  const errCount = Object.keys(errors).length;
  return (
    <section aria-labelledby="form-title" className="card card-pad">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionTitle icon={UserRound} title="Patient assessment inputs">
          The 13 predictor variables of the UCI Cleveland benchmark. <span id="form-title" className="sr-only">Patient assessment inputs</span>
        </SectionTitle>
        <button type="button" onClick={onReset} className="btn-ghost"><RotateCcw className="h-4 w-4" aria-hidden="true" />Reset to reference</button>
      </div>

      <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-600"><FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />Fictional example profiles</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button key={ex.id} type="button" onClick={() => onLoad(ex.values)} className="btn-ghost !py-1.5 text-xs">
              <span className="font-semibold">{ex.name}</span><span className="font-normal text-slate-500">{ex.note}</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">Invented values for demonstration. They are not records from the dataset.</p>
      </div>

      {errCount > 0 && (
        <div role="alert" className="mb-5 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{errCount === 1 ? '1 input needs attention.' : `${errCount} inputs need attention.`} The score is paused until every field is valid.</p>
        </div>
      )}

      <div className="space-y-7">
        {GROUPS.map((g) => (
          <fieldset key={g.id}>
            <legend className="mb-3 w-full border-b border-slate-100 pb-2">
              <span className="text-sm font-semibold text-slate-900">{g.title}</span>
              <span className="ml-2 text-xs text-slate-500">{g.blurb}</span>
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {FEATURES.filter((f) => f.group === g.id).map((f) => (
                <Field key={f.key} f={f} value={values[f.key]} error={errors[f.key]} warning={warnings[f.key]} onChange={onChange} />
              ))}
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  );
}
