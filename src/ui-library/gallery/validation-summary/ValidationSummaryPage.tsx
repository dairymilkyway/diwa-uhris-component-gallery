/**
 * ValidationSummaryPage — Gallery infrastructure (Display)
 * Documents the ValidationSummary design-system component.
 * Source: frontend/src/ui-library/gallery/validation-summary/ValidationSummary.tsx
 */

import { useState } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { ValidationSummary, type ValidationIssue } from './ValidationSummary';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['error-banner', 'alert', 'field']);

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  basic: `import { ValidationSummary, type ValidationIssue } from '@diwauhris/ui';

const [issues, setIssues] = useState<ValidationIssue[]>([]);

// After client-side validation:
function handleSave() {
  const errors: ValidationIssue[] = [];
  if (!form.employeeId) errors.push({ field: 'Employee ID', message: 'is required' });
  if (!form.position)   errors.push({ field: 'Position', message: 'must be selected' });
  if (errors.length > 0) { setIssues(errors); return; }
  setIssues([]);
  // proceed with save
}

<ValidationSummary issues={issues} />`,

  heading: `// Custom heading
<ValidationSummary
  issues={issues}
  heading="Fix these errors before submitting"
/>`,

  inModal: `// Common pattern: above a form in a Modal/Dialog
<Modal title="Edit position" onClose={onClose} footer={<Footer />}>
  <div className="space-y-4">
    <ValidationSummary issues={validationIssues} />
    <Field label="Position Title">...</Field>
    <Field label="Department">...</Field>
  </div>
</Modal>`,

  scrollToField: `// Wizard-step pattern: each error is a link that scrolls to and
// focuses the broken field. Pair issue.field with the DOM id of the
// corresponding input, and optionally provide a display label.
import { ValidationSummary } from '@diwauhris/ui';

<ValidationSummary
  issues={[
    { field: 'start_date', message: 'cannot be in the past' },
    { field: 'position',   message: 'must be selected' },
  ]}
  fieldIds={{
    start_date: 'step2-start-date',  // id on the <input> or its wrapper
    position:   'step2-position',
  }}
  fieldLabels={{
    start_date: 'Start Date',
    position:   'Position Title',
  }}
/>`,
};

// ── Live demo ──────────────────────────────────────────────────────────────

const DEMO_ISSUES: ValidationIssue[] = [
  { field: 'Employee ID', message: 'is required' },
  { field: 'Position', message: 'must be selected before saving' },
  { field: 'Start Date', message: 'cannot be in the past' },
];

function LiveDemo() {
  const [count, setCount] = useState(1);
  const issues = DEMO_ISSUES.slice(0, count);

  return (
    <div className="space-y-4 w-full max-w-xl">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500">Errors shown:</span>
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setCount(n)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 ${
              count === n
                ? 'bg-brand-blue text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <ValidationSummary issues={issues} />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ValidationSummaryPage() {
  return (
    <GalleryLayout activeId="validation-summary">
      <title>ValidationSummary — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Display"
          name="ValidationSummary"
          description="A grouped list of all form errors in one place. Mount it at the top of your form unconditionally — it renders nothing when valid, and announces errors immediately via role='alert' when they appear."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="Toggle the number of errors to see how the summary adapts.">
          <ShowcasePreview standalone center={false}>
            <LiveDemo />
          </ShowcasePreview>
        </GallerySection>

        {/* Empty state */}
        <GallerySection id="empty" title="Empty State">
          <ShowcasePreview standalone center={false}>
            <div className="space-y-2 w-full max-w-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                issues={`{[]}`} — renders nothing
              </p>
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/40 px-4 py-3 text-xs text-slate-400 italic">
                (nothing rendered)
              </div>
              <ValidationSummary issues={[]} />
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="With client-side validation" center={false}>
            <div className="w-full max-w-xl">
              <ValidationSummary issues={[
                { field: 'Employee ID', message: 'is required' },
                { field: 'Position', message: 'must be selected before saving' },
              ]} />
            </div>
          </Showcase>
          <Showcase code={CODE.heading} language="tsx" title="Custom heading" center={false}>
            <div className="w-full max-w-xl">
              <ValidationSummary
                issues={[{ field: 'Start Date', message: 'cannot be in the past' }]}
                heading="Fix these errors before submitting"
              />
            </div>
          </Showcase>
          <Showcase code={CODE.inModal} language="tsx" title="Inside a Modal" center={false}>
            <div className="w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-800">Edit position</p>
              </div>
              <div className="px-5 py-4 space-y-4">
                <ValidationSummary issues={[
                  { field: 'Position Title', message: 'is required' },
                  { field: 'Department', message: 'must be selected' },
                ]} />
                <div className="h-8 rounded-lg bg-slate-50 border border-slate-100" />
                <div className="h-8 rounded-lg bg-slate-50 border border-slate-100" />
              </div>
            </div>
          </Showcase>
          <Showcase code={CODE.scrollToField} language="tsx" title="Scroll-to-field (wizard steps)" center={false}>
            <div className="w-full max-w-xl space-y-3">
              <ValidationSummary
                issues={[
                  { field: 'start_date', message: 'cannot be in the past' },
                  { field: 'position',   message: 'must be selected' },
                ]}
                fieldIds={{ start_date: 'demo-input-1', position: 'demo-input-2' }}
                fieldLabels={{ start_date: 'Start Date', position: 'Position Title' }}
              />
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                ↑ Error items are clickable links that scroll to the field
              </p>
              <input id="demo-input-1" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600" placeholder="Start Date field" readOnly />
              <input id="demo-input-2" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600" placeholder="Position Title field" readOnly />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['role="alert"', [
                'ValidationSummary renders with role="alert", which causes screen readers to announce the content immediately when injected into the DOM.',
                'This is correct for validation feedback — users need to know immediately that there are errors after attempting to submit.',
                'Always render ValidationSummary at a stable position in the DOM (above the form). Do not conditionally unmount it — use the issues array to control visibility.',
              ]],
              ['List semantics', [
                '<ul> and <li> are used for the issue list. Screen readers announce "list of N items" which gives users count context.',
                'Each issue is identified by "Field name: message" — both are announced as a single list item.',
              ]],
              ['Heading', [
                'The heading uses a plain <div> with font-bold styling rather than an <h> element to avoid disrupting page heading hierarchy.',
                'If you need a semantic heading, override via className and add aria-level manually, or pass heading="" and add your own before the component.',
              ]],
              ['Placement', [
                'Place ValidationSummary above the first form field, inside a Modal or form section — before the submit button.',
                'This ensures the screen reader reads it before the fields when navigating.',
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
            { name: 'issues',      type: 'ValidationIssue[]', required: true, description: 'Validation errors to display. Component renders nothing when empty.' },
            { name: 'heading',     type: 'string', default: '"Review these fields before saving"', description: 'Heading text shown above the error list.' },
            { name: 'fieldIds',    type: 'Record<string, string>', description: 'Maps issue.field → DOM element id. When provided, matching issues render as clickable links that scroll to and focus the target element. Issues with no matching key render as plain text.' },
            { name: 'fieldLabels', type: 'Record<string, string>', description: 'Maps issue.field → human-friendly display label. When provided, the label replaces the raw field key in the rendered message.' },
            { name: 'className',   type: 'string',            description: 'Additional class on the root element.' },
          ]} />

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="mb-2 text-sm font-bold text-slate-700">ValidationIssue type</p>
            <pre className="text-xs font-mono text-slate-600 whitespace-pre-wrap">{
              'interface ValidationIssue {\n  field:   string;\n  message: string;\n}'
            }</pre>
          </div>
        </GallerySection>

        {/* Related */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
