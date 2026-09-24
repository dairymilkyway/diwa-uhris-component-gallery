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
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';
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
  /**
   * date-fns format string for the text shown in the trigger.
   * The committed `onChange` value is always ISO `yyyy-MM-dd` regardless of this.
   * Default: 'MMM d, yyyy'.
   */
  dateFormat?: string;
  /** Show a clear (×) button that resets the value to '' when a date is set. */
  clearable?: boolean;
  /** Notified whenever the calendar popover opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Popover placement relative to the trigger.
   * 'auto' (default) flips above/below based on viewport space;
   * 'below'/'above' force a side (still clamped to stay on-screen).
   */
  placement?: 'auto' | 'below' | 'above';
  /** BCP-47 locale forwarded to the calendar (e.g. 'en-US', 'fr-FR'). */
  locale?: string;
  /** Name forwarded to the trigger input for form association. */
  name?: string;
  /**
   * Per-day predicate to disable individual dates that min/maxDate can't express
   * (weekends, holidays, already-booked days). Return true to disable the date.
   * Only consulted on the day (month) view.
   */
  isDateDisabled?: (date: Date) => boolean;
  /**
   * Read-only: the value is shown but the calendar can't be opened and no date
   * can be picked. Unlike `disabled`, it keeps normal (non-greyed) styling for
   * view/detail screens.
   */
  readOnly?: boolean;
  /**
   * Controlled open state. When provided, the component no longer manages its
   * own open/close — the parent owns it via `onOpenChange`. Leave undefined for
   * the default uncontrolled behavior.
   */
  open?: boolean;
  /** Initial open state when uncontrolled. Ignored when `open` is provided. */
  defaultOpen?: boolean;
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

export function computePopupStyle(
  rect: DOMRect,
  placement: 'auto' | 'below' | 'above' = 'auto',
  // Actual rendered popover height once mounted. Before the first measurement
  // we fall back to CALENDAR_HEIGHT (a deliberate over-estimate) so the initial
  // paint never overflows; the component re-runs this with the real height on
  // the next frame. Using the real height matters because the month view is
  // only ~285px tall — assuming 360px both (a) flips above too eagerly when the
  // shorter calendar would fit below and (b) leaves a visible gap above the
  // trigger, since the above-placement anchors to a 360px slot the calendar
  // doesn't fill.
  measuredHeight?: number,
): React.CSSProperties {
  const height = measuredHeight ?? CALENDAR_HEIGHT;
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const isNarrow = window.innerWidth < POPOVER_WIDTH + 16;
  const style: React.CSSProperties = {
    position: 'fixed',
    left: isNarrow ? 8 : Math.max(8, Math.min(rect.left, window.innerWidth - POPOVER_WIDTH - 8)),
    width: isNarrow ? `calc(100vw - 16px)` : undefined,
  };
  // Decide side: forced placement wins; otherwise prefer below unless the
  // calendar doesn't fit below AND there's more room above. Either way the top
  // is clamped so the calendar never runs off the top or bottom of the viewport
  // (min 8px gap).
  const placeBelow =
    placement === 'below'
      ? true
      : placement === 'above'
        ? false
        : spaceBelow >= height || spaceBelow >= spaceAbove;
  if (placeBelow) {
    style.top = Math.min(rect.bottom + 6, window.innerHeight - height - 8);
  } else {
    // Anchor to the real height so the calendar sits just above the trigger
    // (6px gap) instead of floating at a fixed 360px offset.
    style.top = Math.max(rect.top - height - 6, 8);
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
  dateFormat = 'MMM d, yyyy',
  clearable = false,
  onOpenChange,
  placement = 'auto',
  locale,
  name,
  isDateDisabled,
  readOnly = false,
  open,
  defaultOpen = false,
}: DatePickerProps) {
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = isControlled ? open : uncontrolledOpen;
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const internalId = useId();

  // Wrap the setter so every open/close notifies onOpenChange. When controlled,
  // we only notify — the parent owns the state and must reflect it back via `open`.
  const setIsOpen = useCallback(
    (next: boolean) => {
      if (isControlled) {
        onOpenChange?.(next);
        return;
      }
      setUncontrolledOpen((prev) => {
        if (prev !== next) onOpenChange?.(next);
        return next;
      });
    },
    [isControlled, onOpenChange],
  );

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

  const displayValue = selectedDate ? format(selectedDate, dateFormat) : '';

  const skipNextOpen = useRef(false);

  const openPopup = useCallback(() => {
    if (disabled || readOnly) return;
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
        const style = computePopupStyle(rect, placement);
        setPopupStyle(style);
        setIsOpen(true);
      });
    }, 50);
  }, [disabled, readOnly, placement, setIsOpen]);

  // Once the popover is mounted, recompute the position using its real height.
  // The first pass in openPopup uses the CALENDAR_HEIGHT over-estimate; the
  // month view actually renders ~285px, so re-running with the measured height
  // removes the gap when flipped above and avoids flipping above when the
  // shorter calendar would have fit below.
  useEffect(() => {
    if (!isOpen || !popoverRef.current || !wrapperRef.current) return;
    const measuredHeight = popoverRef.current.offsetHeight;
    const rect = wrapperRef.current.getBoundingClientRect();
    setPopupStyle(computePopupStyle(rect, placement, measuredHeight));
  }, [isOpen, placement]);

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
          name={name}
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
          aria-readonly={readOnly ? 'true' : undefined}
          aria-haspopup={readOnly ? undefined : 'dialog'}
          aria-expanded={readOnly ? undefined : isOpen}
          role="combobox"
          className={inputClasses}
        />
        {clearable && value && !disabled && !readOnly ? (
          <button
            type="button"
            aria-label="Clear date"
            onMouseDown={(e) => {
              // Prevent the input's focus/open handlers from firing on this click.
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={() => {
              onChange('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-slate-300 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
          >
            <X size={14} />
          </button>
        ) : (
          <CalendarDays
            size={16}
            className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${isOpen ? 'text-brand-blue' : 'text-slate-300'}`}
            aria-hidden="true"
          />
        )}
      </div>

      {isOpen && !disabled && !readOnly && createPortal(
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
            tileDisabled={
              isDateDisabled
                ? ({ date, view }) => view === 'month' && isDateDisabled(date)
                : undefined
            }
            locale={locale}
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
