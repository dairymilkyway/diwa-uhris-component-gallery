/**
 * ConfirmActionPage — Gallery infrastructure
 *
 * Showcases the ConfirmAction component from shared/components/ConfirmAction.tsx.
 *
 * ConfirmAction is a self-managed confirmation wrapper: it owns its own open/
 * pending/error state and renders a Modal internally. Unlike ConfirmDialog, no
 * external open state management is needed.
 */

import { useState } from 'react';
import { Archive, Trash2 } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { ConfirmAction } from './ConfirmAction';

// Inlined CSS token strings from shared/components/ui.tsx
const buttonReset = 'appearance-none border-0 bg-none font-[inherit] leading-[inherit]';
const btnPrimary = `${buttonReset} inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition hover:bg-brand-navy active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none`;
const btnDanger = `${buttonReset} inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-100 transition hover:bg-rose-700 active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none`;
const editIconBtn = `${buttonReset} rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/20`;
const dangerIconBtn = `${buttonReset} rounded-lg p-2 text-rose-400 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-100`;
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['modal', 'dialog', 'button']);

// ── Helpers ────────────────────────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

// ── Live examples ──────────────────────────────────────────────────────────

function DestructiveExample() {
  const [done, setDone] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <ConfirmAction
        label="Deactivate Employee"
        description="This will deactivate the employee record. They will lose system access. You can reactivate them later."
        confirmLabel="Deactivate"
        tone="danger"
        onConfirm={async () => { await sleep(800); setDone(true); }}
      >
        <button type="button" className={btnDanger}>
          <Trash2 size={14} aria-hidden="true" /> Deactivate
        </button>
      </ConfirmAction>
      {done && <p className="text-xs font-semibold text-emerald-600">Confirmed!</p>}
    </div>
  );
}

function PrimaryExample() {
  const [done, setDone] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <ConfirmAction
        title="Publish Pay Structure"
        message="Publish this pay structure? This will affect active employee pay profiles."
        confirmLabel="Publish"
        tone="primary"
        onConfirm={async () => { await sleep(600); setDone(true); }}
      >
        <button type="button" className={btnPrimary}>
          Publish
        </button>
      </ConfirmAction>
      {done && <p className="text-xs font-semibold text-emerald-600">Published!</p>}
    </div>
  );
}

function RenderPropExample() {
  return (
    <ConfirmAction
      label="Archive Site"
      description="Archiving this site will remove it from active operations."
      confirmLabel="Archive"
      tone="danger"
      onConfirm={() => sleep(500)}
    >
      {({ open }: { open: () => void }) => (
        <button type="button" className={editIconBtn} onClick={open} aria-label="Archive site">
          <Archive size={16} aria-hidden="true" />
        </button>
      )}
    </ConfirmAction>
  );
}

function DisabledExample() {
  return (
    <ConfirmAction
      label="Delete Record"
      description="This action cannot be performed because the record has dependencies."
      onConfirm={() => Promise.resolve()}
      disabled
    >
      <button type="button" className={`${btnDanger} opacity-40 cursor-not-allowed`} disabled>
        Delete (disabled)
      </button>
    </ConfirmAction>
  );
}

function InlineIconExample() {
  return (
    <ConfirmAction
      label="Remove Member"
      description="Are you sure you want to remove this team member?"
      confirmLabel="Remove"
      tone="danger"
      onConfirm={() => sleep(400)}
    >
      <button type="button" className={dangerIconBtn} aria-label="Remove member">
        <Trash2 size={16} aria-hidden="true" />
      </button>
    </ConfirmAction>
  );
}

// ── Code strings — centralized per canonical architecture ─────────────────

