/**
 * Dropdown — Design System Component
 *
 * A controlled floating panel anchored to a trigger button.
 * The consumer owns the open state, trigger content, and panel content.
 *
 * Responsibilities:
 *   - Trigger button with aria-expanded, aria-haspopup, aria-controls
 *   - Floating panel anchored below the trigger
 *   - Close on outside click (mousedown)
 *   - Close on Escape key
 *   - Stable panel ID per instance
 *
 * This component is intentionally presentation-only. It does not:
 *   - Manage selected options
 *   - Impose role="listbox" or role="option" on children
 *   - Handle async data
 *
 * Consumers are responsible for the trigger layout, option semantics,
 * and any keyboard navigation within the panel.
 *
 * Usage:
 *   <Dropdown
 *     trigger={<><Filter size={16} /><span>Filter</span><ChevronDown size={14} /></>}
 *     isOpen={open}
 *     onToggle={() => setOpen(!open)}
 *     onClose={() => setOpen(false)}
 *   >
 *     <button onClick={() => select('all')}>All</button>
 *     <button onClick={() => select('active')}>Active</button>
 *   </Dropdown>
 */

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../lib/utils';

export interface DropdownProps {
  /** Complete trigger content — icons, label, chevron — owned by consumer. */
  trigger: ReactNode;
  /** Whether the panel is open. Owned by the consumer. */
  isOpen: boolean;
  /** Called when the trigger button is clicked. Consumer toggles isOpen. */
  onToggle: () => void;
  /** Called on outside click or Escape press. Consumer sets isOpen to false. */
  onClose: () => void;
  /** Panel content — option buttons or any children. */
  children: ReactNode;
  /** Optional className on the trigger button */
  triggerClassName?: string;
  /** Optional className on the floating panel */
  panelClassName?: string;
}

export function Dropdown({
  trigger,
  isOpen,
  onToggle,
  onClose,
  children,
  triggerClassName = '',
  panelClassName = '',
}: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const uid = useId();
  const panelId = `${uid.replace(/:/g, '')}-panel`;
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});

  // Compute portal panel position from trigger bounding rect
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPanelStyle({
      position: 'fixed',
      top: rect.bottom + 4,
      left: rect.left,
      zIndex: 9999,
      minWidth: Math.max(rect.width, 180),
    });
  }, [isOpen]);

  // Close on outside mousedown — return focus to trigger
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        onClose();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen, onClose]);

  // Close on Escape — return focus to trigger
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        ref={triggerRef}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={isOpen ? panelId : undefined}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-slate-600 transition-all',
          'hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
          triggerClassName,
        )}
      >
        {trigger}
      </button>

      {/* Panel — rendered via portal to escape overflow:hidden parents */}
      {isOpen && createPortal(
        <div
          id={panelId}
          style={panelStyle}
          className={cn(
            'max-h-[280px] overflow-y-auto',
            'rounded-xl border border-slate-200 bg-white shadow-lg',
            panelClassName,
          )}
        >
          {children}
        </div>,
        document.body,
      )}
    </div>
  );
}
