/**
 * CommandPalette — Design System Component
 *
 * A keyboard-driven command launcher overlay. Opens via a trigger
 * (typically Cmd+K / Ctrl+K), shows a search input, and renders
 * grouped command items.
 *
 * Accessibility:
 *   - role="dialog" + aria-modal="true" + aria-label
 *   - Search input has aria-label and aria-controls pointing to results
 *   - Results list uses role="listbox" with role="option" items
 *   - aria-selected on the highlighted item
 *   - Keyboard: ArrowUp/Down navigates, Enter activates, Escape closes
 *
 * This component is presentation-only: callers provide commands and
 * handle the query / selection logic.
 */

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Search, Command } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  group?: string;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  /** All available commands — consumer filters by query. */
  items: CommandItem[];
  /** Current search query. */
  query: string;
  /** Called when search query changes. */
  onQueryChange: (q: string) => void;
  /** Placeholder in the search input. Default: "Search commands…" */
  placeholder?: string;
  /** aria-label for the dialog. Default: "Command palette" */
  'aria-label'?: string;
  /** Additional class on the floating panel card. */
  panelClassName?: string;
}

export function CommandPalette({
  open,
  onClose,
  items,
  query,
  onQueryChange,
  placeholder = 'Search commands\u2026',
  'aria-label': ariaLabel = 'Command palette',
  panelClassName = '',
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset active index when items change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setActiveIndex(0); }, [items]);

  // Scroll lock + initial focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, items.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        items[activeIndex]?.onSelect();
        onClose();
      } else if (e.key === 'Tab') {
        // Trap focus inside the panel
        const panel = panelRef.current;
        if (!panel) return;
        const FOCUSABLE_SELECTOR =
          'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
        const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (!focusable.length) { e.preventDefault(); return; }
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open, items, activeIndex, onClose]);

  if (!open) return null;

  // Group items
  const groups = items.reduce<Record<string, CommandItem[]>>((acc, item) => {
    const g = item.group ?? '';
    if (!acc[g]) acc[g] = [];
    acc[g]!.push(item);
    return acc;
  }, {});

  const groupEntries = Object.entries(groups);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={cn(
          'relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden',
          panelClassName,
        )}
      >
        {/* Search row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <Search size={16} className="shrink-0 text-slate-400" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={items.length > 0}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-label="Search commands"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
          />
          <kbd className="hidden shrink-0 rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 sm:block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {items.length > 0 ? (
          <div
            id={listboxId}
            role="listbox"
            aria-label="Commands"
            className="max-h-72 overflow-y-auto py-1"
          >
            {groupEntries.map(([group, groupItems]) => (
              <div key={group}>
                {group && (
                  <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {group}
                  </div>
                )}
                {groupItems.map((item) => {
                  const globalIdx = items.indexOf(item);
                  const isActive = globalIdx === activeIndex;
                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => { item.onSelect(); onClose(); }}
                      onMouseEnter={() => setActiveIndex(globalIdx)}
                      className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 transition ${
                        isActive ? 'bg-blue-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      {item.icon && (
                        <span className={`shrink-0 ${isActive ? 'text-brand-blue' : 'text-slate-400'}`} aria-hidden="true">
                          {item.icon}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-semibold ${isActive ? 'text-brand-blue' : 'text-slate-700'}`}>
                          {item.label}
                        </p>
                        {item.description && (
                          <p className="text-xs font-medium text-slate-400">{item.description}</p>
                        )}
                      </div>
                      {isActive && (
                        <kbd className="shrink-0 rounded border border-brand-blue/25 bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-brand-blue">
                          ↵
                        </kbd>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-sm font-medium text-slate-400">
            {query ? `No results for "${query}"` : 'Type to search commands'}
          </div>
        )}

        {/* Footer hint */}
        <div className="flex items-center gap-3 border-t border-slate-100 px-4 py-2">
          <Command size={11} className="text-slate-300" aria-hidden="true" />
          <span className="text-[10px] font-medium text-slate-400">
            ↑↓ navigate · ↵ select · Esc close
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
