/**
 * TabsPlayground — Gallery infrastructure
 *
 * Interactive playground for the Tabs component.
 * Controls: tab count, disabled tab toggle, activate-on-focus toggle.
 */

import { useState } from 'react';
import { ControlGroup, PlaygroundPanel, RadioControl, ToggleControl } from '../components/PlaygroundPanel';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs';

type TabCount = '2' | '3' | '4';

const ALL_TABS = [
  { value: 'overview',  label: 'Overview'  },
  { value: 'details',   label: 'Details'   },
  { value: 'history',   label: 'History'   },
  { value: 'settings',  label: 'Settings'  },
];

export function TabsPlayground() {
  const [tabCount, setTabCount]               = useState<TabCount>('3');
  const [hasDisabled, setHasDisabled]         = useState(false);
  const [activateOnFocus, setActivateOnFocus] = useState(false);

  const count   = parseInt(tabCount, 10);
  const visible = ALL_TABS.slice(0, count);

  const controls = (
    <>
      <ControlGroup label="Tab Count">
        <RadioControl<TabCount>
          name="Tab count"
          options={[
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
          ]}
          value={tabCount}
          onChange={setTabCount}
        />
      </ControlGroup>
      <ToggleControl label="Disabled tab"       value={hasDisabled}     onChange={setHasDisabled} />
      <ToggleControl label="Activate on focus"  value={activateOnFocus} onChange={setActivateOnFocus} />
    </>
  );

  const preview = (
    <div className="w-full max-w-lg">
      <Tabs defaultValue="overview" activateOnFocus={activateOnFocus}>
        <TabList aria-label="Demo tabs">
          {visible.map((t, i) => (
            <Tab
              key={t.value}
              value={t.value}
              disabled={hasDisabled && i === count - 1}
            >
              {t.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="pt-4">
          {visible.map((t) => (
            <TabPanel key={t.value} value={t.value}>
              <div className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-800 mb-1">{t.label} panel</p>
                <p>Content for the <strong>{t.label}</strong> tab goes here.</p>
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );

  return <PlaygroundPanel controls={controls} preview={preview} />;
}
