/**
 * TooltipPage — Gallery infrastructure
 *
 * Documents the Tooltip design-system component.
 * Source: frontend/src/ui-library/gallery/tooltip/Tooltip.tsx
 */

import { Trash2, Settings, Info, Download } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { Tooltip } from './Tooltip';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['popover', 'icon-button', 'button']);

const CODE = {
  basic: `import { Tooltip } from '@diwauhris/ui';
import { Trash2 } from '@diwauhris/ui';

<Tooltip content="Delete record">
  <button type="button" aria-label="Delete record" className="...">
    <Trash2 size={16} aria-hidden="true" />
  </button>
</Tooltip>`,

  placement: `// Top (default)
<Tooltip content="Save to disk" placement="top">…</Tooltip>

// Bottom
<Tooltip content="Save to disk" placement="bottom">…</Tooltip>

// Left / Right
<Tooltip content="Settings" placement="left">…</Tooltip>
<Tooltip content="Settings" placement="right">…</Tooltip>`,

  delay: `// Instant — useful for repeated icon rows
<Tooltip content="Edit" delayMs={0}>…</Tooltip>

// Longer delay — less disruptive on dense UIs
<Tooltip content="This action is permanent" delayMs={800}>…</Tooltip>`,

  disabled: `// Disabled buttons do not fire mouse/focus events.
// Wrap in a <span> to keep tooltip working:
<Tooltip content="You don't have permission">
  <span className="inline-flex cursor-not-allowed">
    <button type="button" disabled>Export</button>
  </span>
</Tooltip>`,
};

const ICON_BTN = 'rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30';

export default function TooltipPage() {
  return (
    <GalleryLayout activeId="tooltip">
      <title>Tooltip — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Overlay"
          name="Tooltip"
          description="A small floating label that appears on hover or focus. Use it to add context to icon buttons, truncated text, or any element that benefits from a one-line explanation."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="Hover or Tab to each button to see the tooltip.">
          <ShowcasePreview standalone minHeight="min-h-[160px]">
            <div className="flex flex-wrap items-center gap-4 py-8">
              <Tooltip content="Delete record" placement="top">
                <button type="button" aria-label="Delete record" className={ICON_BTN}>
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </Tooltip>
              <Tooltip content="Open settings" placement="top">
                <button type="button" aria-label="Open settings" className={ICON_BTN}>
                  <Settings size={16} aria-hidden="true" />
                </button>
              </Tooltip>
              <Tooltip content="More information" placement="top">
                <button type="button" aria-label="More information" className={ICON_BTN}>
                  <Info size={16} aria-hidden="true" />
                </button>
              </Tooltip>
              <Tooltip content="Download CSV" placement="bottom">
                <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
                  <Download size={13} aria-hidden="true" /> Export
                </button>
              </Tooltip>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Placement overview */}
        <GallerySection id="placements" title="Placements" description="All four placement options.">
          <ShowcasePreview standalone minHeight="min-h-[200px]">
            <div className="grid grid-cols-2 gap-12 py-10">
              {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
                <div key={p} className="flex flex-col items-center gap-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{p}</p>
                  <Tooltip content={`Tooltip ${p}`} placement={p} delayMs={0}>
                    <button type="button" className={ICON_BTN} aria-label={`${p} tooltip example`}>
                      <Info size={16} aria-hidden="true" />
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Icon button tooltip (most common use case)">
            <Tooltip content="Delete record" placement="top">
              <button type="button" aria-label="Delete record" className={ICON_BTN}>
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </Tooltip>
          </Showcase>

          <Showcase code={CODE.placement} language="tsx" title="Placement variants">
            <div className="flex items-center gap-6">
              {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
                <Tooltip key={p} content={`Tooltip ${p}`} placement={p} delayMs={0}>
                  <button type="button" aria-label={`${p} tooltip`} className={ICON_BTN}>
                    <Info size={16} aria-hidden="true" />
                  </button>
                </Tooltip>
              ))}
            </div>
          </Showcase>

          <Showcase code={CODE.delay} language="tsx" title="Delay configuration">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">instant (0ms)</p>
                <Tooltip content="Instant tooltip" delayMs={0}>
                  <button type="button" aria-label="Instant tooltip" className={ICON_BTN}>
                    <Info size={16} aria-hidden="true" />
                  </button>
                </Tooltip>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">default (400ms)</p>
                <Tooltip content="Default delay">
                  <button type="button" aria-label="Default delay tooltip" className={ICON_BTN}>
                    <Settings size={16} aria-hidden="true" />
                  </button>
                </Tooltip>
              </div>
            </div>
          </Showcase>

          <Showcase code={CODE.disabled} language="tsx" title="Disabled button trigger">
            <Tooltip content="You don't have permission">
              <span className="inline-flex cursor-not-allowed">
                <button type="button" disabled className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-300">
                  Export
                </button>
              </span>
            </Tooltip>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['ARIA semantics', [
                'The tooltip element has role="tooltip" and a stable id.',
                'The trigger wrapper receives aria-describedby pointing to the tooltip id when visible.',
                'Screen readers announce the tooltip as the accessible description of the trigger.',
                'The tooltip id is removed from aria-describedby when hidden — no stale reference.',
              ]],
              ['Trigger requirements', [
                'The trigger element must have its own accessible name (aria-label or visible text).',
                'The tooltip supplements the name — it does not replace it.',
                'Icon-only buttons must have aria-label="…" regardless of the tooltip.',
              ]],
              ['Keyboard', [
                'Focus on the trigger shows the tooltip (same delay as hover).',
                'Blur on the trigger hides the tooltip immediately.',
                'Escape hides the tooltip without moving focus.',
              ]],
              ['Disabled triggers', [
                'Disabled <button> elements do not fire mouse or focus events.',
                'Wrap a disabled button in a <span className="inline-flex cursor-not-allowed"> to keep the tooltip working.',
              ]],
              ['Do not use for essential information', [
                'Tooltips are hidden by default. Essential content must be accessible without hovering.',
                'Use visible labels, help text, or Field description props for required guidance.',
                'Tooltip is for supplementary context only.',
              ]],
              ['Tooltip vs Popover', [
                'Tooltip — text only, hover/focus triggered, no interaction inside, aria-describedby.',
                'Popover — interactive content, click triggered, role="dialog".',
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
            { name: 'content',   type: 'ReactNode', required: true, description: 'Content displayed in the tooltip. Accepts any ReactNode — string, formatted text, or JSX.' },
            { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Position relative to the trigger.' },
            { name: 'delayMs',   type: 'number',    default: '400', description: 'Milliseconds before the tooltip appears. Use 0 for instant.' },
            { name: 'children',  type: 'ReactNode', required: true, description: 'The trigger element.' },
            { name: 'className', type: 'string',    description: 'Additional class on the root wrapper span.' },
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
