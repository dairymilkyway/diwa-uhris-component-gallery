/**
 * Input — Design System Component
 *
 * A single-line text entry field. Supports prefix/suffix slots,
 * helper text, validation states, and common input types.
 *
 * The label is NOT included in this component. Use a <label> element
 * or the companion <Field> wrapper from the consuming feature.
 * This keeps Input a pure primitive.
 */

import type { ReactNode } from 'react';
import {
  type FieldStatus,
  FIELD_STATUS_RING_WITHIN,
  FIELD_HELPER_COLOR,
} from '../shared/fieldStatus';
import { cn } from '../../../lib/utils';

export type InputStatus = FieldStatus;

export interface InputProps extends Omit<React.ComponentProps<'input'>, 'prefix' | 'size'> {
  /** Visual validation state */
  status?: InputStatus;
  /** Helper text shown below the input */
  helper?: string;
  /** Element rendered inside the input on the left (e.g. an icon) */
  prefix?: ReactNode;
  /** Element rendered inside the input on the right (e.g. a unit label or clear button) */
  suffix?: ReactNode;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Input({
  status = 'default',
  helper,
  prefix,
  suffix,
  disabled,
  className = '',
  ref,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  return (
    <div className="w-full">
      {/* Input wrapper — handles focus-ring as a unit so prefix/suffix are inside the ring */}
      <div
        className={cn(
          'flex w-full items-center rounded-md border bg-white transition',
          FIELD_STATUS_RING_WITHIN[status],
          disabled && 'cursor-not-allowed bg-slate-50 opacity-60',
          className,
        )}
      >
        {prefix && (
          <span className="flex shrink-0 items-center pl-3.5 text-slate-400">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={[
            'w-full bg-transparent py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400',
            prefix  ? 'pl-2' : 'pl-4',
            suffix  ? 'pr-2' : 'pr-4',
            disabled ? 'cursor-not-allowed' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {suffix && (
          <span className="flex shrink-0 items-center pr-3.5 text-slate-400">
            {suffix}
          </span>
        )}
      </div>

      {/* Helper text */}
      {helper && (
        <p className={`mt-1.5 text-xs font-medium ${FIELD_HELPER_COLOR[status]}`}>
          {helper}
        </p>
      )}
    </div>
  );
}
