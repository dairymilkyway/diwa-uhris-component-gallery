/**
 * SelectPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Select } from './Select';
import type { SelectStatus } from './Select';

const FLAT_ITEMS = [
  { value: 'active',     label: 'Active'     },
  { value: 'inactive',   label: 'Inactive'   },
  { value: 'terminated', label: 'Terminated' },
];

const GROUPED_ITEMS = [
  {
    group: 'Finance',
    options: [
      { value: 'payroll',    label: 'Payroll'    },
      { value: 'accounting', label: 'Accounting' },
    ],
  },
  {
    group: 'Operations',
    options: [
      { value: 'hr',  label: 'Human Resources' },
      { value: 'it',  label: 'IT'              },
    ],
  },
];

export function SelectPlayground() {
  const [status, setStatus]   = useState<SelectStatus>('default');
  const [grouped, setGrouped] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState('');

  const HELPER: Partial<Record<SelectStatus, string>> = {
    error:   'Please select a valid option.',
    success: 'Looks good!',
  };

  const controls = (
    <>
      <ControlGroup label="Status">
        <RadioControl<SelectStatus>
          name="status"
          value={status}
          onChange={setStatus}
          options={[
            { value: 'default', label: 'Default' },
            { value: 'error',   label: 'Error'   },
            { value: 'success', label: 'Success' },
          ]}
        />
      </ControlGroup>

      <ToggleControl label="Grouped Options" value={grouped}   onChange={setGrouped}  />
      <ToggleControl label="Disabled"        value={disabled}  onChange={setDisabled} />
    </>
  );

  const preview = (
    <div className="w-full max-w-xs">
      <Select
        items={grouped ? GROUPED_ITEMS : FLAT_ITEMS}
        placeholder="Select an option…"
        status={status}
        helper={HELPER[status]}
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Playground select"
      />
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
