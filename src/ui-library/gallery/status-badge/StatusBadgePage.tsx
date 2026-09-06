/**
 * StatusBadgePage — Gallery infrastructure
 * Documents the StatusBadge design-system component.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { StatusBadge, type StatusBadgeTone } from './StatusBadge';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['badge', 'status-dot', 'filter-chip']);

const ALL_TONES: { tone: StatusBadgeTone; label: string }[] = [
  { tone: 'success', label: 'Active'    },
  { tone: 'warning', label: 'Pending'   },
  { tone: 'neutral', label: 'Inactive'  },
  { tone: 'error',   label: 'Suspended' },
  { tone: 'info',    label: 'Processing'},
  { tone: 'primary', label: 'Published' },
];

const CODE = {
  basic: `import { StatusBadge } from '@diwauhris/ui';

// Tone determines the colour; label is owned by the feature.
<StatusBadge tone="success">Active</StatusBadge>
<StatusBadge tone="warning">Pending</StatusBadge>
<StatusBadge tone="neutral">Inactive</StatusBadge>
<StatusBadge tone="error">Suspended</StatusBadge>
<StatusBadge tone="info">Processing</StatusBadge>
<StatusBadge tone="primary">Published</StatusBadge>`,

  domainMap: `// Feature modules map their domain values to tones.
// StatusBadge knows nothing about the domain.
import type { StatusBadgeTone } from '@diwauhris/ui';

const EMPLOYEE_STATUS_TONE: Record<EmployeeStatus, StatusBadgeTone> = {
  ACTIVE:      'success',
  INACTIVE:    'neutral',
  PROBATIONARY:'warning',
  TERMINATED:  'error',
};

<StatusBadge tone={EMPLOYEE_STATUS_TONE[employee.status]}>
  {employee.status}
</StatusBadge>`,

  inTable: `// Inside a table cell — common pattern
<td className={tableCell}>
  <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
</td>`,
};

export default function StatusBadgePage() {
  return (
    <GalleryLayout activeId="status-badge">
      <title>StatusBadge — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Display"
          name="StatusBadge"
          description="A small status pill with six semantic tones. Use it whenever a color needs to communicate meaning — approved, pending, rejected, active, and so on. Labels are yours to define."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="All six tones with generic example labels.">
          <ShowcasePreview standalone center>
            <div className="flex flex-wrap gap-2">
              {ALL_TONES.map(({ tone, label }) => (
                <StatusBadge key={tone} tone={tone}>{label}</StatusBadge>
              ))}
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.basic} language="tsx" title="All six tones" center minHeight="min-h-[80px]">
              <div className="flex flex-wrap gap-2">
                {ALL_TONES.map(({ tone, label }) => (
                  <StatusBadge key={tone} tone={tone}>{label}</StatusBadge>
                ))}
              </div>
            </Showcase>
          </ShowcaseGrid>
          <Showcase code={CODE.domainMap} language="tsx" title="Domain tone mapping (recommended pattern)" center={false} minHeight="min-h-0">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm w-full space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Employee Status</p>
              {[
                { status: 'ACTIVE',       tone: 'success' as StatusBadgeTone },
                { status: 'PROBATIONARY', tone: 'warning' as StatusBadgeTone },
                { status: 'INACTIVE',     tone: 'neutral' as StatusBadgeTone },
                { status: 'TERMINATED',   tone: 'error'   as StatusBadgeTone },
              ].map(row => (
                <div key={row.status} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-sm font-medium text-slate-600">{row.status}</span>
                  <StatusBadge tone={row.tone}>{row.status.charAt(0) + row.status.slice(1).toLowerCase()}</StatusBadge>
                </div>
              ))}
            </div>
          </Showcase>
          <Showcase code={CODE.inTable} language="tsx" title="Inside a table cell" center={false} minHeight="min-h-0">
            <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Name</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Department</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Maria Santos',  dept: 'Finance',    tone: 'success' as StatusBadgeTone, label: 'Active'      },
                    { name: 'Jose Reyes',    dept: 'Operations', tone: 'warning' as StatusBadgeTone, label: 'Pending'     },
                    { name: 'Ana Cruz',      dept: 'HR',         tone: 'neutral' as StatusBadgeTone, label: 'Inactive'    },
                    { name: 'Carlo Mendoza', dept: 'IT',         tone: 'error'   as StatusBadgeTone, label: 'Suspended'   },
                    { name: 'Lena Villanueva', dept: 'Academics',tone: 'info'    as StatusBadgeTone, label: 'Processing'  },
                  ].map(row => (
                    <tr key={row.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3 font-semibold text-slate-800">{row.name}</td>
                      <td className="px-5 py-3 text-slate-500">{row.dept}</td>
                      <td className="px-5 py-3">
                        <StatusBadge tone={row.tone}>{row.label}</StatusBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Semantics', [
                'Rendered as a <span> — no interactive role, no ARIA attributes needed.',
                'Screen readers announce the visible text label.',
                'The label must always be present. Do not use StatusBadge with color alone.',
              ]],
              ['Color and contrast', [
                'All six tones use both color AND typography (uppercase, font-bold, letter-spacing) to communicate status.',
                'Tones are not tested individually for WCAG contrast here — consuming pages should verify their specific label/tone combination.',
              ]],
              ['Do not use for interactive state', [
                'StatusBadge is a display primitive. For togglable/clickable status, use a Button or RadioGroup.',
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
          <ApiTable props={[
            { name: 'tone',      type: "'neutral' | 'success' | 'warning' | 'error' | 'info' | 'primary'", default: "'neutral'", description: 'Visual tone. Determines border, background, and text color.' },
            { name: 'children',  type: 'ReactNode', required: true, description: 'Status label. Must be text — screen readers announce this value. Do not rely on color alone.' },
            { name: 'className', type: 'string', description: 'Additional classes appended to the span. Use for layout adjustments (margins, display).' },
          ]} />

          <div className="mt-4 rounded-xl border border-slate-200 bg-sky-50 px-5 py-4">
            <p className="text-sm font-semibold text-sky-800">Tone guide</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                ['neutral', 'Inactive, archived, unknown'],
                ['success', 'Active, complete, published'],
                ['warning', 'Pending, draft, attention needed'],
                ['error',   'Failed, rejected, suspended'],
                ['info',    'In-progress, processing'],
                ['primary', 'Highlighted, special state'],
              ].map(([tone, use]) => (
                <div key={tone} className="flex items-center gap-2">
                  <StatusBadge tone={tone as StatusBadgeTone}>{tone}</StatusBadge>
                  <span className="text-[11px] text-slate-500">{use}</span>
                </div>
              ))}
            </div>
          </div>
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
