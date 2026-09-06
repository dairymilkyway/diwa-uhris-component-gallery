/**
 * ColorsPage — Gallery infrastructure (Foundations)
 *
 * Documents the UHRIS color system.
 *
 * Primary palette is derived from DESIGN.md — the official UHRIS brand guide.
 * Semantic application colors (success, warning, error, info) are documented
 * separately as UI system colors, distinct from the brand palette per DESIGN.md.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['badge', 'alert', 'typography']);

function Swatch({
  bg, label, hex, usage, style,
}: { bg?: string; label: string; hex?: string; usage: string; style?: React.CSSProperties }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={['h-10 w-10 shrink-0 rounded-lg border border-black/10', bg].filter(Boolean).join(' ')}
        style={style}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="text-xs font-bold text-slate-800 font-mono">{label}</p>
        {hex && <p className="text-[10px] text-slate-400 font-mono">{hex}</p>}
        <p className="text-[11px] text-slate-500 mt-0.5">{usage}</p>
      </div>
    </div>
  );
}

function SwatchGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold text-slate-700">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ColorsPage() {
  return (
    <GalleryLayout activeId="colors">
      <title>Colors — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Foundations"
          name="Colors"
          description="The complete UHRIS color system — three brand blues, five secondary accents, semantic status colors, and the neutrals that hold everything together. Start here before reaching for a custom hex value."
          status="complete"
        />

        {/* ── Brand Primary ─────────────────────────────────────────────── */}
        <GallerySection
          id="brand-primary"
          title="Brand Primary Colors"
          description="The three official blue tones and white. These establish the dominant UHRIS visual identity."
        >
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            <SwatchGroup title="Primary Blues">
              <Swatch
                style={{ backgroundColor: '#00377B' }}
                label="brand-navy"
                hex="#00377B — RGB 0/55/123"
                usage="Deep anchor blue. Dominant brand identity. Primary headings (H1), header background, most prominent brand surfaces."
              />
              <Swatch
                style={{ backgroundColor: '#034EA2' }}
                label="brand-blue"
                hex="#034EA2 — RGB 3/78/162"
                usage="Core brand blue. Interactive states, active nav, buttons, focus rings, toggle controls."
              />
              <Swatch
                style={{ backgroundColor: '#2D8ACA' }}
                label="brand-sky"
                hex="#2D8ACA — RGB 45/138/202"
                usage="Lighter brand blue. Supporting hierarchy labels (categories, controls), accent strip, secondary emphasis."
              />
              <Swatch
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #dde3ec' }}
                label="White"
                hex="#FFFFFF — RGB 255/255/255"
                usage="Clarity and contrast. Sidebar, card surfaces, main content areas. Paired with navy for structural contrast."
              />
            </SwatchGroup>
          </div>
        </GallerySection>

        {/* ── Brand Secondary ───────────────────────────────────────────── */}
        <GallerySection
          id="brand-secondary"
          title="Brand Secondary Colors"
          description="Five accent colors. Use sparingly — one or two at a time, never flooding the interface."
        >
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-xs font-semibold text-amber-800">
                Secondary colors are accent colors. They do not carry semantic meanings such as success, warning, or error. Do not assign semantic UI roles to these colors when doing so reduces clarity.
              </p>
            </div>

            <SwatchGroup title="Secondary Palette">
              <Swatch
                style={{ backgroundColor: '#D1D3D4' }}
                label="brand-gray"
                hex="#D1D3D4 — RGB 209/211/212"
                usage="Neutral complement. Structural dividers, muted surfaces."
              />
              <Swatch
                style={{ backgroundColor: '#00ADCC' }}
                label="brand-cyan"
                hex="#00ADCC — RGB 0/173/204"
                usage="Cool accent. Focus rings on dark backgrounds (header), accent highlights."
              />
              <Swatch
                style={{ backgroundColor: '#F68B1F' }}
                label="brand-orange"
                hex="#F68B1F — RGB 246/139/31"
                usage="Warm accent. Use for a single purposeful accent in a composition."
              />
              <Swatch
                style={{ backgroundColor: '#00A74C' }}
                label="brand-green"
                hex="#00A74C — RGB 0/176/76"
                usage="Natural accent. Use sparingly. Not a semantic success color."
              />
              <Swatch
                style={{ backgroundColor: '#B61D66' }}
                label="brand-magenta"
                hex="#B61D66 — RGB 182/29/102"
                usage="Distinctive accent. Use sparingly for strong visual differentiation."
              />
            </SwatchGroup>
          </div>
        </GallerySection>

        {/* ── Color Hierarchy ───────────────────────────────────────────── */}
        <GallerySection
          id="color-hierarchy"
          title="Color Hierarchy"
          description="How the brand palette is applied in the UI. Primary colors dominate; secondary colors accent."
        >
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-[#eef2f8]">
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-brand-navy">Level</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-brand-navy">Colors</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-brand-navy">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ['Level 1 — Primary Brand Identity',    'brand-navy, brand-blue, brand-sky, White', 'Headings, header, active states, dominant surfaces. These establish the UHRIS visual identity.'],
                    ['Level 2 — Supporting Brand Palette',  'brand-cyan, brand-orange, brand-green, brand-magenta, brand-gray', 'Controlled accents, focus rings on dark surfaces, purposeful differentiation. Restrained use.'],
                    ['Level 3 — Semantic / Functional',     'emerald (success), amber (warning), rose (error), sky (info)', 'Application-level UI communication. Distinct from brand colors.'],
                  ].map(([level, colors, role]) => (
                    <tr key={String(level)} className="hover:bg-slate-50/60">
                      <td className="px-5 py-3.5 text-xs font-bold text-slate-700 align-top">{level}</td>
                      <td className="px-5 py-3.5 text-xs font-mono text-brand-blue align-top">{colors}</td>
                      <td className="px-5 py-3.5 text-xs font-medium leading-relaxed text-slate-600 align-top">{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GallerySection>

        {/* ── Semantic UI Colors ────────────────────────────────────────── */}
        <GallerySection
          id="semantic"
          title="Semantic UI Colors"
          description="Application-level status colors. These are distinct from the brand palette and should remain immediately recognizable."
        >
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold text-slate-700">
                These are UI system decisions, not official brand colors. They are used by Alert, Badge, StatusBadge, ErrorBanner, and related components to communicate application state.
              </p>
            </div>

            <SwatchGroup title="Semantic Palette">
              <Swatch bg="bg-emerald-500" label="Success — emerald"   hex="#10b981"  usage="Active, complete, approved, positive. Used in StatusBadge (success tone), Alert, status dots." />
              <Swatch bg="bg-amber-500"   label="Warning — amber"     hex="#f59e0b"  usage="Pending, draft, caution. Used in StatusBadge (warning tone), Alert, WIP badges." />
              <Swatch bg="bg-rose-600"    label="Error — rose"        hex="#e11d48"  usage="Failed, rejected, destructive. Used in StatusBadge (error tone), Alert, danger buttons." />
              <Swatch bg="bg-sky-500"     label="Info — sky"          hex="#0ea5e9"  usage="Informational, processing, neutral notice. Used in StatusBadge (info tone), Alert." />
            </SwatchGroup>
          </div>
        </GallerySection>

        {/* ── Neutral / Structural ──────────────────────────────────────── */}
        <GallerySection
          id="neutral"
          title="Neutral / Structural Colors"
          description="Functional neutrals for text hierarchy, borders, and surfaces. These are UI system colors, not brand colors."
        >
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <SwatchGroup title="Text Hierarchy">
              <Swatch bg="bg-slate-900" label="text-slate-900 / color #0c1a2e" hex="#0f172a" usage="Primary body text, input values, high-emphasis labels." />
              <Swatch bg="bg-slate-600" label="text-slate-600"                 hex="#475569" usage="Secondary text, description body." />
              <Swatch bg="bg-slate-500" label="text-slate-500"                 hex="#64748b" usage="Section descriptions, metadata, supporting copy." />
              <Swatch bg="bg-slate-400" label="text-slate-400"                 hex="#94a3b8" usage="Placeholder text, muted labels, decorative." />
            </SwatchGroup>
            <SwatchGroup title="Surfaces & Borders">
              <Swatch bg="bg-white border border-slate-200"                    label="bg-white"       hex="#ffffff" usage="Card surfaces, input backgrounds, modal fill, sidebar." />
              <Swatch style={{ backgroundColor: '#f4f6f9' }}                   label="Page bg #f4f6f9" hex="#f4f6f9" usage="Main content area background. Cool off-white derived from brand palette." />
              <Swatch bg="bg-[#eef2f8] border border-slate-200"               label="#eef2f8"        hex="#eef2f8" usage="Preview wells, API table header, active tinted surfaces." />
              <Swatch bg="border-2 border-slate-200 bg-white"                  label="border-slate-200" hex="#e2e8f0" usage="Cards, inputs, tables, dropdowns." />
            </SwatchGroup>
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
