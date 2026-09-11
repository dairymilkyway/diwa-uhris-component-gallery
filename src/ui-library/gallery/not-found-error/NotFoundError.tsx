/**
 * NotFoundError — Design System Component
 *
 * Full-page 404 Not Found screen. Composes StatusPage internally using the
 * `notFound` preset. Navigation is the consumer's responsibility — wire it
 * via `primaryAction.onClick` and `secondaryAction.onClick`.
 *
 * No routing imports. Works with any router (React Router, Next.js, window.location).
 *
 * Usage:
 *   import { NotFoundError } from '@diwauhris/ui';
 *   import { useNavigate } from 'react-router-dom';
 *
 *   function NotFoundPage() {
 *     const navigate = useNavigate();
 *     return (
 *       <NotFoundError
 *         primaryAction={{ label: 'Go to Dashboard', onClick: () => navigate('/dashboard') }}
 *         secondaryAction={{ label: 'Go Back', onClick: () => navigate(-1) }}
 *       />
 *     );
 *   }
 */

import { StatusPage, STATUS_PAGE_PRESETS } from '../status-page/StatusPage';
import type { StatusPageAction } from '../status-page/StatusPage';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NotFoundErrorProps {
  /**
   * Primary action button.
   * Typically "Go to Dashboard" with onClick: () => navigate('/dashboard').
   */
  primaryAction: StatusPageAction;
  /**
   * Optional secondary action button.
   * Typically "Go Back" with onClick: () => navigate(-1).
   */
  secondaryAction?: StatusPageAction;
  /** Additional class on the root wrapper. */
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function NotFoundError({
  primaryAction,
  secondaryAction,
  className,
}: NotFoundErrorProps) {
  return (
    <StatusPage
      {...STATUS_PAGE_PRESETS.notFound}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      className={className}
    />
  );
}
