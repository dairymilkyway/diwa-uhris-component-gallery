/**
 * Badge — Design System Component
 *
 * A small, pill-shaped label for conveying short status, category, or
 * count information. Purely presentational — no business logic.
 *
 * Tones:    neutral | primary | success | warning | danger | info | subtle | outline
 * Sizes:    sm | md | lg
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export type BadgeTone =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'subtle'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  tone?: BadgeTone;
  size?: BadgeSize;
  /** Leading icon node. Should be aria-hidden="true". */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

// ── Style maps ────────────────────────────────────────────────────────────────

const TONE_STYLES: Record<BadgeTone, string> = {
  neutral: 'border-slate-200 bg-slate-100 text-slate-700',
  primary: 'border-brand-blue/20 bg-blue-50 text-brand-blue',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  danger:  'border-rose-200 bg-rose-50 text-rose-700',
  info:    'border-sky-200 bg-sky-50 text-sky-700',
  subtle:  'border-transparent bg-slate-100 text-slate-500',
  outline: 'border-slate-300 bg-transparent text-slate-700',
};

// Status tones carry formal/institutional meaning — use a tight rectangular
// radius. Category/identity tones use a pill for visual distinction.
const STATUS_TONES = new Set<BadgeTone>(['success', 'warning', 'danger', 'info']);

const SIZE_STYLES: Record<BadgeSize, string> = {
  sm: 'gap-1 px-2 py-0.5 text-[10px]',
  md: 'gap-1.5 px-2.5 py-0.5 text-xs',
  lg: 'gap-1.5 px-3 py-1 text-sm',
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Badge({
  tone = 'neutral',
  size = 'md',
  icon,
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border font-semibold uppercase tracking-wide',
        STATUS_TONES.has(tone) ? 'rounded' : 'rounded-full',
        TONE_STYLES[tone],
        SIZE_STYLES[size],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
