/**
 * SpinnerPage — Gallery infrastructure
 * Phase 3: Showcase pattern.
 */

import { Loader2 } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { SpinnerPlayground } from './SpinnerPlayground';
import { Spinner } from './Spinner';
import { Button } from '../button/Button';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['skeleton', 'button', 'dialog']);

const CODE = {
  sm: `import { Spinner } from '@diwauhris/ui';

<Spinner size="sm" label="Loading…" />`,
  md: `<Spinner size="md" label="Loading…" />`,
  lg: `<Spinner size="lg" label="Loading…" />`,

  labelHidden: `// Label is sr-only — visually hidden but announced to screen readers
<Spinner size="md" label="Saving changes" labelHidden />`,

  standalone: `// Centered in a loading container
<div className="flex min-h-[200px] items-center justify-center">
  <Spinner size="lg" label="Loading employee data…" />
</div>`,

  buttonLoading: `import { Loader2, Save } from '@diwauhris/ui';
import { Button } from '@diwauhris/ui';
import { useState } from 'react';

const [saving, setSaving] = useState(false);

const handleSave = async () => {
  setSaving(true);
  await yourSaveOperation(); // replace with your save logic
  setSaving(false);
};

// Preferred pattern for button loading states
<Button variant="primary" loading={saving} onClick={handleSave}>
  {saving ? (
    <>
      <Loader2 size={15} className="animate-spin" aria-hidden="true" />
      Saving…
    </>
  ) : (
    <>
      <Save size={15} aria-hidden="true" />
      Save Changes
    </>
  )}
</Button>`,

  contextual: `// Inline contextual loading — replaces only the content area
{loading ? (
  <div className="flex items-center gap-2 text-sm text-slate-400">
    <Spinner size="sm" label="Fetching data" labelHidden />
    Fetching data…
  </div>
) : (
  <DataTable rows={rows} />
)}`,
};

export default function SpinnerPage() {
  return (
    <GalleryLayout activeId="spinner">
      <title>Spinner — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Display"
          name="Spinner"
          description="A circular spinner for short async operations. Three sizes to fit any context. For content that has a known shape, prefer Skeleton instead."
          status="complete"
        />

        <GallerySection id="overview" title="Overview" description="All three sizes at a glance. No code — use the playground to experiment.">
          <ShowcasePreview standalone>
            <div className="flex flex-wrap items-end gap-8">
              <div className="flex flex-col items-center gap-2">
                <Spinner size="sm" label="SM" labelHidden />
                <span className="text-xs font-medium text-slate-400">SM</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size="md" label="MD" labelHidden />
                <span className="text-xs font-medium text-slate-400">MD</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size="lg" label="LG" labelHidden />
                <span className="text-xs font-medium text-slate-400">LG</span>
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="playground" title="Playground">
          <SpinnerPlayground />
        </GallerySection>

        <GallerySection id="sizes" title="Sizes">
          <ShowcaseGrid columns={3}>
            <Showcase title="Small" code={CODE.sm}>
              <Spinner size="sm" label="Loading…" />
            </Showcase>
            <Showcase title="Medium" code={CODE.md}>
              <Spinner size="md" label="Loading…" />
            </Showcase>
            <Showcase title="Large" code={CODE.lg}>
              <Spinner size="lg" label="Loading…" />
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        <GallerySection id="usage" title="Usage Patterns">
          <ShowcaseGrid columns={2}>
            <Showcase
              title="Label hidden"
              description="Label is sr-only — keeps the visual clean while remaining accessible."
              code={CODE.labelHidden}
            >
              <Spinner size="md" label="Saving changes" labelHidden />
            </Showcase>

            <Showcase
              title="Standalone — page load"
              description="Centered in the content area while data loads."
              code={CODE.standalone}
            >
              <div className="flex min-h-[80px] items-center justify-center">
                <Spinner size="lg" label="Loading employee data…" />
              </div>
            </Showcase>

            <Showcase
              title="Button loading state"
              description="Preferred pattern — use the Button loading prop. See Button docs."
              code={CODE.buttonLoading}
            >
              <Button variant="primary" disabled>
                <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                Saving…
              </Button>
            </Showcase>

            <Showcase
              title="Contextual inline loading"
              description="Replace only the loading area, not the whole page."
              code={CODE.contextual}
            >
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Spinner size="sm" label="Fetching data" labelHidden />
                Fetching data…
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Role', ['Renders as <span role="status"> — screen readers announce content changes.', 'The label is always in the DOM. labelHidden moves it to sr-only, it is never removed.']],
              ['Motion', ['The animation respects prefers-reduced-motion.', 'When reduced motion is active, animation stops. The label and role="status" remain — loading is still communicated.']],
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

        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'size',        type: "'sm' | 'md' | 'lg'", default: "'md'",       description: 'Track diameter.' },
            { name: 'label',       type: 'string',              default: "'Loading…'", description: 'Accessible and visible label.' },
            { name: 'labelHidden', type: 'boolean',             default: 'false',      description: 'Moves the label to sr-only.' },
            { name: 'className',   type: 'string',                                     description: 'Additional CSS classes.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
