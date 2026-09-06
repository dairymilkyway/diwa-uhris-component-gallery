/**
 * EmployeeSchedulePage — Gallery (Enterprise)
 *
 * Full department-grouped schedule matrix ported from unified-hris
 * EmployeeScheduleSettings. Reskinned to DIWA brand tokens.
 *
 * Features:
 *   — Month / Week / Cutoff view modes
 *   — Click to cycle: Office → WFH → Rest
 *   — Shift+click range select → bulk apply dropdown
 *   — Copy Month modal
 *   — Search + division / department filter
 *   — Philippine holidays pre-loaded
 *
 * Architecture: ButtonPage pattern
 *   Header → Overview (full interactive demo) → Code → Accessibility → Related
 */

import { useState, useMemo } from 'react';
import {
  Copy, Users, Building2, Search, Filter,
  ChevronUp, ChevronDown, X,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['heatmap', 'table', 'panel', 'statistic']);

// ── Types ──────────────────────────────────────────────────────────────────

type WorkStatus = 'O' | 'WFH' | 'H' | 'R';
type ScheduleView = 'Month' | 'Week' | 'Cutoff';

interface Employee {
  id: string;
  name: string;
  dept: string;
  division: string;
  section: string;
  schedule: Record<string, WorkStatus>;
}

// ── Status config — DIWA brand tokens ─────────────────────────────────────

const STATUS: Record<WorkStatus, { label: string; bg: string; border: string; text: string }> = {
  O:   { label: 'Office',  bg: 'bg-brand-blue/10', border: 'border-brand-blue/30', text: 'text-brand-navy'  },
  WFH: { label: 'WFH',     bg: 'bg-brand-cyan/10', border: 'border-brand-cyan/40', text: 'text-brand-navy'  },
  H:   { label: 'Holiday', bg: 'bg-amber-50',       border: 'border-amber-200',     text: 'text-amber-700'  },
  R:   { label: 'Rest',    bg: 'bg-slate-100',      border: 'border-slate-200',     text: 'text-slate-400'  },
};

const CYCLE: WorkStatus[] = ['O', 'WFH', 'R'];

// ── Philippine holidays ────────────────────────────────────────────────────

const HOLIDAYS: Record<string, string> = {
  '2026-01-01': "New Year's Day",
  '2026-02-17': 'Chinese New Year',
  '2026-02-25': 'EDSA People Power Revolution',
  '2026-04-02': 'Maundy Thursday',
  '2026-04-03': 'Good Friday',
  '2026-04-09': 'Araw ng Kagitingan',
  '2026-05-01': 'Labor Day',
  '2026-06-12': 'Independence Day',
  '2026-08-21': 'Ninoy Aquino Day',
  '2026-08-31': 'National Heroes Day',
  '2026-11-01': "All Saints' Day",
  '2026-11-30': 'Bonifacio Day',
  '2026-12-25': 'Christmas Day',
  '2026-12-30': 'Rizal Day',
};

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DOW_SHORT   = ['SU','M','T','W','TH','F','SA'];
const DOW_FULL    = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

// ── Mock data ──────────────────────────────────────────────────────────────

