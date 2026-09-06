/**
 * PayrollLedgerPage — Gallery (Enterprise)
 *
 * Three payroll layout samples based on unified-hris reference:
 *   1. Pay Profile — employee list + per-employee ledger (Year/Month/Cutoff views)
 *   2. 13th Month Ledger — full-year Jan–Dec × 2 cutoffs earnings grid
 *   3. Tax Annualization Ledger — YTD taxable income + reconciliation rows
 *
 * Design: DIWA brand navy #00377B, ruled accounting table aesthetic,
 * no rounded-full pill buttons, official document energy.
 * Status indicators: past=slate, present=brand-navy, projected=amber.
 */

import { useState } from 'react';
import {
  ChevronLeft, ChevronRight, Search,
  TrendingUp, Calendar, Zap, CheckCircle2,
  Building2, ArrowRight,
  Info, AlertTriangle,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { CopyCodeBlock } from '../components/CopyCodeBlock';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['template-samples', 'table', 'description-list', 'payroll-summary']);

// ── Shared helpers ────────────────────────────────────────────────────────────

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const YEAR = new Date().getFullYear();

function fmt(v: number): string {
  if (!v || v === 0) return '—';
  return v.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPeso(v: number): string {
  return `₱${v.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ── Shared table primitives ───────────────────────────────────────────────────

/** Brand-navy table header bar */
function TableHeaderBar({ title, subtitle, refId }: { title: string; subtitle: string; refId: string }) {
  return (
    <div className="flex items-end justify-between px-6 py-5 border-b-4 border-[#00377B] bg-white">
      <div>
        <h3 className="text-xl font-black uppercase tracking-tight text-[#0C1A2E]">{title}</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
          {subtitle} &nbsp;·&nbsp; Ref: <span className="font-mono text-slate-500">{refId}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 border border-[#00377B]/20 bg-[#EEF3FB]">
        <span className="text-[9px] font-black text-[#00377B] uppercase tracking-[0.16em]">{YEAR} Fiscal Year</span>
      </div>
    </div>
  );
}

/** Period status dot */
function PeriodDot({ status }: { status: 'past' | 'present' | 'projected' }) {
  return (
    <span className={`inline-block w-1.5 h-1.5 rounded-full ${
      status === 'past' ? 'bg-slate-300' :
      status === 'present' ? 'bg-[#00377B]' :
      'bg-amber-400'
    }`} />
  );
}

/** Group header row for ledger tables */
function GroupRow({ label, colSpan }: { label: string; colSpan: number }) {
  return (
    <tr className="bg-slate-50 border-y border-slate-200">
      <td
        className="px-6 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-[0.18em] sticky left-0 bg-slate-50 z-10 border-r-2 border-slate-200"
        colSpan={1}
      >
        {label}
      </td>
      <td colSpan={colSpan - 1} className="bg-slate-50" />
    </tr>
  );
}



// ── SECTION 1: PAY PROFILE ───────────────────────────────────────────────────

const EMPLOYEES = [
  { id: 'DL-0001', name: 'Maria Santos',   dept: 'Finance',        role: 'Senior Accountant',  template: 'Senior Staff — Standard',   schedule: 'Semi-Monthly', status: 'Active',  basicSalary: 26500, initials: 'MS' },
  { id: 'DL-0042', name: 'Jose Reyes',     dept: 'Operations',     role: 'Operations Lead',    template: 'Staff Level 3 — Operations', schedule: 'Semi-Monthly', status: 'Active',  basicSalary: 22000, initials: 'JR' },
  { id: 'DL-0078', name: 'Ana Villanueva', dept: 'HR',             role: 'HR Specialist II',   template: 'Staff Level 2 — Standard',  schedule: 'Semi-Monthly', status: 'Active',  basicSalary: 20000, initials: 'AV' },
  { id: 'DL-0112', name: 'Carlo Mendoza',  dept: 'Finance',        role: 'Payroll Staff',      template: 'Staff Level 1 — Standard',  schedule: 'Semi-Monthly', status: 'Active',  basicSalary: 18000, initials: 'CM' },
  { id: 'DL-0033', name: 'Lena Cruz',      dept: 'Academics',      role: 'Instructor II',      template: 'Academic — Instructor',     schedule: 'Monthly',      status: 'On Leave', basicSalary: 24000, initials: 'LC' },
] as const;

type Employee = typeof EMPLOYEES[number];

// Ledger data: [basicPay, allowance, overtime, sss, philhealth, pagibig, tax] per cutoff
function getLedgerValues(emp: Employee, cutoffIdx: number) {
  const base = emp.basicSalary / 2;
  return {
    basicPay: base,
    allowance: emp.dept === 'Finance' ? 1750 : emp.dept === 'Academics' ? 2000 : 1000,
    overtime: cutoffIdx % 3 === 0 ? 800 : 0,
    sss: 562.5,
    philhealth: 400,
    pagibig: 100,
    tax: Math.max(0, (base - 3000) * 0.15),
  };
}

type LedgerViewType = 'year' | 'month' | 'cutoff';

function PayProfileLedger({ emp }: { emp: Employee }) {
  const [viewType, setViewType] = useState<LedgerViewType>('month');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedCutoff, setSelectedCutoff] = useState(0);

  const activeMonth = new Date().getMonth();

  // Build columns based on view type
  type Col = { label: string; monthIdx: number; cutoffIdx: number; status: 'past' | 'present' | 'projected' };
  const columns: Col[] = [];

  if (viewType === 'year') {
    for (let m = 0; m < 4; m++) {
      for (let c = 0; c < 2; c++) {
        const globalIdx = m * 2 + c;
        const activeIdx = activeMonth * 2;
        const status = globalIdx < activeIdx ? 'past' : globalIdx === activeIdx ? 'present' : 'projected';
        columns.push({ label: `${MONTHS[m]} P${c + 1}`, monthIdx: m, cutoffIdx: c, status });
      }
    }
  } else if (viewType === 'month') {
    for (let c = 0; c < 2; c++) {
      const status = selectedMonth < activeMonth ? 'past' :
                     selectedMonth === activeMonth && c === 0 ? 'present' : 'projected';
      columns.push({ label: `Period ${c + 1}`, monthIdx: selectedMonth, cutoffIdx: c, status });
    }
  } else {
    const status = selectedMonth < activeMonth ? 'past' :
                   selectedMonth === activeMonth && selectedCutoff === 0 ? 'present' : 'projected';
    columns.push({ label: `Period ${selectedCutoff + 1}`, monthIdx: selectedMonth, cutoffIdx: selectedCutoff, status });
  }

  const earningRows = [
    { label: 'Basic Pay', key: 'basicPay' as const },
    { label: 'Allowance', key: 'allowance' as const },
    { label: 'Overtime Pay', key: 'overtime' as const },
  ];
  const deductionRows = [
    { label: 'SSS (Employee)', key: 'sss' as const },
    { label: 'PhilHealth', key: 'philhealth' as const },
    { label: 'Pag-IBIG', key: 'pagibig' as const },
    { label: 'Withholding Tax', key: 'tax' as const },
  ];

  return (
    <div className="space-y-4">
      {/* View controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* View type tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded border border-slate-200">
          {([
            { id: 'year' as const,   label: 'Year',   icon: TrendingUp },
            { id: 'month' as const,  label: 'Month',  icon: Calendar   },
            { id: 'cutoff' as const, label: 'Cutoff', icon: Zap        },
          ] as const).map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setViewType(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewType === tab.id
                    ? 'bg-white text-[#00377B] shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon size={13} aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Month navigator */}
        {viewType !== 'year' && (
          <div className="flex items-center gap-2 p-1 bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedMonth(m => Math.max(0, m - 1))}
              disabled={selectedMonth === 0}
              aria-label="Previous month"
              className="p-1.5 text-slate-400 hover:text-[#00377B] disabled:opacity-30"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest min-w-[60px] text-center">
              {MONTHS[selectedMonth]} {YEAR}
            </span>
            <button
              type="button"
              onClick={() => setSelectedMonth(m => Math.min(11, m + 1))}
              disabled={selectedMonth === 11}
              aria-label="Next month"
              className="p-1.5 text-slate-400 hover:text-[#00377B] disabled:opacity-30"
            >
              <ChevronRight size={14} />
            </button>
            {viewType === 'cutoff' && (
              <div className="flex items-center gap-1 ml-2">
                {(['P1', 'P2'] as const).map((p, i) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setSelectedCutoff(i)}
                    className={`px-3 py-1.5 text-[10px] font-black transition-all ${
                      selectedCutoff === i
                        ? 'bg-white text-[#00377B] border border-[#00377B]/30 shadow-sm'
                        : 'text-slate-500 hover:bg-white/50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ledger table */}
      <div className="border-2 border-slate-300 overflow-hidden shadow-lg">
        <TableHeaderBar
          title={`${emp.name} · Pay Ledger`}
          subtitle={`${emp.role} · ${emp.dept} · ${emp.template}`}
          refId={emp.id}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" style={{ minWidth: 600 }}>
            <thead>
              <tr className="border-b-2 border-slate-900 bg-white">
                <th className="px-6 py-3 text-[10px] font-black text-slate-700 uppercase tracking-widest sticky left-0 bg-white z-20 border-r-2 border-slate-200 min-w-[190px]">
                  Account
                </th>
                {columns.map((col, i) => (
                  <th key={i} className={`px-3 py-3 text-[10px] font-black text-center uppercase tracking-widest min-w-[90px] border-r border-slate-100 ${
                    col.status === 'present' ? 'bg-[#EEF3FB] text-[#00377B]' :
                    col.status === 'projected' ? 'bg-amber-50 text-amber-700' :
                    'bg-white text-slate-400'
                  }`}>
                    <div className="flex flex-col items-center gap-1">
                      <PeriodDot status={col.status} />
                      {col.label}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-[10px] font-black text-right text-slate-700 uppercase tracking-widest bg-slate-50 sticky right-0 z-20 border-l border-slate-200 min-w-[110px]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <GroupRow label="Earnings" colSpan={columns.length + 2} />
              {earningRows.map(row => {
                const vals = columns.map(col => getLedgerValues(emp, col.cutoffIdx)[row.key]);
                const total = vals.reduce((a, b) => a + b, 0);
                return (
                  <tr key={row.key} className="hover:bg-slate-50 border-b border-slate-100 transition-colors">
                    <td className="px-6 py-3 sticky left-0 bg-white hover:bg-slate-50 z-10 border-r-2 border-slate-200 text-[11px] font-semibold text-slate-800">
                      {row.label}
                    </td>
                    {vals.map((v, i) => (
                      <td key={i} className={`px-3 py-3 text-right font-mono text-[11px] border-r border-slate-100 ${
                        columns[i]!.status === 'past' ? 'text-slate-400 bg-slate-50/50' :
                        columns[i]!.status === 'present' ? 'text-slate-900 font-bold bg-[#EEF3FB]/40' :
                        'text-amber-700/70 bg-amber-50/30'
                      }`}>
                        {fmt(v)}
                      </td>
                    ))}
                    <td className="px-6 py-3 text-right font-mono text-[11px] font-bold text-slate-900 bg-slate-50 sticky right-0 z-10 border-l border-slate-200">
                      {fmt(total)}
                    </td>
                  </tr>
                );
              })}
              <GroupRow label="Deductions" colSpan={columns.length + 2} />
              {deductionRows.map(row => {
                const vals = columns.map(col => getLedgerValues(emp, col.cutoffIdx)[row.key]);
                const total = vals.reduce((a, b) => a + b, 0);
                return (
                  <tr key={row.key} className="hover:bg-slate-50 border-b border-slate-100 transition-colors">
                    <td className="px-6 py-3 sticky left-0 bg-white hover:bg-slate-50 z-10 border-r-2 border-slate-200 text-[11px] font-semibold text-slate-800">
                      {row.label}
                    </td>
                    {vals.map((v, i) => (
                      <td key={i} className={`px-3 py-3 text-right font-mono text-[11px] border-r border-slate-100 ${
                        columns[i]!.status === 'past' ? 'text-rose-400/70 bg-slate-50/50' :
                        columns[i]!.status === 'present' ? 'text-rose-600 font-semibold bg-[#EEF3FB]/40' :
                        'text-rose-400/50 bg-amber-50/30'
                      }`}>
                        {v > 0 ? `−${fmt(v)}` : '—'}
                      </td>
                    ))}
                    <td className="px-6 py-3 text-right font-mono text-[11px] font-bold text-rose-700 bg-slate-50 sticky right-0 z-10 border-l border-slate-200">
                      {total > 0 ? `−${fmt(total)}` : '—'}
                    </td>
                  </tr>
                );
              })}
              {/* Grand total */}
              <tr className="border-t-4 border-[#00377B]">
                <td className="px-6 py-5 sticky left-0 bg-[#00377B] text-white z-10 border-r-2 border-[#034EA2]">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] leading-none mb-0.5">Net Pay</p>
                  <p className="text-[9px] font-bold text-white/50 uppercase tracking-wider">Computable Earnings</p>
                </td>
                {columns.map((col, i) => {
                  const vals = getLedgerValues(emp, col.cutoffIdx);
                  const net = vals.basicPay + vals.allowance + vals.overtime
                             - vals.sss - vals.philhealth - vals.pagibig - vals.tax;
                  return (
                    <td key={i} className="px-3 py-5 text-right font-mono text-[11px] font-black text-white bg-[#00377B] border-r border-[#034EA2]">
                      {fmt(net)}
                    </td>
                  );
                })}
                <td className="px-6 py-5 text-right sticky right-0 z-10 bg-[#00377B] border-l-2 border-emerald-500">
                  {(() => {
                    const net = columns.reduce((sum, col) => {
                      const v = getLedgerValues(emp, col.cutoffIdx);
                      return sum + v.basicPay + v.allowance + v.overtime - v.sss - v.philhealth - v.pagibig - v.tax;
                    }, 0);
                    return <span className="font-mono text-base font-black text-emerald-300">{fmtPeso(net)}</span>;
                  })()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PayProfileSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = EMPLOYEES.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.id.includes(search)
  );
  const selected = EMPLOYEES.find(e => e.id === selectedId);

  if (selected) {
    return (
      <div className="space-y-4">
        {/* Back bar */}
        <div className="flex items-center gap-4 pb-3 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-[#00377B]/40 hover:text-[#00377B] transition-all"
          >
            <ChevronLeft size={14} /> Back to List
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#00377B] flex items-center justify-center text-white text-[11px] font-black">
              {selected.initials}
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">{selected.name}</p>
              <p className="text-[10px] font-mono text-slate-400">{selected.id} · {selected.dept}</p>
            </div>
          </div>
        </div>
        <PayProfileLedger emp={selected} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 p-2 bg-white border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name or ID..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border-none focus:ring-2 focus:ring-[#00377B]/20 outline-none placeholder-slate-400"
          />
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-auto">
          {filtered.length} profile{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <div className="border-2 border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-[#00377B] bg-white">
              {['Employee', 'Pay Template', 'Schedule', 'Monthly Basic', 'Status', ''].map(h => (
                <th key={h} className="px-5 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(emp => (
              <tr
                key={emp.id}
                className="hover:bg-[#EEF3FB]/40 transition-colors cursor-pointer group"
                onClick={() => setSelectedId(emp.id)}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#00377B] flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
                      {emp.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-[#00377B] transition-colors">{emp.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{emp.id} · {emp.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p className="text-[11px] font-bold text-slate-700">{emp.template}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">{emp.dept}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="text-[11px] font-bold text-slate-700">{emp.schedule}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="font-mono text-[12px] font-bold text-slate-900" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {fmtPeso(emp.basicSalary)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    emp.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-[#00377B] transition-colors ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {filtered.length} active pay profiles
          </span>
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><PeriodDot status="present" /> Current</span>
            <span className="flex items-center gap-1.5"><PeriodDot status="projected" /> Projected</span>
            <span className="flex items-center gap-1.5"><PeriodDot status="past" /> Past</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── SECTION 2: 13TH MONTH LEDGER ────────────────────────────────────────────

const THIRTEENTH_EMPLOYEES = [
  { id: 'DL-0001', name: 'Maria Santos',   initials: 'MS', dept: 'Finance',    role: 'Senior Accountant', ytd: 318000 },
  { id: 'DL-0042', name: 'Jose Reyes',     initials: 'JR', dept: 'Operations', role: 'Operations Lead',   ytd: 264000 },
  { id: 'DL-0078', name: 'Ana Villanueva', initials: 'AV', dept: 'HR',         role: 'HR Specialist II',  ytd: 240000 },
] as const;

type ThirteenthEmp = typeof THIRTEENTH_EMPLOYEES[number];

function build13thHistory(emp: ThirteenthEmp) {
  const monthlyBase = emp.ytd / 12;
  return MONTHS.map((_, mIdx) => {
    const isDone = mIdx <= new Date().getMonth();
    return {
      p1: {
        basicPay: isDone ? monthlyBase / 2 : 0,
        holidayPay: isDone && mIdx % 3 === 0 ? 800 : 0,
        overtime: isDone && mIdx % 4 === 1 ? 600 : 0,
        attendance: isDone ? 500 : 0,
        earnedBasic: isDone ? monthlyBase / 2 : 0,
      },
      p2: {
        basicPay: isDone ? monthlyBase / 2 : 0,
        holidayPay: 0,
        overtime: isDone && mIdx % 4 === 2 ? 700 : 0,
        attendance: isDone ? 500 : 0,
        earnedBasic: isDone ? monthlyBase / 2 : 0,
      },
    };
  });
}

const thirteenthRows = [
  { label: 'Basic Salary',       key: 'basicPay' as const   },
  { label: 'Holiday Pay',        key: 'holidayPay' as const },
  { label: 'Overtime Pay',       key: 'overtime' as const   },
  { label: 'Attendance Bonus',   key: 'attendance' as const },
];

function ThirteenthMonthLedger() {
  const [activeId, setActiveId] = useState<string>(THIRTEENTH_EMPLOYEES[0]!.id);
  const emp = THIRTEENTH_EMPLOYEES.find(e => e.id === activeId)!;
  const history = build13thHistory(emp);
  const totalEarned = history.reduce((s, m) => s + m.p1.earnedBasic + m.p2.earnedBasic, 0);
  const payout = totalEarned / 12;

  return (
    <div className="flex gap-4">
      {/* Employee queue sidebar */}
      <div className="w-52 shrink-0 border-r border-slate-200 space-y-1 pr-4">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.18em] mb-3 px-1">Employee Queue</p>
        {THIRTEENTH_EMPLOYEES.map(e => {
          const isActive = e.id === activeId;
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => setActiveId(e.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-all border-l-2 ${
                isActive
                  ? 'bg-[#00377B] text-white border-[#2D8ACA]'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-transparent'
              }`}
            >
              <div className={`w-8 h-8 flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
                isActive ? 'bg-white/20 text-white' : 'bg-[#EEF3FB] text-[#00377B]'
              }`}>
                {e.initials}
              </div>
              <div className="min-w-0">
                <p className={`text-[11px] font-bold truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>{e.name}</p>
                <p className={`text-[9px] uppercase tracking-wide truncate ${isActive ? 'text-white/60' : 'text-slate-400'}`}>{e.role}</p>
              </div>
              {isActive && <ChevronRight size={14} className="text-white/40 ml-auto flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Header card */}
        <div className="flex flex-wrap items-stretch gap-0 border-2 border-slate-200 divide-x divide-slate-200 bg-white">
          <div className="flex items-center gap-4 p-5 flex-1 min-w-[240px]">
            <div className="w-14 h-14 bg-[#00377B] flex items-center justify-center text-white font-black text-lg flex-shrink-0">
              {emp.initials}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">{emp.name}</h2>
              <p className="text-[10px] font-mono text-slate-400">{emp.id} · {emp.dept}</p>
              <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <Building2 size={10} /> Regular Full-time
              </p>
            </div>
          </div>
          <div className="p-5 bg-[#EEF3FB] min-w-[200px] flex flex-col justify-center gap-1">
            <p className="text-[9px] font-black text-[#00377B] uppercase tracking-[0.18em]">Verified 13th Month Payout</p>
            <p className="text-2xl font-black text-[#00377B] tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {fmtPeso(payout)}
            </p>
            <p className="text-[9px] text-[#034EA2] font-bold">
              <Calendar size={9} className="inline mr-1" />Nov 30, {YEAR} · Semi-Monthly
            </p>
          </div>
          <div className="p-5 flex items-center min-w-[160px]">
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Earned Basic</p>
              <p className="font-mono text-sm font-black text-slate-900" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {fmtPeso(totalEarned)}
              </p>
              <p className="text-[9px] text-slate-400 mt-1">÷ 12 = {fmtPeso(payout)}</p>
            </div>
          </div>
        </div>

        {/* Ledger table */}
        <div className="border-2 border-slate-300 overflow-hidden shadow-lg">
          <TableHeaderBar
            title="13th Month Earnings Ledger"
            subtitle="PD 851 Compliant · Cumulative basic salary basis"
            refId={`13TH-${YEAR}-${emp.id}`}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth: 1400 }}>
              <thead>
                <tr className="border-b-2 border-slate-900 bg-white">
                  <th className="px-5 py-3 text-[10px] font-black text-slate-700 uppercase tracking-widest sticky left-0 bg-white z-20 border-r-2 border-slate-200 min-w-[180px]">
                    Description
                  </th>
                  {MONTHS.map((m, mIdx) => {
                    const isPast = mIdx < new Date().getMonth();
                    const isNow = mIdx === new Date().getMonth();
                    return (
                      <th key={m} colSpan={2} className={`px-1 py-2 text-[10px] font-black text-center uppercase tracking-widest ${
                        isNow ? 'bg-[#EEF3FB] text-[#00377B]' : isPast ? 'bg-white text-slate-400' : 'bg-amber-50/60 text-amber-700'
                      }`}>
                        {m}
                      </th>
                    );
                  })}
                  <th className="px-5 py-3 text-[10px] font-black text-right text-slate-700 uppercase tracking-widest bg-slate-50 sticky right-0 z-20 border-l border-slate-200 min-w-[110px]">
                    Total
                  </th>
                </tr>
                <tr className="border-b-[3px] border-dashed border-slate-900 bg-white">
                  {MONTHS.map(m => (
                    <th key={`${m}-sub`} colSpan={2} className="px-1">
                      <div className="grid grid-cols-2">
                        <span className="text-[8px] font-black text-slate-400 text-center py-1.5 border-r border-slate-100">1st</span>
                        <span className="text-[8px] font-black text-slate-400 text-center py-1.5 border-r-2 border-slate-200">2nd</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <GroupRow label="Earnings" colSpan={MONTHS.length * 2 + 2} />
                {thirteenthRows.map(row => {
                  let rowTotal = 0;
                  history.forEach(m => { rowTotal += (m.p1[row.key] || 0) + (m.p2[row.key] || 0); });
                  return (
                    <tr key={row.key} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3 sticky left-0 bg-white hover:bg-slate-50/50 z-10 border-r-2 border-slate-200 text-[11px] font-semibold text-slate-800">
                        {row.label}
                      </td>
                      {history.map((m, mIdx) => {
                        const isNow = mIdx === new Date().getMonth();
                        const isPast = mIdx < new Date().getMonth();
                        const cellClass = isNow ? 'bg-[#EEF3FB]/50' : isPast ? 'bg-white' : 'bg-amber-50/20';
                        const valClass = isPast ? 'text-slate-500' : isNow ? 'text-slate-900 font-semibold' : 'text-amber-600/60';
                        return (
                          <th key={mIdx} colSpan={2} className="p-0">
                            <div className={`grid grid-cols-2 ${cellClass}`}>
                              <span className={`px-2 py-3 font-mono text-[10px] text-right border-r border-slate-100 ${valClass}`}>
                                {fmt(m.p1[row.key] || 0)}
                              </span>
                              <span className={`px-2 py-3 font-mono text-[10px] text-right border-r-2 border-slate-200 ${valClass}`}>
                                {fmt(m.p2[row.key] || 0)}
                              </span>
                            </div>
                          </th>
                        );
                      })}
                      <td className="px-5 py-3 text-right font-mono text-[11px] font-bold text-slate-900 bg-slate-50 sticky right-0 z-10 border-l border-slate-200">
                        {fmt(rowTotal)}
                      </td>
                    </tr>
                  );
                })}

                {/* Total earned basic */}
                <tr className="border-t-4 border-[#00377B]">
                  <td className="px-5 py-5 sticky left-0 bg-[#00377B] text-white z-10 border-r-2 border-[#034EA2]">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] leading-none mb-0.5">Grand Total</p>
                    <p className="text-[8px] font-bold text-white/50 uppercase">Net Computable Earnings</p>
                  </td>
                  {history.map((m, mIdx) => (
                    <th key={mIdx} colSpan={2} className="p-0">
                      <div className="grid grid-cols-2 bg-[#00377B]">
                        <span className="px-2 py-5 font-mono text-[10px] font-bold text-white/80 text-right border-r border-[#034EA2]">
                          {fmt(m.p1.earnedBasic)}
                        </span>
                        <span className="px-2 py-5 font-mono text-[10px] font-bold text-white/80 text-right border-r-2 border-[#034EA2]">
                          {fmt(m.p2.earnedBasic)}
                        </span>
                      </div>
                    </th>
                  ))}
                  <td className="px-5 py-5 text-right font-mono text-sm font-black text-emerald-300 bg-[#00377B] sticky right-0 z-10 border-l-2 border-emerald-500">
                    {fmtPeso(totalEarned)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Computation note */}
          <div className="flex items-center gap-3 p-4 bg-slate-50 border-t border-slate-200">
            <Info size={14} className="text-slate-400 flex-shrink-0" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex-1">
              13th Month = Total Earned Basic ÷ 12. Excludes overtime and bonuses unless company policy states otherwise.
            </p>
            <div className="border border-slate-200 px-3 py-1.5 bg-white">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">PD 851 COMPLIANT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── SECTION 3: TAX ANNUALIZATION LEDGER ──────────────────────────────────────

const TAX_EMPLOYEES = [
  { id: 'DL-0001', name: 'Maria Santos',   initials: 'MS', dept: 'Finance',    role: 'Senior Accountant', ytd: 318000 },
  { id: 'DL-0042', name: 'Jose Reyes',     initials: 'JR', dept: 'Operations', role: 'Operations Lead',   ytd: 264000 },
  { id: 'DL-0078', name: 'Ana Villanueva', initials: 'AV', dept: 'HR',         role: 'HR Specialist II',  ytd: 240000 },
] as const;

type TaxEmp = typeof TAX_EMPLOYEES[number];

function buildTaxHistory(emp: TaxEmp) {
  const monthlyBase = emp.ytd / 12;
  return MONTHS.map((_, mIdx) => {
    const isDone = mIdx <= new Date().getMonth();
    const p1Basic = isDone ? monthlyBase / 2 : 0;
    const p2Basic = isDone ? monthlyBase / 2 : 0;
    const p1Bonus = isDone && mIdx % 4 === 1 ? 600 : 0;
    const p2Bonus = isDone && mIdx % 4 === 2 ? 700 : 0;
    const p1Sss = isDone ? 562.5 : 0;
    const p2Sss = isDone ? 562.5 : 0;
    const p1Ph = isDone ? 400 : 0;
    const p2Ph = isDone ? 400 : 0;
    const p1Pi = isDone ? 100 : 0;
    const p2Pi = isDone ? 100 : 0;
    const p1Taxable = p1Basic + p1Bonus - p1Sss - p1Ph - p1Pi;
    const p2Taxable = p2Basic + p2Bonus - p2Sss - p2Ph - p2Pi;
    const p1Tax = Math.max(0, p1Taxable * 0.15);
    const p2Tax = Math.max(0, p2Taxable * 0.15);
    return {
      p1: { basicPay: p1Basic, bonus: p1Bonus, sss: p1Sss, philhealth: p1Ph, pagibig: p1Pi, tax: p1Tax, taxable: p1Taxable },
      p2: { basicPay: p2Basic, bonus: p2Bonus, sss: p2Sss, philhealth: p2Ph, pagibig: p2Pi, tax: p2Tax, taxable: p2Taxable },
    };
  });
}

const taxIncomeRows = [
  { label: 'Basic Salary',         key: 'basicPay' as const, isDeduction: false },
  { label: 'Bonuses & Incentives', key: 'bonus' as const,    isDeduction: false },
];
const taxDeductionRows = [
  { label: 'SSS (Employee Share)', key: 'sss' as const,      isDeduction: true  },
  { label: 'PhilHealth',           key: 'philhealth' as const, isDeduction: true },
  { label: 'Pag-IBIG',            key: 'pagibig' as const,   isDeduction: true  },
  { label: 'Withholding Tax',      key: 'tax' as const,       isDeduction: true  },
];

function TaxAnnualizationLedger() {
  const [activeId, setActiveId] = useState<string>(TAX_EMPLOYEES[0]!.id);
  const emp = TAX_EMPLOYEES.find(e => e.id === activeId)!;
  const history = buildTaxHistory(emp);

  const totalTaxable = history.reduce((s, m) => s + m.p1.taxable + m.p2.taxable, 0);
  const annualTaxDue = Math.max(0, (totalTaxable - 250000) * 0.20);
  const totalTaxPaid = history.reduce((s, m) => s + m.p1.tax + m.p2.tax, 0);
  const adjustment = annualTaxDue - totalTaxPaid;
  const isRefund = adjustment < 0;

  return (
    <div className="flex gap-4">
      {/* Employee queue */}
      <div className="w-52 shrink-0 border-r border-slate-200 space-y-1 pr-4">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.18em] mb-3 px-1">Employee Queue</p>
        {TAX_EMPLOYEES.map(e => {
          const isActive = e.id === activeId;
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => setActiveId(e.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-all border-l-2 ${
                isActive
                  ? 'bg-[#00377B] text-white border-[#2D8ACA]'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-transparent'
              }`}
            >
              <div className={`w-8 h-8 flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
                isActive ? 'bg-white/20 text-white' : 'bg-[#EEF3FB] text-[#00377B]'
              }`}>
                {e.initials}
              </div>
              <div className="min-w-0">
                <p className={`text-[11px] font-bold truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>{e.name}</p>
                <p className={`text-[9px] uppercase tracking-wide truncate ${isActive ? 'text-white/60' : 'text-slate-400'}`}>{e.role}</p>
              </div>
              {isActive && <ChevronRight size={14} className="text-white/40 ml-auto flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Summary header */}
        <div className="flex flex-wrap items-stretch gap-0 border-2 border-slate-200 divide-x divide-slate-200 bg-white">
          <div className="flex items-center gap-4 p-5 flex-1 min-w-[240px]">
            <div className="w-14 h-14 bg-[#00377B] flex items-center justify-center text-white font-black text-lg flex-shrink-0">
              {emp.initials}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">{emp.name}</h2>
              <p className="text-[10px] font-mono text-slate-400">{emp.id} · {emp.dept}</p>
              <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <Building2 size={10} /> Regular Full-time
              </p>
            </div>
          </div>

          {/* Tax reconciliation snapshot */}
          <div className={`p-5 min-w-[190px] flex flex-col justify-center gap-1 ${isRefund ? 'bg-emerald-50' : 'bg-rose-50'}`}>
            <p className={`text-[9px] font-black uppercase tracking-[0.18em] ${isRefund ? 'text-emerald-700' : 'text-rose-700'}`}>
              {isRefund ? 'Tax Refund' : 'Tax Payable'}
            </p>
            <p className={`text-2xl font-black tracking-tight ${isRefund ? 'text-emerald-700' : 'text-rose-700'}`}
               style={{ fontVariantNumeric: 'tabular-nums' }}>
              {fmtPeso(Math.abs(adjustment))}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {isRefund
                ? <CheckCircle2 size={10} className="text-emerald-500" />
                : <AlertTriangle size={10} className="text-rose-500" />}
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                {isRefund ? 'Deduct from final payroll' : 'Collect via final payroll'}
              </p>
            </div>
          </div>

          <div className="p-5 flex flex-col justify-center gap-2 min-w-[240px]">
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Taxable Income</p>
              <p className="font-mono text-sm font-black text-slate-900" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {fmtPeso(totalTaxable)}
              </p>
            </div>
            <div className="w-full h-px bg-slate-100" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Annual Tax Due</p>
                <p className="font-mono text-[12px] font-bold text-rose-700" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {fmtPeso(annualTaxDue)}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Tax Withheld</p>
                <p className="font-mono text-[12px] font-bold text-slate-700" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {fmtPeso(totalTaxPaid)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ledger table */}
        <div className="border-2 border-slate-300 overflow-hidden shadow-lg">
          <TableHeaderBar
            title="Tax Annualization Ledger"
            subtitle="BIR 1604-C / 2316 Compliant · Final Reconciliation"
            refId={`TAX-${YEAR}-${emp.id}`}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth: 1400 }}>
              <thead>
                <tr className="border-b-2 border-slate-900 bg-white">
                  <th className="px-5 py-3 text-[10px] font-black text-slate-700 uppercase tracking-widest sticky left-0 bg-white z-20 border-r-2 border-slate-200 min-w-[200px]">
                    Description
                  </th>
                  {MONTHS.map((m, mIdx) => {
                    const isNow = mIdx === new Date().getMonth();
                    const isPast = mIdx < new Date().getMonth();
                    return (
                      <th key={m} colSpan={2} className={`px-1 py-2 text-[10px] font-black text-center uppercase tracking-widest ${
                        isNow ? 'bg-[#EEF3FB] text-[#00377B]' : isPast ? 'bg-white text-slate-400' : 'bg-amber-50/60 text-amber-700'
                      }`}>
                        {m}
                      </th>
                    );
                  })}
                  <th className="px-5 py-3 text-[10px] font-black text-right text-slate-700 uppercase tracking-widest bg-slate-50 sticky right-0 z-20 border-l border-slate-200 min-w-[110px]">
                    YTD Total
                  </th>
                </tr>
                <tr className="border-b-[3px] border-dashed border-slate-900 bg-white">
                  {MONTHS.map(m => (
                    <th key={`${m}-sub`} colSpan={2} className="px-1">
                      <div className="grid grid-cols-2">
                        <span className="text-[8px] font-black text-slate-400 text-center py-1.5 border-r border-slate-100">1st</span>
                        <span className="text-[8px] font-black text-slate-400 text-center py-1.5 border-r-2 border-slate-200">2nd</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Taxable Income rows */}
                <GroupRow label="Taxable Income" colSpan={MONTHS.length * 2 + 2} />
                {taxIncomeRows.map(row => {
                  let total = 0;
                  history.forEach(m => { total += m.p1[row.key] + m.p2[row.key]; });
                  return (
                    <tr key={row.key} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3 sticky left-0 bg-white z-10 border-r-2 border-slate-200 text-[11px] font-semibold text-slate-800">{row.label}</td>
                      {history.map((m, mIdx) => {
                        const isNow = mIdx === new Date().getMonth();
                        const isPast = mIdx < new Date().getMonth();
                        return (
                          <th key={mIdx} colSpan={2} className="p-0">
                            <div className={`grid grid-cols-2 ${isNow ? 'bg-[#EEF3FB]/50' : isPast ? '' : 'bg-amber-50/20'}`}>
                              <span className={`px-2 py-3 font-mono text-[10px] text-right border-r border-slate-100 ${isPast ? 'text-slate-500' : isNow ? 'text-slate-900 font-semibold' : 'text-amber-600/50'}`}>
                                {fmt(m.p1[row.key])}
                              </span>
                              <span className={`px-2 py-3 font-mono text-[10px] text-right border-r-2 border-slate-200 ${isPast ? 'text-slate-500' : isNow ? 'text-slate-900 font-semibold' : 'text-amber-600/50'}`}>
                                {fmt(m.p2[row.key])}
                              </span>
                            </div>
                          </th>
                        );
                      })}
                      <td className="px-5 py-3 text-right font-mono text-[11px] font-bold text-slate-900 bg-slate-50 sticky right-0 z-10 border-l border-slate-200">
                        {fmt(total)}
                      </td>
                    </tr>
                  );
                })}

                {/* Tax deduction rows */}
                <GroupRow label="Tax Payments & Deductions" colSpan={MONTHS.length * 2 + 2} />
                {taxDeductionRows.map(row => {
                  let total = 0;
                  history.forEach(m => { total += m.p1[row.key] + m.p2[row.key]; });
                  return (
                    <tr key={row.key} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3 sticky left-0 bg-white z-10 border-r-2 border-slate-200 text-[11px] font-semibold text-slate-800">{row.label}</td>
                      {history.map((m, mIdx) => {
                        const isNow = mIdx === new Date().getMonth();
                        const isPast = mIdx < new Date().getMonth();
                        const v1 = m.p1[row.key];
                        const v2 = m.p2[row.key];
                        return (
                          <th key={mIdx} colSpan={2} className="p-0">
                            <div className={`grid grid-cols-2 ${isNow ? 'bg-[#EEF3FB]/50' : isPast ? '' : 'bg-amber-50/20'}`}>
                              <span className={`px-2 py-3 font-mono text-[10px] text-right border-r border-slate-100 ${isPast ? 'text-rose-400/70' : isNow ? 'text-rose-600 font-semibold' : 'text-rose-300/60'}`}>
                                {v1 > 0 ? `−${fmt(v1)}` : '—'}
                              </span>
                              <span className={`px-2 py-3 font-mono text-[10px] text-right border-r-2 border-slate-200 ${isPast ? 'text-rose-400/70' : isNow ? 'text-rose-600 font-semibold' : 'text-rose-300/60'}`}>
                                {v2 > 0 ? `−${fmt(v2)}` : '—'}
                              </span>
                            </div>
                          </th>
                        );
                      })}
                      <td className="px-5 py-3 text-right font-mono text-[11px] font-bold text-rose-700 bg-slate-50 sticky right-0 z-10 border-l border-slate-200">
                        {total > 0 ? `−${fmt(total)}` : '—'}
                      </td>
                    </tr>
                  );
                })}

                {/* Total Taxable row */}
                <tr className="border-t-4 border-[#00377B]">
                  <td className="px-5 py-5 sticky left-0 bg-[#00377B] text-white z-10 border-r-2 border-[#034EA2]">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] leading-none mb-0.5">Total Taxable Income</p>
                    <p className="text-[8px] font-bold text-white/50 uppercase">YTD Performance</p>
                  </td>
                  {history.map((m, mIdx) => (
                    <th key={mIdx} colSpan={2} className="p-0">
                      <div className="grid grid-cols-2 bg-[#00377B]">
                        <span className="px-2 py-5 font-mono text-[10px] font-bold text-white/80 text-right border-r border-[#034EA2]">
                          {fmt(m.p1.taxable)}
                        </span>
                        <span className="px-2 py-5 font-mono text-[10px] font-bold text-white/80 text-right border-r-2 border-[#034EA2]">
                          {fmt(m.p2.taxable)}
                        </span>
                      </div>
                    </th>
                  ))}
                  <td className="px-5 py-5 text-right font-mono text-sm font-black text-emerald-300 bg-[#00377B] sticky right-0 z-10 border-l-2 border-emerald-500">
                    {fmtPeso(totalTaxable)}
                  </td>
                </tr>

                {/* Annual Tax Due row */}
                <tr>
                  <td className="px-5 py-4 sticky left-0 bg-rose-900 text-white z-10 border-r-2 border-rose-800">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em]">Annual Tax Due</p>
                  </td>
                  <td colSpan={MONTHS.length * 2} className="bg-rose-50/30" />
                  <td className="px-5 py-4 text-right font-mono text-sm font-black text-rose-700 bg-rose-100/60 sticky right-0 z-10 border-l-2 border-rose-500">
                    {fmtPeso(annualTaxDue)}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 sticky left-0 bg-slate-800 text-white z-10 border-r-2 border-slate-700">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em]">Total Tax Withheld</p>
                  </td>
                  <td colSpan={MONTHS.length * 2} className="bg-slate-50/30" />
                  <td className="px-5 py-4 text-right font-mono text-sm font-black text-slate-700 bg-slate-100/60 sticky right-0 z-10 border-l-2 border-slate-400">
                    {fmtPeso(totalTaxPaid)}
                  </td>
                </tr>
                <tr className={isRefund ? 'bg-emerald-50/40' : 'bg-rose-50/40'}>
                  <td className={`px-5 py-5 sticky left-0 z-10 border-r-2 text-white ${isRefund ? 'bg-emerald-700 border-emerald-600' : 'bg-[#B91C1C] border-rose-800'}`}>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] leading-none mb-0.5">
                      {isRefund ? 'Tax Refund to Employee' : 'Additional Tax Payable'}
                    </p>
                    <p className="text-[8px] font-bold text-white/50 uppercase">Final Annualization Result</p>
                  </td>
                  <td colSpan={MONTHS.length * 2} className={isRefund ? 'bg-emerald-50/30' : 'bg-rose-50/30'} />
                  <td className={`px-5 py-5 text-right font-mono text-base font-black sticky right-0 z-10 border-l-4 ${
                    isRefund ? 'text-emerald-700 bg-emerald-100 border-emerald-500' : 'text-rose-700 bg-rose-100 border-rose-500'
                  }`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {fmtPeso(Math.abs(adjustment))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* BIR compliance note */}
          <div className="flex items-center gap-3 p-4 bg-slate-50 border-t border-slate-200">
            <Info size={14} className="text-slate-400 flex-shrink-0" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex-1">
              Tax Annualization Rule: Year-end recalculation of tax due vs total tax withheld. Follows Revised BIR Withholding Tax Table.
            </p>
            <div className="border border-slate-200 px-3 py-1.5 bg-white">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">BIR 1604-C / 2316</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── Code strings ──────────────────────────────────────────────────────────────

const CODE = {
  payProfile: `// Pay Profile — employee list + click to open per-employee ledger
// Three views: Year (4 months × 2 cutoffs), Month (2 cutoffs), Cutoff (1 period)

function PayProfileSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = employees.find(e => e.id === selectedId);

  // Employee list
  if (!selected) return (
    <div className="border-2 border-slate-200 overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b-2 border-[#00377B] bg-white">
            {['Employee', 'Pay Template', 'Schedule', 'Monthly Basic', 'Status', ''].map(h => (
              <th key={h} className="px-5 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {employees.map(emp => (
            <tr key={emp.id} onClick={() => setSelectedId(emp.id)}
              className="hover:bg-[#EEF3FB]/40 cursor-pointer group">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#00377B] flex items-center justify-center text-white text-[10px] font-black">
                    {emp.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-[#00377B]">{emp.name}</p>
                    <p className="text-[10px] font-mono text-slate-400">{emp.id} · {emp.role}</p>
                  </div>
                </div>
              </td>
              {/* ... other cells */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Per-employee ledger — view switcher + accounting table
  return <PayProfileLedger emp={selected} onBack={() => setSelectedId(null)} />;
}`,

  thirteenthMonth: `// 13th Month Ledger — Jan–Dec × 2 cutoffs grid
// Sidebar: employee queue | Main: header card + full-year table

function ThirteenthMonthLedger() {
  const [activeId, setActiveId] = useState(employees[0].id);
  const emp = employees.find(e => e.id === activeId);
  const payout = emp.ytd / 12;   // PD 851: Total Earned Basic ÷ 12

  return (
    <div className="flex gap-4">
      {/* Employee sidebar */}
      <aside className="w-52 border-r border-slate-200">
        {employees.map(e => (
          <button key={e.id} onClick={() => setActiveId(e.id)}
            className={\`w-full flex items-center gap-3 px-3 py-3 border-l-2 transition
              \${e.id === activeId ? 'bg-[#00377B] text-white border-[#2D8ACA]' : 'bg-white border-transparent'}\`}>
            <div className="w-8 h-8 flex items-center justify-center text-[10px] font-black">
              {e.initials}
            </div>
            <span className="text-[11px] font-bold truncate">{e.name}</span>
          </button>
        ))}
      </aside>

      {/* Main: payout header + full Jan–Dec × P1/P2 table */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-4 border-2 border-slate-200 p-5">
          <p className="text-2xl font-black text-[#00377B]">{fmtPeso(payout)}</p>
          <p className="text-xs text-slate-400">= Total Earned Basic ({fmtPeso(emp.ytd)}) ÷ 12</p>
        </div>
        {/* 12-column × 2-cutoff accounting table */}
        <LedgerTable emp={emp} rows={thirteenthRows} />
      </div>
    </div>
  );
}`,

  taxAnnualization: `// Tax Annualization Ledger — YTD income vs tax withheld
// Result: positive = tax payable (rose), negative = tax refund (emerald)

function TaxAnnualizationLedger() {
  const [activeId, setActiveId] = useState(employees[0].id);
  const emp = employees.find(e => e.id === activeId);
  const history = buildTaxHistory(emp);

  const totalTaxable = history.reduce((s, m) => s + m.p1.taxable + m.p2.taxable, 0);
  const annualTaxDue = Math.max(0, (totalTaxable - 250000) * 0.20);  // BIR graduated
  const totalTaxPaid = history.reduce((s, m) => s + m.p1.tax + m.p2.tax, 0);
  const adjustment   = annualTaxDue - totalTaxPaid;
  const isRefund     = adjustment < 0;

  return (
    <div className="flex gap-4">
      {/* Employee sidebar — same pattern as 13th Month */}
      <EmployeeSidebar employees={employees} activeId={activeId} onSelect={setActiveId} />

      <div className="flex-1 space-y-4">
        {/* Summary header with refund/payable indicator */}
        <div className={\`flex items-center gap-4 p-5 border-2 \${isRefund ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'}\`}>
          <p className={\`text-2xl font-black \${isRefund ? 'text-emerald-700' : 'text-rose-700'}\`}>
            {fmtPeso(Math.abs(adjustment))}
          </p>
          <p className="text-xs font-bold text-slate-500">
            {isRefund ? 'Tax Refund — deduct from final payroll' : 'Tax Payable — collect via final payroll'}
          </p>
        </div>

        {/* Full Jan–Dec × P1/P2 reconciliation table */}
        <TaxLedgerTable emp={emp} history={history} />
      </div>
    </div>
  );
}`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PayrollLedgerPage() {
  return (
    <GalleryLayout activeId="payroll-ledger">
      <title>Payroll Ledger — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Enterprise"
          name="Payroll Ledger"
          description="Three payroll layouts — copy the JSX shell, swap your data. Pay Profile: list + ledger. 13th Month: Jan–Dec × 2 cutoffs. Tax Annualization: YTD income vs withheld. Backend queries shown separately."
          status="complete"
          importName={false}
        />

        {/* ── 2. Overview ───────────────────────────────────────────────── */}
        <GallerySection id="overview" title="Overview" description="Three layouts, each for a different payroll context.">
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {[
                { label: 'Pay Profile',          desc: 'Per-employee ledger — Year / Month / Cutoff views'           },
                { label: '13th Month Ledger',    desc: 'Full Jan–Dec × 2 cutoffs grid — PD 851 compliant'           },
                { label: 'Tax Annualization',    desc: 'YTD income vs tax withheld → payable or refund — BIR 1604-C'},
              ].map(item => (
                <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <p className="text-sm font-bold text-[#00377B] mb-1">{item.label}</p>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── 2. Pay Profile ────────────────────────────────────────────── */}
        <GallerySection
          id="pay-profile"
          title="Pay Profile"
          description="Click an employee row to open their ledger. Switch Year / Month / Cutoff views with the controls on top. Status dots: navy = current, amber = projected, slate = past."
        >
          <Showcase
            title="Pay Profile — employee list + ledger"
            description="Click any employee row to open their ledger. Switch between Year / Month / Cutoff views."
            code={CODE.payProfile}
            language="tsx"
            tone="white"
            center={false}
            minHeight="min-h-[300px]"
          >
            <div className="w-full">
              <PayProfileSection />
            </div>
          </Showcase>
          <CopyCodeBlock code={`// PayrollService — fetch ledger data for the UI
async getPayProfile(employeeId: string, year: number) {
  return this.prisma.payrollRun.findMany({
    where: { employeeId, year, status: 'processed' },
    include: { earnings: true, deductions: true },
    orderBy: [{ month: 'asc' }, { cutoff: 'asc' }],
  });
}`} language="typescript" title="Backend query (NestJS + Prisma)" />
        </GallerySection>

        {/* ── 3. 13th Month Ledger ──────────────────────────────────────── */}
        <GallerySection
          id="thirteenth-month"
          title="13th Month Ledger"
          description="Full-year grid of earnings. Click employees in the left sidebar to switch. Payout = Total Earned Basic ÷ 12. Past months show values, projected months are dimmed amber."
        >
          <Showcase
            title="13th Month Earnings Ledger"
            description="Sidebar employee queue. Copy the JSX grid, swap rows for your earning components."
            code={CODE.thirteenthMonth}
            language="tsx"
            tone="white"
            center={false}
            minHeight="min-h-[300px]"
          >
            <div className="w-full">
              <ThirteenthMonthLedger />
            </div>
          </Showcase>
          <CopyCodeBlock code={`// YearEndService — 13th month = Total Earned Basic ÷ 12 (PD 851)
async compute13thMonth(employeeId: string, year: number) {
  const runs = await this.prisma.payrollRun.findMany({
    where: { employeeId, year },
    include: { earnings: { where: { type: 'BASIC' } } },
  });
  const totalBasic = runs.reduce((s, r) => s + r.earnings.reduce((a, e) => a + e.amount, 0), 0);
  return { totalBasic, entitlement: totalBasic / 12, taxExemptUpTo: 90000 }; // RA 10653
}`} language="typescript" title="Backend query (NestJS + Prisma)" />
        </GallerySection>

        {/* ── 4. Tax Annualization ──────────────────────────────────────── */}
        <GallerySection
          id="tax-annualization"
          title="Tax Annualization Ledger"
          description="Year-end tax reconciliation. The bottom row tells you whether the employee overpaid (green refund) or underpaid (rose payable). Switch employees in the sidebar."
        >
          <Showcase
            title="Tax Annualization Ledger"
            description="Copy the JSX layout. The rose/emerald result row is computed from annualTaxDue − totalTaxPaid."
            code={CODE.taxAnnualization}
            language="tsx"
            tone="white"
            center={false}
            minHeight="min-h-[300px]"
          >
            <div className="w-full">
              <TaxAnnualizationLedger />
            </div>
          </Showcase>
          <CopyCodeBlock code={`// YearEndService — BIR 1604-C annualization
async computeTaxAnnualization(employeeId: string, year: number) {
  const runs = await this.prisma.payrollRun.findMany({
    where: { employeeId, year, status: 'processed' },
    include: { earnings: { where: { taxable: true } }, deductions: true, taxWithheld: true },
  });
  const ytdTaxable = runs.reduce((s, r) => {
    const gross = r.earnings.reduce((a, e) => a + e.amount, 0);
    const govDed = r.deductions.reduce((a, d) => a + d.amount, 0);
    return s + gross - govDed;
  }, 0);
  const annualTaxDue = computeGraduatedTax(ytdTaxable); // BIR table
  const taxPaid = runs.reduce((s, r) => s + (r.taxWithheld?.amount ?? 0), 0);
  return { ytdTaxable, annualTaxDue, taxPaid, adjustment: annualTaxDue - taxPaid };
}`} language="typescript" title="Backend query (NestJS + Prisma)" />
        </GallerySection>

        {/* ── 5. Related ────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
