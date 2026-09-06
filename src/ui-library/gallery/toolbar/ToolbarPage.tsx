/**
 * ToolbarPage — Gallery infrastructure (Layout)
 *
 * Documents the Toolbar layout component and the broader toolbar
 * convention used across UHRIS list pages.
 *
 * Multiple toolbar implementations exist in UHRIS:
 *   - PersonnelToolbar (personnel-module) — rounded-2xl pill, 5 consumers
 *   - ReportToolbar (reports) — same structure, 4 consumers
 *   - .settings-toolbar CSS — approvals/settings, 8 consumers
 *   - tableToolbar token — org/pay tables, 6 consumers
 *
 * This gallery page uses the gallery-native Toolbar.tsx, which provides
 * the same two-slot layout as PersonnelToolbar without the feature-module dependency.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { Toolbar } from './Toolbar';
import { getRelatedComponents } from '../../registry';
import { ChevronDown, Filter, Search } from 'lucide-react';
import { useState } from 'react';

const RELATED = getRelatedComponents(['dropdown', 'pagination', 'table']);

// ── Mock HRIS data ─────────────────────────────────────────────────────────

const EMPLOYEES = [
  { id: 1,  name: 'Maria Santos',     department: 'Human Resources', position: 'HR Manager',             status: 'active',    hired: '2019-03-15' },
  { id: 2,  name: 'Jose Reyes',       department: 'Finance',          position: 'Senior Accountant',      status: 'active',    hired: '2020-07-22' },
  { id: 3,  name: 'Ana Cruz',         department: 'IT',               position: 'Systems Analyst',        status: 'on-leave',  hired: '2021-01-10' },
  { id: 4,  name: 'Carlo Mendoza',    department: 'Operations',       position: 'Logistics Officer',      status: 'active',    hired: '2018-11-05' },
  { id: 5,  name: 'Liza Tan',         department: 'Human Resources',  position: 'Recruitment Specialist', status: 'active',    hired: '2022-04-18' },
  { id: 6,  name: 'Ramon Villanueva', department: 'Finance',          position: 'Finance Analyst',        status: 'inactive',  hired: '2017-09-30' },
  { id: 7,  name: 'Grace Bautista',   department: 'IT',               position: 'Frontend Developer',     status: 'active',    hired: '2023-02-14' },
  { id: 8,  name: 'Mark Castillo',    department: 'Operations',       position: 'Warehouse Supervisor',   status: 'active',    hired: '2020-05-01' },
  { id: 9,  name: 'Jenny Dela Cruz',  department: 'Finance',          position: 'Payroll Officer',        status: 'on-leave',  hired: '2021-08-20' },
  { id: 10, name: 'Paolo Aquino',     department: 'IT',               position: 'Backend Developer',      status: 'active',    hired: '2022-11-03' },
] as const;

type Employee = (typeof EMPLOYEES)[number];

const DEPARTMENTS = ['All', 'Human Resources', 'Finance', 'IT', 'Operations'] as const;

const STATUS_STYLES: Record<string, string> = {
  active:    'bg-emerald-50 text-emerald-700',
  inactive:  'bg-slate-100 text-slate-500',
  'on-leave':'bg-amber-50 text-amber-700',
};

// ── HRIS demo components ───────────────────────────────────────────────────

function EmployeeTable({ rows }: { rows: readonly Employee[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-left">
            {['Name', 'Department', 'Position', 'Status', 'Hired'].map((h) => (
              <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {rows.map((emp) => (
            <tr key={emp.id} className="hover:bg-slate-50/60">
              <td className="px-4 py-3 font-semibold text-slate-800">{emp.name}</td>
              <td className="px-4 py-3 text-slate-500">{emp.department}</td>
              <td className="px-4 py-3 text-slate-500">{emp.position}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize ${STATUS_STYLES[emp.status] ?? 'bg-slate-100 text-slate-500'}`}>
                  {emp.status.replace('-', ' ')}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-400 tabular-nums">{emp.hired}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className="py-10 text-center text-sm font-medium text-slate-400">No employees in this department</div>
      )}
    </div>
  );
}

function FilterOnlyDemo() {
  const [dept, setDept] = useState<string>('All');

  const filtered = dept === 'All'
    ? EMPLOYEES
    : EMPLOYEES.filter((e) => e.department === dept);

  return (
    <div className="space-y-3">
      <Toolbar
        left={
          <div className="flex flex-wrap items-center gap-2 p-1">
            {DEPARTMENTS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDept(d)}
                className={[
                  'rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
                  dept === d
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                ].join(' ')}
              >
                {d}
              </button>
            ))}
          </div>
        }
      />
      <EmployeeTable rows={filtered} />
      <p className="text-xs font-medium text-slate-400">Showing {filtered.length} of {EMPLOYEES.length} employees</p>
    </div>
  );
}

function SearchAllFieldsDemo() {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? EMPLOYEES.filter((e) => {
        const q = search.toLowerCase();
        return (
          e.name.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q) ||
          e.position.toLowerCase().includes(q) ||
          e.status.toLowerCase().includes(q) ||
          e.hired.includes(q)
        );
      })
    : EMPLOYEES;

  return (
    <div className="space-y-3">
      <Toolbar
        right={
          <div className="relative flex-1 max-w-sm p-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, department, position…"
              aria-label="Search employees across all fields"
              className="block w-full rounded-xl border-none bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/15"
            />
          </div>
        }
        left={<div />}
      />
      <EmployeeTable rows={filtered} />
      <p className="text-xs font-medium text-slate-400">
        {search.trim() ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${search}"` : `${EMPLOYEES.length} employees`}
      </p>
    </div>
  );
}

// ── Live examples ──────────────────────────────────────────────────────────

function FilterSearchExample() {
  return (
    <Toolbar
      left={
        <div className="flex items-center gap-2 p-1">
          <button type="button" className="inline-flex items-center gap-2 px-4 py-2 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
            <Filter size={14} aria-hidden="true" />
            <span>Department</span>
            <ChevronDown size={13} className="text-slate-300" aria-hidden="true" />
          </button>
          <button type="button" className="inline-flex items-center gap-2 px-4 py-2 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
            <Filter size={14} aria-hidden="true" />
            <span>Status</span>
            <ChevronDown size={13} className="text-slate-300" aria-hidden="true" />
          </button>
        </div>
      }
      right={
        <div className="relative flex-1 max-w-md p-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search employees..."
            aria-label="Search employees"
            className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-blue/15 transition-all placeholder-slate-400 font-medium outline-none"
          />
        </div>
      }
    />
  );
}

function ActionOnlyExample() {
  return (
    <Toolbar
      left={
        <div className="flex items-center gap-2 p-1">
          <button type="button" className="inline-flex items-center gap-2 px-4 py-2 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-600 transition-all">
            <Filter size={14} aria-hidden="true" /> Active
            <ChevronDown size={13} className="text-slate-300" aria-hidden="true" />
          </button>
        </div>
      }
      right={
        <div className="p-1">
          <button type="button" className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl text-sm font-bold hover:bg-brand-navy transition-all active:scale-95">
            Add Shift
          </button>
        </div>
      }
    />
  );
}

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  basic: `import { Toolbar } from '@diwauhris/ui';
import { Dropdown } from '@diwauhris/ui';
import { Search, Filter, ChevronDown } from '@diwauhris/ui';

// Left slot: filter dropdowns
// Right slot: search input or primary action button
<Toolbar
  left={
    <div className="flex items-center gap-2 p-1">
      <Dropdown
        trigger={<><Filter size={14} /><span>{currentDept}</span><ChevronDown size={13} /></>}
        isOpen={openDropdown === 'dept'}
        onToggle={() => setOpenDropdown(v => v === 'dept' ? null : 'dept')}
        onClose={() => setOpenDropdown(null)}
      >
        {departments.map(d => (
          <button key={d} type="button" onClick={() => { setDept(d); setOpenDropdown(null); }}
            className="block w-full text-left px-4 py-2 text-sm font-bold hover:bg-slate-50">
            {d}
          </button>
        ))}
      </Dropdown>
    </div>
  }
  right={
    <div className="relative flex-1 max-w-md p-1">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} aria-hidden="true" />
      <input
        type="search"
        placeholder="Search employees..."
        aria-label="Search employees"
        className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-blue/15 font-medium outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  }
/>`,

  actionRight: `// Right slot with primary action button
<Toolbar
  left={
    <div className="flex items-center gap-2 p-1">
      <Dropdown ...>...</Dropdown>
    </div>
  }
  right={
    <div className="p-1">
      <button type="button" className="... bg-brand-blue text-white ..."
        onClick={openCreate}>
        <Plus size={18} aria-hidden="true" />
        Add Shift
      </button>
    </div>
  }
/>`,

  structure: `// Toolbar renders:
//   <div className="flex flex-wrap items-center justify-between gap-4
//                   bg-white p-2 border border-slate-100 rounded-2xl shadow-sm">
//     {left}
//     {right}
//   </div>
//
// Visual: white pill with p-2, rounded-2xl, shadow-sm
// Responsive: flex-wrap — slots stack vertically on narrow viewports`,

  filterOnly: `// When the filter already narrows rows — no search bar needed.
// The department filter IS the search: it covers all employee discovery.
<Toolbar
  left={
    <div className="flex flex-wrap gap-2 p-1">
      {departments.map((dept) => (
        <button key={dept} onClick={() => setDept(dept)}
          className={dept === active ? 'bg-brand-blue text-white ...' : '...'}>
          {dept}
        </button>
      ))}
    </div>
  }
  // No right slot — the filter covers discovery
/>`,

  searchAllFields: `// When there is no filter — search covers all fields.
// Matches name, department, position, status, and hire date.
<Toolbar
  right={
    <div className="relative flex-1 max-w-sm p-1">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search name, department, position…"
      />
    </div>
  }
  left={<div />}
/>

// Filter logic — searches ALL fields:
const filtered = search
  ? employees.filter((e) =>
      e.name.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q) ||
      e.position.toLowerCase().includes(q) ||
      e.status.toLowerCase().includes(q) ||
      e.hired.includes(q)
    )
  : employees;`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function ToolbarPage() {
  return (
    <GalleryLayout activeId="toolbar">
      <title>Toolbar — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Layout"
          name="Toolbar"
          description="A horizontal container for search, filters, and action buttons above a data table or content section. Two slots — filters on the left, actions on the right."
          status="complete"
        />

        {/* Overview ── */}
        <GallerySection id="overview" title="Overview" description="Toolbar renders a white pill with a left slot for filters and a right slot for search or actions.">
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={1}>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Filters + Search (EmployeePage pattern)</p>
                <FilterSearchExample />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Filter + Primary Action (ShiftSchedulesTab pattern)</p>
                <ActionOnlyExample />
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation ── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="Import Toolbar from the gallery. Pass left and right slots."
        >
          <Showcase code={CODE.basic} language="tsx" title="Filters + search" center={false}>
            <div className="w-full">
              <FilterSearchExample />
            </div>
          </Showcase>
          <Showcase code={CODE.actionRight} language="tsx" title="Filters + action button" center={false}>
            <div className="w-full">
              <ActionOnlyExample />
            </div>
          </Showcase>
          <Showcase code={CODE.structure} language="tsx" title="Rendered structure" center={false}>
            <div className="w-full">
              <FilterSearchExample />
            </div>
          </Showcase>
        </GallerySection>

        {/* Live HRIS Pattern ── */}
        <GallerySection
          id="live-hris-pattern"
          title="Live HRIS Pattern"
          description="How to use Toolbar with a real data table. The key design principle: if the filter already covers discovery, don't add a redundant search bar."
        >
          {/* Design principle callout */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
            <p className="text-sm font-bold text-blue-800">Design principle: filter vs. search</p>
            <p className="mt-1 text-xs font-medium leading-relaxed text-blue-700">
              When a filter is active and already narrows rows to a meaningful subset (e.g. "show only HR employees"),
              a separate search bar is redundant. The filter IS the search. Add a search bar only when
              the user needs to find a specific row within a large unfiltered dataset.
            </p>
          </div>

          <Showcase
            code={CODE.filterOnly}
            language="tsx"
            title="With department filter — no search bar"
            description="The filter buttons cover all employee discovery. No search input is shown."
            center={false}
            tone="white"
          >
            <div className="w-full">
              <FilterOnlyDemo />
            </div>
          </Showcase>

          <Showcase
            code={CODE.searchAllFields}
            language="tsx"
            title="With search — searches all fields"
            description="No category filter. The search input matches name, department, position, status, and hire date."
            center={false}
            tone="white"
          >
            <div className="w-full">
              <SearchAllFieldsDemo />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Structure', [
                'Toolbar is a plain <div> — no ARIA role. The toolbar container has no implicit semantics.',
                'Wrap it in a <section aria-label="Filters"> if the page needs the filter toolbar announced as a landmark.',
              ]],
              ['Left slot — filter controls', [
                'Dropdown trigger buttons must have accessible text (icon + visible label is sufficient).',
                'The Escape key closes open filters via the gallery Dropdown\'s built-in handler.',
              ]],
              ['Right slot — search input', [
                'The search <input> should have aria-label="Search [entity type]" when no visible label is present.',
                'Example: aria-label="Search employees".',
              ]],
              ['Responsive', [
                'flex-wrap causes slots to stack vertically on narrow viewports (≤ ~640px). Ensure both slots remain accessible when stacked.',
              ]],
              ['Multiple toolbar implementations', [
                'Toolbar (gallery, rounded-2xl) is the canonical design-system component for filter + action toolbars.',
                'PersonnelToolbar (personnel-module) mirrors this layout — it is the production equivalent for Personnel list pages.',
                '.settings-toolbar (CSS, rounded-16px) is used in settings/approvals pages.',
                'tableToolbar (token string, px-5 py-4) is used in org/pay tables.',
              ]],
            ].map(([heading, items]) => (
              <div key={String(heading)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(heading)}</h3>
                <ul className="space-y-1.5">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GallerySection>

        {/* API ── */}
        <GallerySection id="api" title="API Reference">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Prop', 'Type', 'Required', 'Description'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  ['left',      'ReactNode', 'Yes', 'Left slot — filter dropdowns, Dropdown instances, segmented controls.'],
                  ['right',     'ReactNode', 'No',  'Right slot — search input or primary action button.'],
                  ['className', 'string',    'No',  'Additional class on the outer container.'],
                ].map(([name, type, req, desc]) => (
                  <tr key={String(name)} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3"><code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-800">{name}</code></td>
                    <td className="px-5 py-3 text-xs font-mono text-brand-blue">{type}</td>
                    <td className="px-5 py-3 text-xs text-slate-500">{req}</td>
                    <td className="px-5 py-3 text-xs font-medium text-slate-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GallerySection>

        {/* Related ── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
