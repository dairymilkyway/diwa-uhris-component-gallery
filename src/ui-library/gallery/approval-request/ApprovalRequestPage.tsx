/**
 * ApprovalRequestPage — Gallery (Enterprise)
 *
 * Layout samples for the full UHRIS approval workflow:
 *   1. Approval List         — table with status badges, bulk actions, filter toolbar
 *   2. Approval Stepper      — horizontal progress indicator using the Stepper component
 *   3. Approval Detail       — two-column layout: request info + approval timeline
 *   4. Requestor Filing Form — employee-facing leave request form with step tracker
 *   5. Approve / Reject Actions — action bar with confirm pattern
 *
 * Source reference: unified-hris/pages/ApprovalList.tsx, ApprovalDetail.tsx
 * Design: DIWA brand #00377B navy. Status: emerald=Approved, rose=Rejected,
 * amber=Pending, slate=Expired/Cancelled.
 */

import { useState } from 'react';
import {
  Check, X, Search, Filter, ChevronDown,
  FileText, Plus,
  FileCheck, MessageSquare, Paperclip,
  CheckCircle2, XCircle, AlertCircle, ArrowLeft,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { Stepper } from '../stepper/Stepper';
import { ApprovalTimeline } from '../approval-timeline/ApprovalTimeline';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['stepper', 'approval-timeline', 'table', 'status-badge', 'confirm-action']);

// ── Mock data ─────────────────────────────────────────────────────────────────

const YEAR = new Date().getFullYear();

type ReqStatus = 'Pending' | 'Approved' | 'Rejected' | 'Expired';

interface ApprovalRequest {
  id: string;
  refNo: string;
  employee: string;
  initials: string;
  dept: string;
  type: string;
  dates: string;
  days: number;
  filed: string;
  status: ReqStatus;
}

const REQUESTS: ApprovalRequest[] = [
  { id: 'r1', refNo: 'LR-2025-0419', employee: 'Maria Santos',   initials: 'MS', dept: 'Finance',    type: 'Vacation Leave',  dates: `Aug 4–8, ${YEAR}`,    days: 5, filed: `Jul 29, ${YEAR}`, status: 'Pending'  },
  { id: 'r2', refNo: 'LR-2025-0421', employee: 'Jose Reyes',     initials: 'JR', dept: 'Operations', type: 'Sick Leave',      dates: `Aug 11–12, ${YEAR}`,  days: 2, filed: `Jul 29, ${YEAR}`, status: 'Rejected' },
  { id: 'r3', refNo: 'OT-2025-0088', employee: 'Ana Villanueva', initials: 'AV', dept: 'HR',         type: 'Overtime',        dates: `Aug 5, ${YEAR}`,      days: 1, filed: `Aug 1, ${YEAR}`,  status: 'Approved' },
  { id: 'r4', refNo: 'LR-2025-0398', employee: 'Carlo Mendoza',  initials: 'CM', dept: 'Finance',    type: 'Emergency Leave', dates: `Jul 22–24, ${YEAR}`,  days: 3, filed: `Jul 20, ${YEAR}`, status: 'Approved' },
  { id: 'r5', refNo: 'SC-2025-0031', employee: 'Lena Cruz',      initials: 'LC', dept: 'Academics',  type: 'Shift Change',    dates: `Aug 10, ${YEAR}`,     days: 1, filed: `Aug 7, ${YEAR}`,  status: 'Pending'  },
  { id: 'r6', refNo: 'LR-2025-0379', employee: 'Ramon Dela Cruz',initials: 'RD', dept: 'IT',         type: 'Vacation Leave',  dates: `Jul 15–17, ${YEAR}`,  days: 3, filed: `Jul 10, ${YEAR}`, status: 'Expired'  },
];

const STATUS_STYLE: Record<ReqStatus, string> = {
  Pending:  'bg-amber-50 text-amber-700 border border-amber-200',
  Approved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Rejected: 'bg-rose-50 text-rose-700 border border-rose-200',
  Expired:  'bg-slate-100 text-slate-500 border border-slate-200',
};

const STATUS_DOT: Record<ReqStatus, string> = {
  Pending:  'bg-amber-400',
  Approved: 'bg-emerald-500',
  Rejected: 'bg-rose-500',
  Expired:  'bg-slate-400',
};

// ── SECTION 1: Approval List ──────────────────────────────────────────────────

