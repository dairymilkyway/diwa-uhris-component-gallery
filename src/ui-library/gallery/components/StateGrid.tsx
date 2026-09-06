/**
 * StateGrid
 *
 * Horizontal row displaying all interactive states of a component:
 * default, hover, focus, active, disabled, loading, etc.
 *
 * Each state is a labeled column.
 */

import type { ReactNode } from 'react';

interface StateItem {
  label: string;
  children: ReactNode;
}

interface StateGridProps {
  states: StateItem[];
}

export function StateGrid({ states }: StateGridProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="overflow-x-auto">
        <div className="flex min-w-max divide-x divide-slate-100">
          {states.map(({ label, children }) => (
            <div key={label} className="flex flex-col items-center bg-white">
              {/* State preview */}
              <div className="flex h-24 w-40 items-center justify-center bg-slate-50 px-6 py-5">
                {children}
              </div>
              {/* State label */}
              <div className="w-full border-t border-slate-100 px-3 py-2.5 text-center">
                <p className="text-[11px] font-bold text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
