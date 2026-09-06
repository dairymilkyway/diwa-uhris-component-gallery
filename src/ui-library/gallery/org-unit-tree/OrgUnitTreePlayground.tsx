/**
 * OrgUnitTreePlayground — Gallery infrastructure
 *
 * Interactive playground for the OrgUnitTree component.
 * Uses custom toggle controls (not PlaygroundPanel) because the component
 * output is too wide for the standard 2-column playground layout.
 * Controls: meta slot, badge slot, actions slot visibility toggles.
 */

import { useState } from 'react';
import {
  Briefcase,
  Building2,
  Edit2,
  FolderPlus,
  Network,
  Users,
} from 'lucide-react';
import { OrgUnitTree, type OrgUnitNode } from './OrgUnitTree';
import { StatusBadge } from '../status-badge/StatusBadge';
import { IconButton } from '../icon-button/IconButton';

export function OrgUnitTreePlayground() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [showMeta, setShowMeta]     = useState(true);
  const [showBadge, setShowBadge]   = useState(true);
  const [showActions, setShowActions] = useState(true);

  const buildNodes = (): OrgUnitNode[] => [
    {
      id: 'root',
      label: 'Headquarters',
      description: 'Root organization',
      icon: <Building2 size={18} aria-hidden="true" />,
      meta: showMeta ? <span className="flex items-center gap-1 text-slate-300"><Users size={13} aria-hidden="true" /> 42/50</span> : undefined,
      children: [
        {
          id: 'hr-pg',
          label: 'Human Resources',
          description: 'Division · 8 positions',
          icon: <Users size={16} aria-hidden="true" />,
          badge: showBadge ? <StatusBadge tone="success">Active</StatusBadge> : undefined,
          meta: showMeta ? <span className="flex items-center gap-1 text-slate-500"><Users size={12} aria-hidden="true" /> 8/10</span> : undefined,
          actions: showActions ? (
            <IconButton icon={<Edit2 size={14} aria-hidden="true" />} aria-label="Edit Human Resources" variant="edit" />
          ) : undefined,
          children: [
            { id: 'recruitment-pg', label: 'Recruitment', description: 'Section', icon: <FolderPlus size={14} aria-hidden="true" /> },
          ],
        },
        {
          id: 'eng-pg',
          label: 'Engineering',
          description: 'Division · 14 positions',
          icon: <Briefcase size={16} aria-hidden="true" />,
          badge: showBadge ? <StatusBadge tone="info">Hiring</StatusBadge> : undefined,
          meta: showMeta ? <span className="flex items-center gap-1 text-slate-500"><Users size={12} aria-hidden="true" /> 14/15</span> : undefined,
          actions: showActions ? (
            <IconButton icon={<Network size={14} aria-hidden="true" />} aria-label="View Engineering structure" />
          ) : undefined,
        },
        {
          id: 'disabled-pg',
          label: 'Finance (Inactive)',
          description: 'Disabled unit',
          icon: <FolderPlus size={16} aria-hidden="true" />,
          badge: showBadge ? <StatusBadge tone="neutral">Inactive</StatusBadge> : undefined,
          disabled: true,
        },
      ],
    },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Meta', value: showMeta, set: setShowMeta },
          { label: 'Badge', value: showBadge, set: setShowBadge },
          { label: 'Actions', value: showActions, set: setShowActions },
        ].map(({ label, value, set }) => (
          <button
            key={label}
            type="button"
            onClick={() => set(!value)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 ${
              value
                ? 'bg-brand-blue text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {label}: {value ? 'ON' : 'OFF'}
          </button>
        ))}
      </div>
      <OrgUnitTree
        nodes={buildNodes()}
        selectedId={selectedId}
        onSelect={setSelectedId}
        aria-label="Playground organization tree"
      />
      {selectedId && (
        <p className="text-xs font-mono text-slate-500">
          Selected: <strong>{selectedId}</strong>
        </p>
      )}
    </div>
  );
}
