/**
 * Tabs — Design System Component
 *
 * Composable tab interface with full WAI-ARIA Tabs pattern compliance.
 *
 * Responsibilities:
 *   - role="tablist" on the tab strip
 *   - role="tab" with aria-selected, aria-controls, aria-disabled on each tab
 *   - role="tabpanel" with aria-labelledby on each panel
 *   - Stable generated IDs for tab/panel cross-referencing
 *   - ArrowRight / ArrowLeft / Home / End keyboard navigation
 *   - Controlled and uncontrolled usage
 *   - Disabled tab support (skipped during keyboard navigation)
 *
 * Composition:
 *   <Tabs defaultValue="overview">
 *     <TabList aria-label="Section navigation">
 *       <Tab value="overview">Overview</Tab>
 *       <Tab value="details">Details</Tab>
 *       <Tab value="history" disabled>History</Tab>
 *     </TabList>
 *     <TabPanels>
 *       <TabPanel value="overview">…</TabPanel>
 *       <TabPanel value="details">…</TabPanel>
 *       <TabPanel value="history">…</TabPanel>
 *     </TabPanels>
 *   </Tabs>
 *
 * Keyboard model: "manual activation" — ArrowKey moves focus but the user
 * must press Space/Enter to activate a new tab. This is the WAI-ARIA
 * recommended default when tab panels contain complex content (forms, tables)
 * because "automatic activation" can trigger expensive content fetches on
 * every arrow press.
 *
 * To switch to "automatic activation" (Arrow key also activates),
 * set activateOnFocus={true} on <Tabs>.
 */

import {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../../lib/utils';

// ── Context ───────────────────────────────────────────────────────────────────

interface TabsContextValue {
  /** Currently active tab value */
  activeValue: string;
  /** Activate a tab (does nothing if disabled) */
  activate: (value: string) => void;
  /** Base id prefix shared by all tabs and panels in this Tabs instance */
  baseId: string;
  /** Registered tab values in DOM order (built up by Tab children) */
  tabValues: React.MutableRefObject<string[]>;
  /** Set of disabled tab values */
  disabledValues: Set<string>;
  /** Whether arrow keys also activate (true) or only move focus (false) */
  activateOnFocus: boolean;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs sub-component used outside <Tabs>');
  return ctx;
}

// ── Stable ID helpers ─────────────────────────────────────────────────────────

function tabId(baseId: string, value: string) {
  return `${baseId}-tab-${value}`;
}

function panelId(baseId: string, value: string) {
  return `${baseId}-panel-${value}`;
}

// ── Tabs (root) ───────────────────────────────────────────────────────────────

export interface TabsProps {
  /** Controlled: current active tab value */
  value?: string;
  /** Controlled: called when a tab is activated */
  onValueChange?: (value: string) => void;
  /** Uncontrolled: initial active tab value */
  defaultValue?: string;
  /** Whether ArrowKey navigation also activates the tab immediately */
  activateOnFocus?: boolean;
  children: ReactNode;
  className?: string;
}

export function Tabs({
  value: controlledValue,
  onValueChange,
  defaultValue = '',
  activateOnFocus = false,
  children,
  className = '',
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const baseId    = useId();
  const tabValues = useRef<string[]>([]);

  const isControlled  = controlledValue !== undefined;
  const activeValue   = isControlled ? controlledValue : uncontrolledValue;

  // Collect disabled values from child Tab props via context
  // eslint-disable-next-line react-hooks/refs
  const disabledValues = useRef(new Set<string>()).current;

  const activate = (value: string) => {
    if (disabledValues.has(value)) return;
    if (!isControlled) setUncontrolledValue(value);
    onValueChange?.(value);
  };

  return (
    <TabsContext.Provider
      value={{ activeValue, activate, baseId, tabValues, disabledValues, activateOnFocus }}
    >
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

// ── TabList ───────────────────────────────────────────────────────────────────

export interface TabListProps {
  /** Accessible label for the tablist landmark */
  'aria-label'?: string;
  children: ReactNode;
  className?: string;
}

export function TabList({
  'aria-label': ariaLabel,
  children,
  className = '',
}: TabListProps) {
  const { baseId, tabValues, disabledValues, activate, activateOnFocus } =
    useTabsContext();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const enabled = tabValues.current.filter((v) => !disabledValues.has(v));
    if (enabled.length === 0) return;

    const currentFocused = document.activeElement;
    const currentIdx = tabValues.current.findIndex(
      (v) => document.getElementById(tabId(baseId, v)) === currentFocused,
    );
    const currentEnabledIdx = enabled.indexOf(tabValues.current[currentIdx] ?? '');

    let nextValue: string | undefined;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextValue = enabled[(currentEnabledIdx + 1) % enabled.length];
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextValue = enabled[(currentEnabledIdx - 1 + enabled.length) % enabled.length];
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextValue = enabled[0];
    } else if (e.key === 'End') {
      e.preventDefault();
      nextValue = enabled[enabled.length - 1];
    }

    if (nextValue !== undefined) {
      // Always move focus to the tab element
      document.getElementById(tabId(baseId, nextValue))?.focus();
      // Activate immediately if activateOnFocus, otherwise wait for Space/Enter
      if (activateOnFocus) activate(nextValue);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={cn('flex border-b-2 border-slate-200', className)}
    >
      {children}
    </div>
  );
}

// ── Tab ───────────────────────────────────────────────────────────────────────

export interface TabProps {
  /** Must match the value used in <TabPanel value="…"> */
  value: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function Tab({ value, disabled = false, children, className = '' }: TabProps) {
  const { activeValue, activate, baseId, tabValues, disabledValues } = useTabsContext();

  // Register this tab's value in DOM order on first render.
  // Using a ref-mutation here avoids needing a reducer and is safe because
  // the tab list is stable (static children).
  if (!tabValues.current.includes(value)) {
    tabValues.current.push(value);
  }
  if (disabled) {
    disabledValues.add(value);
  } else {
    disabledValues.delete(value);
  }

  const isActive = activeValue === value;

  return (
    <button
      id={tabId(baseId, value)}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId(baseId, value)}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={() => activate(value)}
      className={cn(
        'relative px-5 py-3 text-sm font-semibold font-heading border-b-4 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue/30',
        isActive
          ? 'border-brand-blue text-brand-blue'
          : disabled
            ? 'border-transparent text-slate-300 cursor-not-allowed'
            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
        className,
      )}
    >
      {children}
    </button>
  );
}

// ── TabPanels ─────────────────────────────────────────────────────────────────

export interface TabPanelsProps {
  children: ReactNode;
  className?: string;
}

export function TabPanels({ children, className = '' }: TabPanelsProps) {
  return <div className={className}>{children}</div>;
}

// ── TabPanel ──────────────────────────────────────────────────────────────────

export interface TabPanelProps {
  /** Must match the value used in <Tab value="…"> */
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ value, children, className = '' }: TabPanelProps) {
  const { activeValue, baseId } = useTabsContext();

  if (activeValue !== value) return null;

  return (
    <div
      id={panelId(baseId, value)}
      role="tabpanel"
      aria-labelledby={tabId(baseId, value)}
      tabIndex={0}
      className={cn(
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue/30 rounded-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
