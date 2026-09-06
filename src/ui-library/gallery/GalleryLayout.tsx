/**
 * GalleryLayout
 *
 * Shell for the UHRIS Component Gallery.
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Menu,
  Search,
  X,
} from 'lucide-react';
import {
  COMPONENT_REGISTRY,
  GALLERY_CATEGORIES,
  getComponentsByCategory,
  type ComponentEntry,
  type GalleryCategory,
} from '../registry';
import diwaEmblem from '../../assets/emblem/diwa-emblem.png';

// ── Sidebar nav item ──────────────────────────────────────────────────────────

function NavItem({
  entry,
  activeId,
  onNavigate,
}: {
  entry: ComponentEntry;
  activeId: string | string[] | null;
  onNavigate?: () => void;
}) {
  const isActive = Array.isArray(activeId) ? activeId.includes(entry.id) : activeId === entry.id;
  const isAvailable = entry.route !== null;
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [isActive]);

  if (!isAvailable) {
    return (
      <li ref={itemRef}>
        <span className="flex items-center justify-between rounded-md px-3 py-2 text-[15px] font-medium text-slate-300 cursor-default select-none">
          <span className="truncate">{entry.name}</span>
          <Clock size={11} className="shrink-0 text-slate-300 ml-2" aria-hidden="true" />
        </span>
      </li>
    );
  }

  return (
    <li ref={itemRef}>
      <Link
        to={entry.route!}
        onClick={onNavigate}
        className={[
          'flex items-center justify-between rounded-md px-3 py-2 text-[15px] font-medium transition-all duration-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
          isActive
            ? 'bg-blue-50 text-brand-blue font-semibold'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
        ].join(' ')}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className="truncate">{entry.name}</span>
        {isActive && (
          <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
        )}
      </Link>
    </li>
  );
}

// ── Collapsible category section ──────────────────────────────────────────────

function CategorySection({
  cat,
  entries,
  activeId,
  onNavigate,
  defaultOpen,
}: {
  cat: GalleryCategory;
  entries: ComponentEntry[];
  activeId: string | string[] | null;
  onNavigate?: () => void;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const hasActive = entries.some((e) =>
    Array.isArray(activeId) ? activeId.includes(e.id) : activeId === e.id,
  );

  useEffect(() => {
    if (hasActive) setOpen(true);
  }, [hasActive]);

  return (
    <div className="mb-0.5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
        aria-expanded={open}
      >
        <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-slate-400">
          {cat}
        </span>
        <ChevronDown
          size={12}
          className={[
            'text-slate-400 transition-transform duration-200',
            open ? 'rotate-0' : '-rotate-90',
          ].join(' ')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul className="mt-0.5 mb-2 space-y-0.5">
          {entries.map((entry) => (
            <NavItem key={entry.id} entry={entry} activeId={activeId} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Sidebar nav tree ──────────────────────────────────────────────────────────

function NavTree({
  activeId,
  onNavigate,
}: {
  activeId: string | string[] | null;
  onNavigate?: () => void;
}) {
  const byCategory = useMemo(() => getComponentsByCategory(), []);

  const activeCategory = useMemo(() => {
    if (!activeId) return null;
    const id = Array.isArray(activeId) ? activeId[0] : activeId;
    const entry = COMPONENT_REGISTRY.find((c) => c.id === id);
    return entry?.category ?? null;
  }, [activeId]);

  return (
    <nav aria-label="Component gallery navigation">
      {GALLERY_CATEGORIES.map((cat) => {
        const entries = byCategory.get(cat) ?? [];
        return (
          <CategorySection
            key={cat}
            cat={cat}
            entries={entries}
            activeId={activeId}
            onNavigate={onNavigate}
            defaultOpen={cat === activeCategory}
          />
        );
      })}
    </nav>
  );
}

// ── Mobile sidebar ────────────────────────────────────────────────────────────

function MobileSidebar({
  open,
  onClose,
  activeId,
}: {
  open: boolean;
  onClose: () => void;
  activeId: string | string[] | null;
}) {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        aria-label="Close navigation"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-white shadow-2xl border-r border-slate-200">
        {/* Mobile header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 p-0.5 overflow-hidden">
              <img
                src={diwaEmblem}
                alt="DIWA Learning Systems Inc. emblem"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-sm font-bold text-slate-900">Component Gallery</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
            aria-label="Close navigation"
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar px-2 py-3">
          <NavTree activeId={activeId} onNavigate={onClose} />
        </div>
      </div>
    </>
  );
}

// ── Root layout ───────────────────────────────────────────────────────────────

interface GalleryLayoutProps {
  children: React.ReactNode;
  activeId?: string | string[] | null;
}

export function GalleryLayout({ children, activeId = null }: GalleryLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // ── Global search state ────────────────────────────────────────────────
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return COMPONENT_REGISTRY
      .filter((e) => e.route !== null)
      .map((e) => {
        let score = 0;
        if (e.name.toLowerCase() === q) score = 100;
        else if (e.name.toLowerCase().startsWith(q)) score = 80;
        else if (e.name.toLowerCase().includes(q)) score = 60;
        else if (e.description.toLowerCase().includes(q)) score = 40;
        else if (e.aliases.some((a) => a.toLowerCase().includes(q))) score = 20;
        else if (e.category.toLowerCase().includes(q)) score = 10;
        return { ...e, score };
      })
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, Math.min(results.length, 8) - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = results[highlightIndex] ?? results[0];
      if (target?.route) {
        navigate(target.route);
        setQuery('');
        setShowResults(false);
        setHighlightIndex(-1);
      }
    } else if (e.key === 'Escape') {
      setShowResults(false);
      setHighlightIndex(-1);
    }
  };

  // Click outside to close search results
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Scroll to top on every page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f9]">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto flex max-w-screen-2xl items-center gap-3 px-4 py-3 sm:px-6">

          {/* Mobile menu trigger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
          >
            <Menu size={16} />
          </button>

          {/* Brand wordmark */}
          <Link
            to="/ui-library"
            className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 p-0.5 overflow-hidden">
              <img
                src={diwaEmblem}
                alt="DIWA Learning Systems Inc. emblem"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm font-bold tracking-wide text-brand-navy">UHRIS</span>
              <span className="mx-1 text-slate-300">/</span>
              <span className="text-sm font-medium text-slate-500">Component Gallery</span>
              <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-400 tabular-nums">
                v{__APP_VERSION__}
              </span>
            </div>
          </Link>

          {/* Global search */}
          <div className="relative ml-auto hidden sm:block" ref={searchRef}>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowResults(e.target.value.length > 0); }}
                onFocus={() => { if (query.length > 0) setShowResults(true); }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search components…"
                aria-label="Search component gallery"
                aria-expanded={showResults}
                aria-haspopup="listbox"
                role="combobox"
                className="h-8 w-48 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:w-64 focus:border-brand-blue/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/15 transition-all duration-200"
              />
            </div>

            {/* Results dropdown */}
            {showResults && results.length > 0 && (
              <div
                role="listbox"
                aria-label="Search results"
                className="absolute right-0 top-full z-50 mt-1.5 w-72 rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl"
              >
                {results.slice(0, 8).map((entry, i) => (
                  <Link
                    key={entry.id}
                    to={entry.route!}
                    role="option"
                    aria-selected={i === highlightIndex}
                    onClick={() => { setQuery(''); setShowResults(false); }}
                    className={[
                      'flex items-center justify-between px-4 py-2.5 text-sm transition-colors',
                      i === highlightIndex ? 'bg-blue-50 text-brand-blue' : 'text-slate-700 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    <div>
                      <span className="font-semibold">{entry.name}</span>
                      <span className="ml-2 text-[11px] text-slate-400">{entry.category}</span>
                    </div>
                    <ArrowRight size={12} className="shrink-0 text-slate-300" aria-hidden="true" />
                  </Link>
                ))}
                {results.length > 8 && (
                  <p className="px-4 py-2 text-[11px] font-medium text-slate-400">
                    +{results.length - 8} more — keep typing to narrow results
                  </p>
                )}
              </div>
            )}

            {showResults && results.length === 0 && query.length > 0 && (
              <div className="absolute right-0 top-full z-50 mt-1.5 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                <p className="text-sm font-medium text-slate-500">No components found for "{query}"</p>
              </div>
            )}
          </div>

        </div>

        {/* Brand accent strip */}
        <div
          className="h-[2px]"
          style={{ background: 'linear-gradient(90deg, #00377B 0%, #2D8ACA 60%, transparent 100%)' }}
          aria-hidden="true"
        />
      </header>

      {/* ── Layout body ─────────────────────────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1">

        {/* Desktop sidebar */}
        <aside
          aria-label="Component gallery navigation"
          className="hidden w-64 shrink-0 bg-white border-r border-slate-200 lg:block"
        >
          <div className="sticky top-[57px] flex h-[calc(100vh-57px)] flex-col">
            <div className="flex-1 overflow-y-auto hide-scrollbar px-2 py-4">
              <NavTree activeId={activeId} />
            </div>
          </div>
        </aside>

        <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} activeId={activeId} />

        {/* Main content */}
        <main
          id="gallery-content"
          aria-label="Component gallery content"
          className="min-w-0 flex-1 px-4 py-10 sm:px-8 lg:px-12"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
