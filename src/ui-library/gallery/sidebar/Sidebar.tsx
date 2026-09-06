/**
 * Sidebar — Design System Component
 *
 * A vertical navigation panel. Supports grouped navigation sections,
 * collapsible groups, active item state, icons, and badges.
 *
 * Accessibility:
 *   - Renders a <nav> landmark with aria-label.
 *   - Active item receives aria-current="page".
 *   - Collapsible group buttons have aria-expanded.
 *   - Collapsed content is hidden with aria-hidden + display:none equivalent.
 *
 * Composition:
 *   <SidebarNav aria-label="Main navigation">
 *     <SidebarSection label="Workspace">
 *       <SidebarItem href="/dashboard" icon={<LayoutDashboard />} active>Dashboard</SidebarItem>
 *       <SidebarItem href="/employees" icon={<Users />}>Employees</SidebarItem>
 *       <SidebarItem href="/reports" icon={<BarChart2 />} badge="3">Reports</SidebarItem>
 *     </SidebarSection>
 *     <SidebarGroup label="Settings" collapsible>
 *       <SidebarItem href="/settings/profile">Profile</SidebarItem>
 *     </SidebarGroup>
 *   </SidebarNav>
 */

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

// ── SidebarNav ────────────────────────────────────────────────────────────────

export interface SidebarNavProps {
  'aria-label': string;
  children: ReactNode;
  className?: string;
}

export function SidebarNav({ 'aria-label': ariaLabel, children, className = '' }: SidebarNavProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={`flex w-full flex-col gap-1 ${className}`}
    >
      {children}
    </nav>
  );
}

// ── SidebarSection ────────────────────────────────────────────────────────────
// A non-collapsible labeled group.

export interface SidebarSectionProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

export function SidebarSection({ label, children, className = '' }: SidebarSectionProps) {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {label}
        </p>
      )}
      <ul className="flex flex-col gap-0.5" role="list">
        {children}
      </ul>
    </div>
  );
}

// ── SidebarGroup ──────────────────────────────────────────────────────────────
// A collapsible labeled group.

export interface SidebarGroupProps {
  label: string;
  defaultExpanded?: boolean;
  children: ReactNode;
  className?: string;
}

export function SidebarGroup({ label, defaultExpanded = true, children, className = '' }: SidebarGroupProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={`mb-2 ${className}`}>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      >
        <span>{label}</span>
        <ChevronDown
          size={12}
          aria-hidden="true"
          className={`transition-transform duration-200 ${expanded ? '' : '-rotate-90'}`}
        />
      </button>
      {expanded && (
        <ul className="flex flex-col gap-0.5 mt-0.5" role="list">
          {children}
        </ul>
      )}
    </div>
  );
}

// ── SidebarItem ───────────────────────────────────────────────────────────────

export interface SidebarItemProps {
  href?: string;
  onClick?: () => void;
  active?: boolean;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function SidebarItem({
  href,
  onClick,
  active = false,
  icon,
  badge,
  disabled = false,
  children,
  className = '',
}: SidebarItemProps) {
  const baseClass = [
    'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30',
    active
      ? 'bg-blue-50 text-brand-blue'
      : disabled
        ? 'cursor-not-allowed text-slate-300'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && (
        <span className={`shrink-0 ${active ? 'text-brand-blue' : 'text-slate-400'}`} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex-1 truncate">{children}</span>
      {badge !== undefined && (
        <span
          className={`ml-auto shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
            active ? 'bg-blue-50 text-brand-blue' : 'bg-slate-100 text-slate-500'
          }`}
          aria-label={`${badge} items`}
        >
          {badge}
        </span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <li>
        <a
          href={href}
          aria-current={active ? 'page' : undefined}
          className={baseClass}
          onClick={onClick}
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={!disabled ? onClick : undefined}
        className={baseClass}
      >
        {content}
      </button>
    </li>
  );
}
