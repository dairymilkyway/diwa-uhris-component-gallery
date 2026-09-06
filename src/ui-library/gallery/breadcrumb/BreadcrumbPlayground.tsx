/**
 * BreadcrumbPlayground — Gallery infrastructure
 *
 * Handcrafted playground for the Breadcrumb component.
 * Controls: depth (1–4 levels), showHome toggle.
 */

import { useState } from 'react';
import {
  ControlGroup,
  PlaygroundPanel,
  RadioControl,
  ToggleControl,
} from '../components/PlaygroundPanel';
import { Breadcrumb } from './Breadcrumb';

type DepthOption = '1' | '2' | '3' | '4';

const ITEMS_BY_DEPTH = {
  '1': [{ label: 'Dashboard' }],
  '2': [{ label: 'Personnel', href: '/personnel/employees' }, { label: 'Employees' }],
  '3': [{ label: 'System Settings', href: '/system-settings' }, { label: 'Roles', href: '/system-settings/roles' }, { label: 'HR Admin' }],
  '4': [{ label: 'System Settings', href: '/system-settings' }, { label: 'Roles', href: '/system-settings/roles' }, { label: 'HR Admin', href: '/system-settings/roles/1' }, { label: 'Permissions' }],
} satisfies Record<DepthOption, { label: string; href?: string }[]>;

export function BreadcrumbPlayground() {
  const [depth, setDepth] = useState<DepthOption>('3');
  const [showHome, setShowHome] = useState(true);

  const controls = (
    <>
      <ControlGroup label="Depth">
        <RadioControl<DepthOption>
          name="depth"
          value={depth}
          onChange={setDepth}
          options={[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
          ]}
        />
      </ControlGroup>
      <ToggleControl label="Show Home Icon" value={showHome} onChange={setShowHome} />
    </>
  );

  return (
    <PlaygroundPanel
      controls={controls}
      preview={
        <Breadcrumb items={ITEMS_BY_DEPTH[depth]} showHome={showHome} />
      }
    />
  );
}