const CODE = {
  basic: `import { ConfirmAction } from '@diwauhris/ui';
import { Trash2 } from '@diwauhris/ui';

// ConfirmAction owns its own open/pending/error state.
// Pass your async action as onConfirm — errors are caught and shown inline.
<ConfirmAction
  label="Deactivate Employee"
  description="This will deactivate the employee record."
  confirmLabel="Deactivate"
  tone="danger"
  onConfirm={async () => {
    await EmployeeApi.deactivate(employee.id);
  }}
>
  <button type="button" className="...btn-danger-classes...">
    <Trash2 size={14} aria-hidden="true" /> Deactivate
  </button>
</ConfirmAction>`,

  renderProp: `// Render prop pattern — receive open() and disabled from ConfirmAction
// Use when children need direct access to the open callback.
const handleArchive = async () => { /* your archive logic */ };

<ConfirmAction
  label="Archive Site"
  description="This site will be removed from active operations."
  confirmLabel="Archive"
  tone="danger"
  onConfirm={handleArchive}
>
  {({ open, disabled }) => (
    <button
      type="button"
      onClick={open}
      disabled={disabled}
      aria-label="Archive site"
    >
      <Archive size={15} aria-hidden="true" />
    </button>
  )}
</ConfirmAction>`,

  primary: `// Primary (non-destructive) confirmation — tone="primary" shows brand-blue styling
const handlePublish = async () => { /* your publish logic */ };

<ConfirmAction
  title="Publish Pay Structure"
  message="This will affect active employee pay profiles."
  confirmLabel="Publish"
  tone="primary"
  onConfirm={handlePublish}
>
  <button type="button">Publish</button>
</ConfirmAction>`,

  tableRow: `// Fragment — assumes you have your own handler and row data:
// const handleDelete = (id: string) => { /* your delete logic */ };
// Typical usage in a table action row:
<ConfirmAction
  label={\`Delete \${row.name}\`}
  description="This action is permanent."
  confirmLabel="Delete"
  tone="danger"
  onConfirm={() => handleDelete(row.id)}
>
  <button aria-label={\`Delete \${row.name}\`}>
    <Trash2 size={15} aria-hidden="true" />
  </button>
</ConfirmAction>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function ConfirmActionPage() {
  return (
    <GalleryLayout activeId="confirm-action">
      <title>ConfirmAction — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Overlay"
          name="ConfirmAction"
          description="Wraps any trigger with a built-in confirmation step. Manages its own open, loading, and error state — no external modal wiring needed. Great for inline destructive actions."
          status="complete"
        />

        {/* Overview ── */}
        <GallerySection id="overview" title="Overview" description="Click the triggers to open live confirmation dialogs.">
          <ShowcasePreview standalone>
            <ShowcaseGrid columns={3}>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Destructive (danger)</p>
                <DestructiveExample />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Primary</p>
                <PrimaryExample />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Render prop (icon trigger)</p>
                <RenderPropExample />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Disabled</p>
                <DisabledExample />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Icon button trigger</p>
                <InlineIconExample />
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation ── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="Import ConfirmAction from the gallery component. Pass the trigger as children and the async action as onConfirm."
        >
          <Showcase code={CODE.basic} language="tsx" title="Basic usage">
            <DestructiveExample />
          </Showcase>
          <Showcase code={CODE.renderProp} language="tsx" title="Render prop — direct access to open()">
            <RenderPropExample />
          </Showcase>
          <Showcase code={CODE.primary} language="tsx" title="Primary (non-destructive) tone">
            <PrimaryExample />
          </Showcase>
          <Showcase code={CODE.tableRow} language="tsx" title="In a table action column">
            <InlineIconExample />
          </Showcase>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Inherited from Modal', [
                'The confirmation dialog uses the canonical shared Modal internally.',
                'role="dialog" + aria-modal="true" + aria-labelledby wired to the title heading.',
                'Focus moves to the first focusable element (Cancel button) on open.',
                'Tab / Shift+Tab are trapped inside the dialog.',
                'Escape closes the dialog (when not pending).',
                'Focus returns to the trigger element when the dialog closes.',
              ]],
              ['Trigger element', [
                'The trigger is rendered as-is — ConfirmAction does not inject ARIA attributes onto it.',
                'Ensure triggers have accessible names (aria-label for icon-only buttons).',
                'When disabled={true}, the trigger element is wrapped in a <span> that blocks click events. Ensure the trigger itself also has disabled applied when needed.',
              ]],
              ['Error state', [
                'If onConfirm throws, the error message is shown inside the dialog via ErrorBanner.',
                'The dialog remains open so the user can retry or cancel.',
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
            { name: 'onConfirm',    type: '() => Promise<void> | void', required: true,  description: 'Async or sync action to run. Errors are caught and displayed inline. Dialog closes on success.' },
            { name: 'children',     type: 'ReactNode | ((props) => ReactNode)', required: true, description: 'Trigger element. May be a render prop receiving { open, disabled }.' },
            { name: 'title',        type: 'string',    description: 'Dialog heading. Alias: label.' },
            { name: 'label',        type: 'string',    description: 'Alias for title. Used with the simple string pattern.' },
            { name: 'message',      type: 'ReactNode', description: 'Dialog body content. Alias: description.' },
            { name: 'description',  type: 'string',    description: 'Alias for message.' },
            { name: 'confirmLabel', type: 'string',    default: "'Confirm'", description: 'Confirm button label.' },
            { name: 'tone',         type: "'danger' | 'primary'", default: "'danger'", description: 'Danger: rose button. Primary: brand-blue button.' },
            { name: 'disabled',     type: 'boolean',   default: 'false', description: 'Prevents the dialog from opening. Passed as disabled to render-prop children.' },
          ]} />

          <div className="rounded-xl border border-slate-200 bg-sky-50 px-5 py-4 mt-4">
            <p className="text-sm font-semibold text-sky-800">ConfirmAction vs ConfirmDialog</p>
            <ul className="mt-2 space-y-1">
              {[
                'ConfirmAction — self-managed state, trigger is a child element. Use for inline actions.',
                'ConfirmDialog — externally controlled open state, no trigger wrapper. Use inside modals or when you need programmatic control.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-medium text-sky-700">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
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
