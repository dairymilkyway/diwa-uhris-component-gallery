/**
 * SwitchPage — Gallery infrastructure
 * Phase 3: Showcase pattern.
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
import { SwitchPlayground } from './SwitchPlayground';
import { Switch } from './Switch';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['checkbox', 'input', 'card']);

const CODE = {
  off: `import { Switch } from '@diwauhris/ui';
import { useState } from 'react';

const [enabled, setEnabled] = useState(false);

<Switch checked={enabled} onChange={setEnabled} label="Enable feature" />`,

  on: `const [enabled, setEnabled] = useState(true);

<Switch checked={enabled} onChange={setEnabled} label="Notifications enabled" />`,

  withDescription: `<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Email notifications"
  description="Receive alerts when approvals require your action."
/>`,

  disabled: `<Switch checked={false} onChange={() => {}} label="Disabled" disabled />`,
  disabledOn: `<Switch checked={true} onChange={() => {}} label="Locked on" disabled />`,

  loading: `// Use loading while awaiting async confirmation
<Switch
  checked={currentValue}
  onChange={handleToggle}
  label="Auto-approve low-value requests"
  loading={saving}
/>`,

  patternSettings: `// Settings panel
const [notifications, setNotifications] = useState(true);
const [autoApprove,   setAutoApprove]   = useState(false);

<div className="space-y-4">
  <Switch
    checked={notifications}
    onChange={setNotifications}
    label="Email notifications"
    description="Alerts for pending approvals."
  />
  <Switch
    checked={autoApprove}
    onChange={setAutoApprove}
    label="Auto-approve delegations"
    description="Automatically approve requests while you are away."
  />
</div>`,

  uncontrolled: `import { Switch } from '@diwauhris/ui';

// No value/onChange needed — Switch manages state internally
<Switch defaultChecked label="Notifications" />`,
};

function LiveSwitch({ label, description, initialChecked = false, disabled = false, loading = false }: {
  label: string; description?: string; initialChecked?: boolean; disabled?: boolean; loading?: boolean;
}) {
  const [checked, setChecked] = useState(initialChecked);
  return <Switch checked={checked} onChange={setChecked} label={label} description={description} disabled={disabled} loading={loading} />;
}

export default function SwitchPage() {
  return (
    <GalleryLayout activeId="switch">
      <title>Switch — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Inputs"
          name="Switch"
          description="An on/off toggle for settings that take effect the moment you flip them — no Save button. If the value goes into a form, use Checkbox instead."
          status="complete"
        />

        <GallerySection id="overview" title="Overview" description="Key states at a glance. No code — use the playground to experiment.">
          <ShowcasePreview standalone>
            <div className="flex flex-col gap-4">
              <LiveSwitch label="Off" />
              <LiveSwitch label="On" initialChecked />
              <LiveSwitch label="With description" description="Receive alerts for pending approvals." initialChecked />
              <Switch checked={false} onChange={() => {}} label="Disabled" disabled />
              <Switch checked={false} onChange={() => {}} label="Loading" loading />
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="playground" title="Playground">
          <SwitchPlayground />
        </GallerySection>

        <GallerySection id="states" title="States">
          <ShowcaseGrid columns={2}>
            <Showcase title="Off" code={CODE.off}>
              <LiveSwitch label="Enable feature" />
            </Showcase>

            <Showcase title="On" code={CODE.on}>
              <LiveSwitch label="Notifications enabled" initialChecked />
            </Showcase>

            <Showcase title="With description" code={CODE.withDescription}>
              <LiveSwitch
                label="Email notifications"
                description="Receive alerts when approvals require your action."
                initialChecked
              />
            </Showcase>

            <Showcase title="Disabled (off)" code={CODE.disabled}>
              <Switch checked={false} onChange={() => {}} label="Disabled" disabled />
            </Showcase>

            <Showcase title="Disabled (on)" code={CODE.disabledOn}>
              <Switch checked={true} onChange={() => {}} label="Locked on" disabled />
            </Showcase>

            <Showcase title="Loading" description="Disables interaction while awaiting async confirmation." code={CODE.loading}>
              <Switch checked={false} onChange={() => {}} label="Auto-approve requests" loading />
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        <GallerySection id="patterns" title="Patterns">
          <Showcase
            title="Settings panel"
            description="Group related switches in a settings section."
            code={CODE.patternSettings}
            tone="white"
          >
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <LiveSwitch
                label="Email notifications"
                description="Alerts for pending approvals."
                initialChecked
              />
              <LiveSwitch
                label="Auto-approve delegations"
                description="Automatically approve requests while you are away."
              />
            </div>
          </Showcase>
          <Showcase
            title="Uncontrolled"
            description="Use defaultChecked when you do not need external state control."
            code={CODE.uncontrolled}
          >
            <Switch defaultChecked label="Notifications" />
          </Showcase>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Role', ['Renders as <button role="switch"> — announces as a switch to screen readers.', 'aria-checked reflects the current on/off state.', 'Prefer Switch over Checkbox when the change takes immediate effect.']],
              ['Keyboard', ['Space or Enter — toggles.', 'Tab / Shift+Tab — moves focus.', '2px indigo ring on focus-visible.']],
              ['Loading', ['While loading, the button is disabled and aria-disabled is set.', 'The spinner is aria-hidden — the disabled state is the accessible signal.']],
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
            { name: 'checked',       type: 'boolean',                   description: 'Controlled on/off state. Omit when using uncontrolled mode with defaultChecked.' },
            { name: 'onChange',      type: '(checked: boolean) => void', description: 'Called when toggled. Omit when using uncontrolled mode.' },
            { name: 'defaultChecked', type: 'boolean',             default: 'false', description: 'Initial checked state for uncontrolled usage. Use when you do not need to control checked externally.' },
            { name: 'label',         type: 'ReactNode', description: 'Visible label.' },
            { name: 'description',   type: 'string',    description: 'Secondary text below the label.' },
            { name: 'disabled',      type: 'boolean',   default: 'false', description: 'Prevents interaction.' },
            { name: 'loading',       type: 'boolean',   default: 'false', description: 'Shows a spinner and disables interaction.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
