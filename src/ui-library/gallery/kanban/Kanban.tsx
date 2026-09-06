/**
 * Kanban — Design System Component
 *
 * A static column-based board for visualizing workflow states.
 * Cards are rendered by the caller; this component provides the
 * column layout and card slot structure.
 *
 * No drag-and-drop: this is a gallery demonstration component.
 * For drag-and-drop in production, add @dnd-kit or similar.
 *
 * Accessibility:
 *   - Each column is a <section> with aria-label
 *   - Card count announced via aria-label on the count badge
 *   - Card slots render as <li> items in a <ul>
 */

import type { ReactNode } from 'react';

export interface KanbanColumn {
  id: string;
  label: string;
  /** Color class for the column header accent. E.g. "bg-amber-400" */
  accentClass?: string;
  cards: KanbanCard[];
}

export interface KanbanCard {
  id: string;
  content: ReactNode;
}

export interface KanbanProps {
  columns: KanbanColumn[];
  /** Additional class on the root element. */
  className?: string;
}

export function Kanban({ columns, className = '' }: KanbanProps) {
  return (
    <div className={`w-full flex gap-4 overflow-x-auto pb-2 ${className}`}>
      {columns.map((col) => (
        <section
          key={col.id}
          aria-label={`${col.label} column, ${col.cards.length} cards`}
          className="flex w-64 shrink-0 flex-col rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden"
        >
          {/* Column header */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              {col.accentClass && (
                <span className={`h-2.5 w-2.5 rounded-full ${col.accentClass}`} aria-hidden="true" />
              )}
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600">
                {col.label}
              </h3>
            </div>
            <span
              aria-label={`${col.cards.length} cards`}
              className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-500"
            >
              {col.cards.length}
            </span>
          </div>

          {/* Cards */}
          <ul className="flex flex-col gap-2 px-3 pb-3" aria-label={`${col.label} cards`}>
            {col.cards.map((card) => (
              <li key={card.id}>
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                  {card.content}
                </div>
              </li>
            ))}
            {col.cards.length === 0 && (
              <li>
                <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-slate-200 p-4 text-xs font-medium text-slate-400">
                  No cards
                </div>
              </li>
            )}
          </ul>
        </section>
      ))}
    </div>
  );
}
