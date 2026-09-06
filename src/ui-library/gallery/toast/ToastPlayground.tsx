/**
 * ToastPlayground — Gallery infrastructure
 *
 * Interactive playground for the Toast component (Sonner).
 * Controls: variant selection.
 * Fires real toast notifications via the global Toaster in App.tsx.
 */

import { useState } from 'react';
import { toast } from 'sonner';
import { ControlGroup, PlaygroundPanel, RadioControl } from '../components/PlaygroundPanel';

type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

const VARIANT_CONFIG: Record<ToastVariant, { label: string; message: string; fire: (msg: string) => void }> = {
  success: { label: 'Success', message: 'Employee record saved successfully.',          fire: (msg) => toast.success(msg) },
  error:   { label: 'Error',   message: 'Failed to save changes. Please try again.',    fire: (msg) => toast.error(msg)   },
  warning: { label: 'Warning', message: 'This action cannot be undone after submission.', fire: (msg) => toast.warning(msg) },
  info:    { label: 'Info',    message: 'Changes will take effect at the next payroll cycle.', fire: (msg) => toast.info(msg) },
  default: { label: 'Default', message: 'Operation completed.',                          fire: (msg) => toast(msg)         },
};

export function ToastPlayground() {
  const [variant, setVariant] = useState<ToastVariant>('success');
  const cfg = VARIANT_CONFIG[variant];

  const controls = (
    <ControlGroup label="Variant">
      <RadioControl<ToastVariant>
        name="variant"
        value={variant}
        onChange={setVariant}
        options={[
          { value: 'success', label: 'Success' },
          { value: 'error',   label: 'Error'   },
          { value: 'warning', label: 'Warning' },
          { value: 'info',    label: 'Info'    },
          { value: 'default', label: 'Default' },
        ]}
      />
    </ControlGroup>
  );

  const preview = (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="max-w-[240px] text-sm font-medium text-slate-500">
        {cfg.message}
      </p>
      <button
        type="button"
        onClick={() => cfg.fire(cfg.message)}
        className="inline-flex items-center rounded-xl bg-brand-blue px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-navy active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      >
        Show {cfg.label} Toast
      </button>
      <p className="text-xs font-medium text-slate-400">
        Toasts appear top-right and dismiss after 4&thinsp;s.
      </p>
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
