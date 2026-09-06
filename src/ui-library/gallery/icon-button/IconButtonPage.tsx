/**
 * IconButtonPage — Gallery infrastructure (Inputs)
 * Documents the IconButton design-system component.
 * Source: frontend/src/ui-library/gallery/icon-button/IconButton.tsx
 */

import { Archive, Download, MoreHorizontal, Pencil, Settings, Trash2 } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { IconButton } from './IconButton';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['button', 'menu', 'table', 'toolbar']);

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  basic: `import { IconButton } from '@diwauhris/ui';
import { Pencil, Trash2, Settings } from '@diwauhris/ui';

// Default (slate hover)
<IconButton icon={<Settings size={16} aria-hidden="true" />} aria-label="Open settings" />

// Edit (brand-blue hover)
<IconButton icon={<Pencil size={16} aria-hidden="true" />} aria-label="Edit department" variant="edit" />

// Danger (rose hover)
<IconButton icon={<Trash2 size={16} aria-hidden="true" />} aria-label="Delete department" variant="danger" />`,

  table: `import { IconButton } from '@diwauhris/ui';
import { Pencil, Trash2 } from '@diwauhris/ui';

// tableActionGroup is a Tailwind class string — use it inline or define locally.
const tableActionGroup = 'flex items-center justify-end gap-1';

<td className="px-5 py-3">
  <div className={tableActionGroup}>
    <IconButton
      icon={<Pencil size={16} aria-hidden="true" />}
      aria-label={\`Edit \${row.name}\`}
      variant="edit"
      onClick={() => openEdit(row)}
    />
    <IconButton
      icon={<Trash2 size={16} aria-hidden="true" />}
      aria-label={\`Delete \${row.name}\`}
      variant="danger"
      onClick={() => openDelete(row)}
    />
  </div>
</td>`,

  disabled: `// Disabled state
<IconButton
  icon={<Pencil size={16} aria-hidden="true" />}
  aria-label="Edit (unavailable)"
  variant="edit"
  disabled
/>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function IconButtonPage() {
  return (
    <GalleryLayout activeId="icon-button">
      <title>Icon Button — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Inputs"
          name="Icon Button"
          description="A square button for when the icon speaks for itself. Three variants: default (slate), edit (brand blue), and danger (rose). No visible text means aria-label is required — every time."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview">
          <ShowcasePreview standalone>
            <ShowcaseGrid columns={4}>
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">default</p>
                <div className="flex gap-2">
                  <IconButton icon={<Download size={16} aria-hidden="true" />} aria-label="Download" />
                  <IconButton icon={<Settings size={16} aria-hidden="true" />} aria-label="Settings" />
                  <IconButton icon={<MoreHorizontal size={16} aria-hidden="true" />} aria-label="More options" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">edit</p>
                <IconButton icon={<Pencil size={16} aria-hidden="true" />} aria-label="Edit item" variant="edit" />
              </div>
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">danger</p>
                <div className="flex gap-2">
                  <IconButton icon={<Trash2 size={16} aria-hidden="true" />} aria-label="Delete item" variant="danger" />
                  <IconButton icon={<Archive size={16} aria-hidden="true" />} aria-label="Archive item" variant="danger" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">disabled</p>
                <div className="flex gap-2">
                  <IconButton icon={<Settings size={16} aria-hidden="true" />} aria-label="Settings (disabled)" disabled />
                  <IconButton icon={<Pencil size={16} aria-hidden="true" />} aria-label="Edit (disabled)" variant="edit" disabled />
                  <IconButton icon={<Trash2 size={16} aria-hidden="true" />} aria-label="Delete (disabled)" variant="danger" disabled />
                </div>
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="All three variants">
            <div className="flex items-center gap-3">
              <IconButton icon={<Settings size={16} aria-hidden="true" />} aria-label="Open settings" />
              <IconButton icon={<Pencil size={16} aria-hidden="true" />} aria-label="Edit department" variant="edit" />
              <IconButton icon={<Trash2 size={16} aria-hidden="true" />} aria-label="Delete department" variant="danger" />
            </div>
          </Showcase>

          <Showcase code={CODE.table} language="tsx" title="In a table action column">
            <div className="flex items-center gap-1">
              <IconButton icon={<Pencil size={16} aria-hidden="true" />} aria-label="Edit Engineering" variant="edit" />
              <IconButton icon={<Trash2 size={16} aria-hidden="true" />} aria-label="Delete Engineering" variant="danger" />
            </div>
          </Showcase>

          <Showcase code={CODE.disabled} language="tsx" title="Disabled state">
            <div className="flex items-center gap-2">
              <IconButton icon={<Pencil size={16} aria-hidden="true" />} aria-label="Edit (unavailable)" variant="edit" disabled />
              <IconButton icon={<Trash2 size={16} aria-hidden="true" />} aria-label="Delete (unavailable)" variant="danger" disabled />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['aria-label is required', [
                'Icon buttons have no visible text. Every IconButton MUST have aria-label describing the action AND its target.',
                'Correct: aria-label="Edit Engineering" — includes what is being edited.',
                'Incorrect: aria-label="Edit" — too generic; ambiguous in a list of rows.',
                'The icon inside the button must have aria-hidden="true" to prevent the icon description from being announced twice.',
              ]],
              ['Why title is not a substitute for aria-label', [
                'title provides a browser tooltip on hover — it is not reliably announced by screen readers.',
                'Some screen readers ignore title entirely. Others announce it only in certain modes.',
                'Always use aria-label for accessible naming. Use title only as an additional visual tooltip.',
              ]],
              ['Focus ring', [
                'All variants include focus-visible:ring-2, shown only for keyboard navigation.',
                'default and edit use ring-brand-blue/20. danger uses ring-rose-100.',
              ]],
              ['Disabled behavior', [
                'disabled sets the HTML disabled attribute — the button is excluded from Tab navigation and cannot be activated.',
                'Opacity is reduced to 40% to indicate inactivity.',
              ]],
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

        {/* API */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'aria-label', type: 'string',                                        required: true, description: 'Accessible name. Describe action + target: "Edit Engineering" not "Edit".' },
            { name: 'icon',       type: 'ReactNode',                                     required: true, description: 'Icon element. Mark it aria-hidden="true".' },
            { name: 'variant',    type: "'default' | 'edit' | 'danger'", default: "'default'",          description: 'Visual variant. default=slate, edit=brand-blue, danger=rose.' },
            { name: 'disabled',   type: 'boolean',                       default: 'false',              description: 'Disables the button and removes it from Tab order.' },
            { name: 'type',       type: "'button' | 'submit' | 'reset'", default: "'button'",           description: 'HTML button type.' },
            { name: 'onClick',    type: '() => void',                                                   description: 'Click handler.' },
            { name: 'title',      type: 'string',                                                       description: 'Browser tooltip (secondary affordance only — not an aria-label substitute).' },
            { name: 'className',  type: 'string',                                                       description: 'Additional class on the button.' },
            { name: 'asChild',    type: 'boolean',                       default: 'false',              description: 'Renders as the child element via Radix Slot. Use to apply IconButton styles to an <a> tag.' },
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
