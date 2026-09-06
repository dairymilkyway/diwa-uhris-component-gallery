/**
 * MenuPage — Gallery infrastructure
 *
 * Gallery page for the Menu design-system component.
 *
 * Section order: Header → Overview → Playground → Implementation → Accessibility → API → Related
 */

import { Archive, Edit, Eye, MoreVertical, Pencil, Trash2, UserMinus } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { MenuPlayground } from './MenuPlayground';
import { Menu } from './Menu';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['button', 'dialog', 'card']);

const TRIGGER_BTN = (
  <button
    type="button"
    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
    aria-label="Actions"
  >
    <MoreVertical size={16} aria-hidden="true" />
  </button>
);

// ── Code strings ──────────────────────────────────────────────────────────────

const CODE = {
  basic: `import { Menu } from '@diwauhris/ui';
import { Edit, Trash2 } from '@diwauhris/ui';
import { MoreVertical } from '@diwauhris/ui';

const handleEdit   = () => {};
const handleDelete = () => {};

const trigger = (
  <button type="button" aria-label="Actions"
    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50"
  >
    <MoreVertical size={16} aria-hidden="true" />
  </button>
);

<Menu
  trigger={trigger}
  items={[
    { label: 'Edit',   icon: <Edit   size={14} aria-hidden="true" />, onClick: handleEdit   },
    { label: 'Delete', icon: <Trash2 size={14} aria-hidden="true" />, onClick: handleDelete, tone: 'danger' },
  ]}
/>`,

  withDisabled: `// Assumes you have your own state/handlers — see full example above
const handleEdit    = () => {};
const handleArchive = () => {};
const handleDelete  = () => {};
const canEdit       = true; // replace with your permission check

<Menu
  trigger={trigger}
  items={[
    { label: 'Edit',    icon: <Pencil  size={14} aria-hidden="true" />, onClick: handleEdit    },
    { label: 'Archive', icon: <Archive size={14} aria-hidden="true" />, onClick: handleArchive, disabled: !canEdit },
    { label: 'Delete',  icon: <Trash2  size={14} aria-hidden="true" />, onClick: handleDelete,  tone: 'danger'     },
  ]}
/>`,

  withoutIcons: `// Assumes you have your own state/handlers — see full example above
const handleView   = () => {};
const handleEdit   = () => {};
const handleDelete = () => {};

<Menu
  trigger={trigger}
  items={[
    { label: 'View',   onClick: handleView   },
    { label: 'Edit',   onClick: handleEdit   },
    { label: 'Delete', onClick: handleDelete, tone: 'danger' },
  ]}
/>`,

  leftAlign: `// Panel aligns to the left edge of the trigger (default: right)
<Menu
  trigger={trigger}
  align="left"
  items={items}
/>`,

  patternTableRow: `// Per-row action menu in a data table
{rows.map((row) => (
  <tr key={row.id}>
    <td>{row.name}</td>
    <td className="text-right">
      <Menu
        trigger={
          <button type="button" aria-label={\`Actions for \${row.name}\`}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <MoreVertical size={16} aria-hidden="true" />
          </button>
        }
        items={[
          { label: 'Edit',     icon: <Edit   size={14} />, onClick: () => openEdit(row)   },
          { label: 'Deactivate', icon: <UserMinus size={14} />, onClick: () => deactivate(row) },
          { label: 'Delete',   icon: <Trash2 size={14} />, onClick: () => confirmDelete(row), tone: 'danger' },
        ]}
      />
    </td>
  </tr>
))}`,

  patternCardActions: `// Fragment — assumes your own handlers:
// const handleDuplicate = () => {};
// const handleArchive   = () => {};
// const handleDelete    = () => {};

// Card header action menu
<CardHeader
  title="Payroll Template A"
  actions={
    <Menu
      trigger={
        <button type="button" aria-label="Template actions"
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
        >
          <MoreVertical size={16} aria-hidden="true" />
        </button>
      }
      items={[
        { label: 'Duplicate', icon: <Copy   size={14} />, onClick: handleDuplicate },
        { label: 'Archive',   icon: <Archive size={14} />, onClick: handleArchive  },
        { label: 'Delete',    icon: <Trash2  size={14} />, onClick: handleDelete, tone: 'danger' },
      ]}
    />
  }
/>`,
};

