/**
 * EmptyStatePage — Gallery infrastructure (Display)
 * Documents the EmptyState design-system component.
 * Source: frontend/src/ui-library/gallery/empty-state/EmptyState.tsx
 */

import { FileText, Plus, Search, Users } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { EmptyState } from './EmptyState';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['alert', 'spinner', 'card', 'error-banner']);

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  basic: `import { EmptyState } from '@diwauhris/ui';
import { Users } from '@diwauhris/ui';

// Title only
<EmptyState title="No employees found" />

// With hint
<EmptyState
  title="No employees found"
  hint="Try adjusting your filters or create a new employee record."
/>

// With icon
<EmptyState
  icon={<Users size={32} aria-hidden="true" />}
  title="No team members yet"
  hint="Add your first employee to get started."
/>`,

  action: `// With action button — no routing logic inside EmptyState
import { EmptyState } from '@diwauhris/ui';
import { Plus } from '@diwauhris/ui';

<EmptyState
  icon={<Users size={32} aria-hidden="true" />}
  title="No employees yet"
  hint="Create your first employee record to get started."
  action={
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-navy"
      onClick={openCreate}
    >
      <Plus size={15} aria-hidden="true" /> Add Employee
    </button>
  }
/>`,

  inTable: `// Inside a table — conditional empty state
{rows.length === 0 ? (
  <div className="px-6 py-8">
    <EmptyState
      icon={<Search size={28} aria-hidden="true" />}
      title="No results match your filters"
      hint="Try clearing one or more active filters."
    />
  </div>
) : (
  rows.map((row) => <TableRow key={row.id} row={row} />)
)}`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function EmptyStatePage() {
  return (
    <GalleryLayout activeId="empty-state">
      <title>Empty State — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Display"
          name="Empty State"
          description="A centered placeholder for when a list or table has nothing to show. Accepts an icon, title, hint text, and an optional action button. Purely presentational."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="All slot combinations.">
          <ShowcasePreview standalone center={false}>
            <div className="w-full space-y-6">
              <ShowcaseGrid columns={3}>
                <div className="space-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Title only</p>
                  <EmptyState title="No results found" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Title + hint</p>
                  <EmptyState
                    title="No employees found"
                    hint="Try adjusting your search or filters."
                  />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Icon + title + hint</p>
                  <EmptyState
                    icon={<Users size={32} aria-hidden="true" />}
                    title="No team members yet"
                    hint="Add your first employee to get started."
                  />
                </div>
              </ShowcaseGrid>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">With action button</p>
                <EmptyState
                  icon={<Users size={32} aria-hidden="true" />}
                  title="No employees yet"
                  hint="Create your first employee record to get started."
                  action={
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-navy transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
                    >
                      <Plus size={15} aria-hidden="true" /> Add Employee
                    </button>
                  }
                />
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Usage examples */}
        <GallerySection id="examples" title="Usage Examples">
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={3}>
              <EmptyState
                icon={<Search size={28} aria-hidden="true" />}
                title="No search results"
                hint="Try a different keyword or clear the search."
              />
              <EmptyState
                icon={<FileText size={28} aria-hidden="true" />}
                title="No PAF forms yet"
                hint="Create a new Personnel Action Form to get started."
              />
              <EmptyState
                icon={<Users size={28} aria-hidden="true" />}
                title="No active shifts"
                hint="Click Add Shift to create the first shift schedule."
              />
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Basic variants">
            <EmptyState
              icon={<Users size={32} aria-hidden="true" />}
              title="No team members yet"
              hint="Add your first employee to get started."
            />
          </Showcase>

          <Showcase code={CODE.action} language="tsx" title="With action button">
            <EmptyState
              icon={<Users size={32} aria-hidden="true" />}
              title="No employees yet"
              hint="Create your first employee record to get started."
              action={
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-navy transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
                >
                  <Plus size={15} aria-hidden="true" /> Add Employee
                </button>
              }
            />
          </Showcase>

          <Showcase code={CODE.inTable} language="tsx" title="Inside a table">
            <div className="w-full max-w-sm px-6 py-4">
              <EmptyState
                icon={<Search size={28} aria-hidden="true" />}
                title="No results match your filters"
                hint="Try clearing one or more active filters."
              />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Structure', [
                'Renders a centered flex column with a dashed border — purely presentational.',
                'No interactive elements by default; no ARIA roles required on the component itself.',
              ]],
              ['Icons', [
                'The icon slot renders children directly. Mark decorative icons with aria-hidden="true" at the call site.',
                'Example: <Users size={32} aria-hidden="true" />',
              ]],
              ['Action slot', [
                'The action slot is passed as ReactNode — EmptyState applies no ARIA to it.',
                'Buttons in the action slot should have descriptive labels: "Add Employee" not just "Add".',
              ]],
              ['Dynamic list announcements', [
                'When EmptyState replaces a live list (e.g. after filtering), wrap the parent in aria-live="polite" to announce the change.',
                'EmptyState itself does not manage live-region announcements.',
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

        {/* API */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'title',    type: 'string',    required: true, description: 'Primary empty-state message.' },
            { name: 'hint',     type: 'string',                   description: 'Secondary guidance text shown below the title.' },
            { name: 'icon',     type: 'ReactNode',                description: 'Optional icon above the title. Use Lucide (size 28–40). Mark aria-hidden="true".' },
            { name: 'action',   type: 'ReactNode',                description: 'Optional slot for a call-to-action button or link. Rendered below the hint.' },
            { name: 'className', type: 'string',                  description: 'Additional class on the root container.' },
          ]} />
        </GallerySection>

        {/* Related */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
