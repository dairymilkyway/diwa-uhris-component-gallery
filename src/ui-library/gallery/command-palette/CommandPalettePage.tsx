/**
 * CommandPalettePage — Gallery infrastructure (Overlay)
 * Source: gallery/command-palette/CommandPalette.tsx
 */

import { useState } from 'react';
import { Building2, Command, FileText, Settings, Users } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { CommandPalette, type CommandItem } from './CommandPalette';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['dialog', 'dropdown', 'input', 'menu']);

const ALL_COMMANDS: CommandItem[] = [
  { id: 'emp',   label: 'Employee Directory',    icon: <Users size={16} />,     group: 'Navigate', onSelect: () => {} },
  { id: 'org',   label: 'Company Structure',     icon: <Building2 size={16} />, group: 'Navigate', onSelect: () => {} },
  { id: 'paf',   label: 'Personnel Action Forms', icon: <FileText size={16} />, group: 'Navigate', onSelect: () => {} },
  { id: 'set',   label: 'System Settings',       icon: <Settings size={16} />, group: 'Settings', onSelect: () => {} },
  { id: 'usr',   label: 'User Management',       icon: <Users size={16} />,    group: 'Settings', onSelect: () => {} },
];

const CODE = {
  basic: `import { CommandPalette, type CommandItem } from '@diwauhris/ui';

const [open, setOpen] = useState(false);
const [query, setQuery] = useState('');

const allCommands: CommandItem[] = [
  { id: 'emp', label: 'Employee Directory', icon: <Users size={15} />, group: 'Navigate',
    onSelect: () => navigate('/personnel/employees') },
  { id: 'org', label: 'Company Structure',  icon: <Building2 size={15} />, group: 'Navigate',
    onSelect: () => navigate('/org-structure/company-structure') },
];

// Filter by query
const filtered = allCommands.filter((c) =>
  c.label.toLowerCase().includes(query.toLowerCase())
);

// Trigger
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setOpen(true);
    }
  };
  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}, []);

<button onClick={() => setOpen(true)}>Open palette</button>

<CommandPalette
  open={open}
  onClose={() => { setOpen(false); setQuery(''); }}
  items={filtered}
  query={query}
  onQueryChange={setQuery}
/>`,

  grouped: `import { CommandPalette, type CommandItem } from '@diwauhris/ui';

// Use the group field on each item to create visual section headers.
// Items are automatically grouped by the component when group differs.
const commands: CommandItem[] = [
  { id: 'emp', label: 'Employee Directory', group: 'Navigate', onSelect: () => {} },
  { id: 'org', label: 'Company Structure',  group: 'Navigate', onSelect: () => {} },
  { id: 'set', label: 'System Settings',    group: 'Settings', onSelect: () => {} },
  { id: 'usr', label: 'User Management',    group: 'Settings', onSelect: () => {} },
];

<CommandPalette
  open={open}
  onClose={onClose}
  items={commands}
  query={query}
  onQueryChange={setQuery}
/>`,

  empty: `import { CommandPalette } from '@diwauhris/ui';

// When items is an empty array (after filtering), the palette shows
// an empty state message prompting the user to refine their search.
<CommandPalette
  open={open}
  onClose={onClose}
  items={[]}
  query="xyz"
  onQueryChange={setQuery}
/>`,
};

function PaletteDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const filtered = ALL_COMMANDS.filter((c) =>
    !query || c.label.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      >
        <Command size={14} aria-hidden="true" />
        Open Command Palette
        <kbd className="ml-1 rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-400">⌘K</kbd>
      </button>
      <CommandPalette
        open={open}
        onClose={() => { setOpen(false); setQuery(''); }}
        items={filtered}
        query={query}
        onQueryChange={setQuery}
      />
    </>
  );
}

function EmptyResultsDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('xyz');
  const filtered = ALL_COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      >
        <Command size={14} aria-hidden="true" />
        Open (no results)
      </button>
      <CommandPalette
        open={open}
        onClose={() => { setOpen(false); setQuery('xyz'); }}
        items={filtered}
        query={query}
        onQueryChange={setQuery}
      />
    </>
  );
}

export default function CommandPalettePage() {
  return (
    <GalleryLayout activeId="command-palette">
      <title>Command Palette — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Overlay"
          name="Command Palette"
          description="A full-screen search palette for power users. Trigger it with a keyboard shortcut, type to filter commands, navigate with arrow keys, and activate with Enter."
          status="complete"
        />

        <GallerySection id="overview" title="Overview" description="Click the button or press ⌘K to open.">
          <ShowcasePreview standalone>
            <PaletteDemo />
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="With Cmd+K trigger and filtering">
            <PaletteDemo />
          </Showcase>
          <Showcase code={CODE.grouped} language="tsx" title="Grouped items" description="Set the group field on each CommandItem. The palette renders a section header whenever the group changes.">
            <PaletteDemo />
          </Showcase>
          <Showcase code={CODE.empty} language="tsx" title="Empty results state" description="When no items match the query, the palette shows a built-in empty state message.">
            <EmptyResultsDemo />
          </Showcase>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Dialog semantics', ['role="dialog" + aria-modal="true" on the panel. Scroll-locked while open.']],
              ['Search input', ['role="combobox" + aria-expanded + aria-controls pointing to the listbox.']],
              ['Results', ['role="listbox" with role="option" items. aria-selected on the highlighted item.']],
              ['Keyboard', ['ArrowDown / ArrowUp — navigate items. Enter — activate selected. Escape — close.', 'Mouse hover also moves selection.']],
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

        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'open',           type: 'boolean',                      required: true,  description: 'Controls visibility.' },
            { name: 'onClose',        type: '() => void',                   required: true,  description: 'Called on Escape or backdrop click.' },
            { name: 'items',          type: 'CommandItem[]',                required: true,  description: 'Filtered commands to display.' },
            { name: 'query',          type: 'string',                       required: true,  description: 'Current search query (controlled).' },
            { name: 'onQueryChange',  type: '(q: string) => void',          required: true,  description: 'Called on input change.' },
            { name: 'placeholder',    type: 'string', default: '"Search commands…"',          description: 'Input placeholder.' },
            { name: 'aria-label',     type: 'string', default: '"Command palette"',           description: 'Accessible label for the dialog.' },
            { name: 'panelClassName', type: 'string',                                         description: 'Additional Tailwind classes applied to the floating panel card.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
