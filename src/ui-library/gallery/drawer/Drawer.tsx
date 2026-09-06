/**
 * Drawer — Design System Component
 *
 * A slide-in panel anchored to the screen edge. Supports right (default)
 * and bottom placements.
 *
 * Adaptation note: framer-motion animation replaced with CSS transitions
 * (translate + opacity) for the standalone gallery which does not include
 * framer-motion as a dependency.
 */

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';

export type DrawerPlacement = 'right' | 'bottom';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: string;
  placement?: DrawerPlacement;
  width?: string;
  maxHeight?: string;
  closeLabel?: string;
  children: ReactNode;
  /** Additional class on the drawer panel. */
  className?: string;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

const PLACEMENT_PANEL_CLASS: Record<DrawerPlacement, string> = {
  right:  'fixed top-0 right-0 bottom-0 flex flex-col',
  bottom: 'fixed bottom-0 left-0 right-0 flex flex-col rounded-t-xl',
};

export function Drawer({
  open,
  onClose,
  title,
  description,
  placement = 'right',
  width = 'w-80',
  maxHeight = 'max-h-[85vh]',
  closeLabel = 'Close drawer',
  children,
  className = '',
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId  = useId();
  // rendered tracks whether the portal is mounted at all
  const [rendered, setRendered] = useState(open);
  // visible tracks the CSS transition state
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRendered(true);
      // Allow the element to mount before starting the transition
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      // Remove from DOM after transition completes
      const timer = window.setTimeout(() => setRendered(false), 300);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  // Effect 1: scroll lock + initial focus + focus restoration
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement : null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      const panel = panelRef.current;
      const focusable = panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
      (focusable[0] ?? panel)?.focus();
    }, 0);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
      previousFocus?.focus();
    };
  }, [open]);

  // Effect 2: keyboard — Escape + focus trap
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!focusable.length) { e.preventDefault(); panel.focus(); return; }
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!rendered) return null;

  const panelClass = cn(
    PLACEMENT_PANEL_CLASS[placement],
    placement === 'right' ? width : maxHeight,
    'bg-white shadow-xl focus:outline-none',
    placement === 'bottom' ? 'overflow-y-auto' : 'overflow-hidden',
    'transition-transform duration-300 ease-out',
    placement === 'right'
      ? (visible ? 'translate-x-0' : 'translate-x-full')
      : (visible ? 'translate-y-0' : 'translate-y-full'),
    className,
  );

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-brand-navy/50 backdrop-blur-sm transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? `${titleId}-desc` : undefined}
        tabIndex={-1}
        className={panelClass}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-slate-100 shrink-0">
          <div className="min-w-0">
            <h2 id={titleId} className="font-heading text-base font-bold text-slate-900 truncate">
              {title}
            </h2>
            {description && (
              <p id={`${titleId}-desc`} className="text-xs text-slate-500 mt-0.5">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="ml-3 shrink-0 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
