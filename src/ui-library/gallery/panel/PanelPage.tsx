/**
 * PanelPage — Gallery (Layout)
 *
 * Documents the two-panel catalog + detail layout pattern used across
 * NewUHRIS settings pages (Salary Grade, Position Template, Org Structure).
 *
 * Architecture: ButtonPage pattern
 *   Header → Overview (visual only) → Variants (each = Showcase) → Accessibility → Related
 */

import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['page-sample', 'form-sample', 'table', 'description-list']);

// ── Mock data ──────────────────────────────────────────────────────────────

const GRADES = [
  {
    id: 1, code: 'SG-1', name: 'Grade 1', type: 'Monthly', status: 'Active',
    min: '₱18,000', max: '₱22,000',
    steps: [
      { step: 1, name: 'Entry',        amount: '₱18,000' },
      { step: 2, name: 'Intermediate', amount: '₱19,500' },
      { step: 3, name: 'Senior',       amount: '₱21,000' },
      { step: 4, name: 'Expert',       amount: '₱22,000' },
    ],
  },
  {
    id: 2, code: 'SG-2', name: 'Grade 2', type: 'Monthly', status: 'Active',
    min: '₱22,001', max: '₱28,000',
    steps: [
      { step: 1, name: 'Entry',        amount: '₱22,001' },
      { step: 2, name: 'Intermediate', amount: '₱24,000' },
      { step: 3, name: 'Senior',       amount: '₱26,000' },
      { step: 4, name: 'Expert',       amount: '₱28,000' },
    ],
  },
  {
    id: 3, code: 'SG-3', name: 'Grade 3', type: 'Monthly', status: 'Active',
    min: '₱28,001', max: '₱36,000',
    steps: [
      { step: 1, name: 'Entry',        amount: '₱28,001' },
      { step: 2, name: 'Intermediate', amount: '₱31,000' },
      { step: 3, name: 'Senior',       amount: '₱34,000' },
      { step: 4, name: 'Expert',       amount: '₱36,000' },
    ],
  },
  {
    id: 4, code: 'SG-4', name: 'Grade 4', type: 'Monthly', status: 'Inactive',
    min: '₱36,001', max: '₱46,000',
    steps: [
      { step: 1, name: 'Entry',        amount: '₱36,001' },
      { step: 2, name: 'Intermediate', amount: '₱40,000' },
      { step: 3, name: 'Senior',       amount: '₱43,000' },
      { step: 4, name: 'Expert',       amount: '₱46,000' },
    ],
  },
];

// ── Shared primitives ──────────────────────────────────────────────────────

