/**
 * RelatedComponents
 *
 * Brand application (DESIGN.md):
 *   Card hover border  — brand-sky/60
 *   Card name hover    — brand-blue
 *   Arrow hover        — brand-sky
 *   Focus ring         — brand-blue/25
 */

import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import type { ComponentEntry } from '../../registry';

interface RelatedComponentsProps {
  components: ComponentEntry[];
}

export function RelatedComponents({ components }: RelatedComponentsProps) {
  if (components.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {components.map((comp) =>
        comp.route ? (
          <Link
            key={comp.id}
            to={comp.route}
            className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-brand-sky/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
          >
            <div>
              <p className="text-sm font-bold text-slate-800 transition-colors group-hover:text-brand-blue">
                {comp.name}
              </p>
              <p className="mt-0.5 text-xs font-medium text-slate-400">
                {comp.category}
              </p>
            </div>
            <ArrowRight
              size={14}
              className="ml-2 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-sky"
              aria-hidden="true"
            />
          </Link>
        ) : (
          <div
            key={comp.id}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 opacity-60"
            aria-disabled="true"
          >
            <div>
              <p className="text-sm font-bold text-slate-500">{comp.name}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-400">
                {comp.category}
              </p>
            </div>
            <Clock size={12} className="ml-2 text-slate-300" aria-hidden="true" />
          </div>
        ),
      )}
    </div>
  );
}
