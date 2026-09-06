/**
 * ComboboxPlayground — Gallery infrastructure
 *
 * Interactive controls for the Combobox gallery page.
 * Uses the real Combobox component — not a visual mock.
 */

import { useState } from 'react';
import {
  PlaygroundPanel,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Combobox } from './Combobox';

// Realistic option set — job families used in a position-template form
const OPTIONS = [
  { value: 'Engineering',        label: 'Engineering'        },
  { value: 'Product',            label: 'Product'            },
  { value: 'Design',             label: 'Design'             },
  { value: 'Finance',            label: 'Finance'            },
  { value: 'Human Resources',    label: 'Human Resources'    },
  { value: 'Operations',         label: 'Operations'         },
  { value: 'Sales',              label: 'Sales'              },
  { value: 'Marketing',          label: 'Marketing'          },
  { value: 'Legal',              label: 'Legal'              },
  { value: 'Customer Success',   label: 'Customer Success'   },
  { value: 'Information Technology', label: 'Information Technology' },
  { value: 'Research & Development', label: 'Research & Development' },
];

export function ComboboxPlayground() {
  const [value, setValue]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showError, setShowError] = useState(false);

  const controls = (
    <>
      <ToggleControl label="Loading"  value={loading}   onChange={setLoading}   />
      <ToggleControl label="Disabled" value={disabled}  onChange={setDisabled}  />
      <ToggleControl label="Error"    value={showError} onChange={setShowError} />
    </>
  );

  const preview = (
    <div className="w-full max-w-xs space-y-3">
      <Combobox
        value={value}
        onChange={setValue}
        options={OPTIONS}
        placeholder="Type to search job family…"
        loading={loading}
        disabled={disabled}
        error={showError ? 'A job family is required.' : undefined}
      />
      {value && (
        <p className="text-xs font-medium text-slate-400">
          Selected value: <code
            className="font-mono"
            style={{ background: 'transparent', padding: 0, fontSize: 'inherit' }}
          >{value}</code>
        </p>
      )}
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
