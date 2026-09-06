/**
 * TreeViewPage — Gallery infrastructure
 * Documents the TreeView design-system component.
 */

import { useState } from 'react';
import { Folder, File, Building, User } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { TreeView, type TreeItem } from './TreeView';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['sidebar', 'tabs', 'breadcrumb']);

// ── Demo data ─────────────────────────────────────────────────────────────────

const FILE_TREE: TreeItem[] = [
  {
    id: 'src',
    label: 'src',
    icon: <Folder size={14} />,
    children: [
      {
        id: 'shared',
        label: 'shared',
        icon: <Folder size={14} />,
        children: [
          { id: 'components', label: 'components', icon: <Folder size={14} />, children: [
            { id: 'modal',  label: 'Modal.tsx',  icon: <File size={14} /> },
            { id: 'field',  label: 'Field.tsx',  icon: <File size={14} /> },
          ]},
          { id: 'hooks', label: 'hooks', icon: <Folder size={14} />, children: [
            { id: 'useAuth', label: 'useAuth.ts', icon: <File size={13} /> },
          ]},
        ],
      },
      {
        id: 'app',
        label: 'app',
        icon: <Folder size={14} />,
        children: [
          { id: 'App.tsx',   label: 'App.tsx',   icon: <File size={13} /> },
          { id: 'index.css', label: 'index.css', icon: <File size={13} />, disabled: true },
        ],
      },
    ],
  },
  { id: 'package.json', label: 'package.json', icon: <File size={14} /> },
];

const ORG_TREE: TreeItem[] = [
  {
    id: 'ceo',
    label: 'Chief Executive Officer',
    icon: <User size={13} />,
    children: [
      {
        id: 'hr',
        label: 'Human Resources',
        icon: <Building size={13} />,
        children: [
          { id: 'hr-mgr', label: 'HR Manager', icon: <User size={13} /> },
          { id: 'recruiter', label: 'Recruiter', icon: <User size={13} /> },
        ],
      },
      {
        id: 'eng',
        label: 'Engineering',
        icon: <Building size={13} />,
        children: [
          { id: 'cto', label: 'CTO', icon: <User size={13} /> },
          { id: 'dev1', label: 'Senior Dev', icon: <User size={13} /> },
        ],
      },
    ],
  },
];

const CODE = {
  basic: `import { TreeView, type TreeItem } from '@diwauhris/ui';
import { useState } from 'react';

const items: TreeItem[] = [
  {
    id: 'org',
    label: 'Organization',
    children: [
      { id: 'hr',  label: 'Human Resources' },
      { id: 'eng', label: 'Engineering' },
    ],
  },
  { id: 'docs', label: 'Documents', disabled: true },
];

const [selected, setSelected] = useState('hr');

<TreeView
  items={items}
  selectedId={selected}
  onSelect={setSelected}
  aria-label="Organization tree"
/>`,

  fileTree: `import { TreeView, type TreeItem } from '@diwauhris/ui';
import { Folder, File } from 'lucide-react';
import { useState } from 'react';

const items: TreeItem[] = [
  {
    id: 'src',
    label: 'src',
    icon: <Folder size={14} />,
    children: [
      { id: 'modal', label: 'Modal.tsx', icon: <File size={14} /> },
      { id: 'field', label: 'Field.tsx', icon: <File size={14} /> },
    ],
  },
  { id: 'package', label: 'package.json', icon: <File size={14} /> },
];

const [selected, setSelected] = useState('modal');

<TreeView
  items={items}
  selectedId={selected}
  onSelect={setSelected}
  aria-label="File system tree"
/>`,

  orgTree: `import { TreeView, type TreeItem } from '@diwauhris/ui';
import { Building, User } from 'lucide-react';
import { useState } from 'react';

const items: TreeItem[] = [
  {
    id: 'ceo',
    label: 'Chief Executive Officer',
    icon: <User size={13} />,
    children: [
      {
        id: 'hr',
        label: 'Human Resources',
        icon: <Building size={13} />,
        children: [
          { id: 'hr-mgr',    label: 'HR Manager',  icon: <User size={13} /> },
          { id: 'recruiter', label: 'Recruiter',    icon: <User size={13} /> },
        ],
      },
    ],
  },
];

const [selected, setSelected] = useState('hr-mgr');

<TreeView
  items={items}
  selectedId={selected}
  onSelect={setSelected}
  aria-label="Organization hierarchy"
/>`,
};

