/**
 * OrgUnitTree — Design System Component
 *
 * A card-based hierarchical organization tree matching the UHRIS
 * Company Structure list-mode visual design. Purely presentational —
 * no API calls, no domain logic, no permissions.
 *
 * Visual design (sourced from CompanyStructurePage StructureDesigner):
 *   - Root node:  dark navy (bg-slate-900) card with light text
 *   - Child nodes: white bordered cards with blue hover accent
 *   - Connector:  left border (border-l border-slate-200) + indentation
 *   - Icon badge: rounded-xl colored square containing the icon
 *   - Actions:    hover-reveal slot (opacity-0 → group-hover:opacity-100)
 *   - Meta:       right-aligned, hidden on narrow screens
 *
 * Accessibility (WAI-ARIA Tree pattern, RFC 1.2):
 *   - role="tree" on root list
 *   - role="treeitem" + aria-expanded + aria-selected + aria-level + aria-disabled
 *   - role="group" on nested lists
 *   - Keyboard: ArrowDown/Up/Left/Right/Home/End/Enter/Space
 *   - Roving tabIndex: only focused item has tabIndex=0
 *
 * Usage:
 *   <OrgUnitTree
 *     nodes={orgNodes}
 *     onSelect={(id) => navigate(`/org/${id}`)}
 *     aria-label="Company structure"
 *   />
 */

import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface OrgUnitNode {
  /** Unique identifier. */
  id: string;
  /** Primary label (org unit name). */
  label: string;
  /** Secondary label shown below the main label. */
  description?: string;
  /**
   * Icon rendered inside the colored badge square.
   * Mark it aria-hidden="true" — the label is the accessible name.
   */
  icon?: ReactNode;
  /**
   * Right-side metadata slot (headcount, budget, status counts…).
   * Caller provides any ReactNode. Hidden below md breakpoint.
   */
  meta?: ReactNode;
  /**
   * Action buttons shown on hover/focus-within.
   * Use <IconButton aria-label="Edit {name}" />.
   */
  actions?: ReactNode;
  /** Inline badge (StatusBadge, "Unit Head" tag, etc.). */
  badge?: ReactNode;
  /** Child nodes. */
  children?: OrgUnitNode[];
  /** Prevents selection; node is skipped by keyboard navigation. */
  disabled?: boolean;
}

export interface OrgUnitTreeProps {
  /** Root-level nodes. */
  nodes: OrgUnitNode[];
  /** Currently selected node id. */
  selectedId?: string;
  /** Called when a node is selected via click or keyboard. */
  onSelect?: (id: string) => void;
  /**
   * IDs that start expanded (uncontrolled).
   * Defaults to top-level node IDs.
   */
  defaultExpandedIds?: string[];
  /**
   * Controlled expanded IDs. When provided, caller owns expansion state.
   * Must supply onExpandedChange to update.
   */
  expandedIds?: string[];
  /** Called when expansion state changes (controlled mode). */
  onExpandedChange?: (ids: string[]) => void;
  /** Accessible label for the tree. */
  'aria-label'?: string;
  /** Additional class on the root element. */
  className?: string;
}

// ── Flatten helpers ───────────────────────────────────────────────────────────

function flattenVisible(nodes: OrgUnitNode[], expanded: Set<string>): OrgUnitNode[] {
  const result: OrgUnitNode[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.children?.length && expanded.has(node.id)) {
      result.push(...flattenVisible(node.children, expanded));
    }
  }
  return result;
}

function findParentId(
  nodes: OrgUnitNode[],
  targetId: string,
): string | null {
  for (const node of nodes) {
    if (node.children?.some((c) => c.id === targetId)) return node.id;
    if (node.children) {
      const found = findParentId(node.children, targetId);
      if (found !== null) return found;
    }
  }
  return null;
}

// ── Single node renderer ──────────────────────────────────────────────────────

// ── OrgUnitTree (root) ────────────────────────────────────────────────────────

// ── OrgUnitTree (root) ────────────────────────────────────────────────────────

