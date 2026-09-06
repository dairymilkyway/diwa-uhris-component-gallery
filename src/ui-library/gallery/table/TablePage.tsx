/**
 * TablePage — Gallery infrastructure
 *
 * Documents the Tailwind table token system from shared/components/ui.tsx:
 * tableShell, tableToolbar, tableHead, tableCell, tableRow, tableActionGroup.
 *
 * This is a documentation page for the token pattern. It does not create
 * a new generic Table component abstraction.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
// Inlined CSS token strings from shared/components/ui.tsx
const buttonReset = 'appearance-none border-0 bg-none font-[inherit] leading-[inherit]';
const tableShell    = 'rounded-lg border border-slate-200 bg-white overflow-hidden';
const tableToolbar  = 'flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-100 px-5 py-4';
const tableHead     = 'border-b-2 border-slate-100 bg-brand-navy/[0.03] text-[11px] font-bold uppercase tracking-widest text-slate-500';
const tableCell     = 'px-5 py-3';
const tableRow      = 'group transition hover:bg-[#eef2f8] border-b border-slate-100 last:border-0';
const tableActionGroup = 'flex items-center justify-end gap-1 opacity-100 transition';
const btnPrimary = `${buttonReset} inline-flex items-center justify-center gap-2 rounded-md bg-brand-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition hover:bg-brand-navy active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none`;
const editIconBtn  = `${buttonReset} rounded-md p-2 text-slate-400 transition hover:bg-blue-50 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/20`;
const dangerIconBtn = `${buttonReset} rounded-md p-2 text-rose-400 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-100`;
import { getRelatedComponents } from '../../registry';
import { Pencil, Trash2 } from 'lucide-react';

const RELATED = getRelatedComponents(['badge', 'menu', 'pagination']);

// ── Demo data ──────────────────────────────────────────────────────────────

const DEMO_ROWS = [
  { id: '1', name: 'Engineering',    count: 12, status: 'Active'   },
  { id: '2', name: 'Finance',        count: 6,  status: 'Active'   },
  { id: '3', name: 'Human Resources', count: 4, status: 'Inactive' },
];

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  basic: `import { Pencil, Trash2 } from '@diwauhris/ui';

// Table tokens — copy these into your project or a shared constants file.
// They are Tailwind class strings, not React components.
const tableShell       = 'rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden';
const tableToolbar     = 'flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4';
const tableHead        = 'border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-widest text-slate-500';
const tableCell        = 'px-5 py-3';
const tableRow         = 'group transition hover:bg-slate-50/70';
const tableActionGroup = 'flex items-center justify-end gap-1';
const editIconBtn      = 'rounded-md p-2 text-slate-400 transition hover:bg-blue-50 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/20';
const dangerIconBtn    = 'rounded-md p-2 text-rose-400 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-100';
const btnPrimary       = 'inline-flex items-center gap-2 rounded-md bg-brand-blue px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30';

// Sample rows
const rows = [
  { id: '1', name: 'Engineering',     count: 12, status: 'Active'   },
  { id: '2', name: 'Finance',         count: 6,  status: 'Active'   },
  { id: '3', name: 'Human Resources', count: 4,  status: 'Inactive' },
];

<section className={tableShell}>
  <div className={tableToolbar}>
    <h2 className="text-sm font-bold text-slate-800">Departments</h2>
    <button className={btnPrimary}>Add Department</button>
  </div>
  <div className="overflow-x-auto">
    <table className="min-w-full text-left text-sm">
      <thead className={tableHead}>
        <tr>
          <th className={tableCell}>Name</th>
          <th className={tableCell}>Members</th>
          <th className={tableCell}>Status</th>
          <th className={tableCell} />
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {rows.map((row) => (
          <tr key={row.id} className={tableRow}>
            <td className={tableCell}>{row.name}</td>
            <td className={tableCell}>{row.count}</td>
            <td className={tableCell}>{row.status}</td>
            <td className={tableCell}>
              <div className={tableActionGroup}>
                <button className={editIconBtn} aria-label={\`Edit \${row.name}\`}>
                  <Pencil size={15} aria-hidden="true" />
                </button>
                <button className={dangerIconBtn} aria-label={\`Delete \${row.name}\`}>
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>`,

  tokens: `// Token values (from shared/components/ui.tsx)
export const tableShell    = 'rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden';
export const tableToolbar  = 'flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4';
export const tableHead     = 'border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-widest text-slate-500';
export const tableCell     = 'px-5 py-3';
export const tableRow      = 'group transition hover:bg-slate-50/70';
export const tableActionGroup = 'flex items-center justify-end gap-1 opacity-100 transition';`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function TablePage() {
  return (
    <GalleryLayout activeId="table">
      <title>Table — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Data Display"
          name="Table"
          description="A set of Tailwind class tokens that compose into a consistent, accessible data table. Not a React component — apply the six tokens (tableShell, tableToolbar, tableHead, tableCell, tableRow, tableActionGroup) as className values."
          status="complete"
          importName={false}
        />

        {/* Overview ── */}
        <GallerySection id="overview" title="Overview" description="A live table built entirely with the token system.">
          <ShowcasePreview standalone center={false}>
            <section className={`${tableShell} w-full`}>
              <div className={tableToolbar}>
                <h2 className="text-sm font-bold text-slate-800">Departments</h2>
                <button className={btnPrimary} type="button">Add Department</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className={tableHead}>
                    <tr>
                      <th className={tableCell}>Name</th>
                      <th className={tableCell}>Members</th>
                      <th className={tableCell}>Status</th>
                      <th className={tableCell} />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {DEMO_ROWS.map((row) => (
                      <tr key={row.id} className={tableRow}>
                        <td className={`${tableCell} font-medium text-slate-900`}>{row.name}</td>
                        <td className={tableCell}>{row.count}</td>
                        <td className={tableCell}>
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            row.status === 'Active'
                              ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                              : 'border-slate-200 bg-slate-50 text-slate-600'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className={tableCell}>
                          <div className={tableActionGroup}>
                            <button type="button" className={editIconBtn} aria-label={`Edit ${row.name}`}>
                              <Pencil size={15} aria-hidden="true" />
                            </button>
                            <button type="button" className={dangerIconBtn} aria-label={`Delete ${row.name}`}>
                              <Trash2 size={15} aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation ── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="The tokens are Tailwind class strings — copy them into your project or a shared constants file. Compose them directly on native HTML table elements."
        >
          <Showcase code={CODE.basic} language="tsx" title="Full table with toolbar and action column" center={false}>
            <section className={`${tableShell} w-full`}>
              <div className={tableToolbar}>
                <h2 className="text-sm font-bold text-slate-800">Departments</h2>
                <button className={btnPrimary} type="button">Add Department</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className={tableHead}>
                    <tr>
                      <th className={tableCell}>Name</th>
                      <th className={tableCell}>Members</th>
                      <th className={tableCell}>Status</th>
                      <th className={tableCell} />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {DEMO_ROWS.map((row) => (
                      <tr key={row.id} className={tableRow}>
                        <td className={`${tableCell} font-medium text-slate-900`}>{row.name}</td>
                        <td className={tableCell}>{row.count}</td>
                        <td className={tableCell}>
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            row.status === 'Active'
                              ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                              : 'border-slate-200 bg-slate-50 text-slate-600'
                          }`}>{row.status}</span>
                        </td>
                        <td className={tableCell}>
                          <div className={tableActionGroup}>
                            <button type="button" className={editIconBtn} aria-label={`Edit ${row.name}`}><Pencil size={15} aria-hidden="true" /></button>
                            <button type="button" className={dangerIconBtn} aria-label={`Delete ${row.name}`}><Trash2 size={15} aria-hidden="true" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </Showcase>
          <Showcase code={CODE.tokens} language="ts" title="Token definitions" center={false}>
            <div className="w-full space-y-2">
              {[
                { name: 'tableShell',       value: 'rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden' },
                { name: 'tableToolbar',     value: 'flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4' },
                { name: 'tableHead',        value: 'border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-widest text-slate-500' },
                { name: 'tableCell',        value: 'px-5 py-3' },
                { name: 'tableRow',         value: 'group transition hover:bg-slate-50/70' },
                { name: 'tableActionGroup', value: 'flex items-center justify-end gap-1 opacity-100 transition' },
              ].map(({ name, value }) => (
                <div key={name} className="flex items-start gap-3 rounded-lg bg-slate-50 border border-slate-100 px-4 py-2.5">
                  <code className="text-xs font-mono font-bold text-brand-blue shrink-0">{name}</code>
                  <code className="text-xs font-mono text-slate-500 break-all">{value}</code>
                </div>
              ))}
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Native HTML', [
                'The token system uses native <table>, <thead>, <tbody>, <tr>, <th>, <td> elements which provide full screen-reader accessibility without extra ARIA.',
                '<th> cells establish column headers automatically. For complex tables, add scope="col" or scope="row" if the header relationship is ambiguous.',
              ]],
              ['Action columns', [
                'tableActionGroup produces an icon-button row. Each icon button must have an aria-label describing its action and its target row (e.g., aria-label="Edit Engineering").',
                'Use the editIconBtn and dangerIconBtn class strings for the action buttons.',
              ]],
              ['Responsive', [
                'Wrap the <table> in <div className="overflow-x-auto"> to allow horizontal scrolling on narrow screens without breaking the layout.',
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
          <ApiTable props={[
            { name: 'tableShell',       type: 'string', description: 'Outer container: rounded-xl border shadow overflow-hidden. Apply to <section> or <div>.' },
            { name: 'tableToolbar',     type: 'string', description: 'Toolbar row above the table: flex justify-between, border-b, px-5 py-4.' },
            { name: 'tableHead',        type: 'string', description: '<thead> styling: uppercase 11px tracking-widest slate-500, slate-50 background, border-b.' },
            { name: 'tableCell',        type: 'string', description: '<th> and <td> padding: px-5 py-3.' },
            { name: 'tableRow',         type: 'string', description: '<tr> hover state: hover:bg-slate-50/70 with transition.' },
            { name: 'tableActionGroup', type: 'string', description: 'Action button container: flex items-center justify-end gap-1.' },
          ]} />
        </GallerySection>

        {/* Related ── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
