/**
 * DialogPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import { Save } from 'lucide-react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Dialog, DialogBody, DialogFooter } from './Dialog';
import { Button } from '../button/Button';
import type { DialogSize } from './Dialog';

export function DialogPlayground() {
  const [open, setOpen]               = useState(false);
  const [size, setSize]               = useState<DialogSize>('md');
  const [preventClose, setPrevent]    = useState(false);
  const [showDesc, setShowDesc]       = useState(true);

  const controls = (
    <>
      <ControlGroup label="Size">
        <RadioControl<DialogSize>
          name="size"
          value={size}
          onChange={setSize}
          options={[
            { value: 'sm', label: 'SM' },
            { value: 'md', label: 'MD' },
            { value: 'lg', label: 'LG' },
            { value: 'xl', label: 'XL' },
          ]}
        />
      </ControlGroup>
      <ToggleControl label="Description"   value={showDesc}     onChange={setShowDesc} />
      <ToggleControl label="Prevent Close" value={preventClose} onChange={setPrevent} />
    </>
  );

  const preview = (
    <div className="flex flex-col items-center gap-3">
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      {preventClose && (
        <p className="text-xs font-medium text-slate-400">
          Close button hidden. Use footer button.
        </p>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Employee"
        description={showDesc ? 'Update the employee details below.' : undefined}
        size={size}
        preventClose={preventClose}
      >
        <DialogBody>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-500">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Juan dela Cruz"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/15"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-500">
                Department
              </label>
              <input
                type="text"
                defaultValue="Human Resources"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/15"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          {!preventClose && (
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          )}
          <Button variant="primary" onClick={() => setOpen(false)}>
            <Save size={15} aria-hidden="true" /> Save Changes
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
