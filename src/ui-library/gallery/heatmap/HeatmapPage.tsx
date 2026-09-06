/**
 * HeatmapPage — Gallery (Data Display)
 *
 * Attendance/activity calendar heatmap — a GitHub contribution-style
 * grid showing daily intensity over a date range.
 *
 * HRIS use cases: attendance patterns, leave frequency, approval volume,
 * overtime days, payroll processing dates.
 *
 * Architecture: ButtonPage pattern
 *   Header → Overview (visual only) → Variants (each = Showcase) → Accessibility → Related
 */

import { useState, useMemo } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['charts', 'calendar', 'leave-balance', 'activity-feed']);

// ── Types ──────────────────────────────────────────────────────────────────

type Intensity = 0 | 1 | 2 | 3 | 4;

interface HeatCell {
  date: string;        // yyyy-MM-dd
  value: number;       // raw value (0–N)
  intensity: Intensity; // 0 = empty, 1–4 = light → heavy
}

// ── Data generation ────────────────────────────────────────────────────────

function generateYear(seed = 42): HeatCell[] {
  const cells: HeatCell[] = [];
  const now = new Date(2025, 7, 18); // anchor: Aug 18 2025
  const start = new Date(now);
  start.setFullYear(now.getFullYear() - 1);
  start.setDate(start.getDate() - start.getDay()); // align to Sunday

  let pseudo = seed;
  function rand() {
    pseudo = (pseudo * 1664525 + 1013904223) & 0xffffffff;
    return (pseudo >>> 0) / 0xffffffff;
  }

  const d = new Date(start);
  while (d <= now) {
    const dow = d.getDay();
    const isWeekend = dow === 0 || dow === 6;
    const raw = isWeekend
      ? Math.random() < 0.1 ? Math.floor(rand() * 3) : 0
      : Math.floor(rand() * 10);

    const intensity: Intensity = raw === 0 ? 0 : raw <= 2 ? 1 : raw <= 5 ? 2 : raw <= 7 ? 3 : 4;

    cells.push({
      date: d.toISOString().slice(0, 10),
      value: raw,
      intensity,
    });
    d.setDate(d.getDate() + 1);
  }
  return cells;
}

function generateMonth(year: number, month: number, seed = 7): HeatCell[] {
  const cells: HeatCell[] = [];
  let pseudo = seed;
  function rand() {
    pseudo = (pseudo * 1664525 + 1013904223) & 0xffffffff;
    return (pseudo >>> 0) / 0xffffffff;
  }
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const dow = d.getDay();
    const isWeekend = dow === 0 || dow === 6;
    const raw = isWeekend ? 0 : Math.floor(rand() * 8);
    const intensity: Intensity = raw === 0 ? 0 : raw <= 2 ? 1 : raw <= 4 ? 2 : raw <= 6 ? 3 : 4;
    cells.push({ date: d.toISOString().slice(0, 10), value: raw, intensity });
  }
  return cells;
}

// ── Color scales ───────────────────────────────────────────────────────────

type Scale = 'blue' | 'navy' | 'teal' | 'orange';

const SCALES: Record<Scale, { cells: string[]; label: string }> = {
  blue: {
    label: 'Blue (default)',
    cells: [
      'bg-slate-100',
      'bg-sky-200',
      'bg-sky-400',
      'bg-blue-600',
      'bg-[#00377B]',
    ],
  },
  navy: {
    label: 'Navy',
    cells: [
      'bg-slate-100',
      'bg-slate-300',
      'bg-slate-500',
      'bg-slate-700',
      'bg-slate-900',
    ],
  },
  teal: {
    label: 'Teal',
    cells: [
      'bg-slate-100',
      'bg-cyan-200',
      'bg-cyan-400',
      'bg-cyan-600',
      'bg-cyan-800',
    ],
  },
  orange: {
    label: 'Orange',
    cells: [
      'bg-slate-100',
      'bg-orange-200',
      'bg-orange-400',
      'bg-orange-500',
      'bg-orange-700',
    ],
  },
};

// ── Heatmap component ──────────────────────────────────────────────────────

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

interface HeatmapGalleryProps {
  cells: HeatCell[];
  scale?: Scale;
  showLegend?: boolean;
  showMonthLabels?: boolean;
  showDayLabels?: boolean;
  size?: 'sm' | 'md';
  onCellHover?: (cell: HeatCell | null) => void;
}

