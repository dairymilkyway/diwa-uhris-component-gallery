/**
 * BatchProcessingPage — Gallery (Enterprise)
 *
 * Four batch processing layout samples:
 *   1. Payslip Batch        — select employees → review payslip data → approve/flag
 *   2. 13th Month Batch     — select employees → verify monthly earnings → approve
 *   3. Tax Annualization    — select employees → verify YTD taxable income → finalize
 *   4. Timekeeping Summary  — select employees → review DTR logs → lock & certify
 *
 * All four share the same two-step pattern:
 *   Step 1 (Selection)  — employee list table with checkbox selection + Start CTA
 *   Step 2 (Processing) — sidebar queue + main workspace + bottom action bar
 *
 * Source reference: unified-hris/pages/BatchPayrollPage.tsx,
 *   YearEndBatch13thPage.tsx, YearEndBatchTaxPage.tsx, TimekeepingDetail.tsx
 *
 * Design: DIWA brand #00377B navy. No indigo.
 * Status: pending=slate, approved=emerald, flagged=amber, skipped=slate/30.
 */

import { useState } from 'react';
import {
  Search, Check, ChevronRight, Filter,
  ArrowLeft, ArrowRight,
  CheckCircle2, AlertTriangle, SkipForward,
  FileText, Calculator, CreditCard, Clock,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['payroll-ledger', 'table', 'toggle-table', 'template-samples']);

// ── Shared data ───────────────────────────────────────────────────────────────

const YEAR = new Date().getFullYear();

interface Employee {
  id: string;
  name: string;
  initials: string;
  role: string;
  dept: string;
  gross: number;
  net: number;
  hours: number;
  lates: number;
  ytd: number;
  taxPaid: number;
}

const EMPLOYEES: Employee[] = [
  { id: 'e1', name: 'Maria Santos',    initials: 'MS', role: 'Senior Accountant', dept: 'Finance',    gross: 26500,  net: 23200,  hours: 160, lates: 0,  ytd: 318000, taxPaid: 24300 },
  { id: 'e2', name: 'Jose Reyes',      initials: 'JR', role: 'Operations Lead',   dept: 'Operations', gross: 22000,  net: 19200,  hours: 158, lates: 2,  ytd: 264000, taxPaid: 18600 },
  { id: 'e3', name: 'Ana Villanueva',  initials: 'AV', role: 'HR Specialist II',  dept: 'HR',         gross: 20000,  net: 17400,  hours: 160, lates: 0,  ytd: 240000, taxPaid: 15800 },
  { id: 'e4', name: 'Carlo Mendoza',   initials: 'CM', role: 'Payroll Staff',     dept: 'Finance',    gross: 18000,  net: 15600,  hours: 155, lates: 5,  ytd: 216000, taxPaid: 12400 },
  { id: 'e5', name: 'Lena Cruz',       initials: 'LC', role: 'Instructor II',     dept: 'Academics',  gross: 24000,  net: 21100,  hours: 160, lates: 1,  ytd: 288000, taxPaid: 21200 },
  { id: 'e6', name: 'Ramon Dela Cruz', initials: 'RD', role: 'IT Developer',      dept: 'IT',         gross: 32000,  net: 28000,  hours: 160, lates: 0,  ytd: 384000, taxPaid: 35400 },
];

function fmtPeso(n: number) {
  return `₱${n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ── Shared UI primitives ──────────────────────────────────────────────────────

type BatchStatus = 'pending' | 'approved' | 'flagged' | 'skipped';

function statusDot(s: BatchStatus) {
  return (
    <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
      s === 'approved' ? 'bg-emerald-500' :
      s === 'flagged'  ? 'bg-amber-400'   :
      s === 'skipped'  ? 'bg-slate-300'   :
      'bg-slate-300'
    }`} />
  );
}

