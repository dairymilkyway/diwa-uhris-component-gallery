/**
 * TypographyPage — Gallery (Foundations)
 *
 * Documents the UHRIS/DIWA typography system.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['colors', 'badge', 'field']);

// ── Type scale live examples ───────────────────────────────────────────────

function TypeScale() {
  const entries = [
    {
      label: 'Display / Page Heading',
      role:  'Heading',
      classes: 'font-heading text-4xl font-bold tracking-tight text-brand-navy',
      sample: 'Employee Directory',
    },
    {
      label: 'Section Heading (H2)',
      role:  'Heading',
      classes: 'font-heading text-2xl font-bold tracking-tight text-brand-navy',
      sample: 'Organisation Structure',
    },
    {
      label: 'Sub-heading / Modal Title',
      role:  'Heading',
      classes: 'font-heading text-xl font-bold text-slate-900',
      sample: 'Edit Employee Record',
    },
    {
      label: 'Card / Section Title',
      role:  'Body',
      classes: 'text-base font-bold text-slate-900',
      sample: 'Personal Information',
    },
    {
      label: 'Body / Input values',
      role:  'Body',
      classes: 'text-sm font-medium text-slate-900',
      sample: 'Full-time employment',
    },
    {
      label: 'Page subtitle',
      role:  'Body',
      classes: 'text-sm font-medium text-slate-500',
      sample: 'Manage team members and filter by status.',
    },
    {
      label: 'Table header',
      role:  'Body',
      classes: 'text-[11px] font-bold uppercase tracking-widest text-slate-500',
      sample: 'DEPARTMENT',
    },
    {
      label: 'Badge / chip label',
      role:  'Body',
      classes: 'text-[10px] font-bold uppercase tracking-wider',
      sample: 'ACTIVE',
    },
    {
      label: 'Field label',
      role:  'Body',
      classes: 'text-xs font-bold text-slate-500 uppercase tracking-wide',
      sample: 'EMPLOYMENT TYPE',
    },
    {
      label: 'Field hint / error',
      role:  'Body',
      classes: 'text-[11px] font-semibold text-rose-500',
      sample: 'This field is required.',
    },
    {
      label: 'Navigation / Breadcrumb',
      role:  'Body',
      classes: 'text-[13px] font-semibold text-slate-400',
      sample: 'Org Structure',
    },
  ];

  const roleColor: Record<string, string> = {
    'Heading': 'bg-brand-navy/8 text-brand-navy border border-brand-navy/15',
    'Body':    'bg-slate-100 text-slate-600 border border-slate-200',
  };

  return (
    <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden">
      {entries.map(({ label, role, classes, sample }) => (
        <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4">
          {/* Label + role */}
          <div className="w-52 shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
            <span className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${roleColor[role]}`}>
              {role}
            </span>
          </div>
          {/* Live sample */}
          <div className="flex-1 min-w-0">
            <p className={classes}>{sample}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function TypographyPage() {
  return (
    <GalleryLayout activeId="typography">
      <title>Typography — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Foundations"
          name="Typography"
          description="Two typefaces, a clear type scale, and rules for when to use each. Barlow for headings, Libre Franklin for UI and body — here's how they work together."
          status="complete"
        />

        {/* ── Brand Typography ──────────────────────────────────────────── */}
        <GallerySection
          id="brand"
          title="Brand Typefaces"
          description="The official typography hierarchy uses two typefaces with distinct roles."
        >
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden divide-y divide-slate-100">

            {/* Heading font */}
            <div className="flex items-start gap-6 px-6 py-6">
              <div className="w-52 shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Display &amp; Headings</p>
                <p className="font-heading text-sm font-bold text-slate-800">Helvetica Neue (85)</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Digital: Barlow 700/800</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {['Headlines', 'Headings', 'Sub-headings'].map(r => (
                    <span key={r} className="rounded bg-brand-navy/8 border border-brand-navy/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-navy">{r}</span>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <p className="font-heading text-4xl font-bold tracking-tight text-brand-navy">UHRIS Design System</p>
                <p className="font-heading text-2xl font-bold text-brand-navy">Organisation Structure</p>
                <p className="font-heading text-xl font-bold text-slate-800">Section Heading Level 3</p>
              </div>
            </div>

            {/* Body font */}
            <div className="flex items-start gap-6 px-6 py-6">
              <div className="w-52 shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Titles, Body &amp; UI</p>
                <p className="text-sm font-bold text-slate-800">ITC Franklin Gothic Std</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Digital: Libre Franklin</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {['Titles', 'Body', 'Labels', 'UI'].map(r => (
                    <span key={r} className="rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600">{r}</span>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <p className="text-base font-bold text-slate-900">Personal Information</p>
                <p className="text-sm font-medium text-slate-700">Full-time employment — Human Resources Division</p>
                <p className="text-sm font-medium text-slate-500">Manage team members and apply filters to find employees quickly.</p>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Employment Type</p>
              </div>
            </div>

            {/* Code — technical role */}
            <div className="flex items-start gap-6 px-6 py-6">
              <div className="w-52 shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Technical / Code</p>
                <p className="text-sm font-bold text-slate-800">System Monospace</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Not a brand typeface</p>
                <div className="mt-2">
                  <span className="rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600">Code only</span>
                </div>
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <p className="font-mono text-sm text-slate-700">EMP-0042 &nbsp; PHI-123456789 &nbsp; TIN-000-000-000</p>
                <code className="font-mono text-xs text-slate-500">font-heading text-4xl font-bold text-brand-navy</code>
              </div>
            </div>

          </div>
        </GallerySection>

        {/* ── Implementation note ───────────────────────────────────────── */}
        <GallerySection id="implementation-note" title="Font Implementation">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 space-y-2">
            <p className="text-sm font-bold text-amber-800">Commercial fonts — digital fallback active</p>
            <p className="text-sm font-medium text-amber-700 leading-relaxed">
              The official brand typefaces are commercial fonts requiring a separate license. The digital implementation uses open-license equivalents that preserve the intended visual character.
            </p>
            <ul className="mt-2 space-y-1">
              {[
                'Helvetica Neue (85) → Barlow 700/800 — neo-grotesque, commanding at display weight',
                'ITC Franklin Gothic Std → Libre Franklin — humanist gothic, matching body character',
              ].map(line => (
                <li key={line} className="flex items-start gap-2 text-sm font-medium text-amber-700">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="text-sm font-medium text-amber-700 leading-relaxed mt-1">
              When the licensed fonts are available, replace the digital fallbacks in <code className="font-mono text-xs bg-amber-100 px-1 rounded">tailwind.config.js</code> fontFamily.heading and fontFamily.body — all component classes will update automatically.
            </p>
          </div>
        </GallerySection>

        {/* ── Type scale ────────────────────────────────────────────────── */}
        <GallerySection
          id="scale"
          title="Type Scale"
          description="Every typographic context in UHRIS — size, weight, tracking, and role."
        >
          <TypeScale />
        </GallerySection>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Minimum sizes', [
                'text-[10px] (0.625rem / ~10px) is the smallest size used — labels and badges only.',
                'Body text and inputs use text-sm (0.875rem) minimum.',
              ]],
              ['Minimum weights', [
                'Minimum weight for interactive UI text is font-medium (500).',
                'font-normal (400) is not used in component UI.',
              ]],
              ['Heading hierarchy', [
                'Always apply font-heading to H1, H2, and prominent H3 elements.',
                'The visual distinction between heading and body fonts is part of the brand hierarchy — do not flatten it.',
              ]],
              ['Color contrast', [
                'text-slate-400 on white is 2.85:1 — use for decorative labels only (AA Large at 3:1).',
                'Use text-slate-500 or darker for body copy that must meet WCAG AA (4.5:1).',
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

        {/* ── Related ───────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
