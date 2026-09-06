/**
 * RadioGroup — Design System Component
 *
 * Accessible radio button group using native <input type="radio"> for
 * correct browser behavior: keyboard navigation, form participation,
 * focus management, and screen-reader announcements all come for free.
 *
 * Composition:
 *   <RadioGroup name="plan" defaultValue="monthly" aria-label="Billing period">
 *     <RadioItem value="monthly" label="Monthly" />
 *     <RadioItem value="annual"  label="Annual"  description="Save 20%" />
 *     <RadioItem value="custom"  label="Custom"  disabled />
 *   </RadioGroup>
 *
 * Layout: pass orientation="horizontal" for an inline row.
 */

import { createContext, useContext, useId, useState, type ReactNode } from 'react';
import { cn } from '../../../lib/utils';
// ── Context ───────────────────────────────────────────────────────────────────

interface RadioGroupContextValue {
  name: string;
  activeValue: string;
  select: (value: string) => void;
  disabled: boolean;
  required: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error('RadioItem must be used inside RadioGroup');
  return ctx;
}

// ── RadioGroup ────────────────────────────────────────────────────────────────

export interface RadioGroupProps {
  /** HTML name attribute shared by all radio inputs in the group */
  name?: string;
  /** Uncontrolled: initial selected value */
  defaultValue?: string;
  /** Controlled: current selected value */
  value?: string;
  /** Controlled: called on selection change */
  onValueChange?: (value: string) => void;
  /** Disables all radio items */
  disabled?: boolean;
  /** Marks the group as required */
  required?: boolean;
  /** 'vertical' (default) or 'horizontal' */
  orientation?: 'vertical' | 'horizontal';
  /** Accessible label for the group */
  'aria-label'?: string;
  /** ID of an external <label> or heading */
  'aria-labelledby'?: string;
  children: ReactNode;
  className?: string;
}

export function RadioGroup({
  name: externalName,
  defaultValue = '',
  value: controlledValue,
  onValueChange,
  disabled = false,
  required = false,
  orientation = 'vertical',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  children,
  className = '',
}: RadioGroupProps) {
  const generatedName = useId();
  const name = externalName ?? generatedName;

  const isControlled = controlledValue !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const activeValue = isControlled ? controlledValue : uncontrolled;

  const select = (val: string) => {
    if (!isControlled) setUncontrolled(val);
    onValueChange?.(val);
  };

  return (
    <RadioGroupContext.Provider value={{ name, activeValue, select, disabled, required }}>
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-required={required || undefined}
        aria-disabled={disabled || undefined}
        className={cn(
          orientation === 'horizontal' ? 'flex flex-wrap gap-4' : 'flex flex-col gap-3',
          className,
        )}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

// ── RadioItem ─────────────────────────────────────────────────────────────────

export interface RadioItemProps {
  value: string;
  label: ReactNode;
  /** Optional description line below the label */
  description?: string;
  disabled?: boolean;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function RadioItem({
  value,
  label,
  description,
  disabled: itemDisabled = false,
  className = '',
  ref,
}: RadioItemProps) {
  const { name, activeValue, select, disabled: groupDisabled, required } = useRadioGroupContext();
  const id = useId();
  const isDisabled = groupDisabled || itemDisabled;
  const isChecked  = activeValue === value;

  return (
    <label
      htmlFor={id}
      className={cn(
        'group flex cursor-pointer items-start gap-3',
        isDisabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      {/* Native radio input — visually hidden, but fully keyboard and AT accessible */}
      <input
        type="radio"
        ref={ref}
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        required={required}
        onChange={() => !isDisabled && select(value)}
        className="peer sr-only"
        aria-label={typeof label === 'string' ? label : undefined}
      />

      {/* Custom radio visual */}
      <div
        className={[
          'relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center',
          'rounded-full border-2 transition-all duration-100',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-brand-blue/30 peer-focus-visible:ring-offset-1',
          isChecked
            ? 'border-brand-blue bg-brand-blue'
            : 'border-slate-300 bg-white group-hover:border-brand-blue',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      >
        {isChecked && (
          <span className="h-2 w-2 rounded-full bg-white" />
        )}
      </div>

      {/* Label + description */}
      <div className="min-w-0">
        <span className="block text-sm font-semibold text-slate-800">{label}</span>
        {description && (
          <span className="block text-xs font-medium text-slate-400 leading-relaxed mt-0.5">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}
