/**
 * CompanyPolicyPage — Gallery (Enterprise)
 *
 * Four interactive samples distilled from unified-hris/PoliciesPage.tsx:
 *
 *   1. Government Compliance Reference  — read-only Labor Code cards
 *   2. Company Config + Compliance Badge — editable fields with live
 *      risk/compliant/generous evaluation against legal minimums
 *   3. Leave Policy Matrix             — sidebar selector + config panel
 *   4. Payroll Calculators             — Separation Pay + Retirement Pay
 *
 * Brand: #00377B navy, rose=Risk, emerald=Compliant, #2D8ACA=Generous.
 * Legal citation badges: monospace, slate-100 bg.
 */

import { useState } from 'react';
import {
  BookOpen, Clock, Briefcase, Heart, Baby, Stethoscope,
  Calculator, AlertTriangle, CheckCircle2, ShieldCheck,
  Info, Gavel, BookMarked, Calendar, Gift,
  ShieldAlert, TrendingUp,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['toggle-table', 'description-list', 'payroll-ledger', 'table']);

// ── LEGAL STANDARDS (Philippine Labor Code) ──────────────────────────────────

const LAW = {
  NORMAL_HOURS:          8,    // Art. 83
  MEAL_BREAK:            60,   // Art. 85 (minutes)
  NIGHT_DIFF_RATE:       10,   // Art. 86 (%)
  OT_REGULAR:            25,   // Art. 87 (%)
  OT_REST_DAY:           30,   // Art. 87 (%)
  SPECIAL_HOLIDAY:       30,   // Art. 93 (%)
  REGULAR_HOLIDAY:       100,  // Art. 94 (%)
  SIL_DAYS:              5,    // Art. 95
  PROBATIONARY_DAYS:     180,  // Art. 296
  MATERNITY_DAYS:        105,  // RA 11210
  PATERNITY_DAYS:        7,    // RA 8187
  SOLO_PARENT_DAYS:      7,    // RA 8972
  VAWC_DAYS:             10,   // RA 9262
  MAGNA_CARTA_DAYS:      60,   // RA 9710
  SEP_PAY_REDUNDANCY:    1.0,  // Art. 298 (× monthly salary per year)
  SEP_PAY_DISEASE:       0.5,  // Art. 299
  RETIREMENT_AGE_MIN:    60,   // Art. 302
  RETIREMENT_MULTIPLIER: 22.5, // Art. 302 (days)
  DEMINIMIS_RICE:        2000, // TRAIN Law (monthly)
  DEMINIMIS_CLOTHING:    6000, // TRAIN Law (annual)
  GRACE_PERIOD:          0,    // Art. 83 (no mandated grace period)
};

// ── Shared primitives ─────────────────────────────────────────────────────────

/** Legal citation badge — monospace, official-doc feel */
function CitationBadge({ text }: { text: string }) {
  return (
    <span className="font-mono text-[9px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 whitespace-nowrap">
      {text}
    </span>
  );
}

type ComplianceStatus = 'risk' | 'compliant' | 'generous' | 'neutral';

function getCompliance(
  value: number,
  standard: number,
  type: 'min' | 'max' | 'exact' = 'min'
): { status: ComplianceStatus; msg: string } {
  if (type === 'min') {
    if (value < standard)  return { status: 'risk',     msg: `Below Legal Min (${standard})` };
    if (value === standard) return { status: 'compliant', msg: 'Compliant' };
    return { status: 'generous', msg: 'Above Standard' };
  }
  if (type === 'max') {
    if (value > standard) return { status: 'risk', msg: `Exceeds Legal Max (${standard})` };
    return { status: 'compliant', msg: 'Compliant' };
  }
  if (value === standard) return { status: 'compliant', msg: 'Compliant' };
  if (value < standard)   return { status: 'risk',     msg: `Non-Compliant (Legal: ${standard})` };
  return { status: 'generous', msg: 'Above Standard' };
}

/** Inline compliance badge — sits below an editable field */
function ComplianceBadge({
  value,
  standard,
  type = 'min',
  citation,
}: {
  value: number;
  standard: number;
  type?: 'min' | 'max' | 'exact';
  citation: string;
}) {
  const { status, msg } = getCompliance(value, standard, type);
  if (status === 'neutral') return null;

  const cfg = {
    risk:      { bg: 'bg-rose-50 border-rose-200 text-rose-700',      icon: <AlertTriangle size={11} /> },
    compliant: { bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: <CheckCircle2 size={11} /> },
    generous:  { bg: 'bg-[#EEF3FB] border-[#C7D8F0] text-[#034EA2]',  icon: <ShieldCheck size={11} />  },
    neutral:   { bg: 'bg-slate-50 border-slate-200 text-slate-500',   icon: <Info size={11} />         },
  }[status];

  return (
    <div className={`flex items-center justify-between mt-1.5 px-2.5 py-1.5 border text-[10px] font-bold uppercase tracking-wider ${cfg.bg}`}>
      <div className="flex items-center gap-1.5">
        {cfg.icon}
        <span>{msg}</span>
      </div>
      <CitationBadge text={citation} />
    </div>
  );
}

