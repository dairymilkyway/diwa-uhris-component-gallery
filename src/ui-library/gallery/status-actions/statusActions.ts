/**
 * statusActions — Gallery-native lifecycle transition utilities.
 * Copied from shared/components/statusActions.tsx.
 * Updated to:
 *   - Define ActionMenuItem locally (instead of importing from ui.tsx)
 *   - Remove ActionMenu component import (not needed here)
 *   - Import only from react and lucide-react
 */
import { createElement } from 'react';
import { Archive, ArchiveRestore, Ban, CheckCircle2 } from 'lucide-react';

// Inlined from shared/components/ui.tsx — only the subset needed here
export interface ActionMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  tone?: 'default' | 'danger';
  disabled?: boolean;
  hidden?: boolean;
}

export type Lifecycle = 'draft' | 'active' | 'inactive' | 'archived';

export interface StatusTransitionRequest {
  next: Lifecycle;
  verb: string;
  impactMessage: string;
}

export interface StatusMenuOptions {
  impactMessage?: string;
  requestConfirm?: (request: StatusTransitionRequest) => void;
}

/**
 * Build lifecycle status-transition menu items for an entity.
 */
export function statusMenuItems(
  current: string | undefined,
  isActive: boolean | undefined,
  onTransition: (status: Lifecycle) => void,
  options: StatusMenuOptions = {},
): ActionMenuItem[] {
  const impactMessage =
    options.impactMessage ??
    'Related records may be affected, including reporting links, assignments, pay profiles, payroll schedules, templates, components, or formulas.';
  const status = (current ?? (isActive === false ? 'inactive' : 'active')).toLowerCase();
  const items: ActionMenuItem[] = [];
  const confirmTransition = (next: Lifecycle) => {
    const verb = next === 'active' ? 'reactivate' : next === 'inactive' ? 'set inactive' : 'archive';
    if (options.requestConfirm) {
      options.requestConfirm({ next, verb, impactMessage });
      return;
    }
    if (window.confirm(`Confirm ${verb} status change?\n\n${impactMessage}`)) onTransition(next);
  };

  if (status !== 'active') {
    items.push({
      label: status === 'archived' ? 'Restore to active' : 'Set active',
      icon: createElement(status === 'archived' ? ArchiveRestore : CheckCircle2, { size: 14 }),
      onClick: () => confirmTransition('active'),
    });
  }
  if (status === 'active') {
    items.push({ label: 'Set inactive', icon: createElement(Ban, { size: 14 }), onClick: () => confirmTransition('inactive') });
  }
  if (status !== 'archived') {
    items.push({ label: 'Archive', icon: createElement(Archive, { size: 14 }), tone: 'danger', onClick: () => confirmTransition('archived') });
  }
  return items;
}
