/**
 * DrawerPlayground — Gallery infrastructure
 *
 * Interactive playground for the Drawer component.
 * Controls: placement, description toggle.
 */

import { useState } from 'react';
import { ControlGroup, PlaygroundPanel, RadioControl, ToggleControl } from '../components/PlaygroundPanel';
import { Drawer, type DrawerPlacement } from './Drawer';

export function DrawerPlayground() {
  const [open, setOpen]         = useState(false);
  const [placement, setPlacement] = useState<DrawerPlacement>('right');
  const [hasDescription, setHasDesc] = useState(false);

  const controls = (
    <>
      <ControlGroup label="Placement">
        <RadioControl<DrawerPlacement>
          name="Placement"
          options={[
            { value: 'right', label: 'Right' },
            { value: 'bottom', label: 'Bottom' },
          ]}
          value={placement}
          onChange={setPlacement}
        />
      </ControlGroup>
      <ToggleControl label="Description" value={hasDescription} onChange={setHasDesc} />
    </>
  );

  const preview = (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white text-sm font-bold rounded-xl hover:bg-brand-navy transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      >
        Open Drawer
      </button>
      <p className="text-xs text-slate-400">placement: {placement}</p>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Playground Drawer"
        description={hasDescription ? 'Optional description line below the title.' : undefined}
        placement={placement}
      >
        <div className="space-y-3 text-sm text-slate-600">
          <p className="font-medium">Drawer content goes here.</p>
          <p className="text-slate-400">Press Tab to cycle focus, Escape to close, or click the backdrop.</p>
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
          >
            Focusable element
          </button>
        </div>
      </Drawer>
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
