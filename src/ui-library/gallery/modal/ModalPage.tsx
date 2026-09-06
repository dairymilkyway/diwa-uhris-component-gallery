/**
 * ModalPage — Gallery infrastructure
 *
 * Documents the canonical Modal implementation.
 * Source: frontend/src/shared/components/Modal.tsx
 *
 * Consolidated in Batch 5.14 from three implementations:
 *   - Modal.tsx (CSS class system, createPortal)
 *   - Modal from ui.tsx (Tailwind inline, no portal)
 *   - AccessibleModal (Tailwind, createPortal) — canonical base
 *
 * The canonical Modal uses Tailwind, createPortal, and the correct
 * two-effect focus-management architecture.
 */

import { useState } from 'react';
import { Archive, Clock, Trash2, User, Users } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import Modal from './Modal';
import { ModalPlayground } from './ModalPlayground';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['dialog', 'confirm-action', 'button', 'drawer']);

// ── Live examples ──────────────────────────────────────────────────────────

function BasicExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-sm font-bold rounded-xl hover:bg-brand-navy transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
        onClick={() => setOpen(true)}
      >
        Open Modal
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Edit Site"
        icon={<User size={16} aria-hidden="true" />}
      >
        <p className="text-sm text-slate-600 leading-relaxed">
          This is a basic modal. Press <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">Escape</kbd> or
          click Cancel to close. Focus is trapped and returns to the trigger on close.
        </p>
      </Modal>
    </>
  );
}

function SubmitExample() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); setOpen(false); }, 1200);
  };
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-sm font-bold rounded-xl hover:bg-brand-navy transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
        onClick={() => setOpen(true)}
      >
        Submit Modal
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create Department"
        onSubmit={handleSubmit}
        submitLabel="Create"
        submittingLabel="Creating…"
        submitting={saving}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="dept-name" className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">
              Department Name
            </label>
            <input
              id="dept-name"
              type="text"
              placeholder="e.g. Human Resources"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-blue/15 focus:border-brand-blue/40"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

function DangerExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white text-sm font-bold rounded-xl hover:bg-rose-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
        onClick={() => setOpen(true)}
      >
        <Trash2 size={14} aria-hidden="true" /> Delete Action
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Deactivate Employee"
        icon={<Trash2 size={16} aria-hidden="true" />}
        danger
        onSubmit={(e: React.FormEvent) => { e.preventDefault(); setOpen(false); }}
        submitLabel="Deactivate"
      >
        <p className="text-sm text-slate-600 leading-relaxed">
          This will deactivate the employee record. The employee will no longer
          have access to the system. This action can be reversed.
        </p>
      </Modal>
    </>
  );
}

function SubtitleExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-sm font-bold rounded-xl hover:bg-brand-navy transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
        onClick={() => setOpen(true)}
      >
        <Clock size={14} aria-hidden="true" /> With Subtitle
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Change History"
        subtitle="Juan Dela Cruz"
        icon={<Clock size={16} aria-hidden="true" />}
        footer={
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
            >
              Close
            </button>
          </div>
        }
      >
        <p className="text-sm text-slate-500 italic">History content goes here.</p>
      </Modal>
    </>
  );
}

function SizesExample() {
  const [which, setWhich] = useState<'sm' | 'md' | 'lg' | null>(null);
  const sizeMap = {
    sm: 'max-w-sm',
    md: 'max-w-xl',
    lg: 'max-w-4xl',
  } as const;
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {(['sm', 'md', 'lg'] as const).map((s) => (
          <button
            key={s}
            type="button"
            className="px-3 py-1.5 text-xs font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition"
            onClick={() => setWhich(s)}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>
      {which && (
        <Modal
          isOpen
          onClose={() => setWhich(null)}
          title={`${which.toUpperCase()} Modal`}
          icon={<Archive size={16} aria-hidden="true" />}
          maxWidth={sizeMap[which]}
        >
          <p className="text-sm text-slate-600">
            maxWidth: <strong className="font-mono">{sizeMap[which]}</strong>
          </p>
        </Modal>
      )}
    </>
  );
}

function CustomFooterExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-sm font-bold rounded-xl hover:bg-brand-navy transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
        onClick={() => setOpen(true)}
      >
        <Users size={14} aria-hidden="true" /> Custom Footer
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Assign Approvers"
        icon={<Users size={16} aria-hidden="true" />}
        maxWidth="max-w-md"
        footer={
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-bold text-white bg-brand-blue rounded-xl hover:bg-brand-navy transition-all"
            >
              Add Selected (0)
            </button>
          </div>
        }
      >
        <p className="text-sm text-slate-500 italic">Approver picker content here.</p>
      </Modal>
    </>
  );
}

