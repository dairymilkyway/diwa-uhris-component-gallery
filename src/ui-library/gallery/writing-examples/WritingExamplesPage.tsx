/**
 * WritingExamplesPage — Gallery (Foundations)
 *
 * Content source: DIWA Brand Expression guidelines — applied to UHRIS UI
 * Design: DESIGN.md — brand navy #00377B, white surfaces.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';
import { Check, X, AlertTriangle, Info, Clock } from 'lucide-react';

const RELATED = getRelatedComponents(['voice-tone', 'brand-narrative', 'brand-strategy']);

// ── Primitives ────────────────────────────────────────────────────────────────

function ExampleRow({ good, bad }: { good: string; bad: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
        <Check size={13} className="text-emerald-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">Do</p>
          <p className="text-sm text-emerald-900 font-medium">"{good}"</p>
        </div>
      </div>
      <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-lg px-4 py-3">
        <X size={13} className="text-rose-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-0.5">Don't</p>
          <p className="text-sm text-rose-900 font-medium">"{bad}"</p>
        </div>
      </div>
    </div>
  );
}

function SectionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em]">{label}</p>
      {children}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WritingExamplesPage() {
  return (
    <GalleryLayout activeId="writing-examples">
      <title>Writing Examples — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Foundations"
          name="Writing Examples"
          description="Applied writing examples for UHRIS UI — button labels, page headers, empty states, error messages, confirmations, and notifications aligned to the DIWA voice and tone."
          status="complete"
          importName={false}
        />

        {/* ── Button Labels ─────────────────────────────────────────────── */}
        <GallerySection id="buttons" title="Button Labels"
          description="Verb-first, specific, never ambiguous. The user must know exactly what clicking will do.">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <SectionGroup label="Primary actions">
              <ExampleRow good="Submit Leave Request" bad="Submit" />
              <ExampleRow good="Approve" bad="Yes" />
              <ExampleRow good="Save Changes" bad="OK" />
              <ExampleRow good="Generate Payslip" bad="Generate" />
            </SectionGroup>
            <SectionGroup label="Destructive actions">
              <ExampleRow good="Reject Request" bad="No" />
              <ExampleRow good="Delete Employee Record" bad="Delete" />
              <ExampleRow good="Cancel Leave" bad="Cancel" />
            </SectionGroup>
            <SectionGroup label="Secondary actions">
              <ExampleRow good="Export to PDF" bad="Export" />
              <ExampleRow good="View Payslip" bad="Click here" />
              <ExampleRow good="Back to Employee List" bad="Go back" />
            </SectionGroup>
          </div>
        </GallerySection>

        {/* ── Page Headers ──────────────────────────────────────────────── */}
        <GallerySection id="headers" title="Page Headers & Subtitles"
          description="Titles name the thing. Subtitles give one-line context — never repeat the title.">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <SectionGroup label="Page titles">
              <ExampleRow good="Employee Directory" bad="Manage Employees" />
              <ExampleRow good="Leave Management" bad="View and Manage Leaves" />
              <ExampleRow good="Payroll Run — July 16–31, 2025" bad="Payroll" />
            </SectionGroup>
            <SectionGroup label="Subtitles">
              <ExampleRow good="Manage, filter, and track all team members." bad="This page shows all employees." />
              <ExampleRow good="Review and action pending requests." bad="You can view and approve or reject leave requests here." />
            </SectionGroup>
            <SectionGroup label="Live examples">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
                  <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2">✓ Correct</p>
                  <h1 className="text-xl font-black text-slate-900 tracking-tight">Employee Directory</h1>
                  <p className="text-sm text-slate-500 mt-0.5">Manage, filter, and track all team members.</p>
                </div>
                <div className="border border-rose-200 bg-rose-50 rounded-lg p-4">
                  <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-2">✗ Avoid</p>
                  <h1 className="text-xl font-black text-slate-400 line-through tracking-tight">Manage Employees</h1>
                  <p className="text-sm text-slate-400 mt-0.5 line-through">This page shows all employees in the system.</p>
                </div>
              </div>
            </SectionGroup>
          </div>
        </GallerySection>

        {/* ── Empty States ──────────────────────────────────────────────── */}
        <GallerySection id="empty" title="Empty States"
          description="Name what's missing and offer a path forward. Never leave the user in a void.">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <SectionGroup label="Titles">
              <ExampleRow good="No leave requests yet" bad="No records found" />
              <ExampleRow good="Nothing pending your approval" bad="Empty" />
              <ExampleRow good="No employees match your filter" bad="No results" />
            </SectionGroup>
            <SectionGroup label="Hints">
              <ExampleRow good="File your first leave request to get started." bad="There are no items to display." />
              <ExampleRow good="All caught up — no requests are waiting for your action." bad="No data available." />
              <ExampleRow good="Try adjusting your filters or search terms." bad="Please try again." />
            </SectionGroup>
            <SectionGroup label="Live example">
              <div className="border border-slate-200 rounded-xl p-6">
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <div className="w-11 h-11 bg-[#EEF3FB] rounded-xl flex items-center justify-center">
                    <Clock size={22} className="text-[#034EA2]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">No leave requests yet</h3>
                  <p className="text-sm text-slate-500 max-w-xs">Your submitted leave requests will appear here. File a new request to get started.</p>
                  <button type="button" className="mt-1 px-4 py-2 bg-[#034EA2] text-white text-sm font-bold rounded-lg hover:bg-[#00377B] transition-all">
                    File a Leave Request
                  </button>
                </div>
              </div>
            </SectionGroup>
          </div>
        </GallerySection>

        {/* ── Error Messages ────────────────────────────────────────────── */}
        <GallerySection id="errors" title="Error Messages"
          description="Identify the problem clearly and tell the user what to do next. Never blame the user.">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <SectionGroup label="Field-level validation">
              <ExampleRow good="Start date must be at least 3 days from today." bad="Invalid date." />
              <ExampleRow good="Please select a leave type." bad="This field is required." />
              <ExampleRow good="End date cannot be before start date." bad="Error: invalid range." />
            </SectionGroup>
            <SectionGroup label="System errors">
              <ExampleRow good="Could not save your request. Please try again or contact HR." bad="Something went wrong." />
              <ExampleRow good="Your session has expired. Please log in again to continue." bad="401 Unauthorized." />
            </SectionGroup>
            <SectionGroup label="Live example">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
                  <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-3">✓ Correct</p>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Start Date</label>
                    <input readOnly value="Jul 15, 2025" className="w-full border border-rose-400 rounded-lg px-3 py-2 text-sm bg-white" />
                    <p className="text-xs font-bold text-rose-600 flex items-center gap-1">
                      <AlertTriangle size={11} /> Start date must be at least 3 working days from today.
                    </p>
                  </div>
                </div>
                <div className="border border-rose-200 bg-rose-50 rounded-lg p-4">
                  <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-3">✗ Avoid</p>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Start Date</label>
                    <input readOnly value="Jul 15, 2025" className="w-full border border-rose-200 rounded-lg px-3 py-2 text-sm bg-white text-slate-400" />
                    <p className="text-xs text-rose-400 line-through">Invalid date.</p>
                  </div>
                </div>
              </div>
            </SectionGroup>
          </div>
        </GallerySection>

        {/* ── Confirmations ─────────────────────────────────────────────── */}
        <GallerySection id="confirmations" title="Confirmation Dialogs"
          description="Specific title, one-sentence consequence, precise action labels.">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <SectionGroup label="Dialog titles">
              <ExampleRow good="Reject Leave Request" bad="Are you sure?" />
              <ExampleRow good="Delete Employee Record" bad="Confirm Delete" />
            </SectionGroup>
            <SectionGroup label="Body copy">
              <ExampleRow good="This will reject Jose Reyes' Sick Leave (Aug 11–12). The employee will be notified." bad="This action cannot be undone." />
            </SectionGroup>
            <SectionGroup label="Live example">
              <div className="border border-slate-200 rounded-xl p-5 max-w-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 bg-rose-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <X size={16} className="text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Reject Leave Request</h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      This will reject Jose Reyes' Sick Leave (Aug 11–12, 2025). The employee will be notified immediately.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button type="button" className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50">Cancel</button>
                  <button type="button" className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700">Reject Request</button>
                </div>
              </div>
            </SectionGroup>
          </div>
        </GallerySection>

        {/* ── Notifications ─────────────────────────────────────────────── */}
        <GallerySection id="notifications" title="Notifications & Alerts"
          description="Who did what, and what does the reader need to do. Never leave the reader wondering.">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <SectionGroup label="Examples">
              <ExampleRow good="Leave request submitted. Juan dela Cruz will be notified for approval." bad="Success!" />
              <ExampleRow good="Your Sick Leave balance is running low — 1 day remaining." bad="Warning: low balance." />
              <ExampleRow good="Leave request could not be submitted. Your leave balance is insufficient." bad="Request failed." />
            </SectionGroup>
            <SectionGroup label="Live examples">
              <div className="space-y-2">
                {[
                  { icon: <Check size={13} />,         bg: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', text: 'text-emerald-800', msg: 'Leave request submitted. Juan dela Cruz will be notified for approval.' },
                  { icon: <AlertTriangle size={13} />, bg: 'bg-amber-50 border-amber-200',     dot: 'bg-amber-400',   text: 'text-amber-800',   msg: 'Your Sick Leave balance is running low — 1 day remaining for 2025.' },
                  { icon: <X size={13} />,             bg: 'bg-rose-50 border-rose-200',       dot: 'bg-rose-500',    text: 'text-rose-800',    msg: 'Leave request could not be submitted. Your leave balance is insufficient.' },
                  { icon: <Info size={13} />,          bg: 'bg-[#EEF3FB] border-[#C7D8F0]',   dot: 'bg-[#034EA2]',   text: 'text-[#00377B]',   msg: 'Payslip for July 16–31, 2025 is now available. Log in to view and download.' },
                ].map((n, i) => (
                  <div key={i} className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${n.bg}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5 ${n.dot}`}>
                      {n.icon}
                    </div>
                    <p className={`text-sm font-medium ${n.text}`}>{n.msg}</p>
                  </div>
                ))}
              </div>
            </SectionGroup>
          </div>
        </GallerySection>

        {/* ── Form Labels ───────────────────────────────────────────────── */}
        <GallerySection id="forms" title="Form Labels & Helper Text"
          description="Labels name the field. Helper text provides context only when the field name alone is insufficient.">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <SectionGroup label="Field labels">
              <ExampleRow good="Leave Type" bad="Type" />
              <ExampleRow good="Date of Return" bad="Return Date" />
              <ExampleRow good="Supporting Document (optional)" bad="Attachment" />
            </SectionGroup>
            <SectionGroup label="Helper text">
              <ExampleRow good="File at least 3 working days before the start date." bad="This field is required." />
              <ExampleRow good="Accepts PDF, JPG, or PNG. Max 5 MB." bad="Upload a file." />
            </SectionGroup>
            <SectionGroup label="Placeholder text">
              <ExampleRow good="e.g. Aug 4, 2025" bad="Enter date..." />
              <ExampleRow good="Search by name or employee ID" bad="Search..." />
            </SectionGroup>
            <SectionGroup label="Live example">
              <div className="border border-slate-200 rounded-xl p-5 max-w-sm space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Leave Type <span className="text-rose-500">*</span>
                  </label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#034EA2]/20">
                    <option>Vacation Leave</option>
                    <option>Sick Leave</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Start Date <span className="text-rose-500">*</span>
                  </label>
                  <input type="text" placeholder="e.g. Aug 4, 2025" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#034EA2]/20" />
                  <p className="text-[11px] text-slate-400">File at least 3 working days before the start date.</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Supporting Document <span className="text-[11px] text-slate-400 font-medium normal-case tracking-normal">(optional)</span>
                  </label>
                  <div className="border border-dashed border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-400">
                    Click to upload
                  </div>
                  <p className="text-[11px] text-slate-400">Accepts PDF, JPG, or PNG. Max 5 MB.</p>
                </div>
              </div>
            </SectionGroup>
          </div>
        </GallerySection>

        <GallerySection id="related" title="Related">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
