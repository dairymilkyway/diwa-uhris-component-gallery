/**
 * BreadcrumbPage — Gallery infrastructure
 *
 * Gallery page for the Breadcrumb design-system component.
 *
 * Section order: Header → Overview → Playground → Implementation → Accessibility → API → Related
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { BreadcrumbPlayground } from './BreadcrumbPlayground';
import { Breadcrumb } from './Breadcrumb';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['tabs', 'button', 'card']);

// ── Code strings ──────────────────────────────────────────────────────────────

const CODE = {
  basic: `import { Breadcrumb } from '@diwauhris/ui';

<Breadcrumb
  items={[
    { label: 'Home',     href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Roles' },
  ]}
/>`,

  twoLevel: `<Breadcrumb
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Reports' },
  ]}
/>`,

  singleLevel: `<Breadcrumb
  items={[
    { label: 'Dashboard' },
  ]}
/>`,

  noHome: `<Breadcrumb
  showHome={false}
  items={[
    { label: 'Employees', href: '/personnel/employees' },
    { label: 'Onboarding' },
  ]}
/>`,

  patternOrgStructure: `// Org Structure › Company Structure
<Breadcrumb
  items={[
    { label: 'Org Structure', href: '/org-structure/company-structure' },
    { label: 'Company Structure' },
  ]}
/>`,

  patternPayroll: `// Pay Structure › Templates
<Breadcrumb
  items={[
    { label: 'Pay Structure', href: '/pay-structure/templates' },
    { label: 'Templates' },
  ]}
/>`,

  patternDeep: `// System Settings › Roles › Role Detail
<Breadcrumb
  items={[
    { label: 'System Settings', href: '/system-settings' },
    { label: 'Roles',           href: '/system-settings/roles' },
    { label: 'HR Administrator' },
  ]}
/>`,
};

export default function BreadcrumbPage() {
  return (
    <GalleryLayout activeId="breadcrumb">
      <title>Breadcrumb — UI Component Gallery</title>
      <GalleryPageWrapper>

        {/* Header */}
        <GalleryComponentHeader
          category="Navigation"
          name="Breadcrumb"
          description="A trail of links that tells users where they are in the hierarchy. Every item except the last is a navigable link — the last one is the current page and is not a link."
          status="complete"
        />

        {/* Overview */}
        <GallerySection
          id="overview"
          title="Overview"
          description="Common breadcrumb shapes at a glance. No code — use the playground to experiment."
        >
          <ShowcasePreview standalone>
            <div className="flex flex-col gap-4 w-full">
              <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Settings', href: '/settings' }, { label: 'Roles' }]} />
              <Breadcrumb items={[{ label: 'Personnel', href: '/personnel' }, { label: 'Employees' }]} />
              <Breadcrumb showHome={false} items={[{ label: 'Pay Structure', href: '/pay-structure' }, { label: 'Salary Grades', href: '/pay-structure/salary-grades' }, { label: 'Grade A' }]} />
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* Playground */}
        <GallerySection id="playground" title="Playground" description="Adjust depth and home-icon visibility.">
          <BreadcrumbPlayground />
        </GallerySection>

        {/* Implementation — Depths */}
        <GallerySection id="depths" title="Depths" description="Breadcrumbs adapt to the navigation hierarchy depth.">
          <ShowcaseGrid columns={2}>
            <Showcase
              title="Three levels"
              description="The most common depth in this application."
              code={CODE.basic}
            >
              <Breadcrumb
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Settings', href: '/settings' },
                  { label: 'Roles' },
                ]}
              />
            </Showcase>

            <Showcase
              title="Two levels"
              description="Parent section + current page."
              code={CODE.twoLevel}
            >
              <Breadcrumb
                items={[
                  { label: 'Dashboard', href: '/dashboard' },
                  { label: 'Reports' },
                ]}
              />
            </Showcase>

            <Showcase
              title="Single level"
              description="Just the current page — the Home icon provides context."
              code={CODE.singleLevel}
            >
              <Breadcrumb items={[{ label: 'Dashboard' }]} />
            </Showcase>

            <Showcase
              title="No home icon"
              description="showHome={false} removes the leading Home icon."
              code={CODE.noHome}
            >
              <Breadcrumb
                showHome={false}
                items={[
                  { label: 'Employees', href: '/personnel/employees' },
                  { label: 'Onboarding' },
                ]}
              />
            </Showcase>
          </ShowcaseGrid>
        </GallerySection>

        {/* Implementation — Patterns */}
        <GallerySection
          id="patterns"
          title="Patterns"
          description="Real navigation patterns used across the application."
        >
          <ShowcaseGrid columns={2}>
            <Showcase title="Org Structure" code={CODE.patternOrgStructure}>
              <Breadcrumb
                items={[
                  { label: 'Org Structure', href: '/org-structure/company-structure' },
                  { label: 'Company Structure' },
                ]}
              />
            </Showcase>

            <Showcase title="Pay Structure" code={CODE.patternPayroll}>
              <Breadcrumb
                items={[
                  { label: 'Pay Structure', href: '/pay-structure/templates' },
                  { label: 'Templates' },
                ]}
              />
            </Showcase>
          </ShowcaseGrid>

          <Showcase
            title="Deep hierarchy"
            description="Three-level navigation: section → list → detail."
            code={CODE.patternDeep}
          >
            <Breadcrumb
              items={[
                { label: 'System Settings', href: '/system-settings' },
                { label: 'Roles', href: '/system-settings/roles' },
                { label: 'HR Administrator' },
              ]}
            />
          </Showcase>
        </GallerySection>

        {/* Router integration ── */}
        <GallerySection
          id="router-integration"
          title="Router Integration"
          description="Generating breadcrumbs automatically from the current route tree, rather than passing items manually."
        >
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">React Router v6 — useMatches pattern</h3>
              <p className="mt-1 text-sm font-medium text-slate-500">
                React Router v6 allows each route to attach metadata via a{' '}
                <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">handle</code> property.
                Read the matched route tree with{' '}
                <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">useMatches()</code>,
                extract breadcrumb metadata from each match's{' '}
                <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">handle</code>, and
                pass the derived items to the library's <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">Breadcrumb</code> component.
                This pattern is router-version specific — it requires{' '}
                <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">react-router-dom</code> and
                is not included in @diwauhris/ui.
              </p>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-slate-900 px-5 py-4 text-xs leading-relaxed text-slate-300 font-mono whitespace-pre">
{`// 1. Define the handle shape on each <Route>
// routes.tsx
import type { BreadcrumbItem } from './breadcrumb.types';

export interface RouteMeta {
  breadcrumb?: BreadcrumbItem | string;
}

<Route
  path="/employees"
  element={<EmployeeList />}
  handle={{ breadcrumb: { label: 'Employees', href: '/employees' } } satisfies RouteMeta}
>
  <Route
    path=":id"
    element={<EmployeeDetail />}
    handle={{ breadcrumb: 'Employee Detail' } satisfies RouteMeta}
  />
</Route>

// 2. Auto-breadcrumb component — reads the matched route tree
// AutoBreadcrumb.tsx
import type { UIMatch } from 'react-router-dom';
import { useMatches } from 'react-router-dom';
import { Breadcrumb, type BreadcrumbItem } from '@diwauhris/ui';
import type { RouteMeta } from './routes';

export function AutoBreadcrumb() {
  const matches = useMatches() as UIMatch<unknown, RouteMeta | undefined>[];

  const crumbs = matches
    .map((m): BreadcrumbItem | undefined => {
      const bc = m.handle?.breadcrumb;
      if (!bc) return undefined;
      if (typeof bc === 'string') return { label: bc };
      return bc;
    })
    .filter((b): b is BreadcrumbItem => b != null);

  // Suppress single-crumb case — nothing to navigate up to
  if (crumbs.length < 2) return null;

  return <Breadcrumb items={crumbs} />;
}

// 3. Render in your layout
// Layout.tsx
import { AutoBreadcrumb } from './AutoBreadcrumb';

<main>
  <AutoBreadcrumb />
  <Outlet />
</main>`}
            </pre>
          </div>
        </GallerySection>

        {/* Accessibility */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Semantics', [
                'Renders as <nav aria-label="Breadcrumb"> — provides a navigation landmark for screen readers.',
                'Items are wrapped in <ol> (ordered list) to convey hierarchy.',
                'The last item receives aria-current="page" — screen readers announce it as the current page.',
                'Separator chevrons are aria-hidden="true" — they are decorative.',
                'The Home icon is aria-hidden="true" — it is decorative.',
              ]],
              ['Keyboard', [
                'All ancestor links are keyboard-focusable with visible focus rings.',
                'The current-page item is a <span> — it is not interactive and does not receive focus.',
                'Tab order follows the visual order left-to-right.',
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
          <ApiTable
            props={[
              { name: 'items',     type: 'BreadcrumbItem[]', required: true, description: 'Navigation items. Last item is the current page.' },
              { name: 'showHome',  type: 'boolean', default: 'true',            description: 'Show a leading Home icon.' },
              { name: 'ariaLabel', type: 'string',  default: '"Breadcrumb"',    description: 'aria-label for the <nav> element.' },
            ]}
          />
        </GallerySection>

        {/* Related */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