function StatusPill({ status }: { status: string }) {
  const cls = status === 'Active'
    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    : 'bg-slate-100 text-slate-500 border border-slate-200';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${cls}`}>
      {status}
    </span>
  );
}

/** Standalone panel card — title, optional description, content */
function Panel({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4">
        <div>
          <h3 className="font-heading text-sm font-bold text-slate-900">{title}</h3>
          {description && (
            <p className="mt-0.5 text-xs font-medium text-slate-400">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/** Selectable catalog item */
function CatalogItem({
  title,
  subtitle,
  meta,
  selected,
  onClick,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
        selected
          ? 'border-brand-blue/30 bg-blue-50/60 shadow-sm'
          : 'border-slate-200 bg-white hover:bg-slate-50',
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className={`text-sm font-bold truncate ${selected ? 'text-brand-navy' : 'text-slate-900'}`}>
            {title}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-xs font-medium text-slate-400 truncate">{subtitle}</p>
          )}
        </div>
        <ChevronRight
          size={14}
          className={`shrink-0 transition ${selected ? 'text-brand-blue' : 'text-slate-300'}`}
          aria-hidden="true"
        />
      </div>
      {meta && (
        <p className="mt-2 text-[11px] font-semibold text-slate-400">{meta}</p>
      )}
    </button>
  );
}

/** Description list row */
function DescRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
      <span className="text-xs font-semibold text-slate-400 shrink-0">{label}</span>
      <span className="text-sm font-semibold text-slate-800 text-right">{value}</span>
    </div>
  );
}

// ── Full two-panel overview demo ───────────────────────────────────────────

function TwoPanelDemo() {
  const [selectedId, setSelectedId] = useState(GRADES[0]!.id);
  const [search, setSearch] = useState('');

  const filtered = GRADES.filter((g) => {
    const q = search.trim().toLowerCase();
    return !q || [g.code, g.name, g.type].join(' ').toLowerCase().includes(q);
  });

  const selected = GRADES.find((g) => g.id === selectedId) ?? GRADES[0]!;

  return (
    <div className="w-full grid gap-5 xl:grid-cols-[0.85fr,1.15fr]">
      {/* Left — catalog panel */}
      <Panel title="Grade Catalog" description="Select a grade to view its step ladder.">
        {/* Search */}
        <label className="relative mb-3 flex items-center">
          <span className="sr-only">Search grades</span>
          <Search size={13} className="absolute left-3 text-slate-400 pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search grade code or name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue"
          />
        </label>
        {/* Items */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm font-medium text-slate-400">No grades match your search.</p>
          ) : (
            filtered.map((g) => (
              <CatalogItem
                key={g.id}
                title={g.code}
                subtitle={g.name}
                meta={`${g.min} – ${g.max} · ${g.steps.length} steps`}
                selected={selectedId === g.id}
                onClick={() => setSelectedId(g.id)}
              />
            ))
          )}
        </div>
      </Panel>

      {/* Right — detail panel */}
      <Panel
        title={selected.code}
        description={selected.name}
        action={<StatusPill status={selected.status} />}
      >
        <div className="space-y-5">
          {/* Description list */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-1">
            <DescRow label="Grade Name"  value={selected.name} />
            <DescRow label="Rate Type"   value={selected.type} />
            <DescRow label="Minimum"     value={selected.min} />
            <DescRow label="Maximum"     value={selected.max} />
          </div>

          {/* Step ladder table */}
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  {['Step', 'Name', 'Amount'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {selected.steps.map((row) => (
                  <tr key={row.step} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3 text-sm font-bold text-brand-navy tabular-nums">{row.step}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700">{row.name}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900 tabular-nums">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Panel>
    </div>
  );
}

// ── Isolated demos for each showcase ──────────────────────────────────────

function BasicPanelDemo() {
  return (
    <div className="w-full max-w-sm">
      <Panel
        title="Grade Catalog"
        description="Browse the compensation bands."
        action={
          <button type="button"
            className="rounded-xl bg-brand-blue px-3 py-1.5 text-xs font-bold text-white transition hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
            Add Grade
          </button>
        }
      >
        <div className="space-y-2">
          {GRADES.slice(0, 3).map((g) => (
            <div key={g.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5">
              <div>
                <p className="text-sm font-bold text-slate-900">{g.code}</p>
                <p className="text-xs text-slate-400">{g.name}</p>
              </div>
              <StatusPill status={g.status} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function CatalogPanelDemo() {
  const [selectedId, setSelectedId] = useState(GRADES[0]!.id);
  return (
    <div className="w-full max-w-xs">
      <Panel title="Grade Catalog" description="Click to select a grade.">
        <div className="space-y-2">
          {GRADES.map((g) => (
            <CatalogItem
              key={g.id}
              title={g.code}
              subtitle={g.name}
              meta={`${g.min} – ${g.max}`}
              selected={selectedId === g.id}
              onClick={() => setSelectedId(g.id)}
            />
          ))}
        </div>
      </Panel>
    </div>
  );
}

function DetailPanelDemo() {
  const g = GRADES[0]!;
  return (
    <div className="w-full">
      <Panel title={g.code} description={g.name} action={<StatusPill status={g.status} />}>
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-1">
            <DescRow label="Rate Type" value={g.type} />
            <DescRow label="Minimum"   value={g.min} />
            <DescRow label="Maximum"   value={g.max} />
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  {['Step', 'Name', 'Amount'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {g.steps.map((row) => (
                  <tr key={row.step}>
                    <td className="px-4 py-3 text-sm font-bold text-brand-navy tabular-nums">{row.step}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700">{row.name}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900 tabular-nums">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Panel>
    </div>
  );
}

// ── Code strings ───────────────────────────────────────────────────────────

const CODE = {
  basicPanel: `// Panel — white card with header (title + description + action) and content slot
// brand-navy heading, brand-sky accent on selected states

<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  {/* Panel header */}
  <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4">
    <div>
      <h3 className="font-heading text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-0.5 text-xs font-medium text-slate-400">{description}</p>
    </div>
    {/* Optional action slot */}
    <button className="rounded-xl bg-brand-blue px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-navy">
      Add Grade
    </button>
  </div>

  {/* Panel content */}
  <div className="p-6">
    {children}
  </div>
</div>`,

  catalogItem: `// Selectable catalog item — blue-tinted selected state
// CatalogItem inside a Panel, repeated for each list entry

{items.map((item) => (
  <button
    key={item.id}
    type="button"
    onClick={() => setSelectedId(item.id)}
    className={[
      'w-full rounded-2xl border p-4 text-left transition',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
      selectedId === item.id
        ? 'border-brand-blue/30 bg-blue-50/60 shadow-sm'
        : 'border-slate-200 bg-white hover:bg-slate-50',
    ].join(' ')}
  >
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className={
          selectedId === item.id
            ? 'text-sm font-bold text-brand-navy truncate'
            : 'text-sm font-bold text-slate-900 truncate'
        }>
          {item.code}
        </p>
        <p className="mt-0.5 text-xs font-medium text-slate-400 truncate">{item.name}</p>
      </div>
      <ChevronRight size={14} className={
        selectedId === item.id ? 'text-brand-blue' : 'text-slate-300'
      } aria-hidden="true" />
    </div>
    <p className="mt-2 text-[11px] font-semibold text-slate-400">{item.meta}</p>
  </button>
))}`,

  detailPanel: `// Detail panel — description list + table for the selected item
// Sits in the right column of the two-panel grid

<Panel title={selected.code} description={selected.name} action={<StatusPill status={selected.status} />}>
  {/* Description list */}
  <div className="rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-1">
    {[
      ['Rate Type', selected.type],
      ['Minimum',   selected.min],
      ['Maximum',   selected.max],
    ].map(([label, value]) => (
      <div key={label}
        className="flex items-baseline justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
        <span className="text-xs font-semibold text-slate-400">{label}</span>
        <span className="text-sm font-semibold text-slate-800">{value}</span>
      </div>
    ))}
  </div>

  {/* Step ladder table */}
  <div className="overflow-hidden rounded-xl border border-slate-200">
    <table className="min-w-full">
      <thead>
        <tr className="border-b border-slate-100 bg-slate-50/80">
          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Step</th>
          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Name</th>
          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Amount</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {selected.steps.map((row) => (
          <tr key={row.step} className="hover:bg-slate-50/60">
            <td className="px-4 py-3 text-sm font-bold text-brand-navy tabular-nums">{row.step}</td>
            <td className="px-4 py-3 text-sm font-medium text-slate-700">{row.name}</td>
            <td className="px-4 py-3 text-sm font-semibold text-slate-900 tabular-nums">{row.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</Panel>`,

  twoPanel: `// Two-panel layout — narrow catalog list + wider detail panel
// xl:grid-cols-[0.85fr,1.15fr] collapses to single column below xl

<div className="grid gap-5 xl:grid-cols-[0.85fr,1.15fr]">
  {/* Left — catalog panel with search */}
  <Panel title="Grade Catalog" description="Select a grade to view its step ladder.">
    {/* Search input */}
    <label className="relative mb-3 flex items-center">
      <span className="sr-only">Search grades</span>
      <Search size={13} className="absolute left-3 text-slate-400" aria-hidden="true" />
      <input
        type="search"
        placeholder="Search grade code or name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-slate-200 pl-8 pr-3 py-2 text-sm
                   focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      />
    </label>

    {/* Selectable items */}
    <div className="space-y-2">
      {filtered.map((item) => (
        <CatalogItem
          key={item.id}
          title={item.code}
          subtitle={item.name}
          meta={\`\${item.min} – \${item.max} · \${item.steps.length} steps\`}
          selected={selectedId === item.id}
          onClick={() => setSelectedId(item.id)}
        />
      ))}
    </div>
  </Panel>

  {/* Right — detail panel */}
  <Panel title={selected.code} description={selected.name}>
    {/* description list + table */}
  </Panel>
</div>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function PanelPage() {
  return (
    <GalleryLayout activeId="panel">
      <title>Panel — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Layout"
          name="Panel"
          description="A white card with a titled header and content slot. Composes into the two-panel catalog + detail layout used across settings and lookup pages in UHRIS."
          status="complete"
          importName={false}
        />

        {/* ── Overview ──────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="The full two-panel layout. Click a grade in the left catalog to update the right detail panel. Try the search to filter the list."
        >
          <ShowcasePreview standalone tone="light" center={false} minHeight="min-h-0">
            <TwoPanelDemo />
          </ShowcasePreview>
        </GallerySection>

        {/* ── Basic Panel ───────────────────────────────────────────── */}
        <GallerySection
          id="basic"
          title="Panel"
          description="The base Panel card — header with title, optional description, and optional action slot. Content slot accepts anything."
        >
          <Showcase code={CODE.basicPanel} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <BasicPanelDemo />
          </Showcase>
        </GallerySection>

        {/* ── Catalog Items ─────────────────────────────────────────── */}
        <GallerySection
          id="catalog"
          title="Catalog Panel"
          description="Selectable list items inside a Panel. Selected item gets brand-blue/30 border tint and brand-navy title. Click items to switch selection."
        >
          <Showcase code={CODE.catalogItem} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <CatalogPanelDemo />
          </Showcase>
        </GallerySection>

        {/* ── Detail Panel ──────────────────────────────────────────── */}
        <GallerySection
          id="detail"
          title="Detail Panel"
          description="Right-side detail view showing a description list and a data table for the selected item."
        >
          <Showcase code={CODE.detailPanel} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <DetailPanelDemo />
          </Showcase>
        </GallerySection>

        {/* ── Two-Panel Layout ──────────────────────────────────────── */}
        <GallerySection
          id="two-panel"
          title="Two-Panel Layout"
          description="Catalog and detail panels side by side. xl:grid-cols-[0.85fr,1.15fr] — collapses to a single column below xl breakpoint."
        >
          <Showcase code={CODE.twoPanel} language="tsx" tone="light" center={false} minHeight="min-h-0">
            <TwoPanelDemo />
          </Showcase>
        </GallerySection>

        {/* ── Accessibility ─────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {([
              ['Panel header', [
                'The panel title uses <h3>. In a real page, ensure the heading hierarchy is correct — <h1> for PageHeader, <h2> for GallerySection, <h3> for Panel.',
                'The action slot accepts any interactive element — ensure buttons have descriptive text or aria-label.',
              ]],
              ['Catalog items', [
                'Each catalog item is a <button type="button"> — keyboard accessible by default.',
                'Selected state is communicated visually (blue tint + color change). Consider adding aria-pressed="true" on the selected button for screen readers.',
                'The ChevronRight icon is aria-hidden="true" — it is decorative.',
              ]],
              ['Search input', [
                'The search input has a <label> with sr-only text — screen readers can identify the field.',
                'Filtering is deferred — consider useDeferredValue to avoid blocking the UI during fast typing.',
              ]],
              ['Detail panel table', [
                'The table uses implicit ARIA table role from the <table> element.',
                'Step numbers use tabular-nums so digit widths are consistent.',
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
