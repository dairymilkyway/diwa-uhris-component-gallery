/**
 * TemplateSamplesPage — Gallery (Enterprise)
 *
 * Showcases the four HRIS document templates: PAF, Timekeeping Record,
 * Payslip, and Report. Architecture follows the canonical ButtonPage pattern:
 *
 *   Header → Overview (tab switcher, no code) → per-template Showcase sections
 *   → Usage Notes → Related
 *
 * Templates are self-contained — no external context deps.
 * Each is rendered at scale(0.52) inside a fixed viewport so the full
 * 816px / A4 document fits cleanly inside the gallery content column.
 */

import { useState } from 'react';
import { FileText, Clock, CreditCard, BarChart2, Printer, Download } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';
import { PafTemplate } from './templates/PafTemplate';
import { TimekeepingTemplate } from './templates/TimekeepingTemplate';
import { PayslipTemplate } from './templates/PayslipTemplate';
import { ReportTemplate } from './templates/ReportTemplate';

const RELATED = getRelatedComponents(['payroll-summary', 'approval-timeline', 'table', 'panel']);

// ── Mock data ─────────────────────────────────────────────────────────────────

const PAF_DATA = {
  id: 'PAF-2025-0042',
  type: 'Promotion',
  date: '2025-07-15',
  effectiveDate: '2025-08-01',
  fromTemplate: 'Staff Level 2 — Standard',
  toTemplate: 'Senior Staff Level 1 — Standard',
  employee: {
    name: 'Maria Santos',
    idNo: 'DL-0001',
    position: 'Accountant II',
    department: 'Finance',
    dateHired: '2021-01-15',
  },
  from: {
    rank: 'Staff',
    status: 'Regular',
    position: 'Accountant II',
    department: 'Finance',
    company: 'DIWA Learning Systems, Inc.',
    supervisor: 'J. Reyes',
    departmentHead: 'C. Mendoza',
    basicSalary: '22,000.00',
  },
  to: {
    rank: 'Senior Staff',
    status: 'Regular',
    position: 'Senior Accountant',
    department: 'Finance',
    company: 'DIWA Learning Systems, Inc.',
    supervisor: 'J. Reyes',
    departmentHead: 'C. Mendoza',
    basicSalary: '26,500.00',
  },
  reason: 'Employee has consistently exceeded performance targets for three consecutive review periods, demonstrating leadership capability and readiness for senior responsibilities.',
  preparedBy: 'HR Manager',
  preparedByTitle: 'HRMD Supervisor',
  approvedBy: 'VP of Human Resources',
  approvedByTitle: 'Vice President for HRMD',
  salaryComponents: [
    { label: 'Basic Salary', from: '22,000.00', to: '26,500.00' },
    { label: 'Cola', from: '1,000.00', to: '1,500.00' },
    { label: 'Communication', from: '500.00', to: '800.00' },
  ],
};

const TK_DATA = {
  employee: {
    name: 'Maria Santos',
    role: 'Senior Accountant',
    department: 'Finance',
    empId: 'DL-0001',
    supervisor: 'J. Reyes',
  },
  period: 'Jan 16 – Jan 31, 2025',
};

const PAYSLIP_DATA = {
  id: 'DL-0001',
  name: 'Maria Santos',
  role: 'Senior Accountant',
  department: 'Finance',
  payPeriod: 'Jan 16 – Jan 31, 2025',
  taxCode: 'ME1',
  taxableGross: 13250.00,
  nonTaxableGross: 750.00,
  ytd: { gross: 119250.00, tax: 14310.00 },
  leaveBalances: {
    vacation: { remaining: 8 },
    sick: { remaining: 12 },
    personal: { remaining: 3 },
  },
};

const REPORT_DATA = {
  title: 'Employee Masterlist Report',
  subtitle: 'All Active Employees — Direct Labor',
  company: 'DIWA Learning Systems, Inc.',
  preparedBy: 'HR Department',
};

// ── Scale viewport wrapper ────────────────────────────────────────────────────
// Renders the 816px template at ~55% scale inside a ~450px tall clipped window.
// The outer div is sized so the gallery card doesn't stretch horizontally.

interface ScaledViewportProps {
  height?: number;
  scale?: number;
  children: React.ReactNode;
  accentColor?: string;
}

