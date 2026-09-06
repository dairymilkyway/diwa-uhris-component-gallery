/**
 * StatusDot — Design System Component
 *
 * A coloured glowing dot paired with a label. Used in tables to indicate
 * account or entity status at a glance.
 *
 * Self-contained: uses inline styles so it works without any external CSS.
 *
 * Usage:
 *   <StatusDot status="active" label="Active" />
 *   <StatusDot status="locked" label="Locked" />
 */

import { cn } from '../../../lib/utils';

export type StatusDotStatus = 'active' | 'locked' | 'inactive' | 'pending';

export interface StatusDotProps {
  status: StatusDotStatus;
  label?: string;
  className?: string;
}

const DOT_STYLES: Record<StatusDotStatus, { bg: string; shadow: string }> = {
  active:   { bg: '#10b981', shadow: '0 0 0 3px rgba(16,185,129,0.18)'  },
  locked:   { bg: '#ef4444', shadow: '0 0 0 3px rgba(239,68,68,0.18)'   },
  inactive: { bg: '#b45309', shadow: '0 0 0 3px rgba(180,83,9,0.18)'    },
  pending:  { bg: '#0284c7', shadow: '0 0 0 3px rgba(2,132,199,0.18)'   },
};

export function StatusDot({ status, label, className = '' }: StatusDotProps) {
  const dot = DOT_STYLES[status];
  return (
    <div
      className={cn('inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-slate-700', className)}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: 8,
          height: 8,
          borderRadius: '50%',
          flexShrink: 0,
          backgroundColor: dot.bg,
          boxShadow: dot.shadow,
        }}
      />
      {label && <span>{label}</span>}
    </div>
  );
}
