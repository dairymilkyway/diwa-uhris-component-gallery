/**
 * ApprovalTimelinePage — Gallery infrastructure (Enterprise)
 * Source: gallery/approval-timeline/ApprovalTimeline.tsx
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { ApprovalTimeline } from './ApprovalTimeline';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['timeline', 'status-badge', 'stepper']);

const DEMO_STEPS = [
  { id: '1', actor: 'System',         action: 'created the request', status: 'approved' as const, timestamp: 'Jul 25, 2026, 09:00 AM' },
  { id: '2', actor: 'Maria Santos',   action: 'reviewed',            status: 'approved' as const, timestamp: 'Jul 26, 2026, 11:42 AM', note: 'Verified employment details. Approved.' },
  { id: '3', actor: 'Jose Reyes',     action: 'approving',           status: 'current'  as const, timestamp: 'Jul 29, 2026, 09:00 AM' },
  { id: '4', actor: 'HR Director',    action: 'final approval',      status: 'pending'  as const },
];

const REJECTED_STEPS = [
  { id: '1', actor: 'System',         action: 'created the request', status: 'approved'  as const, timestamp: 'Jul 25, 2026, 09:00 AM' },
  { id: '2', actor: 'Maria Santos',   action: 'reviewed',            status: 'approved'  as const, timestamp: 'Jul 26, 2026, 11:42 AM' },
  { id: '3', actor: 'Jose Reyes',     action: 'rejected',            status: 'rejected'  as const, timestamp: 'Jul 29, 2026, 10:15 AM', note: 'Insufficient supporting documents. Please resubmit.' },
];

const CANCELLED_STEPS = [
  { id: '1', actor: 'System',           action: 'created the request',    status: 'approved'  as const, timestamp: 'Jul 25, 2026, 09:00 AM' },
  { id: '2', actor: 'Juan dela Cruz',   action: 'cancelled the request',  status: 'cancelled' as const, timestamp: 'Jul 25, 2026, 03:00 PM' },
];

const CODE = {
  basic: `import { ApprovalTimeline, type ApprovalStep } from '@diwauhris/ui';

const steps: ApprovalStep[] = [
  { id: '1', actor: 'System',   action: 'created', status: 'approved', timestamp: '…' },
  { id: '2', actor: 'Manager',  action: 'reviewed', status: 'current',  timestamp: '…' },
  { id: '3', actor: 'Director', action: 'final',    status: 'pending' },
];

<ApprovalTimeline steps={steps} aria-label="Leave request approval" />`,

  rejected: `import { ApprovalTimeline, type ApprovalStep } from '@diwauhris/ui';

// Rejected flow — one step ends with 'rejected'
const steps: ApprovalStep[] = [
  { id: '1', actor: 'System',       action: 'created the request', status: 'approved',  timestamp: 'Jul 25, 2026, 09:00 AM' },
  { id: '2', actor: 'Maria Santos', action: 'reviewed',            status: 'approved',  timestamp: 'Jul 26, 2026, 11:42 AM' },
  { id: '3', actor: 'Jose Reyes',   action: 'rejected',            status: 'rejected',  timestamp: 'Jul 29, 2026, 10:15 AM',
    note: 'Insufficient supporting documents. Please resubmit.' },
];

<ApprovalTimeline steps={steps} aria-label="Rejected leave request" />`,

  cancelled: `import { ApprovalTimeline, type ApprovalStep } from '@diwauhris/ui';

// Cancelled flow — request withdrawn before completion
const steps: ApprovalStep[] = [
  { id: '1', actor: 'System',       action: 'created the request', status: 'approved',   timestamp: 'Jul 25, 2026, 09:00 AM' },
  { id: '2', actor: 'Juan dela Cruz', action: 'cancelled the request', status: 'cancelled', timestamp: 'Jul 25, 2026, 03:00 PM' },
];

<ApprovalTimeline steps={steps} aria-label="Cancelled leave request" />`,
};

export default function ApprovalTimelinePage() {
  return (
    <GalleryLayout activeId="approval-timeline">
      <title>Approval Timeline — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Enterprise"
          name="Approval Timeline"
          description="A step-by-step approval trail showing who acted at each stage, what they did, and what the outcome was. Domain-free — wire it to any approval workflow."
          status="complete"
        />

        <GallerySection id="overview" title="Overview">
          <ShowcasePreview standalone>
            <div className="max-w-sm">
              <ApprovalTimeline steps={DEMO_STEPS} aria-label="Leave request approval workflow" />
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Basic workflow">
            <div className="w-full max-w-sm">
              <ApprovalTimeline steps={DEMO_STEPS} aria-label="Leave request approval workflow" />
            </div>
          </Showcase>
          <Showcase code={CODE.rejected} language="tsx" title="Rejected flow" description="When a step has status 'rejected', the timeline shows a red indicator and halts further steps.">
            <div className="w-full max-w-sm">
              <ApprovalTimeline steps={REJECTED_STEPS} aria-label="Rejected leave request" />
            </div>
          </Showcase>
          <Showcase code={CODE.cancelled} language="tsx" title="Cancelled flow" description="Use status 'cancelled' when the requester withdraws the request before completion.">
            <div className="w-full max-w-sm">
              <ApprovalTimeline steps={CANCELLED_STEPS} aria-label="Cancelled leave request" />
            </div>
          </Showcase>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            {[
              '<ol> with aria-label="Approval workflow description".',
              'Each <li> has aria-label="Step N: Actor — Status".',
              'Status icons are aria-hidden; status text is conveyed via badge text.',
              'The "current" status uses animate-pulse; use motion-safe: guard if needed.',
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
            { name: 'steps',      type: 'ApprovalStep[]', required: true, description: 'Array of approval steps.' },
            { name: 'aria-label', type: 'string', default: '"Approval workflow"', description: 'Accessible label for the list.' },
            { name: 'className',  type: 'string', description: 'Additional class.' },
          ]} />
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs">
            <p className="font-bold text-slate-600 mb-2">ApprovalStep.status values</p>
            <p className="font-mono text-slate-500">'pending' | 'approved' | 'rejected' | 'cancelled' | 'verified' | 'current'</p>
          </div>
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
