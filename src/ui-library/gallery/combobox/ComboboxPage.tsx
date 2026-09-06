/**
 * ComboboxPage — Gallery infrastructure
 *
 * Showcases the Combobox (PisCombobox) design-system component.
 * The Combobox is a free-text input with suggestion dropdown:
 * the user may type a value not present in the option list.
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
import { ComboboxPlayground } from './ComboboxPlayground';
import { Combobox } from './Combobox';
import { Field } from '../field/Field';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['select', 'input']);

// ── Demo option sets ───────────────────────────────────────────────────────

const JOB_FAMILY_OPTIONS = [
  { value: 'Engineering',      label: 'Engineering'      },
  { value: 'Finance',          label: 'Finance'          },
  { value: 'Human Resources',  label: 'Human Resources'  },
  { value: 'Operations',       label: 'Operations'       },
  { value: 'Sales',            label: 'Sales'            },
  { value: 'Marketing',        label: 'Marketing'        },
  { value: 'Legal',            label: 'Legal'            },
  { value: 'Design',           label: 'Design'           },
];

const CATEGORY_OPTIONS = [
  { value: 'Management',  label: 'Management'  },
  { value: 'Specialist',  label: 'Specialist'  },
  { value: 'Associate',   label: 'Associate'   },
  { value: 'Executive',   label: 'Executive'   },
  { value: 'Supervisor',  label: 'Supervisor'  },
];

// Options with disabled entries — used in the disabled-option showcase
const ROLE_OPTIONS_WITH_DISABLED = [
  { value: 'Admin',        label: 'Admin'                                },
  { value: 'Manager',      label: 'Manager'                              },
  { value: 'Analyst',      label: 'Analyst'                              },
  { value: 'Intern',       label: 'Intern',       disabled: true         },
  { value: 'Contractor',   label: 'Contractor',   disabled: true         },
  { value: 'Supervisor',   label: 'Supervisor'                           },
];

// ── Overview examples (stateful — required to use the real component) ──────

function BasicExample() {
  const [value, setValue] = useState('');
  return (
    <Combobox
      value={value}
      onChange={setValue}
      options={JOB_FAMILY_OPTIONS}
      placeholder="Type a job family…"
    />
  );
}

function DisabledExample() {
  return (
    <Combobox
      value="Engineering"
      onChange={() => {}}
      options={JOB_FAMILY_OPTIONS}
      disabled
    />
  );
}

function LoadingExample() {
  const [value, setValue] = useState('');
  return (
    <Combobox
      value={value}
      onChange={setValue}
      options={[]}
      placeholder="Fetching options…"
      loading
    />
  );
}

function ErrorExample() {
  const [value, setValue] = useState('');
  return (
    <Combobox
      value={value}
      onChange={setValue}
      options={CATEGORY_OPTIONS}
      placeholder="Select a category…"
      error="A category is required."
    />
  );
}

function WithFieldExample() {
  const [value, setValue] = useState('');
  return (
    <Field label="Job Family" required error={!value ? 'Job family is required.' : undefined}>
      <Combobox
        value={value}
        onChange={setValue}
        options={JOB_FAMILY_OPTIONS}
        placeholder="Type a job family…"
      />
    </Field>
  );
}

function FreeTextExample() {
  const [value, setValue] = useState('');
  return (
    <Combobox
      value={value}
      onChange={setValue}
      options={JOB_FAMILY_OPTIONS}
      placeholder="Type or enter a custom value…"
    />
  );
}

function DisabledOptionsExample() {
  const [value, setValue] = useState('');
  return (
    <Combobox
      value={value}
      onChange={setValue}
      options={ROLE_OPTIONS_WITH_DISABLED}
      placeholder="Select a role…"
    />
  );
}

// ── Code strings — centralized per canonical architecture ─────────────────

const CODE = {
  basic: `import { Combobox } from '@diwauhris/ui';
import { useState } from 'react';

const options = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Finance',     label: 'Finance'     },
  { value: 'Operations',  label: 'Operations'  },
];

const [value, setValue] = useState('');

<Combobox
  value={value}
  onChange={setValue}
  options={options}
  placeholder="Type to search…"
/>`,

  withField: `import { Combobox } from '@diwauhris/ui';
import { Field } from '@diwauhris/ui';
import { useState } from 'react';

// Assumes: const familyOptions = [{ value: 'Engineering', label: 'Engineering' }, ...]
const [family, setFamily] = useState('');

// Combobox does not consume FieldContext.
// Wire the label association manually via htmlFor + id.
<Field label="Job Family">
  <div id="job-family-wrapper">
    <Combobox
      value={family}
      onChange={setFamily}
      options={familyOptions}
      placeholder="e.g. Engineering"
    />
  </div>
</Field>`,

  states: `import { useState } from 'react';

// Fragment — add your own state before using these variants:
const [value, setValue] = useState('');

// Loading — while option data is being fetched
<Combobox value={value} onChange={setValue} options={[]} loading placeholder="Fetching options…" />

// Error — validation failure
<Combobox value={value} onChange={setValue} options={options} error="A job family is required." />

// Disabled
<Combobox value="Engineering" onChange={() => {}} options={options} disabled />`,

  freeText: `// The user may type a value not in the list.
// onChange is called on every keystroke, not just on suggestion selection.
// Storing the raw typed string is intentional for fields like "School Name",
// "City", or any free-text-with-suggestions pattern.

const [schoolName, setSchoolName] = useState('');

<Combobox
  value={schoolName}
  onChange={setSchoolName}
  options={knownSchools}
  placeholder="Start typing school name…"
/>`,

  disabledOptions: `import { Combobox } from '@diwauhris/ui';
import { useState } from 'react';

// Add disabled: true to any option to prevent it from being selected.
// Disabled options appear muted and are skipped by keyboard navigation.
const roleOptions = [
  { value: 'Admin',      label: 'Admin'      },
  { value: 'Manager',    label: 'Manager'    },
  { value: 'Analyst',    label: 'Analyst'    },
  { value: 'Intern',     label: 'Intern',     disabled: true },
  { value: 'Contractor', label: 'Contractor', disabled: true },
  { value: 'Supervisor', label: 'Supervisor'  },
];

const [role, setRole] = useState('');

<Combobox
  value={role}
  onChange={setRole}
  options={roleOptions}
  placeholder="Select a role…"
/>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function ComboboxPage() {
  return (
    <GalleryLayout activeId="combobox">
      <title>Combobox — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Inputs"
          name="Combobox"
          description="A text input with a suggestion dropdown. Unlike Select, the user can type a value that isn't in the list — perfect for job families, school names, cities, or any field that benefits from suggestions but shouldn't limit you to them."
          status="complete"
          docsRoute="/ui-library/docs/inputs"
        />

        {/* Overview ── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Key states at a glance. Type 2+ characters to see suggestions."
        >
          <ShowcasePreview standalone center={false} overflow="visible" minHeight="min-h-[320px]">
            <ShowcaseGrid columns={2}>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Basic</p>
                <BasicExample />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Disabled</p>
                <DisabledExample />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading</p>
                <LoadingExample />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Error</p>
                <ErrorExample />
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Playground ── */}
        <GallerySection
          id="playground"
          title="Playground"
          description="Toggle loading, disabled, and error states. Type at least 2 characters to see the suggestion list."
        >
          <ComboboxPlayground />
        </GallerySection>

        {/* Implementation ── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="Import Combobox from the gallery. All usage patterns below."
        >
          <Showcase code={CODE.basic} language="tsx" title="Basic usage" overflow="visible" minHeight="min-h-[280px]">
            <div className="w-64">
              <BasicExample />
            </div>
          </Showcase>
          <Showcase code={CODE.withField} language="tsx" title="With Field label" overflow="visible" minHeight="min-h-[280px]">
            <div className="w-64">
              <WithFieldExample />
            </div>
          </Showcase>
          <Showcase code={CODE.states} language="tsx" title="Loading, error, disabled" overflow="visible" minHeight="min-h-[200px]">
            <div className="flex flex-wrap gap-6">
              <div className="w-56 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading</p>
                <LoadingExample />
              </div>
              <div className="w-56 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Error</p>
                <ErrorExample />
              </div>
              <div className="w-56 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Disabled</p>
                <DisabledExample />
              </div>
            </div>
          </Showcase>
          <Showcase code={CODE.freeText} language="tsx" title="Free-text with suggestions" overflow="visible" minHeight="min-h-[280px]">
            <div className="w-64">
              <FreeTextExample />
            </div>
          </Showcase>
          <Showcase
            code={CODE.disabledOptions}
            language="tsx"
            title="Disabled options"
            description="Set disabled: true on any option to prevent selection. Disabled options render muted and are skipped by ArrowDown / ArrowUp keyboard navigation."
            overflow="visible"
            minHeight="min-h-[280px]"
          >
            <div className="w-64">
              <DisabledOptionsExample />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['ARIA Roles', [
                'role="combobox" on the input — announces the popup association to screen readers.',
                'role="listbox" on the suggestion dropdown.',
                'role="option" on each suggestion item.',
              ]],
              ['State Attributes', [
                'aria-expanded reflects whether the suggestion list is open.',
                'aria-controls references the listbox id — allows AT to locate the popup.',
                'aria-activedescendant references the id of the currently highlighted option during keyboard navigation.',
                'aria-autocomplete="list" signals that suggestions appear in a list.',
                'aria-selected on each option reflects whether it is the currently selected value.',
                'aria-invalid="true" is set when an error prop is provided.',
              ]],
              ['Keyboard', [
                'ArrowDown — opens the list or moves highlight down.',
                'ArrowUp — moves highlight up.',
                'Enter — selects the highlighted option, or closes the list if none is highlighted.',
                'Escape — closes the suggestion list without selecting.',
                'Tab — moves focus away; the list closes.',
              ]],
              ['Labels', [
                'PisCombobox does not consume FieldContext. Wire a visible label manually using htmlFor on a <label> element.',
                'When inside a Field wrapper, the label text is rendered but the for/id association requires a container id — see the "With Field label" code example above.',
              ]],
              ['Limitations', [
                'Home and End keys are not supported for option navigation.',
                'Per-option disabled is supported via the ComboboxOption.disabled field.',
                'The suggestion list is not portaled; it may be clipped by overflow:hidden containers.',
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
            { name: 'value',       type: 'string',                           description: 'Current input value in controlled mode. Omit when using defaultValue for uncontrolled mode.' },
            { name: 'onChange',    type: '(value: string) => void',          description: 'Called on selection. Required in controlled mode. Omit when using uncontrolled mode.' },
            { name: 'defaultValue', type: 'string',                          description: 'Initial value for uncontrolled usage. Omit value and onChange to use uncontrolled mode.' },
            { name: 'onBlur',      type: '() => void',                       description: 'Called when the input loses focus. Use with form libraries for validation-on-blur.' },
            { name: 'options',     type: 'ComboboxOption[]', required: true, description: 'Suggestion source list. Filtering requires 2+ characters. Each option may include disabled: true to prevent selection.' },
            { name: 'placeholder', type: 'string',                           description: 'Input placeholder text.' },
            { name: 'disabled',    type: 'boolean',         default: 'false', description: 'Disables the input; the suggestion list will not open.' },
            { name: 'loading',     type: 'boolean',         default: 'false', description: 'Shows "Loading…" inside the dropdown. Use while fetching async options.' },
            { name: 'error',       type: 'string',                           description: 'Error message shown inside the dropdown. Also sets aria-invalid on the input.' },
            { name: 'className',   type: 'string',                           description: 'Additional CSS classes applied to the input element.' },
          ]} />

          <div className="rounded-xl border border-slate-200 bg-amber-50 px-5 py-4">
            <p className="text-sm font-semibold text-amber-800">Use Select instead when:</p>
            <ul className="mt-2 space-y-1">
              {[
                'The user must select only from a predefined list — use PisSelect (searchable={true}).',
                'The option list is short (≤ 8 items) and a native select is clearer.',
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
