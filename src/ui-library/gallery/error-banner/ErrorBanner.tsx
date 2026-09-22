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
 *   <ErrorBanner message="Failed to save." onDismiss={clearError} />
 *   <ErrorBanner title="Upload failed" message="The file was too large." icon={<AlertTriangle size={18} />} action={<Button onClick={retry}>Retry</Button>} />
 */

import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';

export type ErrorBannerTone = 'error' | 'warning' | 'info';

export interface ErrorBannerProps {
  /** Primary message text */
  message: ReactNode;
  /** Optional bold heading rendered above the message. */
  title?: ReactNode;
  tone?: ErrorBannerTone;
  className?: string;
  /** Optional leading icon rendered before the text. */
  icon?: ReactNode;
  /** Optional trailing action (e.g. a Retry button) rendered before the close button. */
  action?: ReactNode;
  /** When provided, renders a close button that invokes this handler. */
  onDismiss?: () => void;
  /** Accessible label for the close button. Defaults to "Dismiss". */
  dismissLabel?: string;
}

const STYLES: Record<ErrorBannerTone, string> = {
  error:   'border-rose-100   bg-rose-50   text-rose-700',
  warning: 'border-amber-200  bg-amber-50  text-amber-800',
  info:    'border-sky-200    bg-sky-50    text-sky-800',
};

export function ErrorBanner({
  message,
  title,
  tone = 'error',
  className = '',
  icon,
  action,
  onDismiss,
  dismissLabel = 'Dismiss',
}: ErrorBannerProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : undefined}
      aria-live={tone !== 'error' ? 'polite' : undefined}
      className={cn(
        'flex items-start gap-3 rounded-2xl border px-5 py-4 text-sm font-bold',
        STYLES[tone],
        className,
      )}
    >
      {icon && <span className="mt-0.5 shrink-0" aria-hidden="true">{icon}</span>}
      <div className="min-w-0 flex-1">
        {title && <div className="mb-0.5">{title}</div>}
        <span className={cn(title && 'font-medium')}>{message}</span>
      </div>
      {action && <div className="shrink-0">{action}</div>}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-lg p-1 transition-colors hover:bg-black/5"
          aria-label={dismissLabel}
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
