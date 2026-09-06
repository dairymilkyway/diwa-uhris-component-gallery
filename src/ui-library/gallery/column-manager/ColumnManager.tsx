/**
 * ColumnManager — Design System Component
 *
 * A dropdown panel for managing table column visibility and order.
 * Provides checkboxes to show/hide individual columns and up/down
 * buttons to reorder them. Includes a reset action.
 *
 * Purely presentational — all state is owned by the caller.
 *
 * Usage:
 *   const [hidden, setHidden] = useState<string[]>([]);
 *   const [order, setOrder] = useState<string[] | null>(null);
 *
 *   <ColumnManager
 *     columns={[{ key: 'name', label: 'Name' }, { key: 'dept', label: 'Department' }]}
 *     hiddenColumnKeys={hidden}
 *     columnOrder={order}
 *     onHiddenColumnKeysChange={setHidden}
 *     onColumnOrderChange={setOrder}
 *     onReset={() => { setHidden([]); setOrder(null); }}
 *   />
 *
 * Accessibility:
 *   - Trigger button has aria-expanded and aria-controls.
 *   - Panel has role="region" and aria-label.
 *   - Each checkbox is labelled via htmlFor + id.
 *   - Reorder buttons have descriptive aria-labels.
 *   - Panel closes on Escape, focus returns to the trigger.
 */

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ColumnManagerColumn {
  /** Unique key matching the data column identifier. */
  key: string;
  /** Human-readable column label shown in the panel. */
  label: string;
}

export interface ColumnManagerProps {
  /** All available columns in their default order. */
  columns: ColumnManagerColumn[];
  /** Keys of currently hidden columns. */
  hiddenColumnKeys: string[];
  /**
   * Current column order as an array of keys.
   * Pass null to use the default order from `columns`.
   */
  columnOrder: string[] | null;
  /** Called with the new hidden-keys array when visibility changes. */
  onHiddenColumnKeysChange: (keys: string[]) => void;
  /** Called with the new key order when a column is moved. */
  onColumnOrderChange: (order: string[]) => void;
  /** Called when the user clicks Reset — caller restores defaults. */
  onReset: () => void;
  /** Label for the trigger button. Default: "Columns" */
  triggerLabel?: string;
  className?: string;
}

// ── Utility ───────────────────────────────────────────────────────────────────

/**
 * Apply a stored column order to the runtime column array.
 *
 * Rules:
 * - Keys in `order` that don't exist in `columns` are silently ignored
 *   (forward compatibility when columns are removed).
 * - Columns not present in `order` are appended at the end in their
 *   original relative order (forward compatibility when columns are added).
 * - When `order` is null the original array is returned unchanged.
 */
export function applyColumnOrder(
  columns: ColumnManagerColumn[],
  order: string[] | null,
): ColumnManagerColumn[] {
  if (!order) return columns;
  const byKey = new Map(columns.map((c) => [c.key, c]));
  const seen = new Set<string>();
  const result: ColumnManagerColumn[] = [];
  for (const key of order) {
    const col = byKey.get(key);
    if (col) { result.push(col); seen.add(key); }
  }
  for (const col of columns) {
    if (!seen.has(col.key)) result.push(col);
  }
  return result;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ColumnManager({
  columns,
  hiddenColumnKeys,
  columnOrder,
  onHiddenColumnKeysChange,
  onColumnOrderChange,
  onReset,
  triggerLabel = 'Columns',
  className = '',
}: ColumnManagerProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const panelId    = 'cm-panel';

  const orderedColumns = applyColumnOrder(columns, columnOrder);
  const hiddenSet = new Set(hiddenColumnKeys);
  const hiddenCount = hiddenColumnKeys.length;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        panelRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  // Close on Escape, return focus to trigger
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  function toggleColumn(key: string) {
    const next = hiddenSet.has(key)
      ? hiddenColumnKeys.filter((k) => k !== key)
      : [...hiddenColumnKeys, key];
    onHiddenColumnKeysChange(next);
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const next = [...orderedColumns];
    [next[index - 1], next[index]] = [next[index]!, next[index - 1]!];
    onColumnOrderChange(next.map((c) => c.key));
  }

  function moveDown(index: number) {
    if (index === orderedColumns.length - 1) return;
    const next = [...orderedColumns];
    [next[index], next[index + 1]] = [next[index + 1]!, next[index]!];
    onColumnOrderChange(next.map((c) => c.key));
  }

  return (
    <div className={cn('relative inline-block', className)}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      >
        {triggerLabel}
        {hiddenCount > 0 && (
          <span className="rounded-full bg-brand-blue/10 px-1.5 py-0.5 font-bold text-brand-blue">
            {hiddenCount} hidden
          </span>
        )}
        <ChevronDown
          size={13}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Panel */}
      {open && (
        <div
          id={panelId}
          ref={panelRef}
          role="region"
          aria-label="Manage columns"
          className="absolute right-0 top-full z-30 mt-1 flex w-64 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
          style={{ maxHeight: 400 }}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-2.5">
            <span className="text-xs font-bold text-slate-700">Columns</span>
            <button
              type="button"
              onClick={() => { onReset(); setOpen(false); }}
              className="rounded-md px-2 py-1 text-[11px] font-bold text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-blue/30 transition"
            >
              Reset
            </button>
          </div>

          {/* Column list */}
          <ul className="overflow-y-auto" role="list">
            {orderedColumns.map((col, idx) => {
              const visible = !hiddenSet.has(col.key);
              const checkboxId = `cm-col-${col.key}`;
              return (
                <li
                  key={col.key}
                  className="flex items-center gap-2 border-b border-slate-50 px-3 py-2 last:border-0"
                >
                  {/* Visibility checkbox */}
                  <input
                    type="checkbox"
                    id={checkboxId}
                    checked={visible}
                    onChange={() => toggleColumn(col.key)}
                    className="h-3.5 w-3.5 rounded accent-brand-blue focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-blue/30"
                  />
                  <label
                    htmlFor={checkboxId}
                    className={`flex-1 cursor-pointer text-xs font-medium ${visible ? 'text-slate-700' : 'text-slate-400'}`}
                  >
                    {col.label}
                  </label>

                  {/* Reorder buttons */}
                  <div className="flex shrink-0 gap-0.5">
                    <button
                      type="button"
                      aria-label={`Move ${col.label} up`}
                      disabled={idx === 0}
                      onClick={() => moveUp(idx)}
                      className="rounded p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-blue/30 transition"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      aria-label={`Move ${col.label} down`}
                      disabled={idx === orderedColumns.length - 1}
                      onClick={() => moveDown(idx)}
                      className="rounded p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-blue/30 transition"
                    >
                      ▼
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
