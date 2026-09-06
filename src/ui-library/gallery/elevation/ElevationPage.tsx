/**
 * ElevationPage — Gallery infrastructure (Foundations)
 *
 * Documents shadow/elevation styles in UHRIS.
 * Migrated from ShadowsDocumentation.tsx.
 * Gallery ID: elevation, User-facing title: Elevation.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['colors', 'radius', 'card', 'modal']);

// ── Page ───────────────────────────────────────────────────────────────────

export default function ElevationPage() {
  return (
    <GalleryLayout activeId="elevation">
      <title>Elevation — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Foundations"
          name="Elevation"
          description="How depth works in UHRIS. Cards lift with shadow-sm, modals and dropdowns float with shadow-xl, and buttons carry colored shadows that match their fill. Here's the full reference."
          status="complete"
        />

        {/* Visual examples ── */}
        <GallerySection
          id="examples"
          title="Shadow Hierarchy"
          description="Visual comparison of shadow levels used in UHRIS."
        >
          <ShowcasePreview standalone>
            <div className="flex flex-wrap items-start gap-8 p-4">
              {[
                { label: 'shadow-sm',                        cls: 'shadow-sm',                         desc: 'Surface (card, panel)' },
                { label: 'shadow-xl',                        cls: 'shadow-xl',                         desc: 'Float (modal, dropdown)' },
                { label: 'shadow-lg shadow-brand-blue/20',   cls: 'shadow-lg shadow-brand-blue/20',    desc: 'Button — primary (brand blue)' },
                { label: 'shadow-lg shadow-slate-200',       cls: 'shadow-lg shadow-slate-200',        desc: 'Button — dark' },
                { label: 'shadow-lg shadow-rose-100',        cls: 'shadow-lg shadow-rose-100',         desc: 'Button — danger' },
              ].map(({ label, cls, desc }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div
                    className={`h-14 w-20 rounded-xl bg-white border border-slate-100 ${cls}`}
                    aria-hidden="true"
                  />
                  <div className="text-center">
                    <p className="font-mono text-[10px] text-slate-600 font-bold">{label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Tailwind shadow classes ── */}
        <GallerySection
          id="tailwind"
          title="Tailwind Shadow Classes"
          description="Shadow tokens used in Tailwind-system components."
        >
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Elevation level', 'Semantic purpose', 'Used for'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ['shadow-sm', 'Surface elevation', 'card token, panel token, outline button, segmented active button'],
                    ['shadow-xl', 'Float elevation', 'modal panel, dropdown menus'],
                    ['shadow-lg shadow-brand-blue/20', 'Branded button shadow (primary)', 'Primary button — brand blue'],
                    ['shadow-lg shadow-brand-blue/15', 'Branded icon-well shadow', 'Page header icon well'],
                    ['shadow-lg shadow-slate-200', 'Branded button shadow (dark)', 'Dark button'],
                    ['shadow-lg shadow-rose-100', 'Branded button shadow (danger)', 'Danger button'],
                  ].map(([cls, purpose, usedFor]) => (
                    <tr key={String(cls)} className="hover:bg-slate-50/60">
                      <td className="px-5 py-3">
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-800">{cls}</code>
                      </td>
                      <td className="px-5 py-3 text-xs font-medium text-slate-700">{purpose}</td>
                      <td className="px-5 py-3 text-xs font-medium leading-relaxed text-slate-600">{usedFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GallerySection>

        <GallerySection
          id="css"
          title="Legacy Shadow Values"
          description="Shadows in the CSS class system used by older layout areas. Not used in new Tailwind-system components."
        >
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-sm font-semibold text-amber-800">Legacy system</p>
            <p className="mt-1 text-sm font-medium text-amber-700">
              These areas use hardcoded box-shadow values defined in index.css. New components use Tailwind shadow tokens instead.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200 mt-4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Legacy area', 'Elevation character', 'Purpose'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ['Dashboard / settings cards', 'Minimal lift (1px)', 'Dashboard card and settings panel elevation'],
                    ['CSS-system modal', 'Strong float (20px)', 'Legacy modal elevated above page'],
                    ['Login card', 'Deep float (25px)', 'Login page card prominent elevation'],
                    ['Sidebar logo icon', 'Branded lift', 'Sidebar logo icon elevation'],
                    ['Date picker popup', 'Float + detail shadow', 'Date picker popup elevation'],
                    ['Hovered setup card', 'Hover lift', 'Approval setup card hover state'],
                    ['Expanded role card', 'Branded hover', 'Expanded RBAC role card'],
                    ['CSS primary button', 'Button lift', 'CSS-system primary button shadow'],
                  ].map(([area, character, purpose]) => (
                    <tr key={String(area)} className="hover:bg-slate-50/60">
                      <td className="px-5 py-3 text-xs font-medium text-slate-700">{area}</td>
                      <td className="px-5 py-3 text-xs font-medium text-slate-600">{character}</td>
                      <td className="px-5 py-3 text-xs font-medium text-slate-600">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
