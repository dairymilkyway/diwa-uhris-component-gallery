/**
 * DescriptionListPage — Gallery infrastructure
 *
 * Documents the DescriptionList design-system component.
 *
 * Section order (canonical):
 *   Header → Overview → Layouts → Custom Values → Accessibility → API → Related
 *
 * No playground — DescriptionList is primarily a layout/presentation component.
 * The layout prop and ReactNode values are clearly demonstrated with static examples.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { DescriptionList, DescriptionItem } from './DescriptionList';
import { Badge } from '../badge/Badge';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['card', 'section', 'field']);

// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  vertical: `import { DescriptionList, DescriptionItem } from '@diwauhris/ui';

<DescriptionList layout="vertical">
  <DescriptionItem label="Full Name"   value="Juan dela Cruz" />
  <DescriptionItem label="Employee ID" value="EMP-0042" />
  <DescriptionItem label="Department"  value="Human Resources" />
  <DescriptionItem label="Notes" />  {/* empty — shows "—" */}
</DescriptionList>`,

  horizontal: `<DescriptionList layout="horizontal">
  <DescriptionItem label="Full Name"   value="Juan dela Cruz" />
  <DescriptionItem label="Employee ID" value="EMP-0042" />
  <DescriptionItem label="Email"       value="j.delacruz@company.ph" />
  <DescriptionItem label="Status"      value="Active" />
</DescriptionList>`,

  responsive: `// vertical on mobile, horizontal at sm: breakpoint
<DescriptionList layout="responsive">
  <DescriptionItem label="Full Name"   value="Juan dela Cruz" />
  <DescriptionItem label="Employee ID" value="EMP-0042" />
  <DescriptionItem label="Department"  value="Human Resources" />
</DescriptionList>`,

  customValue: `import { Badge } from '@diwauhris/ui';

// Values accept ReactNode — pass any element
<DescriptionList layout="horizontal">
  <DescriptionItem label="Status" value={<Badge tone="success">Active</Badge>} />
  <DescriptionItem label="Email"  value={<a href="mailto:j@c.ph">j@c.ph</a>} />
