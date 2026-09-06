/**
 * DividerPage — Gallery infrastructure
 *
 * Documents the Divider design-system component.
 *
 * Section order (canonical):
 *   Header → Overview → Orientations → Accessibility → API → Related
 *
 * No playground — Divider has only 2 boolean props (orientation, decorative).
 * Static Showcase examples communicate the full API.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { Divider } from './Divider';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['card', 'page-header']);

// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  horizontal: `import { Divider } from '@diwauhris/ui';

<div className="space-y-4">
  <p>Section one content.</p>
  <Divider />
  <p>Section two content.</p>
</div>`,

  vertical: `// Vertical divider — parent must provide height context
<div className="flex items-center gap-3 h-8">
  <span className="text-sm text-slate-600">Label A</span>
  <Divider orientation="vertical" />
  <span className="text-sm text-slate-600">Label B</span>
</div>`,

  semantic: `// Semantic separator — role="separator" for meaningful boundaries
<Divider decorative={false} aria-label="End of employee section" />`,
};

export default function DividerPage() {
  return (
    <GalleryLayout activeId="divider">
      <title>Divider — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Layout"
          name="Divider"
          description="A thin line for separating sections. Decorative by default (aria-hidden). Use it to add visual breathing room between content groups."
          status="complete"
        />

        {/* ── 2. Overview — visual only, no code ────────────────────────── */}
        <GallerySection id="overview" title="Overview" description="Horizontal and vertical orientations at a glance.">
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={2}>
              <div className="space-y-2 w-full">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Horizontal</p>
                <div className="w-full space-y-4 py-2">
                  <p className="text-sm font-medium text-slate-600">Personal information section.</p>
                  <Divider />
                  <p className="text-sm font-medium text-slate-600">Employment details section.</p>
                  <Divider />
                  <p className="text-sm font-medium text-slate-600">Government IDs section.</p>
                </div>
              </div>
              <div className="space-y-2 w-full">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Vertical</p>
                <div className="flex items-center gap-4 h-8">
                  <span className="text-sm font-semibold text-slate-600">Active (42)</span>
                  <Divider orientation="vertical" />
                  <span className="text-sm font-semibold text-slate-600">Inactive (8)</span>
                  <Divider orientation="vertical" />
                  <span className="text-sm font-semibold text-slate-600">Archived (3)</span>
                </div>
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* ── 3. Orientations ───────────────────────────────────────────── */}
        <GallerySection id="orientations" title="Orientations" description="Use horizontal as the default separator. Use vertical inside flex containers with a height context.">
          <ShowcaseGrid columns={2}>
            <Showcase title="Horizontal" code={CODE.horizontal} language="tsx" center={false} minHeight="min-h-[140px]">
              <div className="w-full space-y-4 py-2">
                <p className="text-sm font-medium text-slate-600">Personal information section.</p>
                <Divider />
                <p className="text-sm font-medium text-slate-600">Employment details section.</p>
                <Divider />
                <p className="text-sm font-medium text-slate-600">Government IDs section.</p>
              </div>
            </Showcase>
            <Showcase title="Vertical" description="Parent must supply a height context (flex with h-*)." code={CODE.vertical} language="tsx" center minHeight="min-h-[80px]">
              <div className="flex items-center gap-4 h-8">
                <span className="text-sm font-semibold text-slate-600">Active (42)</span>
                <Divider orientation="vertical" />
                <span className="text-sm font-semibold text-slate-600">Inactive (8)</span>
                <Divider orientation="vertical" />
                <span className="text-sm font-semibold text-slate-600">Archived (3)</span>
              </div>
            </Showcase>
          </ShowcaseGrid>
          <Showcase
            title="Semantic separator"
            description="decorative={false} adds role='separator' for meaningful content boundaries."
            code={CODE.semantic}
            language="tsx"
            center={false}
            minHeight="min-h-[60px]"
          >
            <div className="w-full space-y-2 py-1">
              <p className="text-sm font-medium text-slate-600">Employee record section ends here.</p>
              <Divider decorative={false} aria-label="End of employee section" />
              <p className="text-sm font-medium text-slate-600">Next section begins.</p>
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 4. Accessibility ──────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {[
              ['Decorative (default)', [
                'decorative={true} (default) renders aria-hidden="true". Screen readers skip the element entirely.',
                'Use this for visual structure where the boundary between sections is already clear from headings or content.',
              ]],
              ['Semantic separator', [
                'decorative={false} renders role="separator" and aria-orientation.',
                'Use when the separator boundary is meaningful to AT users.',
                'Supply aria-label when the separator\'s purpose is not obvious from surrounding context.',
              ]],
              ['Vertical divider', [
                'The parent container must provide height context (flex, grid, or explicit height) for a vertical divider to be visible.',
                'A vertical divider also gets aria-orientation="vertical" when rendered as a semantic separator.',
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

        {/* ── 5. API ────────────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Horizontal line (full width) or vertical line (full height of flex/grid container).' },
            { name: 'decorative',  type: 'boolean', default: 'true',  description: 'true → aria-hidden="true". false → role="separator" with aria-orientation.' },
            { name: 'aria-label',  type: 'string',  description: 'Accessible label when decorative=false and context is needed.' },
            { name: 'className',   type: 'string',  description: 'Additional class on the root div.' },
          ]} />
        </GallerySection>

        {/* ── 6. Related ────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
