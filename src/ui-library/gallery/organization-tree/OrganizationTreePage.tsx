/**
 * OrganizationTreePage — Gallery infrastructure (Enterprise)
 *
 * The Organization Tree uses the gallery TreeView component internally.
 * This page demonstrates the org-tree usage pattern rather than
 * creating a redundant component.
 *
 * Production org chart: CompanyStructurePage uses D3 SVG — that's
 * a domain-specific visualization, not a generic primitive.
 */

import { useState } from 'react';
import { Building2, Briefcase, Users } from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { RelatedComponents } from '../components/RelatedComponents';
import { TreeView, type TreeItem } from '../tree-view/TreeView';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['org-unit-tree', 'tree-view', 'card', 'status-badge']);

// ── Demo data ──────────────────────────────────────────────────────────────

const ORG_TREE: TreeItem[] = [
  {
    id: 'hq',
    label: 'Headquarters',
    icon: <Building2 size={14} aria-hidden="true" />,
    children: [
      {
        id: 'hr',
        label: 'Human Resources',
        icon: <Users size={13} aria-hidden="true" />,
        children: [
          { id: 'hr-mgr',   label: 'HR Manager' },
          { id: 'hr-coord', label: 'HR Coordinator' },
        ],
      },
      {
        id: 'eng',
        label: 'Engineering',
        icon: <Briefcase size={13} aria-hidden="true" />,
        children: [
          { id: 'eng-lead', label: 'Engineering Lead' },
          { id: 'dev1',     label: 'Developer' },
        ],
      },
    ],
  },
];

// ── Code example ───────────────────────────────────────────────────────────

const CODE = {
  org: `// Organization Tree = TreeView with org data
import { TreeView, type TreeItem } from '@diwauhris/ui';
import { Building2, Users, Briefcase } from '@diwauhris/ui';

const orgItems: TreeItem[] = [
  {
    id: 'hq',
    label: 'Headquarters',
    icon: <Building2 size={14} aria-hidden="true" />,
    children: [
      {
        id: 'hr',
        label: 'Human Resources',
        icon: <Users size={13} aria-hidden="true" />,
        children: [
          { id: 'hr-mgr',   label: 'HR Manager' },
          { id: 'hr-coord', label: 'HR Coordinator' },
        ],
      },
      {
        id: 'eng',
        label: 'Engineering',
        icon: <Briefcase size={13} aria-hidden="true" />,
        children: [
          { id: 'eng-lead', label: 'Engineering Lead' },
        ],
      },
    ],
  },
];

<TreeView
  items={orgItems}
  selectedId={selected}
  onSelect={setSelected}
  aria-label="Organization structure"
/>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function OrganizationTreePage() {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  return (
    <GalleryLayout activeId="organization-tree">
      <title>Organization Tree — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Enterprise"
          name="Organization Tree"
          description="A generic org hierarchy built on TreeView. For the UHRIS card-based company structure, use OrgUnitTree. For the SVG diagram view, use OrgChart."
          status="complete"
          importName={false}
        />

        <GallerySection id="overview" title="Overview" description="List-style org tree using the TreeView data API.">
          <ShowcasePreview standalone>
            <div className="max-w-sm">
              <TreeView
                items={ORG_TREE}
                selectedId={selected}
                onSelect={setSelected}
                aria-label="Organization structure demo"
              />
              {selected && (
                <p className="mt-3 text-xs font-mono text-slate-500">
                  Selected: <strong>{selected}</strong>
                </p>
              )}
            </div>
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.org} language="tsx" title="Org tree with TreeView">
            <div className="max-w-sm">
              <TreeView
                items={ORG_TREE}
                selectedId={selected}
                onSelect={setSelected}
                aria-label="Organization structure demo"
              />
              {selected && (
                <p className="mt-3 text-xs font-mono text-slate-500">Selected: <strong>{selected}</strong></p>
              )}
            </div>
          </Showcase>
          <div className="rounded-xl border border-sky-100 bg-sky-50 px-5 py-4 mt-4">
            <p className="text-sm font-semibold text-sky-800">Looking for the UHRIS card-based org tree?</p>
            <p className="text-xs font-medium text-sky-700 mt-1">
              This page shows how to use the generic <strong>TreeView</strong> component (text-row list style) for an organization hierarchy.
              For the UHRIS Company Structure card-based design — with dark root nodes, bordered cards, blue hover, icon badges, stats, and actions — see <strong>OrgUnitTree</strong>.
            </p>
          </div>
          <div className="rounded-xl border border-amber-100 bg-amber-50 px-5 py-4 mt-4">
            <p className="text-sm font-semibold text-amber-800">Production D3 Org Chart</p>
            <p className="text-xs font-medium text-amber-700 mt-1">
              CompanyStructurePage uses d3 to render an SVG node-link diagram.
              That visualization is domain-specific and is not a gallery primitive.
              Use TreeView for generic list-style hierarchy; use OrgUnitTree for the UHRIS card design; use D3 for graph visualizations.
            </p>
          </div>
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
