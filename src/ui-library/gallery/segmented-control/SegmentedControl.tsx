/**
 * SegmentedControl — Design System Component
 *
 * An inline pill-shaped control for switching between mutually exclusive
 * options. Semantically equivalent to a group of radio buttons but styled
 * as a connected pill strip.
 *
 * ARIA: uses role="radiogroup" on the container and role="radio" on each
 * option, matching the WAI-ARIA authoring guide for mutually exclusive
 * single-selection controls that are not tab panels.
 *
 * Keyboard: Arrow keys move selection within the group (roving tabIndex).
 * This matches the native radio group keyboard pattern.
 *
 * API:
 *   <SegmentedControl
 *     options={[{ value: 'a', label: 'Option A' }, ...]}
 *     defaultValue="a"         // uncontrolled
 *     value={value}            // controlled
 *     onValueChange={setValue} // controlled callback
 *     aria-label="View mode"
 *   />
 */

import { useId, useState, type KeyboardEvent } from 'react';
import { cn } from '../../../lib/utils';

export interface SegmentedControlOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  /** Uncontrolled: initial selected value */
  defaultValue?: string;
  /** Controlled: current selected value */
  value?: string;
  /** Controlled: called on value change */
  onValueChange?: (value: string) => void;
  /** Disables the entire control */
  disabled?: boolean;
  /** Accessible label for the group */
  'aria-label'?: string;
  /** Associate with an external label element */
  'aria-labelledby'?: string;
  className?: string;
}

export function SegmentedControl({
  options,
  defaultValue,
  value: controlledValue,
  onValueChange,
  disabled = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  className = '',
}: SegmentedControlProps) {
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? options.find((o) => !o.disabled)?.value ?? '',
  );
  const groupId = useId();

  const activeValue = isControlled ? controlledValue : uncontrolledValue;

  const select = (val: string) => {
    if (disabled) return;
    if (!isControlled) setUncontrolledValue(val);
    onValueChange?.(val);
  };

  const enabledOptions = options.filter((o) => !o.disabled);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const currentIdx = enabledOptions.findIndex((o) => o.value === activeValue);

    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIdx = (currentIdx + 1) % enabledOptions.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIdx = (currentIdx - 1 + enabledOptions.length) % enabledOptions.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIdx = enabledOptions.length - 1;
    }

    if (nextIdx !== null) {
      const nextValue = enabledOptions[nextIdx]?.value;
      if (nextValue !== undefined) {
        select(nextValue);
        // Move DOM focus to the newly-selected button
        const id = `${groupId}-${nextValue}`;
        document.getElementById(id)?.focus();
      }
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-disabled={disabled || undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        'inline-flex rounded-xl bg-slate-100 p-1',
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
    >
      {options.map((opt) => {
        const isSelected = opt.value === activeValue;
        const isDisabled = disabled || opt.disabled;

        return (
          <button
            key={opt.value}
            id={`${groupId}-${opt.value}`}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isDisabled || undefined}
            disabled={isDisabled}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => !isDisabled && select(opt.value)}
            className={[
              'rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-1',
              isSelected
                ? 'bg-white text-slate-900 shadow-sm'
                : isDisabled
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-500 hover:text-slate-700',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
