/**
 * FieldPage — Gallery infrastructure
 *
 * Showcases the Field form-field wrapper (shared/components/Field.tsx).
 * Field wraps a label, child control, and optional inline error.
 * It publishes FieldContext so that FieldInput, PisSelect, and
 * PisDatePicker receive id / aria-required / aria-invalid automatically.
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
import { Field } from './Field';
import { FieldInput } from '../field-input/FieldInput';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['input', 'combobox', 'select']);

// ── Live examples ──────────────────────────────────────────────────────────

function BasicExample() {
  const [v, setV] = useState('');
  return (
    <Field label="Full Name">
      <FieldInput
        type="text"
        value={v}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setV(e.target.value)}
      />
    </Field>
  );
}

function RequiredExample() {
  const [v, setV] = useState('');
  return (
    <Field label="Email Address" required>
      <FieldInput
        type="email"
        value={v}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setV(e.target.value)}
        placeholder="you@example.com"
        className="field-input"
      />
    </Field>
  );
}

function ErrorExample() {
  const [v, setV] = useState('');
  const error = v.length > 0 && v.length < 3 ? 'Name must be at least 3 characters.' : undefined;
  return (
    <Field label="Department Name" required error={error}>
      <FieldInput
        type="text"
        value={v}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setV(e.target.value)}
        placeholder="e.g. Human Resources"
        className={`field-input${error ? ' field-input-error' : ''}`}
      />
    </Field>
  );
}

function NativeInputExample() {
  const [v, setV] = useState('');
  return (
    <Field label="Employee Notes">
      <textarea
        value={v}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setV(e.target.value)}
        className="field-input resize-none"
      />
    </Field>
  );
}

// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  basic: `import { Field } from '@diwauhris/ui';
import { FieldInput } from '@diwauhris/ui';

const [value, setValue] = useState('');

<Field label="Full Name">
  <FieldInput
    type="text"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="e.g. Juan dela Cruz"
    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
  />
</Field>`,

  requiredError: `// Required field with validation error
const [value, setValue] = useState('');
const error = !value ? 'This field is required.' : undefined;

<Field label="Department" required error={error}>
  <FieldInput
    type="text"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
  />
</Field>

// Field publishes FieldContext so FieldInput automatically receives:
// id (matching the label's htmlFor)
// aria-required="true"
// aria-invalid="true"
// aria-describedby pointing at the error <p>`,

  native: `// Field works with any child control — not only FieldInput.
// The child must be inside Field to receive FieldContext automatically.

<Field label="Notes">
  <textarea
    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm resize-none"
    rows={3}
    placeholder="Optional notes..."
  />
</Field>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function FieldPage() {
  return (
    <GalleryLayout activeId="field">
      <title>Field — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Inputs"
          name="Field"
          importName="Field, FieldInput"
          description="The wrapper that turns any input into a proper form field. Give it a label and an optional error message — Field generates the id, wires the label, and handles aria-required, aria-invalid, and aria-describedby through context."
          status="complete"
        />

        {/* Overview ── */}
        <GallerySection id="overview" title="Overview" description="Common field states at a glance.">
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={2}>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Basic</p>
                <BasicExample />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Required</p>
                <RequiredExample />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Error (type 1–2 chars)</p>
                <ErrorExample />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Textarea child</p>
                <NativeInputExample />
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation ── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="Import Field and FieldInput from the gallery. Pair them for text inputs with automatic ARIA wiring."
        >
          <Showcase code={CODE.basic} language="tsx" title="Basic usage with FieldInput">
            <div className="w-64">
              <BasicExample />
            </div>
          </Showcase>
          <Showcase code={CODE.requiredError} language="tsx" title="Required + validation error">
            <div className="w-64">
              <ErrorExample />
            </div>
          </Showcase>
          <Showcase code={CODE.native} language="tsx" title="With native textarea">
            <div className="w-64">
              <NativeInputExample />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Labels', [
                'Field renders a <label> with htmlFor wired to the child control\'s id.',
                'The id is generated by React useId() and is stable across renders.',
                'An explicit inputId prop can override the generated id when tests or external code depend on a specific value.',
              ]],
              ['Required', [
                'required={true} adds a visible * (aria-hidden) and a screen-reader "(required)" text.',
                'FieldContext publishes required:true — FieldInput receives aria-required="true" automatically.',
              ]],
              ['Errors', [
                'error={message} renders a <p role="alert" aria-live="polite"> below the control.',
                'FieldContext publishes invalid:true and errorId — FieldInput receives aria-invalid="true" and aria-describedby automatically.',
                'A .shake animation is applied to the field wrapper when an error is present.',
              ]],
              ['FieldContext', [
                'Field publishes FieldContext. FieldInput, PisSelect, and PisDatePicker all consume it.',
                'Controls rendered outside Field behave as plain elements — no ARIA attributes are automatically wired.',
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
            { name: 'label',    type: 'string',    required: true,  description: 'Visible field label. Rendered as a <label> element.' },
            { name: 'children', type: 'ReactNode', required: true,  description: 'The form control. Usually FieldInput, PisSelect, PisDatePicker, or a native <textarea>.' },
            { name: 'required', type: 'boolean',   default: 'false', description: 'Marks field required. Shows *, adds sr-only text, wires aria-required via context.' },
            { name: 'error',    type: 'string',    description: 'Validation error message. Renders an alert <p>, wires aria-invalid and aria-describedby via context, applies .shake.' },
            { name: 'inputId',  type: 'string',    description: 'Override the auto-generated input id. Use when tests or external code depend on a fixed id.' },
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
