/**
 * IconsPage — Gallery infrastructure (Foundations)
 *
 * Full lucide-react icon catalog with live search.
 * All icons are re-exported from @diwauhris/ui — no separate install needed.
 */

import { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview } from '../components/Showcase';
import { CopyCodeBlock } from '../components/CopyCodeBlock';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['colors', 'typography', 'button']);

// ── All icon names (base names only, no Xxx aliases, no LucideXxx prefix) ────

const ALL_ICON_NAMES: string[] = Object.keys(LucideIcons).filter(
  (k) =>
    k[0] === k[0].toUpperCase() &&
    k[0] !== k[0].toLowerCase() &&
    !['LucideProvider', 'Icon', 'DynamicIcon', 'createLucideIcon'].includes(k) &&
    !k.endsWith('Icon') &&
    !k.startsWith('Lucide'),
);

// ── Sizing reference ──────────────────────────────────────────────────────────

const SIZE_ROWS = [
  { size: 14, context: 'Metadata, compact labels, inline status indicators, small table actions, badge icons, dense navigation support' },
  { size: 16, context: 'Standard buttons, navigation icons, form prefix/suffix, table actions, menu items, dropdown items, standard controls' },
  { size: 20, context: 'Section icons, card header icons, callout icons, empty-state icons, prominent semantic icons (Alert, ConfirmDialog)' },
  { size: 24, context: 'Exception: large process indicators, loading states where a larger visual is intentional' },
  { size: 28, context: 'Exception: high-emphasis empty-state contexts requiring extra visual weight' },
  { size: 32, context: 'Exception: display-level icon wells, PAF-page hero icons' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IconsPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ICON_NAMES;
    return ALL_ICON_NAMES.filter((name) => name.toLowerCase().includes(q));
  }, [query]);

  return (
    <GalleryLayout activeId="icons">
      <title>Icons — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Foundations"
          name="Icons"
          description="1,958 icons from lucide-react, all re-exported from @diwauhris/ui. No separate install. Search the catalog, copy the import, and you're done."
          status="complete"
        />

        {/* Installation ── */}
        <GallerySection
          id="installation"
          title="Installation"
          description="Icons are included in @diwauhris/ui. No separate lucide-react install needed."
        >
          <CopyCodeBlock
            code="npm install @diwauhris/ui"
            language="bash"
            title="npm"
          />
          <p className="text-sm font-medium text-slate-500">
            Import icons directly from the package:
          </p>
          <CopyCodeBlock
            code={`import { Search, Plus, Trash2 } from '@diwauhris/ui';\n\n<Search size={16} className="text-slate-600" aria-hidden="true" />`}
            language="tsx"
          />
        </GallerySection>

        {/* Full catalog with search ── */}
        <GallerySection
          id="catalog"
          title="Icon Catalog"
          description={`${ALL_ICON_NAMES.length.toLocaleString()} icons from lucide-react. Search by name.`}
        >
          {/* Search input */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search icons…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:border-brand-blue/40 focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>

          {/* Result count */}
          <p className="text-xs font-medium text-slate-400">
            {filtered.length === ALL_ICON_NAMES.length
              ? `Showing all ${ALL_ICON_NAMES.length.toLocaleString()} icons`
              : `${filtered.length.toLocaleString()} of ${ALL_ICON_NAMES.length.toLocaleString()} icons`}
          </p>

          {/* Icon grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-slate-400">
              <Search size={32} aria-hidden="true" />
              <p className="text-sm font-medium">No icons match "{query}"</p>
            </div>
          ) : (
            <ShowcasePreview standalone>
              <div className="flex flex-wrap gap-4">
                {filtered.map((name) => {
                  const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType>)[name];
                  if (!IconComponent) return null;
                  return (
                    <div key={name} className="flex flex-col items-center gap-1.5 group">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                        <IconComponent size={20} className="text-slate-600 group-hover:text-brand-blue transition-colors" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 group-hover:text-slate-600 transition-colors max-w-[72px] truncate text-center" title={name}>
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </ShowcasePreview>
          )}
        </GallerySection>

        {/* Sizes ── */}
        <GallerySection
          id="sizes"
          title="Standard Sizes"
          description="Use these sizes consistently. Do not introduce new size values without justification."
        >
          <ShowcasePreview standalone center={false}>
            <div className="flex flex-wrap items-end gap-6 p-2">
              {[14, 16, 20].map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <Search size={size} className="text-slate-600" aria-hidden="true" />
                  <span className="font-mono text-[10px] text-slate-400">{size}px</span>
                </div>
              ))}
              <div className="w-px h-8 bg-slate-200 mx-2 self-center" aria-hidden="true" />
              <p className="text-xs font-medium text-slate-400 self-center max-w-[200px]">
                24/28/32px are exceptions for specific high-emphasis contexts.
              </p>
            </div>
          </ShowcasePreview>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">size prop</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">px</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {SIZE_ROWS.map(({ size, context }) => (
                    <tr key={size} className="hover:bg-slate-50/60">
                      <td className="px-5 py-3">
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-800">
                          {size}
                        </code>
                      </td>
                      <td className="px-5 py-3 text-xs font-mono text-slate-500">{size}px</td>
                      <td className="px-5 py-3 text-xs font-medium leading-relaxed text-slate-600">{context}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GallerySection>

        {/* Placement ── */}
        <GallerySection
          id="placement"
          title="Placement Conventions"
          description="Standard positions and colors for icons in different UI contexts."
        >
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Context', 'Size', 'Position', 'Color'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ['Inside button (before label)', '16', 'Left of text, gap-2', 'White on filled; slate on outline/ghost'],
                    ['Table row action', '16', 'Only content of icon button', 'Muted slate; semantic color on hover'],
                    ['Sidebar navigation', '16', 'Left of nav label, gap-2', 'Muted slate; brand-blue when active'],
                    ['Section icon / card header', '20', 'Inside brand-blue tinted container', 'brand-blue'],
                    ['Alert / callout icon', '20', 'Left of alert content, gap-3', 'Semantic tone color'],
                    ['Empty state icon', '20+', 'Centered above title', 'Muted brand-sky'],
                    ['Input adornment', '16', 'Absolute, left-inset or right-inset', 'Muted slate'],
                    ['Metadata / compact', '14', 'Inline with label or in chip', 'Muted slate or semantic color'],
                  ].map(([ctx, size, pos, color]) => (
                    <tr key={String(ctx)} className="hover:bg-slate-50/60">
                      <td className="px-5 py-3 text-xs font-medium text-slate-700">{ctx}</td>
                      <td className="px-5 py-3"><code className="rounded bg-slate-100 px-1 font-mono text-xs text-slate-700">{size}</code></td>
                      <td className="px-5 py-3 text-xs font-medium text-slate-600">{pos}</td>
                      <td className="px-5 py-3 text-xs font-medium text-slate-600">{color}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Decorative icons', [
                'When an icon accompanies a visible text label, it is decorative.',
                'Add aria-hidden="true" to the icon element so screen readers skip it.',
              ]],
              ['Functional icons (icon-only buttons)', [
                'When an icon is the only content of an interactive element, it must communicate its purpose.',
                'Do not put aria-label on the icon itself — put it on the parent button element.',
              ]],
              ['Standalone informational icons', [
                'An icon used as standalone information needs a text alternative.',
                'Use aria-label on its container, or follow the icon with visually hidden text.',
              ]],
              ['Color and shape', [
                'Do not rely on icon shape or color alone to convey meaning.',
                'Always pair with visible text or an aria-label.',
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
        <GallerySection id="related" title="Related">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
