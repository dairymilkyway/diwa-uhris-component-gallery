/**
 * Spinner — Design System Component
 *
 * An indeterminate loading indicator. Purely presentational.
 *
 * Sizes: sm | md | lg
 *
 * Usage:
 *   - Inline: inside a button or alongside text
 *   - Standalone: centered in a container while content loads
 *
 * Accessibility:
 *   - Renders a <span role="status"> that announces label to screen readers
 *   - label is required and should describe what is loading
 *   - Respects prefers-reduced-motion: animation is suppressed, label stays
 */

import { cn } from '../../../lib/utils';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  /** Accessible label — required for screen readers */
  label?: string;
  /** Hide the visible label text, keep it for screen readers only */
  labelHidden?: boolean;
  className?: string;
}

const SIZE_TRACK: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-9 w-9 border-[3px]',
};

const SIZE_TEXT: Record<SpinnerSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function Spinner({
  size = 'md',
  label = 'Loading…',
  labelHidden = false,
  className = '',
}: SpinnerProps) {
  return (
    <span
      role="status"
      className={cn('inline-flex items-center gap-2', className)}
    >
      <span
        aria-hidden="true"
        className={[
          'inline-block animate-spin rounded-full border-slate-200 border-t-brand-blue motion-reduce:animate-none',
          SIZE_TRACK[size],
        ].join(' ')}
      />
      <span className={labelHidden ? 'sr-only' : `font-medium text-slate-500 ${SIZE_TEXT[size]}`}>
        {label}
      </span>
    </span>
  );
}
