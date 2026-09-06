/**
 * ToggleTablePage — Gallery (Enterprise)
 *
 * Three variants of the Toggle Table layout pattern, drawn from unified-hris:
 *
 *   1. Notification Rules Table   — dual toggle columns (In-App + Email)
 *                                   + recipient role chips inline per row
 *                                   Source: NotificationSettings.tsx
 *
 *   2. Audit Event Table          — single on/off toggle per row,
 *                                   grouped by module, severity badge,
 *                                   global master switch at top
 *                                   Source: AuditLogSettings.tsx
 *
 *   3. Permission Matrix          — accordion rows, collapsed = summary chips,
 *                                   expanded = Authority (radio) + Actions +
 *                                   Scope + States (multi-chip panels)
 *                                   Source: PermissionsPage.tsx
 *
 * Design: DIWA brand navy (#00377B / #034EA2), not indigo.
 * Toggle track: bg-[#034EA2] on, bg-slate-200 off.
 * Active chips: #EEF3FB bg, #00377B border.
 */

import { useState } from 'react';
import {
  Search, Check, ChevronDown,
  Shield, Lock, Database, Users, CreditCard,
  Eye, Plus, Edit3, Download, Power, Trash2,
  User, AlertTriangle,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['table', 'switch', 'checkbox', 'tabs']);

// ── Shared primitive: Toggle pill ────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00377B]/30 ${
        checked ? 'bg-[#034EA2]' : 'bg-slate-200'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

