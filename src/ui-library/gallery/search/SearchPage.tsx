import { useState } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { Search } from './Search';
import { FilterChip } from '../filter-chip/FilterChip';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['input', 'filter-chip', 'toolbar', 'combobox']);

// ── Mock data ────────────────────────────────────────────────────────────────

const EMPLOYEES = [
  { id: 1,  name: 'Maria Santos',     dept: 'Human Resources', role: 'HR Manager',             status: 'Active'   },
  { id: 2,  name: 'Jose Reyes',       dept: 'Finance',          role: 'Senior Accountant',      status: 'Active'   },
  { id: 3,  name: 'Ana Cruz',         dept: 'IT',               role: 'Systems Analyst',        status: 'On Leave' },
  { id: 4,  name: 'Carlo Mendoza',    dept: 'Operations',       role: 'Logistics Officer',      status: 'Active'   },
  { id: 5,  name: 'Liza Tan',         dept: 'Human Resources',  role: 'Recruitment Specialist', status: 'Active'   },
  { id: 6,  name: 'Ramon Villanueva', dept: 'Finance',          role: 'Finance Analyst',        status: 'Inactive' },
  { id: 7,  name: 'Grace Bautista',   dept: 'IT',               role: 'Frontend Developer',     status: 'Active'   },
  { id: 8,  name: 'Mark Castillo',    dept: 'Operations',       role: 'Warehouse Supervisor',   status: 'Active'   },
];

const DEPARTMENTS = ['Finance', 'Human Resources', 'IT', 'Operations'];

const STATUS_PILL: Record<string, string> = {
  Active:    'bg-emerald-50 text-emerald-700',
  Inactive:  'bg-slate-100  text-slate-500',
  'On Leave': 'bg-amber-50  text-amber-700',
};

// ── Demo components ──────────────────────────────────────────────────────────

function BasicExample() {
  const [v, setV] = useState('');
  return (
    <div className="w-full max-w-sm">
      <Search value={v} onChange={(e) => setV(e.target.value)} placeholder="Search employees…" />
    </div>
  );
}

function ClearExample() {
  const [v, setV] = useState('');
  return (
    <div className="w-full max-w-sm">
      <Search
        value={v}
        onChange={(e) => setV(e.target.value)}
        onClear={() => setV('')}
        placeholder="Search and clear…"
      />
    </div>
  );
}

function FilterSearchMutualExclusionDemo() {
  const [search, setSearch]     = useState('');
  const [activeDept, setActiveDept] = useState<string | null>(null);

  // When a department filter is active it narrows by department — no search needed.
  // When no filter → search across all fields.
  const rows = EMPLOYEES.filter((e) => {
    if (activeDept) return e.dept === activeDept;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.dept.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q) ||
      e.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full space-y-4">
      {/* Toolbar row */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        {/* Left: department filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {DEPARTMENTS.map((dept) =>
            activeDept === dept ? (
              <FilterChip
                key={dept}
                label={dept}
                onRemove={() => setActiveDept(null)}
              />
            ) : (
              <button
                key={dept}
                type="button"
                onClick={() => { setActiveDept(dept); setSearch(''); }}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand-blue/30 hover:bg-blue-50 hover:text-brand-blue"
              >
                {dept}
              </button>
            )
          )}
        </div>

        {/* Right: Search — HIDDEN when a department filter is active */}
        {!activeDept && (
          <div className="w-64">
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
              placeholder="Search name, role, department…"
              aria-label="Search employees"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left">
              {['Name', 'Department', 'Role', 'Status'].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 font-semibold text-slate-800">{e.name}</td>
                <td className="px-4 py-3 text-slate-500">{e.dept}</td>
                <td className="px-4 py-3 text-slate-500">{e.role}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STATUS_PILL[e.status] ?? ''}`}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="py-8 text-center text-sm font-medium text-slate-400">No results</div>
        )}
      </div>

      <p className="text-xs font-medium text-slate-400">
        {activeDept
          ? `Filtered by ${activeDept} — ${rows.length} result${rows.length !== 1 ? 's' : ''}. Search hidden — filter covers discovery.`
          : search.trim()
            ? `${rows.length} result${rows.length !== 1 ? 's' : ''} for "${search}"`
            : `${EMPLOYEES.length} employees`
        }
      </p>
    </div>
  );
}

// ── Global search mock data ───────────────────────────────────────────────────

const PAGES = [
  { id: 'page-a', label: 'Page A — Employee Directory',   desc: 'Full list of all employees with filters and sorting.' },
  { id: 'page-b', label: 'Page B — Payroll Summary',      desc: 'Monthly payroll breakdown by department and position.' },
  { id: 'page-c', label: 'Page C — Leave Management',     desc: 'Track employee leave requests, balances, and approvals.' },
  { id: 'page-d', label: 'Page D — Org Structure',        desc: 'Visualise the company organisational hierarchy.' },
  { id: 'page-e', label: 'Page E — System Settings',      desc: 'Manage roles, permissions, and user access.' },
  { id: 'page-f', label: 'Page F — Reports Center',       desc: 'Generate and export HR reports by date range.' },
];

// ── Searchable data table demo ────────────────────────────────────────────────

function AllFieldsDataTableDemo() {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? EMPLOYEES.filter((e) => {
        const q = search.toLowerCase();
        return (
          e.name.toLowerCase().includes(q) ||
          e.dept.toLowerCase().includes(q) ||
          e.role.toLowerCase().includes(q) ||
          e.status.toLowerCase().includes(q)
        );
      })
    : EMPLOYEES;

  return (
    <div className="w-full space-y-3">
      {/* Toolbar with search */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold text-slate-500">
          {search.trim()
            ? <><span className="font-bold text-brand-blue">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for "<span className="font-bold">{search}</span>"</>
            : <><span className="font-bold text-slate-700">{EMPLOYEES.length}</span> employees</>
          }
        </p>
        <div className="w-72">
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search name, dept, role, or status…"
            aria-label="Search employee table"
          />
        </div>
      </div>

      {/* Data table */}
      <div className="overflow-hidden rounded-xl border border-slate-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left">
              {['Name', 'Department', 'Role', 'Status'].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 font-semibold text-slate-800">
                  {/* Highlight matching text */}
                  {search.trim() && e.name.toLowerCase().includes(search.toLowerCase())
                    ? <mark className="bg-brand-blue/10 text-brand-blue rounded px-0.5">{e.name}</mark>
                    : e.name}
                </td>
                <td className="px-4 py-3 text-slate-500">{e.dept}</td>
                <td className="px-4 py-3 text-slate-500">{e.role}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STATUS_PILL[e.status] ?? ''}`}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-10 text-center text-sm font-medium text-slate-400">
            No employees match "<span className="font-semibold">{search}</span>"
          </div>
        )}
      </div>
      <p className="text-xs font-medium text-slate-400">Searches name, department, role, and status simultaneously.</p>
    </div>
  );
}

