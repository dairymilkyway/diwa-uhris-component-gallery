/**
 * StatCardPage — Gallery (Display)
 *
 * Redesigned Statistic component — one unified design language.
 * Signature: brand-navy left border strip + font-heading number.
 * No soft accent color fills — brand identity does the work.
 *
 * Variants:
 *   Default  — label + number + icon, white card, brand-navy left strip
 *   Accent   — brand-blue left strip + trend indicator below number
 *   Minimal  — no card, no shadow — bare label + number for dense grids
 *   Compact  — horizontal layout, icon left, label + number right
 */

import { Users, Briefcase, Clock, CheckCircle2 } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';
import { Statistic } from './Statistic';

const RELATED = getRelatedComponents(['card', 'badge', 'page-sample', 'panel']);

// ── Overview demo ──────────────────────────────────────────────────────────────

function OverviewDemo() {
  return (
    <div className="w-full space-y-6">
      {/* Default row */}
      <div>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">Default</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Statistic label="Total Employees" value={142}  icon={Users}        helper="All active personnel" />
          <Statistic label="Filled Positions" value={118} icon={Briefcase}    helper="Out of 142 planned" />
          <Statistic label="On Leave"         value={9}   icon={Clock}        helper="Active leave requests" />
          <Statistic label="Completed Tasks"  value={37}  icon={CheckCircle2} helper="This month" />
        </div>
      </div>

      {/* Accent row */}
      <div>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">Accent (with trend)</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Statistic label="Headcount"     value={142}  icon={Users}        variant="accent" trend="up"      trendLabel="+4 this month" />
          <Statistic label="Fill Rate"     value="83%"  icon={Briefcase}    variant="accent" trend="up"      trendLabel="+2% vs last period" />
          <Statistic label="Attrition"     value="3.2%" icon={Clock}        variant="accent" trend="down"    trendLabel="−0.8% vs last period" />
          <Statistic label="Pending Tasks" value={12}   icon={CheckCircle2} variant="accent" trend="neutral" trendLabel="No change" />
        </div>
      </div>

      {/* Minimal row */}
      <div>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">Minimal</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Statistic label="Planned"   value={24}    variant="minimal" />
          <Statistic label="Filled"    value={18}    variant="minimal" />
          <Statistic label="Vacant"    value={6}     variant="minimal" />
          <Statistic label="Fill Rate" value="75%"   variant="minimal" />
        </div>
      </div>

      {/* Compact row */}
      <div>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">Compact</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Statistic label="Total Employees" value={142}  icon={Users}     variant="compact" helper="Active personnel" />
          <Statistic label="Fill Rate"       value="83%"  icon={Briefcase} variant="compact" helper="Of planned positions" />
          <Statistic label="On Leave"        value={9}    icon={Clock}     variant="compact" helper="Active leave requests" />
          <Statistic label="Tasks Done"      value={37}   icon={CheckCircle2} variant="compact" helper="This month" />
        </div>
      </div>
    </div>
  );
}

// ── Code strings ───────────────────────────────────────────────────────────

