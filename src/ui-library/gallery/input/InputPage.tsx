/**
 * InputPage — Gallery infrastructure
 * Phase 3: Showcase pattern — live preview + exact code inline per example.
 */

import { Eye, EyeOff, Lock, Mail, Search } from 'lucide-react';
import { useState } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { InputPlayground } from './InputPlayground';
import { Input } from './Input';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['textarea', 'select', 'checkbox', 'button']);

const CODE = {
  default: `import { Input } from '@diwauhris/ui';

<Input placeholder="Enter value…" />`,

  withLabel: `import { Input } from '@diwauhris/ui';

<div>
  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">
    Full Name
  </label>
  <Input id="name" placeholder="Juan dela Cruz" />
</div>`,

  error: `<Input
  status="error"
  defaultValue="invalid@"
  helper="Enter a valid email address."
  aria-invalid="true"
/>`,

  success: `<Input
  status="success"
  defaultValue="juan@example.com"
  helper="Email is available."
/>`,

  disabled: `<Input disabled placeholder="Not editable" />`,

  readOnly: `<Input readOnly defaultValue="Read-only value" />`,

  prefixSearch: `import { Search } from '@diwauhris/ui';

<Input
  placeholder="Search employees…"
  prefix={<Search size={14} aria-hidden="true" />}
/>`,

  prefixEmail: `import { Mail } from '@diwauhris/ui';

<Input
  type="email"
  placeholder="you@example.com"
  prefix={<Mail size={14} aria-hidden="true" />}
/>`,

  suffixUnit: `<Input
  placeholder="0.00"
  suffix={<span className="text-xs font-bold text-slate-400">PHP</span>}
/>`,

  suffixToggle: `import { Eye, EyeOff } from '@diwauhris/ui';
import { useState } from 'react';

const [show, setShow] = useState(false);

<Input
  type={show ? 'text' : 'password'}
  placeholder="Password"
  suffix={
    <button
      type="button"
      onClick={() => setShow(v => !v)}
      className="text-slate-400 hover:text-slate-600"
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      {show
        ? <EyeOff size={14} aria-hidden="true" />
        : <Eye size={14} aria-hidden="true" />}
    </button>
  }
/>`,

  patternSearch: `import { Search } from '@diwauhris/ui';

<Input
  placeholder="Search by name or ID…"
  prefix={<Search size={14} aria-hidden="true" />}
  aria-label="Search employees"
/>`,
};

function PasswordToggle() {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full max-w-xs">
      <Input
        type={show ? 'text' : 'password'}
        placeholder="Password"
        prefix={<Lock size={14} aria-hidden="true" />}
        suffix={
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="flex items-center text-slate-400 transition hover:text-slate-600 focus-visible:outline-none"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show
              ? <EyeOff size={14} aria-hidden="true" />
              : <Eye size={14} aria-hidden="true" />}
          </button>
        }
      />
    </div>
  );
}

