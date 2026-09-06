/**
 * Charts — Design System Components
 *
 * Lightweight SVG-native chart primitives. No charting library dependency.
 * Suitable for simple analytics/KPI displays.
 *
 * Components:
 *   BarChart      — vertical bar chart
 *   LineChart     — line/area chart (SVG path)
 *   CHART_PALETTE — shared default color sequence for multi-series charts
 *
 * Visual language (applied as defaults, no new props):
 *   - BarChart: top-only rounded corners, subtle same-hue gradient fill,
 *     baseline rule, value labels inside SVG above bars, comfortable gaps
 *   - LineChart: gradient area fill fading to transparent, strokeWidth 2,
 *     white-ring dots only when ≤ 12 data points, no horizontal distortion
 *
 * Accessibility:
 *   - role="img" on every SVG with aria-label describing the chart
 *   - Each bar/point has aria-label with label and value
 *   - Decorative elements are aria-hidden
 */

import { useId } from 'react';

// ── Shared palette ────────────────────────────────────────────────────────────

/**
 * Default color sequence for multi-series / per-item charts.
 * Built on the brand's blue-sky hue family with a single warm accent.
 * Import this directly when constructing per-item color arrays:
 *
 *   import { CHART_PALETTE } from '@diwauhris/ui';
 *   const data = items.map((item, i) => ({ ...item, color: CHART_PALETTE[i % CHART_PALETTE.length] }));
 */
export const CHART_PALETTE = [
  '#034EA2', // brand-blue
  '#2D8ACA', // brand-sky
  '#4F6FBF', // indigo-mid (analogous)
  '#0E7490', // slate-teal (adjacent hue, same luminosity)
  '#B45309', // muted amber (warm accent)
] as const;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

// ── BarChart ──────────────────────────────────────────────────────────────────

export interface BarChartProps {
  data: ChartDataPoint[];
  height?: number;
  barColor?: string;
  /** Accessible description of the entire chart */
  'aria-label': string;
  className?: string;
}

