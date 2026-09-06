/**
 * OrgChart — Design System Component
 *
 * A D3-powered SVG organization chart matching the UHRIS Company Structure
 * diagram mode. Renders a top-down tree with rectangular nodes and
 * stepped orthogonal connectors.
 *
 * Technology: D3 v7 (d3.hierarchy + d3.tree layout + d3.zoom)
 * Already a production dependency — no new packages introduced.
 *
 * Visual design (sourced from CompanyStructurePage diagram mode):
 *   Nodes:
 *     - 250 × 84 px rounded rectangles (rx=14)
 *     - Root (depth 0): dark navy fill (#0f172a), white text
 *     - Children: white fill (#fff), slate border (#e2e8f0)
 *     - drop-shadow: 0 6px 12px rgba(15,23,42,0.08)
 *     - Name: 13px, font-weight 800, centered
 *     - Description: 11px, font-weight 600, #64748b / #cbd5e1 (root)
 *     - Selected: indigo border overlay ring
 *   Connectors:
 *     - Stepped orthogonal path: M→V→H→V
 *     - Stroke: #cbd5e1, stroke-width 1.5
 *   Canvas:
 *     - Viewport sized to container; fit-to-view on render
 *     - Zoom: scaleExtent [0.05, 1.8]
 *     - Pan: mouse/touch drag
 *     - Layout: nodeSize [280, 185] — horizontal × vertical spacing
 *   Controls:
 *     - ZoomIn, Reset, ZoomOut buttons (top-right overlay panel)
 *
 * Accessibility:
 *   - SVG has role="img" + aria-label
 *   - Zoom controls have aria-label
 *   - Keyboard: Tab to control buttons; diagram itself is navigated visually
 *   - Note: full ARIA tree semantics are not possible in an SVG diagram;
 *     use OrgUnitTree for a fully keyboard-accessible list-based alternative
 *
 * Usage:
 *   <OrgChart
 *     nodes={orgNodes}
 *     selectedId={selectedId}
 *     onSelect={setSelectedId}
 *     aria-label="Company organization chart"
 *   />
 */

import * as d3 from 'd3';
import { useEffect, useRef, useId } from 'react';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface OrgChartNode {
  /** Unique identifier. */
  id: string;
  /** Primary label — org unit name. */
  label: string;
  /** Secondary text line inside the node. */
  description?: string;
  /** Child nodes. */
  children?: OrgChartNode[];
}

export interface OrgChartProps {
  /**
   * Root-level nodes. The chart renders one connected tree.
   * If multiple roots are provided, a synthetic invisible root is created
   * to connect them (matching D3 hierarchy requirements).
   */
  nodes: OrgChartNode[];
  /** Currently selected node id — renders an indigo ring on the node. */
  selectedId?: string;
  /** Called when a node is clicked. */
  onSelect?: (id: string) => void;
  /**
   * Container height. Default: '75vh' — matching the production CompanyStructurePage.
   * Pass a fixed pixel value for demos: '480px'.
   */
  height?: string;
  /** Accessible label for the SVG element. */
  'aria-label'?: string;
  /** Additional class on the root container div. */
  className?: string;
}

// ── Internal D3 node data ─────────────────────────────────────────────────────

interface D3NodeDatum {
  id: string;
  name: string;
  description: string;
  isRoot: boolean;
  isSyntheticRoot: boolean;
  originalId: string;
  children?: D3NodeDatum[];
}

