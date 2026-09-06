/**
 * MaskedValue — Design System Component
 *
 * Renders a value or a redacted placeholder based on a boolean condition.
 * Used when a value exists but should be hidden from the current viewer
 * (e.g. salary data only visible to users with the appropriate permission).
 *
 * The masking decision is made by the caller — MaskedValue is purely
 * presentational. It does not know about permissions, roles, or data fetching.
 *
 * Usage:
 *   // Show real value
 *   <MaskedValue value={formatCurrency(salary)} masked={false} />
 *
 *   // Hide value — consumer decides based on permission/context
 *   <MaskedValue
 *     value={formatCurrency(salary)}
 *     masked={!canViewSalary}
 *     maskLabel="Salary is restricted"
 *   />
 *
 * Accessibility:
 *   - When masked, the placeholder pill has aria-label={maskLabel} so
 *     screen readers announce the reason rather than "••••• •••••".
 *   - When unmasked, renders children directly — no extra ARIA.
 */

import type { ReactNode } from 'react';

export interface MaskedValueProps {
  /**
   * The real value to display when not masked.
   * Accepts any ReactNode — text, formatted currency, a Badge, etc.
   */
  value: ReactNode;
  /**
   * When true, renders the mask placeholder instead of value.
   * When false, renders value directly.
   */
  masked: boolean;
  /**
   * Text shown in the masked placeholder pill.
   * Default: '••••• •••••'
   */
  maskText?: string;
  /**
   * Accessible label for the masked placeholder — announces WHY
   * the value is hidden, not just that it is hidden.
   * Example: "Salary restricted — requires elevated access"
   * Default: "Value restricted"
   */
  maskLabel?: string;
  /** Additional class on the root element (both masked and unmasked states). */
  className?: string;
}

export function MaskedValue({
  value,
  masked,
  maskText = '••••• •••••',
  maskLabel = 'Value restricted',
  className = '',
}: MaskedValueProps) {
  if (!masked) {
    return className ? <span className={className}>{value}</span> : <>{value}</>;
  }

  return (
    <span
      aria-label={maskLabel}
      title={maskLabel}
      className={[
        'inline-flex select-none items-center rounded-md bg-slate-100 px-2 py-0.5',
        'font-mono text-xs font-medium text-slate-400 tracking-wider',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {maskText}
    </span>
  );
}
