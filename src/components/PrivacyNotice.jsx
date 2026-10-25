import React from 'react';
import { ShieldCheck, Monitor, Cpu, Ban, Server, ArrowRight, Lock, Wrench } from 'lucide-react';
import { SectionTitle } from './ui.jsx';

function Node({ icon: Icon, title, text, dashed }) {
  return (
    <div className={`flex-1 rounded-xl border p-4 ${dashed ? 'border-dashed border-slate-300 bg-slate-50 text-slate-500' : 'border-teal-200 bg-teal-50/60'}`}>
      <Icon className={`h-6 w-6 ${dashed ? 'text-slate-400' : 'text-teal-700'}`} aria-hidden="true" />
      <p className={`mt-2 text-sm font-semibold ${dashed ? 'text-slate-600' : 'text-slate-900'}`}>{title}</p>
      <p className="mt-1 text-xs leading-relaxed">{text}</p>
    </div>
  );
}

export function PrivacyNotice() {
  return (
    <div className="space-y-6">
      <section aria-labelledby="priv-title" className="card card-pad">
        <SectionTitle icon={ShieldCheck} title="Privacy by design"><span id="priv-title">What happens to the values you type.</span></SectionTitle>
        <p className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm font-medium leading-relaxed text-teal-950">
          All calculations run locally in your browser. No patient data is transmitted or stored.
        </p>
        <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-slate-700 md:grid-cols-2">
          <li className="flex gap-2"><Lock className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />Inputs live only in the page’s memory. Reloading or closing the tab erases them.</li>
          <li className="flex gap-2"><Lock className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />The app makes no network requests with your inputs, and it writes nothing to cookies, local storage or the URL.</li>
          <li className="flex gap-2"><Lock className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />There is no account, analytics or tracking in the application code.</li>
          <li className="flex gap-2"><Lock className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />The example profiles are fictional and are not records from the dataset.</li>
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          Whoever hosts this page may keep ordinary web-server logs of page requests, but those contain no form inputs, because inputs never leave the browser. Even so, please do not enter real patient information into a research prototype.
        </p>
      </section>

      <section aria-labelledby="arch-title" className="card card-pad">
        <SectionTitle icon={Cpu} title="Architecture"><span id="arch-title">A static, client-side single-page application.</span></SectionTitle>
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-stretch" role="group" aria-label="Data flow diagram">
          <Node icon={Monitor} title="1. Input form" text="React state in your browser, with client-side range validation." />
          <ArrowRight className="mx-auto h-5 w-5 shrink-0 rotate-90 text-slate-400 md:rotate-0" aria-hidden="true" />
          <Node icon={Cpu} title="2. Scoring function" text="Transparent JavaScript additive logit that returns a score and per-feature contributions." />
          <ArrowRight className="mx-auto h-5 w-5 shrink-0 rotate-90 text-slate-400 md:rotate-0" aria-hidden="true" />
          <Node icon={Monitor} title="3. Display" text="Gauge and waterfall rendered locally." />
          <Ban className="mx-auto h-5 w-5 shrink-0 text-rose-400" aria-label="No connection" />
          <Node dashed icon={Server} title="No server" text="No API, database or backend is called." />
        </div>
        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-3"><dt className="text-xs text-slate-500">Front end</dt><dd className="font-medium text-slate-900">React 18, Vite, Tailwind CSS</dd></div>
          <div className="rounded-lg bg-slate-50 p-3"><dt className="text-xs text-slate-500">Icons</dt><dd className="font-medium text-slate-900">Lucide React</dd></div>
          <div className="rounded-lg bg-slate-50 p-3"><dt className="text-xs text-slate-500">Back end</dt><dd className="font-medium text-slate-900">None</dd></div>
        </dl>
      </section>

      <section aria-labelledby="sim-title" className="card card-pad">
        <SectionTitle icon={Wrench} title="What is simulated"><span id="sim-title">Why the score on the Assessment tab is illustrative.</span></SectionTitle>
        <div className="space-y-3 text-sm leading-relaxed text-slate-700">
          <p>The scoring function is a hand-specified additive logistic-type formula. Its weights were chosen for demonstration and were not estimated from the benchmark data or exported from any trained model. The base value equals the log-odds of the benchmark’s class prevalence (139 of 303).</p>
          <p>Because the formula is additive, the contribution of each input relative to the reference profile can be computed exactly, which is what the waterfall displays. This mimics the form of a SHAP explanation for a linear model without being one for a trained model.</p>
          <p><strong className="text-slate-900">Future work:</strong> replace the scoring function with a call to a small back-end API (for example Flask or FastAPI) that loads the serialised, fitted pipeline, and add a parity test that compares the interface’s output with the fitted model on a set of test records.</p>
        </div>
      </section>
    </div>
  );
}
