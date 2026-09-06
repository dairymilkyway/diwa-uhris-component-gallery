import type React from 'react';

/**
 * Composes multiple React refs into one callback ref.
 * Used when a component needs both an internal ref and a forwarded external ref.
 *
 * Example:
 *   <input ref={composeRefs(internalRef, forwardedRef)} />
 */
export function composeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}
