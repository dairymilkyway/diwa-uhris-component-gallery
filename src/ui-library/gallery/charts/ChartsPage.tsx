/**
 * ChartsPage — Gallery (Data Display)
 *
 * All SVG chart primitives on one page:
 *   BarChart        — vertical bar chart
 *   LineChart       — simple line / area chart
 *   AreaChart       — area/line chart with gradient fill, Y-axis ticks,
 *                     threshold lines, point annotations, highlight regions,
 *                     and multi-series support
 *   BarList         — ranked horizontal bar list with CSS stagger animation
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { BarChart, LineChart, CHART_PALETTE } from './Charts';
import { AreaChart } from './AreaChart';
import { BarList } from './BarList';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['heatmap', 'statistic', 'progress', 'card']);

// ── Sample data ───────────────────────────────────────────────────────────────

const MONTHLY = [
  { label: 'Jan', value: 42 },
  { label: 'Feb', value: 65 },
  { label: 'Mar', value: 58 },
  { label: 'Apr', value: 80 },
  { label: 'May', value: 74 },
  { label: 'Jun', value: 91 },
];

const MULTI_COLOR = [
  { label: 'A', value: 12, color: CHART_PALETTE[0] },
  { label: 'B', value: 34, color: CHART_PALETTE[1] },
  { label: 'C', value: 18, color: CHART_PALETTE[2] },
  { label: 'D', value: 25, color: CHART_PALETTE[3] },
  { label: 'E', value: 9,  color: CHART_PALETTE[4] },
];

// AreaChart — single series with annotation
const TREND_12 = [
  { label: 'Jan', value: 13.2 }, { label: 'Feb', value: 13.5 },
  { label: 'Mar', value: 13.8 }, { label: 'Apr', value: 14.1 },
  { label: 'May', value: 13.9 }, { label: 'Jun', value: 14.3 },
  { label: 'Jul', value: 14.7 }, { label: 'Aug', value: 14.5 },
  { label: 'Sep', value: 15.1 }, { label: 'Oct', value: 15.3 },
  { label: 'Nov', value: 15.8 }, { label: 'Dec', value: 22.4 },
];

// AreaChart — single series, no dots, threshold line
const RATE_6 = [
  { label: 'Aug', value: 91.5 },
  { label: 'Sep', value: 93.1 },
  { label: 'Oct', value: 94.2 },
  { label: 'Nov', value: 93.8 },
  { label: 'Dec', value: 94.5 },
  { label: 'Jan', value: 95.2 },
];

// AreaChart — dual series with highlight region
const DUAL_24 = Array.from({ length: 24 }, (_, i) => {
  const primary   = Math.round(5 + 75 * Math.sin((i - 2) * Math.PI / 18) * Math.max(0, 1 - Math.abs(i - 10) / 14));
  const secondary = Math.round(primary * 1.18);
  return { label: `${i}h`, primary: Math.max(2, primary), secondary: Math.max(2, secondary) };
});

// BarList — ranked breakdown
const SEGMENTS = [
  { label: 'Segment A', value: 94, color: '#3b82f6' },
  { label: 'Segment B', value: 87, color: '#6366f1' },
  { label: 'Segment C', value: 76, color: '#8b5cf6' },
  { label: 'Segment D', value: 41, color: '#10b981' },
  { label: 'Segment E', value: 38, color: '#f59e0b' },
  { label: 'Segment F', value: 32, color: '#f97316' },
];

const ALLOCATION = [
  { label: 'Group 1', value: 42, color: '#3b82f6' },
  { label: 'Group 2', value: 28, color: '#10b981' },
  { label: 'Group 3', value: 18, color: '#8b5cf6' },
  { label: 'Group 4', value: 12, color: '#f59e0b' },
];

// ── Code samples ──────────────────────────────────────────────────────────────

const CODE = {
  bar: `import { BarChart } from '@diwauhris/ui';

<BarChart
  aria-label="Monthly values over 6 months"
  data={[
    { label: 'Jan', value: 42 },
    { label: 'Feb', value: 65 },
    { label: 'Mar', value: 58 },
  ]}
  barColor="#034EA2"
  height={160}
/>`,

  line: `import { LineChart } from '@diwauhris/ui';

const MONTHLY = [
  { label: 'Jan', value: 42 },
  { label: 'Feb', value: 65 },
  { label: 'Mar', value: 58 },
  { label: 'Apr', value: 80 },
  { label: 'May', value: 74 },
  { label: 'Jun', value: 91 },
];

<LineChart
  aria-label="Value trend"
  data={MONTHLY}
  lineColor="#2D8ACA"
  filled
/>`,

  areaSingle: `import { AreaChart } from '@diwauhris/ui';

const TREND_12 = [
  { label: 'Jan', value: 13.2 }, { label: 'Feb', value: 13.5 },
  { label: 'Mar', value: 13.8 }, { label: 'Apr', value: 14.1 },
  { label: 'May', value: 13.9 }, { label: 'Jun', value: 14.3 },
  { label: 'Jul', value: 14.7 }, { label: 'Aug', value: 14.5 },
  { label: 'Sep', value: 15.1 }, { label: 'Oct', value: 15.3 },
  { label: 'Nov', value: 15.8 }, { label: 'Dec', value: 22.4 },
];

<AreaChart
  data={TREND_12}
  series={{
    dataKey: 'value',
    color: '#6366f1',
    fillOpacity: { top: 0.22, bottom: 0.01 },
  }}
  yTicks={[12, 16, 20, 24]}
  yTickFormat={(v) => \`\${v}k\`}
  annotations={[
    { dataIndex: 11, label: 'Peak', radius: 5, color: '#ef4444', labelPosition: 'above' },
  ]}
  height={170}
  aria-label="12-month value trend with peak annotation"
/>`,

  areaThreshold: `import { AreaChart } from '@diwauhris/ui';

const RATE_6 = [
  { label: 'Aug', value: 91.5 },
  { label: 'Sep', value: 93.1 },
  { label: 'Oct', value: 94.2 },
  { label: 'Nov', value: 93.8 },
  { label: 'Dec', value: 94.5 },
  { label: 'Jan', value: 95.2 },
];

// showDots={false} — no data-point circles
// threshold — dashed reference line at a target value
<AreaChart
  data={RATE_6}
  series={{
    dataKey: 'value',
    color: '#10b981',
    fillOpacity: { top: 0.3, bottom: 0.02 },
  }}
  yTicks={[88, 90, 92, 94, 96]}
  yTickFormat={(v) => \`\${v}%\`}
  showDots={false}
  threshold={{ value: 95, color: '#f59e0b', strokeStyle: 'dashed' }}
  height={120}
  aria-label="6-month rate with 95% target threshold"
/>`,

  areaDual: `import { AreaChart } from '@diwauhris/ui';

const DUAL_24 = Array.from({ length: 24 }, (_, i) => {
  const primary   = Math.round(5 + 75 * Math.sin((i - 2) * Math.PI / 18) * Math.max(0, 1 - Math.abs(i - 10) / 14));
  const secondary = Math.round(primary * 1.18);
  return { label: \`\${i}h\`, primary: Math.max(2, primary), secondary: Math.max(2, secondary) };
});

// Multi-series: primary gets gradient fill, secondary gets dashed line
// highlightRegion with optional label
<AreaChart
  data={DUAL_24}
  series={[
    { dataKey: 'primary',   color: '#6366f1', fillOpacity: { top: 0.28, bottom: 0.01 } },
    { dataKey: 'secondary', color: '#cbd5e1', strokeStyle: 'dashed', fillOpacity: { top: 0, bottom: 0 } },
  ]}
  highlightRegion={{ startIndex: 8, endIndex: 18, color: '#eef0ff', label: 'Peak window' }}
  annotations={[
    { dataIndex: 10, label: 'Max', radius: 5.5, color: '#6366f1', labelPosition: 'above' },
    { dataIndex: 12, label: 'Dip', radius: 4,   color: '#f59e0b', labelPosition: 'above' },
  ]}
  height={210}
  aria-label="24-hour dual-series activity chart"
/>`,

  barListBasic: `import { BarList } from '@diwauhris/ui';

<BarList
  items={[
    { label: 'Segment A', value: 94, color: '#3b82f6' },
    { label: 'Segment B', value: 87, color: '#6366f1' },
    { label: 'Segment C', value: 76, color: '#8b5cf6' },
  ]}
  totalLabel="Total"
  staggerDelay={70}
/>`,

  barListPct: `import { BarList } from '@diwauhris/ui';

// Percentage format, taller bars, no stagger
<BarList
  items={[
    { label: 'Group 1', value: 42, color: '#3b82f6' },
    { label: 'Group 2', value: 28, color: '#10b981' },
    { label: 'Group 3', value: 18, color: '#8b5cf6' },
    { label: 'Group 4', value: 12, color: '#f59e0b' },
  ]}
  valueFormat={(v) => \`\${v}%\`}
  barHeight="h-2.5"
  staggerDelay={0}
/>`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ChartsPage() {
  return (
    <GalleryLayout activeId="charts">
      <title>Charts — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Data Display"
          name="Charts"
          description="Four SVG-native chart primitives — no external library required. BarChart and LineChart for simple KPI displays. AreaChart for gradient-filled trend lines with annotations, thresholds, and multi-series support. BarList for ranked horizontal distributions with CSS stagger animation."
          status="complete"
          importName="BarChart, LineChart, AreaChart, BarList"
        />

        {/* ── BarChart ──────────────────────────────────────────────────── */}
        <GallerySection id="bar-chart" title="BarChart" description="Vertical bar chart. Pass a data array, choose a color, get a chart.">
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={2}>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Default palette</p>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <BarChart data={MONTHLY} aria-label="Monthly values over 6 months" height={120} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Per-item color</p>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <BarChart data={MULTI_COLOR} aria-label="Values by category with per-item color" height={120} />
                </div>
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>

          <Showcase code={CODE.bar} language="tsx" title="BarChart">
            <div className="w-full" style={{ maxWidth: '480px' }}>
              <BarChart data={MONTHLY} aria-label="Monthly values" height={120} />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── LineChart ─────────────────────────────────────────────────── */}
        <GallerySection id="line-chart" title="LineChart" description="Simple line chart with optional area fill. For advanced line charts with Y-axis ticks and annotations, use AreaChart.">
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={2}>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Filled</p>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <LineChart data={MONTHLY} aria-label="Monthly trend filled" lineColor="#034EA2" filled height={100} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Stroke only</p>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <LineChart data={MONTHLY} aria-label="Monthly trend stroke only" lineColor="#2D8ACA" filled={false} height={100} />
                </div>
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>

          <Showcase code={CODE.line} language="tsx" title="LineChart">
            <div className="w-full">
              <LineChart data={MONTHLY} aria-label="Value trend" lineColor="#034EA2" filled height={100} />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── AreaChart ─────────────────────────────────────────────────── */}
        <GallerySection
          id="area-chart"
          title="AreaChart"
          description="Area/line chart with gradient fill, explicit Y-axis ticks, threshold reference line, annotated data points, highlight regions, and multi-series support. Gradient IDs are scoped per instance — safe to render multiple on the same page."
        >
          <ShowcasePreview standalone center={false}>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Single series — gradient fill + annotation</p>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <AreaChart
                    data={TREND_12}
                    series={{ dataKey: 'value', color: '#6366f1', fillOpacity: { top: 0.22, bottom: 0.01 } }}
                    yTicks={[12, 14, 16, 18, 20, 22]}
                    yTickFormat={(v) => `${v}k`}
                    annotations={[{ dataIndex: 11, label: 'Peak', radius: 5, color: '#ef4444', labelPosition: 'above' }]}
                    height={170}
                    aria-label="12-month trend with peak annotation"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Single series — no dots + threshold line</p>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <AreaChart
                    data={RATE_6}
                    series={{ dataKey: 'value', color: '#10b981', fillOpacity: { top: 0.3, bottom: 0.02 } }}
                    yTicks={[88, 90, 92, 94, 96]}
                    yTickFormat={(v) => `${v}%`}
                    showDots={false}
                    threshold={{ value: 95, color: '#f59e0b', strokeStyle: 'dashed' }}
                    height={120}
                    aria-label="6-month rate with target threshold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Dual series — highlight region + annotations</p>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <AreaChart
                    data={DUAL_24}
                    series={[
                      { dataKey: 'primary',   color: '#6366f1', fillOpacity: { top: 0.28, bottom: 0.01 } },
                      { dataKey: 'secondary', color: '#cbd5e1', strokeStyle: 'dashed', fillOpacity: { top: 0, bottom: 0 } },
                    ]}
                    highlightRegion={{ startIndex: 8, endIndex: 18, color: '#eef0ff', label: 'Peak window' }}
                    annotations={[
                      { dataIndex: 10, label: 'Max', radius: 5.5, color: '#6366f1', labelPosition: 'above' },
                      { dataIndex: 12, label: 'Dip', radius: 4,   color: '#f59e0b', labelPosition: 'above' },
                    ]}
                    height={210}
                    aria-label="24-hour dual-series activity"
                  />
                </div>
              </div>
            </div>
          </ShowcasePreview>

          <Showcase code={CODE.areaSingle} language="tsx" title="Single series with annotation">
            <div className="w-full">
              <AreaChart
                data={TREND_12}
                series={{ dataKey: 'value', color: '#6366f1', fillOpacity: { top: 0.22, bottom: 0.01 } }}
                yTicks={[12, 14, 16, 18, 20, 22]}
                yTickFormat={(v) => `${v}k`}
                annotations={[{ dataIndex: 11, label: 'Peak', radius: 5, color: '#ef4444', labelPosition: 'above' }]}
                height={170}
                aria-label="12-month trend"
              />
            </div>
          </Showcase>

          <Showcase code={CODE.areaThreshold} language="tsx" title="No dots + threshold line">
            <div className="w-full">
              <AreaChart
                data={RATE_6}
                series={{ dataKey: 'value', color: '#10b981', fillOpacity: { top: 0.3, bottom: 0.02 } }}
                yTicks={[88, 90, 92, 94, 96]}
                yTickFormat={(v) => `${v}%`}
                showDots={false}
                threshold={{ value: 95, color: '#f59e0b', strokeStyle: 'dashed' }}
                height={120}
                aria-label="6-month rate"
              />
            </div>
          </Showcase>

          <Showcase code={CODE.areaDual} language="tsx" title="Dual series with highlight region">
            <div className="w-full">
              <AreaChart
                data={DUAL_24}
                series={[
                  { dataKey: 'primary',   color: '#6366f1', fillOpacity: { top: 0.28, bottom: 0.01 } },
                  { dataKey: 'secondary', color: '#cbd5e1', strokeStyle: 'dashed', fillOpacity: { top: 0, bottom: 0 } },
                ]}
                highlightRegion={{ startIndex: 8, endIndex: 18, color: '#eef0ff', label: 'Peak window' }}
                annotations={[
                  { dataIndex: 10, label: 'Max', radius: 5.5, color: '#6366f1', labelPosition: 'above' },
                  { dataIndex: 12, label: 'Dip', radius: 4,   color: '#f59e0b', labelPosition: 'above' },
                ]}
                height={210}
                aria-label="24-hour dual-series"
              />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── BarList ───────────────────────────────────────────────────── */}
        <GallerySection
          id="bar-list"
          title="BarList"
          description="Ranked horizontal bar list for categorical distributions. Bars animate in from the left via .os-bar-in with configurable stagger delay. color accepts CSS values only — hex, rgb, or named color (not Tailwind class names)."
        >
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={2}>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">With total row + stagger</p>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <BarList items={SEGMENTS} totalLabel="Total" staggerDelay={70} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Percentage format, no stagger</p>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <BarList
                    items={ALLOCATION}
                    valueFormat={(v) => `${v}%`}
                    barHeight="h-2.5"
                    staggerDelay={0}
                  />
                </div>
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>

          <Showcase code={CODE.barListBasic} language="tsx" title="With total row">
            <div className="w-full max-w-xs">
              <BarList items={SEGMENTS.slice(0, 4)} totalLabel="Total" staggerDelay={70} />
            </div>
          </Showcase>

          <Showcase code={CODE.barListPct} language="tsx" title="Percentage format, no stagger">
            <div className="w-full max-w-xs">
              <BarList
                items={ALLOCATION}
                valueFormat={(v) => `${v}%`}
                barHeight="h-2.5"
                staggerDelay={0}
              />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {([
              ['BarChart / LineChart / AreaChart', [
                'role="img" on every SVG with aria-label describing the chart purpose and data range.',
                'Each bar, point, and dot has aria-label with its label and value.',
                'Text labels and decorative elements use aria-hidden="true".',
                'AreaChart gradient IDs are scoped per instance via useId() — safe to render multiple charts simultaneously.',
              ]],
              ['BarList', [
                'role="list" on the container and role="listitem" on each row.',
                'aria-label on each listitem conveys label + formatted value for screen readers.',
                'The bar fill div is aria-hidden — the listitem label already communicates the data.',
                'color prop accepts CSS values only (hex/rgb/named). Tailwind class names will not resolve.',
              ]],
              ['BarList animation', [
                '.os-bar-in respects prefers-reduced-motion: animation is suppressed when the user prefers reduced motion.',
                'staggerDelay={0} removes the stagger — all bars animate simultaneously.',
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

        {/* ── API Reference ─────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference">

          {/* BarChart */}
          <p className="text-sm font-bold text-slate-700 mb-2">BarChart</p>
          <ApiTable props={[
            { name: 'data',       type: 'ChartDataPoint[]', required: true,  description: 'Array of { label, value, color? }.' },
            { name: 'aria-label', type: 'string',           required: true,  description: 'Describes the chart for screen readers.' },
            { name: 'height',     type: 'number',  default: '160',           description: 'SVG height in pixels.' },
            { name: 'barColor',   type: 'string',  default: '"#034EA2"',     description: 'Default bar fill color. Per-item color property overrides this.' },
            { name: 'className',  type: 'string',                            description: 'Additional class on the root div.' },
          ]} />

          {/* LineChart */}
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">LineChart</p>
          <ApiTable props={[
            { name: 'data',       type: 'ChartDataPoint[]', required: true,  description: 'Array of { label, value }.' },
            { name: 'aria-label', type: 'string',           required: true,  description: 'Describes the chart for screen readers.' },
            { name: 'height',     type: 'number',  default: '120',           description: 'SVG height in pixels.' },
            { name: 'lineColor',  type: 'string',  default: '"#034EA2"',     description: 'Line and point color.' },
            { name: 'filled',     type: 'boolean', default: 'true',          description: 'Show area fill below the line.' },
            { name: 'className',  type: 'string',                            description: 'Additional class on the SVG element.' },
          ]} />

          {/* AreaChart */}
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">AreaChart</p>
          <ApiTable props={[
            { name: 'data',            type: 'AreaChartDataPoint[]',               required: true,   description: "Objects with a 'label' string and numeric series keys." },
            { name: 'series',          type: 'AreaChartSeries | AreaChartSeries[]', required: true,   description: 'Single or array of series. First series receives the gradient fill.' },
            { name: 'yTicks',          type: 'number[]',                                             description: 'Explicit Y-axis tick values. Omit to hide Y-axis grid. Passing an empty array is treated the same as omitting — the domain auto-derives from the data.' },
            { name: 'yTickFormat',     type: '(v: number) => string',                                description: 'Format Y-axis tick labels.' },
            { name: 'showDots',        type: 'boolean',              default: 'true',                description: 'Show data-point circles on the primary series.' },
            { name: 'threshold',       type: 'ThresholdLine',                                        description: 'Horizontal reference line at a data value.' },
            { name: 'annotations',     type: 'ChartAnnotation[]',                                    description: 'Annotated points rendered on top of regular dots.' },
            { name: 'highlightRegion', type: 'HighlightRegion',                                      description: 'Shaded background between two x-axis indices.' },
            { name: 'height',          type: 'number',               default: '170',                 description: 'SVG height in pixels.' },
            { name: 'aria-label',      type: 'string',               default: '"Area chart"',        description: 'Accessible description.' },
            { name: 'className',       type: 'string',                                               description: 'Additional class on the SVG element.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-4">AreaChartSeries</p>
          <ApiTable props={[
            { name: 'dataKey',     type: 'string',                                        required: true,  description: 'Key in each data point that holds the Y value.' },
            { name: 'color',       type: 'string',                                        required: true,  description: 'Stroke and fill color (hex or rgb).' },
            { name: 'strokeStyle', type: "'solid' | 'dashed'",           default: "'solid'",              description: "Use 'dashed' for secondary series." },
            { name: 'fillOpacity', type: 'number | { top: number; bottom: number }', default: '{ top: 0.15, bottom: 0 }', description: 'Gradient fill opacity. Pass a number for uniform, or an object for independent stops.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-4">ChartAnnotation</p>
          <ApiTable props={[
            { name: 'dataIndex',     type: 'number',  required: true,    description: 'Zero-based data array index.' },
            { name: 'label',         type: 'string',  required: true,    description: 'Text label shown near the dot.' },
            { name: 'radius',        type: 'number',  default: '4',      description: 'Dot radius in SVG units.' },
            { name: 'color',         type: 'string',                     description: 'Dot and label color. Defaults to the primary series color.' },
            { name: 'labelPosition', type: "'above' | 'below'", default: "'above'", description: 'Position the label above or below the dot.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-4">ThresholdLine</p>
          <ApiTable props={[
            { name: 'value',       type: 'number',  required: true,      description: 'Data value at which the line is drawn.' },
            { name: 'color',       type: 'string',  default: "'#f59e0b'", description: 'Line color.' },
            { name: 'strokeStyle', type: "'solid' | 'dashed'", default: "'dashed'", description: 'Line style.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-4">HighlightRegion</p>
          <ApiTable props={[
            { name: 'startIndex', type: 'number', required: true,        description: 'Inclusive start index.' },
            { name: 'endIndex',   type: 'number', required: true,        description: 'Inclusive end index.' },
            { name: 'color',      type: 'string', default: "'#eef0ff'",  description: 'Fill color for the shaded region.' },
            { name: 'label',      type: 'string',                        description: 'Optional label centered over the region.' },
          ]} />

          {/* BarList */}
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">BarList</p>
          <ApiTable props={[
            { name: 'items',        type: 'BarListItem[]',               required: true,  description: 'Array of { label, value, color }.' },
            { name: 'valueFormat',  type: '(v: number) => string',                        description: 'Format the displayed value string. Default: bare number.' },
            { name: 'totalLabel',   type: 'string',                                       description: 'Label for the total row at the bottom. Omit to hide the total row.' },
            { name: 'barHeight',    type: "'h-1' | 'h-2' | 'h-2.5' | 'h-3' | 'h-4'", default: "'h-2'", description: 'Tailwind height class for bar track and fill.' },
            { name: 'staggerDelay', type: 'number',                      default: '70',   description: 'Delay between bar animations in ms. Pass 0 to animate simultaneously.' },
            { name: 'className',    type: 'string',                                       description: 'Additional class on the root element.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-4">BarListItem</p>
          <ApiTable props={[
            { name: 'label', type: 'string', required: true, description: 'Row label.' },
            { name: 'value', type: 'number', required: true, description: 'Raw numeric value. Bar width is relative to the maximum value in the list.' },
            { name: 'color', type: 'string', required: true, description: 'CSS color — hex, rgb, or named. Do NOT use Tailwind class names.' },
          ]} />
        </GallerySection>

        {/* ── Related ───────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
