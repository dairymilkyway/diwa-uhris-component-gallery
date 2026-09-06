/**
 * DIWA Color Tokens
 *
 * Formalizes the color vocabulary identified in the Phase 9 audit.
 * These are string constants that map to Tailwind utility class fragments.
 *
 * Rules:
 *   - All values are Tailwind class suffixes, not raw hex values.
 *   - Brand primitives (brand-navy, brand-blue, brand-sky) are defined in
 *     tailwind.config.js and are the single source of truth for hex values.
 *   - Semantic palette (slate, rose, emerald, amber, sky) uses standard Tailwind.
 *   - Do NOT introduce CSS custom properties here.
 *   - Do NOT import this at runtime inside components yet — this file is the
 *     reference foundation for future component customization.
 *
 * Usage (future):
 *   import { focus, border } from '@/ui-library/tokens/colors';
 *   className={`focus-visible:ring-2 focus-visible:ring-${focus.interactive}`}
 */

// ── Interactive ───────────────────────────────────────────────────────────────
// Primary interactive color. Used for buttons, links, active indicators.

export const interactive = {
  /** Core interactive — brand-blue (#034EA2) */
  default:  'brand-blue',
  /** Hover/deepen target — brand-navy (#00377B) */
  hover:    'brand-navy',
  /** Lighter accent — brand-sky (#2D8ACA) */
  accent:   'brand-sky',
} as const;

// ── Surface ───────────────────────────────────────────────────────────────────
// Page and overlay background colors.

export const surface = {
  /**
   * Page background — registered in tailwind.config.js as 'surface-page' (#f4f6f9).
   * Use: bg-surface-page
   */
  page:     'surface-page',
  /**
   * All overlay backdrops (Modal, Dialog, Drawer).
   * Use: bg-brand-navy/50 backdrop-blur-sm
   */
  overlay:  'brand-navy/50',
} as const;

// ── Border ────────────────────────────────────────────────────────────────────

export const border = {
  /** Default border on inputs, cards, popovers — slate-200 */
  base:       'slate-200',
  /** Header/footer separator lines — slate-100 */
  separator:  'slate-100',
} as const;

// ── Text ──────────────────────────────────────────────────────────────────────

export const text = {
  /** Primary body text — slate-900 */
  body:       'slate-900',
  /** Secondary/label text — slate-500 */
  secondary:  'slate-500',
  /** Muted/placeholder text — slate-400 */
  muted:      'slate-400',
  /** Disabled text — slate-300 */
  disabled:   'slate-300',
} as const;

// ── Focus rings ───────────────────────────────────────────────────────────────
// Full Tailwind class strings — used directly in className.
// Three distinct levels:
//   field     — focus-within on form field wrappers (lightest, /15)
//   default   — keyboard focus on all interactive elements (/30)
//   danger    — keyboard focus on destructive elements (rose-300)

export const focus = {
  /**
   * Field wrapper focus ring.
   * Applied via focus-within on Input/Select/Textarea wrappers.
   * Intentionally lighter than interactive focus — it's a containing ring.
   */
  field:       'focus-within:ring-2 focus-within:ring-brand-blue/15',

  /**
   * Standard interactive focus ring.
   * Applied via focus-visible on all buttons, links, and controls.
   * Use: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30
   */
  interactive: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',

  /**
   * Danger interactive focus ring.
   * Applied on destructive buttons.
   * Use: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300
   */
  danger:      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300',
} as const;

// ── Semantic tones ────────────────────────────────────────────────────────────
// Documented here as the canonical DIWA tone vocabulary.
// Not intended to be used directly — components own their own tone maps.

export const tone = {
  danger:  { bg: 'rose-50',    border: 'rose-200',    text: 'rose-700',    icon: 'rose-500'    },
  success: { bg: 'emerald-50', border: 'emerald-200', text: 'emerald-700', icon: 'emerald-500' },
  warning: { bg: 'amber-50',   border: 'amber-200',   text: 'amber-700',   icon: 'amber-500'   },
  info:    { bg: 'sky-50',     border: 'sky-200',     text: 'sky-700',     icon: 'sky-500'     },
} as const;