function ScaledViewport({
  height = 460,
  scale = 0.52,
  children,
  accentColor = '#00377B',
}: ScaledViewportProps) {
  const scaledH = height / scale;

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white"
      style={{ height }}
    >
      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ background: accentColor }} aria-hidden="true" />

      {/* Scrollable interior */}
      <div className="absolute inset-0 overflow-hidden" style={{ top: 3 }}>
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${100 / scale}%`,
            minHeight: `${scaledH}px`,
          }}
        >
          {children}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, white)' }}
        aria-hidden="true"
      />
    </div>
  );
}

// ── Tab switcher ──────────────────────────────────────────────────────────────

const TABS = [
  { id: 'paf',         label: 'PAF',               icon: FileText,   accent: '#00377B', accentLight: '#EEF3FB' },
  { id: 'timekeeping', label: 'Timekeeping Record', icon: Clock,      accent: '#374151', accentLight: '#F1F5F9' },
  { id: 'payslip',     label: 'Payslip',            icon: CreditCard, accent: '#4338CA', accentLight: '#EEF2FF' },
  { id: 'report',      label: 'Report',             icon: BarChart2,  accent: '#065F46', accentLight: '#ECFDF5' },
] as const;

type TabId = typeof TABS[number]['id'];

// ── Code strings ──────────────────────────────────────────────────────────────

const CODE = {
  paf: `import { PafTemplate } from '@diwauhris/ui';

const data = {
  id: 'PAF-2025-0042',
  type: 'Promotion',
  date: '2025-07-15',
  effectiveDate: '2025-08-01',
  fromTemplate: 'Staff Level 2 — Standard',
  toTemplate: 'Senior Staff Level 1 — Standard',
  employee: {
    name: 'Maria Santos',
    idNo: 'DL-0001',
    position: 'Accountant II',
    department: 'Finance',
    dateHired: '2021-01-15',
  },
  from: {
    rank: 'Staff', status: 'Regular',
    position: 'Accountant II', department: 'Finance',
    company: 'DIWA Learning Systems, Inc.',
    supervisor: 'J. Reyes', departmentHead: 'C. Mendoza',
    basicSalary: '22,000.00',
  },
  to: {
    rank: 'Senior Staff', status: 'Regular',
    position: 'Senior Accountant', department: 'Finance',
    company: 'DIWA Learning Systems, Inc.',
    supervisor: 'J. Reyes', departmentHead: 'C. Mendoza',
    basicSalary: '26,500.00',
  },
  reason: 'Employee has consistently exceeded performance targets...',
  preparedBy: 'HR Manager',
  salaryComponents: [
    { label: 'Basic Salary', from: '22,000.00', to: '26,500.00' },
    { label: 'Cola',         from: '1,000.00',  to: '1,500.00' },
  ],
};

