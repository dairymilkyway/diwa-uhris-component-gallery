/**
 * BannerPage — Gallery (Layout)
 *
 * Documents the Page Banner pattern: a text-based page header treatment
 * using brand colors through typography and accents — no filled navy surface.
 *
 * Architecture: ButtonPage pattern
 *   Header → Overview (visual only) → Variants (each = Showcase) → Accessibility → Related
 */

import { useState } from 'react';
import { Download, UserPlus, Check } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['page-header', 'form-sample', 'page-sample', 'wizard-layout']);

// ── Banner primitives ──────────────────────────────────────────────────────

/** Basic — eyebrow + title + subtitle, text-based on white */
function BannerBasic() {
  return (
    <div className="w-full border-b border-slate-200 bg-white pb-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">
        Human Resources
      </p>
      <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-navy">
        Employee Directory
      </h2>
      <p className="mt-1.5 text-base font-medium text-slate-500">
        Manage, filter, and track all team members.
      </p>
    </div>
  );
}

/** With actions — eyebrow + title + subtitle + action buttons */
function BannerWithActions() {
  return (
    <div className="w-full border-b border-slate-200 bg-white pb-6 flex items-end justify-between gap-4 flex-wrap">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">
          Human Resources
        </p>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-navy">
          Employee Directory
        </h2>
        <p className="mt-1.5 text-base font-medium text-slate-500">
          Manage, filter, and track all team members.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button type="button"
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/20">
          <Download size={14} aria-hidden="true" /> Export
        </button>
        <button type="button"
          className="flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30">
          <UserPlus size={14} aria-hidden="true" /> Add Employee
        </button>
      </div>
    </div>
  );
}

/** With accent strip — brand-blue left border, no filled background */
function BannerWithAccent() {
  return (
    <div className="w-full bg-white pb-6">
      <div className="border-l-4 border-brand-blue pl-5">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">
          Employee Profile
        </p>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-navy">
          New Employee
        </h2>
        <p className="mt-1.5 text-base font-medium text-slate-500">
          Complete all sections to create the employee record.
        </p>
      </div>
    </div>
  );
}

/** With progress — accent strip + completion progress bar */
function BannerWithProgress({ completed = 2, total = 4 }: {
  completed?: number; total?: number;
}) {
  const pct = Math.round((completed / total) * 100);
  return (
    <div className="w-full bg-white pb-6">
      <div className="border-l-4 border-brand-blue pl-5">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">
          Employee Profile
        </p>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-navy">
          Maria Santos
        </h2>
        <p className="mt-1.5 text-base font-medium text-slate-500">
          Complete all sections to finish the employee profile setup.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 max-w-xs">
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Form completion progress"
            >
              <div
                className="h-full rounded-full bg-brand-blue transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-bold text-slate-500 tabular-nums whitespace-nowrap">
            {completed}/{total} sections · {pct}%
          </span>
        </div>
      </div>
    </div>
  );
}

