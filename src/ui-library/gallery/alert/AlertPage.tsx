/**
 * AlertPage — Gallery infrastructure
 * Phase 3: Showcase pattern.
 */

import { useState } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { AlertPlayground } from './AlertPlayground';
import { Alert } from './Alert';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['badge', 'card', 'dialog']);

const CODE = {
  info: `import { Alert } from '@diwauhris/ui';

<Alert tone="info" title="Draft saved">
  Your changes have been saved as a draft.
</Alert>`,

  success: `<Alert tone="success" title="Record updated">
  Employee record updated successfully.
</Alert>`,

  warning: `<Alert tone="warning" title="Review required">
  Please approve before the payroll cut-off.
</Alert>`,

  danger: `<Alert tone="danger" title="Save failed">
  Please check the form and try again.
</Alert>`,

  noTitle: `<Alert tone="info">
  Your session will expire in 10 minutes.
</Alert>`,

  noIcon: `<Alert tone="info" icon={false}>
  Changes will take effect after the next sync.
</Alert>`,

  subtle: `<Alert tone="success" subtle>
  Profile picture updated.
</Alert>`,

  dismissible: `import { useState } from 'react';

const [visible, setVisible] = useState(true);

{visible && (
  <Alert
    tone="warning"
    title="Action required"
    onDismiss={() => setVisible(false)}
  >
    Review pending approvals before the payroll cut-off.
  </Alert>
)}`,

  patternFormError: `// Validation failure alert above a form
<Alert tone="danger" title="Unable to submit">
  Please correct the errors below before continuing.
</Alert>`,

  patternSuccess: `// Success confirmation after an action
<Alert tone="success" title="Employee added">
  Juan dela Cruz has been added to the organization.
</Alert>`,
};

function DismissShowcase() {
  const [visible, setVisible] = useState(true);
  return visible ? (
    <Alert tone="warning" title="Action required" onDismiss={() => setVisible(false)}>
      Review pending approvals before the payroll cut-off.
    </Alert>
  ) : (
    <button
      className="text-xs font-semibold text-slate-400 underline"
      onClick={() => setVisible(true)}
    >
      Show again
    </button>
  );
}

export default function AlertPage() {
  return (
    <GalleryLayout activeId="alert">
      <title>Alert — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Display"
          name="Alert"
          description="Inline feedback that stays put. Four tones — info, success, warning, and danger — for persistent messages on the page. For notifications that disappear on their own, use Toast."
          status="complete"
        />

        <GallerySection id="overview" title="Overview" description="All four tones at a glance. No code — use the playground to experiment.">
          <ShowcasePreview tone="white" standalone>
            <div className="w-full max-w-sm space-y-3">
              <Alert tone="info"    title="Info">Your session will expire in 10 minutes.</Alert>
              <Alert tone="success" title="Success">Record updated successfully.</Alert>
              <Alert tone="warning" title="Warning">Review required before cut-off.</Alert>
              <Alert tone="danger"  title="Danger">Save failed. Please try again.</Alert>
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="playground" title="Playground">
          <AlertPlayground />
        </GallerySection>

        <GallerySection id="tones" title="Tones" description="Four semantic tones communicate different levels of urgency.">
          <ShowcaseGrid columns={2}>
            <Showcase title="Info" description="Neutral, informational." code={CODE.info}>
              <div className="w-full max-w-sm">
                <Alert tone="info" title="Draft saved">Your changes have been saved as a draft.</Alert>
              </div>
            </Showcase>

            <Showcase title="Success" description="Positive completion." code={CODE.success}>
              <div className="w-full max-w-sm">
                <Alert tone="success" title="Record updated">Employee record updated successfully.</Alert>
              </div>
            </Showcase>

            <Showcase title="Warning" description="Caution, action required." code={CODE.warning}>
              <div className="w-full max-w-sm">
                <Alert tone="warning" title="Review required">Please approve before the payroll cut-off.</Alert>
              </div>
            </Showcase>

            <Showcase title="Danger" description="Error or destructive event." code={CODE.danger}>
              <div className="w-full max-w-sm">
                <Alert tone="danger" title="Save failed">Please check the form and try again.</Alert>
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        <GallerySection id="variations" title="Variations">
          <ShowcaseGrid columns={2}>
            <Showcase title="No title" description="Body-only alert." code={CODE.noTitle}>
              <div className="w-full max-w-sm">
                <Alert tone="info">Your session will expire in 10 minutes.</Alert>
              </div>
            </Showcase>

            <Showcase title="No icon" description="icon={false} removes the leading icon." code={CODE.noIcon}>
              <div className="w-full max-w-sm">
                <Alert tone="info" icon={false}>Changes will take effect after the next sync.</Alert>
              </div>
            </Showcase>

            <Showcase title="Subtle" description="Lighter background — less visual weight." code={CODE.subtle}>
              <div className="w-full max-w-sm">
                <Alert tone="success" subtle>Profile picture updated.</Alert>
              </div>
            </Showcase>

            <Showcase title="Dismissible" description="Provide onDismiss — consumer manages visibility." code={CODE.dismissible}>
              <div className="w-full max-w-sm">
                <DismissShowcase />
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        <GallerySection id="patterns" title="Patterns">
          <ShowcaseGrid columns={2}>
            <Showcase title="Form validation error" code={CODE.patternFormError} tone="white">
              <div className="w-full max-w-sm">
                <Alert tone="danger" title="Unable to submit">
                  Please correct the errors below before continuing.
                </Alert>
              </div>
            </Showcase>

            <Showcase title="Success confirmation" code={CODE.patternSuccess} tone="white">
              <div className="w-full max-w-sm">
                <Alert tone="success" title="Employee added">
                  Juan dela Cruz has been added to the organization.
                </Alert>
              </div>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Role', ['Alert renders with role="alert". Screen readers announce content immediately.', 'For non-urgent messages, use role="status" by passing className or wrapping the Alert.']],
              ['Color', ['Each tone has a distinct icon. Color is not the only indicator.', 'Disable the icon (icon={false}) only when another visual indicator is present.']],
              ['Dismiss', ['The dismiss button has aria-label="Dismiss".', 'After dismissal, focus management is the consuming feature\'s responsibility.']],
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

        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'tone',      type: "'info' | 'success' | 'warning' | 'danger'", required: true, description: 'Color tone and default icon.' },
            { name: 'title',     type: 'string',    description: 'Optional bold heading.' },
            { name: 'children',  type: 'ReactNode', required: true, description: 'Alert body content.' },
            { name: 'icon',      type: 'boolean',   default: 'true',  description: 'Show the tone icon.' },
            { name: 'onDismiss', type: '() => void',                  description: 'Shows dismiss button. Consumer manages visibility.' },
            { name: 'subtle',    type: 'boolean',   default: 'false', description: 'Lighter background variant.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
