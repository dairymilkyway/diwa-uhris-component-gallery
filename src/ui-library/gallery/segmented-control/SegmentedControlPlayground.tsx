/**
 * SegmentedControlPlayground — Gallery infrastructure
 *
 * Interactive playground for the SegmentedControl component.
 * Controls: option count, disabled option, entire control disabled.
 */

import { useState } from 'react';
import { ControlGroup, PlaygroundPanel, RadioControl, ToggleControl } from '../components/PlaygroundPanel';
import { SegmentedControl } from './SegmentedControl';

type OptionCount = '2' | '3' | '4';

export function SegmentedControlPlayground() {
  const [count, setCount]         = useState<OptionCount>('3');
  const [hasDisabled, setHasDisabled] = useState(false);
  const [allDisabled, setAllDisabled] = useState(false);
  const [value, setValue]         = useState('a');

  const allOpts = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
    { value: 'd', label: 'Option D' },
  ];
  const opts = allOpts.slice(0, parseInt(count, 10)).map((o, i) => ({
    ...o,
    disabled: hasDisabled && i === parseInt(count, 10) - 1,
  }));

  const controls = (
    <>
      <ControlGroup label="Options">
        <RadioControl<OptionCount>
          name="Option count"
          options={[
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
          ]}
          value={count}
          onChange={setCount}
        />
      </ControlGroup>
      <ToggleControl label="Disabled option" value={hasDisabled} onChange={setHasDisabled} />
      <ToggleControl label="Entire control disabled" value={allDisabled} onChange={setAllDisabled} />
    </>
  );

  const preview = (
    <div className="space-y-3 text-center">
      <SegmentedControl
        options={opts}
        value={value}
        onValueChange={setValue}
        disabled={allDisabled}
        aria-label="Playground segmented control"
      />
      <p className="text-xs text-slate-400 font-mono">
        selected: <strong className="text-slate-600">"{value}"</strong>
      </p>
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
