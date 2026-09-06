/**
 * Textarea — Design System Component
 *
 * A multi-line text entry field. Supports validation states,
 * helper text, character count, and resize behavior.
 */

import { useState } from 'react';
import {
  type FieldStatus,
  FIELD_STATUS_RING_DIRECT,
  FIELD_HELPER_COLOR,
} from '../shared/fieldStatus';
import { cn } from '../../../lib/utils';

export type TextareaStatus = FieldStatus;
export type TextareaResize = 'none' | 'vertical' | 'both';

export interface TextareaProps extends Omit<React.ComponentProps<'textarea'>, 'size'> {
  status?: TextareaStatus;
  helper?: string;
  /** Show a character count: "n / max" */
  maxLength?: number;
  resize?: TextareaResize;
}

const RESIZE_CLASS: Record<TextareaResize, string> = {
  none:     'resize-none',
  vertical: 'resize-y',
  both:     'resize',
};

export function Textarea({
  status = 'default',
  helper,
  maxLength,
  resize = 'vertical',
  disabled,
  value,
  defaultValue,
  onChange,
  className = '',
  ref,
  ...props
}: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) {
  // Track character count for both controlled and uncontrolled modes.
  // For controlled, derive from value. For uncontrolled, maintain local state.
  const isControlled = value !== undefined;
  const [uncontrolledLength, setUncontrolledLength] = useState(
    typeof defaultValue === 'string' ? defaultValue.length : 0,
  );
  const currentLength = isControlled
    ? (typeof value === 'string' ? value.length : 0)
    : uncontrolledLength;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setUncontrolledLength(e.target.value.length);
    onChange?.(e);
  };

  return (
    <div className="w-full">
      <textarea
        ref={ref}
        maxLength={maxLength}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={cn(
          'w-full rounded-xl border bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400',
          FIELD_STATUS_RING_DIRECT[status],
          RESIZE_CLASS[resize],
          disabled && 'cursor-not-allowed bg-slate-50 opacity-60',
          className,
        )}
        {...props}
      />

      {/* Footer row: helper text + char count */}
      {(helper || maxLength !== undefined) && (
        <div className="mt-1.5 flex items-start justify-between gap-2">
          {helper ? (
            <p className={`text-xs font-medium ${FIELD_HELPER_COLOR[status]}`}>{helper}</p>
          ) : (
            <span />
          )}
          {maxLength !== undefined && (
            <p className="shrink-0 text-xs font-medium text-slate-400">
              {currentLength} / {maxLength}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
