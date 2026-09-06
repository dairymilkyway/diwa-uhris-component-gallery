/**
 * BarList — Design System Component
 *
 * Ranked horizontal bar list for categorical value distributions.
 * Bars animate in from the left via .os-bar-in with configurable stagger.
 * No external library — pure CSS animation.
 *
 * Usage:
 *   <BarList
 *     items={[
 *       { label: 'Category A', value: 94, color: '#3b82f6' },
 *       { label: 'Category B', value: 72, color: '#6366f1' },
 *     ]}
 *     totalLabel="Total"
 *     staggerDelay={70}
 *   />
 *
 * Accessibility:
 *   - role="list" / role="listitem" semantics
 *   - aria-label on each row conveys label + formatted value
 *   - Bar fill is aria-hidden (data already conveyed by listitem label)
 *   - .os-bar-in respects prefers-reduced-motion
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export interface BarListItem {
  /** Row label */
  label: string;
  /** Raw numeric value */
  value: number;
  /**
   * CSS color for the bar fill — hex, rgb, or named color only.
   * Do NOT pass Tailwind class names (e.g. 'bg-blue-500') — they will
   * not resolve at runtime and the bar will render colorless.
   */
  color: string;
}

export type BarHeight = 'h-1' | 'h-2' | 'h-2.5' | 'h-3' | 'h-4';

export interface BarListProps {
  /** Data rows */
  items: BarListItem[];
  /**
   * Format the displayed value string.
   * Default: bare number.
   * Example: (v) => `${v}%` or (v) => `${v} users`
   */
  valueFormat?: (value: number) => string;
  /**
   * Label for the total row shown at the bottom of the list.
   * When omitted, no total row is rendered.
   */
  totalLabel?: string;
  /**
   * Tailwind height class applied to both the bar track and the fill.
   * Default: 'h-2'
   */
  barHeight?: BarHeight;
  /**
   * Stagger delay between bar animations in milliseconds.
   * Each bar at index i receives: animationDelay = i × staggerDelay ms.
   * Pass 0 to animate all bars simultaneously.
   * Default: 70
   */
  staggerDelay?: number;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function BarList({
  items,
  valueFormat,
  totalLabel,
  barHeight = 'h-2',
  staggerDelay = 70,
  className = '',
}: BarListProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);
  const total    = items.reduce((sum, item) => sum + item.value, 0);
  const fmt      = valueFormat ?? ((v: number) => String(v));

  return (
    <div
      role="list"
      aria-label="Bar list"
      className={`space-y-3 pt-1 ${className}`}
    >
      {items.map((item, i) => {
        const pct = (item.value / maxValue) * 100;

        return (
          <div
            key={item.label}
            role="listitem"
            aria-label={`${item.label}: ${fmt(item.value)}`}
          >
            {/* Label + value row */}
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-bold text-slate-700">{item.label}</span>
              <span className="text-xs text-slate-400 font-medium">{fmt(item.value)}</span>
            </div>

            {/* Track */}
            <div className={`${barHeight} w-full bg-slate-100/60 rounded-full overflow-hidden`}>
              {/* Fill — .os-bar-in with per-item stagger delay */}
              <div
                className={`${barHeight} rounded-full os-bar-in`}
                style={{
                  width: `${pct}%`,
                  backgroundColor: item.color,
                  animationDelay: `${i * staggerDelay}ms`,
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        );
      })}

      {/* Optional total row */}
      {totalLabel !== undefined && (
        <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {totalLabel}
          </span>
          <span className="text-sm font-bold text-slate-700">{total}</span>
        </div>
      )}
    </div>
  );
}
