/**
 * InputPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import { Eye, EyeOff, Mail, Search } from 'lucide-react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  SelectControl,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Input } from './Input';
import type { InputStatus } from './Input';

type PrefixOption = 'none' | 'search' | 'email';
type SuffixOption = 'none' | 'unit' | 'toggle';

export function InputPlayground() {
  const [status, setStatus] = useState<InputStatus>('default');
  const [prefix, setPrefix] = useState<PrefixOption>('none');
  const [suffix, setSuffix] = useState<SuffixOption>('none');
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const PREFIX_MAP: Record<PrefixOption, React.ReactNode> = {
    none:   null,
    search: <Search size={14} aria-hidden="true" />,
    email:  <Mail size={14} aria-hidden="true" />,
  };

  const SUFFIX_MAP: Record<SuffixOption, React.ReactNode> = {
    none:   null,
    unit:   <span className="text-xs font-bold text-slate-400">PHP</span>,
    toggle: (
      <button
        type="button"
        onClick={() => setShowPassword((v) => !v)}
        className="flex items-center text-slate-400 transition hover:text-slate-600 focus-visible:outline-none"
        aria-label={showPassword ? 'Hide' : 'Show'}
      >
        {showPassword
          ? <EyeOff size={14} aria-hidden="true" />
          : <Eye size={14} aria-hidden="true" />
        }
      </button>
    ),
  };

  const HELPER: Record<InputStatus, string | undefined> = {
    default: undefined,
    error:   'This field is required.',
    success: 'Looks good!',
  };

  const controls = (
    <>
      <ControlGroup label="Status">
        <RadioControl<InputStatus>
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

      <SelectControl<PrefixOption>
        label="Prefix"
        value={prefix}
        onChange={setPrefix}
        options={[
          { value: 'none',   label: 'None'   },
          { value: 'search', label: 'Search' },
          { value: 'email',  label: 'Email'  },
        ]}
      />

      <SelectControl<SuffixOption>
        label="Suffix"
        value={suffix}
        onChange={setSuffix}
        options={[
          { value: 'none',   label: 'None'         },
          { value: 'unit',   label: 'Unit (PHP)'   },
          { value: 'toggle', label: 'Show/Hide'    },
        ]}
      />

      <ToggleControl label="Disabled" value={disabled} onChange={setDisabled} />
      <ToggleControl label="Required" value={required} onChange={setRequired} />
    </>
  );

  const preview = (
    <div className="w-full max-w-xs">
      <Input
        type={suffix === 'toggle' && !showPassword ? 'password' : 'text'}
        placeholder="Enter value…"
        status={status}
        helper={HELPER[status]}
        prefix={PREFIX_MAP[prefix]}
        suffix={SUFFIX_MAP[suffix]}
        disabled={disabled}
        required={required}
        aria-label="Playground input"
      />
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
