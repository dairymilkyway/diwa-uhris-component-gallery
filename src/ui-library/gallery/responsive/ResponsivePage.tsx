/**
 * ResponsivePage — Gallery (Foundations)
 *
 * The definitive responsiveness guide for UHRIS.
 *
 * WHO READS THIS:
 *   Developers   — learn which Tailwind prefixes to use and where
 *   AI agents    — machine-readable rules section at the bottom prevents
 *                  generating non-compliant layouts
 *
 * WHAT IS COVERED:
 *   Breakpoint scale · Page container · Navigation · Data tables ·
 *   Form grids · Modals/overlays · Typography · Touch targets ·
 *   AI agent rules reference
 *
 * ARCHITECTURE: ButtonPage pattern
 *   GalleryComponentHeader → Overview (visual) → Sections (each with Showcase)
 *   → AI Rules reference → Related
 */

import { useState } from 'react';
import {
  Monitor, Tablet, Smartphone, ChevronRight,
  Menu, X, Search, Filter, Download,
  AlertCircle,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['layout-patterns', 'page-sample', 'form-sample', 'sidebar', 'table']);

// ── Breakpoint data — single source of truth ──────────────────────────────────

const BREAKPOINTS = [
  {
    prefix:  'default',
    px:      '0px',
    label:   'Mobile',
    icon:    Smartphone,
    context: 'Small phones (≤ 474px). Stack everything vertically. Full-width containers.',
    color:   'text-rose-600',
    bg:      'bg-rose-50',
    border:  'border-rose-200',
  },
  {
    prefix:  'xs:',
    px:      '475px',
    label:   'Large Phone',
    icon:    Smartphone,
    context: 'Large phones and landscape mode. Slight density increase. ← Added custom.',
    color:   'text-orange-600',
    bg:      'bg-orange-50',
    border:  'border-orange-200',
  },
  {
    prefix:  'sm:',
    px:      '640px',
    label:   'Small Tablet',
    icon:    Tablet,
    context: 'Small tablets and large phone landscape. Toolbars go side-by-side.',
    color:   'text-amber-600',
    bg:      'bg-amber-50',
    border:  'border-amber-200',
  },
  {
    prefix:  'md:',
    px:      '768px',
    label:   'Tablet Portrait',
    icon:    Tablet,
    context: 'iPad portrait and equivalents. Most layout shifts happen here.',
    color:   'text-[#034EA2]',
    bg:      'bg-[#EEF3FB]',
    border:  'border-[#C7D8F0]',
  },
  {
    prefix:  'lg:',
    px:      '1024px',
    label:   'Tablet Landscape / Laptop',
    icon:    Monitor,
    context: 'Tablet landscape, 13-inch laptops. Sidebars and 3-col grids appear.',
    color:   'text-[#00377B]',
    bg:      'bg-[#EEF3FB]',
    border:  'border-[#C7D8F0]',
  },
  {
    prefix:  'xl:',
    px:      '1280px',
    label:   'Desktop',
    icon:    Monitor,
    context: 'Full desktops. max-w-7xl container (1280px) caps here.',
    color:   'text-emerald-700',
    bg:      'bg-emerald-50',
    border:  'border-emerald-200',
  },
  {
    prefix:  '2xl:',
    px:      '1536px',
    label:   'Wide Desktop',
    icon:    Monitor,
    context: 'Wide monitors. max-w-7xl is already capped at xl — 2xl rarely triggers layout changes.',
    color:   'text-violet-700',
    bg:      'bg-violet-50',
    border:  'border-violet-200',
  },
] as const;

// ── Shared primitives ─────────────────────────────────────────────────────────

/** A visual device frame that can be resized to simulate breakpoints */
function ResizableFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="overflow-auto border-2 border-dashed border-slate-300 rounded-xl bg-white"
      style={{ resize: 'horizontal', minWidth: 280, maxWidth: '100%', padding: 0 }}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100 bg-slate-50">
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="text-[10px] font-bold text-slate-400 ml-1">
          Drag right edge to resize ↔
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// ── SECTION: Resizable demo components ────────────────────────────────────────

