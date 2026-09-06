/**
 * ConfirmDialogPage — Gallery infrastructure (Overlay)
 * Documents the ConfirmDialog design-system component.
 * Source: frontend/src/ui-library/gallery/confirm-dialog/ConfirmDialog.tsx
 */

import { useState } from 'react';
import { Trash2, Archive, CheckCircle2 } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { ConfirmDialog } from './ConfirmDialog';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['dialog', 'confirm-action', 'modal', 'button']);

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  basic: `import { ConfirmDialog } from '@diwauhris/ui';

const [open, setOpen] = useState(false);
const handleDelete = () => { /* your delete logic */ };

<button onClick={() => setOpen(true)}>Delete</button>

<ConfirmDialog
  open={open}
  onClose={() => setOpen(false)}
  onConfirm={handleDelete}
  title="Delete department?"
  description="This will permanently remove the department and cannot be undone."
  confirmLabel="Delete"
  tone="danger"
/>`,

  primary: `// Non-destructive confirmation — primary tone
const handlePublish = () => { /* your publish logic */ };

<ConfirmDialog
  open={open}
  onClose={() => setOpen(false)}
  onConfirm={handlePublish}
  title="Publish changes?"
  description="This will make all pending changes visible to active employees."
  confirmLabel="Publish"
  tone="primary"
/>`,

  async: `// Async onConfirm — ConfirmDialog shows loading state automatically
<ConfirmDialog
  open={open}
  onClose={() => setOpen(false)}
  onConfirm={async () => {
    await api.deleteEmployee(employee.id);
    toast.success('Employee removed');
    // onClose() is called automatically on success
  }}
  title="Remove employee?"
  description="The employee will be moved to the archived records."
  confirmLabel="Remove"
  tone="danger"
/>`,
};

// ── Live demos ─────────────────────────────────────────────────────────────

function DangerDemo() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => { setDone(false); setOpen(true); }}
        className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-700 hover:bg-rose-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
      >
        <Trash2 size={15} aria-hidden="true" /> Delete
      </button>
      {done && <span className="text-sm text-emerald-600 font-semibold">✓ Confirmed</span>}
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setDone(true)}
        title="Delete this record?"
        description="This action is permanent and cannot be undone. Any linked data will also be removed."
        confirmLabel="Delete"
        tone="danger"
      />
    </div>
  );
}

function PrimaryDemo() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => { setDone(false); setOpen(true); }}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-navy transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      >
        <CheckCircle2 size={15} aria-hidden="true" /> Publish
      </button>
      {done && <span className="text-sm text-emerald-600 font-semibold">✓ Published</span>}
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setDone(true)}
        title="Publish changes?"
        description="This will make all pending changes visible to active employees immediately."
        confirmLabel="Publish"
        tone="primary"
      />
    </div>
  );
}

function AsyncDemo() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const fakeAsync = () => new Promise<void>((resolve) => setTimeout(resolve, 1500));
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => { setDone(false); setOpen(true); }}
        className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700 hover:bg-amber-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
      >
        <Archive size={15} aria-hidden="true" /> Archive
      </button>
      {done && <span className="text-sm text-emerald-600 font-semibold">✓ Archived</span>}
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={async () => { await fakeAsync(); setDone(true); }}
        title="Archive this item?"
        description="The item will be moved to the archive and hidden from active views. It can be restored later."
        confirmLabel="Archive"
        cancelLabel="Keep active"
        tone="primary"
      />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ConfirmDialogPage() {
  return (
    <GalleryLayout activeId="confirm-dialog">
      <title>ConfirmDialog — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Overlay"
          name="ConfirmDialog"
          description="A dialog that asks are you sure before something irreversible happens. Two tones — danger (rose) for destructive actions, primary (brand blue) for high-stakes confirmations."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="Click the buttons to open each variant.">
          <ShowcasePreview standalone center={false}>
            <ShowcaseGrid columns={3}>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Danger (destructive)</p>
                <DangerDemo />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Primary (non-destructive)</p>
                <PrimaryDemo />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Async + loading state</p>
                <AsyncDemo />
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Destructive confirmation">
            <DangerDemo />
          </Showcase>
          <Showcase code={CODE.primary} language="tsx" title="Non-destructive confirmation (primary tone)">
            <PrimaryDemo />
          </Showcase>
          <Showcase code={CODE.async} language="tsx" title="Async onConfirm with loading state">
            <AsyncDemo />
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Dialog semantics', [
                'Inherits role="dialog", aria-modal="true", and aria-labelledby from the gallery Dialog component.',
                'title is wired to aria-labelledby. description is wired to aria-describedby.',
                'Both are required for screen readers to announce the dialog context on focus.',
              ]],
              ['Focus management', [
                'On open: focus moves to the first focusable element (Cancel button).',
                'On close: focus returns to the element that opened the dialog.',
                'Tab / Shift+Tab are trapped within the dialog while open.',
              ]],
              ['Keyboard', [
                'Escape closes the dialog unless loading is in progress.',
                'Space / Enter activates the focused button.',
              ]],
              ['Destructive tone', [
                'The danger tone uses rose color AND a warning triangle icon — never color alone.',
                'The confirm button label must describe the action ("Delete", "Remove", "Archive") not just say "OK".',
              ]],
              ['Loading state', [
                'While loading, buttons are disabled and Escape is blocked to prevent accidental cancellation mid-flight.',
                'Button text changes to "Processing…" to signal activity. No spinner added — keeps the component minimal.',
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

        {/* API */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'open',         type: 'boolean',                          required: true, description: 'Controls dialog visibility.' },
            { name: 'onClose',      type: '() => void',                       required: true, description: 'Called when dialog should close (Cancel, Escape, backdrop).' },
            { name: 'onConfirm',    type: '() => void | Promise<void>',       required: true, description: 'Called on confirm. Async functions trigger loading state automatically.' },
            { name: 'title',        type: 'string',                           required: true, description: 'Dialog heading. Used as aria-labelledby target.' },
            { name: 'description',  type: 'ReactNode',                                       description: 'Secondary explanation rendered below the icon row.' },
            { name: 'confirmLabel', type: 'string',       default: "'Confirm'",               description: 'Confirm button label. Use an action verb: "Delete", "Archive", "Publish".' },
            { name: 'cancelLabel',  type: 'string',       default: "'Cancel'",                description: 'Cancel button label.' },
            { name: 'tone',         type: "'danger' | 'primary'", default: "'danger'",         description: 'danger = rose destructive. primary = brand-blue non-destructive.' },
          ]} />
        </GallerySection>

        {/* Related */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