function buildSchedule(pattern: WorkStatus[]): Record<string, WorkStatus> {
  const out: Record<string, WorkStatus> = {};
  for (let m = 0; m < 12; m++) {
    const days = new Date(2026, m + 1, 0).getDate();
    for (let d = 1; d <= days; d++) {
      const key = `2026-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const dow = new Date(2026, m, d).getDay();
      if (HOLIDAYS[key]) { out[key] = 'H'; }
      else if (dow === 0 || dow === 6) { out[key] = 'R'; }
      else { out[key] = pattern[d % pattern.length]!; }
    }
  }
  return out;
}

const MOCK: Employee[] = [
  { id:'e1', name:'Sarah Wilson',     dept:'IT Department',      division:'Technology', section:'Development',    schedule: buildSchedule(['O','O','O','WFH','O']) },
  { id:'e2', name:'Louis Panganiban', dept:'IT Department',      division:'Technology', section:'Development',    schedule: buildSchedule(['O','O','WFH','O','O']) },
  { id:'e3', name:'Jane Smith',       dept:'IT Department',      division:'Technology', section:'Infrastructure', schedule: buildSchedule(['O','O','O','O','O'])   },
  { id:'e4', name:'Mike Brown',       dept:'Product Team',       division:'Technology', section:'Design',         schedule: buildSchedule(['O','O','WFH','WFH','O']) },
  { id:'e5', name:'Alice Guo',        dept:'Product Team',       division:'Technology', section:'Research',       schedule: buildSchedule(['O','WFH','WFH','O','O']) },
  { id:'e6', name:'Robert Chen',      dept:'HR Department',      division:'Operations', section:'Recruitment',    schedule: buildSchedule(['O','O','O','O','O'])   },
  { id:'e7', name:'Emily Davis',      dept:'HR Department',      division:'Operations', section:'Employee Relations', schedule: buildSchedule(['O','O','O','WFH','O']) },
  { id:'e8', name:'Maria Santos',     dept:'Finance Department', division:'Operations', section:'Payroll',        schedule: buildSchedule(['O','O','WFH','O','O']) },
  { id:'e9', name:'David Kim',        dept:'Finance Department', division:'Operations', section:'Accounting',     schedule: buildSchedule(['O','O','O','O','O'])   },
];

// ── Schedule Demo ──────────────────────────────────────────────────────────

function ScheduleDemo() {
  const [employees, setEmployees]     = useState<Employee[]>(MOCK);
  const [viewDate, setViewDate]       = useState(new Date(2026, 2, 1)); // Mar 2026
  const [selectedYear, setSelectedYear] = useState(2026);
  const [view, setView]               = useState<ScheduleView>('Month');
  const [startOffset, setStartOffset] = useState(0);
  const [search, setSearch]           = useState('');
  const [filterDiv, setFilterDiv]     = useState('');
  const [filterDept, setFilterDept]   = useState('');
  const [rangeStart, setRangeStart]   = useState<{empId:string; date:string}|null>(null);
  const [dropdown, setDropdown]       = useState<{empId:string; dates:string[]; x:number; y:number}|null>(null);
  const [copyOpen, setCopyOpen]       = useState(false);
  const [copyTargets, setCopyTargets] = useState<number[]>([]);

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // All dates for current month
  const dates = useMemo(() =>
    Array.from({ length: daysInMonth }, (_, i) => {
      const d = i + 1;
      return `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    }), [year, month, daysInMonth]);

  const visibleDates = useMemo(() => {
    if (view === 'Cutoff') return dates.slice(startOffset, startOffset === 0 ? 15 : dates.length);
    if (view === 'Week')   return dates.slice(startOffset, startOffset + 7);
    return dates;
  }, [dates, view, startOffset]);

  // Filters
  const divisions  = [...new Set(MOCK.map(e => e.division))].sort();
  const depts      = [...new Set(MOCK.filter(e => !filterDiv || e.division === filterDiv).map(e => e.dept))].sort();

  const filtered = useMemo(() => employees.filter(e => {
    if (filterDiv  && e.division !== filterDiv)  return false;
    if (filterDept && e.dept     !== filterDept) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [employees, filterDiv, filterDept, search]);

  const grouped = useMemo(() => {
    const g: Record<string, Employee[]> = {};
    filtered.forEach(e => { (g[e.dept] ??= []).push(e); });
    return g;
  }, [filtered]);

  // Click: cycle or range-select
  function handleCell(empId: string, dateStr: string, e: React.MouseEvent) {
    if (e.shiftKey && rangeStart?.empId === empId) {
      const a = dates.indexOf(rangeStart.date);
      const b = dates.indexOf(dateStr);
      const [lo, hi] = a <= b ? [a,b] : [b,a];
      setDropdown({ empId, dates: dates.slice(lo, hi+1), x: e.clientX, y: e.clientY });
      setRangeStart(null);
      return;
    }
    setRangeStart({ empId, date: dateStr });
    setEmployees(prev => prev.map(emp => {
      if (emp.id !== empId) return emp;
      const cur = emp.schedule[dateStr] ?? 'O';
      if (cur === 'H') return emp;
      const next = CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length]!;
      return { ...emp, schedule: { ...emp.schedule, [dateStr]: next } };
    }));
  }

  function applyRange(status: WorkStatus) {
    if (!dropdown) return;
    setEmployees(prev => prev.map(emp => {
      if (emp.id !== dropdown.empId) return emp;
      const s = { ...emp.schedule };
      dropdown.dates.forEach(d => { if (s[d] !== 'H') s[d] = status; });
      return { ...emp, schedule: s };
    }));
    setDropdown(null);
  }

  function handleCopyMonth() {
    if (!copyTargets.length) return;
    setEmployees(prev => prev.map(emp => {
      const pattern: Record<number, WorkStatus> = {};
      dates.forEach(d => {
        const dow = new Date(d+'T00:00:00').getDay();
        if (emp.schedule[d] && emp.schedule[d] !== 'H') pattern[dow] = emp.schedule[d]!;
      });
      const s = { ...emp.schedule };
      copyTargets.forEach(tm => {
        const tDays = new Date(year, tm+1, 0).getDate();
        for (let dd = 1; dd <= tDays; dd++) {
          const key = `${year}-${String(tm+1).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;
          const dow  = new Date(year, tm, dd).getDay();
          s[key] = HOLIDAYS[key] ? 'H' : (pattern[dow] ?? (dow === 0||dow === 6 ? 'R' : 'O'));
        }
      });
      return { ...emp, schedule: s };
    }));
    setCopyOpen(false);
    setCopyTargets([]);
  }

  const weekCount = Math.ceil(daysInMonth / 7);

  return (
    <div className="w-full space-y-5" onClick={() => dropdown && setDropdown(null)}>

      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-sky">System Settings</p>
          <p className="font-heading text-xl font-bold text-brand-navy">Employee Schedule</p>
          <p className="mt-0.5 text-xs font-medium text-slate-500">Manage employee work-status schedules across departments.</p>
        </div>
        <button
          type="button"
          onClick={() => setCopyOpen(true)}
          className="flex items-center gap-2 self-start rounded-xl bg-brand-navy px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
        >
          <Copy size={13} aria-hidden="true" /> Copy Month
        </button>
      </div>

      {/* ── Filters ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-1.5">
          <Filter size={13} className="text-slate-400" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Filters</span>
        </div>
        <label className="relative flex items-center">
          <span className="sr-only">Search employees</span>
          <Search size={12} className="absolute left-2.5 text-slate-400 pointer-events-none" aria-hidden="true" />
          <input type="search" placeholder="Search name…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-44 rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-7 pr-3 text-xs font-medium placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue" />
        </label>
        <select value={filterDiv} onChange={e => { setFilterDiv(e.target.value); setFilterDept(''); }}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 appearance-none">
          <option value="">All Divisions</option>
          {divisions.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 appearance-none">
          <option value="">All Departments</option>
          {depts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        {/* View selector */}
        <div className="ml-auto flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
          {(['Month','Week','Cutoff'] as ScheduleView[]).map(v => (
            <button key={v} type="button" onClick={() => { setView(v); setStartOffset(0); }}
              className={['rounded-lg px-3 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
                view === v ? 'bg-brand-navy text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'].join(' ')}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* ── Month / year nav ────────────────────────────────────────── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
        {/* Year */}
        <div className="flex items-center justify-center gap-4">
          <button type="button" onClick={() => { setSelectedYear(y => y-1); setViewDate(new Date(selectedYear-1, month, 1)); }}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 transition">
            <ChevronUp size={18} aria-hidden="true" />
          </button>
          <span className="w-20 text-center font-heading text-xl font-bold text-brand-navy">{selectedYear}</span>
          <button type="button" onClick={() => { setSelectedYear(y => y+1); setViewDate(new Date(selectedYear+1, month, 1)); }}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 transition">
            <ChevronDown size={18} aria-hidden="true" />
          </button>
        </div>
        {/* Month grid */}
        <div className="grid grid-cols-6 gap-1.5">
          {MONTH_NAMES.map((name, i) => {
            const active = month === i && year === selectedYear;
            return (
              <button key={i} type="button" onClick={() => { setViewDate(new Date(selectedYear, i, 1)); setStartOffset(0); }}
                className={['rounded-xl border py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
                  active ? 'bg-brand-navy border-brand-navy text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-sky/40 hover:bg-blue-50/40'].join(' ')}>
                {name}
              </button>
            );
          })}
        </div>
        {/* Week sub-nav */}
        {view === 'Week' && (
          <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            {Array.from({ length: weekCount }, (_, i) => {
              const offset = i * 7;
              const active = startOffset === offset;
              return (
                <button key={i} type="button" onClick={() => setStartOffset(offset)}
                  className={['rounded-xl border px-4 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
                    active ? 'bg-brand-navy border-brand-navy text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-sky/40 hover:bg-blue-50/40'].join(' ')}>
                  Week {i+1}
                </button>
              );
            })}
          </div>
        )}
        {/* Cutoff sub-nav */}
        {view === 'Cutoff' && (
          <div className="flex gap-2 border-t border-slate-100 pt-4">
            {[0, 15].map((offset, i) => {
              const active = startOffset === offset;
              return (
                <button key={offset} type="button" onClick={() => setStartOffset(offset)}
                  className={['flex h-12 w-20 flex-col items-center justify-center rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
                    active ? 'bg-brand-navy border-brand-navy text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-sky/40'].join(' ')}>
                  <span className="text-[9px] font-bold uppercase opacity-70">Cutoff</span>
                  <span className="font-heading text-base font-black">{i+1}</span>
                </button>
              );
            })}
          </div>
        )}
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Legend:</span>
          {(Object.entries(STATUS) as [WorkStatus, typeof STATUS[WorkStatus]][]).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className={`flex h-6 w-6 items-center justify-center rounded border-2 text-[9px] font-bold ${v.bg} ${v.border} ${v.text}`}>{k}</div>
              <span className="text-[11px] font-semibold text-slate-500">{v.label}</span>
            </div>
          ))}
          <span className="text-[10px] font-medium text-brand-sky ml-2">· Click to cycle · Shift+click for range</span>
        </div>
      </div>

      {/* ── Schedule tables ──────────────────────────────────────────── */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([dept, emps]) => (
          <div key={dept} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Dept header */}
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-3">
              <Building2 size={14} className="text-brand-sky" aria-hidden="true" />
              <h3 className="text-sm font-bold text-slate-900">{dept}</h3>
              <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-400">
                {emps.length} employees
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full" role="grid" aria-label={`${dept} schedule`}>
                <thead>
                  <tr className="border-b border-slate-100">
                    {/* Sticky employee column */}
                    <th scope="col" className="sticky left-0 z-10 min-w-[200px] border-r border-slate-100 bg-white px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Employee
                    </th>
                    {visibleDates.map((dateStr) => {
                      const d    = parseInt(dateStr.slice(8));
                      const dow  = new Date(dateStr+'T00:00:00').getDay();
                      const isWk = dow === 0 || dow === 6;
                      const isH  = !!HOLIDAYS[dateStr];
                      return (
                        <th key={dateStr} scope="col"
                          className={['px-1 py-3 text-center',
                            isWk ? 'bg-slate-50/60' : '',
                            isH  ? 'bg-amber-50/40' : '',
                            view === 'Month'  ? 'min-w-[40px]' :
                            view === 'Week'   ? 'min-w-[120px]' : 'min-w-[80px]',
                          ].join(' ')}>
                          <div className="flex flex-col items-center gap-0.5">
                            <span className={['font-heading font-black leading-none',
                              view === 'Month' ? 'text-xs' : 'text-lg',
                              isWk ? 'text-slate-400' : 'text-brand-navy',
                            ].join(' ')}>{d}</span>
                            <span className={['font-bold leading-none',
                              view === 'Month' ? 'text-[9px]' : 'text-xs',
                              isWk ? 'text-slate-400' : 'text-slate-500',
                            ].join(' ')}>
                              {view === 'Month' ? DOW_SHORT[dow] : DOW_FULL[dow]}
                            </span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {emps.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/40 transition-colors">
                      {/* Employee cell */}
                      <td className="sticky left-0 z-10 border-r border-slate-100 bg-white px-5 py-3 shadow-[2px_0_8px_-4px_rgba(0,0,0,0.06)]">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-blue/20 bg-brand-blue/8 text-[10px] font-bold text-brand-navy">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-slate-900">{emp.name}</p>
                            <p className="truncate text-[10px] font-medium text-slate-400">{emp.section}</p>
                          </div>
                        </div>
                      </td>
                      {/* Schedule cells */}
                      {visibleDates.map((dateStr) => {
                        const status = emp.schedule[dateStr] ?? 'O';
                        const cfg    = STATUS[status];
                        const dow    = new Date(dateStr+'T00:00:00').getDay();
                        const isWk   = dow === 0 || dow === 6;
                        const isH    = !!HOLIDAYS[dateStr];
                        return (
                          <td key={dateStr} className={`px-1 py-2 text-center ${isWk ? 'bg-slate-50/40' : ''}`}>
                            <button
                              type="button"
                              onClick={(e) => handleCell(emp.id, dateStr, e)}
                              title={`${emp.name} — ${dateStr}: ${cfg.label}${HOLIDAYS[dateStr] ? ` (${HOLIDAYS[dateStr]})` : ''}${status !== 'H' ? ' · Click to cycle, Shift+click range' : ''}`}
                              aria-label={`${emp.name} ${dateStr}: ${cfg.label}`}
                              className={[
                                'mx-auto flex items-center justify-center rounded-xl border-2 font-bold transition-all hover:scale-105 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
                                cfg.bg, cfg.border, cfg.text,
                                view === 'Month'  ? 'h-8 w-8 text-[10px]' :
                                view === 'Week'   ? 'h-10 w-24 text-xs' : 'h-9 w-14 text-[10px]',
                                status === 'H' ? 'cursor-default' : 'cursor-pointer',
                              ].join(' ')}
                            >
                              {view === 'Month' ? status : cfg.label}
                            </button>
                            {isH && status !== 'H' && (
                              <div className="mx-auto mt-1 flex h-5 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-[9px] font-bold text-amber-700"
                                style={{ width: view === 'Month' ? '2rem' : view === 'Week' ? '6rem' : '3.5rem' }}>
                                H
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <Users size={40} className="mb-4 text-slate-200" aria-hidden="true" />
            <p className="text-sm font-bold text-slate-700">No employees found</p>
            <p className="mt-1 text-xs font-medium text-slate-400">Adjust filters to see schedules.</p>
          </div>
        )}
      </div>

      {/* ── Range dropdown ───────────────────────────────────────────── */}
      {dropdown && (
        <div
          className="fixed z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
          style={{ left: dropdown.x, top: dropdown.y }}
          onClick={e => e.stopPropagation()}
          role="menu"
          aria-label="Apply status to range"
        >
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
            Apply to {dropdown.dates.length} day{dropdown.dates.length !== 1 ? 's' : ''}
          </div>
          {CYCLE.map(s => {
            const cfg = STATUS[s];
            return (
              <button key={s} role="menuitem" type="button" onClick={() => applyRange(s)}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-bold transition hover:bg-slate-50 ${cfg.text}`}>
                <div className={`flex h-6 w-6 items-center justify-center rounded border-2 text-[9px] font-bold ${cfg.bg} ${cfg.border}`}>{s}</div>
                {cfg.label}
              </button>
            );
          })}
          <button type="button" onClick={() => setDropdown(null)} role="menuitem"
            className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-xs font-bold text-slate-400 transition hover:bg-slate-50">
            <X size={12} aria-hidden="true" /> Cancel
          </button>
        </div>
      )}

      {/* ── Copy Month modal ─────────────────────────────────────────── */}
      {copyOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-brand-navy/40 backdrop-blur-sm"
          onClick={() => setCopyOpen(false)}>
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="border-b border-slate-100 px-6 py-4">
              <p className="font-heading text-base font-bold text-brand-navy">Copy Month Pattern</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">
                Copy {MONTH_NAMES[month]}'s schedule pattern to other months.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2 p-6">
              {MONTH_NAMES.map((name, i) => {
                const isCurrent  = i === month;
                const isSelected = copyTargets.includes(i);
                return (
                  <button key={i} type="button" disabled={isCurrent}
                    onClick={() => setCopyTargets(prev => prev.includes(i) ? prev.filter(m => m !== i) : [...prev, i])}
                    className={['rounded-xl border-2 py-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
                      isCurrent  ? 'border-brand-blue/20 bg-brand-blue/8 text-brand-navy cursor-default' :
                      isSelected ? 'bg-brand-navy border-brand-navy text-white' :
                                   'border-slate-200 bg-white text-slate-600 hover:border-brand-sky/40 hover:bg-blue-50/40',
                    ].join(' ')}>
                    {name}
                    {isCurrent && <div className="text-[8px] mt-0.5 opacity-70">Current</div>}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
              <button type="button" onClick={handleCopyMonth} disabled={!copyTargets.length}
                className="flex-1 rounded-xl bg-brand-navy py-2.5 text-sm font-bold text-white transition hover:bg-brand-blue disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
                Copy to {copyTargets.length} month{copyTargets.length !== 1 ? 's' : ''}
              </button>
              <button type="button" onClick={() => setCopyOpen(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-500 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Code snippet ───────────────────────────────────────────────────────────

const CODE = `// Employee Schedule Settings — department-grouped matrix
// Click to cycle: O (Office) → WFH → R (Rest)
// Shift+click to range-select, then bulk-apply status
// Status codes: 'O' | 'WFH' | 'H' (Holiday, locked) | 'R' (Rest)

type WorkStatus = 'O' | 'WFH' | 'H' | 'R';
const CYCLE: WorkStatus[] = ['O', 'WFH', 'R'];

// Cell click handler
function handleCell(empId: string, dateStr: string, e: React.MouseEvent) {
  if (e.shiftKey && rangeStart?.empId === empId) {
    // Range select — show bulk-apply dropdown
    const [lo, hi] = [dates.indexOf(rangeStart.date), dates.indexOf(dateStr)].sort((a,b)=>a-b);
    setDropdown({ empId, dates: dates.slice(lo, hi+1), x: e.clientX, y: e.clientY });
    return;
  }
  // Single click: cycle status
  setEmployees(prev => prev.map(emp => {
    if (emp.id !== empId) return emp;
    const cur  = emp.schedule[dateStr] ?? 'O';
    if (cur === 'H') return emp;  // holidays are locked
    const next = CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length];
    return { ...emp, schedule: { ...emp.schedule, [dateStr]: next } };
  }));
}

// Table structure — sticky employee column + date columns
<table role="grid" aria-label="{dept} schedule">
  <thead>
    <tr>
      <th scope="col" className="sticky left-0 z-10 min-w-[200px] border-r border-slate-100 bg-white">
        Employee
      </th>
      {visibleDates.map((dateStr) => (
        <th key={dateStr} scope="col" className="...">
          <span className="font-heading font-black text-brand-navy">{day}</span>
          <span className="text-[9px] text-slate-500">{dayOfWeek}</span>
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {employees.map((emp) => (
      <tr key={emp.id}>
        <td className="sticky left-0 z-10 bg-white border-r border-slate-100">
          {emp.name}
        </td>
        {visibleDates.map((dateStr) => {
          const status = emp.schedule[dateStr] ?? 'O';
          const cfg    = STATUS_CONFIG[status];
          return (
            <td key={dateStr}>
              <button
                onClick={(e) => handleCell(emp.id, dateStr, e)}
                aria-label={\`\${emp.name} \${dateStr}: \${cfg.label}\`}
                className={\`rounded-xl border-2 font-bold \${cfg.bg} \${cfg.border} \${cfg.text}\`}
              >
                {status}
              </button>
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
</table>`;

// ── Page ───────────────────────────────────────────────────────────────────

export default function EmployeeSchedulePage() {
  return (
    <GalleryLayout activeId="employee-schedule">
      <title>Employee Schedule — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Enterprise"
          name="Employee Schedule"
          description="A department-grouped schedule matrix for managing employee work-status across the month. Click cells to cycle Office → WFH → Rest. Shift+click for range selection. Supports Month, Week, and Cutoff views."
          status="complete"
          importName={false}
        />

        {/* ── Overview ──────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Fully interactive. Click any Office or WFH cell to cycle. Shift+click two cells on the same row for a range selection. Use Copy Month to propagate this month's pattern."
        >
          <ShowcasePreview standalone tone="light" center={false} minHeight="min-h-0">
            <ScheduleDemo />
          </ShowcasePreview>
        </GallerySection>

        {/* ── Implementation ────────────────────────────────────────── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="Core patterns — cell click handler, table structure, and sticky employee column."
        >
          <Showcase code={CODE} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-500">
              See the live demo above — this code excerpt shows the click handler and table structure.
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Accessibility ─────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {([
              ['Table structure', [
                'Each department section renders as a <table> with role="grid" and an aria-label identifying the department.',
                'Employee name column uses sticky left-0 positioning — ensure it remains focusable and readable by screen readers.',
                'Column headers use scope="col" for screen reader column association.',
              ]],
              ['Cell buttons', [
                'Every schedule cell is a <button> with aria-label="{name} {date}: {status}" — readable without the color.',
                'Holiday cells (H) have cursor-default and are skipped by the click handler — locked status is communicated by the title tooltip.',
                'Status is communicated via both text (O / WFH / R) and background color — color is not the sole indicator.',
              ]],
              ['Range selection', [
                'Shift+click range selection opens a dropdown menu with role="menu" and aria-label="Apply status to range".',
                'The dropdown is positioned via clientX/clientY — ensure it stays within the viewport on small screens.',
              ]],
              ['View modes', [
                'Month / Week / Cutoff switcher buttons use visible text labels — no icon-only controls.',
                'Active view state is communicated via background color change and is also readable from the button\'s visible text.',
              ]],
            ] as [string, string[]][]).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{heading}</h3>
                <ul className="space-y-1.5">
                  {items.map(item => (
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

        {/* ── Related ───────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