export function OrgUnitTree({
  nodes,
  selectedId,
  onSelect,
  defaultExpandedIds,
  expandedIds: controlledExpandedIds,
  onExpandedChange,
  'aria-label': ariaLabel,
  className = '',
}: OrgUnitTreeProps) {
  const baseId = useId().replace(/:/g, '');
  const treeRef = useRef<HTMLUListElement>(null);

  // Expand state — uncontrolled by default (top-level nodes expanded)
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(() => {
    if (defaultExpandedIds) return new Set(defaultExpandedIds);
    return new Set(nodes.map((n) => n.id));
  });

  const expanded: Set<string> = controlledExpandedIds
    ? new Set(controlledExpandedIds)
    : internalExpanded;

  const setExpanded = useCallback((next: Set<string>) => {
    if (!controlledExpandedIds) setInternalExpanded(next);
    onExpandedChange?.(Array.from(next));
  }, [controlledExpandedIds, onExpandedChange]);

  // Focus tracking — roving tabIndex
  const [focusedId, setFocusedId] = useState<string | null>(() => {
    const first = flattenVisible(nodes, new Set(nodes.map((n) => n.id)))
      .find((n) => !n.disabled);
    return first?.id ?? null;
  });

  const toggleExpand = useCallback((id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpanded(next);
  }, [expanded, setExpanded]);

  const handleSelect = useCallback((id: string) => {
    setFocusedId(id);
    onSelect?.(id);
  }, [onSelect]);

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const visible = flattenVisible(nodes, expanded).filter((n) => !n.disabled);
    if (visible.length === 0) return;

    const focusEl = (id: string) => {
      setFocusedId(id);
      document.getElementById(`${baseId}-${id}`)?.focus();
    };

    const currentIdx = focusedId ? visible.findIndex((n) => n.id === focusedId) : -1;
    const current = focusedId ? visible.find((n) => n.id === focusedId) : null;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = visible[currentIdx + 1];
        if (next) focusEl(next.id);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = visible[currentIdx - 1];
        if (prev) focusEl(prev.id);
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (!current) break;
        if (current.children?.length && !expanded.has(current.id)) {
          // Expand
          const next = new Set(expanded);
          next.add(current.id);
          setExpanded(next);
        } else if (current.children?.length && expanded.has(current.id)) {
          // Move to first child
          const firstChild = visible.find(
            (n, i) => i > currentIdx && n.id === current.children![0]?.id,
          );
          if (firstChild) focusEl(firstChild.id);
        }
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (!current) break;
        if (current.children?.length && expanded.has(current.id)) {
          // Collapse
          const next = new Set(expanded);
          next.delete(current.id);
          setExpanded(next);
        } else {
          // Move to parent
          const parentId = findParentId(nodes, current.id);
          if (parentId) focusEl(parentId);
        }
        break;
      }
      case 'Home': {
        e.preventDefault();
        if (visible[0]) focusEl(visible[0].id);
        break;
      }
      case 'End': {
        e.preventDefault();
        const last = visible[visible.length - 1];
        if (last) focusEl(last.id);
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (current) {
          handleSelect(current.id);
          if (current.children?.length) toggleExpand(current.id);
        }
        break;
      }
    }
  };

  const nodeRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  // Recursive renderer returns flat JSX into the correct parent <ul>
  function renderNodes(branch: OrgUnitNode[], depth: number): ReactNode {
    return branch.map((node) => {
      const isExpanded = expanded.has(node.id);
      const isRoot = depth === 1;
      const hasChildren = Boolean(node.children?.length);

      return (
        <li
          key={node.id}
          ref={(el) => {
            if (el) nodeRefs.current.set(node.id, el);
            else nodeRefs.current.delete(node.id);
          }}
          id={`${baseId}-${node.id}`}
          role="treeitem"
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-selected={selectedId === node.id}
          aria-disabled={node.disabled || undefined}
          aria-level={depth}
          tabIndex={focusedId === node.id ? 0 : -1}
          onFocus={() => setFocusedId(node.id)}
          className="outline-none"
        >
          {/* Node row */}
          <div
            className={[
              'group mb-2 flex items-center gap-3 rounded-xl border px-3 py-3 transition select-none',
              isRoot
                ? 'border-slate-900 bg-slate-900 text-slate-300 shadow-md'
                : selectedId === node.id
                ? 'border-brand-blue/40 bg-blue-50 shadow-sm'
                : node.disabled
                ? 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm cursor-pointer',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => {
              if (node.disabled) return;
              if (hasChildren) toggleExpand(node.id);
              handleSelect(node.id);
            }}
          >
            {/* Expand/collapse chevron */}
            <button
              type="button"
              aria-label={isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
              tabIndex={-1}
              disabled={!hasChildren}
              onClick={(e) => {
                e.stopPropagation();
                if (hasChildren) toggleExpand(node.id);
              }}
              className={[
                'flex items-center justify-center rounded p-1 shrink-0 transition',
                !hasChildren && 'invisible',
                isRoot ? 'hover:bg-slate-700' : 'hover:bg-slate-100',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {isExpanded
                ? <ChevronDown size={16} aria-hidden="true" />
                : <ChevronRight size={16} aria-hidden="true" />
              }
            </button>

            {/* Icon badge */}
            {node.icon && (
              <div
                className={
                  isRoot
                    ? 'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-200'
                    : 'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600'
                }
                aria-hidden="true"
              >
                {node.icon}
              </div>
            )}

            {/* Label area */}
            <div className="min-w-0 flex-1">
              <div
                className={[
                  'flex flex-wrap items-center gap-2 text-sm font-bold',
                  isRoot
                    ? 'text-white'
                    : selectedId === node.id
                    ? 'text-brand-blue'
                    : 'text-slate-900',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className="truncate">{node.label}</span>
                {node.badge && <span>{node.badge}</span>}
              </div>
              {node.description && (
                <div
                  className={`mt-0.5 truncate text-xs font-medium ${
                    isRoot ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {node.description}
                </div>
              )}
            </div>

            {/* Meta — right side, hidden on small screens */}
            {node.meta && (
              <div
                className={`hidden md:flex items-center gap-3 text-xs ${
                  isRoot ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {node.meta}
              </div>
            )}

            {/* Actions — hover/focus-reveal */}
            {node.actions && (
              <div
                className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                {node.actions}
              </div>
            )}
          </div>

          {/* Children */}
          {hasChildren && isExpanded && (
            <ul role="group" className="ml-6 border-l border-slate-200 pl-4">
              {renderNodes(node.children!, depth + 1)}
            </ul>
          )}
        </li>
      );
    });
  }

  if (nodes.length === 0) return null;

  return (
    <ul
      ref={treeRef}
      role="tree"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={`w-full outline-none ${className}`}
    >
      {renderNodes(nodes, 1)}
    </ul>
  );
}