/** Live page container demo */
function ContainerDemo() {
  return (
    <ResizableFrame>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3">
        <div className="bg-[#00377B] text-white text-xs font-bold rounded-lg px-3 py-2">
          PageHeader — full width on mobile, capped at max-w-7xl on desktop
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['Total', 'Active', 'On Leave', 'Inactive'].map(l => (
            <div key={l} className="bg-slate-100 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 text-center">{l}</div>
          ))}
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-500">
          Table / content area
        </div>
      </div>
    </ResizableFrame>
  );
}

/** Live nav demo */
function NavDemo() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <ResizableFrame>
      <div className="relative">
        {/* Mobile: top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#00377B] rounded-lg md:hidden">
          <span className="text-white font-black text-sm">UHRIS</span>
          <button
            type="button"
            onClick={() => setMobileOpen(v => !v)}
            className="text-white p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile: dropdown nav */}
        {mobileOpen && (
          <div className="md:hidden mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
            {['Dashboard', 'Employees', 'Payroll', 'Leave', 'Settings'].map(item => (
              <button key={item} type="button" className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 border-b border-slate-100 last:border-0">
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Desktop: sidebar (hidden on mobile) */}
        <div className="hidden md:flex gap-0">
          <div className="w-48 bg-[#00377B] rounded-lg p-3 space-y-1 shrink-0">
            {['Dashboard', 'Employees', 'Payroll', 'Leave', 'Settings'].map((item, i) => (
              <div key={item} className={`px-3 py-2 rounded-lg text-xs font-bold ${i === 1 ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'}`}>
                {item}
              </div>
            ))}
          </div>
          <div className="flex-1 ml-3 bg-slate-50 rounded-lg p-3 text-xs text-slate-400 font-bold">
            Content area
          </div>
        </div>
      </div>
    </ResizableFrame>
  );
}

/** Live table demo */
function TableDemo() {
  const rows = [
    { name: 'Maria Santos',   dept: 'Finance',    status: 'Active'   },
    { name: 'Jose Reyes',     dept: 'Operations', status: 'On Leave' },
    { name: 'Ana Villanueva', dept: 'HR',         status: 'Active'   },
  ];
  return (
    <ResizableFrame>
      {/* Toolbar — stacks on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search..." className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white outline-none" />
        </div>
        <div className="flex gap-2">
          <button type="button" className="flex items-center gap-1 text-xs font-bold border border-slate-200 px-2.5 py-1.5 rounded-lg bg-white text-slate-600">
            <Filter size={11} /> Filter
          </button>
          <button type="button" className="flex items-center gap-1 text-xs font-bold border border-slate-200 px-2.5 py-1.5 rounded-lg bg-white text-slate-600">
            <Download size={11} /> Export
          </button>
        </div>
      </div>

      {/* Table — scrolls on mobile */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left" style={{ minWidth: 480 }}>
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Employee', 'Department', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(row => (
              <tr key={row.name} className="hover:bg-slate-50 transition-colors">
                <td className="px-3 py-2.5 text-xs font-bold text-slate-900 whitespace-nowrap">{row.name}</td>
                <td className="px-3 py-2.5 text-xs text-slate-600 whitespace-nowrap">{row.dept}</td>
                <td className="px-3 py-2.5">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    row.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>{row.status}</span>
                </td>
                <td className="px-3 py-2.5 text-xs font-bold text-[#034EA2]">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResizableFrame>
  );
}

/** Live form grid demo */
function FormGridDemo() {
  return (
    <ResizableFrame>
      <div className="space-y-3">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee Details</p>
        {/* 1→2 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {['First Name', 'Last Name', 'Position', 'Department'].map(f => (
            <div key={f}>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{f}</label>
              <div className="h-8 rounded-lg border border-slate-200 bg-slate-50" />
            </div>
          ))}
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Compensation</p>
        {/* 1→2→3 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {['Pay Grade', 'Basic Salary', 'Schedule'].map(f => (
            <div key={f}>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{f}</label>
              <div className="h-8 rounded-lg border border-slate-200 bg-slate-50" />
            </div>
          ))}
        </div>
      </div>
    </ResizableFrame>
  );
}

/** Live modal/overlay demo */
function ModalDemo() {
  return (
    <ResizableFrame>
      {/* Mobile: bottom sheet style */}
      <div className="block md:hidden">
        <div className="w-full bg-white border border-slate-200 rounded-t-2xl p-4 shadow-xl">
          <div className="w-8 h-1 bg-slate-300 rounded-full mx-auto mb-4" />
          <p className="text-sm font-black text-slate-900 mb-1">Confirm Action</p>
          <p className="text-xs text-slate-500 mb-4">This will approve the leave request for Maria Santos.</p>
          <div className="flex gap-2">
            <button type="button" className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600">Cancel</button>
            <button type="button" className="flex-1 py-2.5 bg-[#00377B] text-white rounded-xl text-sm font-bold">Approve</button>
          </div>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2 font-bold">↑ Bottom sheet on mobile</p>
      </div>

      {/* Desktop: centered dialog */}
      <div className="hidden md:flex items-center justify-center py-4">
        <div className="w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
          <p className="text-sm font-black text-slate-900 mb-1">Confirm Action</p>
          <p className="text-xs text-slate-500 mb-5">This will approve the leave request for Maria Santos.</p>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600">Cancel</button>
            <button type="button" className="px-4 py-2 bg-[#00377B] text-white rounded-lg text-sm font-bold">Approve</button>
          </div>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2 font-bold">↑ Centered dialog on md+</p>
      </div>
    </ResizableFrame>
  );
}

// ── Code strings ──────────────────────────────────────────────────────────────

const CODE = {
  breakpoints: `// Full 7-tier breakpoint scale — xs added via tailwind.config.js
// tailwind.config.js
screens: {
  'xs':  '475px',   // ← custom add (large phone landscape)
  'sm':  '640px',   // default
  'md':  '768px',   // default — most layout shifts here
  'lg':  '1024px',  // default
  'xl':  '1280px',  // default — max-w-7xl container caps here
  '2xl': '1536px',  // default — document only, rare layout use
}

// Usage: always mobile-first (no prefix = mobile, add prefix for larger)
// base    → 0px     small phones
// xs:     → 475px   large phones / landscape
// sm:     → 640px   small tablets
// md:     → 768px   tablet portrait
// lg:     → 1024px  laptop / tablet landscape
// xl:     → 1280px  desktop
// 2xl:    → 1536px  wide desktop

// Rule: never write max-* variants (max-md:, max-sm:) — not used here`,

  container: `// Standard page container — used on every list and detail page
<div className="space-y-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <PageHeader title="..." />
  {/* content */}
</div>

// Breakpoints:
// px-4       = 16px gutter on mobile
// sm:px-6    = 24px gutter on large phone
// lg:px-8    = 32px gutter on laptop+
// max-w-7xl  = 1280px cap — applies on all viewports via mx-auto`,

  nav: `// Responsive sidebar navigation
// Mobile:  top bar with hamburger → dropdown menu
// md+:     fixed left sidebar

// Mobile top bar
<div className="flex items-center justify-between px-4 py-3 bg-[#00377B] md:hidden">
  <span className="text-white font-black">UHRIS</span>
  <button onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
    {open ? <X size={18} /> : <Menu size={18} />}
  </button>
</div>

// Mobile dropdown (when open)
{open && (
  <nav className="md:hidden border border-slate-200 rounded-lg shadow-lg">
    {navItems.map(item => (
      <Link key={item.href} to={item.href} className="block px-4 py-3 text-sm font-bold">
        {item.label}
      </Link>
    ))}
  </nav>
)}

// Desktop sidebar
<aside className="hidden md:flex w-56 bg-[#00377B] flex-col shrink-0">
  <SidebarNav aria-label="Main navigation">
    {/* nav items */}
  </SidebarNav>
</aside>`,

  table: `// Responsive data table — scrolls on mobile, full layout on md+

// Toolbar stacks on mobile
<div className="flex flex-col sm:flex-row sm:items-center gap-2">
  <input className="flex-1 ..." placeholder="Search..." />
  <div className="flex gap-2">
    <Button variant="outline" size="sm"><Filter /> Filter</Button>
    <Button variant="outline" size="sm"><Download /> Export</Button>
  </div>
</div>

// Table container — overflow-x-auto is the key
<div className="overflow-x-auto rounded-xl border border-slate-200">
  <table className="w-full text-left" style={{ minWidth: 480 }}>
    {/* thead + tbody */}
  </table>
</div>

// Rule: always set minWidth on the table itself, not the wrapper
// Rule: never hide columns on mobile — let the user scroll`,

  formGrid: `// Form grid — 1 col mobile → 2 col tablet → 3 col desktop
// Used in employee forms, payroll config, policy settings

// Standard 2-col form (most forms)
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <Field label="First Name"><FieldInput /></Field>
  <Field label="Last Name"><FieldInput /></Field>
</div>

// 3-col for denser sections (compensation, schedule)
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Field label="Pay Grade"><Select /></Field>
  <Field label="Basic Salary"><Input /></Field>
  <Field label="Pay Schedule"><Select /></Field>
</div>

// Full-width always (textarea, rich text, reason fields)
<Field label="Reason" className="col-span-full">
  <Textarea rows={3} />
</Field>`,

  modal: `// Responsive overlay — bottom sheet on mobile, centered dialog on md+

// Bottom sheet on mobile
<div className={[
  'fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl p-6 shadow-2xl',
  'md:relative md:inset-auto md:rounded-2xl md:w-96 md:mx-auto',
].join(' ')}>
  {/* Drag handle — mobile only */}
  <div className="w-8 h-1 bg-slate-300 rounded-full mx-auto mb-4 md:hidden" />
  <h2 className="text-base font-bold text-slate-900 mb-2">{title}</h2>
  <p className="text-sm text-slate-500 mb-5">{description}</p>
  <div className="flex flex-col sm:flex-row justify-end gap-2">
    <Button variant="outline" fullWidth onClick={onClose}>Cancel</Button>
    <Button variant="primary" fullWidth onClick={onConfirm}>{confirmLabel}</Button>
  </div>
</div>

// Rule: on mobile modals, fullWidth on buttons and stack them
// Rule: on md+ modals, right-align buttons in a row`,

  typography: `// Responsive type scale — headings adapt, body stays fixed

// Page title (h1)
<h1 className="text-2xl font-bold md:text-3xl lg:text-4xl text-brand-navy">
  {title}
</h1>

// Section heading (h2)
<h2 className="text-lg font-bold md:text-xl text-slate-900">
  {heading}
</h2>

// Body copy — never scales, always text-sm
<p className="text-sm font-medium text-slate-600">{body}</p>

// Labels / metadata — never scales, always text-xs
<p className="text-xs font-bold uppercase tracking-widest text-slate-400">
  {label}
</p>`,

  touchTargets: `// Touch target rules — all interactive elements must meet 44×44px minimum
// WCAG 2.5.5 target size (AAA) = 44×44px

// Button — already meets 44px height at size="md" and size="lg"
// For size="sm" in tables, wrap with a padding container:
<td className="px-4 py-3">  {/* py-3 = 12px × 2 = 24px + text ≈ 44px row height */}
  <Button size="sm">Action</Button>
</td>

// Icon buttons — use p-2 or p-3 to hit 44×44
<button
  type="button"
  className="p-2.5 rounded-lg hover:bg-slate-100"  // 20px icon + 10px × 2 pad = 40px ≈ ok
  aria-label="Edit record"
>
  <Edit3 size={20} />
</button>

// Links in dense lists — add py-2 to hit minimum height
<a href="..." className="block py-2 text-sm font-bold text-[#034EA2]">
  View details
</a>

// Rule: never use size="sm" buttons as the ONLY action on mobile
// Rule: all form inputs are min-h-[40px] — Input/Select/Textarea already handle this`,

  aiRules: `// ── UHRIS RESPONSIVE RULES — AI AGENT REFERENCE ────────────────────────────
// Apply these rules when generating any UHRIS page or component.
// Derived from production code analysis and design system conventions.

// ── 1. BREAKPOINT USAGE ──────────────────────────────────────────────────────
// Always mobile-first. Base = mobile. Add breakpoint prefixes for larger screens.
// xs: 475px | sm: 640px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1536px
// xs: is a custom addition in tailwind.config.js — not a Tailwind default.
// DO NOT use max-* variants (max-md:, max-sm:) — they are not used here.

// ── 2. PAGE CONTAINER ───────────────────────────────────────────────────────
// Every list and detail page uses:
className="space-y-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
// Never use w-full on page wrappers. Always max-w-7xl mx-auto.

// ── 3. GRID PATTERNS ─────────────────────────────────────────────────────────
// Standard form:    grid-cols-1 md:grid-cols-2
// Dense form:       grid-cols-1 md:grid-cols-2 lg:grid-cols-3
// Stat row:         grid-cols-2 sm:grid-cols-4
// Two-col detail:   grid-cols-1 lg:grid-cols-3 (left=2/3, right=1/3)
// Full-width field: col-span-full (textarea, reason, notes)

// ── 4. TABLE ────────────────────────────────────────────────────────────────
// Container: overflow-x-auto (always)
// Table:     minWidth 480–600px depending on column count
// Never hide columns on mobile. Always horizontal scroll.
// Toolbar:   flex-col sm:flex-row

// ── 5. NAVIGATION ───────────────────────────────────────────────────────────
// Mobile: hidden md:hidden top bar + hamburger + dropdown
// Desktop: hidden md:flex sidebar (w-56 bg-[#00377B])
// Pattern: block md:hidden for mobile-only | hidden md:block for desktop-only

// ── 6. MODALS / OVERLAYS ────────────────────────────────────────────────────
// Mobile:  bottom sheet — fixed inset-x-0 bottom-0 rounded-t-2xl
// Desktop: centered — fixed inset-0 flex items-end md:items-center justify-center
// Buttons: flex-col sm:flex-row on mobile, justify-end row on desktop

// ── 7. TYPOGRAPHY ───────────────────────────────────────────────────────────
// Page title (h1):    text-2xl md:text-3xl lg:text-4xl font-bold text-brand-navy
// Section head (h2):  text-lg md:text-xl font-bold text-slate-900
// Body:               text-sm — NEVER scale body text
// Labels/meta:        text-xs — NEVER scale

// ── 8. TOUCH TARGETS ────────────────────────────────────────────────────────
// Min 44×44px on all interactive elements.
// Table rows: py-3 on td achieves ~44px row height.
// Icon buttons: p-2.5 with 20px icon = ~40px (acceptable).
// Never size="sm" as sole action on mobile.

// ── 9. VISIBILITY UTILITIES ─────────────────────────────────────────────────
// Show on mobile only:    block md:hidden
// Show on desktop only:   hidden md:block (or hidden md:flex)
// Show on md+:            hidden md:block
// Show on lg+:            hidden lg:block

// ── 10. SPACING ─────────────────────────────────────────────────────────────
// Page section gap:    space-y-8
// Card sub-section:    space-y-6
// Form field group:    space-y-4
// Field internals:     space-y-1.5 (handled by Field component — do not set manually)`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ResponsivePage() {
  return (
    <GalleryLayout activeId="responsive">
      <title>Responsive — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── Header ────────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Foundations"
          name="Responsive"
          description="How UHRIS handles responsiveness. Every breakpoint, every layout pattern, every rule — documented with live resizable examples. Developers: use the interactive demos. AI agents: see the rules reference at the bottom."
          status="complete"
          importName={false}
        />

        {/* ── Overview ──────────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="UHRIS is mobile-first. Base styles target phones, breakpoint prefixes layer on top for larger screens. Four breakpoints, no custom config needed — all standard Tailwind."
        >
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="w-full">
              {/* Breakpoint matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-6">
                {BREAKPOINTS.map(bp => {
                  const Icon = bp.icon;
                  return (
                    <div key={bp.prefix} className={`rounded-xl border p-4 ${bp.bg} ${bp.border}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={14} className={bp.color} />
                        <code className={`text-xs font-black ${bp.color}`}>
                          {bp.prefix === 'default' ? 'base' : bp.prefix}
                        </code>
                      </div>
                      <p className="text-[11px] font-black text-slate-700">{bp.label}</p>
                      <p className={`text-[10px] font-bold ${bp.color} mt-0.5`}>{bp.px}+</p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug">{bp.context}</p>
                    </div>
                  );
                })}
              </div>
              {/* Rule callout */}
              <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertCircle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  <strong>Mobile-first only.</strong> Write base styles for mobile, add <code className="font-mono text-xs bg-amber-100 px-1 rounded">xs:</code> <code className="font-mono text-xs bg-amber-100 px-1 rounded">sm:</code> <code className="font-mono text-xs bg-amber-100 px-1 rounded">md:</code> <code className="font-mono text-xs bg-amber-100 px-1 rounded">lg:</code> <code className="font-mono text-xs bg-amber-100 px-1 rounded">xl:</code> <code className="font-mono text-xs bg-amber-100 px-1 rounded">2xl:</code> to layer on top. Never use <code className="font-mono text-xs bg-amber-100 px-1 rounded">max-md:</code> or other max-width variants.
                </p>
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── Breakpoints ───────────────────────────────────────────────── */}
        <GallerySection
          id="breakpoints"
          title="Breakpoint Scale"
          description="Standard Tailwind breakpoints, no customisation. Most layout shifts happen at md: (768px)."
        >
          <Showcase
            title="The four breakpoints"
            description="Prefix → pixel value → what it targets."
            code={CODE.breakpoints}
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse" style={{ minWidth: 520 }}>
                <thead>
                  <tr className="border-b-2 border-[#00377B] bg-[#00377B]">
                    {['Prefix', 'Min-width', 'Device context', 'Primary layout change'].map(h => (
                      <th key={h} className="px-4 py-3 text-[10px] font-black text-white/80 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { prefix: 'base',  px: '0px',    context: 'Mobile phone',                    change: 'Single column, stacked nav, full-width inputs' },
                    { prefix: 'xs:',   px: '475px',  context: 'Large phone / landscape',         change: 'Minor density increase, some labels appear — custom added' },
                    { prefix: 'sm:',   px: '640px',  context: 'Small tablet',                    change: 'Toolbar rows side-by-side, 2-col stat grid' },
                    { prefix: 'md:',   px: '768px',  context: 'Tablet portrait',                 change: '2-col form grid, sidebar shows, dialog centers' },
                    { prefix: 'lg:',   px: '1024px', context: 'Tablet landscape / small laptop', change: '3-col grids, 2/3+1/3 detail layout, wider nav' },
                    { prefix: 'xl:',   px: '1280px', context: 'Desktop',                         change: 'Container hits max-w-7xl cap (1280px)' },
                    { prefix: '2xl:',  px: '1536px', context: 'Wide desktop',                    change: 'max-w-7xl already capped — document only, rare layout use' },
                  ].map((row, i) => (
                    <tr key={row.prefix} className={i % 2 ? 'bg-[#EEF3FB]/30' : 'bg-white'}>
                      <td className="px-4 py-3">
                        <code className="text-xs font-black text-[#034EA2] bg-[#EEF3FB] px-2 py-0.5 rounded border border-[#C7D8F0]">{row.prefix}</code>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm font-bold text-slate-700">{row.px}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{row.context}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Page Container ────────────────────────────────────────────── */}
        <GallerySection
          id="container"
          title="Page Container"
          description="Every UHRIS page uses the same container pattern. Full-width on mobile with a gutter, capped at max-w-7xl on desktop."
        >
          <Showcase
            title="Standard page container — live resizable"
            description="Drag the right edge of the frame narrower to see how gutters and the stat grid adapt."
            code={CODE.container}
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full">
              <ContainerDemo />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Navigation ────────────────────────────────────────────────── */}
        <GallerySection
          id="navigation"
          title="Navigation"
          description="Mobile gets a hamburger + dropdown. Desktop gets the full sidebar. The switch happens at md:."
        >
          <Showcase
            title="Nav: hamburger on mobile → sidebar on md+"
            description="Narrow the frame to see the hamburger. Click it to open the dropdown."
            code={CODE.nav}
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full">
              <NavDemo />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Data Table ────────────────────────────────────────────────── */}
        <GallerySection
          id="table"
          title="Data Table"
          description="Tables never hide columns on mobile — they scroll horizontally. The toolbar stacks vertically on narrow screens."
        >
          <Showcase
            title="Table: horizontal scroll on mobile"
            description="Narrow the frame below 480px — the table scrolls, columns stay visible."
            code={CODE.table}
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full">
              <TableDemo />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Form Grid ─────────────────────────────────────────────────── */}
        <GallerySection
          id="form-grid"
          title="Form Grid"
          description="Forms start single-column on mobile and expand to 2 or 3 columns at wider breakpoints."
        >
          <Showcase
            title="Form grid: 1 col → md:2 col → lg:3 col"
            description="Narrow the frame to see each grid collapse back to a single column."
            code={CODE.formGrid}
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full">
              <FormGridDemo />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Modals ────────────────────────────────────────────────────── */}
        <GallerySection
          id="modals"
          title="Modals & Overlays"
          description="Bottom sheet on mobile — the full screen width slides up from the bottom. Centered dialog on md+."
        >
          <Showcase
            title="Overlay: bottom sheet → centered dialog"
            description="Narrow the frame to see the bottom-sheet pattern. Widen past md (768px) to see the centered dialog."
            code={CODE.modal}
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full">
              <ModalDemo />
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Typography ────────────────────────────────────────────────── */}
        <GallerySection
          id="typography"
          title="Typography Scale"
          description="Headings adapt at breakpoints. Body text and labels never scale — they stay at text-sm and text-xs everywhere."
        >
          <Showcase
            title="Type scale across breakpoints"
            description="Only h1 and h2 adapt. Body and label are always fixed size."
            code={CODE.typography}
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full space-y-4">
              {[
                { role: 'h1 — Page title',    className: 'text-2xl md:text-3xl lg:text-4xl font-bold text-[#00377B]',        text: 'Employee Directory' },
                { role: 'h2 — Section head',  className: 'text-lg md:text-xl font-bold text-slate-900',                    text: 'Personal Information' },
                { role: 'Body — never scales',className: 'text-sm font-medium text-slate-600',                              text: 'Senior Accountant · Finance Department · Active' },
                { role: 'Label — never scales',className: 'text-xs font-bold uppercase tracking-widest text-slate-400',     text: 'Employee ID' },
              ].map(item => (
                <div key={item.role} className="flex items-baseline gap-4 py-2 border-b border-slate-100 last:border-0">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-36 flex-shrink-0">{item.role}</span>
                  <span className={item.className}>{item.text}</span>
                </div>
              ))}
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Touch Targets ─────────────────────────────────────────────── */}
        <GallerySection
          id="touch-targets"
          title="Touch Targets"
          description="Every interactive element must meet the 44×44px minimum (WCAG 2.5.5). Tables and lists need enough row padding so the entire row is comfortably tappable."
        >
          <Showcase
            title="Minimum 44×44px touch area on all interactive elements"
            description="The green outline shows the touch area. Every button, link, and input must fill it."
            code={CODE.touchTargets}
            tone="light"
            center={false}
            minHeight="min-h-0"
          >
            <div className="flex flex-wrap gap-4 items-end">
              {/* Correct — big enough */}
              <div className="text-center">
                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2">✓ 44×44 met</p>
                <button type="button" className="min-h-[44px] px-4 py-2.5 bg-[#00377B] text-white text-sm font-bold rounded-lg outline outline-2 outline-offset-2 outline-emerald-400">
                  Approve
                </button>
              </div>
              {/* Table row */}
              <div className="text-center">
                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2">✓ Table row</p>
                <table className="outline outline-2 outline-offset-2 outline-emerald-400 rounded-lg overflow-hidden">
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-3 text-sm font-bold text-slate-800 whitespace-nowrap">Maria Santos</td>
                      <td className="px-4 py-3 text-xs font-bold text-[#034EA2]">View</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Icon button */}
              <div className="text-center">
                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2">✓ Icon btn</p>
                <button type="button" className="p-2.5 rounded-lg bg-white border border-slate-200 outline outline-2 outline-offset-2 outline-emerald-400" aria-label="Edit">
                  <ChevronRight size={20} className="text-slate-600" />
                </button>
              </div>
              {/* Too small */}
              <div className="text-center">
                <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-2">✗ Too small</p>
                <button type="button" className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded outline outline-2 outline-offset-2 outline-rose-400">
                  Edit
                </button>
                <p className="text-[9px] text-rose-500 mt-1">~28px height</p>
              </div>
            </div>
          </Showcase>
        </GallerySection>

        {/* ── AI Agent Rules ────────────────────────────────────────────── */}
        <GallerySection
          id="ai-rules"
          title="Rules Reference"
          description="Machine-readable rules for AI agents and developers who need a quick reference. Copy-paste into your system prompt or keep as a cheat sheet."
        >
          <Showcase
            title="Complete responsive ruleset — agent-readable"
            description="10 numbered rules covering every responsive decision in UHRIS. Agents: apply all rules when generating new pages."
            code={CODE.aiRules}
            language="typescript"
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full space-y-2">
              {[
                { n: '01', rule: 'Mobile-first only — never use max-md: or max-sm: variants' },
                { n: '02', rule: 'Breakpoints: xs:475px · sm:640px · md:768px · lg:1024px · xl:1280px · 2xl:1536px' },
                { n: '03', rule: 'Page container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
                { n: '04', rule: 'Form grids: grid-cols-1 md:grid-cols-2 (dense: lg:grid-cols-3)' },
                { n: '05', rule: 'Tables: always overflow-x-auto, never hide columns on mobile' },
                { n: '06', rule: 'Toolbar: flex-col sm:flex-row for search + action buttons' },
                { n: '07', rule: 'Navigation: block md:hidden hamburger, hidden md:flex sidebar' },
                { n: '08', rule: 'Overlays: bottom sheet on mobile, centered dialog on md+' },
                { n: '09', rule: 'H1: text-2xl md:text-3xl lg:text-4xl. Body/labels: fixed size' },
                { n: '10', rule: 'Touch targets: min 44×44px. Table rows need py-3 on td' },
                { n: '11', rule: 'Visibility: block md:hidden (mobile only) | hidden md:block (desktop only)' },
              ].map(item => (
                <div key={item.n} className="flex items-start gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <span className="text-[11px] font-black text-[#2D8ACA] w-6 flex-shrink-0">{item.n}</span>
                  <p className="text-sm font-medium text-slate-700">{item.rule}</p>
                </div>
              ))}
            </div>
          </Showcase>
        </GallerySection>

        {/* ── Related ───────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
