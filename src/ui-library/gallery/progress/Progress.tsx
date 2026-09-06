/**
 * Progress — Design System Component
 *
 * Determinate and indeterminate linear progress bar.
 *
 * Accessibility:
 *   - role="progressbar"
 *   - aria-valuenow, aria-valuemin, aria-valuemax (determinate)
 *   - aria-label for screen-reader context
 *   - When indeterminate: aria-valuenow is omitted
 *
 * Usage:
 *   // Determinate (0–100)
 *   <Progress value={65} aria-label="Upload progress" />
 *
 *   // Indeterminate
 *   <Progress aria-label="Loading" />
 *
 *   // Custom max
 *   <Progress value={3} max={5} aria-label="Step 3 of 5" />
 */

import { cn } from '../../../lib/utils';

export interface ProgressProps {
  /**
   * Current progress value.
   * Omit (or set to undefined) for indeterminate state.
   */
  value?: number;
  /** Maximum value. Default: 100 */
  max?: number;
  /** Accessible label describing what is progressing */
  'aria-label'?: string;
  /** Accessible label from an external element */
  'aria-labelledby'?: string;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  className = '',
}: ProgressProps) {
  const isIndeterminate = value === undefined;
  const clamped = isIndeterminate ? 0 : Math.min(Math.max(value, 0), max);
  const percent = isIndeterminate ? 0 : (clamped / max) * 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-slate-200', className)}
    >
      <div
        className={[
          'h-full rounded-full bg-brand-blue transition-[width] duration-300',
          isIndeterminate ? 'w-1/3 motion-safe:animate-pulse opacity-75' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={isIndeterminate ? undefined : { width: `${percent}%` }}
        aria-hidden="true"
      />
    </div>
  );
}
