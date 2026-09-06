/**
 * ConfirmAction — Gallery-native inline confirmation wrapper.
 * Copied from shared/components/ConfirmAction.tsx.
 * Updated to:
 *   - Import Modal from gallery-local modal directory
 *   - Use gallery Button component (Phase 11 — replaces legacy inlined btn* strings)
 *   - Use a simple inline ErrorBanner instead of importing from ui.tsx
 */
import { useState, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '../modal/Modal';
import { Button } from '../button/Button';
import { ErrorBanner } from '../error-banner/ErrorBanner';
import { dimension } from '../../tokens/dimension';
import { radius } from '../../tokens/radius';
import { cn } from '../../../lib/utils';

interface ConfirmActionRenderProps {
  open: () => void;
  disabled: boolean;
}

interface ConfirmActionProps {
  title?: string;
  message?: ReactNode;
  label?: string;
  description?: string;
  confirmLabel?: string;
  tone?: 'danger' | 'primary';
  disabled?: boolean;
  onConfirm: () => Promise<void> | void;
  children: ((props: ConfirmActionRenderProps) => ReactNode) | ReactNode;
  /** Additional class on the inline trigger wrapper span. */
  className?: string;
}

export function ConfirmAction({
  title,
  message,
  label,
  description,
  confirmLabel = 'Confirm',
  tone = 'danger',
  disabled = false,
  onConfirm,
  children,
  className = '',
}: ConfirmActionProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const effectiveTitle = title || label || 'Confirm';
  const effectiveMessage = message || description || 'Are you sure?';

  const run = async () => {
    setPending(true);
    setError('');
    try {
      await onConfirm();
      setOpen(false);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Action failed');
    } finally {
      setPending(false);
    }
  };

  const trigger = typeof children === 'function'
    ? children({ open: () => { if (!disabled) setOpen(true); }, disabled })
    : (
      <span className={cn('inline-flex', className)} onClick={() => { if (!disabled) setOpen(true); }}>
        {children}
      </span>
    );

  return (
    <>
      {trigger}
      {open && (
        <Modal
          title={effectiveTitle}
          onClose={() => { if (!pending) setOpen(false); }}
          maxWidth="max-w-md"
          footer={
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={pending}
              >
                Cancel
              </Button>
              <Button
                variant={tone === 'danger' ? 'danger' : 'primary'}
                onClick={() => void run()}
                disabled={pending}
              >
                {pending ? 'Working...' : confirmLabel}
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className={`mt-0.5 flex ${dimension.iconBadge.size} shrink-0 items-center justify-center ${radius.iconBadge} ${tone === 'danger' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-brand-blue'}`}>
                <AlertTriangle size={18} />
              </span>
              <div className="text-sm font-medium leading-relaxed text-slate-600">{effectiveMessage}</div>
            </div>
            {error && <ErrorBanner message={error} />}
          </div>
        </Modal>
      )}
    </>
  );
}
