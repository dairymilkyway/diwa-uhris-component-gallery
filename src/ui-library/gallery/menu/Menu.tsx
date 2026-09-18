/**
 * Menu — Design System Component
 *
 * A dropdown menu anchored to a trigger. Opens on trigger click,
 * closes on outside-click or Escape. Full keyboard navigation:
 * ArrowDown/ArrowUp to move between items, Home/End for first/last,
 * Escape to close.
 *
 * Follows WAI-ARIA Menu Button pattern:
 *   - trigger: role="button", aria-haspopup="menu", aria-expanded
 *   - panel:   role="menu"
 *   - items:   role="menuitem"
 *
 * Usage:
 *   <Menu
 *     trigger={<button>Actions</button>}
 *     items={[
 *       { label: 'Edit',   icon: <Pencil size={14} />, onClick: handleEdit },
 *       { label: 'Delete', icon: <Trash2 size={14} />, onClick: handleDelete, tone: 'danger' },
 *     ]}
 *   />
 */

import { cloneElement, isValidElement, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../lib/utils';

export type MenuItemTone = 'default' | 'danger';

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  tone?: MenuItemTone;
  disabled?: boolean;
}

export interface MenuProps {
  /** The trigger element. Should be a visible button-like control. */
  trigger: ReactNode;
  /** Menu items. */
  items: MenuItem[];
  /** Accessible label for the panel (aria-label). Defaults to "Menu". */
  ariaLabel?: string;
  /**
   * Panel alignment relative to the trigger.
   * 'left'  — panel left edge aligns with trigger left edge
   * 'right' — panel right edge aligns with trigger right edge (default)
   */
  align?: 'left' | 'right';
  /** Controlled open state. When provided, the caller manages open/close. */
  open?: boolean;
  /** Called when the menu should open or close. */
  onOpenChange?: (open: boolean) => void;
  /** Additional class on the floating panel. */
  panelClassName?: string;
}

export function Menu({
  trigger,
  items,
  ariaLabel = 'Menu',
  align = 'right',
  open: controlledOpen,
  onOpenChange,
  panelClassName = '',
}: MenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});

  // Compute portal panel position from trigger bounding rect.
  // Flips the panel above the trigger when there isn't room below (e.g. lower
  // table rows), so it never overflows past the viewport / behind the taskbar.
  useEffect(() => {
    if (!open || !triggerRef.current) return;

    const GAP = 4;
    const MARGIN = 8; // keep clear of the very edge / taskbar
    const PANEL_MIN_WIDTH = 176; // min-w-[11rem]
    const ROW_HEIGHT = 36; // ~py-2 + text; used to estimate height before first paint
    const HEADER_HEIGHT = 8; // py-1 top+bottom padding

    const reposition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const panelHeight =
        panelRef.current?.offsetHeight ?? items.length * ROW_HEIGHT + HEADER_HEIGHT;

      const spaceBelow = window.innerHeight - rect.bottom;
      const flipUp = spaceBelow < panelHeight + GAP + MARGIN && rect.top > spaceBelow;

      setPanelStyle({
        position: 'fixed',
        // When flipping up, anchor to the bottom so the panel grows upward and
        // its height is irrelevant to the top edge staying on-screen.
        ...(flipUp
          ? { bottom: Math.max(MARGIN, window.innerHeight - rect.top + GAP) }
          : { top: rect.bottom + GAP }),
        left: align === 'left' ? rect.left : Math.max(MARGIN, rect.right - PANEL_MIN_WIDTH),
        zIndex: 9999,
        minWidth: Math.max(rect.width, PANEL_MIN_WIDTH),
      });
    };

    // Run once now (estimated height), then again after paint (measured height).
    reposition();
    const raf = window.requestAnimationFrame(reposition);

    // Reposition on resize (layout change without the trigger scrolling away).
    // Scroll is handled by the dismiss effect below (it closes the menu).
    window.addEventListener('resize', reposition);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', reposition);
    };
  }, [open, align, items.length]);

  // ── Outside click and Escape ────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent) => {
      // Close if click is outside both the trigger wrapper and the panel
      const target = e.target as Node;
      if (
        containerRef.current && !containerRef.current.contains(target) &&
        !(panelRef.current && panelRef.current.contains(target))
      ) {
        setOpen(false);
        // Return focus to the trigger's first focusable child
        const btn = triggerRef.current?.querySelector<HTMLElement>('button,a,[tabindex]');
        btn?.focus();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        // Return focus to the trigger's first focusable child
        const btn = triggerRef.current?.querySelector<HTMLElement>('button,a,[tabindex]');
        btn?.focus();
      }
    };
    // Close on scroll of any ancestor. The panel is a fixed-position portal, so
    // once the trigger scrolls under sticky/higher-layered content the panel
    // would otherwise float over unrelated UI. Ignore scrolls inside the panel.
    const handleScroll = (e: Event) => {
      if (panelRef.current && e.target instanceof Node && panelRef.current.contains(e.target)) return;
      setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, true);
    // Focus first non-disabled item on open
    window.setTimeout(() => {
      const first = itemRefs.current.find((r) => r && !r.disabled);
      first?.focus();
    }, 0);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [open]);

  const focusItem = (index: number) => {
    const next = ((index % items.length) + items.length) % items.length;
    itemRefs.current[next]?.focus();
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem(index + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItem(index - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusItem(items.length - 1);
    }
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Trigger wrapper — injects aria-expanded/haspopup onto the trigger element */}
      <div
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      >
        {isValidElement(trigger)
          ? cloneElement(trigger as React.ReactElement<Record<string, unknown>>, {
              'aria-expanded': open,
              'aria-haspopup': 'menu' as const,
            })
          : trigger}
      </div>

      {/* Panel — rendered via portal to escape overflow:hidden parents */}
      {open && createPortal(
        <div
          ref={panelRef}
          role="menu"
          aria-label={ariaLabel}
          style={panelStyle}
          className={cn(
            'overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl',
            panelClassName,
          )}
        >
          {items.map((item, index) => (
            <button
              key={item.label}
              ref={(node) => { itemRefs.current[index] = node; }}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
              onKeyDown={(e) => handleItemKeyDown(e, index)}
              className={[
                'flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm font-semibold transition',
                'border-l-2 border-transparent',
                'focus-visible:outline-none focus-visible:bg-[#eef2f8]',
                'disabled:cursor-not-allowed disabled:opacity-40',
                item.tone === 'danger'
                  ? 'text-rose-600 hover:bg-rose-50 hover:border-l-rose-400'
                  : 'text-slate-700 hover:bg-[#eef2f8] hover:border-l-brand-blue',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {item.icon && (
                <span className="shrink-0 text-current opacity-60" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          ))}
        </div>,
        document.body,
      )}
    </div>
  );
}
