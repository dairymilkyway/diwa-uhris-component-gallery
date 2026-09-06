/**
 * DescriptionList — Design System Component
 *
 * Read-only label/value display using semantic HTML:
 *   <dl> — description list
 *   <dt> — term (label)
 *   <dd> — description (value)
 *
 * Two layouts:
 *   'vertical'   — label stacked above value (default, compact)
 *   'horizontal' — label and value side by side in a grid
 *
 * Responsive variant: 'responsive' starts vertical on mobile and switches
 * to a 2-column horizontal grid at sm breakpoint.
 *
 * Usage:
 *   <DescriptionList>
 *     <DescriptionItem label="Full Name" value="Juan dela Cruz" />
 *     <DescriptionItem label="Status" value={<Badge>Active</Badge>} />
 *     <DescriptionItem label="Notes" />   // empty value → shows "—"
 *   </DescriptionList>
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export type DescriptionListLayout = 'vertical' | 'horizontal' | 'responsive';

export interface DescriptionListProps {
  layout?: DescriptionListLayout;
  children: ReactNode;
  className?: string;
}

export interface DescriptionItemProps {
  label: string;
  value?: ReactNode;
  /** Span across full width (2 columns in horizontal layout) */
  fullWidth?: boolean;
  className?: string;
}

const LAYOUT_CLASS: Record<DescriptionListLayout, string> = {
  vertical:   'flex flex-col gap-4',
  horizontal: 'grid grid-cols-[minmax(8rem,14rem)_1fr] gap-x-6 gap-y-3',
  responsive: 'grid grid-cols-1 sm:grid-cols-[minmax(8rem,14rem)_1fr] gap-x-6 gap-y-3',
};

export function DescriptionList({
  layout = 'vertical',
  children,
  className = '',
}: DescriptionListProps) {
  return (
    <dl className={cn(LAYOUT_CLASS[layout], className)}>
      {children}
    </dl>
  );
}

export function DescriptionItem({
  label,
  value,
  fullWidth = false,
  className = '',
}: DescriptionItemProps) {
  const isEmpty = value === undefined || value === null || value === '';

  return (
    <>
      <dt
        className={cn(
          'text-xs font-bold uppercase tracking-[0.12em] text-slate-500',
          fullWidth && 'sm:col-span-2',
          className,
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          'text-sm font-medium text-slate-800',
          fullWidth && 'sm:col-span-2',
          isEmpty && 'text-slate-300',
        )}
      >
        {isEmpty ? '—' : value}
      </dd>
    </>
  );
}
