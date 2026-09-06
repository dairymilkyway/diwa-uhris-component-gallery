/**
 * OtpInput — Design System Component
 *
 * A segmented one-time-password / PIN entry field.
 * Each digit occupies its own visually-separated cell.
 *
 * Features:
 *   - Configurable length (default: 6)
 *   - Auto-advance on digit entry
 *   - Backspace moves to previous cell
 *   - Paste fills all cells
 *   - Error state with aria-invalid
 *   - Disabled state
 *
 * Accessibility:
 *   - Single logical input via aria-label on the first visible cell
 *   - role="group" + aria-label on the container
 *   - aria-invalid on cells when error is present
 *   - All cells share a common aria-describedby pointing to the error message
 */

import { useRef, useState, type KeyboardEvent, type ClipboardEvent } from 'react';
import { cn } from '../../../lib/utils';

export interface OtpInputProps {
  /** Number of digits. Default: 6 */
  length?: number;
  /** Current value (array of digit strings). Controlled. */
  value?: string[];
  /** Called when the value changes. */
  onChange?: (value: string[]) => void;
  /** Disables all cells. */
  disabled?: boolean;
  /** Shows error styling. */
  error?: boolean;
  /** Error message text. If provided, shown below and linked via aria-describedby. */
  errorMessage?: string;
  /** Accessible label for the group. Default: "One-time password" */
  'aria-label'?: string;
  /** Additional class on the root element. */
  className?: string;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  error = false,
  errorMessage,
  'aria-label': ariaLabel = 'One-time password',
  className = '',
}: OtpInputProps) {
  const [internal, setInternal] = useState<string[]>(() => Array(length).fill(''));
  const cells = value ?? internal;
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const errorId = 'otp-error';

  const update = (next: string[]) => {
    if (!value) setInternal(next);
    onChange?.(next);
  };

  const handleKeyDown = (i: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (cells[i]) {
        const next = [...cells];
        next[i] = '';
        update(next);
      } else if (i > 0) {
        const next = [...cells];
        next[i - 1] = '';
        update(next);
        inputRefs.current[i - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && i > 0) {
      inputRefs.current[i - 1]?.focus();
    } else if (e.key === 'ArrowRight' && i < length - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleInput = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...cells];
    next[i] = raw;
    update(next);
    if (raw && i < length - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    const next = Array(length).fill('');
    for (let i = 0; i < digits.length; i++) next[i] = digits[i] ?? '';
    update(next);
    const focusIdx = Math.min(digits.length, length - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  const cellBase = [
    'h-12 w-10 rounded-xl border text-center text-lg font-bold',
    'outline-none transition',
    'focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/15',
    'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
  ].join(' ');

  const cellClass = error
    ? `${cellBase} border-rose-400 bg-rose-50/40 text-rose-800 focus:ring-rose-100`
    : `${cellBase} border-slate-200 bg-white text-slate-900`;

  return (
    <div className={cn('space-y-2', className)}>
      <div
        role="group"
        aria-label={ariaLabel}
        aria-describedby={errorMessage ? errorId : undefined}
        className="flex items-center gap-2"
      >
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={cells[i] ?? ''}
            disabled={disabled}
            aria-invalid={error}
            aria-label={i === 0 ? `${ariaLabel}, digit ${i + 1} of ${length}` : `digit ${i + 1} of ${length}`}
            aria-describedby={errorMessage ? errorId : undefined}
            className={cellClass}
            onChange={handleInput(i)}
            onKeyDown={handleKeyDown(i)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>

      {errorMessage && (
        <p id={errorId} className="text-xs font-semibold text-rose-600" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
