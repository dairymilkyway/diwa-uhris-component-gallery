/**
 * KanbanPage — Gallery infrastructure (Data Display)
 * Source: gallery/kanban/Kanban.tsx
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { Kanban } from './Kanban';
import { StatusBadge } from '../status-badge/StatusBadge';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['card', 'status-badge', 'empty-state']);

const DEMO_COLUMNS = [
  {
    id: 'todo',
    label: 'To Do',
    accentClass: 'bg-slate-400',
    cards: [
      { id: 'c1', content: <CardContent title="Review PAF #0042" tag="info" /> },
      { id: 'c2', content: <CardContent title="Update org chart" tag="neutral" /> },
    ],
  },
  {
    id: 'in-progress',
    label: 'In Progress',
    accentClass: 'bg-amber-400',
    cards: [
      { id: 'c3', content: <CardContent title="Onboard new employee" tag="warning" /> },
      { id: 'c4', content: <CardContent title="Salary grade review" tag="warning" /> },
    ],
  },
  {
    id: 'done',
    label: 'Done',
    accentClass: 'bg-emerald-400',
    cards: [
      { id: 'c5', content: <CardContent title="Setup approval workflow" tag="success" /> },
    ],
  },
  {
    id: 'blocked',
    label: 'Blocked',
    accentClass: 'bg-rose-400',
    cards: [],
  },
];

function CardContent({ title, tag }: { title: string; tag: 'info' | 'neutral' | 'warning' | 'success' }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      <StatusBadge tone={tag}>{tag}</StatusBadge>
    </div>
  );
}

const CODE = {
  basic: `import { Kanban, type KanbanColumn } from '@diwauhris/ui';

const columns: KanbanColumn[] = [
  {
    id: 'todo',
    label: 'To Do',
    accentClass: 'bg-slate-400',
    cards: [
      { id: '1', content: <TaskCard title="Review PAF" /> },
    ],
  },
  { id: 'in-progress', label: 'In Progress', accentClass: 'bg-amber-400', cards: [] },
  { id: 'done',        label: 'Done',        accentClass: 'bg-emerald-400', cards: [] },
];

<Kanban columns={columns} />`,
};

export default function KanbanPage() {
  return (
    <GalleryLayout activeId="kanban">
      <title>Kanban — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Data Display"
          name="Kanban"
          description="A column-based board for visualizing workflow states. You supply the card content — the component owns the column layout. No drag-and-drop built in; add @dnd-kit when you need it."
          status="complete"
        />

        <GallerySection id="overview" title="Overview">
          <ShowcasePreview standalone center={false}>
            <Kanban columns={DEMO_COLUMNS} />
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Basic board">
            <Kanban columns={DEMO_COLUMNS} />
          </Showcase>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            {[
              'Each column is a <section> with aria-label="Column Name, N cards".',
              'Cards are <li> items in a <ul> with aria-label for the column.',
              'For drag-and-drop accessibility: use @dnd-kit\'s announcements and live-region support.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </GallerySection>

        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'columns',   type: 'KanbanColumn[]', required: true, description: 'Columns with id, label, optional accentClass, and cards array.' },
            { name: 'className', type: 'string',         description: 'Additional class on the root flex container.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
