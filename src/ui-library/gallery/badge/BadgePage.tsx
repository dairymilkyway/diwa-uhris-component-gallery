/**
 * BadgePage — Gallery infrastructure
 *
 * Gallery page for the Badge design-system component.
 * Phase 2.75: every tone, size, and pattern now pairs a live preview
 * with exact copyable code inline.
 */

import { CheckCircle2, Clock, Star, XCircle } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { BadgePlayground } from './BadgePlayground';
import { Badge } from './Badge';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['alert', 'button', 'card']);

// ── Code strings — must exactly match the JSX below ──────────────────────────

const CODE = {
  neutral:  `<Badge tone="neutral">Draft</Badge>`,
  primary:  `<Badge tone="primary">Active</Badge>`,
  success:  `<Badge tone="success">Approved</Badge>`,
  warning:  `<Badge tone="warning">Pending</Badge>`,
  danger:   `<Badge tone="danger">Rejected</Badge>`,
  info:     `<Badge tone="info">In Review</Badge>`,
  subtle:   `<Badge tone="subtle">Optional</Badge>`,
  outline:  `<Badge tone="outline">Beta</Badge>`,

  sizeSm: `<Badge tone="primary" size="sm">Small</Badge>`,
  sizeMd: `<Badge tone="primary" size="md">Medium</Badge>`,
  sizeLg: `<Badge tone="primary" size="lg">Large</Badge>`,

  iconSuccess: `import { CheckCircle2 } from '@diwauhris/ui';

<Badge tone="success" icon={<CheckCircle2 size={10} aria-hidden="true" />}>
  Approved
</Badge>`,

  iconWarning: `import { Clock } from '@diwauhris/ui';

<Badge tone="warning" icon={<Clock size={10} aria-hidden="true" />}>
  Pending
</Badge>`,

  iconDanger: `import { XCircle } from '@diwauhris/ui';

<Badge tone="danger" icon={<XCircle size={10} aria-hidden="true" />}>
  Rejected
</Badge>`,

  iconPrimary: `import { Star } from '@diwauhris/ui';

<Badge tone="primary" icon={<Star size={10} aria-hidden="true" />}>
  Featured
</Badge>`,

  patternTable: `// Status badges in a data table
<Badge tone="success">Active</Badge>
<Badge tone="warning">Pending</Badge>
<Badge tone="neutral">Inactive</Badge>
<Badge tone="danger">Terminated</Badge>`,

  patternCard: `// Status badge in a card header
<div className="flex items-start justify-between">
  <div>
    <p className="font-bold text-slate-900">Payroll Template A</p>
    <p className="mt-0.5 text-sm text-slate-400">Updated 2 hours ago</p>
  </div>
  <Badge tone="success">Published</Badge>
</div>`,

  patternWorkflow: `// Approval workflow status
<Badge tone="warning" icon={<Clock size={10} aria-hidden="true" />}>
  Awaiting Approval
</Badge>`,
};

