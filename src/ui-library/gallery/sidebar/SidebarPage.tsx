/**
 * SidebarPage — Gallery infrastructure
 * Documents the Sidebar design-system component.
 */

import {
  BarChart2, Bell, Building, LayoutDashboard,
  Settings, Users, FileText,
} from 'lucide-react';
import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { SidebarPlayground } from './SidebarPlayground';
import { SidebarNav, SidebarSection, SidebarGroup, SidebarItem } from './Sidebar';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['tabs', 'button', 'breadcrumb']);

// ── Code strings — each must exactly reproduce its paired preview ─────────────

const CODE = {
  basic: `import { SidebarNav, SidebarSection, SidebarItem } from '@diwauhris/ui';
import { LayoutDashboard, Users } from '@diwauhris/ui';

<SidebarNav aria-label="Main navigation">
  <SidebarSection label="Workspace">
    <SidebarItem href="/dashboard" icon={<LayoutDashboard size={16} />} active>
      Dashboard
    </SidebarItem>
    <SidebarItem href="/employees" icon={<Users size={16} />} badge={42}>
      Employees
    </SidebarItem>
  </SidebarSection>
</SidebarNav>`,

  group: `import { SidebarNav, SidebarGroup, SidebarItem } from '@diwauhris/ui';
import { Settings, Shield } from '@diwauhris/ui';

<SidebarNav aria-label="Settings navigation">
  <SidebarGroup label="Admin" defaultExpanded={true}>
    <SidebarItem href="/settings" icon={<Settings size={16} />}>Settings</SidebarItem>
    <SidebarItem href="/permissions" icon={<Shield size={16} />}>Permissions</SidebarItem>
  </SidebarGroup>
</SidebarNav>`,
};

export default function SidebarPage() {
  return (
    <GalleryLayout activeId="sidebar">
      <title>Sidebar — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Navigation"
          name="Sidebar"
          description="A vertical navigation sidebar with grouped sections, collapsible sub-groups, active state highlighting, optional icons, and badge counts. The shell for feature-level navigation."
          status="complete"
          importName="SidebarNav, SidebarSection, SidebarGroup, SidebarItem"
        />

        {/* Overview */}
        <GallerySection id="overview" title="Overview" description="Click items to change active state.">
          <ShowcasePreview standalone center>
            <div className="w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <SidebarNav aria-label="Demo navigation">
                <SidebarSection label="Workspace">
                  <SidebarItem icon={<LayoutDashboard size={16} />} active>Dashboard</SidebarItem>
                  <SidebarItem icon={<Users size={16} />} badge={42}>Employees</SidebarItem>
                  <SidebarItem icon={<Building size={16} />}>Org Structure</SidebarItem>
                  <SidebarItem icon={<BarChart2 size={16} />} badge="3">Reports</SidebarItem>
                </SidebarSection>
                <SidebarGroup label="Admin">
                  <SidebarItem icon={<Bell size={16} />}>Notifications</SidebarItem>
                  <SidebarItem icon={<Settings size={16} />}>Settings</SidebarItem>
                  <SidebarItem icon={<FileText size={16} />} disabled>Audit Log</SidebarItem>
                </SidebarGroup>
              </SidebarNav>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Playground */}
        <GallerySection id="playground" title="Playground">
          <SidebarPlayground />
        </GallerySection>

        {/* Implementation */}
        <GallerySection id="implementation" title="Implementation">
          <ShowcaseGrid columns={1}>
            <Showcase code={CODE.basic} language="tsx" title="Basic navigation with sections" center minHeight="min-h-[160px]">
              <div className="w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <SidebarNav aria-label="Example navigation">
                  <SidebarSection label="Workspace">
                    <SidebarItem icon={<LayoutDashboard size={16} />} active>Dashboard</SidebarItem>
                    <SidebarItem icon={<Users size={16} />} badge={42}>Employees</SidebarItem>
                    <SidebarItem icon={<Building size={16} />}>Org Structure</SidebarItem>
                  </SidebarSection>
                </SidebarNav>
              </div>
            </Showcase>
          </ShowcaseGrid>
          <Showcase code={CODE.group} language="tsx" title="Collapsible group" center minHeight="min-h-[160px]">
              <div className="w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <SidebarNav aria-label="Settings navigation">
                  <SidebarGroup label="Admin" defaultExpanded={true}>
                    <SidebarItem icon={<Settings size={16} />}>Settings</SidebarItem>
                    <SidebarItem icon={<Bell size={16} />}>Notifications</SidebarItem>
                    <SidebarItem icon={<FileText size={16} />} disabled>Audit Log</SidebarItem>
                  </SidebarGroup>
                </SidebarNav>
              </div>
            </Showcase>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {[
              ['Semantics', [
                '<SidebarNav> renders a <nav aria-label="…"> landmark. Always supply a descriptive aria-label.',
                '<SidebarSection> renders an unordered list <ul role="list"> with items as <li> elements.',
                'Active item receives aria-current="page" so screen readers announce "current page".',
                'Disabled items receive aria-disabled="true" and the HTML disabled attribute.',
              ]],
              ['Collapsible groups', [
                '<SidebarGroup> toggle button has aria-expanded (true/false).',
                'When collapsed, child items are removed from the DOM entirely — no aria-hidden needed.',
              ]],
              ['Keyboard', [
                'Tab navigates between all non-disabled interactive items.',
                'Enter/Space activates buttons and links natively.',
                'Focus ring is visible on all interactive elements via focus-visible:ring-2.',
              ]],
            ].map(([h, items]) => (
              <div key={String(h)}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{String(h)}</h3>
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
          <p className="text-sm font-bold text-slate-700 mb-2">SidebarNav</p>
          <ApiTable props={[
            { name: 'aria-label', type: 'string',    required: true, description: 'Accessible label for the <nav> landmark.' },
            { name: 'children',   type: 'ReactNode', required: true, description: 'SidebarSection and SidebarGroup elements.' },
            { name: 'className',  type: 'string',    description: 'Additional class on the nav element.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">SidebarSection</p>
          <ApiTable props={[
            { name: 'label',    type: 'string',    description: 'Optional section heading (uppercase label).' },
            { name: 'children', type: 'ReactNode', required: true, description: 'SidebarItem elements.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">SidebarGroup (collapsible)</p>
          <ApiTable props={[
            { name: 'label',           type: 'string',    required: true, description: 'Group heading and toggle button label.' },
            { name: 'defaultExpanded', type: 'boolean',   default: 'true', description: 'Initial expanded state.' },
            { name: 'children',        type: 'ReactNode', required: true, description: 'SidebarItem elements.' },
          ]} />
          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">SidebarItem</p>
          <ApiTable props={[
            { name: 'href',     type: 'string',    description: 'When provided, renders an <a> element.' },
            { name: 'onClick',  type: '() => void', description: 'Click handler (used when no href).' },
            { name: 'active',   type: 'boolean',   default: 'false', description: 'Marks this as the current page (aria-current="page").' },
            { name: 'icon',     type: 'ReactNode', description: 'Optional icon rendered before the label.' },
            { name: 'badge',    type: 'string | number', description: 'Optional badge count.' },
            { name: 'disabled', type: 'boolean',   default: 'false', description: 'Prevents interaction.' },
            { name: 'children', type: 'ReactNode', required: true, description: 'Item label.' },
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