export default function InputPage() {
  return (
    <GalleryLayout activeId="input">
      <title>Input — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Inputs"
          name="Input"
          description="A single-line text input with prefix and suffix slots, two validation states, and helper text. The label lives outside — wrap it with Field for automatic ARIA wiring."
          status="complete"
        />

        <GallerySection id="overview" title="Overview" description="Key states at a glance. No code — use the playground to experiment.">
          <ShowcasePreview standalone>
            <div className="w-full max-w-xs space-y-3">
              <Input placeholder="Default" />
              <Input status="error" defaultValue="invalid@" helper="Enter a valid email." />
              <Input status="success" defaultValue="juan@example.com" helper="Looks good!" />
              <Input placeholder="Search…" prefix={<Search size={14} aria-hidden="true" />} />
              <Input disabled placeholder="Disabled" />
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Playground */}
        <GallerySection id="playground" title="Playground" description="Toggle status, prefix/suffix, disabled, and required.">
          <InputPlayground />
        </GallerySection>

        <GallerySection id="states" title="States">
          <ShowcaseGrid columns={2}>
            <Showcase title="Default" code={CODE.default}>
              <div className="w-full max-w-xs"><Input placeholder="Enter value…" /></div>
            </Showcase>

            <Showcase title="With Label" description="Label is provided by the consuming feature." code={CODE.withLabel}>
              <div className="w-full max-w-xs">
                <label htmlFor="sc-name" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
                  Full Name
                </label>
                <Input id="sc-name" placeholder="Juan dela Cruz" />
              </div>
            </Showcase>

            <Showcase title="Error" description="Pair with aria-invalid for screen readers." code={CODE.error}>
              <div className="w-full max-w-xs">
                <Input status="error" defaultValue="invalid@" helper="Enter a valid email address." />
              </div>
            </Showcase>

            <Showcase title="Success" code={CODE.success}>
              <div className="w-full max-w-xs">
                <Input status="success" defaultValue="juan@example.com" helper="Email is available." />
              </div>
            </Showcase>

            <Showcase title="Disabled" code={CODE.disabled}>
              <div className="w-full max-w-xs"><Input disabled placeholder="Not editable" /></div>
            </Showcase>

            <Showcase title="Read Only" code={CODE.readOnly}>
              <div className="w-full max-w-xs"><Input readOnly defaultValue="Read-only value" /></div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* Prefix & Suffix */}
        <GallerySection id="slots" title="Prefix & Suffix Slots" description="Compose icons, units, and interactive controls inside the input boundary.">
          <ShowcaseGrid columns={2}>
            <Showcase title="Search prefix" code={CODE.prefixSearch}>
              <div className="w-full max-w-xs">
                <Input placeholder="Search employees…" prefix={<Search size={14} aria-hidden="true" />} />
              </div>
            </Showcase>

            <Showcase title="Email prefix" code={CODE.prefixEmail}>
              <div className="w-full max-w-xs">
                <Input type="email" placeholder="you@example.com" prefix={<Mail size={14} aria-hidden="true" />} />
              </div>
            </Showcase>

            <Showcase title="Currency suffix" code={CODE.suffixUnit}>
              <div className="w-full max-w-xs">
                <Input placeholder="0.00" suffix={<span className="text-xs font-bold text-slate-400">PHP</span>} />
              </div>
            </Showcase>

            <Showcase title="Password toggle suffix" description="Suffix can contain interactive controls." code={CODE.suffixToggle}>
              <PasswordToggle />
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* Patterns */}
        <GallerySection id="patterns" title="Patterns">
          <Showcase title="Employee search bar" description="Search pattern used in data table toolbars." code={CODE.patternSearch}>
            <div className="w-full max-w-xs">
              <Input
                placeholder="Search by name or ID…"
                prefix={<Search size={14} aria-hidden="true" />}
                aria-label="Search employees"
              />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Keyboard', [
                'Tab moves focus into the input.',
                'The full input boundary (prefix + field + suffix) shows the focus ring as one unit.',
                'Interactive suffix elements (e.g. show/hide password) are separately focusable and must have aria-label.',
              ]],
              ['Labels', [
                'Input does not render a <label>. The consuming feature provides <label htmlFor="id">.',
                'Use aria-label or aria-labelledby when a visible label is not appropriate.',
                'Wire helper text to the input via aria-describedby in the consuming feature.',
              ]],
              ['Validation', [
                'Error state changes border color — always pair with the helper prop for visible text.',
                'Set aria-invalid="true" on the input for error states.',
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
            { name: 'status',   type: "'default' | 'error' | 'success'", default: "'default'", description: 'Visual validation state.' },
            { name: 'helper',   type: 'string',   description: 'Helper or error text below the input.' },
            { name: 'prefix',   type: 'ReactNode', description: 'Content rendered inside the left of the input.' },
            { name: 'suffix',   type: 'ReactNode', description: 'Content rendered inside the right of the input.' },
            { name: 'disabled', type: 'boolean',   default: 'false', description: 'Disables interaction and dims the field.' },
            { name: 'readOnly', type: 'boolean',   default: 'false', description: 'Allows reading but not editing.' },
            { name: '...rest',  type: 'React.ComponentProps<"input">', description: 'All native input attributes are forwarded.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
