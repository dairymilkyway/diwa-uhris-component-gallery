/**
 * DropdownPlayground — Gallery infrastructure
 *
 * Interactive controls for the Dropdown gallery page.
 * Uses the real Dropdown component — not a visual mock.
 * All open/close and selection state is owned here.
 */

import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
} from '../components/PlaygroundPanel';
import { Dropdown } from './Dropdown';

type StatusOption = 'all' | 'active' | 'inactive' | 'suspended';

const STATUS_OPTIONS: { value: StatusOption; label: string }[] = [
  { value: 'all',       label: 'All Statuses' },
  { value: 'active',    label: 'Active'        },
  { value: 'inactive',  label: 'Inactive'      },
  { value: 'suspended', label: 'Suspended'     },
];

export function DropdownPlayground() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<StatusOption>('all');

  const currentLabel = STATUS_OPTIONS.find((o) => o.value === selected)?.label ?? 'All Statuses';

  const controls = (
    <ControlGroup label="Selected value">
      <RadioControl<StatusOption>
        name="selected"
        value={selected}
        onChange={(v) => { setSelected(v); setIsOpen(false); }}
        options={STATUS_OPTIONS}
      />
    </ControlGroup>
  );

  const preview = (
    <div className="flex flex-col items-center gap-4">
      <Dropdown
        trigger={
          <>
            <Filter size={14} aria-hidden="true" />
            <span className="max-w-[120px] truncate">{currentLabel}</span>
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={`text-slate-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </>
        }
        isOpen={isOpen}
        onToggle={() => setIsOpen((v) => !v)}
        onClose={() => setIsOpen(false)}
      >
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => { setSelected(opt.value); setIsOpen(false); }}
            className={`block w-full text-left px-4 py-2 text-sm font-bold transition-all hover:bg-slate-50 ${
              selected === opt.value ? 'text-brand-blue bg-blue-50/50' : 'text-slate-600'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </Dropdown>
      <p className="text-xs font-medium text-slate-400">
        Selected:{' '}
        <span className="font-semibold text-slate-600">{currentLabel}</span>
      </p>
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
