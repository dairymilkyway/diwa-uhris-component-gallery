/**
 * Card — Design System Component
 *
 * An elevated surface for grouping related content.
 *
 * Composition:
 *   <Card>
 *     <CardHeader title="…" description="…" actions={…} />
 *     <CardContent>…</CardContent>
 *     <CardFooter>…</CardFooter>
 *   </Card>
 *
 * Variants:  default | outlined | elevated | interactive
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'interactive';

export interface CardProps {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
  /** When variant="interactive", called on click */
  onClick?: () => void;
}

export interface CardHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  /** Optional content aligned to the right (badge, menu, button) */
  actions?: ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

// ── Style maps ────────────────────────────────────────────────────────────────

const VARIANT_CLASS: Record<CardVariant, string> = {
  default:     'border border-slate-200 bg-white',
  outlined:    'border-2 border-slate-200 bg-white',
  elevated:    'border border-slate-100 bg-white shadow-lg shadow-slate-100',
  interactive: 'border border-slate-200 bg-white cursor-pointer transition hover:border-brand-blue/40 hover:shadow-md active:scale-[.99]',
};

// ── Components ────────────────────────────────────────────────────────────────

export function Card({ variant = 'default', children, className = '', onClick }: CardProps) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn('overflow-hidden rounded-lg', VARIANT_CLASS[variant], className)}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({ title, description, actions, className = '' }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3 px-5 py-4 border-b-2 border-slate-100', className)}>
      <div className="min-w-0">
        <h3 className="font-heading text-sm font-bold text-slate-900 truncate">{title}</h3>
        {description && (
          <p className="mt-0.5 text-xs font-medium text-slate-400 leading-relaxed">{description}</p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={cn('px-5 py-4', className)}>{children}</div>;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={cn('flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-3', className)}>
      {children}
    </div>
  );
}
