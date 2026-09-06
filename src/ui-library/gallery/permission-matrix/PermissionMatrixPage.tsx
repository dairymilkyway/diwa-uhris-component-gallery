/**
 * PermissionMatrixPage — Gallery infrastructure (Enterprise)
 * Source: gallery/permission-matrix/PermissionMatrix.tsx
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { PermissionMatrix } from './PermissionMatrix';
import { getRelatedComponents } from '../../registry';

const RELATED = getRelatedComponents(['table', 'checkbox', 'status-badge']);

const DEMO_ROLES = ['Admin', 'Manager', 'Viewer'];
const DEMO_PERMISSIONS = [
  { label: 'View employees',   group: 'Personnel', cells: [{ granted: true }, { granted: true }, { granted: true }] },
  { label: 'Create employees', group: 'Personnel', cells: [{ granted: true }, { granted: true }, { granted: false }] },
  { label: 'Delete employees', group: 'Personnel', cells: [{ granted: true }, { granted: false }, { granted: false }] },
  { label: 'View pay rates',   group: 'Payroll',   cells: [{ granted: true }, { granted: true, inherited: true }, { granted: false }] },
  { label: 'Approve requests', group: 'Approvals', cells: [{ granted: true }, { granted: true }, { granted: false }] },
  { label: 'View reports',     group: 'Reports',   cells: [{ granted: true }, { granted: true }, { granted: true }] },
];

const CODE = {
  basic: `import { PermissionMatrix } from '@diwauhris/ui';

<PermissionMatrix
  caption="Role permission overview"
  roles={['Admin', 'Manager', 'Viewer']}
  permissions={[
    {
      label: 'View employees',
      group: 'Personnel',
      cells: [{ granted: true }, { granted: true }, { granted: true }],
    },
    {
      label: 'Delete employees',
      group: 'Personnel',
      cells: [{ granted: true }, { granted: false }, { granted: false }],
    },
  ]}
/>`,
};

export default function PermissionMatrixPage() {
  return (
    <GalleryLayout activeId="permission-matrix">
      <title>Permission Matrix — UI Component Gallery</title>
      <GalleryPageWrapper>
        <GalleryComponentHeader
          category="Enterprise"
          name="Permission Matrix"
          description="A roles-versus-permissions grid. Each cell shows whether a role has a given permission. Domain-free — pass in your roles and permissions and it renders the matrix."
          status="complete"
        />

        <GallerySection id="overview" title="Overview">
          <ShowcasePreview standalone>
            <PermissionMatrix
              roles={DEMO_ROLES}
              permissions={DEMO_PERMISSIONS}
              caption="Role permission overview"
            />
          </ShowcasePreview>
        </GallerySection>

        <GallerySection id="implementation" title="Implementation">
          <Showcase code={CODE.basic} language="tsx" title="Basic matrix" center={false}>
            <PermissionMatrix roles={DEMO_ROLES} permissions={DEMO_PERMISSIONS} caption="Role permission overview" />
          </Showcase>
        </GallerySection>

        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            {[
              '<table> with <caption> provides context for screen readers.',
              'Column headers use scope="col"; row headers use scope="row".',
              'Each cell has aria-label: "Permission X for Role Y: granted/denied".',
              'Check/minus icons are aria-hidden — accessible name is on the cell.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </GallerySection>

        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'roles',       type: 'string[]',   required: true, description: 'Column headers (role names).' },
            { name: 'permissions', type: 'PermissionRow[]', required: true, description: 'Rows: { label, group?, cells: PermissionMatrixCell[] }.' },
            { name: 'caption',     type: 'string', default: '"Permission matrix"', description: 'Accessible table caption (sr-only).' },
            { name: 'className',   type: 'string', description: 'Additional class on the wrapper div.' },
          ]} />
        </GallerySection>

        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>
      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
