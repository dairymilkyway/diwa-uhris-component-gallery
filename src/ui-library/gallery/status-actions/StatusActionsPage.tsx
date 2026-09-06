/**
 * StatusActionsPage — Gallery infrastructure
 *
 * Documents the statusMenuItems() utility from shared/components/statusActions.tsx.
 * This is a pure function that builds ActionMenuItem[] for entity lifecycle
 * transitions. Used on 8+ Org/Pay list pages.
 */

import { useState } from 'react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { statusMenuItems, type Lifecycle } from './statusActions';
import { Menu } from '../menu/Menu';
import { MoreVertical } from 'lucide-react';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['menu', 'confirm-action', 'badge']);

// ── Live examples ──────────────────────────────────────────────────────────

function ActiveEntityExample() {
  const [status, setStatus] = useState<Lifecycle>('active');
  const [pendingTransition, setPendingTransition] = useState<{
    next: Lifecycle; verb: string; impactMessage: string;
  } | null>(null);

  const handleTransition = (next: Lifecycle) => setStatus(next);

  const items = statusMenuItems(status, status === 'active', handleTransition, {
    requestConfirm: (req: { next: Lifecycle; verb: string; impactMessage: string }) => setPendingTransition(req),
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
          status === 'active'   ? 'border-emerald-100 bg-emerald-50 text-emerald-700' :
          status === 'inactive' ? 'border-slate-200 bg-slate-50 text-slate-600' :
                                  'border-slate-200 bg-slate-50 text-slate-500'
        }`}>
          {status}
        </span>
        <Menu
          trigger={<button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 transition" aria-label="Change status"><MoreVertical size={16} /></button>}
          items={items}
        />
      </div>
      {pendingTransition && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800 max-w-xs text-center">
          <p className="mb-2">requestConfirm called:</p>
          <p><strong>verb:</strong> {pendingTransition.verb}</p>
          <p><strong>next:</strong> {pendingTransition.next}</p>
          <div className="flex gap-2 mt-3 justify-center">
            <button
              type="button"
              className="px-3 py-1 bg-white border border-amber-300 rounded-lg text-xs font-bold text-amber-700 hover:bg-amber-50"
              onClick={() => { handleTransition(pendingTransition.next); setPendingTransition(null); }}
            >
              Confirm
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50"
              onClick={() => setPendingTransition(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AllStatusesExample() {
  return (
    <ShowcaseGrid columns={3}>
      {(['active', 'inactive', 'archived'] as Lifecycle[]).map((status) => {
        const items = statusMenuItems(status, status === 'active', () => {}, {
          requestConfirm: () => {},
        });
        return (
          <div key={status} className="flex flex-col items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{status}</p>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                status === 'active'   ? 'border-emerald-100 bg-emerald-50 text-emerald-700' :
                status === 'inactive' ? 'border-slate-200 bg-slate-50 text-slate-600' :
                                        'border-slate-200 bg-slate-50 text-slate-400'
              }`}>
                {status}
              </span>
              <Menu
                trigger={<button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 transition" aria-label={`${status} actions`}><MoreVertical size={16} /></button>}
                items={items}
              />
            </div>
            <p className="text-[10px] text-slate-400">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
        );
      })}
    </ShowcaseGrid>
  );
}

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  basic: `import { statusMenuItems, Menu } from '@diwauhris/ui';
import { MoreVertical } from '@diwauhris/ui';

// statusMenuItems returns ActionMenuItem[] based on current status.
// Active entity: shows "Set inactive" and "Archive"
// Inactive entity: shows "Set active" and "Archive"
// Archived entity: shows "Restore to active" only

const items = statusMenuItems(
  entity.status,          // current status string (or undefined)
  entity.isActive,        // boolean fallback when status is undefined
  (status) => void vm.transitionStatus('sites', entity.id, status),
  {
    requestConfirm: (req) => setStatusChange({
      entityId:      entity.id,
      entityName:    entity.name,
      next:          req.next,
      verb:          req.verb,
      impactMessage: req.impactMessage,
    }),
  },
);

<Menu
  trigger={<button aria-label="Site actions"><MoreVertical size={16} /></button>}
  items={items}
/>`,

  noConfirm: `// ⚠️  Without requestConfirm, statusMenuItems falls back to window.confirm()
// All current production callers provide requestConfirm.
// Do not omit requestConfirm in new code — it degrades to a browser dialog.

const items = statusMenuItems(entity.status, entity.isActive, handleTransition);
// ^ Clicking any transition item will call window.confirm() before proceeding.`,

  confirmIntegration: `// Pattern used in all Org/Pay pages:
// 1. statusMenuItems provides items with requestConfirm callback
// 2. requestConfirm stores the pending request in state
// 3. A ConfirmDialog (or custom modal) renders when pendingRequest is non-null
// 4. On confirm, call onTransition(req.next)

const [pendingTransition, setPendingTransition] = useState<StatusTransitionRequest | null>(null);

const items = statusMenuItems(entity.status, entity.isActive, handleTransition, {
  impactMessage: 'Deactivating this site will affect all assignments.',
  requestConfirm: (req) => setPendingTransition(req),
});

// Render confirmation when pendingTransition is set:
{pendingTransition && (
  <ConfirmDialog
    title={\`Confirm \${pendingTransition.verb}?\`}
    message={pendingTransition.impactMessage}
    confirmLabel={pendingTransition.next === 'active' ? 'Reactivate' : pendingTransition.verb}
    tone={pendingTransition.next === 'archived' ? 'danger' : 'primary'}
    onConfirm={() => { handleTransition(pendingTransition.next); setPendingTransition(null); }}
    onClose={() => setPendingTransition(null)}
  />
)}`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function StatusActionsPage() {
  return (
    <GalleryLayout activeId="status-actions">
      <title>Status Actions — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Navigation"
          name="Status Actions"
          description="A utility that generates the right menu items for an entity's current lifecycle state. Pass in the status and get back an array ready to drop into Menu — no switch statements needed."
          status="complete"
          importName="statusMenuItems"
        />

        {/* Overview ── */}
        <GallerySection id="overview" title="Overview" description="Live menu items generated for each lifecycle status. Click the kebab icon to see the options.">
          <ShowcasePreview standalone>
            <div className="w-full space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Interactive — requestConfirm routing
                </p>
                <ActiveEntityExample />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Items generated per status
                </p>
                <AllStatusesExample />
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation ── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="Import statusMenuItems and pass the result to Menu. Always provide requestConfirm to route confirmations through a styled modal."
        >
          <Showcase code={CODE.basic} language="tsx" title="Standard usage with requestConfirm">
            <ActiveEntityExample />
          </Showcase>
          <Showcase code={CODE.noConfirm} language="tsx" title="⚠️ Without requestConfirm (avoid)">
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 text-center max-w-xs">
                Without <code className="font-mono">requestConfirm</code>, transitions fall back to <code className="font-mono">window.confirm()</code>. Avoid in production.
              </p>
              <AllStatusesExample />
            </div>
          </Showcase>
          <Showcase code={CODE.confirmIntegration} language="tsx" title="Full pattern: requestConfirm + ConfirmDialog">
            <ActiveEntityExample />
          </Showcase>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['statusMenuItems output', [
                'Returns ActionMenuItem[] — accessibility comes from the Menu component that renders them.',
                'Each item has a label (text) and an icon. Icon is rendered in a slate-400 wrapper.',
                '"Archive" items have tone: "danger" — rendered with rose-600 text and rose-50 hover by Menu.',
              ]],
              ['Confirmation flow', [
                'requestConfirm receives { next, verb, impactMessage } — use these to populate a ConfirmDialog or ConfirmAction for keyboard and screen-reader accessible confirmation.',
                'Without requestConfirm, window.confirm() is used — it has inconsistent screen-reader behavior across browsers. Always provide requestConfirm in production code.',
              ]],
            ].map(([heading, items]) => (
              <div key={String(heading)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(heading)}</h3>
                <ul className="space-y-1.5">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GallerySection>

        {/* API ── */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'current',         type: 'string | undefined', required: true, description: 'Current entity status string. Falls back to isActive if undefined.' },
            { name: 'isActive',        type: 'boolean | undefined', required: true, description: 'Boolean fallback when current is undefined. false → treated as "inactive".' },
            { name: 'onTransition',    type: '(status: Lifecycle) => void', required: true, description: 'Called after confirmation with the new lifecycle status.' },
            { name: 'options',         type: 'StatusMenuOptions', description: 'Optional configuration.' },
            { name: 'options.impactMessage', type: 'string', description: 'Custom warning shown in the confirmation. Default: generic "Related records may be affected…" message.' },
            { name: 'options.requestConfirm', type: '(req: StatusTransitionRequest) => void', description: 'Routes confirmation through this callback instead of window.confirm. Always provide this.' },
          ]} />

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <div className="bg-slate-50 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Menu items generated per status
            </div>
            <div className="divide-y divide-slate-100 bg-white">
              {[
                ['active',   'Set inactive, Archive'],
                ['inactive', 'Set active, Archive'],
                ['archived', 'Restore to active'],
                ['draft',    'Set active, Archive'],
              ].map(([status, items]) => (
                <div key={status} className="flex items-center px-5 py-3 text-sm">
                  <code className="w-24 font-mono text-xs text-brand-blue">{status}</code>
                  <span className="font-medium text-slate-600">{items}</span>
                </div>
              ))}
            </div>
          </div>
        </GallerySection>

        {/* Related ── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
