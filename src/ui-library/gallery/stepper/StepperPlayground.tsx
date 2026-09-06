/**
 * StepperPlayground — Gallery infrastructure
 *
 * Interactive playground for the Stepper component.
 * Controls: step count, current step, orientation, disabled last step.
 */

import { useState } from 'react';
import { ControlGroup, PlaygroundPanel, RadioControl, ToggleControl } from '../components/PlaygroundPanel';
import { Stepper } from './Stepper';

type StepCount = '3' | '4';
type Orientation = 'horizontal' | 'vertical';
type CurrentStep = '1' | '2' | '3' | '4';

const STEPS_3 = [
  { id: '1', label: 'Personal Details', description: 'Name and contact' },
  { id: '2', label: 'Employment',       description: 'Role and dates' },
  { id: '3', label: 'Review',           description: 'Confirm and submit' },
];

const STEPS_4 = [
  { id: '1', label: 'Account',     description: 'Create your account' },
  { id: '2', label: 'Profile',     description: 'Set up your profile' },
  { id: '3', label: 'Preferences', description: 'Choose preferences' },
  { id: '4', label: 'Done',        description: 'All set!' },
];

export function StepperPlayground() {
  const [stepCount, setStepCount]     = useState<StepCount>('3');
  const [current, setCurrent]         = useState<CurrentStep>('2');
  const [orientation, setOrientation] = useState<Orientation>('horizontal');
  const [hasDisabled, setHasDisabled] = useState(false);

  const steps   = stepCount === '3' ? STEPS_3 : STEPS_4;
  const maxStep = parseInt(stepCount, 10);
  const curNum  = Math.min(parseInt(current, 10), maxStep);
  const curId   = String(curNum);
  const completed = Array.from({ length: curNum - 1 }, (_, i) => String(i + 1));
  const disabled  = hasDisabled ? [String(maxStep)] : [];

  const controls = (
    <>
      <ControlGroup label="Steps">
        <RadioControl<StepCount>
          name="Step count"
          options={[
            { value: '3', label: '3 steps' },
            { value: '4', label: '4 steps' },
          ]}
          value={stepCount}
          onChange={setStepCount}
        />
      </ControlGroup>
      <ControlGroup label="Current step">
        <RadioControl<CurrentStep>
          name="Current step"
          options={([1, 2, 3, 4] as const)
            .filter(n => n <= maxStep)
            .map(n => ({ value: String(n) as CurrentStep, label: String(n) }))}
          value={current}
          onChange={setCurrent}
        />
      </ControlGroup>
      <ControlGroup label="Orientation">
        <RadioControl<Orientation>
          name="Orientation"
          options={[
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'vertical',   label: 'Vertical'   },
          ]}
          value={orientation}
          onChange={setOrientation}
        />
      </ControlGroup>
      <ToggleControl label="Disable last step" value={hasDisabled} onChange={setHasDisabled} />
    </>
  );

  const preview = (
    <div className={orientation === 'horizontal' ? 'w-full max-w-md' : 'w-48'}>
      <Stepper
        steps={steps.slice(0, maxStep)}
        currentStep={curId}
        completedSteps={completed}
        disabledSteps={disabled}
        orientation={orientation}
      />
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
