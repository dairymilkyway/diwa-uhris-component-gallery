/**
 * TimelinePage — Gallery infrastructure (Display)
 *
 * Documents the vertical timeline pattern used in UHRIS.
 * Uses gallery-native Timeline primitives (no personnel-module imports).
 */

import {
  Timeline,
  TimelineItem,
  TimelineValueCard,
  TimelineFooter,
  TimelineEmptyState,
} from './Timeline';
import { Clock } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['card', 'skeleton', 'empty-state']);

// ── Live examples ──────────────────────────────────────────────────────────

function TimelineDemo() {
  return (
    <Timeline>
      {/* First (newest) item — indigo dot */}
      <TimelineItem isFirst isLast={false}>
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">Jane Smith</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Jul 29, 2026, 09:42 AM</p>
        </div>
        <div className="p-4">
          <TimelineValueCard
            beforeLabel="Previous"
            afterLabel="Current"
            beforeContent={<span>Full-time</span>}
            afterContent={<span>Part-time</span>}
          />
          <TimelineFooter reason="Employee request approved." source="Personnel Action Form" />
        </div>
      </TimelineItem>

      {/* Second item — slate dot */}
      <TimelineItem isFirst={false} isLast>
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">John Administrator</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Jan 15, 2023, 10:00 AM</p>
        </div>
        <div className="p-4">
          <TimelineValueCard
            beforeLabel="Previous"
            afterLabel="Current"
            beforeContent={<span className="text-slate-400 italic">—</span>}
            afterContent={<span>Full-time</span>}
          />
        </div>
      </TimelineItem>
    </Timeline>
  );
}

function EmptyDemo() {
  return (
    <TimelineEmptyState
      icon={<Clock size={22} className="text-slate-300" aria-hidden="true" />}
      title="No history yet"
      description="Changes to this field will appear here."
    />
  );
}

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  basic: `import {
  Timeline,
  TimelineItem,
  TimelineValueCard,
  TimelineFooter,
} from '@diwauhris/ui';

<Timeline>
  {entries.map((entry, i) => {
    const isLast = i === entries.length - 1 && !hasMore;
    return (
      <TimelineItem key={entry.id} isFirst={i === 0} isLast={isLast}>
        {/* Header: who changed + when */}
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
          <span className="text-sm font-semibold text-slate-800">{entry.changedBy}</span>
          <p className="text-[11px] text-slate-500">{entry.timestamp}</p>
        </div>

        {/* Body: before/after comparison */}
        <div className="p-4">
          <TimelineValueCard
            beforeContent={entry.previousValue ?? <span className="italic text-slate-400">—</span>}
            afterContent={entry.newValue}
          />
          <TimelineFooter reason={entry.reason} source={entry.source} />
        </div>
      </TimelineItem>
    );
  })}
</Timeline>`,

  empty: `import { TimelineEmptyState } from '@diwauhris/ui';
import { Clock } from '@diwauhris/ui';

<TimelineEmptyState
  icon={<Clock size={22} className="text-slate-300" aria-hidden="true" />}
  title="No history yet"
  description="Changes to this field will appear here."
/>`,

  valueCard: `// TimelineValueCard — before/after comparison
<TimelineValueCard
  beforeLabel="Previous"   // default: "Previous"
  afterLabel="Current"     // default: "Current"
  beforeContent={<span className="text-slate-400 italic">—</span>}
  afterContent={<span>Full-time</span>}
  // Optional: beforeAction / afterAction for copy buttons etc.
/>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function TimelinePage() {
  return (
    <GalleryLayout activeId="timeline">
      <title>Timeline — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Display"
          name="Timeline"
          description="A vertical sequence of dated events with actors, descriptions, and optional metadata. Generic and domain-free — perfect for audit trails, approval histories, and activity logs."
          status="complete"
          importName="Timeline, TimelineItem, TimelineValueCard, TimelineFooter, TimelineEmptyState"
        />

        {/* Overview ── */}
        <GallerySection id="overview" title="Overview" description="Live examples using the gallery-native Timeline primitives.">
          <ShowcasePreview standalone center={false}>
            <div className="w-full space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Timeline with before/after comparison</p>
                <TimelineDemo />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Empty state</p>
                <EmptyDemo />
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Component inventory ── */}
        <GallerySection id="components" title="Component Inventory">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Component', 'Purpose'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  ['Timeline', 'Wrapper div with space-y-0 — connects TimelineItems'],
                  ['TimelineItem', 'Spine (dot + connector line) + card wrapper'],
                  ['TimelineValueCard', 'Before → After comparison card with role="group"'],
                  ['TimelineFooter', 'Reason text + source label footer strip'],
                  ['TimelineEmptyState', 'Empty state panel with icon, title, description'],
                ].map(([name, purpose]) => (
                  <tr key={String(name)} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3">
                      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-800">{name}</code>
                    </td>
                    <td className="px-5 py-3 text-xs font-medium text-slate-600">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GallerySection>

        {/* Implementation ── */}
        <GallerySection id="implementation" title="Implementation" description="Import from the gallery Timeline module. All components are purely presentational.">
          <Showcase code={CODE.basic} language="tsx" title="Basic timeline structure" center={false} minHeight="min-h-[200px]">
            <div className="w-full max-w-lg">
              <TimelineDemo />
            </div>
          </Showcase>
          <Showcase code={CODE.valueCard} language="tsx" title="TimelineValueCard — before/after" center={false} minHeight="min-h-[120px]">
            <div className="w-full max-w-lg">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <TimelineValueCard
                  beforeLabel="Previous"
                  afterLabel="Current"
                  beforeContent={<span className="text-slate-400 italic">—</span>}
                  afterContent={<span>Full-time</span>}
                />
              </div>
            </div>
          </Showcase>
          <Showcase code={CODE.empty} language="tsx" title="TimelineEmptyState" center={false} minHeight="min-h-[120px]">
            <div className="w-full max-w-lg">
              <EmptyDemo />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Visual spine', [
                'The dot and connector line are aria-hidden="true" — decorative.',
                'Screen readers receive the card content only.',
              ]],
              ['TimelineValueCard', [
                'role="group" groups the before/after comparison semantically.',
                'Before and after sections have aria-label="{label} value" for screen reader clarity.',
              ]],
              ['TimelineEmptyState', [
                'Plain presentational panel — no interactive elements.',
                'Icon is aria-hidden="true"; title and description are plain text.',
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
