/**
 * DatePicker — Gallery-native date picker.
 * Copied from shared/components/PisDatePicker.tsx.
 * Updated to import FieldContext from gallery-local field directory.
 * Uses react-calendar and date-fns.
 * Note: CSS for .pis-datepicker-popover and .pis-rc-calendar is in index.css.
 *
 * Popover is rendered via createPortal into document.body so that
 * position:fixed works correctly even when the DatePicker is inside a
 * CSS transform context (e.g. a Modal with -translate-x/y centering).
 */
import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import Calendar from 'react-calendar';
import { format, parse, isValid } from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFieldContext } from '../field/FieldContext';
import { cn } from '../../../lib/utils';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  minDate?: Date;
  /** Upper bound for selectable dates. Defaults to no limit when omitted. */
  maxDate?: Date;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  required?: boolean;
}

const CALENDAR_WIDTH = 320;
const POPOVER_WIDTH = CALENDAR_WIDTH + 32;
const CALENDAR_HEIGHT = 360;

function getScrollParent(el: Element | null): Element | null {
  if (!el || el === document.body) return null;
  const { overflowY, overflow } = getComputedStyle(el);
  if (['auto', 'scroll'].includes(overflowY) || ['auto', 'scroll'].includes(overflow)) {
    return el;
  }
  return getScrollParent(el.parentElement);
}

function computePopupStyle(rect: DOMRect): React.CSSProperties {
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const isNarrow = window.innerWidth < POPOVER_WIDTH + 16;
  const style: React.CSSProperties = {
    position: 'fixed',
    left: isNarrow ? 8 : Math.max(8, Math.min(rect.left, window.innerWidth - POPOVER_WIDTH - 8)),
    width: isNarrow ? `calc(100vw - 16px)` : undefined,
  };
  // Prefer below. Only go above if there's genuinely more space above AND
  // the space below is less than 1/3 of the calendar height.
  const goAbove = spaceAbove > spaceBelow && spaceBelow < CALENDAR_HEIGHT / 3;
  if (goAbove) {
    style.top = Math.max(8, rect.top - CALENDAR_HEIGHT - 6);
  } else {
    // Always place below the field — don't clamp upward even if it goes off-screen.
    // The user can scroll to see the bottom of the calendar. Clamping upward
    // makes the calendar appear above the field which is more confusing.
    style.top = rect.bottom + 6;
  }
  return style;
}

export function DatePicker({
  value,
  onChange,
  placeholder,
  className,
  disabled,
  error,
  minDate,
  maxDate,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  required,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const internalId = useId();

  const ctx = useFieldContext();
  const inputId          = id       ?? ctx?.inputId  ?? internalId;
  const resolvedRequired = required ?? ctx?.required ?? false;
  const resolvedInvalid  = error    ? true           : (ctx?.invalid ?? false);
  const describedBy      = ctx?.invalid && ctx?.errorId ? ctx.errorId : undefined;

  const selectedDate = value
    ? (() => {
        const d = parse(value, 'yyyy-MM-dd', new Date());
        if (isValid(d)) return d;
        const d2 = new Date(value);
        return isNaN(d2.getTime()) ? undefined : d2;
      })()
    : undefined;

  const displayValue = selectedDate ? format(selectedDate, 'MMM d, yyyy') : '';

  const skipNextOpen = useRef(false);

  const openPopup = useCallback(() => {
    if (disabled) return;
    if (skipNextOpen.current) {
      skipNextOpen.current = false;
      return;
    }
    // Compute position BEFORE rendering the portal so we never flash at -9999.
    // We use setTimeout(50) + rAF to let any auto-scroll-to-focus complete first,
    // then read a stable getBoundingClientRect() and open with the correct position.
    setTimeout(() => {
      if (!wrapperRef.current) return;
      requestAnimationFrame(() => {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const style = computePopupStyle(rect);
        setPopupStyle(style);
        setIsOpen(true);
      });
    }, 50);
  }, [disabled]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        wrapperRef.current && !wrapperRef.current.contains(target) &&
        popoverRef.current && !popoverRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Attach scroll-close listeners. Position was already computed in openPopup
    // before isOpen was set, so we don't need any delay here.
    const close = () => setIsOpen(false);
    const scrollParent = getScrollParent(wrapperRef.current?.parentElement ?? null);
    if (scrollParent) scrollParent.addEventListener('scroll', close, { passive: true });
    window.addEventListener('scroll', close, { capture: true, passive: true });
    window.addEventListener('resize', close);

    return () => {
      if (scrollParent) scrollParent.removeEventListener('scroll', close);
      window.removeEventListener('scroll', close, { capture: true });
      window.removeEventListener('resize', close);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleFocusOut(e: FocusEvent) {
      if (!e.relatedTarget) return;
      const target = e.relatedTarget as Node;
      if (
        wrapperRef.current && !wrapperRef.current.contains(target) &&
        popoverRef.current && !popoverRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }
    const wrapper = wrapperRef.current;
    wrapper?.addEventListener('focusout', handleFocusOut);
    return () => wrapper?.removeEventListener('focusout', handleFocusOut);
  }, [isOpen]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.focus();
      return;
    }
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (isOpen) setIsOpen(false);
      else openPopup();
    }
  }

  const inputClasses = cn(
    'w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 pr-8 cursor-pointer select-none',
    error
      ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
      : 'border-slate-200 focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/15',
    disabled && 'cursor-not-allowed opacity-60',
    className,
  );

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          readOnly
          value={displayValue}
          onFocus={openPopup}
          onClick={openPopup}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-required={resolvedRequired ? 'true' : undefined}
          aria-invalid={resolvedInvalid ? 'true' : undefined}
          aria-describedby={describedBy}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          role="combobox"
          className={inputClasses}
        />
        <CalendarDays
          size={16}
          className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${isOpen ? 'text-brand-blue' : 'text-slate-300'}`}
          aria-hidden="true"
        />
      </div>

      {isOpen && !disabled && createPortal(
        <div
          ref={popoverRef}
          className="pis-datepicker-popover"
          style={popupStyle}
          role="dialog"
          aria-label={ariaLabel ? `${ariaLabel} calendar` : 'Date picker'}
          aria-modal="false"
        >
          <Calendar
            key={isOpen ? 'open' : 'closed'}
            value={selectedDate ?? null}
            onChange={(val) => {
              if (val instanceof Date) {
                onChange(format(val, 'yyyy-MM-dd'));
                setIsOpen(false);
                skipNextOpen.current = true;
                requestAnimationFrame(() => inputRef.current?.focus());
              }
            }}
            defaultActiveStartDate={selectedDate ?? minDate}
            minDate={minDate}
            maxDate={maxDate}
            defaultView="month"
            showNeighboringDecade={true}
            showNeighboringCentury={true}
            prevLabel={<ChevronLeft size={14} />}
            nextLabel={<ChevronRight size={14} />}
            prev2Label={null}
            next2Label={null}
            navigationLabel={({ date, view }) => {
              if (view === 'month') return format(date, 'MMMM yyyy');
              if (view === 'year') return format(date, 'yyyy');
              return `${Math.floor(date.getFullYear() / 10) * 10} – ${Math.floor(date.getFullYear() / 10) * 10 + 9}`;
            }}
            className="pis-rc-calendar"
          />
        </div>,
        document.body
      )}
    </div>
  );
}
