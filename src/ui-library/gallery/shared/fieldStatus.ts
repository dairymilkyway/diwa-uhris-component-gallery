/**
 * Shared field-status style constants.
 *
 * Used by Input, Textarea, and Select — the three form controls that share
 * an identical status → ring-color and status → helper-text-color mapping.
 *
 * This is an internal utility. It is NOT a public design-system API.
 * Do not import this outside the ui-library/gallery directory.
 */

export type FieldStatus = 'default' | 'error' | 'success';

/**
 * Border + focus-ring classes for the field wrapper/element.
 * Applied via focus: or focus-within: depending on component structure.
 * Interactive color uses brand-blue per the UHRIS brand identity.
 */
export const FIELD_STATUS_RING_WITHIN: Record<FieldStatus, string> = {
  default: 'border-slate-200 focus-within:border-brand-blue/50 focus-within:ring-2 focus-within:ring-brand-blue/15',
  error:   'border-rose-300  focus-within:border-rose-400   focus-within:ring-2 focus-within:ring-rose-100',
  success: 'border-emerald-300 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100',
};

export const FIELD_STATUS_RING_DIRECT: Record<FieldStatus, string> = {
  default: 'border-slate-200 focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/15',
  error:   'border-rose-300  focus:border-rose-400   focus:ring-2 focus:ring-rose-100',
  success: 'border-emerald-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100',
};

/** Helper/error text color */
export const FIELD_HELPER_COLOR: Record<FieldStatus, string> = {
  default: 'text-slate-400',
  error:   'text-rose-500',
  success: 'text-emerald-600',
};