/** Severity badge */
function SeverityBadge({ severity }: { severity: 'Critical' | 'Medium' | 'Low' }) {
  const styles = {
    Critical: 'bg-rose-50 text-rose-700 border border-rose-200',
    Medium:   'bg-amber-50 text-amber-700 border border-amber-200',
    Low:      'bg-slate-100 text-slate-500 border border-slate-200',
  }[severity];
  return (
    <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${styles}`}>
      {severity}
    </span>
  );
}

/** Role chip */
function RoleChip({ label }: { label: string }) {
  return (
    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide bg-[#EEF3FB] text-[#00377B] border border-[#C7D8F0]">
      {label}
    </span>
  );
}

/** Section group header row */
function GroupHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 border-b border-slate-200">
      <div className="p-1.5 bg-white border border-slate-200 text-slate-500 shadow-sm">
        {icon}
      </div>
      <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.16em]">
        {label}
      </span>
    </div>
  );
}

// ── SECTION 1: Notification Rules Table ──────────────────────────────────────

type TriggerType = 'Event-Based' | 'Schedule-Based';
type NotifRole = 'HR Admin' | 'Employee' | 'Approver' | 'Payroll' | 'Superadmin';

interface NotifRule {
  id: string;
  module: string;
  event: string;
  description: string;
  trigger: TriggerType;
  roles: NotifRole[];
  inApp: boolean;
  email: boolean;
}

const NOTIF_RULES: NotifRule[] = [
  { id: 'hr-1',  module: 'Core HR',           event: 'New Employee Created',       description: 'When a new employee profile is added.',            trigger: 'Event-Based',    roles: ['Superadmin', 'HR Admin'],           inApp: true,  email: true  },
  { id: 'hr-2',  module: 'Core HR',           event: 'Profile Update Request',     description: 'When an employee requests a profile change.',      trigger: 'Event-Based',    roles: ['HR Admin'],                         inApp: true,  email: false },
  { id: 'hr-3',  module: 'Core HR',           event: 'Probationary 5th Month',     description: 'Auto-alert when employee hits 5 months.',          trigger: 'Schedule-Based', roles: ['HR Admin', 'Superadmin'],           inApp: true,  email: true  },
  { id: 'ta-1',  module: 'Time & Attendance', event: 'Leave Request Submitted',    description: 'When an employee files a leave request.',          trigger: 'Event-Based',    roles: ['Approver'],                         inApp: true,  email: true  },
  { id: 'ta-2',  module: 'Time & Attendance', event: 'Leave Approved / Rejected',  description: 'Decision notification to the employee.',           trigger: 'Event-Based',    roles: ['Employee'],                         inApp: true,  email: true  },
  { id: 'ta-3',  module: 'Time & Attendance', event: 'Absence Detected',           description: 'No log on a scheduled workday.',                  trigger: 'Event-Based',    roles: ['HR Admin', 'Approver', 'Employee'], inApp: true,  email: true  },
  { id: 'pay-1', module: 'Payroll',           event: 'Payslip Generated',          description: 'When a payslip is ready for the employee.',        trigger: 'Schedule-Based', roles: ['Employee'],                         inApp: true,  email: true  },
  { id: 'pay-2', module: 'Payroll',           event: 'Payroll Processing Failed',  description: 'Critical error during payroll run.',               trigger: 'Event-Based',    roles: ['Superadmin', 'Payroll'],            inApp: true,  email: true  },
];

const NOTIF_MODULES = ['Core HR', 'Time & Attendance', 'Payroll'] as const;

const NOTIF_MODULE_ICONS: Record<string, React.ReactNode> = {
  'Core HR':            <Users size={16} />,
  'Time & Attendance':  <Shield size={16} />,
  'Payroll':            <CreditCard size={16} />,
};

function NotificationRulesTable() {
  const [rules, setRules] = useState(NOTIF_RULES);
  const [search, setSearch] = useState('');

  function toggle(id: string, field: 'inApp' | 'email') {
    setRules(r => r.map(rule => rule.id === id ? { ...rule, [field]: !rule[field] } : rule));
  }

  const filtered = rules.filter(r =>
    r.event.toLowerCase().includes(search.toLowerCase()) ||
    r.module.toLowerCase().includes(search.toLowerCase())
  );

  const enabledCount = rules.filter(r => r.inApp || r.email).length;

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
            placeholder="Filter events..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border-none focus:ring-2 focus:ring-[#00377B]/20 outline-none placeholder-slate-400"
          />
        </div>
        <span className="ml-auto text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {enabledCount} of {rules.length} active
        </span>
      </div>

      {/* Table */}
      <div className="border-2 border-[#00377B] overflow-hidden shadow-sm">
        {/* Column headers */}
        <div className="grid border-b-2 border-[#00377B] bg-[#00377B]" style={{ gridTemplateColumns: '1fr auto auto auto' }}>
          <div className="px-5 py-3 text-[10px] font-black text-white uppercase tracking-[0.14em]">Event</div>
          <div className="px-5 py-3 text-[10px] font-black text-white/80 uppercase tracking-[0.14em] text-center min-w-[90px]">In-App</div>
          <div className="px-5 py-3 text-[10px] font-black text-white/80 uppercase tracking-[0.14em] text-center min-w-[90px]">Email</div>
          <div className="px-5 py-3 text-[10px] font-black text-white/80 uppercase tracking-[0.14em] min-w-[160px]">Recipients</div>
        </div>

        {NOTIF_MODULES.map(mod => {
          const rows = filtered.filter(r => r.module === mod);
          if (!rows.length) return null;
          return (
            <div key={mod} className="border-b border-slate-200 last:border-0">
              <GroupHeader icon={NOTIF_MODULE_ICONS[mod]} label={mod} />
              {rows.map(rule => (
                <div
                  key={rule.id}
                  className="grid items-center border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                  style={{ gridTemplateColumns: '1fr auto auto auto' }}
                >
                  {/* Event info */}
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-slate-900">{rule.event}</span>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 border ${
                        rule.trigger === 'Event-Based'
                          ? 'bg-[#EEF3FB] text-[#034EA2] border-[#C7D8F0]'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {rule.trigger}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">{rule.description}</p>
                  </div>

                  {/* In-App toggle */}
                  <div className="px-5 py-4 flex flex-col items-center gap-1.5 min-w-[90px]">
                    <Toggle
                      checked={rule.inApp}
                      onChange={() => toggle(rule.id, 'inApp')}
                      label={`${rule.event} in-app notification`}
                    />
                    <span className={`text-[9px] font-bold ${rule.inApp ? 'text-[#034EA2]' : 'text-slate-300'}`}>
                      {rule.inApp ? 'On' : 'Off'}
                    </span>
                  </div>

                  {/* Email toggle */}
                  <div className="px-5 py-4 flex flex-col items-center gap-1.5 min-w-[90px]">
                    <Toggle
                      checked={rule.email}
                      onChange={() => toggle(rule.id, 'email')}
                      label={`${rule.event} email notification`}
                    />
                    <span className={`text-[9px] font-bold ${rule.email ? 'text-[#034EA2]' : 'text-slate-300'}`}>
                      {rule.email ? 'On' : 'Off'}
                    </span>
                  </div>

                  {/* Recipients */}
                  <div className="px-5 py-4 min-w-[160px]">
                    <div className="flex flex-wrap gap-1">
                      {rule.roles.map(r => <RoleChip key={r} label={r} />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-10 text-slate-400">
            <Search size={20} />
            <p className="text-sm font-medium">No events match your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SECTION 2: Audit Event Table ─────────────────────────────────────────────

interface AuditRule {
  id: string;
  module: string;
  event: string;
  description: string;
  enabled: boolean;
  severity: 'Critical' | 'Medium' | 'Low';
}

const INITIAL_AUDIT_RULES: AuditRule[] = [
  { id: 'auth-1', module: 'Authentication',     event: 'User Login',              description: 'Log when a user successfully signs in.',                        enabled: true,  severity: 'Low'      },
  { id: 'auth-2', module: 'Authentication',     event: 'Failed Login Attempt',    description: 'Log invalid password entries or account lockouts.',              enabled: true,  severity: 'Medium'   },
  { id: 'auth-3', module: 'Authentication',     event: 'Password Change',         description: 'Log when a user updates their password.',                        enabled: true,  severity: 'Medium'   },
  { id: 'auth-4', module: 'Authentication',     event: 'Session Logout',          description: 'Log user session termination.',                                  enabled: false, severity: 'Low'      },
  { id: 'emp-1',  module: 'Employee Mgmt',      event: 'Create Employee',         description: 'Log when a new employee profile is created.',                    enabled: true,  severity: 'Critical' },
  { id: 'emp-2',  module: 'Employee Mgmt',      event: 'Salary Adjustment',       description: 'Log changes to base pay or benefits.',                           enabled: true,  severity: 'Critical' },
  { id: 'emp-3',  module: 'Employee Mgmt',      event: 'Terminate Employee',      description: 'Log status changes to Inactive / Terminated.',                   enabled: true,  severity: 'Critical' },
  { id: 'emp-4',  module: 'Employee Mgmt',      event: 'Update Personal Info',    description: 'Log changes to address, contact, and personal details.',         enabled: true,  severity: 'Low'      },
  { id: 'pay-1',  module: 'Payroll',            event: 'Finalize Payroll Run',    description: 'Log when a payroll run is approved and closed.',                 enabled: true,  severity: 'Critical' },
  { id: 'pay-2',  module: 'Payroll',            event: 'Generate Payslip',        description: 'Log when payslips are generated for a period.',                  enabled: true,  severity: 'Medium'   },
  { id: 'sys-1',  module: 'System',             event: 'Update Role Permissions', description: 'Log changes to permission protocols.',                           enabled: true,  severity: 'Critical' },
  { id: 'sys-2',  module: 'System',             event: 'Configuration Change',    description: 'Log updates to global system settings.',                         enabled: true,  severity: 'Medium'   },
  { id: 'sys-3',  module: 'System',             event: 'PAF E-Signature Print',   description: 'Log when a PAF is printed and an e-signature is revealed.',      enabled: true,  severity: 'Critical' },
];

const AUDIT_MODULES = ['Authentication', 'Employee Mgmt', 'Payroll', 'System'] as const;
const AUDIT_MODULE_ICONS: Record<string, React.ReactNode> = {
  'Authentication': <Lock size={16} />,
  'Employee Mgmt':  <Users size={16} />,
  'Payroll':        <CreditCard size={16} />,
  'System':         <Database size={16} />,
};

function AuditEventTable() {
  const [rules, setRules] = useState(INITIAL_AUDIT_RULES);
  const [globalOn, setGlobalOn] = useState(true);
  const [search, setSearch] = useState('');

  function toggleRule(id: string) {
    setRules(r => r.map(rule => rule.id === id ? { ...rule, enabled: !rule.enabled } : rule));
  }

  const filtered = rules.filter(r =>
    r.event.toLowerCase().includes(search.toLowerCase()) ||
    r.module.toLowerCase().includes(search.toLowerCase())
  );

  const enabledCount = rules.filter(r => r.enabled).length;

  return (
    <div className="space-y-4">
      {/* Global master switch */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white border-2 border-[#00377B] shadow-sm">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-[#EEF3FB] text-[#00377B]">
            <Shield size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Global Logging Status</p>
            <p className="text-[11px] text-slate-400">Master switch. Disabling stops ALL audit event recording.</p>
          </div>
        </div>
        {/* Active / Disabled segment */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setGlobalOn(true)}
            className={`px-4 py-2 text-sm font-bold transition-all ${
              globalOn ? 'bg-white text-emerald-700 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setGlobalOn(false)}
            className={`px-4 py-2 text-sm font-bold transition-all ${
              !globalOn ? 'bg-white text-slate-800 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Disabled
          </button>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {enabledCount} / {rules.length} events logged
        </span>
      </div>

      {/* Compliance notice */}
      <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-200">
        <AlertTriangle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-[11px] font-bold text-amber-800 leading-relaxed">
          Disabling <span className="text-rose-700">Critical</span> events may violate compliance policies (SOC2 / ISO). Changes to these settings are logged permanently.
        </p>
      </div>

      {/* Rules table */}
      <div className={`border-2 border-slate-200 overflow-hidden shadow-sm transition-opacity duration-200 ${!globalOn ? 'opacity-40 pointer-events-none' : ''}`}>
        {/* Search */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-white">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter events..."
            className="flex-1 text-sm bg-transparent border-none outline-none placeholder-slate-400"
          />
        </div>

        {AUDIT_MODULES.map(mod => {
          const rows = filtered.filter(r => r.module === mod);
          if (!rows.length) return null;
          return (
            <div key={mod} className="border-b border-slate-200 last:border-0">
              <GroupHeader icon={AUDIT_MODULE_ICONS[mod]} label={mod} />
              {rows.map(rule => (
                <div
                  key={rule.id}
                  className="flex items-center justify-between px-5 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex-1 pr-6">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-slate-900">{rule.event}</span>
                      <SeverityBadge severity={rule.severity} />
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">{rule.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold hidden sm:block ${rule.enabled ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {rule.enabled ? 'Logging' : 'Disabled'}
                    </span>
                    <Toggle
                      checked={rule.enabled}
                      onChange={() => toggleRule(rule.id)}
                      label={`${rule.event} audit logging`}
                    />
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── SECTION 3: Permission Matrix ─────────────────────────────────────────────

const SCOPES = [
  { id: 'Self',           label: 'Self Only',       cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'Direct Reports', label: 'Direct Reports',  cls: 'bg-[#EEF3FB] text-[#034EA2] border-[#C7D8F0]'     },
  { id: 'Department',     label: 'Department',      cls: 'bg-violet-50 text-violet-700 border-violet-200'    },
  { id: 'Global',         label: 'Global (All)',    cls: 'bg-rose-50 text-rose-700 border-rose-200'          },
];

const ACTIONS = [
  { id: 'View',       icon: <Eye size={11} />      },
  { id: 'Create',     icon: <Plus size={11} />     },
  { id: 'Edit',       icon: <Edit3 size={11} />    },
  { id: 'Activate',   icon: <Power size={11} />    },
  { id: 'Deactivate', icon: <Trash2 size={11} />   },
  { id: 'Export',     icon: <Download size={11} /> },
  { id: 'Approve',    icon: <Check size={11} />    },
];

const AUTHORITIES = [
  { id: 'Viewer',      label: 'Viewer',      desc: 'Read-only access'            },
  { id: 'Contributor', label: 'Contributor', desc: 'Can create and edit drafts'  },
  { id: 'Requester',   label: 'Requester',   desc: 'Can submit for approval'     },
  { id: 'Approver',    label: 'Approver',    desc: 'Can authorize transactions'  },
];

const LIFECYCLE_STATES = [
  { id: 'Draft',    label: 'Draft'          },
  { id: 'Pending',  label: 'Pending Review' },
  { id: 'Approved', label: 'Approved'       },
  { id: 'Rejected', label: 'Rejected'       },
  { id: 'Archived', label: 'Archived'       },
];

const PERM_MODULES = [
  {
    category: 'Employee Profile',
    icon: <User size={16} />,
    modules: [
      { id: 'emp_details', name: 'Personal Details',    desc: 'Basic info, address, and contact details.' },
      { id: 'emp_docs',    name: 'Employee Documents',  desc: 'Contracts, IDs, and uploaded files.'       },
      { id: 'emp_history', name: 'Employment History',  desc: 'Past positions and movements.'             },
    ],
  },
  {
    category: 'Payroll & Compensation',
    icon: <CreditCard size={16} />,
    modules: [
      { id: 'pay_salary', name: 'Salary Configuration', desc: 'Base pay, rank, and step settings.'   },
      { id: 'pay_slip',   name: 'Payslip Generation',   desc: 'View and generate payslips.'           },
      { id: 'pay_bank',   name: 'Bank Account Details', desc: 'Direct deposit information.'           },
    ],
  },
  {
    category: 'Time & Attendance',
    icon: <Shield size={16} />,
    modules: [
      { id: 'ta_shift', name: 'Shift Schedule',     desc: 'Work hours and day assignments.'     },
      { id: 'ta_logs',  name: 'Attendance Logs',    desc: 'Daily time records and DTR data.'    },
      { id: 'ta_ot',    name: 'Overtime Requests',  desc: 'OT applications and approvals.'      },
    ],
  },
];

interface PermConfig {
  authority: string;
  scope: string[];
  actions: string[];
  states: string[];
}

const DEFAULT_PERM: PermConfig = {
  authority: 'Viewer',
  scope: ['Self'],
  actions: ['View'],
  states: ['Approved'],
};

function PermissionMatrix() {
  const [perms, setPerms] = useState<Record<string, PermConfig>>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  function getPerm(id: string): PermConfig {
    return perms[id] ?? DEFAULT_PERM;
  }

  function setAuthority(id: string, authority: string) {
    setPerms(p => ({ ...p, [id]: { ...getPerm(id), authority } }));
  }

  function toggleMulti(id: string, field: 'scope' | 'actions' | 'states', item: string) {
    const cur = getPerm(id)[field];
    const next = cur.includes(item) ? cur.filter(i => i !== item) : [...cur, item];
    setPerms(p => ({ ...p, [id]: { ...getPerm(id), [field]: next } }));
  }

  return (
    <div className="space-y-6">
      {PERM_MODULES.map(cat => (
        <div key={cat.category}>
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="text-slate-400">{cat.icon}</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.16em]">
              {cat.category}
            </span>
          </div>

          <div className="border-2 border-slate-200 overflow-hidden shadow-sm">
            {cat.modules.map((mod) => {
              const config = getPerm(mod.id);
              const isOpen = expanded === mod.id;

              return (
                <div
                  key={mod.id}
                  className={`border-b border-slate-100 last:border-0 ${isOpen ? 'bg-[#FAFBFD]' : 'bg-white'}`}
                >
                  {/* Row header — clickable */}
                  <button
                    type="button"
                    className="w-full flex items-center px-5 py-4 text-left hover:bg-slate-50/80 transition-colors group"
                    onClick={() => setExpanded(isOpen ? null : mod.id)}
                    aria-expanded={isOpen}
                    aria-controls={`perm-panel-${mod.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-slate-900">{mod.name}</span>
                        {!isOpen && (
                          <>
                            {/* Authority badge */}
                            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200">
                              {config.authority}
                            </span>
                            {/* Scope color dots */}
                            <div className="flex items-center gap-1">
                              {config.scope.map(s => {
                                const sc = SCOPES.find(x => x.id === s);
                                const dotColor = sc?.cls.split(' ')[0] ?? 'bg-slate-300';
                                return (
                                  <span
                                    key={s}
                                    title={s}
                                    className={`w-2 h-2 rounded-full ${dotColor}`}
                                  />
                                );
                              })}
                            </div>
                            {/* Action count */}
                            <span className="text-[9px] text-slate-400 font-medium">
                              {config.actions.length} action{config.actions.length !== 1 ? 's' : ''}
                            </span>
                          </>
                        )}
                        {isOpen && (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#EEF3FB] text-[#00377B] border border-[#C7D8F0]">
                            Editing
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium">{mod.desc}</p>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`ml-3 flex-shrink-0 text-slate-300 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#034EA2]' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Expanded config panel */}
                  {isOpen && (
                    <div
                      id={`perm-panel-${mod.id}`}
                      className="px-5 pb-6 pt-1 border-t border-slate-100 space-y-5"
                    >
                      {/* Policy statement */}
                      <div className="p-3 bg-white border border-[#C7D8F0] text-[11px] text-slate-600 leading-relaxed">
                        <span className="font-bold text-slate-400">Policy: </span>
                        Allows <strong className="text-[#00377B]">{config.authority}</strong> to{' '}
                        <strong className="text-slate-800">[{config.actions.join(', ') || 'None'}]</strong> records
                        owned by <strong className="text-slate-800">[{config.scope.join(', ') || 'None'}]</strong>{' '}
                        when status is <strong className="text-slate-800">[{config.states.join(', ') || 'None'}]</strong>.
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Authority (radio) */}
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.16em] mb-2">1. Authority Level</p>
                          <div className="space-y-1.5">
                            {AUTHORITIES.map(auth => (
                              <button
                                key={auth.id}
                                type="button"
                                onClick={() => setAuthority(mod.id, auth.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left border transition-all text-sm ${
                                  config.authority === auth.id
                                    ? 'bg-[#00377B] border-[#00377B] text-white shadow-sm'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-[#00377B]/40'
                                }`}
                              >
                                <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                                  config.authority === auth.id ? 'border-white bg-white/30' : 'border-slate-300'
                                }`} />
                                <div>
                                  <p className="font-bold text-sm leading-none mb-0.5">{auth.label}</p>
                                  <p className={`text-[10px] ${config.authority === auth.id ? 'text-white/70' : 'text-slate-400'}`}>
                                    {auth.desc}
                                  </p>
                                </div>
                                {config.authority === auth.id && (
                                  <Check size={14} className="ml-auto flex-shrink-0" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-5">
                          {/* Actions (multi-chip) */}
                          <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.16em] mb-2">2. Allowed Actions</p>
                            <div className="flex flex-wrap gap-1.5">
                              {ACTIONS.map(action => {
                                const on = config.actions.includes(action.id);
                                return (
                                  <button
                                    key={action.id}
                                    type="button"
                                    onClick={() => toggleMulti(mod.id, 'actions', action.id)}
                                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider border transition-all ${
                                      on
                                        ? 'bg-[#00377B] border-[#00377B] text-white shadow-sm'
                                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'
                                    }`}
                                  >
                                    {action.icon}
                                    {action.id}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Scope (multi-chip) */}
                          <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.16em] mb-2">3. Data Scope</p>
                            <div className="flex flex-wrap gap-1.5">
                              {SCOPES.map(scope => {
                                const on = config.scope.includes(scope.id);
                                return (
                                  <button
                                    key={scope.id}
                                    type="button"
                                    onClick={() => toggleMulti(mod.id, 'scope', scope.id)}
                                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider border transition-all ${
                                      on
                                        ? `${scope.cls} shadow-sm`
                                        : 'bg-white border-slate-200 text-slate-400 opacity-60 hover:opacity-100'
                                    }`}
                                  >
                                    {scope.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Lifecycle States (multi-chip) */}
                          <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.16em] mb-2">4. Lifecycle States</p>
                            <div className="flex flex-wrap gap-1.5">
                              {LIFECYCLE_STATES.map(state => {
                                const on = config.states.includes(state.id);
                                return (
                                  <button
                                    key={state.id}
                                    type="button"
                                    onClick={() => toggleMulti(mod.id, 'states', state.id)}
                                    className={`px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider border transition-all ${
                                      on
                                        ? 'bg-[#EEF3FB] text-[#00377B] border-[#C7D8F0]'
                                        : 'bg-white border-slate-200 text-slate-400 hover:border-slate-400'
                                    }`}
                                  >
                                    {state.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Code strings ──────────────────────────────────────────────────────────────

const CODE = {
  toggle: `// Accessible toggle pill — role="switch" + aria-checked
function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={\`relative w-10 h-5 rounded-full transition-colors
        \${checked ? 'bg-[#034EA2]' : 'bg-slate-200'}\`}
    >
      <span className={\`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full
        shadow-sm transition-transform
        \${checked ? 'translate-x-5' : 'translate-x-0'}\`} />
    </button>
  );
}`,

  notifRule: `// Dual-toggle column row — inApp + email per event
<div className="grid items-center" style={{ gridTemplateColumns: '1fr auto auto auto' }}>
  {/* Event description */}
  <div className="px-5 py-4">
    <span className="text-sm font-bold">{rule.event}</span>
    <p className="text-xs text-slate-400">{rule.description}</p>
  </div>
  {/* In-App */}
  <div className="px-5 py-4 flex flex-col items-center gap-1">
    <Toggle checked={rule.inApp} onChange={() => toggle(rule.id, 'inApp')}
            label={\`\${rule.event} in-app notification\`} />
    <span className="text-[9px] font-bold">{rule.inApp ? 'On' : 'Off'}</span>
  </div>
  {/* Email */}
  <div className="px-5 py-4 flex flex-col items-center gap-1">
    <Toggle checked={rule.email} onChange={() => toggle(rule.id, 'email')}
            label={\`\${rule.event} email notification\`} />
    <span className="text-[9px] font-bold">{rule.email ? 'On' : 'Off'}</span>
  </div>
  {/* Recipients */}
  <div className="px-5 py-4 flex flex-wrap gap-1">
    {rule.roles.map(r => <RoleChip key={r} label={r} />)}
  </div>
</div>`,

  auditRule: `// Single toggle row with severity badge
<div className="flex items-center justify-between px-5 py-4">
  <div className="flex-1 pr-6">
    <div className="flex items-center gap-2 mb-0.5">
      <span className="text-sm font-bold">{rule.event}</span>
      <SeverityBadge severity={rule.severity} />
    </div>
    <p className="text-xs text-slate-400">{rule.description}</p>
  </div>
  <div className="flex items-center gap-3">
    <span className="text-xs font-bold hidden sm:block">
      {rule.enabled ? 'Logging' : 'Disabled'}
    </span>
    <Toggle
      checked={rule.enabled}
      onChange={() => toggleRule(rule.id)}
      label={\`\${rule.event} audit logging\`}
    />
  </div>
</div>`,

  permRow: `// Accordion row — collapsed = summary badges, expanded = full config
<button
  role="button"
  aria-expanded={isOpen}
  aria-controls={\`perm-panel-\${mod.id}\`}
  onClick={() => setExpanded(isOpen ? null : mod.id)}
  className="w-full flex items-center px-5 py-4"
>
  <div className="flex-1">
    <span className="text-sm font-bold">{mod.name}</span>
    {!isOpen && (
      // Collapsed summary: authority badge + scope dots + action count
      <>
        <span className="badge">{config.authority}</span>
        {config.scope.map(s => <span key={s} className="dot" title={s} />)}
        <span>{config.actions.length} actions</span>
      </>
    )}
  </div>
  <ChevronDown className={isOpen ? 'rotate-180' : ''} />
</button>

{isOpen && (
  <div id={\`perm-panel-\${mod.id}\`}>
    {/* Authority radio + Actions chips + Scope chips + States chips */}
  </div>
)}`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ToggleTablePage() {
  return (
    <GalleryLayout activeId="toggle-table">
      <title>Toggle Table Layout — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Enterprise"
          name="Toggle Table Layout"
          description="A table where each row has one or more inline controls (toggles, chips, accordions). Three flavors: dual on/off columns, single toggle per row, and accordion rows with full config panels."
          status="complete"
          importName={false}
        />

        {/* ── 2. Overview ───────────────────────────────────────────────── */}
        <GallerySection id="overview" title="Overview" description="Three variants, each from a real UHRIS settings page.">
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {[
                { label: 'Notification Rules', desc: 'Two toggle columns per row — In-App + Email'     },
                { label: 'Audit Events',        desc: 'One toggle per row + severity badge'            },
                { label: 'Permission Matrix',   desc: 'Accordion rows → Authority + Actions + Scope'  },
              ].map(item => (
                <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <p className="text-sm font-bold text-[#00377B] mb-1">{item.label}</p>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── 2. Toggle Primitive ───────────────────────────────────────── */}
        <GallerySection
          id="toggle"
          title="Toggle Primitive"
          description="The toggle pill that all three variants share. Uses role='switch' and aria-checked — always pair it with a visible label or an aria-label."
        >
          <Showcase
            title="Toggle pill — on / off states"
            description="Navy when on, slate-200 when off. Always paired with a visible label or aria-label."
            code={CODE.toggle}
            tone="light"
            center={true}
          >
            <div className="flex items-center gap-8">
              {[true, false].map(state => (
                <div key={String(state)} className="flex flex-col items-center gap-2">
                  <Toggle checked={state} onChange={() => {}} label={`Example ${state ? 'on' : 'off'}`} />
                  <span className={`text-xs font-bold uppercase tracking-widest ${state ? 'text-[#034EA2]' : 'text-slate-400'}`}>
                    {state ? 'On' : 'Off'}
                  </span>
                </div>
              ))}
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 3. Notification Rules Table ───────────────────────────────── */}
        <GallerySection
          id="notification-rules"
          title="Notification Rules Table"
          description="Two toggle columns (In-App + Email) per row, recipient chips inline, grouped by module. Try the search filter."
        >
          <Showcase
            title="Notification Settings — dual toggle columns"
            description="Toggle In-App and Email independently per event. Try the search filter."
            code={CODE.notifRule}
            tone="white"
            center={false}
          >
            <div className="w-full">
              <NotificationRulesTable />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 4. Audit Event Table ──────────────────────────────────────── */}
        <GallerySection
          id="audit-events"
          title="Audit Event Table"
          description="Single on/off toggle per row with severity badge. Global master switch disables all rows. Critical events shown with a rose badge. Used in: Audit Log Setup."
        >
          <Showcase
            title="Audit Log Configuration — single toggle per row"
            description="Toggle individual events. Try disabling the global switch to see the entire table dim. Critical events are always visible."
            code={CODE.auditRule}
            tone="white"
            center={false}
          >
            <div className="w-full">
              <AuditEventTable />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 5. Permission Matrix ──────────────────────────────────────── */}
        <GallerySection
          id="permission-matrix"
          title="Permission Matrix"
          description="Accordion rows — collapsed shows a summary (authority badge + scope dots + action count), expanded reveals the full config panel with Authority radio, Actions chips, Data Scope chips, and Lifecycle States chips. One row open at a time. Used in: Permission Protocols."
        >
          <Showcase
            title="Permission Protocols — expandable config rows"
            description="Click any row to expand its configuration. The collapsed state always shows a summary of the current settings."
            code={CODE.permRow}
            tone="white"
            center={false}
          >
            <div className="w-full">
              <PermissionMatrix />
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
