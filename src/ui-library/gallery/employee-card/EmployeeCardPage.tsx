/**
 * EmployeeCardPage — Gallery infrastructure (Enterprise)
 * Source: gallery/employee-card/EmployeeCard.tsx
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { EmployeeCard } from './EmployeeCard';
import { StatusBadge } from '../status-badge/StatusBadge';
import { IconButton } from '../icon-button/IconButton';
import { Pencil, Mail } from 'lucide-react';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['avatar', 'status-badge', 'card', 'description-list']);

const CODE = {
  basic: `import { EmployeeCard } from '@diwauhris/ui';
import { StatusBadge } from '@diwauhris/ui';

<EmployeeCard
  name="Juan dela Cruz"
  role="HR Manager"
  status={<StatusBadge tone="success">Active</StatusBadge>}
  meta={[
    { label: 'Department', value: 'Human Resources' },
    { label: 'Employee ID', value: 'EMP-0042' },
    { label: 'Start Date', value: 'Jan 15, 2020' },
  ]}
/>`,

  withActions: `import { EmployeeCard } from '@diwauhris/ui';
import { IconButton, StatusBadge } from '@diwauhris/ui';
import { Mail, Pencil } from 'lucide-react';

<EmployeeCard
  name="Maria Santos"
  role="Software Engineer"
  status={<StatusBadge tone="warning">Probationary</StatusBadge>}
  meta={[
    { label: 'Department', value: 'Engineering' },
    { label: 'Start Date', value: 'Jun 1, 2026' },
  ]}
  actions={
    <>
      <IconButton
        icon={<Mail size={14} aria-hidden="true" />}
        aria-label="Send email to Maria Santos"
      />
      <IconButton
        icon={<Pencil size={14} aria-hidden="true" />}
        aria-label="Edit Maria Santos"
        variant="edit"
      />
    </>
  }
/>`,

  withAvatar: `import { EmployeeCard } from '@diwauhris/ui';
import { StatusBadge } from '@diwauhris/ui';

// avatarSrc falls back to initials when null or when the image fails to load
<EmployeeCard
  name="Jose Reyes"
  role="Finance Analyst"
  avatarSrc="https://example.com/avatars/jose-reyes.jpg"
  status={<StatusBadge tone="success">Active</StatusBadge>}
  meta={[
    { label: 'Department', value: 'Finance' },
    { label: 'Employee ID', value: 'EMP-0019' },
  ]}
/>`,
};

export default function EmployeeCardPage() {
  return (
    <GalleryLayout activeId="employee-card">
      <title>Employee Card — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Enterprise"
          name="Employee Card"
          description="A compact card for a person — avatar, name, role, status badge, metadata, and an optional actions menu. Domain-free, so it works for employees, candidates, or any person record."
          status="complete"
        />

        <GallerySection id="overview" title="Overview">
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={3}>
              <EmployeeCard
                name="Juan dela Cruz"
                role="HR Manager"
                status={<StatusBadge tone="success">Active</StatusBadge>}
                meta={[
                  { label: 'Department', value: 'Human Resources' },
                  { label: 'Employee ID', value: 'EMP-0042' },
                ]}
              />
              <EmployeeCard
                name="Maria Santos"
                role="Software Engineer"
                status={<StatusBadge tone="warning">Probationary</StatusBadge>}
                meta={[
                  { label: 'Department', value: 'Engineering' },
                  { label: 'Start Date', value: 'Jun 1, 2026' },
                ]}
                actions={
                  <>
                    <IconButton icon={<Mail size={14} aria-hidden="true" />} aria-label="Send email to Maria Santos" />
                    <IconButton icon={<Pencil size={14} aria-hidden="true" />} aria-label="Edit Maria Santos" variant="edit" />
                  </>
                }
              />
              <EmployeeCard
                name="Jose Reyes"
                role="Finance Analyst"
                status={<StatusBadge tone="neutral">Inactive</StatusBadge>}
                meta={[
                  { label: 'Department', value: 'Finance' },
                ]}
              />
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Basic employee card">
            <EmployeeCard
              name="Juan dela Cruz"
              role="HR Manager"
              status={<StatusBadge tone="success">Active</StatusBadge>}
              meta={[
                { label: 'Department', value: 'Human Resources' },
                { label: 'Employee ID', value: 'EMP-0042' },
                { label: 'Start Date', value: 'Jan 15, 2020' },
              ]}
            />
          </Showcase>
          <Showcase code={CODE.withActions} language="tsx" title="With action buttons" description="Pass action buttons into the actions slot. Include the employee name in each aria-label.">
            <EmployeeCard
              name="Maria Santos"
              role="Software Engineer"
              status={<StatusBadge tone="warning">Probationary</StatusBadge>}
              meta={[
                { label: 'Department', value: 'Engineering' },
                { label: 'Start Date', value: 'Jun 1, 2026' },
              ]}
              actions={
                <>
                  <IconButton icon={<Mail size={14} aria-hidden="true" />} aria-label="Send email to Maria Santos" />
                  <IconButton icon={<Pencil size={14} aria-hidden="true" />} aria-label="Edit Maria Santos" variant="edit" />
                </>
              }
            />
          </Showcase>
          <Showcase code={CODE.withAvatar} language="tsx" title="With avatar image" description="avatarSrc loads a profile photo. Fallback to initials when the image is null or fails to load.">
            <EmployeeCard
              name="Jose Reyes"
              role="Finance Analyst"
              avatarSrc={null}
              status={<StatusBadge tone="success">Active</StatusBadge>}
              meta={[
                { label: 'Department', value: 'Finance' },
                { label: 'Employee ID', value: 'EMP-0019' },
              ]}
            />
          </Showcase>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            {[
              '<article> with aria-label="Name, Role" marks the card as an independent unit.',
              'Avatar uses role="img" with aria-label={name}.',
              'Metadata uses <dl>/<dt>/<dd> for key-value semantics.',
              'Action buttons must have aria-label including the employee name: "Edit Juan dela Cruz".',
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
            { name: 'name',      type: 'string',    required: true, description: 'Display name. Used for Avatar initials and article aria-label.' },
            { name: 'role',      type: 'string',    description: 'Job title or role label.' },
            { name: 'avatarSrc', type: 'string | null', description: 'Optional avatar image. Falls back to initials.' },
            { name: 'status',    type: 'ReactNode', description: 'Status badge slot.' },
            { name: 'meta',      type: 'EmployeeCardMeta[]', description: 'Key-value rows: [{ label, value }].' },
            { name: 'actions',   type: 'ReactNode', description: 'Action buttons rendered at the card bottom.' },
            { name: 'className', type: 'string',    description: 'Additional class.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
