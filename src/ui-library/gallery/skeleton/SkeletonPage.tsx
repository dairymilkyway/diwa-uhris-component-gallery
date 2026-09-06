/**
 * SkeletonPage — Gallery infrastructure
 *
 * Documents the gallery-native Skeleton design-system component.
 * Source: frontend/src/ui-library/gallery/skeleton/Skeleton.tsx
 *
 * No longer imports from the personnel module.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { CopyCodeBlock } from '../components/CopyCodeBlock';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTableRow,
} from './Skeleton';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['spinner', 'empty-state', 'card']);

const CODE = {
  basic: `import { Skeleton } from '@diwauhris/ui';

// Generic block — pass Tailwind h-* and w-* to shape it
<Skeleton className="h-4 w-48 rounded-lg" />
<Skeleton className="h-32 w-full rounded-xl" />`,

  composed: `import { SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTableRow } from '@diwauhris/ui';

// Stacked text lines (last line is 2/3 width automatically)
<SkeletonText lines={3} />

// Circle avatar in sm / md / lg
<SkeletonAvatar size="md" />

// Card shell with default content or custom children
<SkeletonCard />

// Table body rows — columns is an array of Tailwind w-* classes
<table>
  <tbody>
    <SkeletonTableRow rows={4} columns={['w-32', 'w-24', 'w-16', 'w-28']} />
  </tbody>
</table>`,

  shimmer: `import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTableRow } from '@diwauhris/ui';

// All five skeleton components accept variant="shimmer"
// Default is "pulse" — no change needed for existing usage

<Skeleton variant="shimmer" className="h-4 w-48" />
<SkeletonText variant="shimmer" lines={3} />
<SkeletonAvatar variant="shimmer" size="md" />
<SkeletonCard variant="shimmer" />
<SkeletonTableRow variant="shimmer" rows={3} columns={['w-32', 'w-24', 'w-20', 'w-28']} />`,

  loadingRegion: `// Announce loading state to screen readers on the container
<div aria-busy={isLoading} aria-live="polite">
  {isLoading ? (
    <SkeletonCard />
  ) : (
    <ActualContent />
  )}
</div>`,
};

export default function SkeletonPage() {
  return (
    <GalleryLayout activeId="skeleton">
      <title>Skeleton — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Display"
          name="Skeleton"
          description="Animated placeholders that mirror your real content while it loads. Five primitives — Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, and SkeletonTableRow — cover the most common loading states."
          status="complete"
          importName="Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTableRow"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="Live skeleton animations.">
          <ShowcasePreview standalone center={false} minHeight="min-h-[240px]">
            <div className="w-full space-y-8">

              {/* Base shapes */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Base shapes</p>
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Composed */}
              <ShowcaseGrid columns={3}>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">SkeletonText</p>
                  <SkeletonText lines={3} />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Avatar sizes</p>
                  <div className="flex items-center gap-3">
                    <SkeletonAvatar size="sm" />
                    <SkeletonAvatar size="md" />
                    <SkeletonAvatar size="lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">SkeletonCard</p>
                  <SkeletonCard />
                </div>
              </ShowcaseGrid>

              {/* Table */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">SkeletonTableRow</p>
                <div className="rounded-xl overflow-hidden border border-slate-100">
                  <table className="w-full">
                    <tbody>
                      <SkeletonTableRow rows={3} columns={['w-36', 'w-24', 'w-20', 'w-28', 'w-16']} />
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Avatar + text composition */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Composed pattern (avatar + text)</p>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <SkeletonAvatar size="sm" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3.5 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.basic} language="tsx" title="Base Skeleton" center={false} minHeight="min-h-[80px]">
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-32" />
              </div>
            </Showcase>
          </ShowcaseGrid>
          <CopyCodeBlock code={CODE.composed}       language="tsx" title="Composed patterns" />
          <CopyCodeBlock code={CODE.loadingRegion} language="tsx" title="Loading region (screen-reader announcement)" />
        </GallerySection>

        {/* Shimmer variant */}
        <GallerySection
          id="shimmer"
          title="Shimmer Variant"
          description={'A horizontal highlight that sweeps left-to-right — the standard loading pattern used by Linear, Vercel, GitHub, and Notion. Pass variant="shimmer" to any skeleton component. The default pulse variant is unchanged.'}
        >
          <Showcase
            code={CODE.shimmer}
            language="tsx"
            title={'All skeleton types with variant="shimmer"'}
            center={false}
            minHeight="min-h-[260px]"
          >
            <div className="w-full space-y-6">
              {/* Base shapes */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Base shapes</p>
                <Skeleton variant="shimmer" className="h-4 w-48" />
                <Skeleton variant="shimmer" className="h-4 w-64" />
                <Skeleton variant="shimmer" className="h-4 w-32" />
              </div>

              <ShowcaseGrid columns={3}>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">SkeletonText</p>
                  <SkeletonText variant="shimmer" lines={3} />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Avatars</p>
                  <div className="flex items-center gap-3">
                    <SkeletonAvatar variant="shimmer" size="sm" />
                    <SkeletonAvatar variant="shimmer" size="md" />
                    <SkeletonAvatar variant="shimmer" size="lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">SkeletonCard</p>
                  <SkeletonCard variant="shimmer" />
                </div>
              </ShowcaseGrid>

              {/* Table */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">SkeletonTableRow</p>
                <div className="rounded-xl overflow-hidden border border-slate-100">
                  <table className="w-full">
                    <tbody>
                      <SkeletonTableRow variant="shimmer" rows={3} columns={['w-36', 'w-24', 'w-20', 'w-28', 'w-16']} />
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Avatar + text composition */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Composed (avatar + text)</p>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <SkeletonAvatar variant="shimmer" size="sm" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton variant="shimmer" className="h-3.5 w-32" />
                      <Skeleton variant="shimmer" className="h-3 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Visual behavior', [
                'All skeleton elements have aria-hidden="true" — they are invisible to screen readers.',
                'The pulse variant uses Tailwind animate-pulse (opacity transitions). The shimmer variant uses a CSS gradient sweep.',
                'Both variants respect prefers-reduced-motion — animations are suppressed when the user has reduced motion enabled in their OS.',
              ]],
              ['Screen-reader announcements', [
                'Wrap the loading region in aria-busy plus aria-live="polite" on the parent container.',
                'When aria-busy changes to false, assistive technology announces the content update.',
                'Do not add aria-label to skeleton elements themselves.',
              ]],
            ].map(([h, items]) => (
              <div key={String(h)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(h)}</h3>
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

        {/* API */}
        <GallerySection id="api" title="API Reference">
          <p className="text-sm font-bold text-slate-700 mb-2">Skeleton (base)</p>
          <ApiTable props={[
            { name: 'variant',   type: "'pulse' | 'shimmer'", default: "'pulse'", description: 'Animation style. pulse — Tailwind opacity fade. shimmer — horizontal highlight sweep.' },
            { name: 'className', type: 'string', description: 'Tailwind classes for height, width, shape. Required to be useful.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">SkeletonText</p>
          <ApiTable props={[
            { name: 'lines',     type: 'number', default: '3', description: 'Number of text lines. Last line is 2/3 width when lines is greater than 1.' },
            { name: 'variant',   type: "'pulse' | 'shimmer'", default: "'pulse'", description: 'Animation style — threaded to each inner Skeleton line.' },
            { name: 'className', type: 'string', description: 'Additional class on the wrapper div.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">SkeletonAvatar</p>
          <ApiTable props={[
            { name: 'size',      type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Circle diameter.' },
            { name: 'variant',   type: "'pulse' | 'shimmer'", default: "'pulse'", description: 'Animation style.' },
            { name: 'className', type: 'string', description: 'Additional class.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">SkeletonCard</p>
          <ApiTable props={[
            { name: 'children',  type: 'ReactNode', description: 'Custom card content. Defaults to a title + 2 text lines.' },
            { name: 'variant',   type: "'pulse' | 'shimmer'", default: "'pulse'", description: 'Animation style — threaded to default children. Has no effect when custom children are provided.' },
            { name: 'className', type: 'string', description: 'Additional class on the card wrapper.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">SkeletonTableRow</p>
          <ApiTable props={[
            { name: 'rows',    type: 'number',   default: '5',  description: 'Number of rows to render.' },
            { name: 'columns', type: 'string[]', default: "['w-32','w-24','w-20','w-28']", description: 'Tailwind width class per column.' },
            { name: 'variant', type: "'pulse' | 'shimmer'", default: "'pulse'", description: 'Animation style — applied to every cell skeleton.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
