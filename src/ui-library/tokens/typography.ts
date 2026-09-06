/**
 * DIWA Typography Tokens
 *
 * Formalizes the typographic vocabulary identified in the Phase 9 audit.
 * Values are Tailwind utility class strings.
 *
 * Two brand typefaces (defined in tailwind.config.js):
 *   font-heading  — Barlow (700/800) — headings, titles, overlay headers
 *   font-body     — Libre Franklin (variable) — all other UI text (inherited)
 *
 * Known inconsistency resolved in Phase 11:
 *   Modal and Dialog titles now both use typography.titleOverlay.
 *   Drawer title uses font-heading text-base font-bold directly — align in a future pass.
 */

export const typography = {
  // ── Heading roles ─────────────────────────────────────────────────────────

  /**
   * Overlay title (Modal, Dialog, Drawer).
   * Applied to: Modal (DialogPrimitive.Title) and Dialog (DialogPrimitive.Title).
   * Drawer title uses font-heading text-base font-bold directly — align in a future pass.
   */
  titleOverlay:   'font-heading text-base font-bold leading-tight',

  /**
   * Section/card heading.
   */
  titleSection:   'font-heading text-sm font-bold text-slate-900',

  // ── Label roles ───────────────────────────────────────────────────────────

  /**
   * Uppercase field label — used above form inputs.
   */
  labelUppercase: 'text-xs font-bold uppercase tracking-wide text-slate-500',

  /**
   * Helper/error text below form fields.
   */
  helper:         'text-xs font-medium',

  // ── Body roles ────────────────────────────────────────────────────────────

  /**
   * Primary UI text — buttons, body, inputs, descriptions.
   */
  body:           'text-sm font-medium',

  /**
   * Secondary/supporting text.
   */
  secondary:      'text-xs font-medium text-slate-500',
} as const;
