/**
 * CardPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import { Star } from 'lucide-react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Badge } from '../badge/Badge';
import { Button } from '../button/Button';
import type { CardVariant } from './Card';

export function CardPlayground() {
  const [variant, setVariant]         = useState<CardVariant>('default');
  const [showHeader, setShowHeader]   = useState(true);
  const [showFooter, setShowFooter]   = useState(true);
  const [showActions, setShowActions] = useState(false);

  const controls = (
    <>
      <ControlGroup label="Variant">
        <RadioControl<CardVariant>
          name="variant"
          value={variant}
          onChange={setVariant}
          options={[
            { value: 'default',     label: 'Default'      },
            { value: 'outlined',    label: 'Outlined'     },
            { value: 'elevated',    label: 'Elevated'     },
            { value: 'interactive', label: 'Interactive'  },
          ]}
        />
      </ControlGroup>
      <ToggleControl label="Header"       value={showHeader}  onChange={setShowHeader} />
      <ToggleControl label="Footer"       value={showFooter}  onChange={setShowFooter} />
      <ToggleControl label="Header Badge" value={showActions} onChange={setShowActions} />
    </>
  );

  const preview = (
    <div className="w-72">
      <Card variant={variant} onClick={variant === 'interactive' ? () => {} : undefined}>
        {showHeader && (
          <CardHeader
            title="Payroll Template"
            description="Monthly computation for rank-and-file."
            actions={showActions ? <Badge tone="success">Published</Badge> : undefined}
          />
        )}
        <CardContent>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">
            This template applies to all regular employees on the standard pay schedule.
          </p>
        </CardContent>
        {showFooter && (
          <CardFooter>
            <Button variant="outline" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">
              <Star size={13} aria-hidden="true" /> Save
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
