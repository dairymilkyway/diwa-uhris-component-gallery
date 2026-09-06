/**
 * SpinnerPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Spinner } from './Spinner';
import type { SpinnerSize } from './Spinner';

export function SpinnerPlayground() {
  const [size, setSize]               = useState<SpinnerSize>('md');
  const [labelHidden, setLabelHidden] = useState(false);

  const controls = (
    <>
      <ControlGroup label="Size">
        <RadioControl<SpinnerSize>
          name="size"
          value={size}
          onChange={setSize}
          options={[
            { value: 'sm', label: 'SM' },
            { value: 'md', label: 'MD' },
            { value: 'lg', label: 'LG' },
          ]}
        />
      </ControlGroup>
      <ToggleControl label="Hide Label" value={labelHidden} onChange={setLabelHidden} />
    </>
  );

  return (
    <PlaygroundPanel
      controls={controls}
      preview={<Spinner size={size} label="Loading…" labelHidden={labelHidden} />}
    />
  );
}
