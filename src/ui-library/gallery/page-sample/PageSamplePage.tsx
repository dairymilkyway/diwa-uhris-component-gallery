/**
 * PageSamplePage — Gallery (Layout)
 *
 * Full HRIS list page layout: PageHeader → stat cards → toolbar → data table.
 *
 * Architecture: ButtonPage pattern
 *   Header → App Shell (sidebar + iso-cube bg) → Overview → Sections → Related
 *
 * NEW: App Shell section wraps the full page demo inside a realistic
 * UHRIS app shell — Sidebar component on the left + isometric cube
 * watermark pattern on the content background (from DIWA brand docs).
 */

import { useState, useDeferredValue } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Search,
  Download,
  UserPlus,
  ChevronUp,
  ChevronDown,
  Filter,
  LayoutDashboard,
  Briefcase,
  Calendar,
  Settings,
  BarChart2,
  Shield,
  Building,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { PageHeader } from '../page-header/PageHeader';
import { SidebarNav, SidebarSection, SidebarGroup, SidebarItem } from '../sidebar/Sidebar';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['sidebar', 'page-header', 'toolbar', 'table', 'stat-card']);

import { IsoCubeBlock } from './IsoCubeBlock';

// ── UHRIS nav config ──────────────────────────────────────────────────────

const NAV_CORE = [
  { id: 'dashboard',   label: 'Dashboard',    Icon: LayoutDashboard, badge: undefined as string | number | undefined },
  { id: 'employees',   label: 'Employees',    Icon: Users,           badge: 42 as string | number | undefined },
  { id: 'org',         label: 'Org Structure',Icon: Building,        badge: undefined as string | number | undefined },
];
const NAV_PAYROLL = [
  { id: 'payroll',     label: 'Payroll',      Icon: Briefcase,       badge: undefined as string | number | undefined },
  { id: 'timekeeping', label: 'Timekeeping',  Icon: Clock,           badge: undefined as string | number | undefined },
  { id: 'leaves',      label: 'Leave',        Icon: Calendar,        badge: undefined as string | number | undefined },
];
const NAV_ADMIN = [
  { id: 'reports',     label: 'Reports',      Icon: BarChart2,       badge: '3' as string | number | undefined },
  { id: 'policies',    label: 'Policies',     Icon: Shield,          badge: undefined as string | number | undefined },
  { id: 'settings',    label: 'Settings',     Icon: Settings,        badge: undefined as string | number | undefined },
];

// ── App Shell ────────────────────────────────────────────────────────────

