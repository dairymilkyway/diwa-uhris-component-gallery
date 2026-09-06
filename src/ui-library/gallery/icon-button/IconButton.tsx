/**
 * IconButton — Design System Component
 *
 * A square icon-only button with three visual variants.
 *
 * Accessibility:
 *   - aria-label is REQUIRED — icon buttons have no visible text.
 *   - Mark the icon inside aria-hidden="true" to avoid double-announcement.
 *   - Focus ring is focus-visible only (keyboard, not mouse click).
 *   - disabled attribute prevents interaction and announces via AT.
 *   - title provides a browser tooltip as a secondary affordance but is NOT
 *     a substitute for aria-label.
 *
 * Usage:
 *   <IconButton icon={<Pencil size={16} aria-hidden="true" />} aria-label="Edit Engineering" variant="edit" />
 *   <IconButton icon={<Trash2 size={16} aria-hidden="true" />} aria-label="Delete record" variant="danger" />
 *   <IconButton icon={<Settings size={16} aria-hidden="true" />} aria-label="Open settings" />
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';
import { Slot } from '@radix-ui/react-slot';

export type IconButtonVariant = 'default' | 'edit' | 'danger';

export interface IconButtonProps extends React.ComponentProps<'button'> {
  /** Icon element. Use aria-hidden="true" on the icon to avoid double-announcement. */
  icon: ReactNode;
  /** Visual variant. Default: "default" (slate hover) */
  variant?: IconButtonVariant;
  /**
   * When true, renders as a child component (via Radix Slot).
   * Useful for rendering a Link as an icon button visually.
   */
  asChild?: boolean;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const BASE =
  'inline-flex items-center justify-center rounded-lg p-2 text-slate-400 transition-all duration-150 ease-out' +
  ' active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1' +
  ' disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 select-none';

const VARIANT_STYLES: Record<IconButtonVariant, string> = {
  default: 'hover:bg-slate-100  hover:text-slate-700  focus-visible:ring-brand-blue/20',
  edit:    'hover:bg-blue-50    hover:text-brand-blue focus-visible:ring-brand-blue/20',
  danger:  'hover:bg-rose-50    hover:text-rose-600   focus-visible:ring-rose-100',
};

// ── Component ──────────────────────────────────────────────────────────────

export function IconButton({
  icon,
  variant = 'default',
  className = '',
  asChild = false,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      type={asChild ? undefined : 'button'}
      className={cn(BASE, VARIANT_STYLES[variant], className)}
      {...props}
    >
      {icon}
    </Comp>
  );
}
