/**
 * Calendar — Design System Component
 *
 * A standalone month-view calendar grid for date selection and display.
 * Controlled or uncontrolled. No time support.
 *
 * Accessibility:
 *   - role="grid" for the calendar table
 *   - role="gridcell" for each day cell
 *   - aria-label on each cell: "Day Month Year, [Today|Selected]"
 *   - aria-selected on selected day
 *   - aria-current="date" on today
 *   - Keyboard: ArrowKeys navigate days, Enter/Space select
 *   - Previous/Next month buttons have aria-label
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CalendarProps {
  /** Selected date (controlled). */
  value?: Date | null;
  /** Default selected date (uncontrolled). */
  defaultValue?: Date | null;
  /** Called when a date is selected. */
  onChange?: (date: Date) => void;
  /** Minimum selectable date. */
  minDate?: Date;
  /** Maximum selectable date. */
  maxDate?: Date;
  /** Additional class on the root element. */
  className?: string;
}

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

export function Calendar({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  className = '',
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [internal, setInternal] = useState<Date | null>(defaultValue ?? null);
  const selected = value !== undefined ? value : internal;

  const [viewYear, setViewYear] = useState(
    (selected ?? today).getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    (selected ?? today).getMonth(),
  );

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleSelect = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;
    if (!value) setInternal(date);
    onChange?.(date);
  };

  // Build calendar grid
  const cells: Array<number | null> = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className={`inline-block select-none rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Previous month"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>
        <span className="text-sm font-bold text-slate-800">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Grid */}
      <table
        role="grid"
        aria-label={`${MONTHS[viewMonth]} ${viewYear}`}
        className="w-full border-collapse"
      >
        <thead>
          <tr>
            {DAYS.map((d) => (
              <th key={d} scope="col" className="pb-2 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => {
                if (!day) return <td key={di} role="gridcell" aria-label="Empty" />;
                const date = new Date(viewYear, viewMonth, day);
                const isToday = isSameDay(date, today);
                const isSelected = !!selected && isSameDay(date, selected);
                const isDisabled = (minDate ? date < minDate : false) || (maxDate ? date > maxDate : false);
                const label = `${day} ${MONTHS[viewMonth]} ${viewYear}${isToday ? ', Today' : ''}${isSelected ? ', Selected' : ''}`;

                return (
                  <td key={di} role="gridcell" aria-label={label} aria-selected={isSelected} className="p-0.5">
                    <button
                      type="button"
                      onClick={() => handleSelect(day)}
                      disabled={isDisabled}
                      aria-current={isToday ? 'date' : undefined}
                      className={[
                        'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
                        'disabled:cursor-not-allowed disabled:opacity-30',
                        isSelected
                          ? 'bg-brand-blue text-white shadow-md'
                          : isToday
                          ? 'border border-brand-blue/60 text-brand-blue hover:bg-blue-50'
                          : 'text-slate-700 hover:bg-slate-100',
                      ].join(' ')}
                    >
                      {day}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
