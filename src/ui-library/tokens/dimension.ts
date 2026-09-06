/**
 * DIWA Dimension Tokens
 *
 * Formalizes repeating dimension values identified in the Phase 9 audit.
 * Values are numeric (pixels) or Tailwind class strings as appropriate.
 *
 * Resolved in Phase 11–12:
 *   - Dialog close icon aligned to size={16} (Phase 11).
 *   - ConfirmAction icon badge aligned to h-8 w-8 / rounded-lg (Phase 12).
 */

export const dimension = {
  // ── Icon sizes (lucide-react `size` prop values) ──────────────────────────

  icon: {
    /** Standard close button icon — target 16, currently Dialog uses 18 */
    close:       16,
    /** Icon inside 32×32 header badge */
    badgeSm:     16,
    /** Alert/ConfirmDialog tone icons */
    alert:       20,
    /** Inline small action icons */
    actionSm:    14,
    /** Standard action icons in toolbars, buttons */
    action:      16,
  },

  // ── Icon badge containers ─────────────────────────────────────────────────

  iconBadge: {
    /** Standard 32×32 header icon container — h-8 w-8 */
    size:   'h-8 w-8',
  },

  // ── Component heights ─────────────────────────────────────────────────────

  control: {
    /** Small control height */
    sm: 'h-9',
    /** Default control height */
    md: 'h-10',
    /** Large control height */
    lg: 'h-11',
  },
} as const;
