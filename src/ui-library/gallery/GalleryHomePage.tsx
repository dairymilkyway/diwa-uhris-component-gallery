/**
 * GalleryHomePage
 *
 * UHRIS Component Gallery homepage.
 * Layout matches the Checkbox design system reference:
 * — Large brand-navy heading + subtitle
 * — "GUIDELINES & RESOURCES" section label
 * — Category cards with icon, name, and description
 * — Below: all-components grid per category
 */

import { Link } from 'react-router-dom';
import {
  Boxes,
  Component,
  Eye,
  Layers2,
  LayoutDashboard,
  Navigation,
  Palette,
  Table2,
  Building2,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { GalleryLayout } from './GalleryLayout';
import {
  GALLERY_CATEGORIES,
  getComponentsByCategory,
  type ComponentEntry,
  type GalleryCategory,
} from '../registry';

// ── Category metadata ─────────────────────────────────────────────────────────

const CATEGORY_META: Record<GalleryCategory, { icon: React.ElementType; description: string }> = {
  Foundations: {
    icon: Palette,
    description: 'Colors, typography, spacing, radius, elevation, motion, and icons.',
  },
  Inputs: {
    icon: Component,
    description: 'Buttons, form controls, and every interactive element users touch.',
  },
  Display: {
    icon: Eye,
    description: 'Cards, badges, alerts, skeletons, and all visual feedback primitives.',
  },
  Navigation: {
    icon: Navigation,
    description: 'Tabs, breadcrumbs, menus, sidebars, and pagination.',
  },
  Overlay: {
    icon: Layers2,
    description: 'Modals, drawers, popovers, tooltips, and dialogs.',
  },
  Layout: {
    icon: LayoutDashboard,
    description: 'Page structure, toolbars, dividers, sections, and wizard layouts.',
  },
  'Data Display': {
    icon: Table2,
    description: 'Tables, charts, calendars, kanban boards, and activity feeds.',
  },
  Enterprise: {
    icon: Building2,
    description: 'Employee cards, org charts, approval timelines, and permission matrices.',
  },
};

// ── Category card ─────────────────────────────────────────────────────────────

function CategoryCard({ cat, entries }: { cat: GalleryCategory; entries: ComponentEntry[] }) {
  const meta = CATEGORY_META[cat];
  const Icon = meta.icon;
  const available = entries.filter((e) => e.route !== null);
  const firstRoute = available[0]?.route ?? '/ui-library';

  return (
    <Link
      to={firstRoute}
      className="group flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-150 hover:border-brand-sky/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
    >
      {/* Icon badge */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
        <Icon size={20} className="text-brand-blue" aria-hidden="true" />
      </div>

      {/* Text */}
      <div className="flex-1 space-y-1.5">
        <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
          {cat}
        </h3>
        <p className="text-sm font-medium leading-relaxed text-slate-500">
          {meta.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300 tabular-nums">
          {entries.length} component{entries.length !== 1 ? 's' : ''}
        </span>
        <ArrowRight
          size={14}
          className="text-slate-300 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-brand-sky"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

// ── Component row card ────────────────────────────────────────────────────────

function ComponentCard({ entry }: { entry: ComponentEntry }) {
  const isAvailable = entry.route !== null;

  if (!isAvailable) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
        <span className="text-sm font-medium text-slate-300">{entry.name}</span>
        <Clock size={11} className="shrink-0 text-slate-200" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Link
      to={entry.route!}
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-100 hover:border-brand-sky/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
    >
      <span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-brand-blue">
        {entry.name}
      </span>
      <ArrowRight
        size={13}
        className="shrink-0 text-slate-200 transition-all duration-100 group-hover:translate-x-0.5 group-hover:text-brand-sky"
        aria-hidden="true"
      />
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GalleryHomePage() {
  const byCategory = getComponentsByCategory();

  return (
    <GalleryLayout activeId={null}>
      <title>UHRIS Component Gallery</title>

      <div className="mx-auto max-w-5xl space-y-20 pb-24">

        {/* ── Developer toolkit disclaimer ──────────────────────────────── */}
        <aside
          role="note"
          aria-label="Gallery purpose disclaimer"
          className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 flex items-start gap-3"
        >
          <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM8 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 5Zm0 6.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75Z" fill="currentColor"/>
            </svg>
          </span>
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-amber-800">Developer Reference — Not a Visual Acceptance Standard</p>
            <p className="text-xs font-medium leading-relaxed text-amber-700">
              This gallery documents component APIs, default states, and interaction behaviour.
              In production, tone, content, labels, icon choice, and size are expected to be
              adapted per feature context. Acceptance criteria should be evaluated against
              the feature specification, not the gallery's default appearance.
            </p>
          </div>
        </aside>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div className="space-y-6 pt-2">
          <div className="space-y-4">
            <h1 className="font-heading text-5xl font-bold tracking-tight text-brand-navy leading-tight">
              UHRIS Design System
            </h1>
            <p className="max-w-2xl text-xl font-medium leading-relaxed text-slate-400">
              A unified component library for building consistent, accessible,
              and production-ready interfaces across the UHRIS platform.
            </p>
          </div>

          {/* Stats row removed */}
        </div>

        {/* ── Category cards ─────────────────────────────────────────────── */}
        <section aria-labelledby="categories-heading">
          <p
            id="categories-heading"
            className="mb-6 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400"
          >
            Guidelines &amp; Resources
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat}
                cat={cat}
                entries={byCategory.get(cat) ?? []}
              />
            ))}
          </div>
        </section>

        {/* ── All components by category ─────────────────────────────────── */}
        <section aria-labelledby="all-components-heading">
          <div className="mb-8 flex items-center gap-3">
            <Boxes size={18} className="text-brand-sky" aria-hidden="true" />
            <h2
              id="all-components-heading"
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400"
            >
              All Components
            </h2>
          </div>

          <div className="space-y-12">
            {GALLERY_CATEGORIES.map((cat) => {
              const entries = byCategory.get(cat) ?? [];
              const meta = CATEGORY_META[cat];
              const Icon = meta.icon;

              return (
                <div key={cat}>
                  {/* Category header */}
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                      <Icon size={14} className="text-brand-blue" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-700">{cat}</h3>
                    <span className="ml-1 text-xs font-semibold text-slate-300 tabular-nums">
                      {entries.length}
                    </span>
                  </div>

                  {/* Component grid */}
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {entries.map((entry) => (
                      <ComponentCard key={entry.id} entry={entry} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </GalleryLayout>
  );
}
