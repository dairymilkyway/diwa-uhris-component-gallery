/**
 * ButtonPlayground
 *
 * Handcrafted interactive playground for the Button component.
 * Controls: variant, size, loading, disabled, left icon, right icon, full width.
 * Every change is immediately reflected in the live preview.
 */

import { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Download,
  Loader2,
  Plus,
  Save,
  Search,
} from 'lucide-react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  SelectControl,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Button } from './Button';
import type { ButtonVariant, ButtonSize } from './Button';

type LeftIconOption = 'none' | 'save' | 'download' | 'plus' | 'search';
type RightIconOption = 'none' | 'chevron' | 'arrow';

const LEFT_ICON_MAP: Record<LeftIconOption, React.ReactNode> = {
  none: null,
  save: <Save size={16} aria-hidden="true" />,
  download: <Download size={16} aria-hidden="true" />,
  plus: <Plus size={16} aria-hidden="true" />,
  search: <Search size={16} aria-hidden="true" />,
};

const RIGHT_ICON_MAP: Record<RightIconOption, React.ReactNode> = {
  none: null,
  chevron: <ChevronRight size={16} aria-hidden="true" />,
  arrow: <ArrowRight size={16} aria-hidden="true" />,
};

export function ButtonPlayground() {
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [size, setSize] = useState<ButtonSize>('md');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [leftIcon, setLeftIcon] = useState<LeftIconOption>('none');
  const [rightIcon, setRightIcon] = useState<RightIconOption>('none');
  const [fullWidth, setFullWidth] = useState(false);

  const controls = (
    <>
      <ControlGroup label="Variant">
        <RadioControl<ButtonVariant>
          name="variant"
          value={variant}
          onChange={setVariant}
          options={[
            { value: 'primary', label: 'Primary' },
            { value: 'dark', label: 'Dark' },
            { value: 'outline', label: 'Outline' },
            { value: 'ghost', label: 'Ghost' },
            { value: 'danger', label: 'Danger' },
          ]}
        />
      </ControlGroup>

      <ControlGroup label="Size">
        <RadioControl<ButtonSize>
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

      <SelectControl<LeftIconOption>
        label="Left Icon"
        value={leftIcon}
        onChange={setLeftIcon}
        options={[
          { value: 'none', label: 'None' },
          { value: 'save', label: 'Save' },
          { value: 'download', label: 'Download' },
          { value: 'plus', label: 'Plus' },
          { value: 'search', label: 'Search' },
        ]}
      />

      <SelectControl<RightIconOption>
        label="Right Icon"
        value={rightIcon}
        onChange={setRightIcon}
        options={[
          { value: 'none', label: 'None' },
          { value: 'chevron', label: 'Chevron' },
          { value: 'arrow', label: 'Arrow' },
        ]}
      />

      <ToggleControl label="Loading" value={loading} onChange={setLoading} />
      <ToggleControl label="Disabled" value={disabled} onChange={setDisabled} />
      <ToggleControl label="Full Width" value={fullWidth} onChange={setFullWidth} />
    </>
  );

  const preview = (
    <div className={fullWidth ? 'w-full max-w-xs' : ''}>
      <Button
        variant={variant}
        size={size}
        loading={loading}
        disabled={disabled || loading}
        leftIcon={LEFT_ICON_MAP[leftIcon]}
        rightIcon={RIGHT_ICON_MAP[rightIcon]}
        fullWidth={fullWidth}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Loading…
          </>
        ) : (
          'Save Changes'
        )}
      </Button>
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
