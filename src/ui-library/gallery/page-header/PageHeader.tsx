/**
 * PageHeader — Design System Component
 *
 * Standard page title area. Used at the top of list and detail pages.
 * Matches the production PageHeader in shared/components/ui.tsx.
 *
 * Renders:
 *   - Optional icon badge (indigo square)
 *   - Required title as <h1>
 *   - Optional subtitle as <p>
 *   - Optional actions slot (top-right on desktop, stacked below on mobile)
 *
 * Accessibility:
 *   - title renders as <h1>. Each page should have exactly one <h1>.
 *   - The icon badge is decorative — mark the icon aria-hidden="true" at the call site.
 *   - No ARIA role on the container — the <h1> alone establishes page context.
 *
 * Usage:
 *   <PageHeader
 *     icon={<Building2 size={20} aria-hidden="true" />}
 *     title="Company Structure"
 *     subtitle="Manage departments and reporting relationships."
 *     actions={<button className={btnPrimary}>Add Department</button>}
 *   />
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export interface PageHeaderProps {
  /** Page heading. Rendered as <h1>. Required. */
  title: string;
  /** Optional description below the heading. Rendered as <p>. */
  subtitle?: string;
  /**
   * Optional icon rendered inside an indigo badge.
   * Mark the icon aria-hidden="true" — the heading provides the accessible name.
   */
  icon?: ReactNode;
  /**
   * Optional action buttons or links.
   * Rendered top-right on desktop, stacked below the title on mobile.
   */
  actions?: ReactNode;
  /** Additional class on the root container. */
  className?: string;
}

export function PageHeader({ title, subtitle, icon, actions, className = '' }: PageHeaderProps) {
  return (
    <div className={cn(className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left: icon + title + subtitle */}
        <div className="flex items-start gap-4">
          {icon && (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-blue text-white shadow-lg shadow-brand-blue/20">
              {icon}
            </div>
          )}
          <div className="border-l-4 border-brand-blue pl-4">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
            {subtitle && (
              <p className="mt-1 max-w-4xl text-base font-medium leading-relaxed text-slate-500">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: actions */}
        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
