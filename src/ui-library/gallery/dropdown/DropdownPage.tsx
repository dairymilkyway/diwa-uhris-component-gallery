/**
 * DropdownPage — Gallery infrastructure
 *
 * Showcases the Dropdown design-system component.
 * Dropdown is a controlled primitive: a trigger button anchored to a
 * floating panel. All open/close state lives in the consumer.
 */

import { useState } from 'react';
import { Building2, Calendar, ChevronDown, Filter } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { DropdownPlayground } from './DropdownPlayground';
import { Dropdown } from './Dropdown';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['menu', 'select']);

// ── Overview examples ──────────────────────────────────────────────────────
// Each example is a named component so hooks are called at the top level.

function StatusFilterExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('');
  const label = status || 'All Statuses';
  return (
    <Dropdown
      trigger={
        <>
          <Filter size={14} aria-hidden="true" />
          <span className="max-w-[120px] truncate">{label}</span>
          <ChevronDown
            size={14}
            aria-hidden="true"
            className={`text-slate-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </>
      }
      isOpen={isOpen}
      onToggle={() => setIsOpen((v) => !v)}
      onClose={() => setIsOpen(false)}
    >
      {['', 'Active', 'Inactive', 'Suspended'].map((s) => (
        <button
          key={s || '__all'}
          type="button"
          onClick={() => { setStatus(s); setIsOpen(false); }}
          className={`block w-full text-left px-4 py-2 text-sm font-bold transition-all hover:bg-slate-50 ${
            status === s ? 'text-brand-blue bg-blue-50/60' : 'text-slate-600'
          }`}
        >
          {s || 'All Statuses'}
        </button>
      ))}
    </Dropdown>
  );
}

function DepartmentFilterExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [dept, setDept] = useState('');
  const DEPTS = ['Engineering', 'Finance', 'Human Resources', 'Operations'];
  const label = dept || 'All Departments';
  return (
    <Dropdown
      trigger={
        <>
          <Building2 size={14} aria-hidden="true" />
          <span className="max-w-[140px] truncate">{label}</span>
          <ChevronDown
            size={14}
            aria-hidden="true"
            className={`text-slate-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </>
      }
      isOpen={isOpen}
      onToggle={() => setIsOpen((v) => !v)}
      onClose={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => { setDept(''); setIsOpen(false); }}
        className={`block w-full text-left px-4 py-2 text-sm font-bold transition-all hover:bg-slate-50 ${
          dept === '' ? 'text-brand-blue bg-blue-50/60' : 'text-slate-600'
        }`}
      >
        All Departments
      </button>
      {DEPTS.map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => { setDept(d); setIsOpen(false); }}
          className={`block w-full text-left px-4 py-2 text-sm font-bold transition-all hover:bg-slate-50 ${
            dept === d ? 'text-brand-blue bg-blue-50/60' : 'text-slate-600'
          }`}
        >
          {d}
        </button>
      ))}
    </Dropdown>
  );
}

function DateRangeExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo]     = useState('');
  const label = from ? `${from} → ${to || '…'}` : 'Date Range';
  return (
    <Dropdown
      trigger={
        <>
          <Calendar size={14} aria-hidden="true" />
          <span className="max-w-[140px] truncate">{label}</span>
          <ChevronDown
            size={14}
            aria-hidden="true"
            className={`text-slate-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </>
      }
      isOpen={isOpen}
      onToggle={() => setIsOpen((v) => !v)}
      onClose={() => setIsOpen(false)}
    >
      <div className="p-3 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">From</p>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium outline-none focus:ring-2 focus:ring-brand-blue/15"
        />
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">To</p>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium outline-none focus:ring-2 focus:ring-brand-blue/15"
        />
        <button
          type="button"
          onClick={() => { setFrom(''); setTo(''); setIsOpen(false); }}
          className="w-full text-center px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-brand-blue transition-all"
        >
          Clear
        </button>
      </div>
    </Dropdown>
  );
}

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  basic: `import { Dropdown } from '@diwauhris/ui';
import { useState } from 'react';
import { Filter, ChevronDown } from '@diwauhris/ui';

const [isOpen, setIsOpen] = useState(false);
const [status, setStatus] = useState('');

<Dropdown
  trigger={
    <>
      <Filter size={14} />
      <span>{status || 'All Statuses'}</span>
      <ChevronDown size={14} className="text-slate-300" />
    </>
  }
  isOpen={isOpen}
  onToggle={() => setIsOpen((v) => !v)}
  onClose={() => setIsOpen(false)}
>
  {['', 'Active', 'Inactive', 'Suspended'].map((s) => (
    <button
      key={s || '__all'}
      type="button"
      onClick={() => { setStatus(s); setIsOpen(false); }}
      className={\`block w-full text-left px-4 py-2 text-sm font-bold
        hover:bg-slate-50 \${status === s ? 'text-brand-blue bg-blue-50/60' : 'text-slate-600'}\`}
    >
      {s || 'All Statuses'}
    </button>
  ))}
</Dropdown>`,

  multi: `// Multiple dropdowns on the same page — use a single shared state key
// so only one is open at a time.

const [openDropdown, setOpenDropdown] = useState<'status' | 'dept' | null>(null);

<Dropdown
  trigger={<><Filter size={14} /><span>{statusLabel}</span><ChevronDown size={14} /></>}
  isOpen={openDropdown === 'status'}
  onToggle={() => setOpenDropdown((v) => v === 'status' ? null : 'status')}
  onClose={() => setOpenDropdown(null)}
>
  {/* status options */}
</Dropdown>

<Dropdown
  trigger={<><Building2 size={14} /><span>{deptLabel}</span><ChevronDown size={14} /></>}
  isOpen={openDropdown === 'dept'}
  onToggle={() => setOpenDropdown((v) => v === 'dept' ? null : 'dept')}
  onClose={() => setOpenDropdown(null)}
>
  {/* department options */}
</Dropdown>`,

  custom: `import { useState } from 'react';
import { Dropdown } from '@diwauhris/ui';
import { Calendar, ChevronDown } from '@diwauhris/ui';

// The panel accepts any ReactNode — not just option lists.
// Here it holds date inputs.
const [isOpen, setIsOpen] = useState(false);
const [from, setFrom]     = useState('');
const [to, setTo]         = useState('');
const dateLabel = from ? \`\${from} → \${to || '…'}\` : 'Date Range';

<Dropdown
  trigger={<><Calendar size={14} /><span>{dateLabel}</span><ChevronDown size={14} /></>}
  isOpen={isOpen}
  onToggle={() => setIsOpen((v) => !v)}
  onClose={() => setIsOpen(false)}
>
  <div className="p-3 space-y-2">
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">From</p>
    <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">To</p>
    <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
    <button type="button" onClick={() => { setFrom(''); setTo(''); setIsOpen(false); }}
      className="w-full text-xs font-bold text-slate-500 hover:text-brand-blue py-1.5">
      Clear
    </button>
  </div>
</Dropdown>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function DropdownPage() {
  return (
    <GalleryLayout activeId="dropdown">
      <title>Dropdown — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Navigation"
          name="Dropdown"
          description="A trigger that opens a floating panel below it. You own the open/close state and the panel contents — use Menu inside it for a list of actions."
          status="complete"
        />

        {/* Overview ── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Live examples using the real component. Click any trigger to open its panel."
        >
          <ShowcasePreview standalone center={false} overflow="visible" minHeight="min-h-[300px]">
            <ShowcaseGrid columns={3}>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Status filter</p>
                <StatusFilterExample />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Department filter</p>
                <DepartmentFilterExample />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Custom panel content</p>
                <DateRangeExample />
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Playground ── */}
        <GallerySection
          id="playground"
          title="Playground"
          description="Click the trigger to open. Select a value from the options or the controls panel."
        >
          <DropdownPlayground />
        </GallerySection>

        {/* Implementation ── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="Import DropdownFilter from the shared component. The gallery Dropdown re-exports the same implementation."
        >
          <Showcase code={CODE.basic} language="tsx" title="Basic controlled usage" overflow="visible" minHeight="min-h-[300px]">
            <StatusFilterExample />
          </Showcase>
          <Showcase code={CODE.multi} language="tsx" title="Multiple dropdowns — one open at a time" overflow="visible" minHeight="min-h-[300px]">
            <DepartmentFilterExample />
          </Showcase>
          <Showcase code={CODE.custom} language="tsx" title="Custom panel content (date range)" overflow="visible" minHeight="min-h-[360px]">
            <DateRangeExample />
          </Showcase>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['ARIA Attributes', [
                'aria-expanded reflects whether the panel is open (true) or closed (false).',
                'aria-haspopup="true" signals to screen readers that the button controls a popup.',
                'aria-controls references the unique panel ID so assistive technology can locate the popup.',
                'Panel ID is generated with React useId() — unique per component instance on the page.',
              ]],
              ['Keyboard', [
                'Escape closes the open panel from any focus position inside the document.',
                'Tab moves focus through the trigger and any focusable elements inside the panel naturally.',
                'The trigger has a visible focus ring (focus-visible:ring-2 ring-brand-blue/30) for keyboard users.',
              ]],
              ['Semantic Limitation', [
                'Dropdown accepts arbitrary ReactNode panel content and does not impose role="listbox" or role="option" on its children.',
                'Consumers are responsible for providing appropriate ARIA semantics for their own panel content.',
                'Arrow-key option navigation, focus-trap, and automatic focus movement are not implemented and are outside this component\'s scope.',
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

        {/* API ── */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'trigger',  type: 'ReactNode',    required: true, description: 'Complete trigger button content — icons, label text, chevron — supplied by the consumer.' },
            { name: 'isOpen',   type: 'boolean',      required: true, description: 'Controlled open state. Consumer owns this value.' },
            { name: 'onToggle', type: '() => void',   required: true, description: 'Called when the trigger is clicked. Consumer is responsible for toggling isOpen.' },
            { name: 'onClose',  type: '() => void',   required: true, description: 'Called on outside mousedown or Escape. Consumer sets isOpen to false.' },
            { name: 'children', type: 'ReactNode',    required: true, description: 'Content rendered inside the floating panel. Typically option buttons, but any ReactNode is accepted.' },
          ]} />

          <div className="rounded-xl border border-slate-200 bg-amber-50 px-5 py-4">
            <p className="text-sm font-semibold text-amber-800">Use Menu instead when:</p>
            <ul className="mt-2 space-y-1">
              {[
                'The panel contains discrete commands or actions, not filter selections — use Menu.',
                'You need built-in Arrow-key navigation and focus management — use Menu.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-medium text-amber-700">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </GallerySection>

        {/* Related ── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
