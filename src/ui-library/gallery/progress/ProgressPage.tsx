/**
 * ProgressPage — Gallery infrastructure
 * Documents the Progress design-system component.
 */

import { useState, useEffect } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { Progress } from './Progress';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['spinner', 'stepper', 'skeleton']);

function AnimatedExample() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        if (v >= 100) { clearInterval(id); return 100; }
        return v + 2;
      });
    }, 80);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Uploading…</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} aria-label="Upload progress" />
    </div>
  );
}

const CODE = {
  basic: `import { Progress } from '@diwauhris/ui';

// Determinate
<Progress value={65} aria-label="Upload progress" />

// 0% and 100%
<Progress value={0}   aria-label="Not started" />
<Progress value={100} aria-label="Complete" />`,

  customMax: `// Custom max — e.g. 3 of 5 steps
<Progress value={3} max={5} aria-label="Step 3 of 5" />`,

  indeterminate: `// Indeterminate — omit value
<Progress aria-label="Loading data" />`,
};

export default function ProgressPage() {
  return (
    <GalleryLayout activeId="progress">
      <title>Progress — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Display"
          name="Progress"
          description="A horizontal progress bar for showing how far along a process is. Pass a value between 0 and 100 for determinate mode, or omit it for the animated indeterminate state."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview">
          <ShowcasePreview standalone center={false} minHeight="min-h-[200px]">
            <div className="w-full max-w-sm space-y-6">
              {[
                { label: '0%',       value: 0   },
                { label: '25%',      value: 25  },
                { label: '65%',      value: 65  },
                { label: '100%',     value: 100 },
              ].map(({ label, value }) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <Progress value={value} aria-label={`${label} complete`} />
                </div>
              ))}
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-slate-500">Indeterminate</p>
                <Progress aria-label="Loading" />
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Animated example */}
        <GallerySection id="animated" title="Animated example" description="Live upload simulation.">
          <ShowcasePreview standalone center>
            <AnimatedExample />
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.basic} language="tsx" title="Determinate" center={false} minHeight="min-h-[100px]">
              <div className="w-full max-w-sm space-y-3">
                <Progress value={0}   aria-label="Not started" />
                <Progress value={40}  aria-label="40% complete" />
                <Progress value={100} aria-label="Complete" />
              </div>
            </Showcase>
          </ShowcaseGrid>
          <Showcase code={CODE.customMax} language="tsx" title="Custom max" center={false} minHeight="min-h-[80px]">
            <div className="w-full max-w-sm space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Step 3 of 5</span><span>3/5</span>
                </div>
                <Progress value={3} max={5} aria-label="Step 3 of 5" />
              </div>
            </div>
          </Showcase>
          <Showcase code={CODE.indeterminate} language="tsx" title="Indeterminate" center={false} minHeight="min-h-[80px]">
            <div className="w-full max-w-sm">
              <Progress aria-label="Loading data" />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['ARIA', [
                'role="progressbar" with aria-valuemin=0 and aria-valuemax.',
                'Determinate: aria-valuenow is set to the current value.',
                'Indeterminate: aria-valuenow is omitted (browser infers indeterminate state).',
                'Always supply aria-label or aria-labelledby to name what is progressing.',
              ]],
              ['Visual', [
                'The fill bar is aria-hidden — the role/value attributes carry the information for screen readers.',
                'Indeterminate animation: CSS slide animation. Does not currently use motion-safe media query — callers should add it if needed.',
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
            { name: 'value',          type: 'number',  description: 'Current value. Omit for indeterminate state.' },
            { name: 'max',            type: 'number',  default: '100', description: 'Maximum value.' },
            { name: 'aria-label',     type: 'string',  description: 'Accessible label describing what is progressing.' },
            { name: 'aria-labelledby',type: 'string',  description: 'ID of an external label element.' },
            { name: 'className',      type: 'string',  description: 'Additional class on the track element.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