// ── Global search demo ────────────────────────────────────────────────────────

function GlobalSearchDemo() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const results = query.trim()
    ? PAGES.filter((p) => {
        const q = query.toLowerCase();
        return p.label.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
      })
    : [];

  const showPanel = focused && query.trim().length > 0;

  return (
    <div className="w-full max-w-md space-y-3">
      <p className="text-xs font-semibold text-slate-500">
        Try typing: <span className="font-bold text-brand-blue">"payroll"</span>, <span className="font-bold text-brand-blue">"leave"</span>, <span className="font-bold text-brand-blue">"page"</span>
      </p>

      <div className="relative">
        <Search
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => { setQuery(''); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search across all pages…"
          aria-label="Global search"
          aria-expanded={showPanel}
          aria-haspopup="listbox"
        />

        {/* Results panel */}
        {showPanel && (
          <div
            role="listbox"
            aria-label="Page results"
            className="absolute left-0 right-0 top-full z-20 mt-1.5 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden"
          >
            {results.length > 0 ? (
              <>
                <div className="px-4 py-2 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pages</span>
                </div>
                {results.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    role="option"
                    aria-selected={false}
                    className="flex w-full flex-col gap-0.5 px-4 py-3 text-left transition hover:bg-blue-50 focus-visible:outline-none focus-visible:bg-blue-50"
                    onClick={() => { setQuery(''); setFocused(false); }}
                  >
                    <span className="text-sm font-semibold text-slate-800">{page.label}</span>
                    <span className="text-xs font-medium text-slate-400">{page.desc}</span>
                  </button>
                ))}
              </>
            ) : (
              <div className="px-4 py-4 text-sm font-medium text-slate-400">
                No pages found for "<span className="font-semibold">{query}</span>"
              </div>
            )}
          </div>
        )}
      </div>

      {!showPanel && !query && (
        <p className="text-xs font-medium text-slate-400">
          Available pages: {PAGES.map((p) => p.id.toUpperCase()).join(', ')}
        </p>
      )}
    </div>
  );
}

// ── Code strings ─────────────────────────────────────────────────────────────

