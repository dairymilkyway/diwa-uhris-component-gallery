/**
 * Switch — Design System Component
 *
 * Communicates an immediate on/off toggle — not a form checkbox.
 * Use Switch when the action takes effect immediately (e.g. toggling a setting).
 * Use Checkbox when the value is submitted as part of a form.
 *
 * Role: switch (ARIA) — announces as "on"/"off" to screen readers.
 */

import type { ReactNode } from 'react';
import { useId, useState } from 'react';
import { cn } from '../../../lib/utils';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  description?: string;
  disabled?: boolean;
  /** Show a loading spinner in place of the thumb */
  loading?: boolean;
  id?: string;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  description,
  disabled = false,
  loading = false,
  id: externalId,
  className = '',
  ref,
}: SwitchProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolled;
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const labelId = label ? `${id}-label` : undefined;
  const isInteractive = !disabled && !loading;

  const handleClick = () => {
    if (!isInteractive) return;
    const next = !checked;
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  };

  return (
    <div className={cn('flex items-start gap-3', className)}>
      {/* Track + thumb */}
      <button
        ref={ref}
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-label={!label ? 'Toggle' : undefined}
        aria-disabled={!isInteractive || undefined}
        disabled={!isInteractive}
        onClick={handleClick}
        className={[
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-1',
          checked ? 'bg-brand-blue' : 'bg-slate-200',
          !isInteractive ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Thumb */}
        <span
          aria-hidden="true"
          className={[
            'inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-0',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {/* Loading spinner inside thumb */}
          {loading && (
            <span className="flex h-full w-full items-center justify-center">
              <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-slate-300 border-t-brand-blue" />
            </span>
          )}
        </span>
      </button>

      {/* Label + description */}
      {(label || description) && (
        <div className="min-w-0 pt-0.5">
          {label && (
            <span
              id={labelId}
              className={`block text-sm font-semibold ${disabled ? 'text-slate-400' : 'text-slate-800'}`}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="block text-xs font-medium leading-relaxed text-slate-400">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
