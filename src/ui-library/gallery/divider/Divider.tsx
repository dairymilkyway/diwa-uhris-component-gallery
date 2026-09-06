/**
 * Divider — Design System Component
 *
 * A thin visual separator between content areas.
 *
 * Decorative usage (default, aria-hidden="true"):
 *   Used purely for visual grouping. Screen readers skip it.
 *   This is the appropriate choice for most cases.
 *
 * Semantic usage (role="separator"):
 *   Use when the separation is meaningful to AT users, e.g. between
 *   logically distinct regions where the boundary matters.
 *   Provide aria-label when context is needed.
 *
 * Orientation:
 *   - horizontal (default): full-width horizontal line, displayed as block.
 *   - vertical: full-height vertical line, displayed inline. The parent
 *     container must give it an explicit height or use flex/grid context.
 */

import { cn } from '../../../lib/utils';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /**
   * 'decorative' (default) — aria-hidden="true". Use for visual-only separation.
   * 'separator'            — role="separator". Use when the boundary is semantically meaningful.
   */
  decorative?: boolean;
  /** Optional accessible label when decorative=false */
  'aria-label'?: string;
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  decorative = true,
  'aria-label': ariaLabel,
  className = '',
}: DividerProps) {
  const isHorizontal = orientation === 'horizontal';

  const ariaProps = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'separator' as const, 'aria-label': ariaLabel, 'aria-orientation': orientation };

  return (
    <div
      {...ariaProps}
      className={cn(
        isHorizontal ? 'w-full border-t border-slate-200' : 'self-stretch border-l border-slate-200',
        className,
      )}
    />
  );
}
