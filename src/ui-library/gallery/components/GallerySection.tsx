/**
 * GallerySection
 *
 * Brand application (DESIGN.md):
 *   Section H2 — brand-navy (primary hierarchy, one step below component H1)
 *   Description — slate-500 (functional neutral, not a brand color)
 */

import type { ReactNode } from 'react';

interface GallerySectionProps {
  id: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function GallerySection({ id, title, description, children }: GallerySectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-8 space-y-6"
    >
      <div>
        {/* Section heading — brand-navy signals primary content hierarchy */}
        <h2
          id={`${id}-heading`}
          className="font-heading text-2xl font-bold tracking-tight text-brand-navy"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 text-base font-medium leading-relaxed text-slate-500">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
