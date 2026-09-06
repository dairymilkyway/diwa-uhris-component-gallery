/**
 * SidebarPlayground — Gallery infrastructure
 *
 * Interactive playground for the Sidebar component.
 * Controls: active item, icons toggle, badges toggle.
 */

import { useState } from 'react';
import {
  BarChart2, LayoutDashboard, Settings, Shield, Users,
} from 'lucide-react';
import { ControlGroup, PlaygroundPanel, RadioControl, ToggleControl } from '../components/PlaygroundPanel';
import { SidebarNav, SidebarSection, SidebarGroup, SidebarItem } from './Sidebar';

type ActivePage = 'dashboard' | 'employees' | 'reports' | 'settings' | 'permissions';

export function SidebarPlayground() {
  const [active, setActive]       = useState<ActivePage>('employees');
  const [showIcons, setShowIcons] = useState(true);
  const [showBadge, setShowBadge] = useState(true);

  const controls = (
    <>
      <ControlGroup label="Active item">
        <RadioControl<ActivePage>
          name="Active item"
          options={[
            { value: 'dashboard',   label: 'Dashboard'   },
            { value: 'employees',   label: 'Employees'   },
            { value: 'reports',     label: 'Reports'     },
            { value: 'settings',    label: 'Settings'    },
            { value: 'permissions', label: 'Permissions' },
          ]}
          value={active}
          onChange={setActive}
        />
      </ControlGroup>
      <ToggleControl label="Show icons"  value={showIcons} onChange={setShowIcons} />
      <ToggleControl label="Show badges" value={showBadge} onChange={setShowBadge} />
    </>
  );

  const preview = (
    <div className="w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <SidebarNav aria-label="Playground navigation">
        <SidebarSection label="Workspace">
          <SidebarItem
            onClick={() => setActive('dashboard')}
            active={active === 'dashboard'}
            icon={showIcons ? <LayoutDashboard size={16} /> : undefined}
          >
            Dashboard
          </SidebarItem>
          <SidebarItem
            onClick={() => setActive('employees')}
            active={active === 'employees'}
            icon={showIcons ? <Users size={16} /> : undefined}
            badge={showBadge ? 42 : undefined}
          >
            Employees
          </SidebarItem>
          <SidebarItem
            onClick={() => setActive('reports')}
            active={active === 'reports'}
            icon={showIcons ? <BarChart2 size={16} /> : undefined}
            badge={showBadge ? '3' : undefined}
          >
            Reports
          </SidebarItem>
        </SidebarSection>
        <SidebarGroup label="Admin" defaultExpanded>
          <SidebarItem
            onClick={() => setActive('settings')}
            active={active === 'settings'}
            icon={showIcons ? <Settings size={16} /> : undefined}
          >
            Settings
          </SidebarItem>
          <SidebarItem
            onClick={() => setActive('permissions')}
            active={active === 'permissions'}
            icon={showIcons ? <Shield size={16} /> : undefined}
          >
            Permissions
          </SidebarItem>
        </SidebarGroup>
      </SidebarNav>
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
