import React from 'react';
import { HeartPulse, TriangleAlert, ClipboardList, Database, ShieldCheck } from 'lucide-react';

export const TABS = [
  { id: 'assess', label: 'Assessment', icon: ClipboardList },
  { id: 'model', label: 'Model & Data', icon: Database },
  { id: 'privacy', label: 'Privacy & Architecture', short: 'Privacy', icon: ShieldCheck }
];

export function Header({ tab, setTab }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 shadow-inner"><HeartPulse className="h-6 w-6" aria-hidden="true" /></span>
          <span>
            <span className="block text-lg font-semibold leading-tight tracking-tight">CardioNepal</span>
            <span className="block text-xs leading-tight text-slate-300">Explainable Clinical Risk &amp; Benchmark Exploration Tool</span>
          </span>
        </a>
        <nav aria-label="Main" className="ml-auto flex w-full gap-1 overflow-x-auto sm:w-auto" role="tablist">
          {TABS.map((t) => {
            const Icon = t.icon; const active = tab === t.id;
            return (
              <button key={t.id} role="tab" aria-selected={active} aria-controls={`panel-${t.id}`} id={`tab-${t.id}`} onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium transition sm:px-3.5 ${active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-200 hover:bg-slate-800 hover:text-white'}`}>
                <Icon className="hidden h-4 w-4 sm:block" aria-hidden="true" />{t.short ? <><span className="sm:hidden">{t.short}</span><span className="hidden sm:inline">{t.label}</span></> : t.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export function WarningBanner() {
  return (
    <div role="alert" className="border-b border-amber-300 bg-amber-100">
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-3 sm:px-6">
        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
        <p className="text-sm font-medium text-amber-950">
          <strong className="font-bold">Research &amp; Educational Prototype. Not for clinical diagnosis.</strong>{' '}
          Illustrative simulation only. Scores are not produced by a trained model and are not medical advice; consult a licensed medical practitioner for any health concern.
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-300">Bachelor of Smart Computing thesis prototype</p>
        <h1 className="mt-2 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">Explore how a model could explain a heart-disease classification</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Enter the 13 variables from the UCI Cleveland benchmark and see an <em>illustrative</em> score with a SHAP-style breakdown of which inputs push it up or down.
          The data come from a US public benchmark, not from Nepalese participants, and the scoring function is a transparent simulation rather than the trained model.
        </p>
      </div>
    </section>
  );
}
