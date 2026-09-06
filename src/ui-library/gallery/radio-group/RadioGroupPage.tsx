/**
 * RadioGroupPage — Gallery infrastructure
 *
 * Documents the RadioGroup design-system component.
 * Source: frontend/src/ui-library/gallery/radio-group/RadioGroup.tsx
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
import { RadioGroup, RadioItem } from './RadioGroup';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['checkbox', 'segmented-control', 'select']);

const CODE = {
  basic: `import { RadioGroup, RadioItem } from '@diwauhris/ui';

<RadioGroup defaultValue="monthly" aria-label="Billing period">
  <RadioItem value="monthly" label="Monthly"  description="Billed every month" />
  <RadioItem value="annual"  label="Annual"   description="Billed once a year — save 20%" />
  <RadioItem value="custom"  label="Custom"   description="Contact sales" />
</RadioGroup>`,

  horizontal: `<RadioGroup defaultValue="active" orientation="horizontal" aria-label="Status">
  <RadioItem value="active"   label="Active"   />
  <RadioItem value="inactive" label="Inactive" />
  <RadioItem value="archived" label="Archived" />
</RadioGroup>`,

  controlled: `const [plan, setPlan] = useState('monthly');

<RadioGroup value={plan} onValueChange={setPlan} aria-label="Billing plan">
  <RadioItem value="monthly" label="Monthly" />
  <RadioItem value="annual"  label="Annual"  />
</RadioGroup>`,

  disabled: `// Disable one item
<RadioGroup defaultValue="active" aria-label="Status">
  <RadioItem value="active"   label="Active"   />
  <RadioItem value="inactive" label="Inactive" />
  <RadioItem value="archived" label="Archived" disabled />
</RadioGroup>

// Disable the entire group
<RadioGroup defaultValue="active" disabled aria-label="Status (locked)">
  <RadioItem value="active"   label="Active"   />
  <RadioItem value="inactive" label="Inactive" />
</RadioGroup>`,
};

export default function RadioGroupPage() {
  const [plan, setPlan] = useState('monthly');

  return (
    <GalleryLayout activeId="radio">
      <title>Radio Group — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Inputs"
          name="Radio Group"
          description="Mutually exclusive options built on native radio inputs. Keyboard navigation, form submission, and ARIA semantics are handled by the browser — no custom logic needed."
          status="complete"
          importName="RadioGroup, RadioItem"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="Common configurations.">
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={3}>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Vertical (default)</p>
                <RadioGroup defaultValue="monthly" aria-label="Billing period">
                  <RadioItem value="monthly" label="Monthly"  description="Billed every month" />
                  <RadioItem value="annual"  label="Annual"   description="Save 20% annually" />
                  <RadioItem value="custom"  label="Custom"   description="Contact sales" />
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Horizontal</p>
                <RadioGroup defaultValue="active" orientation="horizontal" aria-label="Status filter">
                  <RadioItem value="active"   label="Active"   />
                  <RadioItem value="inactive" label="Inactive" />
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Disabled option</p>
                <RadioGroup defaultValue="active" aria-label="Status">
                  <RadioItem value="active"   label="Active"   />
                  <RadioItem value="inactive" label="Inactive" />
                  <RadioItem value="archived" label="Archived" disabled />
                </RadioGroup>
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.basic} language="tsx" title="Basic (vertical, uncontrolled)" minHeight="min-h-[120px]">
              <RadioGroup defaultValue="monthly" aria-label="Billing period">
                <RadioItem value="monthly" label="Monthly"  description="Billed every month" />
                <RadioItem value="annual"  label="Annual"   description="Save 20% annually" />
                <RadioItem value="custom"  label="Custom"   description="Contact sales" />
              </RadioGroup>
            </Showcase>
            <Showcase code={CODE.controlled} language="tsx" title="Controlled" minHeight="min-h-[100px]">
              <div className="space-y-3">
                <RadioGroup value={plan} onValueChange={setPlan} aria-label="Billing plan">
                  <RadioItem value="monthly" label="Monthly" />
                  <RadioItem value="annual"  label="Annual"  />
                </RadioGroup>
                <p className="text-xs text-slate-400 font-mono">selected: "{plan}"</p>
              </div>
            </Showcase>
            <Showcase code={CODE.horizontal} language="tsx" title="Horizontal layout" minHeight="min-h-[60px]">
              <RadioGroup defaultValue="active" orientation="horizontal" aria-label="Status">
                <RadioItem value="active"   label="Active"   />
                <RadioItem value="inactive" label="Inactive" />
                <RadioItem value="archived" label="Archived" />
              </RadioGroup>
            </Showcase>
            <Showcase code={CODE.disabled} language="tsx" title="Disabled option / disabled group" minHeight="min-h-[120px]" center={false}>
              <div className="flex flex-col gap-6 w-full max-w-xs">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Disabled option</p>
                  <RadioGroup defaultValue="active" aria-label="Status">
                    <RadioItem value="active"   label="Active"   />
                    <RadioItem value="inactive" label="Inactive" />
                    <RadioItem value="archived" label="Archived" disabled />
                  </RadioGroup>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Disabled group</p>
                  <RadioGroup defaultValue="active" disabled aria-label="Status (locked)">
                    <RadioItem value="active"   label="Active"   />
                    <RadioItem value="inactive" label="Inactive" />
                  </RadioGroup>
                </div>
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Native semantics', [
                'Built on <input type="radio"> — no ARIA role emulation needed. Browsers handle checked/unchecked state, form participation, and keyboard navigation natively.',
                'The group container has role="radiogroup" with aria-label or aria-labelledby.',
                'aria-required and aria-disabled are applied to the group when required/disabled.',
              ]],
              ['Keyboard (native browser behavior)', [
                'Tab enters the group at the checked item (or first if none checked).',
                'ArrowUp / ArrowLeft — move to the previous radio and check it.',
                'ArrowDown / ArrowRight — move to the next radio and check it.',
                'Disabled items are skipped automatically by the browser.',
                'Tab exits the group. No wrapping between last and first.',
              ]],
              ['Focus ring', [
                'The custom visual does not receive keyboard focus directly — the hidden native input does.',
                'focus-visible:ring-2 is applied via the peer selector so the focus ring is visible on the custom indicator.',
              ]],
            ].map(([h, items]) => (
              <div key={String(h)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(h)}</h3>
                <ul className="space-y-1.5">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-sky/60" aria-hidden="true" />
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
          <p className="text-sm font-bold text-slate-700 mb-2">RadioGroup</p>
          <ApiTable props={[
            { name: 'defaultValue',   type: 'string',  description: 'Uncontrolled initial selected value.' },
            { name: 'value',          type: 'string',  description: 'Controlled selected value.' },
            { name: 'onValueChange',  type: '(value: string) => void', description: 'Called on selection change.' },
            { name: 'name',           type: 'string',  description: 'HTML name attribute. Auto-generated if omitted.' },
            { name: 'disabled',       type: 'boolean', default: 'false', description: 'Disables all radio items.' },
            { name: 'required',       type: 'boolean', default: 'false', description: 'Marks the group as required.' },
            { name: 'orientation',    type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction.' },
            { name: 'aria-label',     type: 'string',  description: 'Accessible label for the group.' },
            { name: 'aria-labelledby',type: 'string',  description: 'ID of an external label element.' },
            { name: 'children',       type: 'ReactNode', required: true, description: 'RadioItem elements.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">RadioItem</p>
          <ApiTable props={[
            { name: 'value',       type: 'string',   required: true, description: 'Option value.' },
            { name: 'label',       type: 'ReactNode', required: true, description: 'Visible label.' },
            { name: 'description', type: 'string',   description: 'Optional secondary line below the label.' },
            { name: 'disabled',    type: 'boolean',  default: 'false', description: 'Disables this option.' },
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