export default function MenuPage() {
  return (
    <GalleryLayout activeId="menu">
      <title>Menu — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* Header */}
        <GalleryComponentHeader
          category="Navigation"
          name="Menu"
          description="A list of actions in a floating dropdown. Supports icons, dividers, destructive tones, and disabled items. Full keyboard navigation — arrow keys to move, Enter to activate, Escape to close."
          status="complete"
        />

        {/* Overview */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Common menu configurations at a glance. Click any trigger to open. No code — use the playground to experiment."
        >
          <ShowcasePreview standalone overflow="visible" minHeight="min-h-[280px]">
            <div className="flex flex-wrap items-center gap-8">
              {/* Basic */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Basic</p>
                <Menu
                  trigger={TRIGGER_BTN}
                  items={[
                    { label: 'Edit',   icon: <Edit   size={14} aria-hidden="true" />, onClick: () => {} },
                    { label: 'Delete', icon: <Trash2 size={14} aria-hidden="true" />, onClick: () => {}, tone: 'danger' },
                  ]}
                />
              </div>
              {/* With disabled */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Disabled item</p>
                <Menu
                  trigger={TRIGGER_BTN}
                  items={[
                    { label: 'View',    icon: <Eye    size={14} aria-hidden="true" />, onClick: () => {} },
                    { label: 'Archive', icon: <Archive size={14} aria-hidden="true" />, onClick: () => {}, disabled: true },
                    { label: 'Delete',  icon: <Trash2 size={14} aria-hidden="true" />, onClick: () => {}, tone: 'danger' },
                  ]}
                />
              </div>
              {/* No icons */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">No icons</p>
                <Menu
                  trigger={TRIGGER_BTN}
                  items={[
                    { label: 'View',   onClick: () => {} },
                    { label: 'Edit',   onClick: () => {} },
                    { label: 'Delete', onClick: () => {}, tone: 'danger' },
                  ]}
                />
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Playground */}
        <GallerySection id="playground" title="Playground" description="Adjust alignment, icons, and item states. Click the trigger to open the menu.">
          <MenuPlayground />
        </GallerySection>

        {/* Implementation — Variants */}
        <GallerySection id="variants" title="Variants">
          <ShowcaseGrid columns={2}>
            <Showcase
              title="Basic"
              description="A minimal action menu with an edit and danger delete."
              code={CODE.basic}
              overflow="visible"
              minHeight="min-h-[260px]"
            >
              <Menu
                trigger={TRIGGER_BTN}
                items={[
                  { label: 'Edit',   icon: <Edit   size={14} aria-hidden="true" />, onClick: () => {} },
                  { label: 'Delete', icon: <Trash2 size={14} aria-hidden="true" />, onClick: () => {}, tone: 'danger' },
                ]}
              />
            </Showcase>

            <Showcase
              title="With disabled item"
              description="Disabled items are non-interactive but remain visible."
              code={CODE.withDisabled}
              overflow="visible"
              minHeight="min-h-[280px]"
            >
              <Menu
                trigger={TRIGGER_BTN}
                items={[
                  { label: 'Edit',    icon: <Pencil  size={14} aria-hidden="true" />, onClick: () => {} },
                  { label: 'Archive', icon: <Archive size={14} aria-hidden="true" />, onClick: () => {}, disabled: true },
                  { label: 'Delete',  icon: <Trash2  size={14} aria-hidden="true" />, onClick: () => {}, tone: 'danger' },
                ]}
              />
            </Showcase>

            <Showcase
              title="Without icons"
              description="Icons are optional — omit them for a text-only list."
              code={CODE.withoutIcons}
              overflow="visible"
              minHeight="min-h-[260px]"
            >
              <Menu
                trigger={TRIGGER_BTN}
                items={[
                  { label: 'View',   onClick: () => {} },
                  { label: 'Edit',   onClick: () => {} },
                  { label: 'Delete', onClick: () => {}, tone: 'danger' },
                ]}
              />
            </Showcase>

            <Showcase
              title="Left-aligned panel"
              description="align='left' opens the panel flush with the left edge of the trigger."
              code={CODE.leftAlign}
              overflow="visible"
              minHeight="min-h-[260px]"
            >
              <Menu
                trigger={TRIGGER_BTN}
                align="left"
                items={[
                  { label: 'Edit',   icon: <Edit   size={14} aria-hidden="true" />, onClick: () => {} },
                  { label: 'Delete', icon: <Trash2 size={14} aria-hidden="true" />, onClick: () => {}, tone: 'danger' },
                ]}
              />
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* Patterns */}
        <GallerySection id="patterns" title="Patterns">
          <ShowcaseGrid columns={2}>
            <Showcase
              title="Table row actions"
              description="Place Menu in the last column of a data table for per-row workflow actions."
              code={CODE.patternTableRow}
              overflow="visible"
              minHeight="min-h-[240px]"
            >
              <div className="w-full overflow-hidden rounded-xl border border-slate-200">
                {['Maria Santos', 'Juan dela Cruz'].map((name) => (
                  <div key={name} className="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0">
                    <span className="text-sm font-semibold text-slate-700">{name}</span>
                    <Menu
                      trigger={
                        <button type="button" aria-label={`Actions for ${name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
                        >
                          <MoreVertical size={14} aria-hidden="true" />
                        </button>
                      }
                      items={[
                        { label: 'Edit',       icon: <Edit      size={14} aria-hidden="true" />, onClick: () => {} },
                        { label: 'Deactivate', icon: <UserMinus size={14} aria-hidden="true" />, onClick: () => {} },
                        { label: 'Delete',     icon: <Trash2    size={14} aria-hidden="true" />, onClick: () => {}, tone: 'danger' },
                      ]}
                    />
                  </div>
                ))}
              </div>
            </Showcase>

            <Showcase
              title="Card header actions"
              description="Place Menu in the card header actions slot for card-level operations."
              code={CODE.patternCardActions}
              overflow="visible"
              minHeight="min-h-[240px]"
            >
              <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Payroll Template A</p>
                    <p className="text-xs text-slate-400">Updated 2 hours ago</p>
                  </div>
                  <Menu
                    trigger={
                      <button type="button" aria-label="Template actions"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
                      >
                        <MoreVertical size={14} aria-hidden="true" />
                      </button>
                    }
                    items={[
                      { label: 'Archive', icon: <Archive size={14} aria-hidden="true" />, onClick: () => {} },
                      { label: 'Delete',  icon: <Trash2  size={14} aria-hidden="true" />, onClick: () => {}, tone: 'danger' },
                    ]}
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-slate-500">Standard monthly computation for rank-and-file employees.</p>
                </div>
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['ARIA', [
                'The panel uses role="menu" with aria-label — screen readers announce it as a menu.',
                'Each item uses role="menuitem".',
                'Disabled items are rendered with the disabled attribute — they are announced as unavailable.',
                'The consumer-provided trigger element (typically a <button>) should carry aria-label when icon-only. The Menu component does not add ARIA attributes to the trigger.',
              ]],
              ['Keyboard', [
                'Enter or Space — opens the menu and focuses the first item.',
                'ArrowDown / ArrowUp — moves between menu items.',
                'Home — moves to the first item.',
                'End — moves to the last item.',
                'Escape — closes the menu.',
                'Tab — closes the menu (focus leaves the container via browser default).',
              ]],
              ['Trigger', [
                'The trigger element should always have an aria-label when it contains only an icon.',
                'When used in a table row, include the row context in the aria-label (e.g. "Actions for Juan dela Cruz").',
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
          <p className="text-sm font-bold text-slate-700 mb-2">Menu</p>
          <ApiTable
            props={[
              { name: 'trigger',   type: 'ReactNode',    required: true, description: 'The element that opens the menu when clicked. Should have aria-label when icon-only.' },
              { name: 'items',        type: 'MenuItem[]',                      required: true, description: 'Menu items. See MenuItem shape below.' },
              { name: 'align',        type: "'left' | 'right'",                  default: "'right'", description: 'Panel alignment relative to the trigger.' },
              { name: 'ariaLabel',    type: 'string',                            default: '"Menu"', description: 'aria-label for the panel element.' },
              { name: 'open',         type: 'boolean',                           description: 'Controlled open state. When provided, the caller manages open/close.' },
              { name: 'onOpenChange', type: '(open: boolean) => void',           description: 'Called when the menu should open or close. Required for controlled mode.' },
            ]}
          />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">MenuItem</p>
          <ApiTable
            props={[
              { name: 'label',    type: 'string',       required: true,  description: 'Visible text label for the item.' },
              { name: 'onClick',  type: '() => void',   required: true,  description: 'Called when the item is clicked.' },
              { name: 'icon',     type: 'ReactNode',    description: 'Optional icon before the label. Mark aria-hidden="true".' },
              { name: 'tone',     type: "'default' | 'danger'", default: "'default'", description: 'Danger renders the item in rose — use for destructive actions.' },
              { name: 'disabled', type: 'boolean',      default: 'false', description: 'Disables the item — non-interactive but still visible.' },
            ]}
          />
        </GallerySection>

        {/* Related */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
