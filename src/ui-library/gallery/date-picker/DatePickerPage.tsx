/**
 * DatePickerPage — Gallery infrastructure
 *
 * Showcases the PisDatePicker calendar popup component
 * (shared/components/PisDatePicker.tsx).
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
import { DatePicker } from './DatePicker';
import { Field } from '../field/Field';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['field', 'field-input', 'input']);

// ── Live examples ──────────────────────────────────────────────────────────

function BasicExample() {
  const [date, setDate] = useState('');
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="Select a date…"
    />
  );
}

function WithFieldExample() {
  const [date, setDate] = useState('');
  const error = !date ? 'Date of hire is required.' : undefined;
  return (
    <Field label="Date Hired" required error={error}>
      <DatePicker value={date} onChange={setDate} placeholder="Select date hired…" />
    </Field>
  );
}

function DisabledExample() {
  return (
    <DatePicker
      value="2025-01-15"
      onChange={() => {}}
      disabled
    />
  );
}

function MinDateExample() {
  const [date, setDate] = useState('');
  const today = new Date();
  return (
    <div className="space-y-1">
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Select end date (today or later)…"
        minDate={today}
      />
      {date && (
        <p className="text-xs font-medium text-slate-400">Selected: {date}</p>
      )}
    </div>
  );
}

function MaxDateExample() {
  const [date, setDate] = useState('');
  const today = new Date();
  return (
    <div className="space-y-1">
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Select a past date or today…"
        maxDate={today}
      />
      {date && (
        <p className="text-xs font-medium text-slate-400">Selected: {date}</p>
      )}
    </div>
  );
}

// ── Code strings — centralized per canonical architecture ─────────────────

const CODE = {
  basic: `import { DatePicker } from '@diwauhris/ui';
import { useState } from 'react';

const [date, setDate] = useState(''); // ISO format: 'yyyy-MM-dd'

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select a date…"
/>`,

  withField: `import { Field } from '@diwauhris/ui';
import { DatePicker } from '@diwauhris/ui';

const [date, setDate] = useState('');
const error = !date ? 'Date of hire is required.' : undefined;

// DatePicker consumes FieldContext automatically when inside Field.
// id, aria-required, aria-invalid, and aria-describedby are wired with no props.
<Field label="Date Hired" required error={error}>
  <DatePicker
    value={date}
    onChange={setDate}
    placeholder="Select date hired…"
  />
</Field>`,

  minDate: `// minDate prevents selection of past dates
const today = new Date();

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select end date…"
  minDate={today}
/>`,

  maxDate: `// maxDate restricts selection to dates on or before the upper bound
const today = new Date();

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select a past date or today…"
  maxDate={today}
/>`,

  disabled: `// Disabled — no calendar interaction, grayed out
<DatePicker
  value="2025-01-15"
  onChange={() => {}}
  disabled
/>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function DatePickerPage() {
  return (
    <GalleryLayout activeId="date-picker">
      <title>Date Picker — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Inputs"
          name="Date Picker"
          description="A calendar popup that gives you dates as yyyy-MM-dd strings. Works inside Field for automatic ARIA wiring. Smart positioning — flips above or below the trigger based on viewport space."
          status="complete"
        />

        {/* Overview ── */}
        <GallerySection id="overview" title="Overview" description="Click any trigger to open the calendar.">
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={2}>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Basic</p>
                <BasicExample />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">With Field (required + error)</p>
                <WithFieldExample />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Disabled</p>
                <DisabledExample />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Min date (today or later)</p>
                <MinDateExample />
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation ── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="Import DatePicker from the gallery. Value is always a yyyy-MM-dd string or empty string."
        >
          <Showcase code={CODE.basic} language="tsx" title="Basic usage">
            <div className="w-64">
              <BasicExample />
            </div>
          </Showcase>
          <Showcase code={CODE.withField} language="tsx" title="Inside Field (recommended for forms)">
            <div className="w-64">
              <WithFieldExample />
            </div>
          </Showcase>
          <Showcase code={CODE.minDate} language="tsx" title="Min date constraint">
            <div className="w-64">
              <MinDateExample />
            </div>
          </Showcase>
          <Showcase code={CODE.maxDate} language="tsx" title="Maximum date">
            <p className="mb-3 text-sm text-slate-600">Restrict selectable dates to a specific upper bound.</p>
            <div className="w-64">
              <MaxDateExample />
            </div>
          </Showcase>
          <Showcase code={CODE.disabled} language="tsx" title="Disabled">
            <div className="w-64">
              <DisabledExample />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Trigger Input', [
                'role="combobox" and aria-haspopup="dialog" on the read-only input.',
                'aria-expanded reflects calendar open state.',
                'aria-required, aria-invalid, and aria-describedby are automatic when inside Field.',
              ]],
              ['Calendar Dialog', [
                'role="dialog" on the calendar popover panel.',
                'aria-label="Date picker" (or "<label> calendar" when aria-label is provided).',
                'Calendar navigation buttons are keyboard-accessible (Tab, Arrow keys on tiles).',
              ]],
              ['Keyboard', [
                'Space or Enter on the trigger opens the calendar.',
                'Escape closes the calendar and restores focus to the trigger.',
                'Tab moves focus away from the open calendar and closes it.',
                'Inside the calendar: Arrow keys navigate days; Enter selects.',
              ]],
              ['Positioning', [
                'Calendar opens below by default. If space below is insufficient, it opens above.',
                'On narrow viewports (< 336px), the calendar spans full width with 8px margins.',
                'Scroll or resize events close the open calendar.',
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
            { name: 'value',           type: 'string',                 required: true,  description: 'Controlled date value in yyyy-MM-dd format. Empty string means no date selected.' },
            { name: 'onChange',        type: '(value: string) => void', required: true,  description: 'Called with a yyyy-MM-dd string when the user selects a date.' },
            { name: 'placeholder',     type: 'string',                 description: 'Trigger input placeholder text.' },
            { name: 'disabled',        type: 'boolean',    default: 'false', description: 'Disables the trigger — no calendar interaction.' },
            { name: 'error',           type: 'string',                 description: 'Inline error message. Also sets aria-invalid on the trigger.' },
            { name: 'minDate',         type: 'Date',                   description: 'Minimum selectable date. Earlier dates are disabled in the calendar.' },
            { name: 'maxDate',         type: 'Date',                   description: 'Maximum selectable date. Later dates are disabled in the calendar. Omit for no upper bound.' },
            { name: 'id',              type: 'string',                 description: 'Override the auto-generated input id (also consumed from FieldContext).' },
            { name: 'aria-label',      type: 'string',                 description: 'Accessible label when no visible label is present.' },
            { name: 'aria-labelledby', type: 'string',                 description: 'ID of an external label element.' },
            { name: 'required',        type: 'boolean',    default: 'false', description: 'Sets aria-required on the trigger (also consumed from FieldContext).' },
            { name: 'className',       type: 'string',                 description: 'Additional CSS classes on the trigger input.' },
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
