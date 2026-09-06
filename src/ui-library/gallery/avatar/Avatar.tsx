/**
 * Avatar — Design System Component
 *
 * Circular identity tile displaying either an image or an initials fallback.
 * Purely presentational — no user model, no API calls, no feature-module deps.
 *
 * Renders:
 *   1. <img> when `src` is provided and loads successfully
 *   2. Initials text when `src` is absent or fails to load
 *   3. "?" when name is absent or empty
 *
 * Accessibility:
 *   - With src: <img> has alt={name} (or alt="" if decorative)
 *   - Initials fallback: aria-label={name} on the container
 *   - role="img" is applied in both cases so screen readers
 *     can announce the avatar as an image regardless of rendering path
 *
 * Usage:
 *   <Avatar name="Juan dela Cruz" />
 *   <Avatar name="Maria Santos" src="/photos/maria.jpg" />
 *   <Avatar name="Jose Reyes" size="lg" />
 *   <Avatar name="Ana Gonzalez" color="#0369A1" />
 */

import { useState } from 'react';
import { cn } from '../../../lib/utils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** Display name — used for initials generation and aria-label. */
  name?: string;
  /** Optional image source. Falls back to initials when absent or on error. */
  src?: string | null;
  /** Size preset. Default: 'md' (40px) */
  size?: AvatarSize;
  /**
   * Background color for the initials fallback.
   * Overrides the automatic deterministic color derived from `name`.
   * Pass a valid CSS color value.
   */
  color?: string;
  /** Additional className on the root element. */
  className?: string;
}

// ── Size config ───────────────────────────────────────────────────────────

const SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[9px]',
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

// ── Initials helper ───────────────────────────────────────────────────────

function getInitials(name?: string): string {
  if (!name || !name.trim()) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return (parts[0] ?? '').charAt(0).toUpperCase();
  return ((parts[0] ?? '').charAt(0) + (parts[parts.length - 1] ?? '').charAt(0)).toUpperCase();
}

// ── Color helper ──────────────────────────────────────────────────────────

const PALETTE = [
  '#00377B', // brand-navy
  '#034EA2', // brand-blue
  '#2D8ACA', // brand-sky
  '#00ADCC', // brand-cyan
  '#00A74C', // brand-green
  '#B61D66', // brand-magenta
  '#F68B1F', // brand-orange
  '#0F4C81', // brand-navy mid
  '#0369A1', // sky-700 (close to brand-sky dark)
];

function deriveColor(name?: string): string {
  if (!name) return PALETTE[0]!;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length]!;
}

// ── Avatar ────────────────────────────────────────────────────────────────

export function Avatar({ name, src, size = 'md', color, className = '' }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = !!src && !imgError;
  const bg = color ?? deriveColor(name);
  const initials = getInitials(name);
  const label = name || 'Unknown';

  const baseClass = cn(
    'inline-flex items-center justify-center rounded-full shrink-0',
    'font-bold text-white select-none overflow-hidden',
    SIZE_CLASSES[size],
    className,
  );

  if (showImage) {
    return (
      <img
        src={src!}
        alt={label}
        className={[baseClass, 'object-cover'].join(' ')}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={baseClass}
      style={{ backgroundColor: bg }}
    >
      {initials}
    </div>
  );
}
