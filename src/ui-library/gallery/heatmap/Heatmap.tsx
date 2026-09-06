/**
 * Heatmap — Design System Component
 *
 * A GitHub contribution-style calendar heatmap.
 * HRIS use cases: attendance patterns, leave frequency, approval volume.
 *
 * Usage:
 *   const data = [
 *     { date: '2025-01-01', value: 3 },
 *     { date: '2025-01-02', value: 0 },
 *     ...
 *   ];
 *   <Heatmap data={data} aria-label="Attendance heatmap" />
 */

import { useMemo } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

type Intensity = 0 | 1 | 2 | 3 | 4;

export type HeatmapScale = 'blue' | 'navy' | 'teal' | 'orange';

export interface HeatmapDataPoint {
  /** Date string in yyyy-MM-dd format */
  date: string;
  /** Raw value — automatically bucketed into 0–4 intensity levels */
  value: number;
}

export interface HeatmapProps {
  /** Array of date + value data points */
  data: HeatmapDataPoint[];
  /** Color scale — defaults to 'blue' */
  scale?: HeatmapScale;
  /** Show the Less → More legend strip — default true */
  showLegend?: boolean;
  /** Show month labels above columns — default true */
  showMonthLabels?: boolean;
  /** Show day labels (Mon/Wed/Fri) — default true */
  showDayLabels?: boolean;
  /** Cell size — default 'md' */
  size?: 'sm' | 'md';
  /** Called when a cell is hovered, with the cell data or null on leave */
  onCellHover?: (cell: HeatmapDataPoint | null) => void;
  /** Accessible label for the heatmap container */
  'aria-label'?: string;
}

// ── Internal cell type ────────────────────────────────────────────────────────

interface HeatCell extends HeatmapDataPoint {
  intensity: Intensity;
}

// ── Scales ────────────────────────────────────────────────────────────────────

const SCALES: Record<HeatmapScale, { cells: string[] }> = {
  blue: {
    cells: ['bg-slate-100', 'bg-sky-200', 'bg-sky-400', 'bg-blue-600', 'bg-[#00377B]'],
  },
  navy: {
    cells: ['bg-slate-100', 'bg-slate-300', 'bg-slate-500', 'bg-slate-700', 'bg-slate-900'],
  },
  teal: {
    cells: ['bg-slate-100', 'bg-cyan-200', 'bg-cyan-400', 'bg-cyan-600', 'bg-cyan-800'],
  },
  orange: {
    cells: ['bg-slate-100', 'bg-orange-200', 'bg-orange-400', 'bg-orange-500', 'bg-orange-700'],
  },
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function toIntensity(value: number): Intensity {
  if (value === 0) return 0;
  if (value <= 2)  return 1;
  if (value <= 5)  return 2;
  if (value <= 7)  return 3;
  return 4;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Heatmap({
  data,
  scale = 'blue',
  showLegend = true,
  showMonthLabels = true,
  showDayLabels = true,
  size = 'md',
  onCellHover,
  'aria-label': ariaLabel = 'Activity heatmap',
}: HeatmapProps) {
  const colors = SCALES[scale].cells;
  const cellSize = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5';
  const gap      = size === 'sm' ? 'gap-[3px]' : 'gap-[4px]';

  // Convert data to internal cells with intensity
  const cells = useMemo<HeatCell[]>(() =>
    data.map(d => ({ ...d, intensity: toIntensity(d.value) })),
    [data]
  );

  // Group into weeks (columns of 7 days each)
  const weeks = useMemo(() => {
    const cols: HeatCell[][] = [];
    let week: HeatCell[] = [];
    cells.forEach((cell, i) => {
      week.push(cell);
      if (week.length === 7 || i === cells.length - 1) {
        cols.push(week);
        week = [];
      }
    });
    return cols;
  }, [cells]);

  // Month label positions
  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, colIdx) => {
      const firstDay = week[0];
      if (!firstDay) return;
      const m = new Date(firstDay.date).getMonth();
      if (m !== lastMonth) {
        labels.push({ label: MONTHS[m]!, col: colIdx });
        lastMonth = m;
      }
    });
    return labels;
  }, [weeks]);

  const colW = size === 'sm' ? 13 : 19;

  return (
    <div className="w-full overflow-x-auto" aria-label={ariaLabel}>
      <div className="inline-flex flex-col gap-1.5">
        {/* Month labels */}
        {showMonthLabels && (
          <div className="relative h-4" style={{ width: weeks.length * colW }}>
            {monthLabels.map(({ label, col }) => (
              <span
                key={`${label}-${col}`}
                className="absolute text-[10px] font-bold text-slate-400"
                style={{ left: col * colW }}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="flex items-start gap-1">
          {/* Day labels */}
          {showDayLabels && (
            <div className="flex flex-col gap-[4px] mr-1">
              {DAYS.map((d, i) => (
                <span
                  key={d}
                  className={`text-[10px] font-bold text-slate-400 leading-none ${size === 'sm' ? 'h-2.5' : 'h-3.5'} flex items-center ${i % 2 === 0 ? 'opacity-0' : ''}`}
                  aria-hidden={i % 2 === 0}
                >
                  {d}
                </span>
              ))}
            </div>
          )}

          {/* Columns */}
          <div className={`flex ${gap}`}>
            {weeks.map((week, colIdx) => (
              <div key={colIdx} className={`flex flex-col ${gap}`}>
                {week.map((cell) => (
                  <button
                    key={cell.date}
                    type="button"
                    title={`${cell.date}: ${cell.value}`}
                    aria-label={`${cell.date}: ${cell.value} activities`}
                    onMouseEnter={() => onCellHover?.(cell)}
                    onMouseLeave={() => onCellHover?.(null)}
                    onFocus={() => onCellHover?.(cell)}
                    onBlur={() => onCellHover?.(null)}
                    className={[
                      cellSize,
                      'rounded-sm transition-transform hover:scale-125 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-blue/50',
                      colors[cell.intensity],
                    ].join(' ')}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-bold text-slate-400">Less</span>
            <div className="flex gap-1">
              {colors.map((c, i) => (
                <div key={i} className={`w-3 h-3 rounded-sm ${c}`} aria-hidden="true" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-400">More</span>
          </div>
        )}
      </div>
    </div>
  );
}