export default function TreeViewPage() {
  const [fileSelected, setFileSelected]   = useState('modal');
  const [orgSelected,  setOrgSelected]    = useState('hr-mgr');

  return (
    <GalleryLayout activeId="tree-view">
      <title>Tree View — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Data Display"
          name="Tree View"
          description="An expandable nested tree for hierarchical data. Supports item selection, disabled items, and full WAI-ARIA keyboard navigation. Use OrgUnitTree for the UHRIS company structure look."
          status="complete"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="Click nodes or use ArrowKeys to navigate.">
          <ShowcasePreview standalone center={false} minHeight="min-h-[240px]">
            <ShowcaseGrid columns={2}>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">File tree</p>
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <TreeView
                    items={FILE_TREE}
                    selectedId={fileSelected}
                    onSelect={setFileSelected}
                    aria-label="File system tree"
                  />
                </div>
                {fileSelected && (
                  <p className="mt-2 text-xs text-slate-400 font-mono">selected: "{fileSelected}"</p>
                )}
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">Org hierarchy</p>
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <TreeView
                    items={ORG_TREE}
                    selectedId={orgSelected}
                    onSelect={setOrgSelected}
                    aria-label="Organization hierarchy"
                  />
                </div>
                {orgSelected && (
                  <p className="mt-2 text-xs text-slate-400 font-mono">selected: "{orgSelected}"</p>
                )}
              </div>
            </ShowcaseGrid>
          </ShowcasePreview>
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.fileTree} language="tsx" title="File tree" center={false} tone="white">
            <div className="rounded-xl border border-slate-200 bg-white p-3 w-full max-w-xs">
              <TreeView
                items={FILE_TREE}
                selectedId={fileSelected}
                onSelect={setFileSelected}
                aria-label="File system tree"
              />
            </div>
          </Showcase>
          <Showcase code={CODE.orgTree} language="tsx" title="Org hierarchy" center={false} tone="white">
            <div className="rounded-xl border border-slate-200 bg-white p-3 w-full max-w-xs">
              <TreeView
                items={ORG_TREE}
                selectedId={orgSelected}
                onSelect={setOrgSelected}
                aria-label="Organization hierarchy"
              />
            </div>
          </Showcase>
          <Showcase code={CODE.basic} language="tsx" title="Minimal — no icons">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <TreeView
                items={[
                  { id: 'org', label: 'Organization', children: [
                    { id: 'hr',  label: 'Human Resources' },
                    { id: 'eng', label: 'Engineering' },
                  ]},
                  { id: 'docs', label: 'Documents', disabled: true },
                ]}
                selectedId="hr"
                onSelect={() => {}}
                aria-label="Organization tree"
              />
            </div>
          </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['ARIA roles', [
                'Root list: role="tree" with aria-label.',
                'Each item: role="treeitem", aria-expanded (parent nodes only), aria-selected, aria-disabled, aria-level.',
                'Nested lists: role="group" (no aria-label needed).',
              ]],
              ['Keyboard (WAI-ARIA tree pattern)', [
                'ArrowDown — next visible item (skips disabled).',
                'ArrowUp — previous visible item.',
                'ArrowRight — expand collapsed node, or move to first child.',
                'ArrowLeft — collapse expanded node, or move to parent.',
                'Home — first item in tree.',
                'End — last visible item.',
                'Enter / Space — select item; toggle expand on parent nodes.',
              ]],
              ['Disabled items', [
                'Disabled items have aria-disabled="true" and are skipped by ArrowDown/ArrowUp navigation.',
                'They cannot be selected by keyboard or click.',
              ]],
            ].map(([h, items]) => (
              <div key={String(h)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(h)}</h3>
                <ul className="space-y-1.5">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-sky/60" aria-hidden="true" />
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
          <p className="text-sm font-bold text-slate-700 mb-2">TreeView</p>
          <ApiTable props={[
            { name: 'items',      type: 'TreeItem[]', required: true, description: 'Array of tree nodes. Each node may have children.' },
            { name: 'selectedId', type: 'string',   description: 'Currently selected item id.' },
            { name: 'onSelect',   type: '(id: string) => void', description: 'Called when an item is selected.' },
            { name: 'aria-label', type: 'string',   description: 'Accessible label for the tree.' },
            { name: 'className',  type: 'string',   description: 'Additional class on the root element.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">TreeItem</p>
          <ApiTable props={[
            { name: 'id',       type: 'string',   required: true, description: 'Unique identifier.' },
            { name: 'label',    type: 'string',   required: true, description: 'Visible label text.' },
            { name: 'icon',     type: 'ReactNode', description: 'Optional icon rendered before the label.' },
            { name: 'disabled', type: 'boolean',  default: 'false', description: 'Prevents selection and keyboard navigation.' },
            { name: 'children', type: 'TreeItem[]', description: 'Child nodes. Presence makes the item expandable.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
