/**
 * ActivityFeed — Design System Component
 *
 * A vertical stream of activity events with avatar, actor, action,
 * timestamp, and optional metadata. No domain logic.
 *
 * Accessibility:
 *   - <ol> with aria-label for the feed list
 *   - Each item is an <li> with datetime on the timestamp
 *   - Feed updates should use aria-live="polite" on the container
 *     when new events are streamed in
 */

import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export interface ActivityEvent {
  id: string;
  /** Avatar node — use gallery Avatar or a simple initials tile */
  avatar?: ReactNode;
  /** Who performed the action */
  actor: string;
  /** Action description */
  action: ReactNode;
  /** ISO timestamp or display string */
  timestamp: string;
  /** Machine-readable ISO timestamp for <time datetime> */
  dateTime?: string;
  /** Optional badge or secondary label */
  badge?: ReactNode;
}

export interface ActivityFeedProps {
  events: ActivityEvent[];
  /** Accessible label for the list. Default: "Activity feed" */
  'aria-label'?: string;
  className?: string;
}

export function ActivityFeed({
  events,
  'aria-label': ariaLabel = 'Activity feed',
  className = '',
}: ActivityFeedProps) {
  if (events.length === 0) return null;

  return (
    <ol aria-label={ariaLabel} className={cn('space-y-0', className)}>
      {events.map((event, i) => {
        const isLast = i === events.length - 1;
        return (
          <li key={event.id} className="flex gap-3">
            {/* Spine */}
            <div className="flex flex-col items-center" aria-hidden="true">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                {event.avatar ?? event.actor.charAt(0).toUpperCase()}
              </div>
              {!isLast && (
                <div className="mt-1 w-px flex-1 bg-slate-100 min-h-[1.5rem]" />
              )}
            </div>

            {/* Content */}
            <div className={`min-w-0 pb-4 ${isLast ? '' : ''}`}>
              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-sm font-bold text-slate-800">{event.actor}</span>
                <span className="text-sm font-medium text-slate-600">{event.action}</span>
                {event.badge && <span>{event.badge}</span>}
              </div>
              <time
                dateTime={event.dateTime ?? event.timestamp}
                className="mt-0.5 block text-[11px] font-medium text-slate-400"
              >
                {event.timestamp}
              </time>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
