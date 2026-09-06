/**
 * Alert — Design System Component
 *
 * Inline contextual feedback. Purely presentational.
 *
 * Tones:   info | success | warning | danger
 * Variants: default | subtle
 */

import type { ReactNode } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import { cn } from '../../../lib/utils';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  tone: AlertTone;
  title?: string;
  children: ReactNode;
  /** Show an icon matching the tone */
  icon?: boolean;
  /** Show a dismiss button */
  onDismiss?: () => void;
  /** Subtle variant uses a lighter background */
  subtle?: boolean;
  className?: string;
}

// ── Style maps ────────────────────────────────────────────────────────────────

// Full background tones — keep semantic colors, add the DIWA left-rule
const TONE_FULL: Record<AlertTone, string> = {
  info:    'border-l-4 border-sky-400    bg-sky-50    text-sky-800',
  success: 'border-l-4 border-emerald-400 bg-emerald-50 text-emerald-800',
  warning: 'border-l-4 border-amber-400  bg-amber-50  text-amber-800',
  danger:  'border-l-4 border-rose-500   bg-rose-50   text-rose-800',
};

// Subtle: white bg, left rule is the only structural marker
const TONE_SUBTLE: Record<AlertTone, string> = {
  info:    'border-l-4 border-sky-400    bg-white text-sky-700',
  success: 'border-l-4 border-emerald-400 bg-white text-emerald-700',
  warning: 'border-l-4 border-amber-400  bg-white text-amber-700',
  danger:  'border-l-4 border-rose-500   bg-white text-rose-700',
};

const ICON_CLASS: Record<AlertTone, string> = {
  info:    'text-sky-500',
  success: 'text-emerald-500',
  warning: 'text-amber-500',
  danger:  'text-rose-500',
};

const TONE_ICON: Record<AlertTone, typeof Info> = {
  info:    Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger:  AlertCircle,
};

const DISMISS_CLASS: Record<AlertTone, string> = {
  info:    'text-sky-400 hover:bg-sky-100',
  success: 'text-emerald-400 hover:bg-emerald-100',
  warning: 'text-amber-400 hover:bg-amber-100',
  danger:  'text-rose-400 hover:bg-rose-100',
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Alert({
  tone,
  title,
  children,
  icon = true,
  onDismiss,
  subtle = false,
  className = '',
}: AlertProps) {
  const Icon = TONE_ICON[tone];
  const colorClass = subtle ? TONE_SUBTLE[tone] : TONE_FULL[tone];

  return (
    <div
      role="alert"
      className={cn('flex gap-3 rounded-md pl-4 pr-4 py-3.5', colorClass, className)}
    >
      {icon && (
        <Icon
          size={20}
          className={`mt-0.5 shrink-0 ${ICON_CLASS[tone]}`}
          aria-hidden="true"
        />
      )}
      <div className="min-w-0 flex-1 text-sm">
        {title && <p className="font-bold leading-snug mb-0.5">{title}</p>}
        <div className="font-medium leading-relaxed">{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className={`-mr-1 -mt-0.5 shrink-0 rounded-lg p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current ${DISMISS_CLASS[tone]}`}
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