// For printing
const handlePrint = () => {
  const el = document.getElementById('printable-paf');
  if (!el) return;
  const win = window.open('', '_blank');
  win?.document.write(\`
    <html><head><title>PAF</title>
    <link rel="stylesheet" href="/styles.css" />
    </head><body>\${el.outerHTML}</body></html>
  \`);
  win?.print();
};

<PafTemplate data={data} />`,

  timekeeping: `import { TimekeepingTemplate } from '@diwauhris/ui';

const data = {
  employee: {
    name: 'Maria Santos',
    role: 'Senior Accountant',
    department: 'Finance',
    empId: 'DL-0001',
    supervisor: 'J. Reyes',
  },
  period: 'Jan 16 – Jan 31, 2025',
};

<TimekeepingTemplate data={data} />`,

  payslip: `import { PayslipTemplate } from '@diwauhris/ui';

const data = {
  id: 'DL-0001',
  name: 'Maria Santos',
  role: 'Senior Accountant',
  department: 'Finance',
  payPeriod: 'Jan 16 – Jan 31, 2025',
  taxCode: 'ME1',
  taxableGross: 13250.00,
  nonTaxableGross: 750.00,
  ytd: { gross: 119250.00, tax: 14310.00 },
  leaveBalances: {
    vacation: { remaining: 8 },
    sick: { remaining: 12 },
    personal: { remaining: 3 },
  },
};

<PayslipTemplate data={data} />`,

  report: `import { ReportTemplate } from '@diwauhris/ui';

const data = {
  title: 'Employee Masterlist Report',
  subtitle: 'All Active Employees — Direct Labor',
  company: 'DIWA Learning Systems, Inc.',
  preparedBy: 'HR Department',
};

<ReportTemplate data={data} />`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TemplateSamplesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('paf');
  const activeTabDef = TABS.find(t => t.id === activeTab)!;

  return (
    <GalleryLayout activeId="template-samples">
      <title>Template Samples — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Enterprise"
          name="Template Samples"
          description="Four print-ready document templates: PAF, Timekeeping Record, Payslip, and Masterlist Report. Import from @diwauhris/ui, pass your data, render or print."
          status="complete"
          importName="PafTemplate, PayslipTemplate, TimekeepingTemplate, ReportTemplate"
        />

        {/* ── 2. Overview — tab switcher, no code ───────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Switch between templates to preview each document at a glance. All four are rendered live with mock data."
        >
          {/* Tab bar */}
          <div
            className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm"
            role="tablist"
            aria-label="Document templates"
          >
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tab-panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
                  ].join(' ')}
                  style={isActive ? { background: tab.accent } : undefined}
                >
                  <Icon size={15} aria-hidden="true" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Preview panel */}
          <div
            id={`tab-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="mt-2"
          >
            {/* Document type label */}
            <div
              className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold"
              style={{ background: activeTabDef.accentLight, color: activeTabDef.accent }}
            >
              <activeTabDef.icon size={12} aria-hidden="true" />
              {activeTabDef.label} — Live Preview (scaled to fit)
            </div>

            {activeTab === 'paf' && (
              <ScaledViewport accentColor={activeTabDef.accent}>
                <PafTemplate data={PAF_DATA} />
              </ScaledViewport>
            )}
            {activeTab === 'timekeeping' && (
              <ScaledViewport accentColor={activeTabDef.accent} scale={0.48} height={420}>
                <TimekeepingTemplate data={TK_DATA} />
              </ScaledViewport>
            )}
            {activeTab === 'payslip' && (
              <ScaledViewport accentColor={activeTabDef.accent} scale={0.55} height={380}>
                <PayslipTemplate data={PAYSLIP_DATA} />
              </ScaledViewport>
            )}
            {activeTab === 'report' && (
              <ScaledViewport accentColor={activeTabDef.accent} scale={0.52} height={500}>
                <ReportTemplate data={REPORT_DATA} />
              </ScaledViewport>
            )}
          </div>
        </GallerySection>

        {/* ── 3. PAF ────────────────────────────────────────────────────── */}
        <GallerySection
          id="paf"
          title="Personnel Action Form (PAF)"
          description="A formal HR document recording position and salary changes — promotions, transfers, adjustments. Includes employee data, change details table, salary breakdown, reason text, and signature block."
        >
          <Showcase
            title="PAF template"
            description="US Letter portrait (816px). Import from @diwauhris/ui, pass your data object, call window.print() for output."
            code={CODE.paf}
            tone="white"
            center={false}
          >
            <div className="w-full">
              {/* Accent badge */}
              <div className="mb-3 flex items-center gap-2 rounded-lg bg-[#EEF3FB] px-3 py-2 text-xs font-bold text-[#00377B]">
                <FileText size={12} aria-hidden="true" />
                PAF — Personnel Action Form
              </div>
              <ScaledViewport accentColor="#00377B" height={520}>
                <PafTemplate data={PAF_DATA} />
              </ScaledViewport>
            </div>
          </Showcase>

          {/* Anatomy breakdown */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-700">Document anatomy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['Employee Data', 'Name, ID, date hired, date prepared'],
                ['Position/Salary Details', 'FROM/TO table: rank, status, position, department, supervisor, company'],
                ['Reason for Adjustment', 'Effectivity date + salary component comparison table with totals'],
                ['Reason for Change', 'Free-text narrative field'],
                ['Authorized Signatories', 'Prepared By, Verified By, Conforme (employee) + approver chain'],
              ].map(([section, desc]) => (
                <div key={section} className="flex items-start gap-3 rounded-lg bg-slate-50 px-4 py-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#00377B]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">{section}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GallerySection>

        {/* ── 4. Timekeeping ────────────────────────────────────────────── */}
        <GallerySection
          id="timekeeping"
          title="Timekeeping Record"
          description="A per-cutoff timesheet showing daily IN/OUT entries, hour computations, tardiness, overtime, and end-of-period leave balance summary."
        >
          <Showcase
            title="Timekeeping Record template"
            description="A3 landscape (297mm). Print in landscape mode. Pass the employee object and period string."
            code={CODE.timekeeping}
            tone="white"
            center={false}
          >
            <div className="w-full">
              <div className="mb-3 flex items-center gap-2 rounded-lg bg-[#F1F5F9] px-3 py-2 text-xs font-bold text-slate-700">
                <Clock size={12} aria-hidden="true" />
                Timekeeping Record — TimeSheet
              </div>
              <ScaledViewport accentColor="#374151" scale={0.46} height={440}>
                <TimekeepingTemplate data={TK_DATA} />
              </ScaledViewport>
            </div>
          </Showcase>

          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-700">Document anatomy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['Header', 'Employee ID, name, position, department, supervisor, period, page number'],
                ['Daily Log Table', 'Date, day, shift, time-in, time-out, hours, actual, late, undertime, OT, ND2, remarks'],
                ['Totals Row', 'Aggregate hours: worked, absent, tardiness, OT, ND'],
                ['Certification', 'Employee declaration + signature lines'],
                ['HRD Summary', 'Days worked, absences, tardiness, OT summary breakdown, leave balances'],
              ].map(([section, desc]) => (
                <div key={section} className="flex items-start gap-3 rounded-lg bg-slate-50 px-4 py-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-slate-500" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">{section}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GallerySection>

        {/* ── 5. Payslip ────────────────────────────────────────────────── */}
        <GallerySection
          id="payslip"
          title="Payslip"
          description="A compact payroll stub showing earnings, deductions, attendance log, net pay, year-to-date figures, and leave balances for a single cutoff period."
        >
          <Showcase
            title="Payslip template"
            description="900px wide, single-fold format. Monospace figures for auditability. Pass employee + pay period data."
            code={CODE.payslip}
            tone="white"
            center={false}
          >
            <div className="w-full">
              <div className="mb-3 flex items-center gap-2 rounded-lg bg-[#EEF2FF] px-3 py-2 text-xs font-bold text-indigo-700">
                <CreditCard size={12} aria-hidden="true" />
                Payslip — Pay Period Stub
              </div>
              <ScaledViewport accentColor="#4338CA" scale={0.57} height={360}>
                <PayslipTemplate data={PAYSLIP_DATA} />
              </ScaledViewport>
            </div>
          </Showcase>

          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-700">Document anatomy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['Identity Block', 'Employee ID, name, role, department, pay period, date printed'],
                ['Rate Summary', 'Hourly / daily / monthly rates and tax code (top-right)'],
                ['Earnings Column', 'Basic salary, holiday pay, absences deduction, gross breakdown (taxable / non-taxable)'],
                ['Deductions Column', 'W-Tax, Pag-Ibig, HMO, insurance, COOP, loans with remaining balances'],
                ['Attendance Log', '15-day IN/OUT grid split into two columns — handles holidays, leaves, OT notes'],
                ['Net Pay & YTD', 'Total gross, total deductions, net pay, year-to-date gross & tax, leave balances'],
              ].map(([section, desc]) => (
                <div key={section} className="flex items-start gap-3 rounded-lg bg-slate-50 px-4 py-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-indigo-400" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">{section}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GallerySection>

        {/* ── 6. Report ─────────────────────────────────────────────────── */}
        <GallerySection
          id="report"
          title="Report (Masterlist)"
          description="A tabular HR report with a branded header, summary stat strip, full-width data table with alternating rows, totals footer, and signature block. Used for masterlist, DOLE, PEZA, alumni, and other generated reports."
        >
          <Showcase
            title="Report template"
            description="US Letter portrait (816px). Navy header row, alternating row shading. Pass title, subtitle, company, and preparedBy."
            code={CODE.report}
            tone="white"
            center={false}
          >
            <div className="w-full">
              <div className="mb-3 flex items-center gap-2 rounded-lg bg-[#ECFDF5] px-3 py-2 text-xs font-bold text-emerald-700">
                <BarChart2 size={12} aria-hidden="true" />
                Report — Masterlist / Tabular Report
              </div>
              <ScaledViewport accentColor="#065F46" scale={0.52} height={500}>
                <ReportTemplate data={REPORT_DATA} />
              </ScaledViewport>
            </div>
          </Showcase>

          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-700">Document anatomy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['Report Header', 'Company name, report title, subtitle, as-of date, date printed, page, prepared-by'],
                ['Summary Strip', 'Quick-stat boxes: total employees, regular, probationary, department count'],
                ['Data Table', 'Navy branded header row, alternating white/slate rows, status badges'],
                ['Totals Footer', 'Total monthly cost computed from all rate values'],
                ['Signature Block', 'Prepared-by and Noted-by signature lines'],
              ].map(([section, desc]) => (
                <div key={section} className="flex items-start gap-3 rounded-lg bg-slate-50 px-4 py-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">{section}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GallerySection>

        {/* ── 7. Usage Notes ────────────────────────────────────────────── */}
        <GallerySection
          id="usage"
          title="Usage Notes"
          description="Patterns for embedding, printing, and exporting these templates in production."
        >
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">

            {/* Print pattern */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Printer size={14} className="text-slate-500" aria-hidden="true" />
                <h3 className="text-sm font-bold text-slate-700">Print via window.print()</h3>
              </div>
              <p className="text-sm text-slate-500 mb-3">
                Open the document in a new tab and call <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono text-slate-800">window.print()</code>.
                Tailor with <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono text-slate-800">@media print</code> to strip navigation and page-level UI.
              </p>
              <pre className="rounded-lg bg-slate-900 px-5 py-4 overflow-x-auto">
                <code className="font-mono text-sm antialiased text-slate-300 whitespace-pre leading-relaxed bg-transparent">{`// Open in new tab, inject template, print
const handlePrint = (templateHtmlId: string) => {
  const el = document.getElementById(templateHtmlId);
  if (!el) return;
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(\`<!DOCTYPE html>
    <html><head>
      <title>Document</title>
      <link rel="stylesheet" href="/assets/ui.css" />
      <style>@page { margin: 0; } body { margin: 0; }</style>
    </head><body>\${el.outerHTML}</body></html>\`);
  win.document.close();
  win.print();
};`}</code>
              </pre>
            </div>

            {/* Export pattern */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Download size={14} className="text-slate-500" aria-hidden="true" />
                <h3 className="text-sm font-bold text-slate-700">Export to PDF (jsPDF)</h3>
              </div>
              <p className="text-sm text-slate-500 mb-3">
                Use <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono text-slate-800">html2canvas</code> + <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono text-slate-800">jsPDF</code> to capture the rendered DOM node.
                Render the template at full scale off-screen, then capture.
              </p>
              <pre className="rounded-lg bg-slate-900 px-5 py-4 overflow-x-auto">
                <code className="font-mono text-sm antialiased text-slate-300 whitespace-pre leading-relaxed bg-transparent">{`import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const exportToPdf = async (templateHtmlId: string, filename = 'document.pdf') => {
  const el = document.getElementById(templateHtmlId);
  if (!el) return;

  const canvas = await html2canvas(el, { scale: 2, useCORS: true });
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
  const imgData = canvas.toDataURL('image/png');
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = (canvas.height * pageW) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pageW, pageH);
  pdf.save(filename);
};`}</code>
              </pre>
            </div>

            {/* Do / Don't */}
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-3">Do / Don't</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Do</p>
                  {[
                    'Render at full size (816px / A3) for print — use CSS scale only for preview.',
                    'Pass real employee data from the backend; mock data is for gallery only.',
                    'Use CSS transform: scale() when embedding inside modals or drawers — scale down with a fixed wrapper height.',
                    'Mount templates off-screen (opacity-0 / pointer-events-none) for PDF export.',
                  ].map(t => (
                    <p key={t} className="flex items-start gap-2 text-sm text-emerald-800">
                      <span className="mt-1 shrink-0 text-emerald-500" aria-hidden="true">✓</span>
                      {t}
                    </p>
                  ))}
                </div>
                <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-rose-600">Don't</p>
                  {[
                    'Don\'t render templates inside flex/grid containers that constrain width below 816px without scaling.',
                    'Don\'t use these in paginated tables — each template is a full-page document.',
                    'Don\'t skip the authorization signature block on PAF — it\'s legally required.',
                    'Don\'t hardcode rates or salary values; bind them to the live pay structure data.',
                  ].map(t => (
                    <p key={t} className="flex items-start gap-2 text-sm text-rose-800">
                      <span className="mt-1 shrink-0 text-rose-500" aria-hidden="true">✗</span>
                      {t}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GallerySection>

        {/* ── 8. Related ────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
