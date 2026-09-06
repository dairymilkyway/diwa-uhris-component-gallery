/**
 * DialogPage — Gallery infrastructure
 * Phase 3: Showcase pattern with interactive dialog examples.
 */

import { useState } from 'react';
import { AlertTriangle, Save, Trash2, User } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { DialogPlayground } from './DialogPlayground';
import { Dialog, DialogBody, DialogFooter } from './Dialog';
import { Button } from '../button/Button';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['button', 'alert', 'card']);

const CODE = {
  basic: `import { Dialog, DialogBody, DialogFooter } from '@diwauhris/ui';
import { Button } from '@diwauhris/ui';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<Button variant="outline" onClick={() => setOpen(true)}>Open Dialog</Button>

<Dialog open={open} onClose={() => setOpen(false)} title="Dialog Title">
  <DialogBody>
    <p className="text-sm font-medium text-slate-600">
      Dialog content goes here.
    </p>
  </DialogBody>
  <DialogFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
  </DialogFooter>
</Dialog>`,

  form: `const [open, setOpen] = useState(false);

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Edit Employee"
  description="Update the employee details below."
>
  <DialogBody>
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">
          Full Name
        </label>
        <input id="name" type="text" defaultValue="Juan dela Cruz"
          className="w-full rounded-md border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/15"
        />
      </div>
    </div>
  </DialogBody>
  <DialogFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleSave}>
      <Save size={16} aria-hidden="true" /> Save Changes
    </Button>
  </DialogFooter>
</Dialog>`,

  confirm: `const [open, setOpen] = useState(false);

<Dialog open={open} onClose={() => setOpen(false)} title="Confirm Action" size="sm">
  <DialogBody>
    <p className="text-sm font-medium leading-relaxed text-slate-600">
      Are you sure you want to proceed? This action cannot be undone.
    </p>
  </DialogBody>
  <DialogFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
  </DialogFooter>
</Dialog>`,

  destructive: `import { AlertTriangle } from '@diwauhris/ui';

const [open, setOpen] = useState(false);

<Dialog open={open} onClose={() => setOpen(false)} title="Delete Record" size="sm">
  <DialogBody>
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-rose-50">
        <AlertTriangle size={20} className="text-rose-500" aria-hidden="true" />
      </span>
      <p className="text-sm font-medium leading-relaxed text-slate-600">
        This will permanently delete the record. This action cannot be undone.
      </p>
    </div>
  </DialogBody>
  <DialogFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="danger" onClick={handleDelete}>
      <Trash2 size={16} aria-hidden="true" /> Delete
    </Button>
  </DialogFooter>
</Dialog>`,

  preventClose: `// Fragment — add your own state: const [open, setOpen] = useState(false);
// Multi-step wizard — prevent accidental dismissal
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Complete Setup"
  preventClose
>
  <DialogBody>
    <p className="text-sm font-medium text-slate-600">
      Please complete all steps before closing.
    </p>
  </DialogBody>
  <DialogFooter>
    <Button variant="primary" onClick={handleFinish}>Finish</Button>
  </DialogFooter>
</Dialog>`,

  sizes: `// Fragment — add your own state: const [open, setOpen] = useState(false);
// Available sizes: sm | md (default) | lg | xl
<Dialog open={open} onClose={close} title="Small"  size="sm"> … </Dialog>
<Dialog open={open} onClose={close} title="Medium" size="md"> … </Dialog>
<Dialog open={open} onClose={close} title="Large"  size="lg"> … </Dialog>
<Dialog open={open} onClose={close} title="XL"     size="xl"> … </Dialog>`,
};

function BasicDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Dialog Title">
        <DialogBody>
          <p className="text-sm font-medium text-slate-600">Dialog content goes here. Press Escape or click Cancel to close.</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

function FormDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open Form</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Edit Employee" description="Update the employee details below.">
        <DialogBody>
          <div className="space-y-4">
            <div>
              <label htmlFor="dlg-name" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
              <input id="dlg-name" type="text" defaultValue="Juan dela Cruz" className="w-full rounded-md border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/15" />
            </div>
            <div>
              <label htmlFor="dlg-dept" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">Department</label>
              <input id="dlg-dept" type="text" defaultValue="Human Resources" className="w-full rounded-md border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/15" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            <Save size={16} aria-hidden="true" /> Save Changes
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

function ConfirmDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open Confirm</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Confirm Action" size="sm">
        <DialogBody>
          <p className="text-sm font-medium leading-relaxed text-slate-600">
            Are you sure you want to proceed? This action cannot be undone.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

function DestructiveDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" size="sm" onClick={() => setOpen(true)}>Delete Record</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Delete Record" size="sm">
        <DialogBody>
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-rose-50">
              <AlertTriangle size={20} className="text-rose-500" aria-hidden="true" />
            </span>
            <p className="text-sm font-medium leading-relaxed text-slate-600">
              This will permanently delete the record. This action cannot be undone.
            </p>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => setOpen(false)}>
            <Trash2 size={16} aria-hidden="true" /> Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

function PreventCloseDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <User size={16} aria-hidden="true" /> Locked Dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Complete Setup" preventClose>
        <DialogBody>
          <p className="text-sm font-medium leading-relaxed text-slate-600">
            Escape key and backdrop click are disabled. Use the button below to close.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="primary" onClick={() => setOpen(false)}>Finish</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

// Extracted to a named component to avoid calling useState() inside .map()
function DialogSizeExample({ size }: { size: 'sm' | 'md' | 'lg' | 'xl' }) {
  const [open, setOpen] = useState(false);
  return (
    <span>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        {size.toUpperCase()}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={`${size.toUpperCase()} Dialog`}
        size={size}
      >
        <DialogBody>
          <p className="text-sm font-medium text-slate-600">
            This is a {size} dialog. Its max-width is controlled by the size prop.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </Dialog>
    </span>
  );
}

export default function DialogPage() {
  return (
    <GalleryLayout activeId="dialog">
      <title>Dialog — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Overlay"
          name="Dialog"
          importName="Dialog, DialogBody, DialogFooter"
          description="A low-level dialog primitive with full focus management. Traps focus, restores it on close, locks body scroll, and handles Escape and backdrop dismissal. Use Modal or ConfirmDialog for most cases."
          status="complete"
        />

        <GallerySection id="overview" title="Overview" description="Common dialog patterns at a glance. No code — click the playground to experiment.">
          <ShowcasePreview standalone>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm">Open Dialog</Button>
              <Button variant="outline" size="sm">Edit Form</Button>
              <Button variant="outline" size="sm">Confirm</Button>
              <Button variant="danger"  size="sm">Delete Record</Button>
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="playground" title="Playground" description="Configure size, description, and dismiss behavior. Click Open Dialog to test.">
          <DialogPlayground />
        </GallerySection>

        <GallerySection id="examples" title="Examples" description="Click each trigger to open the dialog. All focus management and keyboard behavior is live.">
          <ShowcaseGrid columns={2}>
            <Showcase title="Basic" description="Minimal dialog with cancel and confirm actions." code={CODE.basic}>
              <BasicDialog />
            </Showcase>

            <Showcase title="Form dialog" description="Standard edit dialog with form fields and save action." code={CODE.form}>
              <FormDialog />
            </Showcase>

            <Showcase title="Confirmation" description="size='sm' for compact confirmations." code={CODE.confirm}>
              <ConfirmDialog />
            </Showcase>

            <Showcase title="Destructive confirmation" description="Danger button for irreversible actions." code={CODE.destructive}>
              <DestructiveDialog />
            </Showcase>
          </ShowcaseGrid>

          <Showcase
            title="Prevent close"
            description="preventClose disables Escape, backdrop click, and hides the close button. Use for wizard flows where users must complete a task."
            code={CODE.preventClose}
          >
            <PreventCloseDialog />
          </Showcase>
        </GallerySection>

        <GallerySection id="sizes" title="Sizes">
          <Showcase title="Size reference" description="Four sizes: sm | md | lg | xl. Use sm for confirmations, md for forms, lg/xl for complex content." code={CODE.sizes} tone="white">
            <div className="flex flex-wrap items-center gap-3">
              {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                <DialogSizeExample key={s} size={s} />
              ))}
            </div>
          </Showcase>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Focus Management', ['Focus moves to the first focusable element when Dialog opens.', 'Tab / Shift+Tab are trapped — focus cannot reach background content.', 'Focus returns to the trigger element when Dialog closes.']],
              ['Keyboard', ['Escape closes the dialog (unless preventClose is set).', 'Background content cannot be interacted with while the dialog is open.']],
              ['ARIA', ['role="dialog" + aria-modal="true".', 'aria-labelledby is wired to the title heading automatically.', 'aria-describedby is wired to the description paragraph.', 'The close button has aria-label="Close dialog".', 'The backdrop is aria-hidden="true".']],
              ['Scroll & Mobile', ['Body overflow is locked while dialog is open and restored on close.', 'max-h-[90vh] with internal scrolling prevents viewport overflow on mobile.']],
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

        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'open',         type: 'boolean',           required: true, description: 'Controls visibility.' },
            { name: 'onClose',      type: '() => void',        required: true, description: 'Called on Escape, backdrop click, or close button.' },
            { name: 'title',        type: 'string',            description: 'Heading — wired to aria-labelledby.' },
            { name: 'description',  type: 'string',            description: 'Subheading — wired to aria-describedby.' },
            { name: 'size',         type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Max-width constraint.' },
            { name: 'preventClose', type: 'boolean',           default: 'false', description: 'Disables Escape, backdrop, and close button.' },
            { name: 'children',     type: 'ReactNode',         description: 'DialogBody and/or DialogFooter.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
