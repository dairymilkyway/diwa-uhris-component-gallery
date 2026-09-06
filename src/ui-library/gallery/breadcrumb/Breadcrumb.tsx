/**
 * Breadcrumb — Design System Component
 *
 * A hierarchical location indicator. Renders a <nav> landmark with
 * an accessible label. The last item receives aria-current="page".
 *
 * The component is purely presentational — it does not read from
 * the router. The consuming feature provides the items array.
 *
 * Usage:
 *   <Breadcrumb
 *     items={[
 *       { label: 'Home',     href: '/' },
 *       { label: 'Settings', href: '/settings' },
 *       { label: 'Roles' },
 *     ]}
 *   />
 */

import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  /** When provided, the item is rendered as a link. Omit for the current/last item. */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Show a Home icon before the first item (default: true) */
  showHome?: boolean;
  /** aria-label for the <nav> element (default: "Breadcrumb") */
  ariaLabel?: string;
  className?: string;
}

export function Breadcrumb({
  items,
  showHome = true,
  ariaLabel = 'Breadcrumb',
  className = '',
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={cn(className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm font-semibold text-slate-400">
        {/* Home icon — decorative visual anchor */}
        {showHome && (
          <li className="flex items-center">
            <Home size={14} className="shrink-0 text-slate-400" aria-hidden="true" />
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item.label} className="flex items-center gap-1">
              {/* Separator — not first item, or when Home is shown */}
              {(!isFirst || showHome) && (
                <ChevronRight
                  size={13}
                  className="shrink-0 text-slate-300"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                /* Current page — not a link */
                <span
                  className="text-slate-700"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                /* Ancestor with a link */
                <Link
                  to={item.href}
                  className="transition-colors hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 rounded"
                >
                  {item.label}
                </Link>
              ) : (
                /* Ancestor without a link (non-navigable section label) */
                <span>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
