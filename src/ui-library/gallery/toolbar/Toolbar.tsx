/**
 * Toolbar — Design System Component
 *
 * Two-slot horizontal layout container for filter controls and actions.
 * Purely presentational — owns only the outer white pill layout.
 *
 * Left slot:  filter dropdowns, segmented controls, pill buttons
 * Right slot: search input, primary action button (optional)
 *
 * Usage:
 *   <Toolbar
 *     left={<FilterControls />}
 *     right={<SearchInput />}
 *   />
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export interface ToolbarProps {
  /** Left slot — typically filter controls or dropdown triggers. */
  left: ReactNode;
  /** Right slot — typically a search input or primary action button. */
  right?: ReactNode;
  /** Additional class on the outer container. */
  className?: string;
}

export function Toolbar({ left, right, className = '' }: ToolbarProps) {
  return (
    <div
      className={cn(
        'w-full flex flex-wrap items-center justify-between gap-4',
        'bg-white p-2 border border-slate-100 rounded-2xl shadow-sm',
        className,
      )}
    >
      {left}
      {right}
    </div>
  );
}
