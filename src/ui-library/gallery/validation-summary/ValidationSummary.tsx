/**
 * ValidationSummary — Design System Component
 *
 * Renders a list of validation errors or warnings before a form is submitted.
 * Matches the production implementation in shared/components/ValidationSummary.tsx.
 *
 * Accessibility:
 *   - role="alert" causes immediate announcement when injected into the DOM.
 *   - <ul> with <li> items provides proper list semantics.
 *   - The heading is a <div role="heading" aria-level="3"> to avoid disrupting
 *     page outline; callers may override via headingLevel.
 *   - Each issue is identified by field name + message.
 *
 * Usage:
 *   const [issues, setIssues] = useState<ValidationIssue[]>([]);
 *   // ... after validation:
 *   setIssues([{ field: 'Employee ID', message: 'is required' }]);
 *   // Render:
 *   <ValidationSummary issues={issues} />
 *
 *   // With scroll-to-field (wizard steps):
 *   <ValidationSummary
 *     issues={issues}
 *     fieldIds={{ 'Employee ID': 'employee-id-input', 'Position': 'position-select' }}
 *     fieldLabels={{ 'Employee ID': 'Employee ID', 'Position': 'Position Title' }}
 *   />
 */

import { cn } from '../../../lib/utils';

export interface ValidationIssue {
  /** Human-readable field label. */
  field: string;
  /** Error description for this field. */
  message: string;
}

export interface ValidationSummaryProps {
  /** List of validation issues. Renders nothing when empty. */
  issues: ValidationIssue[];
  /**
   * Heading text shown above the issue list.
   * Default: "Review these fields before saving"
   */
  heading?: string;
  /**
   * Maps issue.field → the DOM element id that the user should be
   * scrolled to when they click the error.
   * When provided, each matching issue renders as a clickable link
   * that scrolls to and focuses the target element.
   * Issues with no matching key render as plain text.
   */
  fieldIds?: Record<string, string>;
  /**
   * Maps issue.field → a human-friendly display label.
   * When provided, the display label replaces the raw field key in
   * the rendered message. Useful when the field key is a code/ID and
   * the label is the visible form field name.
   */
  fieldLabels?: Record<string, string>;
  /** Additional class on the root element. */
  className?: string;
}

function scrollToField(domId: string) {
  const el = document.getElementById(domId);
  if (!el) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
  // Focus the first focusable element inside, or the element itself
  const focusable = el.querySelector<HTMLElement>('input,select,textarea,[tabindex]');
  (focusable ?? el).focus();
}

export function ValidationSummary({
  issues,
  heading = 'Review these fields before saving',
  fieldIds,
  fieldLabels,
  className = '',
}: ValidationSummaryProps) {
  if (issues.length === 0) return null;

  return (
    <div
      role="alert"
      className={cn(
        'rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900',
        className,
      )}
    >
      <div className="font-bold">{heading}</div>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {issues.map((issue) => {
          const displayLabel = fieldLabels?.[issue.field] ?? issue.field;
          const domId = fieldIds?.[issue.field];
          const label = (
            <>
              <span className="font-semibold">{displayLabel}:</span>{' '}
              {issue.message}
            </>
          );

          return (
            <li key={`${issue.field}:${issue.message}`}>
              {domId ? (
                <button
                  type="button"
                  onClick={() => scrollToField(domId)}
                  className="underline decoration-amber-500/60 underline-offset-2 hover:decoration-amber-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-600 rounded text-left"
                >
                  {label}
                </button>
              ) : (
                label
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Re-export type for consumer convenience
export type { ValidationIssue as ValidationSummaryIssue };
