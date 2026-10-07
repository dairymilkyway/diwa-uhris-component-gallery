import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Floating layers (Menu panels, DatePicker calendars) portal to document.body.
 * Inside an open Modal/Dialog, Radix blocks pointer events outside its content
 * and treats any interaction there as "outside" (closing the dialog). Floating
 * layers opt out by setting `pointer-events: auto` and carrying this marker;
 * Modal and Dialog then ignore interactions that land inside them.
 */
export const FLOATING_LAYER_ATTR = 'data-pis-floating';
export const FLOATING_LAYER_SELECTOR = `.pis-datepicker-popover, [${FLOATING_LAYER_ATTR}]`;
