/**
 * Modal — Gallery-native dialog component.
 *
 * Behavior is provided by @radix-ui/react-dialog, which handles:
 *   - Focus trap (Tab / Shift+Tab contained within panel)
 *   - Focus restoration on close (correct on every open/close cycle)
 *   - Initial focus (first focusable element on open)
 *   - Escape key closes the modal
 *   - Outside-click (pointer-down) closes the modal
 *   - Body scroll lock while open
 *   - Portal rendering to document.body
 *   - role="dialog" + aria-modal + aria-labelledby + aria-describedby
 *
 * DIWA continues to own:
 *   - Public API: isOpen, onClose, title, icon, subtitle, headerMeta,
 *                 footer, onSubmit, submitLabel, submittingLabel, submitting,
 *                 danger, error, maxWidth, closeLabel, children
 *   - Backdrop visual treatment
 *   - Panel visual treatment (border, radius, shadow, max-height, max-width)
 *   - Header layout: icon badge, title, subtitle, headerMeta
 *   - Form wrapper (onSubmit branch)
 *   - Default footer buttons (Cancel + Submit)
 *   - Error display
 *   - Close button styling
 *   - Danger tone (rose badge, rose title, rose submit button)
 */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { typography } from '../../tokens/typography';

export interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  icon?: ReactNode;
  subtitle?: ReactNode;
  headerMeta?: ReactNode;
  footer?: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  submittingLabel?: string;
  submitting?: boolean;
  danger?: boolean;
  error?: string;
  maxWidth?: string;
  closeLabel?: string;
  /** When true, Escape key and outside click will not close the modal. */
  preventClose?: boolean;
  /** Called when focus moves into the content after opening. */
  onOpenAutoFocus?: (e: Event) => void;
  /** Called when focus moves to the trigger after closing. */
  onCloseAutoFocus?: (e: Event) => void;
  /** Called when the Escape key is pressed. Return e.preventDefault() to suppress close. */
  onEscapeKeyDown?: (e: KeyboardEvent) => void;
  /** Called when a pointer-down event occurs outside the content. Return e.preventDefault() to suppress close. */
  onInteractOutside?: (e: Event) => void;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  icon,
  subtitle,
  headerMeta,
  footer,
  onSubmit,
  submitLabel     = 'Submit',
  submittingLabel = 'Saving...',
  submitting      = false,
  danger          = false,
  error,
  maxWidth        = 'max-w-xl',
  closeLabel      = 'Close',
  preventClose    = false,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onInteractOutside,
}: ModalProps) {
  // Radix open state: undefined isOpen means "always mounted" (the consumer
  // controls mount/unmount externally). false means explicitly closed.
  const open = isOpen !== false;

  // Default footer — DIWA-owned form actions, no Radix involvement
  const defaultFooter = onSubmit ? (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 hover:border-slate-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={submitting}
        className={cn(
          'px-4 py-2 text-sm font-bold text-white rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 disabled:opacity-60 disabled:cursor-not-allowed',
          danger
            ? 'bg-rose-600 hover:bg-rose-700 focus-visible:ring-rose-300'
            : 'bg-brand-blue hover:bg-brand-navy focus-visible:ring-brand-blue/30',
        )}
      >
        {submitting ? submittingLabel : submitLabel}
      </button>
    </div>
  ) : (
    <div className="flex items-center justify-end">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 hover:border-slate-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      >
        Cancel
      </button>
    </div>
  );

  const resolvedFooter = footer ?? defaultFooter;

  const iconBadgeClass = danger
    ? 'flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 shrink-0'
    : 'flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-brand-blue shrink-0';

  const bodyContent = (
    <>
      {error && (
        <div className="mb-4 rounded-lg border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      )}
      {children}
    </>
  );

  return (
    <DialogPrimitive.Root
      open={open}
      // Radix calls onOpenChange(false) on Escape or outside click.
      // Route to DIWA's onClose, respecting preventClose.
      onOpenChange={(isOpen) => { if (!isOpen && !preventClose) onClose(); }}
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
            'flex w-full flex-col',
            'rounded-lg border border-slate-200 bg-white shadow-xl',
            'max-h-[85vh] outline-none',
            maxWidth,
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
            'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
            'duration-200',
          )}
          style={{ padding: 0 }}
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={preventClose ? (e) => e.preventDefault() : onEscapeKeyDown}
          onInteractOutside={preventClose ? (e) => e.preventDefault() : onInteractOutside}
        >
          {/* Close button — only when preventClose is false */}
          {!preventClose && (
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                aria-label={closeLabel}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </DialogPrimitive.Close>
          )}

          {/* Header — DIWA-owned layout */}
          <div className="px-6 pt-6 pb-4 border-b-2 border-slate-100">
            <div className="flex items-center gap-2.5">
              {icon && (
                <div className={iconBadgeClass}>
                  {icon}
                </div>
              )}
              <div>
                {/*
                  DialogPrimitive.Title provides the aria-labelledby relationship
                  automatically. DIWA visual classes are applied via className.
                  title is ReactNode — can be string or JSX (e.g. with a badge).
                */}
                <DialogPrimitive.Title
                  className={cn(
                    typography.titleOverlay,
                    danger ? 'text-rose-700' : 'text-slate-900',
                  )}
                >
                  {title}
                </DialogPrimitive.Title>
                {subtitle && (
                  // DialogPrimitive.Description provides aria-describedby when subtitle is present.
                  <DialogPrimitive.Description className="text-xs text-slate-500 mt-0.5">
                    {subtitle}
                  </DialogPrimitive.Description>
                )}
              </div>
            </div>
            {headerMeta && (
              <div className="mt-2">{headerMeta}</div>
            )}
          </div>

          {/* Body + footer — form branch vs non-form branch, DIWA-owned */}
          {onSubmit ? (
            <form onSubmit={onSubmit} className="flex flex-col min-h-0 flex-1">
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {bodyContent}
              </div>
              <div className="px-6 py-4 border-t border-slate-100">
                {resolvedFooter}
              </div>
            </form>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {bodyContent}
              </div>
              <div className="px-6 py-4 border-t border-slate-100">
                {resolvedFooter}
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
