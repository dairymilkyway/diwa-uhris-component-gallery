/**
 * TextareaPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  SelectControl,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Textarea } from './Textarea';
import type { TextareaStatus, TextareaResize } from './Textarea';

export function TextareaPlayground() {
  const [status, setStatus] = useState<TextareaStatus>('default');
  const [resize, setResize] = useState<TextareaResize>('vertical');
  const [disabled, setDisabled] = useState(false);
  const [showCharCount, setShowCharCount] = useState(false);
  const [value, setValue] = useState('');

  const HELPER: Record<TextareaStatus, string | undefined> = {
    default: undefined,
    error:   'Please provide more detail.',
    success: 'Looks good!',
  };

  const controls = (
    <>
      <ControlGroup label="Status">
        <RadioControl<TextareaStatus>
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

      <SelectControl<TextareaResize>
        label="Resize"
        value={resize}
        onChange={setResize}
        options={[
          { value: 'none',     label: 'None'     },
          { value: 'vertical', label: 'Vertical' },
          { value: 'both',     label: 'Both'     },
        ]}
      />

      <ToggleControl label="Disabled"    value={disabled}       onChange={setDisabled} />
      <ToggleControl label="Char Count"  value={showCharCount}  onChange={setShowCharCount} />
    </>
  );

  const preview = (
    <div className="w-full max-w-xs">
      <Textarea
        placeholder="Enter your comments…"
        status={status}
        helper={HELPER[status]}
        resize={resize}
        disabled={disabled}
        maxLength={showCharCount ? 200 : undefined}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        aria-label="Playground textarea"
      />
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