// ── Code strings — centralized per canonical architecture ─────────────────

const CODE = {
  basic: `import { Modal } from '@diwauhris/ui';
import { useState } from 'react';
import { User } from '@diwauhris/ui';

const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Open Modal</button>

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Edit Site"
  icon={<User size={16} aria-hidden="true" />}
>
  <p className="text-sm text-slate-600">Modal body content.</p>
</Modal>`,

  submit: `// Submit modal — wraps children + footer in <form onSubmit={...}>
// Provides built-in Submit + Cancel buttons when footer is not supplied.
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Create Department"
  onSubmit={handleSubmit}
  submitLabel="Create"
  submittingLabel="Creating…"
  submitting={saving}
>
  {/* form fields */}
</Modal>`,

  danger: `// Danger modal — rose icon badge, rose title, rose submit button
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Deactivate Employee"
  icon={<Trash2 size={16} aria-hidden="true" />}
  danger
  onSubmit={handleSubmit}
  submitLabel="Deactivate"
>
  <p>Confirmation message here.</p>
</Modal>`,

  subtitle: `// With subtitle and headerMeta — used for history/context modals
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title={<>Change History <span className="text-xs text-slate-400 font-semibold">42 records</span></>}
  subtitle="Juan Dela Cruz"
  icon={<Clock size={16} aria-hidden="true" />}
  headerMeta={
    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-brand-blue">
      42 records
    </span>
  }
  footer={<div className="flex justify-end"><button onClick={onClose}>Close</button></div>}
>
  {/* timeline content */}
</Modal>`,

  sizes: `// Size via maxWidth Tailwind class
<Modal isOpen={open} onClose={close} title="Small"   maxWidth="max-w-sm">  {/* ≈24rem */} </Modal>
<Modal isOpen={open} onClose={close} title="Default" maxWidth="max-w-xl">  {/* ≈36rem */} </Modal>
<Modal isOpen={open} onClose={close} title="Large"   maxWidth="max-w-4xl"> {/* ≈56rem */} </Modal>
<Modal isOpen={open} onClose={close} title="Bulk"    maxWidth="max-w-5xl"> {/* ≈64rem */} </Modal>`,

  footer: `// Custom footer — overrides the default Cancel/Submit buttons completely
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Assign Approvers"
  footer={
    <div className="flex items-center justify-between">
      <button onClick={() => setOpen(false)}>Cancel</button>
      <button onClick={handleConfirm}>Add Selected ({count})</button>
    </div>
  }
>
  {/* picker content */}
</Modal>`,

  mount: `// Mount/unmount pattern — omit isOpen, control visibility via conditional render
// The modal's effects run correctly either way.
{open && (
  <Modal
    onClose={() => setOpen(false)}
    title="Create Site"
    subtitle="Sites can be linked to org units."
    onSubmit={handleSubmit}
  >
    {/* form fields */}
  </Modal>
)}`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function ModalPage() {
  return (
    <GalleryLayout activeId="modal">
      <title>Modal — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Overlay"
          name="Modal"
          description="A focus-trapping overlay for forms and confirmations. Rendered in a portal outside the component tree. Escape, outside click, and scroll lock come for free. Focus restoration is automatic with the mount/unmount pattern; with isOpen/onClose the consumer manages it — see the Accessibility section."
          status="complete"
        />

        {/* Overview ── */}
        <GallerySection id="overview" title="Overview" description="Click the triggers to open live modals.">
          <ShowcasePreview standalone>
            <ShowcaseGrid columns={3}>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Basic</p>
                <BasicExample />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Submit form</p>
                <SubmitExample />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Danger / destructive</p>
                <DangerExample />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Subtitle</p>
                <SubtitleExample />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Size variants</p>
                <SizesExample />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Custom footer</p>
                <CustomFooterExample />
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Playground ── */}
        <GallerySection id="playground" title="Playground" description="Toggle controls to see the Modal respond live.">
          <ModalPlayground />
        </GallerySection>

        {/* Implementation ── */}
        <GallerySection
          id="implementation"
          title="Implementation"
          description="Import Modal from the shared component. Use isOpen to toggle visibility, or conditionally mount the component."
        >
          <Showcase code={CODE.basic} language="tsx" title="Basic modal">
            <BasicExample />
          </Showcase>
          <Showcase code={CODE.submit} language="tsx" title="Submit / form modal">
            <SubmitExample />
          </Showcase>
          <Showcase code={CODE.danger} language="tsx" title="Danger / destructive">
            <DangerExample />
          </Showcase>
          <Showcase code={CODE.subtitle} language="tsx" title="Subtitle and headerMeta">
            <SubtitleExample />
          </Showcase>
          <Showcase code={CODE.sizes} language="tsx" title="Size variants (maxWidth)">
            <SizesExample />
          </Showcase>
          <Showcase code={CODE.footer} language="tsx" title="Custom footer">
            <CustomFooterExample />
          </Showcase>
          <Showcase code={CODE.mount} language="tsx" title="Mount/unmount pattern (no isOpen)">
            <BasicExample />
          </Showcase>
        </GallerySection>

        {/* Recipes ── */}
        <GallerySection
          id="recipes"
          title="Recipes"
          description="Patterns built by composing Modal with other tools. These are not shipped components — copy the pattern into your own codebase."
        >
          <div className="space-y-6">

            {/* Avatar crop recipe */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Avatar / image cropper</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Compose Modal with a cropping library (e.g.{' '}
                  <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">react-easy-crop</code>) as children.
                  The zoom slider and Save/Cancel buttons live in the Modal footer.
                  The Modal owns focus-trapping and Escape handling; the cropping library owns canvas rendering.
                  Install <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">react-easy-crop</code> as
                  a direct dependency in your project — it is not included in @diwauhris/ui.
                </p>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-slate-900 px-5 py-4 text-xs leading-relaxed text-slate-300 font-mono whitespace-pre">
{`import { Modal, Button } from '@diwauhris/ui';
import Cropper from 'react-easy-crop'; // install separately
import { useState, useCallback } from 'react';

interface AvatarCropModalProps {
  imageSrc: string;
  onSave: (croppedFile: File) => void;
  onCancel: () => void;
}

export function AvatarCropModal({ imageSrc, onSave, onCancel }: AvatarCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    setSaving(true);
    // Use canvas to extract the cropped region and produce a File
    const file = await getCroppedFile(imageSrc, crop, zoom);
    onSave(file);
    setSaving(false);
  }, [imageSrc, crop, zoom, onSave]);

  return (
    <Modal
      isOpen
      onClose={onCancel}
      title="Crop Avatar"
      maxWidth="max-w-md"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} disabled={saving}>Cancel</Button>
          <Button variant="primary" onClick={handleSave} loading={saving}>
            {saving ? <>Saving…</> : <>Save</>}
          </Button>
        </div>
      }
    >
      {/* Cropper fills the modal body */}
      <div className="relative w-full aspect-square bg-slate-900 -mx-5 -mt-4 mb-2">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
        />
      </div>

      {/* Zoom slider */}
      <div className="flex items-center gap-3 px-1">
        <span className="text-xs text-slate-400">−</span>
        <input
          type="range"
          min={1} max={3} step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="flex-1"
          aria-label="Zoom"
        />
        <span className="text-xs text-slate-400">+</span>
      </div>
    </Modal>
  );
}`}
              </pre>
            </div>
          </div>
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['ARIA', [
                'role="dialog" and aria-modal="true" on the panel.',
                'aria-labelledby wired to the title heading via useId() — title is announced when focus enters.',
                'The close button has a configurable aria-label (default: "Close", override with closeLabel).',
                'The backdrop is aria-hidden="true" — not reachable by keyboard.',
              ]],
              ['Focus Management', [
                'On open: focus moves to the first focusable element inside the panel.',
                'Tab / Shift+Tab are trapped — focus cannot leave the modal panel.',
                'On close (Escape, backdrop, or close button): focus returns to the triggering element — but only when the trigger is a native browser element that held focus before the open. With the isOpen/onClose API pattern, the consumer is responsible for restoring focus manually (see "Focus restoration" note below).',
                'Focus restoration uses a separate mount-only effect — it is always correct regardless of onClose reference changes.',
              ]],
              ['Keyboard', [
                'Escape closes the modal from any focus position.',
                'Tab / Shift+Tab cycle through interactive elements inside the panel only.',
                'Clicking the backdrop (outside the panel) closes the modal.',
              ]],
              ['Scroll and portal', [
                'document.body overflow is locked while the modal is open and restored on close.',
                'The modal renders via createPortal to document.body — it escapes all parent stacking contexts and overflow:hidden ancestors.',
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

            {/* Focus restoration caveat ── */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-3">
              <h3 className="text-sm font-bold text-amber-800">Focus restoration — isOpen/onClose pattern</h3>
              <p className="text-sm font-medium text-amber-700">
                The <code className="font-mono text-xs">isOpen</code>/<code className="font-mono text-xs">onClose</code> API
                does <strong>not</strong> automatically return focus to the triggering element when the modal closes.
                Radix&rsquo;s own <code className="font-mono text-xs">DialogTrigger</code> handles focus return automatically
                because it owns the trigger reference — but when you pass a boolean, the modal has no way to know
                what triggered the open. If you need focus to return (required for WCAG 2.1 SC 2.4.3), manage it manually:
              </p>
              <pre className="overflow-x-auto rounded-lg bg-slate-900 px-4 py-3 text-xs leading-relaxed text-slate-300 font-mono whitespace-pre">
{`// Option 1: store a ref to the trigger button
const triggerRef = useRef<HTMLButtonElement>(null);

<button ref={triggerRef} onClick={() => setOpen(true)}>
  Open
</button>

<Modal
  isOpen={open}
  onClose={() => {
    setOpen(false);
    // Restore focus after React re-renders
    setTimeout(() => triggerRef.current?.focus(), 0);
  }}
  title="..."
>
  ...
</Modal>

// Option 2: capture activeElement before opening
const [trigger, setTrigger] = useState<HTMLElement | null>(null);

<button onClick={() => {
  setTrigger(document.activeElement as HTMLElement);
  setOpen(true);
}}>Open</button>

<Modal
  isOpen={open}
  onClose={() => { setOpen(false); trigger?.focus(); }}
  title="..."
>
  ...
</Modal>`}
              </pre>
            </div>
          </div>
        </GallerySection>

        {/* API ── */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'isOpen',           type: 'boolean',              description: 'Optional visibility gate. When false, renders nothing. Omit when controlling mount/unmount externally. Note: does not automatically restore focus on close — see Accessibility section.' },
            { name: 'onClose',          type: '() => void',           required: true,  description: 'Called on Escape, backdrop click, or close button. With the isOpen pattern, manually call triggerRef.current?.focus() here to restore focus (Radix DialogTrigger handles this automatically, but isOpen/onClose does not).' },
            { name: 'title',            type: 'ReactNode',            required: true,  description: 'Modal heading. Wired to aria-labelledby. Accepts string or JSX.' },
            { name: 'children',         type: 'ReactNode',            required: true,  description: 'Body content.' },
            { name: 'icon',             type: 'ReactNode',            description: 'Icon in the header badge. Mark it aria-hidden="true".' },
            { name: 'subtitle',         type: 'ReactNode',            description: 'Optional secondary line below the heading.' },
            { name: 'headerMeta',       type: 'ReactNode',            description: 'Slot below subtitle — for record counts, filter chips, etc.' },
            { name: 'footer',           type: 'ReactNode',            description: 'Custom footer. Overrides built-in Cancel/Submit buttons.' },
            { name: 'onSubmit',         type: '(e: FormEvent) => void', description: 'Wraps body+footer in <form>. Enables built-in Submit+Cancel buttons.' },
            { name: 'submitLabel',      type: 'string',               default: "'Submit'", description: 'Submit button label.' },
            { name: 'submittingLabel',  type: 'string',               default: "'Saving...'", description: 'Submit button label while submitting.' },
            { name: 'submitting',       type: 'boolean',              default: 'false', description: 'Disables submit button when true.' },
            { name: 'danger',           type: 'boolean',              default: 'false', description: 'Rose icon badge, rose title, rose submit button.' },
            { name: 'error',            type: 'string',               description: 'Inline error message rendered above children.' },
            { name: 'maxWidth',         type: 'string',               default: "'max-w-xl'", description: 'Tailwind max-w class. Common: max-w-sm (confirm), max-w-xl (default), max-w-4xl (large form).' },
            { name: 'closeLabel',       type: 'string',               default: "'Close'", description: 'aria-label for the X close button.' },
            { name: 'preventClose',     type: 'boolean',              default: 'false', description: 'Disables Escape, backdrop click, and hides the close button. Use for forms with unsaved changes.' },
          ]} />
        </GallerySection>

        {/* Related ── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
