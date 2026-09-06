/**
 * Tooltip — Design System Component
 *
 * A short label or non-interactive formatted content that appears on hover
 * or focus to describe an element.
 *
 * Behavior is provided by @radix-ui/react-tooltip, which handles:
 *   - Trigger scoping (fires only on the direct trigger, not descendants)
 *   - Viewport collision detection and automatic side-flip
 *   - Correct aria-describedby wiring
 *   - Keyboard: Escape closes, focus/blur open/close
 *   - Pointer events (hover, touch)
 *   - Portal rendering to document.body
 *   - Delay management
 *
 * DIWA continues to own:
 *   - Component API (content, placement, delayMs, children, className)
 *   - Visual classes (dark surface, brand-sky bottom accent)
 *   - Typography and spacing
 *
 * Rules:
 *   - Tooltip content must be non-interactive. Interactive elements (links,
 *     buttons) inside `content` will be unclickable due to `pointer-events-none`
 *     on the tooltip panel.
 *   - Do not put ESSENTIAL information only in a tooltip.
 *   - Use for supplementary descriptions: icon button labels, abbrev. meanings.
 *
 * Placement: 'top' | 'bottom' | 'left' | 'right'
 *
 * Difference from Popover:
 *   - Tooltip is for non-interactive content, triggered by hover/focus.
 *   - Popover contains interactive content, triggered by explicit click.
 */

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { type ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** The content shown in the tooltip. Accepts any ReactNode — string, formatted text, or JSX. */
  content: ReactNode;
  /** Placement relative to the trigger */
  placement?: TooltipPlacement;
  /** Delay before showing the tooltip, in ms */
  delayMs?: number;
  /** The element that triggers the tooltip */
  children: ReactNode;
  className?: string;
}

// ── Radix side → DIWA placement mapping ──────────────────────────────────────
// Radix uses 'top' | 'bottom' | 'left' | 'right' directly — exact match.

// ── Component ─────────────────────────────────────────────────────────────────

export function Tooltip({
  content,
  placement = 'top',
  delayMs = 400,
  children,
  className = '',
}: TooltipProps) {
  return (
    // Provider is wrapped here so each Tooltip instance is self-contained.
    // Radix supports nested providers; this avoids requiring app-level setup.
    <TooltipPrimitive.Provider delayDuration={delayMs} skipDelayDuration={0}>
      <TooltipPrimitive.Root>
        {/*
          asChild forwards all props (including focus/hover handling) to the
          actual child element rather than wrapping it in an extra DOM node.
          This eliminates the previous issue where onFocusCapture on the wrapper
          span would fire for any focusable descendant.
        */}
        <TooltipPrimitive.Trigger asChild>
          <span className={cn('inline-flex', className)}>
            {children}
          </span>
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={placement}
            sideOffset={8}
            // Radix adds data-state and data-side attributes for animation hooks.
            className={cn(
              // Base layout
              'pointer-events-none z-50 whitespace-nowrap',
              // DIWA visual treatment — dark surface, brand typography
              'rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white shadow-lg',
              // DIWA structural accent (Phase 2 visual signature)
              'border-b-2 border-brand-sky/60',
              // Entry animation (exit is handled by Radix unmounting the portal immediately)
              'data-[state=open]:animate-in data-[state=open]:fade-in-0',
              'duration-150',
            )}
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