/** Editable policy field with inline compliance evaluation */
function PolicyField({
  label,
  value,
  onChange,
  standard,
  type = 'min',
  citation,
  suffix = '',
  min = 0,
  max = 9999,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  standard: number;
  type?: 'min' | 'max' | 'exact';
  citation: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
        <CitationBadge text={citation} />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={e => onChange(Number(e.target.value))}
          className="w-24 border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#00377B] focus:ring-2 focus:ring-[#00377B]/20 outline-none text-right font-mono"
          style={{ borderRadius: 0 }}
        />
        {suffix && <span className="text-xs font-bold text-slate-500">{suffix}</span>}
      </div>
      <ComplianceBadge value={value} standard={standard} type={type} citation={citation} />
    </div>
  );
}


// ── SECTION 1: Government Compliance Reference ───────────────────────────────

interface LawEntry {
  label: string;
  value: string;
  citation: string;
}

interface LawBook {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  entries: LawEntry[];
}

const LAW_BOOKS: LawBook[] = [
  {
    id: 'book3',
    title: 'Book III',
    subtitle: 'Conditions of Employment',
    icon: Clock,
    entries: [
      { label: 'Normal Working Hours',        value: '8 hours / day',          citation: 'Art. 83'  },
      { label: 'Required Meal Break',          value: '60 minutes (unpaid)',    citation: 'Art. 85'  },
      { label: 'Night Differential Rate',      value: '10% of hourly rate',     citation: 'Art. 86'  },
      { label: 'Overtime — Regular Day',       value: '+25% of hourly rate',    citation: 'Art. 87'  },
      { label: 'Overtime — Rest Day',          value: '+30% of rest-day rate',  citation: 'Art. 87'  },
      { label: 'Special Non-Working Holiday',  value: '+30% (130% total)',      citation: 'Art. 93'  },
      { label: 'Regular Holiday',              value: '200% (double pay)',      citation: 'Art. 94'  },
      { label: 'Service Incentive Leave',      value: '5 days / year',          citation: 'Art. 95'  },
      { label: 'De Minimis — Rice Subsidy',    value: '₱2,000 / month',         citation: 'RR 11-2018' },
      { label: 'De Minimis — Clothing',        value: '₱6,000 / year',          citation: 'RR 11-2018' },
    ],
  },
  {
    id: 'book6',
    title: 'Book VI',
    subtitle: 'Post-Employment',
    icon: Briefcase,
    entries: [
      { label: 'Probationary Period',          value: 'Max 180 days (6 months)', citation: 'Art. 296' },
      { label: 'Separation Pay — Redundancy',  value: '1 month / year of service', citation: 'Art. 298' },
      { label: 'Separation Pay — Disease',     value: '½ month / year of service', citation: 'Art. 299' },
      { label: 'Retirement Age (Optional)',    value: '60 years old',            citation: 'Art. 302' },
      { label: 'Retirement Age (Compulsory)',  value: '65 years old',            citation: 'Art. 302' },
      { label: 'Retirement Pay Basis',         value: '22.5 days × daily rate',  citation: 'Art. 302' },
      { label: 'Retirement Pay Eligibility',   value: 'Min. 5 years service',    citation: 'RA 7641'  },
    ],
  },
  {
    id: 'special',
    title: 'Special Laws',
    subtitle: 'Statutory Leaves & Benefits',
    icon: Heart,
    entries: [
      { label: 'Expanded Maternity Leave',     value: '105 days (120 for CS)',   citation: 'RA 11210' },
      { label: 'Paternity Leave',              value: '7 days (first 4 deliveries)', citation: 'RA 8187' },
      { label: 'Solo Parent Leave',            value: '7 days / year',           citation: 'RA 8972'  },
      { label: 'VAWC Leave',                   value: '10 days / year',           citation: 'RA 9262'  },
      { label: 'Magna Carta (Surgery)',         value: '60 days paid',            citation: 'RA 9710'  },
      { label: '13th Month Pay Deadline',      value: 'On or before Dec 24',     citation: 'PD 851'   },
      { label: '13th Month Tax Exemption',     value: 'Up to ₱90,000 / year',    citation: 'RA 10653' },
    ],
  },
];

