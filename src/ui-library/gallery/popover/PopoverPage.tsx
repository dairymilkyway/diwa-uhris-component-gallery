/**
 * PopoverPage — Gallery infrastructure
 *
 * Documents the Popover design-system component.
 * Source: frontend/src/ui-library/gallery/popover/Popover.tsx
 */

import { useState } from 'react';
import { Settings, Info, ChevronDown } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { CopyCodeBlock } from '../components/CopyCodeBlock';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['tooltip', 'modal', 'dialog', 'menu']);

const CODE = {
  basic: `import { Popover, PopoverTrigger, PopoverContent } from '@diwauhris/ui';

<Popover>
  <PopoverTrigger>Open settings</PopoverTrigger>
  <PopoverContent title="Settings">
    <p className="text-sm text-slate-600">Popover body content here.</p>
  </PopoverContent>
</Popover>`,

  controlled: `const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger>
    Filter <ChevronDown size={14} aria-hidden="true" />
  </PopoverTrigger>
  <PopoverContent title="Filter options">
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" /> Active
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" /> Inactive
      </label>
    </div>
  </PopoverContent>
</Popover>`,

  placement: `// Bottom (default variations)
<Popover placement="bottom-start">…</Popover>
<Popover placement="bottom">…</Popover>
<Popover placement="bottom-end">…</Popover>

// Top
<Popover placement="top-start">…</Popover>
<Popover placement="top">…</Popover>
<Popover placement="top-end">…</Popover>`,
};

export default function PopoverPage() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <GalleryLayout activeId="popover">
      <title>Popover — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Overlay"
          name="Popover"
          description="A floating panel anchored to a trigger element. The right choice for contextual forms, multi-field pickers, and rich tooltips. Closes on Escape, outside click, or programmatically."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="Click the triggers to open.">
          <ShowcasePreview standalone minHeight="min-h-[280px]">
            <div className="flex flex-wrap items-start gap-6 p-4">
              <Popover>
                <PopoverTrigger>
                  <Settings size={14} aria-hidden="true" /> Settings
                </PopoverTrigger>
                <PopoverContent title="Display settings">
                  <div className="space-y-2 min-w-[180px]">
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-brand-blue" /> Show inactive
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-brand-blue" defaultChecked /> Compact mode
                    </label>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover placement="bottom">
                <PopoverTrigger>
                  <Info size={14} aria-hidden="true" /> Info
                </PopoverTrigger>
                <PopoverContent title="About this section">
                  <p className="text-sm text-slate-600 max-w-[220px]">
                    This panel shows employee shift assignments. Assignments update in real time.
                  </p>
                </PopoverContent>
              </Popover>

              <Popover placement="bottom-end">
                <PopoverTrigger>
                  Filter <ChevronDown size={13} aria-hidden="true" />
                </PopoverTrigger>
                <PopoverContent title="Filter options">
                  <div className="space-y-2 min-w-[160px]">
                    {['Active', 'Inactive', 'Archived'].map((label) => (
                      <label key={label} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-brand-blue" /> {label}
                      </label>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.basic} language="tsx" title="Basic popover" center minHeight="min-h-[220px]">
              <Popover>
                <PopoverTrigger>
                  <Settings size={14} aria-hidden="true" /> Open settings
                </PopoverTrigger>
                <PopoverContent title="Settings">
                  <p className="text-sm text-slate-600 min-w-[200px]">Popover body content here.</p>
                </PopoverContent>
              </Popover>
            </Showcase>
            <Showcase code={CODE.controlled} language="tsx" title="Controlled popover" center minHeight="min-h-[220px]">
              <Popover open={filterOpen} onOpenChange={setFilterOpen} placement="bottom">
                <PopoverTrigger>
                  Filter <ChevronDown size={13} aria-hidden="true" />
                </PopoverTrigger>
                <PopoverContent title="Filter options">
                  <div className="space-y-2 min-w-[160px]">
                    {['Active', 'Inactive', 'Archived'].map((label) => (
                      <label key={label} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-brand-blue" /> {label}
                      </label>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </Showcase>
          </ShowcaseGrid>
          <CopyCodeBlock code={CODE.placement} language="tsx" title="Placement options" />
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['ARIA', [
                'Trigger: aria-expanded (true/false), aria-haspopup="dialog", aria-controls (points to content when open).',
                'Content panel: role="dialog", aria-modal="true", aria-labelledby (title or trigger id).',
              ]],
              ['Focus', [
                'On open: focus moves to the first focusable element inside the popover (or the panel itself).',
                'On close (Escape, outside click): focus returns to the trigger button.',
              ]],
              ['Keyboard', [
                'Escape closes the popover and returns focus to the trigger.',
                'Tab / Shift+Tab navigate within the popover content naturally.',
                'Clicking outside the popover or trigger closes it.',
              ]],
              ['Popover vs Dialog vs Tooltip', [
                'Popover — anchored to trigger, contextual extras (filters, pickers, settings). Closeable without completing a task.',
                'Dialog/Modal — centered, blocks the page, requires a decision or explicit dismiss.',
                'Tooltip — text-only, hover/focus triggered, no interactive content inside.',
              ]],
            ].map(([h, items]) => (
              <div key={String(h)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(h)}</h3>
                <ul className="space-y-1.5">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-sky" aria-hidden="true" />
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
          <p className="text-sm font-bold text-slate-700 mb-2">Popover</p>
          <ApiTable props={[
            { name: 'defaultOpen',   type: 'boolean', default: 'false', description: 'Uncontrolled initial open state.' },
            { name: 'open',          type: 'boolean',  description: 'Controlled open state.' },
            { name: 'onOpenChange',  type: '(open: boolean) => void', description: 'Called when open state changes.' },
            { name: 'placement',     type: 'PopoverPlacement', default: "'bottom-start'", description: "Placement relative to trigger: 'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end'." },
            { name: 'children',      type: 'ReactNode', required: true, description: 'PopoverTrigger and PopoverContent.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">PopoverTrigger</p>
          <ApiTable props={[
            { name: 'children', type: 'ReactNode', required: true, description: 'Trigger button content.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">PopoverContent</p>
          <ApiTable props={[
            { name: 'title',    type: 'string',   description: 'Optional header title inside the popover panel.' },
            { name: 'maxWidth', type: 'string',   default: "'max-w-xs'", description: 'Tailwind max-width class for the panel.' },
            { name: 'children', type: 'ReactNode', required: true, description: 'Popover body content.' },
            { name: 'className',type: 'string',   description: 'Additional class on the panel.' },
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
