/**
 * TreeView — Design System Component
 *
 * Hierarchical tree with expand/collapse, selection, and keyboard navigation.
 *
 * WAI-ARIA Tree pattern:
 *   role="tree" on the root <ul>
 *   role="treeitem" + aria-expanded + aria-selected on each item
 *   role="group" on nested <ul> children
 *
 * Keyboard (WAI-ARIA authoring guide):
 *   ArrowDown — next visible item
 *   ArrowUp   — previous visible item
 *   ArrowRight — expand collapsed node, or move to first child
 *   ArrowLeft  — collapse expanded node, or move to parent
 *   Home       — first item in tree
 *   End        — last visible item in tree
 *   Enter      — select item
 *   Space      — select item
 *
 * Data model:
 *   const items: TreeItem[] = [
 *     { id: '1', label: 'Parent', children: [
 *       { id: '1.1', label: 'Child' },
 *     ]},
 *   ];
 *
 *   <TreeView
 *     items={items}
 *     selectedId={selected}
 *     onSelect={setSelected}
 *   />
 */

import { useCallback, useId, useRef, useState, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TreeItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  children?: TreeItem[];
}

export interface TreeViewProps {
  items: TreeItem[];
  /** Currently selected item id */
  selectedId?: string;
  /** Called when an item is selected */
  onSelect?: (id: string) => void;
  /** Optional accessible label for the tree */
  'aria-label'?: string;
  className?: string;
}

// ── Flatten visible items for keyboard navigation ─────────────────────────────

function flattenVisible(items: TreeItem[], expanded: Set<string>): TreeItem[] {
  const result: TreeItem[] = [];
  for (const item of items) {
    result.push(item);
    if (item.children && expanded.has(item.id)) {
      result.push(...flattenVisible(item.children, expanded));
    }
  }
  return result;
}

// ── Find parent of a given id ─────────────────────────────────────────────────

function findParent(items: TreeItem[], id: string): TreeItem | null {
  for (const item of items) {
    if (item.children) {
      if (item.children.some((c) => c.id === id)) return item;
      const found = findParent(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

// ── TreeNode (recursive) ──────────────────────────────────────────────────────

interface TreeNodeProps {
  item: TreeItem;
  depth: number;
  selectedId?: string;
  expanded: Set<string>;
  toggleExpand: (id: string) => void;
  onSelect: (id: string) => void;
  baseId: string;
}

function TreeNode({ item, depth, selectedId, expanded, toggleExpand, onSelect, baseId }: TreeNodeProps) {
  const hasChildren = Boolean(item.children?.length);
  const isExpanded = expanded.has(item.id);
  const isSelected = item.id === selectedId;

  const handleClick = () => {
    if (item.disabled) return;
    if (hasChildren) toggleExpand(item.id);
    onSelect(item.id);
  };

  return (
    <li
      id={`${baseId}-${item.id}`}
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
      aria-disabled={item.disabled || undefined}
      aria-level={depth}
    >
      <button
        type="button"
        onClick={handleClick}
        disabled={item.disabled}
        style={{ paddingLeft: `${(depth - 1) * 16 + 8}px` }}
        className={[
          'flex w-full items-center gap-1.5 rounded-lg py-1.5 pr-3 text-sm font-medium transition',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
          isSelected
            ? 'bg-blue-50 font-semibold text-brand-blue'
            : item.disabled
              ? 'cursor-not-allowed text-slate-300'
              : 'text-slate-700 hover:bg-slate-100',
        ].filter(Boolean).join(' ')}
      >
        {/* Expand/collapse chevron */}
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center transition-transform ${
            hasChildren ? '' : 'invisible'
          } ${isExpanded ? 'rotate-90' : ''}`}
          aria-hidden="true"
        >
          <ChevronRight size={12} />
        </span>

        {/* Icon */}
        {item.icon && (
          <span className="shrink-0 text-slate-400" aria-hidden="true">
            {item.icon}
          </span>
        )}

        {/* Label */}
        <span className="truncate">{item.label}</span>
      </button>

      {/* Children */}
      {hasChildren && isExpanded && (
        <ul role="group">
          {item.children!.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              depth={depth + 1}
              selectedId={selectedId}
              expanded={expanded}
              toggleExpand={toggleExpand}
              onSelect={onSelect}
              baseId={baseId}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// ── TreeView (root) ───────────────────────────────────────────────────────────

export function TreeView({
  items,
  selectedId,
  onSelect,
  'aria-label': ariaLabel,
  className = '',
}: TreeViewProps) {
  const baseId = useId().replace(/:/g, '');
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    // Start with top-level nodes expanded
    const s = new Set<string>();
    items.forEach((i) => { if (i.children?.length) s.add(i.id); });
    return s;
  });
  const treeRef = useRef<HTMLUListElement>(null);

  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleSelect = useCallback((id: string) => {
    onSelect?.(id);
  }, [onSelect]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const visible = flattenVisible(items, expanded);
    if (visible.length === 0) return;

    const currentId = selectedId ?? visible[0]?.id;
    const currentIdx = visible.findIndex((v) => v.id === currentId);
    const current = visible[currentIdx];

    const focusItem = (id: string) => {
      handleSelect(id);
      document.getElementById(`${baseId}-${id}`)?.querySelector('button')?.focus();
    };

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = visible[currentIdx + 1];
        if (next && !next.disabled) focusItem(next.id);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        let prev = visible[currentIdx - 1];
        while (prev && prev.disabled) {
          const idx = visible.indexOf(prev);
          prev = visible[idx - 1];
        }
        if (prev) focusItem(prev.id);
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (current?.children?.length && !expanded.has(current.id)) {
          toggleExpand(current.id);
        } else {
          const child = current?.children?.[0];
          if (child && !child.disabled) focusItem(child.id);
        }
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (current?.children?.length && expanded.has(current.id)) {
          toggleExpand(current.id);
        } else {
          const parent = findParent(items, current?.id ?? '');
          if (parent) focusItem(parent.id);
        }
        break;
      }
      case 'Home': {
        e.preventDefault();
        const first = visible.find((v) => !v.disabled);
        if (first) focusItem(first.id);
        break;
      }
      case 'End': {
        e.preventDefault();
        const last = [...visible].reverse().find((v) => !v.disabled);
        if (last) focusItem(last.id);
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (current && !current.disabled) {
          if (current.children?.length) toggleExpand(current.id);
          handleSelect(current.id);
        }
        break;
      }
    }
  };

  return (
    <ul
      ref={treeRef}
      role="tree"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={cn('flex flex-col gap-0.5 outline-none', className)}
      tabIndex={0}
    >
      {items.map((item) => (
        <TreeNode
          key={item.id}
          item={item}
          depth={1}
          selectedId={selectedId}
          expanded={expanded}
          toggleExpand={toggleExpand}
          onSelect={handleSelect}
          baseId={baseId}
        />
      ))}
    </ul>
  );
}
