/**
 * SegmentedControlPage — Gallery infrastructure
 *
 * Documents the SegmentedControl design-system component.
 * Source: frontend/src/ui-library/gallery/segmented-control/SegmentedControl.tsx
 *
 * Section order: Header → Overview → Playground → Implementation → Accessibility → API → Related
 */

import { useState } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { SegmentedControlPlayground } from './SegmentedControlPlayground';
import { SegmentedControl } from './SegmentedControl';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['radio', 'tabs', 'button']);

// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  basic: `import { SegmentedControl } from '@diwauhris/ui';

<SegmentedControl
  options={[
    { value: 'active',   label: 'Active'   },
    { value: 'inactive', label: 'Inactive' },
  ]}
  defaultValue="active"
  aria-label="Employee status filter"
/>`,

  controlled: `import { useState } from 'react';
import { SegmentedControl } from '@diwauhris/ui';

const [view, setView] = useState('list');

<SegmentedControl
  options={[
    { value: 'list',  label: 'List'  },
    { value: 'chart', label: 'Chart' },
    { value: 'grid',  label: 'Grid'  },
  ]}
  value={view}
  onValueChange={setView}
  aria-label="View mode"
/>`,

  disabled: `// Disable one option
<SegmentedControl
  options={[
    { value: 'active',   label: 'Active'   },
    { value: 'inactive', label: 'Inactive' },
    { value: 'archived', label: 'Archived', disabled: true },
  ]}
  defaultValue="active"
  aria-label="Status filter"
/>

// Disable the entire control
<SegmentedControl
  options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
  defaultValue="a"
  disabled
  aria-label="Disabled example"
/>`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SegmentedControlPage() {
  const [controlled, setControlled] = useState('list');

  return (
    <GalleryLayout activeId="segmented-control">
      <title>Segmented Control — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Inputs"
          name="Segmented Control"
          description="A compact toggle strip for switching between a small set of options. Built as a proper radiogroup with arrow-key navigation — not just styled buttons pretending to be one."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="Common configurations. No code — use the Playground to experiment.">
          <ShowcasePreview standalone>
            <ShowcaseGrid columns={3}>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Two options</p>
                <SegmentedControl
                  options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]}
                  defaultValue="active"
                  aria-label="Status filter"
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Three options</p>
                <SegmentedControl
                  options={[{ value: 'list', label: 'List' }, { value: 'chart', label: 'Chart' }, { value: 'grid', label: 'Grid' }]}
                  defaultValue="list"
                  aria-label="View mode"
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Disabled option</p>
                <SegmentedControl
                  options={[{ value: 'a', label: 'Active' }, { value: 'i', label: 'Inactive' }, { value: 'x', label: 'Archived', disabled: true }]}
                  defaultValue="a"
                  aria-label="Status"
                />
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="playground" title="Playground" description="Adjust options, disabled state, and count.">
          <SegmentedControlPlayground />
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.basic} language="tsx" title="Basic (uncontrolled)" center>
              <SegmentedControl
                options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]}
                defaultValue="active"
                aria-label="Status filter"
              />
            </Showcase>
            <Showcase code={CODE.controlled} language="tsx" title="Controlled" center>
              <div className="space-y-2 text-center">
                <SegmentedControl
                  options={[{ value: 'list', label: 'List' }, { value: 'chart', label: 'Chart' }, { value: 'grid', label: 'Grid' }]}
                  value={controlled}
                  onValueChange={setControlled}
                  aria-label="View mode"
                />
                <p className="text-xs text-slate-400 font-mono">selected: "{controlled}"</p>
              </div>
            </Showcase>
            <Showcase code={CODE.disabled} language="tsx" title="Disabled option / disabled control" center>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-1.5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Disabled option</p>
                  <SegmentedControl
                    options={[
                      { value: 'active',   label: 'Active'   },
                      { value: 'inactive', label: 'Inactive' },
                      { value: 'archived', label: 'Archived', disabled: true },
                    ]}
                    defaultValue="active"
                    aria-label="Status filter"
                  />
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Entire control disabled</p>
                  <SegmentedControl
                    options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
                    defaultValue="a"
                    disabled
                    aria-label="Disabled example"
                  />
                </div>
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['ARIA semantics', [
                'The container has role="radiogroup". Supply aria-label or aria-labelledby to name the group.',
                'Each option has role="radio" and aria-checked (true/false).',
                'Disabled options have aria-disabled="true" and the HTML disabled attribute.',
                'Disabled entire control exposes aria-disabled on the group and all options.',
              ]],
              ['Keyboard', [
                'Tab enters the group at the selected option (roving tabIndex).',
                'ArrowRight / ArrowDown — move to next enabled option.',
                'ArrowLeft / ArrowUp — move to previous enabled option.',
                'Home — jump to first enabled option.',
                'End — jump to last enabled option.',
                'Disabled options are skipped by keyboard navigation.',
              ]],
            ].map(([h, items]) => (
              <div key={String(h)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(h)}</h3>
                <ul className="space-y-1.5">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-sky/60" aria-hidden="true" />
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
          <p className="text-sm font-bold text-slate-700 mb-2">SegmentedControl</p>
          <ApiTable props={[
            { name: 'options',        type: 'SegmentedControlOption[]', required: true, description: 'Array of options. Each has value, label, and optional disabled.' },
            { name: 'defaultValue',   type: 'string',  description: 'Uncontrolled initial selected value.' },
            { name: 'value',          type: 'string',  description: 'Controlled selected value.' },
            { name: 'onValueChange',  type: '(value: string) => void', description: 'Called when the selected value changes.' },
            { name: 'disabled',       type: 'boolean', default: 'false', description: 'Disables the entire control.' },
            { name: 'aria-label',     type: 'string',  description: 'Accessible label for the radiogroup.' },
            { name: 'aria-labelledby',type: 'string',  description: 'ID of an external label element.' },
            { name: 'className',      type: 'string',  description: 'Additional class on the root element.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">SegmentedControlOption</p>
          <ApiTable props={[
            { name: 'value',    type: 'string',  required: true, description: 'Unique identifier for this option.' },
            { name: 'label',    type: 'string',  required: true, description: 'Visible label text.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents this option from being selected.' },
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
