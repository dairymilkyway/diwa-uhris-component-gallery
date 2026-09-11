/**
 * ApplicationError — Design System Component
 *
 * Full-page 500 / unexpected error screen. Composes StatusPage internally
 * using the `serverError` preset. Includes a dev-only collapsible details
 * panel (error message, stack trace, component stack) rendered only when
 * `import.meta.env.DEV && error !== undefined`.
 *
 * Navigation is the consumer's responsibility — wire onRetry and onDashboard.
 *
 * Two exports:
 *
 * ApplicationError — primary component. Consumer provides both callbacks.
 *   Used as React Router `errorElement` (pair with useRouteError + useNavigate).
 *
 * ApplicationErrorFallback — convenience wrapper for ErrorBoundary usage.
 *   Accepts onReset (maps to onRetry) and uses window.location.href for
 *   dashboard navigation when outside router context.
 *
 * No routing imports in this file. Works with any router.
 *
 * Usage (router errorElement):
 *   import { ApplicationError } from '@diwauhris/ui';
 *   import { useRouteError, useNavigate } from 'react-router-dom';
 *
 *   export function ErrorPage() {
 *     const error = useRouteError();
 *     const navigate = useNavigate();
 *     return (
 *       <ApplicationError
 *         error={error}
 *         onRetry={() => navigate(0)}
 *         onDashboard={() => navigate('/dashboard')}
 *       />
 *     );
 *   }
 *
 * Usage (ErrorBoundary fallback):
 *   import { ApplicationErrorFallback } from '@diwauhris/ui';
 *
 *   <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
 *     <ApplicationErrorFallback
 *       error={error}
 *       onReset={resetErrorBoundary}
 *     />
 *   )} />
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { StatusPage, STATUS_PAGE_PRESETS } from '../status-page/StatusPage';

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractMessage(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred.';
}

function extractStack(error: unknown): string | undefined {
  if (error instanceof Error) return error.stack;
  return undefined;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ApplicationErrorProps {
  /**
   * The caught error object.
   * Used to extract message and stack in the dev-only details panel.
   * Pass the value from useRouteError() or ErrorBoundary's error prop.
   */
  error?: unknown;
  /**
   * React component stack from ErrorInfo.componentStack.
   * Shown in the dev panel when provided. Optional.
   */
  componentStack?: string;
  /**
   * Short error ID for support correlation (e.g. "ERR-A1B2C").
   * Rendered below the action buttons when provided.
   */
  errorId?: string;
  /**
   * "Try Again" callback.
   * Router usage: () => navigate(0)
   * Boundary usage: onReset / resetErrorBoundary
   */
  onRetry: () => void;
  /**
   * "Go to Dashboard" callback.
   * Router usage: () => navigate('/dashboard')
   * Boundary usage: () => { window.location.href = '/dashboard'; }
   */
  onDashboard: () => void;
  /** Additional class on the root wrapper. */
  className?: string;
}

export interface ApplicationErrorFallbackProps {
  /** The caught error object passed by the ErrorBoundary. */
  error?: unknown;
  /** React component stack from ErrorInfo.componentStack. */
  componentStack?: string;
  /** Short error ID for support correlation. */
  errorId?: string;
  /** Called when the user clicks "Try Again". Maps to onRetry. */
  onReset: () => void;
}

// ── Dev panel ─────────────────────────────────────────────────────────────────

interface DevPanelProps {
  error: unknown;
  componentStack?: string;
  errorId?: string;
}

function DevPanel({ error, componentStack, errorId }: DevPanelProps) {
  const [open, setOpen] = useState(false);
  const message = extractMessage(error);
  const stack = extractStack(error);

  return (
    <div className="mt-4 border-t border-slate-100 pt-4">
      <button
        type="button"
        className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {open ? <ChevronUp size={13} aria-hidden="true" /> : <ChevronDown size={13} aria-hidden="true" />}
        Technical Details
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          <div className="rounded-xl bg-slate-900 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Error
            </p>
            <pre className="whitespace-pre-wrap break-all text-xs font-mono text-rose-300">
              {message}
            </pre>
          </div>

          {stack !== undefined && (
            <div className="rounded-xl bg-slate-900 px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Stack Trace
              </p>
              <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap break-all text-xs font-mono text-slate-400">
                {stack}
              </pre>
            </div>
          )}

          {componentStack !== undefined && (
            <div className="rounded-xl bg-slate-900 px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Component Stack
              </p>
              <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap break-all text-xs font-mono text-slate-400">
                {componentStack}
              </pre>
            </div>
          )}

          {errorId !== undefined && (
            <p className="text-[11px] font-mono text-slate-400">
              Error ID: {errorId}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── ApplicationError ──────────────────────────────────────────────────────────

export function ApplicationError({
  error,
  componentStack,
  errorId,
  onRetry,
  onDashboard,
  className,
}: ApplicationErrorProps) {
  const showDevDetails = import.meta.env.DEV && error !== undefined;

  return (
    <div className={className}>
      <StatusPage
        {...STATUS_PAGE_PRESETS.serverError}
        primaryAction={{ label: 'Try Again', onClick: onRetry }}
        secondaryAction={{ label: 'Go to Dashboard', onClick: onDashboard }}
      />

      {/* Dev-only collapsible details panel — rendered below the full-page StatusPage */}
      {showDevDetails && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm px-6 py-4 shadow-lg">
          {errorId !== undefined && (
            <p className="mb-2 text-[11px] font-mono text-slate-400">Error ID: {errorId}</p>
          )}
          <DevPanel
            error={error}
            componentStack={componentStack}
            errorId={errorId}
          />
        </div>
      )}
    </div>
  );
}

// ── ApplicationErrorFallback ──────────────────────────────────────────────────

/**
 * Convenience wrapper for use with class-based ErrorBoundary components.
 * Outside router context — uses window.location.href for dashboard navigation.
 * Maps `onReset` to ApplicationError's `onRetry`.
 */
export function ApplicationErrorFallback({
  error,
  componentStack,
  errorId,
  onReset,
}: ApplicationErrorFallbackProps) {
  return (
    <ApplicationError
      error={error}
      componentStack={componentStack}
      errorId={errorId}
      onRetry={onReset}
      onDashboard={() => { window.location.href = '/dashboard'; }}
    />
  );
}
