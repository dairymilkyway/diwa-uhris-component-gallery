/**
 * DIWA Shadow Tokens
 *
 * Formalizes the three-tier shadow vocabulary identified in the Phase 9 audit.
 * Values are Tailwind utility class strings.
 *
 * Three tiers:
 *   inline    — no elevation (Cards without shadow, inputs, inline surfaces)
 *   floating  — anchored floating panels (Popover, Tooltip)
 *   overlay   — full-screen overlay panels (Modal, Dialog, Drawer)
 *
 * Button shadows are documented separately — they carry color-tinted shadows
 * that are component-specific and not candidates for centralization yet.
 */

export const shadow = {
  /** No shadow — inline surfaces */
  none:     '',
  /** Anchored floating panels — shadow-lg */
  floating: 'shadow-lg',
  /** Full-screen overlay panels — shadow-xl */
  overlay:  'shadow-xl',

  // ── Button shadows — documented, not used directly ─────────────────────
  // These are component-specific. Kept here for reference only.
  // Wave 2 will decide whether to centralize button shadow tokens.
  //
  //   buttonPrimary: 'shadow-lg shadow-brand-blue/20'
  //   buttonDanger:  'shadow-lg shadow-rose-100'
} as const;
