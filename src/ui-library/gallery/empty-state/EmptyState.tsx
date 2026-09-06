/**
 * EmptyState — Design System Component
 *
 * Graceful zero-data placeholder for lists, tables, and content areas.
 * Purely presentational — no state, no API calls, no domain logic.
 *
 * Matches the visual design of the production EmptyState in shared/components/ui.tsx.
 * Adds an optional `action` slot for call-to-action buttons.
 *
 * Accessibility:
 *   - Plain presentational markup — no interactive elements by default.
 *   - The `icon` should be aria-hidden="true" at the call site (decorative).
 *   - When replacing a dynamic list, wrap the parent in aria-live="polite"
 *     so screen readers announce the empty state on content change.
 *
 * Usage:
 *   <EmptyState title="No employees found" />
 *   <EmptyState
 *     icon={<Users size={32} aria-hidden="true" />}
 *     title="No team members yet"
 *     hint="Add your first employee to get started."
 *     action={<button className={btnPrimary} onClick={openCreate}>Add Employee</button>}
 *   />
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export interface EmptyStateProps {
  /** Required title / primary message. */
  title: string;
  /** Optional secondary guidance text. */
  hint?: string;
  /** Optional icon rendered above the title. Use Lucide icons (size 28–40). Mark aria-hidden="true". */
  icon?: ReactNode;
  /** Optional action slot — rendered below the hint. Typically a Button or link. */
  action?: ReactNode;
  /** Additional class on the root container. */
  className?: string;
}

export function EmptyState({ title, hint, icon, action, className = '' }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        'rounded-lg border border-brand-sky/20 bg-brand-sky/[0.04]',
        'px-6 py-12 text-center',
        className,
      )}
    >
      {icon && (
        <div className="mb-1 text-brand-sky/50">
          {icon}
        </div>
      )}
      <div className="text-sm font-bold text-slate-600">{title}</div>
      {hint && (
        <div className="max-w-sm text-xs font-medium text-slate-400">{hint}</div>
      )}
      {action && (
        <div className="mt-3">
          {action}
        </div>
      )}
    </div>
  );
}