/** With step indicators — inline step track below the heading */
function BannerWithSteps() {
  const [current, setCurrent] = useState(2);
  const steps = ['Details', 'Employment', 'Org & Pay', 'Review'];
  return (
    <div className="w-full bg-white pb-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">
        New Employee
      </p>
      <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-navy">
        Onboarding Wizard
      </h2>
      <div className="mt-4 flex items-center gap-1">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const done    = stepNum < current;
          const active  = stepNum === current;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setCurrent(stepNum)}
              className="flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 rounded"
            >
              <div className={[
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold border-2 transition',
                done   ? 'bg-emerald-500 border-emerald-500 text-white' :
                active ? 'bg-brand-blue  border-brand-blue  text-white' :
                         'bg-white       border-slate-300   text-slate-400',
              ].join(' ')} aria-hidden="true">
                {done ? <Check size={10} strokeWidth={3} /> : stepNum}
              </div>
              <span className={`hidden sm:inline text-xs font-bold transition ${
                active ? 'text-brand-navy' : done ? 'text-slate-400' : 'text-slate-400'
              }`}>
                {label}
              </span>
              {i < steps.length - 1 && (
                <div className={`hidden sm:block h-px w-8 mx-1 ${done ? 'bg-emerald-300' : 'bg-slate-200'}`} aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Overview — all variants stacked ───────────────────────────────────────

function OverviewDemo() {
  return (
    <div className="w-full space-y-8">
      <BannerBasic />
      <BannerWithActions />
      <BannerWithAccent />
      <BannerWithProgress />
      <BannerWithSteps />
    </div>
  );
}

// ── Code strings ───────────────────────────────────────────────────────────

const CODE = {
  basic: `// Basic banner — eyebrow + title + subtitle
// Text-based on white. brand-sky eyebrow, brand-navy heading.

<div className="border-b border-slate-200 bg-white pb-6">
  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">
    Human Resources
  </p>
  <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-navy">
    Employee Directory
  </h2>
  <p className="mt-1.5 text-base font-medium text-slate-500">
    Manage, filter, and track all team members.
  </p>
</div>`,

  withActions: `// Banner with actions — outline secondary, brand-blue primary
// Actions float right on desktop, stack below on mobile (flex-wrap)

<div className="border-b border-slate-200 bg-white pb-6 flex items-end justify-between gap-4 flex-wrap">
  <div>
    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">
      Human Resources
    </p>
    <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-navy">
      Employee Directory
    </h2>
    <p className="mt-1.5 text-base font-medium text-slate-500">
      Manage, filter, and track all team members.
    </p>
  </div>

  <div className="flex items-center gap-2 shrink-0">
    <button className="... border border-slate-200 text-slate-600 hover:bg-slate-50">
      <Download size={14} aria-hidden="true" /> Export
    </button>
    <button className="... bg-brand-blue text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-navy">
      <UserPlus size={14} aria-hidden="true" /> Add Employee
    </button>
  </div>
</div>`,

  withAccent: `// Banner with brand-blue left accent strip
// border-l-4 border-brand-blue instead of a filled surface

<div className="bg-white pb-6">
  <div className="border-l-4 border-brand-blue pl-5">
    <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">
      Employee Profile
    </p>
    <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-navy">
      New Employee
    </h2>
    <p className="mt-1.5 text-base font-medium text-slate-500">
      Complete all sections to create the employee record.
    </p>
  </div>
</div>`,

  withProgress: `// Banner with progress bar — accent strip + completion track
// Progress bar on slate-200 track, brand-blue fill

<div className="bg-white pb-6">
  <div className="border-l-4 border-brand-blue pl-5">
    <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">
      Employee Profile
    </p>
    <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-navy">
      {employeeName}
    </h2>

    <div className="mt-4 flex items-center gap-4">
      <div className="flex-1 max-w-xs">
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Form completion progress"
        >
          <div
            className="h-full rounded-full bg-brand-blue transition-all duration-500"
            style={{ width: \`\${pct}%\` }}
          />
        </div>
      </div>
      <span className="text-xs font-bold text-slate-500 tabular-nums">
        {completed}/{total} sections · {pct}%
      </span>
    </div>
  </div>
</div>`,

  withSteps: `// Banner with step indicators — inline step track below heading
// Click steps to change active state

<div className="bg-white pb-6">
  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">
    New Employee
  </p>
  <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-navy">
    Onboarding Wizard
  </h2>

  <div className="mt-4 flex items-center gap-1">
    {steps.map((label, i) => {
      const done   = i + 1 < currentStep;
      const active = i + 1 === currentStep;
      return (
        <button key={label} onClick={() => setCurrentStep(i + 1)}>
          <div className={
            done   ? 'h-6 w-6 rounded-full bg-emerald-500 border-emerald-500 text-white' :
            active ? 'h-6 w-6 rounded-full bg-brand-blue  border-brand-blue  text-white' :
                     'h-6 w-6 rounded-full bg-white        border-slate-300   text-slate-400'
          }>
            {done ? <Check size={10} /> : i + 1}
          </div>
          <span className={active ? 'text-brand-navy' : 'text-slate-400'}>
            {label}
          </span>
          {i < steps.length - 1 && (
            <div className={done ? 'bg-emerald-300' : 'bg-slate-200'} />
          )}
        </button>
      );
    })}
  </div>
</div>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function BannerPage() {
  return (
    <GalleryLayout activeId="banner">
      <title>Banner — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Layout"
          name="Banner"
          description="A text-based page header pattern using brand colors through typography and accents. Five variants: basic, with actions, with accent strip, with progress bar, and with step indicators."
          status="complete"
          importName={false}
        />

        {/* ── Overview ──────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="All five variants at a glance. Interact with the step indicators in the last variant."
        >
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <OverviewDemo />
          </ShowcasePreview>
        </GallerySection>

        {/* ── Variants ──────────────────────────────────────────────── */}
        <GallerySection
          id="variants"
          title="Variants"
          description="Five variants covering every HRIS use case. Copy any one independently."
        >
          <Showcase
            title="Basic"
            description="Eyebrow label, brand-navy title, and subtitle. Bottom border separates it from page content."
            code={CODE.basic}
            language="tsx"
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full">
              <BannerBasic />
            </div>
          </Showcase>

          <Showcase
            title="With Actions"
            description="Actions slot on the right. Outline secondary, brand-blue primary."
            code={CODE.withActions}
            language="tsx"
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full">
              <BannerWithActions />
            </div>
          </Showcase>

          <Showcase
            title="With Accent Strip"
            description="brand-blue left border accent strip instead of a bottom divider. Used on forms and detail pages."
            code={CODE.withAccent}
            language="tsx"
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full">
              <BannerWithAccent />
            </div>
          </Showcase>

          <Showcase
            title="With Progress"
            description="Accent strip + completion progress bar. For multi-section forms."
            code={CODE.withProgress}
            language="tsx"
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full">
              <BannerWithProgress />
            </div>
          </Showcase>

          <Showcase
            title="With Step Indicators"
            description="Inline numbered step track below the heading. Click steps to change active state."
            code={CODE.withSteps}
            language="tsx"
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full">
              <BannerWithSteps />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Accessibility ─────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {([
              ['Heading level', [
                'The banner title uses <h2> in these demos. Use <h1> when the banner is the only heading on a real page.',
                'Do not use the banner title as a decorative element — it carries the page heading semantics.',
              ]],
              ['Action buttons', [
                'All action buttons have visible text labels — no icon-only buttons in the banner.',
                'Outline secondary buttons maintain sufficient contrast against the white background.',
              ]],
              ['Progress bar', [
                'Uses role="progressbar" with aria-valuenow, aria-valuemin, aria-valuemax, and aria-label.',
              ]],
              ['Step indicators', [
                'Step indicator buttons are interactive — each has a visible focus ring via focus-visible.',
                'Completed steps show a checkmark icon. Mark the icon aria-hidden="true" — the step number communicates the same information to screen readers.',
              ]],
            ] as [string, string[]][]).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{heading}</h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
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

        {/* ── Related ───────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
