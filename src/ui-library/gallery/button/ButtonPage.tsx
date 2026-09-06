/**
 * ButtonPage — Gallery infrastructure
 *
 * Canonical template for the Phase 3.6 information architecture:
 *
 *   Header → Overview (visual, no code) → Playground → Implementation → Accessibility → API → Related
 *
 * Overview  = "What does this look like?"   — visual only, no code blocks
 * Playground = "How does this behave?"      — interactive controls
 * Implementation = "How do I build this?"   — every example has its own code + copy
 */

import { ArrowRight, Check, Download, Loader2, Plus, Save, Trash2, UserPlus, X } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { ButtonPlayground } from './ButtonPlayground';
import { Button } from './Button';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['icon-button', 'input', 'modal']);

// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  // Variants
  primary: `import { Button } from '@diwauhris/ui';
import { Save } from '@diwauhris/ui';

<Button variant="primary">
  <Save size={16} aria-hidden="true" />
  Save Changes
</Button>`,

  dark: `import { Button } from '@diwauhris/ui';
import { Plus } from '@diwauhris/ui';

<Button variant="dark">
  <Plus size={16} aria-hidden="true" />
  Add Record
</Button>`,

  outline: `import { Button } from '@diwauhris/ui';

<Button variant="outline">Cancel</Button>`,

  ghost: `import { Button } from '@diwauhris/ui';

<Button variant="ghost">Learn more</Button>`,

  danger: `import { Button } from '@diwauhris/ui';
import { Trash2 } from '@diwauhris/ui';

<Button variant="danger">
  <Trash2 size={16} aria-hidden="true" />
  Delete
</Button>`,

  // Sizes
  sizeSm: `<Button variant="primary" size="sm">Small</Button>`,
  sizeMd: `<Button variant="primary" size="md">Medium</Button>`,
  sizeLg: `<Button variant="primary" size="lg">Large</Button>`,

  // States
  stateDefault:  `<Button variant="primary">Save Changes</Button>`,
  stateDisabled: `<Button variant="primary" disabled>Save Changes</Button>`,
  stateLoading: `import { Loader2, Save } from '@diwauhris/ui';
import { useState } from 'react';

const [saving, setSaving] = useState(false);

<Button variant="primary" loading={saving} onClick={handleSave}>
  {saving ? (
    <>
      <Loader2 size={16} className="animate-spin" aria-hidden="true" />
      Saving…
    </>
  ) : (
    <>
      <Save size={16} aria-hidden="true" />
      Save Changes
    </>
  )}
</Button>`,

  // Icons
  iconLeft: `import { Download } from '@diwauhris/ui';

<Button variant="outline">
  <Download size={16} aria-hidden="true" />
  Export Report
</Button>`,

  iconRight: `import { ArrowRight } from '@diwauhris/ui';

<Button variant="primary">
  Continue
  <ArrowRight size={16} aria-hidden="true" />
</Button>`,

  // Full width
  fullWidth: `<Button variant="primary" fullWidth>
  Submit Application
</Button>`,

  // Patterns
  patternModalFooter: `import { Save } from '@diwauhris/ui';

<footer className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
  <Button variant="outline" onClick={onClose}>Cancel</Button>
  <Button variant="primary" onClick={onSave}>
    <Save size={16} aria-hidden="true" />
    Save Changes
  </Button>
</footer>`,

  patternApproval: `import { Check, X } from '@diwauhris/ui';

<div className="flex flex-wrap items-center gap-3">
  <Button variant="primary">
    <Check size={16} aria-hidden="true" />
    Approve
  </Button>
  <Button variant="danger">
    <X size={16} aria-hidden="true" />
    Reject
  </Button>
  <Button variant="outline">Return for Revision</Button>
</div>`,

  patternPageHeader: `import { Download, UserPlus } from '@diwauhris/ui';

<div className="flex flex-wrap items-center gap-3">
  <Button variant="outline">
    <Download size={16} aria-hidden="true" />
    Export Report
  </Button>
  <Button variant="primary">
    <UserPlus size={16} aria-hidden="true" />
    Create Employee
  </Button>
</div>`,
  patternAsChild: `import { Button } from '@diwauhris/ui';
import { Link } from 'react-router-dom';

// Button styles applied to a router Link — no style duplication
<Button variant="primary" asChild>
  <Link to="/personnel/employees/new">Add Employee</Link>
</Button>`,

  inAppApproval: `import { Button } from '@diwauhris/ui';
import { Check, X } from 'lucide-react';

// Approve: primary — the expected, positive action
// Reject: danger — destructive/irreversible
// Return: outline — neutral alternative
<div className="flex flex-wrap items-center gap-3">
  <Button variant="primary">
    <Check size={16} aria-hidden="true" />
    Approve Request
  </Button>
  <Button variant="danger">
    <X size={16} aria-hidden="true" />
    Reject
  </Button>
  <Button variant="outline">Return for Revision</Button>
</div>`,

  inAppFormSubmit: `import { Button } from '@diwauhris/ui';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const [saving, setSaving] = useState(false);

// loading disables the button and removes leftIcon/rightIcon slots.
// Provide the spinner and contextual label inside children.
<div className="flex items-center gap-3">
  <Button
    variant="primary"
    loading={saving}
    onClick={handleSubmit}
  >
    {saving ? (
      <>
        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
        Saving PAF…
      </>
    ) : (
      'Submit PAF'
    )}
  </Button>
  <Button variant="outline" onClick={onCancel} disabled={saving}>
    Cancel
  </Button>
</div>`,
};

