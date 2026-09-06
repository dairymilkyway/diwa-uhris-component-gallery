/**
 * AreaChart — Design System Component
 *
 * SVG area/line chart with gradient fill, explicit Y-axis ticks, optional
 * threshold line, point annotations, highlight regions, and multi-series support.
 * No external charting library — native SVG only.
 *
 * Gradient IDs are scoped per instance via useId() to avoid SVG ID collisions
 * when multiple charts appear on the same page.
 *
 * Usage:
 *   <AreaChart
 *     data={monthlyData}
 *     series={{ dataKey: 'value', color: '#6366f1', fillOpacity: { top: 0.22, bottom: 0.01 } }}
 *     yTicks={[0, 25, 50, 75, 100]}
 *     yTickFormat={(v) => `${v}%`}
 *     annotations={[{ dataIndex: 5, label: 'Peak', radius: 5, color: '#ef4444' }]}
 *     height={170}
 *   />
 *
 * Accessibility:
 *   - role="img" on the SVG with aria-label
 *   - Each dot has aria-label with label and value
 *   - Decorative elements are aria-hidden
 */

import { useId } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

/** Independent top/bottom gradient stop opacities */
export interface GradientOpacity {
  top: number;
  bottom: number;
}

export interface AreaChartSeries {
  /** Key in each data point object that holds the Y value */
  dataKey: string;
  /** Stroke and fill color (hex or rgb) */
  color: string;
  /** Stroke style. Default: 'solid' */
  strokeStyle?: 'solid' | 'dashed';
  /**
   * Gradient area fill opacity.
   * - number: same value applied to both top and bottom gradient stops
   * - { top, bottom }: independent stop opacities for precise gradient control
   * Default: { top: 0.15, bottom: 0 }
   */
  fillOpacity?: number | GradientOpacity;
}

export interface ThresholdLine {
  /** Data value at which the horizontal reference line is drawn */
  value: number;
  /** Line color. Default: '#f59e0b' */
  color?: string;
  /** Line style. Default: 'dashed' */
  strokeStyle?: 'solid' | 'dashed';
}

export interface ChartAnnotation {
  /** Zero-based index into the data array */
  dataIndex: number;
  /** Text label rendered near the dot */
  label: string;
  /** Dot radius in SVG units. Default: 4 */
  radius?: number;
  /** Dot and label color. Defaults to the primary series color */
  color?: string;
  /** Position of the label relative to the dot. Default: 'above' */
  labelPosition?: 'above' | 'below';
}

export interface HighlightRegion {
  /** Inclusive start index */
  startIndex: number;
  /** Inclusive end index */
  endIndex: number;
  /** Fill color for the shaded region. Default: '#eef0ff' */
  color?: string;
  /** Optional label centered over the region */
  label?: string;
}

export interface AreaChartDataPoint {
  /** X-axis label */
  label: string;
  [key: string]: string | number;
}

