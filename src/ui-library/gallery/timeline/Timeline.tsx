/**
 * Timeline — Design System Components
 *
 * Generic vertical timeline primitives for chronological event display.
 * Purely presentational — no domain logic, no API calls, no state.
 *
 * Components:
 *   Timeline          — vertical timeline wrapper
 *   TimelineItem      — single timeline node (dot + connector + card)
 *   TimelineValueCard — before/after comparison card
 *   TimelineFooter    — reason/source footer strip
 *   TimelineEmptyState — empty state panel
 *
 * Usage:
 *   <Timeline>
 *     <TimelineItem isFirst isLast={false}>
 *       <div>Header: who + when</div>
 *       <div className="p-4">
 *         <TimelineValueCard
 *           beforeContent={<span>Old value</span>}
 *           afterContent={<span>New value</span>}
 *         />
 *       </div>
 *     </TimelineItem>
 *   </Timeline>
 */

import type { ReactNode } from 'react';
import { ArrowDown, Clock } from 'lucide-react';
import { cn } from '../../../lib/utils';

// ── Timeline ──────────────────────────────────────────────────────────────────

export interface TimelineProps {
  children: ReactNode;
  className?: string;
}

export function Timeline({ children, className = '' }: TimelineProps) {
  return <div className={cn('w-full space-y-0', className)}>{children}</div>;
}

// ── TimelineItem ──────────────────────────────────────────────────────────────

export interface TimelineItemProps {
  /** True for the first (newest) item — renders an indigo dot. */
  isFirst: boolean;
  /** True for the last visible item — hides the connector line. */
  isLast: boolean;
  children: ReactNode;
  className?: string;
}

export function TimelineItem({ isFirst, isLast, children, className = '' }: TimelineItemProps) {
  return (
    <div className={cn('flex gap-3', className)}>
      {/* Spine — decorative, hidden from AT */}
      <div className="flex flex-col items-center shrink-0 pt-4" aria-hidden="true">
        <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-offset-2 shrink-0 ${
          isFirst ? 'bg-brand-blue ring-brand-blue/30' : 'bg-slate-300 ring-slate-100'
        }`} />
        {!isLast && <div className="w-px flex-1 bg-slate-200 mt-1.5 min-h-[2rem]" />}
      </div>

      {/* Card */}
      <div className="flex-1 min-w-0 pb-5">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── TimelineValueCard ─────────────────────────────────────────────────────────

export interface TimelineValueCardProps {
  /** Label above the "before" block. Default: "Previous" */
  beforeLabel?: string;
  /** Label above the "after" block. Default: "Current" */
  afterLabel?: string;
  /** Content for the old value. */
  beforeContent: ReactNode;
  /** Content for the new value. */
  afterContent: ReactNode;
  /** Optional action (e.g. copy button) next to the before label. */
  beforeAction?: ReactNode;
  /** Optional action next to the after label. */
  afterAction?: ReactNode;
}

export function TimelineValueCard({
  beforeLabel = 'Previous',
  afterLabel = 'Current',
  beforeContent,
  afterContent,
  beforeAction,
  afterAction,
}: TimelineValueCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden" role="group">
      {/* Previous value */}
      <div className="px-3 pt-2.5 pb-3 bg-slate-50">
        <div className="flex items-center gap-1 mb-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {beforeLabel}
          </span>
          {beforeAction && <span className="ml-auto">{beforeAction}</span>}
        </div>
        <div className="text-sm text-slate-500 leading-snug" role="group" aria-label={`${beforeLabel} value`}>
          {beforeContent}
        </div>
      </div>

      {/* Separator */}
      <div className="flex items-center justify-center py-1.5 border-y border-slate-200 bg-white" aria-hidden="true">
        <ArrowDown size={12} className="text-slate-400" strokeWidth={2.5} />
      </div>

      {/* Current value */}
      <div className="px-3 pt-2.5 pb-3 bg-white">
        <div className="flex items-center gap-1 mb-1.5">
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
            {afterLabel}
          </span>
          {afterAction && <span className="ml-auto">{afterAction}</span>}
        </div>
        <div className="text-sm font-semibold text-slate-800 leading-snug" role="group" aria-label={`${afterLabel} value`}>
          {afterContent}
        </div>
      </div>
    </div>
  );
}

// ── TimelineFooter ────────────────────────────────────────────────────────────

export interface TimelineFooterProps {
  /** Reason text. Rendered when provided. */
  reason?: string | null;
  /** Source label. Rendered when provided. */
  source?: string | null;
}

export function TimelineFooter({ reason, source }: TimelineFooterProps) {
  if (!reason && !source) return null;
  return (
    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
      {reason && (
        <p>
          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-0.5">
            Reason
          </span>
          {reason}
        </p>
      )}
      {source && (
        <p>
          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-0.5">
            Source
          </span>
          {source}
        </p>
      )}
    </div>
  );
}

// ── TimelineEmptyState ────────────────────────────────────────────────────────

export interface TimelineEmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function TimelineEmptyState({ icon, title, description, className = '' }: TimelineEmptyStateProps) {
  return (
    <div className={cn('py-16 text-center', className)}>
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50">
        {icon ?? <Clock size={22} className="text-slate-300" aria-hidden="true" />}
      </div>
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      {description && (
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      )}
    </div>
  );
}