export default function BadgePage() {
  return (
    <GalleryLayout activeId="badge">
      <title>Badge — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Display"
          name="Badge"
          description="A compact label for status, categories, and short metadata. Eight tones, two sizes, and an optional icon slot. Purely presentational — your component decides what it means."
          status="complete"
        />

        {/* ── All tones at a glance ──────────────────────────────────────── */}
        <GallerySection id="overview" title="Overview" description="All eight tones at a glance. No code — use the playground to experiment.">
          <ShowcasePreview standalone>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="neutral">Neutral</Badge>
              <Badge tone="primary">Primary</Badge>
              <Badge tone="success">Success</Badge>
              <Badge tone="warning">Warning</Badge>
              <Badge tone="danger">Danger</Badge>
              <Badge tone="info">Info</Badge>
              <Badge tone="subtle">Subtle</Badge>
              <Badge tone="outline">Outline</Badge>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── Playground ────────────────────────────────────────────────── */}
        <GallerySection
          id="playground"
          title="Playground"
          description="Experiment with tones, sizes, and icons."
        >
          <BadgePlayground />
        </GallerySection>

        {/* ── Tones ─────────────────────────────────────────────────────── */}
        <GallerySection
          id="tones"
          title="Tones"
          description="Eight semantic tones. Each communicates meaning through color and label."
        >
          <ShowcaseGrid columns={2}>
            <Showcase title="Neutral" description="Default, unclassified state." code={CODE.neutral}>
              <Badge tone="neutral">Draft</Badge>
            </Showcase>

            <Showcase title="Primary" description="Brand emphasis, active state." code={CODE.primary}>
              <Badge tone="primary">Active</Badge>
            </Showcase>

            <Showcase title="Success" description="Positive, completed, approved." code={CODE.success}>
              <Badge tone="success">Approved</Badge>
            </Showcase>

            <Showcase title="Warning" description="Caution, action required." code={CODE.warning}>
              <Badge tone="warning">Pending</Badge>
            </Showcase>

            <Showcase title="Danger" description="Error, rejection, deletion." code={CODE.danger}>
              <Badge tone="danger">Rejected</Badge>
            </Showcase>

            <Showcase title="Info" description="Informational, in-review." code={CODE.info}>
              <Badge tone="info">In Review</Badge>
            </Showcase>

            <Showcase title="Subtle" description="Low visual weight, secondary label." code={CODE.subtle}>
              <Badge tone="subtle">Optional</Badge>
            </Showcase>

            <Showcase title="Outline" description="Minimal, transparent fill." code={CODE.outline}>
              <Badge tone="outline">Beta</Badge>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* ── Sizes ─────────────────────────────────────────────────────── */}
        <GallerySection
          id="sizes"
          title="Sizes"
          description="Three sizes for different information densities."
        >
          <ShowcaseGrid columns={3}>
            <Showcase title="Small" code={CODE.sizeSm}>
              <Badge tone="primary" size="sm">Small</Badge>
            </Showcase>

            <Showcase title="Medium" code={CODE.sizeMd}>
              <Badge tone="primary" size="md">Medium</Badge>
            </Showcase>

            <Showcase title="Large" code={CODE.sizeLg}>
              <Badge tone="primary" size="lg">Large</Badge>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* ── Icons ─────────────────────────────────────────────────────── */}
        <GallerySection
          id="icons"
          title="With Icons"
          description="An optional leading icon reinforces the tone visually."
        >
          <ShowcaseGrid columns={2}>
            <Showcase title="Success + icon" code={CODE.iconSuccess}>
              <Badge tone="success" icon={<CheckCircle2 size={10} aria-hidden="true" />}>
                Approved
              </Badge>
            </Showcase>

            <Showcase title="Warning + icon" code={CODE.iconWarning}>
              <Badge tone="warning" icon={<Clock size={10} aria-hidden="true" />}>
                Pending
              </Badge>
            </Showcase>

            <Showcase title="Danger + icon" code={CODE.iconDanger}>
              <Badge tone="danger" icon={<XCircle size={10} aria-hidden="true" />}>
                Rejected
              </Badge>
            </Showcase>

            <Showcase title="Primary + icon" code={CODE.iconPrimary}>
              <Badge tone="primary" icon={<Star size={10} aria-hidden="true" />}>
                Featured
              </Badge>
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* ── Patterns ──────────────────────────────────────────────────── */}
        <GallerySection
          id="patterns"
          title="Patterns"
          description="Common enterprise layouts that use Badge."
        >
          {/* Table status column */}
          <Showcase
            title="Status column in a table"
            description="Use matching tones to indicate employment status."
            code={CODE.patternTable}
            tone="white"
            center={false}
          >
            <div className="w-full divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden">
              {[
                { name: 'Juan dela Cruz',  tone: 'success' as const,  label: 'Active'     },
                { name: 'Maria Santos',    tone: 'warning' as const,  label: 'Pending'    },
                { name: 'Carlo Reyes',     tone: 'neutral' as const,  label: 'Inactive'   },
                { name: 'Ana Villanueva',  tone: 'danger'  as const,  label: 'Terminated' },
              ].map(({ name, tone, label }) => (
                <div key={name} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-semibold text-slate-700">{name}</span>
                  <Badge tone={tone}>{label}</Badge>
                </div>
              ))}
            </div>
          </Showcase>

          {/* Card header */}
          <Showcase
            title="Card header with status"
            description="Place Badge in the trailing position of a card header."
            code={CODE.patternCard}
            tone="white"
            center={false}
          >
            <div className="flex w-full items-start justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <p className="font-bold text-slate-900">Payroll Template A</p>
                <p className="mt-0.5 text-sm text-slate-400">Updated 2 hours ago</p>
              </div>
              <Badge tone="success">Published</Badge>
            </div>
          </Showcase>

          {/* Workflow status */}
          <Showcase
            title="Approval workflow status"
            description="Use icons to reinforce time-sensitive states."
            code={CODE.patternWorkflow}
          >
            <Badge tone="warning" icon={<Clock size={10} aria-hidden="true" />}>
              Awaiting Approval
            </Badge>
          </Showcase>
        </GallerySection>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <ul className="space-y-1.5">
              {[
                'Badge renders as <span> — not interactive, does not receive focus.',
                'Do not use Badge alone to convey essential information. Always pair with visible text.',
                'Color is not the only indicator — the label text always communicates the meaning.',
                'Icons inside badges should be aria-hidden="true".',
                'If a Badge appears without adjacent label context, add aria-label to the containing element.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </GallerySection>

        {/* ── API ───────────────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference">
          <ApiTable
            props={[
              { name: 'tone',      type: "'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'subtle' | 'outline'", default: "'neutral'", description: 'Color tone.' },
              { name: 'size',      type: "'sm' | 'md' | 'lg'", default: "'md'",       description: 'Text and padding scale.' },
              { name: 'icon',      type: 'ReactNode',                                  description: 'Leading icon. Should be aria-hidden="true".' },
              { name: 'children',  type: 'ReactNode',           required: true,        description: 'Badge label text.' },
              { name: 'className', type: 'string',              default: "''",         description: 'Additional CSS classes.' },
            ]}
          />
        </GallerySection>

        {/* ── Related ───────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
