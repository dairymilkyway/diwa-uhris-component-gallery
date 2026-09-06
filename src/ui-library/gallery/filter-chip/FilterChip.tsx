/**
 * FilterChip — Design System Component
 *
 * A removable tag/chip for displaying active filters.
 * Purely presentational — no filter state, no URL state, no search logic.
 *
 * Accessibility:
 *   - The remove button has an aria-label describing what will be removed.
 *   - Disabled chips prevent removal.
 *   - The chip itself is not interactive — only the remove button is.
 *
 * Usage:
 *   <FilterChip label="Department: HR" onRemove={() => removeFilter('department')} />
 *   <FilterChip label="Status: Active" onRemove={handleRemove} />
 *   <FilterChip label="Read only" />       // no remove button
 *   <FilterChip label="Locked" disabled /> // disabled state
 */

import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export interface FilterChipProps {
  /** Label content — string or ReactNode */
  label: ReactNode;
  /** When provided, renders a remove (×) button */
  onRemove?: () => void;
  /** Disables the remove button */
  disabled?: boolean;
  /** Optional accessible label for the remove button (defaults to "Remove filter") */
  removeLabel?: string;
  className?: string;
}

export function FilterChip({
  label,
  onRemove,
  disabled = false,
  removeLabel = 'Remove filter',
  className = '',
}: FilterChipProps) {
  return (
    <span
      className={cn(
        'inline-flex max-w-[20rem] items-center gap-1.5 rounded-full border',
        'py-1 pl-3 text-xs font-semibold',
        onRemove ? 'pr-1.5' : 'pr-3',
        disabled
          ? 'border-slate-200 bg-slate-50 text-slate-400'
          : 'border-brand-blue/30 bg-blue-50 text-brand-blue',
        className,
      )}
    >
      {/* Label — truncate long text */}
      <span className="truncate">{label}</span>

      {/* Remove button */}
      {onRemove && (
        <button
          type="button"
          onClick={!disabled ? onRemove : undefined}
          disabled={disabled}
          aria-label={removeLabel}
          className={cn(
            'flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
            disabled ? 'cursor-not-allowed text-slate-300' : 'text-brand-blue hover:bg-blue-100 hover:text-brand-navy',
          )}
        >
          <X size={10} aria-hidden="true" strokeWidth={3} />
        </button>
      )}
    </span>
  );
}
