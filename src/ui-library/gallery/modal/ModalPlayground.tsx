/**
 * ModalPlayground — Gallery infrastructure
 */

import { useState } from 'react';
import { AlertTriangle, User } from 'lucide-react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  ToggleControl,
} from '../components/PlaygroundPanel';
import Modal from './Modal';

type MaxWidth = 'max-w-sm' | 'max-w-xl' | 'max-w-4xl';

export function ModalPlayground() {
  const [open, setOpen]           = useState(false);
  const [maxWidth, setMaxWidth]   = useState<MaxWidth>('max-w-xl');
  const [danger, setDanger]       = useState(false);
  const [showIcon, setShowIcon]   = useState(true);
  const [showSub, setShowSub]     = useState(false);
  const [showError, setShowError] = useState(false);
  const [formMode, setFormMode]   = useState(false);
  const [saving, setSaving]       = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); setOpen(false); }, 1400);
  }

  const icon = danger
    ? <AlertTriangle size={16} aria-hidden="true" />
    : <User size={16} aria-hidden="true" />;

  const controls = (
    <>
      <ControlGroup label="Max Width">
        <RadioControl<MaxWidth>
          name="maxWidth"
          value={maxWidth}
          onChange={setMaxWidth}
          options={[
            { value: 'max-w-sm',  label: 'SM'  },
            { value: 'max-w-xl',  label: 'MD'  },
            { value: 'max-w-4xl', label: 'LG'  },
          ]}
        />
      </ControlGroup>
      <ToggleControl label="Danger"      value={danger}     onChange={setDanger}    />
      <ToggleControl label="Icon"        value={showIcon}   onChange={setShowIcon}  />
      <ToggleControl label="Subtitle"    value={showSub}    onChange={setShowSub}   />
      <ToggleControl label="Error"       value={showError}  onChange={setShowError} />
      <ToggleControl label="Form / Submit" value={formMode} onChange={setFormMode}  />
    </>
  );

  const preview = (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={[
          'inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-xl transition',
          'focus-visible:outline-none focus-visible:ring-2',
          danger
            ? 'bg-rose-600 hover:bg-rose-700 focus-visible:ring-rose-300'
            : 'bg-brand-blue hover:bg-brand-navy focus-visible:ring-brand-blue/30',
        ].join(' ')}
      >
        Open Modal
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={danger ? 'Destructive Action' : 'Edit Record'}
        icon={showIcon ? icon : undefined}
        subtitle={showSub ? 'Juan Dela Cruz — Employee #00142' : undefined}
        danger={danger}
        error={showError ? 'Something went wrong. Please try again.' : undefined}
        maxWidth={maxWidth}
        onSubmit={formMode ? handleSubmit : undefined}
        submitLabel={danger ? 'Confirm' : 'Save'}
        submittingLabel={danger ? 'Confirming…' : 'Saving…'}
        submitting={saving}
      >
        <p className="text-sm text-slate-600 leading-relaxed">
          {danger
            ? 'This action cannot be undone. The record will be permanently removed.'
            : 'Use the controls on the left to change the modal configuration interactively.'}
        </p>
      </Modal>
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
