/**
 * SectionPage — Gallery infrastructure
 * Documents the Section design-system component.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { Section } from './Section';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['card', 'description-list', 'divider', 'page-header']);

const CODE = {
  basic: `import { Section } from '@diwauhris/ui';

<Section title="Personal Information">
  <p className="text-sm text-slate-600">Name, contact, and demographic details.</p>
</Section>`,

  withDesc: `<Section
  title="Employment Details"
  description="Position, department, and employment type."
>
  <p className="text-sm text-slate-600">Employment content here.</p>
</Section>`,

  withActions: `<Section
  title="Government IDs"
  description="SSS, TIN, PhilHealth, and Pag-IBIG numbers."
  actions={
    <button type="button" className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
      Edit
    </button>
  }
>
  <p className="text-sm text-slate-600">ID fields here.</p>
</Section>`,

  nested: `// Different heading levels for nested sections
<Section title="Employee Profile" level={2}>
  <Section title="Contact Details" level={3} description="Primary and emergency contacts.">
    ...
  </Section>
  <Section title="Employment Details" level={3}>
    ...
  </Section>
</Section>`,
};

export default function SectionPage() {
  return (
    <GalleryLayout activeId="section">
      <title>Section — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Layout"
          name="Section"
          description="A titled content block with an optional description and actions slot. Use it to group related content on a page without the weight of a full Card."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview">
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.basic} language="tsx" title="Basic section" center={false} minHeight="min-h-[100px]">
              <div className="w-full max-w-lg">
                <Section title="Personal Information">
                  <p className="text-sm text-slate-600">Name, contact, and demographic details.</p>
                </Section>
              </div>
            </Showcase>
            <Showcase code={CODE.withDesc} language="tsx" title="With description" center={false} minHeight="min-h-[100px]">
              <div className="w-full max-w-lg">
                <Section
                  title="Employment Details"
                  description="Position, department, and employment type."
                >
                  <p className="text-sm text-slate-600">Employment content here.</p>
                </Section>
              </div>
            </Showcase>
            <Showcase code={CODE.withActions} language="tsx" title="With actions" center={false} minHeight="min-h-[100px]">
              <div className="w-full max-w-lg">
                <Section
                  title="Government IDs"
                  description="SSS, TIN, PhilHealth, and Pag-IBIG numbers."
                  actions={
                    <button type="button" className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
                      Edit
                    </button>
                  }
                >
                  <p className="text-sm text-slate-600">ID field content here.</p>
                </Section>
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.nested} language="tsx" title="Nested sections with explicit heading levels" center={false} minHeight="min-h-[180px]">
            <div className="w-full max-w-lg">
              <Section title="Employee Profile" level={2}>
                <div className="space-y-4 pl-2">
                  <Section title="Contact Details" level={3} description="Primary and emergency contacts.">
                    <p className="text-sm text-slate-600">Contact fields here.</p>
                  </Section>
                  <Section title="Employment Details" level={3}>
                    <p className="text-sm text-slate-600">Employment fields here.</p>
                  </Section>
                </div>
              </Section>
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Semantic structure', [
                'Renders a <section> element, which creates a sectioning landmark in the DOM.',
                'The heading uses the appropriate <h1>–<h6> tag based on the level prop (default h2).',
                'Set level explicitly when nesting sections to maintain a logical heading hierarchy.',
                'Screen readers use the heading to label and identify the section landmark.',
              ]],
              ['Actions', [
                'The actions slot renders inside the heading row. Use interactive elements with their own accessible names.',
                'Buttons in the actions slot should have descriptive labels (aria-label if icon-only).',
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

        {/* API */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'title',       type: 'string',    required: true, description: 'Section heading text.' },
            { name: 'description', type: 'string',    description: 'Optional short description below the heading.' },
            { name: 'actions',     type: 'ReactNode', description: 'Optional buttons or links in the header row.' },
            { name: 'level',       type: '1 | 2 | 3 | 4 | 5 | 6', default: '2', description: 'HTML heading level.' },
            { name: 'children',    type: 'ReactNode', required: true, description: 'Section body content.' },
            { name: 'className',   type: 'string',    description: 'Additional class on the <section> element.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
