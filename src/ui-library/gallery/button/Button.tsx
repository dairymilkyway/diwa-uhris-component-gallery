/**
 * Button — Design System Component
 *
 * A reusable button component designed from first principles for the
 * organization's design system. Independent of the HRIS btnPrimary token.
 *
 * Variants:  primary | dark | outline | ghost | danger
 * Sizes:     sm | md | lg
 *
 * ── Loading Convention ────────────────────────────────────────────────────────
 *
 * The `loading` prop signals that an async operation is in progress.
 *
 * What `loading` does:
 *   - Sets the HTML `disabled` attribute (prevents interaction, keyboard, click)
 *   - Suppresses leftIcon and rightIcon slots (icons are hidden during loading)
 *   - Does NOT inject a spinner or change the label automatically
 *
 * The caller owns the loading representation inside `children`:
 *
 *   <Button loading={saving}>
 *     {saving
 *       ? <><Loader2 size={15} className="animate-spin" aria-hidden="true" /> Saving…</>
 *       : <><Save size={15} aria-hidden="true" /> Save Changes</>}
 *   </Button>
 *
 * Rationale: The label and icon during loading are context-dependent ("Saving...",
 * "Submitting...", "Uploading..."). Hardcoding them in the component would require
 * a `loadingLabel` prop and make the component harder to compose.
 *
 * Accessibility:
 *   - The `disabled` attribute is sufficient. Screen readers announce the disabled
 *     state. No `aria-busy` is added because the button itself is not busy — the
 *     surrounding operation is. If the page has a loading region, apply aria-busy
 *     to that region instead.
 *   - The Loader2 icon inside children should always have aria-hidden="true" so
 *     the spinner does not duplicate the label in screen reader output.
 *
 * Dimension stability:
 *   - Because children is caller-controlled, the button may resize between default
 *     and loading states if the label length changes ("Save" → "Saving...").
 *     Use `min-w` on the button when stable width is required in a layout.
 *
 * loading + disabled interaction:
 *   - Both `loading` and `disabled` independently disable the button.
 *   - Passing both is valid but redundant. The visual result is identical.
 *   - Prefer `loading` when the state is transient; `disabled` when it is permanent.
 *
 * How future design-system components should document loading:
 *   - Follow this same pattern: caller provides children, component provides the
 *     disabled/suppression behavior.
 *   - Document the convention in the component's JSDoc, not in a separate file.
 *   - Show a loading example in the component's playground and code examples section.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';
import { Slot } from '@radix-ui/react-slot';

export type ButtonVariant = 'primary' | 'dark' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
  /**
   * When true, renders the button as a child component (via Radix Slot).
   * Use this to render a Link or anchor as a button visually while preserving
   * its native semantics. The type and disabled props are ignored when asChild is true.
   */
  asChild?: boolean;
}

// ── Style maps ────────────────────────────────────────────────────────────────

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'font-bold bg-brand-blue text-white shadow-lg shadow-brand-blue/25 hover:bg-brand-navy hover:shadow-xl hover:shadow-brand-blue/30 active:bg-brand-navy focus-visible:ring-brand-blue/30 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none',
  dark:
    'font-semibold bg-slate-900 text-white shadow-lg shadow-slate-200 hover:bg-slate-800 active:bg-slate-950 focus-visible:ring-slate-300 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none',
  outline:
    'font-semibold border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-brand-blue/40 hover:bg-blue-50/40 hover:text-brand-blue active:bg-slate-100 focus-visible:ring-brand-blue/20 disabled:border-slate-200 disabled:bg-white disabled:text-slate-300 disabled:shadow-none',
  ghost:
    'font-semibold bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus-visible:ring-slate-200 disabled:text-slate-300',
  danger:
    'font-bold bg-rose-600 text-white shadow-lg shadow-rose-100 hover:bg-rose-700 active:bg-rose-800 focus-visible:ring-rose-300 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 rounded-md px-3 text-xs',
  md: 'h-10 gap-2 rounded-md px-4 text-sm',
  lg: 'h-11 gap-2.5 rounded-md px-6 text-base',
};

const BASE =
  'inline-flex items-center justify-center transition-all duration-150 ease-out active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:active:scale-100 select-none';

// ── Component ─────────────────────────────────────────────────────────────────

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      type={asChild ? undefined : 'button'}
      disabled={asChild ? undefined : (disabled || loading)}
      className={cn(
        BASE,
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {leftIcon && !loading && leftIcon}
          {children}
          {rightIcon && !loading && rightIcon}
        </>
      )}
    </Comp>
  );
}
