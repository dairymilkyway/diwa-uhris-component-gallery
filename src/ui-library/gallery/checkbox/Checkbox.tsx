/**
 * Checkbox — Design System Component
 *
 * A binary or indeterminate selection control with an optional label.
 * The label is composed inline here because the checkbox + label unit
 * is so consistently used together that separating them adds no value.
 *
 * States: unchecked | checked | indeterminate | disabled | error
 */

import { Check, Minus } from 'lucide-react';
import type { ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '../../../lib/utils';
import { composeRefs } from '../../../lib/composeRefs';

export interface CheckboxProps
  extends Omit<React.ComponentProps<'input'>, 'type' | 'size'> {
  /** Visible label next to the checkbox */
  label?: ReactNode;
  /** Description line below the label */
  description?: string;
  /** Indeterminate state (partial selection) */
  indeterminate?: boolean;
  /** Visual error state */
  error?: boolean;
  /** Error message shown below */
  helper?: string;
}

export function Checkbox({
  label,
  description,
  indeterminate = false,
  error = false,
  helper,
  disabled,
  checked,
  id: externalId,
  className = '',
  ref,
  ...props
}: CheckboxProps & { ref?: React.Ref<HTMLInputElement> }) {
  const generatedId = useId();
  const id = externalId ?? generatedId;

  // Attach indeterminate via callback ref — it's not a valid HTML attribute
  const attachIndeterminate = (el: HTMLInputElement | null) => {
    if (el) el.indeterminate = indeterminate;
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={id}
        className={`group inline-flex cursor-pointer items-start gap-2.5 ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
      >
        {/* Custom checkbox visual */}
        <div className="relative mt-0.5 shrink-0">
          <input
            ref={composeRefs(attachIndeterminate as React.Ref<HTMLInputElement>, ref)}
            id={id}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            aria-invalid={error || undefined}
            className="peer sr-only"
            {...props}
          />
          {/* Box background — direct sibling of peer input */}
          <div
            aria-hidden="true"
            className={[
              'h-[18px] w-[18px] rounded border-2 transition-all duration-100',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1',
              error
                ? 'border-rose-400 peer-checked:bg-rose-500 peer-checked:border-rose-500 peer-focus-visible:ring-rose-200'
                : 'border-slate-300 peer-checked:bg-brand-blue peer-checked:border-brand-blue peer-focus-visible:ring-brand-blue/30',
              indeterminate && !error && 'bg-brand-blue border-brand-blue',
              indeterminate && error  && 'bg-rose-500 border-rose-500',
            ]
              .filter(Boolean)
              .join(' ')}
          />
          {/* Icon — direct sibling of peer input, positioned over the box */}
          {indeterminate ? (
            <Minus
              size={11}
              strokeWidth={3}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 m-auto text-white"
            />
          ) : (
            <Check
              size={11}
              strokeWidth={3}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-100"
            />
          )}
        </div>

        {/* Label + description */}
        {(label || description) && (
          <div className="min-w-0">
            {label && (
              <span className="block text-sm font-semibold text-slate-800">
                {label}
              </span>
            )}
            {description && (
              <span className="block text-xs font-medium text-slate-400 leading-relaxed">
                {description}
              </span>
            )}
          </div>
        )}
      </label>

      {helper && (
        <p className={`pl-7 text-xs font-medium ${error ? 'text-rose-500' : 'text-slate-400'}`}>
          {helper}
        </p>
      )}
    </div>
  );
}
