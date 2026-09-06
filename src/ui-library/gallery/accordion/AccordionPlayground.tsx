/**
 * AccordionPlayground — Gallery infrastructure
 *
 * Interactive playground for the Accordion component.
 * Controls: type (single/multiple), disabled item toggle.
 */

import { useState } from 'react';
import { ControlGroup, PlaygroundPanel, RadioControl, ToggleControl } from '../components/PlaygroundPanel';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

type AccordionType = 'single' | 'multiple';

export function AccordionPlayground() {
  const [type, setType] = useState<AccordionType>('single');
  const [hasDisabled, setHasDisabled] = useState(false);

  const controls = (
    <>
      <ControlGroup label="Type">
        <RadioControl<AccordionType>
          name="Type"
          options={[
            { value: 'single', label: 'Single' },
            { value: 'multiple', label: 'Multiple' },
          ]}
          value={type}
          onChange={setType}
        />
      </ControlGroup>
      <ToggleControl label="Disabled item" value={hasDisabled} onChange={setHasDisabled} />
    </>
  );

  const preview = (
    <div className="w-full max-w-sm">
      <Accordion type={type} defaultValue="a">
        <AccordionItem value="a">
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent>Name, contact details, and demographic information.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Employment Details</AccordionTrigger>
          <AccordionContent>Role, department, and employment type.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="c" disabled={hasDisabled}>
          <AccordionTrigger>Government IDs</AccordionTrigger>
          <AccordionContent>SSS, TIN, PhilHealth, and Pag-IBIG numbers.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