function HeatmapGallery({
  cells,
  scale = 'blue',
  showLegend = true,
  showMonthLabels = true,
  showDayLabels = true,
  size = 'md',
  onCellHover,
}: HeatmapGalleryProps) {
  const colors = SCALES[scale].cells;
  const cellSize = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5';
  const gap      = size === 'sm' ? 'gap-[3px]' : 'gap-[4px]';

  // Group cells by week (column), each week = array of 7 days (Sun–Sat)
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

  // Month label positions (which column index each month starts at)
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

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-flex flex-col gap-1.5">
        {/* Month labels */}
        {showMonthLabels && (
          <div className="relative h-4" style={{ width: weeks.length * (size === 'sm' ? 13 : 19) }}>
            {monthLabels.map(({ label, col }) => (
              <span
                key={`${label}-${col}`}
                className="absolute text-[10px] font-bold text-slate-400"
                style={{ left: col * (size === 'sm' ? 13 : 19) }}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Grid body */}
        <div className="flex items-start gap-1">
          {/* Day labels */}
          {showDayLabels && (
            <div className="flex flex-col gap-[4px] mr-1">
              {DAYS.map((d, i) => (
                <span
                  key={d}
                  className={`text-[10px] font-bold text-slate-400 leading-none ${
                    size === 'sm' ? 'h-2.5' : 'h-3.5'
                  } flex items-center ${i % 2 === 0 ? 'opacity-0' : ''}`}
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
                    title={`${cell.date}: ${cell.value} activities`}
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

// ── Month grid heatmap ─────────────────────────────────────────────────────

function MonthHeatmap({
  cells,
  year,
  month,
  scale = 'blue',
}: {
  cells: HeatCell[];
  year: number;
  month: number;
  scale?: Scale;
}) {
  const colors  = SCALES[scale].cells;
  const firstDow = new Date(year, month, 1).getDay(); // 0 = Sun
  const blanks  = Array.from({ length: firstDow });

  return (
    <div className="w-full">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1.5">
        {DAYS.map((d) => (
          <div key={d} className="text-[10px] font-bold text-center text-slate-400">{d}</div>
        ))}
      </div>
      {/* Cells */}
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => <div key={`b${i}`} />)}
        {cells.map((cell) => {
          const day = parseInt(cell.date.slice(8, 10));
          return (
            <button
              key={cell.date}
              type="button"
              title={`${cell.date}: ${cell.value}`}
              aria-label={`Day ${day}: ${cell.value} activities`}
              className={[
                'aspect-square w-full rounded-md text-[10px] font-bold text-center transition hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-blue/50',
                cell.intensity === 0
                  ? 'text-slate-400 ' + colors[0]
                  : 'text-white ' + colors[cell.intensity],
              ].join(' ')}
            >
              {day}
            </button>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] font-bold text-slate-400">Less</span>
        <div className="flex gap-1">
          {colors.map((c, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${c}`} aria-hidden="true" />
          ))}
        </div>
        <span className="text-[10px] font-bold text-slate-400">More</span>
      </div>
    </div>
  );
}

// ── Overview demo ──────────────────────────────────────────────────────────

function OverviewDemo() {
  const [tooltip, setTooltip] = useState<HeatCell | null>(null);
  const yearCells = useMemo(() => generateYear(42), []);

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-sky">
            Attendance Activity
          </p>
          <p className="mt-0.5 font-heading text-lg font-bold text-brand-navy">
            Last 12 months
          </p>
        </div>
        {tooltip ? (
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm text-right">
            <p className="text-[11px] font-bold text-brand-navy">{tooltip.date}</p>
            <p className="text-xs font-medium text-slate-500">{tooltip.value} activities</p>
          </div>
        ) : (
          <p className="text-xs font-medium text-slate-400">Hover a cell to inspect</p>
        )}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <HeatmapGallery cells={yearCells} onCellHover={setTooltip} />
      </div>
    </div>
  );
}

// ── Scale switcher demo ────────────────────────────────────────────────────

function ScaleDemo() {
  const [scale, setScale] = useState<Scale>('blue');
  const cells = useMemo(() => generateYear(17), []);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {(Object.entries(SCALES) as [Scale, { label: string; cells: string[] }][]).map(([key, val]) => (
          <button
            key={key}
            type="button"
            onClick={() => setScale(key)}
            className={[
              'rounded-xl border px-3 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
              scale === key
                ? 'border-brand-blue/30 bg-blue-50 text-brand-navy'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
            ].join(' ')}
          >
            {val.label}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <HeatmapGallery cells={cells} scale={scale} />
      </div>
    </div>
  );
}

// ── Month view demo ────────────────────────────────────────────────────────

function MonthViewDemo() {
  const [month, setMonth] = useState(7); // August
  const year = 2025;
  const cells = useMemo(() => generateMonth(year, month, month * 13 + 3), [month]);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonth((m) => Math.max(0, m - 1))}
          disabled={month === 0}
          className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
        >
          ‹ Prev
        </button>
        <p className="font-heading text-sm font-bold text-brand-navy">
          {MONTHS[month]} {year}
        </p>
        <button
          type="button"
          onClick={() => setMonth((m) => Math.min(11, m + 1))}
          disabled={month === 11}
          className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
        >
          Next ›
        </button>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <MonthHeatmap cells={cells} year={year} month={month} />
      </div>
    </div>
  );
}

// ── Compact inline demo ────────────────────────────────────────────────────

function CompactDemo() {
  const cells = useMemo(() => generateYear(99), []);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-sky">Leave Frequency</p>
          <p className="font-heading text-base font-bold text-brand-navy">Maria Santos · 2024–2025</p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <p className="text-xs font-semibold text-slate-400">Total Days</p>
            <p className="font-heading text-lg font-bold text-brand-navy tabular-nums">
              {cells.filter(c => c.intensity > 0).length}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Peak</p>
            <p className="font-heading text-lg font-bold text-brand-navy tabular-nums">
              {Math.max(...cells.map(c => c.value))}
            </p>
          </div>
        </div>
      </div>
      <HeatmapGallery cells={cells} size="sm" scale="navy" />
    </div>
  );
}

// ── Code strings ───────────────────────────────────────────────────────────

function YearGridDemo() {
  const cells = useMemo(() => generateYear(42), []);
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <HeatmapGallery cells={cells} />
    </div>
  );
}

const CODE = {
  yearGrid: `// Year heatmap — groups cells into week columns (Sun–Sat)
// Each cell maps intensity 0–4 to a color scale

type Intensity = 0 | 1 | 2 | 3 | 4;

interface HeatCell {
  date: string;       // 'yyyy-MM-dd'
  value: number;      // raw count
  intensity: Intensity;
}

// Color scale — index 0 = empty, 1–4 = light → heavy
const BLUE_SCALE = [
  'bg-slate-100',
  'bg-brand-sky/25',
  'bg-brand-sky/50',
  'bg-brand-blue/70',
  'bg-brand-navy',
];

// Render a single cell
<button
  type="button"
  title={\`\${cell.date}: \${cell.value} activities\`}
  aria-label={\`\${cell.date}: \${cell.value} activities\`}
  className={\`w-3.5 h-3.5 rounded-sm transition-transform hover:scale-125
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-blue/50
              \${BLUE_SCALE[cell.intensity]}\`}
/>

// Legend
<div className="flex items-center gap-2">
  <span className="text-[10px] font-bold text-slate-400">Less</span>
  {BLUE_SCALE.map((c, i) => (
    <div key={i} className={\`w-3 h-3 rounded-sm \${c}\`} aria-hidden="true" />
  ))}
  <span className="text-[10px] font-bold text-slate-400">More</span>
</div>`,

  intensityMap: `// Map raw values to intensity levels
// Adjust thresholds to your data range

function toIntensity(value: number, max = 10): Intensity {
  if (value === 0) return 0;
  const pct = value / max;
  if (pct <= 0.25) return 1;
  if (pct <= 0.50) return 2;
  if (pct <= 0.75) return 3;
  return 4;
}

// Example: attendance data
const cells: HeatCell[] = attendanceRecords.map((record) => ({
  date: record.date,
  value: record.checkInCount,
  intensity: toIntensity(record.checkInCount),
}));`,

  monthGrid: `// Month view — calendar grid, day numbers inside colored cells
// firstDow blank cells align day 1 to the correct weekday column

const firstDow = new Date(year, month, 1).getDay(); // 0 = Sun
const blanks = Array.from({ length: firstDow });

<div className="grid grid-cols-7 gap-1">
  {/* blank spacers to align day 1 */}
  {blanks.map((_, i) => <div key={\`b\${i}\`} />)}

  {cells.map((cell) => {
    const day = parseInt(cell.date.slice(8, 10));
    return (
      <button
        key={cell.date}
        aria-label={\`Day \${day}: \${cell.value} activities\`}
        className={\`aspect-square w-full rounded-md text-[10px] font-bold
                   text-center transition hover:scale-110
                   \${cell.intensity === 0
                     ? 'text-slate-400 bg-slate-100'
                     : 'text-white ' + SCALE[cell.intensity]
                   }\`}
      >
        {day}
      </button>
    );
  })}
</div>`,

  compact: `// Compact variant — sm cell size (w-2.5 h-2.5), navy scale
// Use inside employee profile cards or sidebar summaries

<Heatmap
  data={data}
  size="sm"
  scale="navy"
  showMonthLabels={true}
  showDayLabels={true}
  showLegend={true}
/>`,
};

// ── Employee Schedule Grid ─────────────────────────────────────────────────
// Ported from unified-hris ScheduleOverview, reskinned to DIWA brand tokens.

type ScheduleView = 'Day' | 'Week' | 'Month';
type WorkStatus = 'onsite' | 'wfh' | 'rest' | 'leave' | 'holiday';

const WORK_STATUS: Record<WorkStatus, { bg: string; border: string; text: string; label: string }> = {
  onsite:  { bg: 'bg-blue-600',   border: 'border-blue-700',   text: 'text-white',       label: 'Full Day / Onsite'  },
  wfh:     { bg: 'bg-cyan-500',   border: 'border-cyan-600',   text: 'text-white',       label: 'Full Day / WFH'     },
  rest:    { bg: 'bg-slate-200',  border: 'border-slate-300',  text: 'text-slate-500',   label: 'Rest Day'           },
  leave:   { bg: 'bg-rose-500',   border: 'border-rose-600',   text: 'text-white',       label: 'On Leave'           },
  holiday: { bg: 'bg-amber-400',  border: 'border-amber-500',  text: 'text-amber-900',   label: 'National Holiday'   },
};

// Cycle order for interactive week view: onsite → wfh → rest → onsite…
const CYCLE: WorkStatus[] = ['onsite', 'wfh', 'rest'];

interface WeekDay {
  dow: string;   // MON, TUE…
  date: string;  // Aug 06
  status: WorkStatus;
  time: string;
}

const INITIAL_WEEK: WeekDay[] = [
  { dow: 'MON', date: 'Aug 11', status: 'onsite',  time: '8:00 AM – 5:00 PM' },
  { dow: 'TUE', date: 'Aug 12', status: 'wfh',     time: '8:00 AM – 5:00 PM' },
  { dow: 'WED', date: 'Aug 13', status: 'onsite',  time: '8:00 AM – 5:00 PM' },
  { dow: 'THU', date: 'Aug 14', status: 'leave',   time: 'All Day' },
  { dow: 'FRI', date: 'Aug 15', status: 'holiday', time: 'All Day' },
  { dow: 'SAT', date: 'Aug 16', status: 'rest',    time: '—' },
  { dow: 'SUN', date: 'Aug 17', status: 'rest',    time: '—' },
];

const TIME_LABELS = ['6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM'];
const HOURS = Array.from({ length: 13 }, (_, i) => i + 6); // 6–18

function DayView() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex divide-x divide-slate-100 border-b border-slate-100">
        <div className="flex w-20 shrink-0 items-center justify-center bg-slate-50 p-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Time
        </div>
        <div className="flex-1 bg-slate-50 p-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Wednesday, Aug 13
        </div>
      </div>
      <div className="divide-y divide-slate-50">
        {HOURS.map((hour) => {
          const isWork = hour >= 8 && hour < 17;
          const label = hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`;
          return (
            <div key={hour} className="flex h-16 divide-x divide-slate-50 hover:bg-slate-50/40 transition-colors">
              <div className="flex w-20 shrink-0 items-start justify-center pt-3 text-[11px] font-medium text-slate-400">
                {label}
              </div>
              <div className="relative flex-1">
                {isWork && (
                  <div className="absolute inset-x-2 inset-y-1.5 rounded-xl border border-blue-600 bg-blue-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">Work Shift · Onsite</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekView({ days, onToggle }: { days: WeekDay[]; onToggle: (i: number) => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="grid grid-cols-8 divide-x divide-slate-100 border-b border-slate-200 bg-slate-50">
        <div className="p-3 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">Day</div>
        {TIME_LABELS.map((t) => (
          <div key={t} className="p-3 text-center text-[11px] font-bold text-slate-400">{t}</div>
        ))}
      </div>
      {/* Rows */}
      <div className="divide-y divide-slate-100">
        {days.map((row, i) => {
          const cfg = WORK_STATUS[row.status];
          return (
            <div key={row.dow} className="grid grid-cols-8 divide-x divide-slate-50 min-h-[72px] hover:bg-slate-50/30 transition-colors">
              {/* Date cell */}
              <div className="flex flex-col items-center justify-center gap-0.5 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{row.dow}</span>
                <span className="text-sm font-bold text-brand-navy">{row.date}</span>
              </div>
              {/* Block spanning 6 of 7 time columns */}
              {row.status === 'onsite' || row.status === 'wfh' ? (
                <>
                  <div className="col-span-1" />
                  <button
                    type="button"
                    onClick={() => onToggle(i)}
                    aria-label={`${row.dow} ${row.date}: ${cfg.label}. Click to change.`}
                    className={`col-span-5 m-1.5 rounded-xl border ${cfg.border} ${cfg.bg} flex flex-col justify-center px-4 py-2 transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 text-left`}
                  >
                    <span className={`text-xs font-bold ${cfg.text}`}>{cfg.label}</span>
                    <span className="mt-0.5 font-mono text-[10px] text-slate-400">{row.time}</span>
                    <span className="mt-1 text-[10px] font-semibold text-brand-sky">Click to change →</span>
                  </button>
                  <div className="col-span-1" />
                </>
              ) : row.status === 'rest' ? (
                <>
                  <button
                    type="button"
                    onClick={() => onToggle(i)}
                    aria-label={`${row.dow} ${row.date}: Rest Day. Click to change.`}
                    className={`col-span-7 m-1.5 rounded-xl border ${cfg.border} ${cfg.bg} flex items-center gap-3 px-4 py-2 transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 text-left`}
                  >
                    <span className={`text-xs font-bold ${cfg.text}`}>{cfg.label}</span>
                    <span className="text-[10px] font-semibold text-brand-sky">Click to change →</span>
                  </button>
                </>
              ) : (
                <div className={`col-span-7 m-1.5 rounded-xl border ${cfg.border} ${cfg.bg} flex items-center px-4 py-2`}>
                  <span className={`text-xs font-bold ${cfg.text}`}>{cfg.label}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MonthView() {
  const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstDow = 4; // Aug 2025 starts on Friday
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="grid grid-cols-7 divide-x divide-slate-100 border-b border-slate-200 bg-slate-50">
        {DOW.map((d) => (
          <div key={d} className="p-3 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
        {Array.from({ length: 35 }).map((_, i) => {
          const day = i - firstDow + 1;
          const valid = day >= 1 && day <= 31;
          const dow = i % 7;
          const isWeekend = dow === 0 || dow === 6;
          const isHoliday = day === 15;
          return (
            <div key={i} className={`min-h-[88px] p-2 ${!valid ? 'bg-slate-50/50' : ''}`}>
              {valid && (
                <>
                  <span className={`text-xs font-bold ${isWeekend || isHoliday ? 'text-slate-400' : 'text-brand-navy'}`}>
                    {day}
                  </span>
                  {!isWeekend && !isHoliday && (
                    <div className="mt-1.5 rounded-lg border border-blue-700 bg-blue-600 px-1.5 py-1 text-[10px] font-bold text-white">
                      8:00 AM – 5:00 PM
                    </div>
                  )}
                  {isHoliday && (
                    <div className="mt-1.5 rounded-lg border border-amber-500 bg-amber-400 px-1.5 py-1 text-[10px] font-bold text-amber-900">
                      National Holiday
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScheduleDemo() {
  const [view, setView] = useState<ScheduleView>('Week');
  const [days, setDays] = useState<WeekDay[]>(INITIAL_WEEK);

  function toggleDay(i: number) {
    setDays((prev) => {
      const next = [...prev];
      const cur  = next[i]!;
      if (!CYCLE.includes(cur.status)) return next; // leave/holiday not interactive
      const idx  = CYCLE.indexOf(cur.status);
      const nxt  = CYCLE[(idx + 1) % CYCLE.length]!;
      next[i] = {
        ...cur,
        status: nxt,
        time: nxt === 'rest' ? '—' : '8:00 AM – 5:00 PM',
      };
      return next;
    });
  }

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex gap-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Current Shift</p>
            <p className="mt-1 font-heading text-xl font-bold text-brand-navy">8:00 AM – 5:00 PM</p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Assigned as{' '}
              <span className="rounded border border-blue-700 bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                Shift 8
              </span>
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Current Cutoff</p>
            <p className="mt-1 font-heading text-xl font-bold text-brand-navy">Aug 6 – Aug 20</p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Based on{' '}
              <span className="rounded border border-cyan-600 bg-cyan-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                Corporate Employees
              </span>
            </p>
          </div>
        </div>

        {/* View switcher */}
        <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm self-start md:self-auto">
          {(['Day', 'Week', 'Month'] as ScheduleView[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={[
                'rounded-lg px-4 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
                view === v
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
              ].join(' ')}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Legend (week view only) */}
      {view === 'Week' && (
        <div className="flex flex-wrap items-center gap-4">
          {(Object.entries(WORK_STATUS) as [WorkStatus, typeof WORK_STATUS[WorkStatus]][]).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className={`h-3 w-3 rounded-sm ${val.bg}`} aria-hidden="true" />
              <span className="text-[11px] font-semibold text-slate-500">{val.label}</span>
            </div>
          ))}
          <span className="text-[11px] font-medium text-brand-sky">· Click Onsite / WFH / Rest to cycle</span>
        </div>
      )}

      {/* Grid */}
      {view === 'Day'   && <DayView />}
      {view === 'Week'  && <WeekView days={days} onToggle={toggleDay} />}
      {view === 'Month' && <MonthView />}
    </div>
  );
}

// ── Employee Attendance Heatmap ────────────────────────────────────────────

function AttendanceProfileDemo() {
  const cells = useMemo(() => generateYear(55), []);

  const present = cells.filter(c => c.intensity > 0).length;
  const absent  = cells.filter(c => c.intensity === 0 && new Date(c.date).getDay() !== 0 && new Date(c.date).getDay() !== 6).length;
  const total   = cells.length;

  return (
    <div className="w-full space-y-4">
      {/* Profile card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Card header */}
        <div className="relative border-b border-slate-100 px-6 py-5">
          <div className="absolute inset-y-0 left-0 w-1 bg-brand-navy" aria-hidden="true" />
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-navy font-heading text-base font-bold text-white">
                MS
              </div>
              <div>
                <p className="font-heading text-base font-bold text-brand-navy">Maria Santos</p>
                <p className="text-xs font-medium text-slate-500">Senior Accountant · Finance & Accounting</p>
                <p className="mt-0.5 text-[11px] font-semibold text-slate-400">EMP-0042 · Regular · Full-time</p>
              </div>
            </div>
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
              Active
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
          {[
            { label: 'Days Present', value: present,             color: 'text-brand-navy' },
            { label: 'Days Absent',  value: absent,              color: 'text-rose-500'   },
            { label: 'Attendance %', value: `${Math.round((present / total) * 100)}%`, color: 'text-emerald-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="px-5 py-3 text-center">
              <p className={`font-heading text-xl font-bold tabular-nums ${color}`}>{value}</p>
              <p className="text-[11px] font-semibold text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Heatmap */}
        <div className="px-5 py-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-sky">
            Attendance Activity · Last 12 Months
          </p>
          <HeatmapGallery cells={cells} scale="navy" size="sm" />
        </div>
      </div>
    </div>
  );
}

// ── Employee-specific code strings ────────────────────────────────────────

const CODE_EMPLOYEE = {
  schedule: `// Employee Schedule Grid — Day / Week / Month views
// Ported from unified-hris ScheduleOverview, reskinned to DIWA brand tokens
// Week view is interactive: click Onsite / WFH / Rest cells to cycle status

type WorkStatus = 'onsite' | 'wfh' | 'rest' | 'leave' | 'holiday';
const CYCLE: WorkStatus[] = ['onsite', 'wfh', 'rest']; // interactive cycle

const WORK_STATUS = {
  onsite:  { bg: 'bg-brand-blue/10',  border: 'border-brand-blue/30',  text: 'text-brand-navy', label: 'Full Day / Onsite' },
  wfh:     { bg: 'bg-brand-cyan/10',  border: 'border-brand-cyan/40',  text: 'text-brand-navy', label: 'Full Day / WFH'    },
  rest:    { bg: 'bg-slate-100',      border: 'border-slate-200',      text: 'text-slate-400',  label: 'Rest Day'          },
  leave:   { bg: 'bg-rose-50',        border: 'border-rose-200',       text: 'text-rose-700',   label: 'On Leave'          },
  holiday: { bg: 'bg-amber-50',       border: 'border-amber-200',      text: 'text-amber-700',  label: 'National Holiday'  },
};

// View switcher — brand-navy active pill
<div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
  {['Day', 'Week', 'Month'].map((v) => (
    <button key={v} onClick={() => setView(v)}
      className={view === v
        ? 'rounded-lg px-4 py-2 text-xs font-bold bg-brand-navy text-white shadow-sm'
        : 'rounded-lg px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50'
      }
    >
      {v}
    </button>
  ))}
</div>

// Week row — interactive for onsite/wfh/rest, static for leave/holiday
<div className="grid grid-cols-8 min-h-[72px]">
  <div className="flex flex-col items-center justify-center p-3">
    <span className="text-[10px] font-bold text-slate-400">{row.dow}</span>
    <span className="text-sm font-bold text-brand-navy">{row.date}</span>
  </div>
  <button
    onClick={() => cycleStatus(i)}  // onsite → wfh → rest → onsite
    className={\`col-span-5 m-1.5 rounded-xl border \${cfg.border} \${cfg.bg} px-4 py-2\`}
  >
    <span className={\`text-xs font-bold \${cfg.text}\`}>{cfg.label}</span>
    <span className="font-mono text-[10px] text-slate-400">{row.time}</span>
  </button>
</div>`,

  attendance: `// Employee attendance heatmap — embedded in a profile card
// Brand-navy left strip on the card header, navy heatmap scale, sm cell size

<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  {/* Profile header with navy left strip */}
  <div className="relative border-b border-slate-100 px-6 py-5">
    <div className="absolute inset-y-0 left-0 w-1 bg-brand-navy" aria-hidden="true" />
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy
                      font-heading text-base font-bold text-white">
        MS
      </div>
      <div>
        <p className="font-heading text-base font-bold text-brand-navy">{employee.name}</p>
        <p className="text-xs font-medium text-slate-500">{employee.role} · {employee.dept}</p>
      </div>
    </div>
  </div>

  {/* Stats row */}
  <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
    <div className="px-5 py-3 text-center">
      <p className="font-heading text-xl font-bold text-brand-navy tabular-nums">{daysPresent}</p>
      <p className="text-[11px] font-semibold text-slate-400">Days Present</p>
    </div>
    {/* ... */}
  </div>

  {/* Heatmap */}
  <div className="px-5 py-5">
    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-sky">
      Attendance Activity · Last 12 Months
    </p>
    <HeatmapGallery cells={cells} scale="navy" size="sm" />
  </div>
</div>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function HeatmapPage() {
  return (
    <GalleryLayout activeId="heatmap">
      <title>Heatmap — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Data Display"
          name="Heatmap"
          description="A calendar heatmap for visualizing daily activity intensity over time. Use for attendance patterns, leave frequency, approval volume, or any date-bucketed metric across UHRIS."
          status="complete"
          importName="Heatmap"
        />

        {/* ── Overview ──────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Full year heatmap. Hover or focus any cell to inspect its date and value."
        >
          <ShowcasePreview standalone tone="light" center={false} minHeight="min-h-0">
            <OverviewDemo />
          </ShowcasePreview>
        </GallerySection>

        {/* ── Year grid ─────────────────────────────────────────────── */}
        <GallerySection
          id="year-grid"
          title="Year Grid"
          description="52 weeks × 7 days. Cells are grouped into week columns, with month labels and day-of-week labels on the left."
        >
          <Showcase code={CODE.yearGrid} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <YearGridDemo />
          </Showcase>
        </GallerySection>

        {/* ── Color scales ──────────────────────────────────────────── */}
        <GallerySection
          id="scales"
          title="Color Scales"
          description="Four scales built on the DIWA brand palette. Click to switch."
        >
          <Showcase code={CODE.intensityMap} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <ScaleDemo />
          </Showcase>
        </GallerySection>

        {/* ── Month view ────────────────────────────────────────────── */}
        <GallerySection
          id="month-view"
          title="Month View"
          description="Calendar month grid with day numbers inside the colored cells. Use Prev/Next to navigate months."
        >
          <Showcase code={CODE.monthGrid} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <MonthViewDemo />
          </Showcase>
        </GallerySection>

        {/* ── Compact ───────────────────────────────────────────────── */}
        <GallerySection
          id="compact"
          title="Compact"
          description="Small cell size (w-2.5 h-2.5) and navy scale — fits inside employee profile cards or sidebar panels."
        >
          <Showcase code={CODE.compact} language="tsx" tone="white" center={false} minHeight="min-h-0">
            <CompactDemo />
          </Showcase>
        </GallerySection>

        {/* ── Accessibility ─────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {([
              ['Cell labels', [
                'Every cell is a <button> with aria-label="date: N activities" — screen readers can navigate the grid.',
                'The title attribute provides the tooltip text for mouse users who do not trigger hover handlers.',
              ]],
              ['Color is not the only indicator', [
                'Intensity is encoded in aria-label text, not only color — accessible to color-blind users.',
                'Each cell\'s value is readable without needing to distinguish between shades.',
              ]],
              ['Keyboard navigation', [
                'Tab moves focus through cells. Arrow-key navigation within the grid is not implemented in this demo — add a roving tabIndex if needed for your use case.',
                'Focus-visible ring is applied via focus-visible:ring-1 focus-visible:ring-brand-blue/50.',
              ]],
              ['Legend', [
                'Legend divs use aria-hidden="true" — they are visual aids, not interactive.',
                'If using in a report context, describe the scale in accompanying text.',
              ]],
            ] as [string, string[]][]).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{heading}</h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GallerySection>

        {/* ── Employee Schedule ─────────────────────────────────────── */}
        <GallerySection
          id="employee-schedule"
          title="Employee Schedule Grid"
          description="Weekly work schedule showing presence, leave, and rest days per employee. Use on the Employment tab of the employee detail page."
        >
          <Showcase code={CODE_EMPLOYEE.schedule} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <ScheduleDemo />
          </Showcase>
        </GallerySection>

        {/* ── Employee Attendance ───────────────────────────────────── */}
        <GallerySection
          id="employee-attendance"
          title="Employee Attendance Heatmap"
          description="Full-year attendance heatmap embedded in an employee profile card. Use on the History tab or as a summary widget."
        >
          <Showcase code={CODE_EMPLOYEE.attendance} language="tsx" tone="white" center={false} minHeight="min-h-0">
            <AttendanceProfileDemo />
          </Showcase>
        </GallerySection>

        {/* ── API ──────────────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference">
          <p className="text-sm font-bold text-slate-700 mb-2">Heatmap</p>
          <ApiTable props={[
            { name: 'data',             type: 'HeatmapDataPoint[]',                        required: true,  description: 'Array of { date: string (yyyy-MM-dd), value: number } data points. Value is auto-bucketed into 0–4 intensity levels.' },
            { name: 'scale',            type: "'blue' | 'navy' | 'teal' | 'orange'",       default: "'blue'",  description: 'Color scale. Each scale has 5 solid-color steps from lightest to darkest.' },
            { name: 'showLegend',       type: 'boolean',                                   default: 'true',    description: 'Show the Less → More legend strip.' },
            { name: 'showMonthLabels',  type: 'boolean',                                   default: 'true',    description: 'Show month labels above the columns.' },
            { name: 'showDayLabels',    type: 'boolean',                                   default: 'true',    description: 'Show Mon/Wed/Fri day labels on the left.' },
            { name: 'size',             type: "'sm' | 'md'",                               default: "'md'",    description: 'Cell size. sm = w-2.5 h-2.5, md = w-3.5 h-3.5.' },
            { name: 'onCellHover',      type: '(cell: HeatmapDataPoint | null) => void',   description: 'Called on cell mouseenter/focus. Null on mouseleave/blur.' },
            { name: 'aria-label',       type: 'string',                                    default: "'Activity heatmap'", description: 'Accessible label for the heatmap container.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">HeatmapDataPoint</p>
          <ApiTable props={[
            { name: 'date',  type: 'string', required: true, description: 'Date string in yyyy-MM-dd format.' },
            { name: 'value', type: 'number', required: true, description: 'Raw value — automatically bucketed into 0–4 intensity levels.' },
          ]} />
        </GallerySection>

        {/* ── Related ───────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
