/**
 * ShowcaseGrid — Gallery infrastructure
 *
 * Lays out multiple Showcase items in a responsive grid.
 * Use when several related examples should be presented together
 * (e.g. all Button variants, all Badge tones).
 *
 * Rules:
 *   - Each column contains one full Showcase (preview + code)
 *   - On narrow screens the grid collapses to a single column
 *   - Do not force a grid where a single full-width Showcase is clearer
 */

import type { ReactNode } from 'react';

type GridCols = 1 | 2 | 3 | 4;

interface ShowcaseGridProps {
  columns?: GridCols;
  children: ReactNode;
}

const COL_CLASS: Record<GridCols, string> = {
  1: '',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export function ShowcaseGrid({ columns = 2, children }: ShowcaseGridProps) {
  return (
    <div className={`w-full grid grid-cols-1 gap-6 ${COL_CLASS[columns]}`}>
      {children}
    </div>
  );
}
