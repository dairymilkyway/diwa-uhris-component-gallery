/**
 * ActivityFeedPage — Gallery infrastructure (Data Display)
 * Source: gallery/activity-feed/ActivityFeed.tsx
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { ActivityFeed } from './ActivityFeed';
import { StatusBadge } from '../status-badge/StatusBadge';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['timeline', 'avatar', 'status-badge']);

const DEMO_EVENTS = [
  {
    id: '1',
    actor: 'Juan dela Cruz',
    action: 'submitted an onboarding form',
    timestamp: '5 minutes ago',
    dateTime: '2026-07-29T09:37:00',
    badge: <StatusBadge tone="info">Review</StatusBadge>,
  },
  {
    id: '2',
    actor: 'Maria Santos',
    action: 'approved leave request for Employee #0042',
    timestamp: '1 hour ago',
    dateTime: '2026-07-29T08:42:00',
    badge: <StatusBadge tone="success">Approved</StatusBadge>,
  },
  {
    id: '3',
    actor: 'System',
    action: 'generated monthly headcount report',
    timestamp: 'Yesterday at 11:00 PM',
    dateTime: '2026-07-28T23:00:00',
  },
  {
    id: '4',
    actor: 'Jose Reyes',
    action: 'updated company profile',
    timestamp: '2 days ago',
    dateTime: '2026-07-27T14:30:00',
  },
];

const CODE = {
  basic: `import { ActivityFeed, type ActivityEvent } from '@diwauhris/ui';

const events: ActivityEvent[] = [
  {
    id: '1',
    actor: 'Juan dela Cruz',
    action: 'submitted an onboarding form',
    timestamp: '5 minutes ago',
    dateTime: '2026-07-29T09:37:00',
  },
  // ...
];

<ActivityFeed events={events} aria-label="Recent activity" />`,

  withBadge: `import { ActivityFeed, type ActivityEvent } from '@diwauhris/ui';
import { StatusBadge } from '@diwauhris/ui';

const events: ActivityEvent[] = [
  {
    id: '1',
    actor: 'Juan dela Cruz',
    action: 'submitted an onboarding form',
    timestamp: '5 minutes ago',
    dateTime: '2026-07-29T09:37:00',
    badge: <StatusBadge tone="info">Review</StatusBadge>,
  },
  {
    id: '2',
    actor: 'Maria Santos',
    action: 'approved leave request',
    timestamp: '1 hour ago',
    dateTime: '2026-07-29T08:42:00',
    badge: <StatusBadge tone="success">Approved</StatusBadge>,
  },
];

<ActivityFeed events={events} aria-label="Activity with status badges" />`,

  empty: `import { ActivityFeed } from '@diwauhris/ui';

// Empty state — no events to display
<ActivityFeed events={[]} aria-label="Recent activity" />`,
};

export default function ActivityFeedPage() {
  return (
    <GalleryLayout activeId="activity-feed">
      <title>Activity Feed — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Data Display"
          name="Activity Feed"
          description="A scrollable feed of timestamped activity events. Each entry shows who did what and when. Pass in your events array — the component handles the layout."
          status="complete"
        />

        <GallerySection id="overview" title="Overview">
          <ShowcasePreview standalone>
            <div className="max-w-sm">
              <ActivityFeed events={DEMO_EVENTS} aria-label="Recent activity demo" />
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Basic usage">
            <div className="w-full max-w-sm">
              <ActivityFeed events={DEMO_EVENTS} aria-label="Recent activity demo" />
            </div>
          </Showcase>
          <Showcase code={CODE.withBadge} language="tsx" title="Events with status badge" description="Pass a badge ReactNode to show a StatusBadge (or any element) alongside the event.">
            <div className="w-full max-w-sm">
              <ActivityFeed
                events={DEMO_EVENTS.filter((e) => e.badge)}
                aria-label="Activity with badges"
              />
            </div>
          </Showcase>
          <Showcase code={CODE.empty} language="tsx" title="Empty state" description="When events is an empty array, the component renders nothing — add your own empty state wrapper if needed.">
            <div className="w-full max-w-sm">
              <ActivityFeed events={[]} aria-label="No recent activity" />
            </div>
          </Showcase>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            {[
              '<ol> with aria-label represents the feed list semantically.',
              '<time datetime="ISO-string"> provides machine-readable timestamps.',
              'The spine dots are aria-hidden — decorative.',
              'For live feeds: wrap in a div with aria-live="polite" aria-atomic="false" to announce new events.',
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
            { name: 'events',     type: 'ActivityEvent[]', required: true, description: 'Array of events to display.' },
            { name: 'aria-label', type: 'string', default: '"Activity feed"', description: 'Accessible label for the list.' },
            { name: 'className',  type: 'string',          description: 'Additional class on the <ol>.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">ActivityEvent fields</p>
          <ApiTable props={[
            { name: 'id',        type: 'string',    required: true, description: 'Unique key.' },
            { name: 'actor',     type: 'string',    required: true, description: 'Display name of who performed the action.' },
            { name: 'action',    type: 'ReactNode', required: true, description: 'Action description text or JSX.' },
            { name: 'timestamp', type: 'string',    required: true, description: 'Human-readable time string.' },
            { name: 'dateTime',  type: 'string',    description: 'ISO timestamp for <time datetime>.' },
            { name: 'avatar',    type: 'ReactNode', description: 'Custom avatar element (defaults to actor initial).' },
            { name: 'badge',     type: 'ReactNode', description: 'Optional badge shown after the action (e.g. <StatusBadge>).' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
