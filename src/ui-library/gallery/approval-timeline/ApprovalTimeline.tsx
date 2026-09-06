/**
 * ApprovalTimeline — Design System Component
 *
 * A vertical workflow timeline showing approval steps with status,
 * actor, action, and timestamp. Generic — no domain logic.
 *
 * Based on the pattern in approvals/components/ApprovalTimeline.tsx
 * but extracted as a domain-free gallery primitive.
 *
 * Accessibility:
 *   - <ol> with aria-label
 *   - Each step is <li> with aria-label including status
 *   - Status icons are aria-hidden; status text is visually present
 *   - Active step is visually distinct (pulsing node)
 */

import type { ReactNode } from 'react';
import { Check, Clock, X, Ban, ShieldCheck } from 'lucide-react';
import { cn } from '../../../lib/utils';

export type ApprovalStepStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'verified'
  | 'current';

export interface ApprovalStep {
  id: string;
  actor: string;
  action?: string;
  status: ApprovalStepStatus;
  timestamp?: string;
  note?: string;
}

export interface ApprovalTimelineProps {
  steps: ApprovalStep[];
  'aria-label'?: string;
  className?: string;
}

const STATUS_ICON: Record<ApprovalStepStatus, ReactNode> = {
  approved:  <Check size={12} strokeWidth={2.5} />,
  verified:  <ShieldCheck size={12} strokeWidth={2.5} />,
  rejected:  <X size={12} strokeWidth={2.5} />,
  cancelled: <Ban size={12} strokeWidth={2.5} />,
  pending:   <span className="block h-2 w-2 rounded-full bg-slate-400" />,
  current:   <Clock size={12} strokeWidth={2.5} />,
};

const STATUS_NODE: Record<ApprovalStepStatus, string> = {
  approved:  'bg-emerald-500 text-white',
  verified:  'bg-brand-blue text-white',
  rejected:  'bg-rose-500 text-white',
  cancelled: 'bg-slate-400 text-white',
  pending:   'bg-white border-2 border-slate-300 text-slate-400',
  current:   'bg-brand-blue text-white animate-pulse',
};

const STATUS_LABEL: Record<ApprovalStepStatus, string> = {
  approved:  'Approved',
  verified:  'Verified',
  rejected:  'Rejected',
  cancelled: 'Cancelled',
  pending:   'Pending',
  current:   'In Review',
};

export function ApprovalTimeline({
  steps,
  'aria-label': ariaLabel = 'Approval workflow',
  className = '',
}: ApprovalTimelineProps) {
  return (
    <ol aria-label={ariaLabel} className={cn('space-y-0', className)}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li
            key={step.id}
            className="flex gap-3"
            aria-label={`Step ${i + 1}: ${step.actor} — ${STATUS_LABEL[step.status]}`}
          >
            {/* Spine */}
            <div className="flex flex-col items-center" aria-hidden="true">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${STATUS_NODE[step.status]}`}>
                {STATUS_ICON[step.status]}
              </div>
              {!isLast && (
                <div className="mt-1 w-px flex-1 bg-slate-200 min-h-[1.5rem]" />
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 pb-5">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm font-bold text-slate-800">{step.actor}</span>
                {step.action && (
                  <span className="text-xs font-medium text-slate-500">{step.action}</span>
                )}
                <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full
                  ${step.status === 'approved' || step.status === 'verified' ? 'bg-emerald-50 text-emerald-700' :
                    step.status === 'rejected' ? 'bg-rose-50 text-rose-700' :
                    step.status === 'current' ? 'bg-blue-50 text-brand-blue' :
                    'bg-slate-100 text-slate-500'}`}>
                  {STATUS_LABEL[step.status]}
                </span>
              </div>
              {step.timestamp && (
                <p className="mt-0.5 text-[11px] font-medium text-slate-400">{step.timestamp}</p>
              )}
              {step.note && (
                <p className="mt-1 text-xs font-medium text-slate-500 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                  {step.note}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