function AppShell({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState('employees');

  const navItemClass = (id: string) =>
    activeId === id ? '' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900';

  return (
    <div
      className="flex overflow-hidden rounded-xl border border-slate-200 shadow-lg"
      style={{ height: 560, background: '#EEF3FB' }}
    >
      {/* ── White sidebar panel ───────────────────────────────────── */}
      <div
        className="flex w-56 flex-shrink-0 flex-col overflow-y-auto rounded-l-xl border-r border-slate-200"
        style={{ background: '#FFFFFF' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF3FB]">
            <Building size={16} className="text-[#034EA2]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[11px] font-black text-[#00377B] leading-none">UHRIS</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
              Diwa Learning Systems
            </p>
          </div>
        </div>

        {/* Nav — uses the real Sidebar component with its default light styling */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <SidebarNav aria-label="UHRIS navigation">
            <SidebarSection label="Core HR">
              {NAV_CORE.map(({ id, label, Icon, badge }) => (
                <SidebarItem
                  key={id}
                  active={activeId === id}
                  icon={<Icon size={15} />}
                  badge={badge}
                  onClick={() => setActiveId(id)}
                  className={navItemClass(id)}
                >
                  {label}
                </SidebarItem>
              ))}
            </SidebarSection>
            <SidebarGroup label="Payroll & Time" defaultExpanded>
              {NAV_PAYROLL.map(({ id, label, Icon, badge }) => (
                <SidebarItem
                  key={id}
                  active={activeId === id}
                  icon={<Icon size={15} />}
                  badge={badge}
                  onClick={() => setActiveId(id)}
                  className={navItemClass(id)}
                >
                  {label}
                </SidebarItem>
              ))}
            </SidebarGroup>
            <SidebarGroup label="Admin" defaultExpanded={false}>
              {NAV_ADMIN.map(({ id, label, Icon, badge }) => (
                <SidebarItem
                  key={id}
                  active={activeId === id}
                  icon={<Icon size={15} />}
                  badge={badge}
                  onClick={() => setActiveId(id)}
                  className={navItemClass(id)}
                >
                  {label}
                </SidebarItem>
              ))}
            </SidebarGroup>
          </SidebarNav>
        </div>

        {/* User strip */}
        <div className="flex items-center gap-2.5 border-t border-slate-100 px-4 py-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#00377B] text-[10px] font-black text-white">
            HR
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-bold text-slate-800">HR Admin</p>
            <p className="truncate text-[9px] text-slate-400">hr@diwa.edu.ph</p>
          </div>
        </div>
      </div>

      {/* ── Content area: cube block behind content ───────────────── */}
      <div className="relative flex-1 overflow-hidden rounded-r-xl" style={{ background: '#FFFFFF' }}>
        {/* Purple isometric cube block — z:0, behind everything */}
        <IsoCubeBlock />
        {/* Scrollable content layer — z:1, transparent bg so cubes show in gaps */}
        <div
          className="absolute inset-0 overflow-y-auto"
          style={{ zIndex: 1, background: 'transparent' }}
        >
          <div className="p-6">{children}</div>
          {/* Spacer so cubes are visible below the last card */}
          <div style={{ height: 220 }} />
        </div>
      </div>
    </div>
  );
}

// ── Mock data ──────────────────────────────────────────────────────────────

const EMPLOYEES = [
  { id: 1,  name: 'Maria Santos',    role: 'Senior Accountant',      dept: 'Finance',    status: 'Active',   date: 'Jan 15, 2021' },
  { id: 2,  name: 'Jose Reyes',      role: 'IT Infrastructure Lead',  dept: 'IT',         status: 'Active',   date: 'Mar 8, 2020'  },
  { id: 3,  name: 'Ana Dela Cruz',   role: 'HR Business Partner',    dept: 'HR',         status: 'On Leave', date: 'Jun 1, 2019'  },
  { id: 4,  name: 'Carlo Mendoza',   role: 'Operations Manager',     dept: 'Operations', status: 'Active',   date: 'Sep 22, 2022' },
  { id: 5,  name: 'Liza Bautista',   role: 'Legal Counsel',          dept: 'Legal',      status: 'Inactive', date: 'Feb 10, 2018' },
  { id: 6,  name: 'Mark Villanueva', role: 'Academic Coordinator',   dept: 'Academic',   status: 'Active',   date: 'Nov 3, 2023'  },
  { id: 7,  name: 'Rosa Aquino',     role: 'Payroll Specialist',     dept: 'Finance',    status: 'Active',   date: 'Apr 12, 2022' },
  { id: 8,  name: 'Ben Torres',      role: 'Systems Administrator',  dept: 'IT',         status: 'Active',   date: 'Aug 7, 2021'  },
  { id: 9,  name: 'Clara Navarro',   role: 'Recruitment Officer',    dept: 'HR',         status: 'Active',   date: 'Feb 28, 2023' },
  { id: 10, name: 'Dan Espiritu',    role: 'Compliance Analyst',     dept: 'Legal',      status: 'On Leave', date: 'Jul 19, 2020' },
] as const;

// Total employees in the simulated dataset — 10 shown on page 1, 28 total = 3 pages of 10
const TOTAL_EMPLOYEES = 28;

type SortKey = 'name' | 'dept' | 'status' | 'date';

const STATUS_STYLE: Record<string, string> = {
  Active:     'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'On Leave': 'bg-amber-50   text-amber-700   border border-amber-200',
  Inactive:   'bg-slate-100  text-slate-500   border border-slate-200',
};

// ── Shared primitives ──────────────────────────────────────────────────────

function StatTile({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
          <p className="mt-1.5 font-heading text-3xl font-bold text-slate-900 tabular-nums">{value}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50">
          <Icon size={18} className="text-slate-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STATUS_STYLE[status] ?? ''}`}>
      {status}
    </span>
  );
}

function Toolbar({
  search,
  onSearch,
  statusFilter,
  onStatusFilter,
}: {
  search: string;
  onSearch: (v: string) => void;
  statusFilter: string;
  onStatusFilter: (f: string) => void;
}) {
  const hasActiveFilter = statusFilter !== 'All';

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/75 px-4 py-3 shadow-sm flex-wrap backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <button type="button" className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
          <Filter size={12} aria-hidden="true" /> Filter
        </button>
        <span className="text-xs font-semibold text-slate-300" aria-hidden="true">|</span>
        {(['All', 'Active', 'On Leave', 'Inactive'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => { onStatusFilter(f); if (f !== 'All') onSearch(''); }}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 ${
              f === statusFilter ? 'bg-brand-navy text-white' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      {/* Search hidden when a status filter is active — the filter covers discovery */}
      {!hasActiveFilter && (
        <label className="relative flex items-center">
          <span className="sr-only">Search employees</span>
          <Search size={13} className="absolute left-3 text-slate-400 pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search by name, role, or department…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-64 rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue"
          />
        </label>
      )}
    </div>
  );
}

function DataTable({ rows, sortKey, sortDir, onSort }: {
  rows: typeof EMPLOYEES[number][];
  sortKey: SortKey;
  sortDir: 'asc' | 'desc';
  onSort: (k: SortKey) => void;
}) {
  const COLS: { key: SortKey; label: string }[] = [
    { key: 'name',   label: 'Employee'   },
    { key: 'dept',   label: 'Department' },
    { key: 'status', label: 'Status'     },
    { key: 'date',   label: 'Start Date' },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/75 shadow-sm backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {COLS.map((col) => (
                <th key={col.key} className="px-5 py-3.5 text-left">
                  <button type="button" onClick={() => onSort(col.key)}
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 hover:text-slate-700 transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-blue/30 rounded">
                    {col.label}
                    {sortKey === col.key
                      ? sortDir === 'asc'
                        ? <ChevronUp size={11} aria-hidden="true" />
                        : <ChevronDown size={11} aria-hidden="true" />
                      : <ChevronDown size={11} className="opacity-20" aria-hidden="true" />}
                  </button>
                </th>
              ))}
              <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-white/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-navy font-heading text-xs font-bold text-white" aria-hidden="true">
                      {row.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{row.name}</p>
                      <p className="text-xs font-medium text-slate-400">{row.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm font-medium text-slate-600">{row.dept}</td>
                <td className="px-5 py-4"><StatusPill status={row.status} /></td>
                <td className="px-5 py-4 text-sm font-medium text-slate-500">{row.date}</td>
                <td className="px-5 py-4">
                  <button type="button" className="text-xs font-bold text-brand-blue hover:text-brand-navy transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-between bg-white/60">
        <p className="text-xs font-semibold text-slate-400">Showing 1–{rows.length} of {TOTAL_EMPLOYEES} employees</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((p) => (
            <button key={p} type="button"
              className={`h-7 w-7 rounded-lg text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 ${p === 1 ? 'bg-brand-navy text-white' : 'text-slate-400 hover:bg-slate-100'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Full page overview ─────────────────────────────────────────────────────

function FullPageDemo() {
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortKey, setSortKey]           = useState<SortKey>('name');
  const [sortDir, setSortDir]           = useState<'asc' | 'desc'>('asc');
  const deferred = useDeferredValue(search);

  const rows = [...EMPLOYEES]
    .filter((e) => {
      // When status filter is active it covers discovery — search is hidden and not applied
      if (statusFilter !== 'All') return e.status === statusFilter;
      const q = deferred.trim().toLowerCase();
      return !q || [e.name, e.role, e.dept].join(' ').toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const av = a[sortKey] as string;
      const bv = b[sortKey] as string;
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  }

  return (
    <div className="w-full space-y-6">
      <PageHeader
        icon={<Users size={20} aria-hidden="true" />}
        title="Employee Directory"
        subtitle="Manage, filter, and track all team members."
        actions={
          <div className="flex items-center gap-2">
            <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/15">
              <Download size={15} aria-hidden="true" /> Export
            </button>
            <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
              <UserPlus size={15} aria-hidden="true" /> Add Employee
            </button>
          </div>
        }
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Total Employees" value={42} icon={Users} />
        <StatTile label="Active"          value={36} icon={UserCheck} />
        <StatTile label="On Leave"        value={4}  icon={Clock} />
        <StatTile label="Inactive"        value={2}  icon={UserX} />
      </div>
      <Toolbar search={search} onSearch={setSearch} statusFilter={statusFilter} onStatusFilter={setStatusFilter} />
      <DataTable rows={rows} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
    </div>
  );
}

// ── Code strings ───────────────────────────────────────────────────────────

const CODE = {
  appShell: `// App Shell — Sidebar component + isometric cube background
import { SidebarNav, SidebarSection, SidebarGroup, SidebarItem } from '@diwauhris/ui';
import { LayoutDashboard, Users, Building, Briefcase, Clock, Calendar,
         BarChart2, Shield, Settings } from '@diwauhris/ui';

// 1. White sidebar panel using the Sidebar component
<div className="flex w-56 flex-col bg-white border-r border-slate-200">
  <SidebarNav aria-label="UHRIS navigation">
    <SidebarSection label="Core HR">
      <SidebarItem active icon={<Users size={15} />} badge={42}>Employees</SidebarItem>
      <SidebarItem icon={<Building size={15} />}>Org Structure</SidebarItem>
    </SidebarSection>
    <SidebarGroup label="Payroll & Time" defaultExpanded>
      <SidebarItem icon={<Briefcase size={15} />}>Payroll</SidebarItem>
      <SidebarItem icon={<Clock size={15} />}>Timekeeping</SidebarItem>
    </SidebarGroup>
  </SidebarNav>
</div>

// 2. Content area — white bg + isometric cube SVG block bottom-right
<div className="relative flex-1 overflow-hidden bg-white">
  {/* DIWA isometric staircase SVG — z:0, bottom-right, behind content */}
  <IsoCubeBlock />
  {/* Scrollable content — cards use bg-white/75 backdrop-blur-sm */}
  <div className="absolute inset-0 overflow-y-auto" style={{ zIndex: 1 }}>
    <div className="p-6">{pageContent}</div>
  </div>
</div>`,

  header: `import { PageHeader } from '@diwauhris/ui';
import { Users, Download, UserPlus } from '@diwauhris/ui';

<PageHeader
  icon={<Users size={20} aria-hidden="true" />}
  title="Employee Directory"
  subtitle="Manage, filter, and track all team members."
  actions={
    <div className="flex items-center gap-2">
      <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200
                         bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm
                         hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-brand-blue/15">
        <Download size={15} aria-hidden="true" /> Export
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5
                         text-sm font-bold text-white shadow-lg shadow-brand-blue/20
                         hover:bg-brand-navy focus-visible:ring-2 focus-visible:ring-brand-blue/30">
        <UserPlus size={15} aria-hidden="true" /> Add Employee
      </button>
    </div>
  }
/>`,

  stats: `// 4-column stat card row — bg-white/75 backdrop-blur-sm for transparency
<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
  <div className="rounded-2xl border border-slate-200 bg-white/75 backdrop-blur-sm p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Total Employees
        </p>
        <p className="mt-1.5 font-heading text-3xl font-bold text-slate-900 tabular-nums">
          42
        </p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
        <Users size={18} className="text-slate-400" aria-hidden="true" />
      </div>
    </div>
  </div>
  {/* repeat for Active, On Leave, Inactive */}
</div>`,

  toolbar: `// Toolbar — bg-white/75 backdrop-blur-sm + filter pills + search
<div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200
                bg-white/75 backdrop-blur-sm px-4 py-3 shadow-sm flex-wrap">
  <div className="flex items-center gap-2">
    <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2
                       text-xs font-bold text-slate-600 hover:bg-slate-50">
      <Filter size={12} aria-hidden="true" /> Filter
    </button>
    {['All', 'Active', 'On Leave', 'Inactive'].map((f) => (
      <button
        key={f}
        className={f === activeFilter
          ? 'rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-bold text-white'
          : 'rounded-lg px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50'
        }
      >
        {f}
      </button>
    ))}
  </div>
  <label className="relative flex items-center">
    <span className="sr-only">Search employees</span>
    <Search size={13} className="absolute left-3 text-slate-400" aria-hidden="true" />
    <input
      type="search"
      placeholder="Search by name, role, or department…"
      className="w-64 rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-3
                 text-sm font-medium focus-visible:ring-2 focus-visible:ring-brand-blue/30"
    />
  </label>
</div>`,

  isoCubeBlock: `// DIWA Isometric Cube Background — import from @diwauhris/ui
import { IsoCubeBlock } from '@diwauhris/ui';

// Drop inside any relative container — it positions itself absolute bottom-right
<div className="relative overflow-hidden">
  <IsoCubeBlock />
  {/* Your content on top */}
  <div style={{ position: 'relative', zIndex: 1 }}>
    {children}
  </div>
</div>

// Optional: control box size
<IsoCubeBlock boxWidth={60} />`,

  table: `// Sortable table — bg-white/75 backdrop-blur-sm for glass effect
<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/75 backdrop-blur-sm shadow-sm">
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr className="border-b border-slate-100 bg-slate-50/60">
          {columns.map((col) => (
            <th key={col.key} className="px-5 py-3.5 text-left">
              <button onClick={() => onSort(col.key)}
                className="flex items-center gap-1.5 text-[11px] font-bold
                           uppercase tracking-[0.18em] text-slate-400 hover:text-slate-700">
                {col.label}
                {sortKey === col.key ? <ChevronUp size={11} /> : <ChevronDown size={11} className="opacity-20" />}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-white/60 transition-colors">
            <td className="px-5 py-4">
              <div className="flex items-center gap-3">
                {/* Initials avatar */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full
                                bg-brand-navy font-heading text-xs font-bold text-white"
                     aria-hidden="true">
                  {initials(row.name)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{row.name}</p>
                  <p className="text-xs font-medium text-slate-400">{row.role}</p>
                </div>
              </div>
            </td>
            <td className="px-5 py-4 text-sm text-slate-600">{row.dept}</td>
            <td className="px-5 py-4"><StatusPill status={row.status} /></td>
            <td className="px-5 py-4 text-sm text-slate-500">{row.date}</td>
            <td className="px-5 py-4">
              <button className="text-xs font-bold text-brand-blue hover:text-brand-navy">View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {/* Pagination footer */}
  <div className="border-t border-slate-100 bg-white/60 px-5 py-3 flex items-center justify-between">
    <p className="text-xs font-semibold text-slate-400">Showing {rows.length} of {total}</p>
    <div className="flex items-center gap-1">
      {pages.map((p) => (
        <button key={p}
          className={p === current
            ? 'h-7 w-7 rounded-lg bg-brand-navy text-white text-xs font-bold'
            : 'h-7 w-7 rounded-lg text-slate-400 hover:bg-slate-100 text-xs font-bold'}>
          {p}
        </button>
      ))}
    </div>
  </div>
</div>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function PageSamplePage() {
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortKey, setSortKey]           = useState<SortKey>('name');
  const [sortDir, setSortDir]           = useState<'asc' | 'desc'>('asc');
  const deferred = useDeferredValue(search);

  const rows = [...EMPLOYEES]
    .filter((e) => {
      if (statusFilter !== 'All') return e.status === statusFilter;
      const q = deferred.trim().toLowerCase();
      return !q || [e.name, e.role, e.dept].join(' ').toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const av = a[sortKey] as string;
      const bv = b[sortKey] as string;
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  }

  return (
    <GalleryLayout activeId="page-sample">
      <title>Page — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Layout"
          name="Page"
          description="A complete HRIS list page — PageHeader with actions, stat card row, filter toolbar, and sortable data table. Copy any zone independently or use the full layout as a starting shell."
          status="complete"
          importName={false}
        />

        {/* ── App Shell ─────────────────────────────────────────────── */}
        <GallerySection
          id="app-shell"
          title="App Shell"
          description="The full UHRIS page layout inside a realistic app shell — white Sidebar component on the left + content area with the DIWA isometric cube staircase decoration (bottom-right corner). Cards use bg-white/75 backdrop-blur-sm for a frosted-glass effect over the cube pattern."
        >
          <Showcase
            code={CODE.appShell}
            language="tsx"
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full">
              <AppShell>
                <FullPageDemo />
              </AppShell>
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Isometric Background ──────────────────────────────────── */}
        <GallerySection
          id="iso-background"
          title="Isometric Cube Background"
          description="The DIWA isometric staircase decoration — purple 3D boxes anchored to the bottom-right corner. Based on the DIWA Certificate of Completion corner motif. Pure SVG, no images, no gradients. Drop it into any white content area as a z:0 absolute element."
        >
          <Showcase
            code={CODE.isoCubeBlock}
            language="tsx"
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            {/* Live preview — white bg with the cube block */}
            <div className="relative w-full overflow-hidden rounded-xl border border-slate-200" style={{ height: 280, background: '#FFFFFF' }}>
              <IsoCubeBlock />
              <div className="absolute inset-0 flex items-start justify-start p-6" style={{ zIndex: 1 }}>
                <div className="rounded-xl border border-slate-200 bg-white/75 p-4 backdrop-blur-sm shadow-sm max-w-xs">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Usage note</p>
                  <p className="text-sm text-slate-700">Place <code className="font-mono text-xs bg-slate-100 px-1 rounded">IsoCubeBlock</code> as <code className="font-mono text-xs bg-slate-100 px-1 rounded">z:0 absolute bottom-0 right-0</code> inside a <code className="font-mono text-xs bg-slate-100 px-1 rounded">position: relative overflow-hidden</code> container.</p>
                </div>
              </div>
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Overview ──────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Content Zone Only"
          description="The same page without the shell — shows the raw layout zones. Interact with search and sort."
        >
          <ShowcasePreview standalone tone="light" center={false} minHeight="min-h-0">
            <FullPageDemo />
          </ShowcasePreview>
        </GallerySection>

        {/* ── Page Header ───────────────────────────────────────────── */}
        <GallerySection
          id="header"
          title="Page Header"
          description="The PageHeader component with icon badge, title, subtitle, and actions slot."
        >
          <Showcase code={CODE.header} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <div className="w-full">
              <PageHeader
                icon={<Users size={20} aria-hidden="true" />}
                title="Employee Directory"
                subtitle="Manage, filter, and track all team members."
                actions={
                  <div className="flex items-center gap-2">
                    <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/15">
                      <Download size={15} aria-hidden="true" /> Export
                    </button>
                    <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
                      <UserPlus size={15} aria-hidden="true" /> Add Employee
                    </button>
                  </div>
                }
              />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Stat Cards ────────────────────────────────────────────── */}
        <GallerySection
          id="stats"
          title="Stat Cards"
          description="4-column KPI row. grid-cols-2 on mobile, sm:grid-cols-4 on wider viewports."
        >
          <Showcase code={CODE.stats} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <div className="w-full grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile label="Total Employees" value={42} icon={Users} />
              <StatTile label="Active"          value={36} icon={UserCheck} />
              <StatTile label="On Leave"        value={4}  icon={Clock} />
              <StatTile label="Inactive"        value={2}  icon={UserX} />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Toolbar ───────────────────────────────────────────────── */}
        <GallerySection
          id="toolbar"
          title="Toolbar"
          description="Filter pills and search input in a single row. Active filter uses brand-navy pill."
        >
          <Showcase code={CODE.toolbar} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <div className="w-full">
              <Toolbar search={search} onSearch={setSearch} statusFilter={statusFilter} onStatusFilter={setStatusFilter} />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Data Table ────────────────────────────────────────────── */}
        <GallerySection
          id="table"
          title="Data Table"
          description="Sortable columns, initials avatar, status pills, and inline pagination footer."
        >
          <Showcase code={CODE.table} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <div className="w-full">
              <DataTable rows={rows} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Accessibility ─────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {([
              ['Page header', [
                'title renders as <h1> — one per page. Do not use PageHeader inside a section that already has an <h1>.',
                'Action buttons have visible text labels — icon-only buttons in the header must have aria-label.',
              ]],
              ['Toolbar', [
                'Search input has a <label> with sr-only text — it names the input for screen readers.',
                'Filter pill active state is communicated via visible text contrast — consider aria-pressed for toggle semantics.',
              ]],
              ['Table', [
                'Sort buttons live inside <th> elements — this preserves the column header association for screen readers.',
                'Status pills use text + color — color is never the sole indicator of state.',
                'Initials avatars are aria-hidden — the employee name in the adjacent <p> is the accessible label.',
              ]],
            ] as [string, string[]][]).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{heading}</h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
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
