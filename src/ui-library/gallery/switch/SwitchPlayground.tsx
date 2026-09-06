/**
 * SwitchPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import { PlaygroundPanel, ToggleControl } from '../components/PlaygroundPanel';
import { Switch } from './Switch';

export function SwitchPlayground() {
  const [checked, setChecked]           = useState(false);
  const [disabled, setDisabled]         = useState(false);
  const [loading, setLoading]           = useState(false);
  const [showDescription, setShowDesc]  = useState(false);

  const controls = (
    <>
      <ToggleControl label="On"          value={checked}         onChange={setChecked} />
      <ToggleControl label="Disabled"    value={disabled}        onChange={setDisabled} />
      <ToggleControl label="Loading"     value={loading}         onChange={setLoading} />
      <ToggleControl label="Description" value={showDescription} onChange={setShowDesc} />
    </>
  );

  const preview = (
    <Switch
      checked={checked}
      onChange={setChecked}
      label="Enable notifications"
      description={showDescription ? 'Receive alerts for pending approvals.' : undefined}
      disabled={disabled}
      loading={loading}
    />
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
