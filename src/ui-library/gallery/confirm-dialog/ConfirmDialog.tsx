/**
 * ConfirmDialog — Design System Component
 *
 * A focused confirmation dialog for irreversible or high-impact actions.
 * Composes the gallery Dialog component.
 *
 * Accessibility:
 *   - role="dialog" + aria-modal from Dialog
 *   - title → aria-labelledby (Dialog's header id)
 *   - description → aria-describedby (Dialog's desc id)
 *   - Focus trapped within dialog
 *   - Escape dismisses (unless loading)
 *   - Confirm button is focused on open (first focusable element)
 *   - Destructive tone uses both color AND a warning icon — never color alone
 *
 * Usage:
 *   <ConfirmDialog
 *     open={open}
 *     title="Delete department?"
 *     description="This cannot be undone."
 *     confirmLabel="Delete"
 *     tone="danger"
 *     onConfirm={handleDelete}
 *     onClose={() => setOpen(false)}
 *   />
 */

import { useState, type ReactNode } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { Dialog, DialogBody, DialogFooter } from '../dialog/Dialog';

export type ConfirmDialogTone = 'danger' | 'primary';

export interface ConfirmDialogProps {
  /** Controls dialog visibility. */
  open: boolean;
  /** Called when the dialog should close (cancel, Escape, backdrop). */
  onClose: () => void;
  /**
   * Called when the user confirms. May be async — ConfirmDialog shows a
   * loading state until the promise resolves or rejects.
   * Any thrown errors are swallowed here; surface them via ErrorBanner / toast.
   */
  onConfirm: () => void | Promise<void>;
  /** Dialog heading. Required for accessible labeling. */
  title: string;
  /** Secondary explanation shown below the icon row. */
  description?: ReactNode;
  /** Confirm button label. Default: "Confirm" */
  confirmLabel?: string;
  /** Cancel button label. Default: "Cancel" */
  cancelLabel?: string;
  /**
   * Visual tone for the confirm button and icon.
   * "danger" — rose/destructive. "primary" — brand-blue.
   * Default: "danger"
   */
  tone?: ConfirmDialogTone;
  /** Additional class forwarded to the DialogBody wrapper. */
  className?: string;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const ICON_WRAPPER: Record<ConfirmDialogTone, string> = {
  danger:  'bg-rose-50 text-rose-500',
  primary: 'bg-blue-50 text-brand-blue',
};

const BTN_CONFIRM: Record<ConfirmDialogTone, string> = {
  danger: [
    'inline-flex items-center justify-center gap-2 rounded-md',
    'bg-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-100',
    'transition hover:bg-rose-700 active:scale-[.98]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300',
    'disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none',
  ].join(' '),
  primary: [
    'inline-flex items-center justify-center gap-2 rounded-md',
    'bg-brand-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20',
    'transition hover:bg-brand-navy active:scale-[.98]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
    'disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none',
  ].join(' '),
};

const BTN_CANCEL = [
  'inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white',
  'px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition',
  'hover:border-slate-400 hover:bg-slate-50 active:scale-[.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/15',
  'disabled:cursor-not-allowed disabled:opacity-60',
].join(' ');

// ── Component ──────────────────────────────────────────────────────────────

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  className = '',
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch {
      // Errors are the caller's responsibility to surface
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? () => undefined : onClose}
      preventClose={loading}
      title={title}
      description={typeof description === 'string' ? description : undefined}
      size="sm"
    >
      <DialogBody className={className}>
        <div className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${ICON_WRAPPER[tone]}`}
            aria-hidden="true"
          >
            {tone === 'danger'
              ? <AlertTriangle size={20} />
              : <Info size={20} />
            }
          </span>
          <div className="text-sm font-medium leading-relaxed text-slate-600">
            {description}
          </div>
        </div>
      </DialogBody>

      <DialogFooter>
        <button
          type="button"
          className={BTN_CANCEL}
          onClick={onClose}
          disabled={loading}
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          className={BTN_CONFIRM[tone]}
          onClick={() => void handleConfirm()}
          disabled={loading}
        >
          {loading ? 'Processing…' : confirmLabel}
        </button>
      </DialogFooter>
    </Dialog>
  );
}