export function BarChart({
  data,
  height = 160,
  barColor = '#034EA2',
  'aria-label': ariaLabel,
  className = '',
}: BarChartProps) {
  // Unique gradient ID per instance — prevents collision when multiple
  // BarChart components are mounted on the same page.
  const uid = useId().replace(/:/g, '');

  const max  = Math.max(...data.map((d) => d.value), 1);
  const n    = data.length;

  // Fixed viewBox — bars always render at consistent proportions.
  // SVG scales to fill container width via viewBox + no preserveAspectRatio override.
  // W is calculated so each bar slot is ~50px wide at the reference size.
  const W          = Math.max(n * 50, 200);   // min 200 to avoid tiny charts
  const w          = W / n;
  const gap        = w * 0.20;                // 20% of slot per side → ~60% bar width
  const bw         = w - gap * 2;

  // Layout constants
  const bottomPad  = 24;       // space below bars for x-axis labels
  const labelGap   = 4;        // gap between bar top and value label
  const chartH     = height - bottomPad;
  const baselineY  = chartH;

  // Resolve fill color per bar before rendering.
  // Priority: per-item d.color > explicit barColor override > CHART_PALETTE slot.
  // CHART_PALETTE only activates when barColor is the default value — so a
  // consumer passing barColor="#hex" gets all bars that color, as expected.
  const isDefaultBarColor = barColor === '#034EA2';
  const fillColors = data.map((d, i) =>
    d.color ?? (isDefaultBarColor
      ? (CHART_PALETTE[i % CHART_PALETTE.length] ?? barColor)
      : barColor)
  );
  const distinctColors = Array.from(new Set(fillColors)) as string[];

  return (
    <div className={className}>
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox={`0 0 ${W} ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
      >
        <defs>
          {/* Gradients use userSpaceOnUse so the opacity gradient spans the
              full chart height regardless of each bar's individual bounding box.
              This prevents each bar from independently restarting the gradient. */}
          {distinctColors.map((color) => (
            <linearGradient
              key={color}
              id={`${uid}-bg-${color.replace('#', '')}`}
              x1="0" y1="0" x2="0" y2={height - bottomPad}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor={color} stopOpacity={1}   />
              <stop offset="100%" stopColor={color} stopOpacity={0.7} />
            </linearGradient>
          ))}
        </defs>

        {/* Baseline rule — drawn first so bars sit on top of it */}
        <line
          x1={0} y1={baselineY}
          x2={W} y2={baselineY}
          stroke="#e2e8f0"
          strokeWidth={0.5}
          aria-hidden="true"
        />

        {data.map((d, i) => {
          const fillColor = fillColors[i]!;
          const gradId    = `${uid}-bg-${fillColor.replace('#', '')}`;

          const barH  = (d.value / max) * (chartH - 16);  // 16px top headroom: label text ascender (~7px) + gap (4px) + safety (5px)
          const x     = i * w + gap;
          const barY  = chartH - barH;                    // top of bar
          const rx    = Math.min(3, barH * 0.4);          // clamp radius for very short bars

          // SVG path for a bar with top-only rounded corners.
          // Using quadratic bezier arcs for the two top corners; the bottom
          // two corners remain sharp. This avoids the gradient-seam issue of
          // the cancellation-rect approach.
          const barPath = barH < 1 ? '' : [
            `M ${x + rx},${barY}`,                        // top-left, after radius
            `Q ${x},${barY} ${x},${barY + rx}`,           // top-left corner
            `L ${x},${barY + barH}`,                      // left side down
            `L ${x + bw},${barY + barH}`,                 // bottom edge
            `L ${x + bw},${barY + rx}`,                   // right side up
            `Q ${x + bw},${barY} ${x + bw - rx},${barY}`, // top-right corner
            'Z',
          ].join(' ');

          return (
            <g key={d.label} aria-label={`${d.label}: ${d.value}`} role="img">
              <path
                d={barPath}
                fill={`url(#${gradId})`}
              />
              {/* Value label above bar */}
              <text
                x={x + bw / 2}
                y={barY - labelGap}
                textAnchor="middle"
                fontSize={7}
                fill="#64748b"
                fontWeight="600"
                fontFamily="inherit"
                aria-hidden="true"
              >
                {d.value}
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={`lbl-${d.label}`}
            x={i * w + w / 2}
            y={height - 4}
            textAnchor="middle"
            fontSize={7}
            fill="#94a3b8"
            fontWeight="600"
            fontFamily="inherit"
            aria-hidden="true"
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ── LineChart ─────────────────────────────────────────────────────────────────

export interface LineChartProps {
  data: ChartDataPoint[];
  height?: number;
  lineColor?: string;
  filled?: boolean;
  'aria-label': string;
  className?: string;
}

export function LineChart({
  data,
  height = 120,
  lineColor = '#034EA2',
  filled = true,
  'aria-label': ariaLabel,
  className = '',
}: LineChartProps) {
  const uid = useId().replace(/:/g, '');

  const max = Math.max(...data.map((d) => d.value), 1);
  const n = data.length;
  if (n < 2) return null;

  // Fixed viewBox dimensions that match the intended aspect ratio.
  // NOT preserveAspectRatio="none" — this stops horizontal stretching.
  // We use a wide fixed viewBox; the SVG scales proportionally inside
  // the container.
  const W   = 300;
  const H   = height;
  const pad = Math.round(H * 0.07); // ~7% padding on all sides

  const px = (i: number) => pad + (i / (n - 1)) * (W - pad * 2);
  const py = (v: number) => pad + ((max - v) / max) * (H - pad * 2);

  const points = data.map((d, i) => ({
    x: px(i),
    y: py(d.value),
    label: d.label,
    value: d.value,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[n - 1]!.x},${H - pad} L${points[0]!.x},${H - pad} Z`;

  // Dots only render when data is sparse enough to be readable
  const showDots = n <= 12;

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full ${className}`}
      style={{ height }}
    >
      <defs>
        {filled && (
          <linearGradient id={`${uid}-lc-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={lineColor} stopOpacity={0.20} />
            <stop offset="100%" stopColor={lineColor} stopOpacity={0}    />
          </linearGradient>
        )}
      </defs>

      {/* Gradient area fill — fades to transparent */}
      {filled && (
        <path
          d={areaPath}
          fill={`url(#${uid}-lc-fill)`}
          aria-hidden="true"
        />
      )}

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke={lineColor}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        aria-hidden="true"
      />

      {/* Dots — only when data is sparse enough */}
      {showDots && points.map((p) => (
        <circle
          key={p.label}
          cx={p.x}
          cy={p.y}
          r={2.5}
          fill={lineColor}
          stroke="white"
          strokeWidth={1.5}
          role="img"
          aria-label={`${p.label}: ${p.value}`}
        />
      ))}
    </svg>
  );
}
