/**
 * EmailNotificationPage — Gallery (Enterprise)
 *
 * Design direction: "Government bond certificate"
 *
 * Premium transactional email that reads like an official printed document —
 * a bank statement, a government bond, a legal notice — not a SaaS notification.
 *
 * Rules that make it NOT feel AI-generated:
 *   1. Zero rounded corners on the card. Sharp edges = official.
 *   2. The event title is CONDENSED WEIGHT-900 at 44px — not a serif headline.
 *      Condensed means it dominates vertically without sprawling.
 *   3. Two-column data layout: small-caps label left, tabular-nums value right.
 *      Like a printed form, not a "receipt table".
 *   4. CTA is a text link with a bottom border — not a pill button or a block.
 *      Official correspondence doesn't have bubble buttons.
 *   5. The header is just a 4px accent band + wordmark. No gradient, no glow,
 *      no icon circle, no radial effects. Chrome is quiet; content speaks.
 *   6. Font stack: Barlow Condensed (already loaded via @fontsource) for the
 *      event title. Georgia for the greeting. Monospace for IDs and amounts.
 *   7. Color is used exactly once in the body: the CTA link.
 *      Everything else is slate/black/white.
 *   8. The payroll email breaks the rule — net pay gets a large treatment, but
 *      it's typographic (condensed mono at 56px), not a "hero card".
 */

import { useState } from 'react';
import {
  CheckCircle2, XCircle, CreditCard, UserCheck, FileCheck,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { CopyCodeBlock } from '../components/CopyCodeBlock';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['template-samples', 'alert', 'toast']);

// ── Data ──────────────────────────────────────────────────────────────────────

const LEAVE_APPROVED_DATA = {
  employeeName: 'Maria Santos', employeeId: 'DL-0001', department: 'Finance',
  leaveType: 'Vacation Leave', startDate: 'August 4, 2025', endDate: 'August 8, 2025',
  days: 5, approvedBy: 'Juan dela Cruz', approverTitle: 'HR Manager',
  approvedOn: 'July 29, 2025', refNo: 'LR-2025-0419',
};
const LEAVE_REJECTED_DATA = {
  employeeName: 'Jose Reyes', employeeId: 'DL-0042', department: 'Operations',
  leaveType: 'Sick Leave', startDate: 'August 11, 2025', endDate: 'August 12, 2025',
  days: 2, rejectedBy: 'Maria Santos', rejectorTitle: 'Department Head',
  reviewedOn: 'July 29, 2025',
  reason: 'Insufficient leave credits. Please check your remaining balance before re-filing.',
  refNo: 'LR-2025-0421',
};
const PAYROLL_DATA = {
  employeeName: 'Ana Reyes', employeeId: 'DL-0078', department: 'Human Resources',
  payPeriod: 'July 16 – July 31, 2025', grossPay: '₱18,750.00',
  totalDeductions: '₱4,550.00', netPay: '₱14,200.00',
  cutoffDate: 'August 5, 2025', refNo: 'PR-2025-0731B',
};
const ACTIVATION_DATA = {
  employeeName: 'Carlo Mendoza', employeeId: 'DL-0112',
  email: 'carlo.mendoza@diwa.edu.ph', tempPassword: '••••••••••••',
  role: 'Payroll Staff', department: 'Finance',
  loginUrl: 'hris.diwa.edu.ph/login', refNo: 'ACC-2025-0112',
};
const PAF_DATA = {
  employeeName: 'Lena Villanueva', employeeId: 'DL-0033', department: 'Academics',
  pafNumber: 'PAF-2025-0087', actionType: 'Salary Adjustment',
  currentPosition: 'Instructor II', effectiveDate: 'August 1, 2025',
  approvedBy: 'VP of Human Resources', approvedOn: 'July 28, 2025',
};

// ── Tabs ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'leave-approved', label: 'Leave Approved', icon: CheckCircle2, accent: '#059669', light: '#ECFDF5' },
  { id: 'leave-rejected', label: 'Leave Rejected', icon: XCircle,      accent: '#DC2626', light: '#FEF2F2' },
  { id: 'payroll',        label: 'Payroll',         icon: CreditCard,   accent: '#1D4ED8', light: '#EFF6FF' },
  { id: 'activation',     label: 'Account Access',  icon: UserCheck,    accent: '#0E7490', light: '#ECFEFF' },
  { id: 'paf-approved',   label: 'PAF Approved',    icon: FileCheck,    accent: '#6D28D9', light: '#F5F3FF' },
] as const;
type TabId = typeof TABS[number]['id'];

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL SHELL
// Paper-white card on a deep navy canvas. NO rounded corners on the card.
// The outer canvas is the only "designed" surface — the card is a document.
// ─────────────────────────────────────────────────────────────────────────────

