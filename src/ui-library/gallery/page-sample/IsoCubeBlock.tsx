/**
 * IsoCubeBlock — Design System Component
 *
 * DIWA brand geometric watermark — isometric staircase boxes.
 * Reference: DIWA Certificate bottom-right corner decoration.
 *
 * Three-faced isometric boxes arranged in a 4×4 diagonal staircase
 * (bottom-left → top-right). Drop it as an absolute-positioned child
 * in any container to get the brand watermark effect.
 *
 * Usage:
 *   <div className="relative overflow-hidden">
 *     <IsoCubeBlock />
 *     {children}
 *   </div>
 *
 * Colors match DIWA Certificate spec:
 *   top face  #F3F3F5 (light grey)
 *   left face #7D739B (brand purple)
 *   right face #9B92B8 (lighter purple)
 */

export interface IsoCubeBlockProps {
  /** Width of each box in SVG units. Default: 80 */
  boxWidth?: number;
  /** Additional className on the SVG element */
  className?: string;
}

export function IsoCubeBlock({ boxWidth = 80, className = '' }: IsoCubeBlockProps) {
  const BW = boxWidth;
  const IH = BW * 0.575;  // top rhombus height ≈ BW × sin(60°)
  const SH = BW * 0.525;  // side face height

  const TOP_C   = '#F3F3F5';
  const LEFT_C  = '#7D739B';
  const RIGHT_C = '#9B92B8';

  function Box({ cx, cy }: { cx: number; cy: number }) {
    const hw = BW / 2;
    const A = `${cx + hw},${cy - IH}`;
    const B = `${cx + BW},${cy - IH / 2}`;
    const C = `${cx + hw},${cy}`;
    const D = `${cx},${cy - IH / 2}`;
    const E = `${cx + hw},${cy + SH}`;
    const F = `${cx},${cy - IH / 2 + SH}`;
    const G = `${cx + BW},${cy - IH / 2 + SH}`;
    return (
      <g>
        <polygon points={`${A} ${B} ${C} ${D}`} fill={TOP_C}   />
        <polygon points={`${D} ${C} ${E} ${F}`} fill={LEFT_C}  />
        <polygon points={`${B} ${C} ${E} ${G}`} fill={RIGHT_C} />
      </g>
    );
  }

  const COLS  = 4;
  const ROWS  = 4;
  const SVG_W = BW * 6;
  const SVG_H = BW * 4.75;
  const rowDY = -(IH / 2 + SH);
  const baseX = SVG_W - BW / 2;
  const baseY = SVG_H;

  const boxes: Array<{ cx: number; cy: number; key: string }> = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cx = baseX - col * BW + row * (BW / 2);
      const cy = baseY + row * rowDY;
      boxes.push({ cx, cy, key: `${row}-${col}` });
    }
  }

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 right-0 ${className}`}
      width={SVG_W}
      height={SVG_H}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      style={{ zIndex: 0 }}
      overflow="visible"
    >
      {[...boxes]
        .sort((a, b) => {
          const [ar, ac] = a.key.split('-').map(Number);
          const [br, bc] = b.key.split('-').map(Number);
          if (ar !== br) return (br ?? 0) - (ar ?? 0);
          return (bc ?? 0) - (ac ?? 0);
        })
        .map(({ cx, cy, key }) => (
          <Box key={key} cx={cx} cy={cy} />
        ))}
    </svg>
  );
}
