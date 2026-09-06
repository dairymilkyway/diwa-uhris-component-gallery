/**
 * LayoutPatternsPage — Gallery infrastructure (Layout)
 *
 * Documents the Tailwind layout conventions for Container, Stack, and Grid
 * as used in UHRIS production pages.
 *
 * These are conventions, not components. No shared component exists.
 * All patterns are standard Tailwind utilities applied consistently.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['spacing', 'page-header', 'card']);

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  container: `// Standard page container — every list and detail page in UHRIS
// max-w-7xl = 80rem (1280px) — matches EmployeeDetailPage, OnboardingWizardPage, etc.
<div className="space-y-8 pb-20 max-w-7xl mx-auto">
  <PageHeader title="Employee Directory" />
  {/* page content */}
</div>

// Gallery content uses max-w-5xl (GalleryPageWrapper)
// Gallery header uses max-w-screen-2xl
// Print views use max-w-3xl (PafPrintView)`,

  stack: `// space-y-8: standard page section gap
// Used on every list page as the outer layout container gap.
<div className="space-y-8">
  <PageHeader ... />
  <PersonnelToolbar ... />
  <section className={tableShell}>
    {/* table */}
  </section>
</div>

// space-y-6: sub-section gap within a card
<section className={\`\${card} space-y-6 p-6\`}>
  <div className="...">Identity</div>
  <div className="...">Registration</div>
</section>

// space-y-4: form field group gap
<div className="space-y-4">
  <Field label="Name"><FieldInput ... /></Field>
  <Field label="Email"><FieldInput ... /></Field>
</div>

// space-y-1.5: Field-internal label → input → error
// Applied automatically by Field.tsx — do not set manually`,

  grid: `// Two-column form grid (modal forms, detail cards)
// grid-cols-1 on mobile, md:grid-cols-2 on tablet+
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <Field label="First Name"><FieldInput ... /></Field>
  <Field label="Last Name"><FieldInput ... /></Field>
</div>

// Three-column grid (CompanyProfilePage registration section)
<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
  ...
</div>

// Four-column stat/KPI cards (PisTabsPage, OrgHeadcountPage)
<div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
  <StatCard ... />
  <StatCard ... />
  <StatCard ... />
  <StatCard ... />
</div>

// Asymmetric grid (sidebar + main content)
<div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
  <aside>{/* catalog / sidebar */}</aside>
  <div>{/* main content */}</div>
</div>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function LayoutPatternsPage() {
  return (
    <GalleryLayout activeId={['container', 'stack', 'grid']}>
      <title>Layout Patterns — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Layout"
          name="Layout Patterns"
          description="The page-level layout patterns used across UHRIS. Not components — just the class combinations for max-width containers, vertical stacks, and responsive grids. Copy and use."
          status="complete"
          importName={false}
        />

        {/* Container ── */}
        <GallerySection
          id="container"
          title="Container"
          description="Maximum-width constraints and horizontal centering. Derived from actual production page implementations."
        >
          <Showcase code={CODE.container} language="tsx" title="Container conventions" center={false}>
            <div className="w-full space-y-3 text-sm font-medium text-slate-600">
              {[
                { cls: 'max-w-7xl mx-auto',       label: 'max-w-7xl (1280px)',      usage: 'Standard page content — EmployeeDetailPage, PositionTemplatesPage, etc.' },
                { cls: 'max-w-screen-2xl mx-auto', label: 'max-w-screen-2xl',        usage: 'Gallery header and layout shell' },
                { cls: 'max-w-5xl mx-auto',        label: 'max-w-5xl (1024px)',      usage: 'Gallery content (GalleryPageWrapper)' },
                { cls: 'max-w-3xl mx-auto',        label: 'max-w-3xl (768px)',       usage: 'Print views (PafPrintView)' },
              ].map(({ cls, label, usage }) => (
                <div key={cls} className="flex items-start gap-3">
                  <code className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-brand-blue whitespace-nowrap shrink-0">{cls}</code>
                  <div>
                    <span className="font-bold text-slate-700">{label}</span>
                    <span className="ml-2 text-slate-400">— {usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </Showcase>
        </GallerySection>

        {/* Stack ── */}
        <GallerySection
          id="stack"
          title="Stack (Vertical Spacing)"
          description="space-y-* hierarchy. These values are derived from consistent production usage — not arbitrary rules."
        >
          <Showcase code={CODE.stack} language="tsx" title="Stack spacing conventions" center={false}>
            <div className="w-full space-y-4">
              {[
                { cls: 'space-y-8', px: '32px', usage: 'Top-level page section gap. Between PageHeader, Toolbar, and table/card.' },
                { cls: 'space-y-6', px: '24px', usage: 'Sub-section gap within a card (space-y-6 inside card p-6).' },
                { cls: 'space-y-4', px: '16px', usage: 'Form field group gap inside modals and card sections.' },
                { cls: 'space-y-3', px: '12px', usage: 'Tighter field groups, list items.' },
                { cls: 'space-y-1.5', px: '6px', usage: 'Field-internal: label → input → error. Applied by Field.tsx automatically.' },
              ].map(({ cls, px, usage }) => (
                <div key={cls} className="flex items-start gap-3">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="bg-brand-sky/30 rounded" style={{ width: '3px', height: px }} aria-hidden="true" />
                    <code className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-brand-blue whitespace-nowrap">{cls}</code>
                    <span className="text-[10px] text-slate-400 font-mono">{px}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">{usage}</span>
                </div>
              ))}
            </div>
          </Showcase>
        </GallerySection>

        {/* Grid ── */}
        <GallerySection
          id="grid"
          title="Grid"
          description="Column layouts used in UHRIS. All are responsive — 1 column on mobile, expanding on wider viewports."
        >
          <Showcase code={CODE.grid} language="tsx" title="Grid layout conventions" center={false}>
            <div className="w-full space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">grid-cols-2 — form fields</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {['First Name', 'Last Name'].map((label) => (
                    <div key={label} className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-500">{label}</div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">grid-cols-4 — stat cards</p>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {['Planned 24', 'Filled 18', 'Vacant 6', 'Fill Rate 75%'].map((label) => (
                    <div key={label} className="rounded-xl bg-white border border-slate-200 shadow-sm px-4 py-3 text-sm font-bold text-slate-700">{label}</div>
                  ))}
                </div>
              </div>
            </div>
          </Showcase>
        </GallerySection>

        {/* Notes ── */}
        <GallerySection id="notes" title="Notes">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['No shared layout components exist', [
                'Container, Stack, and Grid are Tailwind utility conventions — not React components.',
                'Apply the classes directly. Do not create wrapper abstractions.',
                'These conventions are derived from actual production usage, not invented rules.',
              ]],
              ['Responsive design', [
                'All grid layouts start with 1 column on mobile and expand on wider viewports.',
                'Use grid-cols-1 gap-4 md:grid-cols-2 as the standard form grid.',
                'Use xl:grid-cols-4 for stat card rows that need 4 columns on large screens.',
              ]],
              ['Container max-width', [
                'Every production page content area uses max-w-7xl mx-auto.',
                'Do not use a different max-width for page content without a specific reason.',
                'Modal max-widths are separate: max-w-md (confirm), max-w-lg (standard), max-w-2xl (complex).',
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

        {/* Related ── */}
        <GallerySection id="related" title="Related">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
