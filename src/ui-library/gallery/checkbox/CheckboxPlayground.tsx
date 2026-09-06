/**
 * CheckboxPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import {
  PlaygroundPanel,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Checkbox } from './Checkbox';

export function CheckboxPlayground() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const controls = (
    <>
      <ToggleControl label="Checked"       value={checked}         onChange={setChecked} />
      <ToggleControl label="Indeterminate" value={indeterminate}   onChange={setIndeterminate} />
      <ToggleControl label="Error"         value={error}           onChange={setError} />
      <ToggleControl label="Disabled"      value={disabled}        onChange={setDisabled} />
      <ToggleControl label="Description"   value={showDescription} onChange={setShowDescription} />
    </>
  );

  const preview = (
    <Checkbox
      label="Enable notifications"
      description={showDescription ? 'Receive email alerts for pending approvals.' : undefined}
      checked={checked}
      indeterminate={indeterminate}
      error={error}
      helper={error ? 'You must accept to continue.' : undefined}
      disabled={disabled}
      onChange={(e) => { setChecked(e.target.checked); setIndeterminate(false); }}
    />
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
