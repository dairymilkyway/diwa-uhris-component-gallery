/**
 * OrgUnitTreePage — Gallery infrastructure (Enterprise)
 *
 * Documents the OrgUnitTree design-system component.
 * Visual design sourced from UHRIS CompanyStructurePage list-mode tree.
 * Source: frontend/src/ui-library/gallery/org-unit-tree/OrgUnitTree.tsx
 */

import { useState } from 'react';
import {
  Banknote,
  Briefcase,
  Building2,
  FolderPlus,
  Users,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { OrgUnitTree, type OrgUnitNode } from './OrgUnitTree';
import { OrgUnitTreePlayground } from './OrgUnitTreePlayground';
import { StatusBadge } from '../status-badge/StatusBadge';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['tree-view', 'employee-card', 'status-badge', 'icon-button', 'card']);

// ── Mock data ──────────────────────────────────────────────────────────────

const META_HQ = (
  <span className="flex items-center gap-3 text-slate-300">
    <span className="flex items-center gap-1"><Users size={13} aria-hidden="true" /> 42/50</span>
    <span className="flex items-center gap-1"><Banknote size={13} aria-hidden="true" /> Php 2.1M</span>
  </span>
);

const META_HR = (
  <span className="flex items-center gap-2 text-slate-500">
    <span className="flex items-center gap-1"><Users size={12} aria-hidden="true" /> 8/10</span>
  </span>
);

const META_ENG = (
  <span className="flex items-center gap-2 text-slate-500">
    <span className="flex items-center gap-1"><Users size={12} aria-hidden="true" /> 14/15</span>
  </span>
);

const DEMO_NODES: OrgUnitNode[] = [
  {
    id: 'hq',
    label: 'Acme Corporation',
    description: 'Root · 6 departments · 42 filled positions',
    icon: <Building2 size={18} aria-hidden="true" />,
    meta: META_HQ,
    children: [
      {
        id: 'hr',
        label: 'Human Resources',
        description: 'Division · 3 direct positions',
        icon: <Users size={16} aria-hidden="true" />,
        meta: META_HR,
        badge: <StatusBadge tone="success">Active</StatusBadge>,
        children: [
          {
            id: 'recruitment',
            label: 'Recruitment',
            description: 'Section · 4 positions',
            icon: <FolderPlus size={14} aria-hidden="true" />,
          },
          {
            id: 'employee-relations',
            label: 'Employee Relations',
            description: 'Section · 2 positions',
            icon: <FolderPlus size={14} aria-hidden="true" />,
          },
        ],
      },
      {
        id: 'eng',
        label: 'Engineering',
        description: 'Division · 8 direct positions',
        icon: <Briefcase size={16} aria-hidden="true" />,
        meta: META_ENG,
        badge: <StatusBadge tone="success">Active</StatusBadge>,
        children: [
          {
            id: 'software',
            label: 'Software Development',
            description: 'Section · 6 positions',
            icon: <FolderPlus size={14} aria-hidden="true" />,
          },
          {
            id: 'infra',
            label: 'Infrastructure',
            description: 'Section · 3 positions',
            icon: <FolderPlus size={14} aria-hidden="true" />,
            badge: <StatusBadge tone="warning">Understaffed</StatusBadge>,
          },
        ],
      },
      {
        id: 'finance',
        label: 'Finance',
        description: 'Division · 5 direct positions',
        icon: <Banknote size={16} aria-hidden="true" />,
        badge: <StatusBadge tone="neutral">Inactive</StatusBadge>,
        disabled: true,
        children: [
          { id: 'accounting', label: 'Accounting', icon: <FolderPlus size={14} aria-hidden="true" /> },
        ],
      },
    ],
  },
];

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  basic: `import { OrgUnitTree, type OrgUnitNode } from '@diwauhris/ui';
import { Building2, Users } from '@diwauhris/ui';

const nodes: OrgUnitNode[] = [
  {
    id: 'hq',
    label: 'Headquarters',
    description: 'Root · 3 departments',
    icon: <Building2 size={18} aria-hidden="true" />,
    children: [
      {
        id: 'hr',
        label: 'Human Resources',
        description: 'Division · 4 positions',
        icon: <Users size={16} aria-hidden="true" />,
      },
    ],
  },
];

<OrgUnitTree
  nodes={nodes}
  onSelect={(id) => console.log('Selected:', id)}
  aria-label="Organization structure"
/>`,

  withSlots: `// With meta + badge + actions slots
import { OrgUnitTree, type OrgUnitNode } from '@diwauhris/ui';
import { StatusBadge } from '@diwauhris/ui';
import { IconButton } from '@diwauhris/ui';
import { Edit2, Users } from '@diwauhris/ui';

const nodes: OrgUnitNode[] = [
  {
    id: 'hr',
    label: 'Human Resources',
    description: 'Division · 8/10 positions filled',
    icon: <Users size={16} aria-hidden="true" />,
    badge: <StatusBadge tone="success">Active</StatusBadge>,
    meta: <span className="flex items-center gap-1 text-slate-500"><Users size={12} /> 8/10</span>,
    actions: (
      <IconButton
        icon={<Edit2 size={14} aria-hidden="true" />}
        aria-label="Edit Human Resources"
        variant="edit"
        onClick={() => openEdit('hr')}
      />
    ),
  },
];`,

  controlled: `// Controlled expansion
const [expandedIds, setExpandedIds] = useState<string[]>(['hq']);

<OrgUnitTree
  nodes={nodes}
  expandedIds={expandedIds}
  onExpandedChange={setExpandedIds}
  selectedId={selectedId}
  onSelect={setSelectedId}
  aria-label="Organization structure"
/>`,

  domainMap: `// Mapping domain OrgUnitTreeNode to OrgUnitNode
import type { OrgUnitTreeNode } from 'org-structure/models/orgStructure.types';
import { OrgUnitTree, type OrgUnitNode } from '@diwauhris/ui';

function mapToGallery(node: OrgUnitTreeNode, canManage: boolean): OrgUnitNode {
  return {
    id: node.id,
    label: node.name,
    description: \`\${levelLabel(node)} · \${positionsForUnit(node.id).length} positions\`,
    icon: <FolderPlus size={16} aria-hidden="true" />,
    badge: node.status !== 'active'
      ? <StatusBadge tone="neutral">{node.status}</StatusBadge>
      : undefined,
    meta: <span>{stats.headcount}/{stats.totalPositions}</span>,
    actions: canManage
      ? <IconButton icon={<Edit2 size={14} />} aria-label={\`Edit \${node.name}\`} />
      : undefined,
    children: node.children.map((c) => mapToGallery(c, canManage)),
  };
}`,
};


