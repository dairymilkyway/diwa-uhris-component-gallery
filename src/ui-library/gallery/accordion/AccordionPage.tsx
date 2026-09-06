/**
 * AccordionPage — Gallery infrastructure
 *
 * Documents the Accordion design-system component.
 *
 * Section order (canonical):
 *   Header → Overview → Playground → Modes → Controlled → Accessibility → API → Related
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
import { AccordionPlayground } from './AccordionPlayground';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['sidebar', 'tabs', 'section', 'divider']);

// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  single: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@diwauhris/ui';

// Single-open — only one section open at a time
<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Personal Information</AccordionTrigger>
    <AccordionContent>Name and contact details.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Employment Details</AccordionTrigger>
    <AccordionContent>Role and department.</AccordionContent>
  </AccordionItem>
</Accordion>`,

  multiple: `// Multiple-open — any number of sections can be open simultaneously
<Accordion type="multiple" defaultValue={['a', 'b']}>
  <AccordionItem value="a">
    <AccordionTrigger>Section A</AccordionTrigger>
    <AccordionContent>Content A.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Section B</AccordionTrigger>
    <AccordionContent>Content B.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="c">
    <AccordionTrigger>Section C</AccordionTrigger>
    <AccordionContent>Content C.</AccordionContent>
  </AccordionItem>
</Accordion>`,

  controlled: `const [open, setOpen] = useState('item-1');

<Accordion type="single" value={open} onValueChange={(v) => setOpen(v as string)}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section one</AccordionTrigger>
    <AccordionContent>Content one.</AccordionContent>
  </AccordionItem>
</Accordion>`,

  disabled: `// Disabled items are shown but cannot be toggled
<Accordion type="single">
  <AccordionItem value="a">
    <AccordionTrigger>Available section</AccordionTrigger>
    <AccordionContent>This section can be toggled.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b" disabled>
    <AccordionTrigger>Locked section</AccordionTrigger>
    <AccordionContent>This content is inaccessible.</AccordionContent>
  </AccordionItem>
</Accordion>`,
};

export default function AccordionPage() {
  const [controlled, setControlled] = useState<string | string[]>('p');

  return (
    <GalleryLayout activeId="accordion">
      <title>Accordion — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Overlay"
          name="Accordion"
          importName="Accordion, AccordionItem, AccordionTrigger, AccordionContent"
          description="Expandable and collapsible sections for FAQs, settings panels, and long-form content. Supports single-open (only one section at a time) and multi-open modes. Works controlled or uncontrolled."
          status="complete"
        />

        {/* ── 2. Overview — visual only, no code ────────────────────────── */}
        <GallerySection id="overview" title="Overview" description="Click triggers to expand and collapse.">
          <ShowcasePreview standalone center={false} minHeight="min-h-[200px]">
            <ShowcaseGrid columns={2}>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Single-open</p>
                <Accordion type="single" defaultValue="p">
                  <AccordionItem value="p">
                    <AccordionTrigger>Personal Information</AccordionTrigger>
                    <AccordionContent>Name, contact details, and demographic data.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="e">
                    <AccordionTrigger>Employment Details</AccordionTrigger>
                    <AccordionContent>Role, department, and employment type.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="g" disabled>
                    <AccordionTrigger>Government IDs</AccordionTrigger>
                    <AccordionContent>SSS, TIN, Pag-IBIG numbers.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Multiple-open</p>
                <Accordion type="multiple" defaultValue={['x', 'y']}>
                  <AccordionItem value="x">
                    <AccordionTrigger>Section A</AccordionTrigger>
                    <AccordionContent>Content for section A.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="y">
                    <AccordionTrigger>Section B</AccordionTrigger>
                    <AccordionContent>Content for section B.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="z">
                    <AccordionTrigger>Section C</AccordionTrigger>
                    <AccordionContent>Content for section C.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* ── 3. Playground ─────────────────────────────────────────────── */}
        <GallerySection id="playground" title="Playground" description="Adjust controls to explore every combination.">
          <AccordionPlayground />
        </GallerySection>

        {/* ── 4. Modes ──────────────────────────────────────────────────── */}
        <GallerySection
          id="modes"
          title="Modes"
          description="Single-open collapses the previous item when a new one is activated. Multiple-open allows any number to be open simultaneously."
        >
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.single} language="tsx" title="Single-open (default)" center={false} minHeight="min-h-[120px]">
              <div className="w-full max-w-sm">
                <Accordion type="single" defaultValue="p">
                  <AccordionItem value="p">
                    <AccordionTrigger>Personal Information</AccordionTrigger>
                    <AccordionContent>Name and contact details.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="e">
                    <AccordionTrigger>Employment Details</AccordionTrigger>
                    <AccordionContent>Role and department.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Showcase>
            <Showcase code={CODE.multiple} language="tsx" title="Multiple-open" center={false} minHeight="min-h-[120px]">
              <div className="w-full max-w-sm">
                <Accordion type="multiple" defaultValue={['a', 'b']}>
                  <AccordionItem value="a">
                    <AccordionTrigger>Section A</AccordionTrigger>
                    <AccordionContent>Content A.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b">
                    <AccordionTrigger>Section B</AccordionTrigger>
                    <AccordionContent>Content B.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="c">
                    <AccordionTrigger>Section C</AccordionTrigger>
                    <AccordionContent>Content C.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* ── 5. Controlled & Disabled ──────────────────────────────────── */}
        <GallerySection
          id="states"
          title="Controlled & Disabled"
          description="Use controlled mode to programmatically manage open state. Use disabled to prevent specific items from toggling."
        >
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.controlled} language="tsx" title="Controlled" description="Supply value + onValueChange to own the open state externally." center={false} minHeight="min-h-[120px]">
              <div className="w-full max-w-sm space-y-2">
                <Accordion type="single" value={controlled as string} onValueChange={setControlled}>
                  <AccordionItem value="p">
                    <AccordionTrigger>Section P</AccordionTrigger>
                    <AccordionContent>Content P.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q">
                    <AccordionTrigger>Section Q</AccordionTrigger>
                    <AccordionContent>Content Q.</AccordionContent>
                  </AccordionItem>
                </Accordion>
                <p className="text-xs text-slate-400 font-mono">open: "{controlled}"</p>
              </div>
            </Showcase>
            <Showcase code={CODE.disabled} language="tsx" title="Disabled item" description="A disabled item is focusable and visually de-emphasized but cannot be activated." center={false} minHeight="min-h-[120px]">
              <div className="w-full max-w-sm">
                <Accordion type="single">
                  <AccordionItem value="a">
                    <AccordionTrigger>Available section</AccordionTrigger>
                    <AccordionContent>This section can be toggled.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b" disabled>
                    <AccordionTrigger>Locked section</AccordionTrigger>
                    <AccordionContent>This content is inaccessible.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* ── 6. Accessibility ──────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {[
              ['ARIA', [
                'AccordionTrigger renders a <button> with aria-expanded (true/false) and aria-controls pointing to the panel id.',
                'AccordionContent renders role="region" with aria-labelledby pointing to the trigger id.',
                'Disabled items: aria-disabled="true" + HTML disabled attribute.',
                'IDs are generated via React.useId() — stable and unique per instance.',
              ]],
              ['Keyboard', [
                'Tab moves focus between triggers.',
                'Enter / Space toggle the focused trigger (native button behavior).',
                'Disabled triggers are skipped by Tab (HTML disabled).',
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

        {/* ── 7. API ────────────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference">
          <p className="text-sm font-bold text-slate-700 mb-2">Accordion</p>
          <ApiTable props={[
            { name: 'type',          type: "'single' | 'multiple'", default: "'single'", description: 'single: only one item open. multiple: any number open.' },
            { name: 'defaultValue',  type: 'string | string[]', description: 'Uncontrolled initial open value(s).' },
            { name: 'value',         type: 'string | string[]', description: 'Controlled open value(s).' },
            { name: 'onValueChange', type: '(value: string | string[]) => void', description: 'Called on open state change.' },
            { name: 'children',      type: 'ReactNode', required: true, description: 'AccordionItem elements.' },
            { name: 'className',     type: 'string', description: 'Additional class on the root wrapper.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">AccordionItem</p>
          <ApiTable props={[
            { name: 'value',    type: 'string',    required: true, description: 'Unique identifier for this item.' },
            { name: 'disabled', type: 'boolean',   default: 'false', description: 'Prevents this item from being toggled.' },
            { name: 'children', type: 'ReactNode', required: true, description: 'AccordionTrigger + AccordionContent.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">AccordionTrigger / AccordionContent</p>
          <ApiTable props={[
            { name: 'children',  type: 'ReactNode', required: true, description: 'Trigger label / panel content.' },
            { name: 'className', type: 'string', description: 'Additional class.' },
          ]} />
        </GallerySection>

        {/* ── 8. Related ────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
