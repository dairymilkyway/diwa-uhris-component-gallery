/**
 * StatusPage — Design System Component
 *
 * Full-page status screen for 404, 403, 500, and custom states.
 *
 * Signature element: the status code itself rendered as a large Barlow
 * watermark behind the heading — brand typography as the primary visual,
 * no icon-in-a-circle required.
 *
 * Layout: full-page centered on bg-surface-page, no card wrapper.
 * Motion: content block enters with .os-slide-up (respects prefers-reduced-motion).
 * Watermark stays static — animating it would be distracting.
 *
 * No routing logic in this component. Action buttons accept onClick/href;
 * the consumer wires navigation (e.g. useNavigate from react-router-dom).
 *
 * Usage:
 *   <StatusPage
 *     {...STATUS_PAGE_PRESETS.notFound}
 *     primaryAction={{ label: 'Go to Dashboard', onClick: () => navigate('/dashboard') }}
 *     secondaryAction={{ label: 'Go Back', onClick: () => navigate(-1) }}
 *   />
 *
 * Accessibility:
 *   - Heading is <h1> — appropriate for a full-page status screen.
 *   - Watermark is aria-hidden="true" — decorative; the heading communicates the state.
 *   - Action buttons have descriptive labels via the `label` prop.
 *   - The watermark is opacity-[0.07] and has no contrast requirement (aria-hidden).
 */

import type { ReactNode } from 'react';
import { Button } from '../button/Button';
import { cn } from '../../../lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface StatusPageAction {
  /** Button label */
  label: string;
  /**
   * Click handler — consumer wires navigation.
   * Example: () => navigate('/dashboard')
   */
  onClick?: () => void;
  /**
   * Renders an <a> tag instead of <button> when provided.
   * Use for external links (e.g. a status-page URL) or non-SPA navigation.
   */
  href?: string;
}

export interface StatusPageProps {
  /**
   * Short eyebrow label shown above the heading.
   * Rendered in the brand-sky uppercase tracking style.
   * Example: "404 — Not Found"
   * Omit to skip the eyebrow row.
   */
  eyebrow?: string;

  /** Main heading. Rendered as <h1>. Required. */
  title: string;

  /** Body description below the heading. Rendered as <p>. Required. */
  description: string;

  /**
   * Status code string used as the large typographic watermark
   * rendered behind the heading (e.g. "404", "403", "500").
   * When omitted and `icon` is provided, the icon renders as the
   * background mark instead.
   */
  code?: string;

  /**
   * Lucide icon used as the background mark when `code` is not set.
   * Ignored when `code` is provided.
   * Pass with aria-hidden="true"; rendered at large size automatically.
   */
  icon?: ReactNode;

  /** Primary action — rendered as Button variant="primary". */
  primaryAction?: StatusPageAction;

  /**
   * Secondary action — rendered as Button variant="outline".
   * Omit for single-action states.
   */
  secondaryAction?: StatusPageAction;

  /** Additional class on the root wrapper. */
  className?: string;
}

// ── Presets ───────────────────────────────────────────────────────────────────

/**
 * Named presets for the three common status states.
 * Each preset supplies code, eyebrow, title, and description.
 * Consumer always provides actions — presets never include navigation.
 *
 * Usage:
 *   <StatusPage
 *     {...STATUS_PAGE_PRESETS.notFound}
 *     primaryAction={{ label: 'Go to Dashboard', onClick: () => navigate('/dashboard') }}
 *     secondaryAction={{ label: 'Go Back', onClick: () => navigate(-1) }}
 *   />
 */
export const STATUS_PAGE_PRESETS = {
  notFound: {
    code:        '404',
    eyebrow:     '404 — Not Found',
    title:       'Page Not Found',
    description: "The page you're looking for doesn't exist or may have been moved.",
  },
  forbidden: {
    code:        '403',
    eyebrow:     '403 — Access Restricted',
    title:       'Access Restricted',
    description: "You don't have permission to view this page. Contact your system administrator if you need access.",
  },
  serverError: {
    code:        '500',
    eyebrow:     '500 — Server Error',
    title:       'Something Went Wrong',
    description: 'We encountered an unexpected problem. Please try again or return to the dashboard.',
  },
} as const;

// ── Action renderer ───────────────────────────────────────────────────────────

const BASE_ANCHOR =
  'inline-flex items-center justify-center transition-all duration-150 ease-out active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 select-none h-10 gap-2 rounded-md px-4 text-sm';

const ANCHOR_PRIMARY =
  `${BASE_ANCHOR} font-bold bg-brand-blue text-white shadow-lg shadow-brand-blue/25 hover:bg-brand-navy hover:shadow-xl hover:shadow-brand-blue/30 focus-visible:ring-brand-blue/30`;

const ANCHOR_OUTLINE =
  `${BASE_ANCHOR} font-semibold border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-brand-blue/40 hover:bg-blue-50/40 hover:text-brand-blue focus-visible:ring-brand-blue/20`;

function ActionButton({
  action,
  variant,
}: {
  action: StatusPageAction;
  variant: 'primary' | 'outline';
}) {
  if (action.href) {
    return (
      <a
        href={action.href}
        className={variant === 'primary' ? ANCHOR_PRIMARY : ANCHOR_OUTLINE}
      >
        {action.label}
      </a>
    );
  }
  return (
    <Button variant={variant} onClick={action.onClick}>
      {action.label}
    </Button>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function StatusPage({
  eyebrow,
  title,
  description,
  code,
  icon,
  primaryAction,
  secondaryAction,
  className = '',
}: StatusPageProps) {
  const hasActions = primaryAction || secondaryAction;

  return (
    <div
      className={cn('relative flex min-h-screen items-center justify-center bg-surface-page px-6 py-16 overflow-hidden', className)}
    >
      {/* ── Watermark — static, aria-hidden ──────────────────────────────── */}
      {code ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute select-none font-heading font-bold text-brand-navy opacity-[0.07] text-[80px] sm:text-[120px] leading-none"
        >
          {code}
        </span>
      ) : icon ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute select-none text-brand-navy opacity-[0.12]"
          style={{ fontSize: 0 }}
        >
          {/* Clone the icon node with a larger display size via a wrapper */}
          <span className="block [&>svg]:h-24 [&>svg]:w-24">
            {icon}
          </span>
        </span>
      ) : null}

      {/* ── Content block — animated with .os-slide-up ───────────────────── */}
      <div className="relative z-10 max-w-sm w-full os-slide-up">

        {/* Eyebrow */}
        {eyebrow && (
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-sky">
            {eyebrow}
          </p>
        )}

        {/* Heading */}
        <h1 className="font-heading text-3xl font-bold text-brand-navy leading-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="mt-3 text-sm font-medium text-slate-500 leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        {hasActions && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {primaryAction && (
              <ActionButton action={primaryAction} variant="primary" />
            )}
            {secondaryAction && (
              <ActionButton action={secondaryAction} variant="outline" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
