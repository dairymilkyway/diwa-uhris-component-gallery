/**
 * StatusPagePage — Gallery (Display)
 *
 * Documents the StatusPage component: full-page status screens for 404,
 * 403, 500, and custom states. Typographic watermark design.
 */

import { GalleryLayout } from '../GalleryLayout';
import { GalleryPageWrapper } from '../components/GalleryPageWrapper';
import { GalleryComponentHeader } from '../components/GalleryComponentHeader';
import { GallerySection } from '../components/GallerySection';
import { ShowcasePreview, Showcase } from '../components/Showcase';
import { ApiTable } from '../components/ApiTable';
import { RelatedComponents } from '../components/RelatedComponents';
import { getRelatedComponents } from '../../registry';
import { STATUS_PAGE_PRESETS } from './StatusPage';

const RELATED = getRelatedComponents(['empty-state', 'alert', 'error-banner']);

// ── Code samples ───────────────────────────────────────────────────────────────

const CODE = {
  notFound: `import { StatusPage, STATUS_PAGE_PRESETS } from '@diwauhris/ui';
import { useNavigate } from 'react-router-dom'; // peer dep — must be installed in your project

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <StatusPage
      {...STATUS_PAGE_PRESETS.notFound}
      primaryAction={{ label: 'Go to Dashboard', onClick: () => navigate('/dashboard') }}
      secondaryAction={{ label: 'Go Back', onClick: () => navigate(-1) }}
    />
  );
}`,

  forbidden: `import { StatusPage, STATUS_PAGE_PRESETS } from '@diwauhris/ui';
import { useNavigate } from 'react-router-dom'; // peer dep — must be installed in your project

function ForbiddenPage() {
  const navigate = useNavigate();
  return (
    <StatusPage
      {...STATUS_PAGE_PRESETS.forbidden}
      primaryAction={{ label: 'Go to Dashboard', onClick: () => navigate('/dashboard') }}
      secondaryAction={{ label: 'Go Back', onClick: () => navigate(-1) }}
    />
  );
}`,

  serverError: `import { StatusPage, STATUS_PAGE_PRESETS } from '@diwauhris/ui';
import { useNavigate } from 'react-router-dom'; // peer dep — must be installed in your project

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <StatusPage
      {...STATUS_PAGE_PRESETS.serverError}
      primaryAction={{ label: 'Try Again', onClick: () => navigate(0) }}
      secondaryAction={{ label: 'Go to Dashboard', onClick: () => navigate('/dashboard') }}
    />
  );
}`,

  custom: `import { StatusPage } from '@diwauhris/ui';
import { Wrench } from '@diwauhris/ui';

// Custom state — no numeric code, icon used as background mark instead
<StatusPage
  icon={<Wrench aria-hidden="true" />}
  eyebrow="Scheduled Maintenance"
  title="System is temporarily unavailable"
  description="We're performing scheduled maintenance. The system will be back online shortly."
  primaryAction={{ label: 'Check Status', href: 'https://status.example.com' }}
/>`,

  hrefAction: `// External link as action — renders <a> instead of <button>
<StatusPage
  {...STATUS_PAGE_PRESETS.serverError}
  primaryAction={{ label: 'Try Again', onClick: () => window.location.reload() }}
  secondaryAction={{ label: 'View Status Page', href: 'https://status.example.com' }}
/>`,
};

// ── Compact preview card — shows the visual language without full-page chrome ──
// Full-page layout is best seen at the actual route. Gallery previews show the
// typographic watermark + heading + description in a fixed-height card.