function EmailCanvas({ children }: { children: React.ReactNode }) {
  // Tight diagonal hatching — the texture of a government security document
  const SECURITY_TEXTURE = `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='8' x2='8' y2='0' stroke='rgba(255,255,255,0.025)' stroke-width='0.5'/%3E%3C/svg%3E")`;
  return (
    <div style={{
      background: '#0A1628',
      backgroundImage: SECURITY_TEXTURE,
      padding: '20px 14px 28px',
      minHeight: '100%',
    }}>
      {/* Client chrome — just a FROM line, nothing else */}
      <div style={{
        maxWidth: 560, margin: '0 auto 8px',
        display: 'flex', alignItems: 'center', gap: 8, padding: '0 2px',
      }}>
        <span style={{ fontFamily: '"Courier New", monospace', fontSize: 9, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.04em' }}>
          FROM:
        </span>
        <span style={{ fontFamily: '"Courier New", monospace', fontSize: 9, color: 'rgba(255,255,255,0.30)', letterSpacing: '0.03em' }}>
          noreply@diwa.edu.ph
        </span>
        <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />
        <span style={{ fontFamily: '"Courier New", monospace', fontSize: 9, color: 'rgba(255,255,255,0.14)' }}>
          {new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {/* Document card — sharp corners, paper white */}
      <div style={{
        maxWidth: 560, margin: '0 auto',
        background: '#FAFAFA',
        boxShadow: '0 1px 3px rgba(0,0,0,0.4), 0 12px 48px rgba(0,0,0,0.55), 0 32px 80px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.04)',
      }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT HEADER
// Thin accent band at top edge. UHRIS in condensed caps. Event title at 44px
// condensed weight-900. Eyebrow in small-caps. REF + date on the bottom row.
// ─────────────────────────────────────────────────────────────────────────────

function DocHeader({
  category,
  title,
  date,
  refNo,
  accent,
}: {
  category: string;
  title: string;
  date: string;
  refNo: string;
  accent: string;
}) {
  return (
    <div style={{ background: '#FAFAFA', borderBottom: '0.5px solid #E2E8F0' }}>
      {/* 4px accent band — the only color in the header */}
      <div style={{ height: 4, background: accent }} />

      <div style={{ padding: '16px 28px 0' }}>
        {/* Top row: UHRIS wordmark left, org name right */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          paddingBottom: 14, borderBottom: '0.5px solid #E2E8F0', marginBottom: 16,
        }}>
          {/* UHRIS in Barlow Condensed — tight, authoritative */}
          <span style={{
            fontFamily: 'Barlow, "Arial Narrow", Arial, sans-serif',
            fontSize: 13, fontWeight: 800,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: '#0F172A',
          }}>
            UHRIS
          </span>
          <span style={{
            fontFamily: '"Courier New", monospace',
            fontSize: 9, color: '#94A3B8', letterSpacing: '0.06em',
          }}>
            AUTOMATED · CONFIDENTIAL
          </span>
        </div>

        {/* Category eyebrow in small-caps */}
        <p style={{
          margin: '0 0 6px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 9.5, fontWeight: 700,
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: accent,
        }}>
          {category}
        </p>

        {/* Event title — condensed, weight 900, the visual anchor */}
        <h1 style={{
          margin: '0 0 18px',
          fontFamily: 'Barlow, "Arial Narrow", Arial, sans-serif',
          fontSize: 44, fontWeight: 900,
          letterSpacing: '-0.02em', lineHeight: 0.95,
          color: '#0F172A',
          textWrap: 'balance',
        } as React.CSSProperties}>
          {title}
        </h1>
      </div>

      {/* REF / DATE strip — sits right on the border like a printed form */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '7px 28px',
        background: '#F1F5F9',
        borderTop: '0.5px solid #E2E8F0',
      }}>
        <span style={{
          fontFamily: '"Courier New", monospace',
          fontSize: 9.5, color: '#475569', letterSpacing: '0.08em',
        }}>
          REF&nbsp;&nbsp;<strong style={{ color: '#0F172A', letterSpacing: '0.06em' }}>{refNo}</strong>
        </span>
        <span style={{ fontFamily: '"Courier New", monospace', fontSize: 9.5, color: '#64748B', letterSpacing: '0.04em' }}>
          {date}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BODY
// ─────────────────────────────────────────────────────────────────────────────

function DocBody({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: '22px 28px 20px', background: '#FFFFFF' }}>{children}</div>;
}

// Serif greeting — only serif element in the document
function Greeting({ name }: { name: string }) {
  return (
    <p style={{
      margin: '0 0 12px',
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: 15, color: '#1E293B', lineHeight: 1.45,
    }}>
      Dear <strong style={{ fontWeight: 700 }}>{name}</strong>,
    </p>
  );
}

// Body paragraph — plain, readable, no decoration
function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      margin: '0 0 20px',
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 13.5, color: '#374151', lineHeight: 1.72,
      maxWidth: '52ch',
    }}>
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TWO-COLUMN FORM TABLE
// Small-caps label left. Tabular-nums value right.
// Hairline rules between rows. No background fills.
// This is what a printed form looks like, not a "card".
// ─────────────────────────────────────────────────────────────────────────────

function FormTable({
  section,
  rows,
  accent,
}: {
  section: string;
  rows: [string, string, boolean?][];
  accent: string;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* Section label with left accent rule */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 2,
        paddingBottom: 5,
        borderBottom: `1.5px solid ${accent}`,
      }}>
        <span style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 8.5, fontWeight: 700,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: accent,
        }}>
          {section}
        </span>
      </div>
      {rows.map(([label, value, mono], i) => (
        <div key={label} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          padding: '7px 0',
          borderBottom: i < rows.length - 1 ? '0.5px solid #F1F5F9' : 'none',
        }}>
          {/* Label in small-caps feel — uppercase tracking at reduced size */}
          <span style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 11, color: '#94A3B8',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontWeight: 500,
            minWidth: 120,
          }}>
            {label}
          </span>
          {/* Value — monospace for IDs/dates, regular for names */}
          <span style={{
            fontFamily: mono
              ? '"Courier New", Courier, monospace'
              : 'Arial, Helvetica, sans-serif',
            fontSize: 12.5,
            fontWeight: 600,
            color: '#0F172A',
            textAlign: 'right',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: mono ? '0.04em' : '0',
          }}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAYROLL AMOUNT — typographic, not a "hero card"
