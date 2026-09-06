/**
 * AlertPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Alert } from './Alert';
import type { AlertTone } from './Alert';

export function AlertPlayground() {
  const [tone, setTone]         = useState<AlertTone>('info');
  const [showTitle, setTitle]   = useState(true);
  const [showIcon, setIcon]     = useState(true);
  const [dismissible, setDismiss] = useState(false);
  const [subtle, setSubtle]     = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const MESSAGES: Record<AlertTone, string> = {
    info:    'Your changes are saved as a draft.',
    success: 'Employee record updated successfully.',
    warning: 'This action cannot be undone after submission.',
    danger:  'Failed to save changes. Please try again.',
  };

  const controls = (
    <>
      <ControlGroup label="Tone">
        <RadioControl<AlertTone>
          name="tone"
          value={tone}
          onChange={(t) => { setTone(t); setDismissed(false); }}
          options={[
            { value: 'info',    label: 'Info'    },
            { value: 'success', label: 'Success' },
            { value: 'warning', label: 'Warning' },
            { value: 'danger',  label: 'Danger'  },
          ]}
        />
      </ControlGroup>
      <ToggleControl label="Title"      value={showTitle}  onChange={setTitle} />
      <ToggleControl label="Icon"       value={showIcon}   onChange={setIcon} />
      <ToggleControl label="Dismissible" value={dismissible} onChange={(v) => { setDismiss(v); setDismissed(false); }} />
      <ToggleControl label="Subtle"     value={subtle}     onChange={setSubtle} />
    </>
  );

  const preview = dismissed ? (
    <button
      type="button"
      className="text-xs font-semibold text-slate-400 underline"
      onClick={() => setDismissed(false)}
    >
      Show again
    </button>
  ) : (
    <div className="w-full max-w-sm">
      <Alert
        tone={tone}
        title={showTitle ? (tone === 'info' ? 'Info' : tone === 'success' ? 'Success' : tone === 'warning' ? 'Warning' : 'Error') : undefined}
        icon={showIcon}
        subtle={subtle}
        onDismiss={dismissible ? () => setDismissed(true) : undefined}
      >
        {MESSAGES[tone]}
      </Alert>
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
