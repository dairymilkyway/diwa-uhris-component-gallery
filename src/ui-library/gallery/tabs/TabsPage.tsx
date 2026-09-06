/**
 * TabsPage — Gallery infrastructure
 *
 * Documents the Tabs design-system component.
 * Source: frontend/src/ui-library/gallery/tabs/Tabs.tsx
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
import { TabsPlayground } from './TabsPlayground';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['segmented-control', 'stepper', 'button']);


// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  basic: `import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@diwauhris/ui';

// Uncontrolled — defaultValue sets the initial active tab.
<Tabs defaultValue="overview">
  <TabList aria-label="Record navigation">
    <Tab value="overview">Overview</Tab>
    <Tab value="details">Details</Tab>
    <Tab value="history">History</Tab>
  </TabList>
  <TabPanels className="pt-4">
    <TabPanel value="overview">Overview content here.</TabPanel>
    <TabPanel value="details">Details content here.</TabPanel>
    <TabPanel value="history">History content here.</TabPanel>
  </TabPanels>
</Tabs>`,

  controlled: `import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@diwauhris/ui';

// Controlled — value and onValueChange mirror the active tab externally.
const [active, setActive] = useState('overview');

<Tabs value={active} onValueChange={setActive}>
  <TabList aria-label="Section tabs">
    <Tab value="overview">Overview</Tab>
    <Tab value="details">Details</Tab>
  </TabList>
  <TabPanels className="pt-4">
    <TabPanel value="overview">Overview</TabPanel>
    <TabPanel value="details">Details</TabPanel>
  </TabPanels>
</Tabs>`,

  disabled: `// Disabled tabs are skipped by keyboard navigation and cannot be activated.
<Tabs defaultValue="overview">
  <TabList aria-label="Record navigation">
    <Tab value="overview">Overview</Tab>
    <Tab value="details">Details</Tab>
    <Tab value="history" disabled>History</Tab>
  </TabList>
  <TabPanels className="pt-4">
    <TabPanel value="overview">Overview content.</TabPanel>
    <TabPanel value="details">Details content.</TabPanel>
    <TabPanel value="history">History content.</TabPanel>
  </TabPanels>
</Tabs>`,

  activateOnFocus: `// activateOnFocus — arrow keys both move focus AND activate the tab.
// Prefer this for simple tabs whose panels load instantly.
// Leave it off (default) when panels trigger data fetches or are complex.
<Tabs defaultValue="overview" activateOnFocus>
  <TabList aria-label="Section tabs">
    <Tab value="overview">Overview</Tab>
    <Tab value="details">Details</Tab>
  </TabList>
  <TabPanels className="pt-4">
    <TabPanel value="overview">Overview</TabPanel>
    <TabPanel value="details">Details</TabPanel>
  </TabPanels>
</Tabs>`,
};


// ── Overview examples (no code) ───────────────────────────────────────────────

function BasicExample() {
  return (
    <Tabs defaultValue="overview">
      <TabList aria-label="Example tabs">
        <Tab value="overview">Overview</Tab>
        <Tab value="details">Details</Tab>
        <Tab value="history">History</Tab>
      </TabList>
      <TabPanels className="pt-4">
        <TabPanel value="overview">
          <div className="rounded-xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm text-slate-600">
            Overview panel — employee summary, key stats.
          </div>
        </TabPanel>
        <TabPanel value="details">
          <div className="rounded-xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm text-slate-600">
            Details panel — full record attributes.
          </div>
        </TabPanel>
        <TabPanel value="history">
          <div className="rounded-xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm text-slate-600">
            History panel — change log and audit trail.
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

function DisabledExample() {
  return (
    <Tabs defaultValue="active">
      <TabList aria-label="Status tabs">
        <Tab value="active">Active</Tab>
        <Tab value="pending">Pending</Tab>
        <Tab value="archived" disabled>Archived</Tab>
      </TabList>
      <TabPanels className="pt-4">
        <TabPanel value="active">
          <div className="rounded-xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm text-slate-600">
            Active records. Use Tab and Arrow keys to navigate.
          </div>
        </TabPanel>
        <TabPanel value="pending">
          <div className="rounded-xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm text-slate-600">
            Pending records awaiting review.
          </div>
        </TabPanel>
        <TabPanel value="archived">
          <div className="rounded-xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm text-slate-600">
            Archived records (not reachable — tab is disabled).
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

function ControlledExample() {
  const [active, setActive] = useState('pay');
  return (
    <div className="space-y-3 w-full max-w-lg">
      <Tabs value={active} onValueChange={setActive}>
        <TabList aria-label="Employee profile tabs">
          <Tab value="pay">Pay</Tab>
          <Tab value="org">Org</Tab>
          <Tab value="gov">Gov IDs</Tab>
        </TabList>
        <TabPanels className="pt-4">
          <TabPanel value="pay">
            <div className="rounded-xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm text-slate-600">
              Pay template and salary grade information.
            </div>
          </TabPanel>
          <TabPanel value="org">
            <div className="rounded-xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm text-slate-600">
              Department, position, and reporting line.
            </div>
          </TabPanel>
          <TabPanel value="gov">
            <div className="rounded-xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm text-slate-600">
              SSS, TIN, PhilHealth, Pag-IBIG numbers.
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <p className="text-xs text-slate-400 font-mono">
        Controlled: active = <strong className="text-slate-600">"{active}"</strong>
      </p>
    </div>
  );
}


// ── Page ──────────────────────────────────────────────────────────────────────

export default function TabsPage() {
  return (
    <GalleryLayout activeId="tabs">
      <title>Tabs — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Navigation"
          name="Tabs"
          description="Switchable panels for organizing content in the same space. Full WAI-ARIA Tabs pattern with arrow-key navigation. Works controlled or uncontrolled, and supports disabled tabs."
          status="complete"
          importName="Tabs, TabList, Tab, TabPanels, TabPanel"
        />

        {/* ── Overview ── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Common tab configurations. Click tabs or use Arrow keys to navigate — no code shown here. Use the Playground to experiment."
        >
          <ShowcasePreview standalone center={false}>
            <div className="w-full space-y-8">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Basic — 3 tabs</p>
                <BasicExample />
              </div>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Disabled tab</p>
                <DisabledExample />
              </div>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Controlled — with external state display</p>
                <ControlledExample />
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── Playground ── */}
        <GallerySection
          id="playground"
          title="Playground"
          description="Adjust tab count and options. Use Tab to enter the tablist, then Arrow keys to navigate."
        >
          <TabsPlayground />
        </GallerySection>

        {/* ── Implementation ── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="Import the composable pieces and wire them together. The value string is the only link between Tab and TabPanel."
        >
          <ShowcaseGrid columns={1}>
            <Showcase
              code={CODE.basic}
              language="tsx"
              title="Basic (uncontrolled)"
              description="defaultValue sets the initial active tab. The Tabs component owns the state internally."
              center={false}
              minHeight="min-h-[160px]"
            >
              <div className="w-full max-w-lg">
                <BasicExample />
              </div>
            </Showcase>
          </ShowcaseGrid>

          <Showcase
              code={CODE.controlled}
              language="tsx"
              title="Controlled"
              description="value and onValueChange mirror active tab externally."
              center={false}
              minHeight="min-h-[160px]"
            >
              <div className="w-full max-w-lg">
                <ControlledExample />
              </div>
            </Showcase>
            <Showcase
              code={CODE.disabled}
              language="tsx"
              title="Disabled tab"
              center={false}
              minHeight="min-h-[160px]"
            >
              <div className="w-full max-w-lg">
                <DisabledExample />
              </div>
            </Showcase>
            <Showcase
              code={CODE.activateOnFocus}
              language="tsx"
              title="Activate on focus"
              center={false}
              minHeight="min-h-[160px]"
            >
              <div className="w-full max-w-lg">
                <Tabs defaultValue="overview" activateOnFocus>
                  <TabList aria-label="Section tabs">
                    <Tab value="overview">Overview</Tab>
                    <Tab value="details">Details</Tab>
                  </TabList>
                  <TabPanels className="pt-4">
                    <TabPanel value="overview">
                      <div className="rounded-xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm text-slate-600">
                        Arrow keys activate immediately with activateOnFocus.
                      </div>
                    </TabPanel>
                    <TabPanel value="details">
                      <div className="rounded-xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm text-slate-600">
                        Details panel.
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
            </Showcase>
        </GallerySection>


        {/* ── Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">

            {/* ARIA structure */}
            <div>
              <h3 className="mb-2 text-sm font-bold text-slate-700">ARIA roles and attributes</h3>
              <ul className="space-y-1.5">
                {[
                  '<TabList> renders role="tablist". Supply aria-label to name the landmark.',
                  '<Tab> renders role="tab", aria-selected, aria-controls (→ panel id), aria-disabled.',
                  '<TabPanel> renders role="tabpanel", aria-labelledby (→ tab id), tabIndex={0}.',
                  'IDs are generated via React.useId() — stable, unique, and collision-free.',
                  'Only the active tab has tabIndex={0}; inactive tabs have tabIndex={-1}. This means Tab key enters the tablist at the active tab.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-sky/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Keyboard */}
            <div>
              <h3 className="mb-2 text-sm font-bold text-slate-700">Keyboard interaction</h3>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Key</th>
                      <th className="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Behavior</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['Tab', 'Moves focus into the tablist (at the active tab). Tab again moves to the active panel.'],
                      ['ArrowRight', 'Moves focus to the next enabled tab (wraps to first).'],
                      ['ArrowLeft', 'Moves focus to the previous enabled tab (wraps to last).'],
                      ['Home', 'Moves focus to the first enabled tab.'],
                      ['End', 'Moves focus to the last enabled tab.'],
                      ['Space / Enter', 'Activates the focused tab and shows its panel.'],
                    ].map(([key, desc]) => (
                      <tr key={String(key)} className="hover:bg-slate-50/60">
                        <td className="px-4 py-2.5">
                          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-800">
                            {String(key)}
                          </code>
                        </td>
                        <td className="px-4 py-2.5 text-xs font-medium text-slate-600">{String(desc)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activation model */}
            <div>
              <h3 className="mb-2 text-sm font-bold text-slate-700">Activation model</h3>
              <ul className="space-y-1.5">
                {[
                  'Default: manual activation — ArrowKey moves focus without changing the active panel. Press Space/Enter to activate.',
                  'activateOnFocus={true}: automatic activation — ArrowKey both moves focus and activates immediately. Best for simple tabs with instant content.',
                  'Manual activation is recommended when tab panels trigger API calls or render expensive content.',
                  'Disabled tabs are skipped entirely during keyboard navigation and cannot be activated by any means.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </GallerySection>


        {/* ── API ── */}
        <GallerySection id="api" title="API Reference">

          <p className="text-sm font-bold text-slate-700 mb-2">Tabs (root)</p>
          <ApiTable props={[
            { name: 'defaultValue', type: 'string',                        description: 'Initial active tab value (uncontrolled). Defaults to empty string — set this to the first tab value.' },
            { name: 'value',        type: 'string',                        description: 'Controlled active tab value.' },
            { name: 'onValueChange',type: '(value: string) => void',       description: 'Called when the active tab changes (controlled mode).' },
            { name: 'activateOnFocus', type: 'boolean', default: 'false',  description: 'When true, ArrowKey navigation also activates the tab immediately.' },
            { name: 'children',     type: 'ReactNode', required: true,     description: 'TabList and TabPanels.' },
            { name: 'className',    type: 'string',                        description: 'Additional class on the root wrapper div.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">TabList</p>
          <ApiTable props={[
            { name: 'aria-label',   type: 'string',                        description: 'Accessible label for the tablist. Required for screen reader context — e.g. "Employee record navigation".' },
            { name: 'children',     type: 'ReactNode', required: true,     description: 'Tab elements.' },
            { name: 'className',    type: 'string',                        description: 'Additional class on the tablist div.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">Tab</p>
          <ApiTable props={[
            { name: 'value',        type: 'string',    required: true,     description: 'Unique string identifier matching the corresponding TabPanel value.' },
            { name: 'disabled',     type: 'boolean',   default: 'false',   description: 'Prevents activation and removes the tab from keyboard navigation.' },
            { name: 'children',     type: 'ReactNode', required: true,     description: 'Tab label content.' },
            { name: 'className',    type: 'string',                        description: 'Additional class on the tab button.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">TabPanels</p>
          <ApiTable props={[
            { name: 'children',     type: 'ReactNode', required: true,     description: 'TabPanel elements.' },
            { name: 'className',    type: 'string',                        description: 'Additional class on the panels wrapper div.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">TabPanel</p>
          <ApiTable props={[
            { name: 'value',        type: 'string',    required: true,     description: 'Must match the corresponding Tab value. The panel is only rendered when its value matches the active tab.' },
            { name: 'children',     type: 'ReactNode', required: true,     description: 'Panel content.' },
            { name: 'className',    type: 'string',                        description: 'Additional class on the panel div.' },
          ]} />

        </GallerySection>

        {/* ── Related ── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
