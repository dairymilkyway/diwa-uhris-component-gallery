/**
 * PageHeaderPage — Gallery infrastructure (Layout)
 * Documents the PageHeader design-system component.
 * Source: frontend/src/ui-library/gallery/page-header/PageHeader.tsx
 */

import { Building2, Plus, Users } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { PageHeader } from './PageHeader';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['button', 'breadcrumb', 'card', 'toolbar']);

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  basic: `import { PageHeader } from '@diwauhris/ui';

// Title only
<PageHeader title="Employee Directory" />

// Title + subtitle
<PageHeader
  title="Org Structure"
  subtitle="Manage departments, reporting lines, and position templates."
/>`,

  withActions: `import { PageHeader } from '@diwauhris/ui';
import { Building2, Plus } from '@diwauhris/ui';

<PageHeader
  icon={<Building2 size={20} aria-hidden="true" />}
  title="Company Structure"
  subtitle="Manage departments and reporting relationships."
  actions={
    <div className="flex items-center gap-2">
      <button className={btnOutline}>Export</button>
      <button className={btnPrimary}>
        <Plus size={16} aria-hidden="true" /> New Department
      </button>
    </div>
  }
/>`,

  listPage: `// Typical list-page pattern (space-y-8 layout)
<div className="space-y-8">
  <PageHeader
    title="Position Templates"
    subtitle="Define reusable job titles independent of rank and pay structure."
    actions={
      canManage && (
        <button className={btnPrimary} onClick={openCreate}>
          <Plus size={16} aria-hidden="true" /> New Template
        </button>
      )
    }
  />
  {/* table / list content */}
</div>`,
};

// Inline button styles for demos (no production dependency)
const btnPrimary = [
  'inline-flex items-center justify-center gap-2 rounded-xl',
  'bg-brand-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20',
  'transition hover:bg-brand-navy active:scale-[.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
].join(' ');

const btnOutline = [
  'inline-flex items-center justify-center gap-2 rounded-xl',
  'border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm',
  'transition hover:border-slate-300 hover:bg-slate-50 active:scale-[.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/15',
].join(' ');

// ── Page ───────────────────────────────────────────────────────────────────

export default function PageHeaderPage() {
  return (
    <GalleryLayout activeId="page-header">
      <title>Page Header — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Layout"
          name="Page Header"
          description="The top of every list and detail page. An icon badge, a page title, an optional subtitle, and a slot for primary actions that stacks on mobile."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="All slot combinations at a glance.">
          <ShowcasePreview standalone center={false}>
            <div className="w-full space-y-6">
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Title only</p>
                <PageHeader title="Employee Directory" />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Title + subtitle</p>
                <PageHeader
                  title="Org Structure"
                  subtitle="Manage departments, reporting lines, and position templates."
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">With icon badge</p>
                <PageHeader
                  icon={<Building2 size={20} aria-hidden="true" />}
                  title="Company Structure"
                  subtitle="Manage departments and reporting relationships."
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">With actions</p>
                <PageHeader
                  icon={<Users size={20} aria-hidden="true" />}
                  title="Employee Directory"
                  subtitle="Manage, filter, and track all team members."
                  actions={
                    <div className="flex items-center gap-2">
                      <button className={btnOutline} type="button">Export</button>
                      <button className={btnPrimary} type="button">
                        <Plus size={16} aria-hidden="true" /> New Employee
                      </button>
                    </div>
                  }
                />
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Basic usage" center={false}>
            <div className="w-full">
              <PageHeader title="Employee Directory" subtitle="Manage, filter, and track all team members." />
            </div>
          </Showcase>
          <Showcase code={CODE.withActions} language="tsx" title="With icon and actions" center={false}>
            <div className="w-full">
              <PageHeader
                icon={<Building2 size={20} aria-hidden="true" />}
                title="Company Structure"
                subtitle="Manage departments and reporting relationships."
                actions={
                  <div className="flex items-center gap-2">
                    <button type="button" className={btnOutline}>Export</button>
                    <button type="button" className={btnPrimary}>
                      <Plus size={16} aria-hidden="true" /> New Department
                    </button>
                  </div>
                }
              />
            </div>
          </Showcase>
          <Showcase code={CODE.listPage} language="tsx" title="Typical list-page pattern" center={false}>
            <div className="w-full">
              <PageHeader
                title="Position Templates"
                subtitle="Define reusable job titles independent of rank and pay structure."
                actions={
                  <button type="button" className={btnPrimary}>
                    <Plus size={16} aria-hidden="true" /> New Template
                  </button>
                }
              />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Heading level', [
                'title renders as <h1>. Each page should have exactly one <h1> — the page title.',
                'Do not nest PageHeader inside a section that already has an <h1>.',
                'subtitle renders as a <p> element — not a heading.',
              ]],
              ['Icon badge', [
                'The icon is purely decorative — it sits inside a colored square for visual identity.',
                'Mark the icon element itself aria-hidden="true" at the call site.',
                'The <h1> title provides the page\'s accessible name; no additional label is needed on the badge.',
              ]],
              ['Actions slot', [
                'Buttons in the actions slot should have descriptive text or aria-label.',
                'On screens < 640px, actions stack below the title in a column layout via sm: breakpoint.',
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
            { name: 'title',     type: 'string',    required: true, description: 'Page heading. Rendered as <h1>. One per page.' },
            { name: 'subtitle',  type: 'string',                   description: 'Optional description below the heading. Rendered as <p>.' },
            { name: 'icon',      type: 'ReactNode',                description: 'Optional icon in the badge. Mark it aria-hidden="true".' },
            { name: 'actions',   type: 'ReactNode',                description: 'Optional actions slot. Stacks below title on mobile.' },
            { name: 'className', type: 'string',                   description: 'Additional class on the root container.' },
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