</DescriptionList>`,
};

export default function DescriptionListPage() {
  return (
    <GalleryLayout activeId="description-list">
      <title>Description List — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Display"
          name="Description List"
          description="Label and value pairs for read-only detail views. Uses semantic dl/dt/dd HTML. Supports vertical, horizontal, and responsive layouts. Empty values render as an em-dash automatically."
          status="complete"
          importName="DescriptionList, DescriptionItem"
        />

        {/* ── 2. Overview — visual only, no code ────────────────────────── */}
        <GallerySection id="overview" title="Overview" description="Three layout modes for different presentation needs.">
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={2}>
              <div className="space-y-2 w-full">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Vertical (default)</p>
                <DescriptionList layout="vertical">
                  <DescriptionItem label="Full Name"   value="Juan dela Cruz" />
                  <DescriptionItem label="Employee ID" value="EMP-0042" />
                  <DescriptionItem label="Department"  value="Human Resources" />
                  <DescriptionItem label="Notes" />
                </DescriptionList>
              </div>
              <div className="space-y-2 w-full">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Horizontal</p>
                <DescriptionList layout="horizontal">
                  <DescriptionItem label="Full Name"   value="Juan dela Cruz" />
                  <DescriptionItem label="Employee ID" value="EMP-0042" />
                  <DescriptionItem label="Email"       value="j.delacruz@company.ph" />
                  <DescriptionItem label="Status"      value="Active" />
                </DescriptionList>
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* ── 3. Layouts ────────────────────────────────────────────────── */}
        <GallerySection id="layouts" title="Layouts" description="Choose the layout that fits the available space and reading context.">
          <ShowcaseGrid columns={2}>
            <Showcase title="Vertical" description="Stacked label above value. Best for forms and narrow containers." code={CODE.vertical} language="tsx" center={false} minHeight="min-h-[140px]">
              <div className="w-full max-w-sm">
                <DescriptionList layout="vertical">
                  <DescriptionItem label="Full Name"   value="Juan dela Cruz" />
                  <DescriptionItem label="Employee ID" value="EMP-0042" />
                  <DescriptionItem label="Department"  value="Human Resources" />
                  <DescriptionItem label="Notes" />
                </DescriptionList>
              </div>
            </Showcase>
            <Showcase title="Horizontal" description="Label and value side-by-side in a grid. Best for detail pages." code={CODE.horizontal} language="tsx" center={false} minHeight="min-h-[140px]">
              <div className="w-full max-w-md">
                <DescriptionList layout="horizontal">
                  <DescriptionItem label="Full Name"   value="Juan dela Cruz" />
                  <DescriptionItem label="Employee ID" value="EMP-0042" />
                  <DescriptionItem label="Email"       value="j.delacruz@company.ph" />
                  <DescriptionItem label="Status"      value="Active" />
                </DescriptionList>
              </div>
            </Showcase>
          </ShowcaseGrid>
          <Showcase title="Responsive" description="Vertical on mobile, horizontal at sm: breakpoint." code={CODE.responsive} language="tsx" center={false} minHeight="min-h-[120px]">
            <div className="w-full max-w-md">
              <DescriptionList layout="responsive">
                <DescriptionItem label="Full Name"   value="Juan dela Cruz" />
                <DescriptionItem label="Employee ID" value="EMP-0042" />
                <DescriptionItem label="Department"  value="Human Resources" />
              </DescriptionList>
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 4. Custom Values ──────────────────────────────────────────── */}
        <GallerySection id="custom-values" title="Custom Values" description="Values accept ReactNode — pass badges, links, or any element.">
          <Showcase code={CODE.customValue} language="tsx" center={false} minHeight="min-h-[100px]">
            <div className="w-full max-w-md">
              <DescriptionList layout="horizontal">
                <DescriptionItem label="Status" value={<Badge tone="success">Active</Badge>} />
                <DescriptionItem label="Email"  value={<a href="mailto:j@c.ph" className="text-brand-blue hover:underline">j@c.ph</a>} />
              </DescriptionList>
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 5. Accessibility ──────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {[
              ['Native semantics', [
                '<dl> is the description list element — screen readers announce it as a list.',
                '<dt> (term) labels each <dd> (description) value.',
                'No ARIA roles needed — the HTML semantics are sufficient.',
              ]],
              ['Empty values', [
                'When value is omitted, an em-dash (—) is rendered. This is both visually clear and semantically correct.',
                'Do not use "N/A" or "None" — em-dash is the conventional data-display placeholder.',
              ]],
              ['Custom value content', [
                'Values accept ReactNode. When using interactive elements (links, buttons) as values, ensure they have accessible names.',
              ]],
            ].map(([h, items]) => (
              <div key={String(h)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(h)}</h3>
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

        {/* ── 6. API ────────────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference">
          <p className="text-sm font-bold text-slate-700 mb-2">DescriptionList</p>
          <ApiTable props={[
            { name: 'layout',    type: "'vertical' | 'horizontal' | 'responsive'", default: "'vertical'", description: 'vertical: stacked label/value. horizontal: side-by-side grid. responsive: vertical on mobile, horizontal at sm.' },
            { name: 'children',  type: 'ReactNode', required: true, description: 'DescriptionItem elements.' },
            { name: 'className', type: 'string',    description: 'Additional class on the <dl> element.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">DescriptionItem</p>
          <ApiTable props={[
            { name: 'label',     type: 'string',    required: true, description: 'Label text (renders as <dt>).' },
            { name: 'value',     type: 'ReactNode', description: 'Value content (renders as <dd>). Omit for empty (shows em-dash).' },
            { name: 'fullWidth', type: 'boolean',   default: 'false', description: 'Span across full width in horizontal/responsive layouts.' },
            { name: 'className', type: 'string',    description: 'Additional class on the <dt> element.' },
          ]} />
        </GallerySection>

        {/* ── 7. Related ────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
