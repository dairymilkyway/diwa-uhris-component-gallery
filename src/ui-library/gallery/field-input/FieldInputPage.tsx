/**
 * FieldInputPage — Gallery infrastructure
 *
 * Showcases the FieldInput context-aware <input> wrapper
 * (shared/components/FieldInput.tsx).
 *
 * FieldInput is always used inside <Field>. This page demonstrates
 * both the standalone behavior and the Field-pairing pattern.
 */

import { useState } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { Field } from '../field/Field';
import { FieldInput } from './FieldInput';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['field', 'input', 'select']);

// ── Live examples ──────────────────────────────────────────────────────────

function TextExample() {
  const [v, setV] = useState('');
  return (
    <Field label="First Name" required>
      <FieldInput
        type="text"
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="e.g. Juan"
        className="field-input"
      />
    </Field>
  );
}

function EmailExample() {
  const [v, setV] = useState('');
  return (
    <Field label="Work Email">
      <FieldInput
        type="email"
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="you@company.com"
        className="field-input"
      />
    </Field>
  );
}

function ErrorExample() {
  const [v, setV] = useState('bad');
  const error = v && v.length < 5 ? 'Must be at least 5 characters.' : undefined;
  return (
    <Field label="Username" required error={error}>
      <FieldInput
        type="text"
        value={v}
        onChange={(e) => setV(e.target.value)}
        className={`field-input${error ? ' field-input-error' : ''}`}
      />
    </Field>
  );
}

function DisabledExample() {
  return (
    <Field label="Employee ID">
      <FieldInput
        type="text"
        value="EMP-0042"
        disabled
        readOnly
        className="field-input"
      />
    </Field>
  );
}

// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  basic: `import { Field } from '@diwauhris/ui';
import { FieldInput } from '@diwauhris/ui';

const [value, setValue] = useState('');

// FieldInput inside Field: id, aria-required, aria-invalid, and
// aria-describedby are all wired automatically via FieldContext.
<Field label="First Name" required>
  <FieldInput
    type="text"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="e.g. Juan"
    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
  />
</Field>`,

  error: `const [value, setValue] = useState('');
const error = !value.trim() ? 'First name is required.' : undefined;

<Field label="First Name" required error={error}>
  <FieldInput
    type="text"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
  />
</Field>

// When error is set, Field renders a <p role="alert"> and FieldInput
// automatically receives aria-invalid="true" and aria-describedby.`,

  outsideField: `// FieldInput outside Field — behaves exactly like a plain <input>.
// No id, no ARIA attributes are auto-wired.
// Provide them manually if needed.
<FieldInput
  type="text"
  id="search-input"
  aria-label="Search employees"
  placeholder="Search..."
  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function FieldInputPage() {
  return (
    <GalleryLayout activeId="field-input">
      <title>FieldInput — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Inputs"
          name="FieldInput"
          description="A context-aware input that reads from the nearest Field. Drop it inside Field and all the ARIA wiring — id, aria-required, aria-invalid, aria-describedby — happens automatically. Outside Field it's just a plain input."
          status="complete"
        />

        {/* Overview ── */}
        <GallerySection id="overview" title="Overview" description="FieldInput is always used inside Field. Common states shown below.">
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={2}>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Text</p>
                <TextExample />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</p>
                <EmailExample />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Error state</p>
                <ErrorExample />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Disabled</p>
                <DisabledExample />
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation ── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="Always import both Field and FieldInput together. FieldInput does nothing useful without Field."
        >
          <Showcase code={CODE.basic} language="tsx" title="Basic usage inside Field">
            <div className="w-64">
              <TextExample />
            </div>
          </Showcase>
          <Showcase code={CODE.error} language="tsx" title="With validation error">
            <div className="w-64">
              <ErrorExample />
            </div>
          </Showcase>
          <Showcase code={CODE.outsideField} language="tsx" title="Outside Field (manual ARIA)">
            <div className="w-64">
              <FieldInput
                type="text"
                id="search-standalone"
                aria-label="Search employees"
                placeholder="Search..."
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
              />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Automatic ARIA wiring inside Field', [
                'id is set to the value generated by Field (or inputId prop) — matches the label\'s htmlFor.',
                'aria-required="true" when Field has required={true}.',
                'aria-invalid="true" when Field has an error prop.',
                'aria-describedby points at Field\'s error <p id> when error is set.',
              ]],
              ['Manual override', [
                'Passing id, aria-required, aria-invalid, or aria-describedby directly to FieldInput overrides the context value.',
                'This allows callers to opt out of context wiring when needed.',
              ]],
              ['Outside Field', [
                'FieldInput without a Field parent behaves as a plain <input>.',
                'All native input attributes (type, disabled, readOnly, etc.) are forwarded unchanged.',
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
          <div className="rounded-xl border border-slate-200 bg-amber-50 px-5 py-4 mb-4">
            <p className="text-sm font-semibold text-amber-800">
              FieldInput accepts all native{' '}
              <code
                className="font-mono text-xs"
                style={{ background: 'transparent', padding: 0 }}
              >
                {'<input>'}
              </code>{' '}
              props. The four props below are intercepted and resolved against FieldContext before being forwarded.
            </p>
          </div>
          <ApiTable props={[
            { name: 'id',               type: 'string',  description: 'Overrides the FieldContext-provided input id.' },
            { name: 'aria-required',    type: 'string',  description: 'Overrides the context-derived aria-required value.' },
            { name: 'aria-invalid',     type: 'string',  description: 'Overrides the context-derived aria-invalid value.' },
            { name: 'aria-describedby', type: 'string',  description: 'Overrides the context-derived aria-describedby value.' },
            { name: '...rest',          type: 'React.ComponentProps<"input">', description: 'All other native input props forwarded unchanged.' },
          ]} />
        </GallerySection>

        {/* Related ── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