function ApprovalList() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = REQUESTS.filter(r =>
    r.employee.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  function toggle(id: string) {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  }

  function toggleAll() {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(r => r.id)));
  }

  const pendingCount = REQUESTS.filter(r => r.status === 'Pending').length;

  return (
    <div className="space-y-3">
      {/* Stat strip */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total',    value: REQUESTS.length,                                         color: 'text-slate-900' },
          { label: 'Pending',  value: REQUESTS.filter(r => r.status === 'Pending').length,     color: 'text-amber-600' },
          { label: 'Approved', value: REQUESTS.filter(r => r.status === 'Approved').length,    color: 'text-emerald-600' },
          { label: 'Rejected', value: REQUESTS.filter(r => r.status === 'Rejected').length,    color: 'text-rose-600' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
        {['Leave Type', 'Department', 'Status'].map(f => (
          <button key={f} type="button" className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={11} /> {f}
            <ChevronDown size={10} className="text-slate-400" />
          </button>
        ))}
        <div className="relative ml-auto">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search employee or type..."
            className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#00377B]/20 outline-none w-52"
          />
        </div>
      </div>

      {/* Contextual action bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#EEF3FB] border border-[#C7D8F0] rounded-xl">
          <span className="text-[11px] font-black text-[#00377B] uppercase tracking-widest">{selected.size} selected</span>
          <div className="flex items-center gap-2 ml-2">
            <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[11px] font-black uppercase tracking-wider hover:bg-emerald-700 transition-all">
              <CheckCircle2 size={12} /> Approve All
            </button>
            <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 text-white rounded-lg text-[11px] font-black uppercase tracking-wider hover:bg-rose-700 transition-all">
              <XCircle size={12} /> Reject All
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-[#00377B] bg-[#00377B]">
              <th className="px-4 py-3 w-10">
                <button type="button" onClick={toggleAll} className={`w-4.5 h-4.5 border-2 flex items-center justify-center transition-all ${selected.size === filtered.length && filtered.length > 0 ? 'bg-white border-white' : 'border-white/50 bg-transparent'}`} aria-label="Select all">
                  {selected.size === filtered.length && filtered.length > 0 && <Check size={10} className="text-[#00377B]" />}
                </button>
              </th>
              {['Reference', 'Employee', 'Request Type', 'Dates', 'Filed', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-[10px] font-black text-white/80 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((req) => (
              <tr key={req.id} className={`transition-colors cursor-pointer ${selected.has(req.id) ? 'bg-[#EEF3FB]' : 'bg-white hover:bg-slate-50/60'}`} onClick={() => toggle(req.id)}>
                <td className="px-4 py-3.5">
                  <div className={`w-4 h-4 border-2 flex items-center justify-center transition-all ${selected.has(req.id) ? 'bg-[#00377B] border-[#00377B]' : 'border-slate-300'}`}>
                    {selected.has(req.id) && <Check size={9} className="text-white" />}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="font-mono text-[11px] text-[#034EA2] font-bold">{req.refNo}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-[#00377B] flex items-center justify-center text-white text-[9px] font-black rounded-full flex-shrink-0">
                      {req.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{req.employee}</p>
                      <p className="text-[10px] text-slate-400">{req.dept}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <FileCheck size={13} className="text-slate-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-700">{req.type}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm text-slate-700">{req.dates}</p>
                  <p className="text-[10px] text-slate-400">{req.days} day{req.days > 1 ? 's' : ''}</p>
                </td>
                <td className="px-4 py-3.5 text-sm text-slate-500">{req.filed}</td>
                <td className="px-4 py-3.5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${STATUS_STYLE[req.status]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[req.status]}`} />
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                  {req.status === 'Pending' ? (
                    <div className="flex items-center gap-1">
                      <button type="button" className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all" aria-label="Approve">
                        <Check size={13} strokeWidth={2.5} />
                      </button>
                      <button type="button" className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all" aria-label="Reject">
                        <X size={13} strokeWidth={2.5} />
                      </button>
                    </div>
                  ) : (
                    <button type="button" className="text-[11px] font-bold text-[#034EA2] hover:underline">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {filtered.length} requests · {pendingCount} pending review
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} type="button" className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${p === 1 ? 'bg-[#00377B] text-white' : 'text-slate-400 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SECTION 2: Approval Stepper ───────────────────────────────────────────────

const APPROVAL_STEPS = [
  { id: '1', label: 'Filed',      description: 'Request submitted'     },
  { id: '2', label: 'Verified',   description: 'HR records checked'    },
  { id: '3', label: 'For Review', description: 'Awaiting approver'     },
  { id: '4', label: 'Approved',   description: 'Decision recorded'     },
  { id: '5', label: 'Released',   description: 'Notified & finalized'  },
] as const;

function ApprovalStepperDemo() {
  const [currentStep, setCurrentStep] = useState('3');
  const completedMap: Record<string, string[]> = {
    '1': [],
    '2': ['1'],
    '3': ['1', '2'],
    '4': ['1', '2', '3'],
    '5': ['1', '2', '3', '4'],
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <Stepper
          steps={APPROVAL_STEPS as unknown as import('../stepper/Stepper').StepDef[]}
          currentStep={currentStep}
          completedSteps={completedMap[currentStep] ?? []}
        />
      </div>
      {/* Step navigator */}
      <div className="flex items-center justify-center gap-2">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-2">Step:</p>
        {APPROVAL_STEPS.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrentStep(s.id)}
            className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all ${
              currentStep === s.id ? 'bg-[#00377B] text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-[#00377B]/40'
            }`}
          >
            {s.id}. {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── SECTION 3: Approval Detail Layout ────────────────────────────────────────

const DETAIL_TIMELINE = [
  { id: 't1', actor: 'Maria Santos',    action: 'Filed leave request',   status: 'approved' as const, timestamp: `Jul 29, ${YEAR} · 09:12 AM` },
  { id: 't2', actor: 'System',          action: 'Auto-verified credits',  status: 'verified' as const, timestamp: `Jul 29, ${YEAR} · 09:12 AM` },
  { id: 't3', actor: 'Juan dela Cruz',  action: 'Awaiting approval',      status: 'current'  as const, timestamp: `Jul 29, ${YEAR} · 09:13 AM` },
  { id: 't4', actor: 'VP of HR',        action: 'Final endorsement',      status: 'pending'  as const },
];

function ApprovalDetailLayout() {
  const [action, setAction] = useState<'idle' | 'approve' | 'reject'>('idle');
  const [note, setNote] = useState('');

  return (
    <div className="space-y-3">
      {/* Back nav */}
      <div className="flex items-center gap-3">
        <button type="button" className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-[#00377B] transition-colors">
          <ArrowLeft size={14} /> Back to List
        </button>
        <span className="font-mono text-[11px] text-slate-400">LR-2025-0419</span>
      </div>

      {/* Stepper */}
      <div className="bg-white border border-slate-200 rounded-xl px-6 pt-5 pb-4 shadow-sm">
        <Stepper
          steps={APPROVAL_STEPS as unknown as import('../stepper/Stepper').StepDef[]}
          currentStep="3"
          completedSteps={['1', '2']}
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Request details (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Request summary card */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-[#00377B] flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FileCheck size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-white">Vacation Leave Request</p>
                <p className="text-[10px] text-white/60 font-mono">LR-2025-0419 · Filed Jul 29, {YEAR}</p>
              </div>
              <span className={`ml-auto px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${STATUS_STYLE['Pending']}`}>
                Pending
              </span>
            </div>
            {/* Fields */}
            <div className="p-5 grid grid-cols-2 gap-x-6 gap-y-4">
              {[
                ['Employee',   'Maria Santos · DL-0001'],
                ['Department', 'Finance'],
                ['Leave Type', 'Vacation Leave'],
                ['Period',     `Aug 4–8, ${YEAR}`],
                ['Days',       '5 working days'],
                ['Approver',   'Juan dela Cruz, HR Manager'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
              <div className="col-span-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Reason</p>
                <p className="text-sm text-slate-700 leading-relaxed">Annual family vacation. Handover to Jose Reyes has been arranged.</p>
              </div>
            </div>
            {/* Attachment */}
            <div className="px-5 pb-4 flex items-center gap-2 text-[11px] font-bold text-[#034EA2]">
              <Paperclip size={12} />
              <span>medical_certificate.pdf</span>
            </div>
          </div>

          {/* Approver action card */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 space-y-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Approver Action</p>

            {action === 'idle' && (
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setAction('approve')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-black uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-sm">
                  <CheckCircle2 size={15} /> Approve
                </button>
                <button type="button" onClick={() => setAction('reject')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white rounded-lg text-sm font-black uppercase tracking-wider hover:bg-rose-700 transition-all shadow-sm">
                  <XCircle size={15} /> Reject
                </button>
                <button type="button"
                  className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-black uppercase tracking-wider hover:bg-slate-50 transition-all">
                  <MessageSquare size={15} /> Request Info
                </button>
              </div>
            )}

            {action !== 'idle' && (
              <div className={`rounded-xl border p-4 space-y-3 ${action === 'approve' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                <div className="flex items-center gap-2">
                  {action === 'approve' ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-rose-600" />}
                  <p className={`text-sm font-black uppercase tracking-wider ${action === 'approve' ? 'text-emerald-800' : 'text-rose-800'}`}>
                    {action === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
                  </p>
                </div>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder={action === 'approve' ? 'Optional note to employee...' : 'Required: reason for rejection...'}
                  rows={2}
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#00377B]/20 bg-white"
                />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setAction('idle')}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-white transition-all">
                    Cancel
                  </button>
                  <button type="button"
                    className={`px-5 py-2 text-white rounded-lg text-xs font-black uppercase tracking-wider shadow-sm transition-all ${action === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'}`}>
                    {action === 'approve' ? 'Confirm & Approve' : 'Confirm & Reject'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Approval timeline (1/3) */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Approval Chain</p>
            <ApprovalTimeline
              steps={DETAIL_TIMELINE}
              aria-label="Approval chain for LR-2025-0419"
            />
          </div>
          {/* Request meta */}
          <div className="bg-[#EEF3FB] border border-[#C7D8F0] rounded-xl p-4 space-y-2">
            <p className="text-[10px] font-black text-[#00377B] uppercase tracking-widest mb-2">Policy</p>
            {[
              ['Leave Balance (VL)', '12 days remaining'],
              ['Min. Notice Period',  '3 days ✓'],
              ['Auto-Expire',        '5 days from filing'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">{label}</span>
                <span className="text-[11px] font-bold text-[#00377B]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SECTION 4: Employee Filing Form ──────────────────────────────────────────

function EmployeeFilingForm() {
  const [leaveType, setLeaveType] = useState('Vacation Leave');
  const [startDate, setStartDate] = useState(`${YEAR}-08-04`);
  const [endDate, setEndDate] = useState(`${YEAR}-08-08`);
  const [reason, setReason] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Form */}
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-[#00377B] flex items-center gap-3">
          <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center">
            <Plus size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-black text-white">File a Leave Request</p>
            <p className="text-[10px] text-white/60">Complete all required fields before submitting.</p>
          </div>
        </div>
        <div className="p-5 space-y-4">
          {/* Leave type */}
          <div>
            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Leave Type <span className="text-rose-500">*</span></label>
            <select
              value={leaveType}
              onChange={e => setLeaveType(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#00377B]/20 focus:border-[#00377B]"
            >
              {['Vacation Leave', 'Sick Leave', 'Emergency Leave', 'Solo Parent Leave', 'VAWC Leave'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Start Date <span className="text-rose-500">*</span></label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#00377B]/20 focus:border-[#00377B]" />
            </div>
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">End Date <span className="text-rose-500">*</span></label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#00377B]/20 focus:border-[#00377B]" />
            </div>
          </div>
          {/* Reason */}
          <div>
            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Reason <span className="text-rose-500">*</span></label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={3}
              placeholder="Describe the reason for your leave..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#00377B]/20 focus:border-[#00377B] placeholder-slate-400"
            />
          </div>
          {/* Attachment */}
          <div>
            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Attachment (optional)</label>
            <div className="flex items-center gap-2 border border-dashed border-slate-300 rounded-lg px-4 py-3 hover:border-[#00377B]/40 transition-colors cursor-pointer">
              <Paperclip size={14} className="text-slate-400" />
              <span className="text-sm text-slate-400">Click to upload or drag & drop</span>
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button type="button" className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-black uppercase tracking-wider hover:bg-slate-50 transition-all">
              Save Draft
            </button>
            <button type="button" className="flex items-center gap-2 px-6 py-2.5 bg-[#00377B] text-white rounded-lg text-sm font-black uppercase tracking-wider hover:bg-[#034EA2] transition-all shadow-sm">
              <FileCheck size={15} /> Submit Request
            </button>
          </div>
        </div>
      </div>

      {/* Leave balance sidebar */}
      <div className="space-y-3">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Leave Balance</p>
          {[
            { type: 'Vacation Leave', total: 15, used: 3,  color: 'bg-[#034EA2]' },
            { type: 'Sick Leave',     total: 12, used: 0,  color: 'bg-emerald-500' },
            { type: 'Emergency',      total: 3,  used: 1,  color: 'bg-amber-500' },
          ].map(lb => {
            const pct = Math.round((lb.used / lb.total) * 100);
            return (
              <div key={lb.type} className="mb-3 last:mb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-700">{lb.type}</span>
                  <span className="text-[11px] font-mono font-bold text-slate-500">{lb.total - lb.used}/{lb.total}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${lb.color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-2.5">
          <AlertCircle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
            Requests must be filed at least <strong>3 working days</strong> before the start date. Auto-expires after 5 days if not actioned.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Code strings ──────────────────────────────────────────────────────────────

const CODE = {
  list: `// Approval list — checkbox table + contextual action bar
<table className="w-full text-left">
  <thead>
    <tr className="border-b-2 border-[#00377B] bg-[#00377B]">
      <th className="px-4 py-3 w-10">
        {/* Select-all checkbox */}
      </th>
      {columns.map(h => (
        <th key={h} className="px-4 py-3 text-[10px] font-black text-white/80 uppercase tracking-widest">
          {h}
        </th>
      ))}
    </tr>
  </thead>
  <tbody className="divide-y divide-slate-100">
    {requests.map(req => (
      <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
        <td className="px-4 py-3.5">
          {/* Row checkbox */}
        </td>
        <td className="px-4 py-3.5">
          <span className="font-mono text-[11px] text-[#034EA2] font-bold">{req.refNo}</span>
        </td>
        <td className="px-4 py-3.5">
          {/* Status pill */}
          <span className={statusStyle[req.status]}>
            <span className={statusDot[req.status]} />
            {req.status}
          </span>
        </td>
        <td className="px-4 py-3.5">
          {req.status === 'Pending' && (
            <div className="flex items-center gap-1">
              <button aria-label="Approve" className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <Check size={13} strokeWidth={2.5} />
              </button>
              <button aria-label="Reject" className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                <X size={13} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>`,

  stepper: `import { Stepper } from '@diwauhris/ui';

const steps = [
  { id: '1', label: 'Filed',      description: 'Request submitted'   },
  { id: '2', label: 'Verified',   description: 'HR records checked'  },
  { id: '3', label: 'For Review', description: 'Awaiting approver'   },
  { id: '4', label: 'Approved',   description: 'Decision recorded'   },
  { id: '5', label: 'Released',   description: 'Notified & finalized'},
];

<Stepper
  steps={steps}
  currentStep="3"          // id of the active step
  completedSteps={['1','2']}
/>`,

  detail: `// Two-column detail layout: left = request info (2/3), right = timeline (1/3)
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  {/* Request details card */}
  <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm">
    {/* Navy header strip with status badge */}
    <div className="px-5 py-4 bg-[#00377B] flex items-center gap-3">
      <FileCheck size={18} className="text-white" />
      <p className="text-sm font-black text-white">Vacation Leave Request</p>
      <StatusBadge tone="warning" className="ml-auto">Pending</StatusBadge>
    </div>
    {/* Field grid */}
    <div className="p-5 grid grid-cols-2 gap-4">
      <DescriptionItem label="Employee"   value="Maria Santos · DL-0001" />
      <DescriptionItem label="Department" value="Finance" />
      <DescriptionItem label="Period"     value="Aug 4–8, 2025" />
      <DescriptionItem label="Days"       value="5 working days" />
    </div>
    {/* Approve / Reject action bar */}
    <div className="px-5 pb-5 flex items-center gap-3">
      <Button variant="primary" onClick={onApprove}>Approve</Button>
      <Button variant="danger"  onClick={onReject}>Reject</Button>
    </div>
  </div>

  {/* Approval chain timeline */}
  <div className="bg-white border border-slate-200 rounded-xl p-5">
    <ApprovalTimeline steps={timelineSteps} aria-label="Approval chain" />
  </div>
</div>`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ApprovalRequestPage() {
  return (
    <GalleryLayout activeId="approval-request">
      <title>Approval Request — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Enterprise"
          name="Approval Request"
          description="Four layout samples for the full UHRIS approval workflow: the approval list table with status badges and bulk actions, the horizontal approval stepper, the two-column approval detail page with timeline, and the employee leave request filing form."
          status="complete"
          importName={false}
        />

        {/* ── 2. Overview ───────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="The four layouts that form the complete approval workflow. Each is shown as a live interactive sample below."
        >
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="grid grid-cols-2 gap-4 w-full">
              {[
                { icon: FileCheck,    label: 'Approval List',   desc: 'Table with status badges + bulk actions' },
                { icon: CheckCircle2, label: 'Stepper',         desc: 'Horizontal progress indicator' },
                { icon: FileText,     label: 'Detail Layout',   desc: 'Two-column request + timeline' },
                { icon: Plus,         label: 'Filing Form',     desc: 'Employee request submission' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 border border-slate-200 rounded-xl p-4 bg-white">
                    <div className="w-9 h-9 bg-[#EEF3FB] flex items-center justify-center rounded-lg flex-shrink-0">
                      <Icon size={16} className="text-[#00377B]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.label}</p>
                      <p className="text-[11px] text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── 3. Approval List ──────────────────────────────────────────── */}
        <GallerySection
          id="approval-list"
          title="Approval List"
          description="Table of all pending and historical approval requests. Brand-navy header row, checkbox bulk selection, contextual Approve/Reject action bar when rows are selected. Status pills use color + text + dot."
        >
          <Showcase
            title="Approval management table"
            description="Click checkboxes to trigger the contextual action bar. Quick Approve/Reject icons on Pending rows."
            code={CODE.list}
            tone="white"
            center={false}
          >
            <div className="w-full"><ApprovalList /></div>
          </Showcase>
        </GallerySection>

        {/* ── 4. Approval Stepper ───────────────────────────────────────── */}
        <GallerySection
          id="approval-stepper"
          title="Approval Stepper"
          description="The Stepper component configured for the 5-step UHRIS approval chain: Filed → Verified → For Review → Approved → Released. Click step buttons below to see all states."
        >
          <Showcase
            title="Approval chain stepper"
            description="Uses the Stepper component. Click the step buttons to advance the active step."
            code={CODE.stepper}
            tone="white"
            center={false}
          >
            <div className="w-full"><ApprovalStepperDemo /></div>
          </Showcase>
        </GallerySection>

        {/* ── 5. Approval Detail ────────────────────────────────────────── */}
        <GallerySection
          id="approval-detail"
          title="Approval Detail Layout"
          description="The full two-column approval detail page. Left: stepper, request details, and approver action (Approve / Reject with confirm step). Right: approval chain timeline + policy summary."
        >
          <Showcase
            title="Approval detail — two-column layout"
            description="Click Approve or Reject to see the confirmation inline form. Timeline uses the ApprovalTimeline component."
            code={CODE.detail}
            tone="white"
            center={false}
          >
            <div className="w-full"><ApprovalDetailLayout /></div>
          </Showcase>
        </GallerySection>

        {/* ── 6. Employee Filing Form ───────────────────────────────────── */}
        <GallerySection
          id="filing-form"
          title="Employee Filing Form"
          description="The employee-facing leave request form. Leave type dropdown, date range, reason textarea, optional attachment. Leave balance sidebar with usage bars and policy notice."
        >
          <Showcase
            title="Leave request filing form"
            description="Fully interactive — change leave type, dates, and reason. Balance sidebar updates per selection."
            code={`// Employee filing form — two-column: form (2/3) + balance sidebar (1/3)
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl">
    {/* Navy form header */}
    <div className="px-5 py-4 bg-[#00377B]">
      <p className="text-sm font-black text-white">File a Leave Request</p>
    </div>
    {/* Form fields */}
    <div className="p-5 space-y-4">
      <Select label="Leave Type" options={leaveTypes} required />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Start Date" type="date" required />
        <Input label="End Date"   type="date" required />
      </div>
      <Textarea label="Reason" rows={3} required />
      {/* File upload dropzone */}
      <div className="border border-dashed border-slate-300 rounded-lg px-4 py-3">
        <Paperclip size={14} className="text-slate-400" />
        <span className="text-sm text-slate-400">Click to upload</span>
      </div>
      <div className="flex items-center justify-between">
        <Button variant="outline">Save Draft</Button>
        <Button variant="primary">Submit Request</Button>
      </div>
    </div>
  </div>

  {/* Leave balance sidebar */}
  <div className="space-y-3">
    <LeaveBalance balances={employeeBalances} />
    <PolicyNotice>Min. 3 days notice · Auto-expires after 5 days</PolicyNotice>
  </div>
</div>`}
            tone="white"
            center={false}
          >
            <div className="w-full"><EmployeeFilingForm /></div>
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