function buildD3Tree(nodes: OrgChartNode[]): D3NodeDatum {
  function convert(node: OrgChartNode, depth: number): D3NodeDatum {
    return {
      id: node.id,
      name: node.label,
      description: node.description ?? '',
      isRoot: depth === 0,
      isSyntheticRoot: false,
      originalId: node.id,
      children: node.children?.map((c) => convert(c, depth + 1)),
    };
  }

  if (nodes.length === 1) {
    return convert(nodes[0]!, 0);
  }

  // Multiple roots: wrap in a transparent synthetic root
  return {
    id: '__synthetic_root__',
    name: '',
    description: '',
    isRoot: true,
    isSyntheticRoot: true,
    originalId: '__synthetic_root__',
    children: nodes.map((n) => convert(n, 0)),
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export function OrgChart({
  nodes,
  selectedId,
  onSelect,
  height = '75vh',
  'aria-label': ariaLabel = 'Organization chart',
  className = '',
}: OrgChartProps) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const initialTransformRef = useRef<d3.ZoomTransform | null>(null);
  // Stores the tree coordinate bounds so fitToView() can recalculate on resize.
  const treeBoundsRef = useRef<{ minX: number; maxX: number; minY: number; maxY: number } | null>(null);
  const uid = useId().replace(/:/g, '');

  // ── fitToView: calculate and apply the centered fit transform ───────────────
  // Called on initial draw, browser resize, and Reset button.
  // Reads the SVG's actual rendered dimensions at call time.
  const fitToView = () => {
    if (!svgRef.current || !zoomRef.current || !treeBoundsRef.current) return;

    const { width: W, height: H } = svgRef.current.getBoundingClientRect();
    if (W === 0 || H === 0) return; // not yet laid out

    const { minX, maxX, minY, maxY } = treeBoundsRef.current;

    // Visual bounds of the tree content (nodes are 250×84 centered at their coords).
    const contentLeft   = minX - 125;
    const contentRight  = maxX + 125;
    const contentTop    = minY - 42;
    const contentBottom = maxY + 42;
    const contentWidth  = contentRight  - contentLeft;
    const contentHeight = contentBottom - contentTop;

    // Scale to fill the viewport with padding, clamped to the zoom extent.
    const PAD = 40;
    const scaleX = (W - PAD * 2) / Math.max(1, contentWidth);
    const scaleY = (H - PAD * 2) / Math.max(1, contentHeight);
    const scale  = Math.max(0.05, Math.min(1.8, scaleX, scaleY));

    // Translate so the content's visual center lands at the viewport center.
    const contentCenterX = (contentLeft + contentRight)  / 2;
    const contentCenterY = (contentTop  + contentBottom) / 2;
    const tx = W / 2 - contentCenterX * scale;
    const ty = H / 2 - contentCenterY * scale;

    const t = d3.zoomIdentity.translate(tx, ty).scale(scale);
    initialTransformRef.current = t;
    d3.select(svgRef.current).call(zoomRef.current.transform, t);
  };

  // ── Build / redraw ─────────────────────────────────────────────────────────
  // Builds the D3 tree layout and renders nodes/connectors into the SVG.
  // Does NOT apply the fit transform — fitToView() does that separately
  // so it can be called again on resize without rebuilding the tree.
  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const treeData = buildD3Tree(nodes);
    const root = d3.hierarchy(treeData);

    // Layout — matches production exactly: nodeSize([280, 185])
    d3.tree<D3NodeDatum>().nodeSize([280, 185])(root);

    // Store tree coordinate bounds for fitToView() calls.
    const descendants = root.descendants();
    treeBoundsRef.current = {
      minX: d3.min(descendants, (d) => d.x) ?? 0,
      maxX: d3.max(descendants, (d) => d.x) ?? 0,
      minY: d3.min(descendants, (d) => d.y) ?? 0,
      maxY: d3.max(descendants, (d) => d.y) ?? 0,
    };

    // Zoom setup
    const g = svg.append('g');
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.05, 1.8])
      .on('zoom', (e) => g.attr('transform', e.transform.toString()));
    zoomRef.current = zoom;
    svg.call(zoom);

    // ── Connectors ──────────────────────────────────────────────────────────
    g.selectAll('path')
      .data(root.links().filter((l) => !l.source.data.isSyntheticRoot))
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1.5)
      .attr('d', (link) => {
        const sx = link.source.x ?? 0;
        const sy = link.source.y ?? 0;
        const tx = link.target.x ?? 0;
        const ty = link.target.y ?? 0;
        const mid = (sy + ty) / 2;
        return `M${sx},${sy}V${mid}H${tx}V${ty}`;
      });

    // ── Nodes ────────────────────────────────────────────────────────────────
    const node = g
      .selectAll<SVGGElement, d3.HierarchyPointNode<D3NodeDatum>>('g.node')
      .data(root.descendants().filter((d) => !d.data.isSyntheticRoot))
      .join('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.x},${d.y})`)
      .style('cursor', (d) => (d.data.originalId !== '__synthetic_root__' ? 'pointer' : 'default'))
      .on('click', (_e, d) => {
        if (d.data.isSyntheticRoot) return;
        onSelect?.(d.data.originalId);
      });

    node
      .append('rect')
      .attr('x', -125)
      .attr('y', -42)
      .attr('width', 250)
      .attr('height', 84)
      .attr('rx', 14)
      .attr('fill', (d) => (d.data.isRoot ? '#0f172a' : '#fff'))
      .attr('stroke', (d) => {
        if (selectedId && d.data.originalId === selectedId) return '#6366f1';
        return d.data.isRoot ? '#0f172a' : '#e2e8f0';
      })
      .attr('stroke-width', (d) =>
        selectedId && d.data.originalId === selectedId ? 2.5 : 1,
      )
      .attr('filter', 'drop-shadow(0 6px 12px rgba(15,23,42,0.08))');

    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', -8)
      .attr('font-size', 13)
      .attr('font-weight', 800)
      .attr('fill', (d) => (d.data.isRoot ? '#fff' : '#0f172a'))
      .text((d) => d.data.name);

    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', 16)
      .attr('font-size', 11)
      .attr('font-weight', 600)
      .attr('fill', (d) => (d.data.isRoot ? '#cbd5e1' : '#64748b'))
      .text((d) => d.data.description);

    if (selectedId) {
      node
        .filter((d) => d.data.originalId === selectedId)
        .append('rect')
        .attr('x', -128)
        .attr('y', -45)
        .attr('width', 256)
        .attr('height', 90)
        .attr('rx', 16)
        .attr('fill', 'none')
        .attr('stroke', '#6366f1')
        .attr('stroke-width', 2.5)
        .attr('opacity', 0.6);
    }

    // Apply initial fit after DOM is painted.
    // requestAnimationFrame ensures the SVG has its final CSS dimensions
    // before we call getBoundingClientRect() for the fit calculation.
    requestAnimationFrame(() => { fitToView(); });

  }, [nodes, selectedId, onSelect]);

  // ── ResizeObserver: refit when the SVG's rendered size changes ─────────────
  // Handles: initial mount (if dimensions weren't ready in the effect),
  // browser resize, and gallery layout changes.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => { fitToView(); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Zoom helpers ───────────────────────────────────────────────────────────
  const zoomBy = (factor: number) => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(250)
      .call(zoomRef.current.scaleBy, factor);
  };

  const resetZoom = () => {
    // Re-runs the same fit algorithm with current SVG dimensions.
    // This means Reset correctly handles resized viewports.
    fitToView();
  };

  const controlBtnClass = [
    'appearance-none border-0 bg-none font-[inherit]',
    'flex items-center justify-center rounded-lg p-2',
    'text-slate-400 transition hover:bg-slate-100 hover:text-slate-700',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
  ].join(' ');

  return (
    <div
      className={`relative w-full overflow-hidden bg-slate-50/50 ${className}`}
      style={{ height }}
    >
      {/* Zoom controls — top-right panel, matching production */}
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2 rounded-lg border border-slate-100 bg-white p-2 shadow-md">
        <button
          type="button"
          className={controlBtnClass}
          onClick={() => zoomBy(1.2)}
          aria-label="Zoom in"
        >
          <ZoomIn size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={controlBtnClass}
          onClick={resetZoom}
          aria-label="Reset zoom"
        >
          <RotateCcw size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={controlBtnClass}
          onClick={() => zoomBy(0.8)}
          aria-label="Zoom out"
        >
          <ZoomOut size={16} aria-hidden="true" />
        </button>
      </div>

      {/* D3 SVG canvas */}
      <svg
        ref={svgRef}
        id={uid}
        width="100%"
        height="100%"
        className="block touch-none"
        role="img"
        aria-label={ariaLabel}
      />
    </div>
  );
}
