/**
 * Dialog — Design System Component
 *
 * A focus-blocking modal dialog.
 *
 * Behavior is provided by @radix-ui/react-dialog, which handles:
 *   - Focus trap (Tab / Shift+Tab contained within dialog)
 *   - Focus restoration (returns to trigger on close)
 *   - Escape key dismissal (unless preventClose)
 *   - Backdrop interaction dismissal (unless preventClose)
 *   - Body scroll lock while open
 *   - Portal rendering to document.body
 *   - role="dialog" + aria-modal + aria-labelledby + aria-describedby
 *   - Modal semantics
 *
 * DIWA continues to own:
 *   - Public API (open, onClose, title, description, size, preventClose, children)
 *   - Backdrop visual treatment
 *   - Panel visual treatment (bg, border, radius, shadow, sizing)
 *   - Header layout and typography
 *   - Close button styling
 *   - DialogBody and DialogFooter layout
 *
 * Composition:
 *   <Dialog open={open} onClose={close} title="…">
 *     <DialogBody>…</DialogBody>
 *     <DialogFooter>…</DialogFooter>
 *   </Dialog>
 */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { typography } from '../../tokens/typography';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  /** When true, Escape and backdrop click will not close the dialog */
  preventClose?: boolean;
  size?: DialogSize;
  children?: ReactNode;
  /** Called when focus moves into the content after opening. */
  onOpenAutoFocus?: (e: Event) => void;
  /** Called when focus moves to the trigger after closing. */
  onCloseAutoFocus?: (e: Event) => void;
  /** Called when the Escape key is pressed. Return e.preventDefault() to suppress close. */
  onEscapeKeyDown?: (e: KeyboardEvent) => void;
  /** Called when a pointer-down event occurs outside the content. Return e.preventDefault() to suppress close. */
  onInteractOutside?: (e: Event) => void;
}

export interface DialogBodyProps {
  children: ReactNode;
  className?: string;
}

export interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

// ── Style maps ────────────────────────────────────────────────────────────────

const SIZE_CLASS: Record<DialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

// ── Sub-components — pure DIWA layout, no Radix involvement ──────────────────

export function DialogBody({ children, className = '' }: DialogBodyProps) {
  return (
    <div className={cn('min-h-0 overflow-y-auto overscroll-contain px-6 py-4', className)}>
      {children}
    </div>
  );
}

export function DialogFooter({ children, className = '' }: DialogFooterProps) {
  return (
    <div className={cn('flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4', className)}>
      {children}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function Dialog({
  open,
  onClose,
  title,
  description,
  preventClose = false,
  size = 'md',
  children,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onInteractOutside,
}: DialogProps) {
  const hasTitle = Boolean(title);
  const hasDesc  = Boolean(description);

  return (
    // Radix Dialog.Root drives open/close state.
    // onOpenChange is called when Radix wants to close (Escape, outside click).
    // We route it through DIWA's onClose, respecting preventClose.
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(isOpen) => {
        // Radix calls onOpenChange(false) when closing.
        // Ignore opening attempts from Radix (we control open externally).
        if (!isOpen && !preventClose) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        {/* Backdrop — DIWA visual treatment */}
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-brand-navy/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 duration-200"
        />

        {/* Panel — DIWA visual treatment */}
        <DialogPrimitive.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
            'flex w-full flex-col overflow-hidden',
            'rounded-lg bg-white shadow-xl',
            'max-h-[90vh] outline-none',
            SIZE_CLASS[size],
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
            'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
            'duration-200',
          )}
          // Suppress Radix's own Escape/outside-click when preventClose is set.
          // Radix calls these before triggering onOpenChange, so preventing here
          // ensures neither the overlay nor keyboard can dismiss the dialog.
          onEscapeKeyDown={preventClose ? (e) => e.preventDefault() : onEscapeKeyDown}
          onInteractOutside={preventClose ? (e) => e.preventDefault() : onInteractOutside}
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          // Remove padding added by className — override with our layout below
          style={{ padding: 0 }}
        >
          {/* Radix requires Dialog.Title for accessible naming.
              Render it visually when title prop is provided.
              When absent, render sr-only so Radix's ARIA wiring works
              without adding visible text the consumer didn't request. */}
          {hasTitle ? (
            // Header — visible when title or description are provided
            <div className="shrink-0 border-b-2 border-slate-100 px-6 py-5 pr-14">
              <DialogPrimitive.Title className={cn(typography.titleOverlay, 'text-slate-900')}>
                {title}
              </DialogPrimitive.Title>
              {hasDesc && (
                <DialogPrimitive.Description className="mt-0.5 text-sm font-medium text-slate-500">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
          ) : (
            // No visible title — render sr-only for Radix ARIA requirement
            <DialogPrimitive.Title className="sr-only">
              Dialog
            </DialogPrimitive.Title>
          )}

          {/* Close button — uses Radix Dialog.Close so it participates
              in the Radix open/close flow. asChild avoids an extra DOM node. */}
          {!preventClose && (
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                aria-label="Close dialog"
                className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </DialogPrimitive.Close>
          )}

          {/* Content — children contain DialogBody + DialogFooter */}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
