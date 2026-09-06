/**
 * PayrollSummaryPage — Gallery infrastructure (Enterprise)
 *
 * No production payroll summary UI exists in UHRIS outside of
 * domain-specific pay structure calculation views.
 *
 * This page documents the generic SummaryCard pattern that any
 * payroll/financial display can use, based on the DescriptionList
 * and Card gallery primitives.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { DescriptionList, DescriptionItem } from '../description-list/DescriptionList';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['description-list', 'card', 'statistic']);

const MOCK = {
  period: 'July 2026 (Semi-monthly)',
  grossPay: 'Php 25,000',
  deductions: 'Php 3,420',
  netPay: 'Php 21,580',
};

const CODE = {
  pattern: `// Payroll summary using DescriptionList + Card tokens
import { DescriptionList, DescriptionItem } from '@diwauhris/ui';

<div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 space-y-4">
  <div className="flex items-center justify-between">
    <h3 className="text-sm font-bold text-slate-800">Payroll Summary</h3>
    <span className="text-xs font-medium text-slate-400">July 2026</span>
  </div>
  <DescriptionList>
    <DescriptionItem label="Gross Pay"   value="Php 25,000.00" />
    <DescriptionItem label="Deductions"  value="Php 3,420.00" />
    <DescriptionItem label="Net Pay"     value={<span className="font-bold text-brand-blue">Php 21,580.00</span>} />
  </DescriptionList>
</div>`,
};

export default function PayrollSummaryPage() {
  return (
    <GalleryLayout activeId="payroll-summary">
      <title>Payroll Summary — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Enterprise"
          name="Payroll Summary"
          description="A payroll summary showing earnings, deductions, and net pay. Not a standalone component — composed from DescriptionList and Card. Follow the pattern shown here."
          status="complete"
          importName={false}
        />

        <GallerySection id="overview" title="Overview" description="Composed from existing gallery primitives.">
          <ShowcasePreview standalone>
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 space-y-4 max-w-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">Payroll Summary</h3>
                <span className="text-xs font-medium text-slate-400">{MOCK.period}</span>
              </div>
              <DescriptionList>
                <DescriptionItem label="Gross Pay"  value={MOCK.grossPay} />
                <DescriptionItem label="Deductions" value={<span className="text-rose-600">{MOCK.deductions}</span>} />
                <DescriptionItem label="Net Pay"    value={<span className="font-bold text-brand-blue text-base">{MOCK.netPay}</span>} />
              </DescriptionList>
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.pattern} language="tsx" title="Composed pattern">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 space-y-4 max-w-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">Payroll Summary</h3>
                <span className="text-xs font-medium text-slate-400">{MOCK.period}</span>
              </div>
              <DescriptionList>
                <DescriptionItem label="Gross Pay"  value={MOCK.grossPay} />
                <DescriptionItem label="Deductions" value={<span className="text-rose-600">{MOCK.deductions}</span>} />
                <DescriptionItem label="Net Pay"    value={<span className="font-bold text-brand-blue text-base">{MOCK.netPay}</span>} />
              </DescriptionList>
            </div>
          </Showcase>
          <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50 px-5 py-4">
            <p className="text-sm font-semibold text-sky-800">Design note</p>
            <p className="text-xs font-medium text-sky-700 mt-1">
              No standalone PayrollSummary component is needed — DescriptionList with a Card surface handles all payroll display cases.
              Domain values (gross, deductions, net pay) and permission-gated masking belong in the feature module.
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
