/**
 * MenuPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import { Archive, Edit, MoreVertical, Trash2 } from 'lucide-react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Menu } from './Menu';
import type { MenuItemTone } from './Menu';

type AlignOption = 'left' | 'right';

export function MenuPlayground() {
  const [align, setAlign]           = useState<AlignOption>('right');
  const [showIcons, setShowIcons]   = useState(true);
  const [hasDanger, setHasDanger]   = useState(true);
  const [hasDisabled, setHasDisabled] = useState(false);

  const items = [
    { label: 'Edit',    icon: showIcons ? <Edit    size={14} aria-hidden="true" /> : undefined, onClick: () => {}, tone: 'default'  as MenuItemTone },
    { label: 'Archive', icon: showIcons ? <Archive size={14} aria-hidden="true" /> : undefined, onClick: () => {}, tone: 'default'  as MenuItemTone, disabled: hasDisabled },
    ...(hasDanger ? [{ label: 'Delete', icon: showIcons ? <Trash2 size={14} aria-hidden="true" /> : undefined, onClick: () => {}, tone: 'danger' as MenuItemTone }] : []),
  ];

  const trigger = (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      aria-label="Actions"
    >
      <MoreVertical size={15} aria-hidden="true" />
    </button>
  );

  const controls = (
    <>
      <ControlGroup label="Panel Alignment">
        <RadioControl<AlignOption>
          name="align"
          value={align}
          onChange={setAlign}
          options={[
            { value: 'left',  label: 'Left'  },
            { value: 'right', label: 'Right' },
          ]}
        />
      </ControlGroup>
      <ToggleControl label="Show Icons"    value={showIcons}   onChange={setShowIcons} />
      <ToggleControl label="Danger Item"   value={hasDanger}   onChange={setHasDanger} />
      <ToggleControl label="Disabled Item" value={hasDisabled} onChange={setHasDisabled} />
    </>
  );

  return (
    <PlaygroundPanel
      controls={controls}
      preview={
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500">Click to open:</span>
          <Menu trigger={trigger} items={items} align={align} />
        </div>
      }
    />
  );
}
