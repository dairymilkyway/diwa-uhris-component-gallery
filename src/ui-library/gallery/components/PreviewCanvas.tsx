/**
 * PreviewCanvas
 *
 * Live-preview container used in gallery sections to render
 * components against a neutral background. Optionally shows a label.
 */

import type { ReactNode } from 'react';

interface PreviewCanvasProps {
  label?: string;
  /** Center the content (default true) */
  center?: boolean;
  /** Light or dark canvas (default 'light') */
  tone?: 'light' | 'dark' | 'grid';
  children: ReactNode;
}

const TONE_CLASS = {
  light: 'bg-slate-50',
  dark: 'bg-slate-900',
  grid: "bg-slate-50 [background-image:linear-gradient(rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.15)_1px,transparent_1px)] [background-size:20px_20px]",
} satisfies Record<string, string>;

export function PreviewCanvas({
  label,
  center = true,
  tone = 'light',
  children,
}: PreviewCanvasProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div
        className={`${TONE_CLASS[tone]} ${
          center ? 'flex flex-wrap items-center justify-center' : 'flex flex-wrap items-start'
        } min-h-[120px] gap-4 px-8 py-10`}
      >
        {children}
      </div>
      {label && (
        <div className="border-t border-slate-200 bg-white px-5 py-3">
          <p className="text-xs font-semibold text-slate-500">{label}</p>
        </div>
      )}
    </div>
  );
}
