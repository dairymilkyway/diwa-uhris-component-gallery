/**
 * BadgePlayground — Gallery infrastructure
 *
 * Handcrafted playground for the Badge design-system component.
 */

import { useState } from 'react';
import { CheckCircle2, Circle, Star } from 'lucide-react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Badge } from './Badge';
import type { BadgeTone, BadgeSize } from './Badge';

export function BadgePlayground() {
  const [tone, setTone] = useState<BadgeTone>('primary');
  const [size, setSize] = useState<BadgeSize>('md');
  const [showIcon, setShowIcon] = useState(false);

  const ICON_MAP: Record<BadgeTone, React.ReactNode> = {
    neutral: <Circle size={10} aria-hidden="true" />,
    primary: <Star size={10} aria-hidden="true" />,
    success: <CheckCircle2 size={10} aria-hidden="true" />,
    warning: <Circle size={10} aria-hidden="true" />,
    danger:  <Circle size={10} aria-hidden="true" />,
    info:    <Circle size={10} aria-hidden="true" />,
    subtle:  <Circle size={10} aria-hidden="true" />,
    outline: <Circle size={10} aria-hidden="true" />,
  };

  const controls = (
    <>
      <ControlGroup label="Tone">
        <RadioControl<BadgeTone>
          name="tone"
          value={tone}
          onChange={setTone}
          options={[
            { value: 'neutral',  label: 'Neutral'  },
            { value: 'primary',  label: 'Primary'  },
            { value: 'success',  label: 'Success'  },
            { value: 'warning',  label: 'Warning'  },
            { value: 'danger',   label: 'Danger'   },
            { value: 'info',     label: 'Info'     },
            { value: 'subtle',   label: 'Subtle'   },
            { value: 'outline',  label: 'Outline'  },
          ]}
        />
      </ControlGroup>

      <ControlGroup label="Size">
        <RadioControl<BadgeSize>
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

      <ToggleControl label="Show Icon" value={showIcon} onChange={setShowIcon} />
    </>
  );

  const preview = (
    <Badge tone={tone} size={size} icon={showIcon ? ICON_MAP[tone] : undefined}>
      {tone === 'success' ? 'Approved' :
       tone === 'danger'  ? 'Rejected' :
       tone === 'warning' ? 'Pending'  :
       tone === 'info'    ? 'Review'   :
       tone === 'primary' ? 'Active'   :
                            'Label'}
    </Badge>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