const CODE = {
  default: `import { Statistic } from '@diwauhris/ui';
import { Users } from '@diwauhris/ui';

<Statistic
  label="Total Employees"
  value={142}
  icon={Users}
  helper="All active personnel"
/>`,

  accent: `import { Statistic } from '@diwauhris/ui';
import { Users } from '@diwauhris/ui';

// Accent — brand-blue strip with a trend indicator
// Use for KPIs where direction matters: headcount growth, fill rate, attrition
<Statistic
  label="Headcount"
  value={142}
  icon={Users}
  variant="accent"
  trend="up"
  trendLabel="+4 this month"
/>`,

  minimal: `import { Statistic } from '@diwauhris/ui';

// Minimal — no card surface, no shadow
// Use inside panels, summary rows, or anywhere card-nesting would feel heavy
<Statistic label="Planned" value={24} variant="minimal" helper="Open positions" />`,

  compact: `import { Statistic } from '@diwauhris/ui';
import { Users } from '@diwauhris/ui';

// Compact — horizontal layout, icon left, label + value right
// Use for sidebar summary rows, employee detail panels, narrow column layouts
<Statistic
  label="Total Employees"
  value={142}
  icon={Users}
  variant="compact"
  helper="Active personnel"
/>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function StatCardPage() {
  return (
    <GalleryLayout activeId="statistic">
      <title>Statistic — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Display"
          name="Statistic"
          description="A KPI tile with a brand-navy left border strip and font-heading number. Four variants — default, accent with trend, minimal, and compact — cover every UHRIS dashboard context."
          status="complete"
          importName="Statistic"
        />

        {/* ── Overview ──────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="All four variants at a glance. The brand-navy left strip and heading-weight number are the consistent signature across all variants."
        >
          <ShowcasePreview standalone tone="light" center={false} minHeight="min-h-0">
            <OverviewDemo />
          </ShowcasePreview>
        </GallerySection>

        {/* ── Variants ──────────────────────────────────────────────── */}
        <GallerySection
          id="variants"
          title="Variants"
          description="Four variants for every layout context. Copy any one independently."
        >
          <Showcase
            title="Default"
            description="White card with brand-navy left strip. Use for primary KPI rows at the top of list pages."
            code={CODE.default}
            language="tsx"
            tone="light"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Statistic label="Total Employees" value={142}  icon={Users}        helper="All active personnel" />
              <Statistic label="Filled Positions" value={118} icon={Briefcase}    helper="Out of 142 planned" />
              <Statistic label="On Leave"         value={9}   icon={Clock}        helper="Active leave requests" />
              <Statistic label="Completed Tasks"  value={37}  icon={CheckCircle2} helper="This month" />
            </div>
          </Showcase>

          <Showcase
            title="Accent"
            description="brand-blue strip with a trend indicator — up, down, or neutral. Use when direction matters."
            code={CODE.accent}
            language="tsx"
            tone="light"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Statistic label="Headcount"     value={142}  icon={Users}        variant="accent" trend="up"      trendLabel="+4 this month" />
              <Statistic label="Fill Rate"     value="83%"  icon={Briefcase}    variant="accent" trend="up"      trendLabel="+2% vs last period" />
              <Statistic label="Attrition"     value="3.2%" icon={Clock}        variant="accent" trend="down"    trendLabel="−0.8% vs last period" />
              <Statistic label="Pending Tasks" value={12}   icon={CheckCircle2} variant="accent" trend="neutral" trendLabel="No change" />
            </div>
          </Showcase>

          <Showcase
            title="Minimal"
            description="No card surface. Use inside panels, summary sections, or anywhere card-nesting would feel heavy."
            code={CODE.minimal}
            language="tsx"
            tone="light"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full grid grid-cols-2 gap-6 sm:grid-cols-4">
              <Statistic label="Planned"   value={24}    variant="minimal" />
              <Statistic label="Filled"    value={18}    variant="minimal" />
              <Statistic label="Vacant"    value={6}     variant="minimal" />
              <Statistic label="Fill Rate" value="75%"   variant="minimal" />
            </div>
          </Showcase>

          <Showcase
            title="Compact"
            description="Horizontal layout — icon left, label and number right. Use for sidebar rows, employee detail panels, or narrow column layouts."
            code={CODE.compact}
            language="tsx"
            tone="light"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Statistic label="Total Employees" value={142}  icon={Users}        variant="compact" helper="Active personnel" />
              <Statistic label="Fill Rate"       value="83%"  icon={Briefcase}    variant="compact" helper="Of planned positions" />
              <Statistic label="On Leave"        value={9}    icon={Clock}        variant="compact" helper="Active requests" />
              <Statistic label="Tasks Done"      value={37}   icon={CheckCircle2} variant="compact" helper="This month" />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Playground — real HRIS context ────────────────────────── */}
        <GallerySection
          id="in-context"
          title="In Context"
          description="How the variants compose in a real dashboard row — default KPIs above the toolbar, minimal inside a panel."
        >
          <ShowcasePreview standalone tone="light" center={false} minHeight="min-h-0">
            <div className="w-full space-y-6">
              {/* Primary KPI row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Statistic label="Total Employees" value={142}  icon={Users}        helper="All active" />
                <Statistic label="Fill Rate"       value="83%"  icon={Briefcase}    helper="142 of 171 filled" variant="accent" trend="up" trendLabel="+2% this period" />
                <Statistic label="On Leave"        value={9}    icon={Clock}        helper="Active today" />
                <Statistic label="Open Positions"  value={29}   icon={CheckCircle2} helper="Awaiting assignment" variant="accent" trend="down" trendLabel="−3 this month" />
              </div>

              {/* Minimal row inside a white card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-400">Period Summary</p>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                  <Statistic label="Hires"       value={8}  variant="minimal" helper="This quarter" />
                  <Statistic label="Exits"        value={3}  variant="minimal" helper="This quarter" />
                  <Statistic label="Promotions"   value={5}  variant="minimal" helper="This quarter" />
                  <Statistic label="Transfers"    value={11} variant="minimal" helper="This quarter" />
                </div>
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── Accessibility ─────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {([
              ['All variants', [
                'All variants are presentational — no interactive elements, no ARIA roles required.',
                'Icons are decorative — mark them aria-hidden="true" at the call site.',
                'Color is never the sole indicator: label text always describes the metric.',
              ]],
              ['Trend indicators', [
                'Trend icons (TrendingUp, TrendingDown, Minus) are aria-hidden="true" — the adjacent text label carries the meaning.',
                'The trend label should be descriptive enough to convey direction without the icon: "+4 this month" works, "Up" alone does not.',
              ]],
              ['Numbers', [
                'Values use tabular-nums to keep digit widths consistent when numbers update.',
                'If a statistic updates dynamically, wrap it in a live region: role="status" aria-live="polite".',
              ]],
            ] as [string, string[]][]).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{heading}</h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GallerySection>

        {/* ── API ──────────────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'label',      type: 'string',                                    required: true,  description: 'KPI label shown above the number.' },
            { name: 'value',      type: 'string | number',                           required: true,  description: 'The headline number or string.' },
            { name: 'variant',    type: "'default' | 'accent' | 'minimal' | 'compact'", default: "'default'", description: 'Visual layout variant.' },
            { name: 'helper',     type: 'string',                                    description: 'Secondary text below the value. Hidden when trend is set.' },
            { name: 'icon',       type: 'React.ElementType',                         description: 'Icon component rendered beside the label (e.g. from lucide-react).' },
            { name: 'trend',      type: "'up' | 'down' | 'neutral'",                 description: 'Renders a TrendingUp/Down/Minus icon with a color. Only used with accent variant.' },
            { name: 'trendLabel', type: 'string',                                    description: 'Override the default trend label text.' },
            { name: 'className',  type: 'string',                                    description: 'Additional class on the root element.' },
          ]} />
        </GallerySection>

        {/* ── Related ───────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
