/**
 * DrawerPage — Gallery infrastructure
 *
 * Documents the Drawer design-system component.
 *
 * Section order (canonical):
 *   Header → Overview → Playground → Implementation → Accessibility → API → Related
 */

import { useState } from 'react';
import { MessageSquare, Filter } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { DrawerPlayground } from './DrawerPlayground';
import { Drawer } from './Drawer';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['modal', 'dialog', 'popover']);

// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  basic: `import { Drawer } from '@diwauhris/ui';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Open notes</button>

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Notes"
>
  <p className="text-sm text-slate-600">Drawer content here.</p>
</Drawer>`,

  bottom: `// Fragment — add your own state: const [open, setOpen] = useState(false);
// Bottom-sheet placement — useful on mobile or for filter panels
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Filter options"
  placement="bottom"
  maxHeight="max-h-[60vh]"
>
  {/* filter content */}
</Drawer>`,

  controlled: `// Fully controlled — open/close state owned by parent
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Open</button>

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Settings"
  description="Configure your preferences."
  width="w-96"
>
  {/* settings content */}
</Drawer>`,
};

export default function DrawerPage() {
  const [rightOpen, setRightOpen]   = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);

  return (
    <GalleryLayout activeId="drawer">
      <title>Drawer — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Overlay"
          name="Drawer"
          description="A panel that slides in from the side or bottom of the screen. Good for filters, detail views, and edit forms that don't need a full page. Full focus management and scroll lock included."
          status="complete"
        />

        {/* ── 2. Overview — visual only, no code ────────────────────────── */}
        <GallerySection id="overview" title="Overview" description="Click to open. Press Tab, Escape, or click the backdrop to close.">
          <ShowcasePreview standalone center>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setRightOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white text-sm font-bold rounded-md hover:bg-brand-navy transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
              >
                <MessageSquare size={15} aria-hidden="true" /> Right drawer
              </button>
              <button
                type="button"
                onClick={() => setBottomOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-md hover:bg-slate-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <Filter size={15} aria-hidden="true" /> Bottom sheet
              </button>
            </div>

            <Drawer open={rightOpen} onClose={() => setRightOpen(false)} title="Notes" description="Workflow notes and comments.">
              <div className="space-y-3 text-sm text-slate-600">
                <p className="font-medium">This is a right-anchored drawer.</p>
                <p className="text-slate-400">It slides in from the right edge and overlays the main content.</p>
                <button type="button" onClick={() => setRightOpen(false)} className="rounded-md border border-slate-200 w-full py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
                  Close
                </button>
              </div>
            </Drawer>

            <Drawer open={bottomOpen} onClose={() => setBottomOpen(false)} title="Filter options" placement="bottom" maxHeight="max-h-[50vh]">
              <div className="space-y-3 text-sm text-slate-600">
                <p className="font-medium">This is a bottom-anchored drawer.</p>
                <p className="text-slate-400">Useful for filter panels and mobile-first layouts.</p>
                <button type="button" onClick={() => setBottomOpen(false)} className="rounded-md border border-slate-200 w-full py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
                  Close
                </button>
              </div>
            </Drawer>
          </ShowcasePreview>
        </GallerySection>

        {/* ── 3. Playground ─────────────────────────────────────────────── */}
        <GallerySection id="playground" title="Playground" description="Adjust placement and optional description.">
          <DrawerPlayground />
        </GallerySection>

        {/* ── 4. Implementation ─────────────────────────────────────────── */}
        <GallerySection id="implementation" title="Implementation">
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.basic} language="tsx" title="Basic drawer (right, default)" center minHeight="min-h-[80px]">
              <p className="text-sm text-slate-500 italic">Click the buttons in the Overview section to see live demos.</p>
            </Showcase>
          </ShowcaseGrid>
          <Showcase code={CODE.bottom} language="tsx" title="Bottom sheet">
            <button
              type="button"
              onClick={() => setBottomOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-md hover:bg-slate-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <Filter size={15} aria-hidden="true" /> Open bottom sheet
            </button>
          </Showcase>
          <Showcase code={CODE.controlled} language="tsx" title="Controlled with width/description">
            <button
              type="button"
              onClick={() => setRightOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white text-sm font-bold rounded-md hover:bg-brand-navy transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
            >
              <MessageSquare size={15} aria-hidden="true" /> Open right drawer
            </button>
          </Showcase>
        </GallerySection>

        {/* ── 5. Accessibility ──────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {[
              ['ARIA', [
                'role="dialog" + aria-modal="true" on the panel — blocks AT from background content.',
                'aria-labelledby wired to the title heading via useId().',
                'aria-describedby set when description prop is provided.',
                'The backdrop is aria-hidden="true" — not keyboard-reachable.',
                'The close button has aria-label (configurable via closeLabel prop).',
              ]],
              ['Focus', [
                'On open: focus moves to the first focusable element inside the panel.',
                'Tab / Shift+Tab are trapped inside the panel.',
                'On close (Escape, backdrop, close button): focus returns to the element that opened the drawer.',
              ]],
              ['Keyboard', [
                'Escape closes the drawer from any focus position.',
                'Tab / Shift+Tab cycle through interactive elements inside the panel only.',
                'Clicking the backdrop closes the drawer.',
              ]],
              ['Scroll and portal', [
                'document.body overflow is locked while open and restored on close.',
                'Renders via createPortal to document.body — escapes all parent stacking contexts.',
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
          <ApiTable props={[
            { name: 'open',         type: 'boolean',    required: true, description: 'Controls whether the drawer is visible.' },
            { name: 'onClose',      type: '() => void', required: true, description: 'Called on Escape, backdrop click, or close button.' },
            { name: 'title',        type: 'ReactNode',  required: true, description: 'Drawer heading. Wired to aria-labelledby.' },
            { name: 'description',  type: 'string',     description: 'Optional description below the title. Wired to aria-describedby.' },
            { name: 'placement',    type: "'right' | 'bottom'", default: "'right'", description: 'Anchors the panel to the right edge or bottom edge.' },
            { name: 'width',        type: 'string',     default: "'w-80'",          description: "Tailwind width class for 'right' placement." },
            { name: 'maxHeight',    type: 'string',     default: "'max-h-[85vh]'",  description: "Tailwind max-height class for 'bottom' placement." },
            { name: 'closeLabel',   type: 'string',     default: "'Close drawer'",  description: 'aria-label for the close button.' },
            { name: 'children',     type: 'ReactNode',  required: true, description: 'Drawer body content.' },
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
