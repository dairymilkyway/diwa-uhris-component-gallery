/**
 * SystemNotificationPage — Gallery (Enterprise)
 *
 * Showcases UHRIS in-app system notification patterns:
 *   Notification Item · Bell Dropdown · Notification Center (full list)
 *   · Toast-style in-app alerts · Unread badge
 *
 * Architecture follows the canonical ButtonPage pattern:
 *   Header → Overview → per-pattern Showcase sections
 *   → Usage Notes → Related
 *
 * All components are self-contained (no @diwauhris/ui imports needed for the
 * notification-specific pieces — they compose from primitives shown here).
 */

import { useState } from 'react';
import {
  Bell, BellDot, CheckCircle2, XCircle, Clock, AlertTriangle,
  FileCheck, CreditCard, UserPlus, CheckCheck, X, ChevronRight,
  Info,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase as ShowcaseItem, ShowcasePreview } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['toast', 'alert', 'activity-feed', 'email-notifications']);

// ── Notification data ─────────────────────────────────────────────────────────

type NotifTone = 'success' | 'error' | 'warning' | 'info' | 'primary';

interface NotifItem {
  id: string;
  icon: React.ElementType;
  tone: NotifTone;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: NotifItem[] = [
  {
    id: '1',
    icon: CheckCircle2,
    tone: 'success',
    title: 'Leave Request Approved',
    body: 'Your Vacation Leave (Aug 4–8) has been approved by Juan dela Cruz.',
    time: '5 min ago',
    read: false,
  },
  {
    id: '2',
    icon: CreditCard,
    tone: 'primary',
    title: 'Payslip Available',
    body: 'Your payslip for July 16–31, 2025 is ready. Net pay: ₱14,200.00.',
    time: '2 hr ago',
    read: false,
  },
  {
    id: '3',
    icon: FileCheck,
    tone: 'info',
    title: 'PAF #2025-0087 Approved',
    body: 'Your Salary Adjustment PAF has been approved by the VP of HR.',
    time: 'Yesterday',
    read: false,
  },
  {
    id: '4',
    icon: AlertTriangle,
    tone: 'warning',
    title: 'Leave Balance Low',
    body: 'You have 1 remaining Sick Leave day for 2025.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '5',
    icon: XCircle,
    tone: 'error',
    title: 'Leave Request Declined',
    body: 'Your Sick Leave (Aug 11–12) was not approved. Reason: insufficient credits.',
    time: '3 days ago',
    read: true,
  },
  {
    id: '6',
    icon: UserPlus,
    tone: 'success',
    title: 'New Employee Onboarded',
    body: 'Carlo Mendoza has been added to Finance — Payroll Staff.',
    time: '1 week ago',
    read: true,
  },
];

// ── Tone palette ──────────────────────────────────────────────────────────────

const TONE: Record<NotifTone, { dot: string; icon: string; bg: string; ring: string }> = {
  success: { dot: 'bg-emerald-500', icon: 'text-emerald-600', bg: 'bg-emerald-50',  ring: 'ring-emerald-200' },
  error:   { dot: 'bg-rose-500',    icon: 'text-rose-600',    bg: 'bg-rose-50',     ring: 'ring-rose-200'    },
  warning: { dot: 'bg-amber-500',   icon: 'text-amber-600',   bg: 'bg-amber-50',    ring: 'ring-amber-200'   },
  info:    { dot: 'bg-sky-500',     icon: 'text-sky-600',     bg: 'bg-sky-50',      ring: 'ring-sky-200'     },
  primary: { dot: 'bg-[#034EA2]',   icon: 'text-[#034EA2]',   bg: 'bg-[#EEF3FB]',  ring: 'ring-[#BDD1F4]'  },
};

// ── NotificationItem component ────────────────────────────────────────────────

function NotificationItem({
  notif,
  onDismiss,
  compact = false,
}: {
  notif: NotifItem;
  onDismiss?: (id: string) => void;
  compact?: boolean;
}) {
  const Icon = notif.icon;
  const t = TONE[notif.tone];

  return (
    <div
      className={[
        'group relative flex gap-3 rounded-lg px-4 py-3 transition-colors',
        notif.read ? 'bg-white hover:bg-slate-50' : 'bg-[#F4F8FF] hover:bg-[#EBF1FD]',
        compact ? 'text-sm' : '',
      ].join(' ')}
      role="listitem"
    >
      {/* Unread indicator */}
      {!notif.read && (
        <span
          className={`absolute left-1.5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full ${t.dot}`}
          aria-label="Unread"
        />
      )}

      {/* Icon */}
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ${t.bg} ${t.ring}`}>
        <Icon size={15} className={t.icon} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-slate-800 leading-snug truncate ${compact ? 'text-xs' : 'text-sm'}`}>
          {notif.title}
        </p>
        <p className={`mt-0.5 text-slate-500 leading-snug line-clamp-2 ${compact ? 'text-xs' : 'text-xs'}`}>
          {notif.body}
        </p>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
          <Clock size={10} aria-hidden="true" />
          {notif.time}
        </p>
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          type="button"
          onClick={() => onDismiss(notif.id)}
          aria-label={`Dismiss ${notif.title}`}
          className="mt-0.5 shrink-0 rounded p-1 text-slate-300 opacity-0 transition group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-500 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
        >
          <X size={13} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

// ── Bell dropdown ─────────────────────────────────────────────────────────────

function BellDropdown() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(NOTIFICATIONS.slice(0, 4));
  const unread = items.filter(n => !n.read).length;

  function markAllRead() {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  }

  function dismiss(id: string) {
    setItems(prev => prev.filter(n => n.id !== id));
  }

  return (
    <div className="relative inline-block">
      {/* Bell trigger */}
      <button
        type="button"
        aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-brand-sky/50 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      >
        {unread > 0 ? <BellDot size={18} aria-hidden="true" /> : <Bell size={18} aria-hidden="true" />}
        {unread > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#034EA2] px-1 text-[10px] font-bold text-white"
          >
            {unread}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 z-50 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
              {unread > 0 && (
                <span className="rounded-full bg-[#034EA2] px-2 py-0.5 text-[10px] font-bold text-white">
                  {unread} new
                </span>
              )}
            </div>
            {unread > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-[#034EA2] hover:bg-[#EEF3FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
              >
                <CheckCheck size={12} aria-hidden="true" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div role="list" className="max-h-72 overflow-y-auto divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-slate-400">
                <Bell size={24} aria-hidden="true" />
                <p className="text-sm font-medium">No notifications</p>
              </div>
            ) : (
              items.map(n => (
                <NotificationItem key={n.id} notif={n} onDismiss={dismiss} compact />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 px-4 py-2.5">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold text-[#034EA2] hover:bg-[#EEF3FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 transition"
            >
              View all notifications
              <ChevronRight size={12} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Full Notification Center ──────────────────────────────────────────────────

function NotificationCenter() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const unread = items.filter(n => !n.read).length;

  const visible = filter === 'unread' ? items.filter(n => !n.read) : items;

  function markAllRead() {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  }

  function dismiss(id: string) {
    setItems(prev => prev.filter(n => n.id !== id));
  }

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-[#00377B] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
            <Bell size={16} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Notifications</h2>
            <p className="text-xs text-white/70">{unread} unread</p>
          </div>
        </div>
        {unread > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition"
          >
            <CheckCheck size={12} aria-hidden="true" />
            Mark all read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex border-b border-slate-200">
        {(['all', 'unread'] as const).map(f => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={[
              'flex-1 py-2.5 text-sm font-semibold capitalize transition border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue/30',
              filter === f
                ? 'border-[#034EA2] text-[#034EA2]'
                : 'border-transparent text-slate-400 hover:text-slate-600',
            ].join(' ')}
          >
            {f}{f === 'unread' && unread > 0 && (
              <span className="ml-1.5 rounded-full bg-[#034EA2] px-1.5 py-0.5 text-[10px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div role="list" className="divide-y divide-slate-100">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-slate-400">
            <CheckCheck size={28} aria-hidden="true" />
            <p className="text-sm font-medium">All caught up!</p>
            <p className="text-xs">No unread notifications.</p>
          </div>
        ) : (
          visible.map(n => (
            <NotificationItem key={n.id} notif={n} onDismiss={dismiss} />
          ))
        )}
      </div>
    </div>
  );
}

// ── In-app toast notification ─────────────────────────────────────────────────

function InAppToast({ tone, title, body }: { tone: NotifTone; title: string; body: string }) {
  const [visible, setVisible] = useState(true);
  const t = TONE[tone];
  const icons: Record<NotifTone, React.ElementType> = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
    primary: Bell,
  };
  const Icon = icons[tone];

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50"
      >
        Show again
      </button>
    );
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ring-1 ${t.bg} ${t.ring}`}
    >
      <Icon size={18} className={`mt-0.5 shrink-0 ${t.icon}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-800">{title}</p>
        <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">{body}</p>
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => setVisible(false)}
        className={`mt-0.5 shrink-0 rounded-md p-1 text-slate-400 transition hover:bg-black/5 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30`}
      >
        <X size={13} aria-hidden="true" />
      </button>
    </div>
  );
}

// ── Unread badge ──────────────────────────────────────────────────────────────

function UnreadBadgeDemo() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-6">
        {/* 0 unread */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm text-slate-500">
            <Bell size={20} aria-hidden="true" />
          </div>
          <span className="text-xs text-slate-400">0</span>
        </div>
        {/* 1–9 */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm text-slate-500">
            <BellDot size={20} aria-hidden="true" />
            <span aria-hidden="true" className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#034EA2] px-1 text-[10px] font-bold text-white">3</span>
          </div>
          <span className="text-xs text-slate-400">1–9</span>
        </div>
        {/* 10–99 */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm text-slate-500">
            <BellDot size={20} aria-hidden="true" />
            <span aria-hidden="true" className="absolute -right-2 -top-1.5 flex h-4 min-w-5 items-center justify-center rounded-full bg-[#034EA2] px-1 text-[10px] font-bold text-white">24</span>
          </div>
          <span className="text-xs text-slate-400">10–99</span>
        </div>
        {/* 99+ */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm text-slate-500">
            <BellDot size={20} aria-hidden="true" />
            <span aria-hidden="true" className="absolute -right-2 -top-1.5 flex h-4 min-w-6 items-center justify-center rounded-full bg-[#034EA2] px-1 text-[10px] font-bold text-white">99+</span>
          </div>
          <span className="text-xs text-slate-400">99+</span>
        </div>
      </div>
      {/* Live counter */}
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => setCount(c => Math.max(0, c - 1))} className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50">−</button>
        <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500">
          {count > 0 ? <BellDot size={18} aria-label={`${count} notifications`} /> : <Bell size={18} aria-label="No notifications" />}
          {count > 0 && (
            <span aria-hidden="true" className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#034EA2] px-1 text-[10px] font-bold text-white">
              {count > 99 ? '99+' : count}
            </span>
          )}
        </div>
        <button type="button" onClick={() => setCount(c => Math.min(150, c + 1))} className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50">+</button>
        <span className="text-xs text-slate-400">{count} unread</span>
      </div>
    </div>
  );
}

// ── Code strings ──────────────────────────────────────────────────────────────

const CODE = {
  item: `// NotificationItem — compose from primitives
<div className="flex gap-3 rounded-lg px-4 py-3 bg-[#F4F8FF]" role="listitem">
  {/* Unread dot */}
  <span className="absolute left-1.5 h-2 w-2 rounded-full bg-[#034EA2]" />

  {/* Tone icon */}
  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
    <CheckCircle2 size={15} className="text-emerald-600" aria-hidden="true" />
  </div>

  {/* Content */}
  <div className="flex-1 min-w-0">
    <p className="text-sm font-semibold text-slate-800 truncate">
      Leave Request Approved
    </p>
    <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">
      Your Vacation Leave (Aug 4–8) has been approved by Juan dela Cruz.
    </p>
    <p className="mt-1 text-[11px] text-slate-400 flex items-center gap-1">
      <Clock size={10} />
      5 min ago
    </p>
  </div>
</div>`,

  bell: `// Bell button with unread badge
const unreadCount = notifications.filter(n => !n.read).length;

<button
  aria-label={\`Notifications\${unreadCount ? \`, \${unreadCount} unread\` : ''}\`}
  aria-haspopup="true"
  aria-expanded={open}
  onClick={() => setOpen(v => !v)}
  className="relative h-9 w-9 rounded-lg border border-slate-200 bg-white"
>
  {unreadCount > 0
    ? <BellDot size={18} aria-hidden="true" />
    : <Bell size={18} aria-hidden="true" />
  }
  {unreadCount > 0 && (
    <span
      aria-hidden="true"
      className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#034EA2] px-1 text-[10px] font-bold text-white"
    >
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  )}
</button>`,

  toast: `// In-app notification toast (role="alert" + aria-live)
<div
  role="alert"
  aria-live="polite"
  className="flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg bg-emerald-50 ring-1 ring-emerald-200"
>
  <CheckCircle2 size={18} className="text-emerald-600 mt-0.5" aria-hidden="true" />
  <div>
    <p className="text-sm font-bold text-slate-800">Leave Request Approved</p>
    <p className="mt-0.5 text-xs text-slate-600">
      Your Vacation Leave (Aug 4–8) has been approved.
    </p>
  </div>
  <button aria-label="Dismiss" onClick={dismiss}>
    <X size={13} />
  </button>
</div>`,

  backend: `// NestJS — create a notification record
// notification.service.ts
async create(dto: CreateNotificationDto): Promise<Notification> {
  const notif = await this.prisma.notification.create({
    data: {
      userId:    dto.userId,
      type:      dto.type,       // 'leave_approved' | 'payroll' | 'paf' ...
      title:     dto.title,
      body:      dto.body,
      entityId:  dto.entityId,   // leave.id / payroll.id / paf.id
      entityType: dto.entityType,
      read:      false,
    },
  });
  // Push to client via WebSocket (Socket.IO / SSE)
  this.gateway.sendToUser(dto.userId, 'notification.new', notif);
  return notif;
}

// Mark all read
async markAllRead(userId: string): Promise<void> {
  await this.prisma.notification.updateMany({
    where: { userId, read: false },
    data:  { read: true },
  });
}`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SystemNotificationPage() {
  return (
    <GalleryLayout activeId="system-notifications">
      <title>System Notifications — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <GalleryComponentHeader
          category="Enterprise"
          name="System Notifications"
          description="In-app notification patterns for UHRIS: the notification item, the bell dropdown, the full notification center, in-app toast alerts, and the unread badge. Each section has a live demo and backend wiring code."
          status="complete"
          importName={false}
        />

        {/* ── 2. Overview ───────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Four building blocks that together form the UHRIS notification system."
        >
          <ShowcasePreview standalone tone="white" center={false} minHeight="min-h-0">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 w-full">
              {[
                { label: 'Notification Item',   desc: 'Single row in a list or dropdown' },
                { label: 'Bell Dropdown',        desc: 'Popover panel from the header'   },
                { label: 'Notification Center',  desc: 'Full-page notification list'     },
                { label: 'In-App Toast',         desc: 'Ephemeral alert with dismiss'    },
              ].map(({ label, desc }) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF3FB]">
                    <Bell size={16} className="text-[#034EA2]" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">{label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── 3. Notification Item ──────────────────────────────────────── */}
        <GallerySection
          id="item"
          title="Notification Item"
          description="The fundamental unit. A tone icon, title, body snippet, timestamp, and an optional dismiss button. Unread items get a blue left dot and a tinted background."
        >
          <ShowcaseItem
            title="Notification Item — all tones"
            description="Unread (blue tint) and read (white) states. Five tones matching UHRIS event types."
            code={CODE.item}
            tone="white"
            center={false}
          >
            <div className="w-full rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
              {NOTIFICATIONS.slice(0, 5).map(n => (
                <NotificationItem key={n.id} notif={n} />
              ))}
            </div>
          </ShowcaseItem>
        </GallerySection>

        {/* ── 4. Bell Dropdown ──────────────────────────────────────────── */}
        <GallerySection
          id="bell-dropdown"
          title="Bell Dropdown"
          description="A compact notification panel anchored to the header bell button. Shows the most recent 4–5 items, a Mark all read action, and a footer link to the full center. Fully interactive — try marking items read and dismissing."
        >
          <ShowcaseItem
            title="Bell Dropdown — interactive"
            description="Click the bell to open. Use Mark all read or × to dismiss items."
            code={CODE.bell}
            tone="light"
            center={true}
          >
            <div className="flex items-start justify-center py-4">
              <BellDropdown />
            </div>
          </ShowcaseItem>
        </GallerySection>

        {/* ── 5. Notification Center ────────────────────────────────────── */}
        <GallerySection
          id="center"
          title="Notification Center"
          description="The full notification page. Brand-navy header, All/Unread tab filter, per-item dismiss, and a bulk Mark all read. This is the /notifications route in UHRIS."
        >
          <ShowcaseItem
            title="Notification Center — full list"
            description="All 6 mock notifications with filter tabs. Dismiss items individually or mark all read."
            code={`// Notification Center — brand-navy header, All/Unread tabs, per-item dismiss
function NotificationCenter() {
  const [items, setItems] = useState(notifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const unread = items.filter(n => !n.read).length;
  const visible = filter === 'unread' ? items.filter(n => !n.read) : items;

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Brand-navy header */}
      <div className="flex items-center justify-between bg-[#00377B] px-6 py-4">
        <div className="flex items-center gap-3">
          <Bell size={16} className="text-white" />
          <div>
            <h2 className="text-sm font-bold text-white">Notifications</h2>
            <p className="text-xs text-white/70">{unread} unread</p>
          </div>
        </div>
        {unread > 0 && (
          <button onClick={() => setItems(prev => prev.map(n => ({ ...n, read: true })))}
            className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20">
            <CheckCheck size={12} /> Mark all read
          </button>
        )}
      </div>

      {/* All / Unread tabs */}
      <div className="flex border-b border-slate-200">
        {(['all', 'unread'] as const).map(f => (
          <button key={f} role="tab" aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={\`flex-1 py-2.5 text-sm font-semibold capitalize border-b-2 transition
              \${filter === f ? 'border-[#034EA2] text-[#034EA2]' : 'border-transparent text-slate-400'}\`}>
            {f}{f === 'unread' && unread > 0 &&
              <span className="ml-1.5 rounded-full bg-[#034EA2] px-1.5 text-[10px] font-bold text-white">{unread}</span>}
          </button>
        ))}
      </div>

      {/* List */}
      <div role="list" className="divide-y divide-slate-100">
        {visible.map(n => <NotificationItem key={n.id} notif={n} onDismiss={id => setItems(prev => prev.filter(x => x.id !== id))} />)}
      </div>
    </div>
  );
}`}
            tone="white"
            center={false}
          >
            <div className="w-full">
              <NotificationCenter />
            </div>
          </ShowcaseItem>
        </GallerySection>

        {/* ── 6. In-App Toast ───────────────────────────────────────────── */}
        <GallerySection
          id="in-app-toast"
          title="In-App Toast"
          description="Ephemeral notification banners rendered inside the app (not the system Toaster). Used for real-time WebSocket events — a new leave approval arrives and floats in the corner."
        >
          <div className="space-y-4">
            <ShowcaseItem
              title="Success — Leave Approved"
              code={CODE.toast}
              tone="white"
              center={true}
            >
              <InAppToast
                tone="success"
                title="Leave Request Approved"
                body="Your Vacation Leave (Aug 4–8) has been approved by Juan dela Cruz."
              />
            </ShowcaseItem>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ShowcaseItem
                title="Warning — Low Leave Balance"
                code={`<div role="alert" aria-live="polite" className="... bg-amber-50 ring-amber-200">\n  <AlertTriangle className="text-amber-600" />\n  ...\n</div>`}
                tone="white"
                center={true}
              >
                <InAppToast
                  tone="warning"
                  title="Leave Balance Low"
                  body="You have 1 remaining Sick Leave day for 2025."
                />
              </ShowcaseItem>

              <ShowcaseItem
                title="Error — Leave Rejected"
                code={`<div role="alert" aria-live="polite" className="... bg-rose-50 ring-rose-200">\n  <XCircle className="text-rose-600" />\n  ...\n</div>`}
                tone="white"
                center={true}
              >
                <InAppToast
                  tone="error"
                  title="Leave Request Declined"
                  body="Your Sick Leave (Aug 11–12) was not approved. Insufficient credits."
                />
              </ShowcaseItem>
            </div>
          </div>
        </GallerySection>

        {/* ── 7. Unread Badge ───────────────────────────────────────────── */}
        <GallerySection
          id="unread-badge"
          title="Unread Badge"
          description="The count badge on the bell icon. Caps at 99+. Uses BellDot when count > 0 for an additional icon-level signal. Try the live counter below."
        >
          <ShowcaseItem
            title="Unread Badge — states"
            description="0 = plain Bell. 1–9 = badge shows exact count. 10–99 = two-digit badge. 100+ = '99+'."
            code={CODE.bell}
            tone="light"
            center={true}
          >
            <UnreadBadgeDemo />
          </ShowcaseItem>
        </GallerySection>

        {/* ── 8. Backend & Real-Time ────────────────────────────────────── */}
        <GallerySection
          id="backend"
          title="Backend & Real-Time"
          description="Prisma schema for the Notification model + the NestJS service/gateway pattern that creates and pushes notifications via WebSocket."
        >
          <ShowcaseItem
            title="Prisma schema + NestJS service"
            description="Store notifications, push to clients via Socket.IO gateway. Index on (userId, read) — you'll filter unread constantly."
            code={CODE.backend}
            language="typescript"
            tone="white"
            center={false}
            minHeight="min-h-0"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Do</p>
                {[
                  'Use role="alert" + aria-live="polite" on in-app toasts so screen readers announce them.',
                  'Index (userId, read) and (userId, createdAt) for fast unread queries.',
                  'Push new notifications via WebSocket/SSE — do not poll.',
                  'Soft-delete (archive) notifications instead of hard deleting — useful for audit.',
                ].map(t => (
                  <p key={t} className="flex items-start gap-2 text-sm text-emerald-800">
                    <span className="mt-1 shrink-0 text-emerald-500" aria-hidden="true">✓</span>
                    {t}
                  </p>
                ))}
              </div>
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-rose-600">Don't</p>
                {[
                  "Don't load all notifications at once — paginate with cursor (take: 20, cursor: lastId).",
                  "Don't use aria-live='assertive' — it interrupts the user mid-task. 'polite' is correct.",
                  "Don't show the same notification multiple times — deduplicate by entityId + type.",
                  "Don't send notifications for actions the user themselves triggered — filter out self-events.",
                ].map(t => (
                  <p key={t} className="flex items-start gap-2 text-sm text-rose-800">
                    <span className="mt-1 shrink-0 text-rose-500" aria-hidden="true">✗</span>
                    {t}
                  </p>
                ))}
              </div>
            </div>
          </ShowcaseItem>
        </GallerySection>

        {/* ── 9. Related ────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
