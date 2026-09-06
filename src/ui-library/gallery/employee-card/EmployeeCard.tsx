/**
 * EmployeeCard — Design System Component
 *
 * A compact identity card for displaying a person's avatar, name,
 * role/title, optional metadata rows, optional status badge, and
 * optional action slot. Domain-free — no personnel-module dependencies.
 *
 * Based on the card pattern in approvals/components/manage-employees/EmployeeCard.tsx
 * but extracted as a generic PersonCard primitive.
 *
 * Accessibility:
 *   - <article> semantic for an independent card unit
 *   - Avatar image/initials have appropriate alt/aria-label
 *   - Action buttons should have aria-label
 */

import type { ReactNode } from 'react';
import { Avatar } from '../avatar/Avatar';
import { cn } from '../../../lib/utils';

export interface EmployeeCardMeta {
  label: string;
  value: ReactNode;
}

export interface EmployeeCardProps {
  name: string;
  role?: string;
  /** Optional avatar image src — falls back to initials */
  avatarSrc?: string | null;
  /** Status badge slot (e.g. <StatusBadge tone="success">Active</StatusBadge>) */
  status?: ReactNode;
  /** Key-value metadata rows below the name/role */
  meta?: EmployeeCardMeta[];
  /** Optional action slot (bottom of card) */
  actions?: ReactNode;
  className?: string;
}

export function EmployeeCard({
  name,
  role,
  avatarSrc,
  status,
  meta,
  actions,
  className = '',
}: EmployeeCardProps) {
  return (
    <article
      className={cn('rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden', className)}
      aria-label={`${name}${role ? ', ' + role : ''}`}
    >
      {/* Brand accent strip */}
      <div className="h-1.5 bg-gradient-to-r from-brand-navy to-brand-blue" aria-hidden="true" />

      <div className="p-4 space-y-3">
        {/* Identity row */}
        <div className="flex items-start gap-3">
          <Avatar name={name} src={avatarSrc} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 truncate">{name}</p>
            {role && <p className="text-xs font-medium text-slate-500 truncate">{role}</p>}
          </div>
          {status && <div className="shrink-0">{status}</div>}
        </div>

        {/* Metadata */}
        {meta && meta.length > 0 && (
          <dl className="divide-y divide-slate-100 text-xs">
            {meta.map((row) => (
              <div key={row.label} className="flex items-center justify-between py-1.5">
                <dt className="font-semibold text-slate-400">{row.label}</dt>
                <dd className="font-semibold text-slate-700 text-right">{row.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            {actions}
          </div>
        )}
      </div>
    </article>
  );
}