function GovernmentReference() {
  const [openBook, setOpenBook] = useState<string>('book3');

  return (
    <div className="flex gap-4">
      {/* Book tabs sidebar */}
      <div className="w-52 flex-shrink-0 space-y-1">
        {LAW_BOOKS.map(book => {
          const Icon = book.icon;
          const isActive = openBook === book.id;
          return (
            <button
              key={book.id}
              type="button"
              onClick={() => setOpenBook(book.id)}
              className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all border-l-2 ${
                isActive
                  ? 'bg-[#00377B] text-white border-[#2D8ACA]'
                  : 'bg-white text-slate-700 border-transparent hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Icon size={16} className={`mt-0.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <div>
                <p className={`text-xs font-black uppercase tracking-wider leading-none mb-0.5 ${isActive ? 'text-white' : 'text-slate-800'}`}>
                  {book.title}
                </p>
                <p className={`text-[10px] font-medium leading-tight ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                  {book.subtitle}
                </p>
              </div>
            </button>
          );
        })}
        {/* Read-only notice */}
        <div className="flex items-center gap-2 px-3 py-3 bg-amber-50 border border-amber-200 mt-3">
          <Gavel size={12} className="text-amber-600 flex-shrink-0" />
          <p className="text-[9px] font-bold text-amber-700 leading-tight uppercase tracking-wide">
            Read-only. Based on Philippine Labor Code.
          </p>
        </div>
      </div>

      {/* Reference entries */}
      <div className="flex-1 min-w-0">
        {LAW_BOOKS.filter(b => b.id === openBook).map(book => (
          <div key={book.id} className="border-2 border-[#00377B] overflow-hidden shadow-sm">
            {/* Book header */}
            <div className="px-6 py-4 bg-[#00377B] flex items-center gap-3">
              <book.icon size={18} className="text-white/80" />
              <div>
                <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.18em]">{book.title}</p>
                <p className="text-sm font-bold text-white">{book.subtitle}</p>
              </div>
            </div>
            {/* Entries */}
            {book.entries.map((entry, i) => (
              <div
                key={entry.label}
                className={`flex items-center justify-between px-6 py-3.5 border-b border-slate-100 last:border-0 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-[#EEF3FB]/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-[#00377B]/20 flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">{entry.label}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-mono text-sm font-bold text-[#00377B]">{entry.value}</span>
                  <CitationBadge text={entry.citation} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


// ── SECTION 2: Company Configuration + Compliance Badges ────────────────────

interface CompanyConfig {
  normalHours: number;
  mealBreak: number;
  nightDiffRate: number;
  otRegular: number;
  otRestDay: number;
  silDays: number;
  probationaryDays: number;
  maternityLeave: number;
  retirementAge: number;
  retirementMultiplier: number;
  riceSubsidy: number;
}

const DEFAULT_CONFIG: CompanyConfig = {
  normalHours: 8,
  mealBreak: 60,
  nightDiffRate: 10,
  otRegular: 25,
  otRestDay: 30,
  silDays: 10,
  probationaryDays: 180,
  maternityLeave: 105,
  retirementAge: 60,
  retirementMultiplier: 22.5,
  riceSubsidy: 2000,
};

function CompanyConfigSection() {
  const [cfg, setCfg] = useState<CompanyConfig>(DEFAULT_CONFIG);

  function set<K extends keyof CompanyConfig>(field: K, val: number) {
    setCfg(c => ({ ...c, [field]: val }));
  }

  // Count risks
  const risks = [
    getCompliance(cfg.normalHours, LAW.NORMAL_HOURS, 'exact').status === 'risk',
    getCompliance(cfg.mealBreak, LAW.MEAL_BREAK, 'min').status === 'risk',
    getCompliance(cfg.nightDiffRate, LAW.NIGHT_DIFF_RATE, 'min').status === 'risk',
    getCompliance(cfg.otRegular, LAW.OT_REGULAR, 'min').status === 'risk',
    getCompliance(cfg.silDays, LAW.SIL_DAYS, 'min').status === 'risk',
    getCompliance(cfg.probationaryDays, LAW.PROBATIONARY_DAYS, 'max').status === 'risk',
    getCompliance(cfg.maternityLeave, LAW.MATERNITY_DAYS, 'min').status === 'risk',
    getCompliance(cfg.retirementAge, LAW.RETIREMENT_AGE_MIN, 'max').status === 'risk',
    getCompliance(cfg.riceSubsidy, LAW.DEMINIMIS_RICE, 'min').status === 'risk',
  ].filter(Boolean).length;

  const overallStatus = risks > 0 ? 'risk' : 'compliant';

  return (
    <div className="space-y-4">
      {/* Status header */}
      <div className={`flex items-center justify-between px-5 py-4 border-2 ${
        overallStatus === 'risk'
          ? 'border-rose-300 bg-rose-50'
          : 'border-emerald-300 bg-emerald-50'
      }`}>
        <div className="flex items-center gap-3">
          {overallStatus === 'risk'
            ? <ShieldAlert size={20} className="text-rose-600" />
            : <ShieldCheck size={20} className="text-emerald-600" />}
          <div>
            <p className={`text-sm font-black uppercase tracking-wider ${overallStatus === 'risk' ? 'text-rose-800' : 'text-emerald-800'}`}>
              {overallStatus === 'risk' ? `${risks} Compliance Risk${risks > 1 ? 's' : ''} Detected` : 'All Fields Compliant'}
            </p>
            <p className={`text-[11px] font-medium ${overallStatus === 'risk' ? 'text-rose-600' : 'text-emerald-600'}`}>
              {overallStatus === 'risk'
                ? 'Review fields marked in red — values are below legal minimums.'
                : 'Your company configuration meets all Labor Code requirements.'}
            </p>
          </div>
        </div>
        <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border ${
          overallStatus === 'risk'
            ? 'bg-rose-100 border-rose-300 text-rose-700'
            : 'bg-emerald-100 border-emerald-300 text-emerald-700'
        }`}>
          {overallStatus === 'risk' ? 'Non-Compliant' : 'Fully Compliant'}
        </div>
      </div>

      {/* Config grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Work Hours */}
        <div className="bg-white border border-slate-200 p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Clock size={14} className="text-[#00377B]" />
            <span className="text-[10px] font-black text-[#00377B] uppercase tracking-widest">Work Hours</span>
          </div>
          <PolicyField
            label="Normal Daily Hours"
            value={cfg.normalHours}
            onChange={v => set('normalHours', v)}
            standard={LAW.NORMAL_HOURS}
            type="exact"
            citation="Art. 83"
            suffix="hrs"
            min={1} max={24}
          />
          <PolicyField
            label="Meal Break"
            value={cfg.mealBreak}
            onChange={v => set('mealBreak', v)}
            standard={LAW.MEAL_BREAK}
            type="min"
            citation="Art. 85"
            suffix="min"
            min={0} max={120}
          />
        </div>

        {/* Pay Premiums */}
        <div className="bg-white border border-slate-200 p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <TrendingUp size={14} className="text-[#00377B]" />
            <span className="text-[10px] font-black text-[#00377B] uppercase tracking-widest">Pay Premiums</span>
          </div>
          <PolicyField
            label="Night Differential"
            value={cfg.nightDiffRate}
            onChange={v => set('nightDiffRate', v)}
            standard={LAW.NIGHT_DIFF_RATE}
            type="min"
            citation="Art. 86"
            suffix="%"
            min={0} max={100}
          />
          <PolicyField
            label="OT — Regular Day"
            value={cfg.otRegular}
            onChange={v => set('otRegular', v)}
            standard={LAW.OT_REGULAR}
            type="min"
            citation="Art. 87"
            suffix="%"
            min={0} max={200}
          />
        </div>

        {/* Leave Entitlements */}
        <div className="bg-white border border-slate-200 p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Calendar size={14} className="text-[#00377B]" />
            <span className="text-[10px] font-black text-[#00377B] uppercase tracking-widest">Leave Entitlements</span>
          </div>
          <PolicyField
            label="Service Incentive Leave"
            value={cfg.silDays}
            onChange={v => set('silDays', v)}
            standard={LAW.SIL_DAYS}
            type="min"
            citation="Art. 95"
            suffix="days"
            min={0} max={365}
          />
          <PolicyField
            label="Maternity Leave"
            value={cfg.maternityLeave}
            onChange={v => set('maternityLeave', v)}
            standard={LAW.MATERNITY_DAYS}
            type="min"
            citation="RA 11210"
            suffix="days"
            min={0} max={365}
          />
        </div>

        {/* Employment Terms */}
        <div className="bg-white border border-slate-200 p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Briefcase size={14} className="text-[#00377B]" />
            <span className="text-[10px] font-black text-[#00377B] uppercase tracking-widest">Employment Terms</span>
          </div>
          <PolicyField
            label="Probationary Period"
            value={cfg.probationaryDays}
            onChange={v => set('probationaryDays', v)}
            standard={LAW.PROBATIONARY_DAYS}
            type="max"
            citation="Art. 296"
            suffix="days"
            min={1} max={365}
          />
          <PolicyField
            label="Optional Retirement Age"
            value={cfg.retirementAge}
            onChange={v => set('retirementAge', v)}
            standard={LAW.RETIREMENT_AGE_MIN}
            type="max"
            citation="Art. 302"
            suffix="yrs"
            min={50} max={70}
          />
        </div>

        {/* De Minimis */}
        <div className="bg-white border border-slate-200 p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <BookMarked size={14} className="text-[#00377B]" />
            <span className="text-[10px] font-black text-[#00377B] uppercase tracking-widest">De Minimis Benefits</span>
          </div>
          <PolicyField
            label="Rice Subsidy Cap"
            value={cfg.riceSubsidy}
            onChange={v => set('riceSubsidy', v)}
            standard={LAW.DEMINIMIS_RICE}
            type="min"
            citation="RR 11-2018"
            suffix="₱/mo"
            min={0} max={10000} step={100}
          />
          <div className="flex items-start gap-2 mt-1 text-[10px] text-slate-400">
            <Info size={11} className="mt-0.5 flex-shrink-0" />
            <span>Clothing allowance: ₱6,000/year cap (RR 11-2018)</span>
          </div>
        </div>

        {/* Compliance legend */}
        <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col justify-center gap-3">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Badge Legend</p>
          {[
            { status: 'risk',      bg: 'bg-rose-50 border-rose-200 text-rose-700',              icon: <AlertTriangle size={11} />, label: 'Below Legal Minimum' },
            { status: 'compliant', bg: 'bg-emerald-50 border-emerald-200 text-emerald-700',      icon: <CheckCircle2 size={11} />,  label: 'Compliant'          },
            { status: 'generous',  bg: 'bg-[#EEF3FB] border-[#C7D8F0] text-[#034EA2]',          icon: <ShieldCheck size={11} />,   label: 'Above Standard'     },
          ].map(row => (
            <div key={row.status} className={`flex items-center gap-2 px-2.5 py-1.5 border text-[10px] font-bold uppercase tracking-wider ${row.bg}`}>
              {row.icon}
              <span>{row.label}</span>
            </div>
          ))}
          <p className="text-[10px] text-slate-400 mt-1 italic">
            Change any value above to see real-time compliance evaluation.
          </p>
        </div>
      </div>
    </div>
  );
}


// ── SECTION 3: Leave Policy Matrix ───────────────────────────────────────────

interface LeaveType {
  id: string;
  name: string;
  code: string;
  statutory: boolean;
  days: number;
  citation: string;
  icon: React.ElementType;
  accrual: string;
  eligibility: string[];
  expiry: string;
  monetizable: boolean;
}

const LEAVE_TYPES: LeaveType[] = [
  { id: 'sil',       name: 'Service Incentive Leave', code: 'SIL', statutory: true,  days: 5,   citation: 'Art. 95',  icon: Calendar,    accrual: 'Monthly (Earned)', eligibility: ['Regular'], expiry: 'Never',          monetizable: true  },
  { id: 'vl',        name: 'Vacation Leave',          code: 'VL',  statutory: false, days: 10,  citation: 'Company',  icon: Gift,        accrual: 'Monthly',          eligibility: ['Regular', 'Full-time'], expiry: 'Year-End', monetizable: true  },
  { id: 'sl',        name: 'Sick Leave',              code: 'SL',  statutory: false, days: 12,  citation: 'Company',  icon: Stethoscope, accrual: 'Monthly',          eligibility: ['Regular', 'Full-time', 'Probationary'], expiry: 'Year-End', monetizable: false },
  { id: 'maternity', name: 'Expanded Maternity',      code: 'ML',  statutory: true,  days: 105, citation: 'RA 11210', icon: Baby,        accrual: 'One-time',         eligibility: ['Female'], expiry: 'Never',          monetizable: false },
  { id: 'paternity', name: 'Paternity Leave',         code: 'PL',  statutory: true,  days: 7,   citation: 'RA 8187',  icon: Baby,        accrual: 'One-time',         eligibility: ['Male', 'Married'], expiry: 'Never',  monetizable: false },
  { id: 'vawc',      name: 'VAWC Leave',              code: 'VAWC',statutory: true,  days: 10,  citation: 'RA 9262',  icon: Heart,       accrual: 'Annual',           eligibility: ['Female'], expiry: 'Never',          monetizable: false },
];

function LeavePolicyMatrix() {
  const [selectedId, setSelectedId] = useState('vl');
  const [leaveConfig, setLeaveConfig] = useState<Record<string, LeaveType>>(
    LEAVE_TYPES.reduce((acc, l) => ({ ...acc, [l.id]: { ...l } }), {})
  );

  const selected = leaveConfig[selectedId]!;

  function update<K extends keyof LeaveType>(field: K, val: LeaveType[K]) {
    setLeaveConfig(c => ({ ...c, [selectedId]: { ...c[selectedId]!, [field]: val } }));
  }

  return (
    <div className="flex gap-4">
      {/* Leave type list */}
      <div className="w-56 flex-shrink-0 border-2 border-slate-200 overflow-hidden shadow-sm">
        <div className="px-4 py-3 bg-[#00377B]">
          <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.18em]">Leave Types</p>
        </div>
        {LEAVE_TYPES.map(leave => {
          const config = leaveConfig[leave.id]!;
          const Icon = leave.icon;
          const isActive = selectedId === leave.id;
          return (
            <button
              key={leave.id}
              type="button"
              onClick={() => setSelectedId(leave.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-b border-slate-100 last:border-0 ${
                isActive ? 'bg-[#EEF3FB] border-l-4 border-l-[#00377B]' : 'bg-white hover:bg-slate-50 border-l-4 border-l-transparent'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-[#00377B]' : 'text-slate-400'} />
              <div className="flex-1 min-w-0">
                <p className={`text-[11px] font-bold truncate ${isActive ? 'text-[#00377B]' : 'text-slate-800'}`}>
                  {leave.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 ${
                    leave.statutory
                      ? 'bg-[#00377B] text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {leave.statutory ? 'Statutory' : 'Company'}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">{config.days}d</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Leave config panel */}
      <div className="flex-1 min-w-0 border-2 border-slate-200 overflow-hidden shadow-sm">
        {/* Panel header */}
        <div className="flex items-center gap-4 px-6 py-4 bg-[#00377B] border-b border-[#034EA2]">
          <selected.icon size={18} className="text-white/80" />
          <div>
            <p className="text-sm font-bold text-white">{selected.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-[9px] text-white/50">{selected.code}</span>
              <CitationBadge text={selected.citation} />
            </div>
          </div>
          {selected.statutory && (
            <span className="ml-auto text-[9px] font-black uppercase tracking-wider px-2 py-1 bg-white/10 text-white/70 border border-white/20">
              Statutory — Minimum Enforced
            </span>
          )}
        </div>

        {/* Config fields */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 bg-white">
          {/* Days */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Leave Days</label>
              <CitationBadge text={selected.citation} />
            </div>
            <input
              type="number"
              value={selected.days}
              disabled={selected.statutory}
              min={0} max={365}
              onChange={e => update('days', Number(e.target.value))}
              className="w-24 border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 font-mono text-right disabled:bg-slate-50 disabled:text-slate-400 outline-none focus:border-[#00377B] focus:ring-2 focus:ring-[#00377B]/20"
              style={{ borderRadius: 0 }}
            />
            {selected.statutory && (
              <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                <Info size={10} /> Statutory — cannot be set below legal minimum.
              </p>
            )}
          </div>

          {/* Accrual */}
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Accrual Policy</label>
            <select
              value={selected.accrual}
              onChange={e => update('accrual', e.target.value)}
              className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:border-[#00377B] focus:ring-2 focus:ring-[#00377B]/20"
              style={{ borderRadius: 0 }}
            >
              {['Monthly', 'Monthly (Earned)', 'Annual', 'One-time', 'Immediate', 'Upon Regularization'].map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Expiry */}
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Expiration</label>
            <select
              value={selected.expiry}
              onChange={e => update('expiry', e.target.value)}
              className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:border-[#00377B] focus:ring-2 focus:ring-[#00377B]/20"
              style={{ borderRadius: 0 }}
            >
              {['Never', 'Year-End', 'After 12 Months', 'After 24 Months'].map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Monetizable */}
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Leave Monetization</label>
            <div className="flex items-center gap-2 p-1 bg-slate-100 border border-slate-200 w-fit">
              {[true, false].map(val => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => update('monetizable', val)}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all ${
                    selected.monetizable === val
                      ? 'bg-[#00377B] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {val ? 'Enabled' : 'Disabled'}
                </button>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="col-span-full">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Eligibility</label>
            <div className="flex flex-wrap gap-2">
              {['Regular', 'Probationary', 'Full-time', 'Part-time', 'Male', 'Female', 'Solo Parent', 'Married'].map(tag => {
                const on = selected.eligibility.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      const next = on
                        ? selected.eligibility.filter(e => e !== tag)
                        : [...selected.eligibility, tag];
                      update('eligibility', next);
                    }}
                    className={`px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider border transition-all ${
                      on
                        ? 'bg-[#00377B] border-[#00377B] text-white'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── SECTION 4: Payroll Calculators ───────────────────────────────────────────

function fmt(n: number) {
  return `₱${n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function CalcField({ label, value, onChange, min = 0, max = 999999, step = 1000, prefix = '' }: {
  label: string; value: number; onChange: (v: number) => void;
  min?: number; max?: number; step?: number; prefix?: string;
}) {
  return (
    <div>
      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</label>
      <div className="flex items-center gap-2">
        {prefix && <span className="text-sm font-bold text-slate-400">{prefix}</span>}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold font-mono text-slate-900 text-right outline-none focus:border-[#00377B] focus:ring-2 focus:ring-[#00377B]/20"
          style={{ borderRadius: 0 }}
        />
      </div>
    </div>
  );
}

function PayrollCalculators() {
  // Separation Pay
  const [sepSalary, setSepSalary] = useState(20000);
  const [sepYears,  setSepYears]  = useState(5);
  const [sepCause,  setSepCause]  = useState<'redundancy' | 'disease'>('redundancy');

  const sepMultiplier  = sepCause === 'redundancy' ? LAW.SEP_PAY_REDUNDANCY : LAW.SEP_PAY_DISEASE;
  const sepComputed    = sepSalary * sepMultiplier * sepYears;
  const sepFinal       = Math.max(sepSalary, sepComputed); // minimum 1 month
  const sepCitation    = sepCause === 'redundancy' ? 'Art. 298' : 'Art. 299';

  // Retirement Pay
  const [retSalary, setRetSalary] = useState(20000);
  const [retYears,  setRetYears]  = useState(10);
  const [retAge,    setRetAge]    = useState(60);

  const DIVISOR       = 314;
  const retDailyRate  = (retSalary * 12) / DIVISOR;
  const retComputed   = retDailyRate * LAW.RETIREMENT_MULTIPLIER * retYears;
  const retEligible   = retYears >= 5 && retAge >= LAW.RETIREMENT_AGE_MIN;
  const retCompulsory = retAge >= 65;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ── Separation Pay ───────────────────────────────────────────── */}
      <div className="border-2 border-slate-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-[#00377B]">
          <Calculator size={16} className="text-white/80" />
          <div>
            <p className="text-sm font-bold text-white">Separation Pay Calculator</p>
            <p className="text-[9px] text-white/50 uppercase tracking-widest">Art. 298–299, Labor Code</p>
          </div>
        </div>

        <div className="p-5 space-y-4 bg-white">
          {/* Cause selector */}
          <div>
            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Cause of Separation</label>
            <div className="flex gap-1 p-1 bg-slate-100 border border-slate-200">
              {([
                { id: 'redundancy' as const, label: 'Redundancy / Retrenchment', cite: 'Art. 298' },
                { id: 'disease'    as const, label: 'Disease',                   cite: 'Art. 299' },
              ] as const).map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSepCause(opt.id)}
                  className={`flex-1 text-[10px] font-black uppercase tracking-wider px-3 py-2 transition-all ${
                    sepCause === opt.id
                      ? 'bg-[#00377B] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <CalcField label="Monthly Basic Salary" value={sepSalary} onChange={setSepSalary} prefix="₱" min={0} step={500} />
          <CalcField label="Years of Service"     value={sepYears}  onChange={setSepYears}  min={1} max={60} step={1} />

          {/* Result */}
          <div className="bg-[#0C1A2E] p-5 mt-2">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Separation Pay</p>
                <p className="text-2xl font-black text-white font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {fmt(sepFinal)}
                </p>
                {sepComputed < sepSalary && (
                  <p className="text-[10px] text-amber-400 font-bold mt-1">
                    Applied: 1-month minimum rule
                  </p>
                )}
              </div>
              <CitationBadge text={sepCitation} />
            </div>
            <div className="border-t border-white/10 pt-3 grid grid-cols-3 gap-3 text-[10px]">
              <div>
                <p className="text-white/40 uppercase tracking-wider mb-0.5">Multiplier</p>
                <p className="font-mono font-bold text-white">{sepMultiplier}× / year</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-wider mb-0.5">Per Year</p>
                <p className="font-mono font-bold text-white">{fmt(sepSalary * sepMultiplier)}</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-wider mb-0.5">Raw Total</p>
                <p className="font-mono font-bold text-white">{fmt(sepComputed)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Retirement Pay ────────────────────────────────────────────── */}
      <div className="border-2 border-slate-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-[#00377B]">
          <BookOpen size={16} className="text-white/80" />
          <div>
            <p className="text-sm font-bold text-white">Retirement Pay Calculator</p>
            <p className="text-[9px] text-white/50 uppercase tracking-widest">Art. 302 / RA 7641</p>
          </div>
        </div>

        <div className="p-5 space-y-4 bg-white">
          <CalcField label="Monthly Basic Salary"  value={retSalary} onChange={setRetSalary} prefix="₱" min={0} step={500} />
          <CalcField label="Years of Service"      value={retYears}  onChange={setRetYears}  min={1} max={60} step={1} />
          <CalcField label="Employee Age"          value={retAge}    onChange={setRetAge}    min={40} max={80} step={1} />

          {/* Eligibility status */}
          <div className={`flex items-center gap-3 px-4 py-3 border text-sm font-bold ${
            retEligible
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}>
            {retEligible ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            <span>
              {retCompulsory
                ? 'Compulsory Retirement (Age 65+)'
                : retEligible
                ? 'Eligible for Optional Retirement'
                : `Not yet eligible — needs ${retYears < 5 ? `${5 - retYears} more year(s)` : `age ${LAW.RETIREMENT_AGE_MIN}`}`}
            </span>
          </div>

          {/* Result */}
          <div className="bg-[#0C1A2E] p-5">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Retirement Pay</p>
                <p className={`text-2xl font-black font-mono ${retEligible ? 'text-white' : 'text-white/30'}`}
                   style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {retEligible ? fmt(retComputed) : '—'}
                </p>
                {!retEligible && (
                  <p className="text-[10px] text-rose-400 font-bold mt-1">Eligibility conditions not met</p>
                )}
              </div>
              <CitationBadge text="Art. 302" />
            </div>
            <div className="border-t border-white/10 pt-3 grid grid-cols-3 gap-3 text-[10px]">
              <div>
                <p className="text-white/40 uppercase tracking-wider mb-0.5">Daily Rate</p>
                <p className="font-mono font-bold text-white">{fmt(retDailyRate)}</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-wider mb-0.5">× Days</p>
                <p className="font-mono font-bold text-white">{LAW.RETIREMENT_MULTIPLIER} days</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-wider mb-0.5">Divisor</p>
                <p className="font-mono font-bold text-white">{DIVISOR} days/yr</p>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
            <Info size={11} className="flex-shrink-0" />
            Daily rate = (Monthly × 12) ÷ 314. Formula: Daily Rate × 22.5 × Years.
          </p>
        </div>
      </div>
    </div>
  );
}


// ── Code strings ──────────────────────────────────────────────────────────────

const CODE = {
  complianceBadge: `// ComplianceBadge — live evaluation against legal standard
function ComplianceBadge({ value, standard, type, citation }) {
  const status = evaluate(value, standard, type);
  // risk      → rose   (below legal minimum)
  // compliant → emerald (meets the standard)
  // generous  → brand blue (above standard)
  return (
    <div className={\`flex items-center justify-between px-2.5 py-1.5 border \${statusStyles[status]}\`}>
      <div className="flex items-center gap-1.5">
        {statusIcon[status]}
        <span>{msg}</span>
      </div>
      <CitationBadge text={citation} />
    </div>
  );
}`,
  separationPay: `// Separation Pay calculator — JSX layout
// Two causes: Redundancy (Art. 298) = 1× per year | Disease (Art. 299) = 0.5× per year

function SeparationPayCalculator() {
  const [salary, setSalary] = useState(20000);
  const [years,  setYears]  = useState(5);
  const [cause,  setCause]  = useState<'redundancy' | 'disease'>('redundancy');

  const multiplier = cause === 'redundancy' ? 1.0 : 0.5;
  const computed   = salary * multiplier * years;
  const sepPay     = Math.max(salary, computed); // minimum: 1 month

  return (
    <div className="border-2 border-slate-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-[#00377B]">
        <Calculator size={16} className="text-white/80" />
        <p className="text-sm font-bold text-white">Separation Pay Calculator</p>
      </div>

      <div className="p-5 space-y-4">
        {/* Cause selector */}
        <div className="flex gap-1 p-1 bg-slate-100 border border-slate-200">
          {(['redundancy', 'disease'] as const).map(c => (
            <button key={c} onClick={() => setCause(c)}
              className={\`flex-1 text-[10px] font-black uppercase px-3 py-2 transition
                \${cause === c ? 'bg-[#00377B] text-white shadow-sm' : 'text-slate-500'}\`}>
              {c === 'redundancy' ? 'Redundancy / Retrenchment' : 'Disease'}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <NumberInput label="Monthly Basic Salary" value={salary} onChange={setSalary} />
        <NumberInput label="Years of Service"     value={years}  onChange={setYears} />

        {/* Result — dark card */}
        <div className="bg-[#0C1A2E] p-5">
          <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Separation Pay</p>
          <p className="text-2xl font-black text-white font-mono">{fmtPeso(sepPay)}</p>
          {computed < salary && <p className="text-[10px] text-amber-400 font-bold">1-month minimum applied</p>}
        </div>
      </div>
    </div>
  );
}`,
  retirementPay: `// Retirement Pay formula (Art. 302 / RA 7641)
// Daily Rate = (Monthly × 12) ÷ 314 working days
// Retirement Pay = Daily Rate × 22.5 × Years of Service
// Eligible: age ≥ 60 AND service ≥ 5 years

function RetirementPayCalculator() {
  const [salary, setSalary] = useState(20000);
  const [years,  setYears]  = useState(10);
  const [age,    setAge]    = useState(60);

  const dailyRate = (salary * 12) / 314;
  const retPay    = dailyRate * 22.5 * years;
  const eligible  = years >= 5 && age >= 60;

  return (
    <div className="border-2 border-slate-200 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 bg-[#00377B]">
        <BookOpen size={16} className="text-white/80" />
        <p className="text-sm font-bold text-white">Retirement Pay Calculator</p>
      </div>
      <div className="p-5 space-y-4">
        <NumberInput label="Monthly Basic Salary" value={salary} onChange={setSalary} />
        <NumberInput label="Years of Service"     value={years}  onChange={setYears} />
        <NumberInput label="Employee Age"         value={age}    onChange={setAge} />

        {/* Eligibility check */}
        <div className={\`flex items-center gap-3 px-4 py-3 border font-bold text-sm
          \${eligible ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}\`}>
          {eligible ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          {eligible ? 'Eligible' : \`Not eligible — needs \${years < 5 ? \`\${5-years} more yr(s)\` : 'age 60'}\`}
        </div>

        <div className="bg-[#0C1A2E] p-5">
          <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Retirement Pay</p>
          <p className={\`text-2xl font-black font-mono \${eligible ? 'text-white' : 'text-white/30'}\`}>
            {eligible ? fmtPeso(retPay) : '—'}
          </p>
        </div>
      </div>
    </div>
  );
}`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CompanyPolicyPage() {
  return (
    <GalleryLayout activeId="company-policy">
      <title>Company Policy & Compliance — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Enterprise"
          name="Company Policy & Government Compliance"
          description="Four layouts for UHRIS compliance: read-only Labor Code reference, editable company config with live compliance badges, leave policy matrix, and separation/retirement calculators."
          status="complete"
          importName={false}
        />

        {/* ── 2. Overview ───────────────────────────────────────────────── */}
        <GallerySection id="overview" title="Overview" description="Four samples that cover the full compliance configuration workflow.">
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {[
                { label: 'Gov. Reference',    desc: 'Read-only Labor Code by book'              },
                { label: 'Company Config',     desc: 'Edit fields → live compliance badge'       },
                { label: 'Leave Matrix',       desc: 'Sidebar selector + leave config panel'     },
                { label: 'Calculators',        desc: 'Separation pay + retirement pay'           },
              ].map(item => (
                <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <p className="text-sm font-bold text-[#00377B] mb-1">{item.label}</p>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── 2. Government Reference ───────────────────────────────────── */}
        <GallerySection
          id="government-reference"
          title="Government Compliance Reference"
          description="Read-only Labor Code standards organized by Book. Each entry shows the legal value and its citation. Switch between Book III (Work & Wages), Book VI (Post-Employment), and Special Laws."
        >
          <Showcase
            title="Labor Code reference — read-only"
            description="Click the Book tabs on the left to switch sections. No editing — this is the legal baseline."
            code={`// Each entry maps a Labor Code provision to a display value + citation
const entry = {
  label:    'Normal Working Hours',
  value:    '8 hours / day',
  citation: 'Art. 83',   // shown as a monospace badge
};`}
            tone="white"
            center={false}
          >
            <div className="w-full">
              <GovernmentReference />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 3. Company Config + Compliance Badges ─────────────────────── */}
        <GallerySection
          id="company-config"
          title="Company Configuration + Compliance Badges"
          description="Editable company policy fields with live compliance evaluation. Change any value to see the badge update in real-time: rose = below legal minimum, emerald = compliant, blue = above standard. The status header counts total risks."
        >
          <Showcase
            title="Live compliance evaluation"
            description="Try setting Normal Daily Hours to 7, or OT Rate to 20% — watch the badges and risk counter update."
            code={CODE.complianceBadge}
            tone="white"
            center={false}
          >
            <div className="w-full">
              <CompanyConfigSection />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 4. Leave Policy Matrix ────────────────────────────────────── */}
        <GallerySection
          id="leave-matrix"
          title="Leave Policy Matrix"
          description="Sidebar leave type list with a right-panel configuration editor. Statutory leaves (navy badge) cannot have their day count reduced below the legal minimum. Company leaves are fully editable."
        >
          <Showcase
            title="Leave type selector + config panel"
            description="Click any leave type in the sidebar to edit its configuration. Toggle monetization, change eligibility chips, and set accrual policy."
            code={`// Leave types: statutory (Labor Code minimum enforced) vs company-defined
// Sidebar list → right panel config:
//   Days (disabled if statutory), Accrual, Expiration,
//   Monetization toggle, Eligibility multi-chip`}
            tone="white"
            center={false}
          >
            <div className="w-full">
              <LeavePolicyMatrix />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 5. Payroll Calculators ────────────────────────────────────── */}
        <GallerySection
          id="calculators"
          title="Payroll Calculators"
          description="Two live calculators for post-employment obligations. Separation Pay applies the minimum-of-one-month rule automatically. Retirement Pay checks eligibility (5 years service + age 60) before computing."
        >
          <Showcase
            title="Separation Pay + Retirement Pay calculators"
            description="Copy each calculator JSX. Swap NumberInput for your own input component. All math is inline — no backend needed."
            code={`${CODE.separationPay}\n\n${CODE.retirementPay}`}
            language="tsx"
            tone="white"
            center={false}
          >
            <div className="w-full">
              <PayrollCalculators />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 6. Related ────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
