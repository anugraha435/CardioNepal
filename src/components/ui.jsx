import React, { useState, useRef, useEffect, useId } from 'react';
import { Info } from 'lucide-react';

export function InfoTip({ text }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <span className="relative inline-flex" ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" aria-label="More information" aria-expanded={open} aria-describedby={open ? id : undefined} onClick={() => setOpen((o) => !o)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
        className="rounded-full p-0.5 text-slate-400 hover:text-teal-700">
        <Info className="h-4 w-4" aria-hidden="true" />
      </button>
      {open && (
        <span role="tooltip" id={id} className="absolute left-1/2 top-full z-30 mt-1.5 w-60 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-normal leading-relaxed text-white shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
}

export function SectionTitle({ icon: Icon, title, children }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      {Icon && <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700"><Icon className="h-5 w-5" aria-hidden="true" /></span>}
      <div>
        <h2 className="h-section">{title}</h2>
        {children && <p className="mt-0.5 text-sm text-slate-600">{children}</p>}
      </div>
    </div>
  );
}

export function Pill({ tone = 'slate', children }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-700 ring-slate-200', teal: 'bg-teal-50 text-teal-800 ring-teal-200',
    amber: 'bg-amber-50 text-amber-900 ring-amber-200', rose: 'bg-rose-50 text-rose-800 ring-rose-200', blue: 'bg-blue-50 text-blue-800 ring-blue-200'
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${tones[tone]}`}>{children}</span>;
}