// ── Page ───────────────────────────────────────────────────────────────────

export default function OrgUnitTreePage() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <GalleryLayout activeId="org-unit-tree">
      <title>OrgUnitTree — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Enterprise"
          name="OrgUnitTree"
          description="The UHRIS company structure in list mode. Root node in dark navy, children in white bordered cards with a blue hover. Expandable, selectable, and fully keyboard navigable."
          status="complete"
        />

        {/* Overview */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Realistic organization hierarchy with meta, badges, actions, and a disabled node."
        >
          <ShowcasePreview standalone center={false}>
            <OrgUnitTree
              nodes={DEMO_NODES}
              selectedId={selectedId}
              onSelect={setSelectedId}
              aria-label="Organization structure demo"
            />
            {selectedId && (
              <p className="mt-3 text-xs font-mono text-slate-500">
                Selected: <strong>{selectedId}</strong>
              </p>
            )}
          </ShowcasePreview>
        </GallerySection>

        {/* Playground */}
        <GallerySection
          id="playground"
          title="Playground"
          description="Toggle slots on/off and click nodes to explore."
        >
          <ShowcasePreview standalone center={false}>
            <OrgUnitTreePlayground />
          </ShowcasePreview>
        </GallerySection>

        {/* Variants */}
        <GallerySection id="variants" title="Variants">
          <ShowcaseGrid columns={2}>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Root only (no children)</p>
              <OrgUnitTree
                nodes={[{
                  id: 'solo',
                  label: 'Headquarters',
                  description: 'Single root node',
                  icon: <Building2 size={18} aria-hidden="true" />,
                }]}
                aria-label="Single root"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Flat department list</p>
              <OrgUnitTree
                defaultExpandedIds={[]}
                nodes={[{
                  id: 'flat-root',
                  label: 'Company',
                  icon: <Building2 size={18} aria-hidden="true" />,
                  children: [
                    { id: 'dept-a', label: 'Department A', icon: <FolderPlus size={14} aria-hidden="true" /> },
                    { id: 'dept-b', label: 'Department B', icon: <FolderPlus size={14} aria-hidden="true" /> },
                    { id: 'dept-c', label: 'Department C', icon: <FolderPlus size={14} aria-hidden="true" />, badge: <StatusBadge tone="warning">New</StatusBadge> },
                  ],
                }]}
                aria-label="Flat departments"
              />
            </div>
          </ShowcaseGrid>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Basic tree" center={false}>
            <OrgUnitTree
              nodes={DEMO_NODES}
              selectedId={selectedId}
              onSelect={setSelectedId}
              aria-label="Basic tree example"
            />
          </Showcase>
          <Showcase code={CODE.withSlots} language="tsx" title="With meta, badge, and actions slots" center={false}>
            <OrgUnitTree
              nodes={DEMO_NODES}
              selectedId={selectedId}
              onSelect={setSelectedId}
              aria-label="Tree with slots example"
            />
          </Showcase>
          <Showcase code={CODE.controlled} language="tsx" title="Controlled expansion" center={false}>
            <OrgUnitTree
              nodes={DEMO_NODES}
              selectedId={selectedId}
              onSelect={setSelectedId}
              aria-label="Controlled tree example"
            />
          </Showcase>
          <Showcase code={CODE.domainMap} language="tsx" title="Mapping from domain OrgUnitTreeNode" center={false}>
            <OrgUnitTree
              nodes={DEMO_NODES}
              selectedId={selectedId}
              onSelect={setSelectedId}
              aria-label="Domain-mapped tree example"
            />
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Tree semantics', [
                'role="tree" on the root <ul>. role="treeitem" on each <li>.',
                'role="group" on nested <ul> children.',
                'aria-expanded on collapsible nodes (true/false); absent on leaf nodes.',
                'aria-selected marks the selected node.',
                'aria-disabled on disabled nodes — they remain visible but are non-interactive.',
                'aria-level reflects the depth (1 = root, 2 = first children, etc.).',
              ]],
              ['Keyboard navigation', [
                'ArrowDown — next visible node (skips disabled).',
                'ArrowUp — previous visible node.',
                'ArrowRight — expand a collapsed node; or move to first child when already expanded.',
                'ArrowLeft — collapse an expanded node; or move to the parent when already collapsed.',
                'Home — first visible node.',
                'End — last visible node.',
                'Enter / Space — select the focused node and toggle expansion.',
                'Roving tabIndex: only the focused node has tabIndex=0.',
              ]],
              ['Expand/collapse buttons', [
                'Each expand/collapse button has aria-label: "Expand {name}" or "Collapse {name}".',
                'Buttons have tabIndex={-1} — they are activated via keyboard events on the treeitem, not independently.',
              ]],
              ['Meta and actions', [
                'The meta slot (right-side stats) is presentational. Content is not part of the treeitem accessible name.',
                'The actions slot (hover-reveal buttons) must have explicit aria-label on each button.',
                'Recommended pattern: aria-label="Edit Human Resources" (not just "Edit").',
              ]],
              ['Production improvement', [
                'The production CompanyStructurePage list tree has no ARIA — no role="tree", no aria-expanded.',
                'This gallery component establishes the accessible canonical pattern.',
              ]],
            ].map(([heading, items]) => (
              <div key={String(heading)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(heading)}</h3>
                <ul className="space-y-1.5">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GallerySection>

        {/* API */}
        <GallerySection id="api" title="API Reference">
          <p className="text-sm font-bold text-slate-700 mb-2">OrgUnitTreeProps</p>
          <ApiTable props={[
            { name: 'nodes',              type: 'OrgUnitNode[]',          required: true, description: 'Root-level nodes. Each node may have children for nesting.' },
            { name: 'selectedId',         type: 'string',                                description: 'Controlled selected node id.' },
            { name: 'onSelect',           type: '(id: string) => void',                 description: 'Called when a node is selected via click or keyboard.' },
            { name: 'defaultExpandedIds', type: 'string[]',                             description: 'Initially expanded node ids (uncontrolled). Defaults to top-level node ids.' },
            { name: 'expandedIds',        type: 'string[]',                             description: 'Controlled expanded ids. Supply onExpandedChange to update.' },
            { name: 'onExpandedChange',   type: '(ids: string[]) => void',              description: 'Called when expansion state changes (controlled mode).' },
            { name: 'aria-label',         type: 'string',                               description: 'Accessible label for the tree (role="tree").' },
            { name: 'className',          type: 'string',                               description: 'Additional class on the root <ul>.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">OrgUnitNode</p>
          <ApiTable props={[
            { name: 'id',          type: 'string',    required: true, description: 'Unique identifier.' },
            { name: 'label',       type: 'string',    required: true, description: 'Primary display label.' },
            { name: 'description', type: 'string',                   description: 'Secondary line below the label.' },
            { name: 'icon',        type: 'ReactNode',                description: 'Icon inside the colored badge square. Mark aria-hidden="true".' },
            { name: 'badge',       type: 'ReactNode',                description: 'Inline badge (StatusBadge, tag).' },
            { name: 'meta',        type: 'ReactNode',                description: 'Right-side metadata. Hidden on small screens. No ARIA association.' },
            { name: 'actions',     type: 'ReactNode',                description: 'Hover/focus-reveal buttons. Each must have aria-label.' },
            { name: 'children',    type: 'OrgUnitNode[]',            description: 'Nested child nodes.' },
            { name: 'disabled',    type: 'boolean',  default: 'false', description: 'Prevents selection; adds aria-disabled.' },
          ]} />
        </GallerySection>

        {/* Related */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
