/**
 * StatusDotPage — Gallery infrastructure
 *
 * Documents the CSS .status-dot + .status-dot-cell pattern from index.css.
 * Used in the user management table to indicate account status with a
 * coloured glowing dot.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { Showcase, ShowcasePreview } from '../components/Showcase';
import { CopyCodeBlock } from '../components/CopyCodeBlock';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';
import { StatusDot } from './StatusDot';
import { MaskedValue } from './MaskedValue';

const RELATED = getRelatedComponents(['badge', 'alert']);

// ── Code examples ──────────────────────────────────────────────────────────

const CODE = {
  basic: `import { StatusDot } from '@diwauhris/ui';

// Four status variants
<StatusDot status="active"   label="Active"   />
<StatusDot status="locked"   label="Locked"   />
<StatusDot status="inactive" label="Inactive" />
<StatusDot status="pending"  label="Pending"  />`,

  inTable: `// Typical usage inside a table cell
<td>
  <StatusDot
    status={user.status}   // 'active' | 'locked' | 'inactive' | 'pending'
    label={user.statusText}
  />
</td>`,

  css: `/* CSS-only alternative — add these classes to your project's stylesheet */
.status-dot-cell {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.8125rem;
  color: #334155;
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.status-dot.active   { background: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.18); }
.status-dot.locked   { background: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.18); }
.status-dot.inactive { background: #b45309; box-shadow: 0 0 0 3px rgba(180,83,9,0.18); }
.status-dot.pending  { background: #0284c7; box-shadow: 0 0 0 3px rgba(2,132,199,0.18); }`,

  maskedBasic: `import { MaskedValue } from '@diwauhris/ui';

// Unmasked — shows the real value
<MaskedValue value="₱ 48,500.00" masked={false} />

// Masked — caller decides based on permission/context
<MaskedValue
  value="₱ 48,500.00"
  masked={!canViewSalary}
  maskLabel="Salary restricted — view-payroll permission required"
/>`,

  maskedInTable: `// Typical usage in a table cell — caller owns the masking decision
<td>
  <MaskedValue
    value={formatCurrency(row.salary)}
    masked={!permissions.canViewSalary}
    maskLabel="Salary restricted"
  />
</td>`,
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function StatusDotPage() {
  return (
    <GalleryLayout activeId="status-dot">
      <title>Status Dot — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Display"
          name="Status Dot"
          description="A small colored dot with a glow ring for inline status indicators. Import the React component or use the CSS class pair directly — both work."
          status="complete"
          importName="StatusDot, MaskedValue"
        />

        {/* Overview ── */}
        <GallerySection id="overview" title="Overview" description="All four status variants at a glance.">
          <ShowcasePreview standalone>
            <div className="flex flex-wrap gap-8">
              {(['active', 'locked', 'inactive', 'pending'] as const).map((s) => (
                <StatusDot key={s} status={s} label={s.charAt(0).toUpperCase() + s.slice(1)} />
              ))}
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* All variants ── */}
        <GallerySection
          id="variants"
          title="All Variants"
          description="Each status maps to a distinct color with a glow ring so they remain distinguishable even without the label."
        >
          <Showcase
            title="Active / Locked / Inactive / Pending"
            description="Pass the status prop — the dot color, glow, and label are handled automatically."
            code={CODE.basic}
            language="tsx"
            center={false}
            minHeight="min-h-0"
          >
            <div className="flex flex-wrap gap-8">
              <StatusDot status="active"   label="Active"   />
              <StatusDot status="locked"   label="Locked"   />
              <StatusDot status="inactive" label="Inactive" />
              <StatusDot status="pending"  label="Pending"  />
            </div>
          </Showcase>
        </GallerySection>

        {/* In a table ── */}
        <GallerySection
          id="in-table"
          title="In a Table Cell"
          description="The primary use case — account status column in UserManagementPage."
        >
          <Showcase
            title="Table cell usage"
            description="Drop StatusDot directly into a <td> — no wrapper needed."
            code={CODE.inTable}
            language="tsx"
            center={false}
            minHeight="min-h-0"
          >
            <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Employee</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Role</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Maria Santos',  role: 'HR Admin',        status: 'active'   as const },
                    { name: 'Jose Reyes',    role: 'Payroll Staff',   status: 'pending'  as const },
                    { name: 'Ana Cruz',      role: 'Viewer',          status: 'inactive' as const },
                    { name: 'Carlo Mendoza', role: 'IT Admin',        status: 'locked'   as const },
                  ].map(row => (
                    <tr key={row.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3 font-semibold text-slate-800">{row.name}</td>
                      <td className="px-5 py-3 text-slate-500">{row.role}</td>
                      <td className="px-5 py-3">
                        <StatusDot status={row.status} label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Showcase>
        </GallerySection>

        {/* CSS alternative ── */}
        <GallerySection
          id="css-alternative"
          title="CSS-Only Alternative"
          description="If you can't import the React component, the same dot is available as a CSS class pair globally in index.css."
        >
          <CopyCodeBlock code={CODE.css} language="css" title="CSS definitions (index.css)" />
        </GallerySection>

        {/* MaskedValue ── */}
        <GallerySection
          id="masked-value"
          title="MaskedValue"
          description="Renders a value or a redacted placeholder based on a boolean condition. The masking decision is the caller's — MaskedValue is purely presentational and knows nothing about permissions."
        >
          <Showcase code={CODE.maskedBasic} language="tsx" title="Masked and unmasked states">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Unmasked</p>
                <MaskedValue value="₱ 48,500.00" masked={false} />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Masked</p>
                <MaskedValue value="₱ 48,500.00" masked={true} maskLabel="Salary restricted" />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Custom mask text</p>
                <MaskedValue value="₱ 48,500.00" masked={true} maskText="[hidden]" maskLabel="Restricted" />
              </div>
            </div>
          </Showcase>
          <Showcase code={CODE.maskedInTable} language="tsx" title="In a table cell" center={false}>
            <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Employee</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Salary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-slate-800">Maria Santos</td>
                    <td className="px-5 py-3"><MaskedValue value="₱ 48,500.00" masked={false} /></td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-slate-800">Jose Reyes</td>
                    <td className="px-5 py-3"><MaskedValue value="₱ 38,000.00" masked={true} maskLabel="Salary restricted" /></td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-slate-800">Ana Villanueva</td>
                    <td className="px-5 py-3"><MaskedValue value="₱ 52,000.00" masked={true} maskLabel="Salary restricted" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Showcase>
          <ApiTable props={[
            { name: 'value',     type: 'ReactNode', required: true,  description: 'The real value to show when masked is false. Accepts text, formatted numbers, or any ReactNode.' },
            { name: 'masked',    type: 'boolean',   required: true,  description: 'When true, renders the mask placeholder. When false, renders value directly.' },
            { name: 'maskText',  type: 'string',    default: '"••••• •••••"', description: 'Text shown in the masked placeholder pill.' },
            { name: 'maskLabel', type: 'string',    default: '"Value restricted"', description: 'aria-label on the masked placeholder — announces why the value is hidden to screen readers.' },
            { name: 'className', type: 'string',    description: 'Additional class on the root element.' },
          ]} />
        </GallerySection>

        {/* Accessibility ── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            {[
              ['Color + label', [
                'The dot communicates status through color and a glow ring. Color alone is not sufficient — always pair with a visible text label.',
                'The dot span is aria-hidden="true" internally — screen readers announce only the label text.',
                'Each status uses a distinct hue so they remain separable for color-blind users: green (active), red (locked), amber-brown (inactive), sky-blue (pending).',
              ]],
              ['Scope', [
                'Used for account/session states in the user management table.',
                'For lifecycle states on employees, orgs, or pay records (active/draft/archived), use Badge or StatusBadge instead.',
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

        {/* API ── */}
        <GallerySection id="api" title="API Reference">
          <ApiTable props={[
            { name: 'status',    type: "'active' | 'locked' | 'inactive' | 'pending'", required: true,  description: 'Controls dot color and glow ring.' },
            { name: 'label',     type: 'string',  required: false, description: 'Visible text label beside the dot. Always recommended for accessibility.' },
            { name: 'className', type: 'string',  required: false, description: 'Additional class on the root element.' },
          ]} />
          <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Color</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Hex</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Contrast vs white</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { status: 'active',   color: 'Emerald',    hex: '#10b981', ratio: '3.27:1' },
                  { status: 'locked',   color: 'Rose',       hex: '#ef4444', ratio: '3.94:1' },
                  { status: 'inactive', color: 'Amber-700',  hex: '#b45309', ratio: '4.73:1' },
                  { status: 'pending',  color: 'Sky-600',    hex: '#0284c7', ratio: '5.90:1' },
                ].map(row => (
                  <tr key={row.status} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <StatusDot status={row.status as 'active' | 'locked' | 'inactive' | 'pending'} label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} />
                    </td>
                    <td className="px-5 py-3 text-slate-600">{row.color}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-500">{row.hex}</td>
                    <td className="px-5 py-3 text-slate-600">{row.ratio} — passes WCAG 3:1</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GallerySection>

        {/* Related ── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
