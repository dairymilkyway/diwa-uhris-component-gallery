/**
 * Skeleton — Design System Component
 *
 * Animated loading placeholder. Supports two animation variants:
 *   - 'pulse'   (default) — Tailwind animate-pulse opacity fade
 *   - 'shimmer' — horizontal shimmer sweep via .skeleton-shimmer CSS class
 *
 * Purely presentational — no state, no API calls, no domain logic.
 *
 * Usage:
 *   // Generic block
 *   <Skeleton className="h-4 w-32 rounded-lg" />
 *   <Skeleton variant="shimmer" className="h-4 w-32 rounded-lg" />
 *
 *   // Composed patterns
 *   <SkeletonText lines={3} variant="shimmer" />
 *   <SkeletonAvatar variant="shimmer" />
 *   <SkeletonTableRow columns={['w-32', 'w-24', 'w-16']} variant="shimmer" />
 *
 * Accessibility:
 *   Skeleton elements are aria-hidden by default.
 *   Surround a loading region with aria-busy={loading} + aria-live="polite"
 *   on the parent container when screen-reader announcements are needed.
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

// ── Shared variant type ───────────────────────────────────────────────────────

export type SkeletonVariant = 'pulse' | 'shimmer';

// ── Base Skeleton ─────────────────────────────────────────────────────────────

export interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
}

export function Skeleton({ className = '', variant = 'pulse' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-lg',
        variant === 'shimmer' ? 'skeleton-shimmer' : 'animate-pulse bg-slate-200',
        className,
      )}
    />
  );
}

// ── SkeletonText — stacked line skeletons ─────────────────────────────────────

export interface SkeletonTextProps {
  /** Number of lines to render */
  lines?: number;
  className?: string;
  variant?: SkeletonVariant;
}

export function SkeletonText({ lines = 3, className = '', variant = 'pulse' }: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant={variant}
          className={`h-3.5 ${i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

// ── SkeletonAvatar ────────────────────────────────────────────────────────────

export interface SkeletonAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: SkeletonVariant;
}

const AVATAR_SIZE: Record<NonNullable<SkeletonAvatarProps['size']>, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
};

export function SkeletonAvatar({ size = 'md', className = '', variant = 'pulse' }: SkeletonAvatarProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-full shrink-0',
        variant === 'shimmer' ? 'skeleton-shimmer' : 'animate-pulse bg-slate-200',
        AVATAR_SIZE[size],
        className,
      )}
    />
  );
}

// ── SkeletonCard ──────────────────────────────────────────────────────────────

export interface SkeletonCardProps {
  className?: string;
  children?: ReactNode;
  variant?: SkeletonVariant;
}

export function SkeletonCard({ className = '', children, variant = 'pulse' }: SkeletonCardProps) {
  return (
    <div
      className={cn('rounded-2xl border border-slate-100 bg-white p-5 space-y-3', className)}
      aria-hidden="true"
    >
      {children ?? (
        <>
          <Skeleton variant={variant} className="h-4 w-1/3" />
          <SkeletonText variant={variant} lines={2} />
        </>
      )}
    </div>
  );
}

// ── SkeletonTableRow ──────────────────────────────────────────────────────────

export interface SkeletonTableRowProps {
  /** Number of rows to render */
  rows?: number;
  /** Tailwind width classes per column (e.g. ['w-32', 'w-24', 'w-16']) */
  columns?: string[];
  variant?: SkeletonVariant;
}

export function SkeletonTableRow({ rows = 5, columns = ['w-32', 'w-24', 'w-20', 'w-28'], variant = 'pulse' }: SkeletonTableRowProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, r) => (
        <tr key={r} aria-hidden="true">
          {columns.map((width, c) => (
            <td key={c} className="px-5 py-3.5">
              <Skeleton variant={variant} className={`h-3.5 ${width}`} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
