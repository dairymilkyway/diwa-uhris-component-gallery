/**
 * MotionPage — Gallery infrastructure (Foundations)
 *
 * Documents reusable CSS animations and transition conventions in UHRIS.
 * Migrated from MotionDocumentation.tsx.
 *
 * IMPORTANT: CN-4 accessibility limitation is preserved exactly as documented.
 * Only .os-fade and .os-pop have prefers-reduced-motion overrides.
 * This page documents current implementation — it does NOT fix anything.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['colors', 'modal', 'field', 'spinner']);

// ── Animation showcase with replay ────────────────────────────────────────

function AnimationShowcase() {
  // Each entry-style animation plays once then holds its final state for 10s
  // before the next iteration — producing a natural "play → pause → play" loop.
  // animationFillMode 'both' keeps the element at its final frame during the pause.
  const delayed = (playDuration: string) => ({
    animationDuration: `calc(${playDuration} + 10s)`,
    animationIterationCount: 'infinite' as const,
    animationFillMode: 'both' as const,
  });

  return (
    <ShowcasePreview standalone>
      <div className="flex flex-wrap items-end gap-10">

        {/* Existing animations */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="h-10 w-24 rounded-xl bg-blue-50 border border-brand-sky/30 os-pop"
            style={delayed('0.2s')}
            aria-hidden="true"
          />
          <p className="text-[10px] font-mono text-slate-400">.os-pop</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-4 w-28 rounded skeleton" aria-hidden="true" />
          <p className="text-[10px] font-mono text-slate-400">.skeleton</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-full border-4 border-slate-200 border-t-brand-blue animate-spin" aria-hidden="true" />
          <p className="text-[10px] font-mono text-slate-400">animate-spin</p>
        </div>

        {/* Divider */}
        <div className="w-px h-12 bg-slate-200 self-center" aria-hidden="true" />

        {/* New animations */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="h-10 w-24 rounded-xl bg-brand-blue/10 border border-brand-blue/20 os-slide-up"
            style={delayed('0.22s')}
            aria-hidden="true"
          />
          <p className="text-[10px] font-mono text-slate-400">.os-slide-up</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div
            className="h-10 w-24 rounded-xl bg-brand-sky/10 border border-brand-sky/25 os-slide-in-right"
            style={delayed('0.22s')}
            aria-hidden="true"
          />
          <p className="text-[10px] font-mono text-slate-400">.os-slide-in-right</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-300 os-bounce-in"
            style={delayed('0.35s')}
            aria-hidden="true"
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5 text-emerald-500" aria-hidden="true">
              <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[10px] font-mono text-slate-400">.os-bounce-in</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div
            className="h-3 w-32 rounded-full bg-brand-blue/20 os-bar-in"
            style={delayed('0.22s')}
            aria-hidden="true"
          />
          <p className="text-[10px] font-mono text-slate-400">.os-bar-in</p>
        </div>

      </div>
    </ShowcasePreview>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function MotionPage() {
  return (
    <GalleryLayout activeId="motion">
      <title>Motion — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Foundations"
          name="Motion"
          description="Every reusable animation lives as a CSS class. Add .os-pop to an overlay, .os-slide-up to a panel, .os-bounce-in to a success icon — the motion handles itself. Reduced-motion coverage is documented here too."
          status="complete"
        />

        {/* Animation table ── */}
        <GallerySection
          id="animations"
          title="Animation Reference"
          description="All named animations used in UHRIS."
        >
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Animation name', 'Effect', 'Duration / Easing', 'Used in', 'Reduced motion'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ['.os-fade',           'opacity 0→1',                              '0.16s ease-out',                       'Modal / overlay backdrop',                         '✅ animation: none'],
                    ['.os-pop',            'opacity + translateY + scale → visible',   '0.2s cubic-bezier(0.16,1,0.3,1)',      'Modal / overlay panel',                            '✅ animation: none'],
                    ['.os-slide-up',       'opacity + translateY → visible',           '0.22s cubic-bezier(0.16,1,0.3,1)',     'Bottom sheets, toast stacks, content panels',       '✅ animation: none'],
                    ['.os-slide-in-right', 'opacity + translateX → visible',           '0.22s cubic-bezier(0.16,1,0.3,1)',     'Side panels, right-edge drawers',                  '✅ animation: none'],
                    ['.os-bounce-in',      'scale 0.85 → spring overshoot → 1',        '0.35s cubic-bezier(0.34,1.56,0.64,1)', 'Confirmation icons, success badges, callouts',     '✅ animation: none'],
                    ['.os-bar-in',         'opacity 0→1 + scaleX 0→1 (left origin)',   '0.22s cubic-bezier(0.16,1,0.3,1)',     'BarList bars',                             '✅ animation: none'],
                    ['.shake',             'horizontal oscillation',                   '0.4s ease-in-out',                    'Form field — on validation error',                 '⚠ No override'],
                    ['.skeleton',          'background shimmer',                       '1.5s infinite',                       'Loading skeleton placeholders',                    '⚠ No override'],
                    ['.skeleton-bar',      'opacity pulse',                            '1.4s infinite',                       'Inline skeleton bars',                             '⚠ No override'],
                    ['.spin',              'full rotation',                            '1s linear infinite',                  'Legacy CSS loading spinners',                      '⚠ No override'],
                    ['animate-spin',       'full rotation (Tailwind)',                 '1s linear infinite',                  'Spinner component, inline loading icons',          '⚠ No override'],
                    ['slideUpModal',       'opacity + translateY + scale → visible',   '0.25s cubic-bezier(0.16,1,0.3,1)',    'Legacy CSS-system modals',                         '⚠ No override'],
                    ['fadeIn',             'opacity + translateY → visible',           '0.2s ease',                           'Settings tab content panels',                      '⚠ No override'],
                    ['datepickerIn',       'opacity + translateY + scale → visible',   '0.2s cubic-bezier(0.16,1,0.3,1)',     'Date picker popup',                               '⚠ No override'],
                    ['slideDown',          'opacity + translateY → visible',           '0.25s ease',                          'Toast notifications',                              '⚠ No override'],
                  ].map(([name, effect, timing, usedIn, reducedMotion]) => (
                    <tr key={String(name)} className={`hover:bg-slate-50/60 ${String(name).startsWith('.os-') ? 'bg-emerald-50/20' : ''}`}>
                      <td className="px-4 py-3">
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-800">{name}</code>
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-slate-600 max-w-[180px]">{effect}</td>
                      <td className="px-4 py-3 text-xs font-mono text-slate-500 whitespace-nowrap">{timing}</td>
                      <td className="px-4 py-3 text-xs font-medium text-slate-600 max-w-[200px]">{usedIn}</td>
                      <td className="px-4 py-3 text-xs font-medium">
                        <span className={String(reducedMotion).startsWith('✅') ? 'text-emerald-700' : 'text-amber-600'}>
                          {reducedMotion}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GallerySection>

        {/* Live examples ── */}
        <GallerySection
          id="examples"
          title="Live Examples"
          description="Animations playing continuously. Existing animations are shown alongside the new additions."
        >
          <AnimationShowcase />
        </GallerySection>

        {/* Accessibility warning — CN-4 ── */}
        <GallerySection id="accessibility" title="Accessibility — CN-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 space-y-3">
            <p className="text-sm font-bold text-amber-800">
              Known limitation: incomplete prefers-reduced-motion coverage
            </p>
            <p className="text-sm font-medium text-amber-700">
              The six <code className="font-mono text-xs" style={{ background: 'transparent', padding: 0 }}>.os-*</code> animations
              all have <code className="font-mono text-xs" style={{ background: 'transparent', padding: 0 }}>@media (prefers-reduced-motion: reduce) {'{'} animation: none {'}'}</code> overrides.
            </p>
            <p className="text-sm font-medium text-amber-700">
              The remaining animations (.shake, .skeleton, slideUpModal, fadeIn, datepickerIn,
              slideDown, animate-spin, animate-pulse) fire regardless of the user's motion preference.
            </p>
            <p className="text-sm font-medium text-amber-700">
              Adding reduced-motion overrides to the remaining animations is tracked as future work.
            </p>
          </div>
        </GallerySection>

        {/* Related ── */}
        <GallerySection id="related" title="Related">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