// Big condensed monospace number. No container, no background.
// The number IS the element.
// ─────────────────────────────────────────────────────────────────────────────

function PayAmount({ net, gross, deductions }: { net: string; gross: string; deductions: string }) {
  return (
    <div style={{ marginBottom: 20, paddingBottom: 18, borderBottom: '0.5px solid #E2E8F0' }}>
      <p style={{
        margin: '0 0 2px',
        fontFamily: 'Arial', fontSize: 9, fontWeight: 700,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: '#94A3B8',
      }}>
        Net Pay
      </p>
      {/* The number — condensed, dense, weight 900, no container */}
      <p style={{
        margin: '0 0 10px',
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: 52, fontWeight: 700,
        letterSpacing: '-0.03em', lineHeight: 1,
        color: '#0F172A',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {net}
      </p>
      {/* Gross and deductions as a single terse line */}
      <p style={{
        margin: 0,
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: 11, color: '#64748B', letterSpacing: '0.04em',
        fontVariantNumeric: 'tabular-nums',
      }}>
        GROSS <span style={{ color: '#334155', fontWeight: 700 }}>{gross}</span>
        <span style={{ margin: '0 10px', color: '#CBD5E1' }}>·</span>
        DEDUCTIONS <span style={{ color: '#DC2626', fontWeight: 700 }}>−{deductions}</span>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NOTICE BLOCK — warning or error, left-border accent
// ─────────────────────────────────────────────────────────────────────────────

function NoticeBlock({ tone, label, text }: { tone: 'warning' | 'error'; label: string; text: string }) {
  const s = tone === 'error'
    ? { bg: '#FFF5F5', border: '#FECACA', left: '#DC2626', lc: '#991B1B', tc: '#7F1D1D' }
    : { bg: '#FFFBEB', border: '#FDE68A', left: '#D97706', lc: '#92400E', tc: '#78350F' };
  return (
    <div style={{
      background: s.bg, border: `1px solid ${s.border}`,
      borderLeft: `3px solid ${s.left}`,
      padding: '10px 14px', marginBottom: 20,
    }}>
      <p style={{ margin: '0 0 4px', fontFamily: 'Arial', fontSize: 8.5, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: s.lc }}>{label}</p>
      <p style={{ margin: 0, fontFamily: 'Arial', fontSize: 13, color: s.tc, lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA — text link with bottom border, not a button
// This is the ONE place accent color appears in the body.
// Official correspondence doesn't have pill buttons.
// ─────────────────────────────────────────────────────────────────────────────

function DocCta({ label, accent, sub }: { label: string; accent: string; sub?: string }) {
  return (
    <div style={{ paddingTop: 4 }}>
      <div style={{ height: '0.5px', background: '#E2E8F0', marginBottom: 16 }} />
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <a href="#" style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 13, fontWeight: 700,
          color: accent,
          textDecoration: 'none',
          borderBottom: `1.5px solid ${accent}`,
          paddingBottom: 1,
          letterSpacing: '0.01em',
        }}>
          {label} →
        </a>
        {sub && (
          <span style={{
            fontFamily: '"Courier New", monospace',
            fontSize: 9, color: '#94A3B8', letterSpacing: '0.06em',
          }}>
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER — printed at the bottom like a legal disclaimer
// ─────────────────────────────────────────────────────────────────────────────

function DocFooter() {
  return (
    <div style={{
      borderTop: '0.5px solid #E2E8F0',
      padding: '10px 28px 12px',
      background: '#F8FAFC',
    }}>
      {/* Horizontal rule with org name centered — like a printed document */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <div style={{ flex: 1, height: '0.5px', background: '#E2E8F0' }} />
        <span style={{
          fontFamily: 'Arial',
          fontSize: 8, fontWeight: 700,
          letterSpacing: '0.20em', textTransform: 'uppercase',
          color: '#94A3B8', whiteSpace: 'nowrap',
        }}>
          Diwa Learning Systems, Inc.
        </span>
        <div style={{ flex: 1, height: '0.5px', background: '#E2E8F0' }} />
      </div>
      <p style={{
        margin: 0, fontFamily: 'Arial', fontSize: 9, color: '#CBD5E1',
        textAlign: 'center', lineHeight: 1.6, letterSpacing: '0.02em',
      }}>
        This is an automated notification from the Human Resource Information System.
        Do not reply to this message. © {new Date().getFullYear()} All rights reserved.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

function LeaveApprovedEmail() {
  const d = LEAVE_APPROVED_DATA; const accent = '#059669';
  return (
    <EmailCanvas>
      <DocHeader category="Leave Management" title="Leave Approved" refNo={d.refNo} date={d.approvedOn} accent={accent} />
      <DocBody>
        <Greeting name={d.employeeName} />
        <BodyText>
          Your <strong>{d.leaveType}</strong> application has been approved
          for <strong>{d.days} working days</strong>. Please coordinate with your
          team and complete your handover before your leave begins.
        </BodyText>
        <FormTable section="Leave Details" accent={accent} rows={[
          ['Employee', `${d.employeeName}  ·  ${d.employeeId}`],
          ['Department', d.department],
          ['Leave Type', d.leaveType],
          ['Period', `${d.startDate} – ${d.endDate}`],
          ['Working Days', `${d.days} days`],
          ['Approved By', `${d.approvedBy},  ${d.approverTitle}`],
          ['Date Approved', d.approvedOn],
        ]} />
        <DocCta label="View Leave Record" accent={accent} sub={d.refNo} />
      </DocBody>
      <DocFooter />
    </EmailCanvas>
  );
}

function LeaveRejectedEmail() {
  const d = LEAVE_REJECTED_DATA; const accent = '#DC2626';
  return (
    <EmailCanvas>
      <DocHeader category="Leave Management" title="Not Approved" refNo={d.refNo} date={d.reviewedOn} accent={accent} />
      <DocBody>
        <Greeting name={d.employeeName} />
        <BodyText>
          Your <strong>{d.leaveType}</strong> application could not be approved.
          Please review the reason below and contact HR if you have questions.
        </BodyText>
        <FormTable section="Request Details" accent={accent} rows={[
          ['Employee', `${d.employeeName}  ·  ${d.employeeId}`],
          ['Leave Type', d.leaveType],
          ['Requested Period', `${d.startDate} – ${d.endDate}`],
          ['Working Days', `${d.days} days`],
          ['Reviewed By', `${d.rejectedBy},  ${d.rejectorTitle}`],
          ['Date Reviewed', d.reviewedOn],
        ]} />
        <NoticeBlock tone="error" label="Reason for Decision" text={d.reason} />
        <DocCta label="File a New Leave Request" accent={accent} sub={d.refNo} />
      </DocBody>
      <DocFooter />
    </EmailCanvas>
  );
}

function PayrollEmail() {
  const d = PAYROLL_DATA; const accent = '#1D4ED8';
  return (
    <EmailCanvas>
      <DocHeader category="Payroll" title="Your Payslip Is Ready" refNo={d.refNo} date={d.cutoffDate} accent={accent} />
      <DocBody>
        <Greeting name={d.employeeName} />
        <BodyText>
          Your payslip for <strong>{d.payPeriod}</strong> has been processed.
          Net pay will be credited to your account by <strong>{d.cutoffDate}</strong>.
        </BodyText>
        <PayAmount net={d.netPay} gross={d.grossPay} deductions={d.totalDeductions} />
        <FormTable section="Pay Period" accent={accent} rows={[
          ['Employee', `${d.employeeName}  ·  ${d.employeeId}`],
          ['Department', d.department],
          ['Pay Period', d.payPeriod],
          ['Credit Date', d.cutoffDate],
        ]} />
        <DocCta label="Download Payslip" accent={accent} sub={d.refNo} />
      </DocBody>
      <DocFooter />
    </EmailCanvas>
  );
}

function ActivationEmail() {
  const d = ACTIVATION_DATA; const accent = '#0E7490';
  return (
    <EmailCanvas>
      <DocHeader category="Account Setup" title="Welcome to UHRIS" refNo={d.refNo}
        date={new Date().toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })} accent={accent} />
      <DocBody>
        <Greeting name={d.employeeName} />
        <BodyText>
          Your UHRIS account has been provisioned with the role <strong>{d.role}</strong>.
          Use the credentials below to sign in — you will be required to set a new password
          on first login.
        </BodyText>
        <FormTable section="Login Credentials" accent={accent} rows={[
          ['Employee ID', d.employeeId, true],
          ['Email', d.email],
          ['Temp. Password', d.tempPassword, true],
          ['Role', d.role],
          ['Department', d.department],
        ]} />
        <NoticeBlock
          tone="warning"
          label="Security Notice"
          text="Change your password immediately on first login. Never share credentials with anyone, including HR staff."
        />
        <DocCta label="Sign In to UHRIS" accent={accent} sub={d.loginUrl} />
      </DocBody>
      <DocFooter />
    </EmailCanvas>
  );
}

function PafApprovedEmail() {
  const d = PAF_DATA; const accent = '#6D28D9';
  return (
    <EmailCanvas>
      <DocHeader category="Personnel Action" title="PAF Approved" refNo={d.pafNumber} date={d.approvedOn} accent={accent} />
      <DocBody>
        <Greeting name={d.employeeName} />
        <BodyText>
          Your Personnel Action Form <strong>{d.pafNumber}</strong> has cleared all approvers.
          The changes are effective <strong>{d.effectiveDate}</strong>.
          A signed copy is available in your document vault.
        </BodyText>
        <FormTable section="Action Details" accent={accent} rows={[
          ['Employee', `${d.employeeName}  ·  ${d.employeeId}`],
          ['Department', d.department],
          ['Position', d.currentPosition],
          ['Action Type', d.actionType],
          ['Effective Date', d.effectiveDate],
          ['Final Approver', d.approvedBy],
          ['Date Approved', d.approvedOn],
        ]} />
        <DocCta label="View PAF Document" accent={accent} sub={d.pafNumber} />
      </DocBody>
      <DocFooter />
    </EmailCanvas>
  );
}

// ── Viewport ──────────────────────────────────────────────────────────────────
function EmailViewport({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden"
      style={{ height: 520, background: '#0A1628', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="absolute inset-0 overflow-y-auto">{children}</div>
    </div>
  );
}

// ── Code ──────────────────────────────────────────────────────────────────────

const CODE = {
  leaveApprovedJsx: `// Email template — compose from these primitives
// Each template = EmailCanvas > DocHeader + DocBody + DocFooter

<EmailCanvas>
  {/* 4px accent band + UHRIS wordmark + 44px condensed event title */}
  <DocHeader category="Leave Management" title="Leave Approved"
    refNo={refNo} date={approvedOn} accent="#059669" />

  <DocBody>
    {/* Georgia serif greeting */}
    <p style={{ fontFamily: 'Georgia, serif', fontSize: 15 }}>
      Dear <strong>{employeeName}</strong>,
    </p>
    <p>Your {leaveType} has been approved for {days} working days.</p>

    {/* Two-column form table: small-caps label left, tabular-nums value right */}
    <FormTable section="Leave Details" accent="#059669" rows={[
      ['Employee',     \`\${employeeName} · \${employeeId}\`],
      ['Leave Type',   leaveType],
      ['Period',       \`\${startDate} – \${endDate}\`],
      ['Working Days', \`\${days} days\`],
      ['Approved By',  \`\${approvedBy}, \${approverTitle}\`],
    ]} />

    {/* Text link CTA — the only accent-colored element in the body */}
    <a href={uhrisUrl} style={{ color: accent, borderBottom: \`1.5px solid \${accent}\` }}>
      View Leave Record →
    </a>
  </DocBody>

  <DocFooter />
</EmailCanvas>`,

  leaveApprovedBackend: `// NestJS — trigger after approval is persisted
await this.mailerService.sendMail({
  to: employee.email,
  subject: \`Leave Approved · \${leave.type} · \${periodLabel}\`,
  template: 'leave-approved',
  context: {
    employeeName: employee.fullName,
    leaveType:    leave.type,
    startDate:    format(leave.startDate, 'MMMM d, yyyy'),
    endDate:      format(leave.endDate,   'MMMM d, yyyy'),
    days:         leave.workingDaysCount,
    approvedBy:   approver.fullName,
    refNo:        \`LR-\${year}-\${padStart(leave.id, 4, '0')}\`,
  },
});`,

  leaveRejectedJsx: `<EmailCanvas>
  <DocHeader category="Leave Management" title="Not Approved"
    refNo={refNo} date={reviewedOn} accent="#DC2626" />
  <DocBody>
    <p>Dear <strong>{employeeName}</strong>,</p>
    <p>Your {leaveType} could not be approved. Review the reason below.</p>
    <FormTable section="Request Details" accent="#DC2626" rows={[...]} />

    {/* Reason is mandatory — never send rejection without one */}
    <NoticeBlock tone="error" label="Reason for Decision" text={reason} />

    <a href={newRequestUrl} style={{ color: '#DC2626', borderBottom: '1.5px solid #DC2626' }}>
      File a New Leave Request →
    </a>
  </DocBody>
  <DocFooter />
</EmailCanvas>`,

  payrollJsx: `<EmailCanvas>
  <DocHeader category="Payroll" title="Your Payslip Is Ready"
    refNo={refNo} date={cutoffDate} accent="#1D4ED8" />
  <DocBody>
    <p>Dear <strong>{employeeName}</strong>,</p>
    <p>Your payslip for {payPeriod} has been processed.</p>

    {/* Net pay as typography — 52px Courier, no container, no background */}
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#94A3B8' }}>Net Pay</p>
      <p style={{ fontFamily: 'Courier New, monospace', fontSize: 52, fontWeight: 700, color: '#0F172A' }}>
        {netPay}
      </p>
      <p style={{ fontFamily: 'monospace', fontSize: 11 }}>
        GROSS {grossPay} · DEDUCTIONS −{totalDeductions}
      </p>
    </div>

    <FormTable section="Pay Period" accent="#1D4ED8" rows={[
      ['Employee', \`\${employeeName} · \${employeeId}\`],
      ['Pay Period', payPeriod],
      ['Credit Date', cutoffDate],
    ]} />
    <a href={payslipUrl} style={{ color: '#1D4ED8', borderBottom: '1.5px solid #1D4ED8' }}>
      Download Payslip →
    </a>
  </DocBody>
  <DocFooter />
</EmailCanvas>`,

  activationJsx: `<EmailCanvas>
  <DocHeader category="Account Setup" title="Welcome to UHRIS"
    refNo={refNo} date={createdDate} accent="#0E7490" />
  <DocBody>
    <p>Dear <strong>{employeeName}</strong>,</p>
    <p>Your UHRIS account is ready with role <strong>{role}</strong>.</p>

    {/* Credentials in ruled table — monospace for password */}
    <FormTable section="Login Credentials" accent="#0E7490" rows={[
      ['Employee ID',    employeeId,    true],  // true = monospace value
      ['Email',          email],
      ['Temp. Password', tempPassword,  true],
      ['Role',           role],
    ]} />

    {/* Security notice is MANDATORY for account activation emails */}
    <NoticeBlock tone="warning" label="Security Notice"
      text="Change your password immediately on first login." />

    <a href={loginUrl} style={{ color: '#0E7490', borderBottom: '1.5px solid #0E7490' }}>
      Sign In to UHRIS →
    </a>
  </DocBody>
  <DocFooter />
</EmailCanvas>`,

  pafJsx: `<EmailCanvas>
  <DocHeader category="Personnel Action" title="PAF Approved"
    refNo={pafNumber} date={approvedOn} accent="#6D28D9" />
  <DocBody>
    <p>Dear <strong>{employeeName}</strong>,</p>
    <p>Your PAF <strong>{pafNumber}</strong> has cleared all approvers.
       Changes effective <strong>{effectiveDate}</strong>.</p>

    <FormTable section="Action Details" accent="#6D28D9" rows={[
      ['Action Type',    actionType],
      ['Effective Date', effectiveDate],
      ['Final Approver', approvedBy],
      ['Date Approved',  approvedOn],
    ]} />
    <a href={vaultUrl} style={{ color: '#6D28D9', borderBottom: '1.5px solid #6D28D9' }}>
      View PAF Document →
    </a>
  </DocBody>
  <DocFooter />
</EmailCanvas>`,

  setup: `// app.module.ts — MailerModule registration
MailerModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (cfg: ConfigService) => ({
    transport: {
      host: cfg.get('MAIL_HOST'), port: cfg.get<number>('MAIL_PORT'),
      auth: { user: cfg.get('MAIL_USER'), pass: cfg.get('MAIL_PASS') },
    },
    defaults: { from: '"UHRIS · Diwa Learning Systems" <noreply@diwa.edu.ph>' },
    template: {
      dir: path.join(__dirname, 'templates/email'),
      adapter: new HandlebarsAdapter(),
    },
  }),
}),`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EmailNotificationPage() {
  const [activeTab, setActiveTab] = useState<TabId>('leave-approved');
  const activeTabDef = TABS.find(t => t.id === activeTab)!;

  return (
    <GalleryLayout activeId="email-notifications">
      <title>Email Notifications — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Enterprise"
          name="Email Notifications"
          description="Five transactional email templates — copy the JSX shell, swap your data. Each is a printed official document: 44px condensed event title, two-column form table, text-link CTA. Backend wiring shown separately per template."
          status="complete"
          importName={false}
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview"
          description="Switch tabs to preview each template with real data.">
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="w-full space-y-3">
              <div className="flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm" role="tablist">
                {TABS.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button key={tab.id} type="button" role="tab" aria-selected={isActive}
                      onClick={() => setActiveTab(tab.id)}
                      className={[
                        'flex flex-1 min-w-[100px] items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-150',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
                        isActive ? 'text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
                      ].join(' ')}
                      style={isActive ? { background: activeTabDef.accent } : undefined}
                    >
                      <Icon size={14} aria-hidden="true" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold"
                style={{ background: activeTabDef.light, color: activeTabDef.accent }}>
                <activeTabDef.icon size={12} aria-hidden="true" />
                {activeTabDef.label} — Live Preview
              </div>
              <EmailViewport>
                {activeTab === 'leave-approved' && <LeaveApprovedEmail />}
                {activeTab === 'leave-rejected' && <LeaveRejectedEmail />}
                {activeTab === 'payroll'        && <PayrollEmail />}
                {activeTab === 'activation'     && <ActivationEmail />}
                {activeTab === 'paf-approved'   && <PafApprovedEmail />}
              </EmailViewport>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Leave Approval */}
        <GallerySection id="leave-approved" title="Leave Approval"
          description="Sent after approval completes. Green 4px accent band. Two-column form table with hairline separators. Text-link CTA.">
          <Showcase title="Leave Approved" description="Copy this JSX shell and swap in your data."
            code={CODE.leaveApprovedJsx} language="tsx" tone="white" center={false}>
            <div className="w-full"><EmailViewport><LeaveApprovedEmail /></EmailViewport></div>
          </Showcase>
          <CopyCodeBlock code={CODE.leaveApprovedBackend} language="typescript" title="Backend wiring (NestJS)" />
        </GallerySection>

        {/* Leave Rejection */}
        <GallerySection id="leave-rejected" title="Leave Rejection"
          description="Never send without a reason. The NoticeBlock is mandatory — silence forces a follow-up call.">
          <Showcase title="Leave Not Approved" description="Red accent. NoticeBlock below the form table."
            code={CODE.leaveRejectedJsx} language="tsx" tone="white" center={false}>
            <div className="w-full"><EmailViewport><LeaveRejectedEmail /></EmailViewport></div>
          </Showcase>
          <CopyCodeBlock code={`await this.mailerService.sendMail({
  to: employee.email,
  template: 'leave-rejected',
  context: { ...details, reason: leave.rejectionReason },
});`} language="typescript" title="Backend wiring (NestJS)" />
        </GallerySection>

        {/* Payroll */}
        <GallerySection id="payroll" title="Payroll Release"
          description="Net pay as 52px Courier — no hero card, no background. The number IS the element.">
          <Showcase title="Payslip Ready" description="Large monospace net pay, hairline form table, blue text-link."
            code={CODE.payrollJsx} language="tsx" tone="white" center={false}>
            <div className="w-full"><EmailViewport><PayrollEmail /></EmailViewport></div>
          </Showcase>
          <CopyCodeBlock code={`await this.mailerService.sendMail({
  to: employee.email,
  template: 'payroll-release',
  context: {
    netPay:          formatCurrency(payroll.netPay),
    grossPay:        formatCurrency(payroll.grossPay),
    totalDeductions: formatCurrency(payroll.totalDeductions),
  },
});`} language="typescript" title="Backend wiring (NestJS)" />
        </GallerySection>

        {/* Activation */}
        <GallerySection id="activation" title="Account Activation"
          description="Monospace credentials in the form table. Amber security notice is non-negotiable.">
          <Showcase title="Welcome to UHRIS" description="Cyan accent, monospace credentials, amber security block."
            code={CODE.activationJsx} language="tsx" tone="white" center={false}>
            <div className="w-full"><EmailViewport><ActivationEmail /></EmailViewport></div>
          </Showcase>
          <CopyCodeBlock code={`await this.mailerService.sendMail({
  to: user.email,
  template: 'account-activation',
  context: { tempPassword: plainPassword, loginUrl: cfg.get('APP_URL') + '/login' },
});`} language="typescript" title="Backend wiring (NestJS)" />
        </GallerySection>

        {/* PAF */}
        <GallerySection id="paf-approved" title="PAF Approved"
          description="Sent when a PAF clears all approvers. Always reference the PAF number and effective date.">
          <Showcase title="PAF Approved" description="Violet accent, 4-row action table."
            code={CODE.pafJsx} language="tsx" tone="white" center={false}>
            <div className="w-full"><EmailViewport><PafApprovedEmail /></EmailViewport></div>
          </Showcase>
          <CopyCodeBlock code={`await this.mailerService.sendMail({
  to: employee.email,
  template: 'paf-approved',
  context: { pafNumber: paf.number, actionType: paf.actionType,
             effectiveDate: format(paf.effectiveDate, 'MMMM d, yyyy') },
});`} language="typescript" title="Backend wiring (NestJS)" />
        </GallerySection>

        {/* Setup */}
        <GallerySection id="setup" title="Setup & Integration"
          description="Wire these into NestJS using @nestjs-modules/mailer.">
          <Showcase title="MailerModule + trigger pattern"
            description="Register once in AppModule, call sendMail() after each business action."
            code={CODE.setup} language="typescript" tone="white" center={false} minHeight="min-h-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Do</p>
                {[
                  'Wrap every sendMail() in try/catch — email failure must not fail the DB transaction.',
                  'Use BullMQ for payroll runs — never send 200 emails synchronously.',
                  'Include plain-text alternatives for clients that block HTML.',
                  'Log recipient, template name, and outcome for compliance audits.',
                ].map(t => (
                  <p key={t} className="flex items-start gap-2 text-sm text-emerald-800">
                    <span className="mt-1 shrink-0 text-emerald-500">✓</span>{t}
                  </p>
                ))}
              </div>
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-rose-600">Don't</p>
                {[
                  "Don't include plaintext passwords — single-use, expire on first login.",
                  "Don't block the request cycle on delivery.",
                  "Don't send a rejection without a reason — silence forces a follow-up call.",
                  "Don't hardcode from address or APP_URL — use environment config.",
                ].map(t => (
                  <p key={t} className="flex items-start gap-2 text-sm text-rose-800">
                    <span className="mt-1 shrink-0 text-rose-500">✗</span>{t}
                  </p>
                ))}
              </div>
            </div>
          </Showcase>
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
