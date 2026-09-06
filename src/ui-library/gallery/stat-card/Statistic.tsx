/**
 * Statistic — Design System Component
 *
 * A KPI card. Four variants: default, accent, minimal, compact.
 * Signature element: brand-navy left border strip + font-heading number.
 *
 * Usage:
 *   <Statistic label="Total Employees" value={142} icon={Users} />
 *   <Statistic label="Fill Rate" value="83%" variant="accent" trend="up" trendLabel="+2%" />
 */

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../../lib/utils';

export type StatisticTrend = 'up' | 'down' | 'neutral';
export type StatisticVariant = 'default' | 'accent' | 'minimal' | 'compact';

export interface StatisticProps {
  /** KPI label — shown above the number */
  label: string;
  /** The headline number or string */
  value: string | number;
  /** Secondary text below the value (not shown when trend is set) */
  helper?: string;
  /** Icon component — e.g. from lucide-react */
  icon?: React.ElementType;
  /** Trend direction — renders a TrendingUp/Down/Minus icon */
  trend?: StatisticTrend;
  /** Override the default trend label */
  trendLabel?: string;
  /** Visual variant */
  variant?: StatisticVariant;
  className?: string;
}

const TREND_CONFIG = {
  up:      { icon: TrendingUp,   color: 'text-emerald-600', label: 'Up'       },
  down:    { icon: TrendingDown, color: 'text-rose-500',    label: 'Down'     },
  neutral: { icon: Minus,        color: 'text-slate-400',   label: 'No change'},
} satisfies Record<StatisticTrend, { icon: React.ElementType; color: string; label: string }>;

export function Statistic({
  label, value, helper, icon: Icon, trend, trendLabel, variant = 'default', className = '',
}: StatisticProps) {
  // ── Minimal ───────────────────────────────────────────────────────────────
  if (variant === 'minimal') {
    return (
      <div className={cn(className)}>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-sky">{label}</p>
        <p className="mt-1 font-heading text-4xl font-bold tabular-nums text-brand-navy">{value}</p>
        {helper && <p className="mt-1 text-xs font-medium text-slate-400">{helper}</p>}
      </div>
    );
  }

  // ── Compact ───────────────────────────────────────────────────────────────
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm', className)}>
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy/[0.06] text-brand-navy">
            <Icon size={18} aria-hidden="true" />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 truncate">{label}</p>
          <p className="font-heading text-2xl font-bold tabular-nums text-brand-navy leading-none mt-0.5">{value}</p>
          {helper && <p className="mt-0.5 text-xs font-medium text-slate-400 truncate">{helper}</p>}
        </div>
      </div>
    );
  }

  // ── Default / Accent ──────────────────────────────────────────────────────
  const stripColor = variant === 'accent' ? 'bg-brand-blue' : 'bg-brand-navy';

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm', className)}>
      <div className={`absolute inset-y-0 left-0 w-1 ${stripColor}`} aria-hidden="true" />
      <div className="px-6 py-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-sky">{label}</p>
          {Icon && (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-navy/[0.06] text-brand-navy">
              <Icon size={16} aria-hidden="true" />
            </div>
          )}
        </div>
        <p className="mt-3 font-heading text-4xl font-bold tabular-nums leading-none text-brand-navy">{value}</p>
        {trend ? (
          <div className="mt-2.5 flex items-center gap-1.5">
            {(() => {
              const cfg = TREND_CONFIG[trend];
              const TrendIcon = cfg.icon;
              return (
                <>
                  <TrendIcon size={13} className={cfg.color} aria-hidden="true" />
                  <span className={`text-xs font-semibold ${cfg.color}`}>{trendLabel ?? cfg.label}</span>
                </>
              );
            })()}
          </div>
        ) : helper ? (
          <p className="mt-2 text-xs font-medium text-slate-400">{helper}</p>
        ) : null}
      </div>
    </div>
  );
}