function BatchProgressBar({ total, approved, flagged }: { total: number; approved: number; flagged: number }) {
  const pct = Math.round(((approved + flagged) / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-[#00377B] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] font-black text-slate-500 whitespace-nowrap">
        {approved + flagged} / {total}
      </span>
    </div>
  );
}

/** Shared selection-step employee table */
function SelectionStep({
  batchLabel,
  batchIcon: BatchIcon,
  onStart,
}: {
  batchLabel: string;
  batchIcon: React.ElementType;
  onStart: (ids: Set<string>) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const filtered = EMPLOYEES.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase())
  );

  function toggle(id: string) {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  }

  function toggleAll() {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(e => e.id)));
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-2 bg-white border border-slate-200 shadow-sm">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter employees..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border-none focus:ring-2 focus:ring-[#00377B]/20 outline-none placeholder-slate-400"
          />
        </div>
        <button type="button" className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white text-[10px] font-black text-slate-500 uppercase tracking-wider hover:bg-slate-50 transition-all">
          <Filter size={12} /> Dept
        </button>
        <div className="flex items-center gap-2 ml-auto">
          {selected.size > 0 && (
            <span className="text-[10px] font-bold text-slate-500">{selected.size} selected</span>
          )}
          <button
            type="button"
            onClick={() => onStart(selected)}
            disabled={selected.size === 0}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#00377B] text-white text-[11px] font-black uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#034EA2] transition-all shadow-sm"
          >
            <BatchIcon size={14} />
            Start {batchLabel}
            {selected.size > 0 && (
              <span className="bg-white text-[#00377B] px-2 py-0.5 text-[10px] font-black">
                {selected.size}
              </span>
            )}
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border-2 border-[#00377B] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-[#00377B] bg-[#00377B]">
              <th className="px-4 py-3 w-12">
                <button
                  type="button"
                  onClick={toggleAll}
                  className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${
                    selected.size === filtered.length && filtered.length > 0
                      ? 'bg-white border-white'
                      : 'border-white/50 bg-transparent'
                  }`}
                  aria-label="Select all"
                >
                  {selected.size === filtered.length && filtered.length > 0 && (
                    <Check size={11} className="text-[#00377B]" />
                  )}
                </button>
              </th>
              {['Employee', 'Department', 'Gross Pay', 'Net Pay', 'Hours', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-[10px] font-black text-white/80 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(emp => {
              const on = selected.has(emp.id);
              return (
                <tr
                  key={emp.id}
                  onClick={() => toggle(emp.id)}
                  className={`cursor-pointer transition-colors ${on ? 'bg-[#EEF3FB]' : 'bg-white hover:bg-slate-50/60'}`}
                >
                  <td className="px-4 py-3.5">
                    <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${on ? 'bg-[#00377B] border-[#00377B]' : 'border-slate-300'}`}>
                      {on && <Check size={11} className="text-white" />}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#00377B] flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
                        {emp.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                        <p className="text-[10px] text-slate-400">{emp.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[11px] font-bold text-slate-700">{emp.dept}</td>
                  <td className="px-4 py-3.5 font-mono text-sm font-bold text-slate-900">{fmtPeso(emp.gross)}</td>
                  <td className="px-4 py-3.5 font-mono text-sm font-bold text-emerald-700">{fmtPeso(emp.net)}</td>
                  <td className="px-4 py-3.5 text-sm font-bold text-slate-700">{emp.hours}h</td>
                  <td className="px-4 py-3.5">
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200">
                      Pending
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Table footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {filtered.length} employees in batch
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400">
              Total Gross: <span className="text-slate-700 font-mono">{fmtPeso(filtered.reduce((s, e) => s + e.gross, 0))}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── Shared processing-step shell ─────────────────────────────────────────────

interface ProcessingShellProps {
  ids: string[];
  activeIdx: number;
  statusMap: Record<string, BatchStatus>;
  batchLabel: string;
  period: string;
  onAction: (action: 'approve' | 'flag' | 'skip') => void;
  onBack: () => void;
  children: React.ReactNode; // workspace content for active employee
  actionLabels?: { approve?: string; flag?: string };
}

function ProcessingShell({
  ids, activeIdx, statusMap, batchLabel, period,
  onAction, onBack, children, actionLabels = {},
}: ProcessingShellProps) {
  const activeId  = ids[activeIdx]!;
  const activeEmp = EMPLOYEES.find(e => e.id === activeId)!;
  const approved  = Object.values(statusMap).filter(s => s === 'approved').length;
  const flagged   = Object.values(statusMap).filter(s => s === 'flagged').length;
  const isLast    = activeIdx === ids.length - 1;

  return (
    <div className="flex flex-col border-2 border-slate-200 overflow-hidden shadow-md" style={{ minHeight: 560 }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b-2 border-[#00377B] flex-shrink-0">
        <div className="flex items-center gap-4">
          <button type="button" onClick={onBack}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#00377B] transition-colors">
            <ArrowLeft size={14} /> Back
          </button>
          <div className="w-px h-5 bg-slate-200" />
          <div>
            <p className="text-sm font-black text-[#0C1A2E]">{batchLabel}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{period}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BatchProgressBar total={ids.length} approved={approved} flagged={flagged} />
          <button type="button" onClick={onBack}
            className="px-4 py-2 border border-rose-200 bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-wider hover:bg-rose-100 transition-all">
            Save Draft & Exit
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Queue sidebar */}
        <div className="w-52 border-r border-slate-200 bg-white flex flex-col flex-shrink-0 overflow-y-auto">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.18em]">Employee Queue</p>
          </div>
          {ids.map((id, i) => {
            const emp = EMPLOYEES.find(e => e.id === id)!;
            const status = statusMap[id] ?? 'pending';
            const isActive = i === activeIdx;
            return (
              <div
                key={id}
                className={`flex items-center gap-3 px-3 py-3 border-b border-slate-100 last:border-0 border-l-2 transition-all ${
                  isActive
                    ? 'bg-[#EEF3FB] border-l-[#00377B]'
                    : 'bg-white border-l-transparent'
                }`}
              >
                {statusDot(status)}
                <div className="min-w-0">
                  <p className={`text-[11px] font-bold truncate ${isActive ? 'text-[#00377B]' : 'text-slate-700'}`}>
                    {emp.name}
                  </p>
                  <p className={`text-[9px] uppercase tracking-wide truncate ${
                    status === 'approved' ? 'text-emerald-600' :
                    status === 'flagged'  ? 'text-amber-600'   :
                    'text-slate-400'
                  }`}>
                    {status === 'pending' && isActive ? 'In Review' : status}
                  </p>
                </div>
                {isActive && <ChevronRight size={12} className="text-[#00377B] ml-auto flex-shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Main workspace */}
        <div className="flex-1 overflow-y-auto bg-slate-50/40 p-5">
          {/* Employee header */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-white border border-slate-200 shadow-sm mb-4">
            <div className="w-12 h-12 bg-[#00377B] flex items-center justify-center text-white font-black flex-shrink-0">
              {activeEmp.initials}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-black text-slate-900">{activeEmp.name}</h2>
              <p className="text-[10px] font-mono text-slate-400">{activeEmp.id} · {activeEmp.dept} · {activeEmp.role}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Employee {activeIdx + 1} of {ids.length}</p>
              <p className="text-xs font-bold text-slate-700">{isLast ? 'Last in batch' : `${ids.length - activeIdx - 1} remaining`}</p>
            </div>
          </div>

          {/* Workspace content (slot) */}
          {children}
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="flex items-center justify-between px-5 py-4 bg-white border-t-2 border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />{approved} Approved</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" />{flagged} Flagged</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300" />{ids.length - approved - flagged} Remaining</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => onAction('skip')}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 bg-white text-slate-500 text-[10px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all">
            <SkipForward size={13} /> Skip
          </button>
          <button type="button" onClick={() => onAction('flag')}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-amber-200 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-wider hover:bg-amber-100 transition-all">
            <AlertTriangle size={13} /> {actionLabels.flag ?? 'Flag for Review'}
          </button>
          <button type="button" onClick={() => onAction('approve')}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#00377B] text-white text-[10px] font-black uppercase tracking-wider hover:bg-[#034EA2] transition-all shadow-sm">
            <CheckCircle2 size={14} /> {actionLabels.approve ?? 'Approve & Next'}
            <ArrowRight size={13} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}


// ── BATCH 1: Payslip ─────────────────────────────────────────────────────────

function PayslipWorkspace({ emp }: { emp: Employee }) {
  return (
    <div className="space-y-3">
      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Gross Pay',   value: fmtPeso(emp.gross),  color: 'text-slate-900'   },
          { label: 'Deductions',  value: fmtPeso(emp.gross - emp.net), color: 'text-rose-600' },
          { label: 'Net Pay',     value: fmtPeso(emp.net),    color: 'text-emerald-700' },
          { label: 'Hours Worked', value: `${emp.hours}h`,   color: 'text-[#034EA2]'  },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-slate-200 p-3">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`font-mono text-base font-black ${stat.color}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      {/* Earnings + deductions breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white border border-slate-200 overflow-hidden">
          <div className="px-4 py-2.5 bg-emerald-600 flex items-center gap-2">
            <span className="text-[9px] font-black text-white uppercase tracking-widest">Earnings</span>
          </div>
          {[
            ['Basic Pay', fmtPeso(emp.gross * 0.85)],
            ['Allowance', fmtPeso(emp.gross * 0.10)],
            ['Overtime',  fmtPeso(emp.gross * 0.05)],
          ].map(([label, val], i) => (
            <div key={label} className={`flex justify-between px-4 py-2.5 text-sm border-b border-slate-100 last:border-0 ${i % 2 ? 'bg-[#EEF3FB]/30' : 'bg-white'}`}>
              <span className="font-semibold text-slate-700">{label}</span>
              <span className="font-mono font-bold text-slate-900">{val}</span>
            </div>
          ))}
        </div>
        <div className="bg-white border border-slate-200 overflow-hidden">
          <div className="px-4 py-2.5 bg-rose-600 flex items-center gap-2">
            <span className="text-[9px] font-black text-white uppercase tracking-widest">Deductions</span>
          </div>
          {[
            ['SSS',          fmtPeso(1125)],
            ['PhilHealth',   fmtPeso(800)],
            ['Pag-IBIG',     fmtPeso(100)],
            ['Withholding Tax', fmtPeso(emp.gross - emp.net - 2025)],
          ].map(([label, val], i) => (
            <div key={label} className={`flex justify-between px-4 py-2.5 text-sm border-b border-slate-100 last:border-0 ${i % 2 ? 'bg-[#EEF3FB]/30' : 'bg-white'}`}>
              <span className="font-semibold text-slate-700">{label}</span>
              <span className="font-mono font-bold text-rose-700">−{val}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Lates warning */}
      {emp.lates > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 text-sm font-bold text-amber-800">
          <AlertTriangle size={14} className="text-amber-600 flex-shrink-0" />
          <span>{emp.lates} late instance{emp.lates > 1 ? 's' : ''} detected this period — verify deduction accuracy before approving.</span>
        </div>
      )}
    </div>
  );
}

function PayslipBatch() {
  type Step = 'selection' | 'processing';
  const [step, setStep] = useState<Step>('selection');
  const [ids,  setIds]  = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [statusMap, setStatusMap] = useState<Record<string, BatchStatus>>({});

  function start(sel: Set<string>) {
    const arr = Array.from(sel);
    setIds(arr);
    setActiveIdx(0);
    setStatusMap({});
    setStep('processing');
  }

  function handleAction(action: 'approve' | 'flag' | 'skip') {
    const id = ids[activeIdx]!;
    if (action !== 'skip') setStatusMap(m => ({ ...m, [id]: action === 'approve' ? 'approved' : 'flagged' }));
    if (activeIdx < ids.length - 1) setActiveIdx(i => i + 1);
    else setStep('selection');
  }

  if (step === 'selection') {
    return <SelectionStep batchLabel="Payslip Batch" batchIcon={CreditCard} onStart={start} />;
  }

  const emp = EMPLOYEES.find(e => e.id === ids[activeIdx]!)!;
  return (
    <ProcessingShell
      ids={ids} activeIdx={activeIdx} statusMap={statusMap}
      batchLabel="Payslip Batch Processing"
      period={`Aug 1–15, ${YEAR}`}
      onAction={handleAction}
      onBack={() => setStep('selection')}
      actionLabels={{ approve: 'Approve Payslip', flag: 'Flag for Review' }}
    >
      <PayslipWorkspace emp={emp} />
    </ProcessingShell>
  );
}

// ── BATCH 2: 13th Month ──────────────────────────────────────────────────────

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function ThirteenthWorkspace({ emp }: { emp: Employee }) {
  const monthlyBase  = emp.ytd / 12;
  const payout13th   = emp.ytd / 12;
  const nowMonth     = new Date().getMonth();

  return (
    <div className="space-y-3">
      {/* Payout header */}
      <div className="flex flex-wrap items-center gap-0 bg-white border border-slate-200 divide-x divide-slate-200">
        <div className="p-4 flex-1 min-w-[160px]">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">13th Month Payout</p>
          <p className="text-2xl font-black text-[#00377B] font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {fmtPeso(payout13th)}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">= Total Earned ÷ 12</p>
        </div>
        <div className="p-4">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">YTD Earned Basic</p>
          <p className="font-mono text-sm font-bold text-slate-900">{fmtPeso(emp.ytd)}</p>
        </div>
        <div className="p-4">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Avg</p>
          <p className="font-mono text-sm font-bold text-slate-900">{fmtPeso(monthlyBase)}</p>
        </div>
        <div className="p-4">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Credit Date</p>
          <p className="text-sm font-bold text-slate-900">Nov 30, {YEAR}</p>
        </div>
      </div>
      {/* Monthly breakdown mini-grid */}
      <div className="bg-white border border-slate-200 overflow-hidden">
        <div className="px-4 py-2.5 bg-[#00377B]">
          <span className="text-[9px] font-black text-white uppercase tracking-widest">Monthly Earned Basic</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 divide-x divide-y divide-slate-100">
          {MONTHS_SHORT.map((m, i) => {
            const done = i <= nowMonth;
            return (
              <div key={m} className={`p-3 ${done ? 'bg-white' : 'bg-amber-50/30'}`}>
                <p className={`text-[8px] font-black uppercase tracking-widest mb-1 ${done ? 'text-[#00377B]' : 'text-amber-500'}`}>{m}</p>
                <p className={`font-mono text-[10px] font-bold ${done ? 'text-slate-800' : 'text-amber-400/70'}`}>
                  {done ? fmtPeso(monthlyBase).replace('₱','') : '—'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
        <FileText size={11} className="flex-shrink-0" />
        PD 851 — 13th Month = Total Earned Basic ÷ 12. Tax-exempt up to ₱90,000 (RA 10653).
      </p>
    </div>
  );
}

function ThirteenthBatch() {
  type Step = 'selection' | 'processing';
  const [step, setStep] = useState<Step>('selection');
  const [ids,  setIds]  = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [statusMap, setStatusMap] = useState<Record<string, BatchStatus>>({});

  function start(sel: Set<string>) {
    setIds(Array.from(sel)); setActiveIdx(0); setStatusMap({}); setStep('processing');
  }
  function handleAction(action: 'approve' | 'flag' | 'skip') {
    const id = ids[activeIdx]!;
    if (action !== 'skip') setStatusMap(m => ({ ...m, [id]: action === 'approve' ? 'approved' : 'flagged' }));
    if (activeIdx < ids.length - 1) setActiveIdx(i => i + 1);
    else setStep('selection');
  }

  if (step === 'selection') return <SelectionStep batchLabel="13th Month Batch" batchIcon={Calculator} onStart={start} />;
  const emp = EMPLOYEES.find(e => e.id === ids[activeIdx]!)!;
  return (
    <ProcessingShell
      ids={ids} activeIdx={activeIdx} statusMap={statusMap}
      batchLabel="13th Month Ledger Review"
      period={`Assumed · Nov 30, ${YEAR}`}
      onAction={handleAction}
      onBack={() => setStep('selection')}
      actionLabels={{ approve: 'Confirm Payout', flag: 'Flag for Adjustment' }}
    >
      <ThirteenthWorkspace emp={emp} />
    </ProcessingShell>
  );
}

// ── BATCH 3: Tax Annualization ────────────────────────────────────────────────

function TaxWorkspace({ emp }: { emp: Employee }) {
  const annualTaxDue  = Math.max(0, (emp.ytd - 250000) * 0.20);
  const adjustment    = annualTaxDue - emp.taxPaid;
  const isRefund      = adjustment < 0;

  return (
    <div className="space-y-3">
      {/* Reconciliation header */}
      <div className="flex flex-wrap items-stretch gap-0 bg-white border border-slate-200 divide-x divide-slate-200">
        <div className="p-4 flex-1 min-w-[160px]">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Taxable Income</p>
          <p className="text-xl font-black text-slate-900 font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>{fmtPeso(emp.ytd)}</p>
        </div>
        <div className="p-4">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Annual Tax Due</p>
          <p className="font-mono text-sm font-bold text-rose-700">{fmtPeso(annualTaxDue)}</p>
        </div>
        <div className="p-4">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tax Withheld</p>
          <p className="font-mono text-sm font-bold text-slate-700">{fmtPeso(emp.taxPaid)}</p>
        </div>
        <div className={`p-4 ${isRefund ? 'bg-emerald-50' : 'bg-rose-50'}`}>
          <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${isRefund ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isRefund ? 'Tax Refund' : 'Tax Payable'}
          </p>
          <p className={`font-mono text-xl font-black ${isRefund ? 'text-emerald-700' : 'text-rose-700'}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
            {fmtPeso(Math.abs(adjustment))}
          </p>
        </div>
      </div>
      {/* Result banner */}
      <div className={`flex items-center gap-3 px-4 py-3 border text-sm font-bold ${
        isRefund ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
      }`}>
        {isRefund ? <CheckCircle2 size={16} className="text-emerald-600" /> : <AlertTriangle size={16} className="text-rose-600" />}
        <span>
          {isRefund
            ? `Employee is entitled to a ₱${Math.abs(adjustment).toLocaleString('en-PH', { minimumFractionDigits: 2 })} tax refund. Deduct from final payroll.`
            : `Additional ₱${adjustment.toLocaleString('en-PH', { minimumFractionDigits: 2 })} tax due. Collect via January payroll.`}
        </span>
      </div>
      {/* Tax breakdown grid */}
      <div className="bg-white border border-slate-200 overflow-hidden">
        <div className="px-4 py-2.5 bg-[#00377B]">
          <span className="text-[9px] font-black text-white uppercase tracking-widest">Reconciliation Summary</span>
        </div>
        {[
          ['Total Taxable Income (YTD)',   fmtPeso(emp.ytd),       'text-slate-900'],
          ['Annual Tax Due (BIR Table)',   fmtPeso(annualTaxDue),  'text-rose-700' ],
          ['Total Tax Withheld (YTD)',     fmtPeso(emp.taxPaid),   'text-slate-900'],
          [isRefund ? 'Refund to Employee' : 'Additional Payable', fmtPeso(Math.abs(adjustment)), isRefund ? 'text-emerald-700' : 'text-rose-700'],
        ].map(([label, value, color], i) => (
          <div key={label} className={`flex justify-between px-5 py-3 border-b border-slate-100 last:border-0 text-sm ${i % 2 ? 'bg-[#EEF3FB]/30' : 'bg-white'}`}>
            <span className="font-semibold text-slate-700">{label}</span>
            <span className={`font-mono font-bold ${color}`}>{value}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
        <FileText size={11} className="flex-shrink-0" />
        BIR 1604-C / Form 2316 · Revised Withholding Tax Table applies.
      </p>
    </div>
  );
}

function TaxAnnualizationBatch() {
  type Step = 'selection' | 'processing';
  const [step, setStep] = useState<Step>('selection');
  const [ids,  setIds]  = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [statusMap, setStatusMap] = useState<Record<string, BatchStatus>>({});

  function start(sel: Set<string>) {
    setIds(Array.from(sel)); setActiveIdx(0); setStatusMap({}); setStep('processing');
  }
  function handleAction(action: 'approve' | 'flag' | 'skip') {
    const id = ids[activeIdx]!;
    if (action !== 'skip') setStatusMap(m => ({ ...m, [id]: action === 'approve' ? 'approved' : 'flagged' }));
    if (activeIdx < ids.length - 1) setActiveIdx(i => i + 1);
    else setStep('selection');
  }

  if (step === 'selection') return <SelectionStep batchLabel="Tax Annualization" batchIcon={Calculator} onStart={start} />;
  const emp = EMPLOYEES.find(e => e.id === ids[activeIdx]!)!;
  return (
    <ProcessingShell
      ids={ids} activeIdx={activeIdx} statusMap={statusMap}
      batchLabel="Tax Annualization · Final Reconciliation"
      period={`Jan ${YEAR + 1} Payroll · BIR 1604-C`}
      onAction={handleAction}
      onBack={() => setStep('selection')}
      actionLabels={{ approve: 'Finalize & Next', flag: 'Flag for Correction' }}
    >
      <TaxWorkspace emp={emp} />
    </ProcessingShell>
  );
}

// ── BATCH 4: Timekeeping Summary ─────────────────────────────────────────────

const MOCK_DTR = [
  { date: 'Aug 1',  day: 'Fri', in: '07:55 AM', out: '05:01 PM', status: 'present',  hours: 8.0, ot: 0,   source: 'Biometric' },
  { date: 'Aug 4',  day: 'Mon', in: '08:02 AM', out: '05:10 PM', status: 'present',  hours: 8.0, ot: 0,   source: 'Biometric' },
  { date: 'Aug 5',  day: 'Tue', in: '07:45 AM', out: '07:45 PM', status: 'overtime', hours: 8.0, ot: 2.75, source: 'Biometric' },
  { date: 'Aug 6',  day: 'Wed', in: '09:12 AM', out: '05:12 PM', status: 'late',     hours: 8.0, ot: 0,   source: 'Biometric' },
  { date: 'Aug 7',  day: 'Thu', in: '08:00 AM', out: '05:00 PM', status: 'present',  hours: 8.0, ot: 0,   source: 'ODTR'      },
  { date: 'Aug 8',  day: 'Fri', in: '—',        out: '—',        status: 'absent',   hours: 0,   ot: 0,   source: '—'         },
  { date: 'Aug 11', day: 'Mon', in: '08:00 AM', out: '05:00 PM', status: 'present',  hours: 8.0, ot: 0,   source: 'Biometric' },
  { date: 'Aug 12', day: 'Tue', in: '—',        out: '—',        status: 'leave',    hours: 0,   ot: 0,   source: '—'         },
  { date: 'Aug 13', day: 'Wed', in: '07:55 AM', out: '05:05 PM', status: 'present',  hours: 8.0, ot: 0,   source: 'Biometric' },
  { date: 'Aug 14', day: 'Thu', in: '08:05 AM', out: '05:00 PM', status: 'present',  hours: 8.0, ot: 0,   source: 'Biometric' },
  { date: 'Aug 15', day: 'Fri', in: '08:00 AM', out: '05:00 PM', status: 'present',  hours: 8.0, ot: 0,   source: 'Biometric' },
];

const STATUS_STYLES: Record<string, string> = {
  present:  'text-emerald-700 bg-emerald-50 border-emerald-200',
  overtime: 'text-[#034EA2] bg-[#EEF3FB] border-[#C7D8F0]',
  late:     'text-amber-700 bg-amber-50 border-amber-200',
  absent:   'text-rose-700 bg-rose-50 border-rose-200',
  leave:    'text-violet-700 bg-violet-50 border-violet-200',
};

function TimekeepingWorkspace({ emp: _emp }: { emp: Employee }) {
  const totalHours = MOCK_DTR.reduce((s, d) => s + d.hours, 0);
  const totalOT    = MOCK_DTR.reduce((s, d) => s + d.ot, 0);
  const lateCount  = MOCK_DTR.filter(d => d.status === 'late').length;
  const absentCount = MOCK_DTR.filter(d => d.status === 'absent').length;

  return (
    <div className="space-y-3">
      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Hours',     value: `${totalHours}h`,   color: 'text-slate-900' },
          { label: 'Overtime Hours',  value: `${totalOT.toFixed(2)}h`, color: 'text-[#034EA2]' },
          { label: 'Late Instances',  value: lateCount.toString(), color: lateCount > 0 ? 'text-amber-700' : 'text-slate-900' },
          { label: 'Absences',        value: absentCount.toString(), color: absentCount > 0 ? 'text-rose-700' : 'text-slate-900' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-200 p-3">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
            <p className={`text-xl font-black font-mono ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* DTR table */}
      <div className="bg-white border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#00377B]">
          <span className="text-[9px] font-black text-white uppercase tracking-widest">DTR Log · Aug 1–15, {YEAR}</span>
          <span className="text-[9px] text-white/50 font-mono">Period 2</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: 520 }}>
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50">
                {['Date', 'Day', 'Time In', 'Time Out', 'Hours', 'OT', 'Status', 'Source'].map(h => (
                  <th key={h} className="px-3 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_DTR.map((row, i) => (
                <tr key={i} className={`text-sm ${i % 2 ? 'bg-[#EEF3FB]/20' : 'bg-white'}`}>
                  <td className="px-3 py-2 font-bold text-slate-800 whitespace-nowrap">{row.date}</td>
                  <td className="px-3 py-2 text-slate-500 font-mono text-[11px]">{row.day}</td>
                  <td className="px-3 py-2 font-mono text-[11px] text-slate-700">{row.in}</td>
                  <td className="px-3 py-2 font-mono text-[11px] text-slate-700">{row.out}</td>
                  <td className="px-3 py-2 font-mono text-[11px] font-bold text-slate-800">{row.hours > 0 ? `${row.hours}h` : '—'}</td>
                  <td className="px-3 py-2 font-mono text-[11px] text-[#034EA2] font-bold">{row.ot > 0 ? `+${row.ot}h` : '—'}</td>
                  <td className="px-3 py-2">
                    <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 border ${STATUS_STYLES[row.status] ?? 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-[10px] text-slate-400 font-mono">{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TimekeepingBatch() {
  type Step = 'selection' | 'processing';
  const [step, setStep] = useState<Step>('selection');
  const [ids,  setIds]  = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [statusMap, setStatusMap] = useState<Record<string, BatchStatus>>({});

  function start(sel: Set<string>) {
    setIds(Array.from(sel)); setActiveIdx(0); setStatusMap({}); setStep('processing');
  }
  function handleAction(action: 'approve' | 'flag' | 'skip') {
    const id = ids[activeIdx]!;
    if (action !== 'skip') setStatusMap(m => ({ ...m, [id]: action === 'approve' ? 'approved' : 'flagged' }));
    if (activeIdx < ids.length - 1) setActiveIdx(i => i + 1);
    else setStep('selection');
  }

  if (step === 'selection') return <SelectionStep batchLabel="Timekeeping Review" batchIcon={Clock} onStart={start} />;
  const emp = EMPLOYEES.find(e => e.id === ids[activeIdx]!)!;
  return (
    <ProcessingShell
      ids={ids} activeIdx={activeIdx} statusMap={statusMap}
      batchLabel="Timekeeping Summary Review"
      period={`Aug 1–15, ${YEAR} · Period 2`}
      onAction={handleAction}
      onBack={() => setStep('selection')}
      actionLabels={{ approve: 'Lock & Certify', flag: 'Flag for Correction' }}
    >
      <TimekeepingWorkspace emp={emp} />
    </ProcessingShell>
  );
}


// ── Code strings ──────────────────────────────────────────────────────────────

const CODE_PATTERN = `// Two-step batch layout — same shell for all four batch types
// Step 1: employee selection table with checkbox + Start CTA
// Step 2: sidebar queue + workspace + bottom action bar

function BatchPage() {
  const [step, setStep] = useState<'selection' | 'processing'>('selection');
  const [ids, setIds] = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [statusMap, setStatusMap] = useState<Record<string, BatchStatus>>({});

  if (step === 'selection') {
    return <SelectionStep onStart={(selected) => {
      setIds(Array.from(selected));
      setActiveIdx(0);
      setStatusMap({});
      setStep('processing');
    }} />;
  }

  return (
    <div className="flex flex-col border-2 border-slate-200 overflow-hidden" style={{ minHeight: 560 }}>
      {/* Top bar: batch name + period + progress + Exit */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b-2 border-[#00377B]">
        <h2 className="font-black text-[#0C1A2E]">Payslip Batch</h2>
        <div className="flex items-center gap-4">
          <BatchProgressBar total={ids.length} approved={approved} flagged={flagged} />
          <button onClick={() => setStep('selection')} className="px-4 py-2 border border-rose-200 bg-rose-50 text-rose-700 text-xs font-black uppercase">
            Save Draft & Exit
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: employee queue with status dots */}
        <aside className="w-52 border-r border-slate-200 overflow-y-auto">
          {ids.map((id, i) => (
            <div key={id} className={\`flex items-center gap-3 px-3 py-3 border-b border-slate-100 border-l-2
              \${i === activeIdx ? 'bg-[#EEF3FB] border-l-[#00377B]' : 'border-l-transparent'}\`}>
              <StatusDot status={statusMap[id] ?? 'pending'} />
              <span className="text-xs font-bold truncate">{getEmployee(id).name}</span>
            </div>
          ))}
        </aside>

        {/* Main workspace — swap content per batch type */}
        <main className="flex-1 overflow-y-auto bg-slate-50/40 p-5">
          <EmployeeHeader employee={getEmployee(ids[activeIdx])} idx={activeIdx} total={ids.length} />
          {/* PayslipWorkspace | ThirteenthWorkspace | TaxWorkspace | DTRWorkspace */}
          {renderWorkspace(getEmployee(ids[activeIdx]))}
        </main>
      </div>

      {/* Bottom action bar */}
      <footer className="flex items-center justify-between px-5 py-4 bg-white border-t-2 border-slate-200">
        <BatchSummary approved={approved} flagged={flagged} remaining={ids.length - approved - flagged} />
        <div className="flex gap-2">
          <button onClick={() => advance('skip')}    className="btn-outline text-xs">Skip</button>
          <button onClick={() => advance('flag')}    className="btn-amber  text-xs">Flag</button>
          <button onClick={() => advance('approve')} className="btn-navy   text-xs">Approve & Next →</button>
        </div>
      </footer>
    </div>
  );
}`;

const CODE_PAYSLIP = `// Payslip workspace — earnings + deductions breakdown
function PayslipWorkspace({ emp }: { emp: Employee }) {
  return (
    <div className="space-y-3">
      {/* Stat row */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Gross Pay" value={fmtPeso(emp.gross)} />
        <StatCard label="Deductions" value={fmtPeso(emp.gross - emp.net)} />
        <StatCard label="Net Pay" value={fmtPeso(emp.net)} color="text-emerald-700" />
        <StatCard label="Hours" value={emp.hours + 'h'} />
      </div>
      {/* Earnings + deductions split */}
      <div className="grid grid-cols-2 gap-3">
        <LedgerCard label="Earnings" tone="emerald" rows={earningRows} />
        <LedgerCard label="Deductions" tone="rose" rows={deductionRows} />
      </div>
      {/* Late warning — show only when emp.lates > 0 */}
      {emp.lates > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200">
          <AlertTriangle size={14} className="text-amber-600" />
          <span className="text-sm font-bold text-amber-800">
            {emp.lates} late instance{emp.lates > 1 ? 's' : ''} — verify deduction accuracy.
          </span>
        </div>
      )}
    </div>
  );
}`;

const CODE_13TH = `// 13th Month payout = Total Earned Basic ÷ 12 (PD 851)
// Tax-exempt up to ₱90,000/year (RA 10653)
const totalEarned = history.reduce(
  (s, m) => s + m.p1.earnedBasic + m.p2.earnedBasic, 0
);
const payout = totalEarned / 12;

// Monthly grid: past months show value, projected months show amber/dimmed
{MONTHS.map((m, mIdx) => {
  const done = mIdx <= new Date().getMonth();
  return (
    <div key={m} className={done ? 'bg-white' : 'bg-amber-50/30'}>
      <p className={done ? 'text-[#00377B]' : 'text-amber-500'}>{m}</p>
      <p className={done ? 'text-slate-800' : 'text-amber-400/70'}>
        {done ? fmtPeso(monthlyBase) : '—'}
      </p>
    </div>
  );
})}`;

const CODE_TAX = `// Tax annualization — BIR 1604-C / Form 2316
// Annual Tax Due uses the simplified graduated table (2018 TRAIN rates)
const annualTaxDue = Math.max(0, (ytdTaxable - 250000) * 0.20);
const adjustment   = annualTaxDue - totalTaxPaid;
// positive = employee owes → collect via January payroll
// negative = employee overpaid → refund via January payroll

const isRefund = adjustment < 0;`;

const CODE_DTR = `// DTR row statuses
type DTRStatus = 'present' | 'overtime' | 'late' | 'absent' | 'leave';

const STATUS_STYLES: Record<DTRStatus, string> = {
  present:  'text-emerald-700 bg-emerald-50 border-emerald-200',
  overtime: 'text-[#034EA2] bg-[#EEF3FB] border-[#C7D8F0]',
  late:     'text-amber-700 bg-amber-50 border-amber-200',
  absent:   'text-rose-700 bg-rose-50 border-rose-200',
  leave:    'text-violet-700 bg-violet-50 border-violet-200',
};

// Action: Lock & Certify = marks period as closed for payroll processing
function handleAction(action: 'approve' | 'flag' | 'skip') {
  // approve = "Lock & Certify"
  // flag    = "Flag for Correction"
  // skip    = move to next without recording
}`;


// ── Page ──────────────────────────────────────────────────────────────────────

export default function BatchProcessingPage() {
  return (
    <GalleryLayout activeId="batch-processing">
      <title>Batch Processing — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Enterprise"
          name="Batch Processing"
          description="Four batch processing flows — Payslip, 13th Month, Tax Annualization, Timekeeping. All four share the same two-step shell: Step 1 selects employees, Step 2 reviews one-by-one with Approve / Flag / Skip."
          status="complete"
          importName={false}
        />

        {/* ── 2. Overview ───────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Two steps, four batch types. Step 1 selects employees, Step 2 reviews each one. Try any batch below — the pattern is the same."
        >
          <Showcase
            title="Two-step batch pattern"
            description="Copy this JSX shell — same structure for all four batch types. Only the workspace content (payslip/13th/tax/DTR) changes."
            code={CODE_PATTERN}
            language="tsx"
            tone="white"
            center={false}
          >
            <div className="w-full space-y-3">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { step: '1', label: 'Selection',  desc: 'Filterable employee table. Checkboxes. Start CTA shows count.', color: 'bg-[#EEF3FB] border-[#C7D8F0] text-[#00377B]' },
                  { step: '2', label: 'Processing', desc: 'Sidebar queue + workspace + Approve / Flag / Skip action bar.', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                ].map(item => (
                  <div key={item.step} className={`flex items-start gap-3 px-4 py-4 border ${item.color}`}>
                    <div className="w-8 h-8 flex-shrink-0 bg-white border border-current flex items-center justify-center font-black text-sm">
                      {item.step}
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-xs font-medium opacity-80">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: CreditCard, label: 'Payslip Batch',       desc: '→ Section below' },
                  { icon: Calculator, label: '13th Month Batch',    desc: '→ Section below' },
                  { icon: Calculator, label: 'Tax Annualization',   desc: '→ Section below' },
                  { icon: Clock,      label: 'Timekeeping Review',  desc: '→ Section below' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-white border border-slate-200 p-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#EEF3FB] flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-[#00377B]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-800">{item.label}</p>
                        <p className="text-[9px] text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 3. Payslip Batch ──────────────────────────────────────────── */}
        <GallerySection
          id="payslip"
          title="Payslip Batch"
          description="Select employees, then review each one's earnings + deductions breakdown. Employees with late instances get a warning banner."
        >
          <Showcase
            title="Payslip Batch — select → review → approve"
            description="Select employees and click Start Payslip Batch. Approve, flag, or skip each employee."
            code={CODE_PAYSLIP}
            tone="white"
            center={false}
          >
            <div className="w-full"><PayslipBatch /></div>
          </Showcase>
        </GallerySection>

        {/* ── 4. 13th Month Batch ───────────────────────────────────────── */}
        <GallerySection
          id="thirteenth"
          title="13th Month Batch"
          description="Verify the 13th month payout per employee. Payout = YTD Earned ÷ 12. Past months show values, projected months are dimmed."
        >
          <Showcase
            title="13th Month Batch — verify earnings → confirm payout"
            description="Monthly grid shows past months (data) and projected months (dimmed). Confirm payout per employee."
            code={CODE_13TH}
            tone="white"
            center={false}
          >
            <div className="w-full"><ThirteenthBatch /></div>
          </Showcase>
        </GallerySection>

        {/* ── 5. Tax Annualization ──────────────────────────────────────── */}
        <GallerySection
          id="tax"
          title="Tax Annualization"
          description="Year-end tax reconciliation per employee. Rose = tax payable, emerald = tax refund. The bottom row shows the exact adjustment amount."
        >
          <Showcase
            title="Tax Annualization — verify YTD income → finalize adjustment"
            description="Reconciliation banner adapts: emerald for refund, rose for additional tax due."
            code={CODE_TAX}
            tone="white"
            center={false}
          >
            <div className="w-full"><TaxAnnualizationBatch /></div>
          </Showcase>
        </GallerySection>

        {/* ── 6. Timekeeping Summary ────────────────────────────────────── */}
        <GallerySection
          id="timekeeping"
          title="Timekeeping Summary"
          description="Review the full DTR log per employee — time in/out, hours, OT, lates, absences. Lock & Certify closes the period for payroll."
        >
          <Showcase
            title="Timekeeping Summary — review DTR → lock & certify"
            description="Full daily time record table with color-coded status badges. Summary stat bar above."
            code={CODE_DTR}
            tone="white"
            center={false}
          >
            <div className="w-full"><TimekeepingBatch /></div>
          </Showcase>
        </GallerySection>

        {/* ── 7. Related ────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
