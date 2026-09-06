/**
 * StatusBadge — Design System Component
 *
 * A small pill-shaped indicator for entity lifecycle or state status.
 * Purely presentational — the tone determines the visual; the label
 * is owned entirely by the consuming feature.
 *
 * Accessibility:
 *   - Rendered as a <span> (inline element, not interactive).
 *   - Screen readers read the visible text. No additional ARIA needed
 *     because the label itself conveys the status.
 *   - Do not rely solely on color. The label text must be present.
 *
 * Usage:
 *   <StatusBadge tone="success">Active</StatusBadge>
 *   <StatusBadge tone="warning">Pending</StatusBadge>
 *   <StatusBadge tone="neutral">Inactive</StatusBadge>
 *
 * The consuming feature maps its domain values to tones:
 *   const TONE_MAP: Record<MyStatus, StatusBadgeTone> = {
 *     active:   'success',
 *     inactive: 'neutral',
 *     draft:    'warning',
 *     archived: 'neutral',
 *   };
 *   <StatusBadge tone={TONE_MAP[employee.status]}>{employee.status}</StatusBadge>
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export type StatusBadgeTone =
  | 'neutral'   // grey  — inactive, archived, default
  | 'success'   // green — active, published, complete
  | 'warning'   // amber — pending, draft, attention
  | 'error'     // rose  — failed, rejected, suspended
  | 'info'      // blue  — in-progress, processing
  | 'primary';  // indigo — special/highlighted state

export interface StatusBadgeProps {
  tone?: StatusBadgeTone;
  children: ReactNode;
  className?: string;
}

const TONE_STYLES: Record<StatusBadgeTone, string> = {
  neutral: 'border-slate-200 bg-slate-50   text-slate-600',
  success: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-200  bg-amber-50  text-amber-700',
  error:   'border-rose-100   bg-rose-50   text-rose-700',
  info:    'border-sky-100    bg-sky-50    text-sky-700',
  primary: 'border-brand-blue/20 bg-blue-50 text-brand-blue',
};

export function StatusBadge({ tone = 'neutral', children, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg border px-2.5 py-1',
        'text-[10px] font-bold uppercase tracking-wider',
        TONE_STYLES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
