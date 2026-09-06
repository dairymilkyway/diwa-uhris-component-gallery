/**
 * SpacingPage — Gallery infrastructure (Foundations)
 *
 * Documents the spacing conventions used in UHRIS.
 * Migrated from SpacingDocumentation.tsx.
 *
 * No custom spacing scale exists. Values are Tailwind default scale
 * applied consistently enough to constitute conventions.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['colors', 'typography', 'radius']);

// ── Visual spacing demo helper ─────────────────────────────────────────────

function SpacingBlock({ label, size, px }: { label: string; size: string; px: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="bg-brand-sky/20 border border-brand-sky/30 rounded"
        style={{ width: px, height: '20px', minWidth: px }}
        aria-hidden="true"
      />
      <div>
        <code className="font-mono text-xs font-bold text-slate-800">{label}</code>
        <span className="ml-2 text-xs text-slate-400">{size} = {px}</span>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function SpacingPage() {
  return (
    <GalleryLayout activeId="spacing">
      <title>Spacing — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Foundations"
          name="Spacing"
          description="No custom spacing tokens — just consistent conventions on top of Tailwind's default scale. Here's which values we use, where we use them, and what to avoid."
          status="complete"
        />

        {/* Visual scale ── */}
        <GallerySection
          id="scale"
          title="Scale Reference"
          description="Commonly used spacing values in UHRIS. All are Tailwind defaults — no custom scale."
        >
          <ShowcasePreview standalone>
            <div className="space-y-3 p-2">
              <SpacingBlock label="space-1 / p-1"   size="0.25rem" px="4px"  />
              <SpacingBlock label="space-1.5"        size="0.375rem" px="6px" />
              <SpacingBlock label="space-2 / gap-2"  size="0.5rem"  px="8px"  />
              <SpacingBlock label="space-3 / gap-3"  size="0.75rem" px="12px" />
              <SpacingBlock label="space-4 / gap-4"  size="1rem"    px="16px" />
              <SpacingBlock label="space-5 / px-5"   size="1.25rem" px="20px" />
              <SpacingBlock label="space-6"          size="1.5rem"  px="24px" />
              <SpacingBlock label="space-8 / space-y-8" size="2rem" px="32px" />
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Exported token spacing ── */}
        <GallerySection
          id="tokens"
          title="Exported Token Spacing"
          description="Spacing values baked into the ui.tsx token strings. These are applied automatically when you use the tokens."
        >
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Token', 'Rendered values'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ['field', '16px horizontal, 12px vertical'],
                    ['btnPrimary, btnDark, btnOutline, btnDanger', '16px h, 10px v, 8px icon gap'],
                    ['iconBtn, dangerIconBtn, editIconBtn', '8px all sides'],
                    ['tableToolbar', '20px h, 16px v, 12px item gap'],
                    ['tableCell', '20px horizontal, 12px vertical'],
                    ['label', '6px bottom margin'],
                    ['segmentedTrack', '4px internal padding'],
                  ].map(([token, values]) => (
                    <tr key={String(token)} className="hover:bg-slate-50/60">
                      <td className="px-5 py-3">
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-800">{token}</code>
                      </td>
                      <td className="px-5 py-3 text-xs font-medium text-slate-600">{values}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GallerySection>

        {/* Page-level conventions ── */}
        <GallerySection
          id="conventions"
          title="Page-Level Spacing Conventions"
          description="Consistent spacing patterns used across UHRIS pages."
        >
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Context', 'Value', 'Used for'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ['Major section gap', '32px vertical', 'Between top-level page sections'],
                    ['Form field internal', '6px', 'Label → input → error message stack in Field'],
                    ['Form grid gap', '16px', 'Two-column form grid inside modals'],
                    ['Button row gap', '12px', 'Action button groups in modal footers'],
                    ['Inline icon-text gap', '8px', 'Icon + label in buttons'],
                  ].map(([ctx, val, use]) => (
                    <tr key={String(ctx)} className="hover:bg-slate-50/60">
                      <td className="px-5 py-3 text-xs font-medium text-slate-700">{ctx}</td>
                      <td className="px-5 py-3 text-xs font-mono text-slate-500">{val}</td>
                      <td className="px-5 py-3 text-xs font-medium text-slate-600">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GallerySection>

        {/* CSS system (legacy) ── */}
        <GallerySection
          id="css-system"
          title="CSS Class System (Legacy)"
          description="Spacing values in the CSS class system used by the layout shell, settings, and approvals pages. New components should use Tailwind conventions instead."
        >
          <div className="rounded-xl border border-slate-200 bg-amber-50 px-5 py-4 mb-4">
            <p className="text-sm font-semibold text-amber-800">Legacy system</p>
            <p className="mt-1 text-sm font-medium text-amber-700">
              Do not use these for new components. Use Tailwind spacing utilities instead.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Layout area', 'Value', 'Used for'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ['Page content area', '40px (desktop) / 16px (mobile)', 'Padding — applied by Layout automatically'],
                    ['Sidebar', '260px wide', 'Fixed sidebar width'],
                    ['Sidebar header', '24px × 20px', 'Logo + title area padding'],
                    ['Sidebar nav', '8px × 12px + 20px gap', 'Navigation area padding and group spacing'],
                    ['Settings panel', '28px', 'Settings page content card'],
                    ['Modal header', '20px × 24px', 'CSS modal header padding'],
                    ['Modal body', '24px', 'CSS modal body padding'],
                    ['Modal footer', '18px × 24px', 'CSS modal footer padding'],
                    ['Two-column form grid', '16px gap', 'Two-column modal form grid'],
                  ].map(([area, val, use]) => (
                    <tr key={String(area)} className="hover:bg-slate-50/60">
                      <td className="px-5 py-3 text-xs font-medium text-slate-700">{area}</td>
                      <td className="px-5 py-3 text-xs font-mono text-slate-600">{val}</td>
                      <td className="px-5 py-3 text-xs font-medium text-slate-600">{use}</td>
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
