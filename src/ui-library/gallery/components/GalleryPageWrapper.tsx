/**
 * GalleryPageWrapper
 *
 * Root content wrapper for every gallery component page.
 * Layout is unchanged — spacing and max-width preserved from canonical Button architecture.
 */

import type { ReactNode } from 'react';

interface GalleryPageWrapperProps {
  children: ReactNode;
}

export function GalleryPageWrapper({ children }: GalleryPageWrapperProps) {
  return (
    <article className="mx-auto max-w-5xl space-y-16 pb-32">
      {children}
    </article>
  );
}