export default function ButtonPage() {
  return (
    <GalleryLayout activeId="button">
      <title>Button — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Inputs"
          name="Button"
          description="The action trigger for your UI. Five variants cover every use case from the primary CTA to a destructive delete. The loading prop disables and lets you control the spinner and label yourself."
          status="complete"
          docsRoute="/ui-library/docs/inputs"
        />

        {/* ── 2. Overview — visual only, no code ────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="All five variants at a glance. No code — explore the playground to experiment."
        >
          <ShowcasePreview standalone>
            <Button variant="primary">
              <Save size={16} aria-hidden="true" />
              Primary
            </Button>
            <Button variant="dark">
              <Plus size={16} aria-hidden="true" />
              Dark
            </Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">
              <Trash2 size={16} aria-hidden="true" />
              Danger
            </Button>
          </ShowcasePreview>
        </GallerySection>

        {/* ── 3. Playground ─────────────────────────────────────────────── */}
        <GallerySection
          id="playground"
          title="Playground"
          description="Adjust controls to explore every combination."
        >
          <ButtonPlayground />
        </GallerySection>

        {/* ── 4. Implementation ─────────────────────────────────────────── */}

        {/* 4.1 Variants */}
        <GallerySection
          id="variants"
          title="Variants"
          description="Five visual variants covering every action type. Each example below includes exact copyable code."
        >
          <ShowcaseGrid columns={2}>
            <Showcase
              title="Primary"
              description="The single most prominent action on a surface."
              code={CODE.primary}
            >
              <Button variant="primary">
                <Save size={15} aria-hidden="true" />
                Save Changes
              </Button>
            </Showcase>

            <Showcase
              title="Dark"
              description="Bold alternative when indigo is already in use."
              code={CODE.dark}
            >
              <Button variant="dark">
                <Plus size={15} aria-hidden="true" />
                Add Record
              </Button>
            </Showcase>

            <Showcase
              title="Outline"
              description="Secondary and cancel actions."
              code={CODE.outline}
            >
              <Button variant="outline">Cancel</Button>
            </Showcase>

            <Showcase
              title="Ghost"
              description="Low-emphasis tertiary actions."
              code={CODE.ghost}
            >
              <Button variant="ghost">Learn more</Button>
            </Showcase>
          </ShowcaseGrid>

          <Showcase
            title="Danger"
            description="Destructive or irreversible actions. Always pair with a confirmation dialog."
            code={CODE.danger}
          >
            <Button variant="danger">
              <Trash2 size={15} aria-hidden="true" />
              Delete
            </Button>
          </Showcase>
        </GallerySection>

        {/* 4.2 Sizes */}
        <GallerySection
          id="sizes"
          title="Sizes"
          description="Three sizes for different layout densities. Copy any single example."
        >
          <ShowcaseGrid columns={3}>
            <Showcase title="Small" code={CODE.sizeSm}>
              <Button variant="primary" size="sm">Small</Button>
            </Showcase>

            <Showcase title="Medium" code={CODE.sizeMd}>
              <Button variant="primary" size="md">Medium</Button>
            </Showcase>

            <Showcase title="Large" code={CODE.sizeLg}>
              <Button variant="primary" size="lg">Large</Button>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* 4.3 States */}
        <GallerySection
          id="states"
          title="States"
          description="Interactive states the Button can enter."
        >
          <ShowcaseGrid columns={3}>
            <Showcase title="Default" code={CODE.stateDefault}>
              <Button variant="primary">Save Changes</Button>
            </Showcase>

            <Showcase title="Disabled" code={CODE.stateDisabled}>
              <Button variant="primary" disabled>Save Changes</Button>
            </Showcase>

            <Showcase
              title="Loading"
              description="Caller provides the spinner and label. Use a loading state to disable the button and communicate in-progress work."
              code={CODE.stateLoading}
            >
              <Button variant="primary" disabled>
                <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                Saving…
              </Button>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* 4.4 Icons */}
        <GallerySection
          id="icons"
          title="Icons"
          description="Place icons as direct children. Use aria-hidden on decorative icons."
        >
          <ShowcaseGrid columns={2}>
            <Showcase
              title="Left icon"
              description="Icon placed before the label text."
              code={CODE.iconLeft}
            >
              <Button variant="outline">
                <Download size={15} aria-hidden="true" />
                Export Report
              </Button>
            </Showcase>

            <Showcase
              title="Right icon"
              description="Icon placed after the label text."
              code={CODE.iconRight}
            >
              <Button variant="primary">
                Continue
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* 4.5 Full Width */}
        <GallerySection id="full-width" title="Full Width">
          <Showcase
            description="fullWidth stretches the button to fill its container width."
            code={CODE.fullWidth}
            tone="white"
          >
            <div className="w-full max-w-sm">
              <Button variant="primary" fullWidth>Submit Application</Button>
            </div>
          </Showcase>
        </GallerySection>

        {/* 4.6 Composition Patterns */}
        <GallerySection
          id="patterns"
          title="Patterns"
          description="Real enterprise layouts showing Button in context."
        >
          <Showcase
            title="Modal footer"
            description="Outline + primary for cancel / confirm. Always place the primary action last."
            code={CODE.patternModalFooter}
            tone="white"
            center={false}
          >
            <div className="flex w-full items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">
                <Save size={15} aria-hidden="true" />
                Save Changes
              </Button>
            </div>
          </Showcase>

          <Showcase
            title="Approval actions"
            description="Primary for approval, danger for rejection. Outline for neutral alternatives."
            code={CODE.patternApproval}
            tone="white"
            center={false}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">
                <Check size={15} aria-hidden="true" />
                Approve
              </Button>
              <Button variant="danger">
                <X size={15} aria-hidden="true" />
                Reject
              </Button>
              <Button variant="outline">Return for Revision</Button>
            </div>
          </Showcase>

          <Showcase
            title="Page header actions"
            description="Secondary action on the left, primary action on the right."
            code={CODE.patternPageHeader}
            tone="white"
            center={false}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline">
                <Download size={15} aria-hidden="true" />
                Export Report
              </Button>
              <Button variant="primary">
                <UserPlus size={15} aria-hidden="true" />
                Create Employee
              </Button>
            </div>
          </Showcase>

          <Showcase
            title="Router Link (asChild)"
            description="Use asChild to apply Button styles to a router Link. The rendered element is an <a> — no button-inside-anchor nesting."
            code={CODE.patternAsChild}
            tone="white"
            center={false}
          >
            <div className="flex items-center gap-3">
              <Button variant="primary" asChild>
                <a href="#patterns">Add Employee</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#patterns">View All</a>
              </Button>
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 4.7 In Your Application ────────────────────────────────────── */}
        <GallerySection
          id="in-your-application"
          title="In Your Application"
          description="The gallery shows defaults. Here is what to customise and what must stay unchanged."
        >
          {/* Customise vs. must-not-change table */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 space-y-3">
              <h3 className="text-sm font-bold text-emerald-800">Expected to customise</h3>
              <ul className="space-y-2">
                {[
                  ['variant', 'Choose the semantically correct variant for the action (danger for destructive, outline for cancel, primary for the single most-important action).'],
                  ['children', 'Write real feature copy — "Save Changes", "Approve Request", "Submit PAF" — not gallery placeholder labels.'],
                  ['leftIcon / rightIcon / children icons', 'Use icons relevant to the action. Gallery icons are illustrative.'],
                  ['size', 'Match the density of the surrounding layout — sm inside compact toolbars, lg on full-page CTAs.'],
                  ['fullWidth', 'Set true for submit buttons in full-width form layouts.'],
                ].map(([prop, desc]) => (
                  <li key={String(prop)} className="flex items-start gap-2 text-xs font-medium text-emerald-800">
                    <span className="mt-0.5 shrink-0 font-mono font-bold text-emerald-600">{String(prop)}</span>
                    <span className="text-emerald-700">{String(desc)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 space-y-3">
              <h3 className="text-sm font-bold text-rose-800">Must not change</h3>
              <ul className="space-y-2">
                {[
                  ['disabled HTML attr', 'Use the disabled attribute (not CSS pointer-events: none) to prevent interaction.'],
                  ['loading pattern', 'The loading prop disables interaction. Caller provides the spinner and label inside children.'],
                  ['type="button"', 'Never omit type="button" or the button will accidentally submit forms.'],
                  ['focus-visible ring', 'Do not remove the focus ring. It is required for keyboard navigation.'],
                  ['<button> element', 'Never replace with <div> or <a> for a button action.'],
                ].map(([prop, desc]) => (
                  <li key={String(prop)} className="flex items-start gap-2 text-xs font-medium text-rose-800">
                    <span className="mt-0.5 shrink-0 font-mono font-bold text-rose-600">{String(prop)}</span>
                    <span className="text-rose-700">{String(desc)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Real HRIS adapted examples */}
          <Showcase
            title="Approval actions (HRIS adapted)"
            description="Approve uses primary — the expected action. Reject uses danger — destructive. Return for Revision uses outline — a neutral alternative. Labels and icons are feature-specific, not gallery defaults."
            code={CODE.inAppApproval}
            tone="white"
            center={false}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">
                <Check size={15} aria-hidden="true" />
                Approve Request
              </Button>
              <Button variant="danger">
                <X size={15} aria-hidden="true" />
                Reject
              </Button>
              <Button variant="outline">Return for Revision</Button>
            </div>
          </Showcase>

          <Showcase
            title="Form submit with loading state (HRIS adapted)"
            description="The loading prop disables interaction and removes icon slots. Children provide the contextual spinner and label. The label changes between idle and saving states."
            code={CODE.inAppFormSubmit}
            tone="white"
            center={false}
          >
            <div className="flex items-center gap-3">
              <Button variant="primary" disabled>
                <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                Saving PAF…
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </Showcase>
        </GallerySection>

        {/* ── 5. Accessibility ──────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {[
              ['Keyboard', [
                'Enter or Space — activates the button.',
                'Tab / Shift+Tab — moves focus to/from the button.',
              ]],
              ['Focus Visibility', [
                'All variants expose a 2px ring on focus-visible.',
                'Ring color matches the variant semantics: indigo for primary, rose for danger.',
                'Ring is suppressed on mouse click via :focus-visible (not :focus).',
              ]],
              ['ARIA', [
                'Always render as <button>. Never use <div> or <a> for button actions.',
                'Set type="button" to prevent accidental form submission.',
                'Icon-only buttons must have an aria-label on the button element.',
                'Decorative icons inside buttons should be aria-hidden="true".',
                'Disabled state: use the disabled HTML attribute, not aria-disabled alone.',
              ]],
            ].map(([heading, items]) => (
              <div key={String(heading)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(heading)}</h3>
                <ul className="space-y-1.5">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GallerySection>

        {/* ── 6. API ────────────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference">
          <ApiTable
            props={[
              { name: 'variant',   type: "'primary' | 'dark' | 'outline' | 'ghost' | 'danger'", default: "'primary'", description: 'Visual style.' },
              { name: 'size',      type: "'sm' | 'md' | 'lg'",  default: "'md'",  description: 'Height and padding scale.' },
              { name: 'loading',   type: 'boolean',              default: 'false', description: 'Disables the button. Pair with a spinner in children.' },
              { name: 'leftIcon',  type: 'ReactNode',                              description: 'Icon before the label. Hidden while loading. Should be aria-hidden.' },
              { name: 'rightIcon', type: 'ReactNode',                              description: 'Icon after the label. Hidden while loading. Should be aria-hidden.' },
              { name: 'fullWidth', type: 'boolean',              default: 'false', description: 'Stretches button to fill its container.' },
              { name: 'disabled',  type: 'boolean',              default: 'false', description: 'Disables interaction.' },
              { name: 'children',  type: 'ReactNode',                               description: 'Button label content. Optional — icon-only buttons are valid with aria-label.' },
              { name: 'asChild',   type: 'boolean',              default: 'false', description: 'Renders as the child element via Radix Slot. Use to compose Button styles onto a router <Link> or <a> tag.' },
            ]}
          />
        </GallerySection>

        {/* ── 7. Related ────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