export interface AreaChartProps {
  /** Data points — each must have a 'label' string plus the series dataKey(s) */
  data: AreaChartDataPoint[];
  /**
   * Series definition(s). Pass a single object for one series or an array for
   * multi-series. Only the first series receives the gradient area fill.
   */
  series: AreaChartSeries | AreaChartSeries[];
  /** Explicit Y-axis tick values. When omitted, no Y-axis grid lines are drawn. */
  yTicks?: number[];
  /** Format Y-axis tick labels. Default: String(v) */
  yTickFormat?: (value: number) => string;
  /**
   * Show data-point circles on the primary series line.
   * Default: true — pass false for charts where dots are not desired.
   */
  showDots?: boolean;
  /** Horizontal threshold reference line */
  threshold?: ThresholdLine;
  /** Annotated data points rendered on top of regular dots */
  annotations?: ChartAnnotation[];
  /** Shaded background region between two x-axis indices */
  highlightRegion?: HighlightRegion;
  /** SVG height in pixels. Default: 170 */
  height?: number;
  /** Accessible description for screen readers */
  'aria-label'?: string;
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveOpacity(op: number | GradientOpacity | undefined): GradientOpacity {
  if (op === undefined) return { top: 0.15, bottom: 0 };
  if (typeof op === 'number') return { top: op, bottom: op };
  return op;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AreaChart({
  data,
  series,
  yTicks,
  yTickFormat,
  showDots = true,
  threshold,
  annotations = [],
  highlightRegion,
  height = 170,
  'aria-label': ariaLabel = 'Area chart',
  className = '',
}: AreaChartProps) {
  // Unique ID prefix per instance — prevents gradient ID collisions when
  // multiple AreaChart instances are mounted simultaneously.
  // Same pattern used by OrgChart.tsx.
  const uid = useId().replace(/:/g, '');

  const seriesArr = Array.isArray(series) ? series : [series];
  const primary = seriesArr[0]!;

  // Layout
  const W  = 560;
  const pl = 52;
  const pr = 16;
  const pt = 14;
  const pb = 30;
  const cW = W - pl - pr;
  const cH = height - pt - pb;
  const n  = data.length;

  // Y domain — treat empty yTicks array same as undefined to avoid
  // Math.min/max over [] = Infinity/-Infinity producing NaN coordinates.
  const yTicksSafe = yTicks && yTicks.length > 0 ? yTicks : undefined;
  const minY = yTicksSafe ? Math.min(...yTicksSafe) : 0;
  const maxY = yTicksSafe
    ? Math.max(...yTicksSafe)
    : Math.max(...seriesArr.flatMap((s) => data.map((d) => Number(d[s.dataKey] ?? 0))), 1);

  const cx = (i: number) => pl + (i / Math.max(n - 1, 1)) * cW;
  const cy = (v: number) => pt + (1 - (v - minY) / (maxY - minY)) * cH;

  // SVG paths per series
  const paths = seriesArr.map((s) => {
    const vals = data.map((d) => Number(d[s.dataKey] ?? 0));
    const line = 'M' + vals.map((v, i) => `${cx(i)},${cy(v)}`).join('L');
    const area = `${line}L${cx(n - 1)},${height - pb}L${cx(0)},${height - pb}Z`;
    return { line, area, vals };
  });

  // Annotated indices — regular dots are skipped at these positions
  const annotatedIdx = new Set(annotations.map((a) => a.dataIndex));

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox={`0 0 ${W} ${height}`}
      className={`w-full ${className}`}
      style={{ height }}
    >
      <defs>
        {seriesArr.map((s, si) => {
          const op = resolveOpacity(s.fillOpacity);
          return (
            <linearGradient key={si} id={`${uid}-g${si}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={s.color} stopOpacity={op.top} />
              <stop offset="100%" stopColor={s.color} stopOpacity={op.bottom} />
            </linearGradient>
          );
        })}
      </defs>

      {/* Highlight region — rendered first, behind everything */}
      {highlightRegion && (
        <g aria-hidden="true">
          <rect
            x={cx(highlightRegion.startIndex)}
            y={pt}
            width={cx(highlightRegion.endIndex) - cx(highlightRegion.startIndex)}
            height={cH}
            fill={highlightRegion.color ?? '#eef0ff'}
            rx={3}
            opacity={0.7}
          />
          {highlightRegion.label && (
            <text
              x={(cx(highlightRegion.startIndex) + cx(highlightRegion.endIndex)) / 2}
              y={pt + 9}
              textAnchor="middle"
              fontSize={7.5}
              fill="#a5b4fc"
            >
              {highlightRegion.label}
            </text>
          )}
        </g>
      )}

      {/* Y-axis grid lines and tick labels */}
      {yTicks?.map((v) => (
        <g key={v} aria-hidden="true">
          <line x1={pl} y1={cy(v)} x2={W - pr} y2={cy(v)} stroke="#f1f5f9" strokeWidth={1} />
          <text x={pl - 6} y={cy(v) + 4} textAnchor="end" fontSize={9} fill="#94a3b8">
            {yTickFormat ? yTickFormat(v) : String(v)}
          </text>
        </g>
      ))}

      {/* Threshold reference line */}
      {threshold && (
        <line
          x1={pl} y1={cy(threshold.value)}
          x2={W - pr} y2={cy(threshold.value)}
          stroke={threshold.color ?? '#f59e0b'}
          strokeWidth={1}
          strokeDasharray={threshold.strokeStyle === 'solid' ? undefined : '4,2'}
          aria-hidden="true"
        />
      )}

      {/* Area fills */}
      {seriesArr.map((s, si) => {
        const op = resolveOpacity(s.fillOpacity);
        if (op.top === 0 && op.bottom === 0) return null;
        return (
          <path
            key={`area-${si}`}
            d={paths[si]!.area}
            fill={`url(#${uid}-g${si})`}
            aria-hidden="true"
          />
        );
      })}

      {/* Lines */}
      {seriesArr.map((s, si) => (
        <path
          key={`line-${si}`}
          d={paths[si]!.line}
          fill="none"
          stroke={s.color}
          strokeWidth={si === 0 ? 2.5 : 1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={s.strokeStyle === 'dashed' ? '4,2' : undefined}
          aria-hidden="true"
        />
      ))}

      {/* Regular dots on primary series — skipped at annotated positions */}
      {showDots && paths[0]!.vals.map((v, i) => {
        if (annotatedIdx.has(i)) return null;
        return (
          <circle
            key={`dot-${i}`}
            cx={cx(i)} cy={cy(v)}
            r={3.5}
            fill={primary.color}
            stroke="white" strokeWidth={2}
            aria-label={`${data[i]!.label}: ${v}`}
          />
        );
      })}

      {/* X-axis labels */}
      {data.map((d, i) => (
        <text
          key={`x-${i}`}
          x={cx(i)} y={height - 4}
          textAnchor="middle"
          fontSize={9}
          fill="#94a3b8"
          aria-hidden="true"
        >
          {d.label}
        </text>
      ))}

      {/* Annotations — rendered on top of regular dots */}
      {annotations.map((ann) => {
        const v   = Number(data[ann.dataIndex]?.[primary.dataKey] ?? 0);
        const x   = cx(ann.dataIndex);
        const y   = cy(v);
        const r   = ann.radius ?? 4;
        const col = ann.color ?? primary.color;
        // Clamp 'above' label to stay within SVG top boundary (pt + 8 = safe minimum y)
        const ly  = ann.labelPosition === 'below' ? y + r + 10 : Math.max(pt + 8, y - r - 5);
        return (
          <g key={`ann-${ann.dataIndex}`} aria-label={`${data[ann.dataIndex]!.label}: ${ann.label}`}>
            <circle cx={x} cy={y} r={r} fill={col} stroke="white" strokeWidth={2} />
            <text x={x} y={ly} textAnchor="middle" fontSize={8} fill={col} fontWeight="bold">
              {ann.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
