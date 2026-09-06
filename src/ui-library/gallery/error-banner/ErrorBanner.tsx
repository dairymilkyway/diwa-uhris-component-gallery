/**
 * ErrorBanner — Design System Component
 *
 * Inline feedback banner for error, warning, and info messages.
 *
 * This gallery component preserves the established visual language of
 * the production ErrorBanner from shared/components/ui.tsx:
 *   - Same tone system: 'error' | 'warning' | 'info'
 *   - Same visual treatment: rounded-2xl, border, px-5 py-4, text-sm font-bold
 *
 * Accessibility:
 *   - role="alert" for error tone (polite live region for warnings/info)
 *   - aria-live for warning/info tones
 *
 * Usage:
 *   <ErrorBanner message="Failed to save changes." />
 *   <ErrorBanner message="Draft saved." tone="info" />
 *   <ErrorBanner message="This action cannot be undone." tone="warning" />
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export type ErrorBannerTone = 'error' | 'warning' | 'info';

export interface ErrorBannerProps {
  /** Primary message text */
  message: ReactNode;
  tone?: ErrorBannerTone;
  className?: string;
}

const STYLES: Record<ErrorBannerTone, string> = {
  error:   'border-rose-100   bg-rose-50   text-rose-700',
  warning: 'border-amber-200  bg-amber-50  text-amber-800',
  info:    'border-sky-200    bg-sky-50    text-sky-800',
};

export function ErrorBanner({ message, tone = 'error', className = '' }: ErrorBannerProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : undefined}
      aria-live={tone !== 'error' ? 'polite' : undefined}
      className={cn('rounded-2xl border px-5 py-4 text-sm font-bold', STYLES[tone], className)}
    >
      {message}
    </div>
  );
}
