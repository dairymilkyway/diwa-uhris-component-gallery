/**
 * PlaygroundPanel
 *
 * Two-column layout: controls (left) + live preview (right).
 *
 * Brand application (DESIGN.md):
 *   Controls label    — brand-sky uppercase (supporting hierarchy)
 *   Active radio btn  — brand-blue bg tint + text
 *   Toggle ON state   — brand-blue
 *   Live Preview label — brand-sky
 *   Focus rings       — brand-blue/30
 */

import type { ReactNode } from 'react';

interface PlaygroundPanelProps {
  controls: ReactNode;
  preview: ReactNode;
}

export function PlaygroundPanel({ controls, preview }: PlaygroundPanelProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-col lg:flex-row">
        {/* Controls column */}
        <div className="w-full shrink-0 border-b border-slate-100 bg-slate-50/60 p-6 lg:w-72 lg:border-b-0 lg:border-r">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-brand-sky">
            Controls
          </p>
          <div className="space-y-6">{controls}</div>
        </div>

        {/* Preview column */}
        <div className="flex min-h-[240px] flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center p-10">
            {preview}
          </div>
          <div className="border-t border-slate-100 px-5 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-sky">
              Live Preview
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Playground control primitives ─────────────────────────────────────────────

interface ControlGroupProps {
  label: string;
  children: ReactNode;
}

export function ControlGroup({ label, children }: ControlGroupProps) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      {children}
    </div>
  );
}

interface RadioControlProps<T extends string> {
  name: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function RadioControl<T extends string>({
  name,
  options,
  value,
  onChange,
}: RadioControlProps<T>) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={[
            'rounded-lg border px-3 py-1.5 text-xs font-semibold transition',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
            value === opt.value
              ? 'border-brand-blue/30 bg-blue-50 text-brand-blue'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
          ].join(' ')}
          aria-pressed={value === opt.value}
          aria-label={`${name}: ${opt.label}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

interface ToggleControlProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function ToggleControl({ label, value, onChange }: ToggleControlProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
    >
      <span>{label}</span>
      <span
        className={[
          'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors',
          value ? 'bg-brand-blue' : 'bg-slate-200',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform',
            value ? 'translate-x-4' : 'translate-x-0.5',
          ].join(' ')}
        />
      </span>
    </button>
  );
}

interface SelectControlProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function SelectControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: SelectControlProps<T>) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-semibold text-slate-500">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
