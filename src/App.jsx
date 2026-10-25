import React, { useMemo, useState } from 'react';
import { Header, Hero, WarningBanner } from './components/Header.jsx';
import { PatientForm } from './components/PatientForm.jsx';
import { LifestyleContext } from './components/LifestyleContext.jsx';
import { ResultCard } from './components/ResultCard.jsx';
import { ShapDisplay } from './components/ShapDisplay.jsx';
import { ModelInfo } from './components/ModelInfo.jsx';
import { PrivacyNotice } from './components/PrivacyNotice.jsx';
import { EXAMPLES, REFERENCE_PROFILE, validate, score } from './lib/model.js';

export default function App() {
  const [tab, setTab] = useState('assess');
  const [values, setValues] = useState(EXAMPLES[1].values);
  const check = useMemo(() => validate(values), [values]);
  const result = useMemo(() => (check.valid ? score(values) : null), [check.valid, values]);
  const onChange = (k, v) => setValues((s) => ({ ...s, [k]: v }));

  return (
    <div id="top" className="min-h-screen">
      <Header tab={tab} setTab={setTab} />
      <WarningBanner />
      {tab === "assess" && <Hero />}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div role="tabpanel" id="panel-assess" aria-labelledby="tab-assess" hidden={tab !== 'assess'}>
          {tab === 'assess' && (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <div className="lg:col-start-1">
                <PatientForm values={values} errors={check.errors} warnings={check.warnings} onChange={onChange} onLoad={(v) => setValues(v)} onReset={() => setValues({ ...REFERENCE_PROFILE })} />
              </div>
              <div className="space-y-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-24 lg:self-start">
                <ResultCard valid={check.valid} result={result} hasWarnings={Object.keys(check.warnings).length > 0} />
                <ShapDisplay result={result} />
              </div>
              <div className="lg:col-start-1">
                <LifestyleContext />
              </div>
            </div>
          )}
        </div>
        <div role="tabpanel" id="panel-model" aria-labelledby="tab-model" hidden={tab !== 'model'}>{tab === 'model' && <ModelInfo />}</div>
        <div role="tabpanel" id="panel-privacy" aria-labelledby="tab-privacy" hidden={tab !== 'privacy'}>{tab === 'privacy' && <PrivacyNotice />}</div>
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-xs text-slate-500 sm:px-6">
          <p><strong className="text-slate-700">CardioNepal</strong> · Thesis prototype, Department of Smart Computing, Kyungdong University Global · Research &amp; educational use only.</p>
          <p>Data: UCI Heart Disease (Cleveland), Janosi, Steinbrunn, Pfisterer &amp; Detrano, CC BY 4.0. Not a medical device.</p>
        </div>
      </footer>
    </div>
  );
}