const CODE = {
  basic: `import { Search } from '@diwauhris/ui';
import { useState } from 'react';

const [query, setQuery] = useState('');

<Search
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search employees…"
/>`,

  withClear: `import { Search } from '@diwauhris/ui';
import { useState } from 'react';

const [query, setQuery] = useState('');

// Pass onClear to show the × button when the input has a value
<Search
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery('')}
  placeholder="Search and clear…"
/>`,

  disabled: `<Search
  value=""
  onChange={() => {}}
  placeholder="Search disabled"
  disabled
/>`,

  mutualExclusion: `import { Search } from '@diwauhris/ui';
import { FilterChip } from '@diwauhris/ui';
import { useState } from 'react';

const [search, setSearch]   = useState('');
const [activeDept, setActiveDept] = useState(null);

// Rule: when a filter is active, hide the Search — it already covers discovery.
// When filter is cleared, the Search reappears.

<div className="flex items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3">
  {/* Department filter chips */}
  <div className="flex flex-wrap gap-2">
    {departments.map((dept) =>
      activeDept === dept ? (
        <FilterChip key={dept} label={dept} onRemove={() => setActiveDept(null)} />
      ) : (
        <button key={dept} onClick={() => { setActiveDept(dept); setSearch(''); }}>
          {dept}
        </button>
      )
    )}
  </div>

  {/* Search hidden when a filter is active */}
  {!activeDept && (
    <Search
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onClear={() => setSearch('')}
      placeholder="Search name, role, department…"
    />
  )}
</div>`,

  allFields: `// Search across multiple fields simultaneously
const filtered = employees.filter((e) => {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return (
    e.name.toLowerCase().includes(q)       ||
    e.department.toLowerCase().includes(q) ||
    e.role.toLowerCase().includes(q)       ||
    e.status.toLowerCase().includes(q)
  );
});`,

  dataTable: `import { Search } from '@diwauhris/ui';
import { useState } from 'react';

const [search, setSearch] = useState('');

// Filter runs on every field — one input, all columns
const filtered = employees.filter((e) => {
  if (!search.trim()) return true;
  const q = search.toLowerCase();
  return (
    e.name.toLowerCase().includes(q) ||
    e.dept.toLowerCase().includes(q) ||
    e.role.toLowerCase().includes(q) ||
    e.status.toLowerCase().includes(q)
  );
});

<div className="space-y-3">
  <div className="flex items-center justify-between rounded-2xl border bg-white px-4 py-3 shadow-sm">
    <span className="text-xs font-semibold text-slate-500">
      {filtered.length} employee{filtered.length !== 1 ? 's' : ''}
    </span>
    <div className="w-72">
      <Search
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch('')}
        placeholder="Search name, dept, role, or status…"
      />
    </div>
  </div>
  <table>
    {/* ... render filtered rows */}
  </table>
</div>`,

  globalSearch: `import { Search } from '@diwauhris/ui';
import { useState } from 'react';

// Pages / sections registered for global search
const PAGES = [
  { id: 'page-a', label: 'Page A — Employee Directory',   desc: 'Employee list with filters.' },
  { id: 'page-b', label: 'Page B — Payroll Summary',      desc: 'Monthly payroll breakdown.' },
  { id: 'page-c', label: 'Page C — Leave Management',     desc: 'Leave requests and balances.' },
  // ... add more pages
];

const [query, setQuery] = useState('');

// Match against page label + description
const results = query.trim()
  ? PAGES.filter((p) => {
      const q = query.toLowerCase();
      return p.label.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    })
  : [];

<div className="relative">
  <Search
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onClear={() => setQuery('')}
    placeholder="Search across all pages…"
    aria-expanded={results.length > 0}
    aria-haspopup="listbox"
  />

  {results.length > 0 && (
    <div role="listbox" className="absolute left-0 right-0 top-full mt-1.5 rounded-xl border bg-white shadow-xl">
      {results.map((page) => (
        <button key={page.id} role="option" onClick={() => navigate(page.route)}>
          <span>{page.label}</span>
          <span>{page.desc}</span>
        </button>
      ))}
    </div>
  )}
</div>`,
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SearchPage() {
  return (
    <GalleryLayout activeId="search">
      <title>Search — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Inputs"
          name="Search"
          description="A search input with a built-in icon and optional clear button. Purpose-built for filtering and discovery — not for form submission."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview">
          <ShowcasePreview standalone>
            <div className="w-full max-w-sm space-y-3">
              <BasicExample />
              <ClearExample />
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* States */}
        <GallerySection id="states" title="States">
          <ShowcaseGrid columns={2}>
            <Showcase title="Default" code={CODE.basic}>
              <div className="w-full max-w-xs"><BasicExample /></div>
            </Showcase>
            <Showcase
              title="With clear button"
              description="The × appears when the input has a value."
              code={CODE.withClear}
            >
              <div className="w-full max-w-xs"><ClearExample /></div>
            </Showcase>
            <Showcase title="Disabled" code={CODE.disabled}>
              <div className="w-full max-w-xs">
                <Search value="" onChange={() => {}} placeholder="Search disabled" disabled />
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* Filter / Search mutual exclusion */}
        <GallerySection
          id="filter-search-pattern"
          title="Filter vs. Search Pattern"
          description="When a filter is active and already narrows results to a meaningful subset, hide the Search input — the filter covers discovery. Only show Search when no filter is active."
        >
          <div className="mb-2 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
            <p className="text-sm font-bold text-blue-800">Design principle</p>
            <p className="mt-1 text-xs font-medium leading-relaxed text-blue-700">
              Filters and search are two navigation paths to the same goal. When both are visible simultaneously,
              they create visual noise and cognitive overhead. Choose one per context: use a filter when categories
              are known and discrete; use a search bar when the user needs freeform discovery across all fields.
            </p>
          </div>
          <Showcase
            code={CODE.mutualExclusion}
            language="tsx"
            title="Department filter active → Search hidden"
            description="Click a department chip to activate the filter — the search bar disappears. Click × on the chip to clear — the search bar returns."
            center={false}
            tone="white"
          >
            <FilterSearchMutualExclusionDemo />
          </Showcase>
        </GallerySection>

        {/* Searchable data table */}
        <GallerySection
          id="data-table"
          title="Searchable Data Table"
          description="Wire one Search input to filter every column. The user types once and gets matches from any field — name, department, role, or status."
        >
          <Showcase
            code={CODE.dataTable}
            language="tsx"
            title="Search filters all table columns"
            description="Try: 'finance', 'analyst', 'on leave', '2022'. The query is tested against every field simultaneously."
            center={false}
            tone="white"
          >
            <AllFieldsDataTableDemo />
          </Showcase>
        </GallerySection>

        {/* Global search */}
        <GallerySection
          id="global-search"
          title="Global Search"
          description="A single search input that spans multiple pages or sections. Results appear in a floating panel — click to navigate. Extend the PAGES registry with every route in your application."
        >
          <Showcase
            code={CODE.globalSearch}
            language="tsx"
            title="Search across Page A, Page B, Page C…"
            description="Type to find any registered page. The pattern works with any data source — routes, commands, records."
            center={false}
            tone="white"
          >
            <GlobalSearchDemo />
          </Showcase>
        </GallerySection>

        {/* All-fields search */}
        <GallerySection
          id="all-fields"
          title="All-Fields Filter Logic"
          description="The search filter pattern to copy — test a single query string against every relevant field."
        >
          <Showcase
            code={CODE.allFields}
            language="tsx"
            title="Filter logic — all fields"
            description="One query, every column. Copy this pattern into any component that needs freeform discovery."
            center={false}
          >
            <div className="w-full max-w-xs space-y-2">
              <ClearExample />
              <p className="text-xs font-medium text-slate-400">Try: "finance", "active", "analyst"</p>
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
            {(
              [
                ['Label', [
                  'Search does not include a visible label. Provide aria-label="Search [entity type]" on the component.',
                  'Example: aria-label="Search employees" or aria-label="Search components".',
                ]],
                ['type="search"', [
                  'The underlying input uses type="search". Browsers add a native × clear control on some platforms — this is supplementary to the onClear prop.',
                  'Screen readers announce type="search" inputs as "search field" providing semantic context.',
                ]],
                ['Clear button', [
                  'The × clear button has aria-label="Clear search" and is keyboard focusable.',
                  'It is only rendered when there is a value — empty search fields do not have an interactive element.',
                ]],
                ['Keyboard', [
                  'Tab focuses the input, then the × clear button (if visible).',
                  'Escape does NOT clear the input by default — wire it if your pattern requires it.',
                ]],
              ] as [string, string[]][]
            ).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{heading}</h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
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

        {/* API */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'value',       type: 'string',                                     description: 'Controlled input value.' },
            { name: 'onChange',    type: 'React.ChangeEventHandler<HTMLInputElement>',  description: 'Called on every keystroke.' },
            { name: 'onClear',     type: '() => void',                                 description: 'When provided, shows a × clear button while the input has a value. Call setQuery("") inside.' },
            { name: 'placeholder', type: 'string',           default: '"Search…"',     description: 'Input placeholder text.' },
            { name: 'disabled',    type: 'boolean',          default: 'false',         description: 'Disables the input and hides the clear button.' },
            { name: 'className',   type: 'string',                                     description: 'Additional Tailwind classes applied to the outer wrapper div.' },
            { name: 'ref',         type: 'React.Ref<HTMLInputElement>',                description: 'Forwarded to the underlying input element.' },
            { name: '...rest',     type: 'React.ComponentProps<"input">',              description: 'All other native input attributes are forwarded (aria-label, onKeyDown, etc.).' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
