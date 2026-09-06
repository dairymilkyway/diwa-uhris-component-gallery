/**
 * WizardLayoutPage — Gallery infrastructure (Layout)
 *
 * Documents the full-screen wizard layout pattern from OnboardingWizardPage.tsx.
 * Pattern only — does not extract or wrap the production implementation.
 */

import { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['stepper', 'modal', 'field']);

// ── Condensed structural demo (layout only, no production import) ──────────

const DEMO_STEPS = [
  { id: 1, title: 'Details',     desc: 'Basic information'   },
  { id: 2, title: 'Employment',  desc: 'Role and schedule'   },
  { id: 3, title: 'Org & Pay',   desc: 'Structure and grade' },
  { id: 4, title: 'Review',      desc: 'Confirm and submit'  },
];

function WizardDemo() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col md:flex-row" style={{ minHeight: '320px' }}>
      {/* Left sidebar — step navigation */}
      <div className="w-full md:w-56 bg-slate-900 p-5 text-white shrink-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Steps</p>
        <div className="space-y-1">
          {DEMO_STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent   = step.id === currentStep;
            return (
              <button
                key={step.id}
                type="button"
                aria-current={isCurrent ? 'step' : undefined}
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-3 w-full text-left rounded-lg px-2 py-2 transition text-sm ${
                  isCurrent ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border-2 shrink-0 ${
                  isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' :
                  isCurrent   ? 'bg-brand-blue border-brand-blue text-white' :
                                'bg-slate-800 border-slate-700 text-slate-500'
                }`} aria-hidden="true">
                  {isCompleted ? <Check size={11} strokeWidth={3} /> : step.id}
                </div>
                <div className={isCurrent ? 'opacity-100' : 'opacity-50'}>
                  <p className="text-sm font-bold leading-none">{step.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{step.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-slate-500 mt-4">Step {currentStep} of {DEMO_STEPS.length}</p>
      </div>

      {/* Right content area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Content header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900">
              {DEMO_STEPS[currentStep - 1]?.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{DEMO_STEPS[currentStep - 1]?.desc}</p>
          </div>
          <span className="text-xs font-bold text-brand-blue bg-blue-50 border border-brand-blue/20 rounded-full px-3 py-1">
            {currentStep}/{DEMO_STEPS.length}
          </span>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 px-6 py-6 overflow-y-auto">
          <div className="h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-sm text-slate-400 font-medium">
            Step {currentStep} form content
          </div>
        </div>

        {/* Navigation footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
            disabled={currentStep <= 1}
            className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(s => Math.min(DEMO_STEPS.length, s + 1))}
            disabled={currentStep >= DEMO_STEPS.length}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-brand-blue rounded-xl hover:bg-brand-navy disabled:opacity-40 transition"
          >
            Next <ChevronRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  structure: `// Wizard layout structure — from OnboardingWizardPage.tsx
// Full-screen: min-h-full bg-slate-50 flex flex-col
// Card: bg-white rounded-3xl shadow-xl flex flex-col md:flex-row h-[85vh]

<div className="min-h-full bg-slate-50 p-0 md:p-6 flex flex-col">
  {/* Back navigation (outside the card) */}
  <div className="max-w-7xl mx-auto w-full px-6 md:px-0">
    <Link to="/personnel/employees/onboarding">← Onboarding</Link>
  </div>

  {/* Wizard card */}
  <div className="flex-1 flex items-center justify-center p-3 md:p-6 pt-2 md:pt-4">
    <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden
                    flex flex-col md:flex-row h-[85vh] border border-slate-100">

      {/* Left sidebar — step navigation (w-full md:w-80, bg-slate-900) */}
      <div className="w-full md:w-80 bg-slate-900 p-8 text-white flex flex-col ...">
        {/* Step list */}
      </div>

      {/* Right content area (flex-1, bg-white) */}
      <div className="flex-1 flex flex-col h-full bg-white relative">
        {/* Content header — step title + progress */}
        <div className="px-10 py-8 border-b border-slate-50 ...">
          ...
        </div>

        {/* Scrollable step body */}
        <div className="flex-1 overflow-y-auto px-10 py-6">
          <Suspense fallback={<StepLoader />}>
            {renderStep()}
          </Suspense>
        </div>

        {/* Navigation footer — Back / Next / Submit */}
        <div className="px-10 py-6 border-t border-slate-50 flex justify-between ...">
          <button>Back</button>
          <button>Next Step →</button>
        </div>
      </div>

    </div>
  </div>
</div>`,

  stepSidebar: `// Step sidebar conventions (bg-slate-900, left panel)
// Each step button has aria-current="step" when active

{STEPS.map((step) => {
  const isCompleted    = completedSteps.has(step.id);
  const isCurrent      = step.id === currentStep;
  const needsAttention = vm.stepValidationStatuses[step.id] === 'invalid';
  const isNavigable    = isCompleted || isCurrent;

  return (
    <div key={step.id} className="relative">
      {/* Connector line between steps */}
      {idx !== STEPS.length - 1 && (
        <div className={\`absolute left-4 top-8 w-0.5 h-10 \${
          isCompleted ? 'bg-emerald-500' : 'bg-slate-700'
        }\`} aria-hidden="true" />
      )}

      <button
        type="button"
        aria-current={isCurrent ? 'step' : undefined}
        disabled={!isNavigable || vm.submitting}
        onClick={() => isNavigable && vm.goToStep(step.id)}
        className={\`flex items-start gap-4 w-full text-left rounded-xl px-1 py-1 \${
          isNavigable ? 'hover:bg-white/5' : 'cursor-default'
        }\`}
      >
        <div className={\`w-8 h-8 rounded-full border-2 flex items-center justify-center \${
          isCompleted      ? 'bg-emerald-500 border-emerald-500 text-white' :
          needsAttention   ? 'bg-amber-500 border-amber-400 text-white' :
          isCurrent        ? 'bg-brand-blue border-brand-blue text-white' :
                             'bg-slate-800 border-slate-700 text-slate-500'
        }\`} aria-hidden="true">
          {isCompleted ? <Check size={14} strokeWidth={3} /> : step.id}
        </div>
        <div className={\`\${isCurrent ? 'opacity-100' : 'opacity-60'}\`}>
          <h4 className="text-sm font-bold">{step.title}</h4>
          <p className="text-[10px] text-slate-400">{step.description}</p>
        </div>
      </button>
    </div>
  );
})}`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function WizardLayoutPage() {
  return (
    <GalleryLayout activeId="wizard-layout">
      <title>Wizard Layout — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Layout"
          name="Wizard Layout"
          description="A full-screen layout for multi-step flows. Dark sidebar with step navigation on the left, scrollable content on the right. Pair it with Stepper for the step tracker."
          status="complete"
          importName={false}
        />

        {/* Overview ── */}
        <GallerySection id="overview" title="Overview" description="Interactive layout demonstration. Click steps or Back/Next to navigate.">
          <ShowcasePreview standalone>
            <WizardDemo />
          </ShowcasePreview>
        </GallerySection>

        {/* Dimensions ── */}
        <GallerySection id="dimensions" title="Layout Conventions">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Area', 'Classes', 'Notes'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  ['Page container', 'min-h-full bg-slate-50 flex flex-col', 'Full-viewport-height page shell'],
                  ['Card', 'w-full bg-white rounded-3xl shadow-xl flex flex-col md:flex-row h-[85vh]', 'The wizard card — 85% viewport height'],
                  ['Left sidebar', 'w-full md:w-80 bg-slate-900 p-8 text-white', 'Full-width on mobile, 320px on desktop'],
                  ['Right content', 'flex-1 flex flex-col h-full bg-white', 'Expands to fill remaining card width'],
                  ['Content header', 'px-10 py-8 border-b border-slate-50', 'Step title + progress indicator'],
                  ['Content body', 'flex-1 overflow-y-auto px-10 py-6', 'Scrollable step form content'],
                  ['Footer nav', 'px-10 py-6 border-t border-slate-50', 'Back / Next / Submit buttons'],
                  ['Outer page pad', 'max-w-7xl mx-auto w-full px-6 md:px-0', 'Back link container above the card'],
                ].map(([area, classes, notes]) => (
                  <tr key={String(area)} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3 text-xs font-semibold text-slate-700">{area}</td>
                    <td className="px-5 py-3"><code className="font-mono text-[11px] text-brand-blue break-all">{classes}</code></td>
                    <td className="px-5 py-3 text-xs font-medium text-slate-500">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GallerySection>

        {/* Implementation ── */}
        <GallerySection id="implementation" title="Implementation" description="The wizard layout is inline in OnboardingWizardPage.tsx. Copy the structural pattern below.">
          <Showcase code={CODE.structure} language="tsx" title="Full page structure" center={false}>
            <div className="w-full">
              <WizardDemo />
            </div>
          </Showcase>
          <Showcase code={CODE.stepSidebar} language="tsx" title="Step sidebar with ARIA" center={false}>
            <div className="w-full">
              <WizardDemo />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Step buttons', [
                'Each step button has aria-current="step" when it is the active step.',
                'Completed and upcoming steps have disabled={true} when not navigable.',
                'Connector lines and icon graphics have aria-hidden="true".',
              ]],
              ['Focus management', [
                'When a step\'s form content changes, focus is not automatically managed — engineers should move focus to the first form field of the new step.',
                'OnboardingWizardPage uses a ref + requestAnimationFrame focus approach for the profile label field.',
              ]],
              ['Navigation', [
                'Back and Next buttons are standard <button type="button"> — keyboard accessible.',
                'The wizard traps no focus — Escape does not close it (it is a full-page route, not a modal).',
              ]],
              ['Responsive behavior', [
                'The sidebar collapses to full-width on mobile. The card becomes a vertical stack (flex-col on small viewports, md:flex-row on desktop).',
                'On mobile, the sidebar renders above the content area.',
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

        {/* Related ── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
