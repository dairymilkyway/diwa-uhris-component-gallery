/**
 * Section — Design System Component
 *
 * A named content grouping block with an optional description and actions.
 * Intentionally lightweight — wraps content in a semantic <section> element
 * with a heading of the appropriate level.
 *
 * <Section title="Personal Information" description="Employee contact details">
 *   ...content...
 * </Section>
 *
 * <Section
 *   title="Government IDs"
 *   level={3}
 *   actions={<Button size="sm">Edit</Button>}
 * >
 *   ...content...
 * </Section>
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface SectionProps {
  /** Section heading text */
  title: string;
  /** Optional short description below the heading */
  description?: string;
  /** Optional actions (buttons, links) rendered in the heading row */
  actions?: ReactNode;
  /** Heading element level. Defaults to 2. */
  level?: HeadingLevel;
  children: ReactNode;
  className?: string;
}

export function Section({
  title,
  description,
  actions,
  level = 2,
  children,
  className = '',
}: SectionProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  const headingClass =
    level === 1
      ? 'text-2xl font-bold text-slate-900'
      : level === 2
        ? 'text-lg font-bold text-slate-900'
        : 'text-base font-bold text-slate-800';

  return (
    <section className={cn('space-y-4', className)}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Tag className={headingClass}>{title}</Tag>
          {description && (
            <p className="mt-0.5 text-sm font-medium text-slate-500 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Content */}
      {children}
    </section>
  );
}