function PreviewCard({
  code,
  eyebrow,
  title,
  description,
  primaryLabel,
  secondaryLabel,
}: {
  code: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel?: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-slate-200 bg-surface-page flex items-center justify-center px-8 py-10"
      style={{ minHeight: 260 }}
    >
      {/* Watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none font-heading font-bold text-brand-navy opacity-[0.07] text-[100px] leading-none"
      >
        {code}
      </span>
      {/* Content */}
      <div className="relative z-10 w-full max-w-[220px]">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-sky">{eyebrow}</p>
        <h2 className="font-heading text-xl font-bold text-brand-navy leading-tight">{title}</h2>
        <p className="mt-2 text-xs font-medium text-slate-500 leading-relaxed">{description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex h-8 items-center rounded-md bg-brand-blue px-3 text-xs font-bold text-white shadow-sm">
            {primaryLabel}
          </span>
          {secondaryLabel && (
            <span className="inline-flex h-8 items-center rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm">
              {secondaryLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function StatusPagePage() {
  return (
    <GalleryLayout activeId="status-page">
      <title>StatusPage — UI Component Gallery</title>
      <GalleryPageWrapper>

        <GalleryComponentHeader
          category="Display"
          name="StatusPage"
          description="Full-page status screen for 404, 403, 500, and custom states. The status code is rendered as a large Barlow typographic watermark behind the heading — the brand's own type as the primary visual element. No routing logic — consumer wires navigation via onClick or href."
          status="complete"
          importName="StatusPage, STATUS_PAGE_PRESETS"
        />

        {/* ── Overview ──────────────────────────────────────────────────── */}
        <GallerySection
          id="overview"
          title="Overview"
          description="All three presets at reduced scale. Each fills a full viewport in production — the previews below are scaled to 55% for the gallery."
        >
          <ShowcasePreview standalone center={false}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">404 — Not Found</p>
                <PreviewCard
                  code="404"
                  eyebrow={STATUS_PAGE_PRESETS.notFound.eyebrow}
                  title={STATUS_PAGE_PRESETS.notFound.title}
                  description={STATUS_PAGE_PRESETS.notFound.description}
                  primaryLabel="Go to Dashboard"
                  secondaryLabel="Go Back"
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">403 — Forbidden</p>
                <PreviewCard
                  code="403"
                  eyebrow={STATUS_PAGE_PRESETS.forbidden.eyebrow}
                  title={STATUS_PAGE_PRESETS.forbidden.title}
                  description={STATUS_PAGE_PRESETS.forbidden.description}
                  primaryLabel="Go to Dashboard"
                  secondaryLabel="Go Back"
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">500 — Server Error</p>
                <PreviewCard
                  code="500"
                  eyebrow={STATUS_PAGE_PRESETS.serverError.eyebrow}
                  title={STATUS_PAGE_PRESETS.serverError.title}
                  description={STATUS_PAGE_PRESETS.serverError.description}
                  primaryLabel="Try Again"
                  secondaryLabel="Go to Dashboard"
                />
              </div>
            </div>
          </ShowcasePreview>
        </GallerySection>

        {/* ── Presets ───────────────────────────────────────────────────── */}
        <GallerySection
          id="presets"
          title="Presets"
          description="Three named presets cover the most common states. Spread the preset and add your own actions — the preset only sets code, eyebrow, title, and description."
        >
          <Showcase code={CODE.notFound} language="tsx" title="404 — Not Found" center={false}>
            <PreviewCard
              code="404"
              eyebrow={STATUS_PAGE_PRESETS.notFound.eyebrow}
              title={STATUS_PAGE_PRESETS.notFound.title}
              description={STATUS_PAGE_PRESETS.notFound.description}
              primaryLabel="Go to Dashboard"
              secondaryLabel="Go Back"
            />
          </Showcase>

          <Showcase code={CODE.forbidden} language="tsx" title="403 — Access Restricted" center={false}>
            <PreviewCard
              code="403"
              eyebrow={STATUS_PAGE_PRESETS.forbidden.eyebrow}
              title={STATUS_PAGE_PRESETS.forbidden.title}
              description={STATUS_PAGE_PRESETS.forbidden.description}
              primaryLabel="Go to Dashboard"
              secondaryLabel="Go Back"
            />
          </Showcase>

          <Showcase code={CODE.serverError} language="tsx" title="500 — Server Error" center={false}>
            <PreviewCard
              code="500"
              eyebrow={STATUS_PAGE_PRESETS.serverError.eyebrow}
              title={STATUS_PAGE_PRESETS.serverError.title}
              description={STATUS_PAGE_PRESETS.serverError.description}
              primaryLabel="Try Again"
              secondaryLabel="Go to Dashboard"
            />
          </Showcase>
        </GallerySection>

        {/* ── Custom states ─────────────────────────────────────────────── */}
        <GallerySection
          id="custom"
          title="Custom States"
          description="For states without a numeric code (maintenance, coming soon, offline), omit code and pass an icon instead. The icon renders as the large background mark."
        >
          <Showcase code={CODE.custom} language="tsx" title="Maintenance — icon fallback" center={false}>
            <PreviewCard
              code="⚙"
              eyebrow="Scheduled Maintenance"
              title="System is temporarily unavailable"
              description="We're performing scheduled maintenance. The system will be back online shortly."
              primaryLabel="Check Status"
            />
          </Showcase>

          <Showcase code={CODE.hrefAction} language="tsx" title="External link as action (href)" center={false}>
            <PreviewCard
              code="500"
              eyebrow={STATUS_PAGE_PRESETS.serverError.eyebrow}
              title={STATUS_PAGE_PRESETS.serverError.title}
              description={STATUS_PAGE_PRESETS.serverError.description}
              primaryLabel="Try Again"
              secondaryLabel="View Status Page →"
            />
          </Showcase>
        </GallerySection>

        {/* ── Animation ─────────────────────────────────────────────────── */}
        <GallerySection id="animation" title="Animation">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            {[
              'The content block (eyebrow, heading, description, and action buttons) enters with .os-slide-up — opacity + translateY, 0.22s cubic-bezier(0.16,1,0.3,1).',
              'The watermark number stays static. Animating it independently would create a layering conflict with the content entrance.',
              'Respects prefers-reduced-motion: reduce — the .os-slide-up animation is suppressed to animation: none when the user has enabled reduced motion.',
              'No animation dependency required — .os-slide-up is part of the @diwauhris/ui CSS bundle already loaded by consumers.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </GallerySection>

        {/* ── Accessibility ──────────────────────────────────────────────── */}
        <GallerySection id="accessibility" title="Accessibility">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            {([
              ['Structure', [
                'The heading is an <h1> — appropriate for a full-page status screen where this is the only h1 in the document.',
                'The description is a plain <p>. No landmark roles are added to the component — the consumer owns the page structure.',
              ]],
              ['Watermark', [
                'The code watermark and icon background mark are both aria-hidden="true" — they are decorative and carry no information.',
                'Because the watermark is aria-hidden, it has no WCAG contrast requirement. The heading above it communicates the state.',
                'opacity-[0.07] on the watermark ensures it does not visually interfere with the heading text for sighted users.',
              ]],
              ['Action buttons', [
                'Pass descriptive labels — "Go to Dashboard" and "Go Back" are clear; "Click here" or "Back" alone are not.',
                'When href is provided, the action renders as <a>. Screen readers announce the destination via the link label.',
                'When onClick is provided, the action renders as <button type="button">.',
              ]],
              ['No routing dependency', [
                'StatusPage has no react-router-dom import. Navigation is entirely the consumer\'s responsibility.',
                'This means the component works in any routing environment (React Router, Next.js, TanStack Router, window.location).',
              ]],
            ] as [string, string[]][]).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="mb-2 text-sm font-bold text-slate-700">{heading}</h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
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

        {/* ── API Reference ──────────────────────────────────────────────── */}
        <GallerySection id="api" title="API Reference">

          <p className="text-sm font-bold text-slate-700 mb-2">StatusPage</p>
          <ApiTable props={[
            { name: 'title',           type: 'string',            required: true,  description: 'Main heading. Rendered as <h1>.' },
            { name: 'description',     type: 'string',            required: true,  description: 'Body text below the heading. Rendered as <p>.' },
            { name: 'code',            type: 'string',                             description: 'Status code string used as the large typographic watermark (e.g. "404", "403", "500"). Takes priority over icon.' },
            { name: 'icon',            type: 'ReactNode',                          description: 'Lucide icon used as the background mark when code is not set. Pass aria-hidden="true".' },
            { name: 'eyebrow',         type: 'string',                             description: 'Short label shown above the heading in brand-sky uppercase style. Example: "404 — Not Found".' },
            { name: 'primaryAction',   type: 'StatusPageAction',                   description: 'Primary button — Button variant="primary". Renders <a> when href is set, <button> otherwise.' },
            { name: 'secondaryAction', type: 'StatusPageAction',                   description: 'Secondary button — Button variant="outline". Optional.' },
            { name: 'className',       type: 'string',                             description: 'Additional class on the root wrapper.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">StatusPageAction</p>
          <ApiTable props={[
            { name: 'label',   type: 'string',      required: true, description: 'Button or link label.' },
            { name: 'onClick', type: '() => void',                  description: 'Click handler for button-based actions. Consumer wires navigation.' },
            { name: 'href',    type: 'string',                      description: 'Renders an <a> tag. Use for external links or non-SPA navigation.' },
          ]} />

          <p className="text-sm font-bold text-slate-700 mb-2 mt-6">STATUS_PAGE_PRESETS</p>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Preset key', 'code', 'eyebrow', 'title', 'description'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  ['notFound',    '404', '404 — Not Found',          'Page Not Found',        "The page you're looking for doesn't exist or may have been moved."],
                  ['forbidden',   '403', '403 — Access Restricted',  'Access Restricted',     "You don't have permission to view this page."],
                  ['serverError', '500', '500 — Server Error',       'Something Went Wrong',  'We encountered an unexpected problem.'],
                ].map(([key, code, eyebrow, title, desc]) => (
                  <tr key={key} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-brand-blue">{key}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{code}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{eyebrow}</td>
                    <td className="px-4 py-3 text-xs font-medium text-slate-700">{title}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 max-w-[200px]">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GallerySection>

        {/* ── Related ───────────────────────────────────────────────────── */}
        <GallerySection id="related" title="Related Components">
          <RelatedComponents components={RELATED} />
        </GallerySection>

      </GalleryPageWrapper>
    </GalleryLayout>
  );
}
