/**
 * RadiusPage — Gallery infrastructure (Foundations)
 *
 * Documents border radius values used across UHRIS.
 * Migrated from RadiusDocumentation.tsx.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['colors', 'elevation', 'spacing']);

// ── Page ───────────────────────────────────────────────────────────────────

export default function RadiusPage() {
  return (
    <GalleryLayout activeId="radius">
      <title>Radius — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Foundations"
          name="Radius"
          description="Bigger containers get bigger radii. rounded-xl (12px) is the standard for new components — buttons, cards, inputs, and dropdowns all use it. Here's where every other value shows up."
          status="complete"
        />

        {/* Visual scale ── */}
        <GallerySection
          id="scale"
          title="Radius Scale"
          description="All border radius values in use across UHRIS."
        >
          <ShowcasePreview standalone>
            <div className="flex flex-wrap items-end gap-6">
              {[
                { label: 'rounded-lg (8px)',    cls: 'rounded-lg'  },
                { label: 'rounded-xl (12px)',   cls: 'rounded-xl'  },
                { label: 'rounded-2xl (16px)',  cls: 'rounded-2xl' },
                { label: 'rounded-3xl (24px)',  cls: 'rounded-3xl' },
                { label: 'rounded-full (pill)', cls: 'rounded-full'},
              ].map(({ label, cls }) => (
                <div key={cls} className="flex flex-col items-center gap-2">
                  <div
                    className={`h-14 w-20 bg-blue-50 border-2 border-brand-sky/30 ${cls}`}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] text-slate-500 text-center max-w-[96px] leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </ShowcasePreview>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Radius token', 'CSS equivalent', 'Used for'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ['rounded-full', '9999px', 'Badge (pill shape), .setup-status pill, pagination active button, avatar circle variants'],
                    ['rounded-3xl', '24px', 'Wizard container card, login card (CSS: 24px)'],
                    ['rounded-2xl', '16px', 'ErrorBanner, EmptyState dashed border, Spinner icon well'],
                    ['rounded-xl ★', '12px', 'Standard card/component radius: card token, panel token, field token, all button tokens, modalPanelBase, segmentedTrack, ActionMenu dropdown, PisSelect dropdown'],
                    ['rounded-lg', '8px', 'iconBtn, dangerIconBtn, editIconBtn, modal close button, PisSelect inner search input'],
                    ['CSS 6px', '6px', '.status-badge, .role-badge, .perm-badge, .code-badge, date picker nav button'],
                    ['CSS 8px', '8px', '.role-badge (some variants), .form-checkbox input, .sidebar-close'],
                    ['CSS 10px', '10px', '.nav-item, .user-info, .logout-btn, .field-input, .filter-select, .search-input'],
                    ['CSS 12px', '12px', '.demo-card, .input-wrap input, .error-msg, .submit-btn, .login-logo, .role-card, .module-card'],
                    ['CSS 16px', '16px', '.info-card, .settings-panel, .form-section, .setup-card, .data-table-wrap, .settings-toolbar'],
                    ['CSS 20px', '20px', '.modal-card (CSS-system modal)'],
                    ['CSS 50%', '50%', '.user-avatar-circle (perfect circle)'],
                  ].map(([cls, px, use]) => (
                    <tr key={String(cls)} className={`hover:bg-slate-50/60 ${String(cls).includes('★') ? 'bg-blue-50/30' : ''}`}>
                      <td className="px-5 py-3">
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-800">{String(cls).replace(' ★', '')}</code>
                        {String(cls).includes('★') && (
                          <span className="ml-2 text-[10px] font-bold text-brand-blue uppercase tracking-wider">Standard</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-xs font-mono text-slate-500">{px}</td>
                      <td className="px-5 py-3 text-xs font-medium leading-relaxed text-slate-600">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500">
            ★ <code className="rounded bg-slate-100 px-1 font-mono text-xs">rounded-xl</code> is the standard radius for new Tailwind-system components. Use it for cards, inputs, buttons, and dropdowns.
          </p>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Notes">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            {[
              'Border radius is purely decorative — no ARIA implications.',
              'Do not use rounded-none on interactive components; visible corners help users perceive affordances.',
              'Do not introduce new radius values outside those documented above.',
              'Do not change .field-input or other CSS-system radius values in production code when targeting only appearance.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                {item}
              </div>
            ))}
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
