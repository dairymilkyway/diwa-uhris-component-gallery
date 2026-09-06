/**
 * LeaveBalancePage — Gallery infrastructure (Enterprise)
 *
 * No production leave balance UI exists in UHRIS.
 * This page shows how to compose a leave balance display
 * from existing gallery primitives: Progress + DescriptionList.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { Progress } from '../progress/Progress';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['progress', 'description-list', 'card', 'statistic']);

interface LeaveTypeRow {
  label: string;
  used: number;
  total: number;
  color?: string;
}

const MOCK_LEAVES: LeaveTypeRow[] = [
  { label: 'Vacation Leave',    used: 5,  total: 15 },
  { label: 'Sick Leave',        used: 2,  total: 10 },
  { label: 'Emergency Leave',   used: 0,  total: 5  },
];

const CODE = {
  pattern: `// Leave balance using Progress + card surface
import { Progress } from '@diwauhris/ui';

function LeaveBalanceCard({ label, used, total }: { label: string; used: number; total: number }) {
  const remaining = total - used;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700">{label}</span>
        <span className="font-bold text-slate-500">{remaining} / {total} remaining</span>
      </div>
      <Progress value={used} max={total} aria-label={\`\${label}: \${used} of \${total} days used\`} />
    </div>
  );
}`,
};

export default function LeaveBalancePage() {
  return (
    <GalleryLayout activeId="leave-balance">
      <title>Leave Balance — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Enterprise"
          name="Leave Balance"
          description="Leave credit bars for each leave type, showing used versus remaining. Not a standalone component — composed from Progress and Card. Follow the pattern shown here."
          status="complete"
          importName={false}
        />

        <GallerySection id="overview" title="Overview" description="Leave balance composed from Progress primitives.">
          <ShowcasePreview standalone>
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 space-y-5 max-w-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">Leave Balance</h3>
                <span className="text-xs font-medium text-slate-400">FY 2026</span>
              </div>
              {MOCK_LEAVES.map((row) => (
                <div key={row.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{row.label}</span>
                    <span className="font-bold text-slate-500">{row.total - row.used} / {row.total} left</span>
                  </div>
                  <Progress
                    value={row.used}
                    max={row.total}
                    aria-label={`${row.label}: ${row.used} of ${row.total} days used`}
                  />
                </div>
              ))}
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.pattern} language="tsx" title="Leave balance using Progress">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 space-y-5 max-w-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">Leave Balance</h3>
                <span className="text-xs font-medium text-slate-400">FY 2026</span>
              </div>
              {MOCK_LEAVES.map((row) => (
                <div key={row.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{row.label}</span>
                    <span className="font-bold text-slate-500">{row.total - row.used} / {row.total} left</span>
                  </div>
                  <Progress value={row.used} max={row.total} aria-label={`${row.label}: ${row.used} of ${row.total} days used`} />
                </div>
              ))}
            </div>
          </Showcase>
          <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50 px-5 py-4">
            <p className="text-sm font-semibold text-sky-800">Design note</p>
            <p className="text-xs font-medium text-sky-700 mt-1">
              A dedicated LeaveBalance component is not needed.
              Compose Progress (for the bar), DescriptionList (for the credits table),
              and the card surface token. Leave credits data and business rules belong in the feature module.
            </p>
          </div>
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
