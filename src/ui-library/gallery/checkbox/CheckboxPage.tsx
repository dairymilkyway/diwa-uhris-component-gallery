/**
 * CheckboxPage — Gallery infrastructure
 * Phase 3: Showcase pattern.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { CheckboxPlayground } from './CheckboxPlayground';
import { Checkbox } from './Checkbox';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['switch', 'input', 'select']);

const CODE = {
  unchecked: `import { Checkbox } from '@diwauhris/ui';

<Checkbox label="Accept terms and conditions" />`,

  checked: `<Checkbox label="Send notifications" defaultChecked />`,

  indeterminate: `import { useState } from 'react';

const [checked, setChecked] = useState(false);
const [indeterminate, setIndeterminate] = useState(true);

<Checkbox
  label="Select all"
  checked={checked}
  indeterminate={indeterminate}
  onChange={(e) => {
    setChecked(e.target.checked);
    setIndeterminate(false);
  }}
/>`,

  disabledOff: `<Checkbox label="Disabled option" disabled />`,
  disabledOn:  `<Checkbox label="Disabled and checked" disabled defaultChecked />`,

  error: `<Checkbox
  label="Accept terms and conditions"
  error
  helper="You must accept to continue."
  aria-invalid="true"
/>`,

  withDescription: `<Checkbox
  label="Send approval notifications"
  description="Receive an email when a request is approved or rejected."
  defaultChecked
/>`,

  controlled: `import { useState } from 'react';

const [checked, setChecked] = useState(false);

<Checkbox
  label="Enable email alerts"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`,

  selectAll: `import { useState } from 'react';

const items = ['Report A', 'Report B', 'Report C'];
const [selected, setSelected] = useState<string[]>([]);

const allChecked   = selected.length === items.length;
const someChecked  = selected.length > 0 && !allChecked;

const toggleAll = () =>
  setSelected(allChecked ? [] : items);

<Checkbox
  label="Select all reports"
  checked={allChecked}
  indeterminate={someChecked}
  onChange={toggleAll}
/>`,
};

export default function CheckboxPage() {
  return (
    <GalleryLayout activeId="checkbox">
      <title>Checkbox — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Inputs"
          name="Checkbox"
          description="A checkbox with support for the indeterminate state, a helper message, and an optional description line. Use it for form submissions; use Switch for settings that toggle immediately."
          status="complete"
        />

        <GallerySection id="overview" title="Overview" description="Key states at a glance. No code — use the playground to experiment.">
          <ShowcasePreview standalone>
            <div className="flex flex-col gap-3">
              <Checkbox label="Unchecked" />
              <Checkbox label="Checked" defaultChecked />
              <Checkbox label="Indeterminate" indeterminate />
              <Checkbox label="Error state" error />
              <Checkbox label="Disabled" disabled />
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="playground" title="Playground">
          <CheckboxPlayground />
        </GallerySection>

        <GallerySection id="states" title="States">
          <ShowcaseGrid columns={2}>
            <Showcase title="Unchecked" code={CODE.unchecked}>
              <Checkbox label="Accept terms and conditions" />
            </Showcase>

            <Showcase title="Checked" code={CODE.checked}>
              <Checkbox label="Send notifications" defaultChecked />
            </Showcase>

            <Showcase title="Indeterminate" description="Partial selection state — typically used for 'select all'." code={CODE.indeterminate}>
              <Checkbox label="Select all" indeterminate />
            </Showcase>

            <Showcase title="Error" description="Pair with aria-invalid for screen readers." code={CODE.error}>
              <Checkbox label="Accept terms" error helper="You must accept to continue." />
            </Showcase>

            <Showcase title="Disabled (off)" code={CODE.disabledOff}>
              <Checkbox label="Disabled option" disabled />
            </Showcase>

            <Showcase title="Disabled (on)" code={CODE.disabledOn}>
              <Checkbox label="Disabled and checked" disabled defaultChecked />
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        <GallerySection id="with-description" title="With Description">
          <Showcase
            title="Label + description"
            description="The description prop adds a secondary line below the label."
            code={CODE.withDescription}
          >
            <Checkbox
              label="Send approval notifications"
              description="Receive an email when a request is approved or rejected."
              defaultChecked
            />
          </Showcase>
        </GallerySection>

        <GallerySection id="patterns" title="Patterns">
          <ShowcaseGrid columns={2}>
            <Showcase
              title="Controlled checkbox"
              description="Manage checked state in the consuming feature."
              code={CODE.controlled}
            >
              <Checkbox label="Enable email alerts" defaultChecked />
            </Showcase>

            <Showcase
              title="Select all"
              description="Indeterminate state when some items are selected."
              code={CODE.selectAll}
            >
              <Checkbox label="Select all reports" indeterminate />
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Keyboard', ['Space — toggles checked/unchecked.', 'Tab / Shift+Tab — moves focus.', 'The real <input type="checkbox"> receives focus; a styled div mirrors it visually.']],
              ['Screen Readers', ['The native checkbox announces its state automatically.', 'Indeterminate is set via the DOM property and announced by screen readers.', 'Label is always associated via htmlFor/id.', 'Set aria-invalid="true" on the input for error states.']],
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

        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'label',         type: 'ReactNode', description: 'Visible label text.' },
            { name: 'description',   type: 'string',    description: 'Secondary line below the label.' },
            { name: 'indeterminate', type: 'boolean',   default: 'false', description: 'Partial selection state.' },
            { name: 'error',         type: 'boolean',   default: 'false', description: 'Error visual state.' },
            { name: 'helper',        type: 'string',    description: 'Helper or error message below.' },
            { name: 'disabled',      type: 'boolean',   default: 'false', description: 'Disables interaction.' },
            { name: '...rest',       type: 'React.ComponentProps<"input">', description: 'All native checkbox attributes are forwarded.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
