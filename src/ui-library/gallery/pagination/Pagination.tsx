/**
 * Pagination — Design System Component
 *
 * Renders previous/next navigation and page number pills.
 * Presentation-only — the consuming feature owns page state.
 *
 * Page numbers collapse intelligently with ellipsis when there are
 * more pages than can fit (> 7 pages visible at once).
 *
 * Usage:
 *   <Pagination
 *     page={page}
 *     totalPages={totalPages}
 *     onPageChange={setPage}
 *   />
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface PaginationProps {
  /** Current page number (1-indexed) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Called when the user selects a different page */
  onPageChange: (page: number) => void;
  /** Accessible label for the navigation landmark (default: "Pagination") */
  ariaLabel?: string;
  /**
   * Total number of records across all pages.
   * When provided alongside `pageSize`, renders a "Showing X–Y of Z {itemLabel}" line.
   */
  totalItems?: number;
  /**
   * Number of records per page.
   * Required together with `totalItems` to compute the Showing X–Y range.
   */
  pageSize?: number;
  /**
   * Label for the item type shown in the record count footer.
   * Example: "employees", "records", "results"
   * Default: "items"
   */
  itemLabel?: string;
  className?: string;
}

// ── Page number generation ─────────────────────────────────────────────────

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];

  if (current > 3) pages.push('ellipsis');

  const start = Math.max(2, current - 1);
  const end   = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('ellipsis');

  pages.push(total);
  return pages;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Pagination({
  page,
  totalPages,
  onPageChange,
  ariaLabel = 'Pagination',
  totalItems,
  pageSize,
  itemLabel = 'items',
  className = '',
}: PaginationProps) {
  if (totalPages <= 1 && !totalItems) return null;

  // "Showing X–Y of Z items" footer — only when both totalItems and pageSize are provided
  const showRecordCount = typeof totalItems === 'number' && typeof pageSize === 'number';
  const rangeStart = showRecordCount ? (page - 1) * pageSize + 1 : null;
  const rangeEnd   = showRecordCount ? Math.min(page * pageSize, totalItems!) : null;

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {/* Record count — left side */}
      {showRecordCount ? (
        <p className="text-[11px] font-bold tabular-nums text-slate-400" aria-live="polite">
          Showing {rangeStart}–{rangeEnd} of {totalItems} {itemLabel}
        </p>
      ) : <span />}

      {/* Page nav — right side, only when there is more than one page */}
      {totalPages > 1 && (
      <nav aria-label={ariaLabel}>
        <ol className="list-none flex items-center gap-1" role="list">
        {/* Previous */}
        <li>
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((n, idx) =>
          n === 'ellipsis' ? (
            <li key={`ellipsis-${idx}`} aria-hidden="true">
              <span className="flex h-9 w-9 items-center justify-center text-xs font-bold text-slate-300">
                …
              </span>
            </li>
          ) : (
            <li key={n}>
              <button
                type="button"
                onClick={() => onPageChange(n)}
                aria-label={`Page ${n}`}
                aria-current={n === page ? 'page' : undefined}
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-md text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
                  n === page
                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                    : 'border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {n}
              </button>
            </li>
          ),
        )}

        {/* Next */}
        <li>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </li>
      </ol>
    </nav>
      )}
    </div>
  );
}
