/**
 * Accordion — Design System Component
 *
 * Disclosure/accordion pattern with support for single-open and
 * multiple-open modes, controlled/uncontrolled state, and disabled items.
 *
 * WAI-ARIA Accordion pattern:
 *   - Trigger is a <button> with aria-expanded and aria-controls
 *   - Content panel has a stable id referenced by aria-controls
 *   - Disabled triggers have aria-disabled + disabled attribute
 *
 * Keyboard:
 *   - Tab moves between triggers
 *   - Enter / Space toggle the focused trigger
 *
 * Composition:
 *   <Accordion type="single" defaultValue="item-1">
 *     <AccordionItem value="item-1">
 *       <AccordionTrigger>Section heading</AccordionTrigger>
 *       <AccordionContent>Content here.</AccordionContent>
 *     </AccordionItem>
 *   </Accordion>
 */

import { createContext, useContext, useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';

// ── Context ───────────────────────────────────────────────────────────────────

interface AccordionContextValue {
  type: 'single' | 'multiple';
  openValues: Set<string>;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be used inside <Accordion>');
  return ctx;
}

interface ItemContextValue {
  value: string;
  disabled: boolean;
  panelId: string;
  triggerId: string;
}

const ItemContext = createContext<ItemContextValue | null>(null);

function useItemContext() {
  const ctx = useContext(ItemContext);
  if (!ctx) throw new Error('AccordionTrigger/AccordionContent must be inside <AccordionItem>');
  return ctx;
}

// ── Accordion (root) ──────────────────────────────────────────────────────────

export interface AccordionProps {
  /**
   * 'single' — only one item open at a time (default)
   * 'multiple' — any number of items can be open simultaneously
   */
  type?: 'single' | 'multiple';
  /** Uncontrolled: initial open value(s) */
  defaultValue?: string | string[];
  /** Controlled: open value(s) */
  value?: string | string[];
  /** Controlled: called when open values change */
  onValueChange?: (value: string | string[]) => void;
  children: ReactNode;
  className?: string;
}

export function Accordion({
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className = '',
}: AccordionProps) {
  const isControlled = controlledValue !== undefined;

  const [uncontrolled, setUncontrolled] = useState<Set<string>>(() => {
    if (!defaultValue) return new Set();
    return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
  });

  const openValues: Set<string> = isControlled
    ? new Set(Array.isArray(controlledValue) ? controlledValue : [controlledValue])
    : uncontrolled;

  const toggle = (val: string) => {
    let next: Set<string>;
    if (type === 'single') {
      next = openValues.has(val) ? new Set() : new Set([val]);
    } else {
      next = new Set(openValues);
      if (next.has(val)) next.delete(val); else next.add(val);
    }
    if (!isControlled) setUncontrolled(next);
    if (onValueChange) {
      onValueChange(type === 'single' ? (next.values().next().value ?? '') : [...next]);
    }
  };

  return (
    <AccordionContext.Provider value={{ type, openValues, toggle }}>
      <div className={cn('divide-y divide-slate-200 rounded-xl border border-slate-200', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// ── AccordionItem ─────────────────────────────────────────────────────────────

export interface AccordionItemProps {
  value: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ value, disabled = false, children, className = '' }: AccordionItemProps) {
  const baseId   = useId().replace(/:/g, '');
  const panelId   = `${baseId}-panel`;
  const triggerId = `${baseId}-trigger`;

  return (
    <ItemContext.Provider value={{ value, disabled, panelId, triggerId }}>
      <div className={cn(className)}>
        {children}
      </div>
    </ItemContext.Provider>
  );
}

// ── AccordionTrigger ──────────────────────────────────────────────────────────

export interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className = '' }: AccordionTriggerProps) {
  const { openValues, toggle } = useAccordionContext();
  const { value, disabled, panelId, triggerId } = useItemContext();
  const isOpen = openValues.has(value);

  return (
    <button
      id={triggerId}
      type="button"
      aria-expanded={isOpen}
      aria-controls={panelId}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={() => toggle(value)}
      className={cn(
        'flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue/30',
        disabled ? 'cursor-not-allowed text-slate-300' : 'text-slate-800 hover:bg-slate-50',
        className,
      )}
    >
      <span>{children}</span>
      <ChevronDown
        size={16}
        aria-hidden="true"
        className={`shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

// ── AccordionContent ──────────────────────────────────────────────────────────

export interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

export function AccordionContent({ children, className = '' }: AccordionContentProps) {
  const { openValues } = useAccordionContext();
  const { value, panelId, triggerId } = useItemContext();
  const isOpen = openValues.has(value);

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!isOpen || undefined}
      data-state={isOpen ? 'open' : 'closed'}
      className={cn(
        'grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out',
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div className="min-h-0">
        <div className={cn('border-t border-slate-100 px-5 py-4 text-sm font-medium text-slate-600', className)}>
          {children}
        </div>
      </div>
    </div>
  );
}
