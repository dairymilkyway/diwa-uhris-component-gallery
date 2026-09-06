/**
 * VariantGrid
 *
 * Side-by-side variant/size/state display tiles.
 * Each tile shows a label + rendered component example.
 */

import type { ReactNode } from 'react';

interface VariantTile {
  label: string;
  description?: string;
  children: ReactNode;
}

interface VariantGridProps {
  tiles: VariantTile[];
  columns?: 2 | 3 | 4;
}

const COL_CLASS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} satisfies Record<number, string>;

export function VariantGrid({ tiles, columns = 3 }: VariantGridProps) {
  return (
    <div className={`grid grid-cols-1 gap-3 ${COL_CLASS[columns]}`}>
      {tiles.map(({ label, description, children }) => (
        <div
          key={label}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          {/* Preview area */}
          <div className="flex min-h-[100px] items-center justify-center bg-slate-50 px-6 py-6">
            {children}
          </div>
          {/* Label */}
          <div className="border-t border-slate-100 px-4 py-3">
            <p className="text-xs font-bold text-slate-700">{label}</p>
            {description && (
              <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                {description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
