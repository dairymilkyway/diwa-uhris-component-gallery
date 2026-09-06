/**
 * StepperPage — Gallery infrastructure
 * Documents the Stepper design-system component.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { StepperPlayground } from './StepperPlayground';
import { Stepper } from './Stepper';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['tabs', 'breadcrumb', 'button']);

const STEPS_3 = [
  { id: '1', label: 'Personal Details', description: 'Name and contact' },
  { id: '2', label: 'Employment',       description: 'Role and dates' },
  { id: '3', label: 'Review',           description: 'Confirm and submit' },
];

const STEPS_4 = [
  { id: '1', label: 'Account',     description: 'Create your account' },
  { id: '2', label: 'Profile',     description: 'Set up your profile' },
  { id: '3', label: 'Preferences', description: 'Choose preferences' },
  { id: '4', label: 'Done',        description: 'All set!' },
];

// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  basic: `import { Stepper } from '@diwauhris/ui';

const steps = [
  { id: '1', label: 'Personal Details', description: 'Name and contact' },
  { id: '2', label: 'Employment',       description: 'Role and dates' },
  { id: '3', label: 'Review',           description: 'Confirm and submit' },
];

<Stepper
  steps={steps}
  currentStep="2"
  completedSteps={['1']}
/>`,

  vertical: `<Stepper
  steps={steps}
  currentStep="2"
  completedSteps={['1']}
  orientation="vertical"
/>`,

  disabled: `<Stepper
  steps={steps}
  currentStep="2"
  completedSteps={['1']}
  disabledSteps={['3']}
/>`,
};

export default function StepperPage() {
  return (
    <GalleryLayout activeId="stepper">
      <title>Stepper — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Navigation"
          name="Stepper"
          description="A step progress indicator for multi-step flows. Shows completed, active, upcoming, and disabled steps. Horizontal for page headers, vertical for sidebar-style wizards."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="Step states and orientations.">
          <ShowcasePreview standalone center={false} minHeight="min-h-[200px]">
            <div className="w-full space-y-8 py-4">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Horizontal — step 2 of 3</p>
                <Stepper steps={STEPS_3} currentStep="2" completedSteps={['1']} />
              </div>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Horizontal — step 3 of 4</p>
                <Stepper steps={STEPS_4} currentStep="3" completedSteps={['1','2']} />
              </div>
              <ShowcaseGrid columns={2}>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Vertical</p>
                  <Stepper steps={STEPS_3} currentStep="2" completedSteps={['1']} orientation="vertical" />
                </div>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">With disabled step</p>
                  <Stepper steps={STEPS_3} currentStep="2" completedSteps={['1']} disabledSteps={['3']} />
                </div>
              </ShowcaseGrid>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Playground */}
        <GallerySection id="playground" title="Playground">
          <StepperPlayground />
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.basic} language="tsx" title="Horizontal (default)" center={false} minHeight="min-h-[120px]">
              <div className="w-full max-w-md">
                <Stepper steps={STEPS_3} currentStep="2" completedSteps={['1']} />
              </div>
            </Showcase>
          </ShowcaseGrid>
          <Showcase code={CODE.vertical} language="tsx" title="Vertical" center={false} minHeight="min-h-[160px]">
              <div className="w-full max-w-xs">
                <Stepper steps={STEPS_3} currentStep="2" completedSteps={['1']} orientation="vertical" />
              </div>
            </Showcase>
            <Showcase code={CODE.disabled} language="tsx" title="Disabled step" center={false} minHeight="min-h-[100px]">
              <div className="w-full max-w-md">
                <Stepper steps={STEPS_3} currentStep="2" completedSteps={['1']} disabledSteps={['3']} />
              </div>
            </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Semantics', [
                'The step list renders as <ol> — screen readers can announce the count and position.',
                'The current step receives aria-current="step".',
                'The container has aria-label="Progress" and aria-orientation.',
                'The indicator circles are aria-hidden — labels provide all the information.',
              ]],
              ['Disabled steps', [
                'Disabled steps are purely visual. The Stepper is a display component — it does not manage navigation.',
                'The consumer decides which steps are reachable and handles step transitions.',
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
          <p className="text-sm font-bold text-slate-700 mb-2">Stepper</p>
          <ApiTable props={[
            { name: 'steps',          type: 'StepDef[]', required: true, description: 'Array of step definitions.' },
            { name: 'currentStep',    type: 'string',    required: true, description: 'ID of the current active step.' },
            { name: 'completedSteps', type: 'string[]',  default: '[]',  description: 'IDs of completed steps.' },
            { name: 'disabledSteps',  type: 'string[]',  default: '[]',  description: 'IDs of disabled steps.' },
            { name: 'orientation',    type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction.' },
            { name: 'className',      type: 'string',    description: 'Additional class on the root element.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">StepDef</p>
          <ApiTable props={[
            { name: 'id',          type: 'string',   required: true, description: 'Unique step identifier.' },
            { name: 'label',       type: 'string',   required: true, description: 'Step label text.' },
            { name: 'description', type: 'string',   description: 'Optional secondary description.' },
            { name: 'icon',        type: 'ReactNode', description: 'Custom icon inside the step circle.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
