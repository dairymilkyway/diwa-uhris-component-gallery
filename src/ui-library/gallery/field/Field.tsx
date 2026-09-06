/**
 * Field — Gallery-native form field wrapper.
 * Copied from shared/components/Field.tsx, updated to use gallery-local FieldContext.
 */
import { type ReactNode, useId } from 'react';
import { FieldContext } from './FieldContext';
import { cn } from '../../../lib/utils';

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  inputId?: string;
  className?: string;
}

/**
 * Form field wrapper: label + control + inline error.
 *
 * Publishes a FieldContext so that Combobox, DatePicker, and any
 * FieldInput inside this wrapper automatically receive the correct id,
 * aria-required, aria-invalid, and aria-describedby — with no prop threading.
 */
export function Field({ label, required = false, error, children, inputId, className = '' }: FieldProps) {
  const generatedId = useId();
  const fieldId = inputId ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <FieldContext value={{
      inputId: fieldId,
      errorId,
      required,
      invalid: !!error,
    }}>
      <div className={cn('flex flex-col gap-1.5', error && 'shake', className)}>
        {/* Label — sentence case, medium weight, visible but not dominant */}
        <label
          htmlFor={fieldId}
          className="text-xs font-semibold text-slate-600 select-none"
        >
          {label}
          {required && (
            <>
              <span className="text-rose-500 ml-0.5" aria-hidden="true"> *</span>
              <span className="sr-only"> (required)</span>
            </>
          )}
        </label>

        {/* Control slot */}
        {children}

        {/* Inline validation error */}
        {error && (
          <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className="text-xs font-medium text-rose-500 leading-snug"
          >
            {error}
          </p>
        )}
      </div>
    </FieldContext>
  );
}
