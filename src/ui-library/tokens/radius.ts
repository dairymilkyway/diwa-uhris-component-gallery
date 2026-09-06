/**
 * DIWA Radius Tokens
 *
 * Formalizes the border-radius vocabulary identified in the Phase 9 audit.
 * Values are Tailwind utility class names.
 *
 * Design intent:
 *   - panel       — full overlay/card surfaces (Modal, Dialog, Card, Drawer)
 *   - control     — interactive form controls (Button, Input, Select)
 *   - pill        — purely presentational (Badge pill tones, Spinner track)
 *   - badge-status — small status indicators with formal/rectangular feel
 *   - icon-badge  — 32×32 icon containers in headers
 *
 * Note: rounded-xl previously appeared in legacy ConfirmAction inlined buttons
 * (resolved in Phase 11) and the ConfirmAction icon badge (resolved in Phase 12).
 */

export const radius = {
  /** Overlay and card panel corners — rounded-lg */
  panel:        'rounded-lg',
  /** Form controls and action buttons — rounded-md */
  control:      'rounded-md',
  /** Pill badges and Spinner track — rounded-full */
  pill:         'rounded-full',
  /** Status badge tones (formal/rectangular) — rounded */
  badgeStatus:  'rounded',
  /** 32×32 icon badge containers in overlay headers — rounded-lg */
  iconBadge:    'rounded-lg',
} as const;
